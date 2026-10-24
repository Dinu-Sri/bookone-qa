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
  const runtimeSource = extract(queue, 'const required =', 'if(process.argv[1]') +
    extract(clock, 'export function openClock', 'if(process.argv[1]') +
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
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [command, file, argument] = process.argv.slice(2);
  try {
    const result = command === 'prepare' ? prepare(file) : command === 'claim' ? claim(file, argument) :
      command === 'finish' ? finish(file, JSON.parse(fs.readFileSync(argument, 'utf8'))) : null;
    if (!result) throw Error('Use prepare request.json / claim runDir preparationId / finish runDir result.json');
    process.stdout.write(JSON.stringify(result));
  } catch {process.stdout.write(JSON.stringify({ok: false, reason: 'Host operation refused; inspect private evidence'})); process.exitCode = 1;}
}
