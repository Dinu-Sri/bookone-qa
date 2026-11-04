# First customer launch scope — physical goods and services

Owner confirmed on 4 November 2026 that the first customer buys/sells physical goods and also sells services. The owner performs deployments personally. This scope takes priority over preparing rental as the next Light business batch. No launch approval or executable queue is created here.

## Required business scope

- Physical goods: product/stock setup, supported purchasing and goods receipt/billing sequence, supplier payment, sale/invoice, fulfillment/stock reduction, customer receipt, source-linked sale and purchase returns, applicable credits and cash refunds.
- Services: service invoice and customer receipt, partial/full settlement, credit/refund; ordinary service expenses/vendor bills and payments where used. Mixed physical/service invoice must be exercised if the customer uses it; separate passing lanes do not establish a mixed invoice pass.
- Shared accounting: correct journals, stock quantities/valuation/COGS, receivables/payables, dated trial balance/profit and loss/balance sheet, receipt/remittance/document previews and persisted Activity.
- Shared safeguards: Owner and actual required staff roles, company isolation, quantity/amount boundaries, duplicate/retry handling and source preservation.

## Evidence already obtained, with limits

| Area | Existing evidence | Remaining acceptance |
|---|---|---|
| Physical sale/purchase and stock | Rapid01 selected live purchase/bill/vendor settlement and sale/receipt/source-return/cost/reports reconciled; Rapid03 new physical supplier refund240 to60/180 persisted correctly | Current deployed candidate, actual customer goods-receipt/purchase sequence and stock/cost settings, quantity denial and relevant shared boundaries |
| Services | Live invoice/receipt/credit/refund120 to40/80 and expense/bill/payment journeys reconciled | Current candidate and actual customer profile; mixed-line flow if needed |
| AR/AP settlements | Live partial/final multi-source receipts/payments and source balances passed | Actual tender and staff scope; bank/card positive path if required |
| Returns/refunds | New physical/service supplier cash refunds and ordinary customer cash refunds passed after fixes | Current candidate grouped regression; historical bad credits remain preserved |
| Reports/print/Activity | Selected live journal/report/stock reconciliation, receipt/remittance/previews and Owner financial Activity passed | Complete selected current-candidate journeys, denied roles and customer dates/settings |
| Security/runtime | v2.5.25 isolated PostgreSQL136/136 and real-login HTTPS30/30 passed | Deployed roles/tenant/file/export surfaces and actual runtime configuration; CI is not deployed acceptance |

These are bounded passed workflows, not complete modules certified for launch. Most live business evidence is from v2.5.22/v2.5.23; current source/runtime evidence is v2.5.25. Preserve their separate fingerprints.

## Proposed first-release exclusions

Rental, POS checkout, HR/payroll, digital delivery, online payments, advanced multi-location/lot/serial features and other unused modules should be excluded or disabled only after confirming the customer does not need them. These exclusions are proposals, not assumed owner decisions. Basic Inventory and services remain in scope. Multi-location and bank/card tenders become mandatory if actually used. Rental policy/recognition gaps do not gate a release that genuinely excludes rental.

## Finite launch gate and next batch

After the owner's deployment, Medium verifies actual full SHA/tree/stamp and affected change impact, then binds a NEW dated substantial physical+service batch with fresh guarded controls, legitimate run-owned fixtures and independent opening/posting/closing expectations. Cover full purchase-to-return/refund and sale-to-return/refund journeys, service cycle, required mixed invoice and staff/tenant denial variants together. Reuse implemented isolated regression runners; preserve consumed historical transactions and first failures. Publish one consolidated defect/fix/regression cycle, not another small blocked queue.

Release is conditional on: all required journeys and balances accepted on the deployed candidate; no exposed unresolved critical/high-severity finance/security defect; applicable tax/accounting configuration confirmed; customer opening data reconciled; actual recoverability and support/operating arrangements verified; representative customer acceptance. Backup/restore remains LAST in the existing QA order, but before live customer reliance. Explicitly record any lower-risk owner-approved deferrals. No assertion-count launch percentage.

Still needed to finalize scope: standard invoices versus POS, required cash/bank/card tenders and credit terms, single versus multiple stock locations, VAT/tax configuration, and required staff roles. The first useful clarification is whether normal invoices/receipts suffice or POS is required.
