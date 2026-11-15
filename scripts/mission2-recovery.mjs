import fs from 'node:fs';import {spawnSync} from 'node:child_process';import {runtimeTarget} from './runtime/target.mjs';
if(process.env.GITHUB_ACTIONS!=='true'||process.env.QA_M2_RECOVERY_ISOLATION!=='ephemeral-ci-recovery')throw Error('Isolated CI recovery only');
runtimeTarget(process.env.QA_RUNTIME_ADMIN_URL,process.env.QA_RUNTIME_ISOLATION);
if(process.env.S3_ENDPOINT!=='http://127.0.0.1:9000'||!/^m2-recovery-[a-f0-9]+$/.test(process.env.S3_BUCKET??''))throw Error('Dedicated loopback storage required');
const ref=JSON.parse(fs.readFileSync('product-ref.json'));if(ref.commit!=='ca05491f18965f757adfead48b5d98595872272c')throw Error('Unreviewed recovery product');
const verify=spawnSync(process.execPath,['scripts/verify-product.mjs'],{encoding:'utf8'});if(verify.status!==0)throw Error('Product mismatch');
const d='.local/mission2-recovery';if(fs.existsSync(d))throw Error('Never replay a recovery run directory');fs.mkdirSync(d,{recursive:true});
const r=spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','--config','vitest.mission2-recovery.config.ts','--reporter=json',`--outputFile=${d}/tests.json`],{encoding:'utf8',env:{...process.env,QA_M2_RECOVERY_OBSERVATIONS:d+'/observations.json'},timeout:240000});
fs.writeFileSync(d+'/private.log',(r.stdout??'')+(r.stderr??''));let tests=[];try{tests=JSON.parse(fs.readFileSync(d+'/tests.json')).testResults.flatMap(t=>t.assertionResults??[]);}catch{}
const obs=fs.existsSync(d+'/observations.json')?JSON.parse(fs.readFileSync(d+'/observations.json')):{};
const keys=['sourcePreserved','viewerDenied','nonemptyDenied','wrongPasswordDenied','dataRestored','filesRestored','fileBytesMatch','stockQty','closedShifts','varianceCents','assetsCents','liabilitiesCents','profitCents','applicationRead','replayDenied','observedRestoreMs'];
const summary={productSha:ref.commit,boundary:'actual-product-archive-actions-real-PostgreSQL-and-MinIO-synthetic-identity-Next-adapters',status:r.status===0&&tests.length===1&&tests[0].status==='passed'?'passed':'failed',cases:tests.map(t=>({id:'M2-RECOVERY',status:t.status})),observations:Object.fromEntries(keys.filter(k=>Number.isSafeInteger(obs[k])).map(k=>[k,obs[k]])),limits:['No deployed upload/proxy or production RPO/RTO claim','Actual product archive actions, S3 transport and restored app data helpers; credential HTTPS is a separate lane']};
fs.writeFileSync(d+'/summary.json',JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary));if(summary.status!=='passed')process.exitCode=1;
