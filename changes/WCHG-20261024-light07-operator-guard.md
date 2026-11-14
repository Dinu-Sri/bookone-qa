# WCHG-20261024-light07-operator-guard

Owner request: review Light07 attempt2, fix the QA orchestration guard, document missing product evidence layers, and leave Light06 focus/help to the product candidate. QA parent `5f7b8d5ee3158e0a085ff708cd24374c33859fcd`. Product inspected `7458a9c458402f9dfaf64587dd5ef7ebe1b5d448`. Frozen Light07 attempt files are immutable. L07-SALE stays failed.

## Problem and resulting behavior

Light07 L07-SALE: a start response showed running, the persisted ledger later lacked it, the intent CLI rejected, and the operator still clicked Post. The accepted sale 600 journal is financially correct; the pre-submit checkpoint is not. Late recovery start/intent/readback after the click cannot become compliance.

The operator now has a fail-closed wrapper (`scripts/operator-action-guard.mjs`) that re-reads persisted plan/state/fingerprint/clock immediately before a business browser write. It requires command exit 0, a persisted running case, matching unresolved submissionId, exact fingerprint, and clock `allowNewBusinessSubmission=true`. `executeAuthorizedBrowserAction` never calls the approved browser function unless those hold. Tests inject a spy and prove zero browser action on rejected start/intent, missing or stale persisted intent, unresolved other submission, mismatched fingerprint, missing exit code, and budget boundary. CLI `execute` with a rejected intent never spawns the command after `--`. Approved runtime remains `pnpm agent:browse`.

## Maintained sources and impact

No rulebook, UX workbook, or business-case revision. Canonical definitions remain draft/unbound/not-run. Light07 attempt2 handoff/checks/reconciliation stay frozen. AGENTS rule 104 and COST_AWARE_QA document the wrapper. `pnpm check` includes `test:operator-action-guard`.

Product evidence layers reviewed against v2.5.21 source (implemented on the product review branch, not in this QA PR):

- Supported: order source-quotation link once v2.5.22 ships (`sourceDocumentId` plus number/type on snapshot and `/sales/orders/[id]`).
- Unsupported: sales-order print (`kindFromDocument` would title INVOICE); list/trial Export controls.
- Supported exports already in product: cashbook CSV, company backup, bank-reconciliation JSON.
- Unsupported: business-document actor/audit history UI. Journal “Posted” is financial only.

Light06 OBS-M21-01 (BODY return focus) and OBS-M21-U1 (return paid badge help) are product repairs on v2.5.22. This QA change does not close them.

## Fixtures, compatibility and validation

Preserve converted quotation/order 600, unposted draft 100, open invoice 600, open bill 200. Do not collect, pay, reverse, or delete them. No grant/module/job change. No funding-gate workaround. New receipt/credit/overpay/vendor-payment work needs a NEW reviewed fixture family and clock after Medium compares the product diff.

Existing queues remain compatible. The wrapper is additive: historical runs do not acquire invented authorization. Focused operator-action-guard tests plus existing operator-queue/review54-controls run before publication. Full repository/product/runtime layers remain unexecuted in this checkout.

## Responsibilities and unresolved approval

Technical authoring by the current assistant; no invented independent human/expert sign-off. Medium independently compares the product v2.5.22 diff, verifies the guard tests, and binds a NEW Light mission. Light07 L07-SALE remains the original operator-control failure. No merge/deploy/direct message. Backup/restore LAST.
