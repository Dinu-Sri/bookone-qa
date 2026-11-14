import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {initialize,transition} from './operator-queue.mjs';
import {openClock} from './operator-clock.mjs';
import {desktopSourceHashes} from './operator-desktop-cua.mjs';
export function prepareDesktopProof(directory,url){
 if(new URL(url).origin!=='https://bookone.clossyan.com')throw Error('Wrong proof origin');
 if(fs.existsSync(directory))throw Error('Never overwrite proof directory');
 const requests=[];
 for(const mode of ['positive','exit','intent','fingerprint','clock']){
  const dir=path.resolve(directory,mode);fs.mkdirSync(dir,{recursive:true,mode:0o700});
  const plan={schemaVersion:1,id:'desktop-inert-'+mode,candidate:'v1.0.0',productSha:'a'.repeat(40),cases:[{id:'proof',precondition:'synthetic inert no business',expected:'one title only',evidence:['title']}]};
  const fp={productSha:plan.productSha,qaSha:'b'.repeat(40),liveStamp:'v1.0.0 · aaaaaaa',rulesHash:'synthetic',libraryHash:'synthetic',schema:'synthetic',configuration:'synthetic-inert',actor:'no-business-actor',fixture:'inert-only'};
  let state=transition(plan,initialize(plan,fp),fp,'start','proof');state=transition(plan,state,fp,'intent','proof',{submissionId:'once',action:'Read title only'});
  const clock=openClock(120,20),request={plan:'plan.json',state:'state.json',fingerprint:'fingerprint.json',clock:'clock.json',script:'action.json',caseId:'proof',submissionId:'once',commandExitCode:0,desktopSources:desktopSourceHashes()};
  if(mode==='exit')request.commandExitCode=1;
  if(mode==='intent')delete state.cases[0].submissions;
  if(mode==='fingerprint')fp.actor='intentionally-mismatched';
  if(mode==='clock')clock.chargedMs=100*60000;
  for(const [p,v]of Object.entries({'plan.json':plan,'state.json':state,'fingerprint.json':fp,'clock.json':clock,'request.json':request,'action.json':{kind:'title',url}}))fs.writeFileSync(path.join(dir,p),JSON.stringify(v,null,2)+'\n',{flag:'wx',mode:0o600});
  requests.push({mode,requestPath:path.join(dir,'request.json')});
 }
 return requests;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)console.log(JSON.stringify(prepareDesktopProof(process.argv[2],process.argv[3]),null,2));
