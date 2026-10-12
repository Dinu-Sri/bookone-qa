# QA status — 2026-10-12

## Fresh staging baseline after rebuild

- Owner reports staging at `https://bookone.clossyan.com` was rebuilt and test data cleaned. The selected company is accessible, and Control Room Access shows one platform super-admin. The Health Check route displays a placeholder stating that operational tools will be added later. These are UI observations, not proof of deployed image or database identity.
- BookOne `master` reached `5b71d06b12f9ccf7f9ca6b461e21dc1c1314e134` after 12 commits beyond the E2E removal merge, then documentation-only credential redaction merged at `65f84c151f7332efa196ed837ad179ac4818178b` ([PR #2](https://github.com/Dinu-Sri/BookOne/pull/2)). The QA source pin is updated to that latest master for a new unit baseline; browser acceptance still requires independent deployed-build verification.
- The new product changes remove the executable Control Room health check, company reset, demo seeds, and Audit page; they also change platform-admin assignment and Docker/staging startup. Inherited QA health/reset expectations are stale and require an explicit scenario review. Do not count discovery or the old manual run as acceptance of this build.
- [RUN-20261012-fresh-staging-01](runs/RUN-20261012-fresh-staging-01.md) records the baseline and first live checks. Four anonymous E2E denial assertions and two anonymous route checks passed. Catalog S-0019 was blocked by an auth-fixture setup requirement; Viewer sign-in and direct Control Room denial pass. Viewer invoice write is denied with no draft created, but the denial renders an application error; see BUG-0002. Deployed image SHA, schema, and storage identity remain unverified. The public credential found in BookOne docs was redacted from the current guide; the owner must rotate any reused credential because Git history retains old versions.
- BookOne Production Check reports green while its build/typecheck logs contain errors due to `continue-on-error`; it is advisory until the workflow genuinely fails on required errors. QA CI has no staging browser credentials.
- On the new source pin `65f84c1`, local QA metadata/target guard passed (747 scenarios, 2 guard assertions), independent unit tests passed 94 with 4 optional fixture skips, and browser discovery listed 770 tests in 29 files. These checks did not exercise staging business flows.
- Live E2E denial navigation initially hit a temporary browser approval rate limit; subsequent authorized checks completed as recorded below.

## Earlier follow-up after reported staging fix — 2026-10-12

- The Viewer role account created a synthetic customer successfully, and then saved a LKR 100 invoice draft as Viewer. Both test records were archived; the invoice remains visible as archived. No invoice was posted and no ledger or stock mutation was attempted.
- The original invoice error page from the prior run did not appear in this follow-up because the draft save succeeded. The owner-reported fix is therefore **not verified as a fix**; a successful Viewer write was observed instead. Deployed commit/image identity remains unknown.
- See [RUN-20261012-fresh-staging-01](runs/RUN-20261012-fresh-staging-01.md), [BUG-0003](bugs/BUG-0003-viewer-can-create-customer.md), and [BUG-0004](bugs/BUG-0004-viewer-can-save-invoice-draft.md). The BookOne source graph includes a permission call for document creation but is not verified as the deployed revision.

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

1. Confirm the Viewer permission contract; investigate and fix BUG-0003 and BUG-0004 server-side. Verify denied customer and invoice writes on an identified build. Then reproduce BUG-0001 and trace the Simple Entry Money In mapping from UI through posting.
2. Verify the deployed commit/image and schema/storage identity; then execute the ordered business journeys in the audit.
3. Keep the synthetic Viewer account for follow-up role tests; its password remains only in the local gitignored runner env file.
4. Audit/deepen P0 money/access/data assertions; start mixed rental/products/services plus isolated type-specific journeys.
5. Replace optional machine-file bank cases with synthetic portable fixtures.
6. BookOne Wave 1b: delete inbuilt runner/page/APIs/Docker on `chore/remove-inbuilt-e2e` after this QA companion is published; then execute S-0031–S-0033/S-0578 against that candidate. Operator still must stop `bookone-staging-e2e` separately.
7. Wire trusted external status checks and owner-controlled release promotion; add real migration/recovery rehearsals.

The `QA-261012-A` live staging records are retained for review and require cleanup only when the owner no longer needs them. Read AGENTS.md, this file and relevant records in new sessions. Local dependency/product checkouts under ignored work/ are reproducible, not canonical memory.



## Retest after latest staging update — 2026-10-12

- The synthetic account remains assigned `Viewer` on `/company/team`. On `/parties/customers/new`, submitting code `QA-VIEW-20261013` and name `QA Viewer Update Retest 20261013` succeeded; that customer appeared in the invoice customer picker and active customer list. This independently repeats BUG-0003.
- As Viewer, selected that customer, added a synthetic free-text service line at LKR 100, and selected **Save draft**. The app created `INV-20261012-0002` with status `draft` and total LKR 100, independently repeating BUG-0004. No Post action was used.
- Both newly created records were archived through the UI and success confirmations were observed. They remain archived/recoverable. No journal, stock, payment or posted invoice action was performed. The customer list still shows the earlier test customer `CUS-0001` active with LKR 100 even though its linked test invoice is archived; this was pre-existing at retest start and was left untouched. Its balance meaning requires separate reconciliation; this run does not infer a ledger effect.
- The deployed commit/image, schema and storage identity remain unavailable. This is repeat exploratory evidence, not acceptance of the new build or a release gate. See [RUN-20261012-viewer-permission-retest-02](runs/RUN-20261012-viewer-permission-retest-02.md).


## Third Viewer retest after another staging update — 2026-10-12

- The account was still assigned Viewer. A third synthetic customer creation succeeded (`QA-VIEW-20261012-R3`, `QA Viewer Retest Three`) and a LKR 100 service invoice draft was saved as `INV-20261012-0003`. Both records were archived afterward; no invoice was posted.
- BUG-0003 and BUG-0004 remain reproduced after another owner-reported update. Deployed build/image identity remains unknown, so the behavior cannot be attributed to a verified release.
- After archiving the draft and customer, the active customer list still shows the earlier test customer at LKR 100 while all listed test invoices are archived. This is an unresolved display/accounting observation; authoritative ledger and subledger state was not checked, so no financial conclusion is drawn.
- See [RUN-20261012-viewer-permission-retest-03](runs/RUN-20261012-viewer-permission-retest-03.md).
