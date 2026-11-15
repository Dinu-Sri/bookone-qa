import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
export function verifyCarry(plan,state,prior){
 if(!['G05','G06'].every(id=>state.cases.find(c=>c.id===id)?.status==='passed'))throw Error('Fresh gates required');
 if(state.cases.some(c=>c.submissions?.some(s=>!s.action.startsWith('AUTH:'))))throw Error('Carry before business only');
 const c=plan.carryContract;if(c?.version!==5)throw Error('Wrong contract');const root=path.resolve(prior),dir=path.resolve(root,c.path);if(!dir.startsWith(root+path.sep))throw Error('Path escape');const f={};
 for(const [n,h]of Object.entries(c.hashes)){const b=fs.readFileSync(path.join(dir,n));if(createHash('sha256').update(b).digest('hex')!==h)throw Error('CONT10 changed '+n);f[n]=JSON.parse(b);}
 if(f['clock.json'].mode!=='closed'||f['clock.json'].chargedMs!==3575152||f['fingerprint.json'].qaSha!==c.qaSha)throw Error('Wrong/active prior');const rows=f['state.json'].cases;if(rows.some(r=>['pending','running'].includes(r.status)||r.submissions?.some(s=>s.outcome==='unresolved')))throw Error('Prior unresolved');
 for(const id of ['S01','E28','E29']){const r=rows.find(r=>r.id===id);if(r?.status!=='passed'||r.submissions?.filter(s=>s.outcome==='accepted').length!==1||f[id+'-readback.json'].outcome!=='accepted')throw Error('Missing independent accepted readback');}
 for(let n=30;n<=37;n++)if(rows.find(r=>r.id==='E'+n)?.submissions?.length)throw Error('Remaining event consumed');
 const sources=f['owned-sources.json'];for(const b of Object.values(sources))if(b.accepted!==true||b.companyAlias!=='V'||!/^[a-f0-9-]{36}$/i.test(b.id))throw Error('Unqualified source');for(const k of ['V:pos-vendor-payment','V:pos-shift-open','V:pos-cash-sale'])if(!sources[k])throw Error('Missing consumed source');return sources;
}
