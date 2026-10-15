# BookOne customer-readiness status

**NOT customer-ready or certified.** Product source/live v2.5.8 /cf35da1, full SHA cf35da1244e902e4a41291bc409eb0d994ed4e01. Master independently rechecked unchanged2026-10-15. QA made no product edits. Current [coding handoff](handoffs/HANDOFF-20261015-real-http-permissions.md); earlier [report/bootstrap handoff](handoffs/HANDOFF-20261015-v258-bootstrap-findings.md) remains applicable.

## Current defects

| Priority | Finding | Evidence boundary |
|---|---|---|
| P1 | [BUG-0049](bugs/BUG-0049-balance-sheet-period-only-balances.md): cross-month Balance Sheet omits prior balances | September600+October200 stores AR800; Oct report200 and quietNov0 instead of800; monthly income and immutability controls pass. RT-061 still fails. |
| P1 | [BUG-0051](bugs/BUG-0051-viewer-company-profile-server-write.md): assigned Viewer persists profile and tax/sales/purchase/inventory settings | Real credential/compiled Next/form action on owner DB; correctly loaded Viewer and same-action Owner positive verified. |
| P1 | [BUG-0052](bugs/BUG-0052-credential-session-promotes-legacy-viewer.md): null-job Viewer becomes Owner and posts receipt10 | Persisted session-boundary membership promotion and actual financial action; assigned Viewer denial and legitimate legacy Owner repair still work. |
| P1, restricted runtime | [BUG-0053](bugs/BUG-0053-nonowner-credential-erp-session.md): authenticated user cannot establish ERP session under NOBYPASSRLS | Six real auth identities work, own ERP positives fail; exact-role users visible0 unscoped/1 correctly scoped/foreign0/after0. Staging DB role unknown; no leak claim. |
| P2 | [BUG-0050](bugs/BUG-0050-additional-company-starter-capabilities.md): additional-company Owner lacks included Starter Sales/Purchase | Live first PO60 refused/no document/vendor/journal; independent actual company-create/permission controls reproduce RT-062. |
| P2 | [BUG-0044](bugs/BUG-0044-signup-policy-links.md): signup policy links are placeholders | Still open. |

Do not reopen BUG-0010–0043 without a fresh demonstrated regression. BUG-0052 is an identity promotion defect, not reopening the repaired assigned-Viewer payment handler. Keep all independent expected amounts/roles/zero-effect negatives unchanged.

## Executed evidence

[303 campaign](runs/CAMP-20261015-091325948-860ae3.json):301pass/2fail, no skip/block/flaky/not-run; included129PG=127pass2fail RT061/62,43migrations/PostgreSQL16.15. All original301 expectations still pass. Exact original fingerprints in JSON; partial passing assertions are not workflow acceptance.

[Canonical real HTTP v4](runs/HTTP-2026-10-15T13-08-49-991Z-e76d96.json), [CI38740136839](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38740136839): **9pass/8fail/9blocked**,26 selected/setup complete. Same-origin HTTPS anonymous redirect, wrong password, six real credential identities and cookie controls pass in both roles. QA origin mismatch is resolved; original failed attempts remain preserved. Owner baseline still fails five settings writes (BUG0051) and legacy Viewer promotion/payment (BUG0052); restricted actual NOSUPERUSER/NOBYPASSRLS own ERP identity/legacy Owner repair fail (BUG0053), blocking nine dependent cases. Company Admin/all scopes/files are not certified. Owner final paid210/due390/fivejournals/fourallocations vs expected200/400; restricted150/450/twojournals/oneallocation. [Companion129PG](runs/RUN-2026-10-15T13-08-42-693Z-runtime.json), CI38740136795:127pass2fail RT061/62, no infrastructure failure. Original303 unchanged; HTTP is separate. Implementationda40ee9683632eb3ef11cff0662e202e370b8f1e; tested merge90804160c2d26405cb2deaa70e359e32dba48f37; content46ad917306e71e5fa13e9f9d99d318a318efaf08e025926bdbe65617ad19aa02; full fingerprints in JSON.

[First18blocked](runs/HTTP-2026-10-15T09-56-23-454Z-c57f36.json) and [first6pass7fail5blocked diagnostic](runs/HTTP-2026-10-15T10-06-08-201Z-b7f9e8.json) stay immutable. Full chronology/fingerprints: [HTTP record](runs/RUN-20261015-http-runtime-first.md).

[Live adjacent read-only checks](runs/RUN-20261015-v258-live-adjacent-readonly.md): fresh normal P257-Owner/P257-Physical/v2.5.8 confirmed. Invoice400/settled250/due150; remittance200; AR150/AP400; stock7/value420; journal6/debits=credits2750; movements+10/-4/+1. Ledger match/no-match/clear restores3 rows with no stuck overlay in observed states. No live financial or module write. Earlier [same-period Balance Sheet1520=AP400+equity1120, receipt150 and SO labels/no-invalid-Edit](runs/RUN-20261015-v258-live-fix-retest.md) bounded positives retained. Wider print/query/role/settings combinations and BUG0046 persisted first alternate-vendor PO remain unverified.

## Active work and live state

PR32 owns the HTTP layer and evidence; verify actual publication/merge state. Current fixture **http-v4-canonical-loopback** serves the pinned compiled app at https://localhost:3443 with TCP pinned127.0.0.1 and certificate verification for localhost. Exact Host/origin/private CA/Secure cookies retained; no DNS, Location rewrite, trust-host setting, auth substitution or bypass grant. Seven guards and pnpm check pass. Actual26-slot result above proves the loopback-origin correction; all product failures remain red. [Guide](docs/HTTP_RUNTIME.md), [settings CHG](changes/CHG-20261015-http-settings-permissions.md). Deployed Cloudflare/Traefik/browser/files/upgrades/recovery remain open.

Chrome is available; last confirmed normal Owner/P257-Physical stock ledger. Preserve existing fixture: cash950/AR150/AP400/stock7/value420/profit120; six journals/debits2750. Do not replay PO/GRN/bill/invoice/credit/receipt150/supplier200. Credentials/actual IDs are ignored private .local files only.

P258-Entry exact setup remains **automatic-review rejected /specific approval pending /no successful save**: keep Starter and environment label unchanged, Sales/Purchase/Inventory ON, POS/Rental/HR OFF. Do not bypass via another route/grant. Earlier rejected existing-company Admin grant and Pro/environment changes remain unapproved. No company-reset SQL/production access/public secrets.

## Next acceptance work

Coding agent fixes0049/0050/0051/0052/0053; QA independently reviews the new diff/pin and reruns unchanged303 plus real HTTP with positive controls/both DB boundaries. Finish physical GRNI-on/variable-cost/partials/locks/roles, service/digital/rental/mixed/settings/files/history. **Real backup/restore LAST**, new empty target only. Keep operator recovery and expert RF01–10 open.

Full137 workflows:62partial/75unbound/**zero fully accepted**. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc,57rules/35sources, independent expert review pending. No customer-readiness percentage from assertions. Read SESSION.md and both memory ledgers to continue; historical runs/bugs/Git stay preserved.

Next isolated read-only extension candidate: receipt/remittance total/row/posted-allocation integrity and foreign/empty/type/query controls, with actual positive receipts. Source currently trusts amounts/total from query; unexecuted concern, not a new defect. Company Admin identity/Control Room/settings controls also remain open. Do not infer other fields or role permutations from the five confirmed Viewer-write actions.
