# Light05 findings —v2.5.20 · de45536

Full candidate de45536bc47ead3e20f401ecd5fe144bfdf7d52c; execution QA a6379c2e4c835dc710e324fca342f0bba9decd9e. Synthetic own staging data only. Prior findings/expectations remain unchanged. Severity and root cause await Medium review.

## OBS-M20-01 — list confirmation loses return focus (confirmed)

M20-DIALOG; UXW-018. On an own run-owned purchase (PUR-20261021-0010), open Purchases list → that row Actions → Archive. Do not confirm Archive. Cancel initially focuses and Tab wraps. Press Escape: dialog closes, but document.activeElement is BODY on desktop1920×855 and actual390×844. Expected: focus returns to a surviving invoking row control, preserving keyboard context. On purchase DETAIL the same Cancel/Tab/Escape/explicitCancel returned focus to Archive correctly. This isolates a consumer regression without confirming deletion/archive. Trigger lifetime is a hypothesis, not proved root cause. Busy/outside/reader variants remain missing.

## OBS-M20-02 — help width still exceeds scrollbar-adjusted320 layout (confirmed)

M20-HELP; UXW-018/021. At actual320×844 with documentElement.clientWidth305, open Invoice statuses help; repeat Sales return statuses help. Rendered x8,width304,right312:7px outside layout; right edge visually clips. Expected padded containment within actual usable width. At390×844/layout375,invoicehelp x27,width340,right367 fits. Desktop fits. Hovering content/Escape/focus return worked; first/last invoice row menus fit. Do not claim verified text loss or repeat the old incorrect390 x42+340 clipping claim. Measured box/CSS-width interaction needs coding review; fix must extend existing CSS/components rather than replace design system.

## OBS-M20-U1 — rich text under view-only fieldset (unknown)

New and existing-product Edit show clear view-only alert, disabled native fields and no Save. Two rich-text role=textbox nodes still declare contenteditable=true beneath disabled fieldset. No input/persistence probe was performed on old data; attribute evidence alone does not prove editing or an authorization bypass. Medium should prepare a safe isolated behavior/keyboard test and retain zero-write expectations.

## OBS-M20-U2 — quick-create control offered to denied product profile (unknown)

Under the same denied full-product profile, a fresh unsaved manual quote line displays enabled Save-as-product. It was **not pressed**; form cancelled and catalogue count stayed10. Server candidate now asserts inventory write, so this is not a demonstrated server bypass. POS consumer unavailable in authorized navigation. Medium must bind real allowed/denied/foreign-record runtime fixtures; do not grant access or quick-create around a denied action.

## Operator / infrastructure gaps (not product bugs)

LINE150 noquote/GL and16field retention observed, but immediate toast missed; datefill first reverted to22Oct/21Nov instead of intended21/28. Preserve as inconclusive, no retry. Independent HEADER/SUP/DISCOUNT fixtures used verified native keyboard up/down commit and passed their dates. Closing local environment disconnected after successful ERP restoration; final ledger/clock write unavailable. See run/handoff for the supplemental accepted readback and exact next action.

Bounded fixes that passed fresh reproduction: HEADER150refusal/correction10; durable supplier serverrefusal/all16retained/same-form correction10; split source-price locks/invalid then valid300; draft256.50; historicalVAT302.67; sales credit preview/title/source/lines/VAT; fresh seven-credit ladder and remaining-prefill. Full bug closure remains Medium-owned because purchase/8consumer/runtime/upgrade layers are missing.
