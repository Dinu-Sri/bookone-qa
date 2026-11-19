# COA-01 — complete company Chart of Accounts and account-use integration

Owner request:19 November2026. Implement this complete mission through schema/services/UI/integrations/tests/docs and a reviewable PR. This supersedes the bank-only implementation boundary in CODING-PILOT-01-BANK-ACCOUNTS.md. That file's reproduced defects and unchanged independent assertions remain mandatory acceptance inputs. Do not stop at an account list, an Add bank dialog or a feature plan.

Read current AGENTS.md, QA_CHANGE_CONTRACT, versioning and UI/UX guides. Start a clean feature branch from current master, record exact base, preserve unrelated work, use normal change records/TASK_LOG/PROJECT_STATUS. Owner deploys; do not merge or deploy. Do not change real company accounting configuration, replay old QA transactions, regenerate signing keys or enable agent posting.

## Scope and expected outcome

Every business company can maintain its own chart of accounts safely, add another bank or an appropriate advance account, use it in supported workflows and see correct reconciled balances/reports. Implement all five root classes: Assets, Liabilities, Equity, Income/Revenue and Expenses, including appropriate subtypes, contra accounts, group accounts, posting accounts and reporting mappings. Preserve personal Cashbook and current business workflows.

Full in this mission means a complete usable local-currency company account lifecycle and the required bank/advance integrations below. It is not authorization to silently add FX revaluation, consolidation, tax advice, a payroll engine, automatic depreciation or unrestricted AI journals. Account types for fixed assets, accumulated depreciation, loans, tax etc. can exist without claiming their separate automation engines are implemented. State those boundaries explicitly; do not hide missing required bank/advance functionality behind them.

## 1. Source audit and implementation contract

Before implementation, inventory account schema/seeding, existing CoA packs, inference/category mappings, all hardcoded account codes/ranges, liquid-account selectors, reports, journal and commercial posting builders, advances/overpayments, bank import/reconciliation, inventory/POS/rental controls, permissions, archive/import/export and AgentBridge lookups. Record direct and transitive consumers and relevant rule IDs in the change record.

Read the single canonical QA rulebook from bookone-qa. Record exact rulebook SHA/version/hash and relevant BR-ACC-01–08, BR-SEC-01/02, BR-DAT-01/03, RB-PAY-02, RB-ACC-01, RB-INV-04 and archive rules. Intended contracts and independent worked examples define expectations, not the current implementation alone. Existing legal/expert-pending limits stay visible. Resolve any material policy conflict explicitly before changing posting behavior; do not invent Sri Lankan tax treatment.

Publish docs/CHART_OF_ACCOUNTS.md with schema/metadata, subtype-to-statement mappings, protected roles, supported account-use matrix, transition/archival rules, concurrency/idempotency contract, worked bank/advance examples and upgrade compatibility. Make routine implementation decisions autonomously and complete all nonblocked work. A policy ambiguity must not result in invented monetary behavior.

## 2. One authoritative account model

Extend existing ledger accounts with additive, backward-compatible migrations as genuinely needed. Avoid a second bank/account database disconnected from journal accounts.

Required concepts:

- Tenant/company ownership, stable immutable account ID, unique normalized company code, name, optional description and parent/group.
- Root class and validated subtype/purpose; examples include cash, bank, card clearing, receivables, supplier/staff advances, inventory/fixed assets, payables, customer advances/deferred income, refundable deposits, tax controls, loans, equity, sales/returns, COGS and operating expenses.
- Normal debit/credit side derived consistently from class and explicit contra classification. Do not allow arbitrary combinations that make reports wrong. Preserve existing normal-side/report sign semantics.
- Group/nonposting versus posting account. No postings to group headings; no orphan parents, cross-company parents, cycles or incompatible parent classes. Group rollups sum descendants exactly once.
- Statement/report mapping, cash-flow classification, liquidity/tender eligibility, reconciliation eligibility, control-account role, system/custom marker, active/archive status, audit/version information and applicable book-domain/module scope.
- Company/base currency and any existing permitted account-currency metadata. Do not sum mixed currencies or imply FX support where absent.

Use semantic role/classification metadata as the durable source for financial behavior. Codes are company identifiers, not a growing collection of hardcoded numerical assumptions. Preserve existing seeded IDs/codes and map them safely without rewriting journals. Valid existing custom1101–1199 banks must migrate into the correct classification. Handle legacy ambiguous data through a report/review path, not guesses or silent destructive remapping.

