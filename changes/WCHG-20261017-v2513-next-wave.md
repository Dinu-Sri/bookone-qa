# WCHG-20261017-v2513-next-wave

Status: definitions implemented and structurally validated; independent review, executable bindings and business acceptance remain pending. Author: independent QA agent, 17 October 2026. Product maintainers must triage before the next fix is accepted.

Evidence: [actual source overlay](IMPACT-20261017-v2513-source-diff.json), [browser report](../runs/RUN-20261017-v2513-next-wave.md), [handoff](../handoffs/HANDOFF-20261017-v2513-next-wave.md).

## Reason and authority

Reviewed the exact ead3a82 → 1a10201 product diff: 15 files. No product code, settings, grants or migrations were changed by QA. Rulebook1.0.0 remains unchanged, SHA256 `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`; applicable obligations remain revision1 and expert review remains pending.

Party/source identity, original economic facts, exact cumulative money and retained validation inputs are existing invariants. No new tax or recognition policy was adopted to explain these findings.

## Canonical changes

Library1.0.1 → 1.1.0 is an additive compatible revision. WB-PHY book1 → 2, journeys J05/J06 1 → 2; WB-HYB book2 → 3, J02 2 → 3; WB-CORE book2 → 3, J03 2 → 3 and J06 1 → 2. Existing IDs and historical results are retained.

| New case | Independent expectation |
|---|---|
| WB-PHY.J05.C06 | Customer A's invoice0.99 cannot be settled by a return attributed to B; load A correctly and enforce its identity. |
| WB-PHY.J06.C06 | Inherit supplier A and reject B before mutation; a valid partial85.50 reduces206.50 to121. |
| WB-HYB.J02.C06 | Remaining source credit171 must not preview361 after a price edit and silently post171. |
| WB-HYB.J02.C07 | A source2.99 with accepted credits1+1 needs a final residual0.99; preserve full quantity and value. |
| WB-CORE.J06.C06 | Invalid150% produces an error and preserves customer, lines, dates and prices for correction, with no posting. |
| WB-CORE.J03.C06 | Currently closed AR/AP reconstruct34.50,206.50 and100 before their future credits/payments. |

The library now has eight books, 52 journeys and 266 cases. Its 14 controls, 18 worked ledger examples and 51 example steps remain intact. The added cases contain independent integer-cent checks and explicit fixtures. Generated books and current guidance were refreshed. All definitions remain draft, unbound and not-run; the separate 95 manual assertions do not invent canonical bindings, independent review or release acceptance.

## Map, impact and compatibility

The relevant entities already exist in the map: businessDocuments, businessDocumentLines, parties, settlementAllocations, transactions, inventoryProducts and accounts. No new table or declared relationship was discovered. The original 68-entity/164-reference map remains an explicitly historical ead3a82 source study. A separate pinned overlay records the current diff and blob identities; the automated execution pin remains0bcdf4d.

Direct impacts are the six cases above plus CORE.J04 detail/print. Shared source, accounting, identity and history controls affect all business books and hybrid compositions. Unknown impact broadens review; mappings are not execution. All 92 retained lifecycle tasks and S/RT/B–F references remain intact. A purchase-return source picker is absent from the normal UI; the source-guided route used for that test is identified separately.

No existing document was repaired or migrated. Retain the wrong-attribution records, original source balances and first failures. Prior evidence is immutable. Independent calculations include 270−13.50=256.50;256.50−50−85.50=121;2×85.50=171;297−150−112.50=34.50;299−100−100=99 cents. Correct totals cannot justify wrong-party attribution.

## Validation and remaining work

Library render/check, starter generated-view check and all 26 infrastructure tests passed, with no skipped tests. Manual semantic review checked arithmetic, references and retained history. Full repository/product/runtime suites were not run; green metadata does not certify ERP behavior or a release gate.

The coding agent owns product fixes, CHGs, real adapters and critical failure-sensitivity regressions. Independent QA owns fresh-fingerprint retesting. Business and expert review cannot be self-certified. The candidate remains unapproved while the P1 party issue is open. Actual encrypted backup/restore remains LAST.
