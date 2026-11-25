# Independent AgentBridge acceptance — 16 November 2026 UTC

Candidate: BookOne v2.7.0, `ab54e3493dfbc6cb91d7c9991ae58f2e44610591`.
Decision: **do not activate AgentBridge posting; grouped coding repair required**.
This is a new review clock and fresh disposable fixture, not a continuation of any consumed Mission2/CONT queue. Product tracked source remained clean and unchanged.

## Evidence and limits

Existing product AgentBridge tests: 29/29 passed independently. Docker run 43824752305 and Production Check 43824751437 jobs were independently observed successful. The Docker publisher depends on both quality and CoreGuard, without masking their failure. These checks did not cover the failures below.

Independent service acceptance: **0 passed / 5 failed**. Exact product service/dispatcher/token verifier/extractor; memory store and recording posting adapter. No claim of live duplicate journals or payments.

Independent PostgreSQL acceptance: **3 passed / 2 failed**. PostgreSQL16, current Drizzle schema and all 46 ordered SQL migrations applied successfully; non-owner NOSUPERUSER/NOBYPASSRLS execution role. Only the authenticated session identity is synthetic; actual product PostgreSQL store, ALS tenant helper and commercial posting code execute. Positive upload/blob persistence and separate-company RLS passed. With an explicit surrounding tenant scope, supported invoice posting created a real local bill for LKR1180 and balanced journal matching the fixture preview. This outer scope is a diagnostic control, not proof the shipped route works.

Actual authorized staging browser: public login and protected sidebar display `v2.7.0 · ab54e34`. Existing Owner login accepted once; no unresolved login. Inspected existing company has Inbox OFF, draft-only ON, posting-stop ON. No save/change. Direct disabled-inbox navigation redirected to the purchase list. Three original paid purchases remained visible. This is bounded preservation evidence, not full balance/stock reconciliation or database migration attestation. No staging financial/configuration/master/grant/shift/restore action, no historical replay, no deployment.

First QA infrastructure errors retained privately: invalid initial Vitest executable path; initial database test used `listDocuments` instead of actual `listInbox`. Corrected harness, preserved first reports, reran only disposable local data. Final tests use standard clean `work/product`, not a peer checkout. No acceptance expectation weakened.

## Reproduced findings

| ID | Failure | Proof boundary |
|---|---|---|
| AB-01 | Unsupported paid invoice can obtain approval and reach posting while blocking issues remain | Exact service + recording adapter, one call instead of zero |
| AB-02 | Two concurrent keys for one approved proposal cause two posting calls | Exact service + MemoryStore, two instead of one; live financial duplication not asserted |
| AB-03 | Validly signed token missing finite expiry is accepted | Exact signer/verifier; signing secret required; not an unauthenticated forgery claim |
| AB-04 | Agent connection with approve capability can grant purported human-only approval | Exact MCP dispatcher returns approval record; trusted-human boundary absent |
| AB-05 | Configured OCR still unconditionally throws the blocked placeholder | Exact live adapter with synthetic endpoint/key, no external upload |
| AB-06 | Returned runtime service loses authorized tenant scope before method invocation | Real non-owner database: same tenant's enabled flag reads false outside scope; positive scope control passes |
| AB-07 | Actual tenant archive omits AgentBridge persisted documents/blobs | `snapshotTenantTables` executed LAST on real positive fixture; new tables absent |

## Six requested workstreams

1. Exact review completed within the stated boundary; seven reproduced defects reported.
2. Actual stage stamp/current company safeguards verified unchanged. Live migration44 presence and all-company flag states not independently attested. Never infer migration from version badge.
3. Real database upload/RLS/posting diagnostic completed. Full real-server/browser AgentBridge posting acceptance withheld because core failures remain; do not enable existing company to force progress.
4. Image workflow dependency verified. GitHub read-only API reports master `protected:false`, protection disabled and zero required contexts; ruleset list empty. Repository enforcement not completed. No repository settings changed.
5. Recovery/export check executed LAST after functional cases and failed at export completeness. Full restore is blocked because the source archive omits the new records; no live restore and no old recovery replay.
6. External end-to-end qualification not completed: OCR adapter is a product stub, local HMAC is not production OAuth, and no external client is qualified. User need not choose accounts or share secrets to fix these code defects. Provider/client configuration follows a repaired candidate.

## Additional source risks, not counted as new runtime-proven failures

Token validation lacks current membership/grants/connection-revocation checks; audience constant is not validated and runtime secret has a development fallback. Runtime policy includes hardcoded fixture supplier/category defaults and `Number(rate)||18` treats zero as18. Runtime upload does not forward bytes to extraction. Durable jobs table exists but queue/runtime durability is not established. Existing Playwright inbox spec renders handwritten HTML via `page.setContent`; it is not a real application/database browser test. Tile navigation requested earlier remains absent by design in this candidate. These require coding-agent review and exact acceptance tests; do not present source inspection alone as exploited staging defects.

## Reproduce

`pnpm install --frozen-lockfile`, `pnpm product:prepare`, then install product locked dependencies in `work/product`.

Service: `node scripts/agentbridge-review.mjs service` (expected exit1, five failing acceptance expectations on this candidate).

Database: create a NEW loopback-only PostgreSQL16 database named `bookone_qa_runtime`; set `QA_RUNTIME_ADMIN_URL` privately and `QA_RUNTIME_ISOLATION=ephemeral-local-postgres`; run `node scripts/runtime/prepare.mjs`, then `node scripts/agentbridge-review.mjs database` (expected exit1, three pass/two fail). The database lane truncates only its guarded disposable fixture; never point it at staging. Recovery/export is the last case.

All raw screenshots/snapshots, credentials, URLs containing passwords, private fixture records and detailed evidence remain ignored locally. See sanitized receipt and grouped coding handoff. No customer-readiness or launch approval.
