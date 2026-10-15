# v2.5.7 physical-goods live browser run

2026-10-15, Asia/Colombo. Disposable staging https://bookone.clossyan.com. Observed stamp **v2.5.7 /7ffafab**, source 7ffafab14e0ac0b6c3e6150cec1c2c227fee87e6. QA base 5ae37b8f9ca135394e90e00269f950b43b71f8b8. Rulebook1.0.0 SHA256 abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. BR-ACC-01/02/08, BR-PUR-01, BR-STK-01/02/03, BR-SAL-01/02, RB-INV-02, RB-UI-01 and BR-SEC-02; no changed expected business rules or expert approval. Manual assertions below are separate from the earlier immutable automated300 pass.

## Actor, configuration and preserved first attempts

P257-Owner is the actual fresh synthetic signup from the prior checkpoint, with its own P257-Physical company. Popup no longer blocked Chrome. Actual Company Details: Sri Lanka/LKR/Asia-Colombo. Existing authorised platform admin was freshly logged into only for company module setup, then explicitly logged out; P257-Owner freshly logged back in, showing QA/Owner, its own company, Inventory suite and the same build, no Control Room. No new user/role/platform grant. Private UUIDs, synthetic login/password and all submitted/committed checkpoints stay ignored in .local/live-v257/. No reset or cleanup of posted records.

Automatic approval review rejected saving a Pro-plan upgrade plus environment-label change as broader than the required module setup. The safer alternative was accepted through the same UI: retain Starter and the existing environment label, enable only Inventory; POS/Rental/HR remain off. Reload confirmed. The tenant's inherited production label is metadata on the owner-designated disposable staging host, not production access. No alternate runtime, connector or SQL bypass. No remaining request for the broader change.

Before trades, October journal had0 entries/debits0 and all displayed accounts were0. Actual account purpose bindings: Cash1000, Equity3000, AR1300, AP2100, Inventory5100, GRNI2150, Sales4000, SalesReturns4100, COGS5000. Set costing average and negative-stock block via supported company settings; reload persisted both. Product physical/standard tax classification, cost60/price100, opening0; company Sales Settings later confirmed VAT registered=false and credit-limit enforcement=false. Zero-tax local commercial fixture is not Sri Lankan statutory eligibility/format acceptance.

**Fixture preflight correction retained:** initial plan assumed GRNI-on. After receipt, actual Purchase Settings showed default postGrniOnReceipt=false, approval=false, supplier-invoice-required=false, duplicate-bill block=true, GRN-before-bill=false. Therefore the observed receipt is qty-only and its bill must debit inventory600/creditAP600 without receiving stock twice. No receipt GL/GRNI-on acceptance claimed, no mid-stream policy change, no expected amount changed to hide a failure. Future cases must read all relevant policies BEFORE writes. Uniform60 costs do not certify weighted-average/FIFO/last-cost differences.

## Independent ledger anchors and actual observations

| Step | Observed result |
|---|---|
| Owner contribution1000 | Dr Cash1000/Cr Equity1000;1 journal |
| PO10 at60 | PO-20261015-0001 confirmed600; GL not posted; journal still1, stock0 |
| PO to GRN | GRN-20261015-0001 received10/value600 at run warehouse; qty-only, journal still1 |
| GRN to bill | PUR-20261015-0001 open600; Dr Inventory600/CrAP600; journal2; stock stays10/value600 |
| Quote to order | QT-20261015-0001 draft400, SO-20261015-0001 confirmed400,4 at100/customer/description preserved in visible data |
| Order to invoice | INV-20261015-0001 open400; DrAR400/CrSales400 and DrCOGS240/CrInventory240; journal3; stock6/value360; P&L profit160 |
| Customer cash receipt150 | One payment; invoice partial paid150/due250; DrCash150/CrAR150; journal4; receipt page crashes (BUG-0045) |
| Linked credit1 at100 | SR-20261015-0001 paid100; DrReturns100/CrAR100, DrInventory60/CrCOGS60; stock7/value420; invoice settled250/due150; journal5 |
| Supplier cash payment200 | Bill partial paid200/due400; DrAP200/CrCash200; remittance renders200; journal6 |

Final account/P&L results agree with independent expectations: Cash950, AR150, Inventory420, AP400, Equity1000, gross revenue400, returns100, COGS180, profit120. Assets1520. Final net debit balances1800 = net credit balances1800; trial-balance activity rows and six journals sum2750 debits/2750 credits. Each checked journal balanced. AR aging150 current/AP aging400 current. Stock ledger exactly3 movements: +10 purchase from GRN, -4 sale, +1 return, unitcost60. No double receipt on billing. Balance Sheet nevertheless displays liabilities+equity1400 instead of1520 (BUG-0048).

