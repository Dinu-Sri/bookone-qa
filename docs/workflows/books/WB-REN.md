# WB-REN — Rental and event hire

Generated from workflows/casebooks/WB-REN.json. Edit JSON and run pnpm library:render. Revision 1; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-04. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-REN.J01 — Fleet setup, reservation and availability

**Fixture:** Owned20 balanced fleet units; repair0; block overlap policy; Asia/Colombo inclusive dates.

Rules: BR-REN-01@1, BR-REN-02@1, BR-STK-03@1. Retained tasks: D-101, D-107.

Entities: inventoryProducts, rentalEvents, rentalBookingLines, inventoryStockLevels. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-REN.J01.C01 — Reserve10

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Owned20/free20.
- Action: Reserve10 for10–12 Oct.
- Expected: Owned20/committed10/free10; no sale COGS or earned revenue; reservation links event and line.
- Independent numeric checks: free qty: sub(20, 10) = 10.

### WB-REN.J01.C02 — Inclusive endpoint overlap

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Existing10–12 Oct reservation10.
- Action: Reserve another15 starting12 Oct.
- Expected: Under block policy deny; 12 Oct overlaps; existing reservation unchanged.

### WB-REN.J01.C03 — Padding boundary

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Existing ends12 Oct; turnaround6hours.
- Action: Attempt start13 Oct then14 Oct.
- Expected: Date-only padding ceil6/24=1 day;13 blocked,14 eligible subject to other commitments.

### WB-REN.J01.C04 — Final-capacity race

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: Free1; two independent clients.
- Action: Reserve1 concurrently.
- Expected: One accepts under block; other denies; no oversubscription. Authorized explicit override is a different policy fixture.

### WB-REN.J01.C05 — Hold versus firm commitment

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Quote hold exists with declared hold policy.
- Action: Convert quote to order/invoice.
- Expected: Replace/transition original commitment, do not count hold and reservation twice; semantics/expiry of holds explicitly reviewed.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)

## WB-REN.J02 — Dispatch, partial returns and fleet conservation

**Fixture:** Owned20; reserved10; warehouse20; on-rent0; no sold goods.

Rules: BR-REN-02@1, BR-REN-03@1, BR-STK-01@1. Retained tasks: D-103, D-104, D-105.

Entities: rentalBookingLines, inventoryStockLevels, inventoryStockDocs. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-REN.J02.C01 — Dispatch10

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Reserved10 at warehouse.
- Action: Dispatch10 once.
- Expected: Warehouse10/on-rent10; owned20; no COGS; dispatched10 recorded with source.
- Independent numeric checks: fleet qty: add(10, 10) = 20.

### WB-REN.J02.C02 — Partial return6

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: On-rent10.
- Action: Return6 good to warehouse.
- Expected: Warehouse16/on-rent4; outstanding4; total20; booking not falsely fully returned.

### WB-REN.J02.C03 — Final return4

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Outstanding4.
- Action: Return4 good.
- Expected: Warehouse20/on-rent0; returned cumulative10; owned20; no duplicate stock creation.

### WB-REN.J02.C04 — Overreturn

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Outstanding4.
- Action: Return5.
- Expected: Deny all effects; no returned5, no extra warehouse unit or duplicate transfer.

### WB-REN.J02.C05 — Return before dispatch

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Reserved but not dispatched line.
- Action: Submit return1.
- Expected: Invalid transition denied; owned and commitment states unchanged.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)

## WB-REN.J03 — Dirty, repair, missing and wash release

**Fixture:** Dispatched10 from owned20; warehouse10; declared missing treatment not inferred.

Rules: BR-REN-03@1, BR-STK-01@1, RB-REN-01@1. Retained tasks: D-104, D-105, D-112, D-114.

Entities: rentalBookingLines, inventoryStockLevels, rentalReturnPhotos. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Missing-unit derecognition, impairment and charges require approved policy; operational bucket conservation is independently testable.

