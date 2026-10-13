# Deep batch programme: executable foundations and acceptance backlog

Canonical machine register: [coverage.json](../batches/coverage.json). Policies: [policies.json](../memory/policies.json). Startup: [SESSION.md](../SESSION.md). This programme is committed memory; chat context is not required to recover it. Original83 lifecycle tasks are preserved; additional configuration/file tasks and partial PostgreSQL implementations are explicitly indexed. Source, PostgreSQL and browser acceptance are separate. A specification is not an implementation or a passing test. All batches remain unaccepted for release.

Current extension: [PostgreSQL guide](POSTGRES_RUNTIME.md), [runtime manifest](../batches/runtime.json), [configuration/upload rules](CONFIGURATION_AND_UPLOAD_COVERAGE.md), [42-row matrix](../batches/configuration-matrix.json), and RUN-12.60 source cases and18 PostgreSQL cases are executable;92 lifecycle tasks include partial implementations and open layers. Matrix rows are specified, not executed business journeys. Do not add overlapping pure-calculation tests in place of actual commands/settings/actor/files.

## Run and resume

```
pnpm session:start
pnpm batch:coverage
pnpm product:prepare
pnpm check
pnpm batch:plan --batch B
pnpm batch:run --batch B --seed 261013 --profile quick
pnpm batch:run --batch B --seed 7281 --profile broad
pnpm batch:resume RUN-YYYYMMDD-HHMMSSmmm-abcdef
pnpm batch:export RUN-YYYYMMDD-HHMMSSmmm-abcdef
```

Choose A through F with --batch; A remains the default. Resume/export resolve the original batch from saved state; old A records remain readable. Manifest changes require the original QA revision for export and a new run for testing. No silent switch from B to A and no reuse of results across source/QA/manifest/fixture changes. Current lanes only restart isolated fixtures. Never resume live payments by replaying every earlier command.

Quick: 100 examples per generated arithmetic property and 30 model/sequence samples. Broad: 1000/200. Actual counts stop early at a failure and shrink; sample budgets are not executed transaction counts. Use the private failing seed/path to replay. Distinct source contracts can pass while mandatory lifecycle tasks remain not implemented. Coverage output intentionally does not compute a misleading global pass percentage.

CI runs independent source batches without staging credentials. Harness validation must pass; product regressions remain red. Source green does not certify browser, runtime RLS, dimensions, audit content, concurrency, upgrade or restore. Product promotion integration remains owner/coding-agent work.

## Layers and order

1. Source contracts: exact independent account/amount sets, integer-cents calculations, portable parsers, bounded type/settings combinations. Execute real pinned product code. Do not substitute a copied product implementation as oracle.
2. Persisted single-worker workflows: call real product commands against full isolated PostgreSQL migrations with production-like DB permissions; independent models compare documents, stock, bookings, allocations, journals and audit after every transition.
3. Negative/race/failure cases: real existing own/foreign tenant IDs, locked periods, invalid states, repeat keys, competing connections, fault injection and partial failures. Require exactly one accepted effect or zero denied effects, according to approved policy.
4. Representative live browser acceptance: freshly verified roles, persisted reload, UI errors, keyboard/double submits, printing/files/exports; verify build before/after. A small representative journey set complements deeper isolated tests.
5. Historical upgrade/recovery: prior-release DB and files with immutable financial snapshots, full migrations, restart compatibility, isolated restore and measured RPO/RTO.

Development order is A runtime gaps + B lifecycle, then C and D, then mixed E and resilience F. Source contracts for all B–F can be developed immediately. A gate failure does not prohibit isolated test development; it blocks affected release acceptance. First-launch scope is unresolved; all profiles remain in the specification.

## Business fixtures and exact anchors

Business type is separate from legal entity, tier, modules, tax, roles, dimensions and book domain. Reuse BP-01 through BP-09 from BUSINESS_SCENARIOS.md. Each persisted worker owns a distinct isolated database or tenant with independent auth identities. Tenant A/B use similar display names/document numbers plus distinct private sentinel records so false isolation passes are detectable.

Fixed clock2026-10-13; baseline LKR/no tax/no discount; deterministic seeds. Two locations/brands; Owner/accountant/sales/cashier/storekeeper/Viewer/suspended actor where supported. Preserve unsupported-role/module gaps explicitly. Synthetic tax10% fixtures test arithmetic only, not legal/effective-date tax policy.

