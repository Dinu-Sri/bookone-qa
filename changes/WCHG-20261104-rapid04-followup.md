# WCHG-20261104-rapid04-followup — D-112 preservation, after-return sequence, HTTP rental codec, pin v2.5.25

Status: reviewable companion to product `5ea0d6e243a1bd37889240e15b10ea86ef3c94ba` (v2.5.25). Not Light-executable.

- D-112 test body unchanged. First CI failure 41000512103 retained in OBS-D112.
- Added D-113/114/116/119/120; rental-lifecycle expected 17.
- HTTP-014/015 (114/115) rental GET/write codec; seed hire order on existing HTTP fixture. Cases 001–013 snapshot tables unchanged.
- BINDINGS-RAPID04 maps 40 PLAN points. executionReady false.
- product-ref + archive catalog/plan aligned to `5ea0d6e` / `v2.5.25 · 5ea0d6e`. Historical archive cases remain not-verified.
- HTTP 41000512110 allowlisted: 24 pass / 2 fail (HTTP-007/107 receipt body). GitHub log 502 was retrieval.

Do not recreate A/B accounts. Do not merge or deploy. Backup last.
