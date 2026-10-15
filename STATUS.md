# BookOne customer-readiness status

**NOT customer-ready or certified.** Product source/live v2.5.8 /cf35da1, full SHA cf35da1244e902e4a41291bc409eb0d994ed4e01. Master independently rechecked unchanged2026-10-15. QA made no product edits. Current [coding handoff](handoffs/HANDOFF-20261015-real-http-permissions.md); earlier [report/bootstrap handoff](handoffs/HANDOFF-20261015-v258-bootstrap-findings.md) remains applicable.

## Current defects

| Priority | Finding | Evidence boundary |
|---|---|---|
| P1 | [BUG-0049](bugs/BUG-0049-balance-sheet-period-only-balances.md): cross-month Balance Sheet omits prior balances | September600+October200 stores AR800; Oct report200 and quietNov0 instead of800; monthly income and immutability controls pass. RT-061 still fails. |
| P1 | [BUG-0051](bugs/BUG-0051-viewer-company-profile-server-write.md): assigned Viewer persists company legal name and tax/sales/purchase/inventory settings | Real credential/compiled Next/form action on owner DB; correctly loaded Viewer and same-action Owner positive verified. |
| P1 | [BUG-0052](bugs/BUG-0052-credential-session-promotes-legacy-viewer.md): null-job Viewer becomes Owner and posts receipt10 | Persisted session-boundary membership promotion and actual financial action; assigned Viewer denial and legitimate legacy Owner repair still work. |
| P1, restricted runtime | [BUG-0053](bugs/BUG-0053-nonowner-credential-erp-session.md): authenticated user cannot establish ERP session under NOBYPASSRLS | Six real auth identities work, own ERP positives fail; exact-role users visible0 unscoped/1 correctly scoped/foreign0/after0. Staging DB role unknown; no leak claim. |
| P2 | [BUG-0050](bugs/BUG-0050-additional-company-starter-capabilities.md): additional-company Owner lacks included Starter Sales/Purchase | Live first PO60 refused/no document/vendor/journal; independent actual company-create/permission controls reproduce RT-062. |
| P2 | [BUG-0044](bugs/BUG-0044-signup-policy-links.md): signup policy links are placeholders | Still open. |

Do not reopen BUG-0010–0043 without a fresh demonstrated regression. BUG-0052 is an identity promotion defect, not reopening the repaired assigned-Viewer payment handler. Keep all independent expected amounts/roles/zero-effect negatives unchanged.

## Executed evidence

[303 campaign](runs/CAMP-20261015-091325948-860ae3.json):301pass/2fail, no skip/block/flaky/not-run; included129PG=127pass2fail RT061/62,43migrations/PostgreSQL16.15. All original301 expectations still pass. Exact original fingerprints in JSON; partial passing assertions are not workflow acceptance.

[Latest real HTTP v1](runs/HTTP-2026-10-15T12-40-06-795Z-360298.json), [CI38736302033](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38736302033): **7pass/6fail/5blocked**. Implementation62bd649d119d80b6fac9e0f75ff2d254fa30507d; tested merge04292bbb31b340fbffc162d81302f03b116674ad; content648b25f3d8f562614279298316ba2cb4435f0033ccccb473bffa98c0d3817dfa; Next15.5.19/BetterAuth1.6.20. Known-foreign read now passes the route's safe same-origin list fallback, preserving own/data/state controls. BUG0051/0052 reproduce; restricted identity supports BUG0053. Anonymous middleware redirects to localhost backend-origin login/from-path: local transport mismatch remains failed, not assigned as product vulnerability. Five dependent restricted cases block; unchanged finance there is not secure-denial proof. [Companion129PG](runs/RUN-2026-10-15T12-39-59-629Z-runtime.json), CI38736301845:127pass2fail RT061/62, no infrastructure failure. HTTP is separate from303.

[First18blocked](runs/HTTP-2026-10-15T09-56-23-454Z-c57f36.json) and [first6pass7fail5blocked diagnostic](runs/HTTP-2026-10-15T10-06-08-201Z-b7f9e8.json) stay immutable. Full chronology/fingerprints: [HTTP record](runs/RUN-20261015-http-runtime-first.md).

[Live adjacent read-only checks](runs/RUN-20261015-v258-live-adjacent-readonly.md): fresh normal P257-Owner/P257-Physical/v2.5.8 confirmed. Invoice400/settled250/due150; remittance200; AR150/AP400; stock7/value420; journal6/debits=credits2750; movements+10/-4/+1. Ledger match/no-match/clear restores3 rows with no stuck overlay in observed states. No live financial or module write. Earlier [same-period Balance Sheet1520=AP400+equity1120, receipt150 and SO labels/no-invalid-Edit](runs/RUN-20261015-v258-live-fix-retest.md) bounded positives retained. Wider print/query/role/settings combinations and BUG0046 persisted first alternate-vendor PO remain unverified.

