import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
// Isolated in-memory source copies only. Never mutate the pinned checkout.
function compile(source) {
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const output={};runInNewContext(code,{exports:output});return output;
}
const source=readFileSync('work/product/packages/accounting/src/engine/document-posting.ts','utf8');
const input={lines:[{description:'Sensitivity fixture',productType:'physical',quantity:2,unitPrice:100,unitCost:60}]};
const normalize=xs=>Array.from(xs,l=>({code:l.accountCode,side:l.side,cents:Math.round(l.amount*100)})).sort((a,b)=>a.code.localeCompare(b.code));
const expected=[{code:'1300',side:'debit',cents:20000},{code:'4000',side:'credit',cents:20000},
  {code:'5000',side:'debit',cents:12000},{code:'5100',side:'credit',cents:12000}];
test('independent posting oracle detects wrong control account and omitted physical costs',()=>{
  assert.deepEqual(normalize(compile(source).buildSalesInvoicePosting(input).lines),expected);
  const mutants=[source.replace("const controlCode = settleCode ?? '1300';","const controlCode = '9999';"),
    source.replace("return type === 'physical' || type === 'stocked';","return false;")];
  for(const mutant of mutants){assert.notEqual(mutant,source);assert.throws(()=>assert.deepEqual(normalize(compile(mutant).buildSalesInvoicePosting(input).lines),expected));}
});
test('rental endpoint expectation detects a strict-overlap mutation',()=>{
  const original=readFileSync('work/product/packages/accounting/src/rental-availability.ts','utf8');
  const mutant=original.replace('aFrom <= bTo && aTo >= bFrom','aFrom < bTo && aTo > bFrom');assert.notEqual(mutant,original);
  const args=['2026-10-13','2026-10-15','2026-10-15','2026-10-17'];
  assert.equal(compile(original).datesOverlap(...args),true);
  assert.equal(compile(mutant).datesOverlap(...args),false);
});
