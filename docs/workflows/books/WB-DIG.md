# WB-DIG — Digital products and delivery boundaries

Generated from workflows/casebooks/WB-DIG.json. Edit JSON and run pnpm library:render. Revision 1; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-02. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-DIG.J01 — Sell digital goods without physical inventory

**Fixture:** Digital SKU D; three licences@200; no tax; no delivery assumption.

Rules: BR-STK-03@1, BR-SAL-02@1, RB-SAL-01@1. Retained tasks: B-102, B-117.

Entities: inventoryProducts, businessDocuments, businessDocumentLines. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-DIG.J01.C01 — Digital invoice

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: No physical stock; bank0.
- Action: Post3x200 digital sale.
- Expected: AR600/revenue600 under applicable completed-sale policy; no physical quantity, asset or COGS movements.
- Independent numeric checks: digital invoice cents: mul(3, 20000) = 60000.

### WB-DIG.J01.C02 — Digital purchase

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Vendor software100 classified as expense under reviewed policy.
- Action: Post purchase with digital line.
- Expected: No physical stock; approved expense/intangible treatment required; cannot infer intangible capitalization from digital label.

### WB-DIG.J01.C03 — Wrong classification

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Stored SKU says physical though name says digital.
- Action: Attempt the digital scenario.
- Expected: Fixture invalid; stop/reclassify through supported flow and preserve first attempt; product name is not class evidence.

### WB-DIG.J01.C04 — Sale with empty product ID

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Description-only digital service line allowed by contract.
- Action: Post free-text line.
- Expected: No foreign/unknown SKU silently treated as free text; legitimate free-text applicability verified; no stock.

### WB-DIG.J01.C05 — Return or credit

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Digital sale paid600; policy permits one licence credit200.
- Action: Issue linked credit200.
- Expected: Net revenue400; customer credit200 until refund; no invented physical return200 or quantity1.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-DIG.J02 — Delivery, licence, download and revocation contract

**Fixture:** Completed digital invoice exists; entitlement capability not assumed from schema.

Rules: RB-SAL-01@1, RB-FILE-01@1, BR-SEC-01@1. Retained tasks: B-117, B-110.

Entities: businessDocuments, inventoryProducts, tenantMemberships. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** No separate delivery/entitlement implementation was established in this source study. Cases are capability-conditional, not runnable pass claims.

### WB-DIG.J02.C01 — Inspect entitlement support

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Invoice600 posted.
- Action: Find supported delivery/licence state and official business contract.
- Expected: Record actual capability evidence or unsupported gap. Invoice/print is not delivery proof.

### WB-DIG.J02.C02 — Authorized delivery target

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: If supported: licence L for party C, not C2.
- Action: Deliver to entitled C.
- Expected: Only C receives declared scope/expiry; recipient identity and issuance linked; exactly one accepted entitlement.

### WB-DIG.J02.C03 — Retry issuing same licence

- Type: retry; execution: **not run**; adapter: **unbound**.
- Given: If supported: delivery succeeded before timeout.
- Action: Retry accepted delivery key.
- Expected: No duplicate paid entitlement or repeated charge; recover existing delivery state.

### WB-DIG.J02.C04 — Refund and revocation

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: If supported: refunded licence has an access contract.
- Action: Refund then access old link/token.
- Expected: Access follows reviewed revocation/expiry policy; payment reversal alone is not observed access revocation.

### WB-DIG.J02.C05 — Foreign or expired access

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: If supported: real foreign entitlement and expired fixture.
- Action: Request both with own valid positive control.
- Expected: Foreign/expired access denied without leaking other recipient data; authorized current access works.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-DIG.J03 — Digital refunds, quantity and historical price

**Fixture:** Digital licence SKU price200; invoice3x200; paid600.

Rules: BR-SAL-02@1, BR-DAT-01@1, BR-STK-03@1. Retained tasks: B-104, B-105, B-113.

Entities: businessDocuments, businessDocumentLines, settlementAllocations. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-DIG.J03.C01 — Partial credit one licence

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Original3 paid600; no prior credit.
- Action: Credit1x200.
- Expected: Credit200; net revenue400; bank600 until refund; returnable quantity2 if quantity-based credits supported.

### WB-DIG.J03.C02 — Refund once

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Credit200 available.
- Action: Refund200 and reload receipt.
- Expected: Bank400; credit balance0; original600 receipt retained; no inventory.
- Independent numeric checks: net bank cents: sub(60000, 20000) = 40000.

### WB-DIG.J03.C03 — Excess credit

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Original3, already credited1.
- Action: Attempt credit3 more.
- Expected: Deny beyond remaining2/value400; no cash or entitlement side effects.

### WB-DIG.J03.C04 — Price changes

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Original unit200; current master250.
- Action: Print and credit original one.
- Expected: Original print600; source credit200, not250; master can price new sales separately.

### WB-DIG.J03.C05 — Entitlement refund consistency

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Delivery capability conditional.
- Action: Cancel/refund fulfilled sale.
- Expected: Record separate entitlement and financial outcomes; do not call full workflow accepted while access disposition is unknown.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-DIG.J04 — Digital classification, tax and mixed bundles

**Fixture:** Digital100 plus physical300 at cost180; no VAT baseline; bundle capabilities explicit.

Rules: BR-STK-03@1, BR-SAL-03@1, RB-SAL-01@1, RB-LK-03@1. Retained tasks: E-101, E-102.

Entities: businessDocuments, businessDocumentLines, inventoryProducts. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Bundle entitlement allocation and mixed tax require separately verified support; numerical discount example is delegated policy, not legal advice.

### WB-DIG.J04.C01 — Mixed invoice

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Physical stock10; digital unstocked.
- Action: Post physical300+digital100.
- Expected: Revenue400; COGS180 only physical; physical stock decreases declared units; digital has no movement; profit220.
- Independent numeric checks: profit cents: sub(40000, 18000) = 22000.

### WB-DIG.J04.C02 — Bundle discount

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Physical300+digital100, header discount40.
- Action: Apply reviewed proportional allocation.
- Expected: Physical net270/digital90; total360; COGS180 unchanged; later physical credit uses270 source share.
- Independent numeric checks: bundle total cents: add(27000, 9000) = 36000.

### WB-DIG.J04.C03 — Mixed tax classifications

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: One taxable and one exempt line.
- Action: Post mixed-rate digital/physical invoice.
- Expected: Use reviewed per-line buckets or explicit unsupported refusal; single-rate total cannot pass mixed-tax acceptance.

### WB-DIG.J04.C04 — Module disabled

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Sales disabled but cached digital invoice form open.
- Action: Submit sale.
- Expected: Server denies; no posted document, payment or invented entitlement.

### WB-DIG.J04.C05 — Digital description HTML

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Inert HTML-like title stored in fixture.
- Action: Render invoice/print/export.
- Expected: Content remains harmless text or sanitized approved content; no executable markup or spreadsheet formula behavior.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
