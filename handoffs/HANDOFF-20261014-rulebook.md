# Coding-agent handoff: business rulebook1.0.0

Owner requested a human-readable single maintained intended-behaviour reference, with professional defaults suited to Sri Lanka and future expert review. Start at [the QA rulebook](../docs/rulebook/README.md) and [57 readable rules](../docs/rulebook/RULES.md). Structured source: rules/rulebook.json.35references,27inherited BR IDs preserved. Sources pin product5becb2d; relevant9b8e443/v2.5.4 archive diff separately inspected. Tested product pin remains5becb2d.

## Required development use

For each task identify applicable stable rule IDs/revisions and the rulebook GitSHA/version/JSONhash. Link them in the product CHG and QA companion change. Compare desired and observed behaviour; related case IDs are not full rule coverage. Use the review queue RF-01–10 for uncertainty, not changed code output. No change to previous failing repros, product pin, settings or historical run evidence was made by this study.

Initial adopted defaults are delegated product decisions, not independent legal/accounting certification. Implement new-company profiles and behaviour changes with explicit compatibility/migration review; preserve existing companies' settings and posted facts. A later agent changing policy must use templates/RULE_CHANGE.md with authority, examples and responsible-owner review. Do not duplicate a second editable rulebook in product.

## Investigations to prioritise

1. VAT classification versus invoice styling, Gazette format and serial, purchaser/issue/supply particulars. Official operative format date2026-10-01. Do not guess an exact separator from conflicting extracted example; use original Gazette and expert interpretation.
2. Statutory inventory profile versus operational last/allow defaults. Moving average/block proposed for new companies; SLFRS-SME13.16 allows recent purchase-price approximation only when justified. Variable costs, return costs, backdating, opening stock GL and landed costs need independent fixtures.
3. Earned service/hire income versus advance/deposit/invoice stage; eligible accounting framework and lease/service distinction.
4. Manual/opening AR/AP bridge and legitimate legacy returns/stock in strict archive validation. Newv2.5.4 integrity/pairing changes require fresh retest, not automatic closure. Legacy exportId-only pairing remains a contract review gap, and current cross-data-checksum assertions stay intact.
5. Atomic batch payments, revocation/scopes/module transitions, private record-linked files and safe format bounds. Known BUG0022–0030/0021 remain under their original build-specific evidence until retest.

No staging records/archives or passwords were accessed, exported or reset. Rulebook integrity checks are separate from product acceptance. Continue all-businesses QA programme and defect repair; this handoff does not approve release or tax filing.
