# BUG-0017 — Reserved tenant client cannot construct Drizzle

P1 runtime regression on product v2.2.3 / 0d902d55f56df51c6661251b99610de08f68be38. PostgreSQL16.15, full current schema plus42 ordered SQL migrations, actual product database module and matching postgres3.4.9 / Drizzle0.33.0. No staging writes or production access.

[First unchanged18-case run](../runs/RUN-2026-10-13T12-09-33-691Z-runtime.json):3 pass/15 fail. [Focused20-case run](../runs/RUN-2026-10-13T12-28-33-405Z-runtime.json):3 pass/17 fail. RT-001/003 independent transaction/RLS positive controls and RT-008 FK/unique controls pass. RT-002/004/012/013 fail with allowlisted category `driver-options-parsers-missing`. The private message is the generic JavaScript TypeError reading `parsers` on undefined; raw messages/SQL/credentials remain private. No missing/unknown/setup cases; all42 migrations applied.

`packages/db/src/db.ts:drizzleOn` passes the value from `postgres.reserve()` to `drizzle(client,{schema})`. Installed postgres3.4.9 creates the reserved SQL function with query methods and `release`; it does not expose the pool's `options` or `begin`. Drizzle0.33.0 constructor accesses `client.options.parsers`. RT-012 independently exercises actual reservation and product Drizzle construction/query, without the tenant helper or permission loader, and reproduces the error. RT-013 adds real scoped transaction commit/rollback expectations; it currently stops at the same constructor failure, so rollback assertions have not executed.

RT-002/004 now throw before their callback visibility assertions; this differs from the older BUG-0014 missing-context result. Commercial and reversal cases also fail, including previous positive controls. Their financial assertions are not reached; do not count15 failures as15 unrelated bugs or assert the old double reversal still occurs. Permission loading now wraps its inner work in the same helper and catches errors as null; that is a source-supported likely explanation for action denial/navigation loss, not independent proof of every dependent failure.

Read-only staging observation after reload: v2.2.3 ·0d902d5, existing Owner session, only Documentation link after hydration; business links disappear. No fresh credential login or role-sensitive mutation in this run. Owner reports coding agent already repairing navigation. Do not claim deployed TypeError or a customer-data leak from the UI symptom; browser exposes generic server-component errors only.

Repair the connection-bound adapter with the actual pinned driver contract, including a supported transaction API, same-connection nested operations, rollback/cleanup and per-request isolation. Merely attaching options leaves `begin` compatibility unproven. Do not bind a reserved client's transaction method to the base pool, bypass RLS, or hard-code navigation/access to hide this failure.

Acceptance: unchanged helper and business positives, RT-012/013, permissions/Viewer denials, exact quote→invoice→receipts→credit reports, sequential and concurrent reversal invariants; then fresh Owner/Viewer login and navigation, non-owner actions, nested/interleaved tenants and cleanup after exceptions. Prior-release migration/duplicate-history recovery remains separate.

## v2.2.4 bounded retest — 2026-10-13

RT-012/013 plus nested/savepoint/overlapping/restored tenant controls pass using actual driver on343. Existing-session Owner navigation and read-only Dashboard restored. Bounded runtime regression fixed; fresh credential/non-owner business/HTTP and wider pool/recovery acceptance remain open. See [RUN-14](../runs/RUN-20261013-v2-2-4-retest-14.md). Earlier failures remain preserved.
