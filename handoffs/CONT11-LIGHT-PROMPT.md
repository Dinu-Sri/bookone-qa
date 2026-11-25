# CONT11 Light — finish the eight remaining actions, reconcile and publish

Use the EXACT QA pin and clean detached checkout in root `COMBINED-V2528-CONT11-LIGHT.md` and the published release receipt. Never run a historical queue/request or reset its clock. Authoritative queue `queues/MISSION-COMBINED-V2528-CONT11-20261115.json`:37checkpoints, eight once-only business capabilities E30–E37. Oracle `docs/COMBINED-V2528-ORACLE-CONT11-20261115.json`. Execute through reconciliation and consolidated publication; no delegation/new chat.

Explicitly reviewed **15 November2026 UTC** successor; new sales/refunds issue15Nov, due17Nov only where applicable (POS has no due field; record N/A, do not invent one). Stop new submits23:55UTC; later UTC requires newly reviewed dated successor. Original12Nov contract, existing13/15 documents,14Nov bill/payment/cash sale and shift openedAt remain unchanged. Product exact `48e44072f43d8d26338d793c6692767e8b7d2082`, tree `06cb8f5c967ff3edab6361123ddc029778f087b0`, actual expected `v2.5.28 · 48e4407`; no independent server digest claim. Owner reports deployment; agents do not deploy or merge.

CONT10 CLOSED3575152ms/0paused,39dispositions21passed/1failed/14blocked/3inconclusive,0pending/unresolved. S01 settlement708, E28 openingfloat50 and E29 cash TAX sale236 are ACCEPTED/CONSUMED. Earlier funding/purchases/setup/N are consumed too. Preserve original sale POS-20261114-0001 tax26NOV_01/3, goods2/TAX18/gross236, sold2/left2. Existing dedicated V-REG-1112 shift OPEN14Nov15:44:09UTC, one cashsale236/zero refunds, float50/expected286, count uncommitted. Reuse this SAME shift; do not open another, close early, repeat sale/payment or change historical dates. Supported server source accepts open shifts without a same-day restriction and dates each new posting from server UTC; closing uses current timestamp. Reviewed cross-day continuation preserves old opening while new events/close occur15Nov. Stop if current state differs or another event appears.

## Start once, BEFORE browser/auth

From the exact detached checkout require actual exit0:

    node scripts/combined-v2528-run.mjs init .local/combined/RUN-20261115-CONT11
    node --test tests/infrastructure/combined-v2528-cont11.test.mjs tests/infrastructure/operator-desktop-cua.test.mjs tests/infrastructure/operator-action-guard.test.mjs tests/infrastructure/operator-browser-transport.test.mjs tests/infrastructure/operator-queue.test.mjs
    node scripts/validate.mjs

NEW180total/150execution/30closing clock, all unpaused gaps charged. No reset/inferred pause; only explicit owner pause counts. Check before every new intent. Preserve restricted-run failure evidence; rerun only known host restrictions with appropriate host access, no silent test relabeling. Verify published remote contains exact execution pin before init.

G01 exact clean QA/clock/date, G02 actual build, G03 fresh actual control proof, G04 guarded V logout/login/RememberOFF and actual protected QAV Owner/company, G05 current balances/stock/sources/register/open shift, G06 historical preservation are mandatory. Preparation observations do not replace fresh execution gates. Generate seven actual inert proof requests with `node scripts/combined-v2528-proof.mjs RUN/proof ACTUAL_URL Sales`; use selected Sign In MODE only on login when applicable. Dispatch through exact `operator-desktop-cua.mjs`: title/read and harmless Sales toggle each1UI/claim; five refusals0UI/claim. Close all seven proof clocks. Auth final Logout/Login must use combined helper under G04, never direct final clicks. Reuse existing credentials privately at `../qa/.local/private/bookone-v2526-launch-fixtures.json`, accounts.vOwner/nOwner. No signup, saved password, account/module/settings/master/grant writes.

Fresh V opening: cash463 bank544.20 card0 AR/AP0 inventory660 inputVAT208.80 outputVAT126 equity1550 revenue920 returns220 COGS420 expense80; profit200;22journals DrCr7588.80. Officegoods3/value180, POSgoods8/value480, cost60. VAT18 registered/local, lastcost, purchase approval/GRNIoff, warehouseV-WH-1112. Original bill708 paid, original sale236 unrefunded, same OPEN shift as above. Dedicated V-REG-1112 manual/preview-only, printer disconnected, cash1000/bank1100/card1200. REG01 is not target. Do not connect printer/open drawer/customerdisplay/browser Print. App-created V/N Walk-in must remain.

After G05/G06 actually pass, import ONCE (third path is merely required private CLI positional placeholder, version5 does not trust its content):

    node scripts/combined-v2528-run.mjs carry .local/combined/RUN-20261115-CONT11 .. .local/qualification/unused-carry.json

Require exit0. Version5 verifies frozen hashes of actual CLOSED CONT10 state/clock/fingerprint/owned sources and accepted S01/E28/E29 independent readbacks, no E30–E37 intents; returns original sources. No manual seed/edit/hash replacement. Actual private IDs remain ignored.

QPOS: select dedicated register, supported original ticket lookup; confirm original14Nov total236/TAX18/sold2/left2, one unit net100 VAT18 refund118, modal exact `Complete refund · LKR 118.00`. Do not submit during qualification. Cancel modal and discard unsaved cart through supported UI; independently confirm no return and unchanged cap. Preparation already observed fixed preview but fresh QPOS mandatory. A mismatch blocks business; no free-return/substitute/new-sale workaround.

## Each guarded submission

