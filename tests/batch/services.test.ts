import { it, expect } from 'vitest';
import fc from 'fast-check';
import { buildSalesInvoicePosting, buildSalesReturnPosting } from '@product/accounting/engine/document-posting';
import { exactLines, line, generation } from './support/oracles';

it('B-001 service and digital credit/cash sales have no inventory or COGS', () => {
  fc.assert(fc.property(fc.constantFrom('service','digital'), fc.integer({min:1,max:50}),
    fc.integer({min:1,max:100000}), fc.constantFrom('1300','1000','1100','1200'), (productType,q,cents,control) => {
      const total=q*cents/100;
      const r=buildSalesInvoicePosting({ lines:[{ productType,quantity:q,unitPrice:cents/100,unitCost:99,
        description:'Synthetic service',revenueAccountCode:'4010' }],
        settledCashAccountCode:control==='1300'?null:control });
      expect([r.grandTotal,r.cogsTotal]).toEqual([total,0]);
      exactLines(r.lines,[line(control,'debit',total),line('4010','credit',total)]);
    }),generation());
});
it('B-002 exact synthetic discount/tax fixture uses the declared accounts', () => {
  // Product-contract fixture only: 300 - line30 - header20 =250; synthetic10% tax25.
  const r=buildSalesInvoicePosting({lines:[{ productType:'digital',quantity:3,unitPrice:100,unitCost:90,
    description:'Synthetic licence',discountAmount:30,revenueAccountCode:'4040' }],headerDiscount:20,vatRatePercent:10,outputVatAccountCode:'2201'});
  expect([r.netTotal,r.vatTotal,r.grandTotal,r.cogsTotal]).toEqual([250,25,275,0]);
  exactLines(r.lines,[line('1300','debit',275),line('4040','credit',250),line('2201','credit',25)]);
});
it('B-003 nonphysical credit and cash refund never restock or reverse COGS', () => {
  fc.assert(fc.property(fc.constantFrom('service','digital'),fc.integer({min:1,max:10000}),
    fc.constantFrom('1300','1000','1100'),(productType,cents,control)=>{
      const r=buildSalesReturnPosting({lines:[{ productType,quantity:1,unitPrice:cents/100,unitCost:100,
        description:'Synthetic credit' }],refundCashAccountCode:control==='1300'?null:control});
      expect(r.cogsTotal).toBe(0);
      exactLines(r.lines,[line('4100','debit',cents/100),line(control,'credit',cents/100)]);
    }),generation());
});
