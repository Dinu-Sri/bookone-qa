# QA status — updated 2026-10-13

## v2.2.2 retest: payment fixes verified; date repair partial; credit report defect

[RUN-12](runs/RUN-20261013-v2-2-2-retest-12.md), product9c17f2b matches observed staging v2.2.2 ·9c17f2b.60 source cases58 pass/2 fail;18 PostgreSQL cases14 pass/4 fail. BUG-0010/11 fixed at tested source and persisted-role/owner-connection action depth, including AR/AP privilege separation, custom bank and assigned-location controls. Original F-004 passes; BUG-0012 still fails named-month input `30 Feb 2026`→2026-03-02. New BUG-0016: invoice600/credit100 reports income700 instead of500 despite correct ledger/subledger/cash250. Prior BUG-0013 receipt signer, BUG-0014 restricted tenant helper and BUG-0015 duplicate reversal remain active. No release approval.

Clean implementation5a6947d3: [validation](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38381586302) and [A](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38381586089) green; [B–F](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38381586090) and [PostgreSQL](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38381586178) preserve exact known failures. First credit fixture/expectation defect corrected from pre-existing B-003 Sales Returns4100 contract; first attempt retained, not product blame. Current [coding-agent follow-up](handoffs/HANDOFF-20261013-v2-2-2-followup.md). Product CI quality/publisher jobs green; staged Dashboard read only, no business writes/reset. Wider credential/HTTP/browser/storage/upgrade/recovery and physical/rental workflows stay open in canonical memory. Historical results below remain preserved.

## PostgreSQL workflows, company/role/module matrix and receipt coverage

Final reviewed implementationecf4be58 passed [validation](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38374294708) and [A](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38374294677); [B–F](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38374294659) and [PostgreSQL](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38374294844) reproduce the exact known failures, no infrastructure failures. Runtime new-run-only artifact11800492349;14 executed cases11/3. Earlier implementation evidence below remains immutable.

[RUN-11](runs/RUN-20261013-runtime-and-files-11.md): product993664b unchanged.54 source cases50 pass/4 fail;14 PostgreSQL cases11 pass/3 fail. Full current Drizzle schema plus all41 SQL files applied on fresh PostgreSQL16.15; FK/unique negative controls pass. Actual quote/order/draft→typed invoice→two receipts and persisted permission/module/entity/override cases pass at owner-connection action depth. No credential login/HTTP/browser/real-storage acceptance and no staging mutations or reset.

New [BUG-0013](bugs/BUG-0013-foreign-receipt-signing.md) forwards a known foreign receipt key to recorded signer; [BUG-0014](bugs/BUG-0014-tenant-context-lifetime.md) helper sees0 own rows under NOBYPASSRLS where3 are expected (explicit transaction positive control passes); [BUG-0015](bugs/BUG-0015-concurrent-double-reversal.md) concurrent actions create2 reversals/3 journals and net cash/income-123.45 instead of0. These are distinct tested findings; deployed exposure remains unverified. Previous BUG-0010/11/12 remain active. [Current coding-agent handoff](handoffs/HANDOFF-20261013-runtime-and-files.md).

[Configuration/file guide](docs/CONFIGURATION_AND_UPLOAD_COVERAGE.md), [42-row matrix](batches/configuration-matrix.json), [runtime manifest](batches/runtime.json) and agent/session rules preserve all265 factor pairs across3,200 combinations plus mandatory risk rows. Matrix integrity is not executed business coverage. Original83 lifecycle tasks retained; register now92 tasks with partial implemented layers and open acceptance.10 policy decisions recorded. Startup: `pnpm session:start`, `pnpm check`, `pnpm batch:coverage`; fresh isolated PostgreSQL only for `runtime:prepare/run`.

Clean QA implementation058a43e8: [validation](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38371660337) and [A](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38371660326) green; [B–F](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38371660317) and [PostgreSQL](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38371660345) retain product failures as red. QA PR9 maintenance is independent of product release approval. Next: coding-agent repairs/new candidate diff and deliberate pin/retest; extend intended non-owner request/action/login/storage boundaries, physical/rental persisted workflows and wider settings/scoped/revoked users. Historical sections below are preserved and superseded only within this tested scope.

## v2.2.1 quality-gate fix verified; three source findings remain

Current reviewed pin993664b; refreshed staging stamp v2.2.1 ·993664b stable through read-only checks. [RUN-10](runs/RUN-20261013-v2-2-1-retest-10.md): A15/0, B10/2, C8/0, D8/0, E3/0, F3/1 =47 pass/3 fail after QA Zod alignment to4.4.3. Retained units94 pass/4 optional skips; metadata/2 guards/6 harness pass. Original pre-alignment runs preserved. A-014 negative configuration controls strengthened without weakening requirements.

