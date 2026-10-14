# BUG-0035: Full linked credit ignores original header discount

P1 open. Candidate **v2.5.5 · 8e1a2b8**, RT-034, rules BR-SAL-02/03 and BR-DAT-01. Actual PostgreSQL/product command, synthetic Owner session; browser exposure unverified.

Original taxable service invoice2x200 minus line discount20 minus header30 =350, VAT63, total413. Submit full linked return with the same source/lines/discounts. The credit stores subtotal350, but posts return revenue380, VAT68.40 and total448.40. Combined AR becomes -35.40 and output VAT debit5.40. Expected full reversal350/63/413 with AR/VAT zero.

Source: commercial-docs passes saleLines to buildSalesReturnPosting, whose input omits headerDiscount. Source-tax rate lookup is preserved, but original discounted taxable base is not. Repair against original recorded net/allocated discounts and tax buckets; validate source and cumulative refundable amount atomically. Do not rely on current discounts/master prices or silently clamp excess customer credit.

Required adjacent controls: partial returns/proportional header discount and remainder, multiple lines/rates if supported, changed tax/master settings, paid vs unpaid sources, repeat/full return limits, fault rollback and print/export agreement. Original VAT snapshot positive RT-033 passes.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). No live staging writes or statutory-format acceptance. Existing rulebook hash unchanged.

Supported standard/unregistered fixture [follow-up](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json) reproduces the same448.40/35.40 excess; first evidence remains immutable.
