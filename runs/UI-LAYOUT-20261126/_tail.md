## Incidental functional finding (outside UI scope, for the functional thread)

Shareable report with images: https://claude.ai/artifact/E5UyGKEMsCCaJq2U9xK185 (private until shared). This file is the repo copy; images are in `img/`.

**F-01 — Posting a sales document to an existing customer creates a duplicate customer when the display name differs from the legal name.** High.
The customer picker on invoice/quotation/order forms submits the display name (`partyName` = "Lanka Hardware") instead of the party id. When the customer's legal name differs ("Lanka Hardware & Building Supplies (Private) Limited"), posting creates a new customer (CUS-0007) and books the receivable there, leaving the real customer (CUS-0001) at LKR 0. Reproduced three times (CUS-0007, -0008, -0009) and the same pattern for vendors (8 vendor rows after creating 4). Repro: create customer with Legal name A and Display name B; New invoice, pick that customer, Post; Customers list now shows two rows named B and the balance sits on the new one. Fix: submit `partyId` from the select and resolve by id server-side; only create a party from the free-text "Or type new name" field.

Also noticed: on the quotation form the field named `placeOfSupply` holds payment terms and `paymentMode` holds the ship-via values (labels are right, field names are swapped), worth checking that the saved values land in the intended columns.

## Coverage and limits

- Covered: every sidebar route plus Inventory, POS, Rental routes reached by URL; list, empty, new, edit, detail and print-preview states for sales and purchase documents; reports (P&L, balance sheet, cash flow, GL, trial balance, VAT); company settings; AgentBridge; Commerce new-connection form.
- Data: 10 parties, 6 sales invoices (posted, partial, paid, draft), 2 quotations, 1 sales order, 1 PO, 2 credit purchases, 2 cash purchases, 1 customer receipt (2 invoices), 1 vendor payment.
- Not covered: populated Inventory/POS/Rental screens and the full-screen POS terminal. Inventory is off for new companies (set in Control Room), so products, stock and POS sales could not be created with this account. Re-run those once Inventory/POS are enabled for UI-A.
- Automated detector (scripts/ui-layout-audit/detect.js) flags page overflow, off-viewport elements, clipped text, overlapping leaves and cropped field values; every finding above was confirmed by eye on the screenshots. Overlap hits from the collapsed sidebar panels on mobile were false positives and are not reported.

## Re-running

`scripts/ui-layout-audit/`: `audit.js <label> routes-full.txt desktop,tablet,mobile` with a logged-in `storage-state.json` (not committed). Seeding helpers: `seedcust.js`, `seeddocs.js`, `seed2.js`. Test account alias UI-A; its password is held privately by the owner, never in this repo.
