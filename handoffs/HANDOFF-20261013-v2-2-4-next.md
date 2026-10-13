# v2.2.4 — current regressions pass; next acceptance work

Current product343d546ed41f7790e1fc45414d130012dab37a39; observed staging v2.2.4 ·343d546. [RUN-14](../runs/RUN-20261013-v2-2-4-retest-14.md) is current; v2.2.3 [RUN-13](../runs/RUN-20261013-v2-2-3-retest-13.md)/BUG0017 remain historical failed evidence.

All60 source checks and23 actual PostgreSQL cases pass, including constructor/commit/rollback/savepoints, non-owner helper tenant separation/restoration, persisted permission/payment controls, quotation→invoice→receipts→credit exact report and concurrent single reversal. Income500/cash250/AR250; reversal one accepted effect/two journals/net0. Live existing-session Owner navigation and read-only Dashboard restored. No new defect to fix in this bounded retest; no staging data changed.

QA next work, in order:

1. Fresh explicit Owner/Viewer credential login and supported identity check; reproduce representative B lifecycle/reload/read/deny through real UI/server. Add actual intended non-owner commercial/reversal action and permission loading evidence rather than substituting DB-owner action passes. Preserve private credentials locally; stop on actor mismatch.
2. Historical prior-release schema→040 with existing single reversal, duplicate-history index-failure and recovery/data-preservation tests in isolated PostgreSQL. Never delete financial history or ignore migration failure. Actual deployed role/image/schema/backup identity still requires evidence.
3. Real synthetic object upload/sign/download ownership/bytes and cleanup failure paths; company/settings/custom/scoped/revoked actors from42-row matrix. F-008 source guard is not a full storage security check.
4. C/D persisted purchase/stock/cost and rental booking/dispatch/return/deposit journeys, exact conservation/accounting/audit, concurrency and company/module variants. Resolve pending business policies before adopting current output as expected behaviour.92 tasks and10 policy decisions remain indexed.
5. Review negative release-gate/manual-publisher/external-QA promotion and wider failure sensitivity before claiming a mandatory product gate. Product quality CI currently misses the actual runtime regression found in RUN-13.

Coding agents: keep the83 automated case executions (60 source,23 PostgreSQL) separated by boundary, pin new SHAs and request independent QA on any shared DB/auth/finance/settings change. More future tests may increase counts; do not use counts alone as coverage. Send change/migration/permission/fixture notes through the existing product change-record protocol. These green checks do not approve production release.

[QA PR12](https://github.com/Dinu-Sri/bookone-qa/pull/12), [runtime23 CI](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38399507247). Canonical startup: AGENTS.md→STATUS.md→SESSION.md→memory/programme.json; `pnpm session:start`, `pnpm check`, `pnpm batch:coverage`. Fresh dedicated loopback PostgreSQL only; no shared staging reset or automatic live-payment replay.
