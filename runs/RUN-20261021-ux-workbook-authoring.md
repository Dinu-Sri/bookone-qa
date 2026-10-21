# UX companion authoring verification —2026-10-21

Scope: documentation, new canonical UX JSON and authoring tooling. Product source read-only at a4a6d65fa0f8ecc116b728b99d70e86f1b2b577f; QA source snapshot c7ed9c5cd31f28efac5be98a463bb96197890a46. Node24.19.0. These are authoring checks, not ERP tests.

| Check | Final outcome |
|---|---|
| node scripts/ux-workbook.mjs render |32 rules/48 workflows/12groups generated|
| node scripts/ux-workbook.mjs check |Generated views match canonical source|
| node --test tests/infrastructure/ux-workbook.test.mjs |6 passed/0 failed|
| node --test tests/infrastructure/business-library.test.mjs |16 passed/0 failed|
| ux plan UX-008 |10 selected including shared core and matching source consumers|
| ux plan unmapped-change |All48 selected; no execution|
| Original financial rulebook |Exact SHA256abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc restored/verified in snapshot|
| Existing8 casebooks/library |Original fetched content retained; no changed entries published|
| Product patch scope |Markdown only; no apps/packages/docker/scripts/VERSION/schema changes|

During authoring, the new validator rejected UXW-012 because its actions were not split into multiple steps; the definition was corrected. The first retained-library test attempt rejected a retrieval-added final newline in the temporary rulebook copy; exact canonical bytes/hash were restored. Final tests above pass. Neither attempt changed a financial oracle or prior ERP result.

New guards reject duplicate/dangling IDs, orphan rules, missing outcome/unchanged state, missing browser layer, unsupported pass/review/binding claims, stale inventory pins and ownerless unresolved questions. Structural validation cannot judge all expectation semantics or prove human approval. Manual source/expectation review remains required.

Not run: full pnpm check in a complete checkout; dependency installation; E2E discovery/product build; live UI tests; keyboard/screen reader/device/fault/upgrade/recovery executions. No ERP defect closure or customer/accessibility acceptance. Existing272 business cases and Light03 results preserved.

