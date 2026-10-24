// Fail-closed gate between operator checkpoints and a business browser action.
// Does not drive browsers itself. Approved runtime remains pnpm agent:browse.
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {guard} from './operator-queue.mjs';
import {clockReport} from './operator-clock.mjs';

function deny(reason) {
  return {allowBrowserAction: false, reason};
}

export function authorizeBusinessBrowserAction({
  commandExitCode,
  plan,
  state,
  fingerprint,
  clock,
  caseId,
  submissionId,
}) {
  if (commandExitCode !== 0) {
    return deny('Rejected checkpoint command: browser action refused');
  }
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
  let report;
  try {
    report = clockReport(clock);
  } catch (e) {
    return deny(e instanceof Error ? e.message : String(e));
  }
  if (report.allowNewBusinessSubmission !== true) {
    return deny('Clock refuses new business submission');
  }
  return {allowBrowserAction: true, reason: null};
}

export async function executeAuthorizedBrowserAction(auth, browseFn) {
  if (typeof browseFn !== 'function') {
    throw Error('Approved browser function required');
  }
  if (!auth?.allowBrowserAction) {
    return {executed: false, reason: auth?.reason ?? 'Unauthorized browser action'};
  }
  const result = await browseFn();
  return {executed: true, result};
}

function parseExitCode(raw) {
  if (raw === '0') return 0;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) return 1;
  return n;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const argv = process.argv.slice(2);
  const command = argv[0];
  if (!['authorize', 'execute'].includes(command)) {
    throw Error('Use authorize/execute');
  }
  const dash = argv.indexOf('--');
  const positional = (dash >= 0 ? argv.slice(1, dash) : argv.slice(1));
  const browseArgv = dash >= 0 ? argv.slice(dash + 1) : [];
  const [planPath, statePath, fingerprintPath, clockPath, caseId, submissionId, exitRaw] = positional;
  if (!planPath || !statePath || !fingerprintPath || !clockPath || !caseId || !submissionId) {
    throw Error('plan state fingerprint clock caseId submissionId commandExitCode required');
  }
  const read = p => JSON.parse(readFileSync(p, 'utf8'));
  const auth = authorizeBusinessBrowserAction({
    commandExitCode: parseExitCode(exitRaw),
    plan: read(planPath),
    state: read(statePath),
    fingerprint: read(fingerprintPath),
    clock: read(clockPath),
    caseId,
    submissionId,
  });
  console.log(JSON.stringify(auth, null, 2));
  if (!auth.allowBrowserAction) process.exit(1);
  if (command === 'authorize') process.exit(0);
  if (!browseArgv.length) {
    console.error('execute requires -- followed by the approved browser command');
    process.exit(1);
  }
  const ran = spawnSync(browseArgv[0], browseArgv.slice(1), {stdio: 'inherit'});
  process.exit(ran.status ?? 1);
}
