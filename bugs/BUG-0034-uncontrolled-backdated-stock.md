# BUG-0034: Ordinary command accepts a backdated stock receipt before later valued sale

P1 policy-adoption gap, open. Product **v2.5.5 · 8e1a2b8**. RB-INV-03 revision1 is an owner-delegated default with expert review pending; not a previously fixed regression or statutory certification.

RT-029: FIFO receipts10at60 (Oct1),10at80 (Oct2), then sale5 (Oct3), costing300. Submit a further10at100 receipt dated Oct1 through the ordinary purchase command, with no controlled correction/recalculation flow. It succeeds, raising stock15→25 and inventory1100→2100. Expected refusal with no business mutations under the default policy.

Original sale issue stays300. Public `historyUnchanged:0` compares the entire business snapshot before/after and indicates newly added records; it does **not** prove existing sale history was rewritten. This case asserts an uncontrolled backdate boundary, not the downstream future FIFO valuation result.

Repair: enforce valued-movement chronology for relevant product/location and supported posting/approval paths before mutations, including concurrency where needed. Any controlled recalculation exception needs its own authorised contract, linked corrections, period checks and independent acceptance. Do not deny a delayed bill merely because its date is old if it creates no new valued stock movement. Cover old GRN vs later bill, same-day ordering, imports/openings/returns/transfers, proper current-date positives, approval deferral and locked-period boundaries.

[PG evidence](../runs/RUN-2026-10-14T11-48-13-404Z-runtime.json), [campaign](../runs/CAMP-20261014-114805477-fc2c22.json). Actual isolated PostgreSQL product commands, synthetic session/owner connection; no browser exposure or controlled restatement acceptance. No staging writes.
