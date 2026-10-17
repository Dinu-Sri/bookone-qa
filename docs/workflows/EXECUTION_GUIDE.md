# How humans and agents execute a workbook

The books are maintained specifications, not proof of completion. Read PROTOCOL, applicable rule revisions and current STATUS/SESSION before selecting scope. Do not turn a source-observed feature or draft case into an executed pass.

## Bind a case before running it

Use WORKFLOW_RUN and record the book/journey/case revisions and content hashes. Each case inherits its journey fixture; its Given clause narrows or replaces only the stated facts. Cases with contradictory starting states require separate clean fixtures. Sequential cases require an explicit predecessor state; do not reuse a contaminated scenario accidentally.

Bind these fields for every selected case:

| Binding | Required record |
|---|---|
| Candidate | Product commit/image/version/schema/config; QA commit; rulebook and library/workflow versions/hashes; start and end build |
| Actor | Nonsecret alias; fresh-login/verified identity evidence; job/overrides/ceiling; active tenant, domain, module and scope |
| Fixture | Run-owned aliases and private actual IDs; opening quantity/value/layers, bank/AR/AP/deposit and documents; clock/timezone; actual settings |
| Action | Exact supported UI/command/HTTP route, intent key, inputs and expected allowed or denied transition |
| Expected changes | Independent journal account/side/cents, date/tax/dimensions; stock/fleet state, document balances/status and remaining source quantities |
| Expected unchanged | Enumerated snapshots of prior records, other products/parties/tenants/domains/scopes and prohibited effects |
| Evidence layers | Required actual command/persisted state, credential authorization, browser reload/print/export, reports, audit/history; missing layer stays missing |
| Recovery | Persisted-state inspection after ambiguity; safe read-only continuation; no blind payment replay |
| Disposition | Passed/failed/blocked/not-run/skipped/flaky/inconclusive, first failure, bug/policy/environment classification and next action |

Account names in worked examples are account purposes. Bind actual approved CoA codes/types for that tenant, with own/inactive/foreign controls. Signed expected ledgers are debit positive/credit negative; posting lines use positive integer cents. The validator checks independent fixture arithmetic; it never calls product accounting helpers.

## Resolve shared controls

Each journey names ten common control contracts. Resolve applicability and concrete inputs for each; add FILE/TAX/UPGRADE/BOUNDARY where relevant. A read-only step may have no posting or idempotency effect: state why, rather than claim a denial/race executed. Numeric thresholds, file limits, grace periods, role overrides and policy gaps must be pinned before affected acceptance.

The 266 authored cases are not 266×14 executed combinations. Mandatory critical intersections are separately selected and recorded. Use pairwise sampling only for documented lower-risk combinations after critical money/access/conservation/history checks are explicitly planned. Preserve known regression identities and all 92 lifecycle tasks; task-to-journey mapping does not replace existing adapters or assertions.

## Execute a normal transition deeply

For a physical invoice, confirm stored class/quantity/cost/tax/settings, preview exact totals, post, reload source and ledger, reconcile journal and stock layers, inspect source balances and audit, receive/credit/return only as specified, and verify print/export/history. Filling the form once is insufficient. Repeat relevant boundaries from FIELD_MATRIX and the journey's cases. Rental additionally needs bookings/buckets/deposit reconciliation; digital additionally needs a verified delivery contract if full fulfillment is claimed.

In a denial/failure, compare pre/post business snapshots; zero visible UI change is insufficient. Run same-action own authorized positive controls before interpreting missing permissions/foreign denials. Use independent connections for actual races. Faults, migrations, load and recovery need authorized isolated infrastructure; no stress/fault injection against shared staging.

## Handle uncertain policy or missing support

Open WORKFLOW_EDGE_CASE or RULE_CHANGE as appropriate. Mark affected scope blocked/unsupported/not-run and continue independent supported cases. Advance/milestone/digital delivery/FX/mixed tax/charges and expert-pending statutory cases must not be passed by adopting current output. Ordinary deterministic invariants remain testable while these decisions are pending.

## Close a run and maintain the library

Reconcile document allocations, GL/control accounts, stock quantities/valuation, fleet disposition, deposits, cash, tax and reports with exact date/scope as applicable. Preserve first failures; a later fix creates a new fingerprinted run. Update STATUS/SESSION and sanitized handoff links, with actual created data/cleanup and remaining gates. Candidate acceptance is a separate independent decision.

For new feature/edge definitions, update canonical JSON, increment affected revisions, record before/after examples, rule impacts, direct/dependent journeys and compatibility, regenerate and validate. v1 new cases remain unbound/not-run; an executable-binding extension needs reviewed real adapter/test links and schema validation. Do not store mutable live outcomes in the canonical definitions. Actual encrypted backup/restore remains LAST.
