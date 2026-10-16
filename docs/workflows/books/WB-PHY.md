# WB-PHY — Physical retail and wholesale

Generated from workflows/casebooks/WB-PHY.json. Edit JSON and run pnpm library:render. Revision 1; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-01. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-PHY.J01 — Create products, suppliers and stock opening

**Fixture:** Fresh physical tenant; no tax; each-unit SKU P; opening cash 10000 and equity 10000; no stock.

Rules: BR-STK-01@1, BR-STK-03@1, RB-INV-04@1, BR-AUD-01@1. Retained tasks: C-110, C-112.

Entities: inventoryProducts, parties, inventoryStockLevels, accounts. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J01.C01 — Opening quantity and value

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Opening stock zero; approved opening adjustment account.
- Action: Enter 10 units at 60 using supported opening flow.
- Expected: Quantity 10, inventory 600; approved opening-equity bridge 600; zero sales/COGS. Opening journal and movement share source.
- Independent numeric checks: opening value cents: mul(10, 6000) = 60000.

### WB-PHY.J01.C02 — Same SKU within tenant

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: SKU P already exists.
- Action: Create another active P.
- Expected: Apply declared uniqueness policy; no ambiguous duplicated SKU or overwritten existing stock. If uniqueness is not contracted, record policy gap before acceptance.

### WB-PHY.J01.C03 — Cross-tenant same SKU

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Tenant B independently owns SKU P.
- Action: Create P in tenant A with A permissions.
- Expected: A creation cannot resolve to B product; independent own IDs and balances; B unchanged.

### WB-PHY.J01.C04 — Wrong product class

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Service and digital products exist.
- Action: Attempt opening quantity through stock flow.
- Expected: Non-stock products cannot acquire physical stock or inventory asset through this flow.

### WB-PHY.J01.C05 — Opening versus repeat

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Opening document has saved.
- Action: Reload and re-submit its original accepted identity.
- Expected: No second opening movement/journal. Missing replay identity is a contract gap, not permission to double opening.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/inventory.ts)

## WB-PHY.J02 — Approve PO and enforce supplier invoice policy

**Fixture:** Vendor V; SKU P at 60; PO quantity10; approval and supplier invoice requirement enabled.

Rules: BR-PUR-01@1, BR-PUR-02@1, BR-SEC-02@1. Retained tasks: C-101, C-113.

Entities: businessDocuments, businessDocumentLines, purchaseSettings, parties. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J02.C01 — Nonposting purchase order

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: No AP or stock.
- Action: Save PO 10x60 then approve under authorized role.
- Expected: PO total600; no AP, stock or GL until supported receipt/bill transitions. Approval actor/time recorded.
- Independent numeric checks: PO cents: mul(10, 6000) = 60000.

### WB-PHY.J02.C02 — Pending or rejected bill

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Bill approval required.
- Action: Submit bill then reject.
- Expected: Pending/rejected stage does not capitalize or create AP; no payment eligibility; reason preserved.

### WB-PHY.J02.C03 — Supplier invoice mandatory

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Required invoice number enabled.
- Action: Post bill with empty reference.
- Expected: Deny without bill/journal/stock writes; error identifies missing reference.

### WB-PHY.J02.C04 — Duplicate sequential and parallel

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: First bill V/reference X posted600.
- Action: Submit same supplier/reference again sequentially and in parallel.
- Expected: At most one accepted reference under blocking policy; original600 and source links survive; second no monetary effect.

### WB-PHY.J02.C05 — Same reference different supplier

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: V/reference X exists; vendor W is distinct.
- Action: Post W/reference X with legitimate documents.
- Expected: Supplier-scoped duplicate policy does not conflate V and W; own AP600 each; tenant identity remains part of key.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-PHY.J03 — Partial receipt, partial bill and GRNI clearing

**Fixture:** PO10x60; postGrniOnReceipt on; stock0; AP0; GRNI0; authorized location A.

Rules: BR-PUR-01@1, BR-STK-01@1, BR-STK-02@1. Retained tasks: C-102, C-103, C-104.

Entities: businessDocuments, inventoryStockLevels, inventoryMovements, journalLines, purchaseSettings. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J03.C01 — Receive6 then bill4

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: PO10; empty stock.
- Action: Receive6; bill4 of received units.
- Expected: After receipt stock6/value360/GRNI credit360. Bill4 clears GRNI240 to AP240; final GRNI120; stock remains6/value360.
- Independent numeric checks: receipt cents: mul(6, 6000) = 36000; GRNI remaining cents: sub(36000, 24000) = 12000.

