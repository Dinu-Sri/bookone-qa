# Coding mission — PR54 review

Read [technical review](../reviews/REVIEW-20261022-pr54.md), original [PR54 checks](../runs/CHECKS-20261022-light04-results.json) and [observations](../bugs/OBS-20261022-light04-results.md). Investigated product4c3a304; latest inspected master3e9ffee is its documentation successor. Read YOUR current AGENTS, PROJECT_STATUS, QA_CHANGE_CONTRACT, UI_UX_CHANGE_GUIDE, LIST_TABLE_UX_GUIDE and relevant component guides before implementation. Do not overwrite another agent's work. This is a reviewable source mission, not authority to merge/deploy/change permissions or repair history.

Create a product CHG identifying actual base/finalSHA, external QA revision, UX1.1.0 JSON hash, BR-SAL-03 and affected UXW002/005/018/021 plus dependent business journeys. Maintain existing visual vocabulary/components/CSS, form names/source ancestry and document history. Product VERSION bump and normal required checks still apply. No new framework/palette/global redesign or duplicated rule catalogue.

## C54-01 — product action denial and fixture qualification, P1

Trace full create/edit→assertModuleWrite and actual private actor/module/job context; attribute the two exception digests using appropriate private server evidence. Do not call the actual digest cause confirmed from source alone. Full pages must not present an apparently writable form when the actor has read-only capability. Handle expected authorization/validation/business refusal with an actionable accessible result and retained recoverable fields. Preserve genuine redirect/control flow and audit boundaries. Do not catch success redirects as errors or remove server permission checks.

Separately review quick-product creation against intended document/catalogue/module/job permissions and test its server boundary with real provisioned roles/objects in isolated auth fixtures. No privilege expansion, bypass fixture, or safety-by-hidden-button claim. This is a source concern pending runtime role evidence, not a proven foreign-tenant exploit. Provide an **already-authorized** Inventory product-write fixture for QA through private supported provisioning; keep credentials/IDs private. Light must not change module flags/jobs/grants to obtain a pass.

Authorized variant: full create Physical/Standard/cost60/sell10/opening0, then edit only new fixture notes; both persist once with zero stock/GL. Denied variant: clear supported refusal, no created/edited record/GL/stock and applicable fields retained. Bind each role/config separately; Owner label alone is insufficient.

## C54-02 — raw header discount validation, P1

The quote header150% reaches submission as a clamped fixed10 on a10 quote. Existing server amount validation cannot infer the discarded original percentage. Preserve/validate raw manual header type/value through client and server contracts, plus actual saved-discount values when applicable. Reject excessive input before creating a quote/invoice/bill; do not silently cap it. Preserve valid100%, fixed≤line-net, zero, line10%/header5% and source-derived historical return amounts. Do not accept client hidden values as authority or let raw manual fields override linked source pricing/discount history.

Maintain backward-compatible existing callers: inventory affected quote/invoice/SO/PO/GRN/purchase/import/expense/return and any direct action adapters. Validate the authoritative raw facts when provided and independently validate final monetary amounts. Explicitly define handling for older amount-only callers without authorizing them to submit excessive amounts. Tests must cover LINE150% separately from HEADER150%, fixed excess, saved discount excess, valid bounds and no duplicate/new document on refusal. Do not edit preservedQT0004draft0; new fixtures only.

## C54-03 — shared ConfirmDialog, P1

Implement safe initial focus, forward/backward focus containment, Escape/cancel and return-to-trigger in the existing primitive; unique accessible IDs and cleanup on unmount. Preserve native field keyboard behavior. Define busy/async dismissal so outside click/Escape cannot hide an unresolved write; don't trap users after a conclusive refusal. Inventory consumers and test at least invoice and purchase confirmations, nested/conditional lifecycle and a safe isolated busy fixture. Browser QA never confirms Delete/Archive for this check. DOM aria-modal alone is not keyboard or screen-reader evidence.

## C54-04 — existing StatusHelp placement, P2

Use measured rendered dimensions and available layout viewport, including scrollbar width, for left/right placement; flip/clamp vertically based on actual height, and refresh after relevant resize/scroll.320px nominal340 width currently computes left-28 while CSS shrinks width304. Retain current styling, pointer/keyboard help, Escape and meaningful content; do not replace tooltips wholesale. Test both StatusBadge and wide StatusColumnHelp on sales/purchase consumers, corners, long text,320/390/desktop. Preserve390px geometry correction: no verified390text loss solely fromx42+340.

## C54-05 — credit print capability and remaining prefill

Print: if adding the missing supported control, extend current print model/sheet with correct **credit** kind/title/source/line/header/VAT facts. Generic invoice fallback is not acceptable for a return. Test credit300 and historical302.67/46.17 under currentVATfalse, plus purchase60/120 when fixtures exist. If not implemented, explicitly leave this capability blocked with owner; the original print assertions remain missing. Do not close monetary defects on the strength of an invoice-labelled printout.

Prefill: show remaining editable quantity after prior returns without changing original sourceQuantity/discount ancestry used for proration. Preserve the first warning evidence and fresh F7 amounts. Partial/over-return/source0 plus source3x100/header discounts and7x1/.05 ladders must remain exact. Multiple original rows of the same SKU with different prices remain separately unresolved; no guessed first-match acceptance.

## C54-06 — feedback retest and delivery

Supplier-refusal toast is transient3200ms. PR54 did not capture it, so don't claim a demonstrated missing-toast product bug or add a toast to every click. Verify the actual required-reference path and durable/actionable refusal as appropriate to existing conventions; preserve all submitted dates/notes/selects. Report exact server/client/native layer. Shared feedback changes require adjacent successful draft/Post/cancel and pending cleanup/idempotency checks.

Deliver exact changed-path/consumer inventory, raw-header contract, fixture permission evidence, CHG/version/fullSHA/build instructions and actual tests with failures/blocked layers. Engineering tests do not self-close QA findings. Medium compares the actual diff and publishes a NEW exact-bound Light05 queue before execution. Do not deploy across a fixed mission. No messaging from QA: owner relays repository links. Backup/restore LAST.
