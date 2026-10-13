import { expect } from 'vitest';
export type Line = { accountCode: string; side: string; amount: number };
export const line = (accountCode: string, side: string, amount: number): Line => ({ accountCode, side, amount });
export function exactLines(actual: Line[], expected: Line[]) {
  const normalized = (xs: Line[]) => xs.map(({ accountCode, side, amount }) =>
    ({ accountCode, side, cents: Math.round(amount * 100) }))
    .sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  expect(normalized(actual)).toEqual(normalized(expected));
  for (const l of actual) {
    expect(Number.isFinite(l.amount)).toBe(true);
    expect(l.amount).toBeGreaterThanOrEqual(0);
    expect(Math.abs(l.amount * 100 - Math.round(l.amount * 100))).toBeLessThan(0.00001);
  }
  expect(actual.reduce((n,l) => n + (l.side === 'debit' ? 1 : -1) * Math.round(l.amount * 100),0)).toBe(0);
}
export const generation = () => ({ seed: Number(process.env.QA_SEED ?? 261013), numRuns: Number(process.env.QA_NUM_RUNS ?? 100),
  ...(process.env.QA_REPLAY_SHRINK_PATH ? { path: process.env.QA_REPLAY_SHRINK_PATH } : {}) });
