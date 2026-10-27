// Conservative observed elapsed-time ledger. Does not control the browser or infer idle time.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
export function openClock(totalMinutes=100, closingReserveMinutes=15, now=Date.now()) {
  if(!Number.isFinite(totalMinutes)||!Number.isFinite(closingReserveMinutes)||totalMinutes<=closingReserveMinutes||closingReserveMinutes<=0) throw Error('Invalid budget');
  return {schemaVersion:1,totalMs:totalMinutes*60000,reserveMs:closingReserveMinutes*60000,chargedMs:0,pausedMs:0,lastAt:now,mode:'active',events:[{action:'open',at:now}]};
}
export function advanceClock(state, action, now=Date.now(), reason='') {
  if(!['check','pause','resume','close'].includes(action)||state.mode==='closed'||now<state.lastAt) throw Error('Invalid clock transition or time reversal');
  if(action==='pause'&&(state.mode!=='active'||!reason.trim())) throw Error('Pause requires active clock and explicit reason');
  if(action==='resume'&&state.mode!=='paused') throw Error('Resume requires explicit pause');
  const next=structuredClone(state),elapsed=now-state.lastAt;
  if(next.mode==='active') next.chargedMs+=elapsed; else next.pausedMs+=elapsed;
  // Every unpaused gap, including an unobserved interruption, is fully charged.
  next.events.push({action,at:now,elapsedMs:elapsed,priorMode:next.mode,...(reason?{reason}:{})});
  next.lastAt=now;
  if(action==='pause')next.mode='paused';
  if(action==='resume')next.mode='active';
  if(action==='close')next.mode='closed';
  return next;
}
export function clockReport(state) {
  return {mode:state.mode,chargedMs:state.chargedMs,explicitPausedMs:state.pausedMs,
    allowNewBusinessSubmission:state.mode==='active'&&state.chargedMs<state.totalMs-state.reserveMs,
    closingRequired:state.chargedMs>=state.totalMs-state.reserveMs,
    totalExceeded:state.chargedMs>=state.totalMs,
    boundary:'Conservative unpaused elapsed time; not measured model compute, credit usage or inferred idle time. Check before each new business submission; no automatic browser interruption.'};
}
// CLI ENTRYPOINT
if(typeof process!=='undefined'&&process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const [action,file,total,reserve,...reason]=process.argv.slice(2);
  let state;
  if(action==='open'){if(fs.existsSync(file))throw Error('Never overwrite clock');state=openClock(Number(total),Number(reserve));}
  else {state=advanceClock(JSON.parse(fs.readFileSync(file,'utf8')),action,Date.now(),[total,reserve,...reason].filter(Boolean).join(' '));}
  const temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(state,null,2)+'\n',{flag:'wx'});fs.renameSync(temp,file);
  console.log(JSON.stringify(clockReport(state),null,2));
}
