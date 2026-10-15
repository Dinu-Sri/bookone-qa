# BUG-0048: Balance Sheet omits unclosed earnings and does not balance

**P1 open, release blocker.** Observed v2.5.7 /7ffafab, synthetic company with no pre-run trading balances. [Run](../runs/RUN-20261015-v257-physical-browser.md), LP257-021. Current October journals balance individually and activity debits=credits2750.

Repro via supported UI: capital1000; qty-onlyGRN10at60 and bill600; quote/order/invoice4at100; cash receipt150; linked credit1at100/cost60; supplier cash payment200. Final Cash950+AR150+Inventory420=Assets1520. AP400, OwnerEquity1000, grossSales400-returns100-COGS180=profit120. P&L correctly shows120. Balance Sheet displays Total assets1520 but Liabilities+equity1400, with only OwnerEquity1000/Drawings0 under Equity and no current earnings.

Expected for this fresh same-period company: report equity1120 including current earnings120; liabilities400+equity1120=1520. Preserve the correct underlying journals; do not invent a balancing cash/equity transaction or suppress the120 discrepancy.

Pinned source confirms the omission: apps/web/src/app/actions/workspace.ts:828-850 computes netIncome but balanceSheet.equity/totalEquity includes only type=equity account balances. apps/web/src/app/reports/page.tsx:105-111 sums those liabilities and equity without income. The graph snippet ranges are stale, so these are verified against pinned7ffafab source.

RT-060 is newly added, not yet executed at report creation: independent isolated service invoice600, assets600/profit600/liabilities0, required report equity600 and equality; actual invoices/journals must stay unchanged. It uses the existing declared owner-DB/synthetic-login boundary, not browser/security certification. Existing300 assertions remain unchanged.

Fix requirements: make the Balance Sheet reflect correct earnings as of its reporting cutoff and scopes; avoid double-counting closed retained earnings. Add independent profit/loss/zero-income, prior-period opening balances, reversals/credits, year-end/closed earnings, branch/tenant/date controls. Cumulative/as-of behavior is a related source concern, not separately runtime-reproduced here. BR-ACC-01/08, BR-DAT-01; independent expert review remains pending.
