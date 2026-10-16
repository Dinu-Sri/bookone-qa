# WB-HYB — Hybrid businesses and cross-module jobs

Generated from workflows/casebooks/WB-HYB.json. Edit JSON and run pnpm library:render. Revision 2; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-05. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-HYB.J01 — Mixed hire, service, goods and digital event

**Fixture:** Completed hire500+service200+physical300 cost180+digital100; deposit1000; physical stock10@60; sold3; fleet20.

Rules: BR-STK-03@1, BR-REN-04@1, BR-ACC-02@1. Retained tasks: E-101, E-110.

Entities: businessDocuments, inventoryProducts, rentalEvents, settlementAllocations. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-HYB.J01.C01 — Post four-class invoice

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: All fulfillment assumptions explicitly confirmed.
- Action: Invoice1100.
- Expected: AR1100/revenue1100; physical COGS180/stock7/value420; fleet owned20 unchanged; service/digital no stock.
- Independent numeric checks: mixed total cents: add(50000, 20000, 30000, 10000) = 110000.

### WB-HYB.J01.C02 — Apply deposit and settle

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: Deposit1000 liability; AR1100.
- Action: Apply1000; receive100.
- Expected: Liability0; AR0; net bank1100; revenue1100 once; profit920 before other costs.
- Independent numeric checks: profit cents: sub(110000, 18000) = 92000.

### WB-HYB.J01.C03 — Return one sold good

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Source physical3@100/cost60.
- Action: Credit1 physical.
- Expected: Stock8/value480; revenue1000; COGS120; customer credit100 if fully settled; fleet/service/digital unchanged.

### WB-HYB.J01.C04 — Return hire separately

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Hire units dispatched10.
- Action: Receive all10 through rental returns.
- Expected: Fleet state restores; no reversal of physical goods sale or hire revenue merely because equipment returned.

### WB-HYB.J01.C05 — Digital delivery gap

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Invoice and payment complete; entitlement not established.
- Action: Assess full mixed-job completion.
- Expected: Financial subjourney may be observed, but full digital fulfillment remains unsupported/unaccepted until independently verified.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-money.ts)

## WB-HYB.J02 — Shared discounts, mixed returns and tax buckets

**Fixture:** Physical300 +service200; header discount50; no tax baseline; independent proportional shares.

Rules: BR-SAL-03@1, BR-STK-03@1, RB-LK-03@1. Retained tasks: E-102, E-109.

Entities: businessDocuments, businessDocumentLines, salesDiscounts. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Mixed tax legal classification and product support require independent expert/capability review; tax-free arithmetic remains directly specified.

### WB-HYB.J02.C01 — Proportional discount

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Gross500/header50.
- Action: Post with stable reviewed allocation.
- Expected: Physical discount30/net270; service discount20/net180; total450; physical COGS unchanged180.
- Independent numeric checks: discount allocation cents: add(3000, 2000) = 5000; net cents: add(27000, 18000) = 45000.

### WB-HYB.J02.C02 — Return physical component

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Physical source net270 for3 units.
- Action: Return1.
- Expected: Credit90; restore cost60; service net180 unchanged; total remaining360.
- Independent numeric checks: remaining invoice cents: sub(45000, 9000) = 36000.

### WB-HYB.J02.C03 — Remainder tie

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Three positive equal lines1.00; header0.01.
- Action: Allocate with largest remainder/stable line ID tie.
- Expected: Discount shares0.01/0/0 in stable declared order; net total2.99; no lost cent or order-dependent surprise.
- Independent numeric checks: net cents: sub(300, 1) = 299.

### WB-HYB.J02.C04 — Mixed taxable and exempt

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Physical taxable, service exempt under reviewed fixture.
- Action: Post mixed tax buckets.
- Expected: Per-line classification retained or unsupported explicit refusal; never apply blanket tax to exempt line.

### WB-HYB.J02.C05 — Source header discount preview

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Stored original net275.50 including header discount.
- Action: Open linked return preview then post permitted full return.
- Expected: Preview/post/credit all275.50; do not omit header discount or use changed master default. Partial-source variant: separate source3x100, line10%, header5%, total256.50, cost180. Qty1 preview AND post85.50/cost60; remaining2 preview AND post171/cost120; cumulative256.50/cost180. UI previews must use source proportions rather than fixed copied discounts30/13.50.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-HYB.J03 — Modules, plans, entity types and existing history

**Fixture:** Separate company/sole-proprietor/personal/pending entities; explicit module flags and supported plan.

Rules: RB-CONFIG-01@1, RB-CONFIG-02@1, BR-SEC-02@1. Retained tasks: E-103, E-104, E-115, E-116, E-117.

