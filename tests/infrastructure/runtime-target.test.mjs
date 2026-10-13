import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runtimeTarget } from '../../scripts/runtime/target.mjs';
const valid = 'postgres://fixture:ephemeral@127.0.0.1:5432/bookone_qa_runtime';
test('isolated runtime accepts only the dedicated loopback database', () => {
  assert.equal(runtimeTarget(valid, 'ephemeral-local-postgres').pathname, '/bookone_qa_runtime');
  for (const raw of [valid.replace('127.0.0.1', 'bookone.clossyan.com'), valid.replace('bookone_qa_runtime', 'bookone'), valid + '?host=remote', valid.replace('postgres:', 'https:')]) {
    assert.throws(() => runtimeTarget(raw, 'ephemeral-local-postgres'));
  }
  assert.throws(() => runtimeTarget(valid, undefined));
});
