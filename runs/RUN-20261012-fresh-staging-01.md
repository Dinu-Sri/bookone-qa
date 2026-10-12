# RUN-20261012-fresh-staging-01 — fresh staging baseline

Status: in progress. Acceptance: blocked pending deployed-build identity and required business/security assertions.

## Fingerprint and starting state

- Target: `https://bookone.clossyan.com`, owner-authorized disposable staging data. No production access.
- Product source: `Dinu-Sri/BookOne` master `65f84c151f7332efa196ed837ad179ac4818178b`; runtime changes end at `5b71d06b12f9ccf7f9ca6b461e21dc1c1314e134`. The owner reports the latest product was pulled to the system. The actual deployed image digest/build SHA has not been independently verified.
- QA source: `Dinu-Sri/bookone-qa` `0ed11956634f4bb6117807ad8c1aebe18a357777` before this baseline update. Source pin is being advanced deliberately after reviewing BookOne's 12-commit diff since `2bbc33477118fba56dbc1255874228d123359cc3`.
- Changed scope: Docker/Portainer startup, empty database initialization, platform-admin assignment, retired Control Room health/reset/audit/demo tools, and documentation. There were no new schema files in the reviewed diff; actual deployed schema and storage identity remain unknown.
- UI observation: the selected company loads Control Room Access with one platform super-admin. The Health Check page is now a placeholder. These checks prove only visible route state. A dedicated synthetic Viewer account was created for role checks; no business transaction was posted.
- User reports prior staging test data was cleaned. This run did not independently count database records. Old `QA-261012-A` records must be considered absent or unknown until checked; old manual-run results remain historical only.
- Browser baseline: Chrome signed-in owner session. No credentials, cookies, raw financial data, or screenshots are stored in this public record.
- Local QA checks against product pin `65f84c1`: `pnpm check` passed (747 scenario metadata entries and 2 target-policy assertions); `pnpm test:unit` passed 94 with 4 optional bank-fixture skips; `pnpm test:e2e:list` discovered 770 tests in 29 files. These are harness checks, not staging business acceptance.
- Browser checks against staging: S-0031 passed (the anonymous `/e2e` page did not expose runner UI); S-0032 passed (anonymous POST did not start a run); S-0033 passed (tested run/report/log/download endpoints exposed no run artifacts); S-0578 passed (the `/e2e` route did not show a runner and did not trigger the app error boundary). S-0032/S-0033 had their assertions execute on the first attempt. S-0031's first attempt was blocked before assertion by a missing Playwright browser binary; it then passed using the installed Chrome executable.
- Separate anonymous route smoke passed for `/dashboard` and `/control-room/access`: both redirected to `/login` and rendered the login form. This was an ad hoc read-only assertion, not an execution of catalog S-0019.
- Catalog S-0019 was blocked before its test because the auth spec's `beforeAll` requires `E2E_EMAIL` and `E2E_PASSWORD`, even for its no-session test. This was followed by a separate authenticated Viewer check. No passwords were copied to this public record.
- Authenticated role check: created synthetic user `qa.staging.probe.20261012@clossyan.com` as Viewer in the active company. Sign-in succeeded; the navigation labeled modules `View only`. Direct navigation to `/control-room/access` displayed “You do not have access to that screen.” The admin session was restored afterward and Control Room navigation was visible.
- Viewer could open `/sales/invoices` and `/sales/invoices/new`. With a synthetic customer and LKR 100 free-text service line, Viewer Save draft showed a server-side application error (digest `424441645`); the invoice list remained empty and no draft was created. Source review of local BookOne checkout `c3602cf` shows a write-permission check followed by a form wrapper that throws on denial, consistent with the observed error. Deployed build identity and server logs remain unavailable, so see [BUG-0002](../bugs/BUG-0002-viewer-invoice-denial-error-page.md) for evidence and limits.
- Follow-up after the owner reported the fix was pushed: a new staging UI pass confirmed the signed-in test account is assigned the company job `Viewer` on `/company/team`. Starting customer list was empty. As Viewer, the user opened `/parties/customers/new`, saved a synthetic customer (code `QA-VIEW-20261012`; name `QA Viewer Access Probe 20261012`), and the UI reported “Saved successfully”; the customer appeared in the active list. The test then archived that record; “Archived successfully” appeared and the active customer list returned to “No customers found.” No invoice or financial transaction was created. This is an exploratory role-control failure if Viewer is intended to be read-only; see [BUG-0003](../bugs/BUG-0003-viewer-can-create-customer.md). The BookOne source graph at `7b1794f` shows the create action lacks a server-side permission assertion, but deployed build identity remains unknown.
- Retest of BUG-0002 was **blocked / not run**: Chrome automation reported another extension UI was open before invoice-page navigation. The owner reports the invoice denial fix was pushed, but this retest did not verify that fix or a deployed build SHA.
- Browser test logs and reports remain in the ignored local `apps/e2e-runner/reports/` directory. No screenshots, cookies, passwords, or real business transactions were copied to public record.

## Selected first checks

| Scope | Expected outcome | State |
|---|---|---|
| Build and environment identity | Deployed commit/image, schema and storage are named before acceptance | blocked |
| E2E removal S-0031/S-0032/S-0033/S-0578 | Console and runner endpoints cannot start runs or return artifacts | passed (anonymous scope; deployed build identity unknown) |
| Login and platform access | Admin can access Control Room; normal tenant role cannot | admin UI observed; anonymous routes redirected to login; Viewer direct Control Room access denied (passed) |
| Fresh company foundation | Company, accounts, location/settings and product creation persist after reload | not-run |
| Sales and accounting | Physical, digital/service, rental and mixed quotation-to-invoice journeys; exact AR, revenue, tax, stock and GL outcomes | not-run; Viewer invoice creation permission needs a valid-customer server-side check |
| Cash and payments | Receive payment, allocation, retry safety, Simple Entry and reconciliation | not-run |
| Historical BUG-0001 | Reproduce or disprove missing sales account mapping on this build; verify exact journal | not-run |
| Purchase and returns | Bill/receipt/payment, stock valuation, return/reversal | not-run |
| Security and data safety | Two real tenant fixtures, separate roles, cross-tenant denials, export/file isolation | not-run |
| Retired ops tools | Explicitly review inherited health/reset/audit scenarios against the product decision | not-run |

The initial sequence is identity and retired-surface checks, then a synthetic company setup, then one complete sales/payment/accounting journey before expanding to business profiles. Financial expected values must be calculated independently of BookOne code. Check saved state after reload and record created IDs privately for cleanup.

## Evidence and next action

- Passed business assertions: 0. Failed product assertions: 0. E2E denial assertions: 4 passed; anonymous login routes: 2 passed; authenticated Viewer Control Room denial: 1 passed. Catalog S-0019 remains blocked by auth-fixture setup. Viewer invoice write protection appears effective: the save produced no draft, and source review shows a write permission check. Error handling failed, producing a server-side application error. This is not release acceptance.
- Private evidence and created records: one synthetic Viewer account remains in the staging company. The newly created synthetic customer was archived and is absent from the active list. No draft, invoice, or financial transaction was created. The Viewer password is not stored in the public run record.
- Next: identify deployed image/build and schema/storage identity; confirm the Viewer permission contract and fix/retest BUG-0003. After dismissing the extension UI, retest BUG-0002 on that identified build using a valid synthetic customer; verify no draft exists. Continue with cross-tenant and first end-to-end business journeys. Review/replace obsolete inherited health/reset assertions before any broad-suite run.

