# BookOne QA

Public independent QA repository for [BookOne ERP](https://github.com/Dinu-Sri/BookOne), owned by Dinu-Sri. Tests, business rules, change awareness, sanitized run history, bugs and session memory live here. Credentials and raw evidence do not.

## Current state

- Start new sessions with [SESSION.md](SESSION.md) and `pnpm session:start`. The accepted batch strategy, current work and next actions live in [memory/programme.json](memory/programme.json), [batch guide](docs/BATCH_TESTING.md) and [roadmap](batches/roadmap.json).
- Batch A now implements15 independent source/embedded SQL/render/workflow checks, including generated sale/reversal models and the five known bug groups. Run `pnpm batch:run --seed 261013 --profile quick`; a nonzero exit is expected on the current defective product candidate. It is a source regression signal, not release certification.
- Current implementation pin is2b92cf40a3d258dcfc29655759d37b0c32aaebbf. The older snapshot bullets below are historical baseline facts; they do not certify this candidate. See STATUS.md and current run records.

- Product source pinned in product-ref.json to 65f84c151f7332efa196ed837ad179ac4818178b. The actual staging image/build still needs independent identification.
- 747 inherited scenario definitions; 30 source reviews complete and 717 pending. Catalog mapping is not business acceptance.
- 30 browser spec files imported; full discovery finds 770 tests in 29 nonempty files. The inherited bucket preset omitted the team suite; full discovery now includes it.
- 10 external unit-test files: **94 passed, 4 skipped** locally (includes independent critical posting cases). Skips require optional local bank fixtures; real bank files were not copied.
- 2 target-policy checks passed. The old manual staging run is historical; no browser/business acceptance run has occurred on the fresh rebuilt staging.
- The inbuilt E2E product cleanup is merged. S-0031–S-0033/S-0578 now assert denial; live verification after deployment is still pending. `pnpm agent:browse` lives here. A later product cleanup also retired Control Room health/reset/audit/demo tools, so inherited expectations for those surfaces need review before broad execution.

## Quick start

Use Node 22 (Node 20 also validated locally) and pnpm 9.0.0.

~~~sh
pnpm install --frozen-lockfile
pnpm check
pnpm product:prepare
pnpm test:unit
pnpm test:e2e:list
~~~

product:prepare clones the official product into ignored work/product at the exact pinned SHA; unit tests import that source, not copied implementation. The SHA/remote/clean tracked source are checked before unit execution.

To run browser tests, install Chromium using pnpm exec playwright install chromium, supply E2E_BASE_URL, E2E_EMAIL and E2E_PASSWORD through a local environment/approved secret store, then use pnpm test:e2e smoke (or p0/core/full/a bucket). Only the owner-authorized staging origin and explicit local origins are accepted by the checked-in target policy. Do not assume a new deployment matches product-ref.json; record its actual build before accepting results. No credentials are bundled.

The migrated E2E suite contains known weak/conditional assertions. S-0031–S-0033 and S-0578 now assert the inbuilt ERP runner is absent. It is a starting point for strengthening coverage, not a release certification. Some full-suite tests create users, post transactions and change settings; run them with suitable synthetic fixtures. Staging data changes are owner-authorized.

Coding-agent click-through (after login from env or gitignored `.local/debug-accounts.json`):

~~~sh
pnpm agent:browse --path /dashboard
pnpm agent:browse --script apps/e2e-runner/scripts/agent-scenarios/login-smoke.json
~~~

## Memory and rules

- [AGENTS.md](AGENTS.md) and [STATUS.md](STATUS.md): mandatory session startup/handover.
- [PLAN.md](PLAN.md): programme, phases and ownership.
- [Core rules](docs/CORE_RULES.md), [business profiles](docs/BUSINESS_SCENARIOS.md), [change/release workflow](docs/CHANGE_AND_RELEASE.md), [security/recovery](docs/SECURITY_AND_RECOVERY.md).
- [Source assessment](docs/CODEBASE_ASSESSMENT.md), [migration](docs/TEST_REPOSITORY_MIGRATION.md), [public-data policy](docs/PUBLIC_DATA_POLICY.md).
- [Migration provenance](migration/source-inventory.json), [assertion review register](catalog/assertion-review.json), [business profile register](profiles/business-profiles.json).
- [Change](templates/CHANGE_RECORD.md), [run](templates/RUN_RECORD.md), [bug](templates/BUG_REPORT.md) templates; [bootstrap validation](runs/RUN-20261011-bootstrap.md).

The apps/e2e-runner path is retained inside this QA repository for import compatibility. It is not an ERP-hosted service: the legacy HTTP runner/server/public console are not activated here. docs/legacy contains historical guidance only; current root instructions take precedence.

## CI and contribution

QA repository validation checks metadata, the target guard, runner integrity, pinned-source units and E2E discovery. Separate Candidate Batch A contracts reports product failures as red and retains only sanitized outcome artifacts. It has no staging credentials and runs no staging browser tests. Neither workflow is wired to product promotion; green repository validation cannot approve a product release. Add new scenarios and review records together; preserve existing IDs and historical results. Update STATUS and memory/programme.json after each session.

This repository is public by explicit owner instruction. Review every staged file for sensitive information. See PUBLIC_DATA_POLICY before sharing bugs/artifacts. Package.json private=true prevents npm publishing; GitHub visibility is public. No new open-source license grant is implied; imported code retains BookOne's existing rights.

