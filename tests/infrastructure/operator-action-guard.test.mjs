import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, writeFileSync, existsSync, readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {initialize, transition} from '../../scripts/operator-queue.mjs';
import {openClock, advanceClock, clockReport} from '../../scripts/operator-clock.mjs';
import {
  authorizeBusinessBrowserAction,
  executeAuthorizedBrowserAction,
  dispatchBrowserAppWrite,
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
const OPEN = 0;
const FRESH = 1000;
const THRESHOLD = 85 * 60000;

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
    clock: openClock(100, 15, OPEN),
    caseId: 'one',
    submissionId: 's1',
    now: FRESH,
    ...overrides,
  };
}

function jsMustNotRun() {
  return async function js() {
    throw Error('Browser app js must not run');
  };
}

async function dispatch(overrides, script = 'void 0') {
  const calls = [];
  async function js(s) {
    calls.push(s);
    return {ok: true, script: s};
  }
  const out = await dispatchBrowserAppWrite(input(overrides), {js, script});
  return {out, calls};
}

test('Browser app js positive control runs the inert script once', async () => {
  const {out, calls} = await dispatch({}, 'document.title');
  assert.equal(out.executed, true);
  assert.deepEqual(calls, ['document.title']);
  assert.equal(out.result.script, 'document.title');
});

test('missing Browser app js tool is refused and has no Playwright fallback', async () => {
  await assert.rejects(
    () => dispatchBrowserAppWrite(input(), {script: 'document.title'}),
    /Connected Browser app js tool required/,
  );
});

test('empty Browser app script is refused', async () => {
  await assert.rejects(
    () => dispatchBrowserAppWrite(input(), {js: jsMustNotRun(), script: '  '}),
    /Browser js script required/,
  );
});

test('active clock still under the execution threshold since last check allows js once', async () => {
  const {out, calls} = await dispatch({now: 80 * 60000}, 'document.title');
  assert.equal(out.executed, true);
  assert.deepEqual(calls, ['document.title']);
  assert.ok(out.chargedClock.chargedMs < THRESHOLD);
});

test('rejected start command exit causes zero Browser app js calls', async () => {
  const out = await dispatchBrowserAppWrite(input({commandExitCode: 1, state: initialize(plan, fp)}), {
    js: jsMustNotRun(),
    script: 'document.querySelector("button").click()',
  });
  assert.equal(out.executed, false);
});

test('rejected intent does not invoke js even when a start response looked running', async () => {
  const out = await dispatchBrowserAppWrite(
    input({commandExitCode: 1, state: initialize(plan, fp)}),
    {js: jsMustNotRun(), script: 'click()'},
  );
  assert.equal(out.executed, false);
});

test('missing persisted intent on a running case causes zero js calls', async () => {
  const running = transition(plan, initialize(plan, fp), fp, 'start', 'one');
  const {out, calls} = await dispatch({state: running});
  assert.equal(calls.length, 0);
  assert.match(out.reason, /Persisted intent/);
});

test('stale submission identity does not invoke js', async () => {
  const {out, calls} = await dispatch({submissionId: 'stale'});
  assert.equal(calls.length, 0);
  assert.match(out.reason, /Persisted intent/);
});

test('unresolved other submission causes zero js calls', async () => {
  const forged = structuredClone(withIntent());
  forged.cases[1].status = 'running';
  forged.cases[1].submissions = [
    {submissionId: 's2', action: 'Post other', outcome: 'unresolved', at: new Date().toISOString()},
  ];
  const {out, calls} = await dispatch({state: forged, caseId: 'two', submissionId: 's2'});
  assert.equal(calls.length, 0);
  assert.match(out.reason, /Unresolved mission submission/);
});

test('mismatched fingerprint causes zero js calls', async () => {
  const {out, calls} = await dispatch({fingerprint: {...fp, configuration: 'changed'}});
  assert.equal(calls.length, 0);
  assert.equal(out.executed, false);
});

test('missing command exit code is fail-closed and does not invoke js', async () => {
  const {out, calls} = await dispatch({commandExitCode: undefined});
  assert.equal(calls.length, 0);
  assert.equal(out.executed, false);
});

test('stale active clock that crossed the execution threshold since last check refuses js', async () => {
  const stale = openClock(100, 15, OPEN);
  assert.equal(stale.chargedMs, 0);
  assert.equal(clockReport(stale).allowNewBusinessSubmission, true);
  const out = await dispatchBrowserAppWrite(input({clock: stale, now: 90 * 60000}), {
    js: jsMustNotRun(),
    script: 'document.querySelector("[type=submit]").click()',
  });
  assert.equal(out.executed, false);
  assert.match(out.reason, /Clock refuses/);
  assert.ok(out.chargedClock.chargedMs >= THRESHOLD);
});

test('paused clock refuses a new Browser app write', async () => {
  const paused = advanceClock(openClock(100, 15, OPEN), 'pause', FRESH, 'owner interruption');
  const out = await dispatchBrowserAppWrite(input({clock: paused, now: 10 * 60000}), {
    js: jsMustNotRun(),
    script: 'click()',
  });
  assert.equal(out.executed, false);
  assert.match(out.reason, /Clock refuses/);
});

test('closed clock refuses a new Browser app write', async () => {
  const closed = advanceClock(openClock(100, 15, OPEN), 'close', FRESH);
  const out = await dispatchBrowserAppWrite(input({clock: closed, now: 2000}), {
    js: jsMustNotRun(),
    script: 'click()',
  });
  assert.equal(out.executed, false);
});

test('malformed clock timestamp refuses js', async () => {
  const bad = {...openClock(100, 15, OPEN), lastAt: 'nope'};
  const out = await dispatchBrowserAppWrite(input({clock: bad}), {js: jsMustNotRun(), script: 'click()'});
  assert.equal(out.executed, false);
  assert.match(out.reason, /Malformed clock timestamp/);
});

