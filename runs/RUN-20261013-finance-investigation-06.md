# RUN-20261013-finance-investigation-06

Status: completed investigation; failures recorded. Not release acceptance.

## Fingerprint and actors

- Owner-authorized staging; UI stamp stayed `v2.1.0 · 2b92cf4`.
- Source reviewed at `2b92cf40a3d258dcfc29655759d37b0c32aaebbf`. Footer matches its short SHA; image digest, schema and storage identity were not independently verified.
- QA documentation parent: `572857fa7b3a213f3e0a6a8f35c15cb0b9255150`. Automated unit source pin remains `65f84c151f7332efa196ed837ad179ac4818178b`; no fresh candidate unit suite was executed.
- Signed out Viewer, explicitly signed in as Owner for finance tests, then signed out Owner and freshly signed in as the synthetic Viewer for one role-denial test. Role-loaded navigation showed every business area View only and omitted Owner/admin navigation.
- Code graph was used first for discovery. It contains removed E2E nodes/stale symbol offsets despite current checkout metadata; relevant code was verified directly from GitHub at the candidate SHA.

## Starting state

October journal and transaction lists were empty. AR Aging showed zero/no open receivables. Active synthetic customer `CUS-0001` showed LKR100, including quick-view label “Open AR.” Four old invoices were archived: `INV-20261012-0001`, `0002`, `0003`, `INV-20261013-0004`. These records were preserved.

## Executed outcome assertions

| Check | Result | Evidence |
|---|---|---|
| Cash sale123.45, account1000, Cash, date2026-10-13, synthetic party QA-FIN-261013-R6 | Passed focused posting assertions | Journal prefix ee5ad287: Dr1000 / Cr4000, each123.45; saved transaction visible after navigation |
| Neutral-description new sale12.34, QA-FIN-261013-R6-NEUTRAL, description “QA service probe R6 neutral” | Passed focused original-bug regression | Journal prefix a422ebc0: Dr1000 / Cr4000, each12.34; no4300 error |
| Owner supported reversal of those two sales | Passed journal-side/amount assertions | Opposite journal lines persisted, original marked Reversed, reversal records retained |
| Dashboard/Reports after first sale and reversal | Failed | Cash and P&L net0, but cash flow246.90 instead of0 |
| Existing customer receivable reconciliation | Failed display consistency | Customer Open AR100, Aging0 and initially no October journals/transactions; source customer aggregate includes archived/unposted documents |
| Default report month label | Failed | Header Oct2026 but body January2001 |
| Explicit prior/current month comparisons | Passed only executed date/label assertions | September2026: zero entries/cash0; explicit October2026: six entries and correct label; this does not establish all period modes |
| Verified read-only role financial mutation denial | Failed | A synthetic restricted operation persisted a new reversal journal; private owner evidence retained, sanitized BUG-0009 |
| Current CI source review | Failed release-gate design | All four pnpm checks suppress failures; image publication independent |

## Cleanup and final state

Three synthetic sales total136.90, amounts123.45/12.34/1.11, all reversed using supported UI. The final restricted-role check caused the third reversal. Six balanced journals remain; each cash/revenue account nets to0. Journal gross debits273.80 is correct, while Report **net** cash flow273.80 is incorrect. Reports net income/assets0. No new customer or invoice created. Old customer/invoices unchanged. Browser left in verified Viewer session.

This proves persisted UI outcomes, not DB-role/RLS, cross-tenant isolation, concurrent reversal safety, audit contents, restore safety or data-loss absence. Larger invoice/payment/return journey was not run after the report/authorization failures; it is queued after targeted fixes/retests.

See [coding-agent handoff](../handoffs/HANDOFF-20261013-finance-and-release.md). Credentials and sensitive security reproduction detail remain outside Git.
