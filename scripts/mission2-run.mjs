import fs from 'node:fs';import path from 'node:path';import {createHash,randomUUID} from 'node:crypto';import {execFileSync} from 'node:child_process';
import {initialize,transition,report,guard} from './operator-queue.mjs';import {openClock,clockReport} from './operator-clock.mjs';
import {authorizeCombined} from './mission2-policy.mjs';import {assertExecutionDate,desktopSourceHashes} from './operator-desktop-cua.mjs';import {combinedSourceHashes,checkFrozen} from './mission2-frozen.mjs';
const root=path.resolve(import.meta.dirname,'..'),[cmd,runArg,id,sid,url,button,reviewArg]=process.argv.slice(2),planPath='queues/MISSION2-V2530-20261115.json';
if(!runArg)throw Error('Use init/summary/request RUN_DIR ...');const dir=path.resolve(root,runArg),prefix=path.join(root,'.local')+path.sep;if(!dir.startsWith(prefix))throw Error('Private run directory required');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),put=(name,v)=>{const p=path.join(dir,name),tmp=p+'.'+randomUUID()+'.tmp';fs.writeFileSync(tmp,JSON.stringify(v,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(tmp,p);},plan=read(path.join(root,planPath));
const hash=p=>createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
if(cmd==='init'){
 assertExecutionDate(plan);if(plan.executionReady!==true||fs.existsSync(dir))throw Error('Not released or consumed run; never overwrite');
 const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();if(git('rev-parse','--abbrev-ref','HEAD')!=='HEAD'||git('status','--porcelain','--untracked-files=no'))throw Error('Clean detached execution checkout required');
 const fp={productSha:plan.productSha,qaSha:git('rev-parse','HEAD'),liveStamp:'v2.5.30 · ca05491',rulesHash:hash('rules/rulebook.json'),libraryHash:hash('workflows/library.json'),schema:'isolated45migrations-live-schema-not-independently-attested',configuration:'preserved-VAT18-nonVAT-local-manualPOS',actor:'fresh-V-N-AOwner-AViewer-BOwner-per-case',fixture:'Mission1-CLOSED-preserved-staging-readonly-isolated-new-fixtures',oracleHash:hash(plan.oracle),desktopSources:desktopSourceHashes(),combinedSources:combinedSourceHashes(root)};
 checkFrozen(root,fp,plan);fs.mkdirSync(dir,{recursive:true,mode:0o700});put('clock.json',openClock(180,30));put('fingerprint.json',fp);put('state.json',initialize(plan,fp));console.log(JSON.stringify({runDirectory:dir,intendedFingerprintOnly:true,instruction:'NEW clock started. Actual controls/build/identity/profile/openings still mandatory.'}));
}else{
 const fp=read(path.join(dir,'fingerprint.json'));let state=read(path.join(dir,'state.json'));guard(plan,state,fp);
 if(cmd==='summary'){console.log(JSON.stringify(report(plan,state,fp),null,2));}
 else if(cmd==='request'){
  assertExecutionDate(plan);checkFrozen(root,fp,plan);if(!/^[A-Za-z0-9._-]+$/.test(sid??''))throw Error('Safe unique intent ID required');
  if(state.cases.some(c=>c.submissions?.some(s=>s.submissionId===sid))||fs.existsSync(path.join(dir,sid+'.request.json')))throw Error('Consumed intent; never replay');
  const clock=read(path.join(dir,'clock.json'));if(!clockReport({...clock,chargedMs:clock.chargedMs+(clock.mode==='active'?Date.now()-clock.lastAt:0)}).allowNewBusinessSubmission)throw Error('Closing required');
  const file=path.resolve(root,reviewArg??'');if(!file.startsWith(prefix))throw Error('Private prepared review required');const review=read(file);authorizeCombined(plan,state,id,url,button,review);
  put(sid+'.prepared-review.json',review);if(state.cases.find(c=>c.id===id)?.status==='pending')state=transition(plan,state,fp,'start',id);
  state=transition(plan,state,fp,'intent',id,{submissionId:sid,action:'AUTH:'+button+' observed '+url+' review='+createHash('sha256').update(JSON.stringify(review)).digest('hex')});put('state.json',state);
  put(sid+'.action.json',{kind:'click',url,role:'button',name:button});put(sid+'.request.json',{plan:path.relative(dir,path.join(root,planPath)),state:'state.json',fingerprint:'fingerprint.json',clock:'clock.json',script:sid+'.action.json',preparedReview:sid+'.prepared-review.json',caseId:id,submissionId:sid,commandExitCode:0,desktopSources:desktopSourceHashes()});
  console.log(JSON.stringify({requestPath:path.join(dir,sid+'.request.json'),intentPersisted:true,instruction:'Dispatch once through mission2-cua inside actual CUA. Click return is not acceptance; independently observe protected identity/redirect and ledger readback.'}));
 }else throw Error('Unknown command');
}
