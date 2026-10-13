import assert from 'node:assert/strict';
export function runtimeTarget(raw, consent) {
  assert.equal(consent, 'ephemeral-local-postgres', 'Explicit isolated runtime target required');
  const url = new URL(raw);
  assert.ok(['postgres:', 'postgresql:'].includes(url.protocol), 'PostgreSQL required');
  assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname), 'Only loopback PostgreSQL is allowed');
  assert.equal(url.pathname, '/bookone_qa_runtime', 'Dedicated QA database required');
  assert.equal(url.search, '', 'Connection parameter overrides are forbidden');
  assert.equal(url.hash, '');
  assert.ok(url.username && url.password, 'Ephemeral service credentials required');
  return url;
}
