# v2.5.9 first independent retest

Product `2e105cd443ce01e31220bfe2d4b4637cdc737b75`, source VERSION 2.5.9. Compiled isolated server stamp v2.5.9 · 2e105cd; live staging stamp not observed. QA implementation `4202c5cbddba1204c4412c500201886ef6710d53`, tested merge `a52565efff9d8167dbcb30ed62fba7127b8a269e`, content hash `a88465108f3721a863c2622144dff71f5327872c9c1f5bd595c79d116d65b09d`. Node22.23.3, PostgreSQL16.15, all44 migrations applied. No product edits or staging mutations.

First attempts, immutable:

- [Campaign](CAMP-20261015-144043900-fe59f7.json), CI38753428354/job116485500044: 302pass/1fail, no skip/block/flaky/not-run. RT-062 stops before business assertions; this result does not prove the product bootstrap still fails.
- [Companion PostgreSQL](RUN-2026-10-15T14-40-40-254Z-runtime.json), CI38753428303/job116485499226:128pass/1fail RT-062; no infrastructure failure classification. RT-060/061 and all other127 original cases pass.
- [Real Next HTTPS](HTTP-2026-10-15T14-40-52-370Z-d680dd.json), CI38753428310/job116485498718:15pass/1fail/10blocked, setup complete. Owner baseline13/13 pass, restricted2pass/1fail/10blocked. Next15.5.19/BetterAuth1.6.20, build HJilgXVlGucyqNmWECOFZ, fixture http-v4-canonical-loopback.

## Findings and limits

BUG-0049 original cross-month repro passes: September assets/equity600/income600, October800/800/200, quietNovember800/800/0; original same-period600/600 remains passing and persisted journals unchanged. Broader dated/scope/closed-year reporting still needs acceptance.

BUG-0051's five settings writes are denied to an assigned Viewer on owner DB, all distinct Owner positives persist, posted facts unchanged. BUG-0052's null-job Viewer is not promoted, unauthorized10 is absent, legitimate Owner repair succeeds, final paid200/due400/fourjournals/threeallocations as independently expected. These are original-repro fixes within this boundary, not full role/security certification.

BUG-0053 remains open: restricted six real credential identities authenticate, but all three own invoice requests return307 rather than200; HTTP102 fails, ten dependent cases are blocked. HTTP109 now observes legitimate Owner repair but cannot execute its financial positive, so it is blocked rather than passed. Restricted final paid150/due450/twojournals/oneallocation; no unauthorized financial effects. Staging database role remains unknown.

BUG-0050 is inconclusive this attempt. New createCompany imports seedJobsForTenant from @bookone/auth, but the declared synthetic runtime identity adapter did not export it. RT062 stops at createCompany line221, without bootstrap observations. QA forwards the actual product job-seeding functions (no mock replacement) in implementation81c34b0e4507ffba6b67b1e07a04a160b652914e and starts a new fingerprint with unchanged assertions. Preserve this first run.

Source-only diagnosis for remaining restricted page failure: requireTenantContext now scopes membership/tenant checks within its callback, then returns. getTenantInfo subsequently queries tenants using db() outside withTenantContext. Migration001 tenants policy needs app.current_tenant_id. Invoice page catches errors from getTenantInfo/getCommercialDocument/listRentalJobs and redirects to login. This is a probable remaining route dependency; no request SQL trace proves which branch caused307. Do not inject a global tenant, wrap the harness around the page, or grant BYPASSRLS.

Browser stamp check failed at the tooling request-header-policy/network boundary; no page content or live v2.5.9 was obtained, no browser action changed records. getTabContext hung and was terminated. This is not evidence that BookOne is down.

## Corrected-adapter result (new fingerprint)

QA implementation81c34b0e4507ffba6b67b1e07a04a160b652914e, tested merge7d5ff9257718944383e0f17485168220c62aed86, contenta581735bad83b8417d584783d747b9bb2b47de02e44ff523b41eb2e09441e0d6. Product/rules/expectations unchanged.

- [Campaign](CAMP-20261015-144528741-07d4ec.json), CI38754155102/job116488014851: **303pass/0fail/0block/0skip/0flaky/0not-run**. executedGate passed. Workflow intentionally nonzero because acceptedFullWorkflows remains0/137 and required work/policies remain; do not describe this as a failing test assertion or a certified full campaign.
- [Independent PostgreSQL](RUN-2026-10-15T14-45-32-116Z-runtime.json), CI38754154954/job116488014494: **129pass**, all44 migrations applied. RT062 now verifies Starter Owner, Sales/Purchase write1, Inventory/POS write0 and display0, actual first PO saved, one document/party and zero transaction/journal. Original custom flags and Viewer creation-denial controls pass. BUG0050 original isolated repro is fixed; existing deployed-company repair/browser acceptance remains separate.
- [HTTP](HTTP-2026-10-15T14-45-42-865Z-125b6e.json), CI38754155274/job116488016199: **15pass/1fail/10blocked**, setup complete. Owner13/13 unchanged positive; restricted HTTP102 still fails, ten dependent cases blocked. BuildL0Pe1CJM3wQkL3QKAQK92; exact fingerprint in JSON. This is terminal, no process remains to wait on.

Local pnpm check passed after adapter/metadata alignment. BUG0053 remains open; full137workflow acceptance, live candidate verification and customer readiness remain unproven. Backup remains last.
