# BUG-0019 — Failed commercial posting leaves committed financial records

P1 atomicity finding on343d546/v2.2.4. Actual PostgreSQL16/full current schema42SQL and real product purchase action; initial owner connection and synthetic Owner identity with persisted permissions. Trigger fault runs only in verified disposable loopback database, is dropped in finally, never shared staging. New test discovery does not establish introduction release.

C-116 injects a journal-line insert exception during physical purchase10@60. Expected error with no document/transaction/journal/stock/layer/audit effects. Actual response denies, but one transaction and one journal header remain; zero journal lines and zero purchase document. [Numeric summary](../runs/RUN-2026-10-13T13-23-19-154Z-runtime.json). An empty journal is not a valid successful balanced posting or safe rollback. First failure is preserved.

Adjacent RT-018 rejects a sale in a locked period and creates zero financial documents/transactions/journals/movements, but adds one business audit entry. Source ensureParty creates the new customer and its CREATE/parties audit before the later period check. This is a preflight/failed-operation side effect, not a demonstrated locked-period financial bypass. Parent finding's P1 comes from orphan financial writes; metadata side effect has lower impact. Operational denial telemetry is permitted separately from business CREATE history.

Source: createCommercialDocument runs many writes under withTenantContext, which binds a reserved connection but does not create an encompassing DB transaction. Journal header/transaction precede document, stock and final audit. Top-level catch returns failure without rolling committed earlier writes back. Cost helpers also have catch/fallback paths requiring careful review; no additional cost-helper fault result is claimed.

Repair: validate mandatory conditions before writes and encompass relevant party, document/line, posting, cost consumption/receipt, quantity, settlement and business audit effects in one actual tenant-scoped transaction. Ensure nested helpers use that transaction; do not swallow operational DB errors as missing-table compatibility. Keep separate operational error telemetry. Audit approval, sales, returns and other multi-step actions for the same boundary.

Acceptance: unchanged C-116/C-216 fault tests produce no orphan effects; RT-018/118 deny without unintended business metadata. Add stock/cost/audit failure boundaries, retries and successful physical workflows. Avoid hiding empty journals in reports or deleting posted history to make tests green. No live records were altered by QA.

## Actual non-owner follow-up

[Final dual-role evidence](../runs/RUN-2026-10-13T13-35-15-781Z-runtime.json) repeats this failure through a genuine non-owner NOSUPERUSER/NOBYPASSRLS product connection, with per-case role/account-RLS metadata controls and passing own workflows. Owner/non-owner results agree. Identity remains synthetic; actual deployed credentials/HTTP/storage are not claimed. Original failures and financial expectations preserved.