### WB-PHY.J03.C02 — Complete receipt and bills

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Prior state stock6/AP240/GRNI120.
- Action: Receive4; bill remaining6 across correct sources.
- Expected: Stock10/value600; AP600; GRNI0; received10/billed10; no duplicate capitalization.
- Independent numeric checks: AP final cents: add(24000, 36000) = 60000.

### WB-PHY.J03.C03 — Receive above remaining

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: PO10; already received4.
- Action: Attempt receipt7.
- Expected: Reject; remaining receive6. Stock4/value240 and all existing source links unchanged.

### WB-PHY.J03.C04 — Count GRN-sourced bill against PO

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: PO10; GRN4 billed via its GRN.
- Action: Open PO bill conversion and attempt7.
- Expected: Remaining bill6; descendant GRN bill4 included once; attempted7 denied; no second bill.

### WB-PHY.J03.C05 — Receive zero or negative

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: PO has remaining6.
- Action: Submit quantity0 or -1 using UI and actual action.
- Expected: Explicit validation; no header/movement/journal. Preserve pending user inputs.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-PHY.J04 — Direct bill and cash purchase without double stock

**Fixture:** P has no stock; no VAT; GRNI posting off; supplier invoice A for10x60; liquid bank available.

Rules: BR-PUR-01@1, BR-ACC-02@1, BR-STK-02@1. Retained tasks: C-102, C-106.

Entities: businessDocuments, inventoryMovements, transactions, settlementAllocations. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** GRNI-off timing must be independently reconciled for receipt-before-bill; do not assume an unposted receipt has already capitalized value.

### WB-PHY.J04.C01 — Direct physical credit purchase

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: No receipt or source bill.
- Action: Post credit purchase10x60.
- Expected: Stock10/value600; Dr inventory600 Cr AP600; cash0 delta; bill unpaid600.
- Independent numeric checks: purchase cents: mul(10, 6000) = 60000.

### WB-PHY.J04.C02 — Bill already received stock

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Receipt10 exists with declared GRNI-off model.
- Action: Bill source receipt10.
- Expected: Stock remains10; stock quantity is not added again. Inventory recognition and AP follow reviewed GRNI-off contract, not an invented clearing entry.

### WB-PHY.J04.C03 — Cash purchase

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Separate empty fixture; bank1000.
- Action: Post cash purchase10x60.
- Expected: Bank400; stock10/value600; no open AP600; one accepted stock and cash transaction.
- Independent numeric checks: bank cents: sub(100000, 60000) = 40000.

### WB-PHY.J04.C04 — Invalid tender

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Revenue, AP or foreign-tenant account chosen.
- Action: Attempt cash purchase600.
- Expected: Reject tender before any stock, cash, AP or audit CREATE effect.

### WB-PHY.J04.C05 — Supplier payment after cash purchase

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Cash purchase settled in full.
- Action: Attempt pay again from AP workflow.
- Expected: Deny or show no eligible remaining debt; stock10 and bank400 remain unchanged.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-PHY.J05 — Credit sale, partial receipt and customer return

**Fixture:** Opening stock10 at60; sell price100; tax off; cash0; customer C.

Rules: BR-SAL-02@1, BR-STK-02@1, BR-ACC-02@1. Retained tasks: C-105, B-103, B-104.

Entities: businessDocuments, inventoryCostLayers, settlementAllocations, journalLines. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J05.C01 — Sell two physical units

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Stock10/value600.
- Action: Post invoice2x100.
- Expected: AR200; revenue200; COGS120; stock8/value480; profit80; cash0.
- Independent numeric checks: COGS cents: mul(2, 6000) = 12000; profit cents: sub(20000, 12000) = 8000.

### WB-PHY.J05.C02 — Receive partial payment

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: Invoice200 unpaid.
- Action: Receive80 using supported bank.
- Expected: AR120; bank80; revenue200 and stock8 unchanged; allocation80 links receipt to invoice.

### WB-PHY.J05.C03 — Return one after partial payment

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Prior AR120/bank80; sold original cost60.
- Action: Credit one unit at original sale100 and cost60.
- Expected: AR20; revenue100; COGS60; stock9/value540; bank80; profit40; source sale and original-cost layer retained.
- Independent numeric checks: AR after credit cents: sub(12000, 10000) = 2000.

### WB-PHY.J05.C04 — Settle remaining20

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: AR20 after credit.
- Action: Receive20.
- Expected: AR0; bank100; net revenue100/COGS60/profit40; receipts80+20 retained, no second revenue.
- Independent numeric checks: bank cents: add(8000, 2000) = 10000.

