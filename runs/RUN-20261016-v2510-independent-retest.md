# v2.5.10 independent retest — 2026-10-16

Repository handoff instruction (owner, 2026-10-16): all reviewed, sanitized QA handoffs and documents go through this repository. Return a detailed message with repository links for the owner to relay to the coding agent. Publication of this checkpoint is explicitly authorized; the earlier automatic review block is resolved by that instruction. PR #34 remains draft; no merge or deployment is authorized by this publication. Credentials, raw evidence and detailed private security reproduction remain excluded.

**Not customer-ready.** Product `81a505c4e39c71f5019eea5de0bc7c5fffc50a1f`; QA implementation `9a8aeff926c500686af8d97c418bd13583e28b31`, tested PR merge `eb7e22daf495e76d61e15f2dbe4ee6f6d1f4a9b7`, content hash `6df4f542d0b18ee0fc8df864e44e82025736d32aa78f92c5b850d8daa476490c`. PR34 remains draft; no merge/deploy by QA. All listed execution jobs terminal.

## Candidate, intent and environment

Owner reports v2.5.10 live. Actual browser deployment stamp not independently observed: selected extension tab1455173212 connection failed twice with session-closed/internal error before page access. No cloud browser substitution, staging writes, role grant, reset or financial replay. Old workstation private credentials/checkpoints absent. Last independently observed live stamp remains v2.5.8/cf35da1. Current compiled isolated server verifies v2.5.10 ·81a505c, not staging deployment.

[Intent](../changes/CHG-20261016-v2510-independent-retest.md) precedes mutation. Actual diff matches the GUC fix in getTenantInfo and three cashbook tenant reads; no migrations/dependency/lock changes. Product source-contract tests are not route acceptance. Graph tools unavailable; exact source checkout used. Rulebook1.0.0/hash abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc; BR-SEC-01/02 and RB-UI-01 apply. Expert approval remains pending.

CI Node22.23.3, PostgreSQL16.15; all44 migrations applied on fresh empty loopback bookone_qa_runtime. Existing fixture guards, serial resets and real Next/auth/TLS boundaries retained. Product lock a16590128c58e226e3c1c4798397d892e6dec6cc07f5b9473f95622afbc7676e; Next15.5.19/BetterAuth1.6.20; final isolated build kMVogrXnkNXTgvtmkze_h. Full fingerprints are in immutable JSON.

## Preserved first attempts

Initial QA2ae39d9a/tested merge de608eee/content8af0bb8e9b7b66eca2d72ff30ebdc60b249c55b393b85d40003b6c6978b3c8cb advanced product-ref but missed two declarative archive candidate stamps. [Preflight](RUN-20261016-v2510-first-preflight.md) and [first campaign](CAMP-20261016-023121461-fc6c8b.json), CI38840800746/job116780175144:0passed/0failed/303blocked. qa-check prerequisite failed; no product assertion executed there. Archive CI38840800352/job116780174179 likewise stopped before helpers. Initial source/validation checks failed at this same metadata prerequisite, not product assertions.

Independent first PG CI38840800404/job116780174846 [record](RUN-2026-10-16T02-31-33-832Z-runtime.json):129pass. First HTTP CI38840800383/job116780174292 [record](HTTP-2026-10-16T02-31-32-031Z-d5bd48.json):23pass/2fail/1blocked. These lanes did not depend on the stale archive stamp validator. Metadata correction changed only productSha/requiredLiveStamp in two candidate declarations and preserved all assertions. A new QA fingerprint was used; no failure erased.

Local installation initially used environment pnpm11 rather than project pnpm9, causing package-manager setup failures; exact corepack pnpm9.0.0 corrected that. Local Node24.19.0 preflight and98 unit checks pass as separate non-acceptance checks; candidate evidence below is CI Node22. Local PostgreSQL unavailable; package installation could not initialize due container identity restrictions. No substitute local runtime claimed.

## Corrected candidate results

| Boundary | Evidence and terminal handle | Executed result |
|---|---|---|
| Coordinated campaign | [JSON](CAMP-20261016-023313259-9b11b6.json), CI38840967869/job116780703560 |303passed/0failed/0blocked/0skipped/0flaky/0not-run |
| Independent PostgreSQL | [JSON](RUN-2026-10-16T02-33-15-821Z-runtime.json), CI38840967888/job116780703486 |129passed;44/44 migrations |
| Compiled Next HTTPS | [JSON](HTTP-2026-10-16T02-33-23-263Z-49897a.json), CI38840967841/job116780703299 |23passed/2failed/1blocked;setup complete |

