# v2.2.1 retest: next coding work and QA work

Candidate993664b; [RUN-10](../runs/RUN-20261013-v2-2-1-retest-10.md). Independent QA with aligned Zod4.4.3: **A15/0, B10/2, C8/0, D8/0, E3/0, F3/1 =47 passed/3 failed**. Retained units94 passed/4 skipped. Current staging refreshed stamp v2.2.1 ·993664b; retained synthetic journal history and docs/search/product-form read checks succeeded. No staging writes in this run.

The quality-publication configuration fix is verified: all four unmasked commands precede the same-workflow publisher; push CI quality and publishing succeeded. Manual path has no bypass in source. Live failing-job/manual-dispatch experiment and trusted same-SHA external QA promotion remain unverified; build-quality green is not business acceptance.

## Coding agent: three remaining isolated findings

- **BUG-0010 / B-007:** actual exported `allocateDocumentPayment` in `apps/web/src/app/actions/documents.ts` accepts a synthetic Viewer and persists changes. Normal receive-payment wrapper denies that same fixture (B-012), so do not rely solely on outer wrappers. Enforce sales/purchase-specific write rights and applicable tenant/dimension/state rules at every reachable financial boundary. Deployed exposure not yet reproduced.
- **BUG-0011 / B-011:** same allocation action accepts revenue4000 as tender, changes the document balance and persists a payment. Validate active, owned, eligible cash/bank/tender account at the server boundary; preserve declared custom eligible liquid accounts. Test correct debit/credit/control/cash-flow outcomes and atomic invalid-account denials.
- **BUG-0012 / F-004:** `parseStatementDate` in `packages/statement-import/src/normalize.ts` returns2026-02-30 as a valid ISO date. Validate real calendar values/leap years across formats; verify downstream preview/commit denies malformed lines. Downstream data corruption is not proven.

These functions were not changed by the quality-fix commit. Keep the assertions and expected business outcomes; write product CHG records, preserve audit/history/idempotency and retest on the new exact source. No need to repeat inbuilt E2E removal or reset staging.

## QA: separate ongoing implementation work

Implement B-101–103 full commercial quote/draft/post/payment adapters plus A runtime role/RLS/dimensions/concurrent reversal. Use isolated full-schema PostgreSQL CI fixtures and separate connections; local Docker/PostgreSQL CLI is unavailable. Build credit/invalid-state/idempotency/partial-batch failure cases next. The83 specified lifecycle tasks and pending policies remain intact. Source passes do not complete those tasks. Keep this work moving while coding fixes the three concrete findings.
