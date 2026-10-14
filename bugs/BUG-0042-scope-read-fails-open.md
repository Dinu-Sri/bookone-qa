# BUG-0042: Scope lookup error grants unrestricted writes

P1 open, candidate **v2.5.5 · 8e1a2b8**, RT-046; BR-SEC-02 fail-closed scope ceiling.

Actual non-owner/NOBYPASSRLS PostgreSQL with Sales allowed only branch/brand1: legitimate invoice100 succeeds. Revoke SELECT on tenant_membership_scopes **only in isolated qa_runtime fixture**, verify missing privilege, then submit branch/brand2 invoice. Command accepts and AR grows100→200. Scope SELECT grant is restored in finally and original stored restrictions are verified after restoration. Expected refusal with unchanged business records.

Pinned packages/auth/src/permissions/load.ts catches scope query failure and substitutes locationIds/brandIds null, meaning unrestricted. Read grants already loaded remain available. Fail closed instead of treating a failed query as successful absence of scopes. Preserve the distinct legitimate null/unrestricted state when scope lookup succeeds. Scope/request cache and all read/write callers must respect failure; currentDimensionScope must not independently convert missing access into full access.

Normal known out-of-scope create/payment denial RT-044 passes. This reproduces an injected metadata-read error, not an observed normal staging outage or actual customer loss. Owner/Admin scope-ignore semantics remain their separate intended policy. Test fault recovery, own positives, suspended jobs, denied overrides, restricted detail/report/export and real HTTP/credentials before full closure.

[PG](../runs/RUN-2026-10-14T12-55-07-908Z-runtime.json), [campaign](../runs/CAMP-20261014-125458746-6d35a7.json). Fixture role permission/fault changes never targeted shared staging; no production access/public raw errors or records.
