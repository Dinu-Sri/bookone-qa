# Retained lifecycle-to-workbook map

Generated from existing batches/coverage.json task identities and workbook references. A mapping is not a binding, pass or acceptance; existing task execution history remains in its original register. All retained lifecycle tasks appear below. Existing S-0761–0805 archive scenarios remain separate and actual encrypted backup/restore LAST.

| Existing task | Existing goal | Workbook journeys |
|---|---|---|
| B-101 | quote-order-draft | [WB-SVC.J01](books/WB-SVC.md) |
| B-102 | post-invoice | [WB-DIG.J01](books/WB-DIG.md), [WB-SVC.J01](books/WB-SVC.md), [WB-SVC.J04](books/WB-SVC.md) |
| B-103 | allocation-journey | [WB-CORE.J01](books/WB-CORE.md), [WB-PHY.J05](books/WB-PHY.md), [WB-SVC.J02](books/WB-SVC.md) |
| B-104 | credit-partial | [WB-DIG.J03](books/WB-DIG.md), [WB-PHY.J05](books/WB-PHY.md), [WB-SVC.J02](books/WB-SVC.md) |
| B-105 | paid-refund | [WB-DIG.J03](books/WB-DIG.md), [WB-SVC.J02](books/WB-SVC.md) |
| B-106 | retry | [WB-CORE.J06](books/WB-CORE.md) |
| B-107 | concurrent-pay | [WB-CORE.J01](books/WB-CORE.md), [WB-CORE.J06](books/WB-CORE.md) |
| B-108 | invalid-states | [WB-CORE.J04](books/WB-CORE.md), [WB-SVC.J05](books/WB-SVC.md) |
| B-109 | roles-scopes | [WB-CORE.J05](books/WB-CORE.md) |
| B-110 | tenant-files | [WB-CORE.J05](books/WB-CORE.md), [WB-DIG.J02](books/WB-DIG.md) |
| B-111 | closed-date | [WB-BANK.J04](books/WB-BANK.md), [WB-CORE.J02](books/WB-CORE.md) |
| B-112 | atomicity | [WB-CORE.J06](books/WB-CORE.md) |
| B-113 | history | [WB-CORE.J04](books/WB-CORE.md), [WB-DIG.J03](books/WB-DIG.md), [WB-SVC.J05](books/WB-SVC.md) |
| B-114 | tax-discount | [WB-CORE.J07](books/WB-CORE.md), [WB-SVC.J03](books/WB-SVC.md) |
| B-115 | payment-batch-failure | [WB-CORE.J01](books/WB-CORE.md) |
| B-116 | cashbook-bridge | [WB-BANK.J01](books/WB-BANK.md), [WB-CORE.J03](books/WB-CORE.md), [WB-PHY.J12](books/WB-PHY.md), [WB-SVC.J04](books/WB-SVC.md) |
| B-117 | digital-entitlement | [WB-DIG.J01](books/WB-DIG.md), [WB-DIG.J02](books/WB-DIG.md), [WB-SVC.J05](books/WB-SVC.md) |
| C-101 | po-approval | [WB-PHY.J02](books/WB-PHY.md) |
| C-102 | receipt-bill | [WB-PHY.J03](books/WB-PHY.md), [WB-PHY.J04](books/WB-PHY.md) |
| C-103 | partial-receipt | [WB-PHY.J03](books/WB-PHY.md) |
| C-104 | partial-bill | [WB-PHY.J03](books/WB-PHY.md) |
| C-105 | sale-payment-return | [WB-PHY.J05](books/WB-PHY.md), [WB-PHY.J12](books/WB-PHY.md) |
| C-106 | vendor-payment | [WB-PHY.J04](books/WB-PHY.md), [WB-PHY.J06](books/WB-PHY.md) |
| C-107 | purchase-return | [WB-PHY.J06](books/WB-PHY.md) |
| C-108 | landed-cost | [WB-PHY.J11](books/WB-PHY.md) |
| C-109 | locations | [WB-PHY.J08](books/WB-PHY.md) |
| C-110 | adjust-opening | [WB-PHY.J01](books/WB-PHY.md), [WB-PHY.J08](books/WB-PHY.md) |
| C-111 | cost-backdate | [WB-PHY.J07](books/WB-PHY.md) |
| C-112 | negative-stock | [WB-PHY.J01](books/WB-PHY.md), [WB-PHY.J09](books/WB-PHY.md) |
| C-113 | supplier-duplicate | [WB-PHY.J02](books/WB-PHY.md), [WB-PHY.J06](books/WB-PHY.md) |
| C-114 | concurrent-issue | [WB-PHY.J09](books/WB-PHY.md) |
| C-115 | locks-denials | [WB-CORE.J02](books/WB-CORE.md), [WB-PHY.J08](books/WB-PHY.md) |
| C-116 | rollback-history | [WB-CORE.J02](books/WB-CORE.md), [WB-PHY.J07](books/WB-PHY.md) |
| D-101 | fixture | [WB-REN.J01](books/WB-REN.md) |
| D-102 | deposit | [WB-REN.J04](books/WB-REN.md) |
| D-103 | dispatch | [WB-REN.J02](books/WB-REN.md), [WB-REN.J07](books/WB-REN.md) |
| D-104 | partial-return | [WB-REN.J02](books/WB-REN.md), [WB-REN.J03](books/WB-REN.md) |
| D-105 | return-buckets | [WB-REN.J02](books/WB-REN.md), [WB-REN.J03](books/WB-REN.md), [WB-REN.J07](books/WB-REN.md) |
| D-106 | extension-overlap | [WB-REN.J06](books/WB-REN.md) |
| D-107 | concurrent-booking | [WB-REN.J01](books/WB-REN.md), [WB-REN.J07](books/WB-REN.md) |
| D-108 | timing | [WB-REN.J05](books/WB-REN.md) |
| D-109 | deposit-apply-refund | [WB-REN.J04](books/WB-REN.md) |
| D-110 | over-refund-retry | [WB-REN.J04](books/WB-REN.md) |
| D-111 | cancel | [WB-REN.J06](books/WB-REN.md) |
| D-112 | damage-missing | [WB-REN.J03](books/WB-REN.md), [WB-REN.J08](books/WB-REN.md) |
| D-113 | late-return | [WB-REN.J08](books/WB-REN.md) |
| D-114 | wash-repair | [WB-REN.J03](books/WB-REN.md) |
| D-115 | settings | [WB-REN.J05](books/WB-REN.md), [WB-REN.J06](books/WB-REN.md) |
| D-116 | historical-price | [WB-REN.J08](books/WB-REN.md) |
| D-117 | permissions-files | [WB-REN.J09](books/WB-REN.md) |
| D-118 | atomicity | [WB-REN.J09](books/WB-REN.md) |
| E-101 | mixed-job | [WB-DIG.J04](books/WB-DIG.md), [WB-HYB.J01](books/WB-HYB.md), [WB-SVC.J04](books/WB-SVC.md) |
| E-102 | tax-discount-return | [WB-CORE.J07](books/WB-CORE.md), [WB-DIG.J04](books/WB-DIG.md), [WB-HYB.J02](books/WB-HYB.md) |
| E-103 | entity-tier | [WB-CORE.J07](books/WB-CORE.md), [WB-HYB.J03](books/WB-HYB.md), [WB-OPS.J01](books/WB-OPS.md) |
| E-104 | module-toggle | [WB-HYB.J03](books/WB-HYB.md) |
| E-105 | book-domain | [WB-BANK.J01](books/WB-BANK.md), [WB-HYB.J04](books/WB-HYB.md) |
| E-106 | scope-report | [WB-CORE.J03](books/WB-CORE.md), [WB-HYB.J04](books/WB-HYB.md), [WB-PHY.J12](books/WB-PHY.md) |
| E-107 | multi-tenant-switch | [WB-HYB.J04](books/WB-HYB.md) |
| E-108 | role-revocation | [WB-CORE.J05](books/WB-CORE.md) |
| E-109 | shared-discounts | [WB-HYB.J02](books/WB-HYB.md), [WB-SVC.J03](books/WB-SVC.md) |
| E-110 | pos-stock-rental | [WB-HYB.J01](books/WB-HYB.md), [WB-PHY.J10](books/WB-PHY.md) |
| E-111 | browser-submit | [WB-CORE.J06](books/WB-CORE.md), [WB-HYB.J05](books/WB-HYB.md), [WB-PHY.J10](books/WB-PHY.md) |
| E-112 | export-print | [WB-CORE.J04](books/WB-CORE.md), [WB-PHY.J10](books/WB-PHY.md) |
| E-113 | invalid-settings | [WB-HYB.J05](books/WB-HYB.md) |
| E-114 | mixed-concurrency | [WB-HYB.J05](books/WB-HYB.md) |
| F-101 | portable-files | [WB-BANK.J02](books/WB-BANK.md) |
| F-102 | duplicate-import | [WB-BANK.J02](books/WB-BANK.md), [WB-BANK.J05](books/WB-BANK.md) |
| F-103 | malformed-import | [WB-BANK.J02](books/WB-BANK.md) |
| F-104 | import-rollback | [WB-BANK.J02](books/WB-BANK.md), [WB-BANK.J05](books/WB-BANK.md) |
| F-105 | matching | [WB-BANK.J03](books/WB-BANK.md), [WB-BANK.J04](books/WB-BANK.md) |
| F-106 | untrusted-files | [WB-BANK.J05](books/WB-BANK.md) |
| F-107 | fresh-install | [WB-OPS.J01](books/WB-OPS.md), [WB-OPS.J03](books/WB-OPS.md) |
| F-108 | upgrade | [WB-OPS.J03](books/WB-OPS.md) |
| F-109 | failed-migration | [WB-OPS.J03](books/WB-OPS.md) |
| F-110 | restore | [WB-OPS.J05](books/WB-OPS.md) |
| F-111 | compatibility | [WB-OPS.J03](books/WB-OPS.md) |
| F-112 | rls-pooling | [WB-CORE.J05](books/WB-CORE.md) |
| F-113 | posting-races | [WB-BANK.J03](books/WB-BANK.md), [WB-CORE.J06](books/WB-CORE.md) |
| F-114 | failure-injection | [WB-CORE.J06](books/WB-CORE.md) |
| F-115 | audit-redaction | [WB-BANK.J05](books/WB-BANK.md), [WB-OPS.J04](books/WB-OPS.md) |
| F-116 | artifact-gate | [WB-OPS.J04](books/WB-OPS.md) |
| F-117 | bounded-load | [WB-OPS.J04](books/WB-OPS.md) |
| F-118 | cleanup | [WB-OPS.J04](books/WB-OPS.md) |
| E-115 | persisted-role-controls | [WB-CORE.J05](books/WB-CORE.md), [WB-HYB.J03](books/WB-HYB.md) |
| E-116 | persisted-module-entity-ceilings | [WB-HYB.J03](books/WB-HYB.md), [WB-OPS.J01](books/WB-OPS.md) |
| E-117 | persisted-override-ceilings | [WB-CORE.J05](books/WB-CORE.md), [WB-HYB.J03](books/WB-HYB.md) |
| F-119 | receipt-storage-roundtrip | [WB-OPS.J02](books/WB-OPS.md) |
| F-120 | product-image-upload | [WB-OPS.J02](books/WB-OPS.md) |
| F-121 | rental-photos-upload | [WB-OPS.J02](books/WB-OPS.md), [WB-REN.J09](books/WB-REN.md) |
| F-122 | assets-and-public-links | [WB-OPS.J02](books/WB-OPS.md) |
| F-123 | upload-failure-atomicity | [WB-OPS.J02](books/WB-OPS.md) |
| F-124 | file-content-and-export-safety | [WB-OPS.J02](books/WB-OPS.md) |
