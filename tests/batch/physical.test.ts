import { it, expect } from 'vitest';
import fc from 'fast-check';
import { buildGrnPosting, buildVendorBillPosting, buildCashPurchasePosting, buildPurchaseReturnPosting,
  buildSalesInvoicePosting, buildSalesReturnPosting, buildOpeningStockPosting, buildStockAdjustmentPosting } from '@product/accounting/engine/document-posting';
import { exactLines, line, generation } from './support/oracles';
it('C-001 generated GRN plus matched bill capitalizes once and clears GRNI',()=>{
  fc.assert(fc.property(fc.integer({min:1,max:1000000}),cents=>{
    const a=cents/100;
    exactLines(buildGrnPosting({inventoryAmount:a}),[line('5100','debit',a),line('2150','credit',a)]);
    exactLines(buildVendorBillPosting({total:a,expenseAccountCode:'6800',isInventoryPurchase:true,grniClearAmount:a}),
      [line('2150','debit',a),line('2100','credit',a)]);
  }),generation());
});
it('C-002 partial GRNI match preserves remaining fresh inventory and AP',()=>{
  exactLines(buildVendorBillPosting({total:1000,expenseAccountCode:'6800',isInventoryPurchase:true,grniClearAmount:600}),
    [line('2150','debit',600),line('5100','debit',400),line('2100','credit',1000)]);
});
it('C-003 mixed vendor bill splits stock, service expense, landed extras and synthetic tax',()=>{
  exactLines(buildVendorBillPosting({total:800,expenseAccountCode:'6100',landedExtra:50,vatRatePercent:10,
    lineBuckets:[{amount:600,isInventory:true},{amount:200,isInventory:false,expenseAccountCode:'6100'}]}),
    [line('5100','debit',650),line('6100','debit',200),line('2300','debit',80),line('2100','credit',930)]);
});
it('C-004 cash purchase and refund use cash rather than AP',()=>{
  exactLines(buildCashPurchasePosting({total:600,expenseAccountCode:'6800',isInventoryPurchase:true,paymentAccountCode:'1100'}),
    [line('5100','debit',600),line('1100','credit',600)]);
  exactLines(buildPurchaseReturnPosting({total:200,isInventoryPurchase:true,refundCashAccountCode:'1100'}),
    [line('1100','debit',200),line('5100','credit',200)]);
});
it('C-005 physical sale and partial return use original cost account amounts',()=>{
  fc.assert(fc.property(fc.integer({min:2,max:30}),fc.integer({min:1,max:1000}),fc.integer({min:1,max:500}),
    (q,price,cost)=>{
      const input={description:'Synthetic goods',productType:'physical',quantity:q,unitPrice:price,unitCost:cost};
      exactLines(buildSalesInvoicePosting({lines:[input]}).lines,[line('1300','debit',q*price),line('4000','credit',q*price),
        line('5000','debit',q*cost),line('5100','credit',q*cost)]);
      exactLines(buildSalesReturnPosting({lines:[{...input,quantity:1}]}).lines,[line('4100','debit',price),line('1300','credit',price),
        line('5100','debit',cost),line('5000','credit',cost)]);
    }),generation());
});
it('C-006 opening stock and adjustments preserve direction and account values',()=>{
  exactLines(buildOpeningStockPosting({quantity:10,unitCost:60}),[line('5100','debit',600),line('3000','credit',600)]);
  exactLines(buildStockAdjustmentPosting({quantityDelta:-2,unitCost:60}),[line('6800','debit',120),line('5100','credit',120)]);
  exactLines(buildStockAdjustmentPosting({quantityDelta:2,unitCost:60}),[line('5100','debit',120),line('6800','credit',120)]);
});
it('C-007 credit purchase return reverses AP and input tax without cash',()=>{
  exactLines(buildPurchaseReturnPosting({total:200,isInventoryPurchase:true,vatRatePercent:10}),
    [line('2100','debit',220),line('5100','credit',200),line('2300','credit',20)]);
});
it('C-008 zero stock/receipt amount creates no financial journal',()=>{
  expect(buildOpeningStockPosting({quantity:0,unitCost:60})).toEqual([]);
  expect(buildStockAdjustmentPosting({quantityDelta:0,unitCost:60})).toEqual([]);
  expect(buildGrnPosting({inventoryAmount:0})).toEqual([]);
});
