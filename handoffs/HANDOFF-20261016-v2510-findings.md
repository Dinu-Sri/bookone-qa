# Coding-agent handoff — v2.5.10 independent QA

Repository handoff instruction (owner, 2026-10-16): all reviewed, sanitized QA handoffs and documents go through this repository. Return a detailed message with repository links for the owner to relay to the coding agent. Publication of this checkpoint is explicitly authorized; the earlier automatic review block is resolved by that instruction. PR #34 remains draft; no merge or deployment is authorized by this publication. Credentials, raw evidence and detailed private security reproduction remain excluded.

**Not customer-ready.** Product `81a505c4e39c71f5019eea5de0bc7c5fffc50a1f`. Read [run](../runs/RUN-20261016-v2510-independent-retest.md), [BUG0054](../bugs/BUG-0054-restricted-company-settings-bootstrap.md), [BUG0055](../bugs/BUG-0055-restricted-platform-company-positive.md), and [bounded042 investigation](../runs/INV-20261016-migration042-security.md). QA PR34 draft; no product edits/merge/deploy by QA.

## What is independently proven

Unchanged303 campaign assertions pass; independent129PG pass with44migrations. Real compiled Next/BetterAuth credential HTTPS23pass/2fail/1blocked. Owner13/13; restricted10/2/1. BUG0053 own-invoiceHTTP102 now passes200 for Owner/Viewer/foreignOwner with correct roles. Existing-foreign denial, logout/stale replay, receipt rendering, Viewer/foreign payment denials and legitimate Owner/legacyOwner money positives pass. Both roles finish paid200/due400/fourjournals/threeallocations. OriginalRT060/061/062 and all original financial expectations unchanged.

## Fix next, without weakening controls

1. **BUG0054/P1:** Company/details Owner positive fails and tax Owner page unavailable. Inspect getCompanySettingsData→ensureMembership before its tenant callback. Existing membership must remain visible in authoritative context; reads must not manufacture/upgrade membership. Preserve Viewer profile/tax write denial and same-form Owner positives. Database row-policy insert errors support this diagnosis; correlate actual requests before asserting exact cause. Add fresh/switch/existing/voided membership and non-owner positives/denials.
2. **BUG0055/P2:** Platform Admin200 lacks known company positive; normal Owner/Viewer307 denies pass. Inspect requirePlatformAdmin→loadCompanyRows unscoped tenant reads. Implement narrowly authorized platform operations; an empty/missing list is not acceptance. No blanket BYPASSRLS, global tenant state or reduced foreign-record expectation. Extend list/count/detail/filter positives with ordinary-role denies.
3. **Migration042 security:** bounded negative-control identity result fails in exact-migration minimal PGlitePG17.5 probe; full-schemaPG16 and app exploitation/deployed exposure not established. Review secure object resolution, function ownership/search path, PUBLIC execute and actual role/TEMP/schema grants. Detailed reproduction is private. Existing installs need forward migration, not editing historical042 alone. Preserve real lookup/session/legacy/voided/isolation positives. See sanitized investigation for limits/reference.

Use product AGENTS/QA_CHANGE_CONTRACT, bump VERSION and document actual diff/compatibility. Do not label source-string contracts as runtime repair verification. Independent QA will pin the new candidate and rerun unchanged303/129/26 before adjacent acceptance; no automatic bug closure.

## Exact execution handles

QA implementation `9a8aeff926c500686af8d97c418bd13583e28b31`; tested merge `eb7e22daf495e76d61e15f2dbe4ee6f6d1f4a9b7`; content `6df4f542d0b18ee0fc8df864e44e82025736d32aa78f92c5b850d8daa476490c`. Corrected campaignCI38840967869/job116780703560 is terminal with303pass and intentional nonzero full-acceptance gate. PGCI38840967888/job116780703486 terminal success129. HTTPCI38840967841/job116780703299 terminal failure23/2/1. No process remains to wait on. First metadata-blocked campaign and first actualPG/HTTP runs remain immutable; all links in run. Documentation-only final checkpoint is not a new executed fingerprint.

## Independent work and live continuation

Live v2.5.10 is owner-reported, not independently stamped; Browser extension failed twice before page access. No staging mutation. New PC lacks ignored old credentials/checkpoints. Verify supported browser/actual build and freshly signed-in actor before any role mutation. Preserve P257 cash950/AR150/AP400/stock7/value420/profit120/sixjournals/debits2750; never replay its payments. Pending exactP258 module/access changes remain unapproved/untouched.

Next QA scope beyond fixes: actual cashbook entity/domain/period/export outputs affected by diff, Company Admin/adjacent settings/scopes, then physicalGRNI/cost/partials/locks/roles and remainingservice/digital/rental/mixed/files/history. Full137workflows62partial/75unbound/0accepted, policies/expertRF01–10, real storage, historical upgrade/operator recovery, performance/operations/user acceptance and frozen release gates stay open. Actual encrypted A→new-empty-B backup/restore LAST. Do not use passing303 as customer-readiness percentage.

## Subsequent browser recovery

2026-10-16 at09:20Asia/Colombo: connected Chrome page reading and screenshot capture recovered; actual live UI v2.5.10 ·81a505c observed. [Recovery record](../runs/RUN-20261016-browser-connection-recovered.md). No fresh QA fixture sign-in, click/type test or business mutation yet; prior isolated test outcomes/findings unchanged.
