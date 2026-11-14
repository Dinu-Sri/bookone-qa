# WB-BANK — Banking, cashbook, imports and reconciliation

Generated from workflows/casebooks/WB-BANK.json. Edit JSON and run pnpm library:render. Revision 1; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-01, BP-02, BP-03, BP-04, BP-05. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-BANK.J01 — Cashbook income, expense and bank transfer

**Fixture:** BankA1000, BankB0; authorized business domain; no commercial invoice for simple income/expense.

Rules: BR-ACC-02@1, BR-ACC-07@1, RB-CONFIG-02@1. Retained tasks: B-116, E-105.

Entities: transactions, journalEntries, journalLines, accounts. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-BANK.J01.C01 — Simple income and expense

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: BankA1000.
- Action: Record service income200 then expense50.
- Expected: BankA1150; revenue200/expense50/profit150; no AR/AP unless explicitly selected accounting event.
- Independent numeric checks: bank cents: add(100000, 20000, -5000) = 115000.

### WB-BANK.J01.C02 — Transfer between banks

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: BankA1150, B0.
- Action: Transfer300 A to B.
- Expected: A850/B300; total1150; no income/expense; linked balanced transfer once.
- Independent numeric checks: bank conservation cents: add(85000, 30000) = 115000.

### WB-BANK.J01.C03 — Personal owner movement

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Business domain cash; owner injection100.
- Action: Record approved capital contribution.
- Expected: Cash+100/equity+100; no service revenue; legal entity/domain treatment reviewed.

### WB-BANK.J01.C04 — Commercial receipt duplicated as income

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Invoice200 already posted.
- Action: Receive through simple-entry route.
- Expected: Correct bridge/allocation or explicit disallow; cannot credit revenue a second time while leaving AR200 hidden.

### WB-BANK.J01.C05 — Invalid account or domain

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Foreign/inactive bank or personal domain selected.
- Action: Submit business transfer.
- Expected: Deny or require explicit supported interdomain accounting; no accidental tenant/domain mixing.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/record-entry.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/record-entry.ts)
- [apps/web/src/app/actions/cashbook.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/cashbook.ts)

## WB-BANK.J02 — Portable statement parsing and duplicate import

**Fixture:** Synthetic bank rows: opening1000, credit250, debit100, closing1150; no customer files.

Rules: BR-IMP-01@1, BR-ACC-03@1, RB-FILE-02@1. Retained tasks: F-101, F-102, F-103, F-104.

Entities: bankStatementProfiles, bankStatementImports, bankStatementLines, bankImportIssues. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-BANK.J02.C01 — Normalize known synthetic statement

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: CSV/XLSX/PDF support verified separately; explicit mapping/sign conventions.
- Action: Preview and import rows250in/100out.
- Expected: Two normalized lines; close1150; import alone not duplicate ledger income/expense; source hashes/profile version retained.
- Independent numeric checks: statement close cents: add(100000, 25000, -10000) = 115000.

### WB-BANK.J02.C02 — Same file and same rows twice

- Type: retry; execution: **not run**; adapter: **unbound**.
- Given: First import accepted.
- Action: Reupload same bytes then same rows reordered.
- Expected: Declared per-account duplicate identity prevents second accepted bank lines/postings; row/file decisions visible.

### WB-BANK.J02.C03 — Invalid date

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Rows29Feb2025 or31Apr2026; valid29Feb2024 control.
- Action: Preview import.
- Expected: Reject impossible dates; preserve valid leap-date control; no JS date rollover invention.

### WB-BANK.J02.C04 — Ambiguous sign and amount

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Debit/credit columns conflict or amount1,2.3.
- Action: Preview with declared locale.
- Expected: Actionable mapping/validation block; no silent sign/cents fabrication; stored raw/private evidence not published.

### WB-BANK.J02.C05 — Same row in another account

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: BankA/B legitimately share date/amount/reference.
- Action: Import into B.
- Expected: Account/tenant-specific identity does not discard B line merely because A already has same visible text.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/statement-import.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/statement-import.ts)

## WB-BANK.J03 — Match, partial/group allocation and missing entry

**Fixture:** Bank inflow250; book receipts100 and150; separate unmatched charge20; no tax.

Rules: BR-IMP-01@1, BR-ACC-02@1, BR-ACC-04@1. Retained tasks: F-105, F-113.

Entities: bankReconciliationCases, bankReconciliationCaseBankLines, bankReconciliationCaseBookTransactions. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-BANK.J03.C01 — One bank to many book

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Bank250; book100+150.
- Action: Confirm approved group match.
- Expected: Matched250 exactly; no new income/cash journal from matching existing entries; audit links all three.
- Independent numeric checks: group cents: add(10000, 15000) = 25000.