## Manual assertion outcomes

| ID | Assertion | Result |
|---|---|---|
| LP257-001 | Country/currency/timezone and zero journal/account baseline | Pass |
| LP257-002 | Average/block settings save and survive reload | Pass |
| LP257-003 | Inventory-only module save and fresh normal Owner context | Pass |
| LP257-004 | Capital uses Cash/Equity, not revenue | Pass |
| LP257-005 | Saved physical SKU has60cost/100price/0opening | Pass |
| LP257-006 | Run-owned warehouse created by supported UI | Pass |
| LP257-007 | PO600 leaves stock0 and journal1 | Pass |
| LP257-008 | Qty-only GRN10/value600 leaves journal1 | Pass |
| LP257-009 | Bill posts600 and does not receive twice | Pass |
| LP257-010 | Quote/order conversion visible customer/line/price400 | Pass, bounded; separate post-order no-GL snapshot not captured |
| LP257-011 | Invoice AR/revenue400, COGS240, stock6/value360, profit160 | Pass |
| LP257-012 | Receipt150 committed once, invoice due250 and exact journal | Pass |
| LP257-013 | Customer payment receipt page renders | FAIL BUG-0045; repeats on read-only visit |
| LP257-014 | Linked credit100 restores cost60/qty1 and AR150 | Pass |
| LP257-015 | Supplier payment200, AP400 and remittance | Pass |
| LP257-016 | Final accounts/P&L/trial activity and six balanced journals | Pass |
| LP257-017 | AR/AP aging and stock movement ledger reconcile | Pass |
| LP257-018 | Oversell8 against7 creates no new invoice/stock/journal effects | Pass, bounded UI snapshots |
| LP257-019 | Overpayment151 againstAR150 creates no additional receipt/journal effects | Pass, bounded UI snapshots |
| LP257-020 | Invoice print preview shows4at100/400 and actual company/customer | Pass, browser preview only |
| LP257-021 | Balance Sheet assets equal liabilities+equity including earnings | FAIL BUG-0048;1520 vs1400 |
| LP257-022 | First PO accepts alternative new-vendor field alone | FAIL BUG-0046; native required primary field blocks |
| LP257-023 | Sales-order View uses correct document identity | FAIL BUG-0047; displays QUOTATION/Good thru |

23 bounded manual assertions:19 pass,4 fail. They do not count as23 fully accepted workflows, and are not added to the prior300 automated count. LP257-018 returns to invoice list with only the original invoice; stock7/value420 and journals6/debits2750 unchanged. LP257-019 leaves invoice settled250/due150 and journals6/debits2750 unchanged. No persistent error text was captured for these denials; product source intends short toasts, so actionable feedback timing remains unverified, not a newly asserted defect or a pass. Full DB/audit immutability was not observed through UI. No role-negative write, period lock, idempotent replay, race/fault, variable-cost, VAT, history/upgrade/file/restore acceptance in this manual slice.

One Cloudflare502 occurred at /inventory/levels at2026-10-15 04:40:32UTC after invoice posting. Native page said Browser working/Cloudflare working/Host error. One reload recovered with the same stamp; first failure retained as environment flakiness, root cause unknown. Other DOM-read timing issues resolved with loaded accessibility state; do not classify every locator timeout as a product outage. Screenshot evidence was shown in-session for the unbalanced Balance Sheet; no public raw image or fabricated artifact link. No server log access or proven data loss.

## Next and acceptance

RT-060 added as a separate regression for BUG-0048: a fresh isolated service invoice600 has AR/assets600, profit600, no liability and expected report equity600 without rewriting its journal. Existing300 expectations unchanged. Planned total301/PG127; execution/result recorded separately when available. Browser and isolated DB boundaries remain distinct.

Preserve this synthetic company for read-only retests of receipt and report fixes. Do not recreate already-posted payments. Next physical slices: GRNI-on set BEFORE a separate receipt, variable-cost return/backdating/settings, locked periods and actual role/tenant denials. Then service/digital/rental/mixed/settings/files/history. Backup/restore LAST. POS/Rental not enabled in this fixture; use supported scoped configuration, never a broader rejected change. No customer-readiness certificate; new P1 report defect blocks release.
