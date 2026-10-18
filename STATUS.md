# BookOne QA current status

**Latest: v2.5.14 · a36af04, 18 October 2026.** [Run](runs/RUN-20261018-v2514-resume.md), [87 expected/actual assertions](runs/CHECKS-20261018-v2514-resume.json), [coding-agent handoff](handoffs/HANDOFF-20261018-v2514-resume.md). Results: **70 passed, 11 failed, 6 inconclusive; three P1 groups and one P2 group. Candidate remains unapproved.** This is a substantial bounded browser batch, not full ERP or release acceptance.

Three prior source concerns now reproduce live: final residual 1.01 previews but posts 1.00; duplicate return rows accept four units against three and post money; discounted taxable full return is refused. A stock-rule refusal also discards entered invoice fields. The original draft-edit discount bug remains separately open. Due-date derivation for Net 30 is an owner review item; a duplicate-bill submission had ambiguous feedback and is not a guard pass.

Browser recovered from a failed static chunk by reload. Fresh QA N141710 login, own company and loaded Owner verified; same observed build at start/end. Product a36af042753f3ad8b40246d6cd579deac9233ba7; QA base 3691a4bbd7b6fa63dd8b8fb0bc582c1628475249. No earlier financial action replayed.

Final readback: **27 journals / debits and credits 4,097.07; AR 406.21; AP 540; inventory GL 480; output VAT 46.71; profit 299.50; assets = liabilities plus equity 886.21.** Preserve all failure fixtures and the invalid first VAT-on rounding fixture. VAT registration restored false, negative policy restored allow; both reloaded. No settings left changed, resets, grants, receipts, writeoffs, merges or deployments.

Library **1.4.0: eight books, 52 journeys, 271 draft/unbound/not-run definitions, 23 examples and 56 steps**. New CORE.J06.C07 covers stock-refusal input retention. Render/check and 26 infrastructure tests passed. Rulebook 1.0.0 remains expert-pending; historical graph ead3a82 and automated product pin 0bcdf4d are unchanged. Live assertions are separate from full canonical-case execution. Stock master quantities/layers, runtime audit, role/tenant/security/fault/upgrade layers and remaining business workflows are still incomplete.

Next: coding agent fixes four groups with exact SHA/CHG and regressions; QA retests fresh candidate and adjacent paths, then continues PO/partial GRN/bill/GRNI/approval/stock layers and the other business/shared books. Actual encrypted backup/restore LAST. Owner manually relays the sanitized repository handoff. Read SESSION.md before resuming; do not replay financial actions or repair failure fixtures.

Previous immutable evidence: [17 October live batch](runs/RUN-20261017-v2514-browser-wave.md), [v2.5.14 source checks](runs/RUN-20261017-v2514-retest.md), [v2.5.13 browser batch](runs/RUN-20261017-v2513-next-wave.md). Earlier results retain their original fingerprints and limitations.

## Execution protocol update — 18 October

Cost-aware pilot is prepared in docs/COST_AWARE_QA.md and queues/PILOT-v2515.json:12 browser scenarios, checkpoint CLI and harness checks. No new ERP execution or closure claimed. v2.5.15/158ddc2 is coding-agent-reported, not live verified. Coverage inventory347assertions:11related-partial mappings/336unmapped; zero full-case acceptance inferred. Next: verify candidate/diff/actor and bind pilot fixtures, then execute/checkpoint.
