// Run inside the actual mcp__cua_repl.js invocation with its already-bound tab.
// No browser/HTTP client, eval of action text, or second driver is created.
import fs from 'node:fs';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {prepare,claim,finish} from './operator-browser-host.mjs';
import {dispatchBrowserAppWrite,evaluateAuthorization} from './operator-action-guard.mjs';

const root=path.resolve(import.meta.dirname,'..');
const sources=['scripts/operator-desktop-cua.mjs','scripts/operator-browser-host.mjs','scripts/operator-browser-transport.mjs','scripts/operator-action-guard.mjs','scripts/operator-queue.mjs','scripts/operator-clock.mjs'];
const hash=x=>createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sourceHashes=()=>Object.fromEntries(sources.map(p=>[p,hash(fs.readFileSync(path.join(root,p),'utf8'))]));
const loadedHashes=sourceHashes();
const atomic=(p,v)=>{const tmp=p+'.'+randomUUID()+'.tmp';fs.writeFileSync(tmp,JSON.stringify(v,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(tmp,p);};
export const desktopSourceHashes=()=>({...loadedHashes});
function load(requestPath){
  const request=read(requestPath),base=path.dirname(path.resolve(requestPath));
  const file=k=>path.resolve(base,request[k]);
  return {request,base,plan:read(file('plan')),state:read(file('state')),fingerprint:read(file('fingerprint')),clock:read(file('clock')),clockPath:file('clock'),script:fs.readFileSync(file('script'),'utf8')};
}
function bindings(live){
  if(hash(sourceHashes())!==hash(loadedHashes)||hash(live.request.desktopSources)!==hash(loadedHashes))throw Error('Desktop source binding changed; restart at reviewed pin');
  const spec=live.plan.cases.find(c=>c.id===live.request.caseId);
  if(!spec)throw Error('Unknown case');
  for(const dep of spec.dependsOn??[])if(live.state.cases.find(c=>c.id===dep)?.status!=='passed')throw Error('Required case not passed: '+dep);
  const a=JSON.parse(live.script);
  if(!a||!['title','click'].includes(a.kind)||typeof a.url!=='string')throw Error('Only bound title/click actions supported');
  const u=new URL(a.url);
  if(u.origin!=='https://bookone.clossyan.com'||u.username||u.password)throw Error('Wrong target origin');
  if(a.kind==='click'&&(a.role!=='button'||typeof a.name!=='string'||!a.name.trim()))throw Error('Exact named button required');
  if(live.plan.id==='MISSION-v2522-RAPID-01'&&a.kind==='click'&&!spec.allowedButtons?.includes(a.name))throw Error('Button is not approved for this mission case');
  return a;
}
export async function dispatchPersistedDesktopAction({requestPath,tab}){
  let uiCalls=0,result,finalClock;
  try{
    if(!tab||typeof tab.url!=='function'||typeof tab.title!=='function')throw Error('Actual bound CUA tab required');
    let live=load(requestPath);const action=bindings(live);
    if(await tab.url()!==action.url)throw Error('Current page differs from bound action URL');
    let locator;
    if(action.kind==='click'){
      locator=tab.playwright.getByRole(action.role,{name:action.name,exact:true});
      if(await locator.count()!==1||!await locator.isVisible()||!await locator.isEnabled())throw Error('Submit control unavailable or ambiguous');
    }
    // Prepare after asynchronous DOM qualification; authorization is still checked again below.
    const prepared=prepare(requestPath);
    if(!prepared.ok)return {executed:false,uiCalls:0,reason:prepared.reason};
    const expected={request:hash(live.request),state:hash(live.state),plan:hash(live.plan),fingerprint:hash(live.fingerprint),script:live.script};
    const stable=()=>{
      const fresh=load(requestPath);bindings(fresh);
      for(const key of ['request','state','plan','fingerprint'])if(hash(fresh[key])!==expected[key])throw Error('Desktop persisted '+key+' changed');
      if(fresh.script!==expected.script)throw Error('Desktop action changed');
      return fresh;
    };
    let receipt;
    try { result=await dispatchBrowserAppWrite(prepared.inputs,{
      script:prepared.script,
      js:async script=>{
        if(script!==expected.script)throw Error('Unexpected action descriptor');
        stable();receipt=claim(live.base,prepared.preparationId);
        if(!receipt?.ok)throw Error('Durable desktop claim refused');
        if(await tab.url()!==action.url)throw Error('Page changed after claim; never replay');
        const fresh=stable();
        const auth=evaluateAuthorization({commandExitCode:fresh.request.commandExitCode,plan:fresh.plan,state:fresh.state,fingerprint:fresh.fingerprint,clock:fresh.clock,caseId:fresh.request.caseId,submissionId:fresh.request.submissionId,now:Date.now()});
        if(!auth.allowBrowserAction)throw Error('Desktop final check refused: '+auth.reason);
        // Durable final charge before the actual bound UI API; no awaited operation intervenes.
        finalClock=auth.chargedClock;
        atomic(fresh.clockPath,finalClock);
        uiCalls++;
        if(action.kind==='title')return {title:await tab.title()};
        await locator.click({timeoutMs:15000});
        return {url:await tab.url(),immediateSnapshot:await tab.playwright.domSnapshot()};
      }
    }); } finally {
      // Direct module calls avoid dynamic Function/eval, forbidden in the desktop host.
      const finished=finish(live.base,{preparationId:prepared.preparationId,executed:result?.executed===true,toolCalls:uiCalls,uncertain:receipt?.ok===true&&result?.executed!==true,chargedClock:finalClock??receipt?.inputs?.clock??result?.chargedClock});
      if(!finished.ok)throw Error('Desktop finish refused; never replay');
    }
    if(result.executed){
      // Claim/finish receipts contain no raw browser data. Keep immediate feedback private separately.
      atomic(path.join(live.base,prepared.preparationId+'.private-feedback.json'),{submissionId:live.request.submissionId,observedAt:new Date().toISOString(),result:result.result});
    }
    return {...result,chargedClock:finalClock??result.chargedClock,uiCalls,boundary:'CUA tool-host invocation contains the guarded UI API; uiCalls counts actual title/click dispatches, not outer tool invocations. Click return is not posting acceptance; independent persisted readback still required.'};
  }catch(error){return {executed:false,uiCalls,uncertain:uiCalls>0||result?.uncertain===true,reason:error instanceof Error?error.message:String(error),boundary:'Inspect durable claim and private feedback; never replay an uncertain/claimed action.'};}
}
