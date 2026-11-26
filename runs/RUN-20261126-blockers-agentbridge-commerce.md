# Retest: blockers, AgentBridge and ecommerce connector — 26 November 2026 (UTC)

Status: **NOT customer-ready.** The 19 Nov bank blockers and the five AgentBridge safety failures are fixed on the live build. New P1 defects remain: an OAuth redirect bug that stops the real Claude connector from completing sign-in, missing server permission checks (discounts, company domains, bank statement import), and duplicate customers/vendors on posting. The ecommerce connector could only be tested up to order intake because Inventory is switched off for new companies.

- Target: `https://staging.clossyan.com` and `https://bookone.clossyan.com` (same deployment and database). Build shown on login: **v2.17.12 · e2e04d2** (product commit `e2e04d29920265c2556a26cfc03590f5abcc1bbb`).
- Method: real browser automation (Playwright/Chromium) against staging, plus direct HTTP for the Commerce v1 API and a standards OAuth 2.1 + MCP client for AgentBridge. Server-side permission checks were tested by capturing the Owner's real server-action request and replaying it with the Viewer's or Cashier's own session cookie, then reading the result back as Owner. A refused replay that changed nothing counts as a pass; a replay that changed data counts as a fail.
- Data: all synthetic. Fresh company **"QAOwner Nov26's Company"** with Owner, Viewer and Cashier logins, plus a second empty company used as the restore target. Credentials are kept privately by the owner (not in this public repo).
- Coding handoff with fixes: [handoffs/CODING-20261126-QA-RETEST.md](../handoffs/CODING-20261126-QA-RETEST.md).
- Screenshots: [runs/evidence/20261126/](evidence/20261126/).

## Summary

| Area | Result |
|---|---|
| Server permission checks (Viewer, Cashier) | **Partly fixed.** 10 write actions now refuse. Discounts, company domains and bank statement import still accept Viewer/Cashier writes. |
| Bank balances | **Fixed.** Custom bank 1101 shows its balance; own-account transfer is not an outflow. |
| Duplicate customer/vendor on posting | **Confirmed defect** (reported by the UI audit; reproduced for both customers and vendors). |
| AgentBridge service safety (AB-05 independent reproductions) | **Fixed.** 5/5 pass on v2.17.12 source. |
| AgentBridge live end to end | **Works with one P1 blocker.** Upload → facts → preview → human approval → one bill posts. Stale approval, double commit, agent self-approval and agent posting are all refused. Revoke works. **OAuth consent redirect uses HTTP 307, so Claude's callback gets a POST and returns 405.** |
| Backup / restore | **Pass.** Restore into a fresh empty company matches balances, bills and original PDF bytes; AgentBridge safety flags come back ON; commerce keys and team members are not copied. |
| Ecommerce connector | **Partly tested.** Key issue, auth, order intake, idempotency, cancel, pause and reservations behave as documented. Mapping, stock publish, paid-order posting, last-unit race and refunds are **blocked**: Inventory is off for new companies and only Control Room can turn it on. WooCommerce plugin live install not run (no WordPress host available to QA). |

## Findings

Severity: P1 = must fix before customers; P2 = fix before pilot; P3 = polish.

| ID | Sev | Title |
|---|---|---|
| QA-1126-01 | P1 | AgentBridge OAuth consent redirects with 307, so Claude's callback receives a POST (405) and sign-in never completes |
| QA-1126-02 | P1 | Viewer and Cashier can create and archive discounts (no server check; edit and deactivate share the gap in source) |
| QA-1126-03 | P1 | Viewer and Cashier can add company verification domains (no server check) |
| QA-1126-04 | P1 | Posting an invoice/bill for a party whose display name differs from its legal name creates a duplicate party and puts the balance on the duplicate |
| QA-1126-05 | P2 | Viewer can import bank statements and open reconciliation sessions; reconciliation and statement-import actions have no permission checks in source |
| QA-1126-06 | P2 | New "Company (Pvt Ltd)" has Inventory off, so products, stock and the ecommerce connector cannot be used |
| QA-1126-07 | P2 | AgentBridge accepts the same file again as a new document with no warning |
| QA-1126-08 | P2 | AgentBridge "Commit purchase bill once" refuses silently (posting stopped, duplicate invoice) with no message |
| QA-1126-09 | P3 | Permission refusals on several settings actions surface as HTTP 500 instead of a clear "no permission" result |
| QA-1126-10 | P3 | Approval line shows a raw user ID instead of the approver's name |
| QA-1126-11 | P3 | MCP tools return `STALE_REVISION` for an unsupported argument |
| QA-1126-12 | P3 | Commerce connection can be created with no stock location (and while Inventory is off) |
| QA-1126-13 | P3 | Commerce API says "token is required" when the token is present but invalid |
| QA-1126-14 | P3 | Balance Sheet lists asset accounts out of code order |
| QA-1126-15 | P3 | Sign-up says "check your email to verify" but sign-in works without verifying |

Full repro steps, expected vs actual, evidence and suggested fixes are in the coding handoff.

## What passed (retest of earlier blockers)

