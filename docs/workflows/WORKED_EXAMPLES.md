# Independent worked financial examples

Generated from workflows/worked-examples.json. Signed balances use debit positive/credit negative; journal amounts are integer LKR cents. Each example is an independent synthetic oracle, not an executed product test or expert approval. Account purposes must bind to the approved actual CoA.

## EX-PHY-01 — Complete physical purchase/sale/return/settlement

Cases: WB-PHY.J05.C01, WB-PHY.J05.C02, WB-PHY.J05.C03, WB-PHY.J05.C04, WB-PHY.J12.C02.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"bank":1000000,"openingEquity":-1000000}.

### Step 1: Purchase10@60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventory | 60000 | 0 |
| AP | 0 | 60000 |

Expected signed ledger: {"inventory":60000,"AP":-60000}.

Expected business state: {"stockQty":10,"stockValueCents":60000}.

### Step 2: Sell2@100, original cost60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 20000 | 0 |
| revenue | 0 | 20000 |
| COGS | 12000 | 0 |
| inventory | 0 | 12000 |

Expected signed ledger: {"inventory":48000,"AR":20000,"COGS":12000,"revenue":-20000}.

Expected business state: {"stockQty":8,"profitCents":8000}.

### Step 3: Receive80

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 8000 | 0 |
| AR | 0 | 8000 |

Expected signed ledger: {"bank":1008000,"AR":12000}.

Expected business state: {"allocationCents":8000}.

### Step 4: Return1 at source100/cost60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| revenue | 10000 | 0 |
| AR | 0 | 10000 |
| inventory | 6000 | 0 |
| COGS | 0 | 6000 |

Expected signed ledger: {"inventory":54000,"AR":2000,"revenue":-10000,"COGS":6000}.

Expected business state: {"stockQty":9,"profitCents":4000}.

### Step 5: Receive20

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 2000 | 0 |
| AR | 0 | 2000 |

Expected signed ledger: {"bank":1010000,"AR":0}.

Expected business state: {"customerReceiptsCents":10000}.

### Step 6: Pay supplier600

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AP | 60000 | 0 |
| bank | 0 | 60000 |

Expected signed ledger: {"bank":950000,"AP":0,"inventory":54000,"AR":0}.

Expected business state: {"assetsCents":1004000,"profitCents":4000,"equityIncludingCurrentProfitCents":1004000}.


## EX-PHY-02 — GRNI partial receipt and partial bill

Cases: WB-PHY.J03.C01, WB-PHY.J03.C02.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {}.

### Step 1: Receive6@60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventory | 36000 | 0 |
| GRNI | 0 | 36000 |

Expected signed ledger: {"inventory":36000,"GRNI":-36000}.

Expected business state: {"stockQty":6}.

### Step 2: Bill4 received units

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| GRNI | 24000 | 0 |
| AP | 0 | 24000 |

Expected signed ledger: {"inventory":36000,"GRNI":-12000,"AP":-24000}.

Expected business state: {"stockQty":6,"receivedUnbilledQty":2}.

### Step 3: Receive4@60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventory | 24000 | 0 |
| GRNI | 0 | 24000 |

Expected signed ledger: {"inventory":60000,"GRNI":-36000}.

Expected business state: {"stockQty":10}.

### Step 4: Bill remaining6 units

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| GRNI | 36000 | 0 |
| AP | 0 | 36000 |

Expected signed ledger: {"inventory":60000,"GRNI":0,"AP":-60000}.

Expected business state: {"stockQty":10,"receivedQty":10,"billedQty":10}.


## EX-PHY-03 — Unpaid supplier return and payment

Cases: WB-PHY.J06.C01, WB-PHY.J06.C02.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"bank":100000,"openingEquity":-100000,"inventory":60000,"AP":-60000}.

### Step 1: Return2@60 to vendor

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AP | 12000 | 0 |
| inventory | 0 | 12000 |

Expected signed ledger: {"inventory":48000,"AP":-48000}.

Expected business state: {"stockQty":8}.

### Step 2: Pay remaining480

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AP | 48000 | 0 |
| bank | 0 | 48000 |

Expected signed ledger: {"AP":0,"bank":52000,"inventory":48000}.

Expected business state: {"stockQty":8}.


