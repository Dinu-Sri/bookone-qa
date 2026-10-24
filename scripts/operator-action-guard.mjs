// Fail-closed gate between operator checkpoints and a business Browser-app write.
// The approved write surface is the connected Browser app `js` tool.
// Do not independently click after a Boolean authorization.
import {randomUUID} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync, renameSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {guard} from './operator-queue.mjs';
import {advanceClock, clockReport} from './operator-clock.mjs';

function deny(reason, extra = {}) {
  return {allowBrowserAction: false, reason, consumed: true, ...extra};
}

function dispatchNow(opts) {
  return Number.isFinite(opts?.now) ? opts.now : Date.now();
}

export function chargeClockToDispatch(clock, now) {
  if (!clock || typeof clock !== 'object') throw Error('Clock required');
  if (!Number.isFinite(clock.lastAt) || !Number.isFinite(now)) throw Error('Malformed clock timestamp');
  return advanceClock(clock, 'check', now);
}

export function evaluateAuthorization(opts = {}) {
  const now = dispatchNow(opts);
  if (opts.commandExitCode !== 0) {
    return deny('Rejected checkpoint command: browser action refused');
  }
  const {plan, state, fingerprint, clock, caseId, submissionId} = opts;
  try {
    guard(plan, state, fingerprint);
  } catch (e) {
    return deny(e instanceof Error ? e.message : String(e));
  }
  const row = state?.cases?.find(c => c.id === caseId);
  if (!row || row.status !== 'running') {
    return deny('Persisted running case required');
  }
  const submission = row.submissions?.find(s => s.submissionId === submissionId);
  if (!submission) {
    return deny('Persisted intent required');
  }
  if (submission.outcome !== 'unresolved') {
    return deny('Persisted unresolved intent required');
  }
  const otherUnresolved = state.cases.some(c =>
    c.submissions?.some(
      s => s.outcome === 'unresolved' && !(c.id === caseId && s.submissionId === submissionId),
    ),
  );
  if (otherUnresolved) {
    return deny('Unresolved mission submission: browser action refused');
  }
  let chargedClock;
  try {
    chargedClock = chargeClockToDispatch(clock, now);
  } catch (e) {
    return deny(e instanceof Error ? e.message : String(e));
  }
  const report = clockReport(chargedClock);
  if (report.allowNewBusinessSubmission !== true) {
    return deny('Clock refuses new business submission', {chargedClock});
  }
  return {allowBrowserAction: true, reason: null, consumed: false, chargedClock, now};
}

const dispatchedIds = new Set();

export function authorizeBusinessBrowserAction(opts = {}) {
  const evaluated = evaluateAuthorization(opts);
  if (!evaluated.allowBrowserAction) return evaluated;
  return {
    ...evaluated,
    dispatchId: randomUUID(),
    consumed: false,
    bound: {caseId: opts.caseId, submissionId: opts.submissionId},
  };
}

function alreadyDispatched(auth) {
  if (auth?.consumed) return true;
  return typeof auth?.dispatchId === 'string' && dispatchedIds.has(auth.dispatchId);
}

function markDispatched(auth) {
  auth.consumed = true;
  if (typeof auth.dispatchId === 'string' && auth.dispatchId) {
    dispatchedIds.add(auth.dispatchId);
  }
}

function liveDispatchInputs(auth, live) {
  if (!live?.plan || !live?.state || !live?.fingerprint || !live?.clock) {
    throw Error('Live persisted inputs required at dispatch');
  }
  const caseId = auth?.bound?.caseId;
  const submissionId = auth?.bound?.submissionId;
  if (!caseId || !submissionId) {
    throw Error('Authorization is not bound to a persisted action');
  }
  if ((live.caseId && live.caseId !== caseId) || (live.submissionId && live.submissionId !== submissionId)) {
    throw Error('Authorization does not match persisted action');
  }
  return {
    commandExitCode: live.commandExitCode,
    plan: live.plan,
    state: live.state,
    fingerprint: live.fingerprint,
    clock: live.clock,
    caseId,
    submissionId,
    now: live.now,
  };
}

