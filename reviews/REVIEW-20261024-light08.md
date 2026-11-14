# Light08 preparation review — 24 October 2026

Reviewed QA guard pin: e21c329046579aeea6687f52d59b4ea253d9cd55.

## Verification and limits

The original 26 guard tests passed independently, with no failures. This repeats local injected-js and CLI tests; it does not prove that the actual connected Browser app transport has executed. Full pnpm check was not independently run. The author reports that its backup-plan check stopped because tsx was unavailable. Frozen Light07 evidence was not edited.

A fresh read-only browser reload showed v2.5.22 · 211771e. GitHub's newest product SHA is 211771e95d6f97cac5eb281a0f8e63f0fceef8a4. Comparing that merge to the supplied c002e0e candidate found no file changes. QA did not merge or deploy.

## Product impact

The reviewed diff from 7458a9c changes BODY/HTML return-focus handling, sales-return paid/partial help, tenant-scoped source-document number/type lookup, shared source-link rendering, order detail/list routing, helper exports/tests, version and documentation. There are no migration or dependency changes in the diff. Existing financial posting expectations and design conventions remain unchanged.

Source lookup explicitly filters by tenant and source ID. This is source evidence, not real-role or foreign-record runtime acceptance. Rulebook, workflow-library and UX blobs match the previous verified inputs; their existing hashes apply. Canonical definitions remain draft/unbound.

Required consumers: purchase and quotation list Archive cancellation at desktop/390; mounted detail and inline controls; actual return paid/partial help at desktop/320/390 with an invoice positive control; order View/Open/detail source-link navigation and a shared source-linked consumer. Missing fixtures or layers remain blocked. Order print, list/trial export and business-document actor/history remain unsupported. Cashbook CSV and reconciliation JSON are separate workflows; backup/restore stays last.

## Conditional write boundary

Light08 has 37 fixed slots and a 120-minute clock with 20 minutes reserved. Read-only UX/source cases depend on actor verification but not on the financial guard gate.

Before any financial write, GUARD must prove that dispatchBrowserAppWrite invokes the ACTUAL connected Browser app js tool through a reviewed host transport. It must freshly read persisted inputs, bind the script/submission, persist charged time and one dispatch record, and show zero actual tool calls on rejected prerequisites. Passing 26 unit tests alone does not pass this gate.

If no working reviewed transport exists, record GUARD blocked before Save/Post/Convert/payment and continue independent read-only cases. Do not implement an adapter or alter the guard during the fixed run. Never use a bare Boolean authorization followed by an independent click, or substitute HTTP/standalone Playwright/CLI browser control.

## Business oracle and preservation

Use a fresh intended actor and actual private openings. Preserve existing Light07 quotation/order600, draft100, open invoice600 and open bill200 as READ-ONLY references. New S/P families must have fresh source identities. No grants, module/job/settings changes, new companies/accounts or quick-create workarounds.

Fresh S: invoice600, receipt250, linked credit100, refused overreceipt251, then same-form correction250. Fresh P: service bill200, payment80, refused overpayment121, then same-form correction120. Actual qualified liquid funds must cover at least200 before vendor payments; accepted new S receipts may provide those bookkeeping funds. No external transfer or negative-funding workaround.

The independent integer-cent oracle balances each event. Full success is seven financial events, Dr=Cr1600, AR/AP net0, liquid/net income/assets +300, liabilities unchanged, with no inventory/COGS/VAT/GRNI effect. Partial execution sums only confirmed accepted events; blocked stages cannot become all-pass totals.

Case IDs, dependencies, recovery END and oracle references/balancing were checked. No live business action occurred during preparation. This review does not establish release, full canonical workflow, expert, AT, authorization or upgrade acceptance.