### WB-REN.J03.C01 — Eight good and two dirty

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: On-rent10; warehouse10.
- Action: Return8 good +2 dirty.
- Expected: Warehouse available18/wash2/on-rent0; owned20; dirty units unavailable; no COGS.
- Independent numeric checks: fleet accounted qty: add(18, 2) = 20.

### WB-REN.J03.C02 — Wash release

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Wash2; available18.
- Action: Release2 through authorized wash flow.
- Expected: Available20/wash0; global owned20; no new asset or purchase.

### WB-REN.J03.C03 — Mixed buckets

- Type: partial; execution: **not run**; adapter: **unbound**.
- Given: On-rent10.
- Action: Return6 good+2dirty+1repair+1missing.
- Expected: All10 dispositioned exactly once; available16,wash2,repair1,missing1 tracked; no silent lost unit. Missing ownership/writeoff policy remains explicit.
- Independent numeric checks: dispatched conservation: add(6, 2, 1, 1) = 10.

### WB-REN.J03.C04 — Negative bucket

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Outstanding10.
- Action: Submit good-1+dirty2.
- Expected: Reject invalid negative input; do not silently clamp and accept another interpretation without user confirmation.

### WB-REN.J03.C05 — Release foreign bay

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Real tenant B repair/wash row exists.
- Action: Attempt release using tenant A actor.
- Expected: Deny with own authorized release positive; no foreign transfer or object link.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)

## WB-REN.J04 — Security deposit, charge application and refund

**Fixture:** Event deposit1000; completed hire500+service200; no tax; bank0; deposit liability0.

Rules: BR-REN-04@1, BR-ACC-02@1, BR-SAL-02@1. Retained tasks: D-102, D-109, D-110.

Entities: rentalEvents, businessDocuments, settlementAllocations, accounts. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-REN.J04.C01 — Collect refundable deposit

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: No charges posted yet.
- Action: Collect1000 into liquid bank.
- Expected: Bank1000; deposit liability1000; revenue0; event/payment link and audit exist.

### WB-REN.J04.C02 — Invoice earned700 then apply

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Hire completed; deposit1000.
- Action: Post hire500+service200 invoice; apply700.
- Expected: Revenue700; AR700 then0; deposit liability300; bank1000; no second income on application.
- Independent numeric checks: deposit remainder cents: sub(100000, 70000) = 30000.

### WB-REN.J04.C03 — Refund remainder300

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Held remaining300.
- Action: Refund300 through permitted liquid tender.
- Expected: Bank700; liability0; AR0; revenue700; application/refund links preserve history.
- Independent numeric checks: net bank cents: sub(100000, 30000) = 70000.

### WB-REN.J04.C04 — Overrefund or apply unposted

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Remaining300 or draft invoice.
- Action: Attempt refund301 or deposit application to draft.
- Expected: Reject; no cash/liability/journal mutation.

### WB-REN.J04.C05 — Concurrent refund

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: Remaining300; two authorized sessions.
- Action: Refund300 concurrently.
- Expected: At most one accepted300; final liability0, not negative300; one linked refund.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-money.ts)

## WB-REN.J05 — Invoice timing and hire revenue boundary

**Fixture:** Separate events for on_confirm/on_dispatch/after_return/manual; no tax; future hire600.

Rules: BR-REN-02@1, RB-ACC-01@1, BR-SEC-02@1. Retained tasks: D-108, D-115.

Entities: rentalEvents, rentalBookingLines, rentalSettings. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Billing timing, VAT time of supply and accrual recognition are separate. Expert/policy acceptance is pending for advance hire income.

### WB-REN.J05.C01 — On dispatch gate

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Timing on_dispatch; status reserved.
- Action: Attempt invoice then dispatch and invoice.
- Expected: Pre-dispatch denied unless explicit authorized override; after dispatch eligible under stage rule; only one invoice.

### WB-REN.J05.C02 — After return gate

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Timing after_return; one active line still out.
- Action: Attempt invoice then fully return and retry.
- Expected: Early denied; fully returned eligible; partial return not falsely completed.

