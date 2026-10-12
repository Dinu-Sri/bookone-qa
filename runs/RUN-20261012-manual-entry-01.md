# RUN-20261012-manual-entry-01

Status: completed.
Acceptance: failed because the selected Simple Entry cash-sale path could not post. Other executed assertions passed at the observed staging build.

## Fingerprint and preconditions

- Target: owner-authorized disposable staging environment; public record omits environment and tenant identifiers.
- Product deployed SHA/image, schema and storage identity: unresolved. These results are exploratory evidence and are not release acceptance.
- QA baseline before this record: `de4928375292b502442a94a327389f3e00c1a6ad`.
- Browser: user-authenticated Chrome session through Codex computer use.
- Business clock: 2026-10-12; currency LKR; tenant identity withheld from this public record.
- Synthetic prefix: `QA-261012-A`.
- Customer, brand and location: staging test records; identifiers withheld from this public record.
- Initial physical-product stock: 10 units at Dharga Town; unit cost LKR 60; unit sell price LKR 100.

## Test selection and results

| Scenario | Required assertion | Result | Evidence | Bug/blocker |
|---|---|---|---|---|
| Create physical, service and digital products | persisted type, SKU, price, cost and opening quantity | passed | product list showed all three records | none |
| Create mixed quotation | 2 physical × LKR 100 + 1 service × LKR 300 = LKR 500 | passed | `QT-20261012-0001`, draft, LKR 500 | none |
| Create digital quotation | 3 digital × LKR 150 = LKR 450 | passed | `QT-20261012-0002`, draft, LKR 450 | none |
| Post mixed credit invoice | AR/revenue LKR 500; COGS/inventory LKR 120; stock 10 to 8 | passed | `INV-20261012-0001`; balanced journal debit/credit LKR 620; product list quantity 8 | none |
| Post digital-only credit invoice | AR/revenue LKR 450; no inventory or COGS line | passed | `INV-20261012-0002`; balanced two-line journal debit/credit LKR 450 | none |
| Simple Entry new cash sale | UI promises Sales Revenue 4000 and posting succeeds | failed | submit returned `Account code 4300 not found in chart of accounts.`; no entry created | [BUG-0001](../bugs/BUG-0001-simple-entry-sales-account-mismatch.md) |
| Simple Entry owner contribution | bank debit and owner-equity credit LKR 1,250 | passed | 1100 debit / 3000 credit; balanced | none |
| Simple Entry office-supplies payment | expense debit and bank credit LKR 400 | passed | 6500 debit / 1100 credit; balanced | none |
| Journal integrity | all entries balance | passed | journal UI reported Integrity OK and all entries balance | does not prove reconciliation, locks, retry or reversal |

Counts: 9 selected, 9 executed, 8 passed, 1 failed, 0 blocked, 0 not-run, 0 skipped, 0 flaky.

## Created records and numerical reconciliation

- Product `QA-261012-A-PH` — `QA-261012-A Notebook`, physical, cost LKR 60, sell LKR 100, opening quantity 10 at the selected test location; ending quantity 8.
- Product `QA-261012-A-SV` — `QA-261012-A Consulting`, service, cost LKR 0, sell LKR 300.
- Product `QA-261012-A-DG` — `QA-261012-A Digital Guide`, digital, cost LKR 0, sell LKR 150.
- Quotation `QT-20261012-0001` — mixed physical/service, draft, LKR 500.
- Quotation `QT-20261012-0002` — digital only, draft, LKR 450.
- Invoice `INV-20261012-0001` — open credit invoice, LKR 500. Journal: Dr 1300 AR 500; Cr 4000 Revenue 500; Dr 5000 COGS 120; Cr 5100 Inventory 120.
- Invoice `INV-20261012-0002` — open credit invoice, LKR 450. Journal: Dr 1300 AR 450; Cr 4000 Revenue 450. No stock or COGS line observed.
- Owner contribution — LKR 1,250: Dr 1100 Commercial Bank; Cr 3000 Owner Equity.
- Office supplies payment — LKR 400: Dr 6500 Office Supplies Expense; Cr 1100 Commercial Bank.
- Net effect of the two successful Simple Entry transactions on account 1100: +LKR 850.
- Invoice receivables created: LKR 950. Invoice revenue created: LKR 950. Inventory reduced by LKR 120 and physical quantity by 2.

## Evidence and cleanup

- First-attempt failure was preserved before the valid alternative Money In transaction was recorded.
- The Transactions register showed both successful Simple Entry records, both invoices and the opening-stock adjustment.
- The Journal showed exact account sides and balanced totals for the two invoices and two Simple Entry records.
- A screenshot was reviewed in-session but is not committed because the repository is public and screenshots are treated as potentially sensitive.
- No emails, external payments or production actions occurred.
- Records are intentionally retained for user review. Cleanup remaining: all records listed above.
- Exact next action: reproduce BUG-0001 on an identified staging build, inspect the Simple Entry money-in account mapping against the deployed chart of accounts, fix it in BookOne, then run the original cash-sale path plus owner-contribution, office-expense and adjacent invoice regressions.
