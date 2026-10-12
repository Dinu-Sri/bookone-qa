# QA status — 2026-10-12

## Latest batch — 2026-10-12

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

1. Reproduce BUG-0001 on an identified staging build, trace the Simple Entry Money In mapping from UI through posting, fix the 4000/4300 mismatch and run adjacent accounting regressions.
2. Obtain deployed commit/image and stable run window; then execute the ordered business journeys in the audit.
3. Establish staging build identity and run-owned fixture users/companies.
4. Audit/deepen P0 money/access/data assertions; start mixed rental/products/services plus isolated type-specific journeys.
5. Replace optional machine-file bank cases with synthetic portable fixtures.
6. Follow BookOne docs/REMOVE_INBUILT_E2E.md before deleting old tooling; migrate/retire every source-reference-only item deliberately and update tests that expect old endpoints.
7. Wire trusted external status checks and owner-controlled release promotion; add real migration/recovery rehearsals.

The `QA-261012-A` live staging records are retained for review and require cleanup only when the owner no longer needs them. Read AGENTS.md, this file and relevant records in new sessions. Local dependency/product checkouts under ignored work/ are reproducible, not canonical memory.
