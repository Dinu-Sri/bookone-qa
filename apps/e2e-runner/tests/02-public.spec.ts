import { test, expect } from '../src/fixtures';
import { expectE2eApiGone, expectE2ePageGone } from '../src/helpers/assert';
import { loadScenariosBySection } from '../src/helpers/catalog';
import { runCatalogScenario } from '../src/helpers/catalog-run';

/**
 * Catalog §2 — Public surfaces (docs). Inbuilt `/e2e` console must be gone.
 */
const scenarios = loadScenariosBySection('2.').filter(
  (s) => !['S-0031', 'S-0032', 'S-0033'].includes(s.id),
);

test.describe('Public surfaces catalog §2 @docs @public @e2e', () => {
  test('S-0021 docs home without login', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('/docs');
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page.locator('body')).toContainText(/BookOne|documentation|Docs/i);
    await ctx.close();
  });

  test('docs section pages load', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    for (const path of [
      '/docs/getting-started',
      '/docs/sales',
      '/docs/purchase',
      '/docs/inventory',
      '/docs/accounting',
      '/docs/pos',
    ]) {
      await page.goto(path);
      await expect(page).not.toHaveURL(/\/login/);
    }
    await ctx.close();
  });

  test('docs search API public', async ({ request }) => {
    const res = await request.get('/api/search?q=invoice');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(Array.isArray(body) || typeof body === 'object').toBeTruthy();
  });

  test('docs exclude control-room content', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('/docs');
    const text = await page.locator('body').innerText();
    expect(text.toLowerCase()).not.toMatch(/master wipe|control room.*health check/i);
    await ctx.close();
  });

  test('S-0031 Inbuilt E2E console at /e2e is gone', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await expectE2ePageGone(page);
    await ctx.close();
  });

  test('S-0032 POST /api/e2e/runs cannot start a run', async ({ request }) => {
    await expectE2eApiGone(request);
  });

  test('S-0033 E2E report/log/download endpoints expose no artifacts', async ({ request }) => {
    await expectE2eApiGone(request);
  });

  // Remaining §2 catalog IDs via executor (public + authed mix handled inside)
  for (const s of scenarios) {
    test(`${s.id} ${s.title} @${s.priority.toLowerCase()}`, async ({ page, browser }) => {
      await runCatalogScenario(page, browser, s);
    });
  }
});
