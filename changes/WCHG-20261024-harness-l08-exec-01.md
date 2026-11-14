# WCHG-20261024-harness-l08-exec-01

Harness correction for QA-HARNESS-L08-EXEC-01 from Light08 EXEC run1. First failure preserved on `qa/v2522-light08-exec-results`. No product code, migrations, grants, settings or financial writes. Guard/clock/queue source unchanged. Frozen Light07 and parent Light08 files are not edited.

## Problem and resulting behavior

Concrete `runPersistedBrowserRequest` printed the entire 37-case EXEC plan plus state/bundle on prepare stdout (96775 UTF8 bytes). The 16000-token `exec_command` cap inserted a truncation warning; `JSON.parse` failed before any Browser call or exclusive claim. Claim stdout also returned full inputs and had the same bound.

After this change, prepare and claim CLI stdout are bounded envelopes. The durable preparation file is transferred with `slice`/`confirm` and hash/id/runtime binding. Truncated prepare or slice: zero js, zero claims, explicit diagnostic. Truncated claim after `wx`: consumed unknown, zero js, no replay. A larger output cap is not treated as sufficient for a full dump; oversized envelopes are refused.

## Validation

`node --test tests/infrastructure/operator-action-guard.test.mjs tests/infrastructure/operator-browser-transport.test.mjs` — 50 passed, including the exact EXEC plan under a 16000-byte host cap and three truncating-host regressions. `pnpm test:operator-queue` 9 passed. Actual connected Browser app js was unavailable in this session.

## Next

Independent review of this correction, then a NEW execution-ready queue/handoff at exact QA/product pins. Start a new 120/20 clock and ledger; reverify actor/settings/openings and actual GUARD before any business write. Preserve Q/order 600, D 100, S 600, P 200. No merge/deploy of BookOne. Backup/restore LAST.
