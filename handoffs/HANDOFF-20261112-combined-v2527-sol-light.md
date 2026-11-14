# Execute the combined launch workflow batch

Owner reported Product PR11 merged and deployed. Medium observed **v2.5.27 · dae17ab** in both existing fixtures on 12 November UTC, zero financial openings, V's new purchase Input VAT selector, and persisted manual POS settings. This releases a new batch; earlier setup queues and business PLANs remain consumed or non-executable.

Use the clean `launch-combined-v2527-execution` checkout at the exact commit in the root `COMBINED-V2527-SOL-LIGHT.md`. Preparation checkout is not execution. Read this handoff, queue, oracle, current AGENTS/STATUS/SESSION and review before starting. Medium prepared; Light executes only after its own fresh gates.

Product live merge **dae17abcba12d6810c8f8c3fe4a74fb28280a026**, reviewed candidate **3d6119ea2b4437ae50b06eaefb54c95063257dbf**, identical tree **78973f5a9298ce615f5c8cda17f77b2de714bfa2**. Expected stamp **v2.5.27 · dae17ab**. `product-ref.json` deliberately retains the tested candidate source pin. Owner report + visible stamp + merged tree trace are verified; independent deployed-image digest is not attested.

The mission is **80 fixed checkpoints / 48 once-only persisted workflow events, including 38 financial events**. Journal header counts may differ from financial-event counts; match each source's actual journal(s) and all expected lines. Conditional sum across both companies is **DR = CR LKR10,218.40**. No business event has yet been executed in preparation.

## Time, date and startup

Fixed **12 November 2026 UTC**, issue date12, due14 where supported; stop new submissions at23:55UTC. On a later UTC date, do not edit/rebind this queue: report to Medium for a new remaining-only successor. Use a NEW **180-minute clock, 150 execution +30 closing**, before browser/auth. Preflight target15minutes. Check clock before every submit and after each case. Only observed interruptions justify an explicit pause; charge all other gaps. Do not reset a clock or extend an active mission to fit the credit budget.

From the clean execution checkout:

```powershell
node scripts/combined-v2527-run.mjs init .local/combined/RUN-20261112-C1
node --test tests/infrastructure/combined-v2527.test.mjs tests/infrastructure/operator-desktop-cua.test.mjs tests/infrastructure/operator-action-guard.test.mjs tests/infrastructure/operator-browser-transport.test.mjs tests/infrastructure/operator-queue.test.mjs
node scripts/validate.mjs
```

Require actual exit0. Windows sandbox temporary-rename failures are an environment restriction; retain the first result, use the same authorized host test path once, never weaken a guard. Do not spend the business run repeating full product CI already independently qualified in PR105.

G01–G06 require actual new observations. `init` writes intended fingerprint metadata, not actual verified identity/build/openings. Prepare the fresh seven inert actual-tool probes with `scripts/combined-v2527-proof.mjs PRIVATE_PROOF_DIR ACTUAL_CURRENT_BOOKONE_URL EXACT_INERT_BUTTON` (Sales on protected workspace; if already signed out, only the actually selected **Sign In** mode tab on /login, never Login/submit); invoke each once inside actual CUA using `operator-desktop-cua.mjs`. Title and Sales navigation must each show1UI/1claim, five refusals0UI/0claim; close all seven proof clocks. Never use native fallback or call a mock a live proof. Use supported CUA only; read-only navigation/field preparation may be batched, but every persisted click below must use the guarded path.

## Existing private fixtures and preservation

Credentials and actual company/party/location bindings remain in the central ignored file `../qa/.local/private/bookone-v2526-launch-fixtures.json` (resolve from the execution checkout). Reuse `accounts.vOwner/nOwner`, `companies.V/N`; inspect shape privately without printing secrets. Signout/login is authorized; Remember off, await actual protected company/Owner readback before navigation. No account creation/onboarding/module/settings/master work is permitted here. Signup terms acceptance and both setups are complete; never repeat them.

V: VAT registered18%, local/TAX; Inventory+POS enabled, Pro, Rental/HR off. V-WH-1112; V-O-G100/cost60, V-O-S40; V-P-G100/cost60, V-P-S40; V-C-1112 / V-S-1112. Dedicated **V-REG-1112**, active, warehouse, cash1000, manual. N: VAT off/commercial/local; N-WH-1112; N-P-G100/cost60, N-P-S40; N-C-1112/N-S-1112; dedicated **N-REG-1112** manual/cash1000. Both default REG-01 manual too, but never use it. Both GRNI off, purchase approval off, last cost; verify actual selectable cash1000/bank1100/card1200 before their first action. Neither fixture has money, stock or shifts at release. Additional deployment-seeded V ONRENT/REPAIR/WASH locations were observed and must be preserved; use the dedicated warehouse.