Keep mandatory posting roles mapped deterministically for AR/AP, VAT, inventory/GRNI/COGS, clearing, sales/returns, equity, advances and other enabled module controls. Prevent a company from saving incomplete or conflicting mappings required for its enabled workflows. Do not allow the same account to serve incompatible roles. Never require unused modules' controls merely to add a bank.

## 3. Lifecycle, concurrency and historical integrity

- Create: guided template/subtype, safe suggested code, optional authorized manual code, duplicate normalization checks and database-backed uniqueness under concurrent creation. Safe idempotent retry must produce one account and a truthful receipt.
- Edit: optimistic concurrency, clear validation and useful audit diff. Cosmetic rename/description edits must not mutate journal amounts or historical source snapshots. Define whether reports show current name and how original posted labels remain available.
- Class/subtype/normal side/currency/control-role changes: tightly guarded before first use; block unsafe changes after postings, allocations, bank imports/reconciliation, module references, children or other dependencies. Do not silently reclassify historical statements. An authorized reclassification uses explicit auditable accounting adjustments/mappings/effective dates under the approved contract.
- Code changes: stable IDs remain the reference. Allow only a safe documented policy; preserve historical aliases/snapshots and prevent collision. Never create a second account as an implicit rename.
- Archive/reactivate: block unsafe closure with a nonzero balance, unresolved items, active references or outstanding advance allocations. Provide a specific reason and drill-down. An archived account remains in historical reports and cannot accept new postings or appear as a new tender. Reactivation is authorized and audited. No hard deletion of used accounts. No merge/delete that destroys history.
- System/control accounts: visible, clearly marked and protected from destructive edits/archive or direct manual use that bypasses a subledger. Use dedicated configured workflows for control postings. Owner role does not bypass accounting invariants or locked periods.
- Every write commits account/mapping/audit changes atomically; failures leave no orphan mapping or partial role assignment. Validate at service and database boundaries, not only forms.

## 4. Business UI and account management

Provide a proper Accounting → Chart of Accounts experience (preserve /accounts links). Optional Company → Accounting settings holds protected posting mappings; do not duplicate editable account stores/forms.

Use existing BookOne design system. Include search, root-class/subtype/status filters, group/tree and readable list views, code/name/type/group/status/balance columns, clear New account button, row actions, account details and ledger drill-down. Respect reporting date/dimensions/currency. Loading, empty, error, save success and conflict states must be explicit. Forms retain user input after refusal. No false success toast.

New account wizard uses business terms:

- Bank account / Cash or petty cash / Card clearing.
- Supplier advance / Staff advance / Customer advance.
- Expense / Income / Other asset / Liability / Equity, with sensible subtypes and reporting explanations.
- Group account where needed; show examples and preview the financial-statement destination. Do not make inexperienced users choose an unexplained debit/credit normal side.

Bank details such as display name, optional institution/last digits and reconciliation setup should be separate from payment credentials. Mask sensitive identifiers, avoid storing unnecessary data, never ask for bank login/passwords and never imply this creates a real bank account.

Both business and personal users can manage the supported accounts for their entity type under correct permissions. Fix the current /cashbook/settings business redirect problem by providing the appropriate business route, not by forcing business users into a personal shell. All navigation/list/tile/sidebar modes, narrow viewports,200% zoom, keyboard/focus, touch and screen readers must work. Keep the compact DB-02 dashboard separate; no new tables crammed onto its overview.

## 5. Banks, cash and reconciliation — complete integration

Repair all existing create/rename/archive permission omissions in cashbook-banks.ts. One authoritative service should handle personal/business bank actions, aliases and direct API/server actions.

Every legitimate active bank must be selectable in applicable receipts, vendor payments, cash purchases, expenses, transfers, POS settlements as supported, bank-statement imports and reconciliation. Return only current-company authorized tender accounts; income, AR and other nonliquid assets must not become tenders. Archived/foreign/denied accounts are refused server-side even if IDs are forged.

Include all eligible custom banks in cash/bank balances, opening/closing cash reconciliation, dashboard series, cash-flow reports, account ledgers, trial balance and statements. Keep unsettled card clearing and genuinely restricted funds distinguished. Transfers between owned liquid accounts are internal movement, not revenue, expense or external cash flow. No double counting or omission.

Mandatory independent regression examples from Pilot-01:

