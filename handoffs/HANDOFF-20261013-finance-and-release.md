# Coding-agent handoff — finance and release investigation, 2026-10-13

Candidate: BookOne v2.1.0 / 2b92cf4; source reviewed at2b92cf40a3d258dcfc29655759d37b0c32aaebbf.
Evidence: [RUN-06](../runs/RUN-20261013-finance-investigation-06.md). No product code changed or release acceptance granted in this investigation.

## Fix order

1. **P1 financial authorization — BUG-0009.** Review `apps/web/src/app/actions/record-entry.ts` createReversingEntry and its form/by-ID entry points. Apply an explicit write/reversal permission from the real registry and dimension scope at the server boundary. Align UI access. Fresh Viewer staging check persisted a restricted reversal; exact security reproduction is privately available to the owner. Verify role-denied action has zero side effects and authorized reversals still work.
2. **P1 cash-flow accuracy — BUG-0006.** `getReports` and `getDashboardData` in workspace.ts count reversal rows as additional positive receipts. Share a complete signed cash-account movement calculation. Keep original and reversing journal dates; preserve history. Same-period123.45 sale/reversal must net0, while cross-period reversal remains in its actual period. Include cash/bank transfers, invoice payments/refunds, noncash exclusions, decimals and dimensions.
3. **P1 customer/subledger accuracy — BUG-0005.** `listParties` in parties.ts sums unposted/archived document balances and labels them Open AR. Separate historical documents/counts from posted obligations. Do not erase financial debt when a posted unpaid document is merely archived. Confirm status/posting/return-sign rules and share them with aging/allocations. Check AP purchase-order inclusion too. Current open-AR query also includes draft status by omission; reproduce with a safe draft and protect payment allocation accordingly.
4. **P1 release safeguards — BUG-0008.** Remove mandatory-check failure masking, use real product/external-QA commands, and gate publication/promotion on successful checks for the exact same SHA. Owner must configure required branch/release statuses. Failure-injection acceptance tests are required; this investigation only reviewed configuration.
5. **P2 report labeling — BUG-0007.** ReportsPage formats a period token as a Date; use the already-resolved periodOptions.label for headings/metrics. Verify defaults, month/fiscal/rolling/all/custom modes and retained query params.

## Already retested / attribution correction

- BUG-0001 focused cash-sale regression passes, including a description with no sale keyword: Dr1000/Cr4000 exact12.34. Current posting.ts defaults new-sale category to4000. Adjacent mapping/missing-account cases remain pending; do not change this working path merely because the old issue says reproduced.
- BUG-0003/0004 are withdrawn as role-specific findings: earlier writes had unverified actor identity. Fresh Viewer create screens deny properly (RUN-05), but that UI evidence is not complete server authorization acceptance.
- BUG-0002 current Viewer create page has an ordinary denial, not the historic error boundary; original denied-submit branch remains unexecuted. Preserve history without claiming full closure.

## Implementation/handover requirements

Read BookOne AGENTS.md, docs/QA_CHANGE_CONTRACT.md and docs/VERSIONING.md. Work on a reviewed branch; create CHG record describing intent, exact diff, permission keys, financial rules and data compatibility. Bump VERSION for product changes and update TASK_LOG/PROJECT_STATUS. Tests and QA run history belong in bookone-qa. Preserve existing records/journals; no DB reset, deleting/recreating fixtures or blanket balance zeroing as a fix.

Review change impact and update external QA product-ref deliberately to the candidate being validated; its current65f84c1 pin predates this build. Add lasting outcome regressions for each defect, run retained product checks plus independent QA units/affected browser flows, and hand over exact source/image/migration/config and results. Do not treat test discovery or green documentation CI as live acceptance.

## Retest after deployment

Verify version/SHA and actors before mutations; Company name and roster alone do not identify the signed-in actor. Re-run role denials with real records, cash-sale/reversal and report/customer reconciliations, then proceed to an isolated invoice → payment → return/reversal journey. Period locks, concurrent posting, RLS/foreign tenants, audit history and recovery remain outstanding.

Cleanup of RUN-06: three synthetic sales were reversed, six balanced journals retained, cash/revenue net0. Old synthetic customer and four archived invoices preserved. Report net cash273.80 remains a defect. Credentials/raw/security evidence remain private.
