import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, writeFileSync, existsSync, readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {initialize, transition} from '../../scripts/operator-queue.mjs';
import {openClock, advanceClock} from '../../scripts/operator-clock.mjs';
import {
  authorizeBusinessBrowserAction,
  executeAuthorizedBrowserAction,
} from '../../scripts/operator-action-guard.mjs';

const sha = 'a'.repeat(40);
const plan = {
  schemaVersion: 1,
  id: 'unit',
  candidate: 'v1.0.0',
  productSha: sha,
  cases: [
    {id: 'one', precondition: 'fixture', expected: 'one accepted event', evidence: ['readback']},
    {id: 'two', precondition: 'independent', expected: 'safe', evidence: ['readback']},
  ],
};
const fp = {
  productSha: sha,
  liveStamp: 'v1.0.0 · aaaaaaa',
  qaSha: 'b'.repeat(40),
  rulesHash: 'unit',
  libraryHash: 'unit',
  schema: 'unit',
  configuration: 'unit',
  actor: 'unit',
  fixture: 'unit',
};
const clock = () => openClock(100, 15, 0);

function withIntent() {
  let state = transition(plan, initialize(plan, fp), fp, 'start', 'one');
  return transition(plan, state, fp, 'intent', 'one', {submissionId: 's1', action: 'Post invoice'});
}

function input(overrides = {}) {
  return {
    commandExitCode: 0,
    plan,
    state: withIntent(),
    fingerprint: fp,
    clock: clock(),
    caseId: 'one',
    submissionId: 's1',
    ...overrides,
  };
}

async function spyBrowse(auth) {
  let calls = 0;
  const out = await executeAuthorizedBrowserAction(auth, async () => {
    calls += 1;
    return {clicked: 'Post'};
  });
  return {calls, out};
}

test('authorized checkpoint invokes the approved browser action once', async () => {
  const auth = authorizeBusinessBrowserAction(input());
  assert.equal(auth.allowBrowserAction, true);
  const {calls, out} = await spyBrowse(auth);
  assert.equal(calls, 1);
  assert.equal(out.executed, true);
  assert.equal(out.result.clicked, 'Post');
});

test('rejected start command exit causes zero browser action', async () => {
  const auth = authorizeBusinessBrowserAction(
    input({commandExitCode: 1, state: initialize(plan, fp), submissionId: 's1'}),
  );
  assert.equal(auth.allowBrowserAction, false);
  const {calls, out} = await spyBrowse(auth);
  assert.equal(calls, 0);
  assert.equal(out.executed, false);
});

