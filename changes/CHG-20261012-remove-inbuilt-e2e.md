# Change record — CHG-20261012-remove-inbuilt-e2e

Status: ready-for-QA (Wave 1a complete in this repository). Denial tests are written for the post-cleanup product; they are expected to fail against a host that still serves `/e2e` until BookOne Wave 1b deploys. Not staging acceptance. Not a production gate.

## Identity

- Product repository, base SHA, candidate SHA and PR: [Dinu-Sri/BookOne](https://github.com/Dinu-Sri/BookOne) pin `d35ed9209852af3fbcfe140176f2f8e74cae15f7` (`product-ref.json`). Companion product branch `chore/remove-inbuilt-e2e` at Wave 0 `f048c9ed2c1a411b50111cc83fb60bcca8224073` on top of docs-only `bdff296bd3f0dae6470b15be74cfee8b71567501`. No product runtime delete in this wave.
- QA repository, QA SHA and companion PR: branch `qa/chg-20261012-e2e-denial` from `b9e13bcc1a6222aedd0356c19336e141cd08c9b0`. Final SHA belongs in PR metadata after commit.
- Author/agent, date, product owner and reviewer: Grok coding agent, 2026-10-12, requested by repository owner. Independent review not yet recorded.
- Staging deployment/build/schema/config identity: unchanged and still unverified. This wave does not execute browser journeys against staging.

## Intended behaviour

- User/business problem: inherited QA tests required the inbuilt ERP `/e2e` console and `POST /api/e2e/runs`. Product cleanup (Wave 1b) cannot land until those tests assert removal instead.
- Before, with a concrete example: unauthenticated GET `/e2e` must show “E2E Test Console” and a Start-run button. Catalog S-0031/S-0032/S-0033 and nav public-smoke treated `/e2e` as a live public surface. `S-e2e console public at /e2e` was an extra dedicated test.
- After, with a concrete example: GET `/e2e` must not show runner UI (login redirect or 404 is success). POST `/api/e2e/runs` must not return 202 or a run JSON record. GET report/log/download/failures/buckets must not return artifacts or JSON runner payloads. S-0578 title remains `Route smoke /e2e` so the route-smoke executor still extracts `/e2e`, and the handler now calls `expectE2ePageGone`.
- Existing behaviours that must remain true: docs public pages, login, catalog IDs S-0001–S-0760, historical run records, product Health Check, company reset, seeds, migrations, MinIO, `/ops/logs`, `/api/ops`, QA unit tests against the pinned product source. HTTP runner (`server.ts` / public console) stays unpublished.
- Rule IDs, profile IDs, existing/new S-NNNN IDs: revised S-0031, S-0032, S-0033, S-0578 (same IDs). S-0462 still opens `/e2e` and now also forbids console UI strings. No new IDs. Last catalog ID remains S-0760 (747 scenarios).
- Requirements/decisions and approval evidence for changed expectations: owner-approved two-wave plan in BookOne `docs/REMOVE_INBUILT_E2E.md` and `docs/changes/CHG-20261012-remove-inbuilt-e2e.md`. Old public-console expectation is retired; historical results stay bound to their original fingerprints.

## Actual changes and impact

- Files/symbols/routes and shared dependencies changed:
  - `apps/e2e-runner/src/helpers/assert.ts` — `expectE2ePageGone`, `expectE2eApiGone` (maxRedirects 0; fail 202 / run JSON / runner UI / JSON 200; allow HTML login/404 and 301/302/303/307/308/401/403/404/405/410/501).
  - `apps/e2e-runner/tests/02-public.spec.ts` — dedicated S-0031/S-0032/S-0033 denial tests; catalog loop skips those IDs.
  - `apps/e2e-runner/src/runner/execute.ts` — public and route-smoke handlers assert gone.
  - `apps/e2e-runner/src/helpers/nav.ts` — `/e2e` removed from `PUBLIC_SMOKE_ROUTES`.
  - `apps/e2e-runner/tests/10-edges-security.spec.ts` S-0462 — no console UI.
  - Catalog MD/JSON/coverage regenerated (`pnpm catalog:sync`). Section heading “2. Public surfaces (docs & retired inbuilt E2E)”.
  - Comments/entry points: buckets, level.json `pnpm test:e2e`, env, staging, smoke, route-smoke, report-summary.
  - Ported `apps/e2e-runner/scripts/agent-browse.mjs` plus `agent-scenarios/login-smoke.json` and `rental-ops.json`; `package.json` script `agent:browse`.
- Schema/data migrations and historical compatibility: none.
- Dependencies, flags, settings, external services and infrastructure: no new runtime dependencies. Playwright already present. HTTP runner remains unpublished. Product `E2E_*` host/env and `bookone-staging-e2e` are Wave 1b / operator follow-up.
- Security/permissions/tenant/file implications: tests now treat unauthenticated Playwright launch and artifact download as failures. No product access-control change in this repository.
- Financial/stock/rental implications: none.
- Product documentation updates and private QA contract revision: README, AGENTS.md item 27, STATUS.md, this change record. BookOne CHG companion updated on `chore/remove-inbuilt-e2e`.
- Independent diff/graph review; undeclared changes or unknown impact: content change is test/catalog/docs plus the agent-browse port. `scenarios.json` / `coverage.generated.json` / `E2E_COVERAGE.md` regenerated; ID set unchanged (747, last S-0760). Discovery count 771 → 770 because the extra non-ID test `S-e2e console public at /e2e` was replaced by the three dedicated S-0031–S-0033 tests (catalog loop no longer also emits those three). Graph review of BookOne product code was not required for this QA-only wave.

## Validation and handover

- Required core suite and impact-selected scenarios: metadata validate, target-policy guard, pinned-source unit, full browser discovery. Denial journeys not executed against live staging (would fail until Wave 1b; that failure is the intended chicken-egg, not a product defect in this wave).
- New assertions and independently calculated expectations: `/e2e` has no Start-run control and no “E2E Test Console” copy. POST `/api/e2e/runs` with probe credentials must not enqueue a run. Artifact GETs must not return run JSON. 400 from a still-mounted validator is a failure of the gone-assertion (endpoint still exists).
- Commands/runner version, run IDs, evidence links and outcomes (local, 2026-10-12, Node v20.19.0, pnpm 9.0.0, Playwright 1.51.1, `pnpm --ignore-workspace` because this clone sits under BookOne’s workspace):
  - `pnpm catalog:sync` — exported 747 scenarios; coverage 747/747 (100% ID presence); Missing P0: 0.
  - `pnpm check` (`validate` + `test:guard`) — metadata-valid, 747 scenarios, 30 reviewed / 717 pending; 2 target-policy tests passed.
  - `pnpm test:unit` — product pin `d35ed92`; **94 passed, 4 skipped**, 10 files. Skips = optional local bank fixtures (inherited).
  - `pnpm test:e2e:list` suite `full` — **770 tests in 29 files**. S-0031/S-0032/S-0033/S-0578 present. Not executed.
- Tests not run, skipped, flaky or blocked with reasons: no browser execution; no staging denial run; 4 skipped bank-fixture unit tests; no `agent:browse` live session in this wave (files ported only).
- Bugs, limitations and unresolved policy questions: denial tests will fail on current staging until Wave 1b removes the product routes. QA is still advisory (no required merge/deploy gate). Staging deployed SHA/image/schema still unverified.
- Migration/recovery procedure and verified compatibility: git revert this branch. No schema. HTTP runner not republished.
- Fixture records created, cleanup and remaining work: none created. Remaining: BookOne Wave 1b delete of `apps/e2e-runner/`, `/e2e`, `/api/e2e/**`, e2e Docker; operator stop of `bookone-staging-e2e` / `bookone-e2e.clossyan.com`; then execute denial tests against the cleaned candidate.
- Reviewer decision, scope, date and expiry of any non-critical exception: none. Do not merge BookOne cleanup to `master` until this companion is on bookone-qa.

Do not include credentials. A developer's “works” statement is not a substitute for run evidence.