Campaign303 contains98retained units+60source+129PG+16archive helpers. Companion129 is independent execution of the same runtime scenarios, not129 additional business workflows. executedGate passes, but campaign workflow deliberately exits nonzero for62partiallybound/75unbound/0accepted of137 full workflows and10unapproved policy records. No passing percentage implies readiness.

Separate QA validation CI38840967851, sourceA38840967836, sourceB–F38840967843 and archive helpers38840967848 pass. HTTP failure remains real and red.

Owner-DB HTTPS13/13pass. Restricted HTTPS10pass/2fail/1blocked. HTTP102 now passes own Owner/Viewer/foreign-Owner invoice200 and correct roles/no foreign-line exposure. HTTP103 existing-foreign denial passes; HTTP106logout/stale replay passes; HTTP107 receipt150 renders without duplicate posting; HTTP108/109 exact real payments, foreign/Viewer denials and legacy no-promotion/Owner repair pass. Both lanes finish paid200/due400/fourjournals/threeallocations. RT060/061/062 remain passing with original600/800/800 cumulative,600/200/0income and Starter PO60/Inventory-POS-off expectations unchanged.

## New adjacent findings

- **BUG-0054, P1 at required restricted-DB boundary:** HTTP104 Owner company/details page fails its200 positive and no rendered form exists; HTTP110 tax owner page unavailable, so its Viewer-denial/Owner-save assertions block. Both use getCompanySettingsData. Exact source calls ensureMembership after requireTenantContext returns, before its withTenantContext callback; unscoped membership is hidden and insert attempted. CI database logs contain42501 tenant_memberships RLS insert failures. This is source-supported cause; no request-correlated SQL trace obtained. Do not call these blocked settings writes secure denials.
- **BUG-0055, P2 at restricted-DB boundary:** HTTP105 normal Owner/Viewer Control Room denials pass; verified platform Admin receives200 but fails the known seeded foreign-company positive. Owner-DB same positive passes. listPlatformCompanies/loadCompanyRows query tenants outside a scoped privileged read after requirePlatformAdmin; RLS visibility is the source-supported explanation. A200 shell is not a working company listing. No cross-tenant disclosure demonstrated.
- **INV-20261016-042:** separate exact-migration minimal-schema PGlite/PostgreSQL17.5 negative control fails identity stability. This is not full-schema PG16, real session exploit or deployed DB exposure. Privileged lookup grant/owner/search-path review remains unaccepted. Detailed reproduction kept private and owner informed in this session; [sanitized finding](INV-20261016-migration042-security.md). Need full PG16 positive/negative and actual role/ownership/temp/schema grants before broader attribution.

BUG0053 original own-route reproduction is verified fixed in the isolated real-credential boundary. Its broader route/security acceptance remains constrained by0054/0055 and042 investigation. BUG0051 company/tax restricted guards remain unexecuted; sales/purchase/inventory restricted settings positives and denials pass. BUG0052 current original credential/payment reproduction now passes under both DB boundaries. BUG0044 policy links remain open. No global BYPASSRLS/GUC workaround or altered expectation.

## Remaining work and cleanup

No staging data created or changed; no shared DB touched. CI ephemeral services were stopped by terminal jobs. Local ignored source/dependencies/private probe remain; no public credentials/raw trace/archive. Existing P257 anchors stay cash950/AR150/AP400/stock7/value420/profit120/sixjournals/debits2750. P258 module-save/access approvals remain unresolved and untouched.

Coding handoff: [exact next actions](../handoffs/HANDOFF-20261016-v2510-findings.md). Add request-specific sanitized diagnostics for0054/0055, fix securely, then new-candidate unchanged303/129/26. Actual cashbook domain/period/export and wider Company Admin/settings/physical GRNI/cost/partial/lock outcomes were not executed in this wave; they remain next independent work. Restore browser connection, verify stamp/fresh actor before supported live tests. Service/digital/rental/mixed/files/history, real storage, upgrade/operator recovery, expert RF01–10 and all launch gates remain incomplete. Actual encrypted A-to-new-empty-B backup/restore LAST.
