import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
export function verifyCarry(plan,state,prior,manifestPath){
 if(!['G05','G06'].every(id=>state.cases.find(c=>c.id===id)?.status==='passed'))throw Error('Fresh openings and preservation required');
 if(state.cases.some(c=>c.submissions?.some(s=>!s.action.startsWith('AUTH:'))))throw Error('Carry must precede all business intents');
 const contract=plan.carryContract;if(!contract)throw Error('Missing reviewed carry contract');
 if(contract.version===2)return verifyMultiCarry(plan,prior,manifestPath);
 const files={};for(const [name,h]of Object.entries(contract.hashes)){const bytes=fs.readFileSync(path.join(prior,name));if(hash(bytes)!==h)throw Error('Prior run changed');files[name]=JSON.parse(bytes);}
 if(files['fingerprint.json'].qaSha!==contract.priorQa||files['clock.json'].mode!=='closed')throw Error('Wrong or active prior run');
 const rows=files['state.json'].cases;
 if(rows.some(c=>['pending','running'].includes(c.status)||c.submissions?.some(s=>s.outcome==='unresolved')))throw Error('Prior run unresolved');
 for(const id of ['E02','E03','E04','E05','E06','E07','E08']){const c=rows.find(c=>c.id===id);if(c?.status!==(id==='E08'?'failed':'passed')||c.submissions?.filter(s=>s.outcome==='accepted').length!==1)throw Error('Prior disposition not qualified');}
 const bytes=fs.readFileSync(manifestPath);if(hash(bytes)!==contract.manifestHash)throw Error('Unreviewed private carry manifest');
 const m=JSON.parse(bytes);if(JSON.stringify(m.sources)!==JSON.stringify(files['owned-sources.json']))throw Error('Bindings differ from prior run');
 for(const b of Object.values(m.sources))if(b.accepted!==true||b.companyAlias!=='V')throw Error('Unqualified source');
 if(m.quotation.accepted!==false||m.quotation.companyAlias!=='V'||!/^[a-f0-9-]{36}$/.test(m.quotation.id)||new URL(m.quotation.url).origin!=='https://bookone.clossyan.com'||new URL(m.quotation.url).pathname!=='/sales/quotations/'+m.quotation.id)throw Error('Invalid failed-draft candidate');
 return {...m.sources,'V:office-quote-date-review':m.quotation};
}

function verifyMultiCarry(plan,prior,manifestPath){
 const contract=plan.carryContract,files={};
 for(const run of contract.runs){
  const dir=path.resolve(prior,run.path);if(!dir.startsWith(path.resolve(prior)+path.sep))throw Error('Carry escaped reviewed root');
  const entries={};for(const [name,h]of Object.entries(run.hashes)){const bytes=fs.readFileSync(path.join(dir,name));if(hash(bytes)!==h)throw Error('Prior '+run.name+' '+name+' changed');entries[name]=JSON.parse(bytes);}
  if(entries['fingerprint.json'].qaSha!==run.qaSha||entries['clock.json'].mode!=='closed')throw Error('Wrong or active prior run');
  if(entries['state.json'].cases.some(c=>['pending','running'].includes(c.status)||c.submissions?.some(s=>s.outcome==='unresolved')))throw Error('Prior unresolved');
  files[run.name]=entries;
 }
 const bytes=fs.readFileSync(manifestPath);if(hash(bytes)!==contract.manifestHash)throw Error('Unreviewed carry manifest');
 const m=JSON.parse(bytes),old=files.CONT5['owned-sources.json'],latest=files.CONT7['owned-sources.json'];
 for(const [key,b]of Object.entries(old))if(JSON.stringify(latest[key])!==JSON.stringify(b))throw Error('Earlier carried binding changed');
 for(const [key,b]of Object.entries(m.sources)){
  const original=latest[key];if(!original||original.accepted!==true||b.accepted!==true||b.companyAlias!=='V')throw Error('Unqualified carry source');
  const plain={...b};delete plain.documentNumber;delete plain.customerLabel;
  if(JSON.stringify(plain)!==JSON.stringify(original))throw Error('Carried binding changed');
  const meta=plan.salesReturnSources?.[key.slice(2)];if(meta&&(b.documentNumber!==meta.documentNumber||b.customerLabel!==meta.customerLabel))throw Error('Unreviewed invoice label');
 }
 if(Object.keys(m.sources).length!==Object.values(latest).filter(b=>b.accepted===true).length)throw Error('Incomplete accepted carry');
 for(const id of ['QFIX','E09','E10','E11','E12','E13','E14','E15','E16','E17']){
  const row=files.CONT7['state.json'].cases.find(c=>c.id===id),accepted=row?.submissions?.filter(s=>s.outcome==='accepted');
  if(row?.status!=='passed'||accepted?.length!==1||!accepted[0].readbacks?.some(r=>r.outcome==='accepted'))throw Error('Accepted carry lacks independent readback');
 }
 if(files.CONT7['state.json'].cases.find(c=>c.id==='E18')?.submissions?.length)throw Error('E18 already consumed');
 return m.sources;
}
