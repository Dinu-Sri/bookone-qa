# WF-SVC-001 — Service quote,draft,invoice and partial/full collection

Generated from workflows/specs/WF-SVC-001.json; edit JSON, then run pnpm workflows:render.

Revision 1; specification **draft**; automation **unbound**; acceptance **not assessed**. This is a starter family, not full business coverage.

Profiles: BP-03. Existing lifecycle tasks: B-101, B-102, B-103, B-104, B-105, B-108, B-111, B-113, B-114.

Rules: BR-ACC-01@1, BR-ACC-02@1, BR-SAL-01@1, BR-SAL-02@1, BR-SAL-03@1, BR-STK-03@1, RB-ACC-01@1, RB-UI-01@1. Account names are purposes; bind actual fixture accounts before execution.

## Scope and fixture

Specified golden journey; capability/settings and expert applicability must be confirmed before acceptance.

{"currency":"LKR","moneyUnit":"integer cents","businessDate":"2026-10-16","timezone":"Asia/Colombo","taxProfile":"Tax-disabled synthetic arithmetic fixture;no statutory applicability claimed.","settings":{"classification":"service","tax":"disabled","recognition":"completed service;no deferred recognition assumed"},"opening":{"cashCents":0,"ARCents":0,"stockQty":0}}

## Preconditions

- Fresh isolated run-owned fixture;verify actor,tenant and actual capability/settings before writes.
- Record product/QA/build/schema/config/fixture fingerprint;missing identity blocks only affected acceptance.
- No reuse of contaminated prior browser fixture;no payment replay or silent repair.

## Golden journey

### S01 — Quote/order/draft3 completed-service units at20000 cents

Expected journals: []

Closing assertions: {"ARCents":0,"revenueCents":0,"physicalStockMovement":0}

Unchanged: GL; Cash; Physical stock.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S02 — Post invoice60000 cents

Expected journals: [{"account":"AR","side":"debit","cents":60000},{"account":"ServiceRevenue","side":"credit","cents":60000}]

Closing assertions: {"ARCents":60000,"revenueCents":60000,"physicalStockMovement":0,"physicalCOGSCents":0}

Unchanged: Other tenant records; Unrelated documents.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S03 — Receive25000 cents

Expected journals: [{"account":"Cash","side":"debit","cents":25000},{"account":"AR","side":"credit","cents":25000}]

Closing assertions: {"cashCents":25000,"ARCents":35000,"revenueCents":60000}

Unchanged: Revenue; Physical stock; COGS.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S04 — Receive35000 cents

Expected journals: [{"account":"Cash","side":"debit","cents":35000},{"account":"AR","side":"credit","cents":35000}]

Closing assertions: {"cashCents":60000,"ARCents":0,"revenueCents":60000}

Unchanged: Revenue; Physical stock; COGS.

Links/history: Persist own source/line/allocation links; retain attributable audit history

### S05 — Change master price after posting;reload old invoice/receipt

Expected journals: []

Closing assertions: {"recordedInvoiceCents":60000,"ARCents":0}

Unchanged: Issued price/date/customer snapshots; GL; Recorded receipt facts.

Links/history: Persist own source/line/allocation links; retain attributable audit history

## Variant register

### WF-SVC-001.V01 — boundary

Trigger: Zero/negative/fractional amounts and remaining quantity boundary; exact currency rounding

Expected: Apply referenced rule;reject invalid values with explicit feedback and zero forbidden effects.

Related bugs: none mapped

### WF-SVC-001.V02 — invalid-state

Trigger: Attempt conversion/return/payment after final or incompatible state

Expected: Refuse invalid transition;preserve source,stock,allocations and journals.

Related bugs: none mapped

### WF-SVC-001.V03 — retry

Trigger: Repeat same completed request;interrupt response after posting

Expected: Inspect persisted outcome before retry;one effect per permitted idempotency contract;never blindly replay payment.

Related bugs: none mapped

### WF-SVC-001.V04 — permissions

Trigger: Own positive,Viewer/other-role deny,foreign record and stale membership

Expected: Verify fresh actor;deny zero forbidden effects and no foreign disclosure at command/HTTP/browser layers.

Related bugs: none mapped

### WF-SVC-001.V05 — history

Trigger: Change master price/settings after posting;return old document;choose prior report date

Expected: Preserve issued facts;use original permitted snapshots and correct asof scope.

Related bugs: none mapped

### WF-SVC-001.V06 — failure

Trigger: Failure between document,stock,allocation and journal steps;competing request

Expected: Use isolated verified infrastructure;all-or-nothing effects and safe explicit recovery;no shared-staging fault injection.

Related bugs: none mapped

### WF-SVC-001.V07 — calculation

Trigger: Untouched% selector,2x100,line10%;then toggle away/back

Expected: Both paths must180;3x100,line10%,header5% must256.50;reject150%,not clamp.

Related bugs: BUG-0060, BUG-0037

### WF-SVC-001.V08 — print-integrity

Trigger: Alter own payment print request amount/date

Expected: Persisted allocation facts or explicit rejection;no invented payment or foreign disclosure.

Related bugs: BUG-0058

### WF-SVC-001.V09 — validation

Trigger: Enter over-balance payment

Expected: Visible validation;no allocation or financial effect.

Related bugs: BUG-0061

## Execution and review

Required layers: persisted-command, credential-auth, browser, report-reconciliation, audit-history.

Policy/support gaps:

- Advances/milestones/subscriptions/unearned revenue require explicit policy/support and distinct workflows;RF-04 applicability remains expert-pending.

Independent QA reviewer: pending; business owner: pending. No evidence is created by rendering this file.
