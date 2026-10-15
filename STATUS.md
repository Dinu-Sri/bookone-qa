# BookOne customer-readiness status

Customer readiness **NOT certified**. Product source/live **v2.5.8 · cf35da1**, SHA cf35da1244e902e4a41291bc409eb0d994ed4e01. [Current handoff](handoffs/HANDOFF-20261015-v258-bootstrap-findings.md), [latest live/isolated investigation](runs/RUN-20261015-v258-bootstrap-investigation.md). Source master checked unchanged on2026-10-15; no product edits by QA.

Independent [real credential/Next HTTPS layer](docs/HTTP_RUNTIME.md) implemented:18 required slots across owner/non-owner DB boundaries; four local target/cookie guards and repository preflight pass, **first server/HTTP execution pending**. [Intent](runs/RUN-20261015-http-runtime-first.md). This is separate from the303 evidence below, not18 new passes or full workflow acceptance. No staging setup change or approval bypass.

## Current executed evidence

[303-check campaign](runs/CAMP-20261015-091325948-860ae3.json): **301pass/2fail**, zero skipped/blocked/flaky/not-run. [Included129 PostgreSQL checks](runs/RUN-2026-10-15T09-13-33-663Z-runtime.json): **127pass/2fail**, no infrastructure failure,43/43 migrations/PostgreSQL16.15. Only RT-061 and RT-062 fail; all original301 assertions pass unchanged. QA implementation78d4f986081032988090f9e46de03768e83301a0, tested merge92a4bfc6b277eae1250ab1f94dde49237af17728; full fingerprints in JSON. Tests/maintenance PR30 merged b08b413a6155b12e0234b4a41d64666becbd8c7b.

| Priority | Current finding | Evidence |
|---|---|---|
| P1 | [BUG-0049](bugs/BUG-0049-balance-sheet-period-only-balances.md): Balance Sheet omits earlier periods | September600+October200 stores AR800; October report200 and quiet November0 instead of800. Monthly income and report immutability controls pass. |
| P2 | [BUG-0050](bugs/BUG-0050-additional-company-starter-capabilities.md): new additional-company Owner cannot use Starter Sales/Purchase | Valid Owner/company, but writes denied; normalized UI advertises enabled suites. First service PO60 refused with zero document/vendor/financial effects. Viewer denial and Owner creation/profile/original-company module controls pass. |
| P2 | [BUG-0044](bugs/BUG-0044-signup-policy-links.md): policy links | Still open; unrelated to these repairs. |

BUG-0048's original same-period earnings repro is verified fixed: live assets1520=AP400+equity1120 including earnings120; unchanged RT-060 passes600=0+600. [Receipt150 read-only render and SO labels/no invalid Edit pass bounded checks](runs/RUN-20261015-v258-live-fix-retest.md). BUG-0045/0047 wider adjacent UI checks remain pending. BUG-0046 native alternate field now relaxes required and both-empty blocks; persisted browser PO positive remains unverified due to BUG-0050. Do not reopen BUG-0010–0043 from this planning.

## Live state and approvals

The host https://bookone.clossyan.com is owner-designated disposable staging. Existing P257-Owner/P257-Physical fixture remains intact: cash950/AR150/AP400/stock7/value420/profit120; six balanced journals/debits2750, stock movements+10/-4/+1. Never replay the existing payments or original PO/GRN/bill/invoice/credit.

P258-Entry was created through supported Add company; fresh Owner login and one warehouse confirmed. Its first PO60 attempt has no visible saved PO/vendor/journal. Admin inspection displays Starter with Sales/Purchase/Inventory/POS enabled; raw stored flags are not exposed by that normalized UI.

**No successful P258 module save.** Automatic approval review rejected the exact configuration change: keep Starter/environment label unchanged; Sales/Purchase/Inventory ON, POS/Rental/HR OFF. Specific user approval requested and pending. Do not bypass the rejected action through another route or grant. Checkboxes remained at their original displayed values before leaving. Admin Logout began but completion was not observed before another extension UI blocked Chrome. Current actor is uncertain: fresh explicit login required before further role-specific work. Private credentials/IDs/write history are in ignored .local/live-v257/ and .local/live-v258/.

## Acceptance and next actions

Full137 workflows:62partially bound/75unbound/**zero fully accepted**. Isolated helper/action/owner-DB/synthetic-session results are not real credential/HTTP/browser/storage, full upgrade/recovery or every role/scope/race acceptance. Independent expert RF-01–10 and unresolved policy/operator recovery gates remain open. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc; no expert certification or rule change. Do not derive a customer-readiness percentage from assertion counts.

Next: coding agent fixes BUG-0049/0050; new source/live pin requires independent diff review and unchanged303/129 rerun. Meanwhile finish deployed read-only invoice/remittance/AR/AP/stock checks after Chrome clears, then physical GRNI-on/variable-cost/partials/locks/roles, service/digital/rental/mixed/settings/files/history. Resolve exact module approval before that specific staging setup. **Actual backup/restore LAST**, new empty target only, no reset SQL/production access/public secrets.

Historical first failures and passing baselines remain immutable in runs/, bugs/ and Git history. In particular [v2.5.7 physical browser](runs/RUN-20261015-v257-physical-browser.md), [v2.5.7 RT-060 failure](runs/CAMP-20261015-070624689-f091fa.json), [v2.5.8 original301 pass](runs/CAMP-20261015-083605456-919da8.json) and [v2.5.8 first302 carry failure](runs/CAMP-20261015-085116788-c232dc.json). Read SESSION.md and both ledgers to resume.
