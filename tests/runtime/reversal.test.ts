import { beforeEach, afterAll, it, expect, vi } from 'vitest';
import { recordEntry, reverseTransactionById } from '@product/web/app/actions/record-entry';
import { getReports } from '@product/web/app/actions/workspace';
import { admin, resetFixture, closeFixture } from './support/fixture';
import { VIEWER, setActor } from './support/session';
import { observe } from './support/observations';
beforeEach(async()=>{vi.useFakeTimers({toFake:['Date']});vi.setSystemTime(new Date('2026-10-13T12:00:00Z'));await resetFixture();});
afterAll(async()=>{await closeFixture();vi.useRealTimers();});
async function sale() {
  const result=await recordEntry({direction:'money_in',moneyInType:'new_sale',party:'Synthetic concurrency customer',description:'Neutral runtime sale',amount:123.45,date:'2026-10-13',paymentMethod:'Cash',paymentAccount:{kind:'code',value:'1000'}});
  expect(result,result.error).toMatchObject({success:true});return result.transactionId!;
}
async function snapshot() {
  const tables=['transactions','journal_entries','journal_lines','audit_log'];const out={};
  for(const table of tables)out[table]=await admin.unsafe(`select * from ${table} order by id`);return out;
}
async function verifyOne(id:string) {
  const rows=await admin`select id,reverses_transaction_id,reversed_by_transaction_id from transactions order by id`;
  expect(rows).toHaveLength(2);const reverse=rows.filter(r=>r.reverses_transaction_id===id);expect(reverse).toHaveLength(1);expect(rows.find(r=>r.id===id)?.reversed_by_transaction_id).toBe(reverse[0].id);
  const lines=await admin`select a.code,l.side,l.amount::text as amount,t.reverses_transaction_id from journal_lines l join accounts a on a.id=l.account_id join journal_entries j on j.id=l.journal_entry_id join transactions t on t.id=j.transaction_id`;
  expect(lines).toHaveLength(4);
  for(const reversed of [false,true])expect(lines.filter(l=>Boolean(l.reverses_transaction_id)===reversed).map(l=>[l.code,l.side,Number(l.amount)]).sort()).toEqual([['1000',reversed?'credit':'debit',123.45],['4000',reversed?'debit':'credit',123.45]]);
  const [audit]=await admin`select count(*)::int as count from audit_log where action='REVERSE'`;expect(audit.count).toBe(1);
  const report=await getReports('2026-10');expect([report.cashFlow.netCashFlow,report.income.netIncome]).toEqual([0,0]);
}
it('[RT-005] actual sale/reversal positive control and repeated reversal has no additional effects',async()=>{
  const id=await sale();expect((await reverseTransactionById(id)).success).toBe(true);await verifyOne(id);
  const before=await snapshot();expect((await reverseTransactionById(id)).success).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[RT-006] overlapping requests produce exactly one reversal and one financial offset',async()=>{
  const id=await sale();
  // Isolated timing injection only: widen overlap after the product's preflight
  // read without changing any amount, return value or product locking strategy.
  await admin.unsafe(`CREATE OR REPLACE FUNCTION qa_runtime_delay_reversal() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.reverses_transaction_id IS NOT NULL THEN PERFORM pg_sleep(0.25); END IF; RETURN NEW; END $$`);
  await admin.unsafe(`CREATE TRIGGER qa_runtime_delay_reversal BEFORE INSERT ON transactions FOR EACH ROW EXECUTE FUNCTION qa_runtime_delay_reversal()`);
  let results;
  try {results=await Promise.all([reverseTransactionById(id),reverseTransactionById(id)]);}
  finally {await admin.unsafe('DROP TRIGGER qa_runtime_delay_reversal ON transactions');await admin.unsafe('DROP FUNCTION qa_runtime_delay_reversal()');}
  const [count]=await admin`select count(*)::int as count from transactions where reverses_transaction_id=${id}`;
  const report=await getReports('2026-10');
  const [journalCount]=await admin`select count(*)::int as count from journal_entries`;
  observe('RT-006',{acceptedRequests:results.filter(r=>r.success).length,reversalCount:count.count,journalCount:journalCount.count,netCashCents:Math.round(report.cashFlow.netCashFlow*100),netIncomeCents:Math.round(report.income.netIncome*100),expectedAccepted:1,expectedReversals:1,expectedJournals:2,expectedNetCashCents:0,expectedNetIncomeCents:0});
  expect({accepted:results.filter(r=>r.success).length,reversals:count.count}).toEqual({accepted:1,reversals:1});await verifyOne(id);
});
it('[RT-007] persisted Viewer role denies reversal of actual existing sale with zero business mutations',async()=>{
  const id=await sale();const before=await snapshot();setActor(VIEWER,'viewer');const denied=await reverseTransactionById(id);
  expect({denied:!denied.success,unchanged:JSON.stringify(await snapshot())===JSON.stringify(before)}).toEqual({denied:true,unchanged:true});
});
