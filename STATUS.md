# BookOne QA current status

**Latest: v2.5.15 · 158ddc2, 18 October 2026.** Cost-aware pilot: **10 passed, 1 failed, 1 blocked; all 12 scenarios have dispositions. Candidate remains unapproved.** [Run](runs/RUN-20261018-v2515-pilot.md), [exact evidence/corrections](runs/CHECKS-20261018-v2515-pilot.json), [handoff](handoffs/HANDOFF-20261018-v2515-pilot.md).

Discounted VAT full return 302.67, duplicate UI refusal and valid split rows, partial returns 85.50/171, rounding 1/1/0.99, historical VAT 118, client 150% retention, own-party UI locks and digital under blocked stock passed bounded checks. Server/foreign/race/audit/upgrade layers remain unaccepted. No blanket bug closure.

Stock-error retention still fails: the line persists, but delivery date, due date and notes reset. See [defect](bugs/OBS-P15-PARTIAL-RETENTION.md). The seven-unit 1.01 case is blocked for reviewed fixture design; the new cap prevents creating its required six-times-0.99 pre-state on a fresh source. Preserve the old quantity-consumed source. The earlier draft-edit discount finding remains open and was not retested here.

Final: 45 journals/debits = credits 7,261.39; AR 706.21; AP 540; inventory GL 300; VAT 46.71; profit 419.50; assets 1,006.21. Physical stock is 7×60 = 420. The inherited 120 stock-value/GL gap now has ledger evidence from bad SR-0010; new run deltas reconcile. VAT registration false, negative stock Allow and last cost were restored/confirmed by reload. All fixtures remain.

Execution QA base `ab0a997e7b5004693e761407172c9cd661ca2727`; product `158ddc2043b5d12f85124f77adf9bd7e36492838`. Execution library 1.4.0 is preserved; post-run clarification is 1.4.1/CORE book 6/J06 revision 4. The 271 canonical cases remain draft/unbound/not-run. Thirty-five harness checks and generated consistency checks pass; full repository check was not run in the partial checkout. Rulebook 1.0.0 remains expert-pending; source-study and automated product pin are unchanged.

Next: Medium reviews the retention failure, residual fixture and pilot evidence; coding agent fixes all-field retention, followed by exact retests and adjacent controls. Then continue PO/partial GRN/billing/GRNI/approval/stock layers. Checkpointed execution took 33.1 minutes with no extra user intervention; model/credit metrics were unavailable. Actual encrypted backup/restore remains LAST. No merge/deploy/reset/payment/writeoff/direct message.

Prior immutable evidence: [87-assertion v2.5.14 batch](runs/RUN-20261018-v2514-resume.md). Its 347 historical assertion inventory stays separate from this 12-scenario ledger. Overall ERP completion percentage is not established.
