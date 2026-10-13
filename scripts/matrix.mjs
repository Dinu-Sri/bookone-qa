import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
export const factors = {
  business: ['services-digital','physical','rental','mixed'],
  entity: ['company','sole-prop-lite','sole-prop-full','personal','pending'],
  modules: ['all','sales-only','inventory-only','rental-only','none'],
  role: ['owner','admin','accountant','sales','purchasing','warehouse','cashier','viewer'],
  scope: ['all','assigned-location-brand','other-location-brand','foreign-tenant'],
};
const keys=Object.keys(factors);
function pairs(row) {const out=[];for(let i=0;i<keys.length;i++)for(let j=i+1;j<keys.length;j++)out.push(`${keys[i]}=${row[keys[i]]}|${keys[j]}=${row[keys[j]]}`);return out;}
function candidates() {let rows=[{}];for(const key of keys)rows=rows.flatMap(row=>factors[key].map(v=>({...row,[key]:v})));return rows;}
// Every role crosses module on/off; each scope includes positive and foreign records.
// Pairwise selection reduces routine combinations. Mandatory risk triples bypass it.
const mandatory=[
  {business:'mixed',entity:'company',modules:'all',role:'viewer',scope:'assigned-location-brand'},
  {business:'mixed',entity:'company',modules:'none',role:'owner',scope:'all'},
  {business:'physical',entity:'sole-prop-lite',modules:'all',role:'owner',scope:'all'},
  {business:'rental',entity:'company',modules:'all',role:'warehouse',scope:'other-location-brand'},
  {business:'services-digital',entity:'company',modules:'all',role:'sales',scope:'foreign-tenant'},
];
export function generate() {
  const all=candidates(),uncovered=new Set(all.flatMap(pairs));
  const selected=[...mandatory];for(const row of selected)for(const p of pairs(row))uncovered.delete(p);
  while(uncovered.size) {
    let best,score=0;
    for(const row of all) {const n=pairs(row).filter(p=>uncovered.has(p)).length;if(n>score){score=n;best=row;}}
    assert.ok(best && score);selected.push(best);for(const p of pairs(best))uncovered.delete(p);
  }
  return {version:1,strategy:'deterministic-pairwise-plus-mandatory-risk-triples',factors,
    fullCombinationCount:all.length,requiredPairCount:new Set(all.flatMap(pairs)).size,
    execution:'specified-not-executed',acceptance:'not-established',
    oracle:'docs/CONFIGURATION_AND_UPLOAD_COVERAGE.md',
    rows:selected.map((row,i)=>({id:`MX-${String(i+1).padStart(3,'0')}`,...row,
      status:'specified-not-executed',mandatory:i<mandatory.length,
      workflows:['create-read-edit-post-pay-return','module-toggle-existing-data','upload-download-export'],
      expected:'Apply independently approved operation/role/module/scope rules; denied operations leave financial/stock/file state unchanged. No permission expectation inferred from current UI.'}))};
}
export function check(matrix) {
  const expected=generate();assert.deepEqual(matrix,expected,'Matrix drift: regenerate and review intent');
  const covered=new Set(matrix.rows.flatMap(pairs));
  for(const row of candidates())for(const p of pairs(row))assert.ok(covered.has(p),`Uncovered pair ${p}`);
  assert.equal(new Set(matrix.rows.map(r=>r.id)).size,matrix.rows.length);
  return {rows:matrix.rows.length,requiredPairs:covered.size,fullCombinations:matrix.fullCombinationCount,status:'plan-integrity-valid',businessAcceptance:'not-established',sha256:createHash('sha256').update(JSON.stringify(matrix)).digest('hex')};
}
if(process.argv[1]?.endsWith('matrix.mjs')) {
  if(process.argv[2]==='generate')writeFileSync('batches/configuration-matrix.json',JSON.stringify(generate(),null,2)+'\n');
  else assert.equal(process.argv[2],'check');
  console.log(JSON.stringify(check(JSON.parse(readFileSync('batches/configuration-matrix.json','utf8'))),null,2));
}
