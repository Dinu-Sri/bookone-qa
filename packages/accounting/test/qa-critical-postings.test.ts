import { describe, expect, it } from 'vitest';
import {
  buildSalesInvoicePosting, buildSalesReturnPosting, buildGrnPosting,
  buildVendorBillPosting, type PostingLine,
} from '@product/accounting/engine/document-posting';

// Independent fixed examples: no production calculator/sumSides used as oracle.
// QA-U-001..008; scope and assumptions: docs/BASELINE_AUDIT_20261012.md.
function entries(lines: PostingLine[]) {
  return lines.map(({ accountCode, side, amount }) => ({ accountCode, side, amount }))
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}
const entry = (accountCode: string, side: 'debit' | 'credit', amount: number) =>
  ({ accountCode, side, amount, memo: '' });
const mixed = [
  { description: 'QA chairs hired', productType: 'rental', quantity: 10, unitPrice: 50, unitCost: 300, revenueAccountCode: '4030' },
  { description: 'QA delivery service', productType: 'service', quantity: 1, unitPrice: 200, unitCost: 80, revenueAccountCode: '4010' },
  { description: 'QA goods sold', productType: 'physical', quantity: 3, unitPrice: 100, unitCost: 60, revenueAccountCode: '4020', cogsAccountCode: '5010', inventoryAccountCode: '5110' },
  { description: 'QA digital package', productType: 'digital', quantity: 2, unitPrice: 50, unitCost: 20, revenueAccountCode: '4040' },
];
const mixedExpected = [entry('1300', 'debit', 1100), entry('4030', 'credit', 500),
  entry('4010', 'credit', 200), entry('4020', 'credit', 300), entry('4040', 'credit', 100),
  entry('5010', 'debit', 180), entry('5110', 'credit', 180)];

describe('Independent critical posting examples (unit scope only)', () => {
  it('QA-U-001 mixed hire/service/goods/digital posts the complete expected line set', () => {
    const actual = buildSalesInvoicePosting({ lines: mixed });
    expect({ net: actual.netTotal, tax: actual.vatTotal, total: actual.grandTotal, cogs: actual.cogsTotal })
      .toEqual({ net: 1100, tax: 0, total: 1100, cogs: 180 });
    expect(entries(actual.lines)).toEqual(entries(mixedExpected));
  });

  it('QA-U-002 exact 10% header discount and synthetic 10% tax preserve account allocation', () => {
    // 1100 - 110 = 990; tax 99; receivable 1089. No jurisdictional tax claim.
    const actual = buildSalesInvoicePosting({ lines: mixed, headerDiscount: 110, vatRatePercent: 10 });
    expect({ net: actual.netTotal, tax: actual.vatTotal, total: actual.grandTotal, cogs: actual.cogsTotal })
      .toEqual({ net: 990, tax: 99, total: 1089, cogs: 180 });
    expect(entries(actual.lines)).toEqual(entries([
      entry('1300', 'debit', 1089), entry('4030', 'credit', 450), entry('4010', 'credit', 180),
      entry('4020', 'credit', 270), entry('4040', 'credit', 90), entry('2200', 'credit', 99),
      entry('5010', 'debit', 180), entry('5110', 'credit', 180),
    ]));
  });

  it('QA-U-003 line order cannot change exact no-rounding monetary outcomes', () => {
    for (const lines of [mixed, [...mixed].reverse(), [...mixed.slice(1), mixed[0]!]]) {
      expect(entries(buildSalesInvoicePosting({ lines }).lines)).toEqual(entries(mixedExpected));
    }
  });

  it('QA-U-004 one physical return reverses its original cost with no extra postings', () => {
    const actual = buildSalesReturnPosting({ lines: [{ ...mixed[2]!, quantity: 1 }] });
    expect(entries(actual.lines)).toEqual(entries([
      entry('4100', 'debit', 100), entry('1300', 'credit', 100),
      entry('5110', 'debit', 60), entry('5010', 'credit', 60),
    ]));
    expect(actual.cogsTotal).toBe(60);
  });

  it.each(['service', 'digital', 'rental'])('QA-U-005..007 %s credit must not restock or reverse physical COGS', (productType) => {
    const actual = buildSalesReturnPosting({ lines: [{ description: 'QA nonphysical credit', productType, quantity: 2, unitPrice: 50, unitCost: 300 }] });
    expect(entries(actual.lines)).toEqual(entries([entry('4100', 'debit', 100), entry('1300', 'credit', 100)]));
    expect(actual.cogsTotal).toBe(0);
  });

  it('QA-U-008 matched GRN and bill move the liability without doubling inventory', () => {
    const received = buildGrnPosting({ inventoryAmount: 600 });
    const billed = buildVendorBillPosting({ total: 600, expenseAccountCode: '6800', isInventoryPurchase: true, grniClearAmount: 600 });
    expect(entries(received)).toEqual(entries([entry('5100', 'debit', 600), entry('2150', 'credit', 600)]));
    expect(entries(billed)).toEqual(entries([entry('2150', 'debit', 600), entry('2100', 'credit', 600)]));
  });
});
