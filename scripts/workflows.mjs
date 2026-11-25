import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (base, file) => JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'));
const nonempty = v => typeof v === 'string' && v.trim().length > 0;
const required = (ok, message, errors) => { if (!ok) errors.push(message); };
const categories = ['boundary','invalid-state','retry','permissions','history','failure'];
const layers = ['persisted-command','credential-auth','browser','report-reconciliation','audit-history'];

export function validate(base = root) {
  const errors = [];
  const c = read(base, 'workflows/catalog.json');
  const rules = read(base, 'rules/rulebook.json');
  const tasks = new Set(read(base, 'batches/coverage.json').tasks.map(t => t.id));
  const profiles = new Set(read(base, 'profiles/business-profiles.json').profiles.map(p => p.id));
  const ruleMap = new Map(rules.rules.map(r => [r.id, r.revision]));
  required(c.schemaVersion === 1 && c.protocolVersion === '1.0.0', 'unsupported catalog/protocol version', errors);
  required(c.rulebookVersion === rules.rulebookVersion, 'catalog rulebook version drift: impact review required', errors);
  required(Array.isArray(c.specs) && c.specs.length > 0, 'empty catalog', errors);
  required(new Set(c.specs).size === c.specs.length, 'duplicate spec paths', errors);
  for (const p of c.overlays ?? []) required(profiles.has(p), 'unknown overlay '+p, errors);
  const specs = c.specs.map(file => {
    required(/^workflows\/specs\/WF-[A-Z]+-\d{3}\.json$/.test(file), 'unsafe/invalid spec path '+file, errors);
    if (!/^workflows\/specs\/WF-[A-Z]+-\d{3}\.json$/.test(file)) return {};
    return read(base, file);
  });
  const ids = new Set();
  for (const s of specs) {
    const p = s.id ?? '<missing-id>';
    required(/^WF-[A-Z]+-\d{3}$/.test(p) && !ids.has(p), 'invalid/duplicate workflow ID '+p, errors);
    ids.add(p);
    required(c.specs.includes('workflows/specs/'+p+'.json'), p+': filename/ID mismatch', errors);
    required(s.schemaVersion === 1 && Number.isInteger(s.revision) && s.revision > 0, p+': invalid revision/schema', errors);
    required(['draft','reviewed','retired'].includes(s.status), p+': invalid specification status', errors);
    required(['P0','P1','P2','P3'].includes(s.risk), p+': risk missing', errors);
    for (const k of ['title','author','scope','acceptance']) required(nonempty(s[k]), p+': missing '+k, errors);
    required(s.acceptance?.startsWith('not-assessed;'), p+': spec cannot claim candidate acceptance', errors);
    required(Array.isArray(s.profileIds) && s.profileIds.length > 0 && s.profileIds.every(x => profiles.has(x)), p+': unknown/missing profile', errors);
    required(Array.isArray(s.legacyTaskRefs) && s.legacyTaskRefs.length > 0 && s.legacyTaskRefs.every(x => tasks.has(x)), p+': unknown/missing legacy task', errors);
    required(Array.isArray(s.ruleRefs) && s.ruleRefs.length > 0 && s.ruleRefs.every(r => ruleMap.get(r.id) === r.revision), p+': unknown/stale rule revision', errors);
    required(Array.isArray(s.preconditions) && s.preconditions.length >= 1 && s.preconditions.every(nonempty), p+': missing preconditions', errors);
    required(Array.isArray(s.featureAreas) && s.featureAreas.length > 0, p+': missing impact tags', errors);
    required(s.fixture?.currency === 'LKR' && s.fixture?.moneyUnit === 'integer cents' && nonempty(s.fixture?.businessDate) && nonempty(s.fixture?.timezone) && nonempty(s.fixture?.taxProfile) && Object.keys(s.fixture?.settings ?? {}).length > 0 && Object.keys(s.fixture?.opening ?? {}).length > 0, p+': incomplete fixture', errors);
    required(Array.isArray(s.steps) && s.steps.length > 0, p+': missing steps', errors);
    const stepIds = new Set();
    for (const st of s.steps ?? []) {
      required(nonempty(st.id) && !stepIds.has(st.id), p+': duplicate/missing step ID', errors); stepIds.add(st.id);
      required(nonempty(st.action), p+': missing step action', errors);
      const e = st.expected;
      required(e && Array.isArray(e.journalLines) && Object.keys(e.closing ?? {}).length > 0 && Array.isArray(e.noChange) && e.noChange.length > 0 && nonempty(e.linksAndAudit), p+': step lacks outcome/unchanged/link assertions', errors);
      let debit = 0, credit = 0;
      for (const l of e?.journalLines ?? []) {
        required(nonempty(l.account) && ['debit','credit'].includes(l.side) && Number.isSafeInteger(l.cents) && l.cents > 0, p+': invalid expected journal line', errors);
        if (l.side === 'debit') debit += l.cents; else credit += l.cents;
      }
      required(debit === credit && Number.isSafeInteger(debit), p+': expected journal does not balance', errors);
      for (const [k,v] of Object.entries(e?.closing ?? {})) if (k.endsWith('Cents')) required(Number.isSafeInteger(v), p+': noninteger money '+k, errors);
    }
    const variantIds = new Set();
    for (const v of s.variants ?? []) {
      required(typeof v.id === 'string' && v.id.startsWith(p+'.V') && !variantIds.has(v.id), p+': invalid/duplicate variant ID', errors); variantIds.add(v.id);
      required(nonempty(v.category) && nonempty(v.trigger) && nonempty(v.expected) && Array.isArray(v.bugIds), p+': incomplete variant', errors);
    }
    for (const cat of categories) required((s.variants ?? []).some(v => v.category === cat), p+': missing risk category '+cat, errors);
    for (const layer of layers) required(s.requiredLayers?.includes(layer), p+': missing required layer '+layer, errors);
    required(Array.isArray(s.dependsOn) && Array.isArray(s.policyGaps), p+': dependency/policy list missing', errors);
    required(s.automation?.status === 'unbound' && Array.isArray(s.automation?.bindings) && s.automation.bindings.length === 0, p+': binding support unimplemented; no automation claim allowed', errors);
    if (s.status === 'reviewed') {
      required(nonempty(s.review?.qaReviewer) && s.review.qaReviewer !== s.author && nonempty(s.review?.businessOwner) && nonempty(s.review?.record), p+': missing independent QA/business review', errors);
      required((s.policyGaps ?? []).length === 0, p+': unresolved policy gaps cannot be reviewed-ready', errors);
      if (nonempty(s.review?.record)) required(fs.existsSync(path.join(base,s.review.record)) && s.review.record.startsWith('decisions/'), p+': review record missing', errors);
    }
  }
  const byId = new Map(specs.map(s => [s.id,s]));
  const visiting = new Set(), visited = new Set();
  function visit(id) {
    if (visiting.has(id)) { errors.push('workflow dependency cycle '+id); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const d of byId.get(id)?.dependsOn ?? []) {
      required(byId.has(d) && d !== id, id+': unknown/self dependency '+d, errors);
      if (byId.has(d) && d !== id) {
        required(!(byId.get(id)?.status !== 'retired' && byId.get(d)?.status === 'retired'), id+': active dependency retired '+d, errors);
        visit(d);
      }
    }
    visiting.delete(id); visited.add(id);
  }
  for (const id of byId.keys()) visit(id);
  return { errors, catalog:c, specs };
}

