import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
export const hash = value => createHash('sha256').update(value).digest('hex');
export function atomicJSON(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.${randomBytes(4).toString('hex')}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
  renameSync(tmp, path);
}
export const readJSON = path => JSON.parse(readFileSync(path, 'utf8'));
export function selectBatchId(value = 'A') {
  if (!/^[A-F]$/.test(value)) throw new Error('Batch must be A through F');
  return value;
}
export function validateBatch(batch) {
  selectBatchId(batch.id);
  if (batch.version !== 1 || batch.releaseAcceptance !== false) throw new Error('Unsupported manifest/acceptance claim');
  const lanes = new Set(batch.lanes.map(l => l.id)), ids = new Set();
  for (const lane of batch.lanes) {
    if (!/^tests\/batch\/[a-z-]+\.test\.tsx?$/.test(lane.file) || lane.resume !== 'restart-isolated' ||
      !Number.isInteger(lane.timeoutSeconds) || lane.timeoutSeconds < 1 || lane.timeoutSeconds > 900) throw new Error('Invalid isolated lane');
  }
  if (lanes.size !== batch.lanes.length || !lanes.size) throw new Error('Missing/duplicate lanes');
  for (const c of batch.cases) {
    if (!new RegExp(`^${batch.id}-\\d{3}$`).test(c.id) || ids.has(c.id) || !lanes.has(c.lane) || !c.rules?.length ||
      !c.rules.every(r => /^BR-[A-Z]+-\d{2}$/.test(r)) || !Array.isArray(c.bugs) ||
      !c.bugs.every(b => /^BUG-\d{4}$/.test(b))) throw new Error('Invalid/duplicate case');
    ids.add(c.id);
  }
  if (!ids.size || batch.lanes.some(l => !batch.cases.some(c => c.lane === l.id))) throw new Error('Empty coverage');
}
export function laneOutcome(expected, checkpoint, exitCode) {
  const observed = checkpoint?.cases ?? [];
  const ids = observed.map(c => c.id);
  const valid = checkpoint && !checkpoint.collectionError && new Set(ids).size === ids.length &&
    ids.every(id => expected.includes(id)) && expected.every(id => ids.includes(id));
  const cases = expected.map(id => ({ id, status: valid ? (observed.find(c => c.id === id)?.status ?? 'blocked') : 'blocked' }));
  const terminal = cases.every(c => ['passed', 'failed', 'skipped', 'blocked'].includes(c.status));
  const status = valid && terminal && exitCode === 0 && cases.every(c => c.status === 'passed') ? 'passed' : 'failed';
  return { status, exitCode, evidenceComplete: Boolean(valid && terminal), cases,
    infrastructureFailure: !valid || !terminal || (exitCode !== 0 && !cases.some(c => c.status === 'failed')) };
}
export function assertResume(state, fingerprint) {
  if (state.status === 'completed') throw new Error('Completed runs are immutable; start a new run');
  if (JSON.stringify(state.fingerprint) !== JSON.stringify(fingerprint)) throw new Error('Resume fingerprint changed; start a new run');
}
export function publicSummary(state, batch) {
  const fingerprint = {};
  const patterns = { productSha:/^[a-f0-9]{40}$/, productStamp:/^v\d+\.\d+\.\d+ · [a-f0-9]{7}$/, qaSha:/^[a-f0-9]{40}$/, qaContentHash:/^[a-f0-9]{64}$/,
    batchHash:/^[a-f0-9]{64}$/, nodeVersion:/^v\d+\.\d+\.\d+$/,
    fixtureVersion:/^(embedded-pg-v[12]|source-calculations-v1|source-and-object-command-v1)$/, environment:/^(embedded-postgresql-contract|pure-product-source)$/,
    authBoundary:/^(synthetic-session-real-product-permission-assertion|synthetic-session-mocked-object-storage|not-exercised)$/, migrationsAndRuntimeRls:/^not-exercised$/ };
  for (const [key, pattern] of Object.entries(patterns)) {
    const value = state.fingerprint?.[key]; if (typeof value === 'string' && pattern.test(value)) fingerprint[key] = value;
  }
  if (typeof state.fingerprint?.qaDirty === 'boolean') fingerprint.qaDirty = state.fingerprint.qaDirty;
  const byId = new Map();
  for (const lane of state.lanes) {
    const attempts = lane.attempts ?? [];
    for (const c of batch.cases.filter(c => c.lane === lane.id)) {
      const statuses = attempts.map(a => a.outcome?.cases?.find(r => r.id === c.id)?.status).filter(Boolean);
      let status = statuses.at(-1) ?? 'not-run';
      if (!['passed','failed','blocked','skipped','not-run'].includes(status)) status = 'blocked';
      if (statuses.includes('failed') && status === 'passed') status = 'flaky';
      byId.set(c.id, { id: c.id, status, rules: c.rules, bugs: c.bugs });
    }
  }
  const cases = [...byId.values()];
  const sourceGate = state.status === 'completed' && state.lanes.every(l => l.status === 'passed') &&
    cases.length === batch.cases.length && cases.every(c => c.status === 'passed') ? 'passed' : 'failed';
  // Deliberate allowlist. No arbitrary notes, auth values, stdout, errors or paths.
  const safeDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) ? value : null;
  return { schemaVersion: 1, runId: /^RUN-\d{8}-\d{9}-[a-f0-9]{6}$/.test(state.runId) ? state.runId : 'invalid-run-id', batch: batch.id,
    fingerprint, seed: Number.isInteger(state.seed) ? state.seed : null, profile: ['quick','broad'].includes(state.profile) ? state.profile : 'unknown',
    startedAt: safeDate(state.startedAt), finishedAt: safeDate(state.finishedAt),
    status: state.status, sourceGate, releaseAcceptance: 'not-established',
    missingAcceptanceLayers: batch.requiredAdditionalLayers,
    cases, totals: Object.fromEntries(['passed','failed','flaky','blocked','skipped','not-run'].map(s =>
      [s, cases.filter(c => c.status === s).length])) };
}
