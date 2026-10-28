# Rapid01 execution — 28 October 2026

Product `211771e95d6f97cac5eb281a0f8e63f0fceef8a4`, observed `v2.5.22 · 211771e`; execution QA `25bf94ad1877c80d9d9492a87431d5e1ab6f2dc0`. Fixed 41-checkpoint mission unchanged. Original approved actor freshly signed out/in by the agent with Remember off. No owner-assisted authentication was needed. This is bounded exploratory evidence, not launch/canonical acceptance.

## Result

40 checkpoints dispositioned: 16 passed, 2 failed, 19 blocked, 3 inconclusive. END publication/clock closure pending in this same results PR; final checks will record the completed disposition. No budget omissions. No unresolved submission. Do not read blocked downstream cases as executed failures.

Digital sale → one-unit source credit → receipt completed monetarily. Receipt date failed the fixed-date contract. Mixed physical/digital invoice → receipt → physical-only source credit completed with correct dates, original-cost reversal and zero remaining debt. Physical PO → goods receipt reached an unbilled stock branch; dated conversion stopped dependent trading. Delivered manual-service quotation saved without a master, journal or stock movement; its conversion was held on the same date incompatibility.

## Independently reconciled effects

Only six accepted financial events contributed: digital invoice300, credit100, receipt200; mixed invoice200 with physical cost60, receipt100, physical credit100/cost60. Journal debits equal credits1120, six new journals. Expected versus observed deltas:

| Measure | Expected accepted-branch delta | Observed |
|---|---:|---:|
| Cash1000 | +300 | +300 |
| AR1300 / AP2100 | 0 / 0 | 0 / 0 |
| Revenue4000 / returns4100 | +500 / +200 | +500 / +200 |
| COGS5000 / inventoryGL5100 | 0 / 0 | 0 / 0 |
| Net income / assets | +300 / +300 | +300 / +300 |
| Physical quantity / current stock value | +10 / +600 | +10 / +600 |
| Physical movement events | 3 | 3 |

The ten-unit GRN is accepted quantity-only under GRNI off and remains UNBILLED. Its600 stock value has no bill journal. The pre-existing stock-to-GL difference remains separate; the closing difference increases by this600 unbilled branch. No balancing repair or duplicate receipt/bill was attempted. The 19-journal4500 full-success oracle was never imposed on this partial run.

All162 opening journal summaries and31 opening movement rows remain present. All five protected document detail snapshots and complete sales/purchase/inventory settings match openings. Catalogue remains10 items; only the selected physical item's quantity changes by+10. New stock events are GRN+10, mixed sale-1 and its credit+1. Other stock rows unchanged. Full month reports reconcile; historical AR asOf27October correctly retains the digital200 receivable because its receipt is dated28October, while current AR returns to opening. AP unchanged.

## Failures and gaps

1. **QA execution date error:** the digital receipt posted28October rather than planned27October. The saved pre-submit snapshot already showed28October after rerendering; the agent missed it. This is an operator verification failure, not evidence that the server changed a verified date. Preserved, never reversed/replayed. Subsequent mixed payment committed dates through native keyboard changes and re-read after rerender; its date27October persisted.
2. **Prepared mission/calendar incompatibility:** PO dated27October converted through the supported control to a GRN dated28October. That control has no target-date input. Exact pinned `commercial-docs.ts:3255` sets current UTC date for general conversions, including quotation/order/bill targets. GRN quantity/ancestry/no-GL effects are correct, but the frozen oracle specifies businessDate27October. Physical bill/return/sale/settlement dependencies are held; service conversion is blocked before submission. This is a demonstrated QA date-contract incompatibility; changing product date policy requires owner/product review. It is not automatically a product accounting defect.
3. **Authentication reliability observation:** first guarded Logout left the protected workspace accessible after reload and fresh navigation. Its no-effect readback was resolved and preserved. A separately authorized later Logout followed by reload redirected to Login, and guarded login succeeded. Root cause unconfirmed; do not label this a proven security vulnerability or erase the first failure.
4. **History/audit limits:** digital/mixed invoice and credit-note print previews rendered correct lines/totals, and both receipt previews reopened independently. These are available capabilities, superseding an assumption that receipt output is wholly unavailable. The payment list exposes open obligations, with no receipt-history index observed; no financial audit/history control was observed on tested document surfaces. Missing audit evidence keeps both history closures inconclusive. No physical printing.
5. **Refund/rental:** source-return UI exposes credit without a cash/refund account; no qualified rental item exists. Read-only gap qualification only. Credits are not cash refunds.

## Controls and validation

96 focused tests passed,0failed/0skipped. Fresh actual title and safe navigation-click controls passed; four refusal controls dispatched zero UI calls. Initial uppercase accessibility-name click proof was refused and preserved; new proof used observed DOM name. Seven proof adapter invocations ran within three actual CUA tool invocations, yielding two UI API calls. Including authentication and business work:19 adapter invocations in15 CUA tool invocations,14 UI API calls (2 proof,3 auth,9 business). These are different counters. Earlier private prose conflating proof invocations is explicitly corrected here.

Every authentication/business submission used persisted desktop source/URL/button/case/dependency/intent/fingerprint/clock checks and a durable single-use claim, followed by independent readback. No queue/oracle/adapter modification, alternate driver/HTTP write, master/settings/grant/funding workaround, consumed historical event replay, merge or deployment. A navigation timeout was resolved by reading actual state; no financial action was replayed. Raw credentials, identifiers, URLs and evidence remain private.

The previously documented full `pnpm check` Windows governance failure remains open; this run used the required focused96 tests and did not infer a green full chain. No schema/image attestation, role/foreign-tenant/race/fault/upgrade/storage/backup/expert/accessibility acceptance. Backup/restore remains LAST.

## Next substantial cycle

Use the [consolidated handoff](../handoffs/CODING-MISSION-20261028-rapid01-exec1.md). Resolve the date contract once before new writes. Bind a fresh immutable execution-day date or explicit supported target dates, refuse midnight rollover, and preserve source issue/delivery/due dates separately. Prepare one complete continuation batch covering existing unbilled GRN→bill→purchase return→physical sale/receipts/return/vendor settlement and saved service quote→order→invoice/receipts/credit/service expense/vendor settlement. Explicitly review use of these run-owned sources with new current openings; do not recreate already received stock or completed financial events. Include original/adjacent date and history checks in that same batch; do not restart the historical Light queues or count these summaries as fixed bugs.
