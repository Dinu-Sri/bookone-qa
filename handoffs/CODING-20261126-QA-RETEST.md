# Coding handoff — QA retest 26 Nov 2026 (v2.17.12 · e2e04d2)

For the coding agent. Read product AGENTS.md, docs/VERSIONING.md and docs/QA_CHANGE_CONTRACT.md before editing. Fix in one candidate, bump VERSION, add a docs/changes record, and add tests that reproduce each finding before the fix. Owner deploys. QA retests on the new build with the same synthetic company.

Run record: [runs/RUN-20261126-blockers-agentbridge-commerce.md](../runs/RUN-20261126-blockers-agentbridge-commerce.md). Screenshots: [runs/evidence/20261126/](../runs/evidence/20261126/).

Test company on staging: "QAOwner Nov26's Company" with Owner, Viewer and Cashier logins (credentials held privately by the owner). Staging and bookone.clossyan.com are the same deployment.

**How QA tested server permissions:** as Owner, perform the action in the browser and capture the Next.js server-action POST (`Next-Action` header + multipart body). Replay that exact request from a page signed in as Viewer or Cashier, then read the data back as Owner. Hiding a button is not a fix; the server action must refuse.

---

## QA-1126-01 · P1 · OAuth consent redirect uses 307, so Claude's callback gets a POST and fails

**Where:** `apps/web/src/app/api/agent-bridge/oauth/authorize/route.ts`, POST handler. `NextResponse.redirect(authorizationCallbackUrl(...))` (about line 232) and the Cancel path `NextResponse.redirect(denial)` (about line 166). `NextResponse.redirect` defaults to **307 Temporary Redirect**, which tells the browser to repeat the **POST** (with the consent form body) to the client's `redirect_uri`.

**Repro:**
1. Signed in to BookOne as Owner, open
   `https://bookone.clossyan.com/api/agent-bridge/oauth/authorize?response_type=code&client_id=bookone-claude&redirect_uri=https%3A%2F%2Fclaude.ai%2Fapi%2Fmcp%2Fauth_callback&code_challenge=<S256>&code_challenge_method=S256&scope=read%20upload%20draft&state=<s>&resource=https%3A%2F%2Fbookone.clossyan.com%2Fapi%2Fagent-bridge%2Fmcp`
2. Click **Allow connection**.

**Expected:** 302/303 to `https://claude.ai/api/mcp/auth_callback?code=…&state=…&iss=…`, browser does a GET, Claude finishes the connector sign-in.

**Actual:** response `307` with that Location. The browser POSTs to Claude's callback, which answers `{"type":"error","error":{"type":"invalid_request_error","message":"Method Not Allowed"}}`. The connector never completes. (QA exchanged the captured code itself and everything after that works, so this is the only break.) Evidence: `oauth-consent.png`, `oauth-after-allow-405.png`.

**Fix:** use `NextResponse.redirect(url, 303)` (See Other) for every redirect from the consent POST, including Cancel/denial. Add a route test asserting status 303 and no body forwarding. Also worth aligning metadata: `/.well-known/oauth-authorization-server` lists scopes `read upload draft` while `/.well-known/oauth-protected-resource` lists `post`, `commerce_read`, `commerce_propose`; publish one consistent list of what a client may request.

---

## QA-1126-02 · P1 · Viewer and Cashier can create and archive discounts

**Where:** `apps/web/src/app/actions/discounts.ts` — `createDiscountFromForm`, `updateDiscountFromForm`, `setDiscountActiveFromForm`, `archiveDiscountFromForm` call only `requireTenantContext()`; no `assertPermission`/`assertModuleWrite`.

**Repro:**
1. Sign in as Viewer → Sales → Discounts. The **New discount**, Edit, Deactivate and Archive controls are all shown.
2. New discount → name `QA-VIEWER-DISC`, 5% → Save. Saved.
3. As Viewer click Archive on another discount. Archived.
4. Cashier is redirected away from the page (`/pos?denied=1`), but replaying the Viewer's create request with the Cashier's session creates `QA-CASHIER-RPL`.

**Expected:** Viewer and Cashier refused with "You do not have permission to do that.", nothing written. Viewer sees a read-only list.
**Actual:** rows created/archived. Evidence: `disc-after-QA-VIEWER-DISC.png`.

**Fix:** add the sales-settings (or a dedicated `sales.discounts.write`) permission check at the top of all four actions, using the same `assertPermission(..., 'write')` pattern as `sales-settings.ts`. Hide write controls for read-only roles. Add Viewer/Cashier/Owner tests for each action.

