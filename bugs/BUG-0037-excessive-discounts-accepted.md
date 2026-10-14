# BUG-0037: Excessive discounts accepted instead of rejected

P1 delegated policy-adoption gap, open. Candidate **v2.5.5 · 8e1a2b8**; RT-036/037, BR-SAL-03 adopted-default (not a statutory rounding mandate).

Header101 against gross100 succeeds with zero AR/VAT and persisted business mutations. A line discount101 against a100 line plus a second valid100 line succeeds, posting AR116.82/VAT17.82 from net99. Expected refusal and unchanged business snapshot; invalid negative line net must not be hidden by another positive line.

Source schema enforces nonnegative discounts but no upper bound; command and builder clamp negative totals instead of validating the discount. Repair exact-decimal bounds per extended line and valid header-discount base before party/document/posting writes. Legitimate full100% discounts/free lines require a separate supported zero-value policy; this finding does not say all zero-value invoices are invalid.

Adjacents: fixed/percent discount records, invalid inactive/foreign IDs, excessive percentage, rounding boundaries, full valid discounts, mixed SKU/account/tax inputs, retry and atomic failure. Preserve valid350+VAT63 invoice positives.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Actual isolated commands with synthetic roles, no deployed browser acceptance or staging writes.