### WB-PHY.J05.C05 — Return over sold remainder

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: One of original two units already returned.
- Action: Attempt additional return2.
- Expected: Deny; remaining returnable1; no third unit added or extra credit. Existing customer balance unchanged.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-PHY.J06 — Supplier return and vendor settlement

**Fixture:** Posted purchase10x60; stock10/value600; AP600; bank1000; no tax.

Rules: BR-PUR-01@1, BR-STK-02@1, BR-ACC-02@1. Retained tasks: C-106, C-107, C-113.

Entities: businessDocuments, inventoryMovements, settlementAllocations. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J06.C01 — Return2 to supplier

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Original10 remain in warehouse.
- Action: Post linked supplier return2.
- Expected: Stock8/value480; AP480 after approved120 credit; bank1000; no sales revenue.
- Independent numeric checks: remaining value cents: mul(8, 6000) = 48000.

### WB-PHY.J06.C02 — Pay remaining liability

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: AP480 due.
- Action: Pay480 to vendor once.
- Expected: AP0; bank520; stock8/value480 unchanged; remittance sourced from persisted allocation.
- Independent numeric checks: bank cents: sub(100000, 48000) = 52000.

### WB-PHY.J06.C03 — Repeat full return

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Separate fixture purchase4x60; all4 returned.
- Action: Request second full return of same source.
- Expected: Reject; stock0, total credited240 once; preserve original return and source.

### WB-PHY.J06.C04 — Return paid supplier bill

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Purchase600 paid; stock10.
- Action: Return2 then seek supplier refund120.
- Expected: Credit creates recoverable supplier balance120 until authorized refund; bank remains400 until refund; stock8. Refund support/policy must be explicit.

### WB-PHY.J06.C05 — Different vendor payment

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Bill belongs vendor V; vendor W selected.
- Action: Allocate W payment to V bill.
- Expected: Deny mismatch; no cross-party offset or cash movement.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-PHY.J07 — Variable cost, sale return and backdated receipts

**Fixture:** Product P; tax off; separate fixtures FIFO and moving average; receipts10@60 then10@80.

Rules: BR-STK-02@1, RB-INV-01@1, RB-INV-03@1, BR-DAT-01@1. Retained tasks: C-111, C-116.

Entities: inventoryCostLayers, inventoryCostLayerConsumptions, inventoryProducts, journalLines. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Statutory costing applicability and backdate/method-change migration require rule-owner/expert review. Last-cost implementation is not automatic statutory approval.

### WB-PHY.J07.C01 — Moving average issue

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: 20 units/value1400; unit average70.
- Action: Sell5 at100.
- Expected: COGS350; remaining15/value1050; revenue500/profit150.
- Independent numeric checks: opening value cents: add(60000, 80000) = 140000; average issue cents: mul(5, 7000) = 35000.

### WB-PHY.J07.C02 — FIFO issue

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Same opening receipts; FIFO policy.
- Action: Sell5 at100.
- Expected: Consume5 of60 layer; COGS300; remain5@60+10@80=value1100; profit200.
- Independent numeric checks: remaining FIFO cents: add(30000, 80000) = 110000.

### WB-PHY.J07.C03 — Return after master-cost change

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: FIFO sale cost60; master cost now90.
- Action: Return one original sold unit.
- Expected: Restore60 original cost, not90; credited sale100; remaining valuation increases60; linked consumption reverses once.

### WB-PHY.J07.C04 — Backdated receipt

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Sale already posted under reviewed policy.
- Action: Insert earlier-dated receipt at another cost.
- Expected: No silent rewrite of issued journal/return cost. Apply declared revaluation/restriction policy with explicit adjustment/history; unresolved policy blocks.

### WB-PHY.J07.C05 — Change costing method

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Existing layers and sales present.
- Action: Switch FIFO to average.
- Expected: Versioned migration or explicit refusal; no dropping layers or reinterpretation of historical COGS; settings alone do not establish completed conversion.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/inventory.ts)

## WB-PHY.J08 — Location transfers and stock adjustments

**Fixture:** Location A has10@60, B0; total stock10/value600; scoped Warehouse user for A only.

Rules: BR-STK-01@1, BR-STK-02@1, BR-SEC-02@1, RB-INV-04@1. Retained tasks: C-109, C-110, C-115.

Entities: inventoryStockDocs, inventoryStockDocLines, inventoryStockLevels, locations. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J08.C01 — Transfer4 A to B

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: A10/B0.
- Action: Authorized actor transfers4.
- Expected: A6/B4; global10/value600; source and destination movements same transfer; no revenue/COGS/global inventory journal.
- Independent numeric checks: conserved qty: add(6, 4) = 10.