export function render(s) {
  const bullet = xs => xs.map(x => '- '+x).join('\n');
  const json = x => JSON.stringify(x);
  return '# '+s.id+' — '+s.title+'\n\nGenerated from workflows/specs/'+s.id+'.json; edit JSON, then run pnpm workflows:render.\n\n'
    +'Revision '+s.revision+'; specification **'+s.status+'**; automation **'+s.automation.status+'**; acceptance **not assessed**. This is a starter family, not full business coverage.\n\n'
    +'Profiles: '+s.profileIds.join(', ')+'. Existing lifecycle tasks: '+s.legacyTaskRefs.join(', ')+'.\n\n'
    +'Rules: '+s.ruleRefs.map(r=>r.id+'@'+r.revision).join(', ')+'. Account names are purposes; bind actual fixture accounts before execution.\n\n'
    +'## Scope and fixture\n\n'+s.scope+'\n\n'+json(s.fixture)+'\n\n'
    +'## Preconditions\n\n'+bullet(s.preconditions)+'\n\n'
    +'## Golden journey\n\n'+s.steps.map(st=>'### '+st.id+' — '+st.action+'\n\nExpected journals: '+json(st.expected.journalLines)+'\n\nClosing assertions: '+json(st.expected.closing)+'\n\nUnchanged: '+st.expected.noChange.join('; ')+'.\n\nLinks/history: '+st.expected.linksAndAudit).join('\n\n')+'\n\n'
    +'## Variant register\n\n'+s.variants.map(v=>'### '+v.id+' — '+v.category+'\n\nTrigger: '+v.trigger+'\n\nExpected: '+v.expected+'\n\nRelated bugs: '+(v.bugIds.join(', ')||'none mapped')).join('\n\n')+'\n\n'
    +'## Execution and review\n\nRequired layers: '+s.requiredLayers.join(', ')+'.\n\nPolicy/support gaps:\n\n'+(s.policyGaps.length?bullet(s.policyGaps):'- No extra policy gap declared; rulebook expert review and actual capability applicability still required.')+'\n\n'
    +'Independent QA reviewer: '+(s.review.qaReviewer??'pending')+'; business owner: '+(s.review.businessOwner??'pending')+'. No evidence is created by rendering this file.\n';
}

