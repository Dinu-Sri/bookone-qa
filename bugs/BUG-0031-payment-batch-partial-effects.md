# BUG-0031: Failed AR/AP payment batch retains an earlier allocation

Priority P1; rule-adoption gap, open. Candidate **v2.5.5 · 8e1a2b8**. Rule RB-PAY-01 is an owner-delegated whole-batch atomicity default, not proof that a previously fixed bug regressed.

Actual isolated PostgreSQL commands: B-115 allocates 250 against a posted AR invoice of 600, then attempts 100 against a real draft. The batch returns failure with paidCount 1, but retains one payment of 250 and balance 350. Replaying the failed request does not add another payment. RT-026 reproduces the same retained 250 effect for a posted AP bill followed by a nonposting purchase order.

Expected: validate every target and commit the batch atomically, or fail with zero financial/document/audit effects. An explicitly designed partial-payment mode would require a different approved contract and clear per-item results; do not silently accept partial effects to make this test pass. Current UI rendering of paidCount is unverified.

Investigation: the AR/AP payment wrappers execute individual allocations without a shared outer transaction. Preserve document locking, tenant/scopes/period/tender checks and exact retry semantics when repairing. Test late failure, reversed target order, successful multi-document batches and retry after failure.

Evidence: [PG run](../runs/RUN-2026-10-14T11-10-44-786Z-runtime.json), [campaign](../runs/CAMP-20261014-111034220-9ed0bc.json), `tests/runtime/payment-boundaries.test.ts`. Synthetic sessions with actual SQL/product commands; no deployed browser exposure or shared-staging fault test claimed.