test('rejected intent does not authorize posting even when a start response looked running', async () => {
  // Light07 L07-SALE: start stdout appeared running, persisted ledger lacked it, intent rejected, operator still posted.
  const persisted = initialize(plan, fp);
  const auth = authorizeBusinessBrowserAction({
    commandExitCode: 1,
    plan,
    state: persisted,
    fingerprint: fp,
    clock: clock(),
    caseId: 'one',
    submissionId: 's1',
  });
  assert.equal(auth.allowBrowserAction, false);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('missing persisted intent on a running case causes zero browser action', async () => {
  const running = transition(plan, initialize(plan, fp), fp, 'start', 'one');
  const auth = authorizeBusinessBrowserAction(input({state: running}));
  assert.match(auth.reason, /Persisted intent/);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('stale submission identity does not authorize a browser action', async () => {
  const auth = authorizeBusinessBrowserAction(input({submissionId: 'stale'}));
  assert.match(auth.reason, /Persisted intent/);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('unresolved other submission causes zero new browser action', async () => {
  const forged = structuredClone(withIntent());
  forged.cases[1].status = 'running';
  forged.cases[1].submissions = [
    {submissionId: 's2', action: 'Post other', outcome: 'unresolved', at: new Date().toISOString()},
  ];
  const auth = authorizeBusinessBrowserAction(
    input({state: forged, caseId: 'two', submissionId: 's2'}),
  );
  assert.match(auth.reason, /Unresolved mission submission/);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('mismatched fingerprint causes zero browser action', async () => {
  const auth = authorizeBusinessBrowserAction(input({fingerprint: {...fp, configuration: 'changed'}}));
  assert.equal(auth.allowBrowserAction, false);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('budget boundary causes zero browser action', async () => {
  const spent = advanceClock(clock(), 'check', 85 * 60000);
  const auth = authorizeBusinessBrowserAction(input({clock: spent}));
  assert.match(auth.reason, /Clock refuses/);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('missing command exit code is fail-closed and does not call the browser', async () => {
  const auth = authorizeBusinessBrowserAction(input({commandExitCode: undefined}));
  assert.equal(auth.allowBrowserAction, false);
  const {calls} = await spyBrowse(auth);
  assert.equal(calls, 0);
});

test('late recovery after a rejected intent does not authorize the original submit', async () => {
  const rejected = authorizeBusinessBrowserAction(
    input({commandExitCode: 1, state: initialize(plan, fp)}),
  );
  assert.equal(rejected.allowBrowserAction, false);
  const recovered = withIntent();
  const later = authorizeBusinessBrowserAction(input({state: recovered, commandExitCode: 0}));
  assert.equal(later.allowBrowserAction, true);
  const {calls: rejectedCalls} = await spyBrowse(rejected);
  assert.equal(rejectedCalls, 0);
});

test('CLI execute with rejected intent never spawns the browser command', () => {
  const dir = mkdtempSync(join(tmpdir(), 'op-guard-'));
  const marker = join(dir, 'browser-ran.txt');
  const state = initialize(plan, fp);
  writeFileSync(join(dir, 'plan.json'), JSON.stringify(plan));
  writeFileSync(join(dir, 'state.json'), JSON.stringify(state));
  writeFileSync(join(dir, 'fp.json'), JSON.stringify(fp));
  writeFileSync(join(dir, 'clock.json'), JSON.stringify(clock()));
  const script = fileURLToPath(new URL('../../scripts/operator-action-guard.mjs', import.meta.url));
  const r = spawnSync(
    process.execPath,
    [
      script,
      'execute',
      join(dir, 'plan.json'),
      join(dir, 'state.json'),
      join(dir, 'fp.json'),
      join(dir, 'clock.json'),
      'one',
      's1',
      '1',
      '--',
      process.execPath,
      '-e',
      `require('fs').writeFileSync(${JSON.stringify(marker)}, 'ran')`,
    ],
    {encoding: 'utf8'},
  );
  assert.notEqual(r.status, 0);
  assert.equal(existsSync(marker), false);
  const auth = JSON.parse(r.stdout);
  assert.equal(auth.allowBrowserAction, false);
});

test('CLI execute with a valid checkpoint runs the approved command', () => {
  const dir = mkdtempSync(join(tmpdir(), 'op-guard-ok-'));
  const marker = join(dir, 'browser-ran.txt');
  writeFileSync(join(dir, 'plan.json'), JSON.stringify(plan));
  writeFileSync(join(dir, 'state.json'), JSON.stringify(withIntent()));
  writeFileSync(join(dir, 'fp.json'), JSON.stringify(fp));
  writeFileSync(join(dir, 'clock.json'), JSON.stringify(clock()));
  const script = fileURLToPath(new URL('../../scripts/operator-action-guard.mjs', import.meta.url));
  const r = spawnSync(
    process.execPath,
    [
      script,
      'execute',
      join(dir, 'plan.json'),
      join(dir, 'state.json'),
      join(dir, 'fp.json'),
      join(dir, 'clock.json'),
      'one',
      's1',
      '0',
      '--',
      process.execPath,
      '-e',
      `require('fs').writeFileSync(${JSON.stringify(marker)}, 'ran')`,
    ],
    {encoding: 'utf8'},
  );
  assert.equal(r.status, 0);
  assert.equal(readFileSync(marker, 'utf8'), 'ran');
});
