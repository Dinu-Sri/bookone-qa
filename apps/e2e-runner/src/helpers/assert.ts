import type { APIRequestContext, Page } from '@playwright/test';
import { expect } from '@playwright/test';

/** Page did not hard-crash into Next error overlay / blank login for authed routes. */
export async function expectNoAppCrash(page: Page) {
  const body = page.locator('body');
  await expect(body).toBeVisible({ timeout: 30_000 });
  const text = (await body.innerText().catch(() => '')).slice(0, 2000);
  // Soft: Next.js default error text is bad; allow empty-state copy
  if (/Application error: a client-side exception/i.test(text)) {
    throw new Error('Client-side application error boundary');
  }
  if (/Unhandled Runtime Error/i.test(text)) {
    throw new Error('Unhandled runtime error on page');
  }
}

/**
 * Authed app is usable. POS uses `.pos-root` / `.pos-empty` without normal sidebar workspace.
 */
export async function expectAuthedShell(page: Page) {
  await expect(page).not.toHaveURL(/\/login/);
  await expect(
    page
      .locator(
        [
          '.app-shell',
          '.sidebar',
          '.workspace',
          '.party-workspace',
          '.pos-root',
          '.pos-empty',
          'main',
        ].join(', '),
      )
      .first(),
  ).toBeVisible({
    timeout: 30_000,
  });
  await expectNoAppCrash(page);
}

export async function expectPublicOk(page: Page) {
  await expect(page).not.toHaveURL(/\/login/);
  await expectNoAppCrash(page);
}

export async function expectOnLogin(page: Page) {
  await expect(page).toHaveURL(/\/login/, { timeout: 20_000 });
  await expect(page.getByTestId('login-form')).toBeVisible({ timeout: 15_000 });
}

export async function expectErrorOrStay(page: Page, opts?: { stayOn?: RegExp }) {
  const err = page.locator('.auth-error, .form-error, .error, [role="alert"], .toast-error, .field-error');
  const hasErr = await err.first().isVisible().catch(() => false);
  if (hasErr) return;
  if (opts?.stayOn) {
    await expect(page).toHaveURL(opts.stayOn);
    return;
  }
  // HTML5 validation may block submit without visible custom error
  const invalid = page.locator(':invalid');
  if ((await invalid.count()) > 0) return;
  // Still on a form page is acceptable for validation scenarios
  await expect(page.locator('form, .workspace, .auth-card').first()).toBeVisible();
}

export async function pageHasText(page: Page, re: RegExp | string) {
  await expect(page.getByText(re).first()).toBeVisible({ timeout: 20_000 });
}

const RUNNER_UI = /E2E Test Console|BookOne E2E|Select a preset or bucket|Start E2E/i;
const DENIED = new Set([301, 302, 303, 307, 308, 401, 403, 404, 405, 410, 501]);

function bodyLooksLikeRun(text: string) {
  if (/"status"\s*:\s*"(queued|running|passed|failed|error)"/.test(text)) return true;
  if (/"id"\s*:\s*"[0-9a-f-]{8,}"/i.test(text) && /suite|baseUrl|createdAt/.test(text)) return true;
  try {
    const j = JSON.parse(text);
    if (Array.isArray(j) && j.some((row) => row && (row.status || row.suite))) return true;
    if (j && typeof j === 'object' && (j.run || j.id) && (j.status || j.suite)) return true;
  } catch {
    /* HTML or empty */
  }
  return false;
}

/** Inbuilt ERP `/e2e` console must not be served. Login redirect or 404 is fine. */
export async function expectE2ePageGone(page: Page) {
  await page.goto('/e2e', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible({ timeout: 20_000 });
  const text = await page.locator('body').innerText().catch(() => '');
  expect(text, 'inbuilt E2E console UI still visible').not.toMatch(RUNNER_UI);
  await expect(page.getByRole('button', { name: /Start (E2E )?run|Start E2E/i })).toHaveCount(0);
  await expectNoAppCrash(page);
}

async function expectE2eApiDenied(
  request: APIRequestContext,
  method: 'GET' | 'POST',
  path: string,
  data?: Record<string, string>,
) {
  const res = await request.fetch(path, {
    method,
    data,
    maxRedirects: 0,
    failOnStatusCode: false,
  });
  const status = res.status();
  const text = await res.text().catch(() => '');
  expect(status, `${method} ${path} started a run`).not.toBe(202);
  expect(bodyLooksLikeRun(text), `${method} ${path} returned a run record`).toBeFalsy();
  expect(text, `${method} ${path} still serves runner UI`).not.toMatch(RUNNER_UI);
  if (status === 200) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const isHtml = /<!doctype html|<html|<body/i.test(trimmed);
    if (isHtml) return;
    try {
      JSON.parse(trimmed);
    } catch {
      return;
    }
    throw new Error(`${method} ${path} still returns JSON (inbuilt runner API is mounted)`);
  }
  expect(DENIED.has(status), `${method} ${path} unexpected status ${status}`).toBeTruthy();
}

/** Unauthenticated POST/GET must not start Playwright or return artifacts. */
export async function expectE2eApiGone(request: APIRequestContext) {
  await expectE2eApiDenied(request, 'POST', '/api/e2e/runs', {
    email: 'qa-probe@example.com',
    password: 'must-not-launch',
    suite: 'smoke',
  });
  const fake = '00000000-0000-0000-0000-0000000000e2';
  for (const path of [
    '/api/e2e/runs',
    '/api/e2e/buckets',
    `/api/e2e/runs/${fake}`,
    `/api/e2e/runs/${fake}/report`,
    `/api/e2e/runs/${fake}/log`,
    `/api/e2e/runs/${fake}/download`,
    `/api/e2e/runs/${fake}/failures`,
  ]) {
    await expectE2eApiDenied(request, 'GET', path);
  }
}
