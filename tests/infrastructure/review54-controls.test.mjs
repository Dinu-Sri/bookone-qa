import test from 'node:test';
import assert from 'node:assert/strict';
import {initialize,transition,report} from '../../scripts/operator-queue.mjs';
import {openClock,advanceClock,clockReport} from '../../scripts/operator-clock.mjs';
const sha='a'.repeat(40);
const plan={schemaVersion:1,id:'unit',candidate:'v1.0.0',productSha:sha,cases:[{id:'one',precondition:'fixture',expected:'one accepted event',evidence:['readback']}]};
const fp={productSha:sha,liveStamp:'v1.0.0 · aaaaaaa',qaSha:'b'.repeat(40),rulesHash:'unit',libraryHash:'unit',schema:'unit',configuration:'unit',actor:'unit',fixture:'unit'};
const running=()=>transition(plan,initialize(plan,fp),fp,'start','one');
test('same short prefix with different full SHA is refused',()=>assert.throws(()=>initialize(plan,{...fp,productSha:'a'.repeat(7)+'c'.repeat(33)}),/full product SHA/));
test('planning-only mission cannot initialize even with matching-looking fingerprint',()=>assert.throws(()=>initialize({...plan,executionReady:false},fp),/awaits reviewed/));
test('submission identity prevents replay and unresolved intent prevents next submit or pass',()=>{
 const s=transition(plan,running(),fp,'intent','one',{submissionId:'s1',action:'Save once'});
 assert.throws(()=>transition(plan,s,fp,'intent','one',{submissionId:'s1',action:'replay'}),/already recorded/);
 assert.throws(()=>transition(plan,s,fp,'intent','one',{submissionId:'s2',action:'next'}),/Inspect persisted/);
 assert.throws(()=>transition(plan,s,fp,'record','one',{status:'passed',actual:'looks done',evidence:{readback:'unknown'}}),/Unresolved/);
});
test('inconclusive readback remains unresolved; later observed recovery appends rather than erases',()=>{
 let s=transition(plan,running(),fp,'intent','one',{submissionId:'s1',action:'Save once'});
 s=transition(plan,s,fp,'readback','one',{submissionId:'s1',outcome:'inconclusive',actual:'Response missing'});
 assert.equal(s.cases[0].submissions[0].outcome,'unresolved');
 s=transition(plan,s,fp,'readback','one',{submissionId:'s1',outcome:'accepted',actual:'Persisted own record and journal exactly once'});
 assert.equal(s.cases[0].submissions[0].readbacks.length,2);
 s=transition(plan,s,fp,'record','one',{status:'passed',actual:'one accepted',evidence:{readback:'own record and journal'}});
 assert.equal(s.cases[0].status,'passed');
});
test('uncertain earlier case blocks independent new writes; late readback preserves its inconclusive disposition',()=>{
 const p={...plan,cases:[...plan.cases,{id:'two',precondition:'independent',expected:'safe',evidence:['readback']}]};
 let s=transition(p,initialize(p,fp),fp,'start','one');
 s=transition(p,s,fp,'intent','one',{submissionId:'s1',action:'Save'});
 s=transition(p,s,fp,'record','one',{status:'inconclusive',actual:'response absent',evidence:{},nextAction:'inspect persisted'});
 assert.deepEqual(report(p,s,fp).unresolved,['one']);assert.equal(report(p,s,fp).next,null);
 s=transition(p,s,fp,'start','two');
 assert.throws(()=>transition(p,s,fp,'intent','two',{submissionId:'s2',action:'new Save'}),/Unresolved mission/);
 s=transition(p,s,fp,'readback','one',{submissionId:'s1',outcome:'accepted',actual:'later own persisted record and matching journal'});
 assert.equal(s.cases[0].status,'inconclusive');
 assert.equal(transition(p,s,fp,'intent','two',{submissionId:'s2',action:'new Save'}).cases[1].submissions.length,1);
});
test('budget omission is explicit not-run and cannot erase an attempted case',()=>{
 let s=transition(plan,initialize(plan,fp),fp,'defer','one',{reason:'not-run-budget',actual:'closing reserve reached before attempt',nextAction:'new reviewed mission'});
 assert.equal(s.cases[0].status,'not-run');assert.equal(report(plan,s,fp).counts['not-run'],1);
 assert.throws(()=>transition(plan,s,fp,'start','one'),/unresolved\/finished/);
 assert.throws(()=>transition(plan,running(),fp,'defer','one',{reason:'not-run-budget',actual:'attempted already',nextAction:'review'}),/pending case/);
});
test('unpaused three-hour interruption is charged, not silently treated as idle',()=>{
 const s=advanceClock(openClock(100,15,0),'check',3*60*60000);
 assert.equal(s.chargedMs,3*60*60000);assert.equal(clockReport(s).allowNewBusinessSubmission,false);assert.equal(clockReport(s).totalExceeded,true);
});
test('explicit pause excludes only later observed paused interval; no retrospective subtraction',()=>{
 let s=advanceClock(openClock(100,15,0),'pause',10*60000,'owner interruption');
 s=advanceClock(s,'resume',130*60000);s=advanceClock(s,'check',131*60000);
 assert.equal(s.chargedMs,11*60000);assert.equal(s.pausedMs,120*60000);
 assert.throws(()=>advanceClock(s,'check',1),/time reversal/);
});
test('reserve boundary refuses new business submissions but permits close accounting',()=>{
 let s=advanceClock(openClock(100,15,0),'check',85*60000);
 assert.equal(clockReport(s).closingRequired,true);assert.equal(clockReport(s).allowNewBusinessSubmission,false);
 s=advanceClock(s,'close',90*60000);assert.equal(s.mode,'closed');assert.throws(()=>advanceClock(s,'resume',91*60000),/Invalid/);
});