## EX-PHY-04 — Cash purchase and exact tender

Cases: WB-PHY.J04.C03.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"bank":100000,"openingEquity":-100000}.

### Step 1: Buy10@60 for immediate cash

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventory | 60000 | 0 |
| bank | 0 | 60000 |

Expected signed ledger: {"inventory":60000,"bank":40000,"AP":0}.

Expected business state: {"stockQty":10,"openPayablesCents":0}.


## EX-PHY-05 — Moving average two receipts and sale

Cases: WB-PHY.J07.C01.

Assumptions: No tax; explicitly selected moving average; numerical fixture only, not a statutory policy approval.

Opening signed ledger cents: {}.

### Step 1: Receive10@60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventory | 60000 | 0 |
| AP | 0 | 60000 |

Expected signed ledger: {"inventory":60000}.

Expected business state: {"stockQty":10}.

### Step 2: Receive10@80

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventory | 80000 | 0 |
| AP | 0 | 80000 |

Expected signed ledger: {"inventory":140000,"AP":-140000}.

Expected business state: {"stockQty":20,"averageUnitCostCents":7000}.

### Step 3: Sell5@100 cost70

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 50000 | 0 |
| revenue | 0 | 50000 |
| COGS | 35000 | 0 |
| inventory | 0 | 35000 |

Expected signed ledger: {"inventory":105000,"AR":50000,"COGS":35000}.

Expected business state: {"stockQty":15,"profitCents":15000}.


## EX-PHY-06 — FIFO source-cost return after master change

Cases: WB-PHY.J07.C02, WB-PHY.J07.C03.

Assumptions: No tax; explicit FIFO; opening inventory10@60+10@80; actual return-layer placement must preserve original consumed cost.

Opening signed ledger cents: {"inventory":140000,"AP":-140000}.

### Step 1: Sell5@100 from first60 layer

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 50000 | 0 |
| revenue | 0 | 50000 |
| COGS | 30000 | 0 |
| inventory | 0 | 30000 |

Expected signed ledger: {"inventory":110000,"AR":50000,"COGS":30000}.

Expected business state: {"stockQty":15,"remainingFirstLayerQty":5,"secondLayerQty":10}.

### Step 2: Master cost90 does not post

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"inventory":110000,"COGS":30000}.

Expected business state: {"masterUnitCostCents":9000}.

### Step 3: Return1 original cost60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| revenue | 10000 | 0 |
| AR | 0 | 10000 |
| inventory | 6000 | 0 |
| COGS | 0 | 6000 |

Expected signed ledger: {"inventory":116000,"COGS":24000,"AR":40000}.

Expected business state: {"stockQty":16,"profitCents":16000}.


## EX-PHY-07 — Transfer is not income; count loss is expense

Cases: WB-PHY.J08.C01, WB-PHY.J08.C04.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"inventory":60000,"openingEquity":-60000}.

### Step 1: Transfer4 from A to B

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"inventory":60000}.

Expected business state: {"locationAQty":6,"locationBQty":4,"totalQty":10}.

### Step 2: Document count loss1@60 at A

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| inventoryLoss | 6000 | 0 |
| inventory | 0 | 6000 |

Expected signed ledger: {"inventory":54000,"inventoryLoss":6000}.

Expected business state: {"locationAQty":5,"locationBQty":4,"totalQty":9}.


## EX-SVC-01 — Service settlement does not repeat income

Cases: WB-SVC.J01.C02, WB-SVC.J02.C01.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {}.

### Step 1: Invoice delivered3@200

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 60000 | 0 |
| revenue | 0 | 60000 |

Expected signed ledger: {"AR":60000,"revenue":-60000}.

Expected business state: {"stockQtyDelta":0,"COGSCents":0}.

### Step 2: Receive250

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 25000 | 0 |
| AR | 0 | 25000 |

Expected signed ledger: {"AR":35000,"bank":25000,"revenue":-60000}.

Expected business state: {"receiptsCents":25000}.

### Step 3: Receive350

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 35000 | 0 |
| AR | 0 | 35000 |

Expected signed ledger: {"AR":0,"bank":60000,"revenue":-60000}.

Expected business state: {"receiptsCents":60000}.


## EX-SVC-02 — Part-paid service credit

