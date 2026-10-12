# RUN-20261012-fresh-staging-01 — fresh staging baseline

Status: interrupted. Acceptance: blocked pending deployed-build identity and required assertions.

## Fingerprint and starting state

- Target: `https://bookone.clossyan.com`, owner-authorized disposable staging data. No production access.
- Product source: `Dinu-Sri/BookOne` master `65f84c151f7332efa196ed837ad179ac4818178b`; runtime changes end at `5b71d06b12f9ccf7f9ca6b461e21dc1c1314e134`. The owner reports the latest product was pulled to the system. The actual deployed image digest/build SHA has not been independently verified.
- QA source: `Dinu-Sri/bookone-qa` `0ed11956634f4bb6117807ad8c1aebe18a357777` before this baseline update. Source pin is being advanced deliberately after reviewing BookOne's 12-commit diff since `2bbc33477118fba56dbc1255874228d123359cc3`.
- Changed scope: Docker/Portainer startup, empty database initialization, platform-admin assignment, retired Control Room health/reset/audit/demo tools, and documentation. There were no new schema files in the reviewed diff; actual deployed schema and storage identity remain unknown.
- UI observation: the selected company loads Control Room Access with one platform super-admin. The Health Check page is now a placeholder. These checks prove only visible route state. No business transactions were posted in this run.
- User reports prior staging test data was cleaned. This run did not independently count database records. Old `QA-261012-A` records must be considered absent or unknown until checked; old manual-run results remain historical only.
- Browser baseline: Chrome signed-in owner session. No credentials, cookies, raw financial data, or screenshots are stored in this public record.
- Local QA checks against product pin `65f84c1`: `pnpm check` passed (747 scenario metadata entries and 2 target-policy assertions); `pnpm test:unit` passed 94 with 4 optional bank-fixture skips; `pnpm test:e2e:list` discovered 770 tests in 29 files. No staging browser assertions executed.
- Live E2E denial navigation was stopped by a temporary browser automation approval rate limit before the navigation happened. No denial result is claimed.

## Selected first checks

| Scope | Expected outcome | State |
|---|---|---|
| Build and environment identity | Deployed commit/image, schema and storage are named before acceptance | blocked |
| E2E removal S-0031/S-0032/S-0033/S-0578 | Console and runner endpoints cannot start runs or return artifacts | not-run |
| Login and platform access | Admin can access Control Room; normal tenant role cannot | admin UI observed; denial not-run |
| Fresh company foundation | Company, accounts, location/settings and product creation persist after reload | not-run |
| Sales and accounting | Physical, digital/service, rental and mixed quotation-to-invoice journeys; exact AR, revenue, tax, stock and GL outcomes | not-run |
| Cash and payments | Receive payment, allocation, retry safety, Simple Entry and reconciliation | not-run |
| Historical BUG-0001 | Reproduce or disprove missing sales account mapping on this build; verify exact journal | not-run |
| Purchase and returns | Bill/receipt/payment, stock valuation, return/reversal | not-run |
| Security and data safety | Two real tenant fixtures, separate roles, cross-tenant denials, export/file isolation | not-run |
| Retired ops tools | Explicitly review inherited health/reset/audit scenarios against the product decision | not-run |

The initial sequence is identity and retired-surface checks, then a synthetic company setup, then one complete sales/payment/accounting journey before expanding to business profiles. Financial expected values must be calculated independently of BookOne code. Check saved state after reload and record created IDs privately for cleanup.

## Evidence and next action

- Passed business assertions: 0. Failed business assertions: 0. Selected live checks are not yet executed. This is not a release acceptance run.
- Private evidence and created records: none in this baseline entry.
- Next: verify the deployed image/build and database/storage identity, run the E2E denial and access checks when browser automation is available, then establish isolated synthetic business fixtures and execute the first end-to-end sales/accounting journey. Review/replace obsolete inherited health/reset assertions before any broad-suite run.

