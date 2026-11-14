# Field and decision coverage for document workflows

This matrix turns “fill every field” into observable contracts. Combine it with the exact case fixture and shared controls, not an exhaustive Cartesian product. Source observation: commercial `createSchema`/`lineSchema` at [the pinned v2.5.12 action](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts). Limits below are observed source constraints, not automatically approved business policy or proof of UI enforcement.

| Field/decision | Valid and boundary inputs | Expected verification | Main journeys |
|---|---|---|---|
| Document type and intent | Supported type; draft/post/post_print; wrong type/stale state | Nonposting versus posted effects; source transition legal; print failure never blindly replays payment | SVC.J01, CORE.J06 |
| Party name/identity | Existing/new; blank, whitespace, Unicode; source name max255 and length256 | Correct tenant/party class; historical identity policy; no arbitrary foreign party | PHY.J01–02, CORE.J04–05 |
| Issue/due/delivery dates | Valid calendar; leap day; impossible date; due before issue under declared policy; timezone/lock boundary | Real date validation beyond YYYY-MM-DD regex; correct posting/report cutoff; no silent rollover | CORE.J02–03, BANK.J02 |
| Product ID and stored class | Own existing ID; known foreign; unknown ID; free-text only where explicitly supported | Correct physical/service/digital/rental effects; foreign/unknown not silently free-text | PHY.J01, DIG.J01, HYB.J01 |
| Quantity | Positive; zero/negative; at stock; over stock; four-decimal fractional; excess scale; discrete serial half-unit | Exact unit/precision/conservation; explicit negative policy; invalid no effects | PHY.J09, REN.J02–03 |
| Unit price/cost | Zero allowed only under contract; negative; decimal ties; large safe bound; source price/cost differs from current master | Correct original cost/price, no unsafe overflow or historical recompute; domain limit must be declared | PHY.J07, SVC.J03 |
| Description | Empty where required; multiline/Unicode; observed max1000 and1001; inert HTML/formula-like text | Save/reload/print/export preserves safe intended content; no injection | CORE.J04, BANK.J05 |
| Line discount | Percent/fixed; omitted default; 0/100/100.01%; fixed at/above line net | Explicit excessive rejection; default percent verified; no silent cap; correct net | SVC.J03, HYB.J02 |
| Header discount or discount ID | No discount; valid own discount; disabled/expired/foreign ID; greater than positive net | Stable proportional cent allocation and historical source credit; no negative line net | HYB.J02, CORE.J04 |
| Tax classification/rate | Confirm stored company/party/product enums and dated registration; supported inclusive/exclusive; mixed/exempt | Per-bucket arithmetic or explicit unsupported block; tax legality independently expert-reviewed | CORE.J07, SVC.J03 |
| Invoice kind and sale channel | commercial/tax_invoice; local/export; unsupported combination | Required legal/export facts and accounting scope; no generic VAT flag certification | CORE.J07, PHY.J11 |
| Supplier invoice number | Missing when required; observed max80 and81; same vendor sequential/concurrent; different vendor same text | Duplicate policy tenant/supplier-scoped; complete rollback and actionable message | PHY.J02–03 |
| Source document/order IDs | Valid own ancestor; array multiple sources; foreign, void, converted or stale source | Remaining receive/bill/return by line across descendants; no duplicate conversion | PHY.J03, SVC.J01 |
| Payment account and mode | Actual liquid account; inactive/foreign/revenue/AR/AP; observed code max20, mode max40 | Correct tender/account types; no payment on draft; persisted print facts | CORE.J01, REN.J04 |
| Payment/refund amount | 0/negative; partial; exact balance; balance+0.01; multiple invoices/parties | Exact allocation, no overpay/overrefund or hidden partial batch success | SVC.J02, CORE.J01 |
| Freight/duty/other charges | 0; valid positive; negative; multiple goods/service mix; late cost | Reviewed eligible allocation; recoverable input tax excluded from cost; no double charge | PHY.J11 |
| Export country/reference | Required per applicable contract; observed max100/120 and +1 | Preserve export evidence; foreign currency/FX support not inferred | PHY.J11, CORE.J07 |
| Purchaser tax/contact/address | Required applicability; observed max50/40/500 and +1; Unicode/line breaks | Legal eligibility/format reviewed; own safe persisted print facts | CORE.J07 |
| Location and brand | Own permitted; own denied scope; known foreign; null/shared policy | Stock and reports use same declared scope; no source/target leakage | PHY.J08, HYB.J04 |
| Book domain/entity/tier | Business/personal; company/sole/pending; plan defaults plus explicit module false | Effective authoritative ceilings; independent business type and entity; history preserved | HYB.J03–04 |
| Register/shift/POS source | Own open shift; closed/stale/foreign; sale/return with original source | Tender/change/Z totals; no posting to closed shift or excess return | PHY.J10 |
| Hire/event/delivery/collection dates | Inclusive endpoints; reversed/invalid dates; padding boundary; extension collision | Correct capacity and stage; no hourly availability claim from date-only calendar | REN.J01, J05–06 |
| Venue/guest count/packing notes | Observed venue max255, guest integer>=0, packing max2000; +1/negative/fraction | Persist useful operational details safely; no amount/availability effects from descriptive fields | REN.J01, J09 |
| Overlap/timing confirmation and reason | False/true; empty/valid/max500/+1 reason; wrong actor | Explicit scoped authority/reason/audit; override not extra physical capacity | REN.J05–06 |
| Rental return buckets | Good/dirty/repair/missing; cumulative partial; sum=outstanding and +1; negative | All dispatched units conserved; invalid negative not silently normalized | REN.J02–03 |
| Serial/kit selection | Own available serial; busy/foreign/duplicate; complete/short kit components | Unique unit assignment, component capacity and return conservation | REN.J07 |
| Notes/additional info | Observed max1000/2000 and +1; inert markup; whitespace/Unicode | Correct persisted safe text; useful error at bounds; no unrelated effects | CORE.J04, OPS.J02 |
| Idempotency/existing draft | Observed key max80/+1; same key/retry; different key same business source; stale/foreign draft | Intent identity and duplicate policy; no blind replay after uncertain success | CORE.J06, HYB.J05 |
| Attachments/public assets | Supported actual bytes; zero/wrong magic/size boundary; foreign record; revoked scope | Private ownership/signing, replacement/cleanup atomicity; exact limits pinned before run | OPS.J02, REN.J09 |
| Module/settings transitions | Toggle while form open; change tax/cost/approval/default; revoke role | Fresh server authority; declared draft reconfirmation; issued history unchanged | HYB.J03–04, CORE.J04–05 |

Journey labels above abbreviate stable IDs by dropping `WB-`. Record the complete case/control IDs in execution manifests. The casebooks supply concrete examples; additional exact boundary rows become stable new case variants before closure. No matrix row counts as executed evidence.
