// File-side half of the connected Browser transport. It NEVER invokes a browser.
import fs from 'node:fs';
import path from 'node:path';
import {createHash, randomUUID} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {evaluateAuthorization} from './operator-action-guard.mjs';
const hash = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const atomic = (file, value) => {
  const tmp = file + '.' + randomUUID() + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2) + '\n', {flag: 'wx', mode: 0o600});
  fs.renameSync(tmp, file);
};
const root = path.resolve(import.meta.dirname, '..');
function sources() {
  const queue = fs.readFileSync(path.join(root, 'scripts/operator-queue.mjs'), 'utf8');
  const clock = fs.readFileSync(path.join(root, 'scripts/operator-clock.mjs'), 'utf8');
  const action = fs.readFileSync(path.join(root, 'scripts/operator-action-guard.mjs'), 'utf8');
  const extract = (source, begin, end) => {
    const a = source.indexOf(begin), b = source.indexOf(end, a);
    if (a < 0 || b <= a) throw Error('Pinned runtime source layout changed; review required');
    return source.slice(a, b).replaceAll('export function ', 'function ').replaceAll('export async function ', 'async function ');
  };
  const runtimeSource = extract(queue, 'const required =', '// CLI ENTRYPOINT') +
    extract(clock, 'export function openClock', '// CLI ENTRYPOINT') +
    extract(action, 'function deny(', 'function parseExitCode(') +
    '\nreturn {dispatchBrowserAppWrite, evaluateAuthorization};';
  return {runtimeSource, runtimeHash: hash(runtimeSource),
    hostHash: hash(fs.readFileSync(path.join(root, 'scripts/operator-browser-host.mjs'), 'utf8')),
    transportHash: hash(fs.readFileSync(path.join(root, 'scripts/operator-browser-transport.mjs'), 'utf8')),
    codeHostHash: hash(fs.readFileSync(path.join(root, 'scripts/operator-browser-codehost.mjs'), 'utf8'))};
}
function load(requestPath) {
  const request = read(requestPath);
  const base = path.dirname(path.resolve(requestPath));
  const file = value => path.resolve(base, value);
  const inputs = {commandExitCode: request.commandExitCode, plan: read(file(request.plan)),
    state: read(file(request.state)), fingerprint: read(file(request.fingerprint)), clock: read(file(request.clock)),
    caseId: request.caseId, submissionId: request.submissionId, now: Date.now()};
  const script = fs.readFileSync(file(request.script), 'utf8');
  if (!script.trim()) throw Error('Empty script');
  return {request, inputs, script, base, clockPath: file(request.clock)};
}
export function prepare(requestPath) {
  const live = load(requestPath);
  const auth = evaluateAuthorization(live.inputs);
  if (!auth.allowBrowserAction) return {ok: false, reason: auth.reason};
  const source = sources();
  const preparationId = randomUUID(), dispatchId = randomUUID();
  const key = hash({planHash: live.inputs.state.planHash, fingerprintHash: live.inputs.state.fingerprintHash,
    caseId: live.inputs.caseId, submissionId: live.inputs.submissionId});
  const claims = path.join(live.base, 'dispatches');
  fs.mkdirSync(claims, {recursive: true, mode: 0o700});
  if (fs.existsSync(path.join(claims, key + '.json'))) return {ok: false, reason: 'Submission already claimed; never replay'};
  const prepared = {ok: true, preparationId, dispatchId, inputs: live.inputs, script: live.script,
    requestHash: hash(live.request),
    ...source, digests: [[JSON.stringify(live.inputs.plan), live.inputs.state.planHash],
      [JSON.stringify(live.inputs.fingerprint), live.inputs.state.fingerprintHash]]};
  atomic(path.join(live.base, preparationId + '.prepared.json'), {requestPath: path.resolve(requestPath), key, prepared});
  return prepared;
}
export function claim(base, preparationId) {
  if (!/^[a-f0-9-]{36}$/.test(preparationId)) throw Error('Invalid preparation ID');
  const saved = read(path.join(base, preparationId + '.prepared.json'));
  const live = load(saved.requestPath), prior = saved.prepared;
  const currentSources = sources();
  if (live.base !== path.resolve(base) || currentSources.runtimeHash !== prior.runtimeHash ||
      currentSources.hostHash !== prior.hostHash || currentSources.transportHash !== prior.transportHash ||
      currentSources.codeHostHash !== prior.codeHostHash ||
      hash(live.request) !== prior.requestHash || hash(live.inputs.clock) !== hash(prior.inputs.clock) ||
      live.script !== prior.script || hash(live.inputs.plan) !== hash(prior.inputs.plan) ||
      hash(live.inputs.state) !== hash(prior.inputs.state) ||
      hash(live.inputs.fingerprint) !== hash(prior.inputs.fingerprint) ||
      live.inputs.caseId !== prior.inputs.caseId || live.inputs.submissionId !== prior.inputs.submissionId ||
      live.inputs.commandExitCode !== prior.inputs.commandExitCode) return {ok: false, reason: 'Persisted dispatch binding changed'};
  const auth = evaluateAuthorization(live.inputs);
  if (!auth.allowBrowserAction) return {ok: false, reason: auth.reason};
  const receiptPath = path.join(base, 'dispatches', saved.key + '.json');
  // Exclusive creation consumes the submission across processes BEFORE the tool is invoked.
  try {
    fs.writeFileSync(receiptPath, JSON.stringify({preparationId, dispatchId: prior.dispatchId,
      scriptHash: hash(live.script), runtimeHash: prior.runtimeHash, claimedAt: Date.now(),
      status: 'claimed-outcome-unknown'}), {flag: 'wx', mode: 0o600});
  } catch (error) {if (error.code === 'EEXIST') return {ok: false, reason: 'Submission already claimed'}; throw error;}
  atomic(live.clockPath, auth.chargedClock);
  return {ok: true, inputs: {...live.inputs, clock: auth.chargedClock}};
}
export function finish(base, result) {
  if (!/^[a-f0-9-]{36}$/.test(result.preparationId)) throw Error('Invalid preparation ID');
  const saved = read(path.join(base, result.preparationId + '.prepared.json'));
  const live = load(saved.requestPath);
  const file = path.join(base, 'dispatches', saved.key + '.json');
  // No claim means the action was refused before dispatch; do not create a false claim.
  if (!fs.existsSync(file)) return {ok: true, claimed: false};
  const receipt = read(file);
  if (receipt.preparationId !== result.preparationId || receipt.completedAt) throw Error('Receipt already completed or wrong preparation');
  if (result.chargedClock) {
    const current = read(live.clockPath);
    if (result.chargedClock.lastAt < current.lastAt || result.chargedClock.chargedMs < current.chargedMs) throw Error('Clock regression');
    atomic(live.clockPath, result.chargedClock);
  }
  atomic(file, {...receipt, completedAt: Date.now(), executed: result.executed === true,
    toolCalls: result.toolCalls, uncertain: result.uncertain === true, status: 'consumed'});
  return {ok: true, claimed: true};
}
export const SLICE_MAX = 4096;
export function slice(file, offsetRaw, lengthRaw) {
  const offset = Number(offsetRaw), length = Number(lengthRaw);
  if (!Number.isInteger(offset) || !Number.isInteger(length) || offset < 0 || length < 1 || length > SLICE_MAX) {
    return {ok: false, reason: 'Invalid slice'};
  }
  const buf = fs.readFileSync(path.resolve(file));
  if (offset > buf.length) return {ok: false, reason: 'Slice offset past end'};
  const part = buf.subarray(offset, Math.min(offset + length, buf.length));
  return {ok: true, offset, length: part.length, total: buf.length,
    sha256: createHash('sha256').update(part).digest('hex'), data: part.toString('base64')};
}
// Validate the bytes received by the tool host, not merely the unchanged disk file.
export function verifySlice(file, offsetRaw, data, sha256) {
  const offset = Number(offsetRaw);
  if (!Number.isInteger(offset) || offset < 0 || typeof data !== 'string' ||
      data.length > Math.ceil(SLICE_MAX / 3) * 4 || !/^[a-f0-9]{64}$/.test(sha256)) {
    return {ok: false, reason: 'Invalid received slice'};
  }
  const received = Buffer.from(data, 'base64');
  if (!received.length || received.length > SLICE_MAX || received.toString('base64') !== data) {
    return {ok: false, reason: 'Invalid received slice'};
  }
  const durable = fs.readFileSync(path.resolve(file)).subarray(offset, offset + received.length);
  const digest = createHash('sha256').update(received).digest('hex');
  if (!received.equals(durable) || digest !== sha256) return {ok: false, reason: 'Received slice mismatch'};
  return {ok: true, offset, length: received.length, sha256: digest};
}
function fileDigest(file) {
  const raw = fs.readFileSync(path.resolve(file));
  return {raw, sha256: createHash('sha256').update(raw).digest('hex'), bytes: raw.length};
}
function prepareEnvelope(requestPath) {
  const prepared = prepare(requestPath);
  if (!prepared.ok) return prepared;
  const file = path.join(path.dirname(path.resolve(requestPath)), prepared.preparationId + '.prepared.json');
  const {sha256, bytes} = fileDigest(file);
  return {ok: true, preparationId: prepared.preparationId, dispatchId: prepared.dispatchId, file, sha256, bytes,
    planHash: prepared.inputs.state.planHash, fingerprintHash: prepared.inputs.state.fingerprintHash,
    requestHash: prepared.requestHash, runtimeHash: prepared.runtimeHash};
}
function claimEnvelope(base, preparationId) {
  const result = claim(base, preparationId);
  if (!result.ok) return result;
  const saved = read(path.join(base, preparationId + '.prepared.json'));
  const payload = {ok: true, preparationId, chargedClock: result.inputs.clock, planHash: hash(result.inputs.plan),
    fingerprintHash: hash(result.inputs.fingerprint), stateHash: hash(result.inputs.state),
    runtimeHash: saved.prepared.runtimeHash};
  const file = path.join(base, preparationId + '.claimed.json');
  atomic(file, payload);
  const {sha256, bytes} = fileDigest(file);
  return {ok: true, file, sha256, bytes, preparationId, planHash: payload.planHash,
    fingerprintHash: payload.fingerprintHash, runtimeHash: payload.runtimeHash};
}
function confirm(file, sha256, bytesRaw, kind = 'prepare') {
  const bytes = Number(bytesRaw);
  const digest = fileDigest(file);
  if (digest.sha256 !== sha256 || digest.bytes !== bytes) return {ok: false, reason: 'Payload hash mismatch'};
  const parsed = JSON.parse(digest.raw.toString('utf8'));
  const prepared = kind === 'claim' ? parsed : parsed.prepared;
  if (!prepared?.ok || !prepared.preparationId) return {ok: false, reason: 'Durable preparation missing'};
  return {ok: true, preparationId: prepared.preparationId, dispatchId: prepared.dispatchId,
    runtimeHash: prepared.runtimeHash, requestHash: prepared.requestHash, bytes: digest.bytes,
    planHash: prepared.planHash, fingerprintHash: prepared.fingerprintHash};
}
if (typeof process !== 'undefined' && process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [command, file, argument, extra, digest] = process.argv.slice(2);
  try {
    const result = command === 'prepare' ? prepareEnvelope(file)
      : command === 'claim' ? claimEnvelope(file, argument)
      : command === 'finish' ? finish(file, JSON.parse(fs.readFileSync(argument, 'utf8')))
      : command === 'slice' ? slice(file, argument, extra)
      : command === 'verify-slice' ? verifySlice(file, argument, extra, digest)
      : command === 'confirm-claim' ? confirm(file, argument, extra, 'claim')
      : command === 'confirm' ? confirm(file, argument, extra)
      : null;
    if (!result) throw Error('Use prepare request.json / claim runDir preparationId / finish runDir result.json / slice file offset length / verify-slice file offset base64 sha256 / confirm[-claim] file sha256 bytes');
    process.stdout.write(JSON.stringify(result));
  } catch {process.stdout.write(JSON.stringify({ok: false, reason: 'Host operation refused; inspect private evidence'})); process.exitCode = 1;}
}
