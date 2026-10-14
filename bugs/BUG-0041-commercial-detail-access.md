# BUG-0041: Commercial detail read ignores assigned branch/brand

P1 open, candidate **v2.5.5 · 8e1a2b8**, RT-045; BR-SEC-02. Reproduced using actual non-owner/NOBYPASSRLS PostgreSQL, real stored Sales job/scopes and known existing same-company invoices. Authentication is synthetic; credential/HTTP/browser transport exposure remains unverified.

Owner creates two100 invoices in different real branches/brands. Sales is assigned only the first branch/brand. Filtered list contains exactly the permitted invoice and permitted detail reads100. Direct `getCommercialDocument` for the restricted existing invoice returns its detail instead of refusal. No business mutations. This is a same-company job-scope disclosure, not proof of cross-tenant leakage; real foreign-company detail denial RT-050 passes.

Pinned source getCommercialDocument filters tenant/id/void but does not enforce loaded dimension scope or screen read permission. Scope checks on list and writes do not protect an independent detail helper. Enforce authoritative active membership/read job/ceiling and record scope before returning header, party or lines. Preserve allowed own-record/role and permitted historical reads; unsupported/error paths fail closed.

RT-051 additionally tests a valid Warehouse job with inventory read but no invoice-read grant, against a known invoice with Owner positive control. Pending execution; do not claim that role variant confirmed yet. Add same protections to analogous sales/purchase/print/export/detail paths and verify actual route/action exposure with fresh credentials.

[PG](../runs/RUN-2026-10-14T12-55-07-908Z-runtime.json), [campaign](../runs/CAMP-20261014-125458746-6d35a7.json). No staging accounts/records/files changed; raw details private, public flags only.
