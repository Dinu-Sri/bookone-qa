# BUG-0020 — Viewer can approve and post an existing purchase bill

Provisional P1 server-action authorization finding on343d546/v2.2.4. Actual PostgreSQL16/full schema, synthetic Viewer session identity and real persisted memberships; initial owner DB connection. Credential-login/Next HTTP reachability and intended non-owner execution are separate evidence. No actual staging Viewer mutation performed.

RT-020 creates an actual physical purchase10@60 with bill approval enabled. Owner creation leaves pending_approval/no journal/no stock; C-101 independently proves Owner approval and repeated-approval denial. Switch to persisted Viewer and call actual approvePurchaseDocument on that pending ID. Expected deny and unchanged business tables. Actual ok:true, one new journal with purchase posting and changed business state. [Numeric summary](../runs/RUN-2026-10-13T13-23-19-154Z-runtime.json). Viewer create denials RT-017 pass, showing create denial does not establish approval denial.

Source: `apps/web/src/app/actions/commercial-docs.ts:approvePurchaseDocument` obtains tenant context, reads pending document and checks period, then writes journal/stock/document/audit without calling the existing permission/read-only/module/entity and dimension authorization boundaries. Tenant ownership alone is not job authorization. UI button hiding is insufficient.

Repair: enforce the applicable purchase approval/write permission, read-only Viewer guard, module/entity and relevant scopes on the server before any writes; retain an allowed Owner/control and supported authorized jobs. Audit adjacent approve/reject/edit/void entry points rather than introducing an Owner-only rule that breaks approved roles.

Acceptance: unchanged RT-020 plus non-owner alias RT-120 deny with zero business mutations; C-101 Owner approval remains exact and repeat-safe. Wider jobs/overrides/revocation/scopes/foreign records and real login/HTTP required before universal closure. No current accounting expectation changed.

## Actual non-owner follow-up

[Final dual-role evidence](../runs/RUN-2026-10-13T13-35-15-781Z-runtime.json) repeats this failure through a genuine non-owner NOSUPERUSER/NOBYPASSRLS product connection, with per-case role/account-RLS metadata controls and passing own workflows. Owner/non-owner results agree. Identity remains synthetic; actual deployed credentials/HTTP/storage are not claimed. Original failures and financial expectations preserved.

## Bounded fixed-candidate retest — 2026-10-14

Product **v2.5.3 · 5becb2d**: original reproduction and adjacent physical positives pass at both Owner and non-owner DB boundaries in [runtime49](../runs/RUN-2026-10-14T04-55-18-559Z-runtime.json).43/43 SQL applied. See [RUN-16](../runs/RUN-20261014-backup-plan-16.md). This is a bounded fix; actual fresh-credential HTTP/browser/storage and broader fault/race scope remain open. Original failing RUN-15 evidence is retained.
