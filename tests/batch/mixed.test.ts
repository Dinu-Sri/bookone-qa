import { it, expect } from 'vitest';
import { buildSalesInvoicePosting } from '@product/accounting/engine/document-posting';
import { exactLines, line } from './support/oracles';
const kinds=['physical','service','digital','rental'];
it('E-001 mixed invoice assigns revenue by product and costs only physical goods',()=>{
  const lines=kinds.map((productType,i)=>({productType,quantity:2,unitPrice:100,unitCost:60,description:'Synthetic mix',revenueAccountCode:`40${i+1}0`}));
  const r=buildSalesInvoicePosting({lines});
  expect([r.grandTotal,r.cogsTotal]).toEqual([800,120]);
  exactLines(r.lines,[line('1300','debit',800),...kinds.map((_,i)=>line(`40${i+1}0`,'credit',200)),line('5000','debit',120),line('5100','credit',120)]);
});
it('E-002 exhaustive bounded product/tender/synthetic-tax interactions preserve exact postings',()=>{
  // 4 product kinds x 4 control accounts x 2 synthetic rates =32 combinations.
  for(const productType of kinds)for(const account of ['1300','1000','1100','1200'])for(const tax of [0,10]) {
    const r=buildSalesInvoicePosting({lines:[{productType,quantity:2,unitPrice:50,unitCost:20,description:'Synthetic combination'}],
      settledCashAccountCode:account==='1300'?null:account,vatRatePercent:tax});
    const expected=[line(account,'debit',100+tax),line('4000','credit',100)];
    if(tax)expected.push(line('2200','credit',tax));
    if(productType==='physical')expected.push(line('5000','debit',40),line('5100','credit',40));
    exactLines(r.lines,expected);
  }
});
it('E-003 line permutations preserve non-rounding mixed revenue and cost outcomes',()=>{
  const lines=kinds.map((productType,i)=>({productType,quantity:1,unitPrice:100*(i+1),unitCost:40,description:'Synthetic permutation',revenueAccountCode:`40${i+1}0`}));
  // Independent expected values, not another invocation of the product builder.
  const expected=[line('1300','debit',1000),...kinds.map((_,i)=>line(`40${i+1}0`,'credit',100*(i+1))),line('5000','debit',40),line('5100','credit',40)];
  for(const order of [lines,[...lines].reverse(),[...lines.slice(1),lines[0]]])exactLines(buildSalesInvoicePosting({lines:order}).lines,expected);
});
