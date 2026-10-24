# Independent review: PR #69 connected Browser transport

Reviewed 24 October 2026. Author pin: `a9ccd4fbc360ed67fd3083f79bbd8c094eabef45`. Parent GUARD pin unchanged from `a6fdda6ab48aed1f2fdb3abdde1be04558f20bf3` (`operator-action-guard.mjs`, `operator-clock.mjs`, `operator-queue.mjs` have empty diffs).

Decision: **approved after a separate portable crash/finish correction**. No BookOne deploy and no financial testing in this review. Light07 attempt2 and all earlier results remain unchanged.

## Verified

- Bundle provenance: host extracts unchanged queue/clock/guard source by fail-closed layout markers, injects digest lookup for the prepared plan/fingerprint only, a single dispatch ID, and JSON cloning.
- Durable single-use: exclusive `wx` claim keyed by plan/fingerprint/case/submission; second process and second preparation ID refused. Independent probe: crash after claim leaves `claimed-outcome-unknown` and refuses prepare/claim replay.
- Clock: prepare does not persist charge; claim persists `advanceClock(..., 'check', now)` before the tool; coordinator rechecks after claim latency; finish refuses clock regression.
- Browser `isError`: codehost throws; transport marks consumed uncertain; prepare refuses replay.
- Independent Node rerun at the author pin: **43 passed, 1 failed**. Failure: `concrete code host treats Browser tool isError` threw `Host command did not complete successfully` because the test spawned `cat` through Windows `cmd.exe`.
- Linux CI `validate-and-unit` on the author pin: success.
- Independent probe (fresh synthetic fixtures, injected js): positive once with claim-before-js; rejected exit/intent/fingerprint/clock each made **zero** js calls; crash-after-claim consumed unknown.

## Unavailable

This review session has no connected Browser app `js` tool (`mcp__codex_apps__browser_js` / `tools.exec_command` are absent). Author-reported actual title `BookOne` and four live zero-call controls were **not** independently reproduced against the live Browser app. Light08 L08-GUARD still requires that actual-tool proof before any financial write.

Full `pnpm check` was not completed here: this worktree has no `node_modules`/`tsx`.

## Corrections in the follow-up change

- Codehost request directory accepts `/` and `\`.
- Transport catches finish failures after a tool call and returns consumed uncertain without replay, instead of throwing out of `finally`.
- Tests simulate host `exec_command` without a POSIX shell; add crash-without-finish and finish-failure cases.

After those fixes: **46 passed, 0 failed** for `operator-action-guard` + transport; operator-queue 9; review54-controls 9; Light08 EXEC 3.

## Product

Live remains **v2.5.22 · 211771e**, full `211771e95d6f97cac5eb281a0f8e63f0fceef8a4`. This review did not merge or deploy product.
