import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const oracle=JSON.parse(fs.readFileSync('queues/ORACLE-v2525-M1A-20261111.json'));
function reconcile(o){
 const balances={},tender={cash:0,bank:50000,card:0};let debit=0,credit=0,count=0;
 for(const e of o.events)for(const j of e.journals){let d=0,c=0;count++;for(const l of j.entries){assert.ok(Number.isInteger(l.amountCents)&&l.amountCents>0);if(l.side==='debit')d+=l.amountCents;else c+=l.amountCents;const v=l.amountCents*(l.side==='debit'?1:-1);balances[l.accountRole]=(balances[l.accountRole]??0)+v;if(l.accountRole in tender){tender[l.accountRole]+=v;assert.ok(tender[l.accountRole]>=0,e.id+' funding');}}assert.equal(d,c,e.id);debit+=d;credit+=c;}
 assert.equal(count,16);assert.equal(debit,368000);assert.equal(credit,debit);
 for(const [role,expected]of Object.entries({cash:15000,bank:-21000,card:0,ar:0,ap:0,inventory:18000,cogs:30000,revenue:-72000,returns:22000,expense:8000}))assert.equal(balances[role],expected,role);
 assert.equal(o.stockEvents.length,6);assert.equal(o.stockEvents.reduce((s,e)=>s+e.qty,0),3);assert.equal(o.stockEvents.reduce((s,e)=>s+e.valueCents,0),18000);
 assert.equal(72000-22000-30000-8000,12000);assert.deepEqual(tender,{cash:15000,bank:29000,card:0});
 return {balances,debit,tender};
}
test('independent revised purchase/AP-credit plus bank-refund and service cycles reconcile',()=>reconcile(oracle));
test('missing real supplier bank refund cannot pass despite balanced earlier journals',()=>{const o=structuredClone(oracle);o.events=o.events.filter(e=>e.id!=='P16');assert.throws(()=>reconcile(o));});
test('old paid-bill-as-cash-refund assumption leaves AP/tender error and is rejected',()=>{const o=structuredClone(oracle);o.events.find(e=>e.id==='P10').journals[0].entries[0].accountRole='bank';assert.throws(()=>reconcile(o));});
test('wrong source quantity/cost is caught even with balanced financial journals',()=>{const o=structuredClone(oracle);o.stockEvents.find(e=>e.id==='P16').qty=-1;assert.throws(()=>reconcile(o));});
test('funding is equity rather than revenue and remains outside sixteen workflow journals',()=>{const r=reconcile(oracle);assert.deepEqual(oracle.setupFunding.entries,[{account:'1100',debitCents:50000,creditCents:0},{account:'3000',debitCents:0,creditCents:50000}]);assert.equal(r.debit+50000,418000);assert.equal(r.tender.cash+r.tender.bank+18000,62000);assert.equal(50000+12000,62000);});
