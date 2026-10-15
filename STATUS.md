## v2.5.6 first run completed; follow-up required

First292-case rerun290pass/2fail/zero skips/blocks; all19 previously failing cases pass. B-104 stopped on source-inconsistent credit fixture before financial observations; corrected to original description and0.5 at200 while preserving credit100 and all financial assertions. RT-047 historical Owner read after Sales-off fails; numeric denial observation added without changing expectations. Preserve first reports; new fingerprint/retest required. See changes/CHG-20261015-v256-independent-retest.md. No product bug closure or live acceptance yet.

## Candidate v2.5.6 independent retest in progress

Product source pinned d5377d89d2bd9d27c52a6e9c43376f2d03255bd0 /VERSION2.5.6; prior292 assertions unchanged. No new result or bug closure yet. Read changes/CHG-20261015-v256-independent-retest.md. Live page still displays v2.5.5 /8e1a2b8; browser/restore acceptance must wait for the matching stamp and pending access/popup dependencies. Historical candidate/results below remain immutable.

# BookOne customer-readiness status

Customer readiness is **not certified**. Candidate source **v2.5.5 / 8e1a2b8**; last observed live stamp matched, but new results are isolated source/runtime evidence, not deployed acceptance.

[Latest campaign](runs/CAMP-20261014-131128650-2e5b74.json): **292 assertions: 273 passed, 19 failed, zero skipped/blocked/flaky/not-run**. CI38569613302. [PostgreSQL](runs/RUN-2026-10-14T13-11-19-113Z-runtime.json):99/118 passed, no infrastructure failures. All98 retained units,60 source contracts and16 archive helpers pass. Original repaired repros retain expected outcomes; deeper adjacent paths fail.

Thirteen open finding groups across four coding handoffs:

- [Payment/archive](handoffs/HANDOFF-20261014-v255-adjacent-readiness.md): BUG-0031 batch partial effects, BUG-0032 key/payload false success, BUG-0024 current checksum omission.
- [Inventory](handoffs/HANDOFF-20261014-variable-cost-readiness.md): BUG-0033 original return-cost drift, BUG-0034 backdate policy adoption.
- [Sales/service/digital](handoffs/HANDOFF-20261014-sales-value-readiness.md): BUG-0035 discounted-credit excess, BUG-0036 supported VAT/style omission, BUG-0037 excessive discounts, BUG-0038 cumulative credit/cash over-refund, BUG-0039 cash-credit state, BUG-0040 revenue refund tender.
- [Roles/scopes](handoffs/HANDOFF-20261014-role-scope-readiness.md): BUG-0041 same-company restricted/no-read invoice detail, BUG-0042 scope-read failure permits forbidden branch write. Warehouse RT-051 now reproduced; same finding, no new group. Actual foreign-tenant positive/deny controls pass in this lane.

[Readiness ledger](memory/customer-readiness.json):137 defined workflows,62 partial bindings,75 unbound,zero fully accepted. Assertion counts are not a readiness percentage. Full physical/service/digital/rental/mixed/settings/roles/files/history/recovery scope remains. Rulebook1.0.0/hash fixed; expert RF-01-10 and operator recovery gates open.

Next: coding fixes for thirteen groups, deliberate candidate diff/pin review, then original and adjacent regression. Complete actual normal-role browser/physical-first and encrypted A-to-empty-B restore acceptance. Synthetic sessions/in-memory files do not prove credential/HTTP/browser/MinIO behaviour. No company-reset SQL or shared-staging stress.

Browser dependencies: exact synthetic Owner/Admin/Viewer recipient/role approval and Chrome popup dismissal pending. Automatic review rejected the new Admin grant; do not bypass. Only disposable source company created through supported flow; no new staging users/trade/stock/archive writes. Private journal/secrets retain setup; no production access or public credentials/cookies/raw logs/archives.

Read SESSION.md, AGENTS.md and memory/programme.json. Previous exact indexes retained in memory/history/STATUS-before-role-followup-20261014.md and SESSION-before-role-followup-20261014.md. Immutable first attempts remain authoritative historical evidence; historical pending notes are not current state.
