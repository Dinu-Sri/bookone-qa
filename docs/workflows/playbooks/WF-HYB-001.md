# WF-HYB-001 — Hybrid job separates goods,services,digital and hired fleet

Generated from workflows/specs/WF-HYB-001.json; edit JSON, then run pnpm workflows:render.

Revision 1; specification **draft**; automation **unbound**; acceptance **not assessed**. This is a starter family, not full business coverage.

Profiles: BP-05. Existing lifecycle tasks: E-101, E-102, E-104, E-105, E-106, E-109, E-110, E-111, E-112, E-114.

Rules: BR-ACC-01@1, BR-ACC-02@1, BR-STK-01@1, BR-STK-03@1, BR-REN-03@1, BR-REN-04@1, BR-SAL-03@1, RB-CONFIG-01@1. Account names are purposes; bind actual fixture accounts before execution.

## Scope and fixture

Specified golden journey; capability/settings and expert applicability must be confirmed before acceptance.

{"currency":"LKR","moneyUnit":"integer cents","businessDate":"2026-10-16","timezone":"Asia/Colombo","taxProfile":"Tax-disabled synthetic arithmetic fixture;no statutory applicability claimed.","settings":{"products":"Distinct stored physical/service/digital/rental classifications","tax":"disabled","hireRecognition":"completed hire;expert policy pending","opening":"recorded balanced stock/fleet acquisition outside this job;no invented opening valuation"},"opening":{"physicalQty":10,"physicalValueCents":60000,"ownedFleetQty":20,"ARCents":0,"depositLiabilityCents":0,"cashDeltaCents":0}}

## Preconditions

- Fresh isolated run-owned fixture;verify actor,tenant and actual capability/settings before writes.
- Record product/QA/build/schema/config/fixture fingerprint;missing identity blocks only affected acceptance.
- No reuse of contaminated prior browser fixture;no payment replay or silent repair.

## Golden journey

### S01 — Collect refundable job deposit100000 cents

Expected journals: [{"account":"Cash","side":"debit","cents":100000},{"account":"CustomerDeposit","side":"credit","cents":100000}]

Closing assertions: {"cashDeltaCents":100000,"depositLiabilityCents":100000,"revenueCents":0}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S02 — Invoice completed hire50000+service20000+goods30000+digital10000

Expected journals: [{"account":"AR","side":"debit","cents":110000},{"account":"HireRevenue","side":"credit","cents":50000},{"account":"ServiceRevenue","side":"credit","cents":20000},{"account":"GoodsRevenue","side":"credit","cents":30000},{"account":"DigitalRevenue","side":"credit","cents":10000},{"account":"COGS","side":"debit","cents":18000},{"account":"Inventory","side":"credit","cents":18000}]

Closing assertions: {"ARCents":110000,"revenueCents":110000,"COGSCents":18000,"physicalQty":7,"physicalValueCents":42000,"ownedFleetQty":20}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S03 — Apply deposit100000 cents

Expected journals: [{"account":"CustomerDeposit","side":"debit","cents":100000},{"account":"AR","side":"credit","cents":100000}]

Closing assertions: {"ARCents":10000,"depositLiabilityCents":0,"cashDeltaCents":100000}

Unchanged: Revenue; Physical stock; Fleet.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S04 — Collect balance10000

Expected journals: [{"account":"Cash","side":"debit","cents":10000},{"account":"AR","side":"credit","cents":10000}]

Closing assertions: {"ARCents":0,"depositLiabilityCents":0,"cashDeltaCents":110000,"jobProfitCents":92000,"physicalQty":7,"ownedFleetQty":20}

Unchanged: Revenue; Physical stock; Fleet.

Links/history: Persist own source/line/allocation links; retain attributable audit history

## Variant register

### WF-HYB-001.V01 — boundary

Trigger: Zero/negative/fractional amounts and remaining quantity boundary; exact currency rounding

Expected: Apply referenced rule;reject invalid values with explicit feedback and zero forbidden effects.

Related bugs: none mapped

### WF-HYB-001.V02 — invalid-state

Trigger: Attempt conversion/return/payment after final or incompatible state

Expected: Refuse invalid transition;preserve source,stock,allocations and journals.

Related bugs: none mapped

### WF-HYB-001.V03 — retry

Trigger: Repeat same completed request;interrupt response after posting

Expected: Inspect persisted outcome before retry;one effect per permitted idempotency contract;never blindly replay payment.

Related bugs: none mapped

### WF-HYB-001.V04 — permissions

Trigger: Own positive,Viewer/other-role deny,foreign record and stale membership

Expected: Verify fresh actor;deny zero forbidden effects and no foreign disclosure at command/HTTP/browser layers.

Related bugs: none mapped

### WF-HYB-001.V05 — history

Trigger: Change master price/settings after posting;return old document;choose prior report date

Expected: Preserve issued facts;use original permitted snapshots and correct asof scope.

Related bugs: none mapped

### WF-HYB-001.V06 — failure

Trigger: Failure between document,stock,allocation and journal steps;competing request

Expected: Use isolated verified infrastructure;all-or-nothing effects and safe explicit recovery;no shared-staging fault injection.

Related bugs: none mapped

### WF-HYB-001.V07 — cross-product

Trigger: Return only sold goods while rental/service/digital lines remain

Expected: Reverse only eligible goods value/original cost;no hire fleet restock or unrelated service credit.

Related bugs: none mapped

### WF-HYB-001.V08 — allocation

Trigger: Shared header discount/tax across multiple product classes

Expected: Use referenced rulebook allocation/rounding and recorded snapshots;do not drop lines/tax on print or return.

Related bugs: BUG-0062

### WF-HYB-001.V09 — capability

Trigger: Disable module or revoke role during mixed draft

Expected: Preserve authorized history,refuse unavailable write;no partial posting or forbidden data disclosure.

Related bugs: none mapped

## Execution and review

Required layers: persisted-command, credential-auth, browser, report-reconciliation, audit-history.

Policy/support gaps:

- RF-04 and RF-09;digital fulfilment not established by hybrid invoice.

Independent QA reviewer: pending; business owner: pending. No evidence is created by rendering this file.
