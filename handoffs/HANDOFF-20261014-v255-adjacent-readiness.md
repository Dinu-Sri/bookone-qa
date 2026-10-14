# Coding handoff: v2.5.5 adjacent customer-readiness findings

Product pin `8e1a2b8b29e662940bfcfecc4230875c83e35b6d`; live sidebar independently observed **v2.5.5 · 8e1a2b8**. Rulebook 1.0.0 / `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`.

Original unchanged 259-slot retest: 255 passed, zero failed, four optional machine-fixture skips. All original 85 PostgreSQL command cases and 16 archive helpers pass. Source B harness prerequisites were independently diagnosed and repaired; first failures and fingerprints remain immutable. Do not re-open BUG-0010–0016 or change their expected outcomes.

## New findings

| Finding | Reproduction | Expected repair |
|---|---|---|
| BUG-0031 / B-115, RT-026 | AR/AP valid 250 allocation followed by an invalid target returns failure with paidCount 1, retaining the payment and balance 350 on a 600 obligation | Adopt RB-PAY-01 all-or-nothing default; preserve access/lock/tender/retry controls. This is a new policy-adoption gap, not an old regression. |
| BUG-0032 / RT-025 | Reuse a completed key for a different invoice: returns success, but second invoice remains unpaid at 600 | Reject mismatched operation payloads; equivalent replay returns the original completed result. No duplicate cash posting observed. |
| BUG-0024 adjacent / RT-027 | Current v2.5.5 files pack with omitted dataSha256 accepts, writes one object and marks complete | Require the current pair's cross-checksum before any write/marker. Original wrong nonempty checksum S-0787 passes. Handle RF-06 legacy compatibility explicitly. |

The new AP competing-payment positive RT-024 passes: two requests of 350 against a 600 bill produce one 350 payment, balance/AP 250 and cash delta -350. Original 85 PG assertions also still pass. No expectation was altered to match the product.

## Evidence and reproduction

[Campaign](../runs/CAMP-20261014-111034220-9ed0bc.json): 256 passed, four failed, four skipped; no infrastructure blocks. [Standalone PG run](../runs/RUN-2026-10-14T11-10-44-786Z-runtime.json): 86/90 passed. CI full 38554654364, standalone 38554654527. QA implementation 747091f; tested merge26a4aa5, content451057439bf23d76325b2d9f6797e05e74b7a0a8024037e5b79f157f5e0dcb16. Exact full fingerprints are in records.

Read `tests/runtime/payment-boundaries.test.ts`, RT-027 in `tests/runtime/archive.test.ts`, and the bug records. Prepare the pinned product and a fresh isolated PostgreSQL16 per docs/POSTGRES_RUNTIME.md, then `pnpm runtime:run`. Do not target the staging database with fault/race/reset harnesses. Keep failures red and add successful multi-target/exact-replay/current-pair positives alongside repairs.

Next QA change generates portable synthetic bank workbooks, so all 98 retained unit assertions can execute. Locally 98 passed/zero skips; whole fresh campaign-v2 CI is pending. This removes a fixture gap, not a real-bank-format certification.

## Remaining acceptance gates

All137 workflows remain unaccepted as full workflows (58 partial bindings,79 unbound). Real normal-Owner/Viewer sessions, physical-first complete business journey, deployed encrypted A→empty-B restore, actual attachment bytes, configuration/scope matrix, history/upgrade/operator DR and Sri Lankan expert review remain required. No release certificate or readiness percentage is asserted.

Only a synthetic source company was created on staging; no new financial records or archives were written. Specific test-account role approval and Chrome popup dismissal are pending. Credentials/archive files/cookies/raw logs stay private. See memory/customer-readiness.json and SESSION.md for the next session.
