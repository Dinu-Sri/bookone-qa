# RUN-20261013-viewer-permission-retest-04 — staging build marker 2b92cf4

Status: exploratory retest; permission failures reproduced. Footer build marker captured, but image, schema and storage identity remain unknown.

## Fingerprint and preconditions

- Target: `https://bookone.clossyan.com`, staging only; no production system was accessed.
- Date shown by staging: 2026-10-13.
- Visible app marker: `v2.1.0 · 2b92cf4` in the footer. This is a user-facing build marker only; container image digest, full commit identity, schema and storage identity were not available.
- The synthetic account was confirmed on `/company/team` as assigned company job `Viewer`.
- Before this run, the active customer list showed the earlier test customer `CUS-0001` with a displayed LKR 100 balance. It was not modified.

## Checks and results

| Check | Expected if Viewer is read-only | Observed | Result |
|---|---|---|---|
| Create customer | Server denies; no active customer appears | Created `QA-VIEW-20261013-R4` / `QA Viewer Retest Four`; active row appeared | failed |
| Save invoice draft | Server denies; no draft appears | LKR 100 free-text service draft `INV-20261013-0004` appeared | failed |
| Post invoice | Not attempted | No post action, journal or stock mutation | not-run |
| Cleanup | Reversible archive and verify | Customer and invoice archived; UI reported “Archived successfully” | passed for cleanup |

## Evidence limits and notes

- Viewer customer creation and invoice draft save remain reproducible on the UI marker `v2.1.0 · 2b92cf4`, assuming Viewer should be read-only for these actions.
- New test records are archived and recoverable. No invoice was posted. No authoritative GL, AR subledger, stock or payment checks were performed.
- After archiving this draft and customer, the customer list still displayed the pre-existing `CUS-0001` as active with LKR 100, while all four listed test invoices were archived. This is an unresolved UI/accounting observation, not evidence by itself of a posted journal or misstatement.
- No credentials, cookies, real business data, screenshots or raw logs are included in this public record.

## Next action

Confirm the Viewer permission contract and investigate server-side authorization in the exact identified product source/build. Reconcile the LKR 100 customer balance against invoice state, AR subledger and GL. After a fix, rerun denial checks on a verified image and confirm no unintended journal or inventory effect.
