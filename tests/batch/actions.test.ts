import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import fc from 'fast-check';
import { recordEntry, reverseTransactionById } from '@product/web/app/actions/record-entry';
import { getReports } from '@product/web/app/actions/workspace';
import { listParties } from '@product/web/app/actions/parties';
import { openDatabase, resetDatabase, closeDatabase, db, accounts, transactions,
  journalEntries, journalLines, auditLog, parties, businessDocuments, periodLocks, eq } from './support/database';
import { setActor, TENANT_A, TENANT_B } from './support/actor';
const DATE = '2026-10-13';
async function sale(cents = 12345) {
  const result = await recordEntry({ direction: 'money_in', moneyInType: 'new_sale',
    party: 'Synthetic QA', description: 'Neutral fixture', amount: cents / 100,
    date: DATE, paymentMethod: 'Cash', paymentAccount: { kind: 'code', value: '1000' } });
  expect(result.success, result.error).toBe(true);
  return result.transactionId!;
}
async function snapshot() {
  return { tx: await db().select().from(transactions), journals: await db().select().from(journalEntries),
    lines: await db().select().from(journalLines), audit: await db().select().from(auditLog) };
}
describe('Batch A real product actions / isolated embedded PostgreSQL', () => {
  beforeAll(async () => { vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date(`${DATE}T12:00:00Z`)); await openDatabase(); });
  beforeEach(resetDatabase);
  afterAll(async () => { await closeDatabase(); vi.useRealTimers(); });
  it('A-003 authorized reversal flips exact journal lines and retains both records', async () => {
    const id = await sale();
    const result = await reverseTransactionById(id);
    expect(result.success, result.error).toBe(true);
    const state = await snapshot();
    expect([state.tx.length, state.journals.length, state.audit.length]).toEqual([2,2,2]);
    const ac = await db().select().from(accounts);
    const codes = new Map(ac.map(a => [a.id, a.code]));
    for (const j of state.journals) {
      const reverse = j.transactionId === result.reversalTransactionId;
      expect(state.lines.filter(l => l.journalEntryId === j.id).map(l =>
        ({ code: codes.get(l.accountId), side: l.side, amount: Number(l.amount) })).sort((a,b) => a.code!.localeCompare(b.code!)))
        .toEqual([{ code: '1000', side: reverse ? 'credit' : 'debit', amount: 123.45 },
          { code: '4000', side: reverse ? 'debit' : 'credit', amount: 123.45 }]);
    }
    const again = await reverseTransactionById(id);
    expect(again.success).toBe(false);
    expect(await snapshot()).toEqual(state);
  });
  it('A-004 cash flow of a sale and its reversal is zero', async () => {
    const id = await sale();
    expect((await reverseTransactionById(id)).success).toBe(true);
    const report = await getReports('2026-10');
    expect(report.income.netIncome).toBe(0);
    expect(report.balanceSheet.totalAssets).toBe(0);
    expect(report.cashFlow.netCashFlow).toBe(0);
  });
  it('A-005 Viewer reversal is denied with zero persisted side effects', async () => {
    const id = await sale(111);
    const before = await snapshot();
    setActor('viewer');
    const result = await reverseTransactionById(id);
    expect({ denied: !result.success, unchanged: JSON.stringify(await snapshot()) === JSON.stringify(before) })
      .toEqual({ denied: true, unchanged: true });
  });
  it('A-006 archived unposted draft contributes zero customer receivables', async () => {
    const [party] = await db().insert(parties).values({ tenantId: TENANT_A, name: 'QA draft party', isCustomer: '1' }).returning();
    await db().insert(businessDocuments).values({ tenantId: TENANT_A,
      userId: '00000000-0000-4000-8000-000000000003', partyId: party.id,
      documentType: 'sales_invoice', documentNumber: 'QA-DRAFT-1', issueDate: DATE,
      status: 'archived', subtotal: '100', total: '100', balanceDue: '100' });
    const customers = await listParties({ kind: 'customer' });
    expect(customers).toHaveLength(1);
    expect(customers[0].openReceivable).toBe(0);
    expect((await snapshot()).journals).toHaveLength(0);
  });
  it('A-007 generated sale/reversal sequences reconcile Reports after each command', async () => {
    type Model = { sales: Array<{ cents: number; reversed: boolean }> };
    type Real = { ids: string[] };
    async function verify(m: Model) {
      const expectedCents = m.sales.reduce((sum,s) => sum + (s.reversed ? 0 : s.cents), 0);
      const r = await getReports('2026-10');
      expect(Math.round(r.cashFlow.netCashFlow * 100)).toBe(expectedCents);
      expect(Math.round(r.balanceSheet.totalAssets * 100)).toBe(expectedCents);
      expect(Math.round(r.income.netIncome * 100)).toBe(expectedCents);
      expect((await snapshot()).journals).toHaveLength(m.sales.length + m.sales.filter(s => s.reversed).length);
    }
    class Sale implements fc.AsyncCommand<Model, Real> {
      constructor(readonly cents: number) {}
      check() { return true; }
      async run(m: Model, r: Real) { r.ids.push(await sale(this.cents)); m.sales.push({ cents: this.cents, reversed: false }); await verify(m); }
      toString() { return `sale(${this.cents} cents)`; }
    }
    class Reverse implements fc.AsyncCommand<Model, Real> {
      check(m: Readonly<Model>) { return m.sales.some(s => !s.reversed); }
      async run(m: Model, r: Real) { const i = m.sales.findIndex(s => !s.reversed);
        expect((await reverseTransactionById(r.ids[i])).success).toBe(true); m.sales[i].reversed = true; await verify(m); }
      toString() { return 'reverse(first unreversed sale)'; }
    }
    const commands = fc.commands([fc.integer({ min: 1, max: 100000 }).map(n => new Sale(n)), fc.constant(new Reverse())],
      { maxCommands: 10, ...(process.env.QA_REPLAY_PATH ? { replayPath: process.env.QA_REPLAY_PATH } : {}) });
    await fc.assert(fc.asyncProperty(commands, async cmds => {
      await resetDatabase();
      await fc.asyncModelRun(() => ({ model: { sales: [] }, real: { ids: [] } }), cmds);
    }), { seed: Number(process.env.QA_SEED ?? 261013), numRuns: Number(process.env.QA_MODEL_RUNS ?? 40),
      ...(process.env.QA_REPLAY_SHRINK_PATH ? { path: process.env.QA_REPLAY_SHRINK_PATH } : {}) });
  });
  it('A-008 existing foreign-tenant transaction cannot be reversed', async () => {
    const id = await sale(); const before = await snapshot(); setActor('owner', TENANT_B);
    expect((await reverseTransactionById(id)).success).toBe(false);
    expect(await snapshot()).toEqual(before);
  });
  it('A-009 locked reversal period has zero persisted side effects', async () => {
    const id = await sale();
    await db().insert(periodLocks).values({ tenantId: TENANT_A,
      userId: '00000000-0000-4000-8000-000000000003', period: '2026-10', status: 'locked' });
    const before = await snapshot();
    expect((await reverseTransactionById(id)).success).toBe(false);
    expect(await snapshot()).toEqual(before);
  });
  it('A-015 positive control: real creation guard rejects the synthetic Viewer', async () => {
    setActor('viewer'); const before = await snapshot();
    const result = await recordEntry({ direction: 'money_in', moneyInType: 'new_sale',
      party: 'QA', description: 'QA', amount: 1, date: DATE, paymentMethod: 'Cash',
      paymentAccount: { kind: 'code', value: '1000' } });
    expect({ denied: !result.success, unchanged: JSON.stringify(await snapshot()) === JSON.stringify(before) })
      .toEqual({ denied: true, unchanged: true });
  });
});
