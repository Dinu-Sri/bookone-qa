# AgentBridge AB-06 — repair independent v2.8.0 acceptance failures

Read this entire handoff and product AGENTS.md, QA_CHANGE_CONTRACT and VERSIONING before editing. Implement a focused repair candidate, run the original reproductions and adjacent real runtime regressions, update the change record/docs and publish exact version/SHA/tree and CI. Owner deploys. Preserve the AB-05 v1 unpaid-service-invoice scope; a universal accounting-standards engine is outside this mission.

Reviewed baseline: live v2.8.0 `43233f0d3fade99228f6e7590f1e7e86d6b91370`, tree `fbda63ca4e60e44f4a512f5200f8839695a2a123`. Product suites425/425 pass, but NEW independent service acceptance5/5 fail. Actual no-OCR UI intake and VAT1180 preview pass, Jobs role switching is fixed. No staging approval or posting was attempted. The exact reproducers are `tests/runtime/ab05-independent-review.test.ts` in QA.

## AB06-01 P1 — bind every operation to the current proposal; correct approved facts atomically

`submitExtractedFacts` creates a new proposal but does not revoke the superseded proposal's approval. Direct correction while awaiting approval throws `Illegal AgentBridge transition awaiting_approval → draft` AFTER writing a new proposal. There is no atomic current-revision compare-and-swap covering the complete replacement.

Independent reproduction also demonstrates a stale approval reaching the recording posting port:
1. Save facts and validate P1; human actor grants A1.
2. Validate P1 again (moves document back to validated).
3. Submit corrected facts with current document revision, making P2 with different amounts.
4. Request approval for old P1; commit old P1/A1. Service returns posted despite document's active proposal being P2 and no fresh approval.

This is actual service behavior with MemoryStore/recording posting port, not a claim of a live unauthorized bill or PostgreSQL reproduction. Fix the shared service and real store transaction boundary: active document/proposal/revision binding on read/preview/validate/request/grant/commit as appropriate; approval invalidation on every material change; safe correction from approved states; no orphan proposals/operations on a refused transition. Enforce optimistic concurrency atomically in PostgreSQL. Test stale proposal IDs and concurrent replacements, including a real posting adapter whose invocation count must remain zero for stale approval.

## AB06-02 P1 — durable upload/facts idempotency

Concurrent same-key submitDocument calls both succeed and create two documents in the independent service test. Runtime source checks the key before writing document/blob and records the key afterwards; `saveFactsKey` also overwrites an existing row. Do not claim actual duplicate staging records: the race was exercised in service MemoryStore, and the real database path needs outcome tests.

Claim tenant-scoped logical keys atomically before side effects, bind complete canonical payload, and return the one durable outcome to concurrent/retried callers. Different payload on same key must fail without changing the first binding. Test same key and different keys, process/restart/interrupted response, upload-session finalize, batch retries and facts revision races against non-owner PostgreSQL. No orphan blobs/documents or partial bindings after conflicts.

Facts payloadHash currently omits semantic fields such as lineDescription, categoryLabel and invoiceKind. Same facts key with changed description returns ok:true and the old result instead of IDEMPOTENCY_MISMATCH. Include every supported semantic field in canonical hashing and test each change independently. Preserve schema compatibility explicitly.

## AB06-03 P2 — usable fact correction and coherent category mapping

Actual UI selected General Expense6800 but saved proposal displays Cost of Goods Sold(6800). Preview correctly debits6800; wrong posted account is NOT established. factsFromExtracted selects the first approved category label while submitExtractedFacts overwrites only the account code. Derive the label from the selected authorized mapping, and reject inconsistent code/label pairs.

The initial facts form disappears once a proposal exists; current draft/validated UI has no Edit facts action. Provide authorized correction with expected revision, complete prefilled values, validation, re-preview and approval invalidation. Do not make users reupload/recreate a document to correct it. Use exact decimal validation in the server action, not Number-invalid→0 coercion. Test blank/malformed/negative/overprecision values and saved-state feedback through actual Next UI.

## AB06-04 P1 completion gap — connect the browser upload fallback to its session

createUploadSession returns `/purchase/inbox?uploadSession=...`, but the page uses this query only for explanatory copy. Its form does not carry the session ID and uploadInboxDocument calls submitDocument rather than finalizing/binding the session. Source inspection establishes the missing wiring; an actual connected-client fallback was not qualified.

