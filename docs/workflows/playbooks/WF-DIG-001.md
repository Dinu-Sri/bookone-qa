# WF-DIG-001 — Digital billing and collection with explicit fulfilment boundary

Generated from workflows/specs/WF-DIG-001.json; edit JSON, then run pnpm workflows:render.

Revision 1; specification **draft**; automation **unbound**; acceptance **not assessed**. This is a starter family, not full business coverage.

Profiles: BP-02. Existing lifecycle tasks: B-101, B-102, B-103, B-105, B-110, B-117.

Rules: BR-ACC-01@1, BR-ACC-02@1, BR-STK-03@1, BR-DAT-01@1, RB-SAL-01@1, RB-FILE-01@1. Account names are purposes; bind actual fixture accounts before execution.

## Scope and fixture

Specified golden journey; capability/settings and expert applicability must be confirmed before acceptance.

{"currency":"LKR","moneyUnit":"integer cents","businessDate":"2026-10-16","timezone":"Asia/Colombo","taxProfile":"Tax-disabled synthetic arithmetic fixture;no statutory applicability claimed.","settings":{"classification":"digital","physicalCost":"none","delivery":"capability must be inventoried;billing success is not entitlement success"},"opening":{"cashCents":0,"ARCents":0,"physicalStockMovement":0}}

## Preconditions

- Fresh isolated run-owned fixture;verify actor,tenant and actual capability/settings before writes.
- Record product/QA/build/schema/config/fixture fingerprint;missing identity blocks only affected acceptance.
- No reuse of contaminated prior browser fixture;no payment replay or silent repair.

## Golden journey

### S01 — Post digital invoice3 licences at20000 cents

Expected journals: [{"account":"AR","side":"debit","cents":60000},{"account":"DigitalRevenue","side":"credit","cents":60000}]

Closing assertions: {"ARCents":60000,"revenueCents":60000,"physicalStockMovement":0,"physicalCOGSCents":0}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S02 — Receive60000 cents

Expected journals: [{"account":"Cash","side":"debit","cents":60000},{"account":"AR","side":"credit","cents":60000}]

Closing assertions: {"ARCents":0,"cashCents":60000}

Unchanged: Revenue; Physical stock; COGS.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S03 — Inspect declared fulfilment capability and delivery/access evidence

Expected journals: []

Closing assertions: {"recordedInvoiceCents":60000}

Unchanged: Financial postings; Physical stock.

Links/history: If entitlement feature supported,test authorized successful delivery and denied foreign/expired/revoked access. If absent,record not-supported and leave full digital fulfilment unaccepted;do not fabricate successful step.

## Variant register

### WF-DIG-001.V01 — boundary

Trigger: Zero/negative/fractional amounts and remaining quantity boundary; exact currency rounding

Expected: Apply referenced rule;reject invalid values with explicit feedback and zero forbidden effects.

Related bugs: none mapped

### WF-DIG-001.V02 — invalid-state

Trigger: Attempt conversion/return/payment after final or incompatible state

Expected: Refuse invalid transition;preserve source,stock,allocations and journals.

Related bugs: none mapped

### WF-DIG-001.V03 — retry

Trigger: Repeat same completed request;interrupt response after posting

Expected: Inspect persisted outcome before retry;one effect per permitted idempotency contract;never blindly replay payment.

Related bugs: none mapped

### WF-DIG-001.V04 — permissions

Trigger: Own positive,Viewer/other-role deny,foreign record and stale membership

Expected: Verify fresh actor;deny zero forbidden effects and no foreign disclosure at command/HTTP/browser layers.

Related bugs: none mapped

### WF-DIG-001.V05 — history

Trigger: Change master price/settings after posting;return old document;choose prior report date

Expected: Preserve issued facts;use original permitted snapshots and correct asof scope.

Related bugs: none mapped

### WF-DIG-001.V06 — failure

Trigger: Failure between document,stock,allocation and journal steps;competing request

Expected: Use isolated verified infrastructure;all-or-nothing effects and safe explicit recovery;no shared-staging fault injection.

Related bugs: none mapped

### WF-DIG-001.V07 — capability

Trigger: Delivery/license/download feature absent or gated

Expected: Record unsupported/blocked;do not turn invoice or page load into delivery acceptance.

Related bugs: none mapped

### WF-DIG-001.V08 — refund

Trigger: Refund paid digital invoice;repeat refund;revoke access where supported

Expected: Use approved recorded refundable balance;one permitted cash effect,correct access policy;unresolved entitlement policy blocks its acceptance.

Related bugs: none mapped

## Execution and review

Required layers: persisted-command, credential-auth, browser, report-reconciliation, audit-history.

Policy/support gaps:

- Digital delivery,revocation,refund and recognition policies need owner/expert confirmation where applicable.

Independent QA reviewer: pending; business owner: pending. No evidence is created by rendering this file.
