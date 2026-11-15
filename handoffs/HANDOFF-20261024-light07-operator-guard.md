# Handoff — Light07 operator guard follow-up (PR #66 review)

Parent results: [HANDOFF-20261024-light07-attempt2](HANDOFF-20261024-light07-attempt2.md) at `5f7b8d5ee3158e0a085ff708cd24374c33859fcd`. Frozen attempt files were not edited. L07-SALE stays failed. Independent review pin: `31f97b679ca578d8a1f12a9863b97efabab4a312`. Parent guard pin: `f1913f4002e0c5c9439ffb2d4d6f9b6db6b83ab7`.

## Guard (this QA PR)

Fail-closed wrapper `scripts/operator-action-guard.mjs`. Required write path: `dispatchBrowserAppWrite(inputs, {js, script})` with the connected Browser app `js` tool.

- Charge the unpaused gap from persisted `lastAt` to dispatch through `advanceClock(..., 'check', now)` before `clockReport`. A stale active clock that crossed the execution threshold is a refusal even when stored `chargedMs` is 0.
- Revalidate persisted plan/state/fingerprint/clock immediately before `js`. Bind the ticket to the persisted case/submission. Consume the dispatch id first. Refuse reuse of the same ticket (including a clone), a bound-identity mismatch, a resolved intent, a changed fingerprint, a clock that expired after authorization, and uncertain `js` failures without replay.
- Rejected start/intent, missing/stale intent, unresolved other submission, fingerprint mismatch, missing exit, paused/closed/malformed/backward clocks, and a missing `js` tool cause **zero** `js` calls. Do not independently click after a Boolean `authorize`. Do not substitute HTTP, Playwright, or `pnpm agent:browse` for the Browser app `js` write path.
- Tests: `pnpm test:operator-action-guard` — 26 passed (included in `pnpm check`). Positive control invokes an injected `js` once with `document.title`. This coding session has no connected Browser app `js` tool; QA's next execution must pass the connected `js` into `dispatchBrowserAppWrite`.

Protocol: AGENTS.md rule 104; [COST_AWARE_QA.md](../docs/COST_AWARE_QA.md); [WCHG-20261024-pr66-guard-clock-dispatch](../changes/WCHG-20261024-pr66-guard-clock-dispatch.md); parent [WCHG-20261024-light07-operator-guard](../changes/WCHG-20261024-light07-operator-guard.md).

Do not relabel Light07 late recovery as pre-submit compliance.

## Live product (already merged; this request does not merge or deploy)

Live stamp **v2.5.22 · 211771e**, full SHA `211771e95d6f97cac5eb281a0f8e63f0fceef8a4` (BookOne PR #7 merge). File tree matches the earlier review candidate `c002e0e3541e0db07df7dccc2b6211094661c966`. Bind this full merge SHA and observed stamp on the next Light mission. Rendered focus/help/source-link regressions remain unexecuted; no findings are closed.

- OBS-M21-01: BODY/HTML are not returnable focus targets.
- OBS-M21-U1: sales-return paid/partial help.
- Visible source-quotation link + `/sales/orders/[id]`.
- Explicit unsupported: order print, list/trial export, actor/audit history UI.
- Supported exports already present: cashbook CSV, `/company/backup`, recon JSON.

## Preserve

Converted Q/order 600, unposted D 100, open S 600, open P 200. No replay, delete, reverse, settle, grant, module, job, or funding-gate change. Cash-on-hand/bank/card remain 0; vendor payments stay blocked until real funds exist.

## Next Light (Medium)

Independently rerun the guard tests, then bind a **NEW** queue/fingerprint/clock to live `211771e95d6f97cac5eb281a0f8e63f0fceef8a4` for receipts, part-paid credit, overpayment refusal/correction, and vendor payments. `executionReady` stays false until that binding. Do not retarget Light07 terminal cases. Do not merge or deploy as part of this request. Backup/restore LAST. BookOne remains unapproved.
