# BUG-0055 — Restricted DB platform Admin company list misses known company

Current disposition (2026-10-16): **original reproduction verified fixed at v2.5.11 isolated real-credential restricted-DB boundary**. See [new run](../runs/RUN-20261016-v2511-independent-retest.md). HTTP104/110 profile/tax and105 known-company platform positive pass, alongside all26HTTPS and303/129 regressions. Broader platform/least-privilege/upgrade acceptance stays open. Original failure record follows unchanged.

P2 open for the required restricted-DB platform operation. Product v2.5.10/81a505c. Availability/positive-control failure, not demonstrated cross-tenant disclosure.

Unchanged HTTP105 fixture creates known own/foreign companies plus a real credential platform Admin. Owner/Viewer own-invoice positives pass; both normal actors are denied Control Room307. Platform Admin GET /control-room/companies returns200 but does not contain the independently seeded known foreign-company name. Owner-DB HTTP005 same positive passes. Reproduced in first and corrected fingerprint. [Evidence](../runs/RUN-20261016-v2510-independent-retest.md), CI38840967841/job116780703299.

Expected: explicitly verified platform Admin can list authorized fixture companies while normal company roles cannot. Actual: route shell200 without required company positive. Do not count the normal-role deny as complete acceptance without that positive.

Source-supported cause: platform.ts requirePlatformAdmin performs application authorization then returns; loadCompanyRows queries tenants on the unscoped pool. RLS can hide the tenant rows. No request-specific SQL trace/observed row count or proof of full list emptiness claimed. Needs narrow privileged listing design with explicit platform authorization; no shared global tenant, broad BYPASSRLS, public arbitrary SQL or normal-role elevation. Preserve list filters/counts/details and normal-role denial. Rerun HTTP005/105 plus all26HTTP/303/129 on new candidate. BR-SEC-01/02.
