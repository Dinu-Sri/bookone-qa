# BUG-0005 — customer Open AR includes an archived unposted invoice

Status: reproduced UI inconsistency. Severity: P1 financial reporting correctness.
Build: v2.1.0 / 2b92cf4. Source: 2b92cf40a3d258dcfc29655759d37b0c32aaebbf.
Run: [RUN-06](../runs/RUN-20261013-finance-investigation-06.md).

## Evidence

Before this run's finance mutations, synthetic CUS-0001 showed customer balance/Open AR LKR100 and one linked document. Its invoice was archived and had never been posted in the earlier draft probes. AR Aging showed0/no open receivables, and October journal/transactions were empty. No customer balance or old invoice state was edited in this run.

Expected: an unposted/archived draft does not create collectible AR. Historical linked-document count may include it, but financial balance must remain0.
Actual: list and customer quick view present100 as Open AR.

## Source investigation and required fix

At candidate SHA, `apps/web/src/app/actions/parties.ts` listParties balance aggregate (lines586–595) sums document balanceDue with only tenant/non-void filtering. Status/posting state is ignored. Document-count/delete blockers and financial balances need separate rules.

Do not blindly exclude all archived invoices: archiving a **posted** unpaid invoice must not erase its debt or rewrite journals. Define eligible posted financial obligations and distinguish archive visibility from void/reversal. Share the financial rule with AR/AP aging, allocation and customer/vendor detail. The current open-AR query also does not exclude drafts; that is a source-review concern requiring a live draft regression, not a passed/failed test in this run. AP includes purchase_order in the party balance sum; validate ordered commitments separately from posted payables.

Required regression: draft0, archived draft0, posted100, paid0, partial payment remainder, posted return credit sign, void/reversal, archived posted unpaid obligation, vendor order/bill distinction, tenant/dimension scope. Assert agreement with posted subledger/journals, not merely agreement between two equally wrong views.
