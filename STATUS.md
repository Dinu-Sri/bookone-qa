# QA status — 2026-10-12

## Latest batch — 2026-10-12

- [Baseline audit batch 1](docs/BASELINE_AUDIT_20261012.md): 30 inherited catalog IDs source-reviewed, 717 pending. Review is not acceptance.
- Added eight independently specified critical posting unit cases: mixed product types, exact account/amount/side sets, synthetic tax/discount, returns and GRNI clearing. Full unit suite: 94 passed, 4 skipped.
- Staging browser read-only reconnaissance completed with existing login. No business mutations. Deployed SHA/schema/storage identity still unresolved; owner asked for deployed commit/image and current deployment activity.
- Read [run record](runs/RUN-20261012-audit-01.md) before resuming. No new live product defect confirmed.

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
- Owner authorizes changes to all test data at https://bookone.clossyan.com; production is outside agent access. Do not ask again for routine staging test-data permission.
- Public code/records only; operational secrets and raw artifacts remain private/ignored.

## Next actions

1. Read the latest audit and run record above. Obtain deployed commit/image and stable run window; then execute the ordered business journeys in the audit.
2. Establish staging build identity and run-owned fixture users/companies.
3. Audit/deepen P0 money/access/data assertions; start mixed rental/products/services plus isolated type-specific journeys.
4. Replace optional machine-file bank cases with synthetic portable fixtures.
5. Follow BookOne docs/REMOVE_INBUILT_E2E.md before deleting old tooling; migrate/retire every source-reference-only item deliberately and update tests that expect old endpoints.
6. Wire trusted external status checks and owner-controlled release promotion; add real migration/recovery rehearsals.

No live test records require cleanup from this bootstrap. Read AGENTS.md, this file and relevant records in new sessions. Local dependency/product checkouts under ignored work/ are reproducible, not canonical memory.
