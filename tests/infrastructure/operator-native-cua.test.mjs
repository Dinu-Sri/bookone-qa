import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {initialize,transition} from '../../scripts/operator-queue.mjs';
import {openClock} from '../../scripts/operator-clock.mjs';
import {nativeSourceHashes,qualifyNativeState,dispatchPersistedNativeAction} from '../../scripts/operator-native-cua.mjs';
const base=path.resolve('.local/native-test');fs.mkdirSync(base,{recursive:true});
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v));
const read=p=>JSON.parse(fs.readFileSync(p));
const URL='https://bookone.clossyan.com/login';
const state='0 window BookOne - Google Chrome Secondary Actions: Raise\n\t1 edit Address and search bar Value: bookone.clossyan.com/login ID: view_1012\n\t2 document BookOne Value: '+URL+' ID: RootWebArea\n\t\t3 main\n\t\t\t4 button Sign In\n\t\t\t5 button (disabled) Login\n\t6 document Other Value: https://other.example/ ID: RootWebArea\n\t\t7 button Sign In';
function fixture(kind='title'){
 const dir=fs.mkdtempSync(path.join(base,'case-'));
 const plan={schemaVersion:1,id:'native-inert',candidate:'v1.0.0',productSha:'a'.repeat(40),transport:{entry:'dispatchPersistedNativeAction'},cases:[{id:'proof',businessSubmission:false,precondition:'synthetic',expected:'inert',evidence:['title'],allowedButtons:['Sign In']}]};
 const fp={productSha:plan.productSha,qaSha:'b'.repeat(40),liveStamp:'v1.0.0 · aaaaaaa',rulesHash:'synthetic',libraryHash:'synthetic',schema:'synthetic',configuration:'inert-only',actor:'synthetic',fixture:'synthetic',nativeWindowId:'123'};
 let s=transition(plan,initialize(plan,fp),fp,'start','proof');s=transition(plan,s,fp,'intent','proof',{submissionId:'once',action:'inert'});
 const request={plan:'plan.json',state:'state.json',fingerprint:'fp.json',clock:'clock.json',script:'action.json',caseId:'proof',submissionId:'once',commandExitCode:0,desktopSources:nativeSourceHashes(),nativeWindowId:123,nativeInertProof:true};
 for(const [p,v]of Object.entries({'plan.json':plan,'state.json':s,'fp.json':fp,'clock.json':openClock(120,20),'request.json':request,'action.json':{kind,url:URL,...(kind==='click'?{role:'button',name:'Sign In'}:{})}}))write(path.join(dir,p),v);
 let clicks=0,reads=0;
 const f={dir,requestPath:path.join(dir,'request.json'),windowId:123,app:{getAXState:async()=>{reads++;return state;},click:async index=>{assert.equal(index,4);clicks++;}},clicks:()=>clicks,reads:()=>reads,claims:()=>fs.existsSync(path.join(dir,'dispatches'))?fs.readdirSync(path.join(dir,'dispatches')).length:0};return f;
}
test('native title uses durable claim and refuses replay',async()=>{const f=fixture(),r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,true);assert.equal(r.uiCalls,1);assert.equal(r.readonlyObservations,2);assert.equal(f.reads(),3);assert.equal(f.claims(),1);assert.equal((await dispatchPersistedNativeAction(f)).executed,false);assert.equal(f.claims(),1);});
test('native click resolves own document exact button and records feedback privately',async()=>{const f=fixture('click'),r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,true);assert.equal(f.clicks(),1);assert.equal(r.uiCalls,1);assert.equal(r.readonlyObservations,3);assert.equal(fs.readdirSync(f.dir).filter(x=>x.endsWith('.private-feedback.json')).length,1);});
test('native click without explicit inert-only permission is hard refused',async()=>{const f=fixture('click'),p=path.join(f.dir,'request.json'),v=read(p);delete v.nativeInertProof;write(p,v);const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.match(r.reason,/NOT QUALIFIED/);assert.equal(f.reads(),0);assert.equal(f.claims(),0);});
test('even an allowlisted Login cannot enable authentication through native fallback',async()=>{const f=fixture('click');const p=path.join(f.dir,'plan.json'),plan=read(p);plan.cases[0].allowedButtons=['Login'];write(p,plan);const fp=read(path.join(f.dir,'fp.json'));let s=transition(plan,initialize(plan,fp),fp,'start','proof');s=transition(plan,s,fp,'intent','proof',{submissionId:'once',action:'not permitted'});write(path.join(f.dir,'state.json'),s);write(path.join(f.dir,'action.json'),{kind:'click',role:'button',name:'Login',url:URL});const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.match(r.reason,/NOT QUALIFIED/);assert.equal(f.reads(),0);assert.equal(f.claims(),0);});
for(const [label,file,mutate]of [
 ['exit','request.json',v=>v.commandExitCode=1],
 ['intent','state.json',v=>delete v.cases[0].submissions],
 ['fingerprint','fp.json',v=>v.actor='changed'],
 ['clock','clock.json',v=>v.chargedMs=100*60000],
 ['adapter source','request.json',v=>v.desktopSources['scripts/operator-native-cua.mjs']='0'.repeat(64)],
 ['wrong window','request.json',v=>v.nativeWindowId=999],
 ['old UTC day','plan.json',v=>v.dateContract={mode:'fixed-utc-day',executionDate:'2020-01-01',stopBeforeMidnightMinutes:5}],
 ['unapproved button','action.json',v=>Object.assign(v,{kind:'click',role:'button',name:'Login'})],
 ['arbitrary script','action.json',v=>v.kind='javascript'],
 ['wrong origin','action.json',v=>v.url='https://example.com/'],
 ['unreviewed transport','plan.json',v=>delete v.transport],
])test(label+' refuses before any native API call or claim',async()=>{const f=fixture(),p=path.join(f.dir,file),v=read(p);mutate(v);write(p,v);const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.equal(r.uiCalls,0);assert.equal(f.reads(),0);assert.equal(f.clicks(),0);assert.equal(f.claims(),0);});
test('wrong address is refused before claim or click',async()=>{const f=fixture('click');f.app.getAXState=async()=>state.replace('Value: bookone.clossyan.com/login','Value: example.com/');const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.equal(f.clicks(),0);assert.equal(f.claims(),0);});
test('duplicate or disabled button and ambiguous document refuse',()=>{for(const s of [state.replace('5 button (disabled) Login','5 button Sign In'),state.replace('4 button Sign In','4 button (disabled) Sign In'),state+'\n\t8 document BookOne Value: '+URL+' ID: RootWebArea'])assert.throws(()=>qualifyNativeState(s,{kind:'click',url:URL,name:'Sign In'}));});
test('native focus summary does not create a second toolbar node; page text cannot supply toolbar',()=>{
 const summary='\nFocused element: 1 edit Address and search bar Value: bookone.clossyan.com/login ID: view_1012';
 assert.equal(qualifyNativeState(state+summary,{kind:'click',url:URL,name:'Sign In'}).index,4);
 const noToolbar=state.replace('\t1 edit Address and search bar Value: bookone.clossyan.com/login ID: view_1012\n','');
 assert.throws(()=>qualifyNativeState(noToolbar+summary,{kind:'title',url:URL}));
 assert.throws(()=>qualifyNativeState(noToolbar+'\n\t\t8 edit Address and search bar Value: bookone.clossyan.com/login ID: view_1012',{kind:'title',url:URL}));
});
test('page change after claim is consumed without click and remains unreplayable',async()=>{const f=fixture('click');let n=0;f.app.getAXState=async()=>++n===1?state:state.replaceAll('/login','/other');const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.equal(r.uncertain,true);assert.equal(f.claims(),1);assert.equal(f.clicks(),0);assert.equal((await dispatchPersistedNativeAction(f)).executed,false);});
test('clock expiry during final state observation prevents click',async()=>{const f=fixture('click');let n=0;f.app.getAXState=async()=>{if(++n===2){const p=path.join(f.dir,'clock.json'),v=read(p);v.chargedMs=100*60000;write(p,v);}return state;};const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.equal(f.clicks(),0);assert.equal(f.claims(),1);});
test('late state mutation prevents click',async()=>{const f=fixture('click');let n=0;f.app.getAXState=async()=>{if(++n===2){const p=path.join(f.dir,'state.json'),v=read(p);v.cases[0].submissions[0].outcome='accepted';write(p,v);}return state;};const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.equal(f.clicks(),0);assert.equal(f.claims(),1);});
test('final clock durable before actual click; lost result is uncertain and consumed',async()=>{const f=fixture('click');f.app.click=async()=>{const c=read(path.join(f.dir,'clock.json')),receipt=read(path.join(f.dir,'dispatches',fs.readdirSync(path.join(f.dir,'dispatches'))[0]));assert.ok(c.lastAt>=receipt.claimedAt);throw Error('lost UI response');};const r=await dispatchPersistedNativeAction(f);assert.equal(r.executed,false);assert.equal(r.uiCalls,1);assert.equal(r.uncertain,true);assert.equal(f.claims(),1);assert.equal((await dispatchPersistedNativeAction(f)).executed,false);});
