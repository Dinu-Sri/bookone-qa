import test from 'node:test';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

// Isolated pure-source tests only: no staging requests, sessions, DB or app adapters.
// Supply the exact privately materialized candidate file; never import a floating checkout.
const p=process.env.BOOKONE_QA_GUARDS_SOURCE;
assert.ok(p,'BOOKONE_QA_GUARDS_SOURCE must identify the pinned candidate file');
const bytes=readFileSync(p);
assert.equal(createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`),bytes])).digest('hex'),'c13acd102065be99eaad9623fd62dbb27a9fc2de','wrong product blob');
const g=await import(pathToFileURL(p).href);
const line=(quantity,id='sku',description='Widget')=>({productId:id,description,quantity});
const widget=[{...line(3),unitPrice:100,unitCost:60,discountAmount:30}];
const digit=q=>[{...line(q,'digital','Licence'),unitPrice:1,unitCost:0,discountAmount:0}];
const ret=(q,id='sku',description='Widget')=>[line(q,id,description)];
const money=n=>Math.round(n*100);

test('different supplier rejected by pure guard',()=>assert.equal(g.linkedReturnPartyMismatch('Supplier A','Supplier B'),true));
test('different customer rejected by pure guard',()=>assert.equal(g.linkedReturnPartyMismatch('Customer A','Customer B'),true));
test('matching party name survives whitespace/case normalization',()=>assert.equal(g.linkedReturnPartyMismatch('Customer A',' customer a '),false));
test('one of three discounted units credits85.50',()=>assert.equal(g.prorateLinkedReturn(widget,13.5,ret(1)).total,85.5));
test('remaining two units credit171',()=>assert.equal(g.prorateLinkedReturn(widget,13.5,ret(2)).total,171));
test('full source credit256.50 stays exact',()=>assert.equal(g.prorateLinkedReturn(widget,13.5,ret(3),{sourceTotal:256.5,priorReturnTotal:0,priorReturnLines:[]}).total,256.5));
test('source unit cost60 remains bound to partial return',()=>assert.equal(g.prorateLinkedReturn(widget,13.5,ret(2)).lines[0].unitCost*2,120));
test('last unit after accepted1+1 takes0.99',()=>assert.equal(g.prorateLinkedReturn(digit(3),0.01,ret(1,'digital','Licence'),{sourceTotal:2.99,priorReturnTotal:2,priorReturnLines:[line(1,'digital','Licence'),line(1,'digital','Licence')]}).total,0.99));
test('full digital3 return remains2.99',()=>assert.equal(g.prorateLinkedReturn(digit(3),0.01,ret(3,'digital','Licence'),{sourceTotal:2.99,priorReturnTotal:0,priorReturnLines:[]}).total,2.99));
test('single excess unit denied',()=>assert.equal(g.returnQtyExceeded(ret(3),ret(3),ret(1)),true));
test('one cent over remaining value denied',()=>assert.equal(g.returnValueExceeded(2.99,2,1),true));
test('unknown product quantity denied',()=>assert.equal(g.returnQtyExceeded(ret(3),[],ret(1,'unknown')),true));
test('fractional quantity conservation at4decimal boundary',()=>assert.equal(g.returnQtyExceeded(ret(0.3),ret(0.1),ret(0.2)),false));
test('future receipt excluded from prior AR cutoff',()=>assert.equal(g.asOfOpenBalance(180,1),181));
test('fully paid current invoice still has100 prior debt',()=>assert.equal(g.asOfOpenBalance(0,100),100));
test('display subtotal270 minus13.50 equals stored256.50',()=>assert.equal(g.displayedLineNetSubtotal(256.5,13.5),270));
test('line150percent remains invalid',()=>assert.equal(g.percentDiscountOver100('percent',150),true));
test('fixed source discount prorates30/3 to10',()=>assert.equal(g.lineDiscountAmount({quantity:1,unitPrice:100,discountType:'fixed',discountValue:30,sourceQuantity:3,sourceDiscountAmount:30}),10));

for(const q of [2,3,7,10])for(const cents of [1,5]){
 test(`sequential${q}unit returns conserve header${cents}cents`,()=>{
  const sourceTotal=(q*100-cents)/100;const prior=[];let credited=0;
  for(let i=0;i<q;i++){
   const out=g.prorateLinkedReturn(digit(q),cents/100,ret(1,'digital','Licence'),{sourceTotal,priorReturnTotal:credited/100,priorReturnLines:prior});
   const expected=i===q-1?money(sourceTotal)-credited:Math.round((1-Math.round(cents/q)/100)*100);
   assert.equal(money(out.total),expected,`step${i+1}`);
   assert.equal(money(out.lineNet-out.headerDiscount),money(out.total),'preview arithmetic must reconcile');
   credited+=money(out.total);prior.push(line(1,'digital','Licence'));
  }
  assert.equal(credited,money(sourceTotal));
 });
}

// These expectations stay red if the exact candidate violates them.
test('aggregate duplicate current lines must not return4 against source3',()=>assert.equal(g.returnQtyExceeded(ret(3),[],[line(2),line(2)]),true));
test('gross VAT source total must not erase original net header discount',()=>{
 // Matches createCommercialDocument's sourceTotal:Number(linkedSource.total).
 // Hypothetical approved taxable fixture: net256.50 +18%46.17 =302.67.
 // This is arithmetic/source integration evidence, not legal registration acceptance.
 const out=g.prorateLinkedReturn(widget,13.5,ret(3),{sourceTotal:302.67,priorReturnTotal:0,priorReturnLines:[]});
 assert.equal(out.headerDiscount,13.5,'original13.50 discount must survive a full return');
});
