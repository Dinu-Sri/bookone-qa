# Deep batch foundations: next product and QA work

QA source remains deliberately pinned to6a48cee while product development continues. [Programme](../docs/DEEP_BATCH_PROGRAMME.md) and [83 lifecycle tasks](../batches/coverage.json) persist the full plan. B–F now have35 executable source cases; A remains15. These are foundations, not comprehensive executed lifecycle acceptance. No staging mutation in this implementation.

Three new isolated findings: BUG-0010 allocation-boundary permission, BUG-0011 noncash/revenue tender acceptance, BUG-0012 impossible statement dates. Inspect the bug records and [RUN-09](../runs/RUN-20261013-deep-batches-09.md). Direct payment boundary must protect itself; normal wrapper Viewer denial passes as a positive control. Deployed attack exposure and downstream import corruption are **not verified**. BUG-0008 quality-publication gate remains separately open.

Coding agent: review real financial entry points/callers for own permission/state/dimension/account eligibility, fix unsafe tender validation, validate real dates and document the intended behaviour in product CHG. Preserve AR/AP/cash/journal/allocation/audit links, historical facts and atomicity. Do not change QA expectations merely to pass the fixes. No request to reintroduce product E2E console or remove retained package unit tests.

QA next implementation: B-101–103 quotation/draft/commercial posting adapters on full isolated migrations; B-104/108 credits/invalid states; B-106/107/115 real idempotency/races/partial-batch failure; B-109/110 runtime roles/tenant/files. Implement A runtime gaps in parallel in the work queue, without treating separate single-connection tests as concurrency. Then C-102/103/105 persisted stock/value and D-101–110 persisted hire/deposit flows. E and F tasks are explicitly registered, so they do not depend on chat memory.

Every next session: read SESSION.md/STATUS/programme, run batch:coverage, inspect last run and task status, preserve first failures. Missing policy decisions in memory/policies.json remain blockers for their specific acceptance cases. Never reset shared staging or replay old live payments to recover an offline fixture.
