# Independent review: PR #65 operator guard

Reviewed 24 October 2026. QA pin: f1913f4002e0c5c9439ffb2d4d6f9b6db6b83ab7.

Decision: changes are required before a new mission submits financial records. No business action, merge or deployment was performed in this review. Light07 attempt2 and all earlier results remain unchanged.

## Verified

The original guard suite ran independently: **12 passed, 0 failed** using `node --test tests/infrastructure/operator-action-guard.test.mjs` against the pinned files. Other author-reported suites were not independently rerun. The QA comparison contains no changes to frozen attempt2 results.

## Remaining control gaps

### 1. Stale persisted clock permits an expired budget

An isolated probe created an active 100-minute clock with 15 minutes reserved, opened 110 minutes before the authorization call and never advanced afterward. The clock retained `chargedMs: 0`. With an otherwise valid plan, fingerprint, running case and unresolved intent, authorization returned `allowBrowserAction: true`.

The guard calls `clockReport(clock)` without charging the unpaused gap between `lastAt` and the dispatch time. The existing boundary test advances the clock first, so it does not cover this case.

Required correction: validate and advance the clock to the current dispatch time, conservatively charging the unpaused gap. Add negative tests for crossing the execution threshold since the previous check, paused/closed clocks and malformed or backward timestamps, with a valid fresh positive control.

### 2. Authorization can be reused without rechecking persisted state

Calling `executeAuthorizedBrowserAction` twice with the same authorization invoked an inert local spy twice. That function checks a truthy flag and calls the callback; it does not re-read the persisted inputs at dispatch or prevent reuse.

This is a wrapper-level repeat-dispatch observation, not evidence of duplicate ERP posting. No browser or network action ran in either probe.

Required correction: bind dispatch to the specific persisted action and revalidate immediately before execution. Add negative tests for an intent becoming resolved, a fingerprint changing, a clock expiring after authorization, and a second invocation of the same authorization. Preserve uncertain dispatches without replay.

### 3. Actual browser integration is not demonstrated

This session must use the connected Browser app's `js` tool. The supplied CLI spawns a command after `--`; callback and CLI-marker tests do not show that actual Browser app writes pass through it.

Provide a tested dispatch path for the approved browser surface, with zero actual tool calls for rejected prerequisites. Do not substitute standalone Playwright or `pnpm agent:browse` for the Browser app in this session. A Boolean authorization followed by an independently issued click leaves the original orchestration boundary unenforced.

## Actual live product revision

Fresh read-only reload shows **v2.5.22 · 211771e**. GitHub identifies the full SHA as **211771e95d6f97cac5eb281a0f8e63f0fceef8a4**, the merge of product PR #7. Comparing c002e0e3541e0db07df7dccc2b6211094661c966 to that merge reports no changed files.

The supplied statement that the candidate is unmerged and not live is stale. Future execution must bind the actual full merge SHA and observed stamp; no silent substitution of the earlier review SHA. QA did not merge or deploy it.

The reviewed focus helper, ConfirmDialog changes, source-document mapping and order-detail route are source evidence only. Rendered focus/help/source-link regressions remain unexecuted, and no findings are closed.

## Next action

The QA orchestration owner should correct the above gaps and publish a new exact QA pin, negative-test evidence and integration evidence for the approved browser surface. Medium can then finish product consumer review and bind a NEW Light mission to the actual deployed revision.

Preserve the converted quotation/order600, unposted draft100, open invoice600 and open bill200. Do not settle, reverse, delete or replay them. No grants, module/job changes or funding workaround. Use fresh independent fixture families and actual openings. Vendor payments require verified funds; backup/restore remains last. No release or canonical-workflow acceptance is established.

## Publication

The user explicitly approved publication of this detailed review to Dinu-Sri/bookone-qa on 24 October 2026. The earlier automatic-review rejection is preserved in the conversation; this publication follows that specific approval.
