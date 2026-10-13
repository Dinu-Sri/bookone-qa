import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
const fixture = vi.hoisted(() => ({ selected: 'this_month', label: 'October 2026' }));
vi.mock('@/app/actions/workspace', () => ({
  getTenantInfo: async () => ({ name: 'QA' }),
  getPeriodOptions: async () => ({ ...fixture, available: [] }),
  getReports: async () => ({ income: { netIncome: 0 }, cashFlow: { netCashFlow: 0, transactionCount: 0 },
    balanceSheet: { totalAssets: 0 }, generalLedger: [] }),
}));
import ReportsPage from '@product/web/app/reports/page';
describe('Batch A actual Reports component label contract', () => {
  it.each([
    ['A-010', 'this_month', 'October 2026'],
    ['A-011', '2026-10', 'October 2026'],
    ['A-012', 'all', 'All time'],
  ])('%s resolved period label is rendered for %s', async (_id, selected, label) => {
    Object.assign(fixture, { selected, label });
    const html = renderToStaticMarkup(await ReportsPage({ searchParams: Promise.resolve({ report: 'cashflow' }) }));
    expect(html).toContain(label);
    expect(html).not.toContain('January 2001');
  });
});
