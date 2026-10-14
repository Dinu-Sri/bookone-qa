# BookOne E2E catalog coverage

> **Generated** - do not hand-edit. Run:
> `node apps/e2e-runner/scripts/generate-coverage.mjs`

## Summary

| Metric | Value |
|--------|------:|
| Catalog total | 792 |
| IDs referenced in code | 747 |
| IDs missing | 45 |
| Coverage (ID presence) | 94.3% |
| Generated at | 2026-10-14T04:42:37.277Z |

status=referenced means the catalog ID string appears in tests/ or src/ (execute handlers). It does not yet certify deep mutate/balance assertions — see docs/E2E_AUTOMATION.md phases.

## By section

| Section | Total | Referenced | Missing |
|---------|------:|----------:|--------:|
| 18. Route smoke (load only) | 83 | 83 | 0 |
| 8. Sales lifecycle | 66 | 66 | 0 |
| 32. Tenant archive and form overlay | 45 | 0 | 45 |
| 9. Purchase lifecycle | 44 | 44 | 0 |
| 11. Accounting, reports, reconciliation | 44 | 44 | 0 |
| 6. Products & stock | 39 | 39 | 0 |
| 10. POS | 36 | 36 | 0 |
| 7. Parties | 33 | 33 | 0 |
| 13. Mid-operation edit/delete edges | 33 | 33 | 0 |
| 4. Company masters | 30 | 30 | 0 |
| 17. Validation error catalog (one per class) | 30 | 30 | 0 |
| 31. Team access (RBAC) | 29 | 29 | 0 |
| 5. Settings behavior matrix | 27 | 27 | 0 |
| 12. Full business-day journeys | 26 | 26 | 0 |
| 23. Quantity/price micro-matrix | 23 | 23 | 0 |
| 14. Control Room / platform | 21 | 21 | 0 |
| 1. Authentication & session | 20 | 20 | 0 |
| 16. Numeric & data edges | 17 | 17 | 0 |
| 3. Shell, navigation, period, module gating | 16 | 16 | 0 |
| 15. Security & tenancy | 15 | 15 | 0 |
| 22. Health-check suite step scenarios (mirror product suite) | 15 | 15 | 0 |
| 26. Reports x period matrix | 15 | 15 | 0 |
| 25. Document status transitions | 14 | 14 | 0 |
| 2. Public surfaces (docs & retired inbuilt E2E) | 13 | 13 | 0 |
| 21. Rare / stress / ops | 11 | 11 | 0 |
| 30. Product identity (units, categories, descriptions) | 11 | 11 | 0 |
| 19. Integrity after operations | 8 | 8 | 0 |
| 20. UI/UX non-functional | 8 | 8 | 0 |
| 28. Event hire / rental | 7 | 7 | 0 |
| 24. Payment method matrices | 6 | 6 | 0 |
| 27. Company settings pages save | 5 | 5 | 0 |
| 29. Company location delete | 2 | 2 | 0 |

## Missing P0 IDs (45)

- `S-0761`
- `S-0762`
- `S-0763`
- `S-0764`
- `S-0765`
- `S-0766`
- `S-0767`
- `S-0768`
- `S-0769`
- `S-0770`
- `S-0771`
- `S-0772`
- `S-0773`
- `S-0774`
- `S-0775`
- `S-0776`
- `S-0777`
- `S-0778`
- `S-0779`
- `S-0780`
- `S-0781`
- `S-0782`
- `S-0783`
- `S-0784`
- `S-0785`
- `S-0786`
- `S-0787`
- `S-0788`
- `S-0789`
- `S-0790`
- `S-0791`
- `S-0792`
- `S-0793`
- `S-0794`
- `S-0795`
- `S-0796`
- `S-0797`
- `S-0798`
- `S-0799`
- `S-0800`
- `S-0801`
- `S-0802`
- `S-0803`
- `S-0804`
- `S-0805`

## Artifacts

- Machine JSON: `apps/e2e-runner/src/catalog/coverage.generated.json`
- Catalog source: `apps/e2e-runner/src/catalog/scenarios.json`
- Scenario design: `docs/E2E_SCENARIO_CATALOG.md`
