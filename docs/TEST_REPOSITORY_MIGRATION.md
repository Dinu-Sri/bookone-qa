> Implementation update 2026-10-11: public repository now exists; initial extraction and unit/discovery validation are recorded in STATUS.md. Remaining release/acceptance phases are planned. The owner selected public visibility; private references below concern evidence, not repository visibility.

# Separate public QA repository

Owner direction recorded 2026-10-11: maintain all tests, testing knowledge, history, bugs, and progress in a separate GitHub QA project; clean testing assets out of the product repository after migration. Repository: `bookone-qa`, public and owned by the user/organization, not by an AI account. The public QA repository has now been created; see STATUS.md for actual extraction state.

## Target layout

```text
bookone-qa/
  AGENTS.md
  STATUS.md
  PLAN.md
  docs/                  Business rules, architecture notes, decisions, runbooks
  catalog/               Canonical S-NNNN scenarios, assertion depth, impact maps
  profiles/              Company/role/settings fixture definitions
  fixtures/              Synthetic imports, seed data, historical snapshots
  tests/
    unit/                Accounting and parser calculations
    integration/         DB/actions/auth/atomicity/concurrency
    e2e/                 Browser journeys
    migration/           Upgrade, historical preservation, recovery
    nonfunctional/       Accessibility, volume and performance
  adapters/              Explicit imports/interfaces to pinned BookOne source
  runner/                Reusable orchestration and reports; optional private UI
  changes/               Development change records and impact assessments
  bugs/                  Reproductions, evidence indexes, retests
  runs/                  Immutable sanitized manifests/results
  releases/              Candidate decisions and product/QA version pairs
  templates/
  .github/workflows/     QA scheduling, trusted triggers, result publication
  work/                  Ignored disposable product checkouts/builds
```

Large or sensitive evidence lives in private artifact storage, with checksums/links in `runs/`. A private repository still must not contain secrets or raw customer data. Version the small textual source of truth; do not commit dependency directories or generated browser videos.

## Product repository responsibilities after cleanup

Keep application source, schemas/migrations, product build/deployment configuration, product/user documentation, and a small QA integration contract. Retain non-sensitive build identity and testability hooks such as stable UI selectors where justified. Keep functional health/readiness endpoints as product operations.

BookOne's AGENTS.md should point development agents to the QA change contract and required check, explaining how to submit a feature/change record and where to get relevant acceptance requirements. Agents without private QA access can provide the change record through the trusted interface; they cannot self-certify hidden test results.

Remove duplicated QA catalogs and progress docs only after their canonical private locations exist. A minimal link/contract in the product repository is necessary so future agents know the QA process exists. Never embed private credentials in that reference.

## Migration steps

1. **Inventory and archive.** Record old paths, types, source commit, counts, hashes, licenses/provenance, dependencies and known assertion gaps. Preserve useful existing Git history or a verified archive with commit attribution. Do not copy developer-local bank statements or secrets.
2. **Copy before deletion.** Move E2E tests/helpers/catalog/backlog/governance, accounting/parser unit tests, synthetic fixtures, and useful runner/report tooling into a migration branch in the public QA project. Preserve `S-NNNN` and backlog IDs. Old results retain their original product/test versions and known limitations.
3. **Rebuild dependencies explicitly.** Pin the QA toolchain/lockfile. Checkout BookOne at an exact SHA under ignored `work/`; install its dependencies reproducibly. Current accounting tests use `../src/...` imports, so provide explicit aliases/adapters to that checkout and verify workspace dependency resolution. Test changes must not modify the product checkout silently.
4. **Separate test layers.** Browser/API tests target the matching staged candidate; unit/integration tests exercise the pinned product source. DB tests use isolated test databases and the actual runtime privilege model. Do not copy accounting implementation into QA as its own test oracle.
5. **Make fixtures portable.** Replace developer-machine paths and conditional local-file tests with synthetic committed fixtures. Record skipped/unavailable legacy coverage honestly.
6. **Prove preservation.** Compare test discovery and scenario IDs before/after extraction. Run both harnesses against isolated equivalent fixtures where practical. Report existing failures as failures; migration completion does not require pretending they pass. Demonstrate that intentionally wrong balances, authorization, and duplicate posting cause failures.
7. **Connect the gate.** Trusted product event supplies candidate SHA and requested QA revision; private runner publishes a sanitized status for the exact candidate. Verify failure, timeout, cancellation, missing results, and unavailable QA all block the required gate. Use a final aggregate acceptance job rather than trusting skipped checks.
8. **Clean product in a separate PR.** Remove test-only directories, test-only routes/consoles, scripts/dependencies, generated catalogs, and Docker/proxy wiring that are now owned by QA. Update workspace files, lockfile, docs, agent instructions and CI. Classify every item before removing it; a customer-visible ERP Health Check or readiness function is not automatically disposable E2E tooling.
9. **Validate cleanup candidate.** Rebuild product, test startup/static assets/routing, run migrated QA against its exact SHA, verify no broken imports or deployment references, and confirm removed runner endpoints do not expose artifacts/credentials. Then retire the old harness and keep a rollback reference.

Do not delete all tests first and rebuild them from memory. Existing weak tests still contain scenario knowledge, fixtures, IDs, and useful assertions that must be evaluated individually.

## Independent acceptance and access

Development agents may propose QA changes, but changes to core expected money, tenant isolation, or destructive recovery checks need explicit review by the rule owner. A product implementation should not be able to redefine acceptance automatically by editing its own expected output.

Require the QA repository's own CI: manifest/schema validation, unique IDs, no broken rule mappings, test discovery, portable fixtures, secret scanning, changed-expectation review, and critical assertion checks. Reproducible test versions allow an old release to be rerun after the suite evolves.

Private test code does not itself enforce quality. The owner must configure product branch protections and production promotion to consume the gate. If bypass remains possible, record that limitation and audit every bypass.
