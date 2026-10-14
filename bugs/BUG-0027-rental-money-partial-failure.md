# BUG-0027: Failed rental deposit leaves transaction and empty journal

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: D-118. Injected journal-line failure returns ok:false but leaves one new transaction and one journal with zero lines; event remains uncredited. Expected the entire business snapshot unchanged.

Source investigation: rental-money.ts postBalanced writes separate statements; withTenantContext only pins a connection and does not begin a transaction.

Recommended repair/adjacent checks: Wrap collect/refund/application event and financial/audit writes in an explicit transaction. Lock deposit/open-balance resource for concurrent refunds/applications and test every durable fault boundary.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
