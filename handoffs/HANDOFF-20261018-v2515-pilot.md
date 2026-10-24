# v2.5.15 pilot: coding-agent and Medium handoff

**Candidate remains unapproved. All 12 scenarios have dispositions: 10 passed, 1 failed, 1 blocked.** Live `v2.5.15 · 158ddc2` matched product `158ddc2043b5d12f85124f77adf9bd7e36492838` at start and end. QA execution base: `ab0a997e7b5004693e761407172c9cd661ca2727`.

Read the [run](../runs/RUN-20261018-v2515-pilot.md), [exact results and corrections](../runs/CHECKS-20261018-v2515-pilot.json), and [remaining retention defect](../bugs/OBS-P15-PARTIAL-RETENTION.md).

## Results for the coding agent

The discounted tax full return passed at 302.67: net 256.50, VAT 46.17, header discount 13.50. The UI refused duplicate rows of 2+2 against three sold, with no business mutation. A valid 1+1+1 return retained price 100 on each row, credited 300 and reversed cost 180.

Adjacent controls passed: partial credits 85.50/171, rounding credits 1/1/0.99 for a 2.99 source, historical VAT 118 after registration was switched off, client 150% refusal retaining all fields, own-party UI locks, and a fresh digital SKU under blocked negative stock. These are bounded browser results. Server denial, foreign roles, races, audit, upgrades and purchase analogues remain unaccepted; do not blanket-close return findings.

**The retention fix is incomplete.** A stock refusal preserves the product line, but delivery date resets from 19 to 18 October, due date clears from 25 October, and notes clear. The first attempt is preserved; no financial retry was made. No invoice, journal or stock movement resulted. The separate client 150% guard retains all fields.

Investigate whether uncontrolled fields reset when the form action resolves after returning a business error. This is a source-supported hypothesis, not a proven runtime cause. Add meaningful field-by-field regression coverage for dates, notes, payment mode, dimensions and applicable tax/export fields across shared forms. Only delivery/due/notes loss was reproduced here. Keep OBS-N18-INPUT-RETENTION open; a line-only retention assertion is inadequate.

## Medium review required

P15-01 requires a fresh 6.95 source with six prior credits of 0.99. The new cap intentionally makes the sixth credit 1.00 after five credits of 0.99. The preserved old source has already consumed all seven units and must not be altered. The frozen queue case is blocked, not passed; its expectation was not rewritten.

Design a reviewed fresh conservation ladder and a separate prior-version six-times-0.99 upgrade fixture in an appropriate authorized isolated environment. Closing 1.01 has not been independently verified live. See the [fixture intake](../changes/INTAKE-20261018-pilot-residual-fixture.md). Do not replay or add excess quantity against the old source.

The stock ledger now exposes the historical impact of bad SR-0010: +2 units at cost 60 and +2 at cost zero. Opening stock was 10 units/value 600 versus GL 480; final stock is 7/value 420 versus GL 300. The inherited 120 gap remains. New valid split/partial movements match their costs. Do not repair/delete old records or claim the fix repairs issued data.

## Preserved state and continuation

Final: 45 journals, debits = credits 7,261.39; AR 706.21; AP 540; inventory GL 300; VAT 46.71; profit 419.50. Assets and liabilities plus equity both equal 1,006.21. Eight new invoices INV-0010–0017 and ten returns SR-0016–0025 remain. INV-0011 is an intentionally open 300 denial source; the other seven new sources are fully returned. Two quick-created catalog SKUs remain.

VAT registration false, rate 18, export rate zero, department 01, negative stock Allow and last-cost valuation were restored/confirmed by reload. Older fixtures remain untouched. No payments, writeoffs, balancing entries, resets, access grants, merges or deployments. Actual encrypted backup/restore remains LAST.

The checkpointed execution took 33.1 minutes without another user prompt. Model setting and credit usage were unavailable, so no cost saving is claimed. Medium should review this evidence before broader Light rollout. Existing deterministic runners remain the automation path; this pilot adds no unattended browser adapters.

Post-run library 1.4.1 clarifies existing CORE C07; CORE book revision 6/J06 revision 4. All 271 canonical cases remain draft/unbound/not-run. Thirty-five harness checks and generated consistency checks pass; full `pnpm check` was not run in the partial checkout. An appended correction preserves a QA transcription error in the original P15-08 record: the actual intermediate journal turnover was 7,257.39, not 7,277.39.

Next: fix and retest all-field server-error retention; resolve the residual fixture; then continue PO → partial GRN → billing/GRNI → approval and stock layers. The owner manually relays repository links; QA sent no direct message.
