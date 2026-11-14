# Prior findings retained as workbook regressions

This links the prior deployed v2.5.11 findings to detailed specification targets. Product v2.5.12 describes repairs; no repair was independently accepted during workbook publication. Preserve original bug/run/check records and expected values. A nearby case does not replace the exact original reproduction: pin a fresh candidate, rerun the original and adjacent cases, and record all required layers before closure.

| Existing finding | Workbook target | Original/adjacent expectations retained |
|---|---|---|
| [BUG-0056](../../bugs/BUG-0056-po-cumulative-receipt-limit.md) | PHY.J03.C03–04 | PO10; receive4 then7 denied, remaining6; bills through GRN descendants count toward PO remaining |
| [BUG-0057](../../bugs/BUG-0057-duplicate-supplier-bill-error-page.md) | PHY.J02.C04; PHY.J03 | Sequential/concurrent supplier duplicate and GRN→bill duplicate conversion: preserve first bill, actionable validation, no unhandled error page or second posting |
| [BUG-0058](../../bugs/BUG-0058-payment-print-query-integrity.md) | CORE.J01.C05; PHY.J10.C05 | Actual persisted payment80 cannot print999 through URL alteration; read-only recovery after failed receipt/remittance page |
| [BUG-0059](../../bugs/BUG-0059-duplicate-purchase-return.md) | PHY.J06.C03 | Purchase4×60 fully returned once; second full return denied; source/value/stock/journal preserved |
| [BUG-0060](../../bugs/BUG-0060-initial-line-discount-selection.md) | SVC.J03.C01 | Initial default and visible state agree:3×100,10%line+5%header→256.50; preview/post/reload/print agree |
| [BUG-0061](../../bugs/BUG-0061-payment-overbalance-feedback.md) | CORE.J01.C03 | Pay300 against240 refused with actionable error; no cash/allocation mutation; valid240 control still works |
| [BUG-0062](../../bugs/BUG-0062-linked-return-preview-discount.md) | HYB.J02.C05 | Source275.50 with header discount previews/posts275.50 on permitted full return; no changed-default recalc |
| [BUG-0063](../../bugs/BUG-0063-aging-asof-scope.md) | PHY.J12.C03; CORE.J03.C02–03 | As-of15Oct includes690 issued14Oct, excludes275.50 issued16Oct; additionally exclude future payments and credits |
| [BUG-0037 draft follow-up](../../bugs/BUG-0037-excessive-discounts-accepted.md) | SVC.J01.C04; SVC.J03.C04 | Draft quotation150% explicitly rejected; do not silently cap to100%; preserve earlier posted-invoice disposition |

Journey references abbreviate WB- prefixes; resolve in [the books](LIBRARY.md). Current baseline evidence remains [the broad browser run](../../runs/RUN-20261016-broad-workflows.md). This is a mapping, not a new defect reproduction, closing decision or acceptance result.
