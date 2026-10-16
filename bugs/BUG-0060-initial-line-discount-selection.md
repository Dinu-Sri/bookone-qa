# BUG-0060 —Initial percentage selector uses fixed line discount

Status: reproduced/open. Priority:P1. Build v2.5.11 ·0bcdf4d. Synthetic disposable records only. Original posted-invoice BUG0037 disposition remains unchanged where applicable.

## Reproduction and outcome

Quote3×100,line10%,header5%: expected270−13.50=256.50;actual290−14.50=275.50,carried to posted invoice. New service2×100/10% gives190 until selector switched away/back,then180. Expected: consistent initial percentage state.

[Full run and limits](../runs/RUN-20261016-broad-workflows.md),[check register](../runs/CHECKS-20261016-broad-workflows.json),[handoff](../handoffs/HANDOFF-20261016-broad-workflows.md).

Internal root cause unverified;observed behavioural failure only. No fix/retest yet. Add lasting independent regression,affected valid/invalid controls,and failure atomicity checks as appropriate. Retest exact case on new build/fresh synthetic fixture;preserve first failure and issued history. No full authorization,stock-layer or release acceptance from this result.
