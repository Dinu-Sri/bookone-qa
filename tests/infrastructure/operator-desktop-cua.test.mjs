import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {initialize,transition} from '../../scripts/operator-queue.mjs';
import {openClock} from '../../scripts/operator-clock.mjs';
import {assertExecutionDate,desktopSourceHashes,dispatchPersistedDesktopAction} from '../../scripts/operator-desktop-cua.mjs';
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v));
const read=p=>JSON.parse(fs.readFileSync(p));
function fixture(kind='title'){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'desktop-cua-'));
 const plan={schemaVersion:1,id:'desktop-inert',candidate:'v1.0.0',productSha:'a'.repeat(40),cases:[{id:'proof',precondition:'synthetic',expected:'inert',evidence:['title']}]};
 const fp={productSha:plan.productSha,qaSha:'b'.repeat(40),liveStamp:'v1.0.0 · aaaaaaa',rulesHash:'synthetic',libraryHash:'synthetic',schema:'synthetic',configuration:'synthetic',actor:'synthetic',fixture:'synthetic'};
 let state=transition(plan,initialize(plan,fp),fp,'start','proof');state=transition(plan,state,fp,'intent','proof',{submissionId:'once',action:'inert'});
 const req={plan:'plan.json',state:'state.json',fingerprint:'fp.json',clock:'clock.json',script:'action.json',caseId:'proof',submissionId:'once',commandExitCode:0,desktopSources:desktopSourceHashes()};
 for(const [p,v]of Object.entries({'plan.json':plan,'state.json':state,'fp.json':fp,'clock.json':openClock(120,20),'request.json':req,'action.json':{kind,url:'https://bookone.clossyan.com/',...(kind==='click'?{role:'button',name:'Synthetic submit'}:{})}}))write(path.join(dir,p),v);
 let calls=0;const tab={url:async()=> 'https://bookone.clossyan.com/',title:async()=>{calls++;return 'BookOne';},playwright:{getByRole:()=>({count:async()=>1,isVisible:async()=>true,isEnabled:async()=>true,click:async()=>{calls++;}}),domSnapshot:async()=> 'synthetic immediate feedback'}};
 return {dir,requestPath:path.join(dir,'request.json'),tab,calls:()=>calls,claims:()=>fs.existsSync(path.join(dir,'dispatches'))?fs.readdirSync(path.join(dir,'dispatches')).length:0};
}
const execute=f=>dispatchPersistedDesktopAction(f);
test('title is one actual bound API call and durable consumed claim; replay refuses',async()=>{
 const f=fixture(),r=await execute(f);assert.equal(r.executed,true);assert.equal(r.result.title,'BookOne');assert.equal(r.uiCalls,1);assert.equal(f.calls(),1);assert.equal(f.claims(),1);
 const receipt=read(path.join(f.dir,'dispatches',fs.readdirSync(path.join(f.dir,'dispatches'))[0]));assert.equal(receipt.status,'consumed');assert.equal(receipt.uncertain,false);assert.equal(JSON.stringify(receipt).includes('BookOne'),false);
 const clock=read(path.join(f.dir,'clock.json'));assert.ok(clock.lastAt>=r.chargedClock.lastAt);
 assert.equal((await execute(f)).executed,false);assert.equal(f.calls(),1);assert.equal(f.claims(),1);
});
for(const [label,change]of [
 ['exit',f=>{const p=path.join(f.dir,'request.json'),v=read(p);v.commandExitCode=1;write(p,v);}],
 ['intent',f=>{const p=path.join(f.dir,'state.json'),v=read(p);delete v.cases[0].submissions;write(p,v);}],
 ['fingerprint',f=>{const p=path.join(f.dir,'fp.json'),v=read(p);v.actor='changed';write(p,v);}],
 ['clock',f=>{const p=path.join(f.dir,'clock.json'),v=read(p);v.chargedMs=100*60000;write(p,v);}],
 ['adapter hash',f=>{const p=path.join(f.dir,'request.json'),v=read(p);v.desktopSources['scripts/operator-desktop-cua.mjs']='0'.repeat(64);write(p,v);}],
 ['wrong URL',f=>{f.tab.url=async()=> 'https://example.com/';}],
 ['wrong origin',f=>{const p=path.join(f.dir,'action.json'),v=read(p);v.url='https://example.com/';write(p,v);}],
 ['arbitrary code',f=>{write(path.join(f.dir,'action.json'),{kind:'javascript',url:'https://bookone.clossyan.com/',code:'unsafe'});}],
 ['dependency',f=>{const p=path.join(f.dir,'plan.json'),v=read(p);v.cases[0].dependsOn=['missing'];write(p,v);}]
])test(label+' refuses with zero actual calls and zero claims',async()=>{const f=fixture();change(f);const r=await execute(f);assert.equal(r.executed,false);assert.equal(r.uiCalls,0);assert.equal(f.calls(),0);assert.equal(f.claims(),0);});
test('named enabled unique button dispatches once and stores immediate feedback privately',async()=>{const f=fixture('click'),r=await execute(f);assert.equal(r.executed,true);assert.equal(f.calls(),1);assert.equal(fs.readdirSync(f.dir).filter(p=>p.endsWith('.private-feedback.json')).length,1);});
test('ambiguous button refuses before claim',async()=>{const f=fixture('click');f.tab.playwright.getByRole=()=>({count:async()=>2});const r=await execute(f);assert.equal(r.executed,false);assert.equal(f.calls(),0);assert.equal(f.claims(),0);});
test('late page change consumes claim with no action; never replay',async()=>{const f=fixture();let urls=0;f.tab.url=async()=>++urls===1?'https://bookone.clossyan.com/':'https://bookone.clossyan.com/changed';const r=await execute(f);assert.equal(r.executed,false);assert.equal(r.uiCalls,0);assert.equal(f.claims(),1);assert.equal((await execute(f)).executed,false);assert.equal(f.calls(),0);});
test('clock expires during final URL observation: consumed but zero actual dispatches',async()=>{const f=fixture();let urls=0;f.tab.url=async()=>{if(++urls===2){const p=path.join(f.dir,'clock.json'),v=read(p);v.chargedMs=100*60000;write(p,v);}return 'https://bookone.clossyan.com/';};const r=await execute(f);assert.equal(r.executed,false);assert.equal(f.calls(),0);assert.equal(f.claims(),1);});
test('exception after actual call remains consumed and uncertain',async()=>{const f=fixture();f.tab.title=async()=>{throw Error('lost response');};const r=await execute(f);assert.equal(r.executed,false);assert.equal(r.uiCalls,1);assert.equal(r.uncertain,true);assert.equal(f.claims(),1);});
test('persisted state changes after claim: zero calls and consumed',async()=>{const f=fixture();let urls=0;f.tab.url=async()=>{if(++urls===2){const p=path.join(f.dir,'state.json'),v=read(p);v.cases[0].submissions[0].outcome='accepted';write(p,v);}return 'https://bookone.clossyan.com/';};const r=await execute(f);assert.equal(r.executed,false);assert.equal(f.calls(),0);assert.equal(f.claims(),1);});
test('durable final clock exists before a click is sent',async()=>{const f=fixture('click');let seen=false;f.tab.playwright.getByRole=()=>({count:async()=>1,isVisible:async()=>true,isEnabled:async()=>true,click:async()=>{const c=read(path.join(f.dir,'clock.json'));assert.ok(c.chargedMs>=0);assert.ok(c.lastAt>=read(path.join(f.dir,'dispatches',fs.readdirSync(path.join(f.dir,'dispatches'))[0])).claimedAt);seen=true;}});const r=await execute(f);assert.equal(r.executed,true);assert.equal(seen,true);});
test('finish failure after title refuses success and prevents replay',async()=>{const f=fixture();f.tab.title=async()=>{const p=path.join(f.dir,'dispatches',fs.readdirSync(path.join(f.dir,'dispatches'))[0]),v=read(p);v.completedAt=Date.now();write(p,v);return 'BookOne';};const r=await execute(f);assert.equal(r.executed,false);assert.equal(r.uncertain,true);assert.equal(r.uiCalls,1);assert.equal((await execute(f)).executed,false);});

