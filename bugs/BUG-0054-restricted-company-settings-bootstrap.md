# BUG-0054 — Restricted DB cannot load existing company profile/tax settings

Current disposition (2026-10-16): **original reproduction verified fixed at v2.5.11 isolated real-credential restricted-DB boundary**. See [new run](../runs/RUN-20261016-v2511-independent-retest.md). HTTP104/110 profile/tax and105 known-company platform positive pass, alongside all26HTTPS and303/129 regressions. Broader platform/least-privilege/upgrade acceptance stays open. Original failure record follows unchanged.

P1 open for the required non-owner/NOBYPASSRLS runtime boundary. Product v2.5.10/81a505c. Deployed database role/exposure unknown; not a claim all staging users fail.

Reproduce using the unchanged real compiled Next HTTPS workflow and existing six-identity fixture. Fresh credential Owner login and HTTP102 own invoice/role200 must pass first. GET /company/details: HTTP104 fails owner-profile-page-loaded and cannot obtain rendered-form fields. GET /company/tax: HTTP110 blocks settings-owner-page-unavailable. Owner-DB same cases pass; other restricted settings111–113 pass. Reproduced in two independent run fingerprints. See [current run](../runs/RUN-20261016-v2510-independent-retest.md), CI38840967841/job116780703299 and first CI38840800383/job116780174292.

Expected: active Owner with existing membership can load profile/tax forms; existing membership unchanged by read, then same-form Owner persisted positive and Viewer zero-business-effect denial. Actual: required page positive fails before writes; no settings-denial acceptance possible. Final unrelated controlled payments remain200/due400; this does not prove every settings path mutation-free.

Source-supported diagnosis: company-settings.ts getCompanySettingsData invokes ensureMembership outside withTenantContext after requireTenantContext has released context. Hidden existing membership triggers an unscoped insert. CI PostgreSQL logs show row-policy rejection for tenant_memberships inserts; no per-request SQL trace. Both settings routes share this dependency, so tax is grouped provisionally, preserving its blocked status.

Repair supported existing-member loading with request-local context and authoritative roles; do not promote Viewer, add broad grants, disable RLS or set shared tenant state. Preserve immutable first results. Retest HTTP104/110, existingOwner/Viewer/legacy/foreign controls, all26HTTP and303/129 regressions; extend fresh/company-switch membership cases separately. BR-SEC-01/02 and RB-UI-01. No live financial replay or staging repair by QA.
