import test from 'node:test';
import assert from 'node:assert/strict';
import {initialize,transition,report} from '../../scripts/operator-queue.mjs';
const plan={schemaVersion:1,id:'pilot',candidate:'v2.5.15',cases:['A','B'].map(id=>({id,expected:'10',precondition:'fresh isolated fixture',evidence:['document','journal']}))};
const fp={productSha:'a'.repeat(40),qaSha:'b'.repeat(40),liveStamp:'v2.5.15 · aaaaaaa',rulesHash:'rules',libraryHash:'library',schema:'1',configuration:'x',actor:'synthetic',fixture:'run1'};
test('zero discovery and duplicate IDs fail',()=>{assert.throws(()=>initialize({...plan,cases:[]},fp));assert.throws(()=>initialize({...plan,cases:[plan.cases[0],plan.cases[0]]},fp));});
test('missing fingerprint and wrong candidate fail',()=>{assert.throws(()=>initialize(plan,{...fp,actor:''}));assert.throws(()=>initialize(plan,{...fp,liveStamp:'v2.5.14'}));});
test('interrupted financial intent blocks another start and pack directs readback',()=>{const s=transition(plan,initialize(plan,fp),fp,'start','A');assert.equal(report(plan,s,fp).next,null);assert.deepEqual(report(plan,s,fp).unresolved,['A']);assert.throws(()=>transition(plan,s,fp,'start','B'));assert.throws(()=>transition(plan,s,fp,'start','A'));});
test('failed case preserved; independent pending case continues',()=>{let s=transition(plan,initialize(plan,fp),fp,'start','A');s=transition(plan,s,fp,'record','A',{status:'failed',actual:'wrong amount',evidence:{document:'synthetic ref'},nextAction:'Medium review'});assert.equal(report(plan,s,fp).next,'B');assert.throws(()=>transition(plan,s,fp,'start','A'));assert.equal(transition(plan,s,fp,'start','B').cases[0].status,'failed');});
test('passed disposition needs every required evidence layer',()=>{const s=transition(plan,initialize(plan,fp),fp,'start','A');assert.throws(()=>transition(plan,s,fp,'record','A',{status:'passed',actual:'10',evidence:{document:'doc'}}));});
test('changed configuration, QA revision or plan refuses resume',()=>{const s=initialize(plan,fp);for(const patch of [{configuration:'changed'},{qaSha:'c'.repeat(40)}])assert.throws(()=>report(plan,s,{...fp,...patch}));assert.throws(()=>report({...plan,cases:plan.cases.slice(1)},s,fp));});
test('inconclusive is never a pass; completed ledger does not imply acceptance',()=>{let s=initialize(plan,fp);for(const id of ['A','B']){s=transition(plan,s,fp,'start',id);s=transition(plan,s,fp,'record',id,{status:'inconclusive',actual:'no readback',evidence:{},nextAction:'read persisted state'});}const r=report(plan,s,fp);assert.equal(r.counts.passed,0);assert.equal(r.next,null);assert.equal(r.releaseAcceptance,'not-established');});

test('result cannot replace stable ID or erase event history',()=>{let s=transition(plan,initialize(plan,fp),fp,'start','A');s=transition(plan,s,fp,'record','A',{id:'forged',status:'passed',actual:'10',evidence:{document:'10',journal:'10'}});assert.equal(s.cases[0].id,'A');assert.equal(s.events.length,2);});

test('published pilot and evidence index have real stable workbook references',async()=>{
 const {readFileSync,readdirSync}=await import('node:fs');
 const read=p=>JSON.parse(readFileSync(new URL('../../'+p,import.meta.url),'utf8'));
 const pilot=read('queues/PILOT-v2515.json');
 const ids=new Set(readdirSync(new URL('../../workflows/casebooks/',import.meta.url)).filter(f=>f.endsWith('.json')).flatMap(f=>read('workflows/casebooks/'+f).journeys.flatMap(j=>j.cases.map(c=>c.id))));
 const entries=read('coverage/browser-evidence-index.json').entries;
 // The first347 historical assertions are an immutable baseline; later mission
 // dispositions append to the index and are not additional atomic assertions.
 assert.ok(entries.length>=347);
 const historical=entries.slice(0,347);
 assert.equal(new Set(historical.map(r=>r.run+'#'+r.assertion)).size,347);
 assert.equal(historical.filter(r=>r.mapping==='unmapped').length,336);
 assert.equal(new Set(entries.map(r=>r.run+'#'+r.assertion)).size,entries.length);
 for(const r of entries){assert.equal(r.fullCaseAcceptance,false);for(const id of r.relatedWorkbookCases)assert.ok(ids.has(id),id);}
 for(const c of pilot.cases)for(const id of c.relatedWorkbookCases)assert.ok(ids.has(id),id);
 assert.equal(pilot.cases.length,12);
});

