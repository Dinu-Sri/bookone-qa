// Independent acceptance. Nonzero exit is intentional until the candidate is fixed.
import {readFileSync, existsSync, mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {runtimeTarget} from './runtime/target.mjs';
const lane=process.argv[2]??'service';
if(!['service','database'].includes(lane)) throw Error('Use service or database');
const verify=spawnSync(process.execPath,['scripts/verify-product.mjs'],{stdio:'inherit'});
if(verify.status)process.exit(verify.status);
mkdirSync('.local/ab54-review',{recursive:true});
const env={...process.env};
if(lane==='database'){
  runtimeTarget(env.QA_RUNTIME_ADMIN_URL,env.QA_RUNTIME_ISOLATION);
  const prep=JSON.parse(readFileSync('.local/runtime/preparation.json','utf8'));
  const ref=JSON.parse(readFileSync('product-ref.json','utf8'));
  if(!prep.complete||prep.productSha!==ref.commit)throw Error('Prepare exact isolated schema first');
  env.DATABASE_URL=JSON.parse(readFileSync('.local/runtime/connection.json','utf8')).url;
  runtimeTarget(env.DATABASE_URL,env.QA_RUNTIME_ISOLATION);
}
const config=lane==='service'?'vitest.ab54-review.config.mjs':'vitest.ab54-runtime.config.ts';
const r=spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','--config',config,'--reporter=json',`--outputFile=.local/ab54-review/${lane}-results.json`],{env,stdio:'inherit'});
process.exitCode=r.status??1;
