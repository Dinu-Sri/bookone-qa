# BUG-0037: Excessive discounts accepted instead of rejected

P1 delegated policy-adoption gap, open. Candidate **v2.5.5 · 8e1a2b8**; RT-036/037, BR-SAL-03 adopted-default (not a statutory rounding mandate).

Header101 against gross100 succeeds with zero AR/VAT and persisted business mutations. A line discount101 against a100 line plus a second valid100 line succeeds, posting AR116.82/VAT17.82 from net99. Expected refusal and unchanged business snapshot; invalid negative line net must not be hidden by another positive line.

Source schema enforces nonnegative discounts but no upper bound; command and builder clamp negative totals instead of validating the discount. Repair exact-decimal bounds per extended line and valid header-discount base before party/document/posting writes. Legitimate full100% discounts/free lines require a separate supported zero-value policy; this finding does not say all zero-value invoices are invalid.

Adjacents: fixed/percent discount records, invalid inactive/foreign IDs, excessive percentage, rounding boundaries, full valid discounts, mixed SKU/account/tax inputs, retry and atomic failure. Preserve valid350+VAT63 invoice positives.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Actual isolated commands with synthetic roles, no deployed browser acceptance or staging writes.

Supported classification [follow-up](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json) independently reproduces both accepted excessive-discount variants. Expected refusal remains unchanged.

## v2.5.6 bounded retest - 2026-10-15

RT-036, RT-037 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
