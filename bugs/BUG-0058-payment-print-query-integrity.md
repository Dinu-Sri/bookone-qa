# BUG-0058 —Payment print documents accept altered amount/date

Status: reproduced/open. Priority:P1. Build v2.5.11 ·0bcdf4d. Synthetic disposable records only. Original posted-invoice BUG0037 disposition remains unchanged where applicable.

## Reproduction and outcome

Using own synthetic payments of100 and75.50,edit the generated receipt/remittance address amount/date fields to999/a different date. Print documents display those unrecorded facts. Expected: persisted payment facts or rejection. No ledger mutation claimed.

[Full run and limits](../runs/RUN-20261016-broad-workflows.md),[check register](../runs/CHECKS-20261016-broad-workflows.json),[handoff](../handoffs/HANDOFF-20261016-broad-workflows.md).

Internal root cause unverified;observed behavioural failure only. No fix/retest yet. Add lasting independent regression,affected valid/invalid controls,and failure atomicity checks as appropriate. Retest exact case on new build/fresh synthetic fixture;preserve first failure and issued history. No full authorization,stock-layer or release acceptance from this result.
