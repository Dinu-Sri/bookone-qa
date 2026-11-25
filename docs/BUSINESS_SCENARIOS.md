# Business profiles and scenario families

Maintain synthetic reusable fixture definitions in the public QA repository. Each run gets fresh names/IDs with a run prefix, deterministic dates/seed, declared roles/settings, expected opening balances, and a cleanup plan. Keep an additional long-lived historical fixture database for upgrades.

Business type (rental/retail/service) is a separate dimension from legal entity (company/sole proprietor/personal), capability tier, enabled modules, user role, tax registration, and location. Do not use one label to stand in for all of them.

## Primary profiles

| Profile | Synthetic business | Main journey | Essential outcomes |
|---|---|---|---|
| BP-01 | Physical retail/wholesale | Buy→receive→bill→sell→payment→return→vendor payment | Quantity and valuation, COGS, AR/AP, partial receipts, discounts, VAT configuration, reconciliation |
| BP-02 | Digital product seller | Quote/order→digital invoice→partial/full payment→refund | Revenue/AR/cash, no physical stock consumption, correct digital line identity; delivery/license checks only if implemented |
| BP-03 | Service agency | Quote→order→service invoice→payment→expense→report | No accidental stock/COGS; revenue and expenses, client allocation, credit/cancellation; recurring/milestone billing only if supported |
| BP-04 | Rental business | Reserve→deposit→dispatch→extend→partial return→wash/repair→settlement | Availability, fleet conservation, deposit liability, fees, refunds, missing/damaged units |
| BP-05 | Event/catering mixed business | One job with hire, sold goods, service/delivery and deposit | Correct effects per line, shared discounts/tax, partial return, mixed final invoice, profit and balances |
| BP-06 | Multi-location business | Stock transfer→location sale→return→location reports | Total stock conserved, correct location balances, role/shop scope, no cross-location leakage |
| BP-07 | Sole proprietor | Business transactions + personal books, lite/full change | Domain separation, permitted modules, history after capability change; confirm implemented scope first |
| BP-08 | Personal entity | Money in/out/transfer→bank import→reconcile→report | Personal-only access and classification; no unintended company-only features |
| BP-09 | Multi-company accountant | Work in tenant A→switch B→switch A; revoke access | Membership and stale-session behaviour; no document/report/cache contamination |

Current owner order: physical BP-01 first,then service/digital/rental/hybrid;retain all-business scope. Historical mixed-first proposal is superseded by ADR-20261013-all-businesses-physical-first. BP-07/08 require implementation inventory because source docs include planned capabilities.

## Common fixture ingredients

- Tenant A and B with deliberately similar document numbers/customer names, but distinct sentinel data and actual known record UUIDs.
- Owner, accountant, sales, cashier, storekeeper, read-only, suspended member, and platform operator where supported; no shared superuser for all tests.
- Two locations, physical/service/digital/rental products, customer and vendor, bank/cash accounts, open and locked accounting periods.
- Baseline tax-disabled fixture for simple exact arithmetic; separately approved tax-enabled effective-date fixtures.
- Old posted and draft documents, paid/partially paid/unpaid invoices, linked orders/GRNs/bills, stock cost layers, deposits, attachments, and imports.
- Explicit unsupported features marked `not_supported`; they cannot silently pass a generic page check.

## Worked fixture A: physical sale and payment

Proposed acceptance example, no tax or discounts. Currency values use two decimals. Review against the approved costing/account policy before implementation.

1. Begin with zero stock and balanced opening cash/equity of 10,000.
2. Purchase and receive 10 units at 60 each on credit: inventory 600; AP 600; stock 10. If using GRN→bill, verify the final result is still 600 and 10, not twice that.
3. Sell two units at 100 each on credit: AR 200, revenue 200, COGS 120, inventory credit 120. Stock 8; inventory value 480.
4. Receive 80 against the invoice: cash +80, AR −80; outstanding 120. Revenue and stock unchanged.
5. Credit one returned unit against the outstanding invoice, restock at original cost: AR −100; sales-return effect 100; inventory +60; COGS −60. Stock 9, inventory 540, outstanding 20.
6. Receive the remaining 20: outstanding zero. Invoice/credit/payment linkage and status follow the approved state model.
7. Pay the vendor 600: AP zero; cash 9,500. Inventory 540; net revenue 100; net COGS 60; profit 40; assets 10,040 match opening equity plus profit.

Check every transition through the UI, persisted documents, stock movements, journal lines, AR/AP, and reports. Repeating any posting request must not repeat its effects. Void/reversal variants need their own approved expected sequence.

## Worked fixture B: service/digital

Issue a no-tax invoice for three units/hours at 200 = 600. With zero configured physical cost: AR 600, revenue 600, no physical movement or physical COGS. Receive 250: AR 350. Receive 350: AR zero. A renamed product or changed selling price after posting must not silently recalculate the historical 600 invoice.

Use separate service and digital fixtures plus a combined invoice. If digital delivery/entitlement is not implemented, record that explicitly instead of interpreting a successful invoice as delivery proof.

## Worked fixture C: rental and mixed event

Start with an approved balanced fleet opening of 20 chairs. Reserve/dispatch 10 for a fixed interval under a declared return/padding policy. Collect a refundable deposit of 1,000: cash +1,000 and deposit liability +1,000; no hire revenue from deposit collection alone.

Return 8 good and 2 dirty. All 10 have physically returned, but the dirty 2 remain unavailable until wash release according to policy. Ordinary dispatch/return does not sell the fleet or recognize sale-style fleet COGS. Check an overlapping booking both before and after wash release.

Invoice 500 of hire, 200 of service/delivery, and three sold goods at 100 each (cost 60 each): total 1,000 before tax/discount; physical goods decrease by 3 and incur 180 COGS; hire fleet is not consumed. In a variant with only hire/service = 700, apply 700 deposit to AR and refund 300: deposit liability and AR finish at zero. Verify partial refunds, over-refund denial, and replay.

Keep distinct fixtures for invoice-on-confirmation, dispatch, and return timing where supported. Add late, damaged, missing, cancellation, and concurrent-booking branches after the happy path is deterministic.

## Combination strategy

Run all critical journeys for every supported primary profile before release. Cover high-risk intersections explicitly: rental + physical + services, tax + discounts + returns, partial payment + void, locked period + reversal, GRN + approval + landed cost, concurrent requests + tenant switching, and upgrade + historical data.

Use pairwise sampling for the remaining lower-risk settings combinations; it does not replace the explicit high-risk cases. Keep the selected combinations and exclusions in the run manifest. Use state-transition models for all document statuses, and include invalid transitions, refresh/back/retry, permission loss mid-form, decimal/zero/boundary inputs, and simultaneous operations.

## Historical dataset

Create it under a recorded earlier build, freeze its seed/expected assertions, upgrade a copy, and compare semantic facts: IDs, amounts, dates, status, links, allocations, ledger totals, stock valuation, attachment hashes and access. Normalize approved schema changes before comparison; byte-for-byte DB equality is not required. Test new transactions after upgrade too, including returns/payments against old documents.

## Maintained workflow playbooks

Start with [workflow index](workflows/README.md). Existing BP IDs stay stable;five canonical JSON families and generated human playbooks compose lifecycle tasks. Multi-location,entity/domain and multi-company profiles are overlays. Workflow/rule changes and new edges follow [the protocol](workflows/PROTOCOL.md),with independent expected outcomes and immutable candidate evidence. Existing examples here are historical/proposed anchors,not an independently editable second specification or passing workflow.