BUG-0008's quality→publisher configuration and successful product CI path are verified; actual failing-job/manual-dispatch experiment and mandatory external QA promotion remain outstanding. BUG-0010 allocation permission, BUG-0011 invalid tender, BUG-0012 impossible date still reproduce in isolation; deployed exposure/downstream corruption unverified. [Updated coding-agent handoff](handoffs/HANDOFF-20261013-v2-2-1-findings.md) is the current product-fix request.

No staging mutations/reset: prior two synthetic offsetting journals remain, net cash/income0. Docs/search navigation and product form loading checked; full changed write/print/upload/permission journeys unrun. No release acceptance. Next: coding agent fixes the three findings; QA builds isolated full-PostgreSQL B-101–103 and A runtime/RLS/race adapters. Local docker/psql/postgres tools unavailable; CI services are the proposed isolation route. Deeper83 lifecycle tasks/policy gaps remain as specified.

Clean QA commit0ae2ee5 passed [validation52](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38363206075) and [A7](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38363205945). [B–F matrix3](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38363205955) confirms the same47 pass/3 fail with sanitized artifacts retained. QA memory maintenance is not product release approval.

## B–F foundations and deep lifecycle backlog

[RUN-09](runs/RUN-20261013-deep-batches-09.md) implements35 new source/embedded-action cases across B–F, preserving A15. Latest completed local source runs: A14/1, B10/2, C8/0, D8/0, E3/0, F3/1 (46 pass/4 fail). B broad completed200 generated payment sequences; latest strengthened audit/link assertions were separately checked in B quick. First harness failures and corrections are retained, not product blame.

Three new isolated findings: BUG-0010 allocation-boundary permission, BUG-0011 invalid tender account acceptance, BUG-0012 impossible bank dates. These do not yet establish deployed exposure/import corruption. Existing BUG-0008 remains open. [New coding/QA handoff](handoffs/HANDOFF-20261013-deep-batches.md) gives next work.

[Deep programme](docs/DEEP_BATCH_PROGRAMME.md), [coverage register](batches/coverage.json) and memory/policies.json preserve83 specified **unimplemented** lifecycle tasks and eight pending policy decisions. `pnpm batch:coverage` distinguishes these from50 executable source cases. All acceptance remains open. Generalized runner and B–F CI preserve failure propagation/checkpoints;2 guard/6 harness/2 mutation-sensitivity assertions passed locally. No staging data changed. Next: B-101–103 full lifecycle adapters plus A runtime gaps, then C/D persisted workflows and E/F acceptance. Historical statements below that B–F are merely planned are superseded at source-foundation depth only.

Clean QA commit cbda523 passed [repository validation49](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38358818493). [A5](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38358818701) and [B–F matrix1](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38358818740) reproduced46 pass/4 fail with every sanitized artifact retained. Expected candidate failures remain red; QA programme maintenance is separate from product promotion.

## v2.2.0 retest after owner cleanup

Latest product pin6a48cee matches the visible staging stamp `v2.2.0 · 6a48cee`. [RUN-08](runs/RUN-20261013-v2-2-0-retest-08.md) preserves first quick13 pass/2 fail and expanded broad14 pass/1 fail. A-013 now correctly accepts unmasked required commands across split jobs; A-014 remains red.94 retained units passed/4 optional fixture skips; metadata/2 guards/5 harness assertions passed.

Live Owner cash sale123.45 posted Dr1000/Cr4000 and was reversed with opposite lines; both balanced journals retained, cash/income net0 in Reports and Dashboard. Fresh Viewer could read the existing sale with no Reverse control. Default October label corrected. Source/action fixes for BUG-0005/0006/0007/0009 pass tested scope; these bugs are awaiting adjacent/runtime acceptance, not universally closed.

BUG-0008 remains partial: same-SHA Tests succeeded and image published while the quality job failed at Lint and skipped Type check/Build. [Current coding-agent handoff](handoffs/HANDOFF-20261013-v2-2-0-next.md) details repair and failure-propagation acceptance. Preserve this finding; B–F being planned does not make their absence a new product defect.

Published QA commit e6d46cb passed [repository validation46](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38354952412). [Candidate Batch A3](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38354952276) independently reproduces14 pass/1 fail (A-014) from clean committed source and retains a sanitized summary artifact. This deliberate product failure is distinct from QA harness health.

