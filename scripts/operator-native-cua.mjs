// Invoked only inside mcp__cua_repl.js with its actual bound Chrome app.
// Shares the existing durable authorization/claim/clock transport; no other driver.
import fs from 'node:fs';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {prepare,claim,finish} from './operator-browser-host.mjs';
import {dispatchBrowserAppWrite,evaluateAuthorization} from './operator-action-guard.mjs';
import {assertExecutionDate} from './operator-desktop-cua.mjs';
const root=path.resolve(import.meta.dirname,'..');
const sources=['scripts/operator-native-cua.mjs','scripts/operator-desktop-cua.mjs','scripts/operator-browser-host.mjs','scripts/operator-browser-transport.mjs','scripts/operator-action-guard.mjs','scripts/operator-queue.mjs','scripts/operator-clock.mjs'];
const hash=x=>createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
const hashes=()=>Object.fromEntries(sources.map(p=>[p,hash(fs.readFileSync(path.join(root,p),'utf8'))]));
const loaded=hashes();
export const nativeSourceHashes=()=>({...loaded});
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const atomic=(p,v)=>{const tmp=p+'.'+randomUUID()+'.tmp';fs.writeFileSync(tmp,JSON.stringify(v,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(tmp,p);};
function load(requestPath){const request=read(requestPath),base=path.dirname(path.resolve(requestPath)),file=k=>path.resolve(base,request[k]);return {request,base,plan:read(file('plan')),state:read(file('state')),fingerprint:read(file('fingerprint')),clock:read(file('clock')),clockPath:file('clock'),script:fs.readFileSync(file('script'),'utf8')};}
function bindings(live,windowId){
 if(!Number.isSafeInteger(windowId)||windowId<=0)throw Error('Observed native window ID required');
 assertExecutionDate(live.plan);
 if(hash(hashes())!==hash(loaded)||hash(live.request.desktopSources)!==hash(loaded))throw Error('Native source binding changed');
 if(live.plan.transport?.entry!=='dispatchPersistedNativeAction')throw Error('Native transport not reviewed for this plan');
 if(String(live.request.nativeWindowId)!==String(windowId)||live.fingerprint.nativeWindowId!==String(windowId))throw Error('Wrong native window binding');
 const spec=live.plan.cases.find(c=>c.id===live.request.caseId);if(!spec)throw Error('Unknown case');
 for(const d of spec.dependsOn??[])if(live.state.cases.find(c=>c.id===d)?.status!=='passed')throw Error('Required case not passed');
 const a=JSON.parse(live.script);if(!a||!['title','click'].includes(a.kind)||typeof a.url!=='string')throw Error('Only bound title/click supported');
 const u=new URL(a.url);if(u.origin!=='https://bookone.clossyan.com'||u.username||u.password)throw Error('Wrong native target');
 if(a.kind==='click'&&(a.role!=='button'||!a.name?.trim()||!spec.allowedButtons?.includes(a.name)))throw Error('Exact native button is not approved');
 // Actual Windows proof failed geometry and returned a mismatched screenshot.
 // Only a harmless, selected authentication-mode button remains testable here.
 // Metadata cannot enable Login, Logout, settings, master or business writes.
 if(a.kind==='click'&&!(live.request.nativeInertProof===true&&live.fingerprint.configuration==='inert-only'&&spec.businessSubmission===false&&a.name==='Sign In'&&a.url==='https://bookone.clossyan.com/login'))throw Error('Native authentication/business clicks are NOT QUALIFIED; diagnostic inert proof only');
 return a;
}
export function qualifyNativeState(state,action){
 if(typeof state!=='string')throw Error('Native accessibility state missing');
 const lines=state.split(/\r?\n/);
 if(!lines.some(l=>/\bwindow .* - Google Chrome(?: Secondary Actions:.*)?$/.test(l)))throw Error('Expected Chrome window');
 const firstRoot=lines.findIndex(l=>/^\s*\d+ document .* ID: RootWebArea$/.test(l));
 if(firstRoot<0)throw Error('Chrome document root missing');
 const address=lines.slice(0,firstRoot).filter(l=>/^\s*\d+ edit .*Address and search bar\b/.test(l));
 if(address.length!==1)throw Error('Ambiguous Chrome address bar');
 const actual=address[0].match(/ Value: (.*?) ID: /)?.[1];
 const expected=new URL(action.url),short=expected.host+expected.pathname+expected.search+expected.hash;
 if(actual!==action.url&&actual!==short)throw Error('Chrome address differs from bound URL');
 const docs=[];
 for(let i=0;i<lines.length;i++){
  const m=lines[i].match(/^(\s*)(\d+) document BookOne Value: (https:\/\/\S+) ID: RootWebArea$/);
  if(m)docs.push({start:i,indent:m[1].length,url:m[3]});
 }
 if(docs.length!==1||docs[0].url!==action.url)throw Error('Exact BookOne document missing or ambiguous');
 const doc=docs[0];let end=lines.length;
 for(let i=doc.start+1;i<lines.length;i++)if(lines[i].trim()&&lines[i].match(/^\s*/)[0].length<=doc.indent){end=i;break;}
 if(action.kind==='title')return {title:'BookOne',url:action.url};
 const buttons=lines.slice(doc.start+1,end).map(l=>l.match(/^\s*(\d+) button (.+?)(?: ID: \S+)?$/)).filter(Boolean).filter(m=>m[2]===action.name);
 if(buttons.length!==1)throw Error('Native enabled exact button missing or ambiguous');
 return {index:Number(buttons[0][1]),url:action.url};
}
export async function dispatchPersistedNativeAction({requestPath,app,windowId}){
 let uiCalls=0,readonlyObservations=0,result,finalClock,receipt,prepared,live;
 try{
  if(!app||typeof app.getAXState!=='function'||typeof app.click!=='function')throw Error('Actual CUA native app required');
  live=load(requestPath);const action=bindings(live,windowId);
  // Refuse invalid intent/clock/fingerprint/exit BEFORE even a native observation.
  const initial=evaluateAuthorization({commandExitCode:live.request.commandExitCode,plan:live.plan,state:live.state,fingerprint:live.fingerprint,clock:live.clock,caseId:live.request.caseId,submissionId:live.request.submissionId,now:Date.now()});
  if(!initial.allowBrowserAction)return {executed:false,uiCalls:0,readonlyObservations:0,reason:initial.reason};
  readonlyObservations++;qualifyNativeState(await app.getAXState({emit:false}),action);
  prepared=prepare(requestPath);if(!prepared.ok)return {executed:false,uiCalls:0,readonlyObservations,reason:prepared.reason};
  const expected={request:hash(live.request),state:hash(live.state),plan:hash(live.plan),fingerprint:hash(live.fingerprint),script:live.script};
  const stable=()=>{const f=load(requestPath);bindings(f,windowId);for(const k of ['request','state','plan','fingerprint'])if(hash(f[k])!==expected[k])throw Error('Native persisted '+k+' changed');if(f.script!==expected.script)throw Error('Native action changed');return f;};
  try{result=await dispatchBrowserAppWrite(prepared.inputs,{script:prepared.script,js:async script=>{
   if(script!==expected.script)throw Error('Unexpected native descriptor');stable();receipt=claim(live.base,prepared.preparationId);if(!receipt?.ok)throw Error('Durable native claim refused');
   readonlyObservations++;const target=qualifyNativeState(await app.getAXState({emit:false}),action);
   const f=stable(),auth=evaluateAuthorization({commandExitCode:f.request.commandExitCode,plan:f.plan,state:f.state,fingerprint:f.fingerprint,clock:f.clock,caseId:f.request.caseId,submissionId:f.request.submissionId,now:Date.now()});
   if(!auth.allowBrowserAction)throw Error('Native final check refused: '+auth.reason);
   finalClock=auth.chargedClock;atomic(f.clockPath,finalClock);uiCalls++;
   if(action.kind==='title'){const state=await app.getAXState({emit:false});return qualifyNativeState(state,action);}
   await app.click(target.index);readonlyObservations++;const feedback=await app.getAXState({emit:false});
   return {immediateSnapshot:feedback};
  }});}finally{const done=finish(live.base,{preparationId:prepared.preparationId,executed:result?.executed===true,toolCalls:uiCalls,uncertain:receipt?.ok===true&&result?.executed!==true,chargedClock:finalClock??receipt?.inputs?.clock??result?.chargedClock});if(!done.ok)throw Error('Native finish refused');}
  if(result.executed)atomic(path.join(live.base,prepared.preparationId+'.private-feedback.json'),{submissionId:live.request.submissionId,observedAt:new Date().toISOString(),result:result.result});
  return {...result,uiCalls,readonlyObservations,chargedClock:finalClock??result.chargedClock,boundary:'Actual CUA native API in tool host. uiCalls counts guarded title observations/clicks; validation/feedback reads separately counted. Click return is not posting acceptance.'};
 }catch(e){return {executed:false,uiCalls,readonlyObservations,uncertain:receipt?.ok===true||uiCalls>0||result?.uncertain===true,reason:e instanceof Error?e.message:String(e),boundary:'Inspect claim and read back independently; never replay.'};}
}
