# BUG-0021: RBAC-off company Admin bypasses owner-only backup resolution

Status: reproduced in pinned source helper; deployed archive-route exposure **not established**. Priority P1 contained resolver-contract inconsistency; full owner-only security scenario remains P0 and unaccepted. Product **v2.5.3 · 5becb2d**, SHA `5becb2dcc768e056e34f8507fc2ecd2a3475e6a9`.

S-0764 asserts primary Owner allowed and company Admin denied for backup read/write in both RBAC modes. Initial and fingerprint-bearing local runs15/1; clean CI [archive helper run](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38513838939) reproduces15/1, no missing/infrastructure cases. [Sanitized result](../runs/RUN-2026-10-14T04-54-51-774Z-archive-885003.json). The first failing assertion is Admin backup read with RBAC disabled; the test stops there. Source trace additionally shows the same fallback grants write. Do not describe both modes/keys as separate executed cases.

`packages/auth/src/permissions/resolve.ts`: `fallbackFullAccess()` gives Owner or Admin full access when RBAC is disabled, before `isPrivilegedKey()` calls `privilegedLevel()`. Backup is declared owner-only, so fallback violates the permission contract. With RBAC enforced, privileged resolution denies company Admin; extra Owner/copied grants/allow overrides do not repair the RBAC-off ordering.

Expected: company Admin never receives backup read/write from company role, RBAC flag, extra jobs, grants or overrides. Actual executed: `allows(Admin, company.backup.read, read)` returns true with RBAC off. Primary Owner positive and Viewer denial remain in the helper suite.

Containment: `requireArchiveOwner()` separately requires primary Owner before permission assertion. No credential/UI/HTTP export, download or restore access was attempted here. No customer-data exposure, actual archive disclosure or successful unauthorized restore is claimed. S-0763–65 are still needed against real routes and fresh role sessions.

Recommended: apply privileged backup policy before legacy full-access fallback, preserving existing team/Admin semantics. Keep QA assertion red and add no-grant/no-override adjacent controls when fixing. Existing BUG-0010–0016 remain unchanged. See [coding handoff](../handoffs/HANDOFF-20261014-backup-plan.md).
