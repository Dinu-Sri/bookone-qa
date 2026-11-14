# Coding-agent handoff — PR43 review and residual plan

**Product v2.5.15/158ddc2 remains unapproved.** This review preserves PR43's 10 passed/1 failed/1 blocked browser results. No new staging mutations occurred. [Technical review](../reviews/REVIEW-20261018-pr43.md), [source results](../runs/CHECKS-20261018-pr43-source-review.json), [fixture plan](../docs/workflows/RESIDUAL_FIXTURE_PLAN.md), [follow-up queue](../queues/RESIDUAL-REVIEW-v2515.json).

## Fix requests

1. **P2 server-error field loss:** ordinary business rejection returns an error object, but the client wrapper toasts and resolves normally. React's action completion resets uncontrolled fields. Dates/notes/payment mode use defaults while lines use state. The live loss of delivery/due/notes is consistent with this source/contract mechanism. Retain all submitted values on rejection, preserve submitter intent/idempotency/pending/redirect behavior, and test supported correction in the same retained form. A toast or line-only test is insufficient. The extracted wrapper was executed with a substituted server error; actual React DOM lifecycle and deployed retest remain required.
2. **P2 source-confirmed fresh preview mismatch:** five 0.99 credits exhaust a five-cent header budget on the fresh seven-unit fixture. Sales and purchase previews still show sixth credit 0.99; posting calculates 1.00. Ten-unit fixture diverges at steps six–nine. Apply the same remaining-header semantics in preview and posting. Final conservation passing does not close intermediate consistency.
3. **P1 existing residual representation concern, source-confirmed:** legacy 6×0.99 against 6.95 yields helper total/aggregate line-net 1.01 but line array sum 1.00/header zero. Ten-unit variant gives 1.04 versus line sum 1.00. Preserve exact legacy value and represent its valid adjustment; do not reduce expected credit or alter issued facts. Actual persisted upgrade behavior is still untested.

Current pinned source diagnostics: **13 checks, 7 passed, 6 failed; exit 1**. Four failures are sales/purchase preview equality for fresh seven/ten-unit fixtures, two are legacy line representation. Three-unit 2.99 control, fresh conservation and numeric legacy totals pass. These are source calculations with synthetic context; no browser/server/DB/auth/upgrade acceptance is implied.

Run with an exact source snapshot and committed hash manifest, Node >=22.13:

```sh
node scripts/review43-source.mjs <private-source-snapshot-root> reviews/REVIEW-20261018-pr43-source.json
```

A new candidate needs a new reviewed manifest and run; never relabel old failures. Product source, credentials and raw evidence stay private. No dependencies were added.

## Fixture plan resolved

The frozen P15-01 and its blocked result remain untouched. The new plan separates fresh ladders from authentic legacy upgrade fixtures. Under the declared capped allocation, fresh seven-unit credit cents are 99,99,99,99,99,100,100; fresh ten-unit profile is five 99s then five 100s. This is an explicit test allocation, not a new universal business policy. Legacy final credits remain 1.01 and 1.04.

Legacy fixtures must be created through supported workflows on pinned v2.5.14/a36af04 in a newly isolated real application/auth/database environment, stopped before the final unit, then upgraded in place to the candidate. Compare all historical IDs/facts and the final line/header/adjustment/tax/journal/source state. That environment is not prepared, so upgrade execution remains blocked. No SQL fabrication, shared staging downgrade/reset, mutation of consumed failure sources or backup restore.

After product fixes, first rerun source diagnostics, then complete field-retention and fresh ladder browser cases on new fixtures. Run legacy upgrades when genuine infrastructure exists. Broaden shared forms, tax, valid split rows, partial/2.99/full controls, source price/party and unchanged business snapshots. Do not blanket-close return findings.

## Preserved state

PR43 ended with 45 journals/debits=credits7,261.39; AR706.21/AP540/inventoryGL300/VAT46.71/profit419.50; stock7/value420 with inherited120gap. VAT registration false, negative stock Allow and last cost were restored. All sources/returns/SKUs remain. This review did not re-read or change live state; treat those as the prior checkpoint.

Library1.5.0 adds C11, yielding272 draft/unbound/not-run cases; HYB book/J02 revision5. C10's original representation expectations and CORE C07 are preserved. Thirty-nine infrastructure tests and generated checks pass; full repository check was not run in the partial checkout. Human/business/expert review remains pending. No deployment, merge, direct message or historical repair. Actual encrypted backup/restore LAST.

Owner manually relays this handoff to the coding agent. Next business campaign after triage remains PO → partial GRN → billing/GRNI → approval and stock layers.
