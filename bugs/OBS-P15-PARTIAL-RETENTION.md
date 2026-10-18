# P2 — stock refusal preserves lines but resets dates and notes

Observed on `v2.5.15 · 158ddc2`, full SHA `158ddc2043b5d12f85124f77adf9bd7e36492838`. P15-08 fails; prior OBS-N18-INPUT-RETENTION remains open with a narrower symptom after the redirect fix. WB-CORE.J06.C07/RB-UI-01 expectations are unchanged. [Run](../runs/RUN-20261018-v2515-pilot.md), [evidence/correction](../runs/CHECKS-20261018-v2515-pilot.json).

1. Sign in as the intended synthetic Owner in its own company. Set negative stock to Block; VAT registration false, valuation Last cost. Separately quick-create a fresh Physical SKU and verify on hand zero.
2. Enter a new invoice with the existing own customer, SKU quantity 1/price 10, issue 18 October 2026, delivery 19 October, due 25 October, and distinct nonempty notes. Record every field before Post.
3. Post once. Inspect the form and persisted invoice/journal/stock state before any retry.

Expected: an actionable shortage error, every input retained for correction, and no invoice/journal/AR/stock mutation. The deliberately quick-created catalog product must persist.

Actual: the form stays open and retains SKU/quantity/price, but delivery resets 19→18 October, due clears, and notes clear. Stock remains zero; invoices stay at 15/latest INV-0015; journals stay at 41/debits 7,257.39. The first toast wording was not captured. A screenshot is retained privately; no financial retry was made. Separate P15-09 client 150% refusal retains the exact dates and notes with a clear 100% error.

Source observation: the pinned invoice form wraps its action with `toastIfFormError`. Dates, notes and payment mode use `defaultValue`, while lines use state. Hypothesis: the action wrapper resolves after a business error and uncontrolled fields reset. Medium/coding agent must verify the mechanism; it is not a proven runtime cause.

Expand regression coverage to issue/delivery/due dates, notes, payment mode, dimensions, applicable tax/export fields and shared forms. Only delivery/due/notes loss was directly reproduced here. Preserve the first attempt and earlier failed records; a controlled-lines-only test is inadequate.

After a fix, retest the exact server refusal with values different from defaults and unchanged business snapshots, then a supported correction in the same retained form that posts once. Keep the client 150% and normal posting controls. Do not reset, repair or write off historical fixtures. This is not release approval.
