> Implementation update 2026-10-11: public repository now exists; initial extraction and unit/discovery validation are recorded in STATUS.md. Remaining release/acceptance phases are planned. The owner selected public visibility; private references below concern evidence, not repository visibility.

# BookOne QA programme

Status: proposed, grounded in source review on 2026-10-11. Execution has not started.

## 1. Outcomes

Protect live customers against incorrect money, stock, permissions, historical records, and unrecoverable changes. Preserve reliable knowledge across people, AI agents, sessions, and application releases. Make uncertainty visible rather than displaying an unjustified green result.

The product owner decides intended behaviour; an accounting reviewer approves financial examples and applicable tax expectations; engineers implement; QA independently checks outcomes; a release owner accepts the evidence and residual non-critical risks. One person can initially fill several roles, but authoring a change must not automatically approve its altered expectations.

## 2. Reuse what is already built

BookOne already has `apps/e2e-runner`, Vitest accounting and statement-import tests, `docs/E2E_SCENARIO_CATALOG.md`, generated coverage, a backlog, governance, and health-check functionality. The owner wants these QA assets maintained in a separate public GitHub project. Move their useful content to `bookone-qa`, preserving history, fixtures, and existing `S-NNNN` IDs. Add rule IDs (`BR-*`), profile IDs (`BP-*`), bugs (`BUG-*`), and runs (`RUN-*`) around them. Avoid two permanent catalogs or counting duplicate IDs twice.

The external QA repository checks out an exact BookOne SHA and pins its own SHA. Browser/API tests use the matching candidate environment; unit/integration tests import the checked-out product source through explicit adapters. Keep the minimal CI/release connection in BookOne. Follow docs/TEST_REPOSITORY_MIGRATION.md before deleting old tests, runner routes, Docker wiring, or scripts. Product health/readiness logic must be classified separately from test-only utilities.

The existing `load`, `mutate`, and `balance` labels are useful assertion-depth categories. Record separately whether a scenario has security denial, failure/recovery, concurrency, and upgrade checks. Labels describe implemented assertions; a release result describes whether those assertions actually ran on that candidate.

The graph is a code-discovery and impact tool, not a test-result database. Check its repository path, revision, and relevant content freshness; use the public checkout when the graph is incomplete or mismatched.

## 3. Persistent records and traceability

Maintain this chain:

`business rule → capability/profile → scenario ID → executable assertion → run/build → evidence → bug/fix/retest`

For each capability record: owner, intended behaviour, supporting specification, implementation state, criticality, relevant files/symbols, scenario IDs, assertion depth, and last verified build. Mark documentation as `confirmed`, `observed`, `proposed`, `contradictory`, or `unknown`; retain source and review date. Existing documents mix design history and shipped claims and need this treatment.

Store compact current indexes in the QA project; retain immutable dated run manifests and evidence separately. STATUS.md links to them instead of copying entire logs. Checkpoint after each small test batch and before session end. Interrupted runs remain incomplete, with record IDs and cleanup state saved so the next agent does not blindly repeat a payment.

Use Git for text history plus a separate private backup. Store large sanitized artifacts in private versioned storage with checksums and access controls. A disk folder alone is not a backup. Credentials, session cookies, full production exports, and database connection strings never enter Git.

## 4. Coverage design

Start with the [core rules](docs/CORE_RULES.md), then map each supported workflow through all states and side effects. A balanced journal alone cannot prove correct accounts, amounts, dates, tax treatment, tenant, or stock.

Use layers:

| Layer | Purpose |
|---|---|
| Unit/property tests | Money calculations, rounding, allocation, availability, date boundaries, posting builders |
| Database integration | Atomic mutations, constraints, runtime-role RLS, period locks, retries, concurrency |
| API/server-action integration | Authorization, validation, idempotency, unsupported transitions, sensitive endpoints |
| Browser E2E | User journeys, saved state after reload, print/export, role-specific UX |
| Cross-module reconciliation | Document/subledger/GL/stock agreement with independently calculated expectations |
| Upgrade/recovery | Old records and queued work survive migrations, deployments, and restores |
| Non-functional | Representative data volume, latency, accessibility, browser/device checks |

Mocks help small tests; money, tenant isolation, and migration acceptance require real database/integration evidence. Browser assertions should validate visible outcomes, backed by controlled read-only queries where necessary. Test code must not call the same posting function to calculate its expected result.

Use synthetic fixture companies and isolated users. Make tests independent: explicit setup, exact record IDs, deterministic random seed and business clock, immutable expected data, cleanup ledger, and no dependence on whichever row happens to appear first. Parallel execution requires separate fixtures and collision-free identifiers; do not parallelize shared tenant mutations until isolation is proven.