A completed nonVAT setup/money and original/B are protected. A17journals DR/CR4180,6moves, stock3/value180,cash150,bank290,card/AR/AP0,income120,assets620,equity500. Original225journals43moves, stockGLgap120 and four historical bad credits remain unchanged. Use prior protected-source maps and freshly captured current openings. Missing historical row baselines narrow claims; never manufacture equality or recreate money to repair evidence. All old Rapid queues, M1A and V/N setup are consumed. New funding below remains unconsumed: it is synthetic ledger money-in, never an actual bank transfer/card-processor charge.

## Execution order and amounts

Follow the queue order. It has per-case buttons, routes, exact fields, dependencies, source symbols, tender, profile and expected journal lines. Oracle uses integer cents and carries running per-SKU stock/value and account balances after each event. Source names are symbolic; actual IDs are bound privately only after an accepted independent readback.

V office: equity bank500; separate bank cashpurchase2×60+VAT21.60/refund141.60; PO10×60 net600 with **Claim input VAT** → GRN10 → bill708 (VAT108), stock only once. Create service expense80+VAT14.40 on6800 before vendor payments. Physical quote6×100 net600, intended TAX/local (preview108/future708) → order600 → invoice708. Service quote3×40 net120 preview21.60/future141.60 → order120 → invoice141.60. Quotes/orders/PO/GRN do not post VAT. Explicitly select TAX/local on sales sources and conversions even when a UI help sentence/default differs. Never force sales invoice-kind fields onto purchase documents; purchases use the **Claim input VAT** selector.

Before collections or credits/payments, perform both unsaved `CARRY-AR/AP` matrices with two sources: AR708+141.60=849.60 and AP708+94.40=802.40. Try blank/zero/negative/nonnumeric/Infinity/three decimals/onecent below/equal/above each cap and combined total. Use only supported field entry, capture actual normalization/feedback/button state; no invalid submission or JavaScript input bypass. If entry is refused/normalized, report the actual narrower behavior. Clear forms and re-read unchanged balances. Matrix defects can be recorded failed and valid financial work can continue; both matrices must have concrete dispositions before the first collection.

Then physical receiptscash295+bank413; AP goods credit2 units141.60 before vendor bank566.40; physical paid customer return1 unit118 cash. Service receiptscard47.20+bank94.40, then paid service refunds1unit47.20card and2units94.40bank, exhausting that source. Expense bank94.40 settles AP. Use distinct unique supplier invoice/reference values for each new bill; no discount, fee, credit-limit/GRNI/approval setting change or substitutions.

V POS: additional equitybank1000/cash50; V-P-G purchase10×60 +VAT108 =708, bankpay708. Dedicated shift float50 is metadata, not another funding. Cashgoods2 gross236 tender250/change14; refund118 then118. Cardservice3 gross141.60; refund47.20 then94.40. Bank mixed **products** goods1+service1 gross165.20, fullrefund165.20. Every sale/refund is single tender. Close with countedcash50/variance0. Shift cash sales/refunds236each,card141.60each,bank165.20each.

N phase independently reauthenticates actual N and captures unchanged zero openings before any N event. Bankequity500, N-P-G purchase2×60 noVAT120/paybank120; shiftfloat0; cashgoods100/refund100,cardservice40/refund40,bankmixedproducts140/refund140; count0/variance0. N tax fields stay hidden commercial/local. No mixed-tender, real printer/drawer/serial, bank/card network, rental, authorization attacks or backup/recovery in this mission.

The exact POS final button names include two decimals (`Complete sale · LKR 236.00`, `Complete refund · LKR 118.00`, etc). `PAY`/`REFUND` and `Close shift` only open preparation modals. Final `Close shift & print Z` is allowed solely on the qualified manual register. Do not click Connect printer, Open drawer, Save & print or browser Print. View Last receipt/Last Z-report only if URLs have no `autoprint=1`; no physical print. If a frozen commit button/path cannot be verified, block that action and related descendants, continue independent eligible cases, never guess an alternate button/endpoint.

## Guard, intent and independent outcomes

Use `scripts/combined-v2527-run.mjs request RUN CASE UNIQUE_ID ACTUAL_URL EXACT_BUTTON PRIVATE_REVIEW_JSON`. Persist a private prepared-form review less than5minutes old with:

* exact `caseId,url,button,actor,companyAlias,observedAt` from actual current UI;
* concrete `identityEvidence,formEvidence,fieldSummary,preservationEvidence` references;
* for business: `oracleEventId,expectedLines,fields` exactly matching the frozen case, after checking actual visible values; mission `issueDate=2026-11-12,dueDate=2026-11-14`, `invoiceKind,saleChannel=local`, `protectedSourcesUnchanged,onlyRunOwnedSources,sourceCapsVerified=true` only with evidence;
* when required, accepted run-owned `sourceId`, actual remaining quantity/paid amount/refund eligibility evidence; converters bind actual owned detail URL; returns bind `?from=<same sourceId>`;
* POS `registerCode`, `manualPrintVerified=true,hardwareDisconnected=true,shiftEvidence` showing actual dedicated active/closed/new shift context. Shift symbols rely on accepted prior open/dependencies + current visible register context; do not invent a hidden shift ID;
* auth only: `noFinancialEffect=true`; `confirmationRequired` boolean and any applicable actual confirmation evidence. Routine synthetic ledger entries need no extra confirmation; existing owner authorization persists. Follow any genuinely applicable action-time policy.

