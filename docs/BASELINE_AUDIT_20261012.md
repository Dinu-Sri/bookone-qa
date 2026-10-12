# Baseline audit, batch 1 — 2026-10-12

Scope: source-level review of 30 catalog IDs in integrity, tenancy, rental and team suites; eight new independent posting unit cases. This is not an audit of all 771 discovered browser cases. The catalog has 747 IDs; discovered test count and reviewed ID count have different denominators.

Product source/graph revision: `d35ed9209852af3fbcfe140176f2f8e74cae15f7`. Product master observed at `bdff296bd3f0dae6470b15be74cfee8b71567501` (documentation-only update). QA starting revision: `ba9b8264d4d2308b530db4d4621b899936d381cf`. Graph project `BookOne` matches the pinned source revision. The staging build is not yet verified.

## Review method and decisions

Read actual test bodies and relevant helpers, compare assertions with their titles and CORE_RULES, then record disposition and missing evidence in `catalog/assertion-review.json`. `reviewed` means a source review was performed; it does not mean the scenario is accepted or passed. Source references are scoped to the explicit binding reviewed; generated executors/other bindings may need separate reviews.

| Binding | IDs reviewed | Decision | What the assertions actually establish |
|---|---|---|---|
| `11-integrity.spec.ts` | S-0594–0598, S-0600 | Replace business assertions; preserve route-smoke value | Containers visible; no numeric TB/journal/AR/AP/stock reconciliation. Reversal is optional and click failures are swallowed. |
| `10-edges-security.spec.ts` | S-0449–0452, S-0463 | Replace | Dummy foreign UUIDs or active-tenant page loads do not establish tenant isolation/suspension. |
| Same security binding | S-0461 | Strengthen | A small regex scans rendered docs for secret-like strings; it is not a comprehensive disclosure test. |
| Same security binding | S-0462 | Replace on product cleanup | Only scans a narrow pattern on the legacy E2E page; external runner artifacts need separate privacy checks and old endpoints need removal checks. |
| `28-rental.spec.ts` | S-0699–0703 | Keep as smoke only | Specific pages, settings and filter controls appear; no booking, deposit, return or fleet outcome is asserted. |
| `29-team-rbac.spec.ts` | S-0713, S-0714, S-0731–0736 | Keep as smoke only | Team/jobs/groups/person controls appear. Titles that mention adding a person or setting a password do not actually perform those operations. |
| Same team binding | S-0720 | Strengthen | Error-message assertion is useful, but fixture does not prove exactly one owner and targets the first owner row; verify ownership/session remain intact. |
| Same team binding | S-0717, S-0730 | Strengthen | A real cashier login and route redirect are useful; add positive allowed-operation proof, direct server mutation denial and unchanged data. Ensure cleanup in finally and verify removal. |
| Same team binding | S-0737 | Strengthen | Remove/restore controls toggle; add login/access denial after removal and restored access after restoration. Replaced remaining fixed synthetic password with per-run random value. |

No inherited tests deleted or represented as deep acceptance. Source review records retain null last-run/product-verification fields. Remaining 717 catalog IDs still need review; even reviewed scenarios retain the gaps listed above.

## First independent executable assertions

File: `packages/accounting/test/qa-critical-postings.test.ts`; uses the pinned product posting builders. Expected line sets are fixed hand-worked examples, not calls to production totals helpers. Full array equality rejects missing, extra, duplicated, wrong-account, wrong-side and wrong-amount lines. Memo prose and line order are not accounting requirements here.

| Case | Fixed expectation | Rules / profile |
|---|---|---|
| QA-U-001 | Hire 500 + service 200 + goods 300 + digital 100 = AR 1100; only physical goods produce COGS/inventory 180 | BR-ACC-02, BR-STK-03, BR-REN-02; BP-05 |
| QA-U-002 | Discount 110 gives net 990; synthetic 10% tax 99; AR 1089; revenues 450/180/270/90; COGS remains 180 | BR-SAL-03, BR-ACC-02; BP-05 |
| QA-U-003 | Reordering these exact no-rounding inputs preserves account/side/amount line sets | BR-ACC-02; BP-05 |
| QA-U-004 | Return one physical unit: sales returns Dr100, AR Cr100, inventory Dr60, COGS Cr60 | BR-SAL-02, BR-STK-02; BP-01 |
| QA-U-005–007 | Service/digital/rental credit of 100 creates only sales-return/AR lines, despite nonzero cost input | BR-STK-03, BR-REN-02; BP-02/03/04 |
| QA-U-008 | GRN DrInventory600/CrGRNI600; matched bill DrGRNI600/CrAP600; no second inventory posting | BR-PUR-01; BP-01 |

