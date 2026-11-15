# Terra continuation plan — CONT7 closed, 20 events remain

Prepared14November2026UTC after direct review of closed CONT7 state, clock, source review and actual accepted bindings. This is a concrete preparation task, NOT an executable transaction release. Do not initialize a clock or transact merely on this plan. Complete the engineering and release gates below first, then execute the new frozen successor through reconciliation and sanitized publication if its prerequisites are satisfied.

## Verified stopping point

Frozen CONT7 QA5df21bd93ad3cfd613fb88e23db5f54bfbe1bf84 in clean detached launch-combined-cont7-execution. Private run .local/combined/RUN-20261113-CONT7 is CLOSED1594522ms/0paused,61 dispositions22passed/2failed/35blocked/2inconclusive,0pending/unresolved. QFIX and E09–E17 accepted/consumed. E18 has no submission intent, E18–E37 remain unconsumed. All N events and earlier V funding/setup are consumed. Never reset old clocks, replay old events, recreate sources or overwrite historical results.

Actual current V closing: cash295 bank346.60 card0 AR141.60 inventory120 inputVAT100.80 AP94.40 outputVAT129.60 equity500 revenue720 COGS360 expense80, returns0; stock V-O-G2/value120 and V-P-G0. Physical invoice fully paid708, service invoice open141.60, goods bill settled after141.60credit and566.40payment, expense bill open94.40. Corrected original quotation and both orders/invoices remain preserved. No V POS shift or POS funding yet. N historical closing bank380 stock2/value120 equity500 and closed shift, app-created Walk-in retained. No fresh full A/B/original/N row equality claimed.

## Root cause requiring QA change

Read launch-combined-cont7-preparation/reviews/REVIEW-20261114-cont7-source-binding.md. Exact deployed product dae17abcba12d6810c8f8c3fe4a74fb28280a026 sales-return page does not consume a from query; supported invoice search loads its sourceInvoiceId and renders form input[name=sourceDocumentId]. Actual UI loaded the correct paid invoice and its six lines while URL remained /sales/returns/new. Frozen combined policy requires ?from=sourceId for all returns. Therefore E18 was correctly stopped under its frozen contract, with no submitted return and no product posting defect proven. Every later workflow event depends serially on E18. Do not fix this by guessing a URL or trusting a manually asserted review flag.

## Phase A — prepare a guarded successor

1. Start a new isolated preparation worktree from local reviewed results ebdd6b9 (branch qa/combined-cont7-results), preserving exact execution checkout and all private prior runs. Read current AGENTS.md, the CONT7 partial handoff and source-binding review. Do not change product code or deploy. The source evidence indicates a QA contract mismatch.
2. Implement a sales-return-specific source verifier. Read actual supported CUA DOM only: exactly one relevant form and exactly one selected sourceDocumentId, matching an accepted owned invoice ID; visible Loaded invoice label, locked customer, expected lines, current company/actor and independently current remaining quantity/paid/refund cap must match. Reject cleared selection, duplicate/missing hidden field, wrong ID, stale form, wrong company, forged review and query-only spoofing. Do not alter hidden inputs, inspect app internals or call hidden APIs. Purchase-return query guard remains intact.
3. Verify at request preparation and again inside actual CUA immediately before final guarded dispatch; a cached review alone is insufficient. The actual final check must occur before durable dispatch/submit without an intervening source-changing action. If existing wrapper cannot safely integrate that check, extend the reviewed wrapper narrowly and freeze its source hashes. Never bypass dispatchCombined or directly click the final submit. Do not weaken other date/auth/source/once-only rules.
4. Add meaningful guard tests: correct picker binding, missing/duplicate source field, wrong tenant/owner/source, cleared or changed selection, source change between preparation and dispatch, stale evidence, exhausted quantity/paid cap, correct purchase-return requirement, and zero actual UI calls for each refusal. Preserve initial failures then run focused/host checks; validate metadata/diff. No redundant product CI required without product changes.
5. Build a hash-verified carry manifest for closed CONT5 AND CONT7 provenance. Import accepted existing sources only after fresh identity/opening checks. QFIX corrected quote, E09–E17 are already consumed and excluded, not new capabilities. Retain original failed E08 and failed feedback matrices. Verify exact closed clocks/fingerprints/states/bindings and original actual IDs; no manual replacement or invented accepted results. An event accepted in CONT7 must be backed by its actual readback before becoming a carried source. Record any old binding rejection as preserved evidence; its corrected private label does not imply replay.
6. Explicit new date contract: successor issue14November2026UTC/due16November2026 for NEW documents, preserving two-day interval. New payments/shift use14Nov where applicable. Existing posted invoice/bill/quote/order dates13Nov/due15Nov remain unchanged; refunds must bind original source profile and stored VAT. If a supported source-linked action copies an old date and offers no new date field, review that exact behavior before release rather than claiming14/16. Stop new submits23:55UTC. Later actual UTC date requires another explicit dated review, never silent retarget of a frozen queue.
7. New queue includes ONLY E18–E37 plus required fresh gates, carried receipt/cent/print coverage and closing checkpoints. E18 depends on verified fresh carried opening/source gates, not removed E17. Correct all dependencies formerly referencing consumed cases, bind them to verified carry gates. Keep all frozen monetary amounts and per-SKU oracle values. Publish a complete new root Terra prompt with exact QA SHA, clean detached execution checkout, private carry manifest, tests, source verifier commands, once-only dispatch/readback/binding and closing/publication commands. Validate every dependency and exact remaining event count20. No old QFIX or funding500 capability.
8. Freeze and qualify the new pin. Stage private manifests ignored, with no run initialized. Actual harmless source-verifier read and zero-action refusal qualification must be independently recorded under a separate fresh bounded qualification clock if done during preparation; close it. Do not label unit/mocked results actual CUA proof. Full execution still starts its own NEW180/150/30clock before browser/auth, and repeats fresh live/control/actor/profile/opening/source/date gates.

