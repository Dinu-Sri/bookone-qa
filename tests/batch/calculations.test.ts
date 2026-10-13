import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { inferTransaction } from '@product/accounting/engine/posting';
import { buildSalesInvoicePosting } from '@product/accounting/engine/document-posting';
const options = { seed: Number(process.env.QA_SEED ?? 261013), numRuns: Number(process.env.QA_NUM_RUNS ?? 200) };
describe('Batch A independent calculation laws', () => {
  it('A-001 neutral new cash sale always uses exact 1000/4000 amounts', () => {
    fc.assert(fc.property(fc.integer({ min: 1, max: 100_000_000 }), cents => {
      const { journal } = inferTransaction({ tenantId: 'qa', userId: 'qa',
        direction: 'money_in', moneyInType: 'new_sale', party: 'QA',
        description: 'Neutral QA service', amount: cents / 100, date: '2026-10-13',
        paymentMethod: 'Cash', paymentAccount: { kind: 'code', value: '1000' } } as any);
      expect(journal.lines.map(l => ({ code: l.account.code, side: l.side, amount: l.amount })))
        .toEqual([{ code: '1000', side: 'debit', amount: cents / 100 }, { code: '4000', side: 'credit', amount: cents / 100 }]);
    }), options);
  });
  it('A-002 generated product types keep physical cost effects separate', () => {
    fc.assert(fc.property(fc.constantFrom('physical', 'service', 'digital', 'rental'),
      fc.integer({ min: 1, max: 20 }), fc.integer({ min: 1, max: 1000 }),
      (productType, quantity, unitPrice) => {
        // Whole currency units avoid unresolved tax/discount rounding policy.
        const total = quantity * unitPrice;
        const actual = buildSalesInvoicePosting({ lines: [{ productType, quantity, unitPrice,
          unitCost: 2, description: 'QA', revenueAccountCode: '4000',
          cogsAccountCode: '5000', inventoryAccountCode: '5100' }] });
        const expected = [{ accountCode: '1300', side: 'debit', amount: total },
          { accountCode: '4000', side: 'credit', amount: total }];
        if (productType === 'physical') expected.push(
          { accountCode: '5000', side: 'debit', amount: quantity * 2 },
          { accountCode: '5100', side: 'credit', amount: quantity * 2 });
        const sorted = (xs: any[]) => xs.map(({accountCode, side, amount}) => ({accountCode, side, amount}))
          .sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
        expect(sorted(actual.lines)).toEqual(sorted(expected));
      }), options);
  });
});
