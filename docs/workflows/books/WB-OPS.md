# WB-OPS — Onboarding, files, history and operational continuity

Generated from workflows/casebooks/WB-OPS.json. Edit JSON and run pnpm library:render. Revision 1; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-01, BP-02, BP-03, BP-04, BP-05. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-OPS.J01 — Fresh signup, company bootstrap and first transaction

**Fixture:** New synthetic supported signup; no existing company trading; plan/country/domain chosen explicitly.

Rules: BR-SEC-02@1, RB-CONFIG-02@1, BR-DAT-02@1. Retained tasks: F-107, E-103, E-116.

Entities: users, tenants, tenantMemberships, accounts, companyProfiles. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-OPS.J01.C01 — Fresh company creation

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: New account authorized by owner staging scope.
- Action: Complete supported signup/onboarding.
- Expected: Correct Owner membership, CoA, job/module defaults and chosen entity; zero trading; record actual created versus merely prepared.

### WB-OPS.J01.C02 — First included operation

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Fresh loaded Owner; sales included.
- Action: Post completed service100 and receive100.
- Expected: AR0/bank100/revenue100; included module works without manual hidden repair; broken bootstrap retained as failure.

### WB-OPS.J01.C03 — Add company with custom existing tenant

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Tenant A has custom flags and history.
- Action: Add empty tenant B and switch backA.
- Expected: B correctly bootstrapped; A flags/history untouched; active actor verified on both.

### WB-OPS.J01.C04 — Invalid or partial onboarding

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Missing required entity/profile data.
- Action: Submit then reload/resume.
- Expected: No falsely completed unusable company; recoverable explicit state; no duplicate memberships/CoA on retry.

### WB-OPS.J01.C05 — Company type versus business model

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Physical sole-proprietor and service limited company.
- Action: Choose supported profiles independently.
- Expected: Entity legal/domain ceiling separate from product business type; unsupported combination explicitly explained.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/entity-onboarding.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/entity-onboarding.ts)
- [apps/web/src/lib/platform-modules.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/lib/platform-modules.ts)

## WB-OPS.J02 — Receipt, product image and rental photo lifecycle

**Fixture:** Synthetic small valid supported image/PDF; hash known privately; own expense/product/event and real foreign records.

Rules: RB-FILE-01@1, RB-FILE-02@1, BR-SEC-01@1. Retained tasks: F-119, F-120, F-121, F-122, F-123, F-124.

Entities: inventoryProducts, rentalReturnPhotos, businessDocuments. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-OPS.J02.C01 — Authorized upload and readback

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Own valid record; supported synthetic bytes.
- Action: Upload/reload/download own receipt/image/photo through each applicable adapter.
- Expected: Bytes or documented transform/hash, MIME, actor, tenant, record link and metadata agree; upload does not post extra money.

### WB-OPS.J02.C02 — Wrong magic or truncated bytes

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Filename.png with harmless text or truncated fixture.
- Action: Upload.
- Expected: Validate actual content/bounds; reject without replacing old valid object or creating dangling DB pointer.

### WB-OPS.J02.C03 — Size, dimension and empty bounds

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Below/at/above actual documented byte/pixel limits; zero-byte fixture.
- Action: Upload each in isolated bounded tests.
- Expected: Explicit supported limits enforced; noncrashing errors; no unbounded decoding; exact limits discovered/pinned before run.

### WB-OPS.J02.C04 — Replace with storage failure

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Existing valid attachment; injected isolated storage/DB failure.
- Action: Attempt replacement then retry/cancel.
- Expected: Old valid attachment remains or recoverable explicit state; no published dangling link/orphan accumulation; cleanup scoped.

### WB-OPS.J02.C05 — Foreign link and stale permission

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Real foreign record/object plus role revoked after valid upload.
- Action: Attempt attach/download/sign/export.
- Expected: Authorization checked against tenant/record/current scope before signing; own current positive control works.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/upload-receipt.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/upload-receipt.ts)
- [apps/web/src/app/actions/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/inventory.ts)
- [apps/web/src/app/actions/rental-bookings.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/rental-bookings.ts)

## WB-OPS.J03 — Fresh schema, prior-release upgrade and compatible rollback

**Fixture:** Ephemeral isolated PostgreSQL16 and synthetic golden DB/files; current and prior product SHAs explicitly pinned.

Rules: BR-DAT-01@1, BR-DAT-02@1, BR-SEC-01@1. Retained tasks: F-107, F-108, F-109, F-111.

Entities: tenants, businessDocuments, inventoryCostLayers, journalLines. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** This is an isolated execution plan. No migrations, restores or production operations are authorized by publication itself.

### WB-OPS.J03.C01 — Fresh migrations

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Empty authorized isolated DB.
- Action: Apply complete migration chain and bootstrap first transaction.
- Expected: Schema/version/RLS runtime roles and basic finance work; direct owner migration success alone not nonowner business proof.

