# Extend real HTTP authorization to finance-critical settings

Product v2.5.8 /cf35da1244e902e4a41291bc409eb0d994ed4e01, master rechecked unchanged2026-10-15. Prior QA implementation df275880fa18c80908b69e4d5e52bb866296571e. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc; BR-SEC-02 /BR-DAT-01 /RB-UI-01. No rule or original303/18-case finance/role expectation changes.

BUG0051 confirms one settings action accepts Viewer writes. Graph-first discovery then pinned-source verification finds other settings mutators require tenant context but do not assert the existing company.tax.write, company.sales_settings.write, company.purchase_settings.write and company.inventory_settings.write keys. Source concern alone is not a confirmed runtime bug. Four new cases execute actual rendered form actions with real credential cookies, independently observing persistence and working same-action Owner positives.

| New IDs | Route/field | Required outcome |
|---|---|---|
| HTTP010/110 | Tax office | Viewer forbidden office never persists; Owner distinct office does |
| HTTP011/111 | Sales tax-invoice department code | Viewer sentinel denied; Owner distinct code persists |
| HTTP012/112 | Purchase default payment terms | Viewer sentinel denied; Owner distinct terms persist |
| HTTP013/113 | Inventory costing method | Viewer FIFO denied; Owner average persists with negative-stock block |

Run AFTER the original nine cases in each boundary so settings cannot contaminate original payment expectations. Only service products exist; no physical lots expected. Each denied attempt compares expanded business snapshots: tenants/profile/tax/sales/purchase/inventory settings, documents/journals/allocations/stock/cost/audit. Owner positive requires exact persisted field and successful form transport; both attempts must preserve posted economic rows/stock. Missing page/form/identity prerequisites block. Non-owner role failures cannot count as permission denials. Eight new slots repeat four scenarios at two DB boundaries.

Fixture http-v3-settings retains actual direct TLS/compiled Next/auth/config from v2. Manifest expands18 to26 slots with stable original IDs. Numeric redirect diagnostics now expose only fixed loopback-host/protocol categories and numeric loopback port; no arbitrary URL/identity passthrough. Anonymous mismatch remains failed. No Location rewrite, trust-host setting, TLS/cookie weakening, runtime auth adapter or bypass grant.

Before extension, [direct v2 summary](../runs/HTTP-2026-10-15T12-51-34-870Z-415340.json), [CI38737766985](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38737766985) executed7pass6fail5blocked, setup passed. It did NOT resolve anonymous origin mismatch. BUG0051/0052/0053 reproduce unchanged. [Companion129PG](../runs/RUN-2026-10-15T12-51-16-344Z-runtime.json), CI38737767259:127pass2fail RT061/62, no infrastructure failure. Both immutable; full fingerprints in JSON.

Local syntax/six guards pass; metadata validation required before publication. Fresh26-slot CI pending, not a pass claim. No product code, staging data or pending P258 permission setup changed. No additional defects assigned before execution. Real backup/restore LAST; customer readiness unconfirmed.