### WB-REN.J05.C03 — Manual and confirm

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Manual/on_confirm permitted by stage config.
- Action: Post invoice before future service.
- Expected: Operational permission is not earned-revenue proof; defer/recognize under reviewed accounting policy or leave acceptance blocked.

### WB-REN.J05.C04 — Timing override

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Actor lacks override authority.
- Action: Submit override reason to early invoice.
- Expected: Deny; authorized override needs explicit permission, reason, actor and audit; no fabricated signoff.

### WB-REN.J05.C05 — Setting change after booking

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Event stored after_return.
- Action: Change company default to on_confirm.
- Expected: Existing event follows explicit snapshot policy; cannot silently alter issued/accepted booking timing.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)
- [apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-money.ts)

## WB-REN.J06 — Extension, cancellation and overlap override

**Fixture:** Owned20; event A reserves10 for10–12Oct; B reserves15 for14–15Oct; turnaround1day.

Rules: BR-REN-01@1, BR-REN-03@1, RB-REN-01@1. Retained tasks: D-106, D-111, D-115.

Entities: rentalEvents, rentalBookingLines, rentalSettings. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Cancellation pricing/fees and allowed override roles need explicit support/policy; capacity conservation remains mandatory.

### WB-REN.J06.C01 — Extension collision

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: A current end12; B begins14.
- Action: Extend A to14.
- Expected: Recheck padded overlap; demand25 exceeds20; block under policy; original A dates unchanged.

### WB-REN.J06.C02 — Valid extension

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: B absent; sufficient capacity.
- Action: Extend A to13.
- Expected: Dates and availability update together; pricing change explicitly agreed, not silently charged.

### WB-REN.J06.C03 — Authorized override

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Overlapping demand25 on20; override permitted for named role.
- Action: Record reason and explicit override.
- Expected: Overbook amount5 visible; actor/reason retained; override is not a physically available5 units.

### WB-REN.J06.C04 — Cancel before dispatch

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Reserved10 and deposit1000, no charges.
- Action: Cancel under approved refundable policy.
- Expected: Release10 commitment; deposit remains liability until separately refunded; cancellation does not erase money/history.

### WB-REN.J06.C05 — Cancel after dispatch

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: On-rent10 still outstanding.
- Action: Attempt cancel event.
- Expected: Do not make10 units disappear/free; require supported return/close procedure and fee policy; preserve dispatch facts.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)

## WB-REN.J07 — Serialized fleet and hire kits

**Fixture:** Two serialized generators S1/S2; kit K requires2 chairs+1 table; chairs10,tables3.

Rules: BR-REN-01@1, BR-REN-03@1, BR-STK-01@1. Retained tasks: D-103, D-105, D-107.

Entities: rentalSerials, rentalKitComponents, rentalBookingLines, inventoryProducts. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Kit expansion, component availability and serial allocation need runtime verification; table/schema presence alone does not establish complete kit workflow.

### WB-REN.J07.C01 — Dispatch serial

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: S1/S2 available; reserve1 generator.
- Action: Dispatch1.
- Expected: Exactly one eligible serial assigned to booking; status on_rent; other serial available; no duplicate serial ownership.

### WB-REN.J07.C02 — Serial busy or foreign

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: S1 already on another active booking.
- Action: Attempt dispatch same S1 again or use foreign serial.
- Expected: Deny; no second booking ownership or cross-tenant serial transfer.

### WB-REN.J07.C03 — Kit capacity

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Chairs10/tables3; 2chairs+1table per kit.
- Action: Reserve3 kits.
- Expected: Require6chairs+3tables; remaining4chairs/0tables; cannot offer fourth complete kit.
- Independent numeric checks: chairs needed: mul(3, 2) = 6.

### WB-REN.J07.C04 — Kit shortage

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Same fleet; request4 kits.
- Action: Reserve4 without override.
- Expected: Tables shortage1 blocks whole kit reservation; do not reserve chairs8 while silently omitting table.