### WB-OPS.J03.C02 — Upgrade populated prior release

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Golden invoices/allocations/stock/rental/files exist.
- Action: Upgrade through actual supported migrations.
- Expected: Counts/checksums and semantic balances/source links preserved; authenticate roles and read/download after upgrade.

### WB-OPS.J03.C03 — Interrupted migration

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Ephemeral fault before/after designated migration boundary.
- Action: Restart via supported procedure.
- Expected: No silently half-version accepted service; safe idempotent completion or documented recovery; first failure retained.

### WB-OPS.J03.C04 — Code rollback compatibility

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: New schema/data and prior app version.
- Action: Run explicitly supported rollback scenario.
- Expected: Code rollback compatibility verified separately; never assert data restored merely by reverting image.

### WB-OPS.J03.C05 — Unsupported downgrade

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Prior app cannot safely read new data.
- Action: Attempt downgrade plan review.
- Expected: Explicit operational block and recovery requirements; no destructive table drop/recreate or unapproved production restore.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [packages/db/src/schema/business-documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/business-documents.ts)
- [packages/db/src/schema/inventory.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/inventory.ts)

## WB-OPS.J04 — Audit, release evidence and fixture cleanup

**Fixture:** Synthetic run-owned tenants; exact product/QA/config/fixture fingerprints; public artifacts allowlisted.

Rules: BR-AUD-01@1, BR-DAT-01@1, RB-GOV-01@1. Retained tasks: F-115, F-116, F-117, F-118.

Entities: auditLog, transactions, tenantMemberships. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-OPS.J04.C01 — Attributable accepted event

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Own invoice100 posted by known actor.
- Action: Inspect audit and sanitized handoff.
- Expected: Who/what/when/reason/correlation/source retained; no credentials/cookies/customer records/raw trace in public content.

### WB-OPS.J04.C02 — Missing or cancelled release check

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Required same-SHA check absent/skipped/cancelled.
- Action: Evaluate release gate in separate authorized setup.
- Expected: Fail closed; green discovery or workbook metadata cannot promote candidate.

### WB-OPS.J04.C03 — Artifact mismatch

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Tested image/config differs from deployment.
- Action: Assess acceptance.
- Expected: Invalidate affected acceptance; preserve original record; require exact artifact revalidation.

### WB-OPS.J04.C04 — Bounded load

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Explicit isolated infrastructure and agreed budget.
- Action: Measure representative reads/writes plus integrity.
- Expected: Record p95/errors/integrity with declared workload; no claim from average-only result or shared staging stress.

### WB-OPS.J04.C05 — Cleanup twice

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Run-owned unneeded fixtures identified; issued history retained per policy.
- Action: Execute permitted cleanup then repeat.
- Expected: Idempotent and tenant/run-scoped; other runs and required first-failure evidence survive; no broad reset.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/record-entry.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/record-entry.ts)

## WB-OPS.J05 — Company archive and recovery — execution last

**Fixture:** Owner; synthetic completed business fixture; newly created operationally empty target; no real archives in Git.

Rules: RB-ARCH-01@1, RB-ARCH-02@1, RB-ARCH-03@1, RB-ARCH-04@1, RB-ARCH-05@1, BR-DAT-03@1. Retained tasks: F-110.

Entities: tenants, businessDocuments, inventoryStockLevels, settlementAllocations. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** Actual encrypted backup/restore remains LAST; no archive operation executed during workbook construction. Existing45 scenarios retain their original IDs and acceptance gaps.

### WB-OPS.J05.C01 — Export contract review

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Owner export capability; source golden identities.
- Action: Plan DB+files export only after other workflow execution.
- Expected: Preserve existing45 archive scenarios; this five-case summary does not replace them; private encrypted files/passwords never public.

### WB-OPS.J05.C02 — Empty-target restore precondition

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Target trading/nonempty or identity unknown.
- Action: Attempt restore selection.
- Expected: Refuse unsafe target; supported new empty tenant required; never merge/overwrite trading company.

### WB-OPS.J05.C03 — Semantic roundtrip

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Authorized isolated empty target and complete matched DB/files pair.
- Action: Execute actual encrypted restore LAST.
- Expected: Remapped IDs valid; journals/AR/AP/stock/layers/fleet/deposits/source links/files/roles and own-login match expected semantics; checksums alone insufficient.

### WB-OPS.J05.C04 — Wrong pair, password or interruption

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Wrong files pair/secret or isolated interrupted restore.
- Action: Exercise retained archive scenarios under supported recovery.
- Expected: No falsely complete target or leaked secret; explicit safe recovery; original source untouched.

### WB-OPS.J05.C05 — Operator recovery distinct

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Separate DR/RPO/RTO scope not authorized by staging data permission.
- Action: Assess broader recovery claim.
- Expected: Record as separate infrastructure requirement; tenant archive pass is not operator disaster-recovery certification.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [packages/db/src/schema/business-documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/db/src/schema/business-documents.ts)
