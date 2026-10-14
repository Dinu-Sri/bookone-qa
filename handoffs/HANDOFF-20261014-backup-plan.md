# Tenant archive QA plan / bounded source finding

Pin **v2.5.3 · 5becb2d** / `5becb2dcc768e056e34f8507fc2ecd2a3475e6a9`; live sidebar observed matching on 2026-10-14. Read the pinned `docs/TENANT_BACKUP_ARCHIVE.md` contract and QA `docs/TENANT_ARCHIVE_QA.md`. All45 new dedicated full scenarios remain unverified; data/files browser restore has not run. No staging data changed or archive/password published.

## Executed failure S-0764: RBAC-off Admin backup resolver

`packages/auth/src/permissions/resolve.ts`: `resolveLevel()` invokes `fallbackFullAccess()` before `isPrivilegedKey()` handling. With `rbacEnforced:false`, primary company Admin is accepted for `company.backup.read/write`, despite Owner-only `privilegedLevel`. The new independent helper asserts denial for Admin across both RBAC modes with extra Owner, grant and override and fails. Initial16-helper attempt:15 pass/1 fail, unchanged assertion. Primary Owner positive and Viewer denial controls remain.

Recommended repair: make owner-only privileged backup keys authoritative across RBAC modes before full-access fallback, keeping existing team/Admin semantics and all old financial/Viewer assertions. Add adjacent no-extra/no-override and both mode controls in product as appropriate. QA regression remains in `tests/archive/contracts.test.ts`. Do not return permissive access merely because RBAC is off.

**Scope limit:** `apps/web/src/lib/tenant-archive.ts` independently checks primary Owner in `requireArchiveOwner`, before permission assertion. This source failure does not establish successful company Admin prepare/download/restore. Credential/UI/HTTP scenarios S-0763–65 remain pending. No reopening BUG-0010–0016.

## Contract review questions, not executed restore findings

- Data restore implementation currently validates journal balance and trial hash. Contract requires stock/layers and AR/AP/document integrity plus rollback. QA S-0781/82 will independently inject those inconsistencies and verify actual transaction outcome; identify the implementation validation intended to enforce these before acceptance.
- Files CHG preserves legacy restore metadata with no files checksum, but frozen pair contract requires cross-checksums. Define and document an explicit compatible legacy policy for S-0787 rather than treating missing metadata as equivalent proof.
- `applyArchiveObjects` skips invalid objects. Ensure actual files route cannot mark a required pack complete with invalid/missing objects or partial S3 writes; S-0793/94 will exercise real storage and retry.

No user confirmation is needed for planned staging fixtures under existing authorization. QA will not run reset SQL or restore into traded tenants. Operator DR remains separate from portable owner archives.

## Completed core retest / next priority

QA implementation a9d3cdd21cac02a70d9133babef8e93622f2e9e4, tested PR merge bf95c9a699e06755614750999673ba42ac7be840: metadata/unit/discovery validation, Batch A and B–F green; isolated PostgreSQL49 green; archive helper15/1 deliberately red (BUG-0021/S-0764).43/43 SQL files applied on PostgreSQL16.15. [Runtime evidence](../runs/RUN-2026-10-14T04-55-18-559Z-runtime.json).

BUG-0018/19/20 reproductions now pass at both Owner and non-owner DB boundaries: foreign SKU leaves zero document/journal/cross-tenant line; injected journal fault leaves zero transaction/document/journal/lines; locked-period denial leaves zero business audit/stock/finance; Viewer purchase approval leaves zero journal. Physical positive ends stock9/value540, profit40/cash flow−500, with original AR/AP settlement assertions intact. These are bounded fixes, not fresh-credential HTTP/browser/MinIO acceptance. Keep old0010–16 records and assertions.

Next coding priority is the contained BUG-0021 resolver inconsistency and clarification/implementation of the three restore contract review risks above. Next QA priority is actual persisted archive restore fault/race/storage depth, then fresh primary-owner A→empty-B browser data/files journey and overlay checks.
