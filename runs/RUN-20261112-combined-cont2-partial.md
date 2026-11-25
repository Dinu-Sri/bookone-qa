# Combined CONT2 — partial live result and grouped handoff

Execution QA `baea2118bf5e1cfb9ee497f4b17279b6a63bb1b8`, product merge `dae17abcba12d6810c8f8c3fe4a74fb28280a026`, visible v2.5.27 · dae17ab, 12 November 2026 UTC. The 12 November/due 14 November contract was not retargeted. No independent server image digest claim. Prior PR107 and PR109 queues and clocks remain consumed.

## Corrected control and checks

CONT2 changed only four equity-action button bindings to the actually observed `Record contribution`, retained `invoiceKind=none`, and kept the 48-event oracle, field values and dependencies unchanged. The product's simple-entry source at the pinned merge and both V/N live forms support that label. Adjacent purchase and quotation control labels were source-reviewed; dynamic live controls still require per-action checks. Host guard suite 120/120 and metadata validation passed; actual proof gave two positive UI actions and five zero-UI refusals, with seven proof clocks closed.

## V partial and VAT preview blocker

Fresh V opening was zero. Exactly one synthetic V bank contribution of 500 was accepted; the independently reread journal shows Dr bank 1100 500 / Cr equity 3000 500. This event is **consumed** and must never be repeated.

For the next cash purchase, the actual unsaved form showed V goods 2 × 60, Claim input VAT 18%, bank 1100, issue 12/due 14 November and zero discount. The visible subtotal and **Total** were both 120, while the mission expects gross 141.60 (net 120 plus input VAT 21.60). No E02 business intent or submission occurred. The pinned source `apps/web/src/components/module/commercial-doc-screens.tsx` computes the displayed total from subtotal minus discount without adding purchase VAT; this explains the preview observation but does not establish the persisted posting. Review the preview and server posting contract together with original/adjacent VAT purchase and conversion tests; do not assume a wrong-money posting or use the live tenant as a reproduction. No VAT purchase was posted in this run.

The V dependent office and POS actions, cent matrices, receipts and complete closing remain blocked, not tested. V current run balance is bank 500 / equity 500, other opening accounts and stock zero. No compensating entries.

## Independent N execution

N fresh non-VAT opening and dedicated manual register were checked. N's complete 11-event sequence ran once: bank equity 500, goods bill 2 × 60 and bank payment 120, shift open float 0, cash goods sale/refund 100, card service sale/refund 40, bank mixed-product sale/refund 140, and shift close. Nine independently reviewed N journals total Dr/Cr 1,540; no replay. Manual receipts and Z report were read without autoprint, hardware, physical printing or external payment processing. Z report CLOSED: 3 sales 280, 3 refunds 280, cash 100 in/out, card 40 and bank 140 each sale/refund, count/expected/variance 0.

N closing: bank 380, inventory 120 (2 goods at 60), assets 500, equity 500, cash/card/AR/AP/VAT and net income 0. Cash sale source was explicitly shown fully returned; the remaining two source-cap reloads were not rechecked after shift close. Some print/history details remain inconclusive. After the first N POS sale the UI surfaced a Walk-in customer that was absent from the opening customer list; review this application-created side effect. No manual master or settings action was performed, and no cleanup was attempted.

## Continuation and coverage

Twelve workflow events are consumed (V funding plus N's 11, including shift open/close); 36 V workflow events remain unconsumed. Preserve all accepted sources and the closed N shift. Prepare a new reviewed remaining-only successor that starts with the V cash-purchase issue, excludes V funding and every N action, binds current balances and source caps, and uses a new clock and explicit date review. Do not resume or reset any consumed queue/clock. Preserve historical A/B/original data; full historical row equality was not rechecked.

VAT office and VAT POS, cent matrices, V receipts and full combined reporting remain untested. N POS results do not certify real card processing, physical hardware or customer launch. Staff/company isolation, customer opening/tax qualification and recovery last remain. Owner alone merges/deploys. Initial publication is included in the active run clock; closing metadata follows separately.
