// File-side intent/binding helper. No browser, HTTP, credential or finance client.
import fs from 'node:fs';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {initialize,transition,report,guard} from './operator-queue.mjs';
import {openClock,clockReport} from './operator-clock.mjs';
import {authorizeCombined} from './combined-v2527-policy.mjs';
import {assertExecutionDate,desktopSourceHashes} from './operator-desktop-cua.mjs';
const root=path.resolve(import.meta.dirname,'..'),planPath='queues/MISSION-COMBINED-V2527-CONT4-20261113.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=p=>createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
import {combinedSourceHashes as frozenHashes,checkFrozen} from './combined-v2527-frozen.mjs';
export const combinedSourceHashes=()=>frozenHashes(root);
const atomic=(p,v)=>{const tmp=p+'.'+randomUUID()+'.tmp';fs.writeFileSync(tmp,JSON.stringify(v,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(tmp,p);};
function main(){
 const [cmd,runArg,caseId,submissionId,url,button,reviewPath]=process.argv.slice(2);
 if(!runArg)throw Error('Use init/summary/request/bind RUN_DIR ...');
 const dir=path.resolve(root,runArg),privateRoot=path.join(root,'.local')+path.sep;if(!dir.startsWith(privateRoot))throw Error('Run must remain inside checkout .local');
 const plan=read(path.join(root,planPath));
 if(cmd==='init'){
  assertExecutionDate(plan);if(fs.existsSync(dir))throw Error('Never overwrite any run');fs.mkdirSync(dir,{recursive:true,mode:0o700});
  const qaSha=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
  const fp={productSha:plan.productSha,qaSha,liveStamp:'v2.5.27 · dae17ab',rulesHash:hash('rules/rulebook.json'),libraryHash:hash('workflows/library.json'),schema:'not-independently-attested',actor:'actual-V-N-owner-per-case',configuration:'VAT18-or-nonVAT-local-manualPOS-GRNIoff',fixture:'V-N-existing-qualified-zero-openings',uxHash:hash('ux/workbook.json'),oracleHash:hash(plan.oracle),desktopSources:desktopSourceHashes(),combinedSources:combinedSourceHashes()};
  atomic(path.join(dir,'clock.json'),openClock(180,30));atomic(path.join(dir,'fingerprint.json'),fp);atomic(path.join(dir,'state.json'),initialize(plan,fp));atomic(path.join(dir,'owned-sources.json'),{});
  console.log(JSON.stringify({runDirectory:dir,intendedFingerprintOnly:true,instruction:'Compare QA with published execution pin; actual live/actor/profile/opening gates still mandatory.'}));return;
 }
 const fp=read(path.join(dir,'fingerprint.json'));let state=read(path.join(dir,'state.json'));guard(plan,state,fp);
 if(cmd==='summary'){console.log(JSON.stringify(report(plan,state,fp),null,2));return;}
 if(cmd==='bind'){
  // bind RUN_DIR CASE private-binding.json (third positional argument)
  const file=path.resolve(root,submissionId??'');if(!file.startsWith(privateRoot))throw Error('Binding evidence must stay private');
  const b=read(file),c=plan.cases.find(c=>c.id===caseId),row=state.cases.find(c=>c.id===caseId);
  if(!c?.outputSymbol||row?.status!=='passed'||row.submissions?.filter(s=>s.outcome==='accepted'&&!s.action.startsWith('AUTH:')).length!==1)throw Error('Only independently passed accepted event can bind');
  if(b.companyAlias!==c.companyAlias||b.eventId!==c.oracleEvent.id||b.accepted!==true||!b.evidence?.trim()||!b.observedAt||!/^[a-f0-9-]{36}$/i.test(b.id??''))throw Error('Actual source UUID/company/event/readback evidence required');
  const u=new URL(b.url);if(u.origin!=='https://bookone.clossyan.com'||u.username||u.password||u.searchParams.has('autoprint'))throw Error('Owned source supported UI URL required');
  const sources=read(path.join(dir,'owned-sources.json')),key=c.companyAlias+':'+c.outputSymbol;if(sources[key])throw Error('Never replace consumed source binding');sources[key]=b;atomic(path.join(dir,'owned-sources.json'),sources);console.log('Private source binding saved');return;
 }
 if(cmd!=='request')throw Error('Use init/summary/request/bind');
 assertExecutionDate(plan);checkFrozen(root,fp,plan);
 if(execFileSync('git',['diff','HEAD','--name-only'],{cwd:root,encoding:'utf8'}).trim().split('\n').some(p=>/^(scripts|queues|docs\/COMBINED-V2527-ORACLE)/.test(p)))throw Error('Frozen executable sources modified');
 if(!/^[A-Za-z0-9._-]+$/.test(submissionId??''))throw Error('Safe unique intent ID required');
 const clock=read(path.join(dir,'clock.json')),current={...clock,chargedMs:clock.chargedMs+(clock.mode==='active'?Date.now()-clock.lastAt:0)};if(!clockReport(current).allowNewBusinessSubmission)throw Error('Clock requires closing');
 const file=path.resolve(root,reviewPath??'');if(!file.startsWith(privateRoot))throw Error('Private prepared-form review required');const review=read(file);
 const {auth}=authorizeCombined(plan,state,caseId,url,button,review,read(path.join(dir,'owned-sources.json')));
 if(state.cases.some(c=>c.submissions?.some(s=>s.submissionId===submissionId))||fs.existsSync(path.join(dir,submissionId+'.request.json')))throw Error('Used intent; never replay');
 atomic(path.join(dir,submissionId+'.prepared-review.json'),review);
 if(state.cases.find(c=>c.id===caseId)?.status==='pending')state=transition(plan,state,fp,'start',caseId);
 state=transition(plan,state,fp,'intent',caseId,{submissionId,action:(auth?'AUTH:':'BUSINESS:')+button+' observed '+url+' review='+createHash('sha256').update(JSON.stringify(review)).digest('hex')});atomic(path.join(dir,'state.json'),state);
 atomic(path.join(dir,submissionId+'.action.json'),{kind:'click',url,role:'button',name:button});
 atomic(path.join(dir,submissionId+'.request.json'),{plan:path.relative(dir,path.join(root,planPath)),state:'state.json',fingerprint:'fingerprint.json',clock:'clock.json',script:submissionId+'.action.json',preparedReview:submissionId+'.prepared-review.json',ownedSources:'owned-sources.json',caseId,submissionId,commandExitCode:0,desktopSources:desktopSourceHashes()});
 console.log(JSON.stringify({requestPath:path.join(dir,submissionId+'.request.json'),intentPersisted:true,instruction:'Require actual exit0. Dispatch once through combined-v2527-cua.mjs inside actual CUA invocation; independently read persisted state before explicit outcome.'}));
}
if(typeof process!=='undefined'&&process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)main();


