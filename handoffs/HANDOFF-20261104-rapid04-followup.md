# HANDOFF-20261104 — Rapid04 grouped follow-up (v2.5.25)

One consolidated coding/fixture handover. **No merge, no deploy, no Light execution.** BookOne is not customer-ready. Backup/restore LAST.

## Exact pins

| Item | Value |
| --- | --- |
| Product branch | `fix/v2525-rapid04-followup` |
| Product SHA | `5ea0d6e243a1bd37889240e15b10ea86ef3c94ba` |
| VERSION / stamp | 2.5.25 / quote `v2.5.25 · 5ea0d6e` only after authorized deploy |
| CHG | [CHG-20261104-rapid04-followup](https://github.com/Dinu-Sri/BookOne/blob/5ea0d6e243a1bd37889240e15b10ea86ef3c94ba/docs/changes/CHG-20261104-rapid04-followup.md) |
| Live baseline left untouched | v2.5.24 · `e5bb589267035ffb031b6c083f4e911bb7d04aac` |
| QA branch | `qa/rapid04-v2525-followup` |
| QA SHA | PR HEAD on that branch (publication commit of this handoff) |
| QA parent fixtures | PR93 `1781dba56d2f9315d71a8ea23cc226feabf4b117` |
| Private locator | ignored `qa/.local/private/bookone-rapid04-fixtures.json` (AOwner / AViewer / BOwner). Do not recreate. |

## Product fixes

1. **D-112 source status.** First CI failure [41000512103](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41000512103) job 123883563313, rental-lifecycle 11 pass / 1 fail, assertion `expect(source.status).toBe(before.status)` at `rental.test.ts:32:770` on QA `06a4d412`. Cause: hire-charge invoice set the order `fully_invoiced` even though `converted` was skipped. Fix: `skipHireSourceRewrite` gates both paths. D-112 test body unchanged. First record: [OBS-D112](../bugs/OBS-D112-source-status-first.md).
2. **After-return continuity.** `persistRentalBookings` returns `{ billingOnly }` when the source already has reserved/dispatched/returned lines or `depositHeld`. Commercial create does not re-reserve or void the original event. D-113 covers invoice 500, receipt 500, charge 200 apply, refund 800, six journals, cash +700, 4400 −500, 4450 −200, fleet 20, order not converted/fully_invoiced.
3. **Activity.** `FINANCIAL_AUDIT_TABLES` includes `rental_booking_lines`, `rental_events`, `inventory_stock_levels`. Wash-release `recordId` is the stock-level UUID (location fallback). D-119 Owner/Viewer/foreign.
4. **Hire bays.** Locations Type offers On rent / Wash / Repair when Rental is on. Rental Settings **Create missing hire bays** uses `company.locations.write` + rental module. D-120 Viewer and rental-off deny.

## QA controls

- rental-lifecycle expected **17** (added D-113, D-114, D-116, D-119, D-120).
- HTTP-014/015 (114/115) rental GET/write codec. Cases 001–013 snapshot tables unchanged.
- [BINDINGS-RAPID04](../queues/BINDINGS-RAPID04.json) maps all 40 PLAN points. `executionReady` remains **false**. Medium binds a NEW dated Light mission after this review.
- Pin: `product-ref.json` + archive catalog/plan = `5ea0d6e…`, stamp `v2.5.25 · 5ea0d6e`. Historical archive cases stay `not-verified`.

## Tests (this session)

| Scope | Result |
| --- | --- |
| Product accounting + auth + statement-import | 28 files / **310 passed** (was 27/307; +3 rental-guards) |
| Isolated PG16 runtime | **not-run** (no empty loopback `bookone_qa_runtime` here) |
| Live browser / fleet 20@50 on company A | **not-run** (A still has no locations/fleet; prepare on this candidate after review) |
| HTTP 41000512110 (v2.5.24 pin) | setup passed; **24 passed / 2 failed / 0 blocked**. Failures HTTP-007/107 receipt body, GET 200. GitHub log 502 was retrieval, not app 502. [CHECKS](../runs/CHECKS-20261104-http-41000512110.md) |
| Linux backup:plan:check 41000512118 | failed 0bcdf4d vs 6152aa33; this commit aligns both to 5ea0d6e |
| Windows `pnpm check` | workflow-governance `fs.cpSync` 3221226505 `STATUS_HEAP_CORRUPTION` remains host-specific. Tests not skipped. |

## Preserved / explicit limits

- Do not recreate A/B accounts or replay Rapid03 money, four bad credits, stockGLgap120, Q/order 600, D100, S600, P200.
- AUTH-20261030 remains request, not grant, in docs. A modules already applied under owner authorization in PR93.
- Original QA Inventory-off ceiling unchanged. Missing/loss 5150, EventHireFields default On confirm, signup fleet locations, RF04/RF09 remain open. Ordinary dirty return never implies a fee.
- Operator Rapid04 is not Light-executable.

## Remaining owners

- Medium: review this exact product SHA + QA companion, then bind a NEW dated Light mission (`executionReady` still false here).
- Isolated runtime retest of D-112/D-113/D-119/D-120 and HTTP-014/015 on empty PG16 against this pin.
- Owner: later merge/deploy of v2.5.25 if accepted. Not this request.
- Prepare A fleet 20@50 and after-return/block settings through supported UI on the reviewed candidate before Light.