const datePlan={dateContract:{mode:'fixed-utc-day',executionDate:'2030-01-02',stopBeforeMidnightMinutes:5}};
test('fixed UTC date accepts start and final safe millisecond independently of local timezone',()=>{assert.doesNotThrow(()=>assertExecutionDate(datePlan,Date.parse('2030-01-02T00:00:00Z')));assert.doesNotThrow(()=>assertExecutionDate(datePlan,Date.parse('2030-01-02T23:54:59.999Z')));});
for(const stamp of ['2030-01-01T23:59:59.999Z','2030-01-02T23:55:00Z','2030-01-02T23:59:59Z','2030-01-03T00:00:00Z'])test('UTC date/rollover refuses '+stamp,()=>assert.throws(()=>assertExecutionDate(datePlan,Date.parse(stamp)),/UTC|rollover/));
test('malformed calendar date and weakened reserve refuse',()=>{for(const change of [{executionDate:'2030-02-30'},{executionDate:'today'},{stopBeforeMidnightMinutes:0},{mode:'floating'}])assert.throws(()=>assertExecutionDate({dateContract:{...datePlan.dateContract,...change}},Date.parse('2030-01-02T12:00:00Z')));});
test('continuation family cannot bypass exact button allowlist',async()=>{const f=fixture('click'),p=read(path.join(f.dir,'plan.json'));p.id='MISSION-v2522-RAPID-01-CONT1';write(path.join(f.dir,'plan.json'),p);const fp=read(path.join(f.dir,'fp.json'));let state=transition(p,initialize(p,fp),fp,'start','proof');state=transition(p,state,fp,'intent','proof',{submissionId:'once',action:'inert'});write(path.join(f.dir,'state.json'),state);const r=await execute(f);assert.equal(r.executed,false);assert.equal(f.calls(),0);assert.equal(f.claims(),0);assert.match(r.reason,/not approved/);});
test('UTC rollover reached after claim refuses final dispatch with consumed claim',async(t)=>{let now=Date.parse('2030-01-02T23:54:59.999Z');t.mock.method(Date,'now',()=>now);const f=fixture(),p=read(path.join(f.dir,'plan.json'));p.dateContract=datePlan.dateContract;write(path.join(f.dir,'plan.json'),p);const fp=read(path.join(f.dir,'fp.json'));let state=transition(p,initialize(p,fp),fp,'start','proof');state=transition(p,state,fp,'intent','proof',{submissionId:'once',action:'inert'});write(path.join(f.dir,'state.json'),state);let calls=0;f.tab.url=async()=>{if(++calls===2)now++;return 'https://bookone.clossyan.com/';};const r=await execute(f);assert.equal(r.executed,false);assert.match(r.reason,/rollover/);assert.equal(f.calls(),0);assert.equal(f.claims(),1);});
