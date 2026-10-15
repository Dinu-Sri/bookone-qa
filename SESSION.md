# Resume BookOne QA

Read AGENTS.md, STATUS.md, memory/customer-readiness.json, memory/programme.json and applicable canonical rules. Objective remains all requested businesses/customer readiness; no release certified. Current handoff: handoffs/HANDOFF-20261015-real-http-permissions.md. Chat/private files alone are not durable memory.

## Candidate and results

- Product master/live independently checked unchanged v2.5.8 /cf35da1244e902e4a41291bc409eb0d994ed4e01. No product edits by QA. Verify again before a new candidate run.
- Original303 campaign runs/CAMP-20261015-091325948-860ae3.json =301pass2fail RT061/62, no skip/block/flaky/not-run. Original129PG=127pass2fail,43migrations/PostgreSQL16.15. Full fingerprints in JSON; no expected finance/security changes.
- Latest HTTP v1 runs/HTTP-2026-10-15T12-40-06-795Z-360298.json /CI38736302033 =7pass6fail5blocked; companion runs/RUN-2026-10-15T12-39-59-629Z-runtime.json /CI38736301845 =127pass2fail RT061/62. Implementation62bd649d119d80b6fac9e0f75ff2d254fa30507d; tested merge04292bbb31b340fbffc162d81302f03b116674ad; content648b25f3d8f562614279298316ba2cb4435f0033ccccb473bffa98c0d3817dfa. Next15.5.19/BetterAuth1.6.20. First18blocked and earlier6pass7fail5blocked retained. Full chronology runs/RUN-20261015-http-runtime-first.md.
- P1BUG0049: cross-month Balance Sheet carry wrong (Oct200vs800, quietNov0vs800). P2BUG0050: actual Add company Owner lacks included Starter writes despite normalized display. P2BUG0044 placeholder policy links open.
- P1BUG0051 real assigned Viewer persists Company Details legal name, same-action Owner positive works. P1BUG0052 null-job legacy Viewer becomes Owner during ERP session load and posts10; assigned Viewer still denied; legitimate legacy Owner repair/25 works. Owner baseline paid210/due390 instead of200/400. Distinct identity defect, not reopening BUG0010.
- P1BUG0053 restricted DB role authenticates six credentials but own ERP session positives fail; independent users visibility0 unscoped/1 scoped/foreign0/after0 matches source lookup-before-context. Staging DB role unknown. Five dependent cases BLOCKED, never secure denials. No BYPASS/global tenant workaround.

## Current HTTP implementation and next action

QA PR32 qa/real-next-https-runtime holds the layer/results. Verify actual remote head/checks before publication/merge. Preserve local preserve/http-first-implementation-local and all checkpoints; no reset/delete. Git safe.directory and OpenSSL HTTPS backend may need per-command config. Root QA dependencies differ from frozen product deps intentionally; compiled app uses product versions.

Latest v1 known-foreign fallback passes after source-declared /sales/invoices same-origin allowance; no foreign data/effects, own positives unchanged. Anonymous307 points at localhost backend-origin login with correct from-path; two-port local proxy mismatch stays historical red. Do not weaken off-target guard or rewrite Location.

Next fixture http-v2-direct-tls replaces only proxy/CLI launch with scripts/http/tls-server.mjs using supported pinned Next production API at exact HTTPS127.0.0.1:3443, same build/config/auth/routes. TLS verification/Secure cookies/source-IP rate limits unchanged; no auth replacement/trust-host setting. Wrapper CI/target/private-key-path/Host guards apply. Direct v2 actually executed7pass6fail5blocked; six guards/syntax/metadata pass. Publish reviewed implementation, inspect the triggered CI handle, then extract only allowlisted summary and preserve first result. Never infer termination from observation timeout. Actual deployed proxy/files/browser/upgrade acceptance remains open. Product failures must stay red.

## Chrome and preserved financial state

Only authorized Chrome instance47ee96de-24e4-40ae-a78f-aec725555a5f, browser1/tab132428382/window132427611, through cua_repl. After user requested check again, browser available; fresh P257-Owner credential login loaded Owner/P257-Physical/v2.5.8. This confirms prior supported switch across fresh authentication. Last page original product stock ledger, search cleared. Do not assume actor across logout/switch; verify UI/fresh credentials before role-specific writes. Private credentials/IDs in ignored .local/live-v257/accounts.json and .local/live-v258 files; never publish cookies/passwords.

