// Invoke only inside actual CUA with its supported bound tab. No HTTP or credential client.
import fs from 'node:fs';import path from 'node:path';import {authorizeCombined} from './mission2-policy.mjs';import {checkFrozen} from './mission2-frozen.mjs';import {dispatchPersistedDesktopAction,assertExecutionDate} from './operator-desktop-cua.mjs';
export async function dispatchCombined({requestPath,tab}){
 let attempted=false;try{const read=p=>JSON.parse(fs.readFileSync(p)),r=read(requestPath),base=path.dirname(requestPath),get=k=>read(path.resolve(base,r[k]));const plan=get('plan'),state=get('state'),fp=get('fingerprint');assertExecutionDate(plan);checkFrozen(path.resolve(import.meta.dirname,'..'),fp,plan);
 const row=state.cases.find(c=>c.id===r.caseId),intent=row?.submissions?.find(s=>s.submissionId===r.submissionId);if(intent?.outcome!=='unresolved')throw Error('No unresolved persisted auth intent');
 const before=structuredClone(state);before.cases.find(c=>c.id===r.caseId).submissions=row.submissions.filter(s=>s.submissionId!==r.submissionId);const a=get('script');authorizeCombined(plan,before,r.caseId,a.url,a.name,get('preparedReview'));
 attempted=true;return await dispatchPersistedDesktopAction({requestPath,tab});
 }catch(e){return {executed:attempted?null:false,uiCalls:attempted?null:0,uncertain:attempted,reason:e.message,boundary:'Do not bypass or replay. Inspect durable intent/readback state; an exception after entering dispatch does not prove zero UI.'};}
}
