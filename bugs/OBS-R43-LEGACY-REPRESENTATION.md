# P1 source-confirmed — legacy residual lift lacks line representation

Pinned product: v2.5.15 / `158ddc2043b5d12f85124f77adf9bd7e36492838`. Extends existing OBS-N18-RESIDUAL / WB-HYB.J02.C10 representation concern. Not a newly reproduced persisted/live upgrade defect.

For a seven-unit source 6.95 with six fixed prior credits of 0.99, the last credit must be 1.01 and reconcile through valid economic fields. The executed pure helper returns total 1.01 and aggregate line-net 1.01, but line array sum 1.00 and header zero. The ten-unit legacy variant gives aggregate 1.04 with line sum 1.00. No adjustment is represented by the returned helper object.

The numeric residual total is correct. The line/header breakdown remains inconsistent under the unchanged C10 contract. The posting action consumes the overridden residual total as supply; persisted lines and UI/print/tax/journal reconciliation require a separate real-runtime upgrade test. Do not claim this source result proves a fresh live persisted mismatch.

Fix must represent the residual through a valid explicit adjustment/allocation and reconcile document/line/header/tax values, or prevent problematic allocations for new sources while preserving authentic issued legacy facts. The latter alone cannot repair historical remaining-value scenarios. Do not alter old staging records, invent hidden surcharges, change source prices, or reduce the expected legacy residual to 1.00.

[Source results](../runs/CHECKS-20261018-pr43-source-review.json), [technical review](../reviews/REVIEW-20261018-pr43.md), [authentic upgrade plan](../docs/workflows/RESIDUAL_FIXTURE_PLAN.md). The original consumed bad staging source stays untouched; upgrade infrastructure is currently unavailable. Candidate remains unapproved.
