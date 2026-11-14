# Light04 observations and Medium escalation — 22 October 2026

Candidate4c3a304; QA2b009339. Preserve all previous observations and failures. These are scoped observations, not newly allocated global BUG IDs, independent root-cause diagnoses or closure claims. Only synthetic aliases and sanitized readbacks are published. No raw traces, private record IDs or credentials.

|ID|Observation|Disposition / owner|
|---|---|---|
|OBS-M19-PRODUCT-EDIT|Editing the new physical product pricing produced server exception digest3472322650; cost10/sell0 remained|Failed fixture operation; Medium+engineering investigate action/permission handling|
|OBS-M19-PRODUCT-CREATE|Full New product with cost60/sell10/qty0 produced server exception digest2035480479; exact SKU search found nothing|Separate first failure; shared cause unverified; Medium+engineering|
|OBS-M19-QUOTE-HEADER|150% quote header discount saved a zero-total draft rather than the expected refusal|Failed expected outcome; Medium review header-vs-line rule binding before engineering closure|
|OBS-M19-DIALOG-FOCUS|Tab from Delete leaves confirmation dialog for BODY; Escape did not dismiss; Cancel returns BODY|Failed bounded keyboard containment; engineering shared ConfirmDialog, Medium review|
|OBS-M19-HELP-CLIP|Status help at320px clipped left text;390px layout-edge geometry needs review|Failed bounded320px responsive assertion; engineering existing StatusHelp positioning|
|OBS-M19-SUPPLIER-FEEDBACK|Blank-reference Save retained16fields; no captured explicit refusal; no accepted bill/journal|Inconclusive feedback/server layer; Medium review, no replay|
|OBS-M19-CREDIT-PRINT|Return View exposed only Close; row Actions onlyDelete; no print control observed|Evidence capability gap; Medium bind required print layer, do not infer accounting defect|
|OBS-M19-RETURN-PREFILL|Fresh F7 reopen always copied original7 and warned remaining6→0|UX observation; money ladder passed; Medium decide expected prefill contract|

## Product edit reproduction

1. Fresh QA Owner, exact build; purchase quick-create a new physical synthetic product at cost10/opening0. Stored product was Physical/Standard, sell0, stock0.
2. Open that product's supported Edit product UI, Pricing tab. Set unit cost60 and sell10; Save changes once.
3. Observe server-exception page/digest3472322650. Read-only reopen and product/stock lists show cost10/sell0/stock0 unchanged.

Expected reviewed fixture update or explicit supported refusal with recoverable fields; not an opaque server exception. Do not repeatedly retry or enable modules/permissions to force a pass. Scope/module gating is a hypothesis for review, not an established cause. Quick-create cost10/sell0 itself is not asserted to be a bug.

## Full product creation reproduction

Open New product separately; synthetic SKU M19-RETURN-READY-20261022, name M19 Return Ready, Physical/Standard, unitcost60, sell10, openingqty0. Save product once. Server exception digest2035480479; exact SKU search after navigation: No products found. No sourceA bill was submitted. Keep this attempt separate from the edit failure until code/server evidence establishes a shared cause.

Seven sourceA-dependent purchase slots are blocked, not passes. Unlinked physical catalogue10/cost60 consumer branches are also missing. Engineering should provide a supported, verified fixture path and errors rather than have QA mutate preserved inventory.

## Quote header reproduction and oracle boundary

New quote, own customer, keyboard M16 search/Enter selects one Digital product at10. Dates21/28October committed with native keyboard changes and rechecked; notesM19 QUOTE validation retention. Enter150 in **Quote discount** with% selected. Preview clamps discount10/total0. One Save quotation accepts QT-20261021-0004 draft0, not posted. View confirms subtotal10/discount10/total0, retained dates/notes. Preserve it; do not correct to10 or convert/delete it.

Frozen queue expected150% client refusal then correction to0 and one quote10. That correction was not executed because the invalid draft was accepted. This run tested HEADER, not line discount. Medium must check approved business rules and existing validation conventions; if the mission intended only a line test, append a justified oracle/coverage correction and new fixed mission, preserving this observation. Do not silently change the expectation to current behavior.

## Confirmation keyboard reproduction

Invoice list, fresh settled synthetic INV0040 row Actions activated with Enter; Delete menuitem Enter opens Delete invoice confirmation. No destructive button is activated. Cancel→Tab reachesDelete; Delete→Tab reachesBODY outside dialog. Escape onCancel leaves dialog open. ExplicitCancel→Enter closes; focus thenBODY rather than originating Actions. StatusHelp independently opens withEnter and closesEscape, returning to its help button. Product search ArrowDown/Up/Escape also retains focus. No screen-reader, fullWCAG or global keyboard acceptance inferred.

Engineering should extend existing ConfirmDialog: initial focus, containment, Escape and return focus; preserve cancellation/no-write behavior and existing CSS/design references. Do not confirm deletion during reproduction.

## Status help clipping reproduction

Secondary active tab verified at320×844, sales returns list. Activate Sales return statuses help. Tooltip boundsx=-28,width304; screenshot shows missing left text. At390×844 boundsx42,width340 (right382 versus layout width375/viewport390 includingscrollbar). Record scrollbar/layout distinction:320 visual left clipping is directly demonstrated;390 right-bound concern needs review rather than claiming text loss solely from geometry. Row menu at320 hadx68,width220 and fit.390 menu branch was not conclusively captured. Both tabs restored1920×855 after reset.

Engineering should clamp existing StatusHelp against available layout viewport and retain keyboard dismissal; no competing tooltip framework or design rewrite.

## Supplier feedback unknown

Required supplier number=true saved/reloaded; new manualservice1×10/6800, blankreference, synthetic vendor override, dates21/22/28, notes/selects captured. One Save. All16 visible fields equal after response; native validation-message list empty. No explicit error was captured; no new credit bill found on final vendor query, journals137 and AP1185 unchanged from the other recorded writes. Server-vs-client layer unknown. No secondSave or correctedbill10; do not claim successful all-field server-refusal acceptance. Medium reviews actual submission/error handling and prepares a fresh explicit fixture if needed.

## Review priorities

1. Medium audit new failures, header/line oracle and custom checkpoint deviation; keep original expectations and evidence immutable.
2. Engineering investigate product create/edit actions with the actual supported actor/module profile; add recoverable actionable errors and validate a fresh physical fixture path. Then rerun blocked purchase returns on new run-owned sources.
3. Fix shared dialog focus and StatusHelp clipping within existing design guidance; inventory adjacent consumers. Check quote header validation contract explicitly.
4. Bind credit-print availability, supplier error feedback and remaining-quantity prefill; record policy/capability decisions with authority and exact tests.
5. Infrastructure owner prepares isolated controlled late-response and authentic old/new app/auth/DB upgrade environments. Legacy101c/104c expected values remain unchanged; backup/restore LAST.

No code root cause, independent review, legal eligibility, authorization enforcement or release acceptance has been invented. Future candidate changes require a new pinned Light mission; do not replay this consumed financial queue.
