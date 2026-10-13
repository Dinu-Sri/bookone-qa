# Batch implementation and extension protocol

## Commands

Use Node20+ (CI22) and pnpm9. Install with `pnpm install --frozen-lockfile`; prepare the exact product pin with `pnpm product:prepare`.

```
pnpm session:start
pnpm batch:plan
pnpm check
pnpm test:unit
pnpm batch:run --seed 261013 --profile quick
pnpm batch:run --seed 7281 --profile broad
pnpm batch:resume RUN-YYYYMMDD-HHMMSSmmm-abcdef
pnpm batch:export RUN-YYYYMMDD-HHMMSSmmm-abcdef
```

Quick budgets:100 calculation examples per property and up to30 model sequences; broad1000/200. A model sequence can contain up to10 commands. Generation stops at its first counterexample and shrinks it; the budget is not a claim that all examples executed. No skipped case counts passing. Raw fast-check seed/path/replayPath are in private lane logs; reproduce using QA_SEED, QA_REPLAY_SHRINK_PATH and QA_REPLAY_PATH. For targeted replay invoke Vitest with `-t A-007` under the batch config. Keep original evidence and use a new run after changing code.

Windows sandbox troubleshooting: dependencies may need authorized process access to traverse package caches/temp directories. Use a workspace-local store/cache; do not disable TLS or globally trust every Git directory. The implementation session used scoped ownership exceptions for only its QA/product directories. Do not commit machine paths or this session's secrets. Normal CI/local accounts do not need these sandbox-specific changes.

## Executable layers and limits

- A-001/002: pinned posting code; generated integer-money/type inputs with independently specified exact line sets. No jurisdiction/tax/discount rounding contract invented.
- A-003–009/015: actual pinned actions, actual product Drizzle table declarations and real embedded PostgreSQL SQL. Creation and reversal, counts/line sets, zero-side-effect denies, archived draft balance and model reconciliation. Real product assertPermission remains; only session loading is synthetic. Viewer creation deny is a positive control for the actor adapter.
- A-010–012: actual async Reports component rendered to markup; workspace output and shell widgets are fixtures. This proves label use, not browser navigation.
- A-013/014: current YAML release contract; mandatory checks must fail on errors and publication needs successful required validation ancestry within the same workflow. A different legitimate gate design needs explicit contract review and an adapter extension, not automatic failure waiver. This source check is not a negative live workflow experiment.

Embedded schema includes live columns/defaults/primary keys only. It intentionally excludes full migrations, foreign/unique constraints and runtime RLS. Explicit foreign-tenant SQL filtering is tested with real fixture records, but this is not RLS/pooled-connection certification. Dimensions are unrestricted; credential auth, migration/recovery, audit content and races remain unexecuted. The real-PostgreSQL, deployed-browser and concurrency lanes are required before financial/security release acceptance.

## Runner integrity

Each lane has declared case IDs and limits. A custom reporter writes atomic case checkpoints. Missing/duplicate/unexpected IDs, zero collected tests, nonzero child exits, setup failures and skips cannot create green results. Independent lanes continue after failures; grouped failures retain every original assertion. Five harness tests protect missing-evidence, retry/flaky, resume-fingerprint and command-path failure modes.

Every run records product SHA, QA SHA plus content hash, dirty state, Node, fixture version, profile and seed. Dirty development runs are identifiable; clean committed CI results are preferred for reviewed evidence. Product checkout must be correct-origin, exact-SHA and clean. No automatic floating pin update.

Interrupted lanes may restart only their disposable database fixtures. Resume refuses code/fingerprint changes. Completed runs are immutable; retry/fix is a separate run, and a pass after an earlier failed attempt remains flaky. The CLI has no live browser/payment replay capability.

Local records/logs are under ignored `.local/batches/RUN-.../`. Export uses an explicit public field allowlist, never copies notes/stdout/errors/cookies/env. Review sanitized exports before committing. Git is durable memory; private evidence needs private backup if it must survive workstation loss. Git alone cannot retain ignored credentials or raw traces.

## Extending through B–F

For each new batch: specify approved rules and exact numerical examples, legal state transitions and deliberately invalid operations; add synthetic fixtures, real command adapter, independent model/oracle, manifest IDs and dependencies. Check every state change, not just final totals. Use constrained combination coverage for settings/type/roles and deeper targeted combinations for money/access/concurrency.

Implement layers separately and label evidence honestly. Table/model types, adapter versions, current implementation status and last run belong in the register. Reuse shared models and fixtures; do not clone product implementations into expected-value code. Each critical test must demonstrably catch a representative seeded defect in an isolated copy before it is accepted as a gate. That mutation-sensitivity phase is not yet implemented here.

Roadmap: B services/digital lifecycle; C purchase/stock/returns; D rental/deposits/availability; E mixed/settings; F imports/upgrade/concurrency/recovery. Product development can continue while independent lanes run, but a failed shared invariant blocks affected release scope. Owner chooses launch scope and unresolved accounting/rental policies; unavailable mandatory evidence remains blocked, not a bypass.

## Change selection and CI

Batch A remains mandatory for each candidate. Changes to posting/permissions/DB/settings/migrations expand affected scope. Compare against the last **verified** baseline; none is established yet, so a broader baseline is still needed. Graph edges assist impact review but cannot prove absence of dependencies. Inspect actual diff and author's CHG record.

QA repository validation checks metadata/runner/retained units/discovery. Candidate Batch A is a separate workflow whose product failures are genuinely red. Neither workflow is wired to the product image promotion yet; the coding agent must implement same-SHA trusted check wiring described in BUG-0008. Do not call a green harness workflow product approval.

Future real-runtime parallelism needs separate tenant/database fixtures per worker, roles and auth contexts, bounded load and collision-free names. Browser-context isolation alone does not isolate DB data. Never stress shared staging while developing a concurrency harness.