- Dr custom bank1101=300 / Cr equity3000=300 → cash and bank300, not0.
- Cr default bank1100=100 / Dr custom bank1101=100 in one journal → external outflow0 and total cash unchanged.
- Reverse/custom-to-custom/cash-to-bank/card settlement/funding/actual external payment and mixed-journal cases reconcile independently.

Verify bank import account binding, duplicate handling, opening/closing statement totals, reconciliation unmatched items and permitted closure behavior. Merely making a new account appear in a dropdown is insufficient.

## 6. Advances and unapplied money — real workflows, not just account names

Provide explicit supported flows linked to parties/staff, accounts and source records. Reuse/extend existing allocation/idempotency services; never make an invoice negative to represent overpayment. Keep per-party outstanding balances reconciled to ledger controls, with dates, sources, allocations, reversals and full audit history.

Customer advance:

- Receive money before an invoice/performance through the approved advance workflow into the correct liability/unapplied control, not automatically sales revenue.
- Apply all or part to eligible customer documents through explicit allocations, preserving receipt history and correct settlement/revenue separation. Return unused balance through an explicit linked refund.
- Example in a deliberately non-VAT synthetic fixture: receive1000 advance, apply400 to an eligible400 invoice → invoice settled400, customer advance remaining600. No duplicate revenue on application; no negative invoice balance. Reject over-application/refund or wrong customer/company.

Supplier advance:

- Pay a supplier advance into the proper asset/prepayment control; apply it to eligible posted bills without paying the bank twice. Return unused amounts through a linked supplier refund.
- Non-VAT example: pay1000 advance, apply400 to a400 bill → AP settled400, supplier advance asset600. Reconcile the supplier subledger and bank/ledger balances independently.

Staff advance:

- Issue an accountable staff advance to an identified authorized staff/party record. Record approved expense settlement and unused-money return with attachment/source links, approval and an outstanding balance. Do not invent a payroll deduction engine.
- Non-VAT example: issue1000, approve expense settlement400, receive unused cash100 → advance outstanding500; expense400; cash net out900. Each action posts once and is traceable. Reject duplicate claims, cross-person allocation, over-settlement and unauthorized approvals.

VAT/time-of-supply and expense recognition for advances must follow the existing approved company/jurisdiction profile and canonical rules. The examples above deliberately test non-VAT mechanics; do not extrapolate them to taxable advances. Implement supported tax paths only with explicit sourced contract/worked examples. Refuse unsupported tax/transaction combinations clearly before posting rather than silently ignore tax or invent legal rules. Distinguish refundable deposits from customer advances and earned income.

Include partial/multiple allocations, overpayment split into settlement+advance where explicitly supported, reversals, source cancellation, stale versions, concurrency and interrupted-response recovery. Uncertain financial outcomes must be queried/reconciled before retry. No blind retry, destructive balance editing or unsupported backdated allocation after locks.

## 7. Opening balances, import and export

Provide a controlled opening-balance process for authorized users: chosen effective date, independently balanced preview, explicit source/references, existing-period/duplicate guards and one auditable posting. Creating an account defaults its balance to zero; do not let a name/type form silently create equity or journal entries. Existing new-company opening/import logic must remain consistent.

Chart CSV/template import supports dry-run validation, row-specific errors, normalized duplicates, parent resolution/cycles, type/subtype/control mapping, stable matching and explicit conflict rules. Separate chart metadata import from monetary opening-balance import. Protect system controls and tenant ownership; retry cannot duplicate accounts/postings. Safe exports avoid spreadsheet formula injection and include authorized columns only.

Export the chart/ledger under current permissions and preserve all metadata, hierarchy, mappings, advance records/allocations and source links through company backup/restore. Additive migration and restore compatibility required; retain original tenant isolation and empty-target rules.

## 8. Reports, dimensions and business-module consumers

One classification/role service feeds account selectors, inference, P&L, balance sheet, trial balance, account ledger, cash flow, dashboard, AR/AP/advance reconciliation and exports. Root/subgroup rollups include custom accounts once. Contra accounts/signs and current-year earnings remain correct. Do not misclassify all assets as cash or all income as sales.

Enforce existing company/book-domain/location/brand/job scope consistently. Do not invent per-location balance allocation where history lacks it; present a truthful restriction or reconciliation distinction. Historical cutoff reports use allocations effective at cutoff and do not leak future settlements.