## 5. Phase plan and exit criteria

| Phase | Work | Exit evidence |
|---|---|---|
| 0 — Establish identity and truth | Establish public QA repository; inventory and migrate tests without loss; confirm environment mapping; expose deployed SHA/image/schema fingerprint; audit assertion depth and false-success paths | Pinned cross-repository run; asset migration inventory; reproducible manifest; unknown coverage shown explicitly; deliberately failing checks make CI/release gate fail |
| 1 — Approve core rules | Review posting paths, product types, document states, permissions, settings; approve numerical examples; classify old docs | Signed-off P0 rule set, scenario mappings, two-tenant fixtures, documented open decisions |
| 2 — Build critical regression | Strengthen existing financial/security assertions; add physical, service/digital, rental, and mixed journeys; retries/concurrency/voids | Actual persisted amounts, stock, permissions, and audit history verified on a named candidate |
| 3 — Enforce change awareness | Change records, diff/graph impact map, required CI checks, candidate deployment gate, retained evidence | Demonstrate a deliberately failing PR cannot be promoted; test/config changes trigger fresh evidence |
| 4 — Prove upgrade and recovery | Prior-version fixture database, migration rehearsal, historical-data comparison, backup/restore drill | Restored documents, ledgers, stock, attachments, and access verified; measured recovery times |
| 5 — Expand and maintain | Settings combinations, imports, POS, entities/tiers, roles, performance, resilience, accessibility | Risk-based release matrix with no unsupported coverage claims and tracked residual gaps |

Do not set calendar estimates before measuring fixture setup and existing suite reliability. The repository documents multi-hour suites; first measure useful assertion coverage and runtime, then split suites without weakening assertions.

## 6. Test frequency and release scope

- Every code PR: reproducible install/build/typecheck/lint, relevant unit/integration tests, mandatory core regression, impact-selected E2E, and test-change review.
- Every staging candidate: fresh P0 money/data/access suite plus changed and adjacent workflows, using the exact candidate fingerprint.
- Nightly when scheduled infrastructure exists: broader business/profile/role/settings matrix; rotating combinations supplement core checks.
- Before every production promotion: candidate P0 plus full supported business-profile acceptance and required risk-specific gates. Migration/storage/auth changes add their dedicated suites. Interrupted, skipped, or flaky required tests block.
- Periodically and after backup/storage changes: isolated restore drills and representative volume/performance tests.
- After production deployment: non-mutating health/build/schema checks and operational monitoring. Synthetic writes require a separately designated synthetic tenant and scope.

These are proposed triggers; no scheduler was configured in this planning session. A new configuration, feature flag, dependency lockfile, schema, or deployment artifact can invalidate evidence even without product-code edits.

## 7. Maintenance rules

At each release, retire stale expectations only through an explicit product decision, keep old-version fixtures, and retest fixed defects. At each new feature, add coverage and impact mappings before accepting it as release-ready. Do not let “added to backlog” satisfy a new P0 requirement.

Review weekly: blocked and flaky tests, escaped defects, unresolved P0/P1 bugs, stale specifications, untested capability combinations, and recovery evidence. Improve the test at the point a defect escaped. Use mutation/fault-injection checks on critical assertions to establish that they detect wrong balances, duplicate postings, and unauthorized access; run them only in isolated environments.

Track: current-build P0 pass/required count; assertion-depth coverage; skipped/blocked/flaky counts; time since recovery drill; latest release fingerprint; escaped regressions; mean triage/fix/retest time. Keep route/ID coverage as a separate metric. Do not present one percentage as overall product safety.

## 8. Decisions required before execution

1. Permanent public QA repository/location and evidence retention/access owner.
2. Owner-provided production promotion mechanism and release contract; deployed-version identification and staging database/storage identity. Production access is neither available nor required for initial staging work.
3. First business-profile priority; default proposal is mixed rental/products/services because it crosses the most systems.
4. Test users/roles and dedicated fixture tenants; no passwords in chat or documents.
5. Approved accounting/tax rules, rounding/costing/period policies, and who reviews them.
6. Backup responsibility, acceptable data-loss window (RPO), and acceptable recovery time (RTO).

The owner authorizes changes to all test data at the stated staging URL. Preserve that authorization across sessions; do not ask again for routine staging tests. Verify the target before execution and coordinate resets with active runs. Infrastructure-level backup restoration, changes to other systems, and production promotion require their own applicable scope.
