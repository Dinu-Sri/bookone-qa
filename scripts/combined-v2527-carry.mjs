import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
export function verifyCarry(plan,state,prior,manifestPath){
 if(!['G05','G06'].every(id=>state.cases.find(c=>c.id===id)?.status==='passed'))throw Error('Fresh openings and preservation required');
 if(state.cases.some(c=>c.submissions?.some(s=>!s.action.startsWith('AUTH:'))))throw Error('Carry must precede all business intents');
 const contract=plan.carryContract;if(!contract)throw Error('Missing reviewed carry contract');
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
