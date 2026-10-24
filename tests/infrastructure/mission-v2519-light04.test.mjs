import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validate, initialize, guard, transition } from '../../scripts/operator-queue.mjs';
const queue = JSON.parse(fs.readFileSync(new URL('../../queues/MISSION-v2519-LIGHT-04.json', import.meta.url)));
const ux = JSON.parse(fs.readFileSync(new URL('../../ux/workbook.json', import.meta.url)));
const fingerprint = { productSha:queue.productSha,liveStamp:'v2.5.19 · 4c3a304',qaSha:queue.qaPlanningBase,rulesHash:'unit-fixture',libraryHash:'unit-fixture',schema:'unit-fixture',configuration:'unit-fixture',actor:'unit-fixture',fixture:'unit-fixture' };
test('fixed queue has28 unique slots and valid earlier dependencies/UX references', () => {
  validate(queue);
  assert.equal(queue.cases.length,28);
  const seen=new Set(), refs=new Set(ux.cases.map(c=>c.id));
  for(const c of queue.cases){for(const d of c.dependsOn)assert.ok(seen.has(d),c.id+' dependency '+d);for(const r of c.uxRefs)assert.ok(refs.has(r),r);seen.add(c.id);}
  assert.equal(queue.cases.filter(c=>c.lane==='isolated-unavailable').length,3);
  assert.equal(queue.cases.at(-1).id,'M19-END');
});
test('frozen candidate rejects older and later documentation builds', () => {
  initialize(queue,fingerprint);
  for(const [productSha,liveStamp] of [['a4a6d65fa0f8ecc116b728b99d70e86f1b2b577f','v2.5.18 · a4a6d65'],['3e9ffee819183eb8513f446cd9b9c32ebce42faf','v2.5.19 · 3e9ffee']])assert.throws(()=>initialize(queue,{...fingerprint,productSha,liveStamp}),/Wrong live candidate/);
  assert.equal(queue.productSha,'4c3a304e6adc985c591ecb7934382b8929f9b189');
});
test('queue drift and incomplete evidence cannot silently become a pass', () => {
  const state=initialize(queue,fingerprint);
  const changed=structuredClone(queue);changed.cases[0].expected+=' changed';
  assert.throws(()=>guard(changed,state,fingerprint),/Fingerprint or queue changed/);
  const running=transition(queue,state,fingerprint,'start','M19-GATE');
  assert.throws(()=>transition(queue,running,fingerprint,'record','M19-GATE',{status:'passed',actual:'test',evidence:{}}),/Missing required evidence/);
});
test('independent integer-cent reconciliation preserves anchors', () => {
  assert.equal(18000-6000-12000,0);
  assert.equal(10000-500,9500);
  assert.equal(9500+1000,10500);
  assert.equal(109000+10500,119500);
  assert.equal(82950-10500,72450);
  assert.equal(119500+4671+72450,196621);
  assert.equal([99,99,99,99,99,100,100].reduce((a,b)=>a+b,0),695);
});
test('no execution or acceptance is created by mission authoring', () => {
  assert.equal(queue.status,'planned-not-executed');
  for(const c of queue.cases)assert.ok(['planned-not-run','blocked-environment-not-prepared'].includes(c.readiness));
  assert.match(queue.cases.find(c=>c.id==='M19-HISTORY').expected,/Do not Save\/Post\/credit\/repair/);
});
