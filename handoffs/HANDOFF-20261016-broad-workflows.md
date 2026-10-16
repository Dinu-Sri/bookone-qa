# Coding-agent handoff —broad workflows,2026-10-16

Build **v2.5.11 ·0bcdf4d**,productSHA0bcdf4d992c6e7254448ab27ee2e7bfc1535ec8c. **62manualchecks:45pass/17fail →9groups,5P1/4P2. NOT customer-ready.** No new automated baseline execution or release approval.

| Finding | Priority | Observed failure |
|---|---|---|
| [BUG-0056](../bugs/BUG-0056-po-cumulative-receipt-limit.md) | P1 | Cumulative purchase receipts exceed ordered quantity |
| [BUG-0057](../bugs/BUG-0057-duplicate-supplier-bill-error-page.md) | P2 | Duplicate supplier bill conversion crashes the page |
| [BUG-0058](../bugs/BUG-0058-payment-print-query-integrity.md) | P1 | Payment print documents accept altered amount/date |
| [BUG-0059](../bugs/BUG-0059-duplicate-purchase-return.md) | P1 | Purchase bill permits two full posted returns |
| [BUG-0060](../bugs/BUG-0060-initial-line-discount-selection.md) | P1 | Initial percentage selector uses fixed line discount |
| [BUG-0061](../bugs/BUG-0061-payment-overbalance-feedback.md) | P2 | Excessive payment submission has no error feedback |
| [BUG-0062](../bugs/BUG-0062-linked-return-preview-discount.md) | P2 | Linked return preview omits original header discount |
| [BUG-0037](../runs/FOLLOWUP-20261016-BUG0037-quotation-draft.md) | P2 variant | Quotation draft accepts excessive percentage discount |
| [BUG-0063](../bugs/BUG-0063-aging-asof-scope.md) | P1 | AR/AP aging includes future-issued documents |

Read [run/results](../runs/RUN-20261016-broad-workflows.md),[exact check register](../runs/CHECKS-20261016-broad-workflows.json),then linked individual findings.

Priorities: purchase cumulative quantity/return guards and atomicity;initial percentage state/submitted calculation;payment print facts bound to persisted allocations;historical asof aging. Then graceful duplicate validation,payment errors,correct return preview and quotation discount bounds. Fix with independent expected examples and regression tests;retain valid flows and original denial controls. Do not close bugs from code changes alone. Review whether affected issued facts need supported correction;never silently rewrite history.

Retain bounded positives described in run. Distinguish BUG0037 draft variant from original posted-invoice fix,and BUG0062 preview defect from correct backend return amount. BUG0059 purchase duplicate-return gap is adjacent to earlier sales-return controls;do not broadly reopen unrelated bugs. Expected rules remain rulebook1.0.0(revision1 references),expert review pending.

Current tests used synthetic disposable records and retained intentional invalid effects. No payment replay,reset,grant expansion or release change. Stockquantity/layers,roles/tenant/files/rental/fullfulfilment/upgrade/recovery remain unaccepted. Actual encrypted backup/restore LAST.

Owner explicitly approved public sanitized findings/reproductions/synthetic test records and future QA publication. [Standing approval](../decisions/AUTH-20261016-sanitized-qa-publication.md). Credentials,raw traces and real customer data excluded. User manually relays this handoff;no direct message sent. Earlier publication attempts were blocked;this reduced payload excludes extensive historical memory/continuity records.
