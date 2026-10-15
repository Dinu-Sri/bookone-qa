# v2.5.8 live fix retest (partial; browser continuation blocked)

Staging2026-10-15. Productcf35da1244e902e4a41291bc409eb0d994ed4e01, observed v2.5.8 /cf35da1. QA base3d981a27d06444ac22bde5ed273b653efcc015f0. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. Normal P257-Owner/P257-Physical session, already created and posted fixture retained privately.

Observed: existing Balance Sheet now assets1520=AP400+equity1120 with current earnings120. Existing receipt150 renders invoice/customer/date/cash correctly via READ-ONLY URL visit. Journal remains six balanced entries/debits2750, no duplicate receipt. Existing converted SO preview now Sales order / Dispatch by /400; rendered dialog has no Edit link (list has no edit route). No new trading actions performed yet in this phase. These are bounded observations; all four fixes remain pending complete retest/adjacent results.

Next: unchanged301 isolated campaign; read-only accounts/stock/aging/print positives; supported own-empty-company first PO alternative and both-empty validation. Actual company/config and creation outcomes recorded privately. Real backup/restore last. Product monthly/as-of/historical scope acceptance, expert RF-01-10 and137 full workflows remain open. No blanket customer readiness.

## Subsequent executed evidence

The initial checkpoint above is historical. [Unchanged301 campaign](CAMP-20261015-083605456-919da8.json), [CI38706760340](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38706760340):301pass/0fail/0skip/0block/flaky/not-run. All11 stages pass. [Independent PostgreSQL](RUN-2026-10-15T08-36-12-574Z-runtime.json), [CI38706760504](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38706760504):127pass/0fail, no infrastructure failures,43/43 migrations/PostgreSQL16.15. RT-060 now observes assets600/liability0/equity600/profit600 and unchanged journals. The campaign action deliberately exits1 for unfinished137 workflows/policy gates; executedGate=passed and campaignAcceptance=not-established are separate facts. No suppression or altered expectation.

QA implementation9009cbf6041975a943c49152bd5e0bfdcd424344; tested PR merge41fd8a09ef5da11165fa4d6d70a810d9f5be7435; content8117446ef43500daf4d270f206f0032a5b4c88885e1b34f15bf8c8887ce48f27, plan5196dbc99b6ee0633dd30930e373c69b0c34987ae7a4d306621b1a99ac340e9f; Node22.23.3/campaign-v2, bank fixture hash1a6e0581380277584a2318d851ee3eb7f2cf4b0c330230725cb5fd00ff5149fc. See JSON for full fingerprints and boundaries. These127 are INCLUDED in301, not additional coverage.

| Check | Actual result | Disposition |
|---|---|---|
| Build | Sidebar v2.5.8 /cf35da1 | Pass |
| Existing Balance Sheet | Assets1520, AP400, posted equity1000, current earnings120, equity1120, liabilities+equity1520 | Original same-period repro fixed |
| Existing receipt150 | Payment receipt renders correct company/customer/invoice/date/tender/amount by read-only visit | Original route render repro fixed; wider receipt combinations pending |
| No duplicate receipt | Journal remains6 balanced entries/debits2750 after read-only visit | Bounded pass; no payment replay |
| SO View labels | Sales order / Dispatch by /400 with original items/customer | Original label repro fixed |
| SO View navigation | No Edit link when list has no edit route | Bounded pass |
| First PO both vendor names blank | Native primary required blocks submission | Bounded validation pass; direct server empty-name path source-reviewed only |
| First PO alternate name only | Primary empty input required becomes false; validation message empty | Native blocker fixed; persisted positive NOT verified |
| First PO save | Submitted once with alternate name/service line60; returned to empty PO list. Vendors empty; journal0 | Positive blocked/unsaved; investigate new-company setup below |
| Adjacent invoice preview/remittance/stock/aging | Not re-executed at v2.5.8 before browser interruption | Not-run; v2.5.7 evidence not reused |

## New additional-company investigation (INV258-01)

Created own synthetic P258-Entry via Company Details Add company under the existing normal Owner. Company list confirmed ownership and supported Switch requested fresh login. Explicit P257-Owner login then loaded P258-Entry /Owner /v2.5.8. No Admin grants/configuration performed. Before writes, vendors and POs empty, journals0. Created one warehouse through supported UI (Location added). Sales/Purchase/Inventory/POS navigation said View only despite Owner; New PO was still offered. Both-empty native denial checked first, then alternate supplier alone relaxes required. Submitted PO60 once, returned to no purchase orders; vendors remain empty and journals0. Exact immediate error/toast was not captured, so this is NOT proof of a specific server error or permission bypass. Do not replay blindly.

Pinned source: createCompany inserts plan starter without explicit modules/jobs; tenant modules default empty. Permission loader uses raw module flags; canWriteModule requires explicit true, whereas navigation normalizes an empty object to legacy suite visibility. modulesForPlan(starter) declares Sales/Purchase enabled. This is a likely additional-company bootstrap/visibility mismatch, pending actual stored configuration/error verification and intended onboarding policy. Preserve default state before any scoped admin correction. It is separate from BUG-0046 native validation; do not misreport the unsaved PO as a passing persisted repro or weaken module write ceilings.

Browser control then stopped because another Chrome extension UI is open. Logout click timed out; no confirmed logout/admin session or module change. Current last confirmed Owner page Company Details/P258-Entry. Private journal records all actual creations/attempts; no public IDs/credentials. No live backup/archive test. Broader as-of reporting is being extended separately in RT-061, not certified from the same-month fix.
