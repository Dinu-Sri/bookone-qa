# Shared control contracts

Generated from workflows/control-contracts.json. These are reusable obligations, not executed cases or Cartesian-product coverage. Resolve applicability per journey and bind exact inputs before execution. Each case remains independently traceable.

## CTL-ACTOR — Verify actor and configuration

Fresh intended login/session identity; role, tenant, entity/domain, module, location/brand, tax/costing/approval/clock settings verified. Names/sidebar alone do not identify actor.

Specification draft; execution not run.

## CTL-TENANT — Known foreign record denial

Run valid own positive and known existing foreign record/object with foreign positive. Cover read/write/export/cache/file boundaries. No foreign data or cross-tenant business mutation.

Specification draft; execution not run.

## CTL-ROLE — Effective role/module/scope

Own authorized same-action positive; Viewer/revoked/suspended/restricted role denial on real record. No denied financial/document/stock/allocation/business CREATE effect; telemetry policy separate.

Specification draft; execution not run.

## CTL-LOCK — Dates and closed periods

Try before/on/after configured period boundary with actual server check, stale form and correction path. Invalid/locked dates do not post; source history retained.

Specification draft; execution not run.

## CTL-RETRY — Intent identity and ambiguous response

Double click/reload/back/timeout after commit; inspect persisted state before replay. At most one accepted effect per declared identity; different-key duplicate policy explicitly reviewed.

Specification draft; execution not run.

## CTL-RACE — Independent concurrent connections

Contend for final stock/capacity/balance in isolated infrastructure. Assert both results and persisted conservation; Promise.all on one fake transaction does not prove a race.

Specification draft; execution not run.

## CTL-FAULT — Durable boundary atomicity

Ephemeral approved fault at each relevant header/line/stock/journal/allocation/object/audit boundary. Assert rollback or explicit resumable contract, preserve first failure; no shared staging fault injection.

Specification draft; execution not run.

## CTL-HISTORY — Snapshots and configuration transition

Rename/reprice/reclassify/toggle settings after posting, reopen stale draft and inspect history/print/export. Issued facts unchanged; changed draft policy explicit; record required compatibility.

Specification draft; execution not run.

## CTL-REPORT — Independent readback and reconciliation

Reload persisted records and reconcile exact account/amount/tax/date/tenant/domain/location, stock quantity/value, AR/AP/deposit/fleet, P&L/BS/as-of and source/audit links as applicable.

Specification draft; execution not run.

## CTL-UI — Truthful form and recovery

Required fields, invalid input, browser submit variants, retained errors/inputs, busy overlay clearing, read-only receipt recovery and keyboard/navigation. Route load or screenshot alone is not correctness.

Specification draft; execution not run.

## CTL-FILE — Files and exports

Applicable record attachments, private object authorization before signing, actual bytes/MIME/limits, safe text export, replacement failure and orphan cleanup; exact thresholds pinned from supported configuration.

Specification draft; execution not run.

## CTL-TAX — Tax and legal applicability

Confirm stored classifications, registration, entity/framework, effective source date and expert decision. Synthetic rate arithmetic does not certify legal eligibility; unknown support blocks affected acceptance.

Specification draft; execution not run.

## CTL-UPGRADE — Prior-version preservation

Actual prior-release golden records/files upgraded under supported migrations; semantic counts/balances/identity and files preserved. Fresh current schema alone is not upgrade evidence.

Specification draft; execution not run.

## CTL-BOUNDARY — Data boundaries and precision

Explicit zero/negative/at/below/above monetary/quantity/date/length limits, Unicode/whitespace and unsupported enums. Use exact supported bounds; no invented normalization or money from malformed input.

Specification draft; execution not run.
