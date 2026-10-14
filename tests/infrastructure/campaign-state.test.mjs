import {test} from 'node:test';
import assert from 'node:assert/strict';
import {caseOutcome,resumeGuard,campaignSummary,attemptStatus} from '../../scripts/campaign/state.mjs';
test('campaign discovery rejects empty duplicate unknown and skipped assertions',()=>{
 for(const rows of [[],[{id:'A-001',status:'passed'},{id:'A-001',status:'passed'}],[{id:'B-001',status:'passed'}],[{id:'A-001',status:'skipped'}]])assert.equal(caseOutcome(['A-001'],rows,0).status,'failed');
 assert.equal(caseOutcome(['A-001'],[{id:'A-001',status:'passed'}],1).status,'failed');
 assert.equal(caseOutcome(['A-001'],[{id:'A-001',status:'passed'}],0).status,'passed');
});
test('resume cannot reuse completed or changed campaign evidence',()=>{
 const fp={productSha:'a'.repeat(40),qaContentHash:'b'.repeat(64)},state={schemaVersion:1,kind:'full-campaign',status:'interrupted',fingerprint:fp};
 assert.doesNotThrow(()=>resumeGuard(state,fp));assert.throws(()=>resumeGuard({...state,status:'completed'},fp));assert.throws(()=>resumeGuard(state,{...fp,qaContentHash:'c'.repeat(64)}));
});
test('a pass after an observed failure remains flaky in campaign aggregation',()=>{
 assert.equal(attemptStatus([{cases:[{id:'B-107',status:'failed'}]},{cases:[{id:'B-107',status:'passed'}]}],'B-107'),'flaky');
 assert.equal(attemptStatus([{cases:[{id:'B-107',status:'blocked'}]},{cases:[{id:'B-107',status:'passed'}]}],'B-107'),'passed');
});
test('passing partial check cannot complete a workflow or disclose raw state',()=>{
 const secret='SYNTHETIC-DO-NOT-EXPORT',plan={stages:[{id:'source-a',expected:['A-001']}],tasks:[{id:'B-101',batch:'B',requiredLayers:['browser'],bindings:[{stage:'source-a',id:'A-001'}],implementation:'partial'}],policyBlockers:['POL-01']};
 const state={runId:'CAMP-20261014-000000000-aaaaaa',fingerprint:{password:secret,qaContentHash:'a'.repeat(64)},stages:[{id:'source-a',status:'passed',raw:secret,attempts:[{cases:[{id:'A-001',status:'passed',error:secret}]}]}]};
 const out=campaignSummary(state,plan);assert.equal(out.executedGate,'passed');assert.equal(out.campaignAcceptance,'not-established');assert.equal(out.coverage.acceptedFullWorkflows,0);assert.equal(out.tasks[0].fullWorkflow,'not-accepted');assert.ok(!JSON.stringify(out).includes(secret));
});
