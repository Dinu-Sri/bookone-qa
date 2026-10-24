import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {initialize, transition} from '../../scripts/operator-queue.mjs';
import {openClock} from '../../scripts/operator-clock.mjs';
import {prepare, claim, finish} from '../../scripts/operator-browser-host.mjs';
import {dispatchConnectedBrowser} from '../../scripts/operator-browser-transport.mjs';
import {runPersistedBrowserRequest} from '../../scripts/operator-browser-codehost.mjs';

const write = (p, value) => fs.writeFileSync(p, JSON.stringify(value));
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bookone-browser-transport-'));
  const plan = {schemaVersion: 1, id: 'transport-preflight', candidate: 'v1.0.0', productSha: 'a'.repeat(40),
    cases: [{id: 'inert', precondition: 'synthetic only', expected: 'read title once', evidence: ['title']}]};
  const fp = {productSha: plan.productSha, qaSha: 'b'.repeat(40), liveStamp: 'v1.0.0 · aaaaaaa',
    rulesHash: 'synthetic', libraryHash: 'synthetic', actor: 'no-business-actor', schema: 'synthetic',
    configuration: 'synthetic-inert-preflight', fixture: 'inert-no-business'};
  let state = transition(plan, initialize(plan, fp), fp, 'start', 'inert');
  state = transition(plan, state, fp, 'intent', 'inert', {submissionId: 'once', action: 'Read title only'});
  for (const [file, value] of Object.entries({'plan.json': plan, 'state.json': state, 'fp.json': fp,
    'clock.json': openClock(120, 20), 'request.json': {plan: 'plan.json', state: 'state.json',
      fingerprint: 'fp.json', clock: 'clock.json', script: 'script.txt', commandExitCode: 0,
      caseId: 'inert', submissionId: 'once'}})) write(path.join(dir, file), value);
  fs.writeFileSync(path.join(dir, 'script.txt'), 'await nodeRepl.write(await tab.title());');
  return {dir, request: path.join(dir, 'request.json')};
}
async function execute(f, prepared, js = async () => 'BookOne') {
  return dispatchConnectedBrowser({prepared, claim: id => claim(f.dir, id),
    finish: result => finish(f.dir, result), js});
}
test('unchanged pinned guard bundle dispatches once and persists charged clock before js', async () => {
  const f = fixture(), p = prepare(f.request);
  let calls = 0;
  const out = await execute(f, p, async script => {
    calls++;
    assert.equal(script, p.script);
    const receipts = fs.readdirSync(path.join(f.dir, 'dispatches'));
    assert.equal(receipts.length, 1);
    assert.equal(read(path.join(f.dir, 'dispatches', receipts[0])).status, 'claimed-outcome-unknown');
    assert.ok(read(path.join(f.dir, 'clock.json')).lastAt >= p.inputs.clock.lastAt);
    return 'BookOne';
  });
  assert.equal(calls, 1); assert.equal(out.executed, true); assert.equal(out.toolCalls, 1);
  assert.equal(prepare(f.request).ok, false);
});
for (const [name, mutate] of [
  ['rejected exit', f => {const r = read(f.request); r.commandExitCode = 1; write(f.request, r);} ],
  ['missing intent', f => {const s = read(path.join(f.dir, 'state.json')); delete s.cases[0].submissions; write(path.join(f.dir, 'state.json'), s);} ],
  ['changed fingerprint', f => {const fp = read(path.join(f.dir, 'fp.json')); fp.actor = 'changed'; write(path.join(f.dir, 'fp.json'), fp);} ],
  ['expired active clock', f => {const c = read(path.join(f.dir, 'clock.json')); c.chargedMs = 100 * 60000; write(path.join(f.dir, 'clock.json'), c);} ],
]) {
  test(name + ' before prepare causes zero js calls', async () => {
    const f = fixture(); mutate(f); let calls = 0;
    const out = await execute(f, prepare(f.request), async () => calls++);
    assert.equal(out.executed, false); assert.equal(calls, 0);
  });
  test(name + ' after prepare causes zero js calls', async () => {
    const f = fixture(), p = prepare(f.request); mutate(f); let calls = 0;
    const out = await execute(f, p, async () => calls++);
    assert.equal(out.executed, false); assert.equal(out.uncertain, false); assert.equal(calls, 0);
  });
}
test('script changed after prepare cannot dispatch', async () => {
  const f = fixture(), p = prepare(f.request); fs.writeFileSync(path.join(f.dir, 'script.txt'), 'different');
  const out = await execute(f, p, async () => assert.fail('must not dispatch'));
  assert.equal(out.toolCalls, 0);
});
test('two preparations of same intent permit only one durable claim', () => {
  const f = fixture(), a = prepare(f.request), b = prepare(f.request);
  assert.equal(claim(f.dir, a.preparationId).ok, true);
  assert.equal(claim(f.dir, b.preparationId).ok, false);
});
test('uncertain actual call is durably consumed and never replayed', async () => {
  const f = fixture(), p = prepare(f.request); let calls = 0;
  const out = await execute(f, p, async () => {calls++; throw Error('uncertain response');});
  assert.equal(out.uncertain, true); assert.equal(calls, 1);
  assert.equal(prepare(f.request).ok, false);
  const replay = await execute(f, p, async () => {calls++;});
  assert.equal(replay.executed, false);
  assert.equal(calls, 1);
});
test('clock expiring during host claim latency causes zero actual tool calls', async () => {
  const f = fixture(), p = prepare(f.request); let calls = 0;
  const out = await dispatchConnectedBrowser({prepared: p, claim: id => {
    const r = claim(f.dir, id); r.inputs.clock.chargedMs = 100 * 60000; return r;
  }, finish: result => finish(f.dir, result), js: async () => calls++});
  assert.equal(out.executed, false); assert.equal(calls, 0);
});
test('persistence failure prevents tool invocation', async () => {
  const f = fixture(), p = prepare(f.request); let calls = 0;
  const out = await dispatchConnectedBrowser({prepared: p, claim: async () => {throw Error('disk failure');},
    finish: async () => {}, js: async () => calls++});
  assert.equal(out.executed, false); assert.equal(calls, 0);
});
test('request cannot switch to a fresh clock after prepare', async () => {
  const f = fixture(), p = prepare(f.request);
  write(path.join(f.dir, 'fresh-clock.json'), openClock(120, 20));
  const r = read(f.request); r.clock = 'fresh-clock.json'; write(f.request, r);
  const out = await execute(f, p, async () => assert.fail('must not dispatch'));
  assert.equal(out.toolCalls, 0);
});
test('resetting clock at the same path after prepare is refused', async () => {
  const f = fixture(), p = prepare(f.request);
  const c = read(path.join(f.dir, 'clock.json')); c.events.push({action: 'forged-reset'});
  write(path.join(f.dir, 'clock.json'), c);
  const out = await execute(f, p, async () => assert.fail('must not dispatch'));
  assert.equal(out.toolCalls, 0);
});
test('durable claim survives an independent process', () => {
  const f = fixture(), p = prepare(f.request);
  const script = path.resolve('scripts/operator-browser-host.mjs');
  const first = spawnSync(process.execPath, [script, 'claim', f.dir, p.preparationId], {encoding: 'utf8'});
  assert.equal(first.status, 0); assert.equal(JSON.parse(first.stdout).ok, true);
  const second = spawnSync(process.execPath, [script, 'claim', f.dir, p.preparationId], {encoding: 'utf8'});
  assert.equal(second.status, 0); assert.equal(JSON.parse(second.stdout).ok, false);
});
test('claim without finish leaves the submission consumed with unknown outcome', () => {
  const f = fixture(), p = prepare(f.request);
  assert.equal(claim(f.dir, p.preparationId).ok, true);
  const receipts = fs.readdirSync(path.join(f.dir, 'dispatches'));
  assert.equal(read(path.join(f.dir, 'dispatches', receipts[0])).status, 'claimed-outcome-unknown');
  assert.equal(prepare(f.request).ok, false);
  assert.equal(claim(f.dir, p.preparationId).ok, false);
});
test('finish failure after a tool call is uncertain and is not replayed', async () => {
  const f = fixture(), p = prepare(f.request); let calls = 0;
  const out = await dispatchConnectedBrowser({
    prepared: p,
    claim: id => claim(f.dir, id),
    finish: async () => { throw Error('finish failed'); },
    js: async () => { calls++; return 'BookOne'; },
  });
  assert.equal(calls, 1);
  assert.equal(out.executed, false);
  assert.equal(out.uncertain, true);
  assert.match(out.reason, /Finish refused/);
  assert.equal(prepare(f.request).ok, false);
});
function posixArgv(cmd) {
  const out = [];
  let cur = '';
  let quoted = false;
  for (const ch of cmd) {
    if (ch === "'") { quoted = !quoted; continue; }
    if (ch === ' ' && !quoted) { if (cur) out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}
test('concrete code host treats Browser tool isError as an uncertain consumed call', async () => {
  const f = fixture(); let calls = 0;
  const tools = {
    exec_command: async ({cmd, workdir}) => {
      const argv = posixArgv(cmd);
      if (argv[0] === 'cat' && argv[1]) {
        return {exit_code: 0, output: fs.readFileSync(path.resolve(workdir, argv[1]), 'utf8')};
      }
      if (argv[0] === 'node') {
        const r = spawnSync(process.execPath, argv.slice(1), {cwd: workdir, encoding: 'utf8'});
        return {exit_code: r.status ?? 1, output: r.stdout};
      }
      return {exit_code: 1, output: ''};
    },
    apply_patch: async patch => {
      const lines = patch.split('\n');
      const file = lines.find(line => line.startsWith('*** Add File: ')).slice(14);
      const content = lines.filter(line => line.startsWith('+')).map(line => line.slice(1)).join('\n');
      fs.writeFileSync(file, content); return {};
    },
    mcp__codex_apps__browser_js: async () => {calls++; return {isError: true};},
  };
  const out = await runPersistedBrowserRequest({tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(calls, 1); assert.equal(out.executed, false); assert.equal(out.uncertain, true);
  assert.equal(prepare(f.request).ok, false);
});