Owner reports old records cleaned; October baseline observed zero. New prefix `QA-261013-V220` leaves two offsetting journals/transactions as intentional history. Do not reuse historical fixture IDs or repeat a reset. Image digest/schema/runtime-role/storage identity, real-server Viewer denial, RLS/dimensions/concurrency/audit/recovery and larger document journeys remain unverified. Next: quality gate repair plus Batch A runtime layers, then Batch B service/digital journeys; isolated Batch B development may proceed meanwhile. No release acceptance.

## Batch strategy implemented — 2026-10-13

Owner accepted automated risk-based batches and durable agent memory. SESSION.md, memory/programme.json, the ADR and docs/BATCH_TESTING.md are now the startup/extension protocol. Batch A has15 mapped executable source/embedded SQL/render/workflow checks and automatic private checkpoints, seed replay, immutable sanitized exports and fingerprint-checked interruption resume. B–F and real-runtime acceptance remain planned.

First full development run:7 passed/8 failed, zero skips/blocks; failures map to the five known BUG-0005–0009 groups. Generated cash-flow model shrank to a one-cent sale followed by reversal. Metadata,2 target guards and5 runner-integrity tests passed. Retained units on deliberately advanced pin2b92cf4:94 passed/4 optional fixture skips. These are independent scope statements; no release acceptance.

Clean implementation execution is preserved in [RUN-07](runs/RUN-20261013-batch-a-bootstrap-07.md) and its immutable JSON:15 checks in20.378seconds,7 pass/8 fail. GitHub QA validation43 succeeded and Candidate Batch A1 correctly failed with the same outcomes; sanitized summary artifact was retained. Product bugs remain unfixed. Startup index now points to this run; B–F and required real-runtime layers remain unimplemented.

Read [batch coding-agent handoff](handoffs/HANDOFF-20261013-batch-runner.md) before fixing candidate failures. Public CI keeps harness validation distinct from candidate contracts and only uploads sanitized summaries. A source-contract green would still not prove real-login/RLS/migration/dimension/concurrency/audit/browser/recovery requirements. Product promotion wiring and first-launch scope remain outstanding.

## Latest finance/authorization investigation — 2026-10-13

[RUN-06](runs/RUN-20261013-finance-investigation-06.md) on v2.1.0/2b92cf4 verified cash-sale mapping Dr1000/Cr4000, including neutral description. Three synthetic sales were reversed; six balanced journals retained, cash/revenue net0. Confirmed P1s: restricted-role financial reversal (BUG-0009), cash-flow reversal overcount (BUG-0006), customer unposted/archive balance display (BUG-0005), and release-check failure masking (BUG-0008 source review). Default report label mismatch is P2 BUG-0007. [Coding-agent handoff](handoffs/HANDOFF-20261013-finance-and-release.md) gives source pointers and acceptance cases. Original Viewer-create reports are withdrawn; exact security reproduction remains private. Larger invoice/payment/return journey was not run after these failures.

Unit pin65f84c1 is older than the observed candidate; current QA documentation CI is not evidence of candidate units/staging acceptance. Image/schema/storage/restore and cross-tenant/concurrency/audit cases remain unverified.

## Verified Viewer create-route retest — 2026-10-13

Signed out of the Owner session and signed in as the synthetic Viewer. Build footer: `v2.1.0 · 2b92cf4`. Role-loaded navigation labeled business areas “View only.” Direct `/parties/customers/new` and `/sales/invoices/new` routes each rendered explicit cannot-create messages. No records were created or modified. Customer and invoice lists were readable; the existing synthetic customer `CUS-0001` shows LKR 100, and four prior synthetic invoices are archived. The customer balance was left untouched. See [RUN-20261013-authentication-validity-review-05](runs/RUN-20261013-authentication-validity-review-05.md). This verifies UI behavior only; backend/API enforcement, deployed image digest, schema, and storage remain unverified.

## Fresh staging baseline after rebuild

