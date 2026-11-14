# WCHG-20261024-pr66-guard-clock-dispatch

Owner request: address independent review of PR #65 at `31f97b679ca578d8a1f12a9863b97efabab4a312`. Parent guard `f1913f4002e0c5c9439ffb2d4d6f9b6db6b83ab7`. Live product is v2.5.22 · `211771e` / full `211771e95d6f97cac5eb281a0f8e63f0fceef8a4` (PR #7 merge). Frozen Light07 attempt2 and all earlier results remain unchanged. No financial write, grant, merge or deploy.

## Problem and resulting behavior

PR #65's 12 tests passed independently. Inert probes showed: (1) an active clock opened 110 minutes earlier with `chargedMs: 0` still authorized, because `clockReport` was used without charging the unpaused gap; (2) the same authorization invoked a callback twice; (3) CLI markers and generic callbacks did not bind the connected Browser app `js` tool.

The wrapper now charges the clock to the dispatch timestamp through `advanceClock(..., 'check', now)` before reading `allowNewBusinessSubmission`. `dispatchBrowserAppWrite` is the required write path: it revalidates persisted plan/state/fingerprint/clock immediately before calling `js(script)`, binds the ticket to the persisted case/submission, records the dispatch id before the `js` call, and refuses a second invocation (including a cloned ticket), a bound-identity mismatch, a resolved intent, a changed fingerprint, an expired clock, paused/closed/malformed/backward clocks, and uncertain `js` failures without replay.

## Maintained sources and impact

No rulebook, UX workbook, or business-case revision. Frozen Light07 attempt files are not edited. AGENTS rule 104 and COST_AWARE_QA now require `dispatchBrowserAppWrite` with the Browser app `js` tool. `pnpm check` still includes `test:operator-action-guard`. Focused validation: operator-action-guard 26 passed, operator-queue 9 passed, review54-controls 9 passed, validate metadata-valid 792 scenarios.

## Fixtures, compatibility and validation

Preserve converted quotation/order 600, unposted draft 100, open invoice 600, open bill 200. Do not collect, pay, reverse, or delete them. No grant/module/job change. No funding-gate workaround. Future receipt/credit/overpay/vendor-payment work needs a NEW reviewed fixture family after Medium accepts this guard.

## Responsibilities and unresolved approval

Technical authoring by the current assistant; no invented independent human/expert sign-off. Medium independently reruns the guard tests and binds a NEW Light mission to live `211771e95d6f97cac5eb281a0f8e63f0fceef8a4`. Light07 L07-SALE remains the original operator-control failure. This coding session has no connected Browser app `js` tool; tests prove that surface is not invoked on rejected prerequisites and is invoked once on a valid inert script. QA's next execution must pass its connected `js` into `dispatchBrowserAppWrite`. No merge/deploy. Backup/restore LAST.
