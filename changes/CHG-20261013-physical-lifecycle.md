# Physical goods first — all business types remain in scope

Owner instruction2026-10-13: test all business types, starting physical goods. This determines QA order, not an invented launch date or automatic release acceptance. Preserve service/digital/rental/mixed, settings/users/files and history/recovery plans. Launch gate policies stay explicit.

Candidate343d546ed41f7790e1fc45414d130012dab37a39, QA basebe2b59f48ed3005262afbf2d1ccc1dc8dfdbacf1. Staging read-only stamp v2.2.4 ·343d546, existing Owner. No staging mutations/production access. Master/pin match before implementation. Graph discovers commercial/inventory/costing paths; exact pinned source verifies driver and action behaviour.

Add13 actual PostgreSQL owner-connected physical cases, retaining all23 existing runtime and60 source cases. C-101 pending approval; C-102 GRNI on/off; C-103 partial receipts/bills; C-104 partial bills against a full receipt; C-105 sale/payment/credit/last-average-FIFO at one price; C-106 supplier payment/repeat; C-107 unpaid credit purchase return; C-115 real foreign SKU deny; C-116 journal fault rollback; RT-017 Viewer create denies; RT-018 period lock; RT-019 module disable; RT-020 Viewer approval deny with Owner positive.

Single-price no-tax anchor: buy10@60, sell2@100, receive80, return1, receive20. Stock10→8→9; inventory600→480→540; AR200→120→20→0; net revenue100/COGS60/profit40. Supplier payment600 clears AP and cannot repeat. GRNI on/off must not receive/value twice. Exact journals/source/movement/layer/audit/tenant/date checks use independent numbers, not copied product helpers.

Fixture setup inserts synthetic CoA/SKU/settings/membership data into a full isolated PostgreSQL schema. Actual commercial/payment/approval commands drive transitions. Identity is synthetic; real persisted role loading is used. DB owner, framework adapters and no real storage are explicit boundaries. Fault trigger targets only disposable verified loopback PostgreSQL and is removed in finally. No shared staging fault/reset.

Pending diverse-price/backdating/refund/landed-cost policies not silently resolved. New critical assertions still need sensitivity review before becoming a promotion gate. Preserve first failures before diagnostic/fixture changes and distinguish setup, harness, product and policy outcomes. Current extension is implementation pending execution, not passing coverage.
