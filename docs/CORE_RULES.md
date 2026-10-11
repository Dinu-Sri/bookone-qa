# Core business and data rules

These are candidate acceptance requirements, not a claim that BookOne already satisfies them. Product/accounting owners must resolve policy choices; security/data invariants remain mandatory unless an explicitly documented requirement changes their scope. Associate existing scenario IDs after the assertion audit rather than inventing mappings.

Every rule needs: owner, approved specification/version, relevant capability/profile, source symbols, exact independent expected values, scenario IDs, implemented assertion depth, and latest build-specific evidence.

| Rule | Required invariant | How to prove it |
|---|---|---|
| BR-ACC-01 | Every posted journal balances at approved currency precision | Compare persisted debit/credit totals per journal, not formatted label visibility |
| BR-ACC-02 | Correct accounts, amounts, tax, date, tenant, book domain, and dimensions | Independently computed posting fixtures; compare full line sets, including zero/unexpected lines |
| BR-ACC-03 | Document, financial, stock, allocation, and audit changes are atomic | Inject failure between steps in isolated DB; verify no partial business operation remains |
| BR-ACC-04 | Retries do not double-post | Sequential and concurrent replay; count documents/journals/payments/movements and compare totals |
| BR-ACC-05 | Reversal/void preserves traceability and does not delete history | Link original and reversal; verify net effects, reason/actor/time, stock and allocation effects |
| BR-ACC-06 | Closed periods cannot be silently rewritten | Direct action and UI attempts; approved correcting entries go into an allowed period |
| BR-ACC-07 | Subledgers reconcile to their GL control scope | AR/AP open items vs relevant accounts, with explicit bridges for approved manual/opening entries; no blanket tolerance |
| BR-ACC-08 | Reports agree for the same scope/as-of time | Trial balance, balance sheet, P&L, cash/bank, aging; approved book-domain/period filters |
| BR-SAL-01 | Quotes/orders/drafts only create intended reservations and no unintended posted revenue | Snapshot journal/stock/reservation state at each state transition |
| BR-SAL-02 | Invoice/payments/returns follow allowed transitions | State-machine tests, partial/full payment, credit/refund, edit/void restrictions, closed/voided docs |
| BR-SAL-03 | Pricing/discount/tax rules are consistent | Line/header discounts, inclusive/exclusive tax where supported, thresholds, rounding, print/export agreement |
| BR-PUR-01 | PO→GRN→bill does not receive or value inventory twice | Partial receipts/bills, GRNI enabled/disabled, approval, returns and allocations |
| BR-PUR-02 | Duplicate vendor bills and approval gates follow policy | Same supplier/reference, parallel posts, rejected/approved states; exact ledger/stock results |
| BR-STK-01 | Quantity is conserved | Opening + receipts + returns + adjustments − issues = closing per SKU/location; transfer total unchanged |
| BR-STK-02 | Quantity and valuation are distinct and both correct | Approved costing method, COGS, cost-layer consumption, returns, landed cost; zero/negative edge cases |
| BR-STK-03 | Product types have distinct effects | Physical sales consume stock; service/digital lines do not accidentally consume physical stock; rental is separately modelled |
| BR-REN-01 | Rental booking respects interval availability | Boundary times, padding, concurrent bookings, overrides, dispatches, wash/repair and extensions |
| BR-REN-02 | Hire does not masquerade as asset sale | Owned fleet and availability tracked separately; no sale-style fleet COGS on ordinary hire |
| BR-REN-03 | Return states account for all dispatched units | Good, dirty, repair, missing, partial and late returns; release from wash/repair; authorized write-offs |
| BR-REN-04 | Refundable deposit remains a liability until correctly settled | Collect, apply, partial refund, forfeiture policy, over-refund denial; reconcile remaining liability |
| BR-SEC-01 | Company A cannot read/write company B data | Real foreign records; UI/API/actions, reports, files, background jobs, caches, concurrent DB connections |
| BR-SEC-02 | Server authorization matches the permission matrix | Roles, membership status, module/entity ceilings, scope, direct endpoints, revocation, privilege changes |
| BR-DAT-01 | Product updates preserve historical facts | Old posted totals, parties-as-recorded, tax rates, dates, journals, allocations and attachments remain semantically correct |
| BR-DAT-02 | Upgrade/rollback never silently loses accepted operations | Prior-version fixture upgrade, failure interruption, restart; reconcile before/after and compatibility |
| BR-DAT-03 | Recovery restores a usable consistent system | Restore DB/files into isolation, verify checksums and business totals, logins/permissions, measured RPO/RTO |
| BR-IMP-01 | Imports are accurate, traceable and repeat-safe | Portable synthetic bank fixtures, mapping/signs/date formats, duplicate files/rows, failed import rollback |
| BR-AUD-01 | Sensitive mutations have trustworthy audit records | Who/what/when/tenant/reason/correlation; original/reversal links; unauthorized attempts recorded without secrets |

## Required policy decisions

- Rounding method and stage, allowed currency precision, discount allocation and tax basis. Do not infer current tax law from old tests; version approved jurisdiction/effective-date expectations.
- Inventory costing and negative-stock rules; backdated operations; opening balance treatment and location valuation.
- Rental inclusive/exclusive interval boundaries, timezone/daylight-saving handling where supported, wash turnaround, overbooking overrides, invoice timing, deposit settlement and forfeiture.
- Credit limits, overpayments, partial allocations, refunds, and cancellation/return rules.
- Allowed closed-period correction date; permissible invoice edits and customer/product renaming effects on historical prints.
- Reconciliation boundaries: commercial AR/AP vs direct journal/Simple Entry postings, personal vs business domains, branches/locations and currencies.
- Entity/tier/module/role combinations actually supported by the current build, rather than only described in design documents.

Requirements that are unsettled remain explicitly blocked for acceptance; implementation behaviour alone is not approval.
