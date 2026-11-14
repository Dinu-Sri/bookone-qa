import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {validate} from '../../scripts/operator-queue.mjs';
import {assertExecutionDate} from '../../scripts/operator-desktop-cua.mjs';
const root=path.resolve(import.meta.dirname,'../..');
const p=JSON.parse(fs.readFileSync(path.join(root,'queues/MISSION-v2522-RAPID-02.json')));
const o=JSON.parse(fs.readFileSync(path.join(root,p.oracle)));
function summarize(oracle){
  const net={};let journals=0,debits=0,qty=0,moves=[];
  for(const lane of Object.values(oracle.lanes))for(const e of lane.events){
    qty+=e.stockQtyDelta;if(e.stockQtyDelta)moves.push(e.stockQtyDelta);
    for(const j of e.journals){let d=0,c=0;for(const x of j.entries){d+=x.debitCents;c+=x.creditCents;net[x.account]=(net[x.account]??0)+x.debitCents-x.creditCents;}assert.equal(d,c,'event must balance');journals++;debits+=d;}
  }return{net,journals,debits,qty,moves};
}
test('fixed substantial batch retains dependency and exact-button controls without old-source writes',()=>{
  validate(p);assert.equal(p.cases.length,28);assert(p.id.startsWith('MISSION-v2522-RAPID-01'));
  for(const c of p.cases){for(const id of c.dependsOn)assert(p.cases.some(x=>x.id===id));if(c.businessSubmission)assert.equal(c.allowedButtons.length,1);if(c.id.includes('BOUND')||c.id.includes('HISTORY'))assert.equal(c.allowedButtons,undefined);}
  assert.equal(p.cases.filter(c=>c.businessSubmission).length,16);
  assert.equal(p.dateContract.executionDate,o.profile.businessDate);assert.equal(p.dateContract.stopBeforeMidnightMinutes,5);
  assert.equal(p.budget.executionMinutes+p.budget.closingReserveMinutes,p.budget.totalMinutes);
  for(const c of p.cases.filter(x=>x.id.endsWith('BUY')||/INVOICE[12]$|BILL[12]$/.test(x.id)))assert.deepEqual(c.dependsOn,['R02-OPEN']);
  assert(!p.cases.some(c=>/RENTAL|CUSTOMER-REFUND/.test(c.id)),'unqualified shared blockers excluded from executable cases');
});
test('twenty journals reconcile1440; cash/AR/AP/stock/income netzero with three physical movements',()=>{
  const s=summarize(o);assert.equal(s.journals,20);assert.equal(s.debits,144000);assert.equal(s.qty,0);assert.deepEqual(s.moves,[4,-1,-3]);
  for(const code of ['1000','1300','2100','5100'])assert.equal(s.net[code],0);
  assert.equal(s.net['4000'],-20000);assert.equal(s.net['4100'],4000);assert.equal(s.net['6800'],16000);
  assert.equal(-s.net['4000']-s.net['4100']-s.net['6800'],0);
  assert.equal(o.allPass.debitCents,s.debits);assert.equal(o.allPass.journals,s.journals);
  assert.equal(o.lanes.customerAllocation.events.at(-1).journals.length,2);
  assert.equal(o.lanes.vendorAllocation.events.at(-1).journals.length,2);
});
test('oracle sensitivity preserves balanced-event and final stock assertions',()=>{
  const changed=structuredClone(o);changed.lanes.physicalCash.events[0].journals[0].entries[0].debitCents++;
  assert.throws(()=>summarize(changed),/event must balance/);
  const missing=structuredClone(o);missing.lanes.physicalCash.events.pop();const s=summarize(missing);assert.notEqual(s.qty,0);assert.notEqual(s.net['5100'],0);assert.notEqual(s.debits,o.allPass.debitCents);
});
test('helper rejects read-only/ineligible/wrong-button/replayed requests and binds valid source actions',()=>{
  const dir=path.join(root,'.local/rapid02-helper-tests',randomUUID());
  const run=(...args)=>spawnSync(process.execPath,[path.join(root,'scripts/rapid02-run.mjs'),...args],{cwd:root,encoding:'utf8'});
  const init=run('init',dir);
  if(new Date().toISOString().slice(0,10)!==p.dateContract.executionDate){assert.notEqual(init.status,0);assert.match(init.stderr,/UTC day changed/);return;}
  assert.equal(init.status,0,init.stderr);assert.notEqual(run('init',dir).status,0);
  const sp=path.join(dir,'state.json'),before=fs.readFileSync(sp,'utf8');
  assert.notEqual(run('request',dir,'R02-P-BUY','not-qualified','https://bookone.clossyan.com/purchase/expenses/new','Save cash purchase').status,0);
  assert.equal(fs.readFileSync(sp,'utf8'),before);
  assert.notEqual(run('request',dir,'R02-GATE','wrong-button','https://bookone.clossyan.com/','Post').status,0);
  let s=JSON.parse(before);for(const c of s.cases)if(['R02-GATE','R02-OPEN'].includes(c.id))c.status='passed';fs.writeFileSync(sp,JSON.stringify(s));
  assert.notEqual(run('request',dir,'R02-P-BOUND','invalid-submit','https://bookone.clossyan.com/purchase/returns/new','Save purchase return').status,0);
  const ok=run('request',dir,'R02-P-BUY','own-buy-once','https://bookone.clossyan.com/purchase/expenses/new','Save cash purchase');assert.equal(ok.status,0,ok.stderr);
  const req=JSON.parse(fs.readFileSync(path.join(dir,'own-buy-once.request.json')));assert.equal(req.caseId,'R02-P-BUY');assert(req.desktopSources['scripts/operator-desktop-cua.mjs']);
  assert.notEqual(run('request',dir,'R02-P-BUY','own-buy-once','https://bookone.clossyan.com/purchase/expenses/new','Save cash purchase').status,0);
  assert.notEqual(run('request',dir,'R02-S-BUY','unresolved-other-lane','https://bookone.clossyan.com/purchase/expenses/new','Save cash purchase').status,0);
});
test('private proof builder prepares seven controls without claiming or invoking a browser',()=>{
  const dir=path.join(root,'.local/rapid02-proof-tests',randomUUID());
  const r=spawnSync(process.execPath,[path.join(root,'scripts/rapid02-proof.mjs'),dir,'https://bookone.clossyan.com/company/details'],{cwd:root,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);const requests=JSON.parse(fs.readFileSync(path.join(dir,'requests.json')));
  assert.deepEqual(requests.map(x=>x.mode),['positive','exit','intent','fingerprint','clock','click','wrongday']);
  for(const req of requests)assert.equal(fs.existsSync(path.join(path.dirname(req.requestPath),'dispatches')),false);
  const datePlan=JSON.parse(fs.readFileSync(path.join(dir,'wrongday','plan.json')));assert.throws(()=>assertExecutionDate(datePlan),/UTC day changed/);
  const click=JSON.parse(fs.readFileSync(path.join(dir,'click','action.json')));assert.equal(click.name,'Sales');assert.equal(click.kind,'click');
  assert.notEqual(spawnSync(process.execPath,[path.join(root,'scripts/rapid02-proof.mjs'),dir,'https://bookone.clossyan.com/company/details'],{cwd:root}).status,0,'never overwrite proof');
});
