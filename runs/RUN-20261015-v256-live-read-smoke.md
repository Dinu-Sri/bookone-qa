# Live read-only smoke - v2.5.6

Date2026-10-15; staging https://bookone.clossyan.com. Observed sidebar **v2.5.6 · d5377d8** using the Chrome tab context and the same authorized Chrome instance. Source pin d5377d89d2bd9d27c52a6e9c43376f2d03255bd0; this observes the displayed version/SHA7, not a container digest or full deployment configuration audit.

Existing authenticated administrative session displays Owner and Control Room. No fresh login or normal Owner/Viewer attribution is claimed. No accounts or grants created.

Observed checks:

- Sidebar stamp matches the candidate: passed.
- Company navigation expands; Backup opens and renders its password/export/restore controls without an error page: passed, page-load smoke only.
- Current company is shown as having trading records and its data-restore button is disabled: passed at UI only, not server-side refusal acceptance.

Initial click targeted a link inside a collapsed group and did not navigate. Expanded Company using the visible group button, then opened Backup and verified the completed page. No navigation defect inferred. The previous extension popup no longer blocked this navigation; account-role approval remains a separate pending dependency.

No new transaction, stock, user, permission, company-setting, file upload, backup export or restore changes. Existing trading records left intact. No screenshot or private session/financial data published.

This does not verify export/restore, overlay completion after writes, invoice/payment/refund persistence, normal-role server denials, tenant/file isolation or module-off history. Existing campaign remains292 checks291pass/1fail; BUG-0043 still needs repair. Send that coding handoff now; no requirement to wait for further testing. Next live batch: physical purchase-to-sale/return/reconciliation, then normal-role/scope checks and real encrypted A-to-new-empty-B restore with attachments. No company-reset SQL; archive/password/cookies remain private.
