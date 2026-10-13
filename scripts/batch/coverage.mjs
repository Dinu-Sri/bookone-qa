import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readJSON, validateBatch } from './state.mjs';
export function validateCoverage() {
  const register=readJSON('batches/coverage.json'), ids=new Set(), manifests={};
  assert.equal(register.version,1); assert.equal(register.acceptance,'not-established');
  assert.ok(existsSync(register.specification)); assert.ok(existsSync(register.policyRegistry));
  for(const batch of ['A','B','C','D','E','F']) {
    const manifest=readJSON(`batches/${batch}.json`);validateBatch(manifest);manifests[batch]=manifest;
    for(const lane of manifest.lanes)assert.ok(existsSync(lane.file),`Missing test file ${lane.file}`);
    for(const c of manifest.cases){assert.ok(!ids.has(c.id));ids.add(c.id);}
  }
  for(const task of register.tasks) {
    assert.match(task.id,new RegExp(`^${task.batch}-\\d{3}$`));assert.ok(!ids.has(task.id));ids.add(task.id);
    assert.ok(['specified-not-implemented','policy-blocked','implemented-awaiting-evidence','not-supported-to-confirm'].includes(task.status));
    assert.ok(task.expected && task.next && task.requiredLayers?.length);
  }
  const rows=Object.entries(manifests).map(([batch,m])=>({batch,executableSourceCases:m.cases.length,
    lifecycleTasks:register.tasks.filter(t=>t.batch===batch).length,scope:m.scope,acceptance:'not-established'}));
  return { rows, lifecycleTasks:register.tasks.length, totalExecutable:rows.reduce((n,r)=>n+r.executableSourceCases,0),
    pendingPolicies:readJSON(register.policyRegistry).items.filter(x=>x.status!=='approved').length,
    note:'Written source contracts and specified tasks are not passing release coverage; consult immutable candidate runs.' };
}
if(process.argv[1]?.endsWith('coverage.mjs'))console.log(JSON.stringify(validateCoverage(),null,2));
