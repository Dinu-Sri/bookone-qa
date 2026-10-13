# BUG-0007 — default Reports period renders January2001

Status: reproduced. Severity: P2 incorrect financial period labeling.
Build: v2.1.0 / 2b92cf4. Source: 2b92cf40a3d258dcfc29655759d37b0c32aaebbf.
Run: [RUN-06](../runs/RUN-20261013-finance-investigation-06.md).

Default Reports/Cash Flow showed selector Oct2026 but body/metric January2001 with current October data. Explicit `period=2026-10` showed October2026 and six entries; explicit `period=2026-09` showed September2026 and0 entries. These comparisons isolate the observed failure to the default label, not the tested date range.

`apps/web/src/app/reports/page.tsx` lines51–53 parses `${periodOptions.selected}-01` as a Date. Selected is a token such as this_month; getPeriodOptions already supplies the resolved human label. Use that resolved label consistently rather than parsing tokens as calendar months.

Regression: default/current/last month, explicit month, all time, rolling7/30d, fiscal year and custom-range labels; verify headings, selected range and report/tab navigation preserve identical range. Remaining modes were not executed in this investigation.
