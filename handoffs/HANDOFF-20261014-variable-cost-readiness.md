# Coding handoff: physical-goods variable cost and backdate boundaries

Candidate **v2.5.5 · 8e1a2b8**, full product SHA8e1a2b8b29e662940bfcfecc4230875c83e35b6d. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. No source pin/assertion changes to old repairs.

Fresh six-case inventory lane: two passed, four failed. C-111 FIFO5-unit cost300/inventory1100/profit200 and RT-032 average cost350/inventory1050/profit150 pass after10at60 +10at80. All original90 PG cases retain their previous86pass/fourfail outcome.

## Repair these two groups

1. **BUG-0033 linked return current-cost drift**: later10at100 receipt, then return1 against original sale. FIFO returns84 vs expected60; average82 vs70; last100 vs80. Inventory becomes2184/2132/2100 vs2160/2120/2080, stock26. Original sale cost remains300/350/400. Read the bug record and RT-028/030/031; source commercial-docs enrichment/return posting uses current master cost. Resolve against original cost/slices and validate source quantity/line/tenant, preserving atomicity/history.
2. **BUG-0034 uncontrolled backdate**: ordinary late purchase receipt dated before a later valued sale succeeds. RB-INV-03 default requires refusal without mutations unless a controlled correction flow is used. This is a delegated policy-adoption gap, not an old regression or evidence of rewritten original sale cost. Ensure genuine delayed billing without a new stock movement is distinguished from backdated stock.

[Campaign](../runs/CAMP-20261014-114805477-fc2c22.json), CI38559060658: **262 passed, eight failed, zero skips/blocks/not-run**. [PG](../runs/RUN-2026-10-14T11-48-13-404Z-runtime.json), CI38559060570:88pass/eightfail across96. QA implementationa15b7b9, tested mergef6cf4fd4f545d546021228073f105ae85e96ae9c, contentf1af4c267c31504f45cc1c964394c0b4f846511d52f0c7b8155290e6638467a0. All methods separately discovered; no infrastructure failure. Exact fingerprints/observations in reports.

Previous [payment/archive handoff](HANDOFF-20261014-v255-adjacent-readiness.md) stays open: BUG-0031/0032 and current omitted-checksum BUG-0024 variant. Total five open finding groups in these two readiness waves; eight failing assertions. BUG-0010–0016 remain untouched. Positive original repairs are bounded passes, not full release acceptance.

Use fresh isolated PostgreSQL16 via docs/POSTGRES_RUNTIME.md; `pnpm runtime:run inventory-valuation` for the selected new lane, whole campaign for regression after a deliberately changed product pin. Do not point this reset/fault harness at staging. No source-cost expectation update to match the observed current master value. Keep operator/Sri Lankan specialist gates and role/browser/real restore layers explicit.

Full137 workflows:59 partial bindings,78 unbound,zero fully accepted. Normal-role fixture permission and Chrome popup dismissal still pending. No live staging financial/stock/archive mutations in this wave. Public reports contain only synthetic numeric outcomes; credentials/raw logs/archive bytes stay private.
