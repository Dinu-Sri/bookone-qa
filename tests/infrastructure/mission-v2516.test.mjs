import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate} from '../../scripts/operator-queue.mjs';
import {profile} from '../../scripts/review43-source.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
test('mission keeps fixed IDs, valid dependencies and two explicit upgrade blockers',()=>{
 const q=read('queues/MISSION-v2516-LIGHT-01.json');validate(q);
 assert.equal(q.cases.length,18);const ids=new Set(q.cases.map(c=>c.id));assert.equal(ids.size,18);
 for(const c of q.cases)for(const d of c.dependsOn){assert.ok(ids.has(d));assert.notEqual(c.id,d);assert.ok(q.cases.findIndex(c=>c.id===d)<q.cases.indexOf(c));}
 const upgrade=q.cases.filter(c=>c.lane==='isolated-upgrade');assert.equal(upgrade.length,2);assert.ok(upgrade.every(c=>c.readiness==='blocked-environment-not-prepared'));
 assert.equal(q.productSha,'b2c5205a1bf52fbd327a948325810670467d21b4');assert.equal(q.candidate,'v2.5.16');
});
test('budget leaves closing time and preserves independent allocation profiles',()=>{
 const q=read('queues/MISSION-v2516-LIGHT-01.json');assert.equal(q.budget.executionMinutes+q.budget.closingReserveMinutes,q.budget.totalMinutes);assert.ok(q.budget.closingReserveMinutes>=15);
 assert.deepEqual(profile(7,5),[99,99,99,99,99,100,100]);assert.deepEqual(profile(10,5),[99,99,99,99,99,100,100,100,100,100]);assert.deepEqual(profile(3,1),[100,100,99]);
});
test('new preflight preserves all13 prior product assertions and declares missing runtime proof',()=>{
 const prior=read('runs/CHECKS-20261018-pr43-source-review.json'),next=read('runs/CHECKS-20261018-v2516-source-preflight.json');
 assert.deepEqual(next.checks.map(c=>({id:c.id,expected:c.expected,expectedCents:c.expectedCents})),prior.checks.map(c=>({id:c.id,expected:c.expected,expectedCents:c.expectedCents})));
 assert.equal(next.checks.length,13);assert.ok(next.checks.every(c=>c.status==='passed'));assert.equal(next.liveStamp,'not-verified');assert.equal(next.runtimeAcceptance,'not-established');
});
