# Resume BookOne QA — completed v2.5.15 pilot

Read STATUS.md, docs/COST_AWARE_QA.md, [handoff](handoffs/HANDOFF-20261018-v2515-pilot.md), and [results/corrections](runs/CHECKS-20261018-v2515-pilot.json). All 12 queue scenarios have dispositions: 10 passed, 1 failed, 1 blocked. No unresolved running intent. Do not replay terminal cases; retests require a new run.

Live `v2.5.15 · 158ddc2`, full product SHA `158ddc2043b5d12f85124f77adf9bd7e36492838`, verified start/end. QA execution base `ab0a997e7b5004693e761407172c9cd661ca2727`. Explicit fresh login used intended private QA N141710 fixture; own company/Owner loaded. Credentials stay private. Browser bookTab ended on Balance Sheet as of 31 October; the secondary stock tab read levels. Inspect fresh actor/build before actions.

Preserve older bad INV-0003/SR-0003–0009, INV-0004/SR-0010, INV-0005, invalid VAT-on INV-0006, and all older wrong-party/historical fixtures. Fresh sources:

- INV-0010 paid 2.99 via SR-0016/17/18 = 1/1/0.99.
- INV-0011 open 300: duplicate 2+2 UI refusal source; no accepted return.
- INV-0012 paid 300 via SR-0019, three rows of 1 at 100.
- INV-0013/TAX serial 3 paid 302.67 via SR-0020.
- INV-0014 paid 256.50 via SR-0021 = 85.50 and SR-0022 = 171.
- INV-0015/TAX serial 4 paid 118 via SR-0023.
- INV-0016 paid 1 via SR-0024; INV-0017 paid 1 via SR-0025.

Fresh document date prefix is 20261018. Quick-created Physical Q-P15-ZERO-STO-AWZW remains at zero; Digital Q-P15-DIGITAL--H5BZ remains. No cleanup requested.

Final 45 journals/debits = credits 7,261.39; AR 706.21; AP 540; inventory GL 300; VAT 46.71; profit 419.50; assets 1,006.21. Stock 7/value 420 at last cost 60; the inherited 120 gap traces to SR-0010 adding +2@60/+2@0. VAT registration false/rate 18/export zero/dept 01; negative stock Allow and last cost restored/confirmed by reload. No payment/reset/writeoff/balancing entry.

P15-08 server stock refusal retains the line but resets delivery 19→18 October, clears due 25 October, and clears notes. First toast wording was not captured. No invoice/journal/stock mutation; client 150% refusal retains all fields. Original typed P15-08 turnover 7,277.39 is preserved with appended correction to actual 7,257.39. Medium/coding agent should investigate the uncontrolled-field/action-reset hypothesis and broaden shared-form coverage.

P15-01 is blocked: a fresh six-times-0.99 pre-state conflicts with the new cap. The old source is quantity-consumed and must not be altered. Medium must design separate fresh/upgrade fixtures; closing 1.01 is not live verified.

Execution library 1.4.0; post-run 1.4.1 clarifies existing CORE C07 dates/notes. All 271 definitions remain draft/unbound/not-run. Thirty-five harness checks and generated consistency checks pass; full repository check was not run. Execution took 33.1 minutes with no extra user prompt; credits/model setting unavailable. Review before broader Light rollout. Next: fix/fixture triage and retests, then PO/partial GRN/GRNI/approval and other books. Backup/restore LAST. Owner relays sanitized links; no direct message, merge or deployment.

## Next continuation after PR43 review

Read reviews/REVIEW-20261018-pr43.md and handoffs/HANDOFF-20261018-pr43-review.md. Technical source investigation and fixture design are complete; product fixes and runtime acceptance are not. Existing browser state/balances above are the previous run's checkpoint, not freshly observed in this review.

Private exact source snapshot is under .local/review43/snapshot; the committed manifest records full product SHA and hashes. Source diagnostics execute extracted pure calculations/control flow and stay red:13checks/7pass/6fail. No React packages were available, so no local DOM lifecycle test was run; framework semantics plus actual wrapper and prior live observation identify the field-reset mechanism. No new staging actions.

New queues/RESIDUAL-REVIEW-v2515.json has eight planned slots, separate from frozen P15. Fresh7/10-unit ladders reveal non-closing preview cap mismatch; legacy1.01/1.04 helper line representation also fails. Upgrades require legitimate old-version-created unconsumed fixtures in an isolated real app/auth/DB environment, which is not prepared. Never alter the consumed staging source or fake prior credits. Library1.5.0/272cases/HYBrev5/J02rev5; all draft/unbound/not-run. First await coding fixes, update a source manifest deliberately, rerun diagnostics then browser/upgrade cases. Preserve all prior evidence and settings; backup/restore LAST.