| Batch | Independent numerical anchor | Required persisted outcomes |
|---|---|---|
| B service/digital | Invoice600; receipt250 then350 | AR600→350→0; cash0→250→600; revenue600; physical stock/COGS0; exact allocation links/audit |
| C physical | Buy10 at60; sell2 at100; receive80; return1; receive20; pay vendor600 | Stock10→8→9; inventory600→480→540; AR200→120→20→0; AP600→0; net revenue100/COGS60/profit40 |
| D hire | Fleet20; reserve/dispatch10; return8 good+2 dirty; deposit1000; hire/service invoice700; apply700/refund300 | Owned fleet stays20; dirty units unavailable until wash release; deposit liability1000→300→0; AR700→0; no sale-style fleet COGS |
| E mixed | Hire500+service200+goods300+digital100 | Total1100; sold goods COGS180; hire fleet ownership unaffected; product-specific revenue and control accounts |
| F history/recovery | Golden dataset includes posted/paid/partial/archived/draft/locked records and attachments | Accepted facts/links/checksums unchanged across supported upgrade/restore; permissions and totals remain usable |

These anchors are proposals for pending workflow-policy decisions where noted in CORE_RULES. Do not invent refund, forfeiture, cost-layer, tax or rounding policy to force a pass. General financial/access/data invariants remain mandatory. Account codes must be bound to fixture CoA rather than assumed present in every live tenant.

## Current executable boundaries

- B-001–003 call real invoice/return builders for service/digital credit/cash, synthetic tax/discount and nonphysical credits. B-004–012 use real allocation/permission code with an independently seeded invoice and embedded SQL. They do not execute quotation/conversion/commercial creation. Session loading and operational logging are fixture boundaries; accounting permission assertions remain real. Full migrations/FKs/unique/RLS/dimension scope are not exercised.
- C-001–008 test real GRN/bill/cash purchase/return/opening/adjustment/sale posting builders. No live SKU quantity, costing layers, receipt commands or product master mutation is proven by these calculations.
- D-001–008 test real inclusive-date overlap/padding/capacity, invoice timing, deposit suggestions, hire posting and default reconciliation. Deposit suggestion is not a deposit liability posting. No booking/dispatch/return/wash/repair/payment lifecycle is proven.
- E-001–003 compare complete mixed postings, line permutations and all32 bounded product/tender/synthetic-tax combinations. This is exhaustive for those three factors only; it does not cover real entity/tier/module/role combinations.
- F-001–004 test portable amount/sign parsing, fingerprint isolation and calendar validity. Repeated fingerprint equality does not prove persistent duplicate-import suppression. Migrations, imports/reconciliation, restore and stress tests are planned, not implemented.

The remaining task IDs B-101 onward through F-118 carry concrete required outcomes in coverage.json. They are separate from existing S-NNNN inherited catalog IDs. Never silently mark the inherited 747 scenarios reviewed because new batches exist. Map inherited IDs only after independent assertion review.

## Model and adapter contract for next agents

Each command adapter must return accepted/denied/error plus persisted IDs. The independent model tracks integer money, document status, remaining balance, allocations, stock by SKU/location/cost layer, fleet owned/committed/dispatched/return buckets and deposit liability. Expected journal line sets and arithmetic must not be calculated by product helpers. After every accepted command, compare all affected records/reports and links; after every denied command, compare a before/after snapshot including audit according to policy.

Generated sequences select legal commands from model preconditions and deliberately invalid commands with expected denials. Do not avoid inconvenient states merely because product code fails. Keep failure shrinking/replay information privately and publish sanitized minimal rule outcomes. Single concurrency simulation in one JS thread is not a real DB race; use separate connections/processes with an explicit barrier.

Control sensitivity with representative mutations in an isolated source copy. Current sensitivity checks cover wrong control account, missing physical COGS and exclusive rental endpoint. This is a limited demonstration, not complete mutation coverage. Every new critical workflow assertion needs its own demonstrable failure sensitivity before becoming a gate.

## Change awareness, evidence and memory

Per candidate: read product CHG, compare actual diff with the last verified baseline (none accepted yet), use graph discovery/tracing plus pinned source verification. Always run A and affected/dependent batches. Shared posting/auth/DB/settings changes broaden selection; absent graph edges are not proof of no impact. Snapshot relevant non-secret fixture/config identity, schema checksums, image digest and actual runtime role for acceptance. Unknown identities remain explicit.

Before ending: export immutable runs; classify product versus harness/environment/policy failures; update bugs, STATUS, programme.json, roadmap and any implemented coverage tasks with evidence. Never overwrite first failures. Unfinished or policy-blocked tasks remain visible. Record exact next task and required source symbols/fixtures. Secrets/raw logs stay ignored; private evidence requires private backup separately from public Git.

Future recovery execution requires authorised isolated infrastructure; current staging-data authorization does not authorize production restores or shared-service fault injection. No automatic shared staging reset is part of these batches.
