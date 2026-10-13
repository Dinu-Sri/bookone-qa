# RUN-20261012-viewer-permission-retest-02 — after reported staging update

Status: invalid for Viewer-role conclusions; retained as historical UI observation only.

## Validity correction — 2026-10-13

The account's active sign-in was not independently verified before the write actions. Later inspection of `/company/team` showed Owner-level management controls and identified Dinu Madhusanka as Owner, while the synthetic account appeared as a separate Viewer. Therefore this run's successful writes are real UI observations but cannot be attributed to Viewer. Mark both permission assertions **invalid / not-run for Viewer**. The app footer marker was `v2.1.0 · 2b92cf4`; this does not repair the missing actor identity evidence.

## Fingerprint and preconditions

- Target: `https://bookone.clossyan.com`, staging only. Owner has authorized mutations to staging test data; no production system was accessed.
- Date: 2026-10-12 (app's displayed date).
- Product update: owner reported that a new update had been pushed. Exact deployed commit, image digest, schema and storage identity were not available.
- Role: synthetic user remained assigned company job `Viewer`, confirmed on `/company/team`.
- Starting state: invoice list contained the earlier archived `INV-20261012-0001`. Customer list showed the prior test customer `CUS-0001` active with LKR 100. That older record was not changed in this retest.

## Checks and results

| Check | Expected if Viewer is read-only | Observed | Result |
|---|---|---|---|
| Create customer | Server denies; no active customer appears | Submitted code `QA-VIEW-20261013` / name `QA Viewer Update Retest 20261013`; record appeared in customer picker and active list | failed |
| Save invoice draft | Server denies; no draft appears | LKR 100 free-text service draft created as `INV-20261012-0002` | failed |
| Post invoice | Not attempted | No post action, journal or stock mutation | not-run |
| Cleanup | Recoverable archive, then confirm state | New customer and invoice archived; UI reported “Archived successfully” | passed for cleanup action |

## Evidence limits and notes

- The current staging UI still allowed Viewer customer creation and invoice draft creation after the owner-reported update. These repeat BUG-0003 and BUG-0004, if Viewer is intended to be read-only for these operations.
- The test invoice/customer created by this run are archived and recoverable; they were not permanently deleted. No posted invoice, payment, journal, stock movement or ledger assertion was run.
- Customer list still displayed pre-existing customer `CUS-0001` active with balance LKR 100 while its earlier test invoice `INV-20261012-0001` was archived. This is recorded as an observation only. The run did not inspect authoritative GL/subledger state and does not conclude that an archived draft changes AR.
- Customer code/name include `20261013` although the staging date was 2026-10-12; the unique synthetic prefix was used only for this probe.
- No credentials, cookies, real customer details, screenshots or raw browser logs are included in this public record.

## Next action

Identify the deployed image/commit and confirm Viewer permission intent. Investigate server-side authorization and reconcile the pre-existing LKR 100 displayed customer balance. After a candidate fix, rerun both write denials on an identified build and verify there is no active document or accounting/inventory side effect.
