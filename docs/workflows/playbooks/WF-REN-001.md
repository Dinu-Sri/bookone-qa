# WF-REN-001 — Rental availability,deposit,return buckets and settlement

Generated from workflows/specs/WF-REN-001.json; edit JSON, then run pnpm workflows:render.

Revision 1; specification **draft**; automation **unbound**; acceptance **not assessed**. This is a starter family, not full business coverage.

Profiles: BP-04. Existing lifecycle tasks: D-101, D-102, D-103, D-104, D-105, D-106, D-107, D-108, D-109, D-110, D-112, D-114, D-115, D-116, D-117, D-118.

Rules: BR-REN-01@1, BR-REN-02@1, BR-REN-03@1, BR-REN-04@1, BR-ACC-02@1, RB-REN-01@1, RB-ACC-01@1. Account names are purposes; bind actual fixture accounts before execution.

## Scope and fixture

Specified golden journey; capability/settings and expert applicability must be confirmed before acceptance.

{"currency":"LKR","moneyUnit":"integer cents","businessDate":"2026-10-16","timezone":"Asia/Colombo","taxProfile":"Tax-disabled synthetic arithmetic fixture;no statutory applicability claimed.","settings":{"fleet":"approved recorded opening20;opening valuation separately reconciled","interval":"declared fixed inclusive dates and padding","invoiceTiming":"return,subject to supported configured policy","earnedIncome":"completed hire/service only","dirty":"unavailable until wash release"},"opening":{"ownedFleetQty":20,"availableQty":20,"depositLiabilityCents":0,"ARCents":0,"cashDeltaCents":0}}

## Preconditions

- Fresh isolated run-owned fixture;verify actor,tenant and actual capability/settings before writes.
- Record product/QA/build/schema/config/fixture fingerprint;missing identity blocks only affected acceptance.
- No reuse of contaminated prior browser fixture;no payment replay or silent repair.

## Golden journey

### S01 — Reserve/dispatch10 for approved interval

Expected journals: []

Closing assertions: {"ownedFleetQty":20,"committedOrDispatchedQty":10,"availableForOverlapQty":10}

Unchanged: Fleet ownership; Sale-style fleet COGS.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S02 — Collect refundable deposit100000 cents

Expected journals: [{"account":"Cash","side":"debit","cents":100000},{"account":"CustomerDeposit","side":"credit","cents":100000}]

Closing assertions: {"cashDeltaCents":100000,"depositLiabilityCents":100000,"hireRevenueCents":0}

Unchanged: Earned revenue; Fleet ownership.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S03 — Return8 good and2 dirty;close dispatch interval

Expected journals: []

Closing assertions: {"ownedFleetQty":20,"returnedQty":10,"goodQty":18,"dirtyQty":2,"availableQty":18}

Unchanged: Fleet ownership; GL.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S04 — Wash/release2 dirty

Expected journals: []

Closing assertions: {"ownedFleetQty":20,"dirtyQty":0,"availableQty":20}

Unchanged: Fleet ownership; GL.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S05 — Invoice completed hire50000 and service20000 cents

Expected journals: [{"account":"AR","side":"debit","cents":70000},{"account":"HireRevenue","side":"credit","cents":50000},{"account":"ServiceRevenue","side":"credit","cents":20000}]

Closing assertions: {"ARCents":70000,"depositLiabilityCents":100000,"saleStyleFleetCOGSCents":0}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S06 — Apply70000 deposit to invoice

Expected journals: [{"account":"CustomerDeposit","side":"debit","cents":70000},{"account":"AR","side":"credit","cents":70000}]

Closing assertions: {"ARCents":0,"depositLiabilityCents":30000,"cashDeltaCents":100000}

Unchanged: Revenue; Fleet.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S07 — Refund remaining30000

Expected journals: [{"account":"CustomerDeposit","side":"debit","cents":30000},{"account":"Cash","side":"credit","cents":30000}]

Closing assertions: {"ARCents":0,"depositLiabilityCents":0,"cashDeltaCents":70000,"ownedFleetQty":20,"availableQty":20}

Unchanged: Revenue; Fleet.

Links/history: Persist own source/line/allocation links; retain attributable audit history

## Variant register

### WF-REN-001.V01 — boundary

Trigger: Zero/negative/fractional amounts and remaining quantity boundary; exact currency rounding

Expected: Apply referenced rule;reject invalid values with explicit feedback and zero forbidden effects.

Related bugs: none mapped

### WF-REN-001.V02 — invalid-state

Trigger: Attempt conversion/return/payment after final or incompatible state

Expected: Refuse invalid transition;preserve source,stock,allocations and journals.

Related bugs: none mapped

### WF-REN-001.V03 — retry

Trigger: Repeat same completed request;interrupt response after posting

Expected: Inspect persisted outcome before retry;one effect per permitted idempotency contract;never blindly replay payment.

Related bugs: none mapped

### WF-REN-001.V04 — permissions

Trigger: Own positive,Viewer/other-role deny,foreign record and stale membership

Expected: Verify fresh actor;deny zero forbidden effects and no foreign disclosure at command/HTTP/browser layers.

Related bugs: none mapped

### WF-REN-001.V05 — history

Trigger: Change master price/settings after posting;return old document;choose prior report date

Expected: Preserve issued facts;use original permitted snapshots and correct asof scope.

Related bugs: none mapped

### WF-REN-001.V06 — failure

Trigger: Failure between document,stock,allocation and journal steps;competing request

Expected: Use isolated verified infrastructure;all-or-nothing effects and safe explicit recovery;no shared-staging fault injection.

Related bugs: none mapped

### WF-REN-001.V07 — availability

Trigger: Overlapping reservation before/after dirty release or extension

Expected: Honor interval/padding and unavailable buckets;total committed cannot exceed usable fleet;separate DB race.

Related bugs: none mapped

### WF-REN-001.V08 — refund

Trigger: Deposit over-apply/over-refund or repeated refund

Expected: Refuse cumulative excess and preserve liability/cash/allocations.

Related bugs: none mapped

### WF-REN-001.V09 — loss-damage

Trigger: Missing/damaged/late units and cancellation

Expected: Do not fabricate fees,forfeit deposit or write off owned fleet;apply separately approved policy and recorded values.

Related bugs: none mapped

## Execution and review

Required layers: persisted-command, credential-auth, browser, report-reconciliation, audit-history.

Policy/support gaps:

- RF-04 earned/deferred income and fleet accounting;RF-09 fees/refunds/overrides. No statutory/depreciation acceptance from this example.

Independent QA reviewer: pending; business owner: pending. No evidence is created by rendering this file.
