import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {validate, initialize} from '../../scripts/operator-queue.mjs';

const read = p => JSON.parse(fs.readFileSync(new URL('../../' + p, import.meta.url)));
const q = read('queues/MISSION-v2522-LIGHT-08-EXEC.json');
const parent = read('queues/MISSION-v2522-LIGHT-08.json');
const uxBytes = fs.readFileSync(new URL('../../ux/workbook.json', import.meta.url));

test('Light08 EXEC keeps 37 slots, recovery END and parent oracle', () => {
  validate(q);
  assert.equal(q.cases.length, 37);
  assert.equal(q.cases.map(c => c.id).join(), parent.cases.map(c => c.id).join());
  assert.equal(q.cases.at(-1).id, 'L08-END');
  assert.equal(q.cases.at(-1).recovery, true);
  assert.equal(q.oracle, 'queues/ORACLE-v2522-LIGHT-08.json');
  assert.equal(q.ux.sha256, createHash('sha256').update(uxBytes).digest('hex'));
});

test('Light08 EXEC is bound to live v2.5.22 and the reviewed transport', () => {
  assert.equal(q.executionReady, true);
  assert.equal(q.productSha, '211771e95d6f97cac5eb281a0f8e63f0fceef8a4');
  assert.equal(q.reportedShortSha, '211771e');
  assert.equal(q.qaPlanningBase, 'a9ccd4fbc360ed67fd3083f79bbd8c094eabef45');
  assert.equal(q.reviewedTransport.entry, 'runPersistedBrowserRequest');
  assert.equal(q.reviewedTransport.authorCommit, 'a9ccd4fbc360ed67fd3083f79bbd8c094eabef45');
  for (const p of Object.values(q.reviewedTransport)) {
    if (p.startsWith('scripts/')) assert.equal(fs.existsSync(p), true);
  }
  const fp = {
    productSha: q.productSha,
    liveStamp: 'v2.5.22 · 211771e',
    qaSha: 'c'.repeat(40),
    rulesHash: 'unit',
    libraryHash: 'unit',
    schema: 'unit',
    configuration: 'unit',
    actor: 'unit',
    fixture: 'unit',
  };
  assert.equal(initialize(q, fp).cases.length, 37);
});

test('financial writes stay behind the actual Browser-tool GUARD', () => {
  const by = id => q.cases.find(c => c.id === id);
  assert.match(by('L08-GUARD').expected, /runPersistedBrowserRequest/);
  assert.match(by('L08-GUARD').expected, /zero actual js calls/);
  assert.deepEqual(by('L08-SALE').dependsOn, ['L08-FIXTURES', 'L08-GUARD']);
  assert.deepEqual(by('L08-BILL').dependsOn, ['L08-FIXTURES', 'L08-GUARD']);
});