Cases: WB-SVC.J02.C02.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"AR":35000,"bank":25000,"revenue":-60000}.

### Step 1: Credit100

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| revenue | 10000 | 0 |
| AR | 0 | 10000 |

Expected signed ledger: {"AR":25000,"bank":25000,"revenue":-50000}.

Expected business state: {"netRevenueCents":50000,"stockQtyDelta":0}.


## EX-SVC-03 — Paid credit and refund

Cases: WB-SVC.J02.C03, WB-SVC.J02.C04.

Assumptions: No tax; approved customer-credit presentation assumed. Bind actual control-account representation/credit note links; no claim this exact account name is implemented.

Opening signed ledger cents: {"bank":60000,"revenue":-60000}.

### Step 1: Credit100 against settled source

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| revenue | 10000 | 0 |
| customerCredit | 0 | 10000 |

Expected signed ledger: {"bank":60000,"customerCredit":-10000,"revenue":-50000}.

Expected business state: {"refundNotYetPaidCents":10000}.

### Step 2: Refund100

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| customerCredit | 10000 | 0 |
| bank | 0 | 10000 |

Expected signed ledger: {"customerCredit":0,"bank":50000,"revenue":-50000}.

Expected business state: {"netReceiptsCents":50000}.


## EX-SVC-04 — Advance and delivered service are distinct

Cases: WB-SVC.J05.C01, WB-SVC.J05.C02.

Assumptions: Expected target only: service advance capability and recognition policy are not established; require owner/expert review before acceptance.

Opening signed ledger cents: {}.

### Step 1: Collect advance200

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 20000 | 0 |
| customerAdvance | 0 | 20000 |

Expected signed ledger: {"bank":20000,"customerAdvance":-20000,"revenue":0}.

Expected business state: {"earnedRevenueCents":0}.

### Step 2: Invoice delivered600

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 60000 | 0 |
| revenue | 0 | 60000 |

Expected signed ledger: {"AR":60000,"revenue":-60000}.

Expected business state: {"earnedRevenueCents":60000}.

### Step 3: Apply advance200

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| customerAdvance | 20000 | 0 |
| AR | 0 | 20000 |

Expected signed ledger: {"customerAdvance":0,"AR":40000,"bank":20000}.

Expected business state: {"advanceRemainingCents":0}.

### Step 4: Collect remaining400

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 40000 | 0 |
| AR | 0 | 40000 |

Expected signed ledger: {"bank":60000,"AR":0,"revenue":-60000}.

Expected business state: {"earnedRevenueCents":60000}.


## EX-REN-01 — Rental deposit, completed charges, application and refund

Cases: WB-REN.J04.C01, WB-REN.J04.C02, WB-REN.J04.C03.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {}.

### Step 1: Collect security deposit1000

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 100000 | 0 |
| depositLiability | 0 | 100000 |

Expected signed ledger: {"bank":100000,"depositLiability":-100000,"revenue":0}.

Expected business state: {"ownedFleetQty":20}.

### Step 2: Invoice completed hire500+service200

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 70000 | 0 |
| revenue | 0 | 70000 |

Expected signed ledger: {"AR":70000,"revenue":-70000}.

Expected business state: {"ownedFleetQty":20,"COGSCents":0}.

### Step 3: Apply700 deposit

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| depositLiability | 70000 | 0 |
| AR | 0 | 70000 |

Expected signed ledger: {"depositLiability":-30000,"AR":0,"bank":100000}.

Expected business state: {"ownedFleetQty":20}.

### Step 4: Refund300

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| depositLiability | 30000 | 0 |
| bank | 0 | 30000 |

Expected signed ledger: {"depositLiability":0,"bank":70000,"AR":0,"revenue":-70000}.

Expected business state: {"ownedFleetQty":20}.


## EX-REN-02 — Dispatch, dirty returns and wash are operational transfers

Cases: WB-REN.J02.C01, WB-REN.J03.C01, WB-REN.J03.C02.

Assumptions: No sale/disposal/impairment assumed; unit carrying value100 in opening fixture; operational transfers have no COGS. Fleet asset measurement remains expert-reviewed separately.

Opening signed ledger cents: {"fleetAsset":200000,"openingEquity":-200000}.

