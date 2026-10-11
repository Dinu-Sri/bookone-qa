# RUN-20261011-bootstrap

Type: external test extraction and local validation. Product SHA: d35ed9209852af3fbcfe140176f2f8e74cae15f7. QA revision: initial publication commit (see Git history; final SHA is not embedded in itself). Node 20.19.0; pnpm 9.0.0; Vitest 2.1.9; Playwright 1.51.1. No staging credentials used.

| Check | Result |
|---|---|
| Metadata/catalog validation | Passed; 747 unique IDs and 747 pending assertion reviews |
| Target-origin guard | 2 passed |
| Pinned-product unit suite | 9 files; 86 passed, 4 skipped, 0 failed |
| E2E discovery | 771 tests in 29 nonempty spec files; not executed |
| Staging/financial/security acceptance | Not run |

The first guard command failed on Windows because Node 20 did not expand the test-file glob; changed to an explicit file and reran successfully. The first full discovery found 759 tests because inherited bucket selection omitted team RBAC; changed full-suite testMatch to include all specs and rediscovered 771.

Skipped cases are 2 optional bank-fixture tests and 2 studio-transform tests requiring local workbook fixtures. Those files were not copied or exposed. Skips remain coverage gaps. The inherited suite's other weak/conditional assertions remain to be audited; unit/discovery success does not certify release readiness.

Raw local output and paths stay in ignored work/. This summary includes no credentials, customer data or browser session content. No ERP data was created or modified. Dependency lockfile and source inventory support rerunning the bootstrap.
