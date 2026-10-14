import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
export function runtimeManifest() {
  const manifest=JSON.parse(readFileSync('batches/runtime.json','utf8'));
  assert.equal(manifest.version,1);assert.equal(manifest.productAcceptance,'not-established');
  assert.equal(manifest.fixtureVersion,'runtime-v1');assert.ok(existsSync(manifest.guide));
  const names=new Set(),ids=new Set();
  for(const lane of manifest.lanes) {
    assert.match(lane.name,/^[a-z]+(?:-[a-z]+)*$/);assert.ok(!names.has(lane.name));names.add(lane.name);
    assert.match(lane.file,/^tests\/runtime\/[a-z-]+\.test\.ts$/);assert.ok(existsSync(lane.file));
    assert.ok(['admin','runtime'].includes(lane.credential));assert.match(lane.boundary,/^real-PostgreSQL-[a-zA-Z-]+$/);
    assert.ok(lane.expected.length);
    for(const id of lane.expected){assert.match(id,/^(?:(?:RT|[A-F])-\d{3}|S-\d{4})$/);assert.ok(!ids.has(id));ids.add(id);}
  }
  assert.ok(names.size);return manifest;
}
