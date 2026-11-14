# Light final11 completion plan — 14 November 2026 UTC

Status: planning handoff, NOT an executable release. No new browser/auth/business/clock started by this planning task. Complete prerequisites below before releasing Light. Do not execute or edit an old queue to implement this plan.

## Objective and verified stopping point

Finish one newly reviewed settlement of the confirmed-unpaid POS stock bill, then ten unsubmitted POS events, independently reconcile and publish one consolidated result. No funding, stock purchase, office transaction or N business repeat.

CONT9 exact execution QA e8977162c6e652d7bec60552d029e6984412da34 remains clean detached in launch-combined-cont9-execution. Private run .local/combined/RUN-20261114-CONT9 currently ACTIVE:8passed/1inconclusive/32pending,0unresolved submissions. At11:00UTC live elapsed was about44.7minutes; persisted chargedMs alone omits the gap until next check. Never reset, infer pause or omit interruption time.

E25 cash equity50 and E26 POS stock bill708 accepted/consumed. Old E27 payment click consumed, original inconclusive evidence retained, later outcome adjudicated NOT APPLIED under the ledger's refused enum; this is not proof of explicit server denial. Owner-authorized read-only PostgreSQL checks confirmed exact bill open708/paid0, allocations0, matching tenant/bill payment transactions0 and other active database work0. No matching request-log row; exact failure cause unproved. Operator navigated away too early after the click. Never reuse its request/submission ID, mark it passed, alter its frozen plan or resubmit through that consumed queue.

CONT8 and earlier runs closed; all previous funding including bank1000 and cash50 are consumed. N complete, closed shift and app-created Walk-in retained. Preserve historical failures, all source documents and A/B/original fixtures. Owner alone deploys; no customer-launch approval; recoveryLAST.

## Phase 1 — close the current run and review the new settlement

1. Medium reads current private CONT9 state, fingerprint, clock, accepted bindings, original and recovery E27 readbacks, private read-only diagnostic proof and published PR117 recovery section. Require actual0unresolved; investigate any discrepancy read-only.
2. Check/charge the existing active clock. Disposition its remaining32 cases concretely; business E28–E37 remain blocked/unsubmitted, not failed product events. Reconcile current partial balances below and retained receipt/stock evidence. Publish sanitized closure while clock active, then close only0pending/0unresolved; disclose metadata-only closure tail. Do not close by inventing acceptance or discarding pending cases. Original E27 remains unsuccessful/inconclusive as a case, with resolved not-applied submission outcome.
3. Record an explicit successor review authorizing one NEW settlement capability for the still-unpaid original bill. Use a new event ID such as S01-SETTLE-POS-BILL, new run and unique intent. This is not permission to replay old E27. Freshly confirm same owned bill, due708/paid0, absence of payment/allocation and sufficient bank balance immediately before the new attempt. If any payment appears or outcome becomes uncertain, revoke this capability and recover read-only.

## Phase 2 — build and qualify the full Light release

4. Create isolated successor preparation from the latest published reviewed results, leaving prior execution checkout and .local runs untouched. Hash the CLOSED CONT9 state/fingerprint/clock/owned sources and bind the original bill's accepted UUID, detail URL and independent saved readback. Verify E25/E26 consumed, E27 not applied, E28–E37 have no intents. Import actual accepted sources only after fresh opening/preservation gates; no invented ID or manually seeded acceptance.
5. Build a new queue with exactly11 workflow capabilities: S01 plus old monetary events E28–E37. Remove all consumed capabilities E01–E27, setup/funding/purchase repeats and dangling dependencies. E28 depends on S01's independently passed payment. Keep exact monetary fields and per-SKU oracle from the reviewed POS sequence. Retain necessary fresh/control/receipt/report/preservation/closing checkpoints.
6. Fix inherited POS button-label encoding in the NEW queue only: current CONT9 strings contain literal U+00C2 followed by U+00B7 (Â·). Obtain the actual deployed UI/source label and freeze that exact Unicode/spacing; do not assume or normalize at dispatch. Sales/refund totals must match exact labels. Preserve old queue evidence. Test exact-label success and wrong/mojibake-label zero-action refusal, dependency completeness and exactly11 workflow events.
7. Review completion handling before release. Guard dispatch's immediate snapshot is NOT proof of a completed server action. After each final click, keep the same page and use read-only observation until a supported success redirect/detail/receipt, explicit failure or bounded uncertainty is established. Do not navigate, reload, switch transaction type, close tab or prepare next submission while completion is pending. No automatic retry, repeated click or speculative compensating transaction. Add a narrowly scoped tested read-only completion check if needed; freeze its sources. Test delayed redirect and uncertain timeout without a second click.
8. Review source binding for each output actually consumed by later payments/refunds. Supported detail URLs/history/audit can expose identifiers; distinguish document UUID, transaction UUID, journal UUID and allocation UUID. Do not treat a shortened journal number as a full UUID, or substitute allocation IDs for payment receipt IDs. A contribution's unused output need not block an unrelated event, as CONT9 review already established.
9. Date contract: the original mission remains fixed12Nov; historical posted13/15 and new CONT9 bill14/16 dates stay unchanged. A successor executed14NovUTC explicitly uses14Nov issue/16Nov due for new documents/payments where applicable and stops new submissions23:55UTC. If actual UTC day differs, review and freeze a new dated successor before execution; never silently retarget. POS uses actual qualified current date.
10. Run focused carry/oracle/label/completion/guard tests, metadata validation and diff checks. Qualify any changed actual-host helper with harmless/read-only positive and zero-action refusal proof under a separate bounded qualification clock, then close it. Do not substitute mocked results for actual CUA proof. No new product CI/deployment is implied by this QA-only work.
11. Publish sanitized review/new queue/oracle/helper/full Light prompt and verify exact remote execution SHA. Create clean detached execution checkout at that SHA. Stage private carry separately ignored; keep credentials, operational UUIDs/raw evidence/.local out of GitHub. Update root LIGHT-NEXT-TASK.md with exact pin, checkout, publication receipt, dated contract, private carry path and complete commands. No placeholder pin, provisional binding or planning queue may be called released.

