# RUN-09 — B–F source foundations and durable deep-workflow programme

Date2026-10-13. Product deliberately pinned6a48cee55689746462aa668cdd65ad9f3cfb876b; QA development basefd03d8764674697d7ed7afd783e843c9fd02f96e plus recorded content hashes/…1117 tokens truncated…ae.json)7/1: property callback implicitly returned Vitest matcher output, which fast-check interpreted as false despite the numerical expectation. Changed callback to return void; same arithmetic preserved. [Corrected D](RUN-20261013-062640420-d9d7c1.json)8/0. This was a understood harness defect, not a rental product failure or unexplained flaky pass.
- First C/E passed; first F failed the same calendar assertion. Every first summary is retained. F stops at its first malformed-date failure; later inputs in that loop are not claimed executed.

## New findings and limits

BUG-0010: real allocation function accepted a synthetic Viewer and snapshots changed; the normal permission-checked wrapper denied the same actor. Own boundary guard missing at pinned source. Deployed reachability/runtime exposure unverified.

BUG-0011: revenue4000 accepted as receipt tender, reduced invoice debt and changed persisted records. Deny non-liquid/foreign/inactive accounts while supporting declared eligible tender accounts. No actual/live payment made.

BUG-0012: parseStatementDate returned impossible2026-02-30 as an accepted ISO date. Pure parser defect; downstream commit validation/corruption unknown. Preserve valid format/leap/date rules when fixing.

No quote/commercial creation, inventory movement/cost-layer, rental lifecycle/deposit liability, persistent import duplicate, full migrations/runtime-RLS/dimension scope, race/fault/restore or deployed UI acceptance implied. Policy-dependent cases remain unresolved. All staging fixtures from RUN-08 remain unchanged; no reset/cleanup required here.

Next exact QA work: B-101–103 full persisted quotation/draft/invoice/receipt adapters on isolated full-schema PostgreSQL, then credit/state/retry and real permission/race cases. Next coding work: existing mandatory quality-publish gate plus new shared-allocation permission/tender and calendar validation findings. Compare actual new product diff, deliberately advance pin and rerun A plus affected/dependent batches; prior passes do not certify a changed candidate.

## Clean committed-source CI confirmation

Implementation commit `cbda523fdd57df1c600e74a2541d751b53df2c09`, [PR7](https://github.com/Dinu-Sri/bookone-qa/pull/7). [QA repository validation49](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38358818493) succeeded: install, metadata/guards/harness, pin preparation, sensitivity, retained units and browser discovery. Discovery is not browser execution.

[Batch A5](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38358818701) and [B–F source matrix1](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38358818740) independently reproduce the expected46 pass/4 fail on clean committed source (quick profile). Every job completed setup/check/prepare and uploaded a sanitized summary. This is a validated harness with intentionally red candidate contracts; merging QA maintenance is not product release acceptance.

| Batch | CI run ID | Pass/fail | Sanitized artifact ID |
|---|---|---|---|
| A | RUN-20261013-064843098-4d6310 |14/1|11793993075|
| B | RUN-20261013-064845092-475be6 |10/2|11793242907|
| C | RUN-20261013-064844310-4e0cdc |8/0|11793264189|
| D | RUN-20261013-064842887-3338d8 |8/0|11793662415|
| E | RUN-20261013-064846228-e52522 |3/0|11793133171|
| F | RUN-20261013-064841034-40a2ec |3/1|11793138091|

CI quick confirms latest audit/link assertions; local200-sequence broad evidence remains bound to its earlier content hash as described above. Later documentation commits retain the exact implementation SHA and run IDs.
