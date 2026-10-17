# WB-CORE — Shared accounting, access and document controls

Generated from workflows/casebooks/WB-CORE.json. Edit JSON and run pnpm library:render. Revision 4; **draft, independent review pending; no new execution or acceptance**.

Product source study: 2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609. Profiles BP-01, BP-02, BP-03, BP-04, BP-05. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).

## WB-CORE.J01 — Payment batches, tender and allocation identity

**Fixture:** Two same-party posted invoices100 and200; bank0; valid liquid bank; default all-or-nothing batch policy.

Rules: BR-ACC-02@1, BR-ACC-03@1, RB-PAY-01@1, RB-PAY-02@1. Retained tasks: B-103, B-107, B-115.

Entities: businessDocuments, settlementAllocations, transactions, accounts. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-CORE.J01.C01 — Valid two-document batch

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: AR300; balances100/200.
- Action: Receive100+200 in one batch.
- Expected: AR0; bank300; total allocations300; receipts match actual completed effects.
- Independent numeric checks: batch cents: add(10000, 20000) = 30000.

### WB-CORE.J01.C02 — Mixed valid and invalid

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Invoice100 valid; second UUID is real foreign record.
- Action: Submit payment batch100+200.
- Expected: Default whole batch rolls back; bank0; own AR100 unchanged; no success print for first payment.

### WB-CORE.J01.C03 — Overallocate240

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Bill240 balance; bank1000.
- Action: Attempt pay300.
- Expected: Reject with actionable error; AP240/bank1000 unchanged; no partial240 payment unless explicitly confirmed separate contract.

### WB-CORE.J01.C04 — Nonliquid tender

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Revenue/AR/AP account selected.
- Action: Pay or receive100.
- Expected: Deny unsupported tender; no unbalanced or apparently settled invoice.

### WB-CORE.J01.C05 — Print amount tampering

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Actual persisted payment80.
- Action: Alter print URL amount/total to999.
- Expected: Print80 and source document facts from persisted allocation; untrusted query cannot invent paid999.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-CORE.J02 — Period lock, reversal and correcting date

**Fixture:** Posted service invoice100 dated10Oct; October lock; approved authorized correction in November.

Rules: BR-ACC-05@1, BR-ACC-06@1, BR-DAT-01@1. Retained tasks: B-111, C-115, C-116.

Entities: transactions, journalEntries, journalLines, periodLocks. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-CORE.J02.C01 — Locked writes denied

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: October locked.
- Action: Post invoice, payment, credit or stock adjustment datedOctober.
- Expected: Each denied at authoritative write; no transactions/journals/allocations/stock business mutations.

### WB-CORE.J02.C02 — Permitted later correction

- Type: correction; execution: **not run**; adapter: **unbound**.
- Given: Original100 locked; November open.
- Action: Use supported correcting reversal datedNovember.
- Expected: Original retained; inverse100 on permitted date; source links/reason/actor retained; no October history rewrite.

### WB-CORE.J02.C03 — Double reversal race

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: One reversible posted transaction100.
- Action: Reverse concurrently from independent sessions.
- Expected: One accepted inverse100; duplicate denied/idempotent; original+inverse net0, not-100.

### WB-CORE.J02.C04 — Invalid reversal target

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Draft, already reversed or foreign transaction.
- Action: Attempt reverse.
- Expected: Reject with own posted positive; no inverse orphan entries.

### WB-CORE.J02.C05 — Lock changed midform

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Open form while October open, lock before submit.
- Action: Submit cached form.
- Expected: Fresh server check denies; client-loaded date status not sufficient.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/record-entry.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/record-entry.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-CORE.J03 — Reports, aging, control accounts and current earnings

**Fixture:** Opening cash10000/equity10000; service invoice600; receipt250; expense200 unpaid; no tax.

Rules: BR-ACC-07@1, BR-ACC-08@1, BR-DAT-01@1. Retained tasks: B-116, E-106.

Entities: journalLines, accounts, businessDocuments, settlementAllocations. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-CORE.J03.C01 — Basic financial reconciliation

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Income600, expense200, AR350, AP200, cash10250.
- Action: Run trial balance/P&L/BS and AR/AP.
- Expected: Profit400; assets10600; liabilities200/equity10400; AR350/AP200 agree with allocations and GL.
- Independent numeric checks: assets cents: add(1025000, 35000) = 1060000; liabilities equity cents: add(20000, 1000000, 40000) = 1060000.