## Active work and live state

PR32 owns the new HTTP layer and evidence. Next fixture **http-v2-direct-tls** uses supported pinned Next production API with direct loopback TLS3443, same actual build/config/auth/actions, no Location rewrite or trust-host bypass. Six target/cookie/redirect guards, syntax and metadata checks pass. Direct v2 actually executed7pass6fail5blocked; see latest section below. [Guide](docs/HTTP_RUNTIME.md). It does not certify actual Cloudflare/Traefik, browser hydration/files or full recovery.

Chrome is available; last confirmed normal Owner/P257-Physical stock ledger. Preserve existing fixture: cash950/AR150/AP400/stock7/value420/profit120; six journals/debits2750. Do not replay PO/GRN/bill/invoice/credit/receipt150/supplier200. Credentials/actual IDs are ignored private .local files only.

P258-Entry exact setup remains **automatic-review rejected /specific approval pending /no successful save**: keep Starter and environment label unchanged, Sales/Purchase/Inventory ON, POS/Rental/HR OFF. Do not bypass via another route/grant. Earlier rejected existing-company Admin grant and Pro/environment changes remain unapproved. No company-reset SQL/production access/public secrets.

## Next acceptance work

Coding agent fixes0049/0050/0051/0052/0053; QA independently reviews the new diff/pin and reruns unchanged303 plus real HTTP with positive controls/both DB boundaries. Finish physical GRNI-on/variable-cost/partials/locks/roles, service/digital/rental/mixed/settings/files/history. **Real backup/restore LAST**, new empty target only. Keep operator recovery and expert RF01–10 open.

Full137 workflows:62partial/75unbound/**zero fully accepted**. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc,57rules/35sources, independent expert review pending. No customer-readiness percentage from assertions. Read SESSION.md and both memory ledgers to continue; historical runs/bugs/Git stay preserved.

## Latest executed direct TLS and next settings extension

[Direct v2 summary](runs/HTTP-2026-10-15T12-51-34-870Z-415340.json), CI38737766985:7pass6fail5blocked, setup passed. Direct transport did NOT resolve anonymous redirect origin; BUG0051/0052/0053 unchanged. Implementationdf275880fa18c80908b69e4d5e52bb866296571e; tested mergefaa897d22fec62a5a3ec1c62e6dd639ca10c44ec; contentbf53cb7d3b9da18e708e2cc2cdb50cea06aaa476d0556f40ac39b8064fb65ed9. Companion [129PG](runs/RUN-2026-10-15T12-51-16-344Z-runtime.json), CI38737767259:127pass2fail RT061/62, no infrastructure failure. Immutable first results retained.

Next fixture http-v3-settings adds actual rendered tax/sales/purchase/inventory Server Action cases HTTP010–013/110–113 (26 total slots). Each requires Viewer zero effects, working Owner distinct field persistence and unchanged posted finance/stock. Settings run last on service-only fixtures; source missing guards are hypotheses until execution. Original303 and18 HTTP expectations unchanged; anonymous origin remains failed, with only numeric loopback-host/protocol/port diagnostics added. Six guards/syntax pass; fresh26-slot CI pending. [Intent](changes/CHG-20261015-http-settings-permissions.md). No staging writes, reset, permission grant or backup.

## Latest26-slot execution and canonical origin correction

[HTTP v3](runs/HTTP-2026-10-15T13-00-44-761Z-8d1cb1.json), CI38739011909:7pass10fail9blocked, setup passed. Four added settings actions HTTP010–013 each persist assigned Viewer changes; every Owner distinct positive and unchanged posted-facts control passes. BUG0051 expanded to five confirmed settings actions; same source guard pattern, no new bug IDs. BUG0052/0053 unchanged. Restricted110–113 block on own identity, not secure denials. Companion129PG CI38739011904 =127pass2fail RT061/62. Original303 unchanged. See expanded coding handoff.

Anonymous origin cause now verified: numeric observations HTTPS/localhost/3443 and pinned NextURL.parseURL normalization of loopback IPs. Fixture v4 uses canonical https://localhost:3443 with TCP explicitly pinned127.0.0.1 and certificate servername localhost, no DNS request, redirect rewrite, TLS/cookie relaxation or product config/auth changes. Seven guards/syntax pass; fresh v4 actual execution pending. All v1/v2/v3 mismatches preserved. Current original live Owner stock ledger/no record changes remains as recorded.
