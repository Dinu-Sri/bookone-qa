import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateBatch, laneOutcome, publicSummary, assertResume, selectBatchId } from '../../scripts/batch/state.mjs';
import { readFileSync } from 'node:fs';
const batch=JSON.parse(readFileSync('batches/A.json','utf8'));
test('case discovery is mandatory; zero tests and missing IDs cannot pass',()=>{
  assert.equal(laneOutcome(['A-001'],{cases:[]},0).status,'failed');
  assert.equal(laneOutcome(['A-001'],{cases:[{id:'A-001',status:'passed'}]},1).status,'failed');
  assert.equal(laneOutcome(['A-001'],{cases:[{id:'A-001',status:'skipped'}]},0).status,'failed');
  assert.equal(laneOutcome(['A-001'],{cases:[{id:'A-001',status:'passed'}]},0).status,'passed');
});
test('invalid collection, unknown or duplicate IDs fail closed',()=>{
  for(const cases of [[{id:'A-002',status:'passed'}],[{id:'A-001',status:'passed'},{id:'A-001',status:'passed'}]])
    assert.equal(laneOutcome(['A-001'],{cases},0).status,'failed');
});
test('a pass after a failure stays flaky and never grants acceptance',()=>{
  const state={runId:'synthetic',status:'completed',fingerprint:{secret:'do-not-export',productSha:'secret-not-a-sha'},seed:1,profile:'quick',lanes:[{id:'calculations',status:'passed',attempts:[
    {outcome:{cases:[{id:'A-001',status:'failed'}]}},{outcome:{cases:[{id:'A-001',status:'passed'}]}}]}],secret:'do-not-export'};
  const summary=publicSummary(state,batch);
  assert.equal(summary.cases[0].status,'flaky'); assert.equal(summary.sourceGate,'failed');
  assert.equal(summary.releaseAcceptance,'not-established'); assert.equal('secret' in summary,false);
  assert.deepEqual(summary.fingerprint,{});
});
test('resume rejects completed runs or changed candidate fingerprints',()=>{
  assert.throws(()=>assertResume({status:'completed',fingerprint:{sha:'a'}},{sha:'a'}));
  assert.throws(()=>assertResume({status:'running',fingerprint:{sha:'a'}},{sha:'b'}));
  assertResume({status:'running',fingerprint:{sha:'a'}},{sha:'a'});
});
test('manifest cannot contain executable command injection or empty coverage',()=>{
  validateBatch(batch);
  assert.throws(()=>validateBatch({...batch,cases:[]}));
  assert.throws(()=>validateBatch({...batch,lanes:[{...batch.lanes[0],file:'../../secret.ts'}]}));
});
test('batch selection and case ownership cannot mix manifests or traverse paths',()=>{
  for (const id of ['A','B','C','D','E','F']) assert.equal(selectBatchId(id),id);
  for (const id of ['../A','G','AB','A;cmd','']) assert.throws(()=>selectBatchId(id));
  const b={...batch,id:'B',cases:batch.cases.map(c=>({...c,id:c.id.replace('A-','B-')}))};
  validateBatch(b);
  assert.throws(()=>validateBatch({...b,cases:batch.cases}));
  const state={runId:'synthetic',status:'completed',fingerprint:{},seed:1,profile:'quick',lanes:[]};
  assert.equal(publicSummary(state,b).sourceGate,'failed');
  assert.equal(publicSummary(state,b).batch,'B');
});
