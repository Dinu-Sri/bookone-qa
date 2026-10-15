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

## Executed breadth and harness origin correction

CI38739011909 /HTTP-2026-10-15T13-00-44-761Z-8d1cb1 =7pass10fail9blocked. HTTP010–013 each ViewerSettingChanged1/OwnerSettingSaved1/postedFactsUnchanged1; confirmed variants expand BUG0051. Restricted110–113 block; BUG0052/0053 unchanged. Companion129PG127pass2fail RT061/62. Preserve v3 immutable summary.

Actual anonymous destination categories HTTPS/localhost/3443 plus official pinned NextURL.parseURL prove loopback canonicalization mismatch. V4 changes only the QA permitted origin to https://localhost:3443, independently pins socket127.0.0.1 and verifies certificate localhost, canonical Host. No DNS/response rewriting/global trust-host, no weakening of cookie/TLS/origin checks, no product change. Seven guards/syntax pass; fresh26-slot execution pending. All money/role/zero-effect expectations intact.

## Canonical v4 executed outcome

[runs/HTTP-2026-10-15T13-08-49-991Z-e76d96.json](../runs/HTTP-2026-10-15T13-08-49-991Z-e76d96.json), [CI38740136839](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38740136839): **9pass8fail9blocked**,26 selected/setup complete. Same-origin HTTPS anonymous login redirect, wrong password, six real credential identities and cookie controls pass in both roles. QA normalization mismatch is now resolved without weakening TLS/origin checks. Five settings-write variants BUG0051, legacy Viewer promotion/payment BUG0052 and restricted ERP identity BUG0053 remain. Nine dependent restricted cases block, never secure denials. Owner final210/390/fivejournals/fourallocations, restricted150/450/twojournals/oneallocation. Companion runs/RUN-2026-10-15T13-08-42-693Z-runtime.json /CI38740136795 =127pass2fail RT061/62, no infrastructure failure.

Implementationda40ee9683632eb3ef11cff0662e202e370b8f1e, tested merge90804160c2d26405cb2deaa70e359e32dba48f37, content46ad917306e71e5fa13e9f9d99d318a318efaf08e025926bdbe65617ad19aa02. Full fingerprints and first attempts retained; original303 unchanged. New candidate requires independent diff/pin review and unchanged303/26 rerun. Customer readiness and actual deployed proxy/browser/files/upgrade/recovery remain unverified. Real backup LAST.