### WB-CORE.J03.C02 — Payment after cutoff

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Invoice600 on14Oct; payment250 on16Oct.
- Action: Report aging as-of15Oct.
- Expected: AR600 at cutoff, not current350; payment date matters as well as invoice issue date. Additional boundary: invoice256.50 issued16Oct, receipt75.50 on16Oct and DISTINCT receipt1 on17Oct gives AR181 as-of16Oct and180 currently; aggregate with old positive70 is251/250. Preserve credit-balance bridge separately.

### WB-CORE.J03.C03 — Future credit

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Invoice600 on14Oct; credit100 on16Oct.
- Action: Report as-of15Oct then16Oct.
- Expected: 600 then500 if otherwise unchanged; future credit cannot leak backward.

### WB-CORE.J03.C04 — Closed retained earnings

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Prior profit400 already closed into retained earnings.
- Action: Run next-year BS.
- Expected: Include retained400 once; do not add closed historical P&L again as unclosed earnings.

### WB-CORE.J03.C05 — Date/scope symmetry

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Brand A and domain business filters selected.
- Action: Compare TB/P&L/BS/AR/AP/export.
- Expected: Same declared date/scope filters consistently applied or explicit bridge; totals cannot reconcile by silently dropping rows.

### WB-CORE.J03.C06 — Currently closed debts remain visible before future settlements

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: AR source297 issued17Oct,paid150/credit112.50 same17Oct leaves34.50; future18Octcredit184.50 closesit. AP source100 issued17Oct fullypaid18Oct, current0. Separate APsource256.50 paid50/17Oct andfullycredited18Oct, current0.
- Action: Compare current payment lists and aging17Oct/18Oct independently for each source.
- Expected: Currentlists excludeclosedrecords;AR17Oct34.50 then18Oct0;AP100source17Oct100 then18Oct0;AP256.50source17Oct206.50 then18Oct0. Reconstruct closed obligations rather than filtering current-open list;future credits andpayments cannot erase prior debt. Credit balances bridge to netGL separately.
- Independent numeric checks: prior AR cents: sub(29700, 15000, 11250) = 3450; prior AP cents: sub(25650, 5000) = 20650.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)
- [apps/web/src/app/actions/record-entry.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/record-entry.ts)

## WB-CORE.J04 — Master data, document snapshots and safe archive

**Fixture:** Posted invoice has customerOld, price100 and approved print style; open debt100; synthetic IDs.

Rules: BR-DAT-01@1, BR-SAL-02@1, RB-CONFIG-01@1, BR-SAL-03@1. Retained tasks: B-108, B-113, E-112.

Entities: businessDocuments, businessDocumentLines, parties, inventoryProducts. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-CORE.J04.C01 — Master rename and reprice

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Original partyOld and unit100 stored.
- Action: Rename partyNew and price120.
- Expected: New transactions may use120/New; historical issued document retains100 and party-as-recorded under contract.

### WB-CORE.J04.C02 — Print style change

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Issued snapshot styleV1.
- Action: Edit current styleV2 and print old invoice.
- Expected: Historical required facts preserved; snapshot policy explicit; amounts/source/payment facts never replaced by editable preview. Detail arithmetic must also reconcile: line net270, header discount13.50, displayed subtotal270 and total256.50; do not label net total256.50 as pre-header subtotal.

### WB-CORE.J04.C03 — Archive posted unpaid invoice

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Debt100 exists.
- Action: Archive where supported.
- Expected: Archive does not erase debt, GL or permitted collection; visibility/read policy explicit; no hidden bad debt writeoff.

### WB-CORE.J04.C04 — Delete referenced master

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Product/party has posted records.
- Action: Attempt delete.
- Expected: Soft retirement or safe refusal; issued source/accounting references remain valid.

### WB-CORE.J04.C05 — Edit posted totals

- Type: invalid-state; execution: **not run**; adapter: **unbound**.
- Given: Invoice100 posted and partially paid40.
- Action: Try change total to50 directly.
- Expected: Require supported correction/versioned path; no silent AR10/revenue rewrite or overwritten audit trail.

