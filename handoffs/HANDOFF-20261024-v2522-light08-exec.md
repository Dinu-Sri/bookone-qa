# Light08 execution — after PR #69 independent review

Read AGENTS.md, docs/COST_AWARE_QA.md, docs/CONNECTED_BROWSER_TRANSPORT.md, [review](../reviews/REVIEW-20261024-pr69-transport.md), [queue](../queues/MISSION-v2522-LIGHT-08-EXEC.json), [oracle](../queues/ORACLE-v2522-LIGHT-08.json) and [parent Light08 review](../reviews/REVIEW-20261024-light08.md). Checkout the QA commit named in the continuation prompt.

Target **v2.5.22 · 211771e**, full product **211771e95d6f97cac5eb281a0f8e63f0fceef8a4**. Start a NEW 120-minute clock, reserving 20 for closing, before browser setup. Initialize a NEW generic ledger before any logout/login/form submission. Bind fingerprint.qaSha to this checkout. Stop dependent actions on candidate drift.

## GUARD

Rerun `pnpm test:operator-action-guard`. Before any NEW business write, call `runPersistedBrowserRequest({tools, cwd, requestPath})` from `scripts/operator-browser-codehost.mjs` so `dispatchConnectedBrowser` invokes the **actual** connected Browser app `js` tool. Valid synthetic inputs: one inert `document.title` read. Rejected exit, missing intent, changed fingerprint and expired clock: **zero** actual js calls. Persist charged clock and exclusive claim before the tool. `isError`, finish failure and crash after claim are consumed unknown; never replay. Do not click independently after a Boolean authorize. Do not substitute Playwright, HTTP or `pnpm agent:browse`. If the actual tool is unavailable, block financial cases before Save and continue independent read-only checks. Do not edit the adapter during this run.

## Independent fixes

Retest purchase/quotation list Archive cancellation by Escape, Cancel and backdrop at desktop/390, plus detail/inline mounted-trigger positives. NEVER confirm Archive/Delete.

Test real sales-return paid AND partial help at desktop/320/390, keyboard and pointer, Escape and layout gutters, with invoice-help positive controls. Missing partial/AT/busy fixtures remain blocked.

Follow the existing order's visible source-quotation link through View/Open/detail to the exact own quotation. Order print remains unsupported.

## Conditional financial ladder

Only after GUARD and fresh fixture gates pass, execute NEW S600/P200 families using the linked oracle. Existing Light07 quotation/order 600, draft 100, open invoice 600 and open bill 200 are protected READ-ONLY. Never allocate, credit, settle, reconvert, delete or reverse them.

Verify real digital/Standard/sellable classification, account purposes, required VAT/approval settings and open period without changing settings. Verify actual funds >= 200 before P payments; confirmed NEW S receipts may supply bookkeeping funds. No grants, quick-create, negative funding or external bank transfer.

## Closing

Stop new business at 100 charged minutes. Recovery END runs even after setup/guard failure. Restore viewport, compare full settings/catalogue/old aging/protected fixtures, reconcile confirmed accepted events and verify the same end stamp. Publish sanitized results in a NEW results branch/PR. No release acceptance. Backup/restore LAST.
