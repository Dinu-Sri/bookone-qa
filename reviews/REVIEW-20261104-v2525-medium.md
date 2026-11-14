# Medium review — v2.5.25, 4 November 2026

## Decision

Product fixes are independently supported at the isolated PostgreSQL layer. No Light release or live acceptance yet. Product PR10 remains open/unmerged at review time. QA PR95 corrects two independently diagnosed harness errors; fresh HTTPS CI passed all30 cases. Do not merge/deploy from this review.

Product: 5ea0d6e243a1bd37889240e15b10ea86ef3c94ba, v2.5.25 · 5ea0d6e, tree 07ff418256d8bdd56fb1569203e6baa4f03aaa44.
Coding QA: 506db5baa0106784ead44749416639b9c47accdd, PR94.
Review harness: 5043390ae43ca4bd677b7705252582a1003ec341, PR95.

## Independently inspected evidence

- [PostgreSQL CI 41851603415](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41851603415): 136/136 passed across 13 implemented lanes, including rental 17/17, commercial-deep 8/8, real nonowner RLS 9/9 and role-scope 19/19. D-112 original source-status expectation retained and passed. D-113 six-journal after-return workflow, D-119 audit and D-120 bay permission cases passed.
- CI recorded synthetic QA merge a36627e8c0e66fdb2e03cfa1f44af82fdc2c087c; parents PR93/PR94 and tree 6270f7b0236f3916d540e217cb3e9ef5fbb0da9b equal exact PR94 head tree. Product pin equals the candidate above. This is isolated CI evidence, not deployed browser evidence.
- [Repository validation 41851603329](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41851603329) succeeded, resolving the stale archive-pin Linux failure on this fingerprint. Candidate A, five B–F source jobs and archive helper jobs also succeeded; narrower layers only.
- [HTTPS 41851603366](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41851603366): setup passed, 26 passed / 4 failed / 0 blocked. HTTP-014/015/114/115 rental reads/denied charge writes passed. Preserve failures HTTP-007/107 and HTTP-013/113.
- [Campaign 41851603437](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41851603437): executedGate passed, campaign acceptance not established, 137 defined workflows / 67 partial bindings / 70 without bindings / zero accepted full workflows. Overall failure is retained; it is not evidence of 137 completed journeys.
- Fresh local 19 focused tests passed (10 Rapid04 + 9 HTTP contracts/guards); metadata validation passed. Product author's 310 unit tests are reported evidence, not independently rerun here.

## HTTPS diagnosis and correction

Receipt case used date/account/total/doc/amt query facts. Exact product receipt page accepts payment IDs, loads persisted allocations, and ignores those obsolete facts. HTTP 200 with absent expected receipt detail therefore does not prove a product rendering defect. QA now retains the original seeded receipt payment IDs and passes canonical repeated payment parameters. Expected persisted customer/invoice/150.00 content and no duplicate posting remain unchanged. Missing/invalid saved payment IDs fail closed.

Rental HTTP seeding now creates inventory settings FIFO. The old denial check called any resulting FIFO a Viewer change, despite its separate complete before/after snapshot passing. QA now selects a valid submitted value different from the opening field and compares actual opening/closing field rows. Full business snapshot, Owner positive save and posted-finance/stock equality remain. No permission assertion or failed historical result was removed.

Fresh corrected [HTTPS CI41860757738](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41860757738) passed30/30,0failed/blocked. Fresh [PG CI41860758098](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41860758098) passed136/136, rental17/17; validation41860758010 and B–F41860757765 also succeeded. Tested review QA5043390ae43ca4bd677b7705252582a1003ec341; synthetic CI QA d22e724722126df74fb56df544587674a113335b has the same tree40b96b3a817101753c00085202fb214107623872 and parents PR94/review head. See runs/CHECKS-20261104-v2525-medium-review.json. This independently confirms the corrected contracts on the real isolated Next server; deployed Chrome acceptance remains open.

## Product source/impact review

Pinned changes reviewed directly; codebase-memory graph tool is unavailable. No graph completeness claim.

- Source rewrite: both fully_invoiced and converted paths share skipHireSourceRewrite; charge-linked sales invoices and existing confirmed/deposited hire billing preserve source. Ordinary sales conversion and quote-to-order do not get the skip merely from the flag.
- Billing-only: existing reserved/dispatched/returned source bookings or held deposit prevent duplicate invoice reservations/event cancellation. D-113 independently asserts the complete after-return money/stock result. Reserved/dispatched variants, repeat invoicing/races and broader policy acceptance remain bounded by implemented tests, not blanket approved.
- Activity reader now admits rental_booking_lines, rental_events and inventory_stock_levels. Wash release uses stock-level record ID with a location fallback and explicit product/location/qty metadata. D-119 passed isolated actor/tenant checks; deployed visible rows/readback remain required.
- Supported bay creation offers On rent/Wash/Repair and enforces company.locations.write plus Rental for ensureFleetBays. D-120 denies Viewer/module-off and verifies repeated setup avoids extra bays sequentially. Concurrent setup/code-collision behavior is not certified.
- Shared impact: commercial conversion, invoice/source relations, rental reservations/deposits, stock/bays, accounting, Activity reads and company settings/permissions. Current candidate source/runtime lanes cover implemented regressions; complete browser/credential/business families remain separate.

## Fixture and continuity

PR93 completed A Owner/A Viewer/B Owner and A-only Pro+Inventory+Rental under explicit owner authorization on 30 October, applied 4 November. POS/HR off. The coding handoff's phrase AUTH remains request is stale: the current decision top records authorization/applied. Do not ask again, recreate accounts or repeat the module save.

A still needs supported rental business fixture: warehouse/bays, product opening fleet20@50 and after-return/block settings. These are NOT created by CI. Private credentials/actual IDs remain in ignored local fixture files. Original company unchanged.

The last positively observed live build is v2.5.24 · e5bb589 from the preceding fixture run. This review attempted read-only Chrome access, but selected browser2 was unavailable; no fresh live stamp is claimed. Product PR10 open/unmerged supports only repository state, not live hosting identity.

All previous transactions, 225 prior journal entries, 43 stock movements, 64 protected source set, four historical bad credits, stock GL gap120 and Q/order600/D100/S600/P200 remain protected. No browser auth/config/business writes in this review. Missing/loss5150, EventHireFields default On confirm, signup fleet seeding and RF04/RF09 expert recognition remain open; dirty return alone never authorizes a fee. Backup/restore LAST.

## Next

See handoffs/HANDOFF-20261104-v2525-next-batch.md. Corrected HTTPS CI is green. Next is owner-controlled merge/deploy if accepted, then Medium verifies actual deployed full SHA/tree/stamp and prepares the full fixture plus new dated Light mission. Existing 40-point BINDINGS is a non-executable reference map; do not run its 11-case planning template or relabel 40 points as accepted.

