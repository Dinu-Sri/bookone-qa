import fs from 'node:fs';
import assert from 'node:assert/strict';
import {validate,initialize} from './operator-queue.mjs';

// Specification arithmetic only. Never reads BookOne or executes an action.
for (const [profile,expected] of [
  ['A',{rate:0,total:356000,cash:15000,bank:-21000,card:0,inputVat:0,outputVat:0}],
  ['B',{rate:18,total:412520,cash:17700,bank:-24780,card:0,inputVat:10080,outputVat:-9000}],
]) {
  const plan=JSON.parse(fs.readFileSync(`queues/PLAN-FIRST-CUSTOMER-M1${profile}.json`));
  const oracle=JSON.parse(fs.readFileSync(plan.oracle));
  validate(plan);
  assert.equal(plan.executionReady,false);
  assert.equal(plan.dateContract.executionDate,null);
  assert.equal(plan.productSha,null);
  assert.equal(plan.cases.length,40);
  assert.throws(()=>initialize(plan,{}),/awaits reviewed/);
  const ids=new Set(plan.cases.map(c=>c.id));
  for(const c of plan.cases) {
    assert.equal(c.executable,false);
    assert.deepEqual(c.allowedButtons,[]);
    for(const d of c.dependsOn)assert.ok(ids.has(d),`unknown dependency ${d}`);
  }
  assert.deepEqual(plan.cases.find(c=>c.id===`M1${profile}-S08`).dependsOn,[`M1${profile}-G06`]);
  assert.equal(oracle.profile.vatRatePercent,expected.rate);
  const balances={},tenders={cash:0,bank:50000,card:0};
  let debit=0,credit=0,journals=0;
  const eventIds=new Set();
  for(const e of oracle.events) {
    assert.ok(!eventIds.has(e.id));eventIds.add(e.id);
    assert.equal(e.grossCents,e.netCents+Math.round(e.netCents*expected.rate/100));
    for(const j of e.journals) {
      let d=0,c=0;journals++;
      for(const l of j.entries) {
        assert.ok(l.accountRole in oracle.accountRoles);
        assert.ok(['debit','credit'].includes(l.side));
        assert.ok(Number.isInteger(l.amountCents)&&l.amountCents>0);
        if(l.side==='debit')d+=l.amountCents;else c+=l.amountCents;
        const delta=l.amountCents*(l.side==='debit'?1:-1);
        balances[l.accountRole]=(balances[l.accountRole]??0)+delta;
        if(l.accountRole in tenders){tenders[l.accountRole]+=delta;assert.ok(tenders[l.accountRole]>=0,`${e.id} funding`);}
      }
      assert.equal(d,c,`${e.id} balance`);debit+=d;credit+=c;
    }
  }
  assert.equal(journals,14);assert.equal(debit,expected.total);assert.equal(credit,debit);
  for(const role of ['cash','bank','card','inputVat','outputVat'])assert.equal(balances[role]??0,expected[role],role);
  for(const [role,n] of Object.entries({inventory:18000,cogs:30000,revenue:-72000,returns:22000,expense:8000,ar:0,ap:0}))assert.equal(balances[role],n,role);
  const netIncome=-balances.revenue-balances.returns-balances.cogs-balances.expense;
  assert.equal(netIncome,12000);
  const money=balances.cash+balances.bank+balances.card;
  assert.equal(money+balances.inventory+(balances.inputVat??0)+(balances.outputVat??0),netIncome);
  assert.deepEqual(oracle.allPass.balanceDeltasDebitPositive,balances);
  assert.deepEqual(oracle.allPass.closingTenderCents,tenders);
  assert.equal(oracle.allPass.totalMoneyDeltaCents,money);
  assert.equal(oracle.stockEvents.length,4);
  assert.equal(oracle.stockEvents.reduce((s,e)=>s+e.qty,0),3);
  assert.equal(oracle.stockEvents.reduce((s,e)=>s+e.valueCents,0),18000);
}
console.log('2 profiles / 80 specified checkpoints; arithmetic and fail-closed planning validated; no execution or acceptance.');
