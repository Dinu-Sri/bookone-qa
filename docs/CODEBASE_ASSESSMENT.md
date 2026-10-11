# Initial source assessment

Reviewed 2026-10-11 at commit `d35ed9209852af3fbcfe140176f2f8e74cae15f7` on `master`. This is a focused planning review, not an exhaustive audit or live verification. Links below are pinned to that revision.

## Existing foundation

- Next.js/TypeScript application; PostgreSQL/Drizzle persistence; shared accounting, authentication, and statement-import packages.
- Browser suites in `apps/e2e-runner`, including sales, purchases, POS, reports, rental, and team access.
- Accounting unit tests assert numerical outputs and posting accounts; preserve these when extracting tests.
- Existing E2E governance distinguishes `load`, `mutate`, and `balance` depth. Scenario IDs, backlog items, fixture builders, report formats, and useful tests should be migrated rather than discarded.
- The architecture graph identifies shared commercial-document, ledger, authentication, and database helpers with many callers. These are natural triggers for broad regression selection.

## Confirmed source-level findings

| ID | Evidence | Implication and planned action |
|---|---|---|
| QA-001 | [Coverage report](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/docs/E2E_COVERAGE.md) lists 747 IDs, 100% ID presence, and explicitly disclaims deep assertion coverage | Report catalog mapping separately from executed business assertions; classify each P0 scenario |
| QA-002 | [Integrity tests](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/tests/11-integrity.spec.ts): S-0594 checks optional debit/credit element visibility, S-0595 checks journal visibility, S-0596/97 open aging/doc pages, S-0598 opens stock pages | These named invariants are not numerically proved by those tests. Replace with deterministic data and exact reconciliation assertions |
| QA-003 | [Security tests](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/tests/10-edges-security.spec.ts) use a fixed UUID without establishing a real foreign record; S-0463 opens an active tenant dashboard rather than a suspended fixture | Create tenant A/B fixtures and suspended memberships; assert denial, no disclosure, and no mutation. These source gaps are not proof of a live vulnerability |
| QA-004 | [CI workflow](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/.github/workflows/production-check.yml) uses `|| echo` and `continue-on-error` for lint, typecheck, build, and tests | Those failures do not reliably fail this job. Establish required non-permissive checks and demonstrate failure propagation |
| QA-005 | [Scenario executor](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/src/runner/execute.ts) has generic shell fallbacks, integrity page checks, and swallowed errors in a generic journey | Review selected test behaviour, not just catalog text; unsupported execution must be blocked/not-run, never a shell-based pass |
| QA-006 | [Sales suite](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/tests/06-sales-journey.spec.ts) accepts either `converted` or `no_button` for a conversion scenario; setup catches some failures | Required controls/actions should fail or block if unavailable; setup must establish exact preconditions |
| QA-007 | [Rental suite](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/tests/28-rental.spec.ts) primarily checks pages/controls; [backlog](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/src/catalog/backlog.json) explicitly defers money/stock depth | Preserve smoke checks but add full booking, deposit, dispatch, return, wash, and ledger acceptance |
| QA-008 | [Startup script](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/docker/entrypoint.sh) continues after unsuccessful schema-push detection and SQL initialization failure; [DB package](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/packages/db/package.json) maps `db:migrate` to `drizzle-kit push` | Add migration completion/schema-compatibility gate and upgrade rehearsal. Do not interpret app startup as migration success |
| QA-009 | [Agent instructions](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/AGENTS.md) call the current URL production and describe older auth details; newer docs describe Better Auth and staging compose separation | Resolve environment and implementation contradictions in a versioned fact register. Owner's staging clarification governs this session |
| QA-010 | [Level metadata](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/apps/e2e-runner/src/catalog/level.json) retains a 698-scenario label but 747 count; [governance](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/docs/E2E_GOVERNANCE.md) permits deferred coverage | Validate generated metadata; keep maturity independent of release evidence; reject untested new P0 behaviour |
| QA-011 | [Bank fixture tests](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/packages/statement-import/test/bank-fixtures.test.ts) reference developer-local files and conditionally run if present | Replace with portable synthetic fixtures; required imports must not silently disappear on another runner |

## High-risk product areas to investigate, not confirmed defects

1. **Two posting paths:** the historical [accounting audit](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/docs/ACCOUNTING_INTEGRATION_AUDIT.md) distinguishes Simple Entry from commercial documents. Recheck their intended overlap and reconciliation; do not assume every old audit issue remains present.
2. **Mixed line types:** current [sales posting builder](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/packages/accounting/src/engine/document-posting.ts) treats physical COGS separately and allocates discounted revenue by account. Test combinations, rounding, returns, and account mapping independently.
3. **Tenant context:** the shared [DB helper](https://github.com/Dinu-Sri/BookOne/blob/d35ed9209852af3fbcfe140176f2f8e74cae15f7/packages/db/src/helpers.ts) wraps context setup and cleanup. Verify actual runtime-role RLS and pooled/concurrent request isolation; the helper's presence does not prove isolation.
4. **External diagnostic surfaces:** E2E documentation describes a public runner with target URL inputs, and the newest commit adds ops logging. Inspect actual deployment access, sensitive output, target validation, and credential handling before moving/removing these surfaces. Do not infer live exposure from docs alone.
5. **Migration history:** test upgrades from a real prior-release schema, not only empty databases. Verify migration ordering by actual filenames/content, completed-migration tracking, replay, and failures.

## Example change-impact exercise from the current commit

The latest commit changes pending buttons, commercial documents, payments, idempotency, ops logging, middleware, and a database migration. A useful retest scope therefore includes:

- Repeated click, concurrent submission, retry after timeout, and browser refresh: exactly one intended document/payment/journal/stock effect.
- Same request across different tenants/users: no idempotency collision or result leakage; changed payload with reused key follows a defined policy.
- Form errors and pending states: controls recover, errors remain visible, and resubmission works correctly.
- Payments and invoice status: partial/full allocations, AR totals, historical journals, and print totals remain correct.
- Ops logs and diagnostics: access control, redaction, tenant separation, retention, and failure behaviour.
- Migration completion and existing-data preservation; middleware still serves permitted routes and static assets.

This illustrates why a change title alone is insufficient. No tests from this scope were executed in the planning session.
