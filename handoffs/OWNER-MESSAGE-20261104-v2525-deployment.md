# Optional message for the owner to relay to the coding agent

This is a draft for the owner to send if they choose to authorize the staging deployment. This file itself does not authorize any agent to merge or deploy. Customer launch is not approved.

```text
QA Medium completed the v2.5.25 candidate review:
https://github.com/Dinu-Sri/bookone-qa/pull/95

Product PR10: https://github.com/Dinu-Sri/BookOne/pull/10
Reviewed product: 5ea0d6e243a1bd37889240e15b10ea86ef3c94ba
Reviewed tree: 07ff418256d8bdd56fb1569203e6baa4f03aaa44
Expected version: v2.5.25

Fresh isolated PostgreSQL CI passed136/136, including rental17/17.
Corrected real-login Next HTTPS CI passed30/30. The first26/4 HTTPS result remains preserved; its two QA harness errors were fixed in QA, not by weakening product authorization or receipt data integrity.

I authorize you to merge/deploy the reviewed Product PR10 to the existing BookOne QA/staging host, following the normal release checks. Preserve all existing accounts, company module grants, transactions and failures. Do not reset/reseed production or historical QA data, change unrelated permissions, or create rental business transactions. If the product tree has changed, stop and return the new full SHA/diff for Medium review before deployment.

After deployment report actual full deployed SHA, VERSION, displayed build stamp and health result. A merge SHA may differ; provide enough evidence to compare its tree to the reviewed tree. Do not call BookOne customer-ready.

Then Medium will verify the live fingerprint, reuse existing A Owner/A Viewer/B Owner accounts and A Inventory+Rental grant, complete supported fleet/bay/settings setup, and publish the NEW dated complete Rapid04 Light mission. Existing PLAN/BINDINGS and the11-case template are not executable.

Review: reviews/REVIEW-20261104-v2525-medium.md
Next batch: handoffs/HANDOFF-20261104-v2525-next-batch.md
Checks: runs/CHECKS-20261104-v2525-medium-review.json
All in the QA PR95 branch. Backup/restore LAST. No customer launch.
```
