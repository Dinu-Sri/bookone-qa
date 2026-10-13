import { readFileSync } from 'node:fs';
const read = p => JSON.parse(readFileSync(p, 'utf8'));
console.log(JSON.stringify({
  readFirst: ['AGENTS.md','SESSION.md','STATUS.md','memory/programme.json','docs/BATCH_TESTING.md'],
  programme: read('memory/programme.json'), source: read('product-ref.json'),
  roadmap: read('batches/roadmap.json'),
  next: 'Inspect incomplete .local/batches run states if available; otherwise use durable runs/. Verify candidate, actors and fixtures before execution.',
  credentials: 'Local ignored config or authorized secret store only; never reconstruct from public history.'
},null,2));