test('backward dispatch timestamp refuses js', async () => {
  const clock = openClock(100, 15, 5000);
  const out = await dispatchBrowserAppWrite(input({clock, now: 1000}), {
    js: jsMustNotRun(),
    script: 'click()',
  });
  assert.equal(out.executed, false);
  assert.match(out.reason, /time reversal/);
});

test('intent becoming resolved after authorization causes zero js calls', async () => {
  const live = input();
  const auth = authorizeBusinessBrowserAction(live);
  assert.equal(auth.allowBrowserAction, true);
  const resolved = transition(plan, live.state, fp, 'readback', 'one', {
    submissionId: 's1',
    outcome: 'accepted',
    actual: 'posted once',
  });
  const out = await executeAuthorizedBrowserAction(auth, jsMustNotRun(), {
    ...live,
    state: resolved,
  });
  assert.equal(out.executed, false);
  assert.match(out.reason, /unresolved intent/);
});

test('fingerprint changing after authorization causes zero js calls', async () => {
  const live = input();
  const auth = authorizeBusinessBrowserAction(live);
  const out = await executeAuthorizedBrowserAction(auth, jsMustNotRun(), {
    ...live,
    fingerprint: {...fp, configuration: 'changed'},
  });
  assert.equal(out.executed, false);
});

test('clock expiring after authorization causes zero js calls', async () => {
  const live = input({now: FRESH});
  const auth = authorizeBusinessBrowserAction(live);
  assert.equal(auth.allowBrowserAction, true);
  const out = await executeAuthorizedBrowserAction(auth, jsMustNotRun(), {
    ...live,
    now: 90 * 60000,
  });
  assert.equal(out.executed, false);
  assert.match(out.reason, /Clock refuses/);
});

test('second invocation of the same authorization does not invoke js again', async () => {
  const live = input();
  const auth = authorizeBusinessBrowserAction(live);
  const calls = [];
  async function js(script) {
    calls.push(script);
    return {ok: true};
  }
  const first = await executeAuthorizedBrowserAction(auth, () => js('once'), live);
  const second = await executeAuthorizedBrowserAction(auth, () => js('twice'), live);
  assert.equal(first.executed, true);
  assert.equal(second.executed, false);
  assert.match(second.reason, /already dispatched/);
  assert.deepEqual(calls, ['once']);
});

test('cloned authorization after the first dispatch does not invoke js again', async () => {
  const live = input();
  const auth = authorizeBusinessBrowserAction(live);
  const clone = {...auth};
  const calls = [];
  async function js(script) {
    calls.push(script);
    return {ok: true};
  }
  const first = await executeAuthorizedBrowserAction(auth, () => js('once'), live);
  const second = await executeAuthorizedBrowserAction(clone, () => js('clone'), live);
  assert.equal(first.executed, true);
  assert.equal(second.executed, false);
  assert.match(second.reason, /already dispatched/);
  assert.deepEqual(calls, ['once']);
});

test('authorization bound to a different persisted action causes zero js calls', async () => {
  const live = input();
  const auth = authorizeBusinessBrowserAction(live);
  const out = await executeAuthorizedBrowserAction(auth, jsMustNotRun(), {
    ...live,
    caseId: 'two',
    submissionId: 's2',
  });
  assert.equal(out.executed, false);
  assert.match(out.reason, /does not match persisted action/);
});

test('uncertain dispatch consumes the ticket and is not replayed', async () => {
  const live = input();
  const auth = authorizeBusinessBrowserAction(live);
  const first = await executeAuthorizedBrowserAction(
    auth,
    async () => {
      throw Error('page closed');
    },
    live,
  );
  assert.equal(first.executed, false);
  assert.equal(first.uncertain, true);
  const calls = [];
  const second = await executeAuthorizedBrowserAction(
    auth,
    async () => {
      calls.push('replay');
    },
    live,
  );
  assert.equal(second.executed, false);
  assert.equal(calls.length, 0);
});

test('late recovery after a rejected intent does not authorize the original submit', async () => {
  const rejected = await dispatchBrowserAppWrite(input({commandExitCode: 1, state: initialize(plan, fp)}), {
    js: jsMustNotRun(),
    script: 'click()',
  });
  assert.equal(rejected.executed, false);
  const {out, calls} = await dispatch({});
  assert.equal(out.executed, true);
  assert.equal(calls.length, 1);
});

test('CLI execute with rejected intent never spawns the browser command', () => {
  const dir = mkdtempSync(join(tmpdir(), 'op-guard-'));
  const marker = join(dir, 'browser-ran.txt');
  writeFileSync(join(dir, 'plan.json'), JSON.stringify(plan));
  writeFileSync(join(dir, 'state.json'), JSON.stringify(initialize(plan, fp)));
  writeFileSync(join(dir, 'fp.json'), JSON.stringify(fp));
  writeFileSync(join(dir, 'clock.json'), JSON.stringify(openClock(100, 15)));
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

test('CLI execute with a valid checkpoint runs the approved command once', () => {
  const dir = mkdtempSync(join(tmpdir(), 'op-guard-ok-'));
  const marker = join(dir, 'browser-ran.txt');
  writeFileSync(join(dir, 'plan.json'), JSON.stringify(plan));
  writeFileSync(join(dir, 'state.json'), JSON.stringify(withIntent()));
  writeFileSync(join(dir, 'fp.json'), JSON.stringify(fp));
  writeFileSync(join(dir, 'clock.json'), JSON.stringify(openClock(100, 15)));
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
  assert.equal(r.status, 0, r.stderr);
  assert.equal(readFileSync(marker, 'utf8'), 'ran');
});
