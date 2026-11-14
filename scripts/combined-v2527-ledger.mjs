// Explicit observed outcomes only. Never infer accepted from a returned click.
import fs from 'node:fs';import path from 'node:path';
import {transition,report} from './operator-queue.mjs';import {advanceClock,clockReport} from './operator-clock.mjs';
const root=path.resolve(import.meta.dirname,'..'),[cmd,runArg,id,resultPath]=process.argv.slice(2),dir=path.resolve(root,runArg??'');if(!dir.startsWith(path.join(root,'.local')+path.sep))throw Error('Private run directory required');
const read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')),put=(f,v)=>{const p=path.join(dir,f),t=p+'.ledger.tmp';fs.writeFileSync(t,JSON.stringify(v,null,2)+'\n',{flag:'wx'});fs.renameSync(t,p);};
const plan=JSON.parse(fs.readFileSync(path.join(root,'queues/MISSION-COMBINED-V2527-CONT8-20261114.json'))),fp=read('fingerprint.json');let state=read('state.json');
if(['start','record','readback','defer'].includes(cmd)){
 const result=resultPath?JSON.parse(fs.readFileSync(path.resolve(root,resultPath),'utf8')):undefined;
 state=transition(plan,state,fp,cmd,id,result);put('state.json',state);put('clock.json',advanceClock(read('clock.json'),'check'));
}else if(['check','close'].includes(cmd)){
 if(cmd==='close'&&(report(plan,state,fp).unresolved.length||state.cases.some(c=>c.status==='pending')))throw Error('Disposition all cases and resolve every submission before close');
 put('clock.json',advanceClock(read('clock.json'),cmd));
}else if(cmd!=='summary')throw Error('Use start/record/readback/defer/check/close/summary');
console.log(JSON.stringify({summary:report(plan,state,fp),clock:clockReport(read('clock.json'))},null,2));
