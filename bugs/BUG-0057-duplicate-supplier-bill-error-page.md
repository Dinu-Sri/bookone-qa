# BUG-0057 —Duplicate supplier bill conversion crashes the page

Status: reproduced/open. Priority:P2. Build v2.5.11 ·0bcdf4d. Synthetic disposable records only. Original posted-invoice BUG0037 disposition remains unchanged where applicable.

## Reproduction and outcome

With duplicate-bill blocking enabled, convert one receipt to a bill,then another receipt carrying the same supplier invoice reference. Application error replaces page. Expected: actionable validation. No second bill visible afterward.

[Full run and limits](../runs/RUN-20261016-broad-workflows.md),[check register](../runs/CHECKS-20261016-broad-workflows.json),[handoff](../handoffs/HANDOFF-20261016-broad-workflows.md).

Internal root cause unverified;observed behavioural failure only. No fix/retest yet. Add lasting independent regression,affected valid/invalid controls,and failure atomicity checks as appropriate. Retest exact case on new build/fresh synthetic fixture;preserve first failure and issued history. No full authorization,stock-layer or release acceptance from this result.
