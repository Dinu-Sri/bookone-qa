import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {authorizeSetup} from '../../scripts/v2526-setup-policy.mjs';
import {initialize,transition,guard} from '../../scripts/operator-queue.mjs';
import {assertExecutionDate} from '../../scripts/operator-desktop-cua.mjs';
const p=JSON.parse(fs.readFileSync('queues/MISSION-V2526-SETUP-20261112.json'));
const fp={productSha:p.productSha,qaSha:'a'.repeat(40),liveStamp:'v2.5.26 · e741a6a',rulesHash:'test',libraryHash:'test',schema:'test',actor:'test',configuration:'test',fixture:'test'};
const state=()=>{const s=initialize(p,fp);for(const c of s.cases)c.status='passed';s.cases.find(c=>c.id==='V12').status='running';return s;};
const review=()=>({caseId:'V12',url:'https://bookone.clossyan.com/company/sales',button:'Save VAT settings',actor:'vOwner',companyAlias:'V',observedAt:new Date().toISOString(),identityEvidence:'observed own V',formEvidence:'prepared VAT form',fieldSummary:'18% synthetic local TAX',preservationEvidence:'A/B untouched',noFinancialEffect:true,onlyNewFixtures:true,confirmationRequired:false});
test('finite setup mission forbids money, shift, archive and duplicate company capabilities',()=>{assert.equal(p.cases.length,33);assert.equal(new Set(p.cases.map(c=>c.id)).size,33);assert.ok(p.cases.every(c=>c.businessSubmission===false));const bs=p.cases.flatMap(c=>c.allowedButtons);for(const b of ['Post','Pay','Print','Open shift','Close shift & print Z','Create company','Archive','Apply entity tier'])assert.ok(!bs.includes(b));});
test('valid prepared own new-fixture setting is allowed; payment URL and protected company are refused',()=>{authorizeSetup(p,state(),'V12',review().url,review().button,review());for(const change of [{companyAlias:'A'},{actor:'platformAdmin'},{noFinancialEffect:false},{onlyNewFixtures:false}])assert.throws(()=>authorizeSetup(p,state(),'V12',review().url,review().button,{...review(),...change}));assert.throws(()=>authorizeSetup(p,state(),'V12','https://bookone.clossyan.com/sales/payments','Save VAT settings',review()));});
test('stale form, pending confirmation, wrong button and missing evidence refuse',()=>{for(const change of [{observedAt:'2026-01-01T00:00:00Z'},{confirmationRequired:true,confirmationReceived:false},{identityEvidence:''},{confirmationRequired:undefined}])assert.throws(()=>authorizeSetup(p,state(),'V12',review().url,review().button,{...review(),...change}));assert.throws(()=>authorizeSetup(p,state(),'V12',review().url,'Post',review()));});
test('unpassed setup dependency and consumed setting cap refuse repeat',()=>{const s=state();s.cases.find(c=>c.id==='V11').status='blocked';assert.throws(()=>authorizeSetup(p,s,'V12',review().url,review().button,review()));const t=state();t.cases.find(c=>c.id==='V12').submissions=[{submissionId:'used',outcome:'accepted'}];assert.throws(()=>authorizeSetup(p,t,'V12',review().url,review().button,review()));});
test('active contract changes and later-day/rollover actions refuse',()=>{const s=initialize(p,fp),changed=structuredClone(p);changed.cases[0].allowedButtons=['Post'];assert.throws(()=>guard(changed,s,fp));assertExecutionDate(p,Date.parse('2026-11-12T04:00:00Z'));assert.throws(()=>assertExecutionDate(p,Date.parse('2026-11-13T00:00:00Z')));assert.throws(()=>assertExecutionDate(p,Date.parse('2026-11-12T23:55:00Z')));});
test('an unresolved setup intent blocks another write and closing acceptance',()=>{let s=initialize(p,fp);s=transition(p,s,fp,'start','V07');s=transition(p,s,fp,'intent','V07',{submissionId:'unknown',action:'Create an account'});assert.throws(()=>transition(p,s,fp,'intent','V07',{submissionId:'again',action:'Create an account'}));assert.throws(()=>transition(p,s,fp,'record','V07',{status:'passed',actual:'click returned',evidence:{observations:'x',sourceAndBindings:'x',journalAndStock:'x',preservation:'x'}}));});
test('CLI persists reviewed setup intent once; disallowed financial request leaves no intent',()=>{
  // Spawned CLI uses real time. Frozen historical missions must refuse on another day.
  fs.mkdirSync('.local',{recursive:true});
  const dir=fs.mkdtempSync(path.resolve('.local','setup-control-test-'));
  const run=(...args)=>spawnSync(process.execPath,['scripts/v2526-setup-run.mjs',...args],{encoding:'utf8'});
  const target=path.join(dir,'run'),init=run('init',target);
  if(new Date().toISOString().slice(0,10)!==p.dateContract.executionDate||Date.now()>=Date.parse(p.dateContract.executionDate+'T23:55:00Z')){assert.notEqual(init.status,0);return;}
  assert.equal(init.status,0,init.stderr);
  const st=JSON.parse(fs.readFileSync(path.join(target,'state.json')));
  for(const c of st.cases)c.status=c.id==='V12'?'pending':'passed';
  fs.writeFileSync(path.join(target,'state.json'),JSON.stringify(st));
  const rev=path.join(dir,'review.json');fs.writeFileSync(rev,JSON.stringify(review()));
  const bad=run('request',target,'V12','bad',review().url,'Post',rev);
  assert.notEqual(bad.status,0);assert.equal(JSON.parse(fs.readFileSync(path.join(target,'state.json'))).events.length,0);
  const ok=run('request',target,'V12','one',review().url,review().button,rev);
  assert.equal(ok.status,0,ok.stderr);
  const request=JSON.parse(fs.readFileSync(path.join(target,'one.request.json')));
  assert.equal(request.submissionId,'one');
  assert.match(JSON.parse(fs.readFileSync(path.join(target,'state.json'))).cases.find(c=>c.id==='V12').submissions[0].action,/preparedReviewHash=[a-f0-9]{64}/);
  assert.notEqual(run('request',target,'V12','one',review().url,review().button,rev).status,0);
  // File-side test only. No request is ever dispatched; retain ignored evidence.
});
