# Independent v2.5.6 retest

Status: planned, no new pass or bug closure claimed. Date2026-10-15.

Product candidate d5377d89d2bd9d27c52a6e9c43376f2d03255bd0, VERSION2.5.6, direct parent8e1a2b8. Product CHG docs/changes/CHG-20261014-qa-batch-atomicity-sales-scope.md and actual17-file diff reviewed. Production Check38666526720 and Docker web image38666526682 both completed successfully. Product author unit/build results are supporting evidence, not independent QA acceptance.

Baseline QA main19e9850846f0d178e0b678650f05d541266d8552; old candidate full292-case campaign273pass/19fail with zero skips, PostgreSQL99/118. Immutable reports and all expected outcomes remain unchanged. This change pins the candidate only, plus intent/checkpoint metadata; no test rewrite or snapshot approval.

Impact: shared AR/AP batch transactions/locks and idempotency fingerprints; linked return quantities/value/source cost/header discount/tax; output VAT classification; discount validation and liquid cash-refund settlement; invoice detail/print read and dimension scope; scope metadata failure; current files pack checksum. No SQL migrations or dependency lock changes. Source graph is stale (Desktop checkout, getCommercialDocument snippet returns unrelated prior range); inspected actual pinned diff after graph discovery. Source helpers, synthetic authentication and in-memory storage retain explicit limits.

Rules: canonical1.0.0, SHA256abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc, QA rulebook Git base19e9850846f0d178e0b678650f05d541266d8552. BR-ACC-03/04, BR-STK-02, BR-DAT-01, BR-SAL-02/03, BR-SEC-01/02, RB-PAY-01/02, RB-ARCH-04, RB-INV-03, RB-CONFIG-01. No law/framework or adopted-policy changes; independent expert RF-01-10 remain pending.

Run pnpm check and campaign:plan, then all292 existing assertions on a new isolated PostgreSQL16 CI service:98 retained units,60 source contracts,118 PostgreSQL command/query cases,16 archive helpers. Keep original and adjacent amount, zero-mutation, Viewer, real foreign-tenant, reserved-driver and checksum assertions. Only a complete unchanged repro plus adjacent positives can support bounded resolution. New failures must be classified from evidence before attribution.

Live page context on2026-10-15 still displays v2.5.5 /8e1a2b8; no refresh/deployment acceptance claimed. Required new live stamp is v2.5.6 /d5377d8. Source/runtime tests may proceed independently. Browser acceptance and real encrypted A-to-new-empty-B restore remain not run; exact synthetic account/role approval and Chrome popup dismissal still pending. Do not bypass either, reset a company, inject faults into shared staging, or publish secrets/archives/raw evidence. No new staging mutations.

Next: publish candidate-pin QA PR to execute isolated CI, inspect and preserve immutable results, update handoffs/bugs/ledgers truthfully. Customer readiness and137-workflow full acceptance remain open.

Preparation checkpoint: first pnpm check correctly stopped because backup catalog/plan still named v2.5.5. Aligned only candidate SHA/stamp in both manifests; no assertions changed. This was QA metadata alignment, not a product failure. Initial output retained privately.

A second metadata check caught Windows stdin encoding of the middle-dot stamp separator; corrected using a Unicode escape. Preparation checkpoint and second raw check output retained privately. No product assertions executed or changed during these preparation checks.

Final preparation: pnpm check passed; campaign:plan confirms 292 assertions (98 units,60 source,118 PostgreSQL,16 archive helpers),137 workflows62partial/75unbound/zero accepted. Required QA safety/metadata/matrix/rulebook guards passed. Next step isolated CI execution, not yet a test result.

## First unchanged run and fixture-validity follow-up

First v2.5.6 campaign CAMP-20261015-015120720-373e0d (CI38667833810) executed292:290pass/2fail/zero skipped/blocked. Independent PostgreSQL RUN-2026-10-15T01-51-27-828Z-runtime (CI38667833917)116/118pass, no infrastructure failures. QA implementation54ea08b9b3d014dfdb557fac0a7beecdaee421c1, tested merge70cdcc1661dade2b094a882849a2e33afea59dbc, content725578279b4b7bc38b537b3a5040a1b8d071a571ff365770af0e0e271aa47b23. All19 previous failure cases pass, no full bug/customer acceptance. Immutable reports retained.

Failures: B-104 stopped at credit creation before any report observation. Its fixture changed original description and repriced1 unit from200 to100; the new source-line matcher no longer accepts that. Correct to copied source description and0.5 unit at original200, preserving every independently expected credit100/payment250/source600/AR250/journal/report assertion. This checks the original partial-credit accounting benchmark with a source-consistent fixture, not proof of edited-description/ad-hoc credit support. Preserve first failed fixture and result; no wrong report amount observed in that attempt.

RT-047 reaches the new invoice read permission guard after Sales is disabled: Owner loses historical detail. Capture only the known permission error as historyDenied, still require0, detail100, profit100, write/payment denials and unchanged snapshot. Add this numeric flag to the fixed public allowlist; do not swallow unexpected errors or weaken authorisation. A new unchanged-product run is required after these QA changes; do not resume the first fingerprint. Rule expectations unchanged.

Follow-up QA metadata/safety/matrix/rulebook checks passed; fixtures and expected financial values remain independently defined. Pending result goes to handoffs/HANDOFF-20261015-v256-retest.md and BUG-0043.

## Completed supported-fixture follow-up

[Campaign](../runs/CAMP-20261015-015814708-878549.json), CI38668445673:292checks291pass/1fail/zero skips/blocks. [PG](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json), CI38668445532:117/118pass, no infrastructure failures,43/43 migrations. All19 earlier failure cases pass. B-104 income500/cash250 equals original expectations. RT-047 historyDenied1, invoice/paymentAccepted0, profit100, unchanged1; BUG-0043 confirmed at bounded runtime. Implementation04f5b860c36a93b557ed4d146b2f3b362223f794, tested mergeaedfbfbd1ca848984e39460d42a7678513b25be8, contenta2d4412ae8392dab664eedf3def0ed4a3510bd0cf8137c4dba65ce1c632d0cca. Current handoff handoffs/HANDOFF-20261015-v256-retest.md. First results retained; no product/financial expectation/rule changes. No new staging mutations. Later browser-context read did not return and was cancelled; live deployment remains unconfirmed. Customer readiness remains open.
