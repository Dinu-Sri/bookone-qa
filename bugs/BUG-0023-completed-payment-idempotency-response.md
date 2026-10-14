# BUG-0023: Completed payment replay is reported as still running

Priority P1; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: B-106. Same-key invoice replay returns the original invoice. Payment first succeeds, replay is refused, one payment remains250 and AR350. No duplicate payment is claimed.

Source investigation: apps/web/src/lib/idempotency.ts: completion recognizes result.id; receiveCustomerPayments stores ok/paidCount without id.

Recommended repair/adjacent checks: Recognize a completed response for every supported operation shape. Preserve authenticated permission/scope and payload-binding semantics; document the replay contract and test successful/failed/parallel retries without inventing POL06 rules.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
