# Portable retained bank-fixture checks

Product remains8e1a2b8/v2.5.5; no product assertion, catalog ID, financial expectation or rulebook hash changed. Generate deterministic fabricated XLSX/BIFF8 inputs for the four retained machine-dependent bank/studio cases. No real statement data is used or published.

Local retained unit run:98 passed, zero failed/skipped. Generator repeated with identical combined byte SHA256 `1a6e0581380277584a2318d851ee3eb7f2cf4b0c330230725cb5fd00ff5149fc`. Sampath-style24 rows and HNB-style64 rows; filenames/workbook bytes ignored. This proves parser/transform assertions against synthetic inputs, not bank-format interoperability certification.

`test:unit` and whole campaign now prepare fixtures explicitly. Campaign fixtureVersion advances to campaign-v2; public fingerprint includes actual bankFixtureHash, checkpoint guard detects changed bytes, and resume rejects a different hash. Four campaign-state guards and full pnpm check pass locally. Preserve old campaigns and optional skips as originally observed. Fresh full CI remains required; the four new product failures stay red.

Read docs/SYNTHETIC_BANK_FIXTURES.md. Future changes to source format or fixture bytes require a new fingerprint/run; never silently substitute a customer file to obtain a pass.
