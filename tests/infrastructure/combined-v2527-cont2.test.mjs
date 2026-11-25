import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {authorizeCombined} from '../../scripts/combined-v2527-policy.mjs';

const read = p => JSON.parse(fs.readFileSync(new URL('../../'+p, import.meta.url)));
const old = read('queues/MISSION-COMBINED-V2527-CONT1-20261112.json');
const next = read('queues/MISSION-COMBINED-V2527-CONT2-20261112.json');

test('successor changes only the four observed contribution labels', () => {
  assert.equal(next.cases.length, 80);
  const changed = [];
  for (let i=0; i<old.cases.length; i++) {
    const before = structuredClone(old.cases[i]), after = structuredClone(next.cases[i]);
    if (JSON.stringify(before.allowedButtons) !== JSON.stringify(after.allowedButtons)) {
      changed.push(after.id);
      assert.deepEqual(before.allowedButtons, ['Record Money In']);
      assert.deepEqual(after.allowedButtons, ['Record contribution']);
      assert.equal(after.invoiceKind, 'none');
      before.allowedButtons = after.allowedButtons;
    }
    assert.deepEqual(after, before);
  }
  assert.deepEqual(changed, ['E01','E24','E25','E38']);
  assert.equal(next.cases.filter(c=>c.oracleEvent).length,48);
  assert.equal(next.cases.filter(c=>c.oracleEvent?.lines.length).length,38);
  assert.equal(next.oracle,old.oracle);
  assert.deepEqual(next.dateContract,old.dateContract);
});

test('funding guard accepts only reviewed contribution control, not sale or generic label', () => {
  for (const id of ['E01','E24','E25','E38']) {
    const c=next.cases.find(c=>c.id===id);
    const state={cases:next.cases.map(x=>({id:x.id,status:'passed'}))};
    state.cases.find(x=>x.id===id).status='running';
    const url='https://bookone.clossyan.com/';
    const review={caseId:id,url,button:'Record contribution',actor:c.actor,companyAlias:c.companyAlias,
      observedAt:new Date().toISOString(),identityEvidence:'owner',formEvidence:'contribution form',fieldSummary:'reviewed',preservationEvidence:'opening',
      oracleEventId:c.oracleEvent.id,expectedLines:c.oracleEvent.lines,fields:c.fields,issueDate:'2026-11-12',dueDate:'2026-11-14',
      protectedSourcesUnchanged:true,onlyRunOwnedSources:true,sourceCapsVerified:true,invoiceKind:'none',saleChannel:'local',confirmationRequired:false};
    assert.equal(authorizeCombined(next,state,id,url,review.button,review).auth,false);
    for(const button of ['Record Money In','Record sale','Record customer payment']) {
      assert.throws(()=>authorizeCombined(next,state,id,url,button,{...review,button}));
    }
  }
});
