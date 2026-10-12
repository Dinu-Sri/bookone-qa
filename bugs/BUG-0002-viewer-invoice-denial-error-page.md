# BUG-0002 — Viewer invoice save denial renders an application error

Status: Historical symptom reproduced on the earlier staging run. In the follow-up after the owner reported a fix, the Viewer did not see the error page because the draft save succeeded; see BUG-0004. Do not close this record until a denied write is shown to return a normal permission message on an identified build.
Severity: P2 for the original error-path defect. The follow-up authorization bypass is tracked separately as a P1 candidate in BUG-0004.

## Follow-up — 2026-10-12

After the owner reported the fix was pushed, the synthetic Viewer saved a LKR 100 invoice draft (`INV-20261012-0001`) using synthetic customer text. The draft was then archived. The prior application-error symptom did not reproduce in that attempt, but this does not prove the error handling fix: the write was allowed. The deployed commit/image remains unknown. See [BUG-0004](BUG-0004-viewer-can-save-invoice-draft.md).

## Environment

- Target: `https://bookone.clossyan.com` staging.
- Test role: synthetic company Viewer account. Password is excluded from this public record.
- Scenario: one synthetic customer selected; one free-text service line priced at LKR 100; clicked Save draft. Did not click Post.

## Steps and observed result

1. Sign in as the Viewer test account.
2. Open `/sales/invoices/new`, select the test customer, add a free-text line, set price to 100, and select Save draft.
3. The page shows a Next.js server-side application error with digest `424441645`.
4. Open `/sales/invoices`: the list remains empty. No draft or posted invoice was created.
5. The test customer was soft-deleted after the check; the synthetic Viewer account remains active for future QA runs.

Expected: show an ordinary permission-denied message, keep the Viewer on a usable page, and create no invoice.
Actual: the backend rejects the attempted write but the user sees an application error page.

## Source trace and limits

The local BookOne checkout at `c3602cfce4045085c0949ed37d06c55f39d0e1fb` has an `assertPermission(perm, 'write')` check in `apps/web/src/app/actions/commercial-docs.ts` (around line 880). Its form wrapper throws when the action result is not OK (around line 2259), consistent with the observed error page. `apps/web/src/lib/access.ts` (around lines 24–30) throws for denied permissions. This is supporting source evidence, not proof that the currently deployed host runs that exact source commit.
The host returned only an application error digest; no server logs or HTTP response details were available. Treat the permission denial as observed and effective for this attempt, and the exception cause as strongly indicated by source but not confirmed from live server logs.

## Follow-up

- Return a safe permission error from the server action and render it inline or as a toast/redirect instead of throwing from the form wrapper.
- Keep the server-side write permission check, and hide or disable create actions for Viewer roles for clarity.
- Re-run the same scenario on a build with confirmed identity; assert no document exists and the user remains outside the error boundary.