### Step 1: Dispatch10

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"fleetAsset":200000}.

Expected business state: {"warehouseQty":10,"onRentQty":10,"washQty":0,"ownedQty":20}.

### Step 2: Return8good2dirty

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"fleetAsset":200000}.

Expected business state: {"warehouseQty":18,"onRentQty":0,"washQty":2,"ownedQty":20}.

### Step 3: Wash and release2

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"fleetAsset":200000}.

Expected business state: {"warehouseQty":20,"onRentQty":0,"washQty":0,"ownedQty":20}.


## EX-HYB-01 — Mixed job settlement and physical-only cost

Cases: WB-HYB.J01.C01, WB-HYB.J01.C02, WB-HYB.J01.C03.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"inventory":60000,"openingEquity":-60000}.

### Step 1: Collect deposit1000

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 100000 | 0 |
| depositLiability | 0 | 100000 |

Expected signed ledger: {"bank":100000,"depositLiability":-100000}.

Expected business state: {"physicalQty":10,"fleetOwnedQty":20}.

### Step 2: Invoice hire500+service200+goods300+digital100

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 110000 | 0 |
| revenue | 0 | 110000 |
| COGS | 18000 | 0 |
| inventory | 0 | 18000 |

Expected signed ledger: {"AR":110000,"inventory":42000,"COGS":18000}.

Expected business state: {"physicalQty":7,"fleetOwnedQty":20,"profitCents":92000}.

### Step 3: Apply1000 and receive100

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| depositLiability | 100000 | 0 |
| AR | 0 | 100000 |
| bank | 10000 | 0 |
| AR | 0 | 10000 |

Expected signed ledger: {"AR":0,"bank":110000,"depositLiability":0}.

Expected business state: {"profitCents":92000}.

### Step 4: Credit one sold good source100/cost60

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| revenue | 10000 | 0 |
| customerCredit | 0 | 10000 |
| inventory | 6000 | 0 |
| COGS | 0 | 6000 |

Expected signed ledger: {"inventory":48000,"COGS":12000,"revenue":-100000,"customerCredit":-10000}.

Expected business state: {"physicalQty":8,"fleetOwnedQty":20,"profitCents":88000}.


## EX-CORE-01 — Tax arithmetic fixture and exact reversal

Cases: WB-SVC.J03.C02.

Assumptions: Synthetic rate18%, approved decimal rounding fixture. Not legal registration/time-of-supply/filing acceptance.

Opening signed ledger cents: {}.

### Step 1: Post net100.05+synthetic tax18.01

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 11806 | 0 |
| revenue | 0 | 10005 |
| outputTax | 0 | 1801 |

Expected signed ledger: {"AR":11806,"revenue":-10005,"outputTax":-1801}.

Expected business state: {"rounding":"half away from zero; tax18% synthetic"}.

### Step 2: Reverse exact recorded amounts

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| revenue | 10005 | 0 |
| outputTax | 1801 | 0 |
| AR | 0 | 11806 |

Expected signed ledger: {"AR":0,"revenue":0,"outputTax":0}.

Expected business state: {"originalInvoiceRetained":true}.


## EX-CORE-02 — Unclosed profit and report equation

Cases: WB-CORE.J03.C01.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"bank":1000000,"openingEquity":-1000000}.

### Step 1: Invoice600

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| AR | 60000 | 0 |
| revenue | 0 | 60000 |

Expected signed ledger: {"AR":60000}.

Expected business state: {"incomeCents":60000}.

### Step 2: Receive250

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bank | 25000 | 0 |
| AR | 0 | 25000 |

Expected signed ledger: {"bank":1025000,"AR":35000}.

Expected business state: {"receiptsCents":25000}.

### Step 3: Vendor service cost200

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| expense | 20000 | 0 |
| AP | 0 | 20000 |

Expected signed ledger: {"expense":20000,"AP":-20000}.

Expected business state: {"profitCents":40000,"assetsCents":1060000,"liabilitiesCents":20000,"equityIncludingCurrentProfitCents":1040000}.


## EX-BANK-01 — Bank matching is not another receipt

Cases: WB-BANK.J03.C01, WB-BANK.J03.C04.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"bank":25000,"revenue":-25000}.