### WB-CORE.J04.C06 — Draft edit roundtrip preserves line and header discounts

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Draft invoice3x100 with line10%=30 and header5%of270=13.50; stored line-net270,total256.50; no posted journal. Product catalog may change later; bind declared draft repricing policy separately.
- Action: Save draft, reload detail, open Edit without changes, cancel; repeat save unchanged and supported Post on separate fixtures.
- Expected: Unchanged edit must hydrate original discount semantics or equivalent explicit amounts and preview270-13.50=256.50. It must not blank line discount and show286.50. Cancel preserves draft facts/no GL; save preserves original totals and discounts; Post exactly once under valid current cost/stock policy, no duplicate draft/source and attributable audit. Changes in master price cannot silently change saved draft economics; original draft and posted controls remain distinct.
- Independent numeric checks: line net cents: sub(30000, 3000) = 27000; draft total cents: sub(27000, 1350) = 25650.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)

## WB-CORE.J05 — Roles, tenant records and permission revocation

**Fixture:** Real own and foreign invoices100; verified Owner/Sales/Viewer sessions; known party/location/file sentinels.

Rules: BR-SEC-01@1, BR-SEC-02@1, BR-AUD-01@1. Retained tasks: B-109, B-110, E-108, E-115, E-117, F-112.

Entities: tenantMemberships, tenantRoles, tenantRolePermissions, tenantMembershipScopes. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-CORE.J05.C01 — Authorized same-action positive

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Fresh intended Owner identity and own invoice.
- Action: Perform supported create/read/payment in isolated fixture.
- Expected: Positive executes complete expected effect; record actual role context before interpreting negative control.

### WB-CORE.J05.C02 — Viewer write family

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Viewer can read own invoice.
- Action: Create/edit/pay/credit/reverse/archive using actual actions.
- Expected: Each unauthorized write denied; financial/doc/allocation/business CREATE audit snapshot unchanged. Hidden buttons alone insufficient.

### WB-CORE.J05.C03 — Known foreign records

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Tenant B invoice/file exists and is accessible to B.
- Action: Attempt A list/detail/pay/export/file lookup using actual B ID.
- Expected: Deny all covered boundaries; no metadata leak/signing; own-A controls work.

### WB-CORE.J05.C04 — Suspended/revoked session

- Type: permissions; execution: **not run**; adapter: **unbound**.
- Given: Session active, membership then suspended/revoked.
- Action: Submit stale form and fetch cached report/file.
- Expected: Authoritative fresh authorization denies; stale page cannot confer continued write/read rights.

### WB-CORE.J05.C05 — Pooled context reuse

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: Isolated non-bypass runtime role; separate A/B callbacks.
- Action: Alternate concurrent connections, nested calls and exception recovery.
- Expected: No tenant context bleed; outer context restored; actual business positives/foreign denies remain valid.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [packages/auth/src/permissions/catalog.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/auth/src/permissions/catalog.ts)
- [packages/auth/src/permissions/ceiling.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/packages/auth/src/permissions/ceiling.ts)

## WB-CORE.J06 — Forms, retries, concurrency and ambiguous success

**Fixture:** Own synthetic invoice100; supported actor and idempotency contract; clock/build pinned.

Rules: BR-ACC-03@1, BR-ACC-04@1, RB-UI-01@1. Retained tasks: B-106, B-107, B-112, E-111, F-113, F-114.

Entities: businessDocuments, transactions, journalLines, auditLog. Support: source-observed-contract; acceptance-unverified.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

### WB-CORE.J06.C01 — Slow double submit

- Type: retry; execution: **not run**; adapter: **unbound**.
- Given: One valid invoice100 form.
- Action: Double click, Enter twice and retry after slow response.
- Expected: At most one accepted operation per declared intent identity; disabled spinner is not proof; persisted count/value100 inspected.

### WB-CORE.J06.C02 — Timeout after commit

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Payment100 may already have committed.
- Action: Lose display response; recover via read-only state.
- Expected: Inspect persisted balance/allocation before any replay; print failure does not prove rollback. Same-key retry returns original result.

### WB-CORE.J06.C03 — Failure between durable writes

- Type: failure; execution: **not run**; adapter: **unbound**.
- Given: Ephemeral fault injection at header/line/journal/audit boundaries.
- Action: Execute each failing boundary.
- Expected: No partial business mutation survives; first failure preserved; telemetry is separately allowed.

