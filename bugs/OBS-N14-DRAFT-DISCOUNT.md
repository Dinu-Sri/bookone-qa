# OBS-N14-DRAFT-DISCOUNT — unchanged draft edit drops line discount

**P2, reproduced in deployed v2.5.14 · a36af04**, exacta36af042753f3ad8b40246d6cd579deac9233ba7. Fresh synthetic QA N141710 / own new company / loaded Owner context. BR-SAL-03rev1 and document preservation contracts; related new WB-CORE.J04.C06. This is separate from BUG0037 excessive-discount validation.

1. Create physical product N14 Widget, sell price100. Invoice customer N14 Physical Customer, qty3, line10%, header5%. Preview subtotal270, header13.50, total256.50.
2. Save draft once: INV-20261017-0001 draft256.50. Journal readback0. Detail later still shows line-net270/header13.50/total256.50, GL Not posted.
3. Open list Actions → Edit without changing fields. Line discount value is blank, typepercent; line amount/subtotal300, copied headerfixed13.50, preview286.50.
4. Cancel without saving/posting; original draft remains256.50. Preserve it as evidence. No inflated invoice was posted in this test.

Expected: unchanged edit hydrates the saved line discount or an equivalent explicit source amount. Preview remains256.50; cancel creates no money/stock changes. Test unchanged Save and Post separately after the repair, with exact line/header semantics, journal/stock/audit/readback controls; these branches were not executed here.

Pinned source corroboration: apps/web/src/app/sales/invoices/[id]/edit/page.tsx passes doc.lines to draft. apps/web/src/components/sales/invoice-document-form.tsx Gitblobcbeac614c6930c7bcfcf421808983b1ab22cbea2, lines20–150, DraftInvoice line shape and draft.lines.map copy identity/description/qty/unitPrice but omit line discount fields. Header is restored as fixed13.50. This explains the observed editor discrepancy; complete persistence contract and equivalent quotation/order paths still need impact review.

Evidence: RUN-20261017-v2514-browser-wave.md / CHECKS-20261017-v2514-browser-wave.json. Product/code snapshots, private credentials and raw traces excluded. Browser connection timed out later before sales-return inspection; this is an infrastructure block, not evidence of a sales-return application failure. Original source-level three concerns and older live defects remain separately open.
