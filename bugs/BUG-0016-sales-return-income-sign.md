# BUG-0016 — Sales credit increases reported income

P1 accounting/reporting. Product9c17f2b/v2.2.2, actual commercial invoice/receipt/return commands and PostgreSQL16/full schema/41 SQL files, synthetic Owner identity and owner DB connection. Deployed browser reproduction and wider report exposure unverified; staging untouched.

B-104 posts service invoice600 (Dr1300/Cr4000), receives250 (Dr1000/Cr1300), then creates credit100 against it (Dr4100/Cr1300). Independent existing B-003 contract specifies Sales Returns4100, type revenue/normal debit. Expected net revenue/income500, cash250 and GL AR250. Exact GL account balances and three balanced journals pass before income assertion. Actual getReports income700, cash250. [Numeric evidence](../runs/RUN-2026-10-13T10-08-16-750Z-runtime.json), [CI](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38381198463). The reordered follow-up case verifies document/allocation/stock checks before the same income assertion.

Source investigation: graph lookup for getReports/computeAccountBalances returned insufficient results; pinned `apps/web/src/app/actions/workspace.ts` shows computeAccountBalances uses each account's normal-side-positive balance. getReports adds all revenue balances, including debit-normal Sales Returns4100. Thus600 +100 becomes700 instead of600 -100. Treat broader contra expense/assets/equity/trial-balance/display issues as inspection targets until executed, not additional proven failures.

Repair: preserve posted journal signs/history; aggregate report contributions by accounting meaning/side, including contra revenue. Do not relabel4100, negate stored amounts, flip journals, hide the return or adjust snapshots to match700. Review P&L, net-income/retained-earnings calculations and Dashboard, plus gross revenue/discount/return display and corresponding contra-expense/asset cases. Keep scope/date/tenant filters.

Acceptance: unchanged B-104 ends reported income500, cash250, AR250, original600/credit100 links and allocations intact, no stock effect. Add independent debit-normal revenue/credit-normal expense positive/negative cases and representative browser checks. First initial credit attempt lacked4100 in QA and had an incorrect direct4000 expectation; that harness defect was corrected from the pre-existing B-003 contract, with first evidence retained, before this product finding was recorded.

## v2.2.3 retest - 2026-10-13

v2.2.3/0d adds statement-sign helper/report changes. All B source cases pass, but real B-104 fails before credit/report assertions due to shared runtime regression. No new income value observed and no runtime acceptance. See RUN-13/BUG-0017; expected income500/cash250/AR250 unchanged.

## v2.2.4 bounded retest — 2026-10-13

B-104 passes exact persisted credit/allocation/journal/no-stock assertions and reports income500/cash250/AR250. Bounded actual owner-connected finance fix; non-owner/browser/export/other contra-account report coverage remains open. See [RUN-14](../runs/RUN-20261013-v2-2-4-retest-14.md). Earlier failures remain preserved.
