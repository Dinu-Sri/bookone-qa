# BUG-0010 — allocation boundary lacks its own write permission

Status: reproduced in isolated source/action contract, **deployed exposure not verified**. Severity: provisional P1 authorization. Product6a48cee; B-007. Normal receive-payment wrapper denies synthetic Viewer (B-012 positive control), but the exported allocation boundary accepted it and persisted financial/allocation/audit changes in the same fixture. This is independent of the now-corrected reversal boundary BUG-0009.

Session loading is synthetic; real product permission assertion is retained where called. No staging request or customer record was touched. Existing-tenant invoice is real fixture data, not a nonexistent-ID probe. Do not infer full runtime access solely from this test.

Required work: enforce invoice/bill-specific write permission and tenant/dimension/state/account rules at every reachable financial boundary. Review exported action callers, form wrappers and batch callers; an outer guard does not establish enforcement on another reachable entry point. Retest intended roles, suspended membership and runtime scopes with existing records and no denied side effects. Keep exact journals/allocations/history and period-lock behaviour.

Evidence: [deep batch run](../runs/RUN-20261013-deep-batches-09.md). Private lane logs retain details; no crafted deployed-action payload published.

## v2.2.1 retest — 2026-10-13

At993664b with QA Zod4.4.3, B-007 still fails: direct allocation accepts synthetic Viewer and changes persisted snapshot. Normal wrapper B-012 still denies the same fixture. Isolated source finding remains; deployed exposure not verified. See [RUN-10](../runs/RUN-20261013-v2-2-1-retest-10.md).
