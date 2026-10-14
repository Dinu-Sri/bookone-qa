# BUG-0029: Failed or losing transfers leave partial stock/history

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: RT-021 / RT-022. Movement-insert fault returns failure but leaves a stock header/line, new cost layer and consumption, and a changed snapshot. Competing transfer test passes quantity/value checks but fails the exactly-one accepted stock-header assertion.

Source investigation: inventory.ts createStockTransfer performs multi-statement mutations without explicit transaction; inventory-costing helpers also swallow some errors.

Recommended repair/adjacent checks: Transact header/lines/layer consumption/receipt, source/target quantities, movements and audit; lock stock resources in stable order. Propagate real costing/storage errors. Failed/race-losing operations must leave no partial business history.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
