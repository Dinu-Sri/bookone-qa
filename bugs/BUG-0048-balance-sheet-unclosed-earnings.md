# BUG-0048: Balance Sheet omits unclosed earnings and does not balance

**P1 open, release blocker.** Observed v2.5.7 /7ffafab, synthetic company with no pre-run trading balances. [Run](../runs/RUN-20261015-v257-physical-browser.md), LP257-021. Current October journals balance individually and activity debits=credits2750.

Repro via supported UI: capital1000; qty-onlyGRN10at60 and bill600; quote/order/invoice4at100; cash receipt150; linked credit1at100/cost60; supplier cash payment200. Final Cash950+AR150+Inventory420=Assets1520. AP400, OwnerEquity1000, grossSales400-returns100-COGS180=profit120. P&L correctly shows120. Balance Sheet displays Total assets1520 but Liabilities+equity1400, with only OwnerEquity1000/Drawings0 under Equity and no current earnings.

Expected for this fresh same-period company: report equity1120 including current earnings120; liabilities400+equity1120=1520. Preserve the correct underlying journals; do not invent a balancing cash/equity transaction or suppress the120 discrepancy.

Pinned source confirms the omission: apps/web/src/app/actions/workspace.ts:828-850 computes netIncome but balanceSheet.equity/totalEquity includes only type=equity account balances. apps/web/src/app/reports/page.tsx:105-111 sums those liabilities and equity without income. The graph snippet ranges are stale, so these are verified against pinned7ffafab source.

RT-060 is newly added, not yet executed at report creation: independent isolated service invoice600, assets600/profit600/liabilities0, required report equity600 and equality; actual invoices/journals must stay unchanged. It uses the existing declared owner-DB/synthetic-login boundary, not browser/security certification. Existing300 assertions remain unchanged.

Fix requirements: make the Balance Sheet reflect correct earnings as of its reporting cutoff and scopes; avoid double-counting closed retained earnings. Add independent profit/loss/zero-income, prior-period opening balances, reversals/credits, year-end/closed earnings, branch/tenant/date controls. Cumulative/as-of behavior is a related source concern, not separately runtime-reproduced here. BR-ACC-01/08, BR-DAT-01; independent expert review remains pending.


## Subsequent isolated regression result

[301-check campaign](../runs/CAMP-20261015-070624689-f091fa.json), [CI38696490949](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38696490949): **300pass,1fail**, zero skip/block/flaky/not-run. Only RT-060 failed. [PostgreSQL](../runs/RUN-2026-10-15T07-06-31-692Z-runtime.json), [CI38696491048](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38696491048):126pass/1fail of127; no infrastructure failures;43/43 migrations on PostgreSQL16.15. Independent invoice600 gave assets600/profit600/liabilities0 but report equity0 instead of600. All original300 checks, including98units/60source/16archive helpers/126 priorPG checks, pass at this fresh fingerprint.

QA implementation ec441b210e19c7b8c35710cfef3e0f77d1a2a442; tested merge ed269a4a2624ecc7c7d1ef57796c163b3419c27f; QA content ea3c5e0da6c72944bbcfd3477b648b7f1658f277d07c233a157ff0563e49f252; plan 5196dbc99b6ee0633dd30930e373c69b0c34987ae7a4d306621b1a99ac340e9f; Node22.23.3, campaign-v2 bank hash 1a6e0581380277584a2318d851ee3eb7f2cf4b0c330230725cb5fd00ff5149fc. Product remains7ffafab. Complete fingerprints are in immutable JSON. This is an executed product assertion failure, separate from intentional full-workflow/policy acceptance gaps. Preserve the red check; do not weaken expected equity or rewrite posted journals. Earlier not-yet-executed statements describe the initial checkpoint only.
