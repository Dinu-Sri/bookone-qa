# WB-SVC — Service businesses

Generated from workflows/casebooks/WB-SVC.json. Edit JSON and run pnpm library:render. Revision 1; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-03. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-SVC.J01 — Quote, order, delivered service and invoice

**Fixture:** Service3 hours@200; delivered before invoicing; no VAT; cash0; no stock.

Rules: BR-SAL-01@1, BR-SAL-02@1, BR-STK-03@1, RB-SAL-01@1. Retained tasks: B-101, B-102.

Entities: businessDocuments, businessDocumentLines, parties. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Advance/milestone recognition requires a separately reviewed capability and accounting policy; completed service golden path does not certify it.

### WB-SVC.J01.C01 — Quote and order

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: No trading.
- Action: Quote3x200, convert to order.
- Expected: Total600 copied with source links; no AR/revenue/cash/COGS/stock.
- Independent numeric checks: service cents: mul(3, 20000) = 60000.

### WB-SVC.J01.C02 — Post delivered work

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Order for completed service600.
- Action: Convert once to posted invoice.
- Expected: DrAR600 Cr service revenue600; no inventory/COGS; source order linked; AR600.

### WB-SVC.J01.C03 — Duplicate conversion

- Type: retry; execution: **not run**; adapter: **unbound**.
- Given: Order already fully converted.
- Action: Convert again or double click.
- Expected: Deny extra conversion; one accepted invoice600; source remaining0.

### WB-SVC.J01.C04 — Draft with invalid percent

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Draft quote line100 with percent150.
- Action: Save/convert through actual action.
- Expected: Explicit reject excessive discount; no silent cap or conversion; original valid draft remains.

### WB-SVC.J01.C05 — Future undelivered service

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Work scheduled next month.
- Action: Invoice now.
- Expected: Billing support and revenue recognition reviewed separately; advance must not be assumed earned; deferred-policy gap remains explicit.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-SVC.J02 — Partial collections, credit and customer refund

**Fixture:** Completed service invoice600; bank0; expense/stock0; refund capability reviewed.

Rules: BR-SAL-02@1, BR-ACC-02@1, RB-PAY-02@1. Retained tasks: B-103, B-104, B-105.

Entities: businessDocuments, settlementAllocations, transactions. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-SVC.J02.C01 — Collect250 then350

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: Invoice600 unpaid.
- Action: Receive250, then350.
- Expected: AR350 then0; bank600; revenue600 once; two persisted allocations and receipts.
- Independent numeric checks: collections cents: add(25000, 35000) = 60000.

### WB-SVC.J02.C02 — Credit100 after receipt250

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: AR350/bank250.
- Action: Post linked approved service credit100.
- Expected: AR250; bank250; net revenue500; no inventory or cost effects.
- Independent numeric checks: remaining AR cents: sub(35000, 10000) = 25000.

### WB-SVC.J02.C03 — Credit paid invoice

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Separate invoice600 fully paid.
- Action: Issue approved credit100.
- Expected: Bank600 unchanged until refund; customer credit100 explicitly represented; original receipt retained.

### WB-SVC.J02.C04 — Refund customer credit

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Available customer credit100.
- Action: Refund100 using permitted liquid account.
- Expected: Bank500; customer credit0; net revenue500; refund links credit and original receipt; no second expense/revenue.
- Independent numeric checks: bank after refund cents: sub(60000, 10000) = 50000.

### WB-SVC.J02.C05 — Overpayment or overrefund

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: AR250 or credit100.
- Action: Attempt receipt300 or refund101.
- Expected: Reject or explicitly route to supported reviewed advance; never silently allocate excess; no unlinked cash.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)
- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-SVC.J03 — Service discounts, tax and rounding

**Fixture:** Completed services; deterministic cents; ordinary no-tax fixture unless explicitly selecting synthetic tax profile.

Rules: BR-SAL-03@1, RB-LK-03@1, BR-DAT-01@1. Retained tasks: B-114, E-109.

Entities: businessDocumentLines, salesSettings, taxProfiles. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Tax rate is a synthetic parameter here. Legal applicability, inclusive mode and mixed tax support remain separately expert/capability reviewed.

### WB-SVC.J03.C01 — Line and header percent

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: 3x100; line10%; header5%; tax0.
- Action: Preview, save, post, reload and print.
- Expected: Gross300; line discount30; net270; header13.50; final256.50 everywhere.
- Independent numeric checks: discounted cents: sub(30000, 3000, 1350) = 25650.

### WB-SVC.J03.C02 — Half-cent tax tie

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Synthetic reviewed rate18%; net100.05; exclusive.
- Action: Calculate/post with independent rounding.
- Expected: VAT18.01; total118.06; reversal exactly118.06. This is arithmetic coverage, not statutory eligibility.
- Independent numeric checks: total cents: add(10005, 1801) = 11806.

