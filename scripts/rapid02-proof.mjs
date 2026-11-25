// Private inert qualification only. This script never controls a browser.
import fs from 'node:fs';
import path from 'node:path';
import {prepareDesktopProof} from './prepare-desktop-proof.mjs';
import {initialize,transition} from './operator-queue.mjs';
import {openClock} from './operator-clock.mjs';
import {desktopSourceHashes} from './operator-desktop-cua.mjs';
const [directory,url]=process.argv.slice(2);
const root=path.resolve(import.meta.dirname,'..'),base=path.resolve(directory??'');
if(!base.startsWith(path.join(root,'.local')+path.sep))throw Error('Proof must remain private');
const requests=prepareDesktopProof(base,url);
const read=p=>JSON.parse(fs.readFileSync(p));
for(const mode of ['click','wrongday']){
  const dir=path.join(base,mode);fs.mkdirSync(dir,{recursive:true});
  const original=path.join(base,'positive');
  const plan=read(path.join(original,'plan.json')),fp=read(path.join(original,'fingerprint.json'));
  plan.id='desktop-inert-'+mode;
  if(mode==='wrongday')plan.dateContract={mode:'fixed-utc-day',executionDate:new Date(Date.now()-86400000).toISOString().slice(0,10),stopBeforeMidnightMinutes:5};
  else plan.cases[0].allowedButtons=['Sales'];
  let state=transition(plan,initialize(plan,fp),fp,'start','proof');
  state=transition(plan,state,fp,'intent','proof',{submissionId:'once',action:mode==='click'?'Toggle inert Sales navigation':'Wrong day must refuse before UI'});
  const request={plan:'plan.json',state:'state.json',fingerprint:'fingerprint.json',clock:'clock.json',script:'action.json',caseId:'proof',submissionId:'once',commandExitCode:0,desktopSources:desktopSourceHashes()};
  const action=mode==='click'?{kind:'click',url,role:'button',name:'Sales'}:{kind:'title',url};
  for(const [name,value] of Object.entries({'plan.json':plan,'state.json':state,'fingerprint.json':fp,'clock.json':openClock(120,20),'request.json':request,'action.json':action}))fs.writeFileSync(path.join(dir,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
  requests.push({mode,requestPath:path.join(dir,'request.json')});
}
fs.writeFileSync(path.join(base,'requests.json'),JSON.stringify(requests,null,2)+'\n',{flag:'wx',mode:0o600});
console.log(JSON.stringify({modes:requests.map(x=>x.mode),manifest:path.join(base,'requests.json'),boundary:'Invoke each once inside actual CUA; only title and Sales navigation. Never substitute mock success for actual UI proof.'}));
