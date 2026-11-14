# BUG-0037 —Quotation draft accepts excessive percentage discount

Status: reproduced/open. Priority:P2 variant. Build v2.5.11 ·0bcdf4d. Synthetic disposable records only. Original posted-invoice BUG0037 disposition remains unchanged where applicable.

## Reproduction and outcome

Quote service2×100,explicitly choose percentage150%. Save accepts zero draft. Expected: reject excessive discount. This extends existing BUG0037 to drafts;original posted-invoice regression disposition is unchanged.

[Full run and limits](../runs/RUN-20261016-broad-workflows.md),[check register](../runs/CHECKS-20261016-broad-workflows.json),[handoff](../handoffs/HANDOFF-20261016-broad-workflows.md).

Internal root cause unverified;observed behavioural failure only. No fix/retest yet. Add lasting independent regression,affected valid/invalid controls,and failure atomicity checks as appropriate. Retest exact case on new build/fresh synthetic fixture;preserve first failure and issued history. No full authorization,stock-layer or release acceptance from this result.