Audit purchases/sales/returns/credits, stock/GRNI/COGS, POS/card clearing, rentals/deposits and expense inference for hardcoded codes. Preserve those workflows and source history. A general CoA must not let an arbitrary customer account replace a stock/tax control without a valid mapping.

## 9. Permissions, audit and AI integration

Use explicit authoritative permissions for account read/create/edit/archive, protected mapping administration, opening-balance import, advance issue/apply/refund/approve and export as appropriate. Reuse the catalog conventions; test Owner, Accountant/allowed staff, Viewer, denied/revoked membership and cross-tenant attempts. Do not equate membership with write access. UI visibility never replaces server authorization.

Preserve separation of staff expense approval, financial posting and agent capability boundaries. Add audit events with actor, before/after metadata, source/receipt, timestamp and correlation/idempotency information; redact secrets and unnecessary bank identifiers.

Existing AgentBridge read/upload/draft grants must not gain account creation, mapping changes, advances, payments or arbitrary journals. Update authorized account lookup/policy mapping so agents can see valid permitted choices. If account-management tools are added, they require explicit separate scope/grant/confirmation; otherwise document that account creation is human UI only. Do not expand existing unpaid-service-bill operation claims or auto-approve agent writes.

## 10. Mandatory QA and release gate — CoreGuard COA-01

Implement meaningful tests and mandatory CI integration, retaining existing quality/CoreGuard gates. The existing package suite577passes does not cover the reproduced failures. Add original Pilot-01 tests unchanged plus:

- Real HTTP/server-action + non-owner PostgreSQL/RLS permission matrix with zero persisted side effects on refusal. Recording/memory tests are useful but not this proof.
- Each root/subtype, hierarchy validation, groups/nonposting, protected controls, create/edit/rename/archive/reactivate, optimistic conflict and concurrent code/name creation. Original IDs/postings retained.
- New custom banks used by actual synthetic transactions/transfers/import/reconciliation. Independently compute balance/flow/statement/dashboard/report oracle totals; verify current/historic cutoffs and archives.
- All three advance workflows above end to end: partial allocations, invoices/bills/approved staff expenses, unused returns, refund/reversal, duplicates, race/lost response, wrong party/company and locked-period refusals. Actual ledger+subledger reconciliation required.
- Opening balance balanced/unbalanced preview, one-time submit, duplicate import, transaction rollback, CSV errors and formula-safe export; no direct balance editing.
- Existing customer/vendor/stock/POS/rental/tax/AgentBridge regressions remain green; current scopes do not gain new authority. Unsupported tax/currency flows are visibly refused before writes.
- Actual business Owner UI and authorized staff/read-only views, personal Cashbook compatibility, all selectors, keyboard/accessibility, responsive screenshots and failure/input-retention states.
- Upgrade fixture with seeded+custom+archived/used accounts, source labels/mappings, grants and balances preserved. Restore LAST into a fresh isolated empty target: exact chart metadata, journals, bank reconciliation, advance allocations and original attachment bytes/links verified; source unchanged.
- Exact product/QA/dependency versions, schemas, fixture/oracle and actual executed evidence. No mock-only/source-contains claim of live acceptance. Skipped/blocked real-DB/client/recovery checks stay explicit and block relevant readiness claims.

Use isolated synthetic data; never replay consumed Mission/CONT/POS/AgentBridge actions or test financial writes against the owner's existing company. No data deletion/reset or live restore. Keep failure evidence and unchanged expected answers; don't alter oracles to make a changed implementation pass.

## 11. Delivery and completion standard

Deliver the complete supported feature and integrations above in one coherent reviewed candidate, not a bank-only patch labelled full CoA. Internally stage the work if useful; complete all required supported paths before the final handoff. If a genuine policy/external dependency blocks a path, finish all independent work and report the exact boundary; do not silently omit required functionality or invent its rules.

Provide: exact base/head/version/CI; additive migrations/indexes and compatibility assessment; updated account/advance and operator guides; canonical rule references; permission matrix; seeded/custom role-mapping migration report; independent worked examples; test results and actual screenshots; rollback/recovery plan; known limits and owner Portainer deployment steps. Product code must follow version/change-record policy. No secrets/raw customer evidence in public artifacts.

Independent QA reviews the exact candidate, owner deploys, then QA runs a fresh current-date remaining-only pilot qualification. CI green and code delivered do not equal real-business launch approval. Pilot/agent financial acceptance and isolated recovery remain required; all prior QA data and grants preserved.