### WB-CORE.J06.C04 — Deployment crossing

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Build stamp changes midjourney.
- Action: Continue observation only if safe; assess acceptance.
- Expected: Preserve observations but invalidate single-candidate acceptance; start fresh fingerprint for retest; never relabel old result.

### WB-CORE.J06.C05 — Validation and busy-state recovery

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Invalid amount or server error.
- Action: Submit, correct fields and resubmit.
- Expected: Actionable error and retained inputs; busy overlay clears on supported completion; no second hidden request.

### WB-CORE.J06.C06 — Server validation preserves long invoice entry for correction

- Type: invalid-input; execution: **not run**; adapter: **unbound**.
- Given: Unsaved new invoice with entered customer,dates,SKU,qty3,price1; linepercent150 invalid.
- Action: Submit via Post and inspect destination,feedback,values and mutation counts; correct percent0 in same entry context.
- Expected: Actionable excessive-percent error; preserve customer,lines,prices,dates and other entered fields for correction; no invoice/journal/party side effects from rejection. Do not redirect to list and reopen an empty form. Busy state clears and corrected valid submission posts once.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
- [apps/web/src/app/actions/documents.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/documents.ts)

## WB-CORE.J07 — Tax profiles, numbering and statutory boundaries

**Fixture:** Synthetic tax profiles only; valid entities/registrations/effective dates require expert verification before compliance acceptance.

Rules: RB-LK-01@1, RB-LK-02@1, RB-LK-03@1, RB-LK-04@1, RB-LK-05@1, RB-LK-06@1, BR-SAL-03@1. Retained tasks: B-114, E-102, E-103.

Entities: taxProfiles, companyProfiles, taxInvoiceSequences, salesSettings. Support: requires-policy-or-capability-review.

Applicable shared controls must be resolved before execution: CTL-ACTOR, CTL-TENANT, CTL-ROLE, CTL-LOCK, CTL-RETRY, CTL-RACE, CTL-FAULT, CTL-HISTORY, CTL-REPORT, CTL-UI. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.

**Policy/capability gaps:** No legal sources were refreshed in this workbook-authoring run. Existing expert-pending rulebook remains authoritative; examples are not current tax or filing advice.

### WB-CORE.J07.C01 — Exclusive arithmetic fixture

- Type: normal; execution: **not run**; adapter: **unbound**.
- Given: Net1000, synthetic rate18%, eligible profile explicitly selected.
- Action: Preview/post/reload/print.
- Expected: Tax180,total1180 consistently; eligibility is separate pending evidence.
- Independent numeric checks: exclusive cents: add(100000, 18000) = 118000.

### WB-CORE.J07.C02 — Unknown or unregistered status

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: Stored product/party/company classification not confirmed.
- Action: Attempt statutory tax-invoice acceptance.
- Expected: Stop applicability claim; verify stored supported enums, registration, date and required fields; name/comment insufficient.

### WB-CORE.J07.C03 — Numbering race and reset

- Type: concurrency; execution: **not run**; adapter: **unbound**.
- Given: Two authorized tax invoices same period; reset policy known.
- Action: Post concurrently across configured reset boundary.
- Expected: Unique permitted serials; no duplicate or silent overwrite; stored issued numbers not regenerated on print.

### WB-CORE.J07.C04 — Other taxes

- Type: boundary; execution: **not run**; adapter: **unbound**.
- Given: SSCL/withholding/other charge not contracted.
- Action: Try represent as generic VAT percentage.
- Expected: Reject unsupported equivalence; capability and separate tax basis/accounts required; not automatic supported filing.

### WB-CORE.J07.C05 — Effective-date or currency boundary

- Type: history; execution: **not run**; adapter: **unbound**.
- Given: Transaction on either side of approved policy date; base currencyLKR.
- Action: Post with pinned dates/timezone and selected rate record.
- Expected: Use applicable dated profile; unsupported foreign-currency/rounding treatment explicit; issued history preserved.

**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.

**Source observations, not expected-result authority:**

- [apps/web/src/app/actions/commercial-docs.ts](https://github.com/Dinu-Sri/BookOne/blob/ead3a82170e7a34ad625ec6ef8434e5ae65b1609/apps/web/src/app/actions/commercial-docs.ts)