---

## QA-1126-03 · P1 · Viewer and Cashier can add company verification domains

**Where:** `apps/web/src/app/actions/company-domains.ts` — `createCompanyDomain` and `verifyCompanyDomain` have no permission check.

**Repro:** Viewer → Company → Domain Verification → enter `viewer-qa-2611.example.com` → Add domain. A pending domain with a DNS TXT token is created. Replaying with the Cashier session adds `cashier-qa-2611.example.com`.

**Expected:** only Owner/Admin can add or verify domains (the page says verified domains drive domain-based organisation access).
**Actual:** both created. Evidence: `domain-viewer-qa-2611.example.com.png`.

**Fix:** `assertPermission('company.settings.write', 'write')` (or the existing company-security permission) in both actions; audit-log each change; read-only UI for others. Test that a non-admin cannot verify a domain even with a valid TXT record.

---

## QA-1126-04 · P1 · Duplicate customer/vendor created on posting when display name ≠ legal name

Also seen by the UI audit (company "Uma Audit's Company", three times).

**Root cause:** `listPartyOptions` (`apps/web/src/app/actions/parties.ts` ~665) returns `name: r.displayName || r.name`, and the party picker (`components/module/party-name-fields.tsx`) submits that string as `partyName`. On post, `commercial-docs.ts` (~1274) calls `ensureParty({ name })`, which matches only `lower(parties.name)` (the legal name). "Acme" ≠ "Acme Trading (Private) Limited", so a new party is inserted and the document's balance goes to it.

**Repro (customer):**
1. Parties → Customers → New: Legal name `Acme Trading (Private) Limited`, Display/trading name `Acme`, Customer only → Save (CUS-0001).
2. Sales → Invoices → New → Customer `CUS-0001 — Acme` → line "Consulting service" 1 × 500 → **Post**.
3. Customers list now shows **CUS-0002 Acme LKR 500** and **CUS-0001 Acme LKR 0**.

**Repro (vendor):** same with vendor legal `Lanka Supplies (Private) Limited`, display `LankaSup` → Purchases → New → vendor `VEN-0001 — LankaSup` → Save purchase 200 → VEN-0002 LankaSup 200 created; VEN-0001 stays 0.

**Expected:** the document posts to the selected party; no new party.
**Actual:** duplicate party with the balance; the original shows 0. The duplicate also leaks into AgentBridge's approved-supplier list. Evidence: `dup-customers.png`, `dup-vendors.png`.

**Fix:**
1. Submit and resolve the selected party by **id** (`partyId` hidden field), not by name. Keep the free-text "type new name" path separate.
2. In `ensureParty`, when only a name is given, match `lower(name) = x OR lower(display_name) = x` and refuse (ask the user) if more than one party matches, instead of creating one.
3. Data repair: provide an owner-run merge for parties created by `ensureParty` (audit note "Created party via ensureParty.") whose name equals another party's display name; move documents/journal subledger links to the original and void the duplicate. Do not rewrite posted journal amounts.
4. Tests: sales invoice, quotation→invoice, sales return, purchase bill, purchase return, POS, AgentBridge bill, each with display ≠ legal name.

---

## QA-1126-05 · P2 · Viewer can import bank statements; reconciliation actions lack permission checks

**Runtime:** Viewer → Reconciliation → Import bank file → upload a CSV → pick bank 1100 → Review totals → **Save bank lines** succeeds. As Owner, Reconciliation shows a new "Commercial Bank · 1100, 1 file · 2 lines, Ready to reconcile" and an imported file `bank-nov.csv` (`viewer-bankimport-owner-view.png`). Viewer is then offered Confirm match / Waiting to clear / Create in BookOne.

**Source:** no `assertPermission` in `bank-import-studio.ts` (`createStudioDraft`, `saveStudioDraftStep`, `commitStudioImport`), `bank-reconciliation.ts` (all write actions, e.g. `confirmCaseMatch`, `createCaseEntry`, `finishReconciliationSession`, `voidBankImport`, `reopenReconciliationSession`), `statement-import.ts` (`commitStatementImport`, `confirmStatementCreates`, `undoStatementCreates`, `voidStatementImport`, …) or `reconciliation.ts` (`lockPeriod`, `createBankStatementImport`, `updateBankStatementLineStatus`). Only the import was proven live; the others are source-level evidence and must be covered by tests. `createCaseEntry`/`confirmStatementCreates` can post journals, and `lockPeriod` locks a period, so treat these as high risk.

