# BUG-0018 — Commercial invoice accepts a real foreign-company SKU

Provisional P1 tenant-isolation finding on343d546/v2.2.4. New coverage exposes this behaviour; no evidence establishes which earlier release introduced it. Actual PostgreSQL16/full schema42SQL, real product commercial action, synthetic Owner identity with persisted permission loading. Initial evidence uses owner DB connection; deployed HTTP/credential exposure and intended non-owner action depth are tracked separately.

Physical C-115 first creates an own SKU/purchase/sale as a positive control, then seeds a real physical SKU in tenantB. Owner in tenantA submits that foreign product ID to sales invoice. Expected deny and zero business mutations. Actual accepted: one new invoice, one new journal, one own-tenant document line referencing tenantB's product. [Numeric summary](../runs/RUN-2026-10-13T13-23-19-154Z-runtime.json). Known foreign fixture exists; this is not a nonexistent-UUID isolation test. No customer-data read/leak is claimed.

Source: `apps/web/src/app/actions/commercial-docs.ts`, createCommercialDocument enrichment filters product by tenant, but if no product is returned it retains default `service` and submitted productId. Later document-line insert references that ID. A global product FK proves existence, not matching tenant ownership. Thus physical stock/COGS handling may also be bypassed by the fallback. Exact deployed downstream exposure remains untested.

Repair: validate every referenced non-null product against the active tenant/active supported product constraints before finance, party, cost-layer or document effects. A missing/foreign product must be denied; free-text lines must be explicitly productId-null. Audit adjacent product/source-document/discount/dimension IDs and stronger DB ownership constraints. Do not fix by dropping the ID or treating foreign products as services.

Acceptance: C-115 plus non-owner alias C-215 deny and preserve full snapshots; own physical sale remains accepted with exact stock and COGS. Real foreign records and positive controls mandatory. Broader state/location/module and credential/HTTP/file acceptance remains open.

## Actual non-owner follow-up

[Final dual-role evidence](../runs/RUN-2026-10-13T13-35-15-781Z-runtime.json) repeats this failure through a genuine non-owner NOSUPERUSER/NOBYPASSRLS product connection, with per-case role/account-RLS metadata controls and passing own workflows. Owner/non-owner results agree. Identity remains synthetic; actual deployed credentials/HTTP/storage are not claimed. Original failures and financial expectations preserved.
