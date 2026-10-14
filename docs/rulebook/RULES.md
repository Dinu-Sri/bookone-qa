# BookOne business rulebook 1.0.0

Generated from [the editable rule register](../../rules/rulebook.json). Edit the register, then run `pnpm rulebook:render`; do not maintain a second set of rule text here.

Jurisdiction: Sri Lanka. Policy baseline: 2026-10-14. Last reviewed for extraction: 2026-10-14. **No independent expert approval or product acceptance is implied.**

Read [how to use and change this book](README.md), [expert review queue](REVIEW.md) and [source study](STUDY.md). Product study: v2.5.3 5becb2d plus v2.5.4 9b8e443 diff. Executed QA pin stays v2.5.3.

## Status meanings

- **product-contract**: extracted intended contract or preserved mandatory invariant. It may still fail in the product.
- **adopted-default**: a non-statutory choice adopted under the owner's 2026-10-14 delegation. Effective for future specifications; compatibility and implementation review required.
- **external-requirement**: short official-source requirement with qualified applicability; expert interpretation remains pending.
- **open-review**: unresolved legal scope or contradictory contracts; no compliance acceptance inferred.

## Rule index

| ID | Topic | Status | Expert review |
|---|---|---|---|
| [BR-ACC-01](#br-acc-01) | Every posted journal balances | product-contract | pending |
| [BR-ACC-02](#br-acc-02) | Correct posting and settlement separation | product-contract | pending |
| [BR-ACC-03](#br-acc-03) | Business operations commit atomically | product-contract | pending |
| [BR-ACC-04](#br-acc-04) | Idempotency and concurrent allocations | product-contract | pending |
| [BR-ACC-05](#br-acc-05) | Reversals retain history | product-contract | pending |
| [BR-ACC-06](#br-acc-06) | Locked periods and correcting dates | product-contract | pending |
| [BR-ACC-07](#br-acc-07) | Reconcile commercial and manual controls | adopted-default | pending |
| [BR-ACC-08](#br-acc-08) | Reports use the same accounting scope | product-contract | pending |
| [BR-SAL-01](#br-sal-01) | Pre-posting documents | product-contract | pending |
| [BR-SAL-02](#br-sal-02) | Posting, payment, credit and refund states | product-contract | pending |
| [BR-SAL-03](#br-sal-03) | Deterministic monetary calculation | adopted-default | pending |
| [BR-PUR-01](#br-pur-01) | Receive and bill once | product-contract | pending |
| [BR-PUR-02](#br-pur-02) | Approvals and supplier duplicates | product-contract | pending |
| [BR-STK-01](#br-stk-01) | Quantity conservation | product-contract | pending |
| [BR-STK-02](#br-stk-02) | Quantity and value are independently conserved | product-contract | pending |
| [BR-STK-03](#br-stk-03) | Physical, service, digital and rental effects | product-contract | pending |
| [BR-REN-01](#br-ren-01) | Availability and interval model | adopted-default | pending |
| [BR-REN-02](#br-ren-02) | Hire, invoicing and earned income | product-contract | pending |
| [BR-REN-03](#br-ren-03) | All dispatched units stay accounted for | product-contract | pending |
| [BR-REN-04](#br-ren-04) | Refundable deposit liability | product-contract | pending |
| [BR-SEC-01](#br-sec-01) | Tenant isolation at every boundary | product-contract | pending |
| [BR-SEC-02](#br-sec-02) | Authoritative roles, capabilities and scopes | product-contract | pending |
| [BR-DAT-01](#br-dat-01) | Preserve historical facts | product-contract | pending |
| [BR-DAT-02](#br-dat-02) | Upgrade and rollback compatibility | product-contract | pending |
| [BR-DAT-03](#br-dat-03) | Usable recovery | product-contract | pending |
| [BR-IMP-01](#br-imp-01) | Traceable repeat-safe import | product-contract | pending |
| [BR-AUD-01](#br-aud-01) | Trustworthy audit without secrets | product-contract | pending |
| [RB-LK-01](#rb-lk-01) | Tax profile and effective-date registry | external-requirement | pending |
| [RB-LK-02](#rb-lk-02) | Sri Lankan tax invoice specification | external-requirement | pending |
| [RB-LK-03](#rb-lk-03) | Input VAT and taxable-price modes | adopted-default | pending |
| [RB-LK-04](#rb-lk-04) | Other Sri Lankan taxes are distinct capabilities | open-review | pending |
| [RB-LK-05](#rb-lk-05) | Choose the reporting framework per entity | open-review | pending |
| [RB-INV-01](#rb-inv-01) | Professional inventory valuation profile | adopted-default | pending |
| [RB-INV-02](#rb-inv-02) | Negative and fractional stock | adopted-default | pending |
| [RB-INV-03](#rb-inv-03) | Backdating and costing-method changes | adopted-default | pending |
| [RB-REN-01](#rb-ren-01) | Late, damage, loss and cancellation charges | adopted-default | pending |
| [RB-ACC-01](#rb-acc-01) | Invoice date versus revenue recognition | adopted-default | pending |
| [RB-PAY-01](#rb-pay-01) | Whole-batch payment semantics | adopted-default | pending |
| [RB-PAY-02](#rb-pay-02) | Overpayment, advances and valid tenders | product-contract | pending |
| [RB-CONFIG-01](#rb-config-01) | Module-off history and drafts | adopted-default | pending |
| [RB-CONFIG-02](#rb-config-02) | Legal entities and book domains | product-contract | pending |
| [RB-FILE-01](#rb-file-01) | Private record-linked file access | adopted-default | pending |
| [RB-FILE-02](#rb-file-02) | Formats, upload bounds and content safety | adopted-default | pending |
| [RB-DATA-01](#rb-data-01) | Retention and privacy lifecycle | adopted-default | pending |
| [RB-DATA-02](#rb-data-02) | Operator recovery service targets | adopted-default | pending |
| [RB-ARCH-01](#rb-arch-01) | Owner-only export of two private files | product-contract | pending |
| [RB-ARCH-02](#rb-arch-02) | Empty-target restore and identity remap | product-contract | pending |
| [RB-ARCH-03](#rb-arch-03) | Restore semantic accounting and stock integrity | product-contract | pending |
| [RB-ARCH-04](#rb-arch-04) | Files pairing, completion and retry | product-contract | pending |
| [RB-ARCH-05](#rb-arch-05) | Legacy archive exception requires a versioned decision | open-review | pending |
| [RB-UI-01](#rb-ui-01) | Form completion is truthful | product-contract | pending |
| [RB-POS-01](#rb-pos-01) | POS sales, tenders, change and shift totals | product-contract | pending |
| [RB-GOV-01](#rb-gov-01) | All-business QA scope and honest acceptance | product-contract | pending |
| [RB-LK-06](#rb-lk-06) | Sri Lankan currency and business dates | adopted-default | pending |
| [RB-INV-04](#rb-inv-04) | Opening balances are a reconciled accounting event | adopted-default | pending |
| [RB-PUR-01](#rb-pur-01) | Import purchase and landed costs | adopted-default | pending |
| [RB-SAL-01](#rb-sal-01) | Service and digital fulfilment | adopted-default | pending |

<a id="br-acc-01"></a>

## BR-ACC-01: Every posted journal balances

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Persisted debit equals credit in LKR cents for each journal; no empty journal for a completed financial event. Correct accounts must also be checked.

**Current product/evidence:** Builders enforce totals; RUN17 still exposes incomplete failed rental postings.

**Example:** Sale 600: Dr AR 600, Cr revenue 600; Dr cash 600/Cr expense600 is balanced but is not a valid sale.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md); [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts).

**Checks to inspect/extend:** B-102, D-118. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0027.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-02"></a>

## BR-ACC-02: Correct posting and settlement separation

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Recognition creates revenue/expense and the relevant control balance; settlement clears control without recognising the same sale/purchase again. Use account purpose, not a hardcoded code as law.

**Current product/evidence:** Default product codes AR 1300/AP 2100, revenue 4000, returns4100, stock 5100/COGS5000; CoA is configurable.

**Example:** Invoice 600 then receipt 250: revenue 600, cash 250, AR 350.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts).

**Checks to inspect/extend:** B-102, B-103, C-106. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-03"></a>

## BR-ACC-03: Business operations commit atomically

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Document, party, journal, settlement, stock/layers and business audit commit together or roll back together. Connection scoping alone is not a transaction. Security failure telemetry may be separate.

**Current product/evidence:** Physical posting regressions pass at bounded depth; rental/transfer fault tests leave partial rows.

**Example:** Injected journal-line failure: no new financial transaction, document, stock mutation or business CREATE audit.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md); [P-RMONEY: apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/rental-money.ts); [P-COST: apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts).

**Checks to inspect/extend:** B-112, C-116, D-118, RT-022. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0027, BUG-0029.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-04"></a>

## BR-ACC-04: Idempotency and concurrent allocations

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** One logical operation has one committed effect. Replay of completed same key returns its recorded outcome; key reuse with different payload rejects. Balance decisions must be serialised, not read before an unprotected write.

**Current product/evidence:** RUN17 shows payment replay busy and concurrent AR over-allocation; invoice replay positive passes.

**Example:** 600 invoice; two simultaneous350 payments: only one350 effect, remaining AR 250.

**Sources:** [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts).

**Checks to inspect/extend:** B-106, B-107. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0022, BUG-0023.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-05"></a>

## BR-ACC-05: Reversals retain history

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Reverse once with original link, actor/date/reason and inverse effects; prohibit a second active reversal including races. Original entries remain accessible to authorised users.

**Current product/evidence:** Original sequential/concurrent reversal regressions pass at bounded DB depth.

**Example:** Sale 123.45 then valid reversal: net cash/revenue 0 with two linked journals.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md).

**Checks to inspect/extend:** RT-006, RT-007. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-06"></a>

## BR-ACC-06: Locked periods and correcting dates

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Do not change a closed-period fact. Correct in an authorised open period with links; reject if no allowed period or explicit authorised reopen is available. A reversal is not permission to post into a locked date.

**Current product/evidence:** Period guards exist on several paths; full all-module/role/date coverage remains incomplete.

**Example:** September locked; October correction retains September original and records October inverse.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md).

**Checks to inspect/extend:** B-111, C-115, RT-009. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-07"></a>

## BR-ACC-07: Reconcile commercial and manual controls

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** AR/AP controls equal signed commercial open items plus explicitly linked opening/manual adjustments within identical tenant/domain/currency/as-of scope. Default deny unlinked direct control-account postings; legacy differences use a reviewed bridge, never silent tolerance.

**Current product/evidence:** Two entry highways and document-based ageing create reconciliation risk; archive v2.5.4 compares fixed controls to documents without an approved bridge.

**Example:** AR GL700 = invoices600 + approved customer opening100; report must disclose both, not hide100.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-ARCHIVE-NEW: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/TENANT_BACKUP_ARCHIVE.md); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-116, S-0782. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0030.

**Expert review:** pending. Expert must define permitted opening/manual bridge and migration of existing differences; do not reject a valid legacy archive merely by ignoring its bridge.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-acc-08"></a>

## BR-ACC-08: Reports use the same accounting scope

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Trial balance, income, balance sheet, ageing and cash reconcile for identical posting status, dates, domain and dimensions. Credits reduce net income; settlement is not income.

**Current product/evidence:** Credit600/100 bounded report regression now passes; broader reports remain unaccepted.

**Example:** Invoice 600 credit 100 receipt 250: net income 500, cash 250, AR 250.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts).

**Checks to inspect/extend:** B-104, E-106. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-sal-01"></a>

## BR-SAL-01: Pre-posting documents

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and sales lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Quotes/orders/drafts do not post revenue, cash, AR or sale stock. Rental/physical reservation effects exist only under explicit reservation rules. Conversions preserve source links and line facts.

**Current product/evidence:** B-101 bounded quote/order/draft command passes; full UI conversion remains open.

**Example:** Quote600 converts to draft600: zero GL; posting the invoice creates exactly one600 recognition.

**Sources:** [P-SALES: apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/commercial-docs.ts); [P-REN: docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md).

**Checks to inspect/extend:** B-101. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-sal-02"></a>

## BR-SAL-02: Posting, payment, credit and refund states

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and sales lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Only posted live obligations accept allocation. Positive amounts cannot over-allocate remaining debt. Credits/refunds retain source, tax and quantity/cost links; refund cannot exceed refundable balance.

**Current product/evidence:** Single-document overpay denial exists; race failure remains BUG-0022. Complete paid-return/refund workflow still unimplemented.

**Example:** 600 invoice credit 100 payment 250 leaves250 due; cash refund is a separate authorised settlement, not another sale.

**Sources:** [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts); [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts).

**Checks to inspect/extend:** B-103, B-104, B-105, B-108. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0022.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-sal-03"></a>

## BR-SAL-03: Deterministic monetary calculation

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and sales lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Use exact decimal or integer cents. Round half away from zero to two decimals; round extended line amounts, apply valid discounts, allocate header discount proportionally to positive line nets using largest remainders with stable line-ID ties, then calculate tax per rate bucket and sum. Reject negative net or excessive discount. Reverse recorded amounts exactly.

**Current product/evidence:** Builder uses JS round2, single header VAT rate and first-account rounding correction; this is current behaviour, not approval for mixed tax buckets or decimal ties.

**Example:** Net100.05 at18% gives VAT 18.01 and total 118.06; reversing returns exactly118.06.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-114, E-102, E-109. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Tax-bucket rounding is delegated product policy, not asserted as a Sri Lankan statutory rounding mandate. Existing tests are not rewritten without a policy-versioned new fixture.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-pur-01"></a>

## BR-PUR-01: Receive and bill once

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and purchasing lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** PO does not post; GRN receives quantities once; bill linked to GRN clears GRNI when configured without receiving again. Partial receipts/bills cannot exceed approved remaining quantities absent an explicitly approved over-receipt.

**Current product/evidence:** Current physical PG cases cover PO→GRN→bill, GRNI and partials at bounded depth; stale earlier purchase narrative says GRN later.

**Example:** Receive10 at60: stock 600; bill600 adds AP 600 and clears GRNI600, no second10 stock.

**Sources:** [P-PUR: docs/PURCHASE_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PURCHASE_DESIGN.md); [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts).

**Checks to inspect/extend:** C-101, C-102, C-103, C-104. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-pur-02"></a>

## BR-PUR-02: Approvals and supplier duplicates

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and purchasing lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Pending approval has no posted financial/stock effect; only permitted scoped writer approves/rejects. Use supplier+reference+tenant duplicate detection; an exceptional duplicate needs explicit authorised reason, not silent second posting.

**Current product/evidence:** Viewer approval denial regression passes; exact duplicate override behaviour needs implementation review.

**Example:** Viewer approves pending200: denied, zero posting; authorised owner approves once: AP 200.

**Sources:** [P-PUR: docs/PURCHASE_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PURCHASE_DESIGN.md); [P-ACCESS: docs/ACCESS_CONTROL_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ACCESS_CONTROL_DESIGN.md); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** C-101, C-113, C-115. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-stk-01"></a>

## BR-STK-01: Quantity conservation

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Per SKU/location closing equals opening+receipts+returns+adjustments−issues. Internal transfers preserve tenant totals and carry cost; all IDs must refer to live current-tenant products/locations.

**Current product/evidence:** Basic transfers conserve quantity; failed/racing transfers leave additional cost/history rows.

**Example:** Transfer2 of 10 units from A to B: A8 B2, tenant10, no revenue.

**Sources:** [P-COST: apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts); [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md).

**Checks to inspect/extend:** C-109, RT-021, RT-022. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0028, BUG-0029.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-stk-02"></a>

## BR-STK-02: Quantity and value are independently conserved

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Stock quantities, remaining layers, carrying value, COGS and returns reconcile. A returned sold unit uses original issued cost unless an approved adjustment separately explains difference; transfers do not generate profit.

**Current product/evidence:** Constant-price FIFO/average/last PG positives pass; variable-price/returns/backdate acceptance remains open.

**Example:** Receive10×60; sell3×100 and return1: stock 8/value 480, COGS120, net revenue 200.

**Sources:** [P-COST: apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts); [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts).

**Checks to inspect/extend:** C-105, C-107, C-111. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-stk-03"></a>

## BR-STK-03: Physical, service, digital and rental effects

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Physical sale consumes stock and COGS; service/digital sales do not. Ordinary rental hire changes availability, not permanent fleet sale/COGS. A non-null unknown/foreign product ID must reject rather than become a free-text service line.

**Current product/evidence:** Core product distinction and SKU ownership regressions pass; digital entitlement workflow still not specified as shipped.

**Example:** Invoice physical300+service200+hire100: only physical sold quantity incurs sale COGS.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-REN: docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md).

**Checks to inspect/extend:** C-115, E-101, B-117. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-ren-01"></a>

## BR-REN-01: Availability and interval model

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and rental operations lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Preserve v1 inclusive local-calendar dates in Asia/Colombo; same-day endpoints overlap. Padding uses ceil(hours/24) whole days and must be described clearly. Safe new-company default block; warn/allow/override are explicit company choices, with scoped authority and recorded reason for override. Recheck under concurrency.

**Current product/evidence:** datesOverlap uses inclusive dates; default overlap is override; date-granular padding cannot demonstrate hourly turnaround precision.

**Example:** Booking10–12 Oct with6-hour padding blocks through 13 Oct; next date-only booking can start14 Oct.

**Sources:** [P-DATES: packages/accounting/src/rental-availability.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/rental-availability.ts); [P-RSET: apps/web/src/lib/rental-core.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/rental-core.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** D-106, D-107, D-115. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Date-granular v1 rule retained by delegated choice. Hourly billing is not evidence of hourly availability; propose a separately versioned timestamp calendar if required.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-ren-02"></a>

## BR-REN-02: Hire, invoicing and earned income

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and rental operations lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Ordinary hire never consumes fleet as a sale. Respect configured invoice stage with explicit permitted override. Invoice stage, VAT time of supply and financial revenue recognition are separate decisions; advance money is not automatically earned hire income.

**Current product/evidence:** P-TIMING gates invoice posting; on_confirm default does not prove accrual revenue recognition.

**Example:** Future event security deposit 1000: cash 1000/liability 1000, revenue 0.

**Sources:** [P-REN: docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md); [P-TIMING: packages/accounting/src/rental-invoice-timing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/rental-invoice-timing.ts).

**Checks to inspect/extend:** D-102, D-108. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-ren-03"></a>

## BR-REN-03: All dispatched units stay accounted for

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and rental operations lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Returned good/dirty/repair/missing/outstanding quantities cannot exceed dispatch; washing/repair units unavailable until released. Missing records are not automatically good returns or sales credits. Loss/write-off needs authority and a traceable asset adjustment.

**Current product/evidence:** Bounded return-bucket tests exist; complete loss/recovery approvals remain open.

**Example:** Dispatch10; good6 dirty2 repair1 missing1 totals10; only6 immediately rentable.

**Sources:** [P-REN: docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md).

**Checks to inspect/extend:** D-103, D-104, D-105, D-112, D-114. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-ren-04"></a>

## BR-REN-04: Refundable deposit liability

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and rental operations lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Collect deposit into liability; apply only against a posted authorised charge; refund only remaining liability through a valid liquid tender. Keep each collection/application/refund linked and atomic.

**Current product/evidence:** Deposit 1000/apply700/refund 300 positive passes; Viewer/tender/module and fault assertions fail in RUN17.

**Example:** 1000 collected−700 applied−300 refunded =0 remaining liability; hire revenue is not recognised a second time.

**Sources:** [P-REN: docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md); [P-RMONEY: apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/rental-money.ts).

**Checks to inspect/extend:** D-102, D-109, D-110, D-117, D-118. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0026, BUG-0027.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-sec-01"></a>

## BR-SEC-01: Tenant isolation at every boundary

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and security lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Derive tenant from authenticated active membership. Deny foreign records/files/reports/caches including known real foreign IDs; test actual non-owner DB role and simultaneous pooled connections. Never equate table-owner tests with RLS proof.

**Current product/evidence:** Non-owner helper tests pass; actual HTTP/login/object-storage coverage remains open.

**Example:** TenantA requests B receipt key: no signing call, no bytes and no mutation.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md); [P-ACCESS: docs/ACCESS_CONTROL_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ACCESS_CONTROL_DESIGN.md); [OWASP-AUTH: OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

**Checks to inspect/extend:** F-112, RT-014, E-107. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-sec-02"></a>

## BR-SEC-02: Authoritative roles, capabilities and scopes

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and security lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Viewer cannot mutate business state. Membership/job grants are limited by module/entity/location/brand ceilings. Owner-only privileges cannot arrive via extra jobs, exceptions or RBAC-off fallback. Control Room is platform super_admin only; company Admin is not platform admin. Revocation and membership/job changes must apply to the next authoritative server request, including cached permissions and stale pages; a previously visible button is not authority.

**Current product/evidence:** v2.5.4 patches backup resolver; no retest yet. Rental/transfer write holes persist in v2.5.3 evidence.

**Example:** Viewer direct rental money/stock transfer denied with identical before/after business snapshots.

**Sources:** [P-ACCESS: docs/ACCESS_CONTROL_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ACCESS_CONTROL_DESIGN.md); [P-RESOLVE: packages/auth/src/permissions/resolve.ts](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/packages/auth/src/permissions/resolve.ts); [OWASP-AUTH: OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

**Checks to inspect/extend:** E-115, E-116, E-117, D-117, C-109, S-0764. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0021, BUG-0026, BUG-0028.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-dat-01"></a>

## BR-DAT-01: Preserve historical facts

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Posted amounts, line/tax/price/party snapshots, dates, attachments and audit relationships retain meaning after master/config edits or upgrades. Corrections use traceable entries; master rename must not silently rewrite issued invoice facts.

**Current product/evidence:** Historical snapshot/UI coverage incomplete.

**Example:** Change price100→120 today: last month issued100 invoice remains100.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md).

**Checks to inspect/extend:** B-113, D-116, E-112. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-dat-02"></a>

## BR-DAT-02: Upgrade and rollback compatibility

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Test real prior-version datasets, interrupted migration/restart and semantic reconciliation. Reject unsupported downgrade/forward archive versions. Restoring old application code alone is not database rollback.

**Current product/evidence:** Fresh current43 SQL application passed; prior-release upgrade/recovery not yet accepted.

**Example:** Migration failure: all accepted pre-upgrade invoices and objects survive restart or tested isolated recovery.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md); [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md).

**Checks to inspect/extend:** F-108, F-109, F-111. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-dat-03"></a>

## BR-DAT-03: Usable recovery

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Restore consistent DB and object storage into isolation and prove books/files/roles usable. Company portable archives and operator disaster recovery are separate capabilities. No accepted RPO/RTO from a plan or successful export alone.

**Current product/evidence:** No full live tenant restore or operator DR acceptance recorded.

**Example:** Data restore without files opens books but receipt shows Missing attachment until matching pack is applied.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md).

**Checks to inspect/extend:** F-110, S-0778, S-0785, S-0786. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-imp-01"></a>

## BR-IMP-01: Traceable repeat-safe import

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Normalise signs/dates/amounts with an explicit source profile; reject impossible/ambiguous dates unless user confirms interpretation. Stage immutable bank evidence, deduplicate, then require an authorised decision to create books. Matching does not create another sale.

**Current product/evidence:** Impossible-date source regressions pass; broader recon journey remains open.

**Example:** Import28Feb2026 accepted;30Feb2026 rejected; reimport same bank row never doubles cash.

**Sources:** [P-RECON: docs/BANK_RECONCILIATION_WORKBENCH.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/BANK_RECONCILIATION_WORKBENCH.md).

**Checks to inspect/extend:** F-101, F-102, F-103, F-104, F-105. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="br-aud-01"></a>

## BR-AUD-01: Trustworthy audit without secrets

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Record actor/tenant/operation/time/reason and related records for sensitive changes. Successful business audit belongs to atomic commit; failure telemetry does not imply success. Never record archive passwords, session cookies or raw private documents in public evidence.

**Current product/evidence:** RUN17 keeps raw/private artifacts ignored; complete action audit review remains open.

**Example:** Denied Viewer transfer may record security denial, but cannot record a successful stock CREATE.

**Sources:** [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md).

**Checks to inspect/extend:** F-115, F-116. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-lk-01"></a>

## RB-LK-01: Tax profile and effective-date registry

**Revision 1; external-requirement; policy effective 2026-10-14.** Sri Lankan official source / applicability qualified.

**Owner:** Sri Lankan tax practitioner and product owner. **Applies to:** Sri Lankan entity with the stated tax registration, supply classification and effective date.

**Required behaviour:** Apply the tax classification and effective-dated rate to the relevant registered supply; ordinary standard VAT baseline is18% from 2024-01-01. Exempt, zero-rated and out-of-scope are distinct. Invoice styling alone must not switch tax liability off.

**Current product/evidence:** loadSalesVatConfig applies VAT only for tax_invoice+vatRegistered, a source concern requiring tax-path review; no deployed tax-compliance verdict.

**Example:** Registered ordinary taxable net 1000 at18%: tax180 total 1180; unregistered trader is not automatically entitled to issue that tax invoice.

**Sources:** [LK-VAT-RATE: IRD VAT overview](https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Value%20Added%20Tax%20%28VAT%29.aspx?menuid=1204); [LK-VAT-ACT: IRD VAT Act consolidated through 2025](https://www.ird.gov.lk/si/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14%5BE%5D_2002_%28Consolidation_2025%29.pdf); [LK-VAT-2026: VAT Amendment Act14of2026](https://www.ird.gov.lk/en/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14-2026_E.PDF); [P-SALES: apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/commercial-docs.ts).

**Checks to inspect/extend:** B-114, E-102. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Expert confirm transaction classification, supply date, registration, export evidence and any2026 special regime; do not use stale overview thresholds.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-lk-02"></a>

## RB-LK-02: Sri Lankan tax invoice specification

**Revision 1; external-requirement; policy effective 2026-10-14.** Sri Lankan official source / applicability qualified.

**Owner:** Sri Lankan tax practitioner and product owner. **Applies to:** Sri Lankan entity with the stated tax registration, supply classification and effective date.

**Required behaviour:** For applicable tax invoices issued from 2026-10-01, meet Gazette2481/22 as amended by2500/106: prescribed supplier/purchaser particulars, unique structured serial, invoice/supply dates in MM/DD/YYYY and LKR amounts to two decimals. Only VAT-subject supplies belong on this tax invoice.

**Current product/evidence:** Current serial template YYMMM_DEPT/SERIAL differs from Gazette structure; print/template and purchaser fields not yet audited.

**Example:** An ordinary commercial INV number is not by itself evidence of compliant tax invoice numbering.

**Sources:** [LK-INVOICE: Gazette2481/22 invoice specification](https://www.ird.gov.lk/en/publications/Gazette_Documents/2026_2481-22_E.pdf); [LK-INVOICE-DATE: Gazette2500/106 effective-date amendment](https://www.ird.gov.lk/en/publications/Gazette_Documents/2026_2500_106_E.pdf); [P-SALES: apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/commercial-docs.ts).

**Checks to inspect/extend:** E-112, B-114. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Serial separator/example inconsistency and purchaser applicability require practitioner interpretation; keep dates in internal ISO and render statutory print separately.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-lk-03"></a>

## RB-LK-03: Input VAT and taxable-price modes

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Sri Lankan tax practitioner and product owner. **Applies to:** Sri Lankan entity with the stated tax registration, supply classification and effective date.

**Required behaviour:** Keep recoverable input VAT separate from inventory/expense; nonrecoverable tax is assigned per approved accounting treatment. Require documentary eligibility. Inclusive price must be explicitly declared and decomposed; do not add VAT twice. Mixed rates/exempt goods require line classification; reject unsupported mixed-tax posting.

**Current product/evidence:** Single-rate net-exclusive builder exists; complete input eligibility/inclusive/mixed tax support is not established.

**Example:** Inclusive1180 at18% decomposes to net 1000 VAT 180; eligible purchase posts Dr asset/expense1000 Dr inputVAT180 Cr AP 1180.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [LK-VAT-ACT: IRD VAT Act consolidated through 2025](https://www.ird.gov.lk/si/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14%5BE%5D_2002_%28Consolidation_2025%29.pdf); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-114, E-102, C-108. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Expert must approve input recoverability, tax credit/debit-note adjustments and time of supply; these are not inferred from a checkbox.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-lk-04"></a>

## RB-LK-04: Other Sri Lankan taxes are distinct capabilities

**Revision 1; open-review; policy effective 2026-10-14.** Unresolved source or applicability conflict.

**Owner:** Sri Lankan tax practitioner and product owner. **Applies to:** Sri Lankan entity with the stated tax registration, supply classification and effective date.

**Required behaviour:** Do not claim full Sri Lankan tax compliance from VAT arithmetic. SSCL, AIT/WHT, APIT, income-tax schedules, stamp duty and customs need separate applicable effective-dated rules and support declarations. Do not add a flat SSCL charge to every invoice.

**Current product/evidence:** Tax packs are partly roadmap; no full filing/compliance certification.

**Example:** Ordinary invoice tax controls passing does not validate payroll deductions or import customs obligations.

**Sources:** [LK-SSCL: IRD SSCL overview](https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Social%20Security%20Contribution%20Levy%20%28SSCL%29.aspx); [LK-VAT-2026: VAT Amendment Act14of2026](https://www.ird.gov.lk/en/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14-2026_E.PDF); [P-ENTITY: docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md).

**Checks to inspect/extend:** No existing binding; add specification before acceptance. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Specialist scope and latest Acts/notices still needed; disabled or unsupported capability must be explicit rather than simulated passing.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-lk-05"></a>

## RB-LK-05: Choose the reporting framework per entity

**Revision 1; open-review; policy effective 2026-10-14.** Unresolved source or applicability conflict.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Record applicable full SLFRS/LKAS, SLFRS for SMEs, Smaller Entities or other supported basis with expert justification. Legal entity kind or product lite/full tier alone cannot select statutory reporting eligibility.

**Current product/evidence:** Entity architecture describes operational tiers; no independently confirmed framework selection.

**Example:** A small company using full ERP is not automatically required to use the same reporting framework as every listed enterprise.

**Sources:** [LK-SME: Sri Lanka SLFRS for SMEs2015](https://www.slaasc.lk/files/SLFRS%20FOR%20SMEs%20-%202015_1483585270_SLFRS%20FOR%20SMEs%20-%202015.pdf); [P-ENTITY: docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md).

**Checks to inspect/extend:** E-103. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Sri Lankan accountant confirms eligibility/current local edition; international amendments are not automatically local adoption.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-inv-01"></a>

## RB-INV-01: Professional inventory valuation profile

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** New statutory inventory profile defaults to moving weighted average, with FIFO selectable under a consistent entity policy. LKAS 2 uses FIFO/weighted average for interchangeable goods and specific identification for qualifying items; last-purchase cost needs separate justification before statutory use. Review impairment and attributable acquisition costs.

**Current product/evidence:** Product defaults last cost; new profile choice is a requirement proposal for coding, not a configuration change made by QA.

**Example:** 10 units at60 then10at80: average 70, issue5 costs 350; FIFO issue5 costs 300.

**Sources:** [LK-LKAS2: Sri Lanka LKAS 2 Inventories2025 bound-volume copy](https://www.slaasc.lk/files/?C=M%3BO%3DD); [LK-SME: Sri Lanka SLFRS for SMEs2015](https://www.slaasc.lk/files/SLFRS%20FOR%20SMEs%20-%202015_1483585270_SLFRS%20FOR%20SMEs%20-%202015.pdf); [P-INV: apps/web/src/app/actions/inventory-settings.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/inventory-settings.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** C-111. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. SME section 13.16 permits recent purchase price as a technique if it approximates cost; this is not an unconditional last-cost ban. Confirm evidence/eligibility. Review rental fleet asset classification/depreciation separately.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-inv-02"></a>

## RB-INV-02: Negative and fractional stock

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Safe new-company profile blocks issues beyond available quantities. Existing allow-mode remains an explicit operational exception with provisional cost and later reviewed true-up; never silently invent zero cost. Validate unit precision and four-decimal quantity storage, reject excess precision or explicitly convert; discrete items default whole units.

**Current product/evidence:** Product default allow; quantity helpers use4decimals. True-up and unit-specific constraints not established.

**Example:** Own2 chairs, try dispatch3 under block: reject zero effects; kilograms may accept0.1250 under declared unit policy.

**Sources:** [P-INV: apps/web/src/app/actions/inventory-settings.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/inventory-settings.ts); [P-COST: apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** C-112, C-114. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-inv-03"></a>

## RB-INV-03: Backdating and costing-method changes

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Default reject backdated movements that precede later valued movements unless a controlled recalculation/correction workflow preserves links and closed-period rules. Change costing prospectively with reviewed opening quantities/values; never rewrite issued facts invisibly.

**Current product/evidence:** FIFO orders by received date; recomputation/negative true-up coverage not established.

**Example:** Backdated60 receipt after an80-cost sale must not quietly change old COGS with no correcting record.

**Sources:** [P-COST: apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts); [P-CORE: docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** C-111, B-113. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-ren-01"></a>

## RB-REN-01: Late, damage, loss and cancellation charges

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and rental operations lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Default late/damage/forfeiture charge is0 until agreed terms/configuration exists. Record inspection/evidence and permission; draft separate charge/credit and approve before deposit application. An asset loss and customer compensation are separate accounting events; no automatic refund beyond liability.

**Current product/evidence:** Default lateFeePerDay0; wash/repair/loss design exists. Full fee policy and receipts remain unaccepted.

**Example:** Deposit 1000, approved damage200: apply200, remaining refundable800; do not forfeit1000 without contractual basis.

**Sources:** [P-REN: docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md); [P-RSET: apps/web/src/lib/rental-core.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/rental-core.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** D-111, D-112, D-113. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-acc-01"></a>

## RB-ACC-01: Invoice date versus revenue recognition

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Accrual profile distinguishes earned goods/service revenue, advances/deferred income, refundable deposits and payment settlement. Service recognition follows delivered obligations; hire arrangements require lease/service classification and period treatment. Do not infer earned income solely from cash receipt or invoice date.

**Current product/evidence:** Builders recognise invoice revenue immediately; on_confirm rental stage may precede earned service. Deferred/lease workflow not established.

**Example:** Paid1000 inOctober forNovember service: advance liability before performance; recognise earned amount when delivered.

**Sources:** [LK-SLFRS15: Sri Lanka SLFRS 15 Revenue2025 bound-volume copy](https://www.slaasc.lk/files/?C=M%3BO%3DD); [LK-SME: Sri Lanka SLFRS for SMEs2015](https://www.slaasc.lk/files/SLFRS%20FOR%20SMEs%20-%202015_1483585270_SLFRS%20FOR%20SMEs%20-%202015.pdf); [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-TIMING: packages/accounting/src/rental-invoice-timing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/rental-invoice-timing.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** D-108, B-116. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. SLFRS 15 excludes lease contracts. Expert confirms SME section 23 or full-framework treatment and hire classification before statutory acceptance.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-pay-01"></a>

## RB-PAY-01: Whole-batch payment semantics

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Default one submitted payment batch is all-or-nothing: prevalidate and lock all obligations, then commit every allocation or none. If a future partial mode is offered it must be explicitly selected, itemised and replay-safe. Preserve single-operation no-overpay invariant independently.

**Current product/evidence:** Wrappers loop individual allocations and may leave earlier successes. Current output is not an approved partial-mode contract.

**Example:** Batch bills A100/B200 whereB invalid: default cash 0/AP unchanged, no payment forA.

**Sources:** [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-115, B-106. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-pay-02"></a>

## RB-PAY-02: Overpayment, advances and valid tenders

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Accounting/product owner; Sri Lankan accountant for reporting treatment. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Document allocation cannot exceed debt; excess money uses a separately supported customer/vendor advance or unapplied balance, never a negative invoice balance. Tender must be current-tenant active nonvoid liquid asset with scope; sales revenue cannot be tender.

**Current product/evidence:** Commercial tender guards pass; rental money tender4000 accepted in RUN17.

**Example:** Customer pays700 for600 invoice: reject allocation700 or explicitly record600 settlement+100 advance through a supported workflow.

**Sources:** [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts); [P-RMONEY: apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/rental-money.ts).

**Checks to inspect/extend:** B-107, D-117, RT-023. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0022, BUG-0026.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-config-01"></a>

## RB-CONFIG-01: Module-off history and drafts

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Disabling a module preserves history and permits authorised read/report access to existing records, while denying new module writes including direct calls. Drafts snapshot prices/policy version; settings changes require explicit recalculation and reconfirmation before posting. Mandatory law effective at supply/issue date still applies.

**Current product/evidence:** Some view ceilings retain history; draft settings-snapshot and all-module transitions not established.

**Example:** Disable inventory: old stock report remains readable to permitted user; new transfer denied; old600 draft never silently becomes650.

**Sources:** [P-ACCESS: docs/ACCESS_CONTROL_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ACCESS_CONTROL_DESIGN.md); [P-ENTITY: docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** E-104, E-113, D-116. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0026.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-config-02"></a>

## RB-CONFIG-02: Legal entities and book domains

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Personal entity uses personal domain; company business only; sole-proprietor supports separate personal/business records as documented. Reports must not mix domains silently; incorporation uses new company with traceable opening transfer, preserving former entity.

**Current product/evidence:** Architecture partly planning; full operational/tax tier journey remains unaccepted.

**Example:** Owner private groceries cannot silently reduce company trading profit.

**Sources:** [P-ENTITY: docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md).

**Checks to inspect/extend:** E-103, E-105. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-file-01"></a>

## RB-FILE-01: Private record-linked file access

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and security/privacy lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Financial receipts, bank imports and rental evidence are private; download requires access to linked record and current tenant. Viewer may read attachments only when that record read is permitted. Write/delete requires matching write authority. Public branding uses an explicit safe published derivative; default financial public links denied.

**Current product/evidence:** Tenant-prefix signer regression passes; actual MinIO/HTTP role and public-link behaviour remains unaccepted.

**Example:** A Viewer with invoice read can read its permitted receipt, but cannot upload/replace it or read another branch forbidden by scope.

**Sources:** [P-ACCESS: docs/ACCESS_CONTROL_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ACCESS_CONTROL_DESIGN.md); [OWASP-AUTH: OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-110, F-119, F-122. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-file-02"></a>

## RB-FILE-02: Formats, upload bounds and content safety

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and security/privacy lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Default receipts JPG/PNG/PDF up to10MiB; product logos JPG/PNG/WebP up to5MiB. Validate actual content, safe decoding, tenant-generated keys and total resource bounds. No active HTML/SVG or scripts by default. HEIC only through an explicitly supported safe converter. Archive/import have their own documented limits.

**Current product/evidence:** Proposed ordinary-file defaults; endpoint/tunnel/current UI limits not fully audited. Archive chunk4MiB is a separate contract.

**Example:** Renamed executable receipt.jpg or oversized PDF rejects without partial business attachment state.

**Sources:** [OWASP-FILE: OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** F-106, F-120, F-121, F-123, F-124. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-data-01"></a>

## RB-DATA-01: Retention and privacy lifecycle

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Default preserve financial books/supporting evidence7years after financial year end, longer under legal hold or applicable law; exact entity/legal retention review required. Do not apply that blanket period to unrelated personal data. Keep minimised PII, purpose/access/retention records and reviewed deletion/anonymisation without breaking required books.

**Current product/evidence:** No verified automatic retention/deletion or complete PDPA workflow. VAT invoice duplicate statutory minimum is five years after relevant taxable period.

**Example:** A deletion request cannot erase an invoice required for retention; restrict nonessential contact data and record lawful decision.

**Sources:** [LK-VAT-ACT: IRD VAT Act consolidated through 2025](https://www.ird.gov.lk/si/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14%5BE%5D_2002_%28Consolidation_2025%29.pdf); [LK-PDPA: DPA legal sources and Gazette index](https://www.dpa.gov.lk/guidelines.php); [LK-PDPA-AMEND: PDPA Amendment22of2025](https://www.dpa.gov.lk/acts/22-2025_E_251104_201549%20%281%29.pdf); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** F-115, F-118. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Seven years is a delegated conservative product default, not a universal Sri Lankan legal period. Review company law, holds, rights, processor contracts and cross-border hosting.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-data-02"></a>

## RB-DATA-02: Operator recovery service targets

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Planning target: RPO≤24h and RTO≤4h for initial operator DR, encrypted offsite DB+files, monitored daily backups and isolated recovery drill before launch; improve for real payment volume. Measure achieved bounds and document incident starting point. Never promise these before evidence.

**Current product/evidence:** Operator infrastructure inaccessible; no measured recovery or accepted service guarantee.

**Example:** A restore taking6h fails4h target even if records ultimately restore; company owner download is not a daily operator backup.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** F-110. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Operator validates feasibility, cost, restore point and workload; targets can be revised through recorded owner decision.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-arch-01"></a>

## RB-ARCH-01: Owner-only export of two private files

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Export current tenant only; owner password confirmed and at least8characters, no storage of password, no auth password hashes/ops logs/foreign tenant. Two encrypted files share export identity/version and checksums; exclude _archive objects. Rate prepare1per2minutes/company, prepared downloads about15minutes.

**Current product/evidence:** v2.5.3 Owner page/export seen but no accepted full journey; v2.5.4 resolver fix not retested.

**Example:** CompanyA export cannot contain B data or teammate login hashes.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md); [P-ARCHIVE-NEW: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/TENANT_BACKUP_ARCHIVE.md).

**Checks to inspect/extend:** S-0762, S-0763, S-0764, S-0766, S-0767, S-0768, S-0769, S-0770, S-0771, S-0772, S-0773. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-arch-02"></a>

## RB-ARCH-02: Empty-target restore and identity remap

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Supported restore into a newly created operationally empty tenant only; remap tenant/row IDs and relationships, replace signup seeds, make restorer Owner and skip extra users/passwords. Second data restore denied. Empty gate covers supported trading tables, not only journals.

**Current product/evidence:** v2.5.3 bounded data restore positives pass; no credential/browser/real-storage acceptance.

**Example:** A traded tenant refuses; a seeded empty target receives remapped invoices and distinct restorer Owner.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md).

**Checks to inspect/extend:** S-0774, S-0775, S-0778, S-0779, S-0780, S-0783, S-0784. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-arch-03"></a>

## RB-ARCH-03: Restore semantic accounting and stock integrity

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Validate crypto/schema, FK/source links, per-journal nonempty balanced lines, trial hash, quantities/values/layers, document totals and scoped AR/AP including explicit approved bridges. Any failure rolls back data and leaves target operationally empty. A matching checksum alone cannot prove correct books.

**Current product/evidence:** v2.5.4 adds stock/layer and fixed-account AR/AP validators; unexecuted and requires legitimate return/manual/legacy fixtures.

**Example:** Crafted600posted invoice with AR 600 and no journal lines rejects with zero target trading rows.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md); [P-ARCHIVE-NEW: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/TENANT_BACKUP_ARCHIVE.md); [P-ARCHIVE-CHG: docs/changes/CHG-20261014-archive-backup-owner-integrity.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/changes/CHG-20261014-archive-backup-owner-integrity.md).

**Checks to inspect/extend:** S-0781, S-0782. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0030.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-arch-04"></a>

## RB-ARCH-04: Files pairing, completion and retry

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Current paired pack must match applied data export identity and both recorded cross checksums; keys rewrite only source prefix→target, fill missing objects without overwrite. Invalid required bytes cannot mark complete. Stage/validate before completion; valid earlier S3 writes after a failure remain explicitly incomplete and safe to retry. Completed apply once.

**Current product/evidence:** BUG0024wrongdataSha accepted in v2.5.3; v2.5.4 checks filesSha and refuses invalid completion, but full cross-data-checksum assurance not independently established.

**Example:** WrongdataSHA with sameexportID rejects; invalid receipt bytes never produce completed-pack audit.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md); [P-ARCHIVE-NEW: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/TENANT_BACKUP_ARCHIVE.md).

**Checks to inspect/extend:** S-0787, S-0793, S-0794. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** BUG-0024, BUG-0025.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-arch-05"></a>

## RB-ARCH-05: Legacy archive exception requires a versioned decision

**Revision 1; open-review; policy effective 2026-10-14.** Unresolved source or applicability conflict.

**Owner:** Product owner and platform operator. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Frozen paired-checksum promise remains. v2.5.4 documented exportId-only legacy v2.4.0 path must be separately identified as weaker, with explicit compatibility/owner decision and trusted provenance. Missing checksum is not matching checksum; cannot weaken existing wrong-pair assertions.

**Current product/evidence:** Latest product doc introduces exception; no independent golden legacy restore/provenance acceptance.

**Example:** Legacy missingfilesSHA cannot be reported as full cross-checksum verification.

**Sources:** [P-ARCHIVE: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md); [P-ARCHIVE-NEW: docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/TENANT_BACKUP_ARCHIVE.md); [P-ARCHIVE-CHG: docs/changes/CHG-20261014-archive-backup-owner-integrity.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/changes/CHG-20261014-archive-backup-owner-integrity.md).

**Checks to inspect/extend:** S-0787. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Resolve contract change before legacy acceptance; inspect actual goldenv2.4.0 archive rather than creating one that simply matches latest implementation.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-ui-01"></a>

## RB-UI-01: Form completion is truthful

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Pending overlay clears in finally/page-ready; GET search, filters and Cancel never initiate write pending.45 second watchdog is only fallback, not success. Single/double submit cannot cause duplicate posting; show actual operation errors.

**Current product/evidence:** v2.5.3 overlay fix documented; full live journeys unverified.

**Example:** Successful invoice save becomes usable without refresh; failure removes pending and shows error with no partial business state.

**Sources:** [P-FORM: AGENTS.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/AGENTS.md).

**Checks to inspect/extend:** E-111, S-0797, S-0798, S-0799, S-0800, S-0801, S-0802, S-0803, S-0804. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-pos-01"></a>

## RB-POS-01: POS sales, tenders, change and shift totals

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and sales lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** POS physical/service sales use shared posting rules and current register/shift scope. Cash change is not extra revenue; mixed tenders reconcile total; returns cannot exceed recorded eligible quantity/value without explicit free-return policy and authority. No ordinary hire SKU sold as physical.

**Current product/evidence:** POS design includes free returns; complete shift/tender/device/permission journeys remain open.

**Example:** Cash sale600 tender1000 gives change400, net cash/revenue 600; shift float is not revenue.

**Sources:** [P-POS: docs/POS_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/POS_DESIGN.md); [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts).

**Checks to inspect/extend:** E-110. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-gov-01"></a>

## RB-GOV-01: All-business QA scope and honest acceptance

**Revision 1; product-contract; policy effective 2026-10-14.** Existing product contract / mandatory QA invariant.

**Owner:** Product owner and QA maintainer. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Test physical, service/digital, rental and mixed businesses plus settings/roles/files/history. A rulebook is intended-behaviour source, not proof of implemented features, statutory certification or release readiness. Full workflow acceptance requires declared layers on current fingerprint.

**Current product/evidence:** 137 full workflows:57 partial bindings80unbound;259assertion slots242pass13fail4skip on5bec only.

**Example:** Adding a rule or linking a case never changes an old failed run to passed.

**Sources:** OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** No existing binding; add specification before acceptance. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Review on every relevant change; independent expert approval not yet recorded.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-lk-06"></a>

## RB-LK-06: Sri Lankan currency and business dates

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Sri Lankan profile uses LKR with two-decimal posted amounts and Asia/Colombo business dates. Store event timestamps unambiguously; ISO calendar dates do not shift across server/browser timezones. Print statutory dates separately under RB-LK-02. Explicit company financial year and tax period are separate settings. Unsupported foreign-currency/FX workflows must reject or disclose their limitation; never add unlike currencies.

**Current product/evidence:** Current document paths use LKR; complete timezone/financial-year/FX coverage has not been accepted.

**Example:** A payment at 00:15 Colombo belongs to that local business date even if UTC is the preceding date.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-PAY: apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-111, D-115, E-105. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Delegated initial product policy; confirm support, applicability and compatibility before full acceptance.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-inv-04"></a>

## RB-INV-04: Opening balances are a reconciled accounting event

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and inventory/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Opening inventory quantity and carrying value require one traceable opening accounting entry against approved opening equity/control. Product master quantity setup alone does not establish a complete financial opening. Imports of opening layers/documents must avoid a second stock/GL opening.

**Current product/evidence:** Earlier integration audit describes master opening quantity without GL; complete opening valuation reconciliation remains open.

**Example:** Opening 10 units at60 produces stock10/value600 and inventory debit600 with reviewed opening counterpart; later bill does not repeat the opening.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); [P-COST: apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** C-110, C-111. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Delegated initial product policy; confirm support, applicability and compatibility before full acceptance.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-pur-01"></a>

## RB-PUR-01: Import purchase and landed costs

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and purchasing/accounting lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Use a supported reviewed allocation basis for attributable freight/duty/clearing and other acquisition costs; exclude recoverable input tax. Preserve supplier currency, conversion evidence and settlement/FX treatment where supported. Do not present a local net-only bill as fully supported import accounting.

**Current product/evidence:** Import design includes later landed-cost scope; full import/customs/FX acceptance is not established.

**Example:** Goods1000 + attributable freight100 with recoverable VAT excluded gives inventory1100, not twice-posted freight.

**Sources:** [P-PUR: docs/PURCHASE_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PURCHASE_DESIGN.md); [LK-LKAS2: Sri Lanka LKAS 2 Inventories2025 bound-volume copy](https://www.slaasc.lk/files/?C=M%3BO%3DD); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** C-108. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Delegated initial product policy; confirm support, applicability and compatibility before full acceptance.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

<a id="rb-sal-01"></a>

## RB-SAL-01: Service and digital fulfilment

**Revision 1; adopted-default; policy effective 2026-10-14.** Owner-delegated professional product default.

**Owner:** Product owner and sales lead. **Applies to:** Relevant enabled capability, tenant/book domain and role; preserve history for disabled capabilities.

**Required behaviour:** Specify whether digital/service lines mean a one-off sale, staged work, subscription or licence. Invoice/payment state alone cannot certify delivery or entitlement. Supported access activation, renewal, cancellation and refund require explicit contracts and idempotent authorised actions; unsupported recurring features remain backlog.

**Current product/evidence:** Product has service/digital type distinction; actual licence/subscription/entitlement implementation has not been established.

**Example:** A failed payment never creates paid digital access; if no entitlement service exists, report that scenario unsupported rather than passed.

**Sources:** [P-POST: packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts); OWNER-20261014: Owner instruction to extract product rules and fill gaps for Sri Lanka.

**Checks to inspect/extend:** B-117, E-101. Related existing IDs or planned workflow IDs only; mapping is not assertion execution or acceptance.

**Known linked defects:** None assigned by this extraction; this is not a pass.

**Expert review:** pending. Delegated initial product policy; confirm support, applicability and compatibility before full acceptance.

**Changes:** Product/QA change record + independent expected fixture + new fingerprinted run; no retrospective rewrite of prior evidence.

## Source register

Each source records its checked date, exact product SHA where relevant, locator and limitations. Official sources must be rechecked for the applicable transaction date. Short paraphrases are used; original documents are not copied into this public repository.

### P-CORE

[docs/PRODUCTION_RULES.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PRODUCTION_RULES.md). Checked 2026-10-14; read.

Locator: Rules 2–8,10

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-POST

[packages/accounting/src/engine/document-posting.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/engine/document-posting.ts). Checked 2026-10-14; read.

Locator: buildSalesInvoicePosting, purchase/return/GRN builders, round2

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-SALES

[apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/commercial-docs.ts). Checked 2026-10-14; read.

Locator: createCommercialDocument, loadSalesVatConfig, nextTaxInvoiceNumber

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-PAY

[apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/documents.ts). Checked 2026-10-14; read.

Locator: allocateDocumentPayment, receiveCustomerPayments, payVendorBills

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-INV

[apps/web/src/app/actions/inventory-settings.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/inventory-settings.ts). Checked 2026-10-14; read.

Locator: DEFAULTS, supported allow/block and last/average/fifo

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-COST

[apps/web/src/lib/inventory-costing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/inventory-costing.ts). Checked 2026-10-14; read.

Locator: openLayers, receive/consumeCostLayers; swallowed exceptions are implementation concerns

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-PUR

[docs/PURCHASE_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/PURCHASE_DESIGN.md). Checked 2026-10-14; read.

Locator: Locked direction and later completed P0–P3 sections; earlier baseline/gaps are dated

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-REN

[docs/RENTAL_CATERING_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/RENTAL_CATERING_DESIGN.md). Checked 2026-10-14; read.

Locator: What must not happen, return locations, deposits, settings; earlier gap narrative is dated

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-DATES

[packages/accounting/src/rental-availability.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/rental-availability.ts). Checked 2026-10-14; read.

Locator: Inclusive YYYY-MM-DD, datesOverlap, ceil(hours/24) padding

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-TIMING

[packages/accounting/src/rental-invoice-timing.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/packages/accounting/src/rental-invoice-timing.ts). Checked 2026-10-14; read.

Locator: Invoice stage gates; not revenue-recognition certification

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-RSET

[apps/web/src/lib/rental-core.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/lib/rental-core.ts). Checked 2026-10-14; read.

Locator: DEFAULT_RENTAL_SETTINGS, overlap/timing options

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-RMONEY

[apps/web/src/app/actions/rental-money.ts](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/apps/web/src/app/actions/rental-money.ts). Checked 2026-10-14; read.

Locator: Deposit collection/application/refund and postBalanced

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-ACCESS

[docs/ACCESS_CONTROL_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ACCESS_CONTROL_DESIGN.md). Checked 2026-10-14; read.

Locator: Role/module/entity/scope ceiling; dated overview must not override current changes

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-RESOLVE

[packages/auth/src/permissions/resolve.ts](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/packages/auth/src/permissions/resolve.ts). Checked 2026-10-14; read.

Locator: Current permission fallback and privileged keys

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-ENTITY

[docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/ENTITY_TIERS_AND_TAX_ARCHITECTURE.md). Checked 2026-10-14; read.

Locator: Product model, domains; explicitly partly planning

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-RECON

[docs/BANK_RECONCILIATION_WORKBENCH.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/BANK_RECONCILIATION_WORKBENCH.md). Checked 2026-10-14; read.

Locator: Document authority, separate bank/books, staging, confirmation, no silent money

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-POS

[docs/POS_DESIGN.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/POS_DESIGN.md). Checked 2026-10-14; read.

Locator: Locked register/tender/return choices

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-ARCHIVE

[docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md). Checked 2026-10-14; read.

Locator: Frozen v2.5.3 archive spec; full live journey not verified

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-ARCHIVE-NEW

[docs/TENANT_BACKUP_ARCHIVE.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/TENANT_BACKUP_ARCHIVE.md). Checked 2026-10-14; read.

Locator: v2.5.4 integrity additions and legacy pairing exception

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-ARCHIVE-CHG

[docs/changes/CHG-20261014-archive-backup-owner-integrity.md](https://github.com/Dinu-Sri/BookOne/blob/9b8e443e4c7775eb601365e244939258225c751c/docs/changes/CHG-20261014-archive-backup-owner-integrity.md). Checked 2026-10-14; read.

Locator: Ready-for-QA, scope and legacy exception

Limitations: Specification or source evidence; no new execution or release acceptance.

### P-FORM

[AGENTS.md](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/AGENTS.md). Checked 2026-10-14; read.

Locator: Form busy overlay contract

Limitations: Specification or source evidence; no new execution or release acceptance.

### LK-VAT-RATE

[IRD VAT overview](https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Value%20Added%20Tax%20%28VAT%29.aspx?menuid=1204). Checked 2026-10-14; read.

Locator: Standard rate18% from 2024-01-01; page also has dated/possibly stale thresholds. No registration-threshold automation approved.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-VAT-ACT

[IRD VAT Act consolidated through 2025](https://www.ird.gov.lk/si/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14%5BE%5D_2002_%28Consolidation_2025%29.pdf). Checked 2026-10-14; read.

Locator: Sections 2,4,5,7,8,20(4),22,25; informational consolidation, read with2026 amendment.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-VAT-2026

[VAT Amendment Act14of2026](https://www.ird.gov.lk/en/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14-2026_E.PDF). Checked 2026-10-14; read.

Locator: Certified2026-06-30; special financial/digital regimes, do not apply ordinary-SME rate indiscriminately.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-INVOICE

[Gazette2481/22 invoice specification](https://www.ird.gov.lk/en/publications/Gazette_Documents/2026_2481-22_E.pdf). Checked 2026-10-14; read.

Locator: Annexure I2–4; PDF text and pages1–2 screenshot requested; serial separators/example need expert interpretation.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-INVOICE-DATE

[Gazette2500/106 effective-date amendment](https://www.ird.gov.lk/en/publications/Gazette_Documents/2026_2500_106_E.pdf). Checked 2026-10-14; read.

Locator: Effective date changed to2026-10-01; other matters unchanged.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-SME

[Sri Lanka SLFRS for SMEs2015](https://www.slaasc.lk/files/SLFRS%20FOR%20SMEs%20-%202015_1483585270_SLFRS%20FOR%20SMEs%20-%202015.pdf). Checked 2026-10-14; read.

Locator: Sections 1 eligibility,13.16–18 cost techniques/formulas,20.24–26 operating leases,23.14–22 service revenue. Local applicability and later amendments need per-entity review.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-LKAS2

[Sri Lanka LKAS 2 Inventories2025 bound-volume copy](https://www.slaasc.lk/files/?C=M%3BO%3DD). Checked 2026-10-14; read.

Locator: Follow file LKAS 2-Inventories _1754043513; PDF read, paras 9–11,23–27. Official index is linked because filename contains extensive spaces.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-SLFRS15

[Sri Lanka SLFRS 15 Revenue2025 bound-volume copy](https://www.slaasc.lk/files/?C=M%3BO%3DD). Checked 2026-10-14; read.

Locator: Follow file SLFRS 15-Revenue _1754044324; PDF read, paras 5,31,35,46. Lease contracts outside scope.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-SSCL

[IRD SSCL overview](https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Social%20Security%20Contribution%20Levy%20%28SSCL%29.aspx). Checked 2026-10-14; read.

Locator: Separate tax regime; activity/liable turnover and date-specific applicability must be evaluated, no flat invoice default adopted.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-PDPA

[DPA legal sources and Gazette index](https://www.dpa.gov.lk/guidelines.php). Checked 2026-10-14; read.

Locator: Act9of2022, amendment22of2025, Gazette2498/16 dated2026-07-22, several regulations still labelled draft. Gazette PDF fetch failed; no certified commencement scope claimed.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### LK-PDPA-AMEND

[PDPA Amendment22of2025](https://www.dpa.gov.lk/acts/22-2025_E_251104_201549%20%281%29.pdf). Checked 2026-10-14; read.

Locator: Section 2 changes commencement by Gazette; stale2025 enforcement headline cannot be used alone.

Limitations: Applicability and interpretation require Sri Lankan subject expert review.

### OWASP-AUTH

[OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Checked 2026-10-14; read.

Locator: Least privilege, deny by default, permission checks each request.

Limitations: Engineering guidance, not Sri Lankan legislation.

### OWASP-FILE

[OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html). Checked 2026-10-14; read.

Locator: Allowlist, inspect content, size limits, authorization, safe storage.

Limitations: Engineering guidance; chosen formats/limits are BookOne policy.

### OWNER-20261014

Owner instruction to extract product rules and fill gaps for Sri Lanka. Checked 2026-10-14; instruction.

Locator: This conversation2026-10-14: maintain human-readable editable rules; professional defaults permitted; future expert review requested.

Limitations: Delegates product defaults; does not certify legal/accounting applicability or change production configuration.
