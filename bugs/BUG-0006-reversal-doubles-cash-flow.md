# BUG-0006 — reversing a cash sale doubles displayed cash flow

Status: reproduced. Severity: P1 financial reporting.
Build: v2.1.0 / 2b92cf4. Source: 2b92cf40a3d258dcfc29655759d37b0c32aaebbf.
Run: [RUN-06](../runs/RUN-20261013-finance-investigation-06.md).

## Reproduction and independent expectation

1. From an empty October journal/transaction view, Owner recorded a123.45 synthetic new cash sale to1000.
2. Verified saved journal Dr1000/Cr4000 each123.45.
3. Reversed it once via supported UI. Verified reversal Cr1000/Dr4000 each123.45; both records retained.
4. Dashboard and Reports Cash Flow showed money in246.90, money out0, net246.90. Cash available/assets and P&L were0.

Expected cash-account net movement0. The gross sum of journal debits246.90 is valid; labeling that amount **net cash flow** is not.
After all three run-owned sales/reversals, six balanced journals net cash/revenue0 but Reports net cash273.80.

## Source and remediation

`apps/web/src/app/actions/record-entry.ts` createReversingEntry retains original direction and positive amount (393/396) and flips journal sides.
`apps/web/src/app/actions/workspace.ts` getReports (783–804) and getDashboardData (340–365) sum direction/positive amount without reversal sign. Both count originals and reversing transactions as receipts.

Use one cash-movement calculation based on signed cash/bank journal lines or a correctly signed complete posting model. Retain period/date, tenant, dimension and reversal history. Never simply remove original/reversal pairs globally: an October receipt reversed in November must preserve each month's movement. Internal bank/cash transfers net0; noncash invoices are not receipts; payment/refund journals must be represented. Audit other consumers (transaction amount badges, cashbook summaries, charts/exports).

Required regression: sale/reversal net0 same period; different-period reversal; reversed expense; duplicate/reversal-of-reversal denial; transfer net0; invoice payment/refund completeness; exact decimal amounts; filters and fresh reload. P&L/balance sheet and cash-flow assertions must be independent.

## Retest 2026-10-13 — v2.2.0

Candidate6a48cee passes source cash-flow/model cases and focused live123.45 sale/reversal: journals offset exactly, Reports/Dashboard net cash/income0, history retained. Minimal reproduction corrected. Cross-period/transfer/invoice-payment/custom liquid-account adjacent acceptance remains pending. See [RUN-08](../runs/RUN-20261013-v2-2-0-retest-08.md).
