# Light04 results — 22 October 2026

Exact candidate **v2.5.19 · 4c3a304**, full `4c3a304e6adc985c591ecb7934382b8929f9b189`. QA execution definitions `2b009339cd7776e7c5327c733f4e0026aaeab8b6` from PR53. [Checks](CHECKS-20261022-light04-results.json) retain all28 IDs, original expected outcomes, first dispositions, missing layers and next actions. Publication close: **completed; independent Medium review pending**.

Disposition counts: 10 passed, 4 failed, 10 blocked, 4 inconclusive. These are mission slots, not an ERP completion percentage. No bug or canonical workbook case is closed by this run.

## Gates and execution boundary

Fresh supported logout/login with the private fixture, Remember off; QA Owner in the expected synthetic company. Live build reloaded at start and close. Actual opening TB, journal, stock and complete purchase/inventory/sales maps captured. Planned transitions saved/reloaded. No deployment or actor switch crossed the run.

Connected Chrome, English UI/LKR, fixture dates21/22/28October; default viewport1920×855. Responsive sizes390×844 and320×844 verified on the secondary tab, then reset on both tabs. No assistive technology, real server authorization, concurrency, schema-upgrade or legal tax eligibility acceptance.

Start `2026-10-22T05:13:31.872454+00:00` UTC. Initial publication/readback completed at08:20UTC (11:50Asia/Colombo), with a continuation interruption during closing. Total wall time exceeds the120-minute active budget; active time and interruption/idle duration were not instrumented, so compliance with the active budget is unverified. No further live business cases were added after queue disposition. One additional owner message requested continuation during closing; no answer or manual browser intervention was required. Model/setting, observed credits and cost savings unavailable. This is browser execution with a custom private checkpoint journal, not unattended automation. The required generic operator initialization was not used; this deviation needs Medium review.

## Slot dispositions

|Slot|Disposition|Scope|
|---|---|---|
|M19-GATE|passed|Pin exact live candidate|
|M19-ACTOR|passed|Fresh login, settings and actual openings|
|M19-HISTORY|passed|Preserved failure and legacy draft readback|
|M19-FIX-A|failed|Fresh physical purchase source A|
|M19-FIX-B|passed|Different-vendor discounted source B|
|M19-PICK-EMPTY|blocked|Generic picker empty to A without reload|
|M19-PICK-AB|blocked|Switch A to B and back|
|M19-PICK-CLEAR|blocked|Clear and reselect source|
|M19-PARTIAL|blocked|One purchase return at60|
|M19-REMAIN|blocked|Remaining two and over-return denial|
|M19-PUR-SPLIT|blocked|Purchase added-row source price and close|
|M19-ZERO|blocked|Exhausted source has no accepted additional return|
|M19-SALES-FIX|passed|Fresh digital source at100 vs catalogue10|
|M19-SALES-DENY|passed|Split2+2 exceeds source3|
|M19-SALES-CLOSE|inconclusive|Valid1+1+1 source100, footer300 and post|
|M19-DRAFT|passed|Discounted draft and full return adjacency|
|M19-TAX|inconclusive|Historical VAT302.67 adjacency|
|M19-F7|passed|Fresh residual ladder after shared row changes|
|M19-SUPPLIER|inconclusive|All-field server refusal then corrected bill10|
|M19-LISTS|passed|Shared lists, status and no-write busy cleanup|
|M19-UNLINKED|inconclusive|Shared source-less forms retain normal pricing|
|M19-QUOTE|failed|Product search/manual/discount refusal|
|M19-KEYBOARD|failed|Bounded keyboard/help/dialog checks|
|M19-NARROW|failed|390px and320px affected-form smoke|
|M19-LATE|blocked|Controlled late-response source race|
|M19-U7|blocked|Authentic legacy101c upgrade|
|M19-U10|blocked|Authentic legacy104c upgrade|
|M19-END|passed|Restore, reconcile and publish|

## Actual financial ledger

|New source/event|Posted amount|Journal effect|Retained outcome|
|---|---:|---|---|
|PUR-20261022-0008, manual service/header5%|95.00|Dr6800 / Cr2100|Open95, referenceM19-B; distinct synthetic vendorB|
|INV-20261022-0037 and SR-20261022-0076|300.00 each|Dr1300/Cr4000; Dr4100/Cr1300|Source0; three1×100 credit rows; catalogue remains10|
|INV-20261021-0038 and SR-20261022-0077|256.50 each|Dr1300/Cr4000; Dr4100/Cr1300|Draft initially noGL; dates21/22/28 and notes retained; source0|
|INV-20261022-0039, tax26OCT_01/8; SR-20261022-0078|302.67 each|Supply256.50 and VAT46.17, then exact reversal|Source0; VAT registration false before return|
|INV-20261022-0040 and SR0079–0085|6.95; credits below|Invoice Dr1300/Cr4000; every credit Dr4100/Cr1300|Source0; header0.05 conserved|
|QT-20261021-0004, failed150% header test|0.00 draft|Not posted|Preserved; no correction or conversion|

No sourceA bill, purchase return, corrected supplier bill10, cash movement or new stock movement was posted. New quick-created physical product Q-M19-RETURN-P-ENDD remains quantity0/cost10/sell0. Its attempted edit to60/10 failed; separate full-create SKU M19-RETURN-READY-20261022 was absent on exact search. No historical substitute, payment, writeoff, archive/delete confirmation, repair or reset.

## Seven-credit checkpoints

