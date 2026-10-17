# Coding-agent handoff: v2.5.13 next workflow wave

**Candidate remains unapproved.** Independent browser testing completed 95 bounded assertions: **88 passed, 6 failed, 1 inconclusive**. The failures form four finding groups: one P1 and three P2s.

Product: `1a1020127c4ff0f11ccd9d84d736c6b18b235fca`, live stamp **v2.5.13 · 1a10201**. QA intent: `fd012b914a5e8ab8cbf0d300a7669f2f40b50124`. Read the [full report](../runs/RUN-20261017-v2513-next-wave.md), [exact assertions](../runs/CHECKS-20261017-v2513-next-wave.json), [actual source impact](../changes/IMPACT-20261017-v2513-source-diff.json), and [workbook maintenance](../changes/WCHG-20261017-v2513-next-wave.md).

## Fix these findings

1. **P1: [Source-party integrity](../bugs/OBS-N13-source-supplier-mismatch.md).** The linked purchase-return form defaults to the wrong supplier. PR-20261018-0004 saved 85.50 under BW261016 Supplier while reducing D2513 Vendor's PUR0005 balance from 206.50 to 121. The normal sales-return picker loads customer CUS0008 correctly, but permits changing to CUS0005: SR-20261017-0010 saved under CUS0005 while settling CUS0008's INV0008 by 0.99. Copy the original party and enforce source-party consistency on the server. Test both mismatches and valid matching-party controls. These are same-tenant business failures; no cross-tenant security acceptance is claimed.
2. **P2: [Source-price preview](../bugs/OBS-N13-linked-return-price-preview.md).** INV0005's remaining two units preview 171 at the original price 100. Editing the price to 200 changes the preview to 361, but SR0005 saves 171. Lock or reject unsupported edits, or normalize them clearly before confirmation. The accepted ledger amount is correct.
3. **P2: [Cumulative rounding](../bugs/OBS-N13-cumulative-return-rounding.md).** INV0009 contains three units at 1, less a fixed header discount of 0.01: total 2.99. SR0008 and SR0009 each credited one unit for 1. The final unit previews 1 and is rejected because only 0.99 remains. Apply deterministic residual rounding so the full source quantity and exact value can be returned.
4. **P2: [Validation loses entry](../bugs/OBS-N13-validation-loses-input.md).** A 150% line discount correctly produces an error, but redirects to the invoice list and discards the entered customer and lines. Preserve the form for correction while retaining the invalid-discount guard.

## Retests and broader coverage

The reported fixes passed their original scoped reproductions: historical AR is 181 at 16 October, aggregate 251, while current debt remains 180; AR/AP at 15 October are zero; quote, invoice and invoice print show subtotal 270, discount 13.50 and total 256.50. A fresh return source previews/posts 85.50 and 171, reversing costs 60 and 120; the full preview is 256.50. An extra returned unit is rejected without another posting.

The new wave also exercised completed-service quote → order → invoice → collections, mixed physical/service/digital sales and returns, supplier bills and credits, current payment lists, and historical reconstruction of currently closed debts after future payments and credits. Do not blanket-close BUG0062 while its adjacent variants above fail.

Retain all fixtures. Final totals are **43 journals; debits/credits 8,369.47; profit 587.49; assets and liabilities/equity 697.49**. Bank is 512, AR 25.49, AP 110, inventory GL 180, and cash −20. Old INV0003 and its future receipt remain untouched. INV0009 still has one unit/0.99 blocked. INV0008 initially saved as one unit/0.99, so it was explicitly excluded from the three-unit rounding case and later used for the customer-identity reproduction.

Mandatory maintenance under AGENTS63–81 is complete: library1.1.0 adds six stable cases, with 266 draft, unbound, not-run definitions across eight books and 52 journeys. Canonical JSON, revisions, generated views and current guidance were updated. All 26 infrastructure tests passed. The coding agent's 103 product unit passes were not independently rerun here.

Implement lasting independent regressions and critical failure-sensitivity checks, then provide the exact fix SHA and CHG for independent QA. Stock quantities/layers, verified roles, locks, races, runtime audit, files, upgrades and expert acceptance remain open. Continue those supported layers and the remaining rental/digital/service/hybrid workflows. Actual encrypted backup/restore stays LAST. This handoff authorizes no merge or deployment; the owner manually relays its repository links.