export function plan(specs, changed = []) {
  const known = new Set(specs.flatMap(s => [...s.featureAreas, ...s.ruleRefs.map(r => r.id)]));
  const broaden = changed.length === 0 || changed.some(x => !known.has(x));
  const selected = new Set(specs.filter(s => s.status !== 'retired' && (broaden || changed.some(x => s.featureAreas.includes(x) || s.ruleRefs.some(r => r.id === x)))).map(s => s.id));
  let grew = true;
  while (grew) { grew = false; for (const s of specs) if (s.status !== 'retired' && !selected.has(s.id) && s.dependsOn.some(d => selected.has(d))) { selected.add(s.id); grew = true; } }
  return { changed, broadenedForUnknownImpact:broaden, selected:[...selected].sort(), mandatoryCore:'Existing shared Batch A and critical candidate finance/auth/DB regressions remain required; this planner does not execute them.', acceptance:'not-established; human actual-diff impact review required' };
}

export function run(mode, base = root) {
  const result = validate(base);
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  const dir = path.join(base,'docs/workflows/playbooks');
  if (mode === 'render') fs.mkdirSync(dir,{recursive:true});
  if (mode === 'plan') return plan(result.specs, process.argv.slice(3));
  if (!['render','check'].includes(mode)) throw new Error('usage: node scripts/workflows.mjs render|check|plan [feature-area-or-rule-ID ...]');
  for (const s of result.specs) {
    const file = path.join(dir,s.id+'.md'), expected = render(s);
    if (mode === 'render') fs.writeFileSync(file,expected);
    else if (!fs.existsSync(file) || fs.readFileSync(file,'utf8') !== expected) throw new Error('stale/missing generated playbook '+s.id);
  }
  return {specifications:result.specs.length,steps:result.specs.reduce((n,s)=>n+s.steps.length,0),variants:result.specs.reduce((n,s)=>n+s.variants.length,0),businessAcceptance:'not-assessed',scope:'metadata/reference/generated-view validation only'};
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(run(process.argv[2]))); } catch (e) { console.error(e.message); process.exitCode=1; }
}

