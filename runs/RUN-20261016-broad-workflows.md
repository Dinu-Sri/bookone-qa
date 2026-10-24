# Broad manual workflow results —2026-10-16

Build **v2.5.11 ·0bcdf4d**. **62 bounded manual checks:45passed/17failed,9findinggroups(5P1/4P2).** Eight new bug records and one quotation-draft follow-up to BUG0037. These are checks within workflows,not62 full workflows or a readiness percentage. Previous303/129/26 automated checks were not rerun.

Scope: physical product/order/partialreceipt/bill/payment/return;quote→order→invoice→payment→return;service/digital draft/reopen/post;cash purchase;credit bill/settlement;AR/AP aging;invoice search;read-only settings;ledger/report arithmetic. Synthetic disposable test records only;no real customer data,credentials,raw traces,screenshots,private identifiers or infrastructure details included.

| Finding | Priority | Observed failure |
|---|---|---|
| [BUG-0056](../bugs/BUG-0056-po-cumulative-receipt-limit.md) | P1 | Cumulative purchase receipts exceed ordered quantity |
| [BUG-0057](../bugs/BUG-0057-duplicate-supplier-bill-error-page.md) | P2 | Duplicate supplier bill conversion crashes the page |
| [BUG-0058](../bugs/BUG-0058-payment-print-query-integrity.md) | P1 | Payment print documents accept altered amount/date |
| [BUG-0059](../bugs/BUG-0059-duplicate-purchase-return.md) | P1 | Purchase bill permits two full posted returns |
| [BUG-0060](../bugs/BUG-0060-initial-line-discount-selection.md) | P1 | Initial percentage selector uses fixed line discount |
| [BUG-0061](../bugs/BUG-0061-payment-overbalance-feedback.md) | P2 | Excessive payment submission has no error feedback |
| [BUG-0062](../bugs/BUG-0062-linked-return-preview-discount.md) | P2 | Linked return preview omits original header discount |
| [BUG-0037](../runs/FOLLOWUP-20261016-BUG0037-quotation-draft.md) | P2 variant | Quotation draft accepts excessive percentage discount |
| [BUG-0063](../bugs/BUG-0063-aging-asof-scope.md) | P1 | AR/AP aging includes future-issued documents |

## Bounded passing controls

Physical order10×60=600;firstreceipt4×60=240;bill journal DrInventory240/CrAP240. Valid vendor100/customer75.50 payments. Full salesreturn correct recorded275.50 and cost reversal180 despite bad preview. Extra1salesreturn created no additional visible document/journal. Converted quote/order repeat UI actions unavailable. Service50+Digital20 draft,reopen,post70 with onlyDrAR70/CrSales70. Cash service20 posts DrExpense20/CrCash20. Servicebill40/payment40. Invoice search match/no-match/clear. Purchase duplicate-blockingON,GRNIOFF;last-cost/negativeallow;settings unchanged.

Final observed arithmetic:11balancedjournals,debits1976.50,netincome10,netcash−84.50,AR−5.50,AP−340,assets/liabilities+equity−330. These reconcile actual saved events,including intentionally invalid duplicate purchase return;balance is not business correctness. Stock quantities/layers were not independently verified. Keep failing synthetic records for diagnosis;do not replay saved payments or treat fixture as clean.

## Evidence and limits

[Exact manual checks](CHECKS-20261016-broad-workflows.json). Reproduction steps and independent expected values are in linked findings. Observations came from supported browser UI. Screenshots were transient,not durably archived. No raw traces or server audit extraction. Current session was continued;no fresh-login/role/tenant acceptance. Current schema/image/database-role/storage fingerprint not independently read. No product code,settingsgrants,merge/deploy changes.

Not complete: actual stock layers/GRNIon/variablecost,locks/roles/scopes/files,rental/POS,fullservice/digital fulfilment,imports/history,upgrade/operatorrecovery,expert policies. Actual encrypted backup/restore LAST. One payment-date input attempt persisted current date;without verified before-submit state it is inconclusive,not a confirmed product finding. No retry.

**NOT customer-ready.** Coding agent must add lasting independent regressions and fix exact cases without weakening expected results. QA retests new build on fresh synthetic fixtures plus affected passing controls. Original isolated fixes remain bounded. See [handoff](../handoffs/HANDOFF-20261016-broad-workflows.md).
