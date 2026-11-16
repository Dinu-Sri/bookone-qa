import {readFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {runtimeTarget} from './runtime/target.mjs';
const lane=process.argv[2]??'service';
const configs={service:'vitest.ab54-review.config.mjs',product:'vitest.v272-product.config.mjs',database:'vitest.v273-runtime.config.ts'};
if(!(lane in configs))throw Error('Use service, product or database');
const verify=spawnSync(process.execPath,['scripts/verify-product.mjs'],{stdio:'inherit'});
if(verify.status)process.exit(verify.status);
const env={...process.env};
if(lane==='database'){
  runtimeTarget(env.QA_RUNTIME_ADMIN_URL,env.QA_RUNTIME_ISOLATION);
  const prep=JSON.parse(readFileSync('.local/runtime/preparation.json','utf8'));
  if(!prep.complete||prep.productSha!==JSON.parse(readFileSync('product-ref.json','utf8')).commit)throw Error('Exact isolated schema preparation required');
  env.DATABASE_URL=JSON.parse(readFileSync('.local/runtime/connection.json','utf8')).url;
  runtimeTarget(env.DATABASE_URL,env.QA_RUNTIME_ISOLATION);
}
mkdirSync('.local/v273-review',{recursive:true});
const output=lane==='product'?'../../.local/v273-review/product-results.json':`.local/v273-review/${lane}-results.json`;
const r=spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','--config',configs[lane],'--reporter=json',`--outputFile=${output}`],{env,stdio:'inherit'});
process.exitCode=r.status??1;
