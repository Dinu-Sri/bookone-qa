import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {loadScenarios} from '../apps/e2e-runner/src/helpers/catalog.ts';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const spec=read('catalog/backup-assertions.json'),plan=read('batches/backup-restore.json'),ref=read('product-ref.json');
assert.equal(spec.productSha,ref.commit);assert.equal(plan.productSha,ref.commit);
assert.equal(spec.requiredLiveStamp,plan.requiredLiveStamp);assert.match(plan.requiredLiveStamp,new RegExp(`^v\\d+\\.\\d+\\.\\d+ · ${ref.commit.slice(0,7)}$`));
assert.equal(spec.cases.length,45);assert.deepEqual(spec.cases.map(c=>c.id),Array.from({length:45},(_,i)=>`S-${761+i}`.replace('S-','S-0')));
assert.deepEqual(plan.scenarioIds,spec.cases.map(c=>c.id));assert.equal(plan.liveGate.companyResetSql,false);assert.equal(plan.acceptance,'not-established');
const all=loadScenarios({includeDedicated:true}),legacy=loadScenarios();
assert.equal(all.length,792);assert.equal(legacy.length,747);
const coverage=read('apps/e2e-runner/src/catalog/coverage.generated.json');
for(const c of spec.cases){assert.ok(c.assertions.length>=2&&c.assertions.every(a=>a.length>30));assert.equal(c.acceptance,'not-verified');assert.equal(c.automation.browser,'backlog');assert.equal(all.find(s=>s.id===c.id)?.executionPolicy,'dedicated-backup');assert.ok(!legacy.some(s=>s.id===c.id));if(c.automation.helper!=='backlog')assert.ok(existsSync(c.automation.helper));}
assert.equal(plan.helperIds.length,16);assert.deepEqual(plan.helperIds,spec.cases.filter(c=>c.automation.helper!=='backlog').map(c=>c.id));
const tests=readFileSync('tests/archive/contracts.test.ts','utf8');assert.deepEqual([...tests.matchAll(/it\('\[(S-\d{4})\]/g)].map(m=>m[1]),plan.helperIds);
assert.ok(coverage.missing_ids?.length>=45,'Dedicated cases must remain missing from browser automation');
for(const id of plan.scenarioIds)assert.ok(coverage.missing_ids.includes(id),`Generic coverage falsely includes ${id}`);
console.log(JSON.stringify({status:'plan-valid',dedicatedScenarios:45,helperAssertions:16,legacyScenarios:747,fullAcceptance:'not-established'}));
