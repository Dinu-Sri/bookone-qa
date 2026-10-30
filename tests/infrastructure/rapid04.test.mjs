import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'path';
import {randomUUID} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {validate} from '../../scripts/operator-queue.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const p = JSON.parse(fs.readFileSync(path.join(root, 'queues/MISSION-v2524-RAPID-04.json')));
const o = JSON.parse(fs.readFileSync(path.join(root, p.oracle)));
const plan40 = JSON.parse(fs.readFileSync(path.join(root, 'queues/PLAN-RAPID04-qualification.json')));

function sum(oracle) {
  let count = 0;
  let dr = 0;
  let qty = 0;
  const net = {};
  for (const lane of Object.values(oracle.lanes)) {
    for (const e of lane.events) {
      qty += e.stockQtyDelta;
      for (const j of e.journals) {
        let d = 0;
        let c = 0;
        for (const x of j.entries) {
          d += x.debitCents;
          c += x.creditCents;
          net[x.account] = (net[x.account] || 0) + x.debitCents - x.creditCents;
        }
        assert.equal(d, c);
        count++;
        dr += d;
      }
    }
  }
  return {count, dr, qty, net};
}

test('Rapid04 operator plan is fail-closed and reuses Rapid-01 adapter prefix', () => {
  validate(p);
  assert.equal(p.executionReady, false);
  assert.equal(p.dateContract.executionDate, null);
  assert.match(p.id, /^MISSION-v2522-RAPID-01/);
  assert.equal(/^[a-f0-9]{40}$/.test(p.productSha), false);
  assert.equal(p.cases.filter((c) => c.businessSubmission).length, 10);
  for (const c of p.cases) {
    for (const d of c.dependsOn) assert(p.cases.some((x) => x.id === d));
    if (c.businessSubmission) {
      assert.equal(c.allowedButtons.length, 1);
    }
  }
  const buttons = p.cases.filter((c) => c.businessSubmission).flatMap((c) => c.allowedButtons);
  for (const name of ['Post', 'Collect deposit', 'Dispatch', 'Record return', 'Mark ready', 'Record payment', 'Invoice hire charges', 'Refund deposit']) {
    assert(buttons.includes(name), name);
  }
});

test('independent oracle is six journals DrCr 3200 cash+700 hire500 charge200 fleet conserved', () => {
  const s = sum(o);
  assert.equal(s.count, 6);
  assert.equal(s.dr, 320000);
  assert.equal(s.qty, 0);
  assert.equal(s.net['1000'], 70000);
  assert.equal(s.net['1300'], 0);
  assert.equal(s.net['2400'], 0);
  assert.equal(s.net['4400'], -50000);
  assert.equal(s.net['4450'], -20000);
  assert.equal(s.net['5150'], undefined);
  assert.equal(o.allPass.debitCents, s.dr);
  assert.equal(o.allPass.fleetQty, 20);
  assert.equal(o.allPass.fleetValueCents, 100000);
});

test('oracle detects missing refund or a dirty-return charge sneaking into 4450', () => {
  const x = structuredClone(o);
  x.lanes.hireLifecycle.events.pop();
  assert.notEqual(sum(x).net['1000'], 70000);
  const y = structuredClone(o);
  y.lanes.hireLifecycle.events.push({
    id: 'DIRTY-AUTO-CHARGE',
    stockQtyDelta: 0,
    journals: [{entries: [{account: '1300', debitCents: 1, creditCents: 0}, {account: '4450', debitCents: 0, creditCents: 1}]}],
  });
  assert.notEqual(sum(y).net['4450'], -20000);
});

test('40-point specification remains non-executable', () => {
  assert.equal(plan40.status.includes('NOT-LIGHT-EXECUTABLE') || plan40.status.includes('not-run'), true);
  assert.equal(plan40.cases.length, 40);
  assert(plan40.cases.every((c) => c.executable === false));
});

test('helper refuses init while executionReady is false and never writes a run', () => {
  const dir = path.join(root, '.local/tests', randomUUID());
  const run = (...args) => spawnSync(process.execPath, ['scripts/rapid04-run.mjs', ...args], {cwd: root, encoding: 'utf8'});
  const init = run('init', dir);
  assert.notEqual(init.status, 0);
  assert.match(String(init.stderr) + String(init.stdout), /not Light-executable|executionReady|planning template/i);
  assert.equal(fs.existsSync(dir), false);
  const req = run('request', dir, 'R04-QUOTE', 'premature', 'https://bookone.clossyan.com/sales/quotations/new', 'Post');
  assert.notEqual(req.status, 0);
});

test('consumed Rapid03 queues stay unmodified', () => {
  const rapid03 = JSON.parse(fs.readFileSync(path.join(root, 'queues/MISSION-v2523-RAPID-03.json')));
  assert.equal(rapid03.dateContract.executionDate, '2026-10-29');
  assert.equal(rapid03.productSha, 'b89dd788b9bec9dc66cb49d22f7b8c2c92015df7');
});

test('rental-lifecycle expected includes dirty-return and agreed-charge adapters', () => {
  const runtime = JSON.parse(fs.readFileSync(path.join(root, 'batches/runtime.json')));
  const lane = runtime.lanes.find((l) => l.name === 'rental-lifecycle');
  assert.ok(lane.expected.includes('D-104'));
  assert.ok(lane.expected.includes('D-112'));
  assert.ok(lane.expected.includes('D-117'));
  assert.equal(lane.expected.length, 12);
});