### WB-SVC.J03.C03 — Inclusive synthetic price

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Explicit supported inclusive gross1180 at synthetic18%.
- Action: Post inclusive service.
- Expected: Net1000; VAT180; total1180; no adding tax to1180 again; unsupported inclusive mode blocks.
- Independent numeric checks: inclusive total cents: add(100000, 18000) = 118000.

### WB-SVC.J03.C04 — Discount bounds

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Line100.
- Action: Try percent-1,100,100.01 and fixed101.
- Expected: Reject negative/excess; valid100% gives net0 only if supported zero invoice contract; no negative tax/net.

### WB-SVC.J03.C05 — Settings changed during draft

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Saved draft600 under declared profile.
- Action: Change rate/discount defaults; reopen and post.
- Expected: Explicit snapshot/reconfirmation rule; posted historical600 is never recalculated silently.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-SVC.J04 — Service expenses, reimbursement and profitability

**Fixture:** Completed job revenue600; subcontractor cost200; cash1000; no inventory.

Rules: BR-ACC-02@1, BR-ACC-07@1, BR-STK-03@1, RB-ACC-01@1. Retained tasks: B-102, B-116, E-101.

Entities: businessDocuments, accounts, transactions, journalLines. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Job/milestone/reimbursement allocation support must be verified; ordinary company profit does not prove project costing.

### WB-SVC.J04.C01 — Subcontractor bill

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Service200 received from vendor.
- Action: Post service purchase expense200.
- Expected: Dr approved service cost200 CrAP200; no stock asset/quantity; job revenue600 not changed.

### WB-SVC.J04.C02 — Pay supplier and collect client

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Client600 unpaid; supplier200 unpaid.
- Action: Collect600 and pay200.
- Expected: Bank1400; AR/AP0; income600-expense200=profit400.
- Independent numeric checks: bank cents: add(100000, 60000, -20000) = 140000; profit cents: sub(60000, 20000) = 40000.

### WB-SVC.J04.C03 — Expense receipt linkage

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Synthetic receipt for200 exists.
- Action: Attach to own expense and reload.
- Expected: Authorized own attachment bytes/link retained; no additional journal from uploading.

### WB-SVC.J04.C04 — Pass-through reimbursement

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Expense100 intended to be rebilled to customer.
- Action: Use reimbursement option only if contracted.
- Expected: Principal/agent, tax and net/gross presentation require explicit policy; cannot silently treat all reimbursements as sales.

### WB-SVC.J04.C05 — Job dimension mismatch

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Job/brand A earns600, B incurs200.
- Action: Filter profit report by A then B.
- Expected: A does not absorb B cost unless explicit allocation; global profit400; scopes reconcile.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/record-entry.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/record-entry.ts)

## WB-SVC.J05 — Service cancellation, advance and recurring work

**Fixture:** Future service booking600; proposed advance200; no delivered service; no stock.

Rules: RB-ACC-01@1, BR-SAL-01@1, BR-DAT-01@1, RB-SAL-01@1. Retained tasks: B-108, B-113, B-117.

Entities: businessDocuments, transactions, salesSettings. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Advance, recurring and milestone capabilities/recognition are acceptance targets pending support/policy, not advertised implemented features.

### WB-SVC.J05.C01 — Advance expected accounting

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Reviewed advance capability selected; cash0.
- Action: Receive200 before work.
- Expected: Dr bank200 Cr customer advance liability200; earned revenue0. If unsupported, block rather than route directly to income.

### WB-SVC.J05.C02 — Apply advance after delivery

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: Delivered service invoice600; advance200.
- Action: Apply200 then collect400.
- Expected: Advance liability0; AR0; bank600; revenue600 exactly once; linked allocation/application.
- Independent numeric checks: bank cents: add(20000, 40000) = 60000.

### WB-SVC.J05.C03 — Cancel before delivery

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Advance200 held; no earned charge.
- Action: Cancel and refund under approved policy.
- Expected: Refundable200 returned; bank delta0; liability0; revenue0; cancellation/audit retained.

### WB-SVC.J05.C04 — Milestone contract

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Contract1000 split40%/60%.
- Action: Attempt two milestone invoices.
- Expected: Exactly400 and600 only if milestone capability/recognition supported; no duplicate full1000 per milestone; otherwise explicit unsupported.

### WB-SVC.J05.C05 — Recurring template

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Proposed monthly fee100 for three months.
- Action: Create repeated invoices via supported scheduling only.
- Expected: One100 per distinct period, total300; retries do not create extra period; do not claim a scheduler exists from manual duplication.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)
