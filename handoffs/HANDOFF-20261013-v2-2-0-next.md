# v2.2.0 QA retest and next coding work

Read [RUN-08](../runs/RUN-20261013-v2-2-0-retest-08.md). Candidate6a48cee: expanded Batch A14 pass/1 fail; retained units94 pass/4 optional fixture skips. Live cash sale/reversal nets0 and keeps exact offsetting journals; default report label corrected. Real product permission assertion denies synthetic Viewer; live Viewer Reverse control removed. Runtime security/full business acceptance remains incomplete. Planned B–F are QA development work, not additional product defects.

## Remaining confirmed release-control defect (BUG-0008)

Production Check271 at this SHA: Tests success; Lint/typecheck/build job fails at Lint with TS errors, later Type check/Build skipped. Docker web image12 still builds/publishes and runs deployment hook. Thus removing `|| echo` made quality errors visible but did not make those errors block publishing. Manual workflow_dispatch bypasses the wait job too.

1. Fix underlying quality command/type errors. Inspect exact CI job115120435752; do not blindly disable errors or narrow checks to make green. Examples: docs PageData.full, cashbook invoice_bill/PayMethod types, product category optional IDs, TenantLite.landingHref, discount type mismatch, statement preview union narrowing, product unit literal types, auth react dependency/types. Some existed before this fix; age does not establish acceptance.
2. Require all approved mandatory lint/typecheck/build/test plus pinned external QA results for the **same candidate SHA** before image promotion. Either one dependency graph or a reviewed exact workflow/job/attempt check can work. Manual release paths must preserve those gates; do not use workflow_dispatch as an automatic bypass.
3. Record how failed, cancelled, skipped, missing or timed-out checks block publication. Validate with controlled failures in isolated/nonpublishing workflow tests. Do not trigger staging resets or deploy failing candidates merely to demonstrate propagation.
4. Keep secrets outside public repositories/PR code and preserve immutable artifact identity. External QA's own validation green is not a product acceptance result.

## QA adapter correction already done

A-013 accepts split jobs while retaining unmasked unconditional mandatory commands and negative controls. A-014 currently recognizes same-workflow ancestors only; a correct cross-workflow gate needs a reviewed semantic adapter rather than an arbitrary layout requirement. At6a48cee the observed quality failure + actual publication independently confirms the remaining defect, regardless of that adapter limitation. Do not weaken the release policy to a Tests-only definition.

## Next QA development

Extend A with real runtime-role/RLS/dimension denials, real-server existing-record Viewer reversal denial, duplicate/concurrent reverse safeguards, audit assertions and cross-period cash movements. Build B isolated service/digital invoice states, allocations/credits and AR reconciliation with bounded generated sequences; use a small representative live smoke set. Keep financial policy questions explicit and all unsupported/missing cases not-run. No shared staging reset is needed for offline batch development.
