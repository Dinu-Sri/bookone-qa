# BUG-0041: Commercial detail read ignores assigned branch/brand

P1 open, candidate **v2.5.5 · 8e1a2b8**, RT-045; BR-SEC-02. Reproduced using actual non-owner/NOBYPASSRLS PostgreSQL, real stored Sales job/scopes and known existing same-company invoices. Authentication is synthetic; credential/HTTP/browser transport exposure remains unverified.

Owner creates two100 invoices in different real branches/brands. Sales is assigned only the first branch/brand. Filtered list contains exactly the permitted invoice and permitted detail reads100. Direct `getCommercialDocument` for the restricted existing invoice returns its detail instead of refusal. No business mutations. This is a same-company job-scope disclosure, not proof of cross-tenant leakage; real foreign-company detail denial RT-050 passes.

Pinned source getCommercialDocument filters tenant/id/void but does not enforce loaded dimension scope or screen read permission. Scope checks on list and writes do not protect an independent detail helper. Enforce authoritative active membership/read job/ceiling and record scope before returning header, party or lines. Preserve allowed own-record/role and permitted historical reads; unsupported/error paths fail closed.

RT-051 additionally tests a valid Warehouse job with inventory read but no invoice-read grant, against a known invoice with Owner positive control. Pending execution; do not claim that role variant confirmed yet. Add same protections to analogous sales/purchase/print/export/detail paths and verify actual route/action exposure with fresh credentials.

[PG](../runs/RUN-2026-10-14T12-55-07-908Z-runtime.json), [campaign](../runs/CAMP-20261014-125458746-6d35a7.json). No staging accounts/records/files changed; raw details private, public flags only.

## Final role follow-up evidence

[Campaign](../runs/CAMP-20261014-131128650-2e5b74.json), CI38569613302:292assertions273pass/19fail/zero skips/blocks. [PostgreSQL](../runs/RUN-2026-10-14T13-11-19-113Z-runtime.json), CI38569613346:99/118pass, no infrastructure failures. QA implementation3da78860096e5f39b9f6bc2eedb083357da2a812; tested mergea2488edd483ba3c1f63356306d9b2c66862fb95d; contentcffd44e6273b20ec41b75fd8941e3d6f939db2b6b4da7bca555022e1b9328060.

RT-051 executed: inventoryReadGranted1, invoiceReadGranted0, knownInvoicePositive1, invoiceDetailDenied0. Warehouse direct detail was not refused, confirming the missing read-job guard variant of BUG-0041; no new group. New role lane8pass/3fail. Earlier pending notes are superseded; first291-case evidence retained. Synthetic-auth/non-owner PostgreSQL only; actual credential/HTTP/browser exposure remains unverified. No new staging mutations.

## v2.5.6 bounded retest - 2026-10-15

RT-045, RT-051 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