**Fix:** add a banking/reconciliation write permission (and the posting permission where a journal is created) to every write action in these four files; read-only UI for Viewer. Tests for Viewer/Cashier refusal and Owner success.

Also source-only, same pattern: `inventory.ts` `archiveProductFromForm`, `restoreProductFromForm`, `deleteProductFromForm` have no `assertModuleWrite('inventory')` (create/update do). Could not be run live because Inventory is off (QA-1126-06).

---

## QA-1126-06 · P2 · New "Company (Pvt Ltd)" has Inventory off

**Update 26 Nov (later):** the owner enabled all modules for the test company from Control Room, so commerce and POS were then tested. The onboarding mismatch below still applies to new companies.

**Repro:** sign up → onboarding **Company (Pvt Ltd) — "Full company ERP — sales, purchase, stock, POS"** → Inventory → Products → New: "This catalogue is view-only because Inventory is off for this company… Plan and modules are set in Control Room" (`inventory-off.png`). Commerce Integrations still lets the Owner create a store connection, but nothing can be mapped or stocked.

**Expected:** the plan chosen at onboarding enables what the onboarding card promises, or the card says what is not included and how to get it.
**Fix:** align the onboarding entity→plan defaults with `modulesForPlan`, or change the onboarding copy; give the Owner an in-app path (request/upgrade) instead of "set in Control Room". Commerce Integrations should explain that Inventory is required before a connection is created.

---

## QA-1126-07 · P2 · AgentBridge accepts the same file again as a new document

**Repro:** Purchases → Document Inbox → upload `ab-inv-001.pdf` → Receive document. Upload the identical file again. Two inbox rows, same hash `3df99585…`. Same via the upload-session fallback with an already-posted file (`9a68df3c…`, document 460b… after 3ef9… was posted).

**Expected:** "This file was already received on <date> (document X, status posted). Open it, or upload anyway as a separate document." Idempotency per logical key already works; this is about different uploads of the same bytes.
**Actual:** a second document with no warning. The second bill with the same supplier invoice number did not post (good), but see QA-1126-08 for the silent refusal. Evidence: `ab-dup-doc2.png`.

**Fix:** on intake (browser, MCP `submit_document`, `finalize_upload_session`), look up an active document with the same tenant + content hash; return/link it and require explicit confirmation to keep a duplicate. Surface "possible duplicate" on the inbox list.

---

## QA-1126-08 · P2 · "Commit purchase bill once" refuses with no message

**Repro A (posting stopped):** Company → AgentBridge: Inbox ON, Draft-only ON, Stop posting ON. Inbox document with facts → Calculate preview → Approve → **Commit purchase bill once**. Page reloads, status stays "awaiting approval", no bill, **no message** (`ab-commit-stopped.png`).

**Repro B (duplicate supplier invoice):** posting ON, Purchase settings "Block duplicate bills" ON. Second document (same PDF) with the same supplier `ABC Services (Pvt) Ltd` and invoice `ABC-2611-001` → preview → approve → commit. No second bill (correct) but again no message, status "awaiting approval".

**Expected:** a clear banner: "Agent posting is stopped for this company" / "A bill ABC-2611-001 from ABC Services already exists (PUR-…)". Status explains what to do next.

**Where:** `apps/web/src/app/actions/agent-bridge.ts` `commitInboxProposal` only redirects with `?err=` when the receipt is `{ ok: false }`. In case B the service returns a receipt that is not `ok:false` (an existing/failed operation receipt), so the action redirects without an error. Check also that the inbox page renders `?err=` at all.
**Fix:** normalise the commit result: any receipt whose status is not `posted` must produce a user-facing message; render `err` on the inbox detail page; record the refusal reason on the document. Detect the duplicate supplier invoice at validate/preview time and add it as an issue before approval.

---

## QA-1126-09 · P3 · Permission refusals surface as HTTP 500

Replaying Owner requests as Viewer/Cashier for **Company details**, **POS register create**, **VAT settings**, **AgentBridge settings**, **AgentBridge inbox upload** and **AgentBridge commit** returns HTTP 500 with a Next.js error digest. Data is correctly unchanged, but users get a generic error page and logs fill with 500s. Bank account and Simple Entry return a clean `{ ok:false, error:"You do not have permission to do that." }`. Use the same pattern everywhere (catch the permission error and return/redirect with `flash=denied_write`).

