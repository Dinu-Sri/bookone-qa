# BUG-0028: Viewer can transfer stock

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: C-109. After the Owner transfer positive conserves10/value600, Viewer transfers one more unit, returns success and adds an audit. Expected denial and identical stock/document/layer/history snapshot.

Source investigation: apps/web/src/app/actions/inventory.ts: createStockTransfer checks a source dimension but not authoritative inventory write access.

Recommended repair/adjacent checks: Add current role/module/entity plus both source/target ownership/scope checks before writes. Keep Owner positive, real foreign records, suspended/stale roles and module-off cases.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
