import {spawn,spawnSync,execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,appendFileSync,mkdirSync,existsSync} from 'node:fs';
import {randomBytes} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {atomicJSON,readJSON,hash} from '../batch/state.mjs';
import {campaignPlan,campaignSummary,resumeGuard,caseOutcome,terminal} from './state.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');process.chdir(root);
const args=process.argv.slice(2),command=args[0]??'plan';
const option=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1];};
if(!['plan','run','resume'].includes(command))throw new Error('Use plan/run/resume');
const plan=campaignPlan();
if(command==='plan'){console.log(JSON.stringify({stages:plan.stages.map(s=>({id:s.id,depends:s.depends,expectedChecks:s.expected.length})),definedWorkflows:plan.tasks.length,withoutBindings:plan.tasks.filter(t=>!t.bindings.length).map(t=>t.id),policyBlockers:plan.policyBlockers,campaignAcceptance:'not-established'},null,2));process.exit(0);}
const git=(...xs)=>execFileSync('git',xs,{encoding:'utf8'}).trim();
const ref=readJSON('product-ref.json');
if(spawnSync(process.execPath,['scripts/verify-product.mjs'],{encoding:'utf8'}).status!==0)throw new Error('Pinned source verification failed');
const content=()=>hash(git('ls-files','--cached','--others','--exclude-standard').split(/\r?\n/).filter(p=>/\.(mjs|ts|tsx|json|md|ya?ml)$/.test(p)&&!p.startsWith('runs/')).sort().map(p=>p+'\0'+hash(readFileSync(p))).join('\n'));
const fingerprint={productSha:ref.commit,productStamp:`v${readFileSync('work/product/VERSION','utf8').trim()} · ${ref.commit.slice(0,7)}`,qaSha:git('rev-parse','HEAD'),qaDirty:Boolean(git('status','--porcelain')),qaContentHash:content(),planHash:plan.planHash,node:process.version,fixtureVersion:'campaign-v1',runtimeSelected:Boolean(process.env.QA_RUNTIME_ADMIN_URL&&process.env.QA_RUNTIME_ISOLATION)};
let state;
if(command==='resume'){
 if(!/^CAMP-\d{8}-\d{9}-[a-f0-9]{6}$/.test(args[1]??''))throw new Error('Invalid campaign ID');
 state=readJSON(`.local/campaigns/${args[1]}/state.json`);resumeGuard(state,fingerprint);
 if(args.includes('--seed')||args.includes('--profile'))throw new Error('Resume uses saved seed/profile');
 if(state.preparationHash&&(!existsSync('.local/runtime/preparation.json')||hash(readFileSync('.local/runtime/preparation.json'))!==state.preparationHash))throw new Error('Runtime preparation changed; start a fresh campaign');
 for(const s of state.stages)if(s.status==='running'){s.status='pending';s.reason='interrupted';s.attempts.at(-1).interrupted=true;}
}else{
 const seed=Number(option('--seed','261013')),profile=option('--profile','quick');if(!Number.isInteger(seed)||seed<0||seed>2147483647||!['quick','broad'].includes(profile))throw new Error('Invalid seed/profile');
 const stamp=new Date().toISOString().replace(/[-:TZ.]/g,'');const runId=`CAMP-${stamp.slice(0,8)}-${stamp.slice(8)}-${randomBytes(3).toString('hex')}`;
 state={schemaVersion:1,kind:'full-campaign',runId,fingerprint,seed,profile,status:'running',stages:plan.stages.map(s=>({id:s.id,status:'pending',attempts:[]}))};
}
const jobs=Number(option('--jobs','2'));if(!Number.isInteger(jobs)||jobs<1||jobs>4)throw new Error('Jobs must be1–4');
const dir=`.local/campaigns/${state.runId}`;mkdirSync(dir,{recursive:true});const checkpoint=()=>atomicJSON(dir+'/state.json',state);
state.status='running';checkpoint();const children=new Set();let interrupted=false;
process.on('SIGINT',()=>{interrupted=true;state.status='interrupted';checkpoint();for(const child of children)child.kill();});
const unchanged=()=>content()===fingerprint.qaContentHash&&git('rev-parse','HEAD')===fingerprint.qaSha&&git('-C','work/product','rev-parse','HEAD')===fingerprint.productSha&&!git('-C','work/product','status','--porcelain','--untracked-files=no');
async function execute(s){
 const current=state.stages.find(x=>x.id===s.id);
 if(!unchanged()){interrupted=true;state.status='interrupted';current.reason='candidate-changed';checkpoint();return;}
 if(['prepare','runtime'].includes(s.kind)&&!fingerprint.runtimeSelected){current.status='blocked';current.reason='runtime-unavailable';checkpoint();return;}
 current.status='running';const attempt={};current.attempts.push(attempt);checkpoint();
 const log=dir+'/'+s.id+'-'+current.attempts.length+'.log';
 const unitReport=dir+'/unit-retained-raw-'+current.attempts.length+'.json';
 const commands={check:['scripts/campaign/check.mjs'],unit:['node_modules/vitest/vitest.mjs','run','--config','vitest.config.ts','--reporter=json',`--outputFile=${unitReport}`],source:['scripts/batch/run.mjs','run','--batch',s.batch,'--seed',String(state.seed),'--profile',state.profile],archive:['scripts/archive-helpers.mjs'],prepare:['scripts/runtime/prepare.mjs'],runtime:['scripts/runtime/run.mjs']};
 let stdout='';const code=await new Promise(done=>{
  const child=spawn(process.execPath,commands[s.kind],{cwd:root,env:process.env,stdio:['ignore','pipe','pipe']});children.add(child);let settled=false;
  const finish=c=>{if(settled)return;settled=true;clearTimeout(timer);children.delete(child);done(c);};
  const timer=setTimeout(()=>{child.kill();finish(124);},s.kind==='runtime'?900000:600000);
  child.stdout.on('data',b=>{stdout+=b.toString();appendFileSync(log,b);});child.stderr.on('data',b=>appendFileSync(log,b));child.on('error',()=>finish(127));child.on('close',c=>finish(c??128));
 });
 let observed=[],record;
 try{
  if(s.kind==='unit')observed=readJSON(unitReport).testResults.flatMap(file=>(file.assertionResults??[]).map(t=>{const normalized=file.name.replaceAll('\\','/'),relative=normalized.slice(normalized.indexOf('/packages/')+1);return{id:'U-'+hash(relative+'\0'+t.fullName).slice(0,16),status:t.status};}));
  if(s.kind==='source'){const result=JSON.parse(stdout.slice(stdout.indexOf('{\n  "runId"')));record=readJSON(`.local/batches/${result.runId}/summary.json`);observed=record.cases;}
  if(s.kind==='archive'||s.kind==='runtime'){const start=stdout.indexOf('{\n  "schemaVersion"');record=JSON.parse(stdout.slice(start));observed=s.kind==='archive'?record.cases:record.results.flatMap(r=>r.cases);}
  if(record&&(record.fingerprint.productSha!==fingerprint.productSha||record.fingerprint.qaSha!==fingerprint.qaSha||record.fingerprint.qaContentHash!==fingerprint.qaContentHash))throw new Error('Child fingerprint mismatch');
  if(s.kind==='prepare'&&code===0)state.preparationHash=hash(readFileSync('.local/runtime/preparation.json'));
 }catch{record=null;observed=[];}
 const result=s.expected.length?caseOutcome(s.expected,observed,code):{status:code===0?'passed':'failed',reason:code===0?'assertion-outcome':'subprocess-failed',cases:[]};
 Object.assign(attempt,{exitCode:code,...result});Object.assign(current,{status:result.status,reason:result.reason});
 if(interrupted){attempt.interrupted=true;current.status='pending';current.reason='interrupted';}
 if(record){writeFileSync(dir+'/'+s.id+'-summary.json',JSON.stringify(record,null,2)+'\n');attempt.childRunId=record.runId;}
 if(!unchanged()){interrupted=true;state.status='interrupted';current.reason='candidate-changed';}checkpoint();
 console.log(JSON.stringify({stage:s.id,status:current.status,passed:result.cases.filter(c=>c.status==='passed').length,failed:result.cases.filter(c=>c.status==='failed').length}));
}
const active=new Map();
while(!interrupted&&state.stages.some(s=>!terminal(s.status))){
 for(const s of plan.stages){const current=state.stages.find(x=>x.id===s.id);if(current.status!=='pending')continue;const deps=s.depends.map(d=>state.stages.find(x=>x.id===d));
  if(deps.some(d=>terminal(d.status)&&d.status!=='passed')){current.status='blocked';current.reason='prerequisite-failed';checkpoint();continue;}
  if(active.size<jobs&&deps.every(d=>d.status==='passed')){const p=execute(s).finally(()=>active.delete(s.id));active.set(s.id,p);}
 }
 if(active.size)await Promise.race(active.values());else if(state.stages.some(s=>!terminal(s.status)))throw new Error('Campaign dependency deadlock');
}
await Promise.all(active.values());
state.status=interrupted?'interrupted':'completed';checkpoint();
const summary=campaignSummary(state,plan);atomicJSON(dir+'/summary.json',summary);
if(!interrupted){mkdirSync('runs',{recursive:true});writeFileSync(`runs/${state.runId}.json`,JSON.stringify(summary,null,2)+'\n',{flag:'wx'});}
console.log(JSON.stringify({runId:state.runId,totals:summary.totals,coverage:summary.coverage,executedGate:summary.executedGate,campaignAcceptance:summary.campaignAcceptance,interrupted},null,2));
// Full campaign is deliberately nonzero while required workflow layers/policies are missing.
process.exitCode=interrupted?130:summary.executedGate!=='passed'||summary.coverage.acceptedFullWorkflows!==summary.coverage.definedWorkflows||summary.policyBlockers.length?1:0;
