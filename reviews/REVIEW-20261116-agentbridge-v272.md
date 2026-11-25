# AgentBridge v2.7.2 independent retest — 16 November 2026 UTC

Exact product: `29675262eaa2dc36f7e4d6a19730aa517295b352`, clean detached `work/product`. New successor checkout/clock/loopback PostgreSQL fixture; no consumed review, Mission2 or CONT action resumed. **Activation remains blocked by three reproduced defects.**

## Passed repairs and actual evidence

- Actual public login and protected staging Owner sidebar both show `v2.7.2 · 2967526`. Existing session reused; no login/logout submission. Inspected company Inbox OFF, draft-only ON, posting-stop ON, unchanged. One navigation timeout resolved by observing the completed page; no repeated submission. Temporary tab closed.
- Docker image workflow43852425488 and Production Check43852425530 report success on this SHA. Workflow publisher still requires quality and CoreGuard. Read-only GitHub API still reports master unprotected, zero required contexts, empty rulesets. No repository settings/deployment change.
- Product AgentBridge suite **39/39 passed**. Original independent service expectations **5/5 passed unchanged**: paid-invoice refusal, single recording-port call under concurrent keys, missing expiry rejection, connected-agent approval refusal, OCR placeholder removed. The OCR assertion alone proves removal of the stub; it is not external-provider qualification.
- Fresh PostgreSQL16 schema and **47 ordered migrations applied**; actual runtime role independently reads NOSUPERUSER/NOBYPASSRLS. Runtime acceptance **5 passed / 3 failed**. Real upload/blob persistence, legitimate two-company isolation, returned-service tenant scope, concurrent real bill posting and archive inclusion pass. Source helper session identity is explicitly synthetic; permissions, database, RLS, commercial posting, token verification and dispatcher are real product code. No network/staging exploit claim.
- Concurrent different keys on one approved supported proposal produced one actual bill for LKR1180 and balanced journal. New tenant policy requires an actual supplier record, now explicitly seeded in the disposable fixture; prior hardcoded-supplier dependence removed. Foreign-company read fixture now explicitly grants the user membership in both synthetic companies, so denial is testing data isolation rather than missing membership.

## Three reproduced failures

| ID | Expected | Actual and boundary |
|---|---|---|
| AB-08 / AB-DB-05 | A currently read-only Viewer with an old valid signed post scope cannot post | Exact token verifier accepts the labelled fixture token; current `authorizeAgentConnection` explicitly removes post; runtime service factory discards that returned actor and dispatcher receives the old actor. Actual isolated ERP bill count increases1→2 despite current Viewer restriction. Owner had approved the proposal; this is unauthorized posting, not self-approval. |
| AB-09 / AB-DB-06 | Reconciliation of a lost response updates receipt and document consistently | After real bill commit, injected local crash-state sets durable receipt/document unknown. A fresh service reconciles ERP idempotency to posted receipt and correct bill, but document remains `unknown_outcome`. No second bill from this recovery. |
| AB-10 / AB-REC-02 | Restored document retrieves identical attachment bytes | Actual product encryption + `restoreTenantDataArchive` succeeds into an operationally empty second tenant. Three documents and three blobs restore; matching document/blob keys drop3→0. Application `getOwnedAttachment` cannot retrieve bytes. Source snapshot remains exactly unchanged. Journals balance in both tenants. |

Cause of AB-10 is consistent with source remapping: `storageKey` rewrites tenant prefix only; blob primary column `key` goes through generic UUID rewriting, changing the embedded document UUID. Both rows existing is insufficient recovery proof.

## Recovery LAST and reconciliation

Archive-inclusion check and full encrypted data restore ran LAST after all functional cases, in the fresh disposable database. Final read-only reconciliation: source3documents/3blobs/3matchingkeys/2bills/journalnet0; restored target3documents/3blobs/0matchingkeys/2bills/journalnet0. The second source bill is the retained unauthorized-Viewer test artifact, not a concurrency duplicate. No live restore, no S3/full disaster-recovery certification. Attachments here are the runtime's actual DB-backed blobs. First earlier reports are retained privately; only reset the guarded disposable test fixture for stronger signed-token/current-grant controls and additional recovery checks.

Initial test infrastructure errors retained: nested candidate picked up enclosing QA Vitest config and found no tests; first explicit URL-root attempt retained percent encoding and found no tests. Correct `fileURLToPath` explicit product config then ran39 tests. No acceptance answers changed. Initial database run5pass/2fail; adding full restore yielded5pass/3fail; signed-token/current-grant control preserved the same failures.

## Remaining gaps

Production OAuth verifier code exists but source MCP/REST authorization still calls the synchronous HMAC-only `actorFromAuthorization`; configured issuer/JWKS do not wire themselves into those routes. Current authorization must intersect token scopes with the token subject's live grants, not browser-session grants; session absence/lookup failure must fail closed, and unknown/revoked connections need explicit policy. These are required follow-up source findings, not additional counted live exploits.

Existing browser spec now runs a small handwritten HTTP server backed by MemoryStore/recording adapter. It still does not execute the actual Next UI, non-owner PostgreSQL and production posting path together. Optional deployed smoke accepts login/purchases/inbox URLs and is skipped when URL is unset. It cannot establish the full UI acceptance requested. External OCR/provider, registered IdP and external MCP-client qualification remain unperformed. Branch protection remains absent. Keep existing-company flags unchanged; no customer-readiness/launch approval.

## Reproduce

Install locked QA and pinned product dependencies; `node scripts/verify-product.mjs` must pass.
`node scripts/agentbridge-v272-review.mjs service` →5pass; `product` →39pass.
For `database`, create NEW loopback PostgreSQL16 `bookone_qa_runtime`, set private `QA_RUNTIME_ADMIN_URL` and `QA_RUNTIME_ISOLATION=ephemeral-local-postgres`, run existing `scripts/runtime/prepare.mjs`, then `node scripts/agentbridge-v272-review.mjs database` →5pass/3fail. Database tests truncate only the guard-verified disposable fixture. Never use staging for this command. Full restore is last.

See sanitized JSON receipt and `handoffs/CODING-AGENTBRIDGE-03.md`. Credentials, source IDs, browser snapshots, tokens and raw evidence remain ignored locally.
