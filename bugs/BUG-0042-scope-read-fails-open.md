# BUG-0042: Scope lookup error grants unrestricted writes

P1 open, candidate **v2.5.5 · 8e1a2b8**, RT-046; BR-SEC-02 fail-closed scope ceiling.

Actual non-owner/NOBYPASSRLS PostgreSQL with Sales allowed only branch/brand1: legitimate invoice100 succeeds. Revoke SELECT on tenant_membership_scopes **only in isolated qa_runtime fixture**, verify missing privilege, then submit branch/brand2 invoice. Command accepts and AR grows100→200. Scope SELECT grant is restored in finally and original stored restrictions are verified after restoration. Expected refusal with unchanged business records.

Pinned packages/auth/src/permissions/load.ts catches scope query failure and substitutes locationIds/brandIds null, meaning unrestricted. Read grants already loaded remain available. Fail closed instead of treating a failed query as successful absence of scopes. Preserve the distinct legitimate null/unrestricted state when scope lookup succeeds. Scope/request cache and all read/write callers must respect failure; currentDimensionScope must not independently convert missing access into full access.

Normal known out-of-scope create/payment denial RT-044 passes. This reproduces an injected metadata-read error, not an observed normal staging outage or actual customer loss. Owner/Admin scope-ignore semantics remain their separate intended policy. Test fault recovery, own positives, suspended jobs, denied overrides, restricted detail/report/export and real HTTP/credentials before full closure.

[PG](../runs/RUN-2026-10-14T12-55-07-908Z-runtime.json), [campaign](../runs/CAMP-20261014-125458746-6d35a7.json). Fixture role permission/fault changes never targeted shared staging; no production access/public raw errors or records.

## v2.5.6 bounded retest - 2026-10-15

RT-046 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