### WB-REN.J07.C05 — Partial kit return

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: 3 kits dispatched; one table missing.
- Action: Return6chairs+2tables and mark1table missing.
- Expected: Component conservation exact; kit not fully available until complete; missing-table policy separately resolved.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)
- [apps/web/src/app/actions/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/inventory.ts)

## WB-REN.J08 — Rates, late returns, damage and lost equipment

**Fixture:** Hire rate100 per event or day chosen explicitly; replacement price500; deposit1000; reviewed charge policy pending.

Rules: RB-REN-01@1, BR-REN-02@1, BR-REN-04@1. Retained tasks: D-112, D-113, D-116.

Entities: rentalSettings, inventoryProducts, rentalEvents, businessDocuments. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Charge rates, replacement/writeoff accounting, forfeiture and late-fee cutoffs require business/expert decision before execution acceptance.

### WB-REN.J08.C01 — Completed agreed event fee

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Accepted one-event hire100.
- Action: Complete and invoice.
- Expected: Fee100 exactly once; no multiplication by date span for event rate; physical fleet ownership unchanged.

### WB-REN.J08.C02 — Inclusive day policy example

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Explicit approved day count10–12Oct inclusive at100/day.
- Action: Calculate3 declared days.
- Expected: Hire300 before tax; UI labels day count; actual configured policy verified, not assumed from date span.
- Independent numeric checks: day fee cents: mul(3, 10000) = 30000.

### WB-REN.J08.C03 — Late day/hour cutoff

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Return just before/at/after policy cutoff in Asia/Colombo.
- Action: Calculate late charges with pinned clock.
- Expected: Apply only approved grace/rounding/hour/day contract; record exact timestamps; no invented fee when policy absent.

### WB-REN.J08.C04 — Damage versus deposit

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Approved charge200 posted; deposit1000 held.
- Action: Apply200; refund800.
- Expected: Revenue/compensation account per approved policy200 once; liability0; net bank200; damage evidence linked.
- Independent numeric checks: refundable cents: sub(100000, 20000) = 80000.

### WB-REN.J08.C05 — Missing replacement cost

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: One owned unit carrying value300; agreed charge500.
- Action: Write off/charge only through supported approved flow.
- Expected: Separate fleet loss300 from customer charge500; no assumption replacement price equals book value; retain evidence and source.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)
- [apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-money.ts)

## WB-REN.J09 — Rental photos, jobs, history and closeout

**Fixture:** Event with dispatch10, partial return, deposit1000; synthetic damage photo; real scoped roles.

Rules: BR-REN-03@1, BR-DAT-01@1, RB-FILE-01@1, BR-AUD-01@1. Retained tasks: D-117, D-118, F-121.

Entities: rentalReturnPhotos, rentalEvents, rentalBookingLines, tenantMembershipScopes. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-REN.J09.C01 — Own damage photo

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Authorized return actor; supported synthetic image.
- Action: Attach photo during documented return.
- Expected: Stored bytes/hash/booking/event/actor links match; reload own preview works; upload alone does not create charge.

### WB-REN.J09.C02 — Private photo access

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Known tenant B photo and real own photo.
- Action: Request/download as tenant A.
- Expected: Own allowed, foreign denied before signing; no foreign metadata in list/export.

### WB-REN.J09.C03 — Photo failure during return

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Isolated storage adapter fails at durable boundary.
- Action: Submit return with image.
- Expected: Declared operation is atomic or explicit partial state with safe recovery; never report full success while return/photo linkage is missing.

### WB-REN.J09.C04 — Rate changed after booking

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Accepted hire100, master now120.
- Action: Reopen job, print and invoice under snapshot policy.
- Expected: Original agreed100 preserved unless explicit reviewed variation; no silent120 historical rewrite.

### WB-REN.J09.C05 — Close with outstanding equipment

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Still out1 or unsettled deposit300.
- Action: Attempt close/archive job.
- Expected: Closeout exposes outstanding unit and liability; cannot erase them; archive is not settlement.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)
