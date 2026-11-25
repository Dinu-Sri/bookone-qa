# AgentBridge v2.7.4 — actual staging UI qualification

17 November 2026 UTC. Product `9eb13dabc3bd988bec2ed9e6bb2d17ded05db767`, tree `aa7ff89b146d8f2532dd5a5ef350a0e530e21d6b`, independently observed public/protected version `2.7.4 · 9eb13da`. This is a new qualification, not a continuation of any consumed Mission2/CONT financial queue. It does not grant activation or customer launch approval.

## Scope and environment

The user directed use of the existing staging host. A separate local Next/Postgres preparation was stopped before browser qualification; its private data and failed/abandoned preparation evidence were retained. No local UI success is claimed. The actual checks below used the deployed staging application and its persistence through normal UI. No product source, deployment, database, Jobs grants, stock, shift, payment or accounting transaction was changed by QA.

A new synthetic source company A was created under the existing authorized Owner login. Only A received Inbox enablement (draft-only and server posting stop both retained), synthetic VAT18 settings, one synthetic vendor and one 922-byte synthetic PDF. A separate new empty company B was created only for recovery LAST. Private company/document identifiers, credentials, raw snapshots, backup password, encrypted archives and screenshots remain under ignored `.local/ui-v274`; they are excluded from publication.

## Observed results

| Check | Disposition | Evidence / limit |
| --- | --- | --- |
| Live product identity and protected Owner UI | PASS | Exact deployed build observed. |
| Fresh source company and zero opening | PASS | Zero balances, movements and posted entries. |
| Default Inbox disabled; draft-only and posting stop enabled | PASS | Actual settings readback. |
| Enable Inbox only in synthetic A, retain safety flags | PASS | Saved and reloaded. |
| Synthetic VAT18 and one vendor | PASS | Saved/read back; vendor balance zero. No fake registration/TIN supplied. |
| Receive without attachment | PASS | Required-file feedback and focus; no document created. |
| Receive original PDF once | PASS | One persisted document; status failed. This is storage acceptance, not extraction success. |
| Failed extraction feedback and recovery UX | FAIL | Detail says failed and “Extractor pending (fixture or unconfigured)”; no useful cause or recovery action, proposal or editable facts. Source discards the extraction failure result/reason. Unconfigured provider is not itself a product defect. |
| Jobs role switching | FAIL | Cashier→Owner retains none until reload; Owner→Sales retains write until reload. Settled headings/role URL change while uncontrolled selects retain old role state. No Save job submitted; persisted unauthorized grants are not claimed. |
| Clarification and preview through actual Inbox UI | BLOCKED | No proposal created; initial agent-supplied facts route absent. |
| Actual UI approval and once-only posting | BLOCKED | Same dependency; no financial intent. Existing isolated service/PG acceptance remains separate carry evidence. |
| Actual UI Viewer and nonmember checks | INCONCLUSIVE | Not executed in this staging qualification; no current actual browser-role pass claimed. |
| Encrypted backup creation and actual download | PASS | Created one pair. Automated browser download paths failed; user downloaded the existing data archive. Local file found, 5432 bytes, authenticated decryption succeeded. Client-path failure is not a server-download defect. |
| Raw invoice in data archive | PASS | One document and one DB blob; original/archived PDF both922 bytes, exact byte equality. No bills/journals/proposals/operations. |
| Backup attachment missing-count presentation | FAIL | UI reports0 packed files/1 missing although original PDF is complete in the data archive. Source treats DB blob keys as S3 pointers. This establishes an inconsistent missing warning, not lost invoice bytes. |
| Recovery LAST into fresh empty B | PASS (bounded) | One data restore intent; B independently empty/eligible beforehand. Afterwards one remapped document, one remapped vendor, original source name with B slug, zero dashboard entries/balances. |
| Restored safety flags | PASS | Inbox on, draft-only on, posting-stop on. |
| Recovery attachment pack and raw download from restored UI | INCONCLUSIVE | Files pack was not applied. Restored raw bytes were not downloaded from UI; archive bytes were independently verified, and restored document UI observed. Do not substitute these for restored raw download proof. |
| Source preservation after restore | PASS (bounded) | Original source document still failed at original owned URL; source dashboard stays zero. No full database equality claim. |
| Original working company/Owner restored | PASS | Original dashboard cash771.20, net position120, AR/AP0,23 posted entries. No original-company business/settings writes. |
| External AI client/OAuth connection and agent facts transfer | BLOCKED | No independently qualified external client connection. Current MCP intake invokes server extractor and has no initial structured-facts intake. |

## Reconciliation and operating handover

No new bill, journal, payment, stock movement or shift action was submitted. Source archive has parties1, documents1, blobs1, proposals0, approvals0, operations0, jobs0, business_documents0, journal_entries0. Source A and restored B are retained; do not recreate the vendor, reupload the source or repeat the restore. The restored name equals A; use the privately recorded distinct B slug to distinguish them. Original working company and Owner session were restored; existing user tabs were left open. Agent-created diagnostics are absent from the final inventory.

The same180/150/30 clock covers all elapsed time, including long native/file-attachment waits and the manual-download interval; no inferred credit pause/reset. Final clock and publication receipt are recorded separately. Local preparation app/database remain stopped. Raw evidence stays private.

## Next coding / qualification boundary

See `handoffs/CODING-20261117-agentbridge-agent-intake-ui.md`. Prioritize agent-first structured facts linked to the original file, actionable failure recovery, role-bound Jobs controls, and storage-aware backup warnings. Server OCR is optional, not a prerequisite for the agent-assisted architecture. Retest a NEW candidate with a NEW clock; reuse/recover existing source document only through reviewed supported controls. Never replay prior financial queues. Posting remains disabled; owner deploys only.

Prior exact-tree service/permissions/nonowner-PG and isolated encrypted recovery proof is carried from PR124, not rerun or relabeled as actual staging UI coverage. External client authentication and repository protection enforcement remain outside demonstrated acceptance. This run does not complete all activation requirements.
