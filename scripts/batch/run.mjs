import { spawn, execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, appendFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertResume, atomicJSON, hash, laneOutcome, publicSummary, readJSON, validateBatch } from './state.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
process.chdir(root);
const args = process.argv.slice(2);
const option = (name, fallback) => { const i = args.indexOf(name); return i < 0 ? fallback : args[i+1]; };
const command = args[0] ?? 'plan';
const batch = readJSON('batches/A.json'); validateBatch(batch);
if (!['plan', 'run', 'resume', 'export'].includes(command)) throw new Error('Use plan/run/resume/export');
if (command === 'plan') {
  console.log(JSON.stringify({ batch, roadmap: readJSON('batches/roadmap.json') }, null, 2)); process.exit(0);
}
const git = (dir, ...xs) => execFileSync('git', ['-C', dir, ...xs], { encoding:'utf8' }).trim();
const safeRunId = id => /^RUN-\d{8}-\d{9}-[a-f0-9]{6}$/.test(id);
if (command === 'export') {
  const id = args[1]; if (!safeRunId(id)) throw new Error('Invalid run ID');
  const state = readJSON(`.local/batches/${id}/state.json`);
  if (state.status !== 'completed') throw new Error('Export only completed runs; interrupted evidence stays private');
  const target = resolve('runs', `${id}.json`); if (existsSync(target)) throw new Error('Immutable run export already exists');
  atomicJSON(target, publicSummary(state, batch)); console.log(`Sanitized allowlisted summary: runs/${id}.json`); process.exit(0);
}
const ref = readJSON('product-ref.json');
if (ref.repository !== 'https://github.com/Dinu-Sri/BookOne.git' || !/^[a-f0-9]{40}$/.test(ref.commit)) throw new Error('Invalid product reference');
if (git('work/product','rev-parse','HEAD') !== ref.commit || git('work/product','remote','get-url','origin') !== ref.repository ||
  git('work/product','status','--porcelain','--untracked-files=no')) throw new Error('Product checkout must be pinned, correct-origin and clean');
const files = git('.', 'ls-files', '--cached', '--others', '--exclude-standard').split(/\r?\n/)
  .filter(p => /\.(?:mjs|ts|tsx|json|md|ya?ml)$/.test(p) && !p.startsWith('runs/')).sort();
const contentHash = hash(files.map(p => `${p}\0${hash(readFileSync(p))}`).join('\n'));
const fingerprint = { productSha: ref.commit, qaSha: git('.','rev-parse','HEAD'), qaContentHash: contentHash,
  qaDirty: Boolean(git('.','status','--porcelain')), batchHash: hash(JSON.stringify(batch)),
  nodeVersion: process.version, fixtureVersion: 'embedded-pg-v1', environment: 'embedded-postgresql-contract',
  authBoundary: 'synthetic-session-real-product-permission-assertion', migrationsAndRuntimeRls: 'not-exercised' };
let state, runDir;
if (command === 'resume') {
  const id = args[1]; if (!safeRunId(id)) throw new Error('Invalid run ID');
  runDir = resolve('.local/batches', id); state = readJSON(resolve(runDir,'state.json')); assertResume(state, fingerprint);
} else {
  const profile = option('--profile','quick'); if (!['quick','broad'].includes(profile)) throw new Error('Profile must be quick/broad');
  const seed = Number(option('--seed','261013')); if (!Number.isInteger(seed) || seed < -2147483648 || seed > 2147483647) throw new Error('Invalid 32-bit replay seed');
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g,'');
  const runId = `RUN-${stamp.slice(0,8)}-${stamp.slice(8)}-${randomBytes(3).toString('hex')}`;
  runDir = resolve('.local/batches', runId); mkdirSync(runDir, { recursive:true });
  state = { schemaVersion:1, runId, fingerprint, profile, seed, startedAt:new Date().toISOString(), status:'running',
    lanes: batch.lanes.map(l => ({ id:l.id, status:'pending', attempts:[] })) };
}
const statePath = resolve(runDir,'state.json'); state.status = 'running'; atomicJSON(statePath,state);
let child;
process.on('SIGINT', () => { child?.kill(); state.status='interrupted'; atomicJSON(statePath,state); process.exit(130); });
for (const lane of batch.lanes) {
  const current = state.lanes.find(l => l.id === lane.id);
  if (['passed','failed'].includes(current.status)) continue; // Resume unfinished lanes only. No result erasure.
  if (current.status === 'running') {
    const old = current.attempts.at(-1);
    const checkpoint = resolve(runDir, `${lane.id}-${current.attempts.length}.json`);
    old.outcome = laneOutcome(batch.cases.filter(c => c.lane===lane.id).map(c=>c.id), existsSync(checkpoint)?readJSON(checkpoint):null, 130);
    old.interrupted = true;
  }
  current.status='running'; current.attempts.push({ startedAt:new Date().toISOString() }); atomicJSON(statePath,state);
  const index = current.attempts.length, checkpoint = resolve(runDir,`${lane.id}-${index}.json`);
  const log = resolve(runDir,`${lane.id}-${index}.log`);
  console.log(`Running ${lane.id}; private checkpoint ${basename(checkpoint)}`);
  const exitCode = await new Promise(resolveExit => {
    child = spawn(process.execPath, ['node_modules/vitest/vitest.mjs','run','--config','vitest.batch.config.ts',lane.file], {
      cwd:root, env:{...process.env, QA_CASE_CHECKPOINT:checkpoint, QA_SEED:String(state.seed),
        QA_NUM_RUNS:state.profile==='quick'?'100':'1000', QA_MODEL_RUNS:state.profile==='quick'?'30':'200'}, stdio:['ignore','pipe','pipe'] });
    child.stdout.on('data', b=>appendFileSync(log,b)); child.stderr.on('data', b=>appendFileSync(log,b));
    let done=false;
    const finish = code => { if(done)return; done=true; clearTimeout(timer); resolveExit(code); };
    const timer=setTimeout(()=>{child.kill();finish(124);},lane.timeoutSeconds*1000);
    child.on('error',()=>finish(127)); child.on('close',code=>finish(code??128));
  });
  const outcome=laneOutcome(batch.cases.filter(c=>c.lane===lane.id).map(c=>c.id), existsSync(checkpoint)?readJSON(checkpoint):null, exitCode);
  Object.assign(current.attempts.at(-1), { finishedAt:new Date().toISOString(), outcome });
  current.status=outcome.status; atomicJSON(statePath,state);
}
state.status='completed'; state.finishedAt=new Date().toISOString(); atomicJSON(statePath,state);
const summary=publicSummary(state,batch); atomicJSON(resolve(runDir,'summary.json'),summary);
console.log(JSON.stringify({runId:state.runId,sourceGate:summary.sourceGate,totals:summary.totals,
  failingCases:summary.cases.filter(c=>c.status!=='passed'),releaseAcceptance:summary.releaseAcceptance},null,2));
process.exitCode=summary.sourceGate==='passed'?0:1;