Permissions (Owner request replayed with Viewer and Cashier sessions; all refused, data unchanged):
- Chart of accounts: create bank account (`createAccount…`): "You do not have permission to do that."
- Simple Entry money in (posting): refused for Viewer and Cashier.
- Company details save, POS register create, VAT settings save, AgentBridge settings (attempt to switch off draft-only and posting-stop), AgentBridge inbox upload, AgentBridge commit: refused (HTTP 500 thrown, see QA-1126-09).
- Commerce: create connection and issue key: "You do not have permission to change commerce integrations."
- AgentBridge inbox as Viewer: only "Calculate preview" is shown; approve/commit buttons absent.

Bank balances (fixes for PILOT-01):
- Owner contribution 300 into new bank 1101, 1000 into 1100, then Move Money 100 from 1100 to 1101.
- Chart of Accounts: 1100 = 900.00, 1101 = 400.00. Dashboard "Cash and bank" 1.3K; "Received 1,300 · paid 0" (transfer not counted as outflow). Balance Sheet total assets 1,300 = equity 1,300.

AgentBridge (AB-06 items):
- Independent service reproductions `tests/runtime/ab05-independent-review.test.ts` run against v2.17.12 source: **5 passed / 0 failed** (were 0/5 on v2.8.0).
- Live UI: facts form shows "General Expense (6800)" consistently in proposal and preview (AB06-03 fixed). "Edit facts" exists on proposals and says it revokes prior approval.
- Live UI: approve P1 (1180), edit facts to 2360 (P2), turn posting on, replay the P1 commit with its old approval → refused, no bill. Approve P2 → commit → exactly one bill PUR-20261125-0002 for 2,360 (Dr 6800 2,000 / Dr 2300 360 / Cr 2100 2,360). Replaying the commit → still one bill.
- MCP client (OAuth code + PKCE, client `bookone-claude`): two concurrent `submit_document` calls with the same key → one document; same key with different bytes → `IDEMPOTENCY_MISMATCH`; changed `lineDescription` under the same facts key → `IDEMPOTENCY_MISMATCH`; stale `expectedRevision` → `STALE_REVISION`; `grant_approval` → `HUMAN_APPROVAL_REQUIRED`; `commit_approved_proposal` → `Missing capability post`.
- OAuth: requesting `post commerce_propose` still yields only `read upload draft`; reusing an authorization code → `invalid_grant`; refresh works; after **Revoke access** in BookOne, both old and new access tokens return "AgentBridge connection was revoked." and refresh returns `invalid_grant`.
- Upload-session fallback (AB06-04): `create_upload_session` → open review URL in BookOne → upload → `finalize_upload_session` returns the same document to the agent.
- Backup health (AB06-05): backup page reports "0 packed files, 4 AgentBridge attachment(s) already in company data" and no false "missing" warning.

Backup / restore:
- Backup pair created (data 14.3 KB, files 1.1 KB). Restored into a brand-new empty company: Chart of Accounts 1100 900, 1101 400, AR 500, AP 5,510; 3 purchases and 3 vendors match; 4 AgentBridge originals download with identical SHA-256 to the source (3df99585…, 9a68df3c…). Restored company has Draft-only and Stop posting ON, no commerce connections/keys and no copied team members. Source company unchanged.

Ecommerce (Commerce v1 at `https://bookone.clossyan.com/api/commerce/v1`):
- `GET /connection`, `/products`, `/inventory`, `/catalog/candidates` → 200 with the sandbox key.
- `POST /orders` paid order for unmapped SKU → 202 `needs_review` ("SKU SKU-1 is not mapped…"), shows under Activity → Orders needing review with Retry.
- Same Idempotency-Key + same payload → same receipt; same key + different total → 409 `CONFLICT`; no key → 422.
- `POST /orders/{id}/events` `cancelled` → status `cancelled`, no document.
- Pause inbound orders → `POST /orders` 409 `INBOUND_PAUSED`; unpause restores.
- `POST /reservations` → 422 `RESERVATION_DISABLED`. Bad token → 401.

## Not tested and why

- Commerce mapping, stock publish, paid-order posting to a sales invoice, last-unit race, refunds with/without restock: Inventory module is off for the test company (QA-1126-06). Needs Control Room to enable Inventory for "QAOwner Nov26's Company", then rerun.
- WooCommerce plugin install and live checkout: no WordPress host or Docker daemon in the QA environment. Plugin ZIP 1.2.0 not exercised.
- Real Claude/Codex connector: QA used a standards OAuth/MCP client with Claude's public client id and callback. A real Claude connection is expected to fail until QA-1126-01 is fixed.
- POS flows: no registers module setup tested beyond register create permission.
- UI layout audit: handled in a separate thread.

## Synthetic records created on staging

Company "QAOwner Nov26's Company": bank 1101 QA-OWNER-BANK; 3 Simple Entry journals (300, 1,000, transfer 100); customers CUS-0001/0002 "Acme"; vendors VEN-0001/0002 "LankaSup", VEN-0003 ABC Services; INV-20261126-0001 (500), PUR-20261126-0001 (200), PUR-20261125-0002 (2,360), PUR-20261124-0003 (2,950); 4 AgentBridge documents; discounts QA-VIEWER-DISC ×2 and QA-CASHIER-RPL (archived by Viewer); domains viewer-/cashier-qa-2611.example.com; POS register REG1; VAT registered 18%; commerce connection QA-Woo-Sandbox with orders woo-1001 (cancelled); one bank import bank-nov.csv. AgentBridge flags left: Inbox ON, Draft-only OFF, Stop posting OFF (synthetic company only). Second company (restore target) holds the restored copy.
