import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
const read = (name: string) => parse(readFileSync(`work/product/.github/workflows/${name}`, 'utf8'));
function requiredChecks(job: any) {
  return (job?.['continue-on-error'] == null || job['continue-on-error'] === false) &&
    ['lint', 'typecheck', 'build', 'test'].every(check => job?.steps?.some((s: any) =>
      (s.run ?? '').trim() === `pnpm ${check}` &&
      (s['continue-on-error'] == null || s['continue-on-error'] === false)));
}
describe('Batch A current source release workflow contracts', () => {
  it('A-013 mandatory validation genuinely fails on command errors', () => {
    const wf = read('production-check.yml');
    expect(Object.values(wf.jobs).some(requiredChecks)).toBe(true);
  });
  it('A-014 image publication depends on successful same-workflow required validation', () => {
    const wf = read('docker-web.yml');
    const jobs: any = wf.jobs;
    const publishers = Object.entries(jobs).filter(([,j]: any) => j.steps?.some((s: any) => s.with?.push === true));
    expect(publishers.length).toBeGreaterThan(0);
    function hasRequiredAncestor(id: string, seen = new Set<string>()): boolean {
      if (seen.has(id)) return false; seen.add(id);
      const needs = jobs[id]?.needs;
      return (Array.isArray(needs) ? needs : needs ? [needs] : []).some(n =>
        requiredChecks(jobs[n]) || hasRequiredAncestor(n, seen));
    }
    for (const [id, job] of publishers as [string, any][]) {
      expect(hasRequiredAncestor(id)).toBe(true);
      expect(/always\(|failure\(/.test(job.if ?? '')).toBe(false);
      for (const j of [job, ...Object.values(jobs).filter(requiredChecks)] as any[])
        for (const step of j.steps ?? []) if (String(step.uses ?? '').startsWith('actions/checkout@'))
          expect([undefined, '${{ github.sha }}'].includes(step.with?.ref)).toBe(true);
    }
  });
});
