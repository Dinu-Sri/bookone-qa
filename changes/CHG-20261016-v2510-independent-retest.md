# v2.5.10 independent QA retest

Status: intent recorded; execution pending.

Product 81a505c4e39c71f5019eea5de0bc7c5fffc50a1f (v2.5.10), previous 2e105cd443ce01e31220bfe2d4b4637cdc737b75 (v2.5.9). QA baseline 40a7bc2503b0bae03dc50d4f1b3de14571409cf1. Rulebook 1.0.0/hash abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc.

Owner requests testing the new live update on 2026-10-16. Actual deployed stamp remains unobserved: Browser extension connection fails before page observation. Old workstation private fixtures/credentials/checkpoints absent. No staging writes or financial replay.

Actual diff reviewed: getTenantInfo wraps tenant/access reads in withTenantContext; listCashbookRows/listYearDomainTotals/exportCashbookCsv scope entity-kind reads; VERSION, product source-contract tests and documentation. No migration, lockfile, auth-policy or schema changes. Graph tools unavailable; pinned checkout used.

Selected unchanged checks: all303 campaign assertions, independent129 PostgreSQL executions and26 real-credential compiled-Next HTTPS checks, including HTTP102 and its ten blocked dependents. Retain original financial/security expectations, RT060/061/062, Owner13 HTTP positives, Viewer/foreign denials, no legacy Viewer promotion and payment200/due400. Full137 workflows remain unaccepted; no readiness percentage.

Impact: shared workspace access/nav and cashbook reporting/export expand adjacent scope. Actual cashbook query/export positives and known-foreign denials, migration042 function grants/owner/search-path, Company Admin/settings and wider physical GRNI/cost/partial/lock workflows remain required beyond unchanged baseline. No global tenant context or BYPASSRLS workaround.

Synthetic fixtures are CI-owned ephemeral PostgreSQL16 bookone_qa_runtime only; resets serial and guarded, real auth in HTTP app. Source, seeded-session PostgreSQL, actual credential HTTPS and deployed browser evidence remain separate. Preserve first attempts, exact QA/product/content/schema/fixture fingerprints and terminal job handles. Real encrypted backup/restore LAST. No product edits, release merge or deployment.