## Phase 3 — Light executes once through completion

12. Start NEW180total/150execution/30closing clock BEFORE browser/auth. Never reset or infer paused time. Run required host checks and fresh actual build, title/inert-control positive plus five zero-action refusal proof, guarded V Owner logout/login RememberOFF, profile/current opening/source/manual-register gates. Close proof clocks. Import verified carry once after opening/preservation gates. Do not use old run init/request commands.
13. Use exact frozen once-only helper to persist each intent and dispatch once inside actual CUA. Require completed independent readback and explicit disposition before later writes. Retain the supported product VAT preview exception only as reviewed: compute tax independently and verify persisted gross/journal/stock. No direct final clicks, hidden writes, hardware, physical print, settings/master/grant changes or real payments.

| Order | Event | Exact action and immediate acceptance evidence |
|---|---|---|
| 1 | S01 | Settle original owned bill708 from bank1100 once. Await completed remittance/saved result before navigating. Verify actual payment transaction ID, bill paid708/balance0, DR AP708 CR bank708; bank544.20. |
| 2 | E28 | Select dedicated V-REG-1112, warehouseV-WH-1112, manual mode, printer disconnected. Open shift float50 metadata only; verify saved active shift and no extra GL money. |
| 3 | E29 | V-P-G goods2 at net100 each, VAT18%, cash gross236, tender250/change14. Verify saved sale/receipt, cash journal, COGS120 and POS stock8. |
| 4 | E30 | Refund1 goods from that exact sale, gross118 cash, VAT18 reverse and restock1cost60. Verify source remaining1 and POS stock9. |
| 5 | E31 | Refund remaining1 goods, gross118 cash, VAT18 reverse/restock1cost60; exhaust source and POS stock10. |
| 6 | E32 | V-P-S service3 at net40, VAT18%, card gross141.60. Verify saved card sale, journal and no stock movement. |
| 7 | E33 | Refund1 service47.20 card from that sale; verify remaining2/94.40. |
| 8 | E34 | Refund remaining2 service94.40 card; exhaust source and card balance0. |
| 9 | E35 | One mixed PRODUCTS basket: goods1 net100 + service1 net40, VAT25.20, gross165.20 bank; saved bank sale, COGS60, POS stock9. No split tender. |
| 10 | E36 | Full refund165.20 bank from that exact mixed sale, both lines, VAT25.20 reverse, restock1cost60; source exhausted, POS stock10. |
| 11 | E37 | Close the dedicated shift countedcash50/variance0; manual Z preview only. Verify saved closed shift and tender totals. |

Office goods V-O-G must stay3/value180 throughout. POS stock V-P-G ends10/value600. Services have no stock movement. Verify eligible current caps before each refund and retain actual source IDs privately.

## Openings, reconciliation and delivery

Last observed opening after CONT9 E26: cash227 bank1252.20 card0 AR0 AP708 inventory780 inputVAT208.80 outputVAT90 equity1550 revenue720 returns220 COGS300 expense80; office stock3/value180, POS10/value600, no V shift. Verify fresh, do not assume. Existing bill PUR-20261114-0003 date14/due16, gross708/inputVAT108, paid0. Product v2.5.27 · dae17ab; exact full deployed candidate dae17abcba12d6810c8f8c3fe4a74fb28280a026/tree78973f5a9298ce615f5c8cda17f77b2de714bfa2, no independent server-digest claim.

Final conditional V: cash227 bank544.20 card0 AR/AP0 inventory780 inputVAT208.80 outputVAT90 equity1550 sales1180 returns680 COGS300 expense80 profit120; assets1760 liabilities90 netassets1670=equity1550+profit120. Compare actual accepted deltas/journals, not forced totals. Shift cash sales236/refunds236; card141.60/refunds141.60; bank165.20/refunds165.20; float/count50 and variance0. Count receipts from actual persisted events and verify the manual Z report.

Receipt acceptance: this remaining POS sequence has THREE sales and FIVE refunds (cash2, card2, mixed1), so expect E29–E36 EIGHT saved POS transaction receipts, plus the shift Z report. Never inherit a six-ticket assumption from another lane. Check each actual receipt/date/party/tender/net/VAT/gross/source, and check vendor remittance from S01 using the actual payment transaction ID. No browser Print/autoprint=1/drawer/serial output.

Preserve known CONT7 amount-feedback failures, VAT memo precision and net-only purchase preview finding; no invalid submission, false pass or wrong-posting claim. N historical completion/Walk-in preserved; scope any fresh N checks precisely and never repeat N business.

At closing reserve or any safety stop: resolve all submissions, disposition every checkpoint, reconcile complete or actual partial state, publish one sanitized consolidated run/checks/coverage/defect/handoff report to the approved Dinu-Sri/bookone-qa PR branch while clock active, then close only0pending/0unresolved. Disclose metadata-only closure tail and update root pointer. Light must report explicitly whether all11 capabilities completed; do not equate partial money acceptance with launch approval.

## Release decision

Light should execute only after Phase1–2 produce a reviewed published exact pin and complete full prompt. This plan itself authorizes no click, replay, clock reset or silent date change. Current user request is preparation of the plan; release engineering and live execution remain clearly identified work.
