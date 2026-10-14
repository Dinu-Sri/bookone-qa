import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const book=read('rules/rulebook.json');
const hash=createHash('sha256').update(readFileSync('rules/rulebook.json')).digest('hex');
const sourceMap=new Map(book.sources.map(s=>[s.id,s]));
const productPrepared=existsSync('work/product/VERSION');
const esc=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
function render(){
 let md=`# BookOne business rulebook ${book.rulebookVersion}\n\nGenerated from [the editable rule register](../../rules/rulebook.json). Edit the register, then run \`pnpm rulebook:render\`; do not maintain a second set of rule text here.\n\nJurisdiction: Sri Lanka. Policy baseline: ${book.effectivePolicyFrom}. Last reviewed for extraction: ${book.updatedAt}. **No independent expert approval or product acceptance is implied.**\n\nRead [how to use and change this book](README.md), [expert review queue](REVIEW.md) and [source study](STUDY.md). Product study: v2.5.3 ${book.productStudy.baselineSha.slice(0,7)} plus v2.5.4 ${book.productStudy.latestDiffSha.slice(0,7)} diff. Executed QA pin stays v2.5.3.\n\n## Status meanings\n\n- **product-contract**: extracted intended contract or preserved mandatory invariant. It may still fail in the product.\n- **adopted-default**: a non-statutory choice adopted under the owner's 2026-10-14 delegation. Effective for future specifications; compatibility and implementation review required.\n- **external-requirement**: short official-source requirement with qualified applicability; expert interpretation remains pending.\n- **open-review**: unresolved legal scope or contradictory contracts; no compliance acceptance inferred.\n\n## Rule index\n\n| ID | Topic | Status | Expert review |\n|---|---|---|---|\n`;
 for(const r of book.rules)md+=`| [${r.id}](#${r.id.toLowerCase()}) | ${esc(r.title)} | ${r.status} | ${r.expertReview.status} |\n`;
 for(const r of book.rules){md+=`\n<a id="${r.id.toLowerCase()}"></a>\n\n## ${r.id}: ${r.title}\n\n**Revision ${r.revision}; ${r.status}; policy effective ${r.effectiveFrom}.** ${r.authority}.\n\n**Owner:** ${r.owner}. **Applies to:** ${r.appliesTo}.\n\n**Required behaviour:** ${r.expectation}\n\n**Current product/evidence:** ${r.currentBehaviour}\n\n**Example:** ${r.examples.join(' ')}\n\n**Sources:** ${r.sourceIds.map(id=>{const s=sourceMap.get(id);return s.url?`[${id}: ${s.title}](${s.url})`:`${id}: ${s.title}`}).join('; ')}.\n\n**Checks to inspect/extend:** ${r.checkIds.length?r.checkIds.join(', '):'No existing binding; add specification before acceptance'}. ${r.coverageMeaning}\n\n**Known linked defects:** ${r.bugIds.length?r.bugIds.join(', '):'None assigned by this extraction; this is not a pass'}.\n\n**Expert review:** ${r.expertReview.status}. ${r.expertReview.notes}\n\n**Changes:** ${r.changeImpact}\n`;}
 md+='\n## Source register\n\nEach source records its checked date, exact product SHA where relevant, locator and limitations. Official sources must be rechecked for the applicable transaction date. Short paraphrases are used; original documents are not copied into this public repository.\n';
 for(const s of book.sources)md+=`\n### ${s.id}\n\n${s.url?`[${s.title}](${s.url})`:s.title}. Checked ${s.checkedAt}; ${s.verification}.\n\nLocator: ${s.locator}\n\nLimitations: ${s.limitation}\n`;
 return md;
}
function validate(){
 assert.equal(book.schemaVersion,1);assert.equal(book.jurisdiction,'LK');assert.match(book.rulebookVersion,/^\d+\.\d+\.\d+$/);
 assert.equal(sourceMap.size,book.sources.length,'Duplicate sources');
 const ids=new Set();const known=new Set();
 for(const b of ['A','B','C','D','E','F']){const m=read(`batches/${b}.json`);for(const c of m.cases??[])known.add(c.id);for(const lane of m.lanes??[])for(const id of lane.expected??[])known.add(id);}
 for(const lane of read('batches/runtime.json').lanes)for(const id of lane.expected)known.add(id);
 for(const r of read('batches/coverage.json').tasks)known.add(r.id);
 const backups=read('catalog/backup-assertions.json');
 // Dedicated backup catalogue is a list of scenarios; tolerate its declared wrapper only.
 for(const r of backups.cases)known.add(r.id);
 for(const r of read('apps/e2e-runner/src/catalog/scenarios.json'))known.add(r.id);
 for(const s of book.sources){
  assert.ok(s.id&&s.locator&&s.limitation);assert.match(s.checkedAt,/^\d{4}-\d{2}-\d{2}$/);
  if(s.url)assert.ok(/^https:\/\//.test(s.url),`Invalid source URL ${s.id}`);
  if(s.kind==='product'){assert.match(s.productSha,/^[a-f0-9]{40}$/);assert.ok(s.url.includes(s.productSha));assert.ok(s.path&&!s.path.startsWith('/')&&!s.path.split('/').includes('..'));if(productPrepared&&s.productSha===book.productStudy.baselineSha)assert.ok(existsSync(`work/product/${s.path}`),`Missing studied source ${s.path}`);}
 }
 for(const r of book.rules){
  assert.ok(!ids.has(r.id),`Duplicate rule ${r.id}`);ids.add(r.id);
  assert.match(r.id,/^(BR|RB)-[A-Z]+-\d{2}$/);assert.ok(Number.isInteger(r.revision)&&r.revision>0);
  assert.ok(['product-contract','adopted-default','external-requirement','open-review'].includes(r.status));
  for(const k of ['title','owner','appliesTo','expectation','currentBehaviour','coverageMeaning','changeImpact'])assert.ok(typeof r[k]==='string'&&r[k].length,`Missing ${k} ${r.id}`);
  assert.match(r.effectiveFrom,/^\d{4}-\d{2}-\d{2}$/);assert.ok(r.sourceIds.length&&r.examples.length);
  for(const id of r.sourceIds)assert.ok(sourceMap.has(id),`Unknown source ${id}`);
  for(const id of r.checkIds)assert.ok(known.has(id),`Unknown case ${id} in ${r.id}`);
  if(r.status==='adopted-default')assert.ok(r.sourceIds.includes('OWNER-20261014'),`No delegated authority ${r.id}`);
  if(r.status==='external-requirement')assert.ok(r.sourceIds.some(id=>id.startsWith('LK-')),`No local source ${r.id}`);
  assert.ok(['pending','approved','changes-requested'].includes(r.expertReview.status));
  if(r.expertReview.status==='approved')assert.ok(r.expertReview.reviewer&&r.expertReview.reviewedAt&&r.expertReview.record,`Unsupported expert approval ${r.id}`);
 }
 for(const p of read('memory/policies.json').items)for(const id of p.ruleIds??[])assert.ok(ids.has(id),`Unknown policy rule ${id}`);
 // Keep all inherited BR IDs: stable mapping is not a new assertion or acceptance.
 for(const id of ['BR-ACC-01','BR-ACC-02','BR-ACC-03','BR-ACC-04','BR-ACC-05','BR-ACC-06','BR-ACC-07','BR-ACC-08','BR-SAL-01','BR-SAL-02','BR-SAL-03','BR-PUR-01','BR-PUR-02','BR-STK-01','BR-STK-02','BR-STK-03','BR-REN-01','BR-REN-02','BR-REN-03','BR-REN-04','BR-SEC-01','BR-SEC-02','BR-DAT-01','BR-DAT-02','BR-DAT-03','BR-IMP-01','BR-AUD-01'])assert.ok(ids.has(id),`Lost legacy rule ${id}`);
 assert.equal(readFileSync('docs/rulebook/RULES.md','utf8'),render(),'Rulebook view stale; run pnpm rulebook:render');
 return {rules:ids.size,sources:sourceMap.size,rulebookVersion:book.rulebookVersion,rulebookHash:hash,localSourcePaths:productPrepared?'studied paths present; revision is checked separately by candidate guard':'not-prepared; metadata-only',productAcceptance:'not-established',expertApproval:'not-established'};
}
if(process.argv[2]==='render'){writeFileSync('docs/rulebook/RULES.md',render());console.log('Rulebook view regenerated.');}
else console.log(JSON.stringify(validate(),null,2));