### WB-PHY.J08.C02 — Same location

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: A selected as source and destination.
- Action: Attempt transfer4.
- Expected: Reject or explicit nonposting no-op under declared contract; never double quantity/value.

### WB-PHY.J08.C03 — Insufficient source

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: After transfer A6.
- Action: Attempt transfer7.
- Expected: Block under configured negative-stock block; A6/B4 unchanged.

### WB-PHY.J08.C04 — Adjustment loss

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Fresh A10 at60; approved loss account.
- Action: Count9 and post adjustment -1 with reason.
- Expected: A9/value540; Dr approved inventory loss60 Cr inventory60; source count/audit retained.
- Independent numeric checks: count loss cents: mul(1, 6000) = 6000.

### WB-PHY.J08.C05 — Location-scope denial

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Warehouse role authorized A only.
- Action: Read/export B or transfer from B using known record.
- Expected: Deny disallowed B access with own-A positive control; no movements or audit CREATE.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/inventory.ts)

## WB-PHY.J09 — Fractional goods, negative stock and unit precision

**Fixture:** Meter SKU permits four quantity decimals; discrete unit SKU disallows fractions under reviewed unit policy; negative stock block.

Rules: RB-INV-02@1, BR-STK-01@1, BR-STK-02@1. Retained tasks: C-112, C-114.

Entities: inventoryProducts, inventoryStockLevels, inventoryMovements. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Fractional units, negative-stock cost and later receipt correction need reviewed applicability; no blanket policy inferred from product defaults.

### WB-PHY.J09.C01 — Fractional issue

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Meter stock2.5000 at40 per meter.
- Action: Sell0.7500 at100.
- Expected: Stock1.7500/value70; COGS30; revenue75/profit45; retain four-decimal quantity.
- Independent numeric checks: COGS cents: mul(75, 40) = 3000.

### WB-PHY.J09.C02 — Excess scale

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Stock quantity2.5000.
- Action: Input0.00001.
- Expected: Reject excess precision or present reviewed explicit normalization before posting; cannot silently create/loss units.

### WB-PHY.J09.C03 — Fractional serial or discrete item

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Serial-tracked unit each.
- Action: Dispatch/sell0.5 unit.
- Expected: Deny under declared discrete-unit policy; no half serial or half movement.

### WB-PHY.J09.C04 — Last-unit race

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: P stock1; two separate authorized clients.
- Action: Post simultaneous sales of1 each.
- Expected: Under block policy one succeeds, one denies; final0; one COGS event. Independent connections required.

### WB-PHY.J09.C05 — Explicit negative policy

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Owner deliberately allows negative physical stock.
- Action: Sell1 from0 then receive replacement stock.
- Expected: Record negative state and reviewed provisional cost/revaluation policy; never claim valuation accepted from a permissive flag.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/inventory.ts)
- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-PHY.J10 — POS sale, change, return and shift close

**Fixture:** Register R; shift opening float100; stock10@60; retail price100; cash tender; POS enabled.

Rules: RB-POS-01@1, BR-SAL-02@1, BR-STK-03@1. Retained tasks: E-110, E-111, E-112.

Entities: posRegisters, posShifts, businessDocuments, inventoryStockLevels. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J10.C01 — Cash tender and change

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Shift float100; sell2x100.
- Action: Tender250, return change50.
- Expected: Net cash intake200; drawer300; revenue200/COGS120; stock8; receipt shows tender250/change50/paid200.
- Independent numeric checks: net tender cents: sub(25000, 5000) = 20000; drawer cents: add(10000, 20000) = 30000.

### WB-PHY.J10.C02 — Partial item return

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Sale2 paid200; drawer300.
- Action: Return1 and refund100.
- Expected: Stock9; revenue100/COGS60; drawer200; original sale receipt preserved; return linked.

### WB-PHY.J10.C03 — Closed shift or wrong register

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Shift closed or belongs another register.
- Action: Submit cached POS ticket.
- Expected: Deny stale posting; no journal/stock/ticket allocation against closed/foreign shift.

### WB-PHY.J10.C04 — Shift close variance

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Expected drawer200; cashier counts195.
- Action: Close shift with declared reason.
- Expected: Z report expected200/actual195/short5; no unexplained balancing posting; any approved variance journal separately linked.
- Independent numeric checks: shortage cents: sub(20000, 19500) = 500.

### WB-PHY.J10.C05 — Duplicate checkout

