import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'),file=path.join(root,'.local/mission2-release/sources.json');
const manifest=JSON.parse(fs.readFileSync(file));
const required=['mission1State','mission1Clock','cont11State','cont11Clock','cont11Bindings','fixturesVN','fixturesAB','aOwnedUrl'];
for(const k of required){const e=manifest[k];if(!e?.path||!/^[a-f0-9]{64}$/.test(e.sha256))throw Error('Missing qualified private source '+k);if(createHash('sha256').update(fs.readFileSync(e.path)).digest('hex')!==e.sha256)throw Error('Private source changed '+k);}
for(const k of ['mission1Clock','cont11Clock'])if(JSON.parse(fs.readFileSync(manifest[k].path)).mode!=='closed')throw Error('Prior clock not closed');
for(const k of ['mission1State','cont11State']){const s=JSON.parse(fs.readFileSync(manifest[k].path));if(s.cases.some(c=>['pending','running'].includes(c.status)||c.submissions?.some(x=>x.outcome==='unresolved')))throw Error('Prior run unresolved');}
console.log('Eight private source hashes verified; old runs CLOSED/dispositioned. Bindings retained for read-only use; no intent imported or replayed.');
