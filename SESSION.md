# Resume BookOne QA

Read AGENTS.md, STATUS.md, memory/customer-readiness.json, memory/programme.json, docs/rulebook/README.md and applicable rules. Current handoff: [v2.5.8 two findings](handoffs/HANDOFF-20261015-v258-bootstrap-findings.md). These indexes describe current state; immutable runs/bug history retain earlier attempts.

Current independent work: real HTTP PR32, latest executed runs/HTTP-2026-10-15T10-06-08-201Z-b7f9e8.json /CI38717742247 =6pass7fail5blocked. P1BUG0051 assigned Viewer company-profile write and P1BUG0052 null-job Viewer session promotion/payment10 confirmed in owner-DB real credential/Server Action boundary. Handoff: handoffs/HANDOFF-20261015-real-http-permissions.md. First18blocked preserved. Companion129PG runs/RUN-2026-10-15T10-06-00-736Z-runtime.json /CI38717742263 =127pass2fail RT061/62. Do not conflate redirect classification/restricted ERP identity failures with confirmed security bugs or accept blocked denials. No product/303 expectation edits. Next diagnose anonymous redirect numeric origin and case-specific /sales/invoices safe fallback; real restricted auth works but ERP own positives fail. No BYPASSRLS/global tenant context workaround. Preserve completed runs before fresh attempts.

## Verified source and execution

- Product pinned cf35da1244e902e4a41291bc409eb0d994ed4e01 /VERSION2.5.8; observed live v2.5.8 · cf35da1. Check actual master/live identity again before any new run; no source fix has yet been observed.
- QA source root is this repository; product checkout is work/product inside it. Latest test implementation78d4f986081032988090f9e46de03768e83301a0; tested PR merge92a4bfc6b277eae1250ab1f94dde49237af17728; test PR30 merged b08b413a6155b12e0234b4a41d64666becbd8c7b. Verify current Git main/publication PR rather than assuming a chat SHA.
- Latest campaign runs/CAMP-20261015-091325948-860ae3.json =303 selected,301pass/2fail/zero skip/block/flaky/not-run. Included runtime runs/RUN-2026-10-15T09-13-33-663Z-runtime.json =127pass/2fail of129,43/43 migrations/PostgreSQL16.15, no infrastructure failure. Contentd4775e8044006ba05edb10277152e78b40919b4896adac72a62971dc4c7e7ae7; plan78a786b058e8b1e12560f2d5aaa63a8d9eb8fbce7ab6bd1452fccc4dc95a8abd; Node22.23.3/campaign-v2, full fingerprints in JSON.
- P1 BUG-0049/RT-061: cross-month Balance Sheet carry, Oct200vs800 and quietNov0vs800; stored AR800 and monthly income/report immutability pass. P2 BUG-0050/RT-062: additional-company Starter Owner denied included Sales/Purchase, normalized UI misleading; Viewer denial/Owner creation controls pass. Keep both failures red.
- All original301 assertions still pass; BUG-0048 same-month earnings repro fixed. Live existing receipt150 render, journal6 unchanged and SO labels/no invalid Edit bounded passes. Wider adjacent receipt/preview checks and BUG-0046 persisted alternate-vendor PO are pending. BUG-0044 policy links stays open. Do not reopen BUG-0010–0043 without a fresh demonstrated regression.

## Browser, identities and pending approval

Use only the authorized Chrome instance47ee96de-24e4-40ae-a78f-aec725555a5f, browser1/tab132428382/window132427611 through cua_repl. Do not switch browser/runtime. Latest user try now: fresh normal P257-Owner credential login succeeded, loaded Owner/P258-Entry and v2.5.8 /cf35da1. Supported P257-Physical switch did not visibly change company, then Logout began. Extension UI blocked observation again. No financial writes/module saves. Current actor/company after pending Logout unverified; inspect UI and freshly authenticate before role-specific work.

P258-Entry: actual additional company created by P257-Owner, supported switch/fresh Owner login, one warehouse P258-WH. First alternate-supplier service PO60 submitted once; no visible saved PO/vendor, journals0. Admin display shows Starter, Sales/Purchase/Inventory/POS enabled and Rental/HR off. UI normalization is not raw stored flag proof.

Automatic approval review REJECTED saving this exact target setup: Starter/environment unchanged; Sales/Purchase/Inventory ON; POS/Rental/HR OFF. Explicit approval requested through user input and remains pending. No successful Save; POS remained checked before Logout. Do not bypass through an API, a grant or an alternate target-configuration route. Specific approval, if received, must match this scope and actual target before Save. Earlier rejected Admin grant to an existing company remains unapproved as well. No password reset or Pro/environment change.

Normal actor credentials/actual IDs live only in ignored .local/live-v257/accounts.json and .local/live-v258/journal.json /continuation.json. Never publish them or inspect cookies. The new RT-062 ephemeral company is different from the staging target and does not execute its rejected setup indirectly. No actual backup run has started.

## Preserve existing financial state

P257-Physical: QA Physical257's Company, Sri Lanka/LKR/Asia-Colombo, Starter with separately enabled Inventory; normal Owner, no POS/Rental/HR. VATregistered=false/tax0; average costing/negative-stock block; purchase GRNIoff/approvaloff/duplicate block on at its original run. Read actual settings before a new workflow; do not assume they remain unchanged.

Already committed and privately logged: capital1000, PO600, GRN10at60, bill600, quote/SO/invoice4at100, receipt150, linked credit100/sourcecost60 and supplier payment200. Do not replay. Cash950/AR150/AP400/stock7/value420/profit120; journals6 and debits=credits2750; stock+10/-4/+1, invoice total400/settled250/due150, bill600/paid200/due400. Receipt errors did not roll back payments. Retest display by READ-ONLY navigation.

## Next execution and acceptance

1. Preserve these first303 results and current public findings. Coding agent must fix BUG-0049/0050/0051/0052 without changing expected money, journals, module ceilings or original tests. Graph-first discovery can be stale Desktop snippets: verify the exact pinned files/diff.
2. On new candidate: deliberately update product-ref and relevant current-candidate metadata, run session:start/product:prepare/check/campaign:plan, then unchanged303 fresh isolated PostgreSQL. No repeated unchanged runs merely to fill time; no edits during a run. Campaign intentionally refuses full acceptance while workflows/policies are unfinished even when implemented assertions pass.
3. When Chrome clears, verify actor and persisted PO state. Finish original-fixture read-only invoice/remittance/AR/AP/stock positives. Specific P258 setup needs the pending exact approval; fresh Owner login after any authorized admin setup. Do not count relaxed native validation or hidden UI as persisted success/server authorization.
4. Continue physical GRNI-on BEFORE receipt, variable cost/source return/partials/locks/roles; then service/digital/rental/mixed/settings/entity/files/history. Actual encrypted backup/restore LAST, new empty target only. No company-reset SQL, production access/shared-staging faults or public secrets; destructive/race fixtures only guarded loopback bookone_qa_runtime.
5. Full137 workflows62partial/75unbound/zero accepted; real credential/HTTP/browser/storage, scopes/races, full upgrade/recovery and expert RF-01–10/policies remain open. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc, expert review pending. Do not claim customer readiness or a readiness percentage from assertion totals.

End each phase by updating both ledgers/current indexes, immutable sanitized summaries, bug disposition and exact next action. Keep private first attempts and preserve/* branches; never reset/delete them. Prior v2.5.7/v2.5.8 evidence links are in STATUS and their full historical records remain in Git.