## QA-1126-10 · P3 · Approval line shows a raw user ID

Inbox detail after approval: "Approved by f22ac3ba-a4b0-4756-8542-b5310fc88a95. Expires 2026-11-26T06:23:14.387Z." Show the approver's name and a local time ("Approved by QAOwner Nov26 · expires 11:53 AM").

## QA-1126-11 · P3 · MCP returns STALE_REVISION for an unsupported argument

`lookup_suppliers {"query":"ABC"}` → `{"code":"STALE_REVISION","error":"$.query is not a supported field."}`; same for `create_upload_session` with `idempotencyKey`. Use `INVALID_ARGUMENT` (or JSON-RPC -32602) so agents do not think the document changed.

## QA-1126-12 · P3 · Commerce connection created with no stock location

Create connection accepts "Choose a stock location" left empty (no locations exist, Inventory off). The connection then shows "Not chosen · LKR". Require a location (or block creation with a reason) when posting needs one.

## QA-1126-13 · P3 · Commerce API: misleading message for an invalid token

`Authorization: Bearer bkc_sand_bad_x` → 401 "A commerce bearer token is required." Say "The commerce token is invalid, revoked or expired."

## QA-1126-14 · P3 · Balance Sheet asset order

Reports → Balance Sheet lists assets as 5100 Inventory, 1360, 1000, 1101, 1200, 2300, 1300, 1350, 1100, 1400 (`bank-balancesheet.png`). Sort by account code within each section. (Also: the inventory asset uses code 5100 inside the 5xxx cost range; check this is intended.)

## QA-1126-15 · P3 · Email verification message vs behaviour

Sign-up shows "Account created. Check your email to verify before signing in." but sign-in works immediately without verifying. Either enforce verification or change the copy.

## QA-1126-16 · P1 · Concurrent paid orders for the last unit all post: stock goes negative

**Where:** `packages/commerce/src/service.ts` about line 843 reads stock with `getStock()` and only then decides `received` vs `needs_review`; `adjustStock()` in `apps/web/src/app/actions/commercial-docs.ts` (about line 570) reads `qtyOnHand` and checks `blockNegative` without a row lock. Two requests read the same quantity and both pass.

**Repro:**
1. Inventory on, location "QA Main Store", product SKU-RACE qty 1, mapped to `site-103`, connection posting mode **posting**. Inventory Settings → negative stock **Block**.
2. Send 3 `POST /orders` at the same time (different `externalId`/Idempotency-Key: woo-401, woo-402, woo-403), each `payment.status: paid`, 1 × site-103.

**Expected:** one order posts; the others go to `needs_review` with the oversell reason; stock ends at 0.
**Actual:** all three post. Stock for SKU-RACE is **−2**, even with "Block negative stock". Same with policy Allow (woo-2001/woo-2002 on SKU-1 → −1). Sequential oversell is caught correctly (woo-3004 asked for 5 with 2 on hand → needs_review). Evidence: `com-race-invoices.png`, `com-race-levels.png`.

**Fix:** take a row lock on the stock level (`SELECT … FOR UPDATE` on `inventory_stock_levels` for tenant/product/location, inside the posting transaction) or use a conditional update (`UPDATE … SET qty_on_hand = qty_on_hand - $q WHERE … AND qty_on_hand >= $q RETURNING`) and treat zero rows as oversell → `needs_review`. The commerce pre-check must run in the same transaction as the decrement. Add a test that fires N concurrent orders for one unit and asserts exactly one posts.

## QA-1126-17 · P1 · Concurrent postings get the same invoice number and the same customer code

**Where:** `nextDocumentNumber()` in `apps/web/src/app/actions/commercial-docs.ts` (line 506) and `nextPartyCode()` in `apps/web/src/app/actions/parties.ts` (line 291) both compute `count(*) + 1` with no lock and no unique constraint.

**Repro:** the race in QA-1126-16. woo-2001 and woo-2002 both became **INV-20261126-0002** and their new customers both **CUS-0003**. woo-401/402/403 all became **INV-20261126-0006** and three "Race Shopper" customers all **CUS-0008** (`com-race-invoices.png`). Any two users posting at the same moment hit the same thing.

