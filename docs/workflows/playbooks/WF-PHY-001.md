# WF-PHY-001 — Physical purchase,receipt,bill,sale,settlement and return

Generated from workflows/specs/WF-PHY-001.json; edit JSON, then run pnpm workflows:render.

Revision 1; specification **draft**; automation **unbound**; acceptance **not assessed**. This is a starter family, not full business coverage.

Profiles: BP-01. Existing lifecycle tasks: C-101, C-102, C-103, C-104, C-105, C-106, C-107, C-111, C-112, C-113, C-115, C-116.

Rules: BR-ACC-01@1, BR-ACC-02@1, BR-ACC-03@1, BR-ACC-04@1, BR-PUR-01@1, BR-PUR-02@1, BR-STK-01@1, BR-STK-02@1, BR-SAL-01@1, BR-SAL-02@1, BR-DAT-01@1. Account names are purposes; bind actual fixture accounts before execution.

## Scope and fixture

Specified golden journey; capability/settings and expert applicability must be confirmed before acceptance.

{"currency":"LKR","moneyUnit":"integer cents","businessDate":"2026-10-16","timezone":"Asia/Colombo","taxProfile":"Tax-disabled synthetic arithmetic fixture;no statutory applicability claimed.","settings":{"approval":"off in this baseline;separate on variant","GRNI":"on","costing":"approved constant-cost fixture;separate FIFO/average/last variable-price variants","negativeStock":"block","discount":"none"},"opening":{"cashCents":1000000,"equityCents":1000000,"stockQty":0,"stockValueCents":0,"ARCents":0,"APCents":0,"GRNICents":0}}

## Preconditions

- Fresh isolated run-owned fixture;verify actor,tenant and actual capability/settings before writes.
- Record product/QA/build/schema/config/fixture fingerprint;missing identity blocks only affected acceptance.
- No reuse of contaminated prior browser fixture;no payment replay or silent repair.

## Golden journey

### S01 — Create PO10 units at6000 cents

Expected journals: []

Closing assertions: {"stockQty":0,"APCents":0,"GRNICents":0}

Unchanged: Cash; GL; Stock.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S02 — Receive all10 against PO,GRNI enabled

Expected journals: [{"account":"Inventory","side":"debit","cents":60000},{"account":"GRNI","side":"credit","cents":60000}]

Closing assertions: {"stockQty":10,"stockValueCents":60000,"APCents":0,"GRNICents":60000}

Unchanged: Cash; AP.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S03 — Bill the received10 once

Expected journals: [{"account":"GRNI","side":"debit","cents":60000},{"account":"AP","side":"credit","cents":60000}]

Closing assertions: {"stockQty":10,"stockValueCents":60000,"APCents":60000,"GRNICents":0}

Unchanged: Stock quantity; Cash.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S04 — Credit sale2 units at10000 cents

Expected journals: [{"account":"AR","side":"debit","cents":20000},{"account":"Sales","side":"credit","cents":20000},{"account":"COGS","side":"debit","cents":12000},{"account":"Inventory","side":"credit","cents":12000}]

Closing assertions: {"stockQty":8,"stockValueCents":48000,"ARCents":20000,"APCents":60000}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S05 — Receive8000 cents against sale

Expected journals: [{"account":"Cash","side":"debit","cents":8000},{"account":"AR","side":"credit","cents":8000}]

Closing assertions: {"cashCents":1008000,"ARCents":12000}

Unchanged: Revenue; COGS; Stock.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S06 — Return1 sold unit at original cost6000 cents,credit outstanding

Expected journals: [{"account":"SalesReturns","side":"debit","cents":10000},{"account":"AR","side":"credit","cents":10000},{"account":"Inventory","side":"debit","cents":6000},{"account":"COGS","side":"credit","cents":6000}]

Closing assertions: {"stockQty":9,"stockValueCents":54000,"ARCents":2000,"netRevenueCents":10000,"netCOGSCents":6000,"profitCents":4000}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S07 — Receive remaining2000 cents

Expected journals: [{"account":"Cash","side":"debit","cents":2000},{"account":"AR","side":"credit","cents":2000}]

Closing assertions: {"cashCents":1010000,"ARCents":0}

Unchanged: Revenue; COGS; Stock.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S08 — Pay vendor60000 cents

Expected journals: [{"account":"AP","side":"debit","cents":60000},{"account":"Cash","side":"credit","cents":60000}]

Closing assertions: {"cashCents":950000,"APCents":0,"stockQty":9,"stockValueCents":54000,"assetsCents":1004000,"equityIncludingProfitCents":1004000}

Unchanged: Revenue; COGS; Stock.

Links/history: Persist own source/line/allocation links; retain attributable audit history

## Variant register

### WF-PHY-001.V01 — boundary

Trigger: Zero/negative/fractional amounts and remaining quantity boundary; exact currency rounding

Expected: Apply referenced rule;reject invalid values with explicit feedback and zero forbidden effects.

Related bugs: none mapped

### WF-PHY-001.V02 — invalid-state

Trigger: Attempt conversion/return/payment after final or incompatible state

Expected: Refuse invalid transition;preserve source,stock,allocations and journals.

Related bugs: none mapped

### WF-PHY-001.V03 — retry

Trigger: Repeat same completed request;interrupt response after posting

Expected: Inspect persisted outcome before retry;one effect per permitted idempotency contract;never blindly replay payment.

Related bugs: none mapped

### WF-PHY-001.V04 — permissions

Trigger: Own positive,Viewer/other-role deny,foreign record and stale membership

Expected: Verify fresh actor;deny zero forbidden effects and no foreign disclosure at command/HTTP/browser layers.

Related bugs: none mapped

### WF-PHY-001.V05 — history

Trigger: Change master price/settings after posting;return old document;choose prior report date

Expected: Preserve issued facts;use original permitted snapshots and correct asof scope.

Related bugs: none mapped

### WF-PHY-001.V06 — failure

Trigger: Failure between document,stock,allocation and journal steps;competing request

Expected: Use isolated verified infrastructure;all-or-nothing effects and safe explicit recovery;no shared-staging fault injection.

Related bugs: none mapped

### WF-PHY-001.V07 — partials

Trigger: Receive4 of ordered10;bill via GRN,then try receipt7

Expected: Remaining receipt6,billed4;reject7;separate valid remaining6;no duplicate stock on bill.

Related bugs: BUG-0056

### WF-PHY-001.V08 — cumulative-return

Trigger: Fully return billed4 units then request another full purchase return

Expected: Reject cumulative return above original quantity/value;no extraAP/stock/journal.

Related bugs: BUG-0059

### WF-PHY-001.V09 — validation

Trigger: Duplicate supplier invoice conversion

Expected: Usable explicit validation,zero extra bill/posting;preserve first request outcome.

Related bugs: BUG-0057

## Execution and review

Required layers: persisted-command, credential-auth, browser, report-reconciliation, audit-history.

Policy/support gaps:

- No extra policy gap declared; rulebook expert review and actual capability applicability still required.

Independent QA reviewer: pending; business owner: pending. No evidence is created by rendering this file.
