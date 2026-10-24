# Coding-agent handoff: 18 October deep browser batch

QA tested **v2.5.14 · a36af04**, exact product commit **a36af042753f3ad8b40246d6cd579deac9233ba7**. The batch contains **87 bounded assertions: 70 passed, 11 failed and 6 inconclusive**, grouped into **three P1 findings and one P2 finding**. Three concerns previously tested only against source now reproduce through the deployed sales UI. The candidate remains unapproved.

Read the [full run](../runs/RUN-20261018-v2514-resume.md), [expected and actual outcomes](../runs/CHECKS-20261018-v2514-resume.json) and [workbook maintenance record](../changes/WCHG-20261018-v2514-resume.md).

| Priority | Finding and preserved reproduction | Required result |
|---|---|---|
| P1 | [Final residual](../bugs/OBS-N18-RESIDUAL.md): INV0003 is seven units totaling 6.95. Six credits of 0.99 leave 1.01. The final return previews 1.01 but posts 1.00, leaving 0.01 due. | Conserve the original amount and reconcile preview, economic fields and posting. Retain the passing three-unit 1 + 1 + 0.99 control. |
| P1 | [Duplicate quantity](../bugs/OBS-N18-DUPLICATE-QTY.md): INV0004 sold three units. Return rows 2 + 2 are accepted as SR0010; four units persist, the second row is zero-priced, and a 200 credit posts instead of the 300 preview. | Aggregate quantities against stable source identity. Refuse excess atomically; handle legitimate duplicate rows without zeroing their economics. |
| P1 | [Tax gross/net](../bugs/OBS-N18-TAX-GROSS-NET.md): INV0005 has net 256.50, VAT 46.17 and gross 302.67. A valid full return loses the 13.50 header discount and is refused as exceeding remaining value. | Preserve source discounts and reconcile net, tax and gross residuals. Full credit must be exactly 302.67. The separate no-header 118 control passed. |
| P2 | [Input retention](../bugs/OBS-N18-INPUT-RETENTION.md): a correct zero-stock refusal redirects to the list and discards the invoice entry. | Retain editable inputs and actionable feedback with no financial mutation. This is adjacent to, and does not undo, the passing 150% client-validation repair. |

Please supply the exact fix SHA, CHG, actual test output and lasting regressions covering both return sides, prior credits, legitimate duplicates, rounding direction, tax boundaries and historical settings. Do not change independent expectations to match output or repair the bad QA fixtures. QA will independently retest before closing findings. Existing HYB.J02.C08–C10 and new CORE.J06.C07 contain the relevant contracts; mandatory maintenance under AGENTS73–81 applies to agents and humans.

Verified positives include source party/price/discount UI locks; 85.50 + 171 partial returns; historical AR of 256.50 before today's credits and zero current AR for that source; no extra financial write from an excess-unit attempt; correct three-unit 2.99 closure; a no-header VAT return of 118 with VAT reversal of 18 after the current registration flag was turned off; physical stock denial versus a digital positive under the same block policy; and statement/subledger reconciliation. UI locks do not prove server mismatch or foreign-tenant denial. Stock master quantities, layers, locations, audit snapshots, roles, races, locks and PO/GRNI workflows remain incomplete.

Two items require careful interpretation:

- [Net 30 review intake](../changes/INTAKE-20261018-payment-terms-aging.md): AP totals 540 correctly, but a Net 30 bill with an optional due date left blank ages from its issue date. The business owner must resolve the contract before term-derived aging acceptance.
- The duplicate-bill attempt had ambiguous submission/feedback; readback remained two purchases and 25 journals at that checkpoint. Do not claim the duplicate guard passed. An initial intended 2.99 fixture was also created while VAT was enabled and posted at 3.53; it is preserved and excluded. A correctly configured later fixture passed.

Preserve QA N141710's company, the old INV0001 draft at 256.50, and every prior fixture. New failure fixtures are INV0003/SR0003–0009, INV0004/SR0010, and untouched tax source INV0005 at 302.67. The invalid first fixture INV0006 remains open at 3.53. Controls INV0007, INV0008 and INV0009 are paid at 118, 2.99 and 1 respectively.

Final readback: **27 journals; debits and credits 4,097.07; AR 406.21; AP 540; inventory GL 480; output VAT 46.71; profit 299.50; assets and liabilities plus equity 886.21.** VAT registration is restored to false and negative-stock policy to allow, both verified after reload. Last costing and VAT rate 18 are unchanged. No writeoff, balancing entry, reset, deletion, payment, access grant, merge or deployment was used.

Library 1.4.0 contains 271 draft, unbound, not-run definitions and 23 independent examples with 56 steps. All 26 infrastructure tests passed; these do not certify product workflows. The earlier draft-edit discount bug remains separately open and was not rerun as a new failure today.

Next: retest the new fix at a fresh fingerprint, then continue physical PO → partial GRN → billing/GRNI/approval and quantity/layer checks, followed by the remaining business, banking, file, history, security and fault layers. Actual encrypted backup/restore remains LAST. The owner manually relays this repository handoff; no direct message was sent. Credentials, raw traces, screenshots and real customer data are excluded.
