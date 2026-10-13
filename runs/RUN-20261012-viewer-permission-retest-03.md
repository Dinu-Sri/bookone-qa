# RUN-20261012-viewer-permission-retest-03 — after another staging update

Status: invalid for Viewer-role conclusions; retained as historical UI observation only.

## Validity correction — 2026-10-13

The account's active sign-in was not independently verified before the write actions. Later inspection of `/company/team` showed Owner-level management controls and identified Dinu Madhusanka as Owner, while the synthetic account appeared as a separate Viewer. Therefore this run's successful writes are real UI observations but cannot be attributed to Viewer. Mark both permission assertions **invalid / not-run for Viewer**. The app footer marker was `v2.1.0 · 2b92cf4`; this does not repair the missing actor identity evidence.

## Fingerprint and preconditions

- Target: `https://bookone.clossyan.com`, staging only; no production system was accessed.
- Date: 2026-10-12, matching the application's displayed date.
- Owner reported another product update was pushed. Exact deployed commit, image digest, schema and storage identity remain unverified.
- The synthetic account was rechecked on `/company/team` and remained assigned the company job `Viewer`.
- Before this retest, the active customer list showed the prior synthetic test customer `CUS-0001` with an LKR 100 displayed balance. It was not changed.

## Checks and results

| Check | Expected if Viewer is read-only | Observed | Result |
|---|---|---|---|
| Create customer | Server denies; no active customer appears | Created `QA-VIEW-20261012-R3` / `QA Viewer Retest Three`; active row appeared | failed |
| Save invoice draft | Server denies; no draft appears | LKR 100 free-text service draft created as `INV-20261012-0003` | failed |
| Post invoice | Not attempted | No post action, journal or stock mutation | not-run |
| Cleanup | Reversible archive and verify | Invoice and customer archived; UI displayed “Archived successfully” | passed for cleanup action |

## Evidence limits and notes

- Customer creation and invoice draft creation as Viewer repeat BUG-0003 and BUG-0004 if Viewer is intended to be read-only for these operations.
- New records from this run are archived/recoverable. No posted invoice, payment, journal, inventory movement, or authoritative GL/subledger assertion was run.
- After archiving the new invoice and customer, the active customer list still showed the pre-existing `CUS-0001` with LKR 100. This is a repeated UI observation, not proof of an accounting posting or misstatement. Reconcile against authoritative AR, GL and invoice status before making a financial conclusion.
- Screenshots, credentials, cookies and raw browser logs are not included in this public record.

## Next action

Identify the running image/commit and confirm Viewer permission intent. Investigate server-side authorization. Reconcile the customer balance observation against authoritative subledger and GL data. On an identified candidate, rerun server-side denial checks and verify there are no active drafts or unintended accounting/inventory effects.
