import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, load, render } from '../../scripts/ux-workbook.mjs';
const state = load();
function reject(change, pattern) {
  const x = structuredClone(state.data), inv = structuredClone(state.inventory);
  change(x,inv);
  assert.throws(() => validate(x,inv,state.journeys),pattern);
}
test('authoring contract and all rules map to browser workflows', () => {
  assert.deepEqual(validate(state.data,state.inventory,state.journeys),{rules:32,workflows:48,groups:12,status:'structurally-valid-not-executed'});
});
test('rejects duplicate IDs and dangling business/rule references', () => {
  reject(x => x.cases[1].id = x.cases[0].id,/Duplicate/);
  reject(x => x.cases[0].journeyRefs = ['WB-NO.J99'],/Unknown business journey/);
  reject(x => x.cases[0].ruleRefs = ['UX-999'],/Unknown rule/);
});
test('rejects invented execution, review and adapter acceptance', () => {
  reject(x => x.cases[0].execution = 'passed',/Invented/);
  reject(x => x.cases[0].binding = 'implemented',/Invented/);
  reject(x => x.rules[0].review = 'approved',/Unsupported rule approval/);
});
test('rejects incomplete expectations and missing evidence layer', () => {
  reject(x => x.cases[0].expected = '',/missing expected/);
  reject(x => x.cases[0].unchanged = '',/missing unchanged/);
  reject(x => x.cases[0].layers = ['persisted'],/browser layer/);
  reject(x => x.cases[0].steps = [],/steps/);
});
test('rejects unassigned questions, stale pins and orphan rules', () => {
  reject((x,i) => i.conflicts[0].owner = '',/Incomplete unresolved/);
  reject((x,i) => i.productStudySha = '0'.repeat(40),/pin mismatch/);
  reject(x => x.rules.push({...x.rules[0],id:'UX-999'}),/Unmapped rule/);
});
test('generated view states unrun boundary and retains financial expectations', () => {
  const text = render(state.data);
  assert.match(text,/draft, unbound and not-run/);
  assert.match(text,/256.50/);
  assert.match(text,/OBS-M18-SPLIT-RETURN-PRICE/);
});

