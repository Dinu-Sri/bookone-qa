# BUG-0022: Concurrent AR payments overallocate and disagree with invoice balance

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: B-107. Two350 requests against600 both accepted: cash receipts700, document paid350/balance250, GL AR−100. Expected one accepted350, cash350/AR250 and matching document/allocations.

Source investigation: apps/web/src/app/actions/documents.ts: allocateDocumentPayment reads balance before transaction/lock and later overwrites paidAmount from the stale row.

Recommended repair/adjacent checks: Lock the current document and revalidate balance/state/scope inside one transaction with payment, allocation, journal, document and audit writes. Add AP and disjoint-invoice positives, exact retry and race controls.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