Read exact case fields/lines/button/dependencies/source/cap from queue. Review under5minutes old: caseId,url,button,actor,companyAlias,observedAt,identityEvidence,formEvidence,fieldSummary,preservationEvidence,confirmationRequired boolean; auth noFinancialEffect=true. Business exact oracleEventId,expectedLines,fields,issueDate15Nov/dueDate17Nov metadata, invoiceKind tax_invoice,saleChannel local, protectedSourcesUnchanged/onlyRunOwnedSources/sourceCapsVerified true only after observation, actual sourceId for required source, registerCode V-REG-1112, manualPrintVerified/hardwareDisconnected true, actual shiftEvidence. Additionally **existingShiftVerified=true, existingShiftId=carried original V:pos-shift-open ID, shiftDateContract includes2026-11-14 and explicitly new events/close15Nov**. Verify source ID via supported original history/detail, never guessed UUID/hidden-state access. For any actual named date field use existing native commit/verify helpers after rerender; POS date is server-generated and must be independently read after posting.

    node scripts/combined-v2528-run.mjs request RUN CASE UNIQUE_SUBMISSION_ID ACTUAL_URL EXACT_BUTTON PRIVATE_REVIEW_JSON

Require exit0, then actual CUA import frozen `scripts/combined-v2528-cua.mjs`, ONCE `dispatchCombined({requestPath,tab})`, timeout60000ms. Never direct final click or bypass adapter. Helper awaits bounded45seconds read-only completion after one click. Require `completion.state=observed` before navigation/another workflow. No reload/navigation/retry while pending. Error/uncertainty/timeout: preserve consumed claim/intent, stop ALL new submits, read-only recover; do not infer refusal or replay.

After completion independently inspect persisted receipt/detail/date/source caps, journals, balances and stock. Completion/toast is not acceptance. Write `{submissionId,outcome:accepted|refused|inconclusive,actual}` then `node scripts/combined-v2528-ledger.mjs readback RUN CASE PRIVATE_READBACK`. Record `{status,actual,evidence:{observations,sourceAndBindings,journalAndStock,preservation},nextAction for nonpass}` with ledger start/record. Needed outputs bind only after passed/accepted: `{id,url,companyAlias,eventId,accepted:true,observedAt,evidence}` via run.mjs bind. Inconclusive submitted intent stays unresolved until definitive proof. Never replay even refused intents in this queue.

## Eight actions only, in order

1. **E30** original14Nov cashsale, goods1 refund118cash, VAT18reverse/restock1cost60; exact `Complete refund · LKR 118.00`; source left1/118, POSstock9. New refund date15Nov, source14Nov unchanged.
2. **E31** same original remaininggoods1 refund118cash, source exhausted, stock10. Fresh receipt and independent journal/cap readback.
3. **E32** explicitly choose TAX/local (kind resets commercial after every sale), service V-P-S3xnet40, net120/VAT21.60/gross141.60 **card**, no stock. `Complete sale · LKR 141.60`. Bind actual source.
4. **E33** original E32 service1 refund47.20card, VAT7.20reverse/no stock; source left2/94.40.
5. **E34** original E32 remainingservice2 refund94.40card, VAT14.40reverse, source exhausted/card0/no stock.
6. **E35** explicitly TAX/local, PRODUCTS mixed goodsV-P-G1net100 + serviceV-P-S1net40, VAT25.20/gross165.20 **bank**, single tender; COGS60/POSstock9. `Complete sale · LKR 165.20`. Bind source.
7. **E36** full ORIGINAL E35 refund bothlines165.20bank/VAT25.20reverse; restockgoods1cost60 only, stock10/source exhausted.
8. **E37** clear completed cart; Close shift modal for SAME original shift. Across14/15Nov shift three sales/five refunds; cashsale/refunds236each, card141.60each, bank165.20each. Expectedcash50, counted50/variance0 after all preceding events. Final `Close shift & print Z` allowed ONLY qualified manual mode. Await Shiftclosed + fresh Z, saved closed timestamp15Nov and original openedAt14Nov. No physical/browser Print. If partial stop, actual expectedcash differs; do NOT force planned50 close.

## Reconcile and publish through closure

Seven remaining financial journals DrCr1089.60 plus one metadata close; monthlyV22/7588.80 -> conditional29/8678.40. Eight POS receipts across CONT10+CONT11 (three sales/five refunds), same shift manualZ; oldsale dated14Nov/new seven financial events15Nov. Final cash227 bank544.20 card0 AR/AP0 inventory780 inputVAT208.80 outputVAT90 equity1550 revenue1180 returns680 COGS300 expense80 profit120; assets1760=liability90+equity1550+profit120. Office3/value180/POS10/value600. No service stock movement.

Perform R/CARRY checks honestly: persisted dates/party/tender/tax/source, receipt/remittance actual paymentTransactionId, stock ledger/source correspondence, P&L/BS/trial/GL/AR/AP/cashflow/VATreport or explicit unavailable gap. N business already complete, read-only guarded auth permitted where queue allows; no repeat. Preserve all old matrix feedback/precision/office net-preview findings and original CONT10 failure even if fixed. No full historical equality claim without actual evidence. Independent source/runtime tests remain distinct from actual workflow acceptance.

At150minutes/safety/date boundary stop new business and use30minute closing reserve. Resolve every submitted intent and disposition all37, including blocked/unavailable; reconcile accepted-only partial result if necessary, no compensating repairs. Publish ONE sanitized consolidated RUN/CHECKS/closing/coverage/defect/handoff to authorized Dinu-Sri/bookone-qa branch/draftPR117 while clock active, from separate results checkout. Keep execution checkout exact/detached. Exclude credentials/private IDs/raw evidence/.local; publication authorization persists, do not ask again. Include initial publication in charged clock; close ledger only0pending/0unresolved, then metadata-only finalclock/publication tail and root pointers. No merge/deploy/customer launch approval; recovery LAST.