These protect a documented posting-builder contract. They do NOT prove persistence, stock movements, authorization, payment allocations, correct source-cost selection, UI calculations or atomicity. The 10% tax is synthetic arithmetic, not a claim about current tax law. Fractional discount allocation/rounding policy needs owner approval before normative edge-case expectations are fixed.

## Source map and investigation queue

Paths are relative to the product repository at the source revision above. These are reviewed implementation facts and hypotheses, not live bug reports.

- `packages/accounting/src/engine/document-posting.ts`: `buildSalesInvoicePosting` (80–184) splits revenue and physical COGS; `buildSalesReturnPosting` (190–261) reverses physical cost. Entry-point/DB persistence coverage remains separate from these pure functions.
- `apps/web/src/app/actions/commercial-docs.ts`: graph identifies `createCommercialDocument`, `getCommercialDocument`, and `listOpenArInvoices`. Next trace creation through posted transaction, journal, line, inventory, rental and payment links.
- `apps/web/src/app/actions/documents.ts`: graph identifies `receiveCustomerPayments` and `allocateDocumentPayment`; prioritize partial/full payments, retries, tenant-scoped allocations and reversals.
- `apps/web/src/app/actions/rental-bookings.ts`: `checkRentalAvailability` (57–81) passes overlap policy, override reason and turnaround settings to `assertAvailability`. Need actual interval, concurrency and authorized-override tests; absence of a UI button is not proof.
- `apps/web/src/app/actions/rental-money.ts`: collection (267–332) posts bank/deposit-liability and updates event totals; refund (334–401) checks available deposit then posts and updates refunded totals. `postBalanced` (68–144) writes transaction, journal, journal lines and audit separately. Investigate transaction boundaries, partial-write failures, retry duplication and concurrent refunds with an isolated DB. No live race or data corruption reproduced.
- `packages/db/src/helpers.ts`: `withTenantContext` (11–18) sets/clears context but does not itself establish a DB transaction. Trace actual connection/transaction management before deciding whether a caller is atomic or tenant-isolated.

## Next execution sequence

1. Obtain deployed source/image identity and a stable test window; record schema/storage identity and configuration privately. The owner already authorizes staging test-data mutations.
2. Establish run-owned tenant A/B and distinct test roles. Use real B records and prove B can access them before A-denial checks. Use exact IDs, not ambiguous names or the first row. No public credentials/raw tenant exports.
3. Run BP-03 service invoice 600 → payment250 → balance350 → payment350 → balance0. Verify actual persisted journal, AR aging, cash, audit links and absence of stock/COGS effects; retry payment without duplication.
4. Run BP-01 purchase10@60 → sell2@100 → payment80 → return1@100 → payment20 → vendor payment600. Expected final stock9/value540, AR0/AP0; reconcile all transitions, not just ending totals.
5. Run BP-04 deposit1000 → apply700 → refund300, including excessive/concurrent refund denial; fleet20, dispatch10, return8 good/2 dirty, wash release2. Confirm policy choices first.
6. Combine into BP-05 and run invalid transitions, period lock, access revocation, interrupted writes and upgrade-history checks in verified isolated infrastructure.

Open requirements: return/credit allocation policy, rental interval boundaries and turnaround/overbooking policy, original-cost restocking policy, invoice timing, tax rounding and closed-period correction policy. Existing implementation is evidence to discuss, not sole authority for these decisions.

## Staging reconnaissance (read-only)

The authorized browser session loads Simple Entry and Control Room without additional credentials. The workspace contains substantial pre-existing E2E fixture data; the workspace switcher has duplicate display names, so identities must be recorded by ID. Control Room displays `App env: Production` and six active tenants; this conflicts with the owner's explicit staging designation and is recorded as an environment-label mismatch, not proof of production access. No build SHA was visible in those inspected screens. No business data, users, permissions or settings were changed. No browser acceptance pass is claimed.
