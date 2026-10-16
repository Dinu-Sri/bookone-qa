# BUG-0056 —Cumulative purchase receipts exceed ordered quantity

Status: reproduced/open. Priority:P1. Build v2.5.11 ·0bcdf4d. Synthetic disposable records only. Original posted-invoice BUG0037 disposition remains unchanged where applicable.

## Reproduction and outcome

Order10 units;receive4;bill that receipt;receive7 more. Second receipt accepted,11 total. Expected: remaining6 and rejection of7. Order also displayed billed0/remaining10 after the indirect bill.

[Full run and limits](../runs/RUN-20261016-broad-workflows.md),[check register](../runs/CHECKS-20261016-broad-workflows.json),[handoff](../handoffs/HANDOFF-20261016-broad-workflows.md).

Internal root cause unverified;observed behavioural failure only. No fix/retest yet. Add lasting independent regression,affected valid/invalid controls,and failure atomicity checks as appropriate. Retest exact case on new build/fresh synthetic fixture;preserve first failure and issued history. No full authorization,stock-layer or release acceptance from this result.
