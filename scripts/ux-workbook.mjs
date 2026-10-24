import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nonempty = x => typeof x === 'string' && x.trim().length > 0;
const unique = xs => new Set(xs).size === xs.length;
const assert = (ok, message) => { if (!ok) throw new Error(message); };
export function validate(data, inventory, journeys) {
  assert(data.schemaVersion === 1 && inventory.schemaVersion === 1, 'Unsupported schema');
  assert(/^\d+\.\d+\.\d+$/.test(data.version), 'Invalid version');
  assert(/^[a-f0-9]{40}$/.test(data.qaBase) && /^[a-f0-9]{40}$/.test(data.productStudySha), 'Missing source pin');
  assert(data.productStudySha === inventory.productStudySha && data.qaBase === inventory.qaBase, 'Inventory pin mismatch');
  assert(data.canonicalBusinessCasesUnchanged === 272 && data.businessLibraryVersion === '1.5.0', 'Business library contract requires reviewed update');
  assert(data.rules.length > 0 && data.cases.length > 0, 'Empty workbook');
  assert(unique(data.rules.map(r => r.id)) && unique(data.cases.map(c => c.id)), 'Duplicate IDs');
  const ruleIds = new Set(data.rules.map(r => r.id));
  const used = new Set();
  for (const r of data.rules) {
    assert(/^UX-\d{3}$/.test(r.id) && Number.isInteger(r.revision) && r.revision > 0, 'Invalid rule identity');
    for (const k of ['category','title','expectation','basis','source']) assert(nonempty(r[k]), r.id + ' missing ' + k);
    assert(['product','bookone','wcag','heuristic','mixed'].includes(r.basis), 'Invalid rule authority');
    assert(r.adoption === 'owner-requested-default' && r.review === 'independent-review-pending', 'Unsupported rule approval claim');
  }
  const layers = new Set(['keyboard','browser','persisted','journal','isolated-fault','reports','stock','fleet','screen-reader','measurement','authorization','storage','upgrade','recovery']);
  for (const c of data.cases) {
    assert(/^UXW-\d{3}$/.test(c.id) && Number.isInteger(c.revision) && c.revision > 0, 'Invalid workflow identity');
    assert(c.status === 'draft' && c.binding === 'unbound' && c.execution === 'not-run', 'Invented review/binding/execution claim: ' + c.id);
    for (const k of ['group','title','fixture','expected','unchanged','preflight','failureHandling','cleanup']) assert(nonempty(c[k]), c.id + ' missing ' + k);
    assert(['P0','P1','P2','P3'].includes(c.priority), 'Missing priority');
    assert(c.ruleRefs.length > 0 && unique(c.ruleRefs), 'Missing/duplicate rule refs');
    for (const id of c.ruleRefs) { assert(ruleIds.has(id), 'Unknown rule ' + id); used.add(id); }
    assert(c.journeyRefs.length > 0 && unique(c.journeyRefs), 'Missing/duplicate journey refs');
    for (const id of c.journeyRefs) assert(journeys.has(id), 'Unknown business journey ' + id);
    assert(c.layers.length > 0 && unique(c.layers) && c.layers.includes('browser'), 'Missing required browser layer');
    for (const id of c.layers) assert(layers.has(id), 'Unknown evidence layer ' + id);
    assert(c.steps.length >= 2 && unique(c.steps.map(s => s.id)), 'Missing/duplicate steps');
    for (const s of c.steps) assert(/^S\d+$/.test(s.id) && nonempty(s.action), 'Invalid action step');
  }
  for (const id of ruleIds) assert(used.has(id), 'Unmapped rule ' + id);
  assert(unique(inventory.references.map(r => r.id)) && inventory.references.length > 0, 'Invalid inventory');
  for (const r of inventory.references) assert(nonempty(r.path) && nonempty(r.observation), 'Incomplete design inventory');
  for (const q of inventory.conflicts) for (const k of ['id','owner','issue','decision','next']) assert(nonempty(q[k]), 'Incomplete unresolved design question');
  return { rules: data.rules.length, workflows: data.cases.length, groups: new Set(data.cases.map(c => c.group)).size, status: 'structurally-valid-not-executed' };
}
export function render(data) {
  const lines = [
    '# BookOne UI/UX acceptance workbook — ' + data.version,
    '',
    '> GENERATED from ux/workbook.json. Edit the JSON and run pnpm ux:render. Every workflow remains draft, unbound and not-run. This is an additive companion to the eight business books, not another design system or proof of product compliance.',
    '',
    'Source study: BookOne ' + data.productStudySha + '; QA base ' + data.qaBase + '. Business library1.5.0 retains272 cases unchanged. Read [protocol](PROTOCOL.md), [design inventory](DESIGN_INVENTORY.md) and [execution](EXECUTION.md) first.',
    '',
    '## Shared acceptance rules',
    '',
    '| ID | Area | Rule | Basis |',
    '|---|---|---|---|',
    ...data.rules.map(r => '| ' + r.id + ' | ' + r.category + ' | ' + r.title + ' | ' + r.basis + ' |'),
    ''
  ];
  for (const r of data.rules) lines.push('### ' + r.id + ' — ' + r.title, '', r.expectation, '', 'Source: ' + r.source + '. Revision' + r.revision + '; owner-requested default, independent review pending.', '');
  lines.push('## Workflow index', '', '| ID | Group | Workflow |', '|---|---|---|', ...data.cases.map(c => '| ' + c.id + ' | ' + c.group + ' | ' + c.title + ' |'), '');
  for (const c of data.cases) lines.push(
    '### ' + c.id + ' — ' + c.title, '',
    'Revision' + c.revision + '; ' + c.priority + '; draft/unbound/not-run. Business journeys: ' + c.journeyRefs.join(', ') + '. Rules: ' + c.ruleRefs.join(', ') + '.', '',
    '**Given:** ' + c.fixture, '',
    '**Preflight:** ' + c.preflight, '',
    ...c.steps.map((s,i) => (i+1) + '. ' + s.action), '',
    '**Expected:** ' + c.expected, '',
    '**Unchanged:** ' + c.unchanged, '',
    '**Required layers:** ' + c.layers.join(', ') + '.', '',
    '**Failure handling:** ' + c.failureHandling, '',
    '**Close:** ' + c.cleanup, ''
  );
  return lines.join('\n') + '\n';
}
export function renderInventory(inv) {
  return [
    '# Existing BookOne design references — source audit', '',
    '> GENERATED from ux/design-inventory.json; no live compliance audit claimed.', '',
    'Product pin: ' + inv.productStudySha + '; date ' + inv.date + '.', '',
    ...inv.references.flatMap(r => ['## ' + r.id + ' — ' + r.path, '', r.observation, '']),
    '## Unresolved questions', '',
    ...inv.conflicts.flatMap(q => ['### ' + q.id, '', q.issue, '', 'Owner: ' + q.owner + '. Decision: ' + q.decision + '. Next: ' + q.next, ''])
  ].join('\n') + '\n';
}
export function load(base = root) {
  const read = p => JSON.parse(fs.readFileSync(path.join(base,p),'utf8'));
  const data = read('ux/workbook.json'), inventory = read('ux/design-inventory.json');
  const library = read('workflows/library.json');
  const books = library.books.map(read);
  const journeys = new Set(books.flatMap(b => b.journeys.map(j => j.id)));
  const count = books.reduce((n,b) => n + b.journeys.reduce((m,j) => m + j.cases.length,0),0);
  assert(library.libraryVersion === data.businessLibraryVersion && count === data.canonicalBusinessCasesUnchanged, 'Stale business library pin/count');
  return { data, inventory, journeys };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2] || 'check';
  const { data, inventory, journeys } = load();
  const result = validate(data, inventory, journeys);
  const outputs = new Map([
    ['docs/ux/WORKBOOK.md',render(data)],
    ['docs/ux/DESIGN_INVENTORY.md',renderInventory(inventory)]
  ]);
  if (mode === 'render') for (const [p,content] of outputs) {
    fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});
    fs.writeFileSync(path.join(root,p),content);
  } else if (mode === 'check') for (const [p,content] of outputs) {
    assert(fs.existsSync(path.join(root,p)) && fs.readFileSync(path.join(root,p),'utf8') === content, 'Stale generated view: ' + p);
  } else if (mode === 'plan') {
    const query = process.argv.slice(3);
    const matched = data.cases.filter(c => query.some(q => c.id === q || c.group === q || c.ruleRefs.includes(q) || c.journeyRefs.includes(q)));
    const unknown = query.some(q => !data.cases.some(c => c.id === q || c.group === q || c.ruleRefs.includes(q) || c.journeyRefs.includes(q)));
    const selected = !query.length || unknown ? data.cases : data.cases.filter(c => c.group === 'shared' || matched.includes(c));
    console.log(JSON.stringify({note:'Selection aid only; unknown broadens all. Review actual diff and transitive shared consumers. No execution or acceptance.',ids:selected.map(c => c.id)},null,2));
  } else throw new Error('Use render, check or plan [rule/workflow/group/journey]');
  console.log(JSON.stringify(result));
}

