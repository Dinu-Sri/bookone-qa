// Use ONLY inside actual mcp__cua_repl with its already-bound supported tab.
import fs from 'node:fs';import path from 'node:path';
import {authorizeCombined} from './combined-v2527-policy.mjs';
import {checkFrozen} from './combined-v2527-run.mjs';
import {dispatchPersistedDesktopAction,assertExecutionDate} from './operator-desktop-cua.mjs';
export async function dispatchCombined({requestPath,tab}){
 try{
  const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),req=read(requestPath),base=path.dirname(requestPath),get=k=>read(path.resolve(base,req[k]));
  const plan=get('plan'),state=get('state'),fp=get('fingerprint'),review=get('preparedReview');assertExecutionDate(plan);checkFrozen(path.resolve(import.meta.dirname,'..'),fp,plan);
  const row=state.cases.find(c=>c.id===req.caseId),intent=row?.submissions?.find(s=>s.submissionId===req.submissionId);if(intent?.outcome!=='unresolved')throw Error('No matching unresolved persisted intent');
  // Policy cap excludes exactly this already-persisted intent, never a prior one.
  const before=structuredClone(state);before.cases.find(c=>c.id===req.caseId).submissions= row.submissions.filter(s=>s.submissionId!==req.submissionId);
  const action=get('script');authorizeCombined(plan,before,req.caseId,action.url,action.name,review,get('ownedSources'));
  return await dispatchPersistedDesktopAction({requestPath,tab});
 }catch(e){return {executed:false,uiCalls:0,reason:e.message,boundary:'Inspect durable state; no bypass or replay.'};}
}
