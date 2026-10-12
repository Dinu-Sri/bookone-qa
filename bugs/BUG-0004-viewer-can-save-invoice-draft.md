# BUG-0004 — Viewer can save an invoice draft

Status: reproduced in staging after the owner reported the invoice-denial fix was pushed; deployed commit/image identity is unverified.
Severity: P1 candidate — a company user assigned the Viewer job saved a sales invoice draft. No posting was attempted; this finding alone does not establish ledger or stock impact.

## Environment

- Target: `https://bookone.clossyan.com` staging.
- Test account: synthetic staging user whose company job is `Viewer`; credentials are excluded.
- Customer list was empty at test start. No real customer or financial data was used.

## Reproduction and result

1. Sign in as the synthetic Viewer.
2. On `/company/team`, verify the account is assigned job `Viewer`.
3. Open `/sales/invoices/new`.
4. Enter synthetic customer text `QA Viewer Invoice Save Probe 20261012`, add a free-text service line `QA Viewer denial probe service`, set quantity to 1 and unit price to LKR 100.
5. Select **Save draft**; do not select Post.
6. The app navigates to `/sales/invoices` and displays `INV-20261012-0001`, customer text, status `draft`, total LKR 100.
7. Archive the test invoice. The UI confirms “Archived successfully”; the invoice remains visible with status `archived` and can be restored.

Expected if Viewer is read-only: server rejects draft creation with a normal permission message and creates no invoice.
Observed: Viewer created the draft. It was archived for cleanup. No invoice was posted and no ledger or stock mutation was attempted.

## Source review and limits

The local BookOne source graph at `7b1794fd3c2344bdfa3e095dd0bb9cb8b9647b16` shows `createCommercialDocument` calls `assertPermission(perm, 'write')`. That indexed revision is not verified as the deployed revision. The staging result therefore requires investigation of the effective permission mapping and runtime build; this report does not claim the source assertion is absent or that the current build lacks it.

## Follow-up

- Confirm the Viewer job's intended document permissions.
- Verify the deployed commit/image and the runtime Viewer permission set.
- Ensure the server denies draft and post writes; hide/disable controls as a usability aid only.
- Retest create, edit, archive and post denials, and confirm no active document, journal, or stock effect remains.
- Add a lasting regression test. Do not close until no Viewer draft is created on an identified build.


## Retest after latest staging update — 2026-10-12

As a user still assigned `Viewer`, selected synthetic customer `QA Viewer Update Retest 20261013`, added a free-text service line for LKR 100 and selected **Save draft**. The list showed `INV-20261012-0002`, status `draft`, total LKR 100. The invoice was archived. No Post action was used, and no journal or stock effect was checked. This reproduces the write after the reported update; deployed build identity remains unknown.


## Third retest — 2026-10-12

As Viewer after another owner-reported staging update, saved a LKR 100 synthetic service invoice draft as `INV-20261012-0003` for `QA Viewer Retest Three`. The invoice appeared as `draft`, then was archived. No Post action was used and no journal or stock assertion was run. This repeats the finding; deployed build identity remains unknown.