Entities: tenants, tenantMemberships, tenantRoles, companyProfiles. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-HYB.J03.C01 — Plan versus custom modules

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Growth default inventory on; explicit inventory false.
- Action: Load permissions and submit physical write.
- Expected: Actual persisted false is honored; default plan does not silently re-enable; UI and server both reflect effective capability.

### WB-HYB.J03.C02 — Module off with history

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Posted invoice/stock movement exists.
- Action: Disable relevant module then view history and attempt new write.
- Expected: Preserve authorized historical read/report; reject new unsupported write; no deletion/reclassification of issued facts.

### WB-HYB.J03.C03 — Viewer allow override

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Viewer receives allow override on write key.
- Action: Attempt same write with Owner positive control.
- Expected: Ceiling still prevents elevation; own Viewer no financial/document writes.

### WB-HYB.J03.C04 — Owner explicit deny

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Owner has write permission explicitly denied.
- Action: Submit cached create form.
- Expected: Effective deny applies per authoritative policy; UI visibility does not overrule server ceiling.

### WB-HYB.J03.C05 — HR advertised coming soon

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Module catalog has hr key but not implemented payroll.
- Action: Try to include payroll in supported workbook execution.
- Expected: Record future capability/backlog; no payroll acceptance or fake salary workflow from a module key alone.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/lib/platform-modules.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/lib/platform-modules.ts)
- [packages/auth/src/permissions/ceiling.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/auth/src/permissions/ceiling.ts)

## WB-HYB.J04 — Locations, brands, book domains and workspace switch

**Fixture:** Tenants A/B; A brands Red/Blue and business/personal domains; identical document numbers but distinct IDs.

Rules: BR-SEC-01@1, BR-SEC-02@1, RB-CONFIG-02@1, BR-ACC-08@1. Retained tasks: E-105, E-106, E-107.

Entities: companyProfiles, brands, locations, businessDocuments, tenantMembershipScopes. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-HYB.J04.C01 — Independent scopes

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: A/Red sales100, A/Blue sales200.
- Action: Run scoped report/export and global.
- Expected: Red100/Blue200/global300; own line identities retained; no number-based mixing.
- Independent numeric checks: global cents: add(10000, 20000) = 30000.

### WB-HYB.J04.C02 — Business versus personal

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Business income100; personal income50.
- Action: Filter both domains.
- Expected: 100 and50 remain separate; global150 only if explicitly requested and authorized; AR/AP/files follow same domain contract.

### WB-HYB.J04.C03 — A to B to A

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: A form/report cached; B active after verified switch.
- Action: Navigate back and submit stale A form while B context active.
- Expected: Deny or explicitly rebind/reconfirm under supported contract; no A data written into B and no stale A cache in B.

### WB-HYB.J04.C04 — Same document number

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: A INV001 and B INV001 both real.
- Action: Open/pay/export one by known foreign ID.
- Expected: Tenant scope uses authoritative IDs/session, not number match; foreign denied with own positive.

### WB-HYB.J04.C05 — Scope revocation

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Role location A scope revoked in another session.
- Action: Read and mutate using stale tab.
- Expected: Fresh server permission context denies revoked scope; cache/file/export access refreshed; prior writes not erased.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/record-entry.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/record-entry.ts)

## WB-HYB.J05 — Shared-resource contention and partial failure

**Fixture:** Hybrid job has physical last1, rental free1 and AR100; isolated two-client runtime.

Rules: BR-ACC-03@1, BR-ACC-04@1, BR-STK-01@1, BR-REN-01@1. Retained tasks: E-111, E-113, E-114.

Entities: inventoryStockLevels, rentalBookingLines, businessDocuments, transactions. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-HYB.J05.C01 — Physical sale versus rental booking

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: Different product IDs/classes each1 available.
- Action: Post both concurrently.
- Expected: Each locks correct resource; goods may sell1 and fleet reserve1; no shared quantity bucket conflation.

### WB-HYB.J05.C02 — Same stock sale race

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: Two goods invoices contend for last1.
- Action: Post together under block policy.
- Expected: One accepts; total COGS once; no negative inventory or orphan second invoice.

### WB-HYB.J05.C03 — Parallel AR collections

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: AR100; two receipts80.
- Action: Submit concurrently.
- Expected: No allocated160; policy permits one80 with20 remaining or reviewed exact alternatives; rejected80 has zero cash.

### WB-HYB.J05.C04 — Missing mandatory account

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Inventory or deposit account missing/inactive/foreign.
- Action: Post mixed transaction.
- Expected: Whole business operation fails before partial journals/stock/reservations, with actionable configuration error.

### WB-HYB.J05.C05 — Fault after stock before journal

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Ephemeral isolated fixture and approved injected fault.
- Action: Force intermediate durable-boundary failure.
- Expected: Rollback all intended business effects; operational telemetry separately allowed; retry yields at most one complete operation.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)
