## Pending tax-fixture validity correction

Initial RT-035 stored unsupported product taxStatus taxable and did not explicitly store customer unregistered status. Corrected supported standard/unregistered values now asserted. BUG-0036 is provisional until fresh281-case execution; initial observations remain immutable. Ten other finding groups demonstrated. Read current sales handoff.

## Current sales-value evidence and follow-up

[First sales campaign](runs/CAMP-20261014-120513142-57ddba.json):280assertions265pass/15fail/0skip/0block, actualPG91/106. New lane3pass/7fail exposes six groups BUG-0035–0040; previous five groups still open. Read [sales handoff](handoffs/HANDOFF-20261014-sales-value-readiness.md). RT-041 cash-repeat and exact B-105 receipt-history checks now implemented;107PG/281campaign planned, not yet executed. Full137 workflows61partial/76unbound/zero accepted. Candidate still8e1a2b8/v2.5.5; no staging writes.

## Active sales-value boundary wave

Ten new cases planned on unchanged v2.5.5 · 8e1a2b8: tax/discount service+digital, original VAT credit, discounted full return, standard taxable commercial style, excessive discounts, cumulative return, paid refund and invalid tender. Source plan: changes/CHG-20261014-sales-value-boundaries.md. Original270 assertions preserved;280 planned/106PG. No new pass/defect claimed before CI.

# BookOne customer-readiness status

Customer readiness is **not certified**. Requested scope remains physical, service/digital, rental, mixed, settings/roles/files/history/recovery, physical goods first.

Candidate source **v2.5.5 · 8e1a2b8**, full SHA in product-ref.json. Last live sidebar observation matched that stamp; new results below are isolated source/runtime evidence, not deployed acceptance.

[Latest campaign](runs/CAMP-20261014-114805477-fc2c22.json): **270 assertions:262 passed,8failed,0skipped/blocked/not-run**. CI38559060658. [PostgreSQL](runs/RUN-2026-10-14T11-48-13-404Z-runtime.json):88/96 pass, no infrastructure failures. All98 units,60 source contracts,16 archive helpers pass. Original repair assertions still pass. FIFO/average varied-price sales pass; source-cost returns fail in all three operational methods.

Five open finding groups:

- [Payment/archive handoff](handoffs/HANDOFF-20261014-v255-adjacent-readiness.md): BUG-0031 failed batches retain allocations; BUG-0032 changed key payload returns false success; BUG-0024 current missing-checksum variant.
- [Inventory handoff](handoffs/HANDOFF-20261014-variable-cost-readiness.md): BUG-0033 returns use current cost; BUG-0034 uncontrolled backdated movement. Whole-batch/backdate rules are delegated policy-adoption gaps; distinguish them from old repaired regressions.

[Readiness gates](memory/customer-readiness.json) remain open. Full137 workflows:59partial bindings,78unbound,zero fully accepted. Rulebook1.0.0/hash in ledger; RF-01–10 expert/compatibility/recovery decisions stay explicit. No pass percentage certifies customer readiness.

Next: coding fixes with source CHGs, then deliberate candidate pin/impact review and fresh original+adjacent campaign. Complete normal-role physical-first and deployed encrypted archive A→new-emptyB journeys; then remaining business/settings/security and operator/expert gates.

Browser dependencies: pending specific approval for synthetic Owner/Admin/Viewer account creation and Chrome extension popup dismissal. Automatic review rejected the unapproved recipient/Admin grant; do not bypass. Only a disposable source company was created using supported flow; no new accounts/financial/stock/archive writes. IDs/setup/passwords private. No company-reset SQL, production access or shared-staging stress.

Resume via [SESSION.md](SESSION.md), AGENTS.md and memory/programme.json. Previous checkpoints preserved in [history](memory/history/STATUS-before-valuation-20261014.md), immutable runs and Git history; historical pending claims are not current state.
