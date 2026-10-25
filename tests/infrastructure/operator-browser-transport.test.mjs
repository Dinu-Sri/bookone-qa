import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
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
function hostCommand(argv) {
  return argv[0] === 'node' ? argv[2] : argv[0];
}
function simulateHost({truncateBytes = Infinity, truncateCommands, js, mutateOutput} = {}) {
  const calls = {js: 0};
  const truncate = argv => {
    if (truncateBytes === Infinity) return false;
    if (!truncateCommands) return true;
    return truncateCommands.includes(hostCommand(argv));
  };
  return {
    calls,
    tools: {
      exec_command: async ({cmd, workdir}) => {
        const argv = posixArgv(cmd);
        let output = '', exit_code = 1;
        if (argv[0] === 'cat' && argv[1]) {
          output = fs.readFileSync(path.resolve(workdir, argv[1]), 'utf8');
          exit_code = 0;
        } else if (argv[0] === 'node') {
          const r = spawnSync(process.execPath, argv.slice(1), {cwd: workdir, encoding: 'utf8'});
          output = r.stdout;
          exit_code = r.status ?? 1;
        }
        if (exit_code === 0 && mutateOutput) output = mutateOutput(hostCommand(argv), output);
        if (exit_code === 0 && truncate(argv) && output.length > truncateBytes) {
          return {exit_code: 0, output: 'Warning: output truncated to max_output_tokens\n' + output.slice(0, Math.max(0, truncateBytes))};
        }
        return {exit_code, output};
      },
      apply_patch: async patch => {
        const lines = patch.split('\n');
        const file = lines.find(line => line.startsWith('*** Add File: ')).slice(14);
        const content = lines.filter(line => line.startsWith('+')).map(line => line.slice(1)).join('\n');
        fs.writeFileSync(file, content); return {};
      },
      mcp__codex_apps__browser_js: async () => {
        calls.js++;
        return js ? js() : {title: 'BookOne'};
      },
    },
  };
}
function claimFiles(dir) {
  const folder = path.join(dir, 'dispatches');
  return fs.existsSync(folder) ? fs.readdirSync(folder) : [];
}
function execFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bookone-browser-exec-'));
  const plan = JSON.parse(fs.readFileSync(new URL('../../queues/MISSION-v2522-LIGHT-08-EXEC.json', import.meta.url)));
  const fp = {productSha: plan.productSha, qaSha: 'c'.repeat(40), liveStamp: 'v2.5.22 · 211771e',
    rulesHash: 'unit', libraryHash: 'unit', schema: 'unit', configuration: 'grown-exec-state',
    actor: 'no-business-actor', fixture: 'inert-no-business'};
  let state = initialize(plan, fp);
  state = transition(plan, state, fp, 'start', 'L08-GATE');
  state = transition(plan, state, fp, 'intent', 'L08-GATE', {submissionId: 'gate-once', action: 'Read title only'});
  for (let i = 0; i < 50; i++) {
    state.events.push({command: 'note', id: 'grown', n: i, note: 'session-event-'.repeat(20), at: new Date().toISOString()});
  }
  for (const [file, value] of Object.entries({'plan.json': plan, 'state.json': state, 'fp.json': fp,
    'clock.json': openClock(120, 20), 'request.json': {plan: 'plan.json', state: 'state.json',
      fingerprint: 'fp.json', clock: 'clock.json', script: 'script.txt', commandExitCode: 0,
      caseId: 'L08-GATE', submissionId: 'gate-once'}})) write(path.join(dir, file), value);
  fs.writeFileSync(path.join(dir, 'script.txt'), 'await nodeRepl.write(await tab.title());');
  return {dir, request: path.join(dir, 'request.json')};
}
test('concrete code host treats Browser tool isError as an uncertain consumed call', async () => {
  const f = fixture();
  const host = simulateHost({js: () => ({isError: true})});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(host.calls.js, 1); assert.equal(out.executed, false); assert.equal(out.uncertain, true);
  assert.equal(prepare(f.request).ok, false);
});
test('full EXEC plan stays inside bounded envelopes under a 16000-byte host cap', async () => {
  const f = execFixture();
  const dumped = spawnSync(process.execPath, ['scripts/operator-browser-host.mjs', 'prepare', f.request], {encoding: 'utf8'});
  assert.equal(dumped.status, 0);
  const env = JSON.parse(dumped.stdout);
  assert.equal(env.ok, true);
  assert.ok(dumped.stdout.length < 4096);
  assert.ok(env.bytes > 50000);
  const host = simulateHost({truncateBytes: 16000});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(out.executed, true);
  assert.equal(host.calls.js, 1);
  assert.equal(claimFiles(f.dir).length, 1);
});
test('truncated prepare envelope makes zero js calls and zero claims', async () => {
  const f = execFixture();
  const host = simulateHost({truncateBytes: 80, truncateCommands: ['prepare']});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(out.executed, false);
  assert.match(out.reason, /truncated|complete JSON|bounded envelope/);
  assert.equal(host.calls.js, 0);
  assert.equal(claimFiles(f.dir).length, 0);
  assert.equal(out.uncertain, false);
});
test('truncated slice during prepare load makes zero js calls and zero claims', async () => {
  const f = execFixture();
  const host = simulateHost({truncateBytes: 100, truncateCommands: ['slice']});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(out.executed, false);
  assert.match(out.reason, /truncated|complete JSON|Slice binding/);
  assert.equal(host.calls.js, 0);
  assert.equal(claimFiles(f.dir).length, 0);
});
test('truncated claim receipt after exclusive claim is consumed and never replayed', async () => {
  const f = execFixture();
  const host = simulateHost({truncateBytes: 40, truncateCommands: ['claim']});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(host.calls.js, 0);
  assert.equal(out.executed, false);
  assert.ok(claimFiles(f.dir).length >= 1);
  assert.equal(out.uncertain, true);
  const receipt = read(path.join(f.dir, 'dispatches', claimFiles(f.dir)[0]));
  assert.equal(receipt.status, 'consumed');
  assert.equal(receipt.uncertain, true);
  assert.equal(prepare(f.request).ok, false);
  const replay = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(replay.executed, false);
  assert.equal(host.calls.js, 0);
});

