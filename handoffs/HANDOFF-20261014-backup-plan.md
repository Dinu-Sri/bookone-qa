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
