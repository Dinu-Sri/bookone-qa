# v2.5.12 deployed commercial workflow batch

**67 bounded manual assertions:61 passed,4 failed,2 inconclusive;three open symptom groups. Not release acceptance.** [Exact register](CHECKS-20261016-v2512-browser-deep.json), [pre-write intent](PLAN-20261016-v2512-browser-deep.md), [handoff](../handoffs/HANDOFF-20261016-v2512-browser-deep.md). These are individual assertions across linked purchase/sales/payment/return/report workflows, not67 completed business cases.

## Fingerprint and limitations

Owner-authorized disposable staging https://bookone.clossyan.com; connected Chrome supported UI. Product2.5.12, full SHA `ead3a82170e7a34ad625ec6ef8434e5ae65b1609`, start/resume/end stamp `v2.5.12 · ead3a82`. QA baseline `eac30724b0b119f3aa123a124ffed73e87fc3ba6`; committed intent `e510fc323a2c4aadeaf051f5619a20ab8336dd60`. No product edits/deployments. Rulebook1.0.0 SHA256 `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`; relevant commercial/payment/stock/history rules revision1, expert review pending. Library1.0.0 during execution;1.0.1 maintenance afterward. Execution product-ref remains0bcdf4d; earlier automated results were NOT rerun against this build.

Continued synthetic QA/Owner display in QA P261016 Owner's Company; no fresh credential-login identity or role/isolation acceptance. Observed settings unchanged: approvalOFF,reference-requiredOFF,duplicate-bill-blockON,requireGRNOFF,GRNIOFF,lastcost,negative-stockALLOW,VAT-registrationOFF,commercial/local,editlock0. No grants/settings/resets/backups changed. Inventory/rental/POS navigation absent; direct quantity/layer/stock-location evidence unavailable. Journal inventory is a GL assertion only. No full audit, HTTP/runtime DB, independent connections/race/fault, period lock, statutory or upgrade acceptance.

## Retest disposition of nine prior groups

| Prior finding | This candidate's bounded result | Remaining boundary |
|---|---|---|
| BUG0037 excessive draft discount |150% quote did not create a draft; list stayed3 |Transient validation wording not captured; other document types/boundaries not accepted |
| BUG0056 receiving limit |PO10 ended received10/billed4/remaining0; descendant count corrected |Typed7 produced accepted6; normalized pre-submit field not captured. Explicit server rejection unproven |
| BUG0057 duplicate bill crash |Graceful rejection; status identifies existing PUR0003 and conflicting reference |Other entry paths/races not run |
| BUG0058 print query integrity |Customer75.50/vendor100 persisted amounts/dates survived999/2020 query tampering |Other prints/exports/auth boundaries not run |
| BUG0059 duplicate purchase return |One new PR0003 only; no extra journal |Concurrency/idempotency keys not run |
| BUG0060 initial percent selection |Untouched default10% computed line270,header13.50,total256.50 |Other numeric/type combinations not run |
| BUG0061 overbalance feedback |Both forms immediately show Payment cannot exceed balance due |Server bypass/races not run |
| BUG0062 return preview |Full3 preview corrected; partial1/remaining2 previews still wrong |Posted credits85.50/171 and cost reversals60/120 correct |
| BUG0063 historical aging |Future-issue exclusion corrected for AR/AP15Oct |Future-payment reconstruction still fails for AR16Oct |

Bounded positives do not close entire bugs under AGENTS22. Do not collapse all nine to fixed. Original v2.5.11 evidence remains immutable.

## Confirmed failures

1. **P1 BUG0063 future payment leaks into historical AR.** INV0003 issued16Oct256.50, actual receipt75.50 on16Oct leaves181. A distinct genuine receipt1 on17Oct changes current debt180. As-of16Oct incorrectly changes to180, expected181. Aggregate with old positive70 incorrectly250, expected251. Before future receipt, identical cutoff showed251. Source issue-date exclusion15Oct correctly0. Preserve this invoice and future receipt.
2. **P2 BUG0062 partial linked-return previews disagree with posting.** Separate INV0004:3x100,line10%,header5%=256.50, cost180. Full preview256.50 passes. Qty1 preview56.50 versus85.50; save persists85.50/cost60. Remaining2 preview156.50 versus171; save persists171/cost120. Copies fixed discount30/header13.50 while quantity changes. Source-prorated backend outcomes are correct; no financial posting defect claimed for these returns. Cumulative3/256.50, source balance0. Attempt extra1 added neither SR nor journal.
3. **P2 OBS-D12-SUBTOTAL detail arithmetic.** Saved QT0003 and INV0003/4 label Subtotal256.50, Discount13.50, Total256.50, while line net270. Expected displayed subtotal270 before header discount, total256.50. Transaction/ledger total itself is correct. Separate observation ID avoids allocating a global BUG number without coordination.