### WB-BANK.J03.C02 — Many bank to one book

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Bank100+150; book250.
- Action: Confirm supported group match.
- Expected: No duplicate book allocation; all matched once; total250 both sides.

### WB-BANK.J03.C03 — Mismatch

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Bank250; candidate books100+140.
- Action: Attempt confirm group.
- Expected: Reject unexplained10 difference or require separately approved adjustment; no silent balancing entry.

### WB-BANK.J03.C04 — Create missing bank charge

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Bank debit20 missing in books.
- Action: Create approved bank-fee expense20.
- Expected: Dr bank fee20 Cr bank20 once; reconcile created transaction; retry does not create second fee.

### WB-BANK.J03.C05 — Undo match

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Previously matched250.
- Action: Undo matching decision.
- Expected: Restore unmatched status/links as contracted; original book receipt250 remains; undo match is not reversal of actual money.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/bank-reconciliation.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/bank-reconciliation.ts)
- [apps/web/src/app/actions/statement-import.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/statement-import.ts)

## WB-BANK.J04 — Outstanding items, reconciliation close and period lock

**Fixture:** Books bank1000; statement900; deposit in transit100; one unreviewed case initially.

Rules: BR-ACC-07@1, BR-ACC-06@1, BR-IMP-01@1. Retained tasks: F-105, B-111.

Entities: bankReconciliationSessions, bankReconciliationOutstandingItems, periodLocks. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-BANK.J04.C01 — Outstanding bridge

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Bank statement900, legitimate deposit in transit100.
- Action: Mark item still waiting with evidence and reconcile.
- Expected: Adjusted bank1000 matches book1000; outstanding100 carried with identity/date; no fake income100.
- Independent numeric checks: adjusted bank cents: add(90000, 10000) = 100000.

### WB-BANK.J04.C02 — Unreviewed cases block finish

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: One needs_review case remains.
- Action: Attempt finish session.
- Expected: Explicit block; no completed snapshot or implied period acceptance.

### WB-BANK.J04.C03 — Waiting decision required

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Outstanding candidate exists but not confirmed still waiting.
- Action: Attempt finish.
- Expected: Require actual decision; merely classifying outstanding does not finish review.

### WB-BANK.J04.C04 — Lock after completion

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Reconciled October accepted under policy.
- Action: Lock period then attempt datedOctober posting.
- Expected: Authoritative lock denies new posted mutation; reconcile snapshot preserved; unlock authority/reason separately enforced.

### WB-BANK.J04.C05 — Reopen

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Completed session with carried100.
- Action: Authorized reopen/change decision.
- Expected: New attributable state/history; previous snapshot retained; no duplicate carried item next period.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/bank-reconciliation.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/bank-reconciliation.ts)
- [apps/web/src/app/actions/reconciliation.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/reconciliation.ts)

## WB-BANK.J05 — Import cancellation, transfer matching and account privacy

**Fixture:** Own and foreign bank accounts; synthetic import2 rows; supported account transferA→B300.

Rules: BR-IMP-01@1, BR-SEC-01@1, BR-ACC-03@1. Retained tasks: F-102, F-104, F-106, F-115.

Entities: bankStatementImportEvents, bankReconciliationEvents, bankStatementLines. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-BANK.J05.C01 — Transfer pair

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: BankA-300 and BankB+300 correspond to same actual transfer.
- Action: Confirm transfer case.
- Expected: One transfer accounting effect300; two statement sides matched; no income/expense600 or second cash movement.

### WB-BANK.J05.C02 — Void imported file

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Import has matches and a created fee20.
- Action: Use supported void workflow.
- Expected: Explicitly preserve/undo linked creations according to policy; never silently erase unrelated posted money; audit remains.

### WB-BANK.J05.C03 — Interruption retry

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Isolated import fails after some durable boundary.
- Action: Retry same accepted identity.
- Expected: Atomic rollback or declared resumable state; no duplicated rows/fees or false whole-batch success.

### WB-BANK.J05.C04 — Foreign account export

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Known tenant B import/report exists.
- Action: Export as A with own export positive.
- Expected: Foreign denied; no original bank bytes/metadata or signed URL exposure.

### WB-BANK.J05.C05 — Formula-like memo

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Inert memo begins =1+1 or HTML-like text.
- Action: Preview/render/export.
- Expected: Safe text handling; no spreadsheet execution on supported export; file/row errors bounded and nonsecret.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/bank-reconciliation.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/bank-reconciliation.ts)
- [apps/web/src/app/actions/statement-import.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/statement-import.ts)
