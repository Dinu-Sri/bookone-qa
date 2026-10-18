// Browser execution checkpoint ledger. Does not drive browsers or replay actions.
import {readFileSync, writeFileSync, renameSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const digest = x => createHash('sha256').update(JSON.stringify(x)).digest('hex');
const required = ['productSha','liveStamp','qaSha','rulesHash','libraryHash','schema','configuration','actor','fixture'];
export function validate(plan) {
  if(plan.schemaVersion!==1 || !plan.id || !Array.isArray(plan.cases) || !plan.cases.length) throw Error('Empty or invalid queue');
  const ids=new Set();
  for(const c of plan.cases) {
    if(!c.id || ids.has(c.id) || !c.expected || !c.precondition || !c.evidence?.length) throw Error('Invalid/duplicate case');
    ids.add(c.id);
  }
  return plan;
}
export function initialize(plan, fingerprint) {
  validate(plan);
  if(required.some(k=>typeof fingerprint[k]!=='string'||!fingerprint[k].trim()) || !/^[a-f0-9]{40}$/.test(fingerprint.productSha)|| !/^[a-f0-9]{40}$/.test(fingerprint.qaSha)) throw Error('Incomplete fingerprint');
  if(fingerprint.liveStamp.split(' · ')[0]!==plan.candidate || !fingerprint.liveStamp.endsWith(fingerprint.productSha.slice(0,7)) || (plan.reportedShortSha && !fingerprint.productSha.startsWith(plan.reportedShortSha))) throw Error('Wrong live candidate');
  return {schemaVersion:1,planHash:digest(plan),fingerprintHash:digest(fingerprint),fingerprint,
    cases:plan.cases.map(c=>({id:c.id,status:'pending'})),events:[]};
}
export function guard(plan,state,fingerprint) {
  validate(plan);
  if(state.planHash!==digest(plan)||state.fingerprintHash!==digest(fingerprint)) throw Error('Fingerprint or queue changed: preserve run; start fresh');
  if(state.cases.length!==plan.cases.length || state.cases.some((c,i)=>c.id!==plan.cases[i].id)) throw Error('Case discovery mismatch');
}
export function transition(plan,state,fingerprint,command,id,result) {
  guard(plan,state,fingerprint);
  const next=structuredClone(state), c=next.cases.find(c=>c.id===id);
  if(!c) throw Error('Unknown case');
  if(command==='start') {
    if(c.status!=='pending'||next.cases.some(c=>c.status==='running')) throw Error('Read persisted state; unresolved/finished actions cannot restart');
    c.status='running';
  } else if(command==='record') {
    if(c.status!=='running'||!['passed','failed','blocked','inconclusive'].includes(result?.status)||!result.actual?.trim()) throw Error('Invalid disposition');
    const spec=plan.cases.find(x=>x.id===id);
    if(!result.evidence || (result.status==='passed' && spec.evidence.some(k=>!result.evidence[k]?.trim()))) throw Error('Missing required evidence');
    if(result.status!=='passed' && !result.nextAction?.trim()) throw Error('Escalation/next action required');
    Object.assign(c,{status:result.status,actual:result.actual,evidence:result.evidence,...(result.nextAction?{nextAction:result.nextAction}:{})});
  } else throw Error('Use start/record');
  next.events.push({command,id,status:c.status,at:new Date().toISOString()});
  return next;
}
export function report(plan,state,fingerprint) {
  guard(plan,state,fingerprint);
  return {queue:plan.id,counts:Object.fromEntries(['pending','running','passed','failed','blocked','inconclusive'].map(s=>[s,state.cases.filter(c=>c.status===s).length])),
    unresolved:state.cases.filter(c=>c.status==='running').map(c=>c.id),
    next:state.cases.some(c=>c.status==='running')?null:state.cases.find(c=>c.status==='pending')?.id??null,
    releaseAcceptance:'not-established',canonicalCaseAcceptance:'not-established'};
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const [command,planPath,statePath,fingerprintPath,id,resultPath]=process.argv.slice(2);
  const read=p=>JSON.parse(readFileSync(p,'utf8')),plan=read(planPath);
  validate(plan);
  if(command==='plan') console.log(JSON.stringify(plan,null,2));
  else {
    const fp=read(fingerprintPath);
    if(command==='init'&&existsSync(statePath)) throw Error('Never overwrite a run');
    let state=command==='init'?initialize(plan,fp):read(statePath);
    guard(plan,state,fp);
    if(['start','record'].includes(command)) state=transition(plan,state,fp,command,id,resultPath?read(resultPath):undefined);
    else if(!['init','summary','pack'].includes(command)) throw Error('Use plan/init/start/record/summary/pack');
    if(['init','start','record'].includes(command)) {
      // Exclusive single operator; interrupted writes leave the last full state intact.
      const temp=statePath+'.tmp'; writeFileSync(temp,JSON.stringify(state,null,2)+'\n',{flag:'wx'}); renameSync(temp,statePath);
    }
    const summary=report(plan,state,fp);
    console.log(JSON.stringify(command==='pack'?{summary,fingerprint:fp,case:plan.cases.find(c=>c.id===(summary.unresolved[0]??summary.next)),instruction:summary.unresolved.length?'Inspect persisted records before any action. Do not replay.':'Execute this case, checkpoint, then continue independent pending cases.'}:summary,null,2));
  }
}