## Financial reconciliation and retained fixtures

All aliases synthetic, prefixD2512-1610. Keep records; no cleanup/reset performed. This company retains earlier deliberately failing BW261016 data, so aggregate negatives are not new defects or clean opening balances.

| Fixture | Persisted state |
|---|---|
| Physical Widget SKU Q-D2512-1610-P-NL19 |Explicit Physical/cost60; PO0003 qty10/600; GRN0003 qty4/240; GRN0004 qty6/360 unbilled |
| Supplier/PUR0003 |Bill240; valid payment100; PR0003 credit240 applied140/creditdue100; billdue0 |
| Cycle Widget SKU Q-D2512-1610-C-UQPK |Explicit Physical/cost60; PUR0004 qty10/600/open600; no physical layer readback |
| Cycle Customer |QT0003→SO0002→INV0003 total256.50/cost180; receipts75.50 on16Oct and1 on17Oct; currentdue180; keep historical failure |
| Return Customer |INV0004 total256.50/cost180; SR0002 qty1/85.50/cost60; SR0003 qty2/171/cost120; invoice due0 |
| Validation quote attempt |150% rejected; no new quote saved. No product master saved for free-text service |

Journal11→21; exact total debits/credits1976.50→4542.50. Delta2566 =240+100+240+600+436.50+75.50+1+436.50+145.50+291. No unexpected overpayment/duplicate return/duplicate bill journal. Expanded SR lines confirm DrInventory60/120,CrCOGS60/120,CrAR85.50/171,DrSalesReturns85.50/171. Invoice journal confirms DrAR/CrRevenue256.50 and DrCOGS/CrInventory180.

October P&L: revenue858.50 less returns532 =326.50; expenses60; COGS180; net86.50 =old10+new76.50. Balance Sheet31Oct: cash−20,bank−88,AR174.50,inventoryGL180,assets246.50; AP160,currentearnings86.50,total246.50. Bank bridge−64.50−100+76.50=−88; AR−5.50+180=174.50; AP−340−100+600=160. Aging positive-only600AP/250currentAR differs from netGL due retained credit balances, not an unexplained reconciliation pass. Stock quantities/layers remain unverified.

## Corrections to first observations

First delayed snapshots in the setup checkpoint recorded no payment/duplicate-bill feedback. Source showed transient role=status toasts with3200ms lifetime. Controlled same-call click→wait-visible→read captured both payment errors and duplicate-bill conflict. Earlier absence claims are withdrawn as observation-timing mistakes, not retained product failures. Original checkpoint text is preserved with an appended correction.

Date fill17 reverted16 after another controlled-field rerender; initial75.50 receipt actually16. Do not report a product date defect or replay that receipt. Native keyboard entry survived independent amount rerender, then distinct1 receipt genuinely persisted17. This establishes historical-payment failure independently.

## Next execution

Coding agent: fix three observations with independently calculated regressions and actual diff/CHG; preserve historical data. QA: fresh-fingerprint retest, then remaining physical quantity/layers/locations/cost/settings/locks with verified actor and supported module access, service/digital/rental/hybrid, files/history/roles. Missing module access is an explicit acceptance gap; do not bypass prior rejected existing-company grants. Actual encrypted backup/restore LAST. Raw evidence/credentials excluded; sanitized observations and retained synthetic records are evidence. No durable screenshot archive claimed.

## Maintenance verification

Library render/check and starter generated-view check passed.26 targeted infrastructure tests passed (16 business-library,10 workflow-governance);0fail/skip. These validate maintained definitions/guard failure cases, not ERP behavior. Manual semantic review checked270−13.50=256.50,85.50+171=256.50,cost60+120=180 and cutoff181/current180, references and retained history. No full pnpm check, product source/runtime suites or full workbook execution claimed in this partial checkout.
