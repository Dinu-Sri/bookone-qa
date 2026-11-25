import {readFileSync,mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {runtimeTarget} from './runtime/target.mjs';
const lane=process.argv[2]??'service';
const configs={service:'vitest.ab54-review.config.mjs',product:'vitest.v272-product.config.mjs',permissions:'vitest.v273-permissions.config.mjs',auth:'vitest.v274-auth.config.mjs',database:'vitest.v274-runtime.config.ts'};
if(!(lane in configs))throw Error('Use service, product, permissions, auth or database');
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
for(const p of ['.local/live-check','.local/v273-review'])mkdirSync(p,{recursive:true});
const output=(['product','auth'].includes(lane)?'../../':'')+`.local/live-check/${lane}-results.json`;
const r=spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','--config',configs[lane],'--reporter=json',`--outputFile=${output}`],{env,stdio:'inherit'});
process.exitCode=r.status??1;