The review's issue/due values bind the mission contract. Independently record which document fields actually exist: funding/shift/tender forms may have no due-date field; mark not applicable, never fabricate a persisted due date. `invoiceKind` is the guard profile classification; financial sales must have actual TAX/commercial readback, purchase claims use actual purchase VAT fields.

Require request command actual exit0. Inside actual `mcp__cua_repl.js`, import the execution checkout's `scripts/combined-v2527-cua.mjs` via file URL and call `dispatchCombined({requestPath,tab})` once with the already bound tab. This rechecks review, owned bindings, frozen helper/oracle/QA HEAD, then delegates to the original actual CUA guard. Do not bypass this wrapper, click the submit separately, edit helper/queue/oracle/clock fingerprint, run hidden HTTP/DB writes, or replay any claimed/refused/uncertain financial action. One business intent per case ever; auth has bounded separate caps. Preserve all first failures. Pending uncertainty blocks every new submission; read-only recovery remains allowed.

After the click, independently read the committed source/detail/payment/journal/stock after full rerender. A toast, click return, stamp or intermediate login page is not acceptance. Do not navigate away before login/save completion is established. Use explicit `combined-v2527-ledger.mjs readback RUN CASE PRIVATE_RESULT_JSON` with actual `submissionId,outcome=accepted|refused|inconclusive,actual`. Inconclusive remains unresolved until actual readback resolves it. Then explicit `record` with `status,actual,evidence` (all four queue evidence keys), plus `nextAction` for nonpasses. No hardcoded accepted helper. Ledger `start/record/defer/check/close/summary` follow existing operator schema.

After independently passed accepted events needed by descendants, create a private binding JSON `id` (actual observed document/payment UUID), `url`, `companyAlias,eventId,accepted=true,observedAt,evidence`; call `combined-v2527-run.mjs bind RUN CASE PRIVATE_BINDING_JSON`. Never overwrite a source binding or substitute an allocation/journal UUID for a payment ID. Bind funding IDs only if actual supported UI exposes them; no descendant depends on a funding UUID. Return/refund/conversion sources must have actual supported owned IDs before the dependent action; otherwise block, no hidden data scraping.

For read-only checks that need the other company, bounded auth is explicitly allowed on R/CARRY preview checks. Confirm actual actor/company anew. Never read the wrong tenant and label it as the expected company. R01–R11 plus four carried receipt/cent/print checks are part of the fixed80, not optional extra work. Supported receipt/remittance route is `/sales/payments/receipt?payment=<actual paymentTransactionId>` (vendor payments use same payment route). Capture actual persisted receipt facts; preserve earlier historical receipt gaps.

## Closing and publication

Conditional full V closing: cash227,bank544.20,card0,AR/AP0,inventory780 (V-O-G3/value180 and V-P-G10/value600),inputVAT208.80,outputVAT90,revenue1180,returns680,COGS300,expense80,income120,grossassets1760,liabilities90,netassets1670,equity1550+profit120. N: bank380,stock2/value120,assets500/equity500,cash/card/AR/AP/VAT/income0. Each company trial balances, stockGL closes without repair. Oracle account map is cash1000/bank1100/card1200/AR1300/inventory5100/AP2100/outputVAT2200/inputVAT2300/equity3000/revenue4000/returns4100/COGS5000/expense6800; compare actual company accounts.

For partial execution, reconcile only actual accepted event deltas with running oracle, preserve posted-but-unfinished sources and exact eligible remaining caps. Never force final totals by compensating entries or replaying completed events. Disposition all80 checkpoints, including blocked descendants/not-run-budget, with concrete next steps. At closing reserve stop new business; read-only recovery/reconciliation/publication only. Resolve all submission uncertainty without replay before marking complete; disclose any genuine unresolved blocker.

Publish **one consolidated results/checks/coding handoff/coverage update** to sanitized QA branch/PR under standing approval. Attach no credentials, private operational IDs, raw evidence or reusable secrets. Include initial publication in clock; close after every case disposition and resolved intents. Metadata-only clock/pointer tail disclosed. Preserve the exact execution checkout and private run, do not checkout/reset it to publication HEAD midrun. Update root future-session pointers to consumed/partial exact state. Medium reviews next. Owner alone merges/deploys; no launch approval. Staff/company isolation, real-customer opening/tax qualification and backup/recovery LAST remain later launch gates.