test('code host works without Node or browser encoding and crypto globals', async () => {
  const f = fixture(), host = simulateHost();
  fs.appendFileSync(path.join(f.dir, 'script.txt'), '// café 🎨');
  const source = fs.readFileSync('scripts/operator-browser-codehost.mjs', 'utf8');
  const run = vm.runInNewContext(source.replace('export async function', 'async function') +
    '\nrunPersistedBrowserRequest', {atob: undefined, TextDecoder: undefined, TextEncoder: undefined,
      crypto: undefined, Buffer: undefined});
  const out = await run({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(out.executed, true); assert.equal(host.calls.js, 1);
});
for (const fault of ['corruption', 'digest', 'length', 'decoded-length', 'verify-receipt']) {
  test('received slice ' + fault + ' refuses before js or exclusive claim', async () => {
    const f = fixture();
    let changed = false;
    const host = simulateHost({mutateOutput: (command, output) => {
      if (changed || command !== (fault === 'verify-receipt' ? 'verify-slice' : 'slice')) return output;
      changed = true;
      const piece = JSON.parse(output);
      if (fault === 'corruption') {
        const bytes = Buffer.from(piece.data, 'base64');
        const index = bytes.indexOf(Buffer.from('inert'));
        assert.ok(index >= 0);
        bytes[index] = 'I'.charCodeAt(0);
        piece.data = bytes.toString('base64');
      } else if (fault === 'digest') piece.sha256 = '0'.repeat(64);
      else if (fault === 'length') piece.length--;
      else if (fault === 'decoded-length') piece.data = Buffer.from(piece.data, 'base64').subarray(1).toString('base64');
      else piece.offset++;
      return JSON.stringify(piece);
    }});
    const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
    assert.equal(changed, true); assert.equal(out.executed, false);
    assert.equal(out.uncertain, false); assert.equal(host.calls.js, 0);
    assert.equal(claimFiles(f.dir).length, 0);
  });
}
test('malformed claim success keeps durable consumed uncertainty and claim clock', async () => {
  const f = fixture();
  const host = simulateHost({mutateOutput: (command, output) => {
    if (command !== 'claim') return output;
    const receipt = JSON.parse(output); delete receipt.file;
    return JSON.stringify(receipt);
  }});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(out.uncertain, true); assert.equal(host.calls.js, 0);
  const receipt = read(path.join(f.dir, 'dispatches', claimFiles(f.dir)[0]));
  assert.equal(receipt.status, 'consumed'); assert.equal(receipt.uncertain, true);
  assert.equal(prepare(f.request).ok, false);
});

test('grown clock claim is bounded and preserves every event', async () => {
  const f = fixture();
  const clockPath = path.join(f.dir, 'clock.json');
  const clock = read(clockPath);
  for (let i = 0; i < 200; i++) clock.events.push({action: 'check', at: clock.lastAt,
    elapsedMs: 0, priorMode: 'active'});
  write(clockPath, clock);
  const host = simulateHost({truncateBytes: 12000, mutateOutput: (command, output) => {
    if (command === 'claim') assert.ok(output.length < 4096);
    return output;
  }});
  const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
  assert.equal(out.executed, true); assert.equal(host.calls.js, 1);
  assert.ok(read(clockPath).events.length >= clock.events.length);
  assert.deepEqual(read(clockPath).events.slice(0, clock.events.length), clock.events);
});
for (const fault of ['slice', 'verify-slice', 'confirm-claim']) {
  test('claim transfer ' + fault + ' failure remains durably uncertain without replay', async () => {
    const f = fixture(); let claimed = false;
    const host = simulateHost({mutateOutput: (command, output) => {
      if (command === 'claim') claimed = true;
      if (claimed && command === fault) return '{';
      return output;
    }});
    const out = await runPersistedBrowserRequest({tools: host.tools, cwd: path.resolve('.'), requestPath: f.request});
    assert.equal(out.executed, false); assert.equal(out.uncertain, true); assert.equal(host.calls.js, 0);
    const receipt = read(path.join(f.dir, 'dispatches', claimFiles(f.dir)[0]));
    assert.equal(receipt.uncertain, true); assert.equal(receipt.status, 'consumed');
    assert.equal(prepare(f.request).ok, false);
  });
}
