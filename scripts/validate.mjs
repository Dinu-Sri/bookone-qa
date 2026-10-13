import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import assert from 'node:assert/strict';
import {validateBatch} from './batch/state.mjs';
import {validateCoverage} from './batch/coverage.mjs';
const read=(p)=>JSON.parse(readFileSync(p,'utf8'));
validateBatch(read('batches/A.json'));
const coverage=validateCoverage();
const programme=read('memory/programme.json');
assert.equal(programme.schemaVersion,1);
assert.ok(programme.nextActions?.length,'Missing session next actions');
for(const key of ['strategyDecision','sessionProtocol','implementationGuide'])assert.ok(existsSync(programme[key]),`Missing memory pointer ${key}`);
const scenarios=read('apps/e2e-runner/src/catalog/scenarios.json');
const reviews=read('catalog/assertion-review.json').scenarios;
assert.equal(new Set(scenarios.map(s=>s.id)).size,scenarios.length,'Duplicate scenario IDs');
assert.deepEqual(new Set(reviews.map(s=>s.id)),new Set(scenarios.map(s=>s.id)),'Assertion review must include every catalog ID');
assert.equal(new Set(reviews.map(s=>s.id)).size,reviews.length,'Duplicate assertion reviews');
const ref=read('product-ref.json');assert.match(ref.commit,/^[a-f0-9]{40}$/);
for(const review of reviews){
  assert.ok(['pending','reviewed'].includes(review.assertion_review),`Unknown review state: ${review.id}`);
  if(review.assertion_review==='reviewed'){
    assert.ok(['keep','strengthen','replace','retire'].includes(review.disposition),`Missing disposition: ${review.id}`);
    for(const key of ['observed_depth','gap','reviewed_at','reviewed_binding','review_record'])assert.ok(review[key],`Missing ${key}: ${review.id}`);
    assert.match(review.source_product_sha,/^[a-f0-9]{40}$/);
    assert.ok(existsSync(review.review_record),`Missing review evidence: ${review.id}`);
    assert.ok(existsSync(review.reviewed_binding),`Missing reviewed binding: ${review.id}`);
  }
}
for(const p of ['AGENTS.md','STATUS.md','docs/CHANGE_AND_RELEASE.md','docs/PUBLIC_DATA_POLICY.md','migration/source-inventory.json'])assert.ok(existsSync(p),`Missing ${p}`);
const counts={files:0,scenarios:scenarios.length,assertionsReviewed:reviews.filter(r=>r.assertion_review==='reviewed').length,assertionsPending:reviews.filter(r=>r.assertion_review==='pending').length};
function scan(dir){for(const e of readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','work','.local','reports','test-results'].includes(e.name))continue;const p=join(dir,e.name);if(e.isDirectory()){scan(p);continue;}counts.files++;if(p.endsWith('.json'))read(p);if(!/\.(md|ts|mjs|json|yml|yaml)$/.test(p))continue;const s=readFileSync(p,'utf8');assert.ok(!/-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/.test(s),`Private key in ${p}`);assert.ok(!/\b(?:ghp_|github_pat_)[A-Za-z0-9_]{30,}/.test(s),`Credential-like token in ${p}`);}}
scan('.');console.log(JSON.stringify({...counts,status:'metadata-valid',productAcceptance:'not-established'},null,2));
