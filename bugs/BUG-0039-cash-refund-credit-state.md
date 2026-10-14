# BUG-0039: Cash-refunded ordinary credit remains outstanding

P1 open. Candidate **v2.5.5 · 8e1a2b8**, B-105, BR-SAL-02/BR-ACC-02 reconciliation.

Pay a100 service invoice, then submit a full linked sales_return with cash1000 as refund account. Cash and AR net to0 and revenue/returns offset correctly, but the successful refunded credit shows paidAmount0/balanceDue100. The original payment allocation count remains1. Expected refund state paid100/balance0, original receipt retained.

Source `settled` recognises a cash sales return only with posMode='return', although the ordinary sales-return path accepts paymentAccountCode and posts cash out. Align supported ordinary refund state with its durable cash effect; do not merely label a credit paid without verifying its actual refund transaction.

Initial assertion checked original allocation counts, not full receipt row identity. Follow-up strengthens B-105 to compare original allocation/payment transaction/journal/lines, with nonempty positive controls; fresh run pending. Real payout retry/concurrency and credit settlement UI still require separate evidence.

Corrected [follow-up](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json) executes nonempty receipt controls and observes receiptRowsUnchanged1 (exact serialised original allocation/transaction/journal/line collections). Credit still paid0/balance100; B-105 **overall fails**, so this observation does not mark the refund journey passed. RT-041 independently demonstrates repeat cash payout beyond source value. Earlier pending/count-only evidence is preserved.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Synthetic session, actual product command/SQL; no browser/real storage certification or staging writes.