- Owner reports staging at `https://bookone.clossyan.com` was rebuilt and test data cleaned. The selected company is accessible, and Control Room Access shows one platform super-admin. The Health Check route displays a placeholder stating that operational tools will be added later. These are UI observations, not proof of deployed image or database identity.
- BookOne `master` reached `5b71d06b12f9ccf7f9ca6b461e21dc1c1314e134` after 12 commits beyond the E2E removal merge, then documentation-only credential redaction merged at `65f84c151f7332efa196ed837ad179ac4818178b` ([PR #2](https://github.com/Dinu-Sri/BookOne/pull/2)). The QA source pin is updated to that latest master for a new unit baseline; browser acceptance still requires independent deployed-build verification.
- The new product changes remove the executable Control Room health check, company reset, demo seeds, and Audit page; they also change platform-admin assignment and Docker/staging startup. Inherited QA health/reset expectations are stale and require an explicit scenario review. Do not count discovery or the old manual run as acceptance of this build.
- [RUN-20261012-fresh-staging-01](runs/RUN-20261012-fresh-staging-01.md) records the baseline and first live checks. Four anonymous E2E denial assertions and two anonymous route checks passed. Catalog S-0019 was blocked by an auth-fixture setup requirement; Viewer sign-in and direct Control Room denial pass. Viewer invoice write is denied with no draft created, but the denial renders an application error; see BUG-0002. Deployed image SHA, schema, and storage identity remain unverified. The public credential found in BookOne docs was redacted from the current guide; the owner must rotate any reused credential because Git history retains old versions.
- BookOne Production Check reports green while its build/typecheck logs contain errors due to `continue-on-error`; it is advisory until the workflow genuinely fails on required errors. QA CI has no staging browser credentials.
- On the new source pin `65f84c1`, local QA metadata/target guard passed (747 scenarios, 2 guard assertions), independent unit tests passed 94 with 4 optional fixture skips, and browser discovery listed 770 tests in 29 files. These checks did not exercise staging business flows.
- Live E2E denial navigation initially hit a temporary browser approval rate limit; subsequent authorized checks completed as recorded below.

## Superseded Viewer write claims — runs 02–04

The earlier notes claiming Viewer customer/invoice writes were valid have been withdrawn: the actor was not verified before those actions. The created records were archived, but they are not Viewer permission evidence. See [RUN-20261013-authentication-validity-review-05](runs/RUN-20261013-authentication-validity-review-05.md), which verifies a Viewer session and confirms the create routes are denied in the UI.

## Latest batch — 2026-10-12 Wave 1a (inbuilt E2E denial)

- Change record: [changes/CHG-20261012-remove-inbuilt-e2e.md](changes/CHG-20261012-remove-inbuilt-e2e.md). Branch `qa/chg-20261012-e2e-denial`. Companion to BookOne `chore/remove-inbuilt-e2e` / [CHG-20261012-remove-inbuilt-e2e](https://github.com/Dinu-Sri/BookOne/blob/chore/remove-inbuilt-e2e/docs/changes/CHG-20261012-remove-inbuilt-e2e.md).
- S-0031 / S-0032 / S-0033 / S-0578 and helpers now assert `/e2e` and `/api/e2e/**` cannot start runs or return artifacts. Historical IDs preserved (747, last S-0760); old public-console expectation is retired, not rewritten as a past pass.
- Ported `pnpm agent:browse` plus login-smoke / rental-ops scripts. HTTP runner remains unpublished.
- Checks (local, `pnpm --ignore-workspace`, Node v20.19.0): `catalog:sync` 747/747; `check` metadata-valid + 2 guard passes; `test:unit` **94 passed, 4 skipped** on pin `d35ed92`; `test:e2e:list` **770 tests in 29 files** (was 771: extra `S-e2e console public at /e2e` dropped). Browser journeys not executed.
- These denial tests are written for the **post-cleanup** product. They will fail against a live host that still serves the inbuilt console until BookOne Wave 1b deploys. Discovery succeeded. Product pin unchanged: `d35ed92`. Do not treat this QA change as staging acceptance.

## Previous batch — 2026-10-12 manual entry

- [Manual staging entry run](runs/RUN-20261012-manual-entry-01.md): created three typed products, two quotations, two posted invoices and two valid Simple Entry records under prefix `QA-261012-A`. Mixed and digital invoice stock/accounting assertions passed; journals balanced. The Simple Entry cash-sale path failed because the UI promises Sales Revenue 4000 while submission requests missing account 4300; see [BUG-0001](bugs/BUG-0001-simple-entry-sales-account-mismatch.md).
- [Baseline audit batch 1](docs/BASELINE_AUDIT_20261012.md): 30 inherited catalog IDs source-reviewed, 717 pending. Review is not acceptance.
- Added eight independently specified critical posting unit cases: mixed product types, exact account/amount/side sets, synthetic tax/discount, returns and GRNI clearing. Full unit suite: 94 passed, 4 skipped.
- Staging browser mutation testing completed with owner-authorized synthetic data. Deployed SHA/schema/storage identity remains unresolved, so this is exploratory evidence rather than release acceptance.
- Read the [manual run record](runs/RUN-20261012-manual-entry-01.md) and [BUG-0001](bugs/BUG-0001-simple-entry-sales-account-mismatch.md) before resuming.

## Completed

- QA bootstrap published at `9dfe7e9e0282857110366f97fe724b1753ca8e4e`. [GitHub Actions run 38147275729](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38147275729) completed successfully: frozen install, metadata/guard checks, pinned-source unit tests and browser-test discovery.
- Product agent rules, development change contract, ledger/template and cleanup instructions published to BookOne `master` at [`bdff296bd3f0dae6470b15be74cfee8b71567501`](https://github.com/Dinu-Sri/BookOne/commit/bdff296bd3f0dae6470b15be74cfee8b71567501). Only 11 Markdown files changed; runtime testing code/interfaces were not removed.
- The unit baseline remains pinned to the reviewed product source `d35ed92`; the later product commit is documentation-only. A new runtime candidate requires deliberate pin/impact review and fresh evidence.

- Public repository created at https://github.com/Dinu-Sri/bookone-qa at the owner's request and confirmation.
- 84 test/catalog/fixture/support files imported from BookOne d35ed9209852af3fbcfe140176f2f8e74cae15f7; 14 deployment/UI/machine-specific files retained by source reference. See migration/source-inventory.json.
- Added planning/rules/templates, 9 business profiles, 747 pending assertion reviews, pinned-source adapters, target-origin guard and QA repository CI.
- Local unit run: 86 passed, 4 skipped across 9 files. Guard checks: 2 passed. Full browser discovery: 771 tests in 29 nonempty files; no browser execution.
- Fixed bootstrap Windows test-glob handling and the imported full-suite selection that omitted the team suite; original discovery was 759 tests, final discovery is 771.
- Product documentation updates introduce per-task change records and a staged inbuilt-E2E cleanup task. No runtime tests/interfaces have been removed from BookOne in this task.

## Truth boundaries

- No staging business acceptance, security certification, restore drill, or production gate established.
- Staging deployed SHA/schema/storage identity remain unverified.
- 4 skipped optional bank-fixture cases need portable synthetic replacements.
- 30 inherited catalog IDs now have source reviews; 717 remain pending. None of these source reviews establish staging acceptance.
- The authorized staging target and mutation scope are recorded privately; production remains outside agent access.
- Public code/records only; operational secrets and raw artifacts remain private/ignored.
- The manual run did not cover period locks, tax/VAT, payment allocation, reversal/idempotency, concurrent posting, audit history or subledger reconciliation. Its passing journal and stock assertions do not establish those controls.

## Next actions

The latest RUN-08/handoff above supersedes the older ordered list below: first four business groups have tested fixes at6a48cee; their remaining acceptance layers are specified in RUN-08. BUG-0008 still needs repair. Older next actions and cleanup statements are historical evidence, not instructions to recreate records removed by the owner.

1. Coding agent: address BUG-0009 server permission/dimension boundary, then BUG-0006 signed cash flow and BUG-0005 posted-obligation balances; follow the handoff's regression requirements.
2. Repair mandatory CI checks and same-SHA publication gate (BUG-0008); fix resolved period labels (BUG-0007).
3. Preserve original/void/reversal history; no blanket reset/balance edit. Fresh-role checks must precede all role-specific mutations.
4. Verify candidate image/schema/storage and deliberately update QA source pin with impact review; rerun targeted outcome cases on the deployed fixed version.
5. Resume isolated invoice/payment/return journeys only after the newly found blockers are tested; money/access/data/recovery coverage remains incomplete.
6. Retired inbuilt E2E cleanup is already recorded by current BookOne AGENTS.md. Revalidate its denial cases on the current candidate; do not repeat deletion instructions from historical Wave1 notes.
7. Replace four optional machine-fixture skips with portable fixtures; continue independent review of inherited assertions (30 reviewed/717 pending).


The `QA-261012-A` live staging records are retained for review and require cleanup only when the owner no longer needs them. Read AGENTS.md, this file and relevant records in new sessions. Local dependency/product checkouts under ignored work/ are reproducible, not canonical memory.



## Superseded follow-up record — 2026-10-12

The original run record is retained for audit history, but its Viewer attribution is unverified. Do not use its customer/invoice creation steps as evidence of Viewer permissions. The created records were later archived. The verified check is RUN-20261013-authentication-validity-review-05.

## Superseded third retest attribution — 2026-10-12

The records and UI actions described in the original run are historical, but the active actor was not verified. The actions do not establish Viewer write capability. See RUN-20261013-authentication-validity-review-05 for the verified retest.

## Superseded fourth retest attribution — build marker v2.1.0 / 2b92cf4

The original run's Viewer attribution is unverified. The verified Viewer session on the same visible marker showed direct customer and invoice create routes denied; see RUN-20261013-authentication-validity-review-05.
