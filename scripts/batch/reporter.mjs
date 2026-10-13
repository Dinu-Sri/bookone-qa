import { atomicJSON } from './state.mjs';
export default class BatchReporter {
  files = [];
  results = new Map();
  onCollected(files) { this.files = files; this.save(); }
  onTaskUpdate(packs) { for (const [id, result] of packs) this.results.set(id, result); this.save(); }
  onFinished(files, errors) { this.files = files; this.errors = errors; this.save(true); }
  save(final = false) {
    if (!process.env.QA_CASE_CHECKPOINT) return;
    const cases = [], seen = new Set(); let collectionError = Boolean(this.errors?.length);
    const walk = (task, broken = false) => {
      const result = this.results.get(task.id) ?? task.result;
      const parentBroken = broken || (task.type !== 'test' && result?.state === 'fail' && result?.errors?.length > 0);
      if (task.type === 'test') {
        const id = task.name.match(/\b[A-F]-\d{3}\b/)?.[0];
        if (!id || seen.has(id)) { collectionError = true; return; }
        seen.add(id);
        const status = parentBroken ? 'blocked' : ({ pass:'passed', fail:'failed', skip:'skipped', todo:'skipped', run:'running' }[result?.state] ?? (final ? 'blocked' : 'pending'));
        cases.push({ id, status });
      }
      for (const child of task.tasks ?? []) walk(child, parentBroken);
    };
    for (const file of this.files) walk(file);
    atomicJSON(process.env.QA_CASE_CHECKPOINT, { final, collectionError, cases });
  }
}
