# BookOne maintained business workbooks — library 1.2.0

This is the expanded publication requested by the owner on 16 October 2026: business journeys and edge cases that humans and agents can maintain and use to test BookOne. It applies the [shared protocol](PROTOCOL.md) and canonical rulebook; it does not create a second policy authority.

**Eight books, 52 journeys, 269 case definitions, 14 reusable control contracts, and 21 independent financial/state examples containing 54 posting/state steps. All new specifications are draft; all new cases are unbound and not run.** These counts exclude the five earlier starter families and their 44 variants to avoid presenting overlaps as distinct accepted coverage. Existing case/task IDs and evidence remain intact.

| Workbook | Journeys | Cases | Main coverage |
|---|---:|---:|---|
| [Physical](books/WB-PHY.md) | 12 | 62 | Masters/opening, PO approval, partial GRN/bills, GRNI, cash purchases, sales, payments, both returns, costs, locations, POS, imports, close |
| [Service](books/WB-SVC.md) | 5 | 25 | Quote to earned invoice, collections/credits/refunds, discounts/tax arithmetic, costs, advance/cancellation/milestone boundaries |
| [Digital](books/WB-DIG.md) | 4 | 20 | Non-stock accounting, delivery/licence support boundary, refunds, historical price, mixed bundles |
| [Rental](books/WB-REN.md) | 9 | 45 | Fleet/reservation, dispatch/partial returns, buckets/wash, deposits, invoice timing, extension/cancellation, kits/serials, charges, photos/history |
| [Hybrid](books/WB-HYB.md) | 5 | 30 | Four product classes, shared discounts/returns, plans/modules/entities, scopes/domains/switching, contention/atomicity |
| [Shared accounting/access](books/WB-CORE.md) | 7 | 37 | Allocation batches, tender, locks/reversals, financial statements/as-of, historical masters, roles/tenants, forms/retries/faults, tax boundaries |
| [Banking/reconciliation](books/WB-BANK.md) | 5 | 25 | Cashbook/transfers, portable imports/deduplication, group matches, missing fees, outstanding/close/locks, cancellation/privacy |
| [Data/operations](books/WB-OPS.md) | 5 | 25 | Fresh company bootstrap, file lifecycle, upgrades/rollback, audit/evidence/cleanup, retained archive programme executed last |

Start with [the business map](BUSINESS_MAP.md), [field/decision matrix](FIELD_MATRIX.md), [execution guide](EXECUTION_GUIDE.md), [worked examples](WORKED_EXAMPLES.md), [shared controls](CONTROLS.md) and [all 92 retained lifecycle task mappings](LIFECYCLE_MAP.md). [Source study](SOURCE_STUDY.md) states the pin and limits. [Handoff](../../handoffs/HANDOFF-20261016-expanded-business-workbooks.md) gives the next adoption/execution actions.

[Prior findings mapped to workbook regressions](PRIOR_FINDINGS_MAP.md) retains the nine published finding groups and exact original expectations alongside adjacent cases.

## Canonical editable sources

- `workflows/library.json`: version, file list, rulebook hash, study baseline and execution boundaries.
- `workflows/casebooks/WB-*.json`: stable book/journey/case IDs, fixtures, actions, expected outcomes, rule/task/entity/source/control links and explicit gaps.
- `workflows/business-map.json`: source-pinned entities, declared relationships, process groups, routes/actions and source hashes.
- `workflows/control-contracts.json`: shared risk obligations, resolved per journey before a run.
- `workflows/worked-examples.json`: independent signed-ledger fixtures, journal lines and closing assertions.

Generated books, controls, entity index, lifecycle map and worked examples are read-only views. Hand-authored guidance remains separate. Do not edit a generated expected result to match product output.

```sh
pnpm library:render
pnpm library:check
pnpm test:business-library
pnpm library:plan BR-PUR-01
pnpm library:plan inventoryProducts
pnpm library:plan apps/web/src/app/actions/commercial-docs.ts
```

The planner selects directly mapped journeys, hybrid compositions and mandatory shared controls; unknown/unmapped inputs broaden to all 52. Actual product diff review and inherited core regressions remain required. Selection does not execute tests.

## Continuous improvement

Use WORKFLOW_EDGE_CASE for new observations and WORKFLOW_CHANGE for new features, changed expectations or mappings. Allocate stable `WB-TYPE.JNN.CNN` IDs; never recycle IDs. Increment affected journey/book revisions, preserve historical Git content and immutable run evidence, update independent fixtures and regenerate/check views. Material new policy follows RULE_CHANGE, not a private workbook sentence. Specification review, adapter implementation, case execution and candidate acceptance remain separate.

The v1 validator deliberately rejects invented review/binding/pass claims. Supporting reviewed specs or executable adapters requires an explicitly reviewed schema/validator extension with real test ID validation and independent evidence. Actual results belong in separate run records at exact candidate fingerprints.

## Boundaries and growing backlog

These books cover a broad first library for the current product; they do not enumerate every business in existence or every combination. Policy-conditional cases need exact approved configuration/thresholds and actor/record bindings before execution. Source presence is not proof of a feature working, and missing delivery/recognition support cannot become a pass.

Manufacturing/BOM production, batch/expiry/serial stock-sale tracking, full payroll, subscriptions/recurring automation, complex project costing, multi-currency FX, leases, depreciation, specialized statutory filing, e-commerce fulfilment and industry-specific regulation remain discovery/support backlog unless separately contracted and mapped. HR is explicitly marked coming soon in the current module catalogue. Rental serials/kits do not establish serialised retail assets or manufacturing.

A new capability must add its entity/state model, rules, valid/invalid transitions, fixture/oracle, roles/scopes, history/upgrade effects and test bindings before acceptance. An unknown source change broadens regression until its dependencies are mapped. Actual encrypted backup/restore stays LAST.


## 2026-10-17 maintenance

Library1.1.0 adds six stable cases from the v2.5.13 browser wave: linked supplier/customer identity, source-price preview consistency, sequential residual-cent returns and retained input on validation and closed-debt historical reconstruction. See [change and adoption record](../../changes/WCHG-20261017-v2513-next-wave.md).266cases remain draft/unbound/not-run; [95 bounded manual assertions](../../runs/CHECKS-20261017-v2513-next-wave.json) are separate evidence, not full canonical case acceptance. Original source map remains a pinned2.5.12 study; current1a10201 actual-diff overlay is recorded separately, with no silent execution pin advance.


## v2.5.14 source-boundary expansion

Library1.2.0 adds WB-HYB.J02.C08–C10: aggregate duplicate quantity, taxable gross/net closing, and residual above final line value. Book/journey revision4. Three new independently specified state/arithmetic examples bring totals to21examples/54steps. All269case definitions remain draft/unbound/not-run. Actual source-only evidence is recorded separately in RUN-20261017-v2514-retest; no live bug closure, tax approval or refreshed historical graph is implied. See [change record](../../changes/WCHG-20261017-v2514-retest.md).
