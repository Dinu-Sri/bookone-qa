# Rapid04 coding/fixture qualification — consolidated handover

Product `6152aa33b8d4563036fbf5374220417ef320f01b` on `fix/v2524-rapid04-qualification`, VERSION **2.5.24**, CHG [CHG-20261030-rapid04-rental-security](https://github.com/Dinu-Sri/BookOne/blob/fix/v2524-rapid04-qualification/docs/changes/CHG-20261030-rapid04-rental-security.md). QA companion branch `qa/rapid04-coding-qualification` stacked on published [PR 91](https://github.com/Dinu-Sri/bookone-qa/pull/91) `f256d2386786e2520d165fb860babca2e623b199`. Rapid03 results `eed69cf7f63d10d13aa872f43c82830241a26f43` remain immutable.

Do not merge or deploy. Light has **no** executable Rapid04 queue. `queues/PLAN-RAPID04-qualification.json` stays specified-not-run / `executable:false`. `queues/MISSION-v2524-RAPID-04.json` has `executionReady: false` and unbound date/SHA.

## Product candidate

Base `b89dd788b9bec9dc66cb49d22f7b8c2c92015df7` / v2.5.23 · b89dd78. This batch is v2.5.24.

Demonstrated defects fixed (smallest compatible change):

1. Dispatch / return / extend / wash-release now require `rental.dispatch.write` and rental module on, and write `audit_log`.
2. Record return of 8 good + 2 dirty is stock-only. Damage/late default 0. **Invoice hire charges** is the agreed 4450/4400 control.
3. Collect / Refund deposit expose Tender Cash 1000 / Bank 1100 / Card 1200 (default Cash 1000).
4. Hire-charge invoices store `sourceDocumentId` and skip source conversion. The skip flag is honored only for `sales_invoice`, so quote→order cannot opt out.

No schema/migration. No original-QA-company module change. No Rapid02/03 money replay.

## Supported rental contract vs independent oracle

See the CHG mapping table. Independent oracle `queues/ORACLE-v2524-RAPID-04.json`: six journals, DrCr 320000 cents, cash +70000, 4400 −50000, 4450 −20000, AR/AP/deposit 0, fleet 20 / 100000, no 5150/COGS. Dirty return is not a charge. Operational dates unbound until Medium.

## Checks executed

| Check | Result |
|---|---|
| Product vitest auth+accounting+statement-import | 27 files / **307 passed**, including Viewer `rental.dispatch.write` denial |
| `pnpm test:rapid04` | fail-closed operator plan, oracle 6/3200/cash+700, dirty-charge sensitivity, helper writes no run dir, Rapid03 queue unmodified |
| Isolated `bookone_qa_runtime` postgres-rls / rental-lifecycle / commercial-deep / role-scope-boundaries | **not-run** this session (empty loopback Postgres 16 not prepared here) |
| HTTP `scripts/http/run.mjs` | kept **13** cases; rental GET/write codec denials specified, not added (need rental-capable HTTP seed after AUTH) |
| Full `pnpm check` | **NOTGREEN** on this Windows host: workflow-governance `fs.cpSync` path has exited 3221226505 (`STATUS_HEAP_CORRUPTION`). Tests not skipped. Linux CI 40997582714 at `f256d23` is supported evidence |
| Live browser / staging stamp | **not-run**. No Rapid04 business |

D-104 and D-112 are now bounded Owner-DB command adapters (rental-lifecycle expected **12**, was 10). Historical 10-case runtime runs stay immutable. D-117 now also denies Viewer dispatch/return/charge. First reproductions of missing Viewer dispatch permission, auto late-fee on return, omitted cash tender, and hire-order conversion by charge invoices are preserved in this CHG/handoff.

## Fixtures (nonsecret matrix)

Private locator and credentials stay out of Git. [AUTH-20261030](../decisions/AUTH-20261030-isolated-rental-company.md) requests Control Room **Pro + Inventory + Rental** for isolated company A only. **Not granted in this batch.**

| Alias | Job | Inventory | Rental | Expected |
|---|---|---|---|---|
| A Owner | owner | on (after AUTH) | on (after AUTH) | Quote/order/dispatch/return/deposit/charge/refund |
| A Viewer | viewer | on | on | Read calendar/dispatch; zero persisted writes |
| B Owner | owner | off (Starter) | off | Foreign deny on A records |
| Original QA company | unchanged | **off** | off | Ceiling, not a bug |

Local runtime seeds TENANT_A with modules on without Control Room. That is synthetic-session Owner-DB evidence only.

## Unresolved owners

- Owner: AUTH-20261030 Control Room grant for isolated A; later merge/deploy decision.
- Medium: bind exact v2.5.24 SHA, live stamp, UTC date, A/B locator, and publish a NEW Light mission. Do not execute the planning template.
- HTTP rental denials and funded bank/card positives: after AUTH seed.
- Isolated runtime lanes: prepare empty `bookone_qa_runtime` then `runtime:run` rental-lifecycle (12), postgres-rls (9), commercial-deep (8), role-scope-boundaries (19).
- Remaining product/fixture gaps: signup does not seed on-rent/wash/repair (create via Inventory locations); convert-to-invoice after return can re-reserve; EventHireFields default On confirm; missing qty is consume-at-location without 5150; Activity lists transactions/docs, not `rental_booking_lines`; RF04/RF09 expert hire recognition.
- Backup/restore LAST. BookOne is not customer-ready. No launch-readiness claim.

Preserve Rapid02/03 data, four historical bad credits, stockGLgap120, Q/order 600, D100, S600, P200.
