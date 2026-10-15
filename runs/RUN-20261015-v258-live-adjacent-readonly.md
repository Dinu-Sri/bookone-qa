# v2.5.8 deployed adjacent read-only checks

2026-10-15, owner-designated staging https://bookone.clossyan.com. Live stamp **v2.5.8 /cf35da1**, pinned product cf35da1244e902e4a41291bc409eb0d994ed4e01 (master independently rechecked unchanged). QA local starting checkpoint681de65; public implementation/evidence branch PR32 at b0cf4a4d0db98d0555ec8cc20eedf41dd39d9ca4. Rulebook1.0.0 /hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. BR-ACC-04 /BR-STK-01 and existing physical lifecycle expectations; no rule changes or expert certification.

Intent before navigation: preserve the original P257-Physical fixture and compare deployed invoice/allocation, AR/AP, remittance, stock and journal to the recorded final amounts; send no financial POST. Fresh P257-Owner credential login performed through the authorized Chrome instance and selected user tab; loaded job Owner and active QA Physical257's Company confirmed. This also confirms the previous supported company switch took effect across the fresh authentication boundary; its immediate display had been stale. No Admin grant or P258 module setup involved.

| Required observation | Actual deployed result | Outcome |
|---|---|---|
| Identity/build | Fresh normal credential login; Owner/P257-Physical/v2.5.8 cf35da1 | Pass |
| Existing invoice | INV-20261015-0001, customer/item correct, quantity4 at100; total400, settled250, due150, posted | Pass |
| Existing supplier remittance | Company/supplier/date2026-10-15/account1000/PUR-20261015-0001/amount200 render | Pass |
| AR aging | As-of2026-10-15 current150; all overdue buckets0; matching invoice/customer/due2026-11-14 | Pass |
| AP aging | As-of2026-10-15 current400; all overdue buckets0; matching bill/supplier | Pass |
| Stock levels | Warehouse7 units/available7/cost60/value420; Default0; totalvalue420 | Pass |
| Journal integrity/no duplicate posting | Still6 balanced entries/debits=credits2750; supplier200, return100, receipt150, invoice400, bill600, capital1000 | Pass |
| Stock movement trail | Exactly3 movements: GRN+10, invoice-4, return+1, each cost60 | Pass |

These eight bounded observations are not eight accepted full workflows or additions to the303 isolated assertion count. Visible amounts/rows were checked through the real deployed browser; no screenshot file was saved by the available automation surface and no DB-level live snapshot is claimed. No new company/product/document/payment/stock movement was created; no payment replay, archive or backup action. Browser control became available after the user requested another check. One aging navigation took approximately62 seconds end-to-end through the tool; server performance cannot be inferred from that duration alone.

This extends BUG-0045 receipt-adjacent rendering evidence to vendor remittance and original allocation/subledger/stock consistency. It does not verify actual OS print output, tampered receipt query authorization, all currencies/multi-allocation, browser Viewer/foreign access, GRNI-on/variable-cost/partial/lock cases or all generic list labels. BUG-0046 persisted first alternate-vendor PO remains blocked by BUG-0050/default capabilities and pending exact module setup approval. BUG-0049 cross-month reporting and HTTP BUG-0051/0052 remain open; no old defect reopened. Customer readiness is NOT certified. Real backup/restore stays LAST.

Next: continue actual physical settings/variable-cost/GRNI/roles on separately tracked fixtures once setup is supported; complete service/digital/rental/mixed layers. In parallel diagnose HTTP redirects and non-owner ERP session loading with fresh isolated runs and no security bypass. At end of this read-only batch the browser is on original stock ledger under normal Owner.

Follow-on filter observation at the same live stamp: visible ledger search by SKU retained the3 matching movements; a unique non-matching query showed No stock movements; clearing restored the exact+10/-4/+1 rows. No Working overlay remained during these observed states. Bounded client-filter/overlay positive, not every GET/navigation/form or server-side filter acceptance. No record writes.