### Step 1: Match bank250 to existing receipts100+150

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"bank":25000,"revenue":-25000}.

Expected business state: {"matchedBankCents":25000,"matchedBookCents":25000,"newJournalCount":0}.

### Step 2: Record missing bank fee20

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bankFees | 2000 | 0 |
| bank | 0 | 2000 |

Expected signed ledger: {"bank":23000,"bankFees":2000,"revenue":-25000}.

Expected business state: {"newFeeJournalCount":1}.


## EX-BANK-02 — Bank transfer preserves total cash

Cases: WB-BANK.J01.C02, WB-BANK.J05.C01.

Assumptions: No tax; completed/earned transactions; synthetic LKR cents; account purposes bind to actual approved CoA before execution.

Opening signed ledger cents: {"bankA":115000,"openingEquity":-115000}.

### Step 1: Transfer300 A to B

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| bankB | 30000 | 0 |
| bankA | 0 | 30000 |

Expected signed ledger: {"bankA":85000,"bankB":30000,"revenue":0,"expense":0}.

Expected business state: {"totalCashCents":115000}.

### Step 2: Match two statement sides

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {"bankA":85000,"bankB":30000}.

Expected business state: {"totalCashCents":115000,"additionalMoneyJournalCount":0}.


## EX-RET-14-01 — Duplicate quantity refusal

Cases: WB-HYB.J02.C08.

Assumptions: Independent specification arithmetic/state only; no product helper. Tax example conditional on verified supported tax configuration and expert applicability; no statutory approval or posting execution.

Opening signed ledger cents: {}.

### Step 1: Bind independent expected state before live execution; no ledger posting in this arithmetic example

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {}.

Expected business state: {"sourceQty":3,"attemptedQty":4,"newReturnCount":0,"additionalMoneyJournalCount":0}.


## EX-RET-14-02 — Hypothetical taxable full-return arithmetic

Cases: WB-HYB.J02.C09.

Assumptions: Independent specification arithmetic/state only; no product helper. Tax example conditional on verified supported tax configuration and expert applicability; no statutory approval or posting execution.

Opening signed ledger cents: {}.

### Step 1: Bind independent expected state before live execution; no ledger posting in this arithmetic example

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {}.

Expected business state: {"sourceNetCents":25650,"sourceTaxCents":4617,"sourceGrossCents":30267,"requiredFullCreditCents":30267}.


## EX-RET-14-03 — Residual beyond one unit line value

Cases: WB-HYB.J02.C10.

Assumptions: Independent specification arithmetic/state only; no product helper. Tax example conditional on verified supported tax configuration and expert applicability; no statutory approval or posting execution.

Opening signed ledger cents: {}.

### Step 1: Bind independent expected state before live execution; no ledger posting in this arithmetic example

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {}.

Expected business state: {"sourceGrossCents":995,"priorAcceptedCents":891,"requiredFinalCreditCents":104,"finalUnitLineNetCents":100}.


## EX-CORE-14-01 — Unchanged draft discount roundtrip

Cases: WB-CORE.J04.C06.

Assumptions: No tax; independent integer-cent state example; draft is not a posted receivable. Full draft save/post and cost policy require separately bound runtime evidence.

Opening signed ledger cents: {}.

### Step 1: Save draft3x100/line10percent/header5percent, then open Edit without changing it

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {}.

Expected business state: {"grossCents":30000,"lineDiscountCents":3000,"lineNetCents":27000,"headerDiscountCents":1350,"draftTotalCents":25650,"postedJournalCount":0}.


## EX-CORE-18-01 — Zero-stock denial leaves financial state unchanged

Cases: WB-CORE.J06.C07.

Assumptions: Synthetic no-tax fixture; verified physical classification and negative policy block; prior catalog creation separate from rejected invoice. No independent runtime/fault/role acceptance implied.

Opening signed ledger cents: {}.

### Step 1: Attempt invoice1unit at1000cents against available0

| Account purpose | Debit cents | Credit cents |
|---|---:|---:|
| No GL posting | 0 | 0 |

Expected signed ledger: {}.

Expected business state: {"availableUnits":0,"requestedUnits":1,"shortUnits":1,"newInvoiceCount":0,"newJournalCount":0,"ARDeltaCents":0,"inventoryDeltaCents":0}.