export async function executeAuthorizedBrowserAction(auth, browseFn, live) {
  if (typeof browseFn !== 'function') {
    throw Error('Approved browser function required');
  }
  if (!auth?.allowBrowserAction) {
    return {
      executed: false,
      reason: auth?.reason ?? 'Unauthorized browser action',
      chargedClock: auth?.chargedClock,
    };
  }
  if (alreadyDispatched(auth)) {
    return {executed: false, reason: 'Authorization already dispatched'};
  }
  markDispatched(auth);
  let inputs;
  try {
    inputs = liveDispatchInputs(auth, live);
  } catch (e) {
    return {executed: false, reason: e instanceof Error ? e.message : String(e)};
  }
  const recheck = evaluateAuthorization(inputs);
  if (!recheck.allowBrowserAction) {
    return {executed: false, reason: recheck.reason, chargedClock: recheck.chargedClock};
  }
  try {
    const result = await browseFn();
    return {executed: true, result, chargedClock: recheck.chargedClock, dispatchId: auth.dispatchId};
  } catch (e) {
    return {
      executed: false,
      uncertain: true,
      reason: `Uncertain dispatch: ${e instanceof Error ? e.message : String(e)}`,
      chargedClock: recheck.chargedClock,
    };
  }
}

/** Required path for a business write in the connected Browser app. `js` is that app's js tool. */
export async function dispatchBrowserAppWrite(inputs, surface = {}) {
  const js = surface.js;
  const script = surface.script;
  if (typeof js !== 'function') {
    throw Error('Connected Browser app js tool required');
  }
  if (typeof script !== 'string' || !script.trim()) {
    throw Error('Browser js script required');
  }
  const now = dispatchNow(inputs);
  const live = {...inputs, now};
  const auth = authorizeBusinessBrowserAction(live);
  return executeAuthorizedBrowserAction(auth, () => js(script), live);
}

function parseExitCode(raw) {
  if (raw === '0') return 0;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) return 1;
  return n;
}

function persistClock(clockPath, chargedClock) {
  if (!chargedClock) return;
  const temp = clockPath + '.tmp';
  writeFileSync(temp, JSON.stringify(chargedClock, null, 2) + '\n', {flag: 'wx'});
  renameSync(temp, clockPath);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2);
  const command = argv[0];
  if (!['authorize', 'execute'].includes(command)) {
    throw Error('Use authorize/execute');
  }
  const dash = argv.indexOf('--');
  const positional = dash >= 0 ? argv.slice(1, dash) : argv.slice(1);
  const browseArgv = dash >= 0 ? argv.slice(dash + 1) : [];
  const [planPath, statePath, fingerprintPath, clockPath, caseId, submissionId, exitRaw] = positional;
  if (!planPath || !statePath || !fingerprintPath || !clockPath || !caseId || !submissionId) {
    throw Error('plan state fingerprint clock caseId submissionId commandExitCode required');
  }
  const read = p => JSON.parse(readFileSync(p, 'utf8'));
  const live = {
    commandExitCode: parseExitCode(exitRaw),
    plan: read(planPath),
    state: read(statePath),
    fingerprint: read(fingerprintPath),
    clock: read(clockPath),
    caseId,
    submissionId,
    now: Date.now(),
  };
  const auth = authorizeBusinessBrowserAction(live);
  persistClock(clockPath, auth.chargedClock);
  console.log(JSON.stringify({allowBrowserAction: auth.allowBrowserAction, reason: auth.reason, dispatchId: auth.dispatchId}, null, 2));
  if (!auth.allowBrowserAction) process.exit(1);
  if (command === 'authorize') {
    console.error('authorize is not a write. Dispatch through dispatchBrowserAppWrite with the connected Browser app js tool.');
    process.exit(0);
  }
  live.clock = auth.chargedClock ?? live.clock;
  live.plan = read(planPath);
  live.state = read(statePath);
  live.fingerprint = read(fingerprintPath);
  if (!browseArgv.length) {
    console.error('execute requires -- followed by a command; financial writes must use dispatchBrowserAppWrite(js).');
    process.exit(1);
  }
  const dispatched = await executeAuthorizedBrowserAction(
    auth,
    () => {
      const ran = spawnSync(browseArgv[0], browseArgv.slice(1), {stdio: 'inherit'});
      if ((ran.status ?? 1) !== 0) throw Error(`browser command exited ${ran.status ?? 1}`);
      return {status: ran.status ?? 0};
    },
    live,
  );
  persistClock(clockPath, dispatched.chargedClock);
  if (!dispatched.executed) {
    console.error(dispatched.reason);
    process.exit(1);
  }
  process.exit(0);
}
