# BUG-0015 — Two concurrent requests reverse the same sale twice

P1 financial correctness finding reproduced on actual PostgreSQL16/full schema and product993664b actions. Owner database connection, synthetic authenticated Owner with actual persisted permission loading; two requests share the actual postgres-js pool. This is an isolated contention experiment, not a deployed HTTP/browser reproduction. No staging data was mutated.

Reproduction: `tests/runtime/reversal.test.ts`, RT-006. Create an actual cash sale123.45 through `recordEntry`. Start two `reverseTransactionById` calls together. A temporary isolated insert trigger delays reversal insert250ms to widen overlap after preflight reads; it changes no amount/result/locking policy and is dropped in finally. Expected one accepted reversal, two total journals, net cash/income0. Actual two accepted requests, two reversal transactions, three journals, cash/income both-123.45. [Numeric evidence](../runs/RUN-2026-10-13T08-47-49-891Z-runtime.json), [CI3](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38371660345). Earlier [CI2 summary](../runs/RUN-2026-10-13T08-42-59-461Z-runtime.json) independently recorded two accepted requests/two reversals before monetary diagnostics were added.

Positive controls: RT-005 sequential reversal flips the exact two lines once, preserves original/reversal linkage, records one reversal audit, net0, and denies a repeat with no further mutations. RT-007 persisted Viewer cannot reverse the actual existing sale. These passing controls do not address competing writers.

Source: `apps/web/src/app/actions/record-entry.ts`, `createReversingEntry` checks `reversedByTransactionId` before its database transaction. Both requests can read an unreversed original; each creates a reversing transaction/journal, then overwrites the original pointer. Atomic execution of each individual reversal does not make the shared eligibility check concurrency-safe. Current schema has no unique single-reversal constraint.

Repair requirements: put eligibility read/lock and financial writes in the same tenant-scoped transaction, lock/serialize the original or use an atomic claim, recheck under the lock, and enforce an additive database uniqueness invariant for an original's reversal according to preserved-history policy. Roll back the losing request cleanly; keep its response understandable. Do not fix this with client disabling, global locks or assertion changes. Review other read-then-write flows: invoice numbering/posting, payment balance/allocations, cost layers/stock, rental availability and imports.

Acceptance: unchanged RT-006 becomes one accepted effect with net0 under forced contention; sequential, permission, period/scope, audit/link and foreign-tenant checks remain correct. Repeat with independent processes/HTTP sessions and intended non-owner runtime role. Add failure/retry evidence; never silently delete duplicate financial history in deployed systems.

## v2.2.3 retest — 2026-10-13

v2.2.3/0d adds original-row locking and index040. Fresh current schema plus42 migrations applies, but RT-005/006/007 fail on sale/permission prerequisites before reversal contention. No new duplicate reversal observed or accepted fix demonstrated. See RUN-13/BUG-0017. Preserve old numeric evidence; historical upgrade/recovery remains open.

## v2.2.4 bounded retest — 2026-10-13

RT-005/006/007 pass: one accepted concurrent reversal, two total journals, cash/income0 with exact linkage/audit and Viewer denial. Bounded actual owner-connected action fix; non-owner/HTTP races and historical040 upgrade/recovery remain open. See [RUN-14](../runs/RUN-20261013-v2-2-4-retest-14.md). Earlier failures remain preserved.
