import assert from 'node:assert/strict';
import { readJSON, hash } from '../batch/state.mjs';
import { runtimeManifest } from '../runtime/manifest.mjs';
export function campaignPlan() {
 const config=readJSON('campaigns/full.json'),coverage=readJSON('batches/coverage.json'),backup=readJSON('catalog/backup-assertions.json');
 assert.equal(config.schemaVersion,1);assert.equal(config.acceptance,'not-established');assert.deepEqual(config.sourceBatches,['A','B','C','D','E','F']);
 const stages=[{id:'qa-check',kind:'check',depends:[],expected:[]}];
 const units=readJSON('campaigns/retained-unit.json');assert.equal(units.cases.length,98);assert.equal(new Set(units.cases.map(c=>c.id)).size,98);
 stages.push({id:'unit-retained',kind:'unit',depends:['qa-check'],expected:units.cases.map(c=>c.id)});
 for(const batch of config.sourceBatches)stages.push({id:'source-'+batch.toLowerCase(),kind:'source',batch,depends:['qa-check'],expected:readJSON(`batches/${batch}.json`).cases.map(c=>c.id)});
 stages.push({id:'archive-helpers',kind:'archive',depends:['qa-check'],expected:readJSON('batches/backup-restore.json').helperIds});
 stages.push({id:'runtime-prepare',kind:'prepare',depends:['qa-check'],expected:[]},{id:'postgres-runtime',kind:'runtime',depends:['runtime-prepare'],expected:runtimeManifest().lanes.flatMap(l=>l.expected)});
 const ids=new Set(stages.map(s=>s.id));assert.equal(ids.size,stages.length);
 for(const s of stages){assert.ok(s.depends.every(d=>ids.has(d)&&d!==s.id));assert.equal(new Set(s.expected).size,s.expected.length);}
 const tasks=coverage.tasks.map(t=>({id:t.id,batch:t.batch,requiredLayers:t.requiredLayers,implementation:t.status,bindings:stages.filter(s=>s.kind==='runtime'&&s.expected.includes(t.id)).map(s=>({stage:s.id,id:t.id}))}));
 for(const c of backup.cases)tasks.push({id:c.id,batch:'archive',requiredLayers:c.requiredLayers,implementation:'dedicated-full-workflow-not-verified',bindings:stages.filter(s=>s.expected.includes(c.id)).map(s=>({stage:s.id,id:c.id}))});
 assert.equal(tasks.length,137);assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
 const policies=readJSON('memory/policies.json').items.filter(p=>p.status!=='approved').map(p=>p.id);
 return {schemaVersion:1,config,stages,tasks,policyBlockers:policies,planHash:hash(JSON.stringify({config,stages,tasks,policies}))};
}
export const terminal=s=>['passed','failed','blocked'].includes(s);
export function resumeGuard(state,fingerprint) {
 assert.equal(state.schemaVersion,1);assert.equal(state.kind,'full-campaign');assert.notEqual(state.status,'completed','Completed campaign is immutable');
 assert.deepEqual(state.fingerprint,fingerprint,'Campaign fingerprint changed; start a new campaign');
}
export function caseOutcome(expected,observed,exitCode) {
 const valid=Array.isArray(observed)&&observed.length===expected.length&&new Set(observed.map(c=>c.id)).size===expected.length&&observed.every(c=>expected.includes(c.id)&&['passed','failed','blocked','skipped','flaky','not-run'].includes(c.status));
 const cases=expected.map(id=>({id,status:valid?observed.find(c=>c.id===id).status:'blocked'}));
 return {cases,status:valid&&exitCode===0&&cases.every(c=>c.status==='passed')?'passed':'failed',reason:valid?(exitCode!==0&&cases.every(c=>c.status==='passed')?'subprocess-failed':'assertion-outcome'):'incomplete-discovery'};
}
export function campaignSummary(state,plan) {
 const reasons=['assertion-outcome','subprocess-failed','incomplete-discovery','prerequisite-failed','runtime-unavailable','candidate-changed','interrupted','not-run'];
 const stages=plan.stages.map(s=>{const current=state.stages.find(x=>x.id===s.id),last=current?.attempts?.at(-1);return {id:s.id,status:terminal(current?.status)?current.status:'blocked',reason:reasons.includes(current?.reason)?current.reason:'not-run',cases:s.expected.map(id=>({id,status:['passed','failed','blocked','skipped','flaky','not-run'].includes(last?.cases?.find(c=>c.id===id)?.status)?last.cases.find(c=>c.id===id).status:current?.status==='blocked'?'blocked':'not-run'}))};});
 const cases=stages.flatMap(s=>s.cases.map(c=>({stage:s.id,...c}))),statuses=['passed','failed','blocked','skipped','flaky','not-run'];
 const tasks=plan.tasks.map(t=>{const observations=t.bindings.map(b=>({stage:b.stage,id:b.id,status:stages.find(s=>s.id===b.stage)?.cases.find(c=>c.id===b.id)?.status??'not-run'}));return {id:t.id,batch:t.batch,implementation:t.implementation,observations,requiredLayers:t.requiredLayers,fullWorkflow:'not-accepted',evidence:'partial-only',next:observations.length?'complete-required-layers':'implement-workflow'};});
 // Never emit arbitrary runner errors, stdout, credentials, notes or raw evidence paths.
 const fp={},patterns={productSha:/^[a-f0-9]{40}$/,productStamp:/^v\d+\.\d+\.\d+ · [a-f0-9]{7}$/,qaSha:/^[a-f0-9]{40}$/,qaContentHash:/^[a-f0-9]{64}$/,planHash:/^[a-f0-9]{64}$/,node:/^v\d+\.\d+\.\d+$/,fixtureVersion:/^campaign-v1$/};
 for(const [key,re]of Object.entries(patterns))if(re.test(state.fingerprint?.[key]??''))fp[key]=state.fingerprint[key];
 if(typeof state.fingerprint?.qaDirty==='boolean')fp.qaDirty=state.fingerprint.qaDirty;if(typeof state.fingerprint?.runtimeSelected==='boolean')fp.runtimeSelected=state.fingerprint.runtimeSelected;
 return {schemaVersion:1,kind:'full-campaign',runId:/^CAMP-\d{8}-\d{9}-[a-f0-9]{6}$/.test(state.runId)?state.runId:'invalid',fingerprint:fp,seed:Number.isInteger(state.seed)?state.seed:null,profile:['quick','broad'].includes(state.profile)?state.profile:'unknown',stages,totals:Object.fromEntries(statuses.map(s=>[s,cases.filter(c=>c.status===s).length])),tasks,policyBlockers:plan.policyBlockers,coverage:{definedWorkflows:tasks.length,withPartialBindings:tasks.filter(t=>t.observations.length).length,withoutBindings:tasks.filter(t=>!t.observations.length).length,acceptedFullWorkflows:0},executedGate:stages.every(s=>s.status==='passed')?'passed':'failed',campaignAcceptance:'not-established',scope:'isolated-implemented-checks-plus-explicit-unfinished-workflows; no-live-browser-or-release-acceptance'};
}
