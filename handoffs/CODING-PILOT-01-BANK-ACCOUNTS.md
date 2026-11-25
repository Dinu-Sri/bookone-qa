# Pilot-01 — bank permissions, reporting integration and business availability

**Expanded owner-authorized implementation scope:** read CODING-COA01-FULL-CHART-OF-ACCOUNTS.md entirely. It is now the canonical complete implementation mission, including company-created accounts and bank/advance workflows. The reproduced failures below remain mandatory regression inputs; delivering only these bank fixes does not complete COA-01.

19 November2026UTC. Exact product9ed27aad107d37108ac5d9ac491b43ee3e83b88d/v2.11.4 in clean detached work/product. This is a QA repair handoff, not authorization to merge/deploy. Existing pilot acceptance request remains outstanding. Owner deploys.

## Reproduced independent failures

Tests tests/runtime/pilot-bank-permissions.test.ts and pilot-bank-reporting.test.ts run actual product functions. Final9 checks:4 positive controls passed,5 negative/outcome expectations failed. No live unauthorized write or live wrong balance claimed.

### P1: bank mutations omit a server write-permission boundary

apps/web/src/app/actions/cashbook-banks.ts createCashbookBank/renameCashbookBank/archiveCashbookBank requireTenantContext and tenant scope, but do not assert authorized account/settings write access. Independent recording-DB tests pass a valid tenant-bound Viewer context. Each action returns ok:true and reaches one recorded insert/update, expected refusal and0writes. Each action's Owner control succeeds against the same adapter, so refusal checks are not passing through broken mocks. Real non-owner PostgreSQL/Next authorization outcomes still need qualification.

Repair all three actions using the authoritative current jobs/permissions/module ceiling and tenant/dimension rules. Do not hardcode only role strings or hide buttons as the fix. Test Viewer/denied/Owner/allowed staff, foreign account ID, revoked membership and module/domain access on real runtime/database paths. Scope the suitable account-management permission in the documented catalog; do not grant everyone settings write. Preserve existing data and audit each allowed change.

Also test code allocation concurrency and duplicate normalized names. Current create allocates next code by select-then-insert; do not claim a proven duplicate from this source observation. Archive must preserve historic postings and prevent inappropriate use of archived accounts. Decide and document whether nonzero/reconciliation/open-use banks can be archived; do not erase history.

### P1: valid custom bank omitted from dashboard cash/bank

Actual source allocates new bank codes1101–1199. packages/accounting/src/dashboard-metrics.ts SPENDABLE_CASH_CODES contains only1000/1100; cash universe inherits fixed1000/1100/1200. Independent balanced fixture Dr1101=300/Cr3000=300 gives spendableCashFromRows=0 instead of300. Default1100 positive control returns300.

Use a maintained authorized account classification/mapping shared across bank selection, cash book, dashboard, cash-flow, balance sheet and bank reconciliation. Do not fix only one card or assume every asset is cash. Preserve card-clearing separation and currency rules. Audit all fixed-code consumers and include legitimate custom bank/card ranges or metadata according to the supported model. No account renumbering or rewriting historical journals.

### P1: internal transfer to a custom bank misclassified as external outflow

Independent balanced fixture Cr1100=100/Dr1101=100 in the same journal yields externalCashFlow.moneyOut100, expected0. It is money transferred between the company's own liquid accounts, not an external payment. Reconcile external flow classification and total movement/opening/closing across the same complete account universe. Test the reverse transfer, cash→custom bank, custom→custom, card settlements, funding, actual external payments and mixed journals without double counting.

## Live business UI gap

Actual /accounts on v2.11.4 shows grouped account balances with no create/edit interface. Attempting /cashbook/settings from the current full business company redirects to /. Source CashbookSettingsPage explicitly excludes entities outside the personal shell. Thus Add bank exists in personal Cashbook, not an available company account-management experience.

Provide an authorized business-company route to add/manage supported bank accounts, consistent with existing BookOne navigation and UI conventions. Reuse one server implementation and shared classifications; don't create parallel bank lists that diverge from the ledger or reconciliation pickers. Ensure the default business company can select a new bank in relevant receipt/payment/transfer and reconciliation flows. Preserve personal Cashbook behavior.

The owner has now explicitly requested the full Chart of Accounts feature. Implement the guided account manager, all required integrations and advance workflows under the complete COA-01 contract, including protected controls, classification/mappings, permissions, historical integrity, opening/import/export, bank reconciliation, independent tests and recovery. A named advance account alone is not an allocation/settlement workflow. Tax behavior still requires the approved company/rule contract; do not invent it.

## Acceptance

- Original independent expectations become green without weakening amounts/refusals.
- Actual business Owner creates an isolated synthetic bank; authorized staff/read-only restrictions proven at server layer. Exactly one account under retry/concurrency as supported. Original company unchanged.
- Real synthetic balance/transfer receipts reconcile account balances, cash totals, flow classifications, trial balance, dashboard and matching reports with custom accounts.
- New account usable in intended forms/reconciliation; archived account preserves historical reports and cannot be selected for new postings as policy requires.
- Run original package regressions, real PostgreSQL/Next tests, relevant UI/permission/financial CoreGuard checks and screenshots. Existing577passed2skipped is baseline, not sufficient coverage of these failures.
- Current source/recording tests do not replace live persistence proof; no launch acceptance until independent current-build regression, reconciliation and recovery LAST complete.

Reproducer from QA checkout after exact product dependency installation:

    node work/product/packages/agent-bridge/node_modules/vitest/vitest.mjs run --config vitest.pilot-review.config.mjs

Original failures and harness corrections retained in .local/pilot, excluded from public Git. Product code unchanged. No financial intent or company/master/grant/settings mutation on staging. Publish candidate/CI and owner deployment handoff; QA then prepares a new current-date remaining-only run. Never replay historical transactions or consumed old missions.