## Phase B — exact remaining workflow

| Event | Remaining action |
|---|---|
| E18 | Paid physical invoice return1unit gross118, cash; reverse VAT18 and restock1 at60 |
| E19–E20 | Service collections47.20card and94.40bank |
| E21–E22 | Service refunds1unit47.20card, then2units94.40bank, exhausting source |
| E23 | Pay expense bill94.40bank |
| E24–E25 | New synthetic POS equity1000bank and50cash; never repeat old500funding |
| E26–E27 | Buy V-P-G10x60 plus VAT108 gross708, then pay708bank |
| E28 | Open dedicated manual V-REG-1112 shift, metadata float50 |
| E29–E31 | Cash goods2 gross236 tender250/change14; two refunds118each |
| E32–E34 | Card service3 gross141.60; refunds47.20 and94.40 |
| E35–E36 | Bank mixed PRODUCTS goods1+service1 gross165.20; full refund165.20 |
| E37 | Close shift countedcash50 variance0, manual Z only |

All actions synthetic ledger QA; no real transfer/card processor/hardware. Dedicated warehouse V-WH-1112 and manual V register only. Exact queue button names/amounts, actual current tenders and source caps required. No changes to settings/masters/grants. POS date14Nov must be freshly verified, not inherited cached13Nov. No browser/physical print, drawer or printer connection; only supported manual receipt/Z preview without autoprint=1.

## Reconciliation and retained findings

Conditional full V final cash227 bank544.20 card0 AR/AP0 inventory780 (office3/value180,POS10/value600), inputVAT208.80 outputVAT90 revenue1180 returns680 COGS300 expense80 profit120, assets1760 liabilities90 netassets1670 equity1550+profit120. Preserve prior journal totals and compare actual accepted deltas, never force final totals or repair with compensation. For partial execution reconcile current state and preserve source caps.

Carry read-only customer receipts/remittance facts using actual payment transaction IDs; no allocation UUID substitution. Supported customer route /sales/payments/receipt?payment=actualID; vendor /purchase/payments/remittance?payment=actualID. Retain matrix failures: above-cap disabled; negative/nonnumeric/Infinity/three-decimal row could leave enabled with another positive row. No invalid submission/wrong posting proven. Preserve VAT memo precision display18.000000000000004% and net-only purchase preview defects. Valid exact amounts can proceed after concrete matrix disposition; do not repeat invalid submissions or relabel failures.

## Publication and completion prerequisites

Sanitized local results branch qa/combined-cont7-results holds edc28a7, closure2b2fc60 and source reviewebdd6b9. Earlier text saying initial results were published is superseded by the explicit closure: the push/draftPR was rejected, and these results remain local. Automatic review cited missing exact payload/repository authorization despite standing earlier authorization. Do not bypass via connector/browser/alternate transport. Prepare all new local engineering/review work first. Before publishing this payload or new successor, resolve the exact action through normal approval review using explicit user authorization; obey renewed rejection. Exclude credentials, private operational IDs, raw evidence and .local. A reviewable local result may remain unpublished if rejection persists; do not consume a new execution queue waiting on publication.

When release publication succeeds, verify remote pin and create/attach draft PR before execution init. Keep execution detached at frozen pin. Every submission requires independent saved detail/payment/journal/stock readback, explicit outcome and private binding. Any uncertainty stops new submissions for read-only recovery; no replay. At reserve stop business, disposition all cases, publish one sanitized consolidated handoff under resolved authorization while clock active, close only with0pending/0unresolved, disclose metadata-only tail and update root pointer. Owner alone merges/deploys; no customer-launch approval; recoveryLAST.
