# Coding handoff: service/digital sales, tax, credit and refund boundaries

Product **v2.5.5 · 8e1a2b8**, source8e1a2b8b29e662940bfcfecc4230875c83e35b6d. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. Original repair tests/expectations unchanged; no staging financial/stock/archive mutations.

## First ten-case results

[Campaign](../runs/CAMP-20261014-120513142-57ddba.json), CI38561135054: **265 passed,15failed,0skipped/blocked/not-run** across280 assertions. [PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), CI38561135013:91/106pass, no infrastructure failures. New ten-case lane3pass/7fail; old96 cases remain88pass/8fail. Implementation945c10b; tested merge9431b4985e37f286fd47b2ed2ce20620d0087120; QA content8538e2d6abe167c60da9f00793f97cd7790b92287e3cac2ee829dd2b2e8079d3. Exact fingerprints in reports.

Passing positives: service and digital2x200-line20-header30 yields350 revenue+63VAT=413AR, no stock/COGS (B-114/RT-040). Source100+18VAT credited after company rate changes still uses18 and preserves source tax (RT-033).

| Group | Actual versus required |
|---|---|
| BUG-0035 / RT-034 | Full discounted source413 credit becomes448.40; revenue return380 vs350, VAT68.40 vs63, AR credit35.40. Restore original allocated header discount/tax exactly. |
| BUG-0036 / RT-035 | Explicit standard taxable VAT-registered domestic supply100 in commercial style posts VAT0/total100 vs18/118. Separate tax classification from presentation; do not globally tax exempt/export supplies. |
| BUG-0037 / RT-036/037 | Header101 over gross100 or line101 over line100 with another valid line accepts. Refuse excessive discounts atomically; valid full discounts/zero-price support remain separate policy. |
| BUG-0038 / RT-038 | Repeated full linked return totals200 against source100, AR credit100. Lock/check cumulative source quantity and refundable value. |
| BUG-0039 / B-105 | Ordinary cash refund really spends100, cash/AR net0, but credit paid0/balance100. Align supported refund state with cash effect and preserve original receipt. |
| BUG-0040 / RT-039 | Refund tender4000 (revenue) accepts instead of denying; cash stays100. Apply shared liquid/owned/live/scope tender guard before writes. |

Source investigation and independent rules in each bug record and CHG-20261014-sales-value-boundaries. Excess-discount/rounding defaults are delegated policy, not statutory rounding law. VAT fixture classification is explicit; [Sri Lankan source refresh](../changes/CHG-20261014-sales-value-boundaries.md) records official IRD support and remaining specialist/format/exemption gaps. No tax certification from these arithmetic cases.

## Follow-up presently pending

RT-041 tests repeat **cash payout** after full paid-source refund; no cash-over-refund outcome claimed until execution. B-105 is strengthened to compare original receipt allocation, transaction, journal and lines with nonempty positive controls, not count alone. All earlier outcomes remain immutable. Fresh107PG/281campaign run pending; keep failures red, no expectation adjustment to match current output.

Fixture validity correction: first RT-035 used unsupported product taxStatus=`taxable` and did not store the named customer's unregistered status. Pinned UI/schema review shows supported `standard` product and `unregistered` customer values. Follow-up seeds/asserts those actual classifications before interpreting the tax-style path. **BUG-0036 remains provisional until corrected execution**; first0VAT observation is retained, not used as accepted tax-classification evidence. Ten other groups remain independently demonstrated; all regulatory/expert gates open.

### Completed supported-fixture/cash follow-up

[Campaign](../runs/CAMP-20261014-122046193-dc4024.json), CI38563023360: **281 assertions:265pass/16fail/0skip/0block/not-run**. [PG](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json), CI38563023399:91/107pass, no infrastructure failures. Implementation3ab4f6f; tested merge7a11169baeebf5de8e3a8e2ff19184e39c725719; content936f52304e3e75ab58497b434b6e8699cd11604f1a5cd32ee0a14f06495b4b03. Exact fingerprints retained.

BUG-0036 is now **bounded-confirmed**: stored productStandard1/customerUnregistered1, VAT0/total100 still reproduced against18/118. All specialist/format/real-role gaps remain open. Original provisional note explains the initial invalid fixture, not current confirmation state.

BUG-0038 additionally fails RT-041: paid100 source accepts two cash refunds totalling200; cash ends -100 instead of0. Prior unpaid-repeat RT-038 remains red. B-105 observes original receipt allocation/transaction/journal/line equality1, but credit still paid0/balance100, so the case overall fails. Fix refundable budget locks and refund state separately.

Eleven finding groups now independently demonstrated at their stated bounded layers, sixteen failed assertions. Three sales positives remain passing; all original repair assertions retain their expected outcomes. No new group ID for cash-repeat, same missing cumulative source budget. No live staging/customer cash changed. Treat latest report as current; first280/provisional outcomes remain immutable.

## Repair order and remaining scope

Treat source return validation/discount/cost/tax/refund state and tender as one impacted subsystem with separately tracked bugs and regressions. Recommended order: source/quantity/refundable locks + original snapshots, exact header discount/tax/cost reversal, shared tender guard, coherent cash-credit state, then tax classification/style and input discount validation. Expand regressions to partials, races, paid/unpaid sources, physical/service/digital, master/settings changes, periods/roles/tenants, fault rollback and UI/print/export.

Earlier [payment/archive](HANDOFF-20261014-v255-adjacent-readiness.md) and [inventory](HANDOFF-20261014-variable-cost-readiness.md) handoffs stay open. Across the three waves eleven finding groups are open;15 failed assertions in this first ten-case report. Existing BUG-0010–0016 originals are unchanged; refund4000 is a distinct adjacent path. Source-only fixes are not full closures.

Reproduce only fresh ephemeral PostgreSQL16 per docs/POSTGRES_RUNTIME.md; `pnpm runtime:run sales-value-boundaries` selects the lane, full campaign verifies regression after deliberate candidate pin. Do not run reset/fault/race harnesses on staging. Full137 workflows:61partial bindings,76unbound,zero accepted. Synthetic auth/owner SQL and Next adapters do not establish credential/browser/RLS/MinIO acceptance. Normal-role approval, Chrome popup, real physical/restore, operator DR and Sri Lankan expert gates remain open. Secrets/raw files private.