Live runs/RUN-20261015-v258-live-adjacent-readonly.md verifies8 bounded observations plus filter match/no-match/clear: invoice400/settled250/due150; supplier remittance200; AR150/AP400; stock7/value420; journal6/debits=credits2750; stock+10/-4/+1. No records written/replayed. Original capital1000, PO600/GRN10at60/bill600, invoice4at100/receipt150/credit100/sourcecost60/supplierpayment200 remain committed. Cash950/profit120. Keep them intact. Receipt errors never imply rollback; only revisit display read-only.

Original P257 profile Sri Lanka/LKR/Asia-Colombo, VATregisteredfalse/tax0, average/block, PurchaseGRNIoff/approvaloff/duplicateblockon; reread actual settings before any new workflow. Same-period Balance Sheet1520=AP400+equity1120 is bounded fixed evidence, not as-of certification. Wider print/query/currency/role combinations remain. BUG0046 alternate field native validation fixed but first persisted PO positive unverified.

## Pending exact setup approval

P258-Entry actual additional company/Owner/warehouse created; first alternate-vendor service PO60 submitted once, lists/vendor/journal empty. No successful module Save. Automatic review rejected exact change: Starter/environment unchanged; Sales/Purchase/Inventory ON; POS/Rental/HR OFF. Specific user approval requested, not received. Do not treat try now/continue as exact approval or bypass via API/grant. Earlier existing-company Admin grant and Pro/environment changes remain unapproved. Continue independent work.

## Scope and continuation

Review new coding diff/pin then unchanged303/HTTP. Physical GRNI/variable-cost/partials/locks/roles next, then service/digital/rental/mixed/settings/files/history; actual encrypted A-to-empty-B backup/restore LAST. No company-reset SQL/shared-staging fault injection/production access/public raw evidence.

Full137 workflows62partial75unbound0accepted; exact-role/real files/upgrade/recovery and expert RF01–10/policies incomplete. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. Do not derive readiness percentage from check counts. Each phase ends with updated ledgers/indexes, immutable sanitized evidence, bug state and exact verified next handle/action. Only completed objective can complete the goal.

## Latest executed direct TLS and next settings extension

[Direct v2 summary](runs/HTTP-2026-10-15T12-51-34-870Z-415340.json), CI38737766985:7pass6fail5blocked, setup passed. Direct transport did NOT resolve anonymous redirect origin; BUG0051/0052/0053 unchanged. Implementationdf275880fa18c80908b69e4d5e52bb866296571e; tested mergefaa897d22fec62a5a3ec1c62e6dd639ca10c44ec; contentbf53cb7d3b9da18e708e2cc2cdb50cea06aaa476d0556f40ac39b8064fb65ed9. Companion [129PG](runs/RUN-2026-10-15T12-51-16-344Z-runtime.json), CI38737767259:127pass2fail RT061/62, no infrastructure failure. Immutable first results retained.

Next fixture http-v3-settings adds actual rendered tax/sales/purchase/inventory Server Action cases HTTP010–013/110–113 (26 total slots). Each requires Viewer zero effects, working Owner distinct field persistence and unchanged posted finance/stock. Settings run last on service-only fixtures; source missing guards are hypotheses until execution. Original303 and18 HTTP expectations unchanged; anonymous origin remains failed, with only numeric loopback-host/protocol/port diagnostics added. Six guards/syntax pass; fresh26-slot CI pending. [Intent](changes/CHG-20261015-http-settings-permissions.md). No staging writes, reset, permission grant or backup.

## Latest26-slot execution and canonical origin correction

[HTTP v3](runs/HTTP-2026-10-15T13-00-44-761Z-8d1cb1.json), CI38739011909:7pass10fail9blocked, setup passed. Four added settings actions HTTP010–013 each persist assigned Viewer changes; every Owner distinct positive and unchanged posted-facts control passes. BUG0051 expanded to five confirmed settings actions; same source guard pattern, no new bug IDs. BUG0052/0053 unchanged. Restricted110–113 block on own identity, not secure denials. Companion129PG CI38739011904 =127pass2fail RT061/62. Original303 unchanged. See expanded coding handoff.

Anonymous origin cause now verified: numeric observations HTTPS/localhost/3443 and pinned NextURL.parseURL normalization of loopback IPs. Fixture v4 uses canonical https://localhost:3443 with TCP explicitly pinned127.0.0.1 and certificate servername localhost, no DNS request, redirect rewrite, TLS/cookie relaxation or product config/auth changes. Seven guards/syntax pass; fresh v4 actual execution pending. All v1/v2/v3 mismatches preserved. Current original live Owner stock ledger/no record changes remains as recorded.
