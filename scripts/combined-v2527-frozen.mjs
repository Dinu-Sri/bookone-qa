// Browser-host-safe verification: files/hashes only, no process or subprocess.
import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';
const names=['scripts/combined-v2527-carry.mjs','scripts/combined-v2527-run.mjs','scripts/combined-v2527-policy.mjs','scripts/combined-v2527-cua.mjs','scripts/combined-v2527-frozen.mjs'];
const hash=(root,p)=>createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
export const combinedSourceHashes=root=>Object.fromEntries(names.map(p=>[p,hash(root,p)]));
export function checkFrozen(root,fp,plan){
 for(const p of names)if(fp.combinedSources?.[p]!==hash(root,p))throw Error('Combined helper changed');
 if(Object.keys(fp.combinedSources??{}).length!==names.length)throw Error('Incomplete helper manifest');
 if(hash(root,plan.oracle)!==fp.oracleHash)throw Error('Oracle changed');
 for(const [p,h]of Object.entries(fp.desktopSources??{}))if(hash(root,p)!==h)throw Error('Desktop source changed');
 const git=path.join(root,'.git'),dir=fs.statSync(git).isDirectory()?git:path.resolve(root,fs.readFileSync(git,'utf8').trim().replace(/^gitdir: /,''));
 const head=fs.readFileSync(path.join(dir,'HEAD'),'utf8').trim();
 if(!/^[a-f0-9]{40}$/.test(head)||head!==fp.qaSha)throw Error('Require exact detached execution HEAD');
}
