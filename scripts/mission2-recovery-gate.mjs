import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
export function checkRecoveryReceipt(r,plan){
 assert.equal(r.schemaVersion,1);assert.equal(r.productSha,'ca05491f18965f757adfead48b5d98595872272c');assert.equal(r.dateContract,'2026-11-15');
 assert.equal(r.authUnresolved,0);assert.equal(r.protectedDataPreserved,true);assert.match(r.qaSha,/^[a-f0-9]{40}$/);
 if(r.mode==='preparation-ci'){
  assert.equal(r.liveAcceptance,false);assert.ok(Array.isArray(r.qualifications)&&r.qualifications.length===2);
  assert.deepEqual(r.qualifications.map(x=>x.kind).sort(),['https','postgres']);
  for(const q of r.qualifications){assert.ok(Number.isSafeInteger(q.runId)&&q.runId>0);assert.equal(q.status,'passed');assert.equal(q.productSha,r.productSha);assert.match(q.qaSha,/^[a-f0-9]{40}$/);}
 }else{
  assert.equal(r.mode,'light-functional-dispositioned');assert.equal(r.clockMode,'active');assert.equal(r.runId,'RUN-20261115-MISSION2');
  assert.ok(plan?.cases?.length);const required=plan.cases.filter(c=>c.phase==='functional').map(c=>c.id);
  assert.deepEqual(r.cases.map(c=>c.id).sort(),required.sort());for(const c of r.cases)assert.ok(['passed','failed','blocked','inconclusive'].includes(c.status));
 }
 return r.mode;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const r=JSON.parse(fs.readFileSync(process.argv[2])),p=fs.existsSync('queues/MISSION2-V2530-20261115.json')?JSON.parse(fs.readFileSync('queues/MISSION2-V2530-20261115.json')):undefined;
 const mode=checkRecoveryReceipt(r,p);assert.equal(new Date().toISOString().slice(0,10),r.dateContract,'Recovery UTC date changed; review a successor');assert.ok(new Date().toISOString().slice(11,16)<'23:55','Recovery stop time reached');
 if(mode==='preparation-ci')for(const q of r.qualifications){const response=await fetch(`https://api.github.com/repos/Dinu-Sri/bookone-qa/actions/runs/${q.runId}`,{headers:{Accept:'application/vnd.github+json','User-Agent':'BookOne-Mission2-QA'}});assert.equal(response.status,200);const run=await response.json();assert.equal(run.head_sha,q.qaSha);assert.equal(run.status,'completed');assert.equal(run.conclusion,'success');}
 console.log('Recovery LAST gate passed: '+mode+'; isolated target only, no live restore capability.');
}