**Expected:** unique, gap-controlled numbers per tenant/type/window; unique party codes.
**Fix:** use a per-tenant counter row (`document_sequences(tenant, type, window)` with `UPDATE … SET next = next + 1 RETURNING`) or a Postgres advisory lock around allocation, and add unique indexes on `(tenant_id, document_type, document_number)` and `(tenant_id, code)` for parties. Note `count(*)` also excludes voided documents, so voiding one can make the next document reuse an existing number. Add a repair script for the existing duplicates on staging.

## QA-1126-18 · P1 · Commerce cancel-after-post and refunds always fail (422 "same customer")

**Where:** `apps/web/src/lib/commerce-runtime.ts` line 65–71, `postSalesReturn` hardcodes `partyName: 'Commerce refund'`. The linked-return guard `linkedReturnPartyMismatch` (`packages/accounting/src/document-guards.ts` about line 657) then rejects every return because the party differs from the original invoice.

**Repro:**
1. Paid order woo-3003 posts → INV-20261126-0004.
2. `POST /orders/{id}/events` `{type:"cancelled"}` → **422** "This return must use the same customer as the original invoice."
3. Paid order woo-3005 → INV-20261126-0005; `POST /orders/{id}/events` `{type:"refunded", restock:false, lines:[…]}` → same 422.

**Expected:** a sales return linked to the original invoice for the same customer; restock when requested; order status `cancelled`/`refunded`.
**Actual:** the orders stay `posted`, no return, no restock, and the failure does not appear under Activity → Orders needing review (`com-activity-after.png`), so a shop owner never learns the refund was not booked.
**Fix:** pass the original invoice's `partyId` (and name) into `postSalesReturn`; record a failed event as `needs_review` with the error so it shows in Activity with Retry. Add tests for cancel-after-post, refund without restock and refund with restock.

## QA-1126-19 · P2 · Cashier sees POS Return but cannot complete it

**Where:** Cashier template (`packages/auth/src/permissions/templates.ts` line 206) grants `pos.terminal.write` but not `sales.returns.write`; `completePosReturn` (`apps/web/src/app/actions/pos-session.ts` line 572) creates a `sales_return`, which needs that key.

**Repro:** Cashier opens a shift on REG1, sells QA Widget Var (POS-20261126-0001, LKR 800 cash). Return → find POS-20261126-0001 → Return all remaining → REFUND → **Complete refund · LKR 800.00** → "You do not have permission to do that." The same steps as Owner work (SR-20261126-0001, stock restored). Evidence: `pos-return.png`, `pos-return-done.png` (Owner).

**Expected:** decide the rule. If cashiers may refund at the till, grant a POS-scoped return permission (for example `pos.returns.write`) and check that in `completePosReturn`. If not, hide the Return tab for cashiers or show "Ask a manager" before the cashier builds the refund.

## QA-1126-20 · P2 · Commerce orders post with no VAT on a VAT-registered company

Company is VAT registered at 18%. Paid web orders post commercial invoices with no Output VAT line. Either apply the product/company tax code, treat the shop price as tax-inclusive per a connection setting, or put the order in review when tax cannot be determined.

## QA-1126-21 · P3 · Commerce and POS small issues

- A refund event that arrives for an order already in review overwrites the original review reason (woo-3006: "Oversell…" replaced by "Refund arrived before its order was posted"). Keep both.
- Paid web orders leave the invoice open in AR ("settlement not_configured"). Offer a clearing account per connection so paid orders are settled.
- Inventory negative-stock policy defaults to **Allow** for new companies. Default to Block (or ask at setup) when POS or commerce is on.
- A POS cash sale with no customer creates a party "Walk-in" (CUS-0007). Reuse one walk-in party per company.

---

## Retest checklist after the fix

1. Replay the captured Owner requests for discounts, domains, bank import, reconciliation and statement import as Viewer and Cashier → all refused, data unchanged; Owner still succeeds.
2. Display-name customer/vendor → invoice, bill, returns, POS, AgentBridge → no new party; existing duplicates mergeable.
3. Real Claude custom connector (client `bookone-claude`) completes sign-in; consent returns 303.
4. Duplicate file and duplicate supplier invoice show clear messages; posting-stop refusal shows a message.
5. Commerce: fire 3 concurrent paid orders for the last unit → exactly one posts, others needs_review, stock 0, unique invoice numbers and customer codes. Cancel after post and refund with/without restock → linked sales return for the same customer, stock restored only with restock. Failed events appear in Activity.
6. POS: Cashier completes (or is clearly refused before building) a return; VAT appears on commerce invoices for a VAT-registered company.
