# Mission1 grouped coding handoff

Mission1 reviewed live v2.5.28 · 48e4407 on 15 November 2026 UTC. Product baseline `48e44072f43d8d26338d793c6692767e8b7d2082`, tree `06cb8f5c967ff3edab6361123ddc029778f087b0`; frozen QA `24534f7b95901dba29ef933fa3c3d5045c107d05`. This is one grouped fix request, followed by independent candidate review, owner deployment and Mission2 affected regression. No agent deployment or customer launch approval.

## 1. P1 — enforce POS register write permissions

Freshly authenticated existing A Viewer was independently identified as Viewer in A before testing. Direct `/sales/invoices/new` correctly says “Cannot create invoices”; the original owned invoice remains readable. However `/company/sales` renders enabled Save VAT settings, register Save/Archive and Add register controls. Simple Entry also renders its Record action, and invoice detail renders Archive.

The register issue extends beyond presentation: `apps/web/src/app/actions/pos-registers.ts` exports `savePosRegisterFromForm` (line100) and `archivePosRegisterFromForm` (174). They call `requireTenantContext` then perform tenant-scoped writes, with no `assertPermission` or equivalent write check. `requireTenantContext` in `packages/auth/src/session.ts:354` verifies active membership/workspace; it does not authorize this operation. The visible company-sales page wires forms directly to these actions. By comparison `sales-settings.ts:118` checks `company.sales_settings.write`, and Simple Entry checks `accounting.simple_entry.write`. Tenant isolation does not establish role authorization.

Add the appropriate existing company-sales/register write permission at every mutation entry point before any mutation, and derive UI capabilities from the same policy. Disable or omit write forms/actions for read-only jobs, including relevant detail/entry controls. Audit adjacent register mutations and the read-path default-register safety net. Do not replace tenant/location predicates. No live Viewer Save/Archive or register change was attempted, so successful unauthorized live mutation is NOT claimed.

Required isolated regression: Owner allowed; Viewer and a custom read-only job denied even when calling the actual server actions directly; denied calls leave register/settings/audit state unchanged; cross-tenant register/location IDs fail; valid same-tenant authorized edits work. Cover save/create/archive, last-active-register protection, module/permission ceilings, and the existing VAT-settings guard. UI route/control tests supplement these server tests.

## 2. P2 — strict payment row validation and identical preview/submission batch

Both Receive Payments and Pay Vendors retain the previous unsaved invalid-input feedback finding. Fresh execution of exact product `document-guards.ts` helpers confirms selected blank/zero/negative/nonnumeric/nonfinite/excess-precision rows lack field errors; `1abc` is silently parsed as1. Over-cap values do get an error.

Both forms sum selected parsed rows for the displayed total, then filter positive rows for submission. With original AR caps708/141.60, selected -1 and141.60 preview140.60 but submit141.60. AP caps708/94.40 preview93.40 but submit94.40. This is source/helper characterization, not a fresh live open-row matrix: all original documents are now settled, and no invoices/bills were created to recreate it. No invalid payment was submitted.

Validate raw selected strings before coercion: required positive finite currency, agreed two-decimal precision, valid separators, cap in integer cents. Ignore unselected rows consistently. Use one validated allocation collection for per-row feedback, total, disabled state and submitted payload. Revalidate server-side, atomically, against fresh remaining balance and ownership; preserve idempotency and original refusal evidence. Server schema currently requires positive numeric allocation but does not itself specify a two-decimal constraint. No wrong-money acceptance is established.

Required original and adjacent matrices: blank,0,-1,abc,1abc,Infinity,NaN,1.001,valid cents,equal cap,one cent over cap, deselected invalid row, all-invalid, mixed valid/invalid, AR and AP multirow, fresh cap/concurrent settlement, cross-company document/account, duplicate/idempotency, atomic rollback. Exercise the actual server actions and persisted allocations/journals in isolated PostgreSQL/HTTPS, not just a copied formula.

## 3. P2 — purchase net/VAT/gross preview

Fresh unsaved V purchase: Claim input VAT18% selected, physical goods2 ×60, subtotal120 and Total120; no VAT21.60 or gross141.60 row. Canceled without Save purchase. Existing saved bill shows600+108=708, so the display defect does not prove wrong posting. `commercial-doc-screens.tsx` uses a net-only computed total. Show net, discount, input VAT and payable gross using the posting policy; retain source profiles for PO/GRN conversion. Cover direct credit/cash purchase, conversion, service, non-VAT, partial returns, discounts and cents. Do not change historical posted amounts or informational nonposting semantics.

## 4. P3 — VAT memo percentage formatting

Original V POS service journal freshly reopened: memo `Output VAT 18.000000000000004%`, amount21.60 and gross141.60 correct. `packages/accounting/src/engine/document-posting.ts:177` interpolates the rate directly. Format the percentage for human-readable output without changing money calculations or historical journals. Test18%, fractional rates, zero and linked returns.

## 5. P3 — informational document labels

Original converted QT/SO goods600 and service120 retain required13/15Nov dates and Not posted status, but detail displays “Tax invoice” beside quotation/order numbers. Make document type, tax treatment and posting status unambiguous. Verify manual previews safely; physical print/hardware was not tested. Do not relabel nonposting quote/order net figures as posted tax totals without an explicit presentation policy.

## 6. VAT report capability decision

Live Reports and exact `app/reports/page.tsx` expose P&L, Balance Sheet, Cash Flow, General Ledger and Trial Balance. A standalone VAT report is not present on this surface. Input VAT208.80/output VAT90 reconcile to accepted source documents/accounts; that does not establish a statutory return. Define the intended VAT summary/report scope, filters, input/output/returns correspondence and export permissions, then implement if required. This is an unavailable capability/acceptance gap, not a proven calculation defect. Synthetic18% does not certify legal tax registration or filing compliance.

## Qualification and handback

Preserve all existing V/N/A/B data, Walk-in, dates and closed shifts. Never replay CONT11 or any earlier funding/payment/sale/refund/shift queue. Original POS118 refund preview is already fixed and accepted; do not reopen that completed transaction.

Return exact product commit/tree/version, grouped diff, focused original+adjacent regressions, isolated PostgreSQL/HTTPS results with real RLS roles, and any remaining limitations. Mission1's fresh host99/99 and auth resolver33/33 are limited checks, not proof of the actual server action matrix. Local Docker engine was unavailable; no live database/admin diagnostic substituted. Independent Medium review precedes owner merge/deployment. Mission2 then verifies deployed affected paths, export/server authorization gaps and operating handover; isolated backup/restore/recovery remains LAST. Any final fix requires its affected retest before acceptance.
