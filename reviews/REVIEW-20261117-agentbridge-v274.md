# AgentBridge v2.7.4 candidate qualification and live mismatch — 17 November 2026 UTC

Candidate `bd16a8468cf4f5d14f8e84e42b6b0c78d0a45f97`, tree `aa7ff89b146d8f2532dd5a5ef350a0e530e21d6b`, clean detached checkout. Merged master `9eb13dabc3bd988bec2ed9e6bb2d17ded05db767` has that exact tree and no content diff. **Reported defect retest passes. No new coding defect established in this scope.** Live/image status is separately recorded in the final receipt.

## Deployment identity

User reported a new production update. Initial public-browser observation of the known URL `https://bookone.clossyan.com/login` showed `v2.7.3 · 382f0d8`; master then matched that old version and PR17 was open. During independent qualification PR17 was merged externally. Fresh fetch established master9eb13da with exact tested tree/no content diff. This external release-state change supersedes the initial unmerged observation; do not use it as a reason to request another merge. No merge/deploy/repository configuration action was performed by this QA agent.

Feature-candidate Production Check43896025299 succeeds. Merged-master Production Check44007311027 succeeds; Docker44007310935 quality and CoreGuard succeed, with image publication tracked separately in the final receipt. Do not substitute the old v2.7.3 image or badge as new-release evidence. Executed tests remain honestly pinned to bd16a84; the merged source is qualified by exact tree equivalence, not a fabricated second test run.

## Independent qualification

| Lane | Result |
|---|---|
| Product AgentBridge suite |46passed/0failed|
| Complete existing auth suite |123passed/0failed|
| Original independent service expectations |5passed/0failed|
| Actual Owner/Accountant/Purchasing resolver + Viewer control |4passed/0failed|
| Actual non-owner PostgreSQL runtime and recovery |9passed/0failed/0blocked/0skipped|

All acceptance expectations retained. New17NovUTC clock, new checkout and fresh loopback-only PostgreSQL16 database;47ordered migrations applied without skipped SQL. Execution role independently confirmed NOSUPERUSER/NOBYPASSRLS. Session identity is synthetic for runtime tests; real permission loader, service, token verifier, MCP dispatcher, DB/RLS, commercial posting, ERP idempotency and encrypted restore code execute. These are not HTTP-browser or production-IdP claims.

Actual standard Owner loader now has approval/post grants and direct checks true. Legitimate Owner approval succeeds. Two concurrent keys for one proposal create exactly one real local LKR1180 bill with exact journal Dr6800=1000/Dr2300=180/Cr2100=1180. A valid stale-scope Viewer token on an actually approved proposal creates no extra bill and is refused. A fresh service reconciles a simulated lost-response state to the same posted bill with both receipt and inbox document posted. Separate prelookup Viewer refusal passes. The previously blocked positive/recovery cases are now exercised, not carried as assumed passes.

## Recovery LAST and reconciliation

Actual archive inclusion and encrypted data restore ran LAST after functional cases, into an operationally empty second tenant in the disposable database. Exact restored attachment bytes retrieved through the product service; source snapshot exactly unchanged. Restored draft-only and posting-stop both1, approvals revoked, posted operation links to its restored bill. Source and target each3documents/3DBblobs/3matchingkeypairs/1bill; journal net0.00 in each. No duplicate bill from concurrency, Viewer attempt or response recovery. This is actual tenant-data/DB-blob recovery, not S3 files-pack or infrastructure disaster-recovery certification.

## Harness limits and retained failures

Initial Vitest database suite collected zero cases due to a Drizzle ESM/CJS require cycle. Retained original report privately; v274 QA config inlines the existing Drizzle dependency in Vitest. Product code, role privileges and expected business answers unchanged. The corrected suite executed and passed all9cases. Full auth regression was added because shared grant resolution/job persistence changed;123cases pass. Old dated config/test filenames are reusable independent tests, not imports of old execution receipts or consumed business actions. No prior run/clock reopened.

Live work was public-version reading only: zero login/logout submissions, zero financial/settings/master/grant/shift/restore actions and no historical replay. Prior staging company flags were not re-attested in this public-only17Nov check; no changes were made. Credentials, raw snapshots, tokens and fixture IDs remain private/ignored.

## Remaining acceptance boundaries

Full actual Next+PostgreSQL browser workflow and external OCR/registered production IdP/third-party MCP-client qualification remain unperformed. GitHub branch enforcement was not changed or certified by these tests. This candidate clears the reported defect retest; it does not grant AgentBridge activation or customer-launch approval. Keep existing-company Inbox OFF/draft-only ON/posting-stop ON during owner release and independent live qualification.

Reproduce with locked QA/product dependencies, exact product pin and `node scripts/agentbridge-v274-review.mjs` lanes product/auth/service/permissions. Database lane additionally requires NEW guarded loopback PostgreSQL16 `bookone_qa_runtime`, private `QA_RUNTIME_ADMIN_URL` and `QA_RUNTIME_ISOLATION=ephemeral-local-postgres`, then existing runtime schema preparation. Database tests truncate only that disposable fixture; never target staging. Recovery cases execute last. See sanitized receipt and `handoffs/HANDOFF-AGENTBRIDGE-V274-RELEASE.md`.
