import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
const read = (name: string) => parse(readFileSync(`work/product/.github/workflows/${name}`, 'utf8'));
function requiredChecks(job: any) {
  return !job?.if && (job?.['continue-on-error'] == null || job['continue-on-error'] === false) &&
    ['lint', 'typecheck', 'build', 'test'].every(check => job?.steps?.some((s: any) =>
      !s.if && (s.run ?? '').trim() === `pnpm ${check}` &&
      (s['continue-on-error'] == null || s['continue-on-error'] === false)));
}

// Job separation is valid; each mandatory command must remain an unmasked,
// unconditional step. Do not require an arbitrary single-job layout.
function mandatoryCommandsPresent(jobs: any) {
  return ['lint', 'typecheck', 'build', 'test'].every(check =>
    Object.values(jobs ?? {}).some((job: any) => !job.if &&
      (job['continue-on-error'] == null || job['continue-on-error'] === false) &&
      job.steps?.some((s: any) => !s.if && (s.run ?? '').trim() === `pnpm ${check}` &&
        (s['continue-on-error'] == null || s['continue-on-error'] === false))));
}
describe('Batch A current source release workflow contracts', () => {
  it('A-013 mandatory validation genuinely fails on command errors', () => {
    const wf = read('production-check.yml');
    const split = { tests: { steps: [{ run: 'pnpm test' }] }, quality: {
      steps: ['lint', 'typecheck', 'build'].map(c => ({ run: `pnpm ${c}` })) } };
    expect(mandatoryCommandsPresent(split)).toBe(true);
    expect(mandatoryCommandsPresent({ tests: split.tests })).toBe(false);
    expect(mandatoryCommandsPresent({ ...split, quality: { ...split.quality, 'continue-on-error': true } })).toBe(false);
    expect(mandatoryCommandsPresent({ ...split, tests: { steps: [{ run: 'pnpm test || echo skipped' }] } })).toBe(false);
    expect(mandatoryCommandsPresent({ ...split, tests: { if: 'false', steps: split.tests.steps } })).toBe(false);
    expect(mandatoryCommandsPresent(wf.jobs)).toBe(true);
  });
  it('A-014 image publication depends on successful same-workflow required validation', () => {
    const wf = read('docker-web.yml');
    expect(wf.on.push).toBeTruthy();
    expect(Object.hasOwn(wf.on, 'workflow_dispatch')).toBe(true);
    const quality = Object.values(wf.jobs).find(requiredChecks) as any;
    expect(quality).toBeTruthy();
    // Independent mutations of the real parsed quality job must be rejected.
    expect(requiredChecks({ ...quality, if: "github.event_name == 'push'" })).toBe(false);
    expect(requiredChecks({ ...quality, 'continue-on-error': true })).toBe(false);
    for (const check of ['lint','typecheck','build','test']) {
      expect(requiredChecks({ ...quality, steps: quality.steps.filter((s: any) => s.run !== `pnpm ${check}`) })).toBe(false);
      for (const change of [{ run: `pnpm ${check} || echo skipped` }, { if: 'false' }, { 'continue-on-error': true }]) {
        expect(requiredChecks({ ...quality, steps: quality.steps.map((s: any) => s.run === `pnpm ${check}` ? {...s,...change} : s) })).toBe(false);
      }
    }
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
      expect(job.if).toBeUndefined();
      expect(job['continue-on-error']).not.toBe(true);
      expect(/always\(|failure\(/.test(job.if ?? '')).toBe(false);
      for (const j of [job, ...Object.values(jobs).filter(requiredChecks)] as any[])
        for (const step of j.steps ?? []) if (String(step.uses ?? '').startsWith('actions/checkout@'))
          expect([undefined, '${{ github.sha }}'].includes(step.with?.ref)).toBe(true);
    }
  });
});