Each row had its own pre-submit intent, preview, single Save, persisted View breakdown, matching expanded journal, remaining quantity and direct source-balance readback before continuing. Source invoice7×1 minus fixed0.05=6.95 posted once. Every line gross/net1 and line discount0; header allocations below. Returned total6.95, total header0.05, source quantity/value0. Fresh-only evidence does not certify legacy101c/104c upgrades.

|Step|Credit|Preview=posted|Header|Remaining qty|Balance due|Journal count / turnover|
|---|---|---:|---:|---:|---:|---|
|1|SR-20261022-0079|0.99|0.01|6|5.96|131 / 15064.91|
|2|SR-20261022-0080|0.99|0.01|5|4.97|132 / 15065.90|
|3|SR-20261022-0081|0.99|0.01|4|3.98|133 / 15066.89|
|4|SR-20261022-0082|0.99|0.01|3|2.99|134 / 15067.88|
|5|SR-20261022-0083|0.99|0.01|2|2.00|135 / 15068.87|
|6|SR-20261022-0084|1.00|0.00|1|1.00|136 / 15069.87|
|7|SR-20261022-0085|1.00|0.00|0|0.00|137 / 15070.87|

After each credit, reopening copied original qty7 and displayed an explicit remaining-quantity exceeded warning. The test changed qty to1 before the next Save. This is a separate UX observation, not a rounded money mismatch.

## Closing reconciliation

|Control|Actual opening|Actual closing|Net change|
|---|---:|---:|---:|
|Journal count|122|137|15 accepted entries|
|Total debits = credits|13243.63|15070.87|1827.24|
|AR, also current AR aging|1306.21|1306.21|0|
|AP, also current AP aging|1090.00|1185.00|95.00|
|General expense6800|10.00|105.00|95.00|
|Profit|829.50|734.50|-95.00|
|Inventory GL / stock value|660 / 780|660 / 780|0; inherited gap120 retained|
|Output VAT / Input VAT|46.71 / 0|46.71 / 0|0|
|COGS / GRNI|420 / 0|420 / 0|0|
|Cash / bank / card|0 / 0 / 0|0 / 0 / 0|0|
|Assets = liabilities + equity|1966.21|1966.21|0|

New sales supply totals819.95, reversed by returns819.95; tax46.17 reversed. Journal turnover =95+2×(300+256.50+302.67+6.95)=1827.24. The all-pass AP1195 forecast does not apply: supplier correction10 was never posted. B remains95 unpaid; final purchase-list query for the supplier-refusal vendor returned No matches. Old INV0032 remains open300; INV0018/0030/0031 were inspected read-only and left unchanged.

Opening purchase requiredSupplier=false and inventory negative=allow were restored, all other purchase/inventory/sales values unchanged. Full captured maps compared exactly after reload, including VATfalse18 and POS-register form defaults; no register mutation. Both viewports restored1920×855. End reload stillv2.5.19·4c3a304. Failure fixtures retained; encrypted backup/restore remains LAST.

## Corrections and missing evidence

- FIX-A: full New product SKU M19-RETURN-READY-20261022 was searched after the exception: No products found. The earlier checkpoint evidence string saying readback pending is superseded only by this appended readback, not erased.
- DRAFT: an immediate journal read initially showed the previously expanded SR0076 table. It was not used as invoice proof. The matching INV0038 entry was explicitly expanded and Dr1300/Cr4000 256.50 verified; the SR0077 matching entry and 127/14451.63 were verified separately.
- LISTS: fill-only date input left All time. Native ArrowUp/ArrowDown commit then produced the 22Oct filter and exactly0037/0039/0040. This is a harness correction, not a date-filter product defect.
- SUPPLIER: no explicit refusal was captured in the submission sequence. Native validity messages were empty, all16 fields retained, 137 journals unchanged; final purchase-list query for the synthetic override vendor had No matches. This proves no observed accepted bill but does not establish a server-refusal layer. No correction/retry occurred.
- QUOTE: tested 150% HEADER (Quote discount), not the line discount. It was clamped to10 on a10 quote and saved as0. Medium must review header-vs-line rule binding without rewriting the original refusal expectation or treating an unexecuted line-discount branch as tested.
- NARROW: viewport override applied to the active secondary tab, while primary stayed1920x855. Actual390/320 dimensions were verified on that secondary tab before responsive observations. Both tabs were1920x855 after reset.
- NARROW geometry correction: the earlier checkpoint claimed390px tooltip extends8pastviewport. Actualx42+width340=382 fits390CSSpx but exceeds layout width375 by7px. Only320px visual left clipping is directly demonstrated; the390px concern is review-only.
- KEYBOARD: body focus is reported by tag only. Accidental broad body text from a focus probe was excluded from publication; no embedded payload or private record identifiers are included.
- Protocol deviation: a custom private append-only submission ledger and terminal case checkpoints were used instead of operator-queue init/pack. No claim is made that the generic operator tool initialized or enforced this fingerprint. Schema and actual model/credit usage were not observable. Medium should audit this deviation before using the run for acceptance.

Required credit print was not exposed by observed return View/Actions UI. SALES-CLOSE and TAX remain inconclusive despite exact monetary/readback checks. Server refusal was not conclusively captured; SUPPLIER remains inconclusive. Physical-source dependent slots remain blocked, and unlinked consumer smoke remains partial. LATE/U7/U10 require reviewed isolated environments. [Findings](../bugs/OBS-20261022-light04-results.md) and [handoff](../handoffs/HANDOFF-20261022-v2519-light04-results.md) name owners and next steps. No full repository check was run in the partial snapshot; validation of these artifacts is reported in the handoff.