- Type: retry; execution: **not run**; adapter: **unbound**.
- Given: First checkout accepted; print fails.
- Action: Reload receipt read-only, then submit same accepted checkout identity.
- Expected: Recover stored receipt; one sale/COGS/stock/tender effect; never replay payment solely to repair print.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/pos-session.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/pos-session.ts)

## WB-PHY.J11 — Import purchase and attributable landed cost

**Fixture:** 10 physical units total1000; freight100; duty50; recoverable input VAT180 excluded from cost; reviewed allocation basis.

Rules: RB-PUR-01@1, RB-LK-03@1, BR-STK-02@1. Retained tasks: C-108.

Entities: businessDocuments, businessDocumentLines, inventoryCostLayers. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Full customs, recoverability, foreign exchange and late-cost allocation require support/expert decisions; these are expected acceptance targets, not claimed current features.

### WB-PHY.J11.C01 — Allocate acquisition costs

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: All10 units same eligible physical SKU.
- Action: Post supported reviewed landed-cost flow.
- Expected: Inventory1150/unit115; eligible inputVAT180 separately; total supplier/clearing liabilities1330 under explicit payee model; freight/duty once.
- Independent numeric checks: landed cost cents: add(100000, 10000, 5000) = 115000; total credits cents: add(115000, 18000) = 133000.

### WB-PHY.J11.C02 — Mixed service line

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Physical goods1000 plus service200; freight100.
- Action: Allocate freight by approved eligible-goods basis.
- Expected: Physical inventory1100; service expense200; freight never creates service stock; rule-owner confirms service treatment.

### WB-PHY.J11.C03 — Recoverable versus nonrecoverable tax

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Input VAT eligibility differs between fixtures.
- Action: Post same nominal tax180.
- Expected: Recoverable180 stays separate; nonrecoverable treatment follows approved capitalization/expense policy; never both claim credit and capitalize same180.

### WB-PHY.J11.C04 — FX not supported

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Foreign-currency supplier invoice and settlement.
- Action: Attempt import workflow with exchange differences.
- Expected: If unsupported, explicit capability gap and no claim of FX accounting. Preserve original currency/rate evidence when supported.

### WB-PHY.J11.C05 — Extra-cost edit after sale

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Receipt costs already partly consumed.
- Action: Add late freight adjustment.
- Expected: Reviewed allocation to remaining inventory/issued cost with dated adjustment or explicit block; do not silently change original posted COGS.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-PHY.J12 — Physical month-end reconciliation and reorder signals

**Fixture:** Complete physical cycle: stock10@60; sell2@100; receive80; return1; receive20; vendor purchase600 unpaid.

Rules: BR-ACC-07@1, BR-ACC-08@1, BR-STK-02@1, BR-DAT-01@1. Retained tasks: C-105, B-116, E-106.

Entities: inventoryStockLevels, inventoryCostLayers, businessDocuments, journalLines. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-PHY.J12.C01 — Stock, AR/AP and profit agree

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Cycle ends stock9/value540, AR0, AP600, cash100.
- Action: Reconcile stock ledger, valuation, GL, party subledgers and P&L.
- Expected: Net revenue100; COGS60; profit40; stock asset540; all subledgers match GL or explicit manual-control bridge.
- Independent numeric checks: profit cents: sub(10000, 6000) = 4000.

### WB-PHY.J12.C02 — Unclosed earnings in balance sheet

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Opening cash10000/equity10000 plus completed cycle and vendor paid600.
- Action: Run balance sheet before year close.
- Expected: Cash9500+inventory540=assets10040; liabilities0; opening equity10000+current profit40=10040; no balancing journal.
- Independent numeric checks: assets cents: add(950000, 54000) = 1004000.

### WB-PHY.J12.C03 — As-of date excludes future trade

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Invoice690 dated14 Oct; invoice275.50 dated16 Oct.
- Action: Run AR aging as-of15 Oct.
- Expected: Include690 only, with allocations/credits dated by cutoff; current275.50 must not leak into historical debt.
- Independent numeric checks: as-of cents: add(69000) = 69000.

### WB-PHY.J12.C04 — Reorder threshold boundary

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: P on-hand9; reorder level10; declared availability basis.
- Action: Open low-stock view then receive1.
- Expected: 9 is below threshold; boundary10 follows explicit comparator; display cannot count another location/tenant stock without declared scope.

### WB-PHY.J12.C05 — Manual AR control entry

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Commercial AR0; authorized manual DrAR50/Cr opening bridge50.
- Action: Run commercial and GL reconciliation.
- Expected: Report explicit manual-control difference50; do not hide entry or claim AR reconciliation0 merely by excluding manual ledger.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)
