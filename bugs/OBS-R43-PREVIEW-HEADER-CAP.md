# P2 source-confirmed — preview omits exhausted header cap

Pinned product: v2.5.15 / `158ddc2043b5d12f85124f77adf9bd7e36492838`. New related case: WB-HYB.J02.C11. Not independently reproduced in the deployed browser; this is a source calculation finding, not a newly posted live transaction.

Fixture: digital source seven units at 1/header 0.05, five legitimate prior one-unit credits of 0.99. All five header cents are consumed; two units/value 2.00 remain. Expected under the declared capped allocation: sixth non-closing preview and posting both 1.00/header zero, with unchanged prior facts.

Executed the actual extracted calculation bodies from sales and purchase forms with the real line-amount/helper functions. Both preview 0.99/header 0.01; `prorateLinkedReturn` caps header to zero and returns 1.00. Ten-unit variant diverges at steps six through nine. Fresh cumulative conservation still passes; that does not certify preview/post consistency.

Cause at source level: both preview bodies call `prorateSourceHeader` then `linkedReturnPreviewTotals`, without using the posting path's remaining-header budget cap for non-closing returns. Fix shared preview/post semantics; do not change the expected amount to the displayed 0.99 or let cumulative header exceed the source budget.

[Diagnostic results](../runs/CHECKS-20261018-pr43-source-review.json), [review](../reviews/REVIEW-20261018-pr43.md), [fixture plan](../docs/workflows/RESIDUAL_FIXTURE_PLAN.md). Retest both sales/purchase paths, intermediate steps, 2.99 control, full source, VAT and source-price/party controls at a fresh candidate. Real server/DB/browser evidence remains required. No historical records changed.
