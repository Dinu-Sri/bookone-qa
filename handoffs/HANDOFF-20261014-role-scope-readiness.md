# Coding handoff: non-owner roles, scopes and fail-closed reads

Product **v2.5.5 · 8e1a2b8** /8e1a2b8b29e662940bfcfecc4230875c83e35b6d; rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. No prior expected outcomes changed.

First ten-case new lane8pass/2fail. [Campaign](../runs/CAMP-20261014-125458746-6d35a7.json), CI38567416271:291assertions273pass/18fail/0skip/0block/not-run. [PG](../runs/RUN-2026-10-14T12-55-07-908Z-runtime.json), CI38567416315:99/117pass, no infrastructure failures. QA implementation2807293, tested merge4756885ccb01e65db1d93e1ad2f91af97761684f, contentc316051c9f00d5ab080751894e3b4141f0d6f0dae57ff86075af5aa71d4180e0. Exact fingerprints in reports.

## Repairs

- **BUG-0041 / RT-045**: actual Sales branch/brand restriction filters list to one allowed invoice, but direct detail for known other branch returns data. Same-company scope leak, not cross-tenant proof. getCommercialDocument currently lacks scope/read-job guard. Require active loaded read authority and record scope before returning header/party/lines, with authorised own/historical positives and equivalent purchase/print/export paths reviewed.
- **BUG-0042 / RT-046**: verified isolated scope-table SELECT failure turns Sales restrictions into null/unrestricted, accepting an otherwise forbidden branch invoice and AR100→200. Metadata-read failure must not become absence of restrictions. Grant restored and original scope verified in finally. No live outage/fault injection claim.

Passing controls: Sales posts100/receives25; Cashier receives25 but cannot create ordinary invoice; declared Accountant template reads100 but denies commercial creation/payment; Sales assigned branch creates/pays and denies other branch; Sales off denies creation/payment while Owner detail/report values100 survive; deny override and suspended membership deny subsequent commands; real foreignTenantB invoice/dimensions deny with both tenant positive controls. Invoice read resolver flag is0 when Sales off even though permitted Owner report/detail values remain available; historical UI/nav usability remains unverified.

## Follow-up pending

RT-051 checks a valid Warehouse job (inventory read allowed, invoice read absent) fetching a real known invoice. Source read-job concern is unconfirmed until it executes. Adds one adjacent assertion:118PG/292campaign planned. Preserve first291-case record. Real requests/Next React cache/auth revocation, credentials/browser, all reports/files and route/action exposure remain required, not proven from this synthetic actor.

Use only fresh ephemeral PostgreSQL16 per docs/POSTGRES_RUNTIME.md, `pnpm runtime:run role-scope-boundaries`. This lane's DATABASE_URL is non-owner qa_runtime, independently verified nonsuper/nonbypass/not table-owner/RLS enabled. Admin connection only seeds/asserts/faults guarded fixture. Never point reset/revoke/fault harness at staging/production.

Earlier [payment/archive](HANDOFF-20261014-v255-adjacent-readiness.md), [inventory](HANDOFF-20261014-variable-cost-readiness.md), and [sales](HANDOFF-20261014-sales-value-readiness.md) handoffs remain open: thirteen demonstrated finding groups across four waves. Existing BUG-0010–0016 originals stay untouched. Full137workflows62partial bindings/75unbound/zero accepted. Real normal-role/physical-first/backup restore and expert/operator gates still pending; raw data/secrets private. No new staging writes.

## Final role follow-up evidence

[Campaign](../runs/CAMP-20261014-131128650-2e5b74.json), CI38569613302:292assertions273pass/19fail/zero skips/blocks. [PostgreSQL](../runs/RUN-2026-10-14T13-11-19-113Z-runtime.json), CI38569613346:99/118pass, no infrastructure failures. QA implementation3da78860096e5f39b9f6bc2eedb083357da2a812; tested mergea2488edd483ba3c1f63356306d9b2c66862fb95d; contentcffd44e6273b20ec41b75fd8941e3d6f939db2b6b4da7bca555022e1b9328060.

RT-051 executed: inventoryReadGranted1, invoiceReadGranted0, knownInvoicePositive1, invoiceDetailDenied0. Warehouse direct detail was not refused, confirming the missing read-job guard variant of BUG-0041; no new group. New role lane8pass/3fail. Earlier pending notes are superseded; first291-case evidence retained. Synthetic-auth/non-owner PostgreSQL only; actual credential/HTTP/browser exposure remains unverified. No new staging mutations.
