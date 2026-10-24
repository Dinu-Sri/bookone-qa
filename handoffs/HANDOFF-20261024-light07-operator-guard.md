# Handoff — Light07 attempt2 next actions (operator guard + product evidence)

Parent results: [HANDOFF-20261024-light07-attempt2](HANDOFF-20261024-light07-attempt2.md) at `5f7b8d5ee3158e0a085ff708cd24374c33859fcd`. Frozen attempt files were not edited. L07-SALE stays failed.

## Guard (this QA PR)

Fail-closed wrapper `scripts/operator-action-guard.mjs`:

- Authorize: command exit 0, persisted running case, matching unresolved `submissionId`, `guard()` fingerprint, clock `allowNewBusinessSubmission=true`.
- `executeAuthorizedBrowserAction(auth, browseFn)` calls `browseFn` only when `auth.allowBrowserAction` is true.
- CLI: `node scripts/operator-action-guard.mjs execute <plan> <state> <fp> <clock> CASE SUBMISSION_ID EXIT -- pnpm agent:browse ...`
- Tests: `pnpm test:operator-action-guard` (included in `pnpm check`). Spy/CLI marker proofs for rejected start, rejected intent, missing persisted intent, stale submission id, unresolved other submit, mismatched fingerprint, missing exit code, budget boundary, and CLI spawn refusal.

Protocol: AGENTS.md rule 104; [COST_AWARE_QA.md](../docs/COST_AWARE_QA.md); [WCHG-20261024-light07-operator-guard](../changes/WCHG-20261024-light07-operator-guard.md).

Do not relabel Light07 late recovery as pre-submit compliance.

## Product candidate (separate review branch, not merged)

Review branch `fix/v2522-light06-focus-order-source` from `7458a9c458402f9dfaf64587dd5ef7ebe1b5d448`. VERSION 2.5.22. Full SHA `c002e0e3541e0db07df7dccc2b6211094661c966` (short `c002e0e`). Stamp to quote after a later authorized deploy: `v2.5.22 · c002e0e`. Record [CHG-20261024-light06-focus-order-source](https://github.com/Dinu-Sri/BookOne/blob/fix/v2522-light06-focus-order-source/docs/changes/CHG-20261024-light06-focus-order-source.md). Do not merge or deploy as part of this request.

- OBS-M21-01: BODY/HTML are not returnable focus targets.
- OBS-M21-U1: sales-return paid/partial help.
- Visible source-quotation link + `/sales/orders/[id]`.
- Explicit unsupported: order print, list/trial export, actor/audit history UI.
- Supported exports already present: cashbook CSV, `/company/backup`, recon JSON.

## Preserve

Converted Q/order 600, unposted D 100, open S 600, open P 200. No replay, delete, reverse, settle, grant, module, job, or funding-gate change. Cash-on-hand/bank/card remain 0; vendor payments stay blocked until real funds exist.

## Next Light (Medium)

After this guard is verified and the product diff is reviewed, bind a **NEW** queue/fingerprint/clock for receipts, part-paid credit, overpayment refusal/correction, and vendor payments. `executionReady` stays false until that binding. Do not retarget Light07 terminal cases. Do not merge or deploy as part of this request. Backup/restore LAST. BookOne remains unapproved.
