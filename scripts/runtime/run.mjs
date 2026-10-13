import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { runtimeTarget } from './target.mjs';
import { laneOutcome } from '../batch/state.mjs';
runtimeTarget(process.env.QA_RUNTIME_ADMIN_URL, process.env.QA_RUNTIME_ISOLATION);
const preparation = JSON.parse(readFileSync('.local/runtime/preparation.json', 'utf8'));
if (!preparation.complete) throw new Error('Complete schema preparation required');
const productSha = JSON.parse(readFileSync('product-ref.json', 'utf8')).commit;
if (preparation.productSha !== productSha) throw new Error('Prepared database candidate mismatch');
const verify = spawnSync(process.execPath, ['scripts/verify-product.mjs'], { encoding: 'utf8' });
if (verify.status !== 0) throw new Error('Pinned source verification failed');
const lanes = [
  { name: 'postgres-rls', file: 'tests/runtime/tenant-context.test.ts', expected: ['RT-001','RT-002','RT-003','RT-004'], credential: 'runtime', boundary: 'real-PostgreSQL-non-owner-product-helper' },
  { name: 'commercial-lifecycle', file: 'tests/runtime/commercial.test.ts', expected: ['B-101','B-102','B-103','E-115','E-116','E-117'], credential: 'admin', boundary: 'real-PostgreSQL-owner-connection-synthetic-login-real-permission-loading' },
  { name: 'reversal-concurrency', file: 'tests/runtime/reversal.test.ts', expected: ['RT-005','RT-006','RT-007'], credential: 'admin', boundary: 'real-PostgreSQL-owner-connection-overlapping-actions-isolated-delay' },
];
const selected = process.argv[2] ?? 'all';
if (selected !== 'all' && !lanes.some(l => l.name === selected)) throw new Error('Unknown runtime lane');
const runId = 'RUN-' + new Date().toISOString().replace(/[:.]/g, '-') + '-runtime';
mkdirSync(`.local/runtime/${runId}`, { recursive: true });
const git = (...args) => { const r = spawnSync('git', args, { encoding: 'utf8' }); if (r.status !== 0) throw new Error('Git fingerprint unavailable'); return r.stdout.trim(); };
const results = [];
const contentHash = () => createHash('sha256').update(git('ls-files','--cached','--others','--exclude-standard').split(/\r?\n/)
  .filter(p=>/\.(mjs|ts|tsx|json|md|ya?ml)$/.test(p) && !p.startsWith('runs/')).sort()
  .map(p=>p+'\0'+createHash('sha256').update(readFileSync(p)).digest('hex')).join('\n')).digest('hex');
const qaContentHash=contentHash();
const fingerprint = { productSha, qaSha: git('rev-parse','HEAD'), qaDirty: Boolean(git('status','--porcelain')), node: process.version,
  qaContentHash,
  preparationHash: createHash('sha256').update(JSON.stringify(preparation)).digest('hex'), fixtureVersion: 'runtime-v1', environment: 'ephemeral-loopback-PostgreSQL16' };
for (const lane of lanes.filter(l => selected === 'all' || l.name === selected)) {
  if(contentHash()!==qaContentHash)throw new Error('QA content changed during runtime run');
  const outputFile = `.local/runtime/${runId}/${lane.name}.json`;
  const observationFile=`.local/runtime/${runId}/${lane.name}-observations.json`;
  const url = lane.credential === 'admin' ? process.env.QA_RUNTIME_ADMIN_URL : JSON.parse(readFileSync('.local/runtime/connection.json','utf8')).url;
  const result = spawnSync(process.execPath, ['node_modules/vitest/vitest.mjs','run','--config','vitest.runtime.config.ts',lane.file,'--reporter=json',`--outputFile=${outputFile}`], {
    env: { ...process.env, DATABASE_URL: url, QA_RUNTIME_LANE: lane.name, QA_RUNTIME_OBSERVATIONS:observationFile }, encoding: 'utf8', timeout: 600_000,
  });
  writeFileSync(`.local/runtime/${runId}/${lane.name}.log`, (result.stdout ?? '') + (result.stderr ?? ''));
  let tests=[];try {tests=JSON.parse(readFileSync(outputFile,'utf8')).testResults.flatMap(t=>t.assertionResults??[]);}catch{}
  const observed=tests.map(t=>({id:t.fullName?.match(/\[((?:RT|[A-F])-\d{3})\]/)?.[1]??'unknown',status:['passed','failed'].includes(t.status)?t.status:'blocked'}));
  const outcome=laneOutcome(lane.expected,{cases:observed},result.status);
  const cases=outcome.cases;
  const unexpected=observed.filter(t=>!lane.expected.includes(t.id)).length;
  const observationKeys={'RT-002':['expectedOwnRows','observedRows'],'RT-004':['tenantACount','afterFailureCount','tenantBCount','expectedACount','expectedAfterFailureCount','expectedBCount'],'RT-006':['acceptedRequests','reversalCount','expectedAccepted','expectedReversals']};
  const rawObservations=existsSync(observationFile)?JSON.parse(readFileSync(observationFile,'utf8')):{};
  const observations={};
  for(const [id,keys] of Object.entries(observationKeys))if(lane.expected.includes(id) && rawObservations[id]) {
    observations[id]=Object.fromEntries(keys.filter(k=>Number.isSafeInteger(rawObservations[id][k]) && rawObservations[id][k]>=0).map(k=>[k,rawObservations[id][k]]));
  }
  results.push({ lane: lane.name, boundary: lane.boundary, cases, subprocessExit: result.status,
    observations,
    status: outcome.status, evidenceComplete:outcome.evidenceComplete, infrastructureFailure:outcome.infrastructureFailure, unexpected });
  writeFileSync(`.local/runtime/${runId}/checkpoint.json`,JSON.stringify({fingerprint,results},null,2));
}
if(contentHash()!==qaContentHash)throw new Error('QA content changed during runtime run');
const out = { schemaVersion: 1, runId, fingerprint, results, productAcceptance: 'not-established',
  schemaPreparation:{postgresVersionNumber:preparation.postgresVersionNumber,migrationsApplied:preparation.migrations.filter(m=>m.result==='applied').length,migrationsExpected:preparation.migrations.length},
  missing: ['credential-login','Next-server-HTTP','deployed-browser','full-upgrade','recovery','object-storage','non-owner-concurrent-reversal','broader-races-and-faults'] };
mkdirSync('runs', { recursive: true });
writeFileSync(`runs/${runId}.json`, JSON.stringify(out,null,2) + '\n', { flag: 'wx' });
console.log(JSON.stringify(out,null,2));
if (results.some(r => r.status !== 'passed')) process.exitCode = 1;
