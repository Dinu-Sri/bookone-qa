# BUG-0001 — Simple Entry cash sale promises account 4000 but submits account 4300

Status: reproduced.
Category: product.
Severity: high. The primary Money In cash-sale path cannot create the transaction in the observed staging company.

## Evidence

- First observed run: [RUN-20261012-manual-entry-01](../runs/RUN-20261012-manual-entry-01.md).
- Product deployed SHA/image and schema: unresolved; QA baseline before the run: `de4928375292b502442a94a327389f3e00c1a6ad`.
- Environment: owner-authorized staging; environment and tenant identifiers withheld from this public record; date 2026-10-12.
- Synthetic inputs: Money In → New cash sale (revenue), synthetic party/description/amount and selected staging test brand/location.
- Reproduction:
  1. Open Simple Entry and select Money In.
  2. Keep `New cash sale (revenue)` selected.
  3. Enter any synthetic party, positive amount and sale description.
  4. Select an authorized staging test brand and location.
  5. Submit with `Record sale`.
- Expected: the transaction posts to the account stated by the UI: `Credits Sales Revenue 4000 (cash sale)`, with an equal debit to the selected bank/cash account.
- Actual: submission stays on the form and displays `Account code 4300 not found in chart of accounts.` No transaction or journal entry was observed for this attempt.
- Reproduction frequency: 1/1 on the unidentified 2026-10-12 staging build.
- Persisted side effects: none observed from the failed submission.

## Investigation

- Confirmed: display guidance names account 4000 while the submission path requests missing account 4300.
- Suspected cause: inconsistent Simple Entry Money In mapping between the UI explanation and the posting payload/server resolver. This is unverified until source and deployed build identity are matched.
- Workaround tested: `Owner contribution` posts successfully, but it has different accounting meaning and cannot replace sale revenue.

## Fix and regression

- Product fix commit/PR: pending.
- Required regression: assert the new-cash-sale payload and journal use the configured existing Sales Revenue account; assert a balanced bank/cash debit; retain an explicit failure case for an unavailable account code.
- Adjacent retest: owner contribution, customer payment clearing, Money Out category inference, credit invoice posting, chart-of-accounts configuration and tenant-specific account mappings.
- Closure requires reproduction to fail on an identified fixed build and adjacent regressions to pass.
