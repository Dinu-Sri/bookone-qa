# Coding / Medium mission —Light06 observed results

Product v2.5.21 · 7458a9c / 7458a9c458402f9dfaf64587dd5ef7ebe1b5d448; QA execution60198f3189459431fe32d331a0abe1ae00351743. Fresh intended existing fixture login with Remember off; no permission changes. Prior Light05/blocked-attempt history stays immutable.

## OBS-M21-01 — list-dialog return focus still fails
Reproduced on purchase list and sales quotation list, each at1920×855 and390×844/layout375. Existing own synthetic rows with surviving Actions buttons. Keyboard Actions→Archive; initial Cancel focus correct, Shift+Tab reaches Archive and Tab wraps to Cancel. Escape, explicit Cancel and backdrop each close the dialog but document.activeElement is BODY. Fresh settled read confirms BODY. No Archive/Delete/Restore confirmation was activated. Original row status/amount persisted unchanged. Four failed slots are four consumer/viewport observations, not four independent root causes.

Adjacent positives: purchase detail at desktop/390, quotation detail desktop and customer inline Archive each restore the mounted actual Archive trigger through all three cancellation paths. Focus containment works. These positive controls narrow the symptom to the observed portal-list paths; do not infer other consumers passed.

Engineering: investigate the actual deployed fallback capture/ref lifecycle and row-button registration on the exact candidate. Earlier source review's returnFocus wiring is not executed success. Do not guess cause or close the defect from helper tests. Preserve existing design, unique labels, Cancel-first focus, trap, busy protections and current money/permissions. Provide actual before/after DOM tests for both lists and both widths, plus consecutive different-row dialogs so a stale fallback cannot silently pass. Keep detail/inline positive controls. No destructive confirms on shared staging.

## OBS-M21-U1 — return paid badge help unavailable
Sales returns list shows paid badges on the existing completed synthetic returns. Those StatusBadge wrappers have no tabindex; pointer hover produces no tooltip. Keyboard press hit a selector deadline on that nonfocusable span; this is not successful keyboard execution. No fields or returns were changed. Column-level Sales return statuses help works at320/390 and resize. All current visible paid rows had this condition.

Medium/engineering: review actual return status-family mapping and intended paid/open semantics, including the guide. This is a missing supported-help layer/semantic question, not a proved monetary defect. Do not alter document/accounting statuses merely to make a tooltip appear. If paid is supported, supply accessible appropriate help; if not, document the supported source/fixture and compatibility. Retest both column and badge consumers. No whole-slot pass while required badge evidence is missing.

## Verified partial repair evidence
Invoice wide help at320inner/305layout is289px x8..297; badge260px x37..297. At390inner/375layout wide340px x27..367, badge260px x107..367. Column content remains hoverable; Escape dismisses and retains focus. First/last row and scrolling checked.

Return column:320wide289x8..297 and390wide340x27..367; actual bubble hover and Escape work. Both column families resize desktop→320→390→desktop, retaining containment; desktop340 and invoice badge260 preserved. Missing return-badge consumer keeps RH320/RH390/RESIZE blocked despite partial geometry success. No verified text-loss claim, no accessibility certification.

Fresh LINE150 refusal: exact immediate client message, all16 visible field values retained, separate quote-list and trial readback unchanged. Correct only LINE150→0; one new draft at independently expected10 with verified dates/notes/line, no GL/stock change. Generic edit exposes only a subset; extra PO/terms persisted metadata is not certified. Do not turn this bounded pass into server-refusal or full edit acceptance.

## Required unblockers and efficient continuation
- Engineering/environment owner: existing legitimately authorized own Inventory writer and synthetic physical/source-price/purchase-return/consumer/print fixtures; no grants or quick-create workaround by Light.
- Security owner: isolated allowed/denied/foreign-record real runtime authorization for U1/U2; UI attributes are not server proof.
- Environment owner: exact-candidate isolated busy/removed-row DOM and late-response fixtures; authentic101c/104c prior-version upgrade environment.
- Qualified AT tester: actual reader/version/navigation evidence. DOM/ARIA snapshot is not AT execution.

Fix list focus and clarify the return-help contract in compatible changes; Medium reviews actual diff/new candidate and binds the smallest fresh exact/adjacent queue. Do not replay prior consumed financial ladders or repair old failures. Full ERP/release/customer acceptance remains open; encrypted backup/restore LAST.