Validate session ownership/connection/hash/length/expiry and finalize the same durable session through browser upload. Return/resume the linked document to the agent; no second upload. Cover refresh, wrong company/user/connection, expired session, same-key retry and batch item reconciliation. The advertised fallback must complete end to end before claiming it supported.

## AB06-05 P2 — fix archive health classification as well as pack generation

Actual backup prepared message now correctly says0 packed files and1 AgentBridge attachment already in company data. Same screen's restore/health section still says1 attachment missing and asks for the matching pack. getTenantArchiveStatus counts collectLiveStoragePointers against S3 without excluding verified DB-backed blobs; pack generation alone was fixed.

Use consistent storage-aware inventory for preparation, health, restored status and warnings. Keep genuinely missing S3/DB content visible; never suppress all missing warnings. Add mixed DB/S3, corrupt/empty DB blob and absent object cases. Recovery LAST must verify actual restored raw bytes and references in a fresh empty target, with source unchanged. No fresh restore was attempted in this QA because functional acceptance failed first.

## AB06-06 P1 completion gap — production OAuth/client readiness

Live public discovery points to BookOne's own authorize/token/JWKS endpoints; live JWKS returns keys:[] and an unconfigured error. Token route requires custom tenant_id/tenant hint and only mints fixture HMAC tokens; production path returns503. Merely configuring public keys does not implement a production authorization-code issuer. Discovery advertises refresh_token while the token handler supports only authorization_code.

Deliver a coherent production OAuth path using a maintained standards-compliant authorization-server integration. Actual issuer metadata/endpoints, token audience/resource, PKCE, client registration/callbacks, authorization-code lookup, trusted human consent, current scopes/company identity, issuance, expiry/renewal and revocation must agree. Do not enable fixture HMAC on staging to masquerade as real-client qualification. Never expose a post scope while consent text describes only read/upload/draft. Preserve server-side grant intersections and human-only financial approval.

When external operator configuration is genuinely required, provide the concrete supported provider integration and exact safe setup checklist. Complete all code and protocol tests first, then identify live tests blocked by owner configuration. Do not claim successful Codex or Claude connection from unit tests or an empty Connections screen. No new persistent credentials/security changes by QA without required approval.

## Acceptance and preservation

- Original425 product regressions remain green; all five independent reproductions must become green without weakening expected outcomes. Current failing acceptance is deliberate regression coverage, not a harness error to skip.
- Add actual Next+non-owner-PostgreSQL tests for corrected approval binding, atomic idempotency, browser/session fallback and edit flow; prove persisted accounting/AP/journal effects and zero effects on refusals. MemoryStore is not this proof.
- Independently retest real Codex/Claude surfaces only through the completed authorized production-compatible path; publish exact versions and limitations. Retain explicit capability exclusions.
- Check AB-05 full-mission completion honestly: multi-line/discount/evidence contracts and batch status/resume must be implemented and outcome-tested if claimed. Current facts contract is one description plus aggregate totals; do not call it full multi-line support. Do not add stock/payments/FX or a general standards interpreter.
- Keep CoreGuard mandatory with independent tests, real runtime outcomes and actual release enforcement status. Update CHG/TASK_LOG/PROJECT_STATUS and VERSION before product commits. No deployment from this handoff.
- Preserve old QA companies, shifts and transactions. New AB-05 source has one stored original and one validated proposal, one vendor, draft-only/post-stop ON and zero bills/journals. Backup pair prepared once; no restore. Recover/reuse the privately bound source through reviewed supported controls; never blindly reupload/recreate it.
- After owner deployment, independent QA uses a new exact candidate/QA pin, current explicit UTC date and fresh clock/gates. Supported financial workflow and recovery LAST remain required before activation. No launch/posting approval is granted here.

Reproducer command from QA root after installing exact product dependencies under work/product:

    node work/product/packages/agent-bridge/node_modules/vitest/vitest.mjs run --config vitest.ab05-independent.config.mjs

Publish one concrete repair candidate and a precise acceptance matrix. Separate fixed implementation, developer-tested behavior, independently qualified behavior and external configuration blockers.
