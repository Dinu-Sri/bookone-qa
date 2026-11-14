import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate, run, plan } from '../../scripts/workflows.mjs';
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'bookone-workflow-'));
  t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
  for (const p of ['workflows','rules','batches','profiles']) fs.cpSync(path.join(source,p),path.join(dir,p),{recursive:true});
  return dir;
}
function change(dir,fn) { const p=path.join(dir,'workflows/specs/WF-PHY-001.json');const x=JSON.parse(fs.readFileSync(p,'utf8'));fn(x);fs.writeFileSync(p,JSON.stringify(x)); }
test('starter specification metadata validates without acceptance claims',()=>{assert.deepEqual(validate().errors,[]);});
test('rejects stale rule revision',t=>{const d=fixture(t);change(d,x=>x.ruleRefs[0].revision=999);assert.match(validate(d).errors.join(' '),/stale rule/);});
test('rejects missing expected outcome and incomplete negative coverage',t=>{const d=fixture(t);change(d,x=>{delete x.steps[0].expected;x.variants=x.variants.filter(v=>v.category!=='permissions');});const e=validate(d).errors.join(' ');assert.match(e,/lacks outcome/);assert.match(e,/risk category permissions/);});
test('rejects unbalanced independent expected journal',t=>{const d=fixture(t);change(d,x=>x.steps[1].expected.journalLines[0].cents++);assert.match(validate(d).errors.join(' '),/does not balance/);});
test('rejects noninteger money and unknown inherited task',t=>{const d=fixture(t);change(d,x=>{x.steps[0].expected.closing.badCents=1.5;x.legacyTaskRefs.push('UNKNOWN');});const e=validate(d).errors.join(' ');assert.match(e,/noninteger money/);assert.match(e,/legacy task/);});
test('rejects invented acceptance and self-review',t=>{const d=fixture(t);change(d,x=>{x.acceptance='accepted';x.status='reviewed';x.review.qaReviewer=x.author;});const e=validate(d).errors.join(' ');assert.match(e,/cannot claim/);assert.match(e,/independent QA/);});
test('rejects dependency cycles',t=>{const d=fixture(t);change(d,x=>x.dependsOn=['WF-SVC-001']);const p=path.join(d,'workflows/specs/WF-SVC-001.json');const x=JSON.parse(fs.readFileSync(p,'utf8'));x.dependsOn=['WF-PHY-001'];fs.writeFileSync(p,JSON.stringify(x));assert.match(validate(d).errors.join(' '),/cycle/);});
test('check fails for stale generated view',t=>{const d=fixture(t);run('render',d);const p=path.join(d,'docs/workflows/playbooks/WF-PHY-001.md');fs.appendFileSync(p,'unexpected');assert.throws(()=>run('check',d),/stale/);});
test('rejects unimplemented executable binding claim',t=>{const d=fixture(t);change(d,x=>x.automation={status:'implemented',bindings:['made-up']});assert.match(validate(d).errors.join(' '),/binding support unimplemented/);});
test('impact selection adds hybrid dependency and broadens unknown changes',()=>{const specs=validate().specs;const p=plan(specs,['BR-PUR-02']);assert.deepEqual(p.selected,['WF-HYB-001','WF-PHY-001']);assert.equal(plan(specs,['new-unmapped-feature']).selected.length,specs.length);assert.equal(plan(specs,[]).broadenedForUnknownImpact,true);});

