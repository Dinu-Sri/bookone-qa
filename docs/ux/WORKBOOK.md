# BookOne UI/UX acceptance workbook — 1.0.0

> GENERATED from ux/workbook.json. Edit the JSON and run pnpm ux:render. Every workflow remains draft, unbound and not-run. This is an additive companion to the eight business books, not another design system or proof of product compliance.

Source study: BookOne a4a6d65fa0f8ecc116b728b99d70e86f1b2b577f; QA base c7ed9c5cd31f28efac5be98a463bb96197890a46. Business library1.5.0 retains272 cases unchanged. Read [protocol](PROTOCOL.md), [design inventory](DESIGN_INVENTORY.md) and [execution](EXECUTION.md) first.

## Shared acceptance rules

| ID | Area | Rule | Basis |
|---|---|---|---|
| UX-001 | Feedback | Meaningful outcomes | product |
| UX-002 | Feedback | Safe pending lifecycle | product |
| UX-003 | Recovery | Ambiguous submission | bookone |
| UX-004 | Forms | Retain work after refusal | bookone |
| UX-005 | Forms | Actionable validation | wcag |
| UX-006 | Forms | Review financial actions | wcag |
| UX-007 | Forms | Draft continuity | bookone |
| UX-008 | Source | Atomic source changes | bookone |
| UX-009 | Source | Historical source facts | bookone |
| UX-010 | Money | Consistent financial representation | bookone |
| UX-011 | Money | State and scope clarity | bookone |
| UX-012 | Help | Accessible contextual help | wcag |
| UX-013 | Language | Labels and plain language | wcag |
| UX-014 | States | Distinguish empty and failed | heuristic |
| UX-015 | Lists | Search and filter integrity | product |
| UX-016 | Lists | Accessible list operations | product |
| UX-017 | Entry | Product entry continuity | product |
| UX-018 | Entry | Dates and numeric formats | bookone |
| UX-019 | Access | Keyboard complete workflows | wcag |
| UX-020 | Access | Names roles and states | wcag |
| UX-021 | Access | Accessible status announcements | wcag |
| UX-022 | Access | Contrast and non-colour cues | wcag |
| UX-023 | Access | Reflow zoom and text spacing | wcag |
| UX-024 | Access | Targets and unobscured focus | wcag |
| UX-025 | Access | Motion and time | mixed |
| UX-026 | Auth | Accessible sign-in | wcag |
| UX-027 | Scope | Tenant and role transitions | bookone |
| UX-028 | History | History and export continuity | bookone |
| UX-029 | Consistency | Extend existing visual language | product |
| UX-030 | Performance | Honest progress and responsive interaction | heuristic |
| UX-031 | Quality | Evidence over appearance | bookone |
| UX-032 | Maintenance | Maintain and audit continuously | bookone |

### UX-001 — Meaningful outcomes

Every meaningful write exposes pending and conclusive success/refusal; success identifies the resulting record or saved state and agrees with persisted readback.

Source: LIST_TABLE_UX_GUIDE.md §G; UX_REDESIGN_GUIDE_STATUS.md. Revision1; owner-requested default, independent review pending.

### UX-002 — Safe pending lifecycle

Use existing shared Button/useFormStatus or withFormPending; all paths clear pending. Search, GET filters and Cancel do not trigger a write overlay. A timeout clearing the overlay is not a failed transaction.

Source: AGENTS.md Form busy overlay. Revision1; owner-requested default, independent review pending.

### UX-003 — Ambiguous submission

When commit outcome is unknown, inspect persisted document/allocation/journal first; offer safe status recovery rather than unconditional retry. Repeated submission must not duplicate a business event.

Source: CORE.J06; QA_CHANGE_CONTRACT.md. Revision1; owner-requested default, independent review pending.

### UX-004 — Retain work after refusal

Client validation and server rejection preserve all recoverable submitted fields, line identifiers/order, dates, notes, tax, discounts and selections; correct only the offending field and submit once.

Source: AGENTS.md QA rule86; WB-CORE.J06.C07. Revision1; owner-requested default, independent review pending.

### UX-005 — Actionable validation

Name the invalid field/row, state the constraint and correction in text; associate errors with inputs; provide an accessible way to locate multiple errors without relying on colour.

Source: 3.3.1,3.3.2,3.3.3. Revision1; owner-requested default, independent review pending.

### UX-006 — Review financial actions

Financial submissions provide review/correction or a supported reversible mechanism appropriate to the action; destructive confirmations identify object/count/consequence and cancel without writes.

Source: 3.3.4; LIST_TABLE_UX_GUIDE.md §G. Revision1; owner-requested default, independent review pending.

### UX-007 — Draft continuity

Save/reopen/edit preserves stored draft facts and displayed arithmetic. Navigation or rerender must not silently reset typed dates/notes/discounts; unsaved-work handling must be explicit for the affected form.

Source: WB-CORE.J04; WB-CORE.J06. Revision1; owner-requested default, independent review pending.

### UX-008 — Atomic source changes

Changing source A→B replaces source party, ancestry, lines, prices, discounts, remaining quantities and totals coherently; late async responses cannot restore A over B. No mixing of unrelated source data.

Source: OBS-M18-PURCHASE-PICKER-STATE. Revision1; owner-requested default, independent review pending.

### UX-009 — Historical source facts

Linked return rows use source price/discount/tax and locked identity as required by the business contract, including added/split rows. Current catalogue settings must not silently replace historical facts.

Source: OBS-M18-SPLIT-RETURN-PRICE; WB-HYB.J02. Revision1; owner-requested default, independent review pending.

### UX-010 — Consistent financial representation

Visible line/header/tax/adjustment components reconcile to preview, stored document, print and journal. Labels distinguish gross, line-net, header discount, supply, VAT and total; residual adjustments stay explicit.

Source: WB-HYB.J02; canonical financial rulebook. Revision1; owner-requested default, independent review pending.

### UX-011 — State and scope clarity

Clearly distinguish draft/posted/partial/paid/returned/voided and current/as-of balances; display applicable company/domain/date/location/currency so operators can interpret the amount.

Source: WB-CORE.J03; WB-HYB.J04. Revision1; owner-requested default, independent review pending.

### UX-012 — Accessible contextual help

Explain unfamiliar business terms and consequences. Essential instructions and errors remain available outside tooltips; help is reachable by keyboard/touch. Hover/focus content is dismissible, hoverable and persistent as applicable.

Source: 1.4.13; APG tooltip guidance is informative. Revision1; owner-requested default, independent review pending.

### UX-013 — Labels and plain language

Use persistent descriptive labels and outcome-specific actions; placeholders do not replace labels. Keep existing approved entity-specific language; explain technical/accounting terms when needed.

Source: 2.4.6,3.3.2; SIMPLE_ENTRY_UX_REDESIGN.md. Revision1; owner-requested default, independent review pending.

### UX-014 — Distinguish empty and failed

Differentiate first-use empty, no matches, permission limitation, loading and load error; provide appropriate next action and do not disguise an error as no records.

Source: components/feedback.md. Revision1; owner-requested default, independent review pending.

### UX-015 — Search and filter integrity

Preserve existing list guide: search includes number/name or SKU; date filter boundaries and selected scope are visible; changing search/date/sort resets invalid pagination and never mutates business data.

Source: LIST_TABLE_UX_GUIDE.md §B–F. Revision1; owner-requested default, independent review pending.

### UX-016 — Accessible list operations

Actions resolve the intended row on every page; portals remain visible inside viewport; sort state, count and pagination are understandable; keyboard users can operate row actions.

Source: LIST_TABLE_UX_GUIDE.md §D–F. Revision1; owner-requested default, independent review pending.

### UX-017 — Product entry continuity

Keep ProductAddSearch and existing catalogue-specific behaviour; preserve focus, committed rows, detail expansion and unique line identities. Exact/debounced auto-add must not create duplicates or discard inputs.

Source: LIST_TABLE_UX_GUIDE.md §H. Revision1; owner-requested default, independent review pending.

### UX-018 — Dates and numeric formats

Typed and picker input, rerender, save and reload preserve the same date/value under declared locale/timezone. Show units/currency and unambiguous formats; rounding follows the financial oracle.

Source: WB-CORE.J07; FIELD_MATRIX.md. Revision1; owner-requested default, independent review pending.

### UX-019 — Keyboard complete workflows

All required actions operate by keyboard with logical order and visible focus; there is no keyboard trap. Modal containment is intentional and dismissal restores a sensible focus position.

Source: 2.1.1,2.1.2,2.4.3,2.4.7. Revision1; owner-requested default, independent review pending.

### UX-020 — Names roles and states

Controls expose correct accessible name, role and dynamic state. Icon-only actions have meaningful names; form labels are associated; tables preserve relationships and headers.

Source: 1.3.1,4.1.2,2.5.3. Revision1; owner-requested default, independent review pending.

### UX-021 — Accessible status announcements

Status messages are programmatically available without unnecessary focus movement. Use polite status for routine feedback; reserve interruption for urgent conditions and avoid duplicate announcements.

Source: 4.1.3. Revision1; owner-requested default, independent review pending.

### UX-022 — Contrast and non-colour cues

Meet WCAG AA contrast for applicable text/control states, account for disabled/decorative exceptions, and convey errors/status/selection beyond colour alone.

Source: 1.4.1,1.4.3,1.4.11. Revision1; owner-requested default, independent review pending.

### UX-023 — Reflow zoom and text spacing

At 320 CSS px equivalent width and 200% text enlargement, core content/actions remain usable; spacing overrides do not lose content. Genuine two-dimensional tables may scroll within an accessible region.

Source: 1.4.4,1.4.10,1.4.12. Revision1; owner-requested default, independent review pending.

### UX-024 — Targets and unobscured focus

Meet WCAG2.2 AA 24×24 CSS pixel target or valid spacing/other exception; use existing larger targets where present. Focused controls must not be entirely obscured by sticky UI.

Source: 2.5.8,2.4.11. Revision1; owner-requested default, independent review pending.

### UX-025 — Motion and time

Avoid harmful flashing; preserve meaningful content under reduced motion. Bind timeout/warning/extension requirements where applicable; do not auto-dismiss information the user must act on.

Source: 2.2.1,2.2.2,2.3.1; reduced-motion is a product enhancement unless a specific criterion applies. Revision1; owner-requested default, independent review pending.

### UX-026 — Accessible sign-in

Allow password managers and paste; provide compliant alternatives/assistance for cognitive authentication tests and redundant entry. No automatic credential or legal-agreement handling is granted by this workbook.

Source: 3.3.7,3.3.8. Revision1; owner-requested default, independent review pending.

### UX-027 — Tenant and role transitions

Verify actor/tenant/domain on switch, navigation and saved readback. UI availability matches capabilities; concealment alone does not prove server denial. Never expose foreign data in feedback/help/export.

Source: WB-CORE.J05; WB-HYB.J04. Revision1; owner-requested default, independent review pending.

### UX-028 — History and export continuity

UX changes preserve source ancestry, historical prices/tax/dates, issued print/export content, attachments and audit attribution. New layout alone must not rewrite saved documents.

Source: WB-CORE.J04; WB-OPS. Revision1; owner-requested default, independent review pending.

### UX-029 — Extend existing visual language

Reuse BookOne CSS variables/classes, shared components and relevant existing guide. Extend a shared primitive compatibly when required; document narrow exceptions. Do not import an alternate palette/framework/reset.

Source: globals.css; bookone-ui.tsx; design-system/page.tsx. Revision1; owner-requested default, independent review pending.

### UX-030 — Honest progress and responsive interaction

Provide timely visible feedback for slow tasks; inputs/cancel/scope remain usable as appropriate. Measure task timings against a declared device/network budget; no invented universal response-time release threshold.

Source: components/feedback.md; workflows/design-qa.md. Revision1; owner-requested default, independent review pending.

### UX-031 — Evidence over appearance

Rendered interaction and persisted business effects are required for claimed workflow passes. Screenshots, axe scans, source lint and subjective design scores each have limited scope; missing layers remain explicit.

Source: QA_CHANGE_CONTRACT.md; PROTOCOL.md. Revision1; owner-requested default, independent review pending.

### UX-032 — Maintain and audit continuously

Every UI feature/defect/shared dependency change triggers direct/dependent rule/workflow mapping, versioning, original evidence preservation and exact/adjacent regression review. Exceptions name owner, rationale, mitigation, expiry and retest.

Source: AGENTS.md rules73–81; owner2026-10-21. Revision1; owner-requested default, independent review pending.

## Workflow index

| ID | Group | Workflow |
|---|---|---|
| UXW-001 | shared | Meaningful save feedback |
| UXW-002 | shared | Conclusive refusal then correction |
| UXW-003 | shared | Slow and ambiguous success |
| UXW-004 | shared | Busy cleanup on read-only paths |
| UXW-005 | forms | Client error retains all fields |
| UXW-006 | forms | Discount draft hydration |
| UXW-007 | forms | Unsaved navigation and cancellation |
| UXW-008 | forms | Dates and precision |
| UXW-009 | source | Purchase picker empty to source |
| UXW-010 | source | Source A to B and late response |
| UXW-011 | source | Split return source price |
| UXW-012 | source | Residual and historical tax display |
| UXW-013 | lists | Search by number and name |
| UXW-014 | lists | Sort date filter and pagination |
| UXW-015 | lists | First and last row actions |
| UXW-016 | lists | Catalogue and manual entry |
| UXW-017 | accessibility | Keyboard complete invoice draft |
| UXW-018 | accessibility | Dialog menu and focus restoration |
| UXW-019 | accessibility | Screen reader feedback and errors |
| UXW-020 | accessibility | Sign-in password manager and errors |
| UXW-021 | responsive | Narrow invoice and long content |
| UXW-022 | responsive | Zoom text spacing and sticky bars |
| UXW-023 | responsive | Contrast states and target exceptions |
| UXW-024 | responsive | Reduced motion and slow loading |
| UXW-025 | physical | PO GRN bill progress and source links |
| UXW-026 | physical | Physical stock refusal recovery |
| UXW-027 | physical | Sale collection and credit status |
| UXW-028 | physical | POS change and repeated action |
| UXW-029 | service-digital | Service quote conversion continuity |
| UXW-030 | service-digital | Service partial payment and refund clarity |
| UXW-031 | service-digital | Digital delivery support boundary |
| UXW-032 | service-digital | Historical digital price and refund |
| UXW-033 | rental | Reservation availability and conflict |
| UXW-034 | rental | Dispatch partial return and buckets |
| UXW-035 | rental | Deposit charge and refund review |
| UXW-036 | rental | Extend cancel and legacy job history |
| UXW-037 | hybrid | Mixed product type explanation |
| UXW-038 | hybrid | Workspace switch and stale form |
| UXW-039 | hybrid | Viewer and capability changes |
| UXW-040 | hybrid | Module off with historical access |
| UXW-041 | bank | Simple Entry fast path and focus |
| UXW-042 | bank | Statement import preview correction |
| UXW-043 | bank | Group match and unmatched difference |
| UXW-044 | bank | Reconciliation close and lock feedback |
| UXW-045 | operations | Entity onboarding and existing language |
| UXW-046 | operations | Attachment upload failure and cancellation |
| UXW-047 | operations | Upgrade shared component and print history |
| UXW-048 | operations | Archive progress and recovery last |

### UXW-001 — Meaningful save feedback

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06. Rules: UX-001, UX-002, UX-021, UX-031, UX-032.

**Given:** A run-owned draft with unique note QA-UX-SAVE; actual actor/settings verified.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Save once
2. observe pending and result
3. reload list/detail.

**Expected:** One saved draft with the exact note; notification/status agrees with readback; no posted journal or stock change.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-002 — Conclusive refusal then correction

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06. Rules: UX-002, UX-004, UX-005, UX-032.

**Given:** Bill fixture with required supplier reference enabled; all dates/notes/lines captured.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Submit blank reference
2. compare every field
3. change only reference
4. submit once.

**Expected:** First refusal creates no bill/journal; all fields retained; corrected attempt creates exactly one bill with original facts.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-003 — Slow and ambiguous success

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06. Rules: UX-002, UX-003, UX-030, UX-032.

**Given:** Isolated controlled response-delay fixture; known commit/readback oracle; no shared-staging fault injection.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Submit once
2. withhold response after commit
3. inspect saved document/journal without replay.

**Expected:** Pending feedback is honest; outcome becomes known by readback; exactly one event; no false rollback or unconditional retry.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, isolated-fault.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-004 — Busy cleanup on read-only paths

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06. Rules: UX-002, UX-019, UX-032.

**Given:** Existing GET-filtered list, navigation/back and cancelled form.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Search/filter
2. Cancel
3. navigate same pathname with new query
4. operate next control.

**Expected:** No write overlay for GET/Cancel; next control usable; no business writes; existing1.5s/45s behaviour is not redefined.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-005 — Client error retains all fields

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04, WB-CORE.J06. Rules: UX-004, UX-005, UX-007, UX-018, UX-032.

**Given:** Run-owned quote with issue2026-10-18/due2026-10-26, unique notes, two lines and invalid150% discount.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Capture submitted field map
2. submit
3. correct only150% to0
4. save/reopen.

**Expected:** Clear discount error; dates/notes/line order retained through rerender; saved expected total independently calculated; no posting.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-006 — Discount draft hydration

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04, WB-CORE.J06. Rules: UX-007, UX-010, UX-018, UX-032.

**Given:** Digital/service source3×100, line10%, header5%, no VAT; independent total256.50.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Save draft
2. reopen edit
3. trigger unrelated rerender
4. compare preview and persisted values.

**Expected:** Line-net270, header13.50,total256.50 in view/edit; no silent286.50 recomputation; no posting during reopen.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-007 — Unsaved navigation and cancellation

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04, WB-CORE.J06. Rules: UX-006, UX-007, UX-032.

**Given:** Run-owned unsaved form with unique changes; bind existing approved per-form navigation policy before execution.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Edit
2. Back/Cancel/close as supported
3. review warning/draft mechanism
4. reopen source.

**Expected:** No silent claimed save; approved discard/draft behaviour is explicit; cancellation posts nothing; existing saved version unchanged.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-008 — Dates and precision

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04, WB-CORE.J06. Rules: UX-005, UX-018, UX-032.

**Given:** Bound locale/timezone; typed and picker date paths; quantity0.5 and price1.25 if supported.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Set dates/quantity/price
2. rerender
3. submit/reload
4. compare raw saved facts and display.

**Expected:** No day/month swap or timezone drift; supported precision retained; rejected precision explains constraint and retains remaining inputs.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-009 — Purchase picker empty to source

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J02, WB-PHY.J06. Rules: UX-008, UX-009, UX-010, UX-032.

**Given:** Fresh own bill3×60, unreturned, vendorA; generic New purchase return route.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Find bill
2. select source
3. inspect loaded metadata/lines without reload
4. preview qty1.

**Expected:** Lines appear with vendorA/source ancestry, qty3 remaining, locked source price60; qty1preview60; no posting by selection. Preserve OBS-M18-PURCHASE-PICKER-STATE.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-010 — Source A to B and late response

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J02, WB-PHY.J06. Rules: UX-008, UX-027, UX-032.

**Given:** Two own bills different vendors/quantities/prices; controlled slow response in isolated fixture for race branch.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. SelectA
2. selectB beforeA resolves
3. clear/reselect
4. inspect all source-bound fields.

**Expected:** OnlyB facts persist after lateA response; cleared source removes stale state; no mixed party/lines or financial writes.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, isolated-fault.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-011 — Split return source price

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J02, WB-PHY.J06. Rules: UX-008, UX-009, UX-010, UX-032.

**Given:** Fresh digital invoice3×100; catalogueprice10; no tax/discount.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Start linked return
2. add same source item twice
3. set1+1+1
4. inspect locks/row sums/footer; stop if inconsistent.

**Expected:** Every row sourceprice100 readonly; rows sum300=footer300; invalid2+2 refuses with retained fields/no credit. Preserve OBS-M18-SPLIT-RETURN-PRICE.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-012 — Residual and historical tax display

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J02, WB-PHY.J06. Rules: UX-009, UX-010, UX-028, UX-032.

**Given:** Separate sources7×1/header.05 and3×100/line10%/header5%/VAT18%; reviewed historical tax profile.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Prepare separate reviewed ladder and historical-VAT fixtures; capture openings.
2. Preview and post each permitted qty1 credit in the ladder, with persisted readback after every submission.
3. Change current VAT setting only in the owned fixture, then preview and post the historical full return if coherent.
4. Reconcile credits, remaining balances and tax; restore and reload settings.

**Expected:** Ladder .99×5,1,1 closes6.95; historical taxable fullcredit302.67 withVAT46.17; explicit adjustment where required; settings restored; no expectation changes.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, reports.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-013 — Search by number and name

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04. Rules: UX-014, UX-015, UX-032.

**Given:** At least12 run-owned synthetic records, one long name, unique document number.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Search number
2. party/name/SKU
3. unmatched query
4. clear.

**Expected:** Correct records, distinct no-match message and clear action; filters visible; original records/counts unchanged.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-014 — Sort date filter and pagination

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04. Rules: UX-015, UX-016, UX-018, UX-032.

**Given:** More than10 own records across exact date boundaries; dates and amounts independently sorted.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Go page2
2. apply search/date/sort
3. inspect reset
4. test inclusive start/end.

**Expected:** Page reset prevents false empty page; header state/count match results; issue-date filter correct; no writes.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-015 — First and last row actions

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04. Rules: UX-006, UX-016, UX-019, UX-024, UX-032.

**Given:** List spanning two pages with draft,posted,converted and exhausted documents.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Open first/last page Actions with pointer/keyboard
2. View
3. cancel an allowed destructive confirmation.

**Expected:** Correct row targeted; menus visible/operable and close sensibly; no blank menu or clipped action; posted delete unavailable/denied; cancellation has zero effects.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-016 — Catalogue and manual entry

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J04. Rules: UX-007, UX-017, UX-032.

**Given:** Existing ProductAddSearch with exactSKU, fuzzy match, multiple matches and no match.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Use each search mode
2. expand details while query remains
3. add/remove/reorder supported lines
4. save draft.

**Expected:** Expected auto-add occurs once, focus retained, expansion stable; Manual line remains explicit and no catalogue product is silently created; stable submitted row identities.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-017 — Keyboard complete invoice draft

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-OPS.J01. Rules: UX-005, UX-019, UX-020, UX-032.

**Given:** Authorized own actor; two products; empty invoice form.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Keyboard only: choose party
2. add lines
3. dates
4. invalid submit/correct
5. Save
6. reopen.

**Expected:** Every action reachable, logical visible focus, labels/states correct; no traps; exact saved draft facts/no posting.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-018 — Dialog menu and focus restoration

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-OPS.J01. Rules: UX-006, UX-012, UX-019, UX-020, UX-032.

**Given:** Existing ConfirmDialog, row menu, StatusHelp on representative affected screens.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Open via keyboard
2. traverse
3. Escape/cancel
4. reopen
5. test pointer/touch help.

**Expected:** Modal contains focus while open and restores trigger; menu nonmodal semantics appropriate; help accessible and not covering essential instructions; cancellation writes nothing.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, screen-reader.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-019 — Screen reader feedback and errors

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-OPS.J01. Rules: UX-001, UX-005, UX-020, UX-021, UX-032.

**Given:** Bound screen reader/browser versions, saved draft and invalid form fixtures.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Read labels/table relationships
2. invalid submit
3. correct
4. save; listen to resulting status.

**Expected:** Correct name/role/state and associated error; outcome announced once without unnecessary focus theft; no success before persisted save.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, screen-reader, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-020 — Sign-in password manager and errors

Revision1; P1; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-OPS.J01. Rules: UX-005, UX-020, UX-026, UX-032.

**Given:** Existing private QA credentials; separate clean login session; no real credentials in reports.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Use paste/password manager
2. invalid credential attempt
3. correct sign-in
4. verify actor.

**Expected:** Labels/errors accessible; paste not blocked; no unjustified cognitive test; successful actor/tenant explicitly verified; no secrets exposed.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, screen-reader.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-021 — Narrow invoice and long content

Revision1; P2; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-CORE.J04. Rules: UX-016, UX-023, UX-024, UX-032.

**Given:** Viewport320 and390CSSpx; long synthetic party/SKU/description; supported desktop baseline.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Create/reopen draft
2. inspect lines/totals/actions
3. open search/menu near edges.

**Expected:** No lost content/action or pagewide clipping; genuine table scroll remains operable; row amounts/labels readable; saved facts unchanged.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-022 — Zoom text spacing and sticky bars

Revision1; P2; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-CORE.J04. Rules: UX-019, UX-023, UX-024, UX-032.

**Given:** Desktop1280 baseline; 200%text and400%zoom equivalent320CSSpx; WCAG text-spacing override.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Apply each mode
2. keyboard through fields and footer
3. inspect validation and dialog.

**Expected:** Content/actions usable; focused item not entirely obscured; no overlapping labels or inaccessible controls; table exception documented.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-023 — Contrast states and target exceptions

Revision1; P2; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-CORE.J04. Rules: UX-020, UX-022, UX-024, UX-029, UX-032.

**Given:** Existing light theme only unless another theme is actually supported; representative default/error/focus/selected controls.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Measure rendered text/control contrasts
2. inspect noncolour cues
3. measure target/spacing exceptions.

**Expected:** Applicable AA ratios and target rules met with evidence; no replacement palette; any correction scoped to existing tokens/affected states.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, measurement.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-024 — Reduced motion and slow loading

Revision1; P2; draft/unbound/not-run. Business journeys: WB-CORE.J06, WB-CORE.J04. Rules: UX-014, UX-025, UX-030, UX-032.

**Given:** OS reduced motion; controlled slow fixture and declared device/network budget.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Load list/form
2. inspect static/progress feedback
3. resolve or fail
4. continue.

**Expected:** Useful content remains without animation; no indefinite skeleton or misleading empty state; measured timing and any failed budget recorded; no invented performance pass.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, measurement, isolated-fault.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-025 — PO GRN bill progress and source links

Revision1; P1; draft/unbound/not-run. Business journeys: WB-PHY.J02, WB-PHY.J03, WB-PHY.J05, WB-PHY.J10. Rules: UX-001, UX-008, UX-010, UX-011, UX-028, UX-032.

**Given:** Fresh physical PO5×60; inventory0; bind approval, GRNI and supplier-reference settings. Receive2 then3.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Receive2
2. receive3
3. bill each GRN with distinct references
4. reopen progress and ledgers

**Expected:** Received5 and billed5,total300. No receive6 affordance. Inventory300 and GRNI0 after billing; source chain visible; no double stock; restore settings.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-026 — Physical stock refusal recovery

Revision1; P1; draft/unbound/not-run. Business journeys: WB-PHY.J02, WB-PHY.J03, WB-PHY.J05, WB-PHY.J10. Rules: UX-002, UX-004, UX-005, UX-011, UX-032.

**Given:** Negative stock forbidden; item available4; invoice quantity5 at agreed price/cost; capture all form fields.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Submit5
2. compare retained fields
3. correct quantity to4 only if posting is authorized
4. inspect exact effects

**Expected:** Explain shortage1. Refusal creates no journal/stock movement and clears busy. Corrected valid action posts once under the independent business oracle.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-027 — Sale collection and credit status

Revision1; P1; draft/unbound/not-run. Business journeys: WB-PHY.J02, WB-PHY.J03, WB-PHY.J05, WB-PHY.J10. Rules: UX-001, UX-010, UX-011, UX-028, UX-032.

**Given:** Own physical invoice100, uncollected; bind tender, account, payment date and credit quantity/cost.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Collect40 once
2. inspect balance60
3. issue reviewed credit20
4. reload list/detail/receipt/report

**Expected:** Status and balance agree across surfaces; AR40 remains after credit. Quantity/cost effects follow the business case; never replay payment to recover a receipt.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock, reports.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-028 — POS change and repeated action

Revision1; P1; draft/unbound/not-run. Business journeys: WB-PHY.J02, WB-PHY.J03, WB-PHY.J05, WB-PHY.J10. Rules: UX-002, UX-003, UX-010, UX-019, UX-032.

**Given:** Isolated POS cash fixture; sale80,tender100; bind stock, cost and shift opening.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Review cart
2. enter tender100
3. submit once and a bounded rapid repeat
4. inspect receipt/shift/stock

**Expected:** Change20 displayed; exactly one sale80 and net cash80; no duplicate stock/COGS. Keyboard works; recover failed print using read-only navigation.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-029 — Service quote conversion continuity

Revision1; P1; draft/unbound/not-run. Business journeys: WB-SVC.J01, WB-SVC.J02, WB-DIG.J01, WB-DIG.J02. Rules: UX-007, UX-008, UX-010, UX-018, UX-032.

**Given:** Quote3×100, line10%, header5%; notes and distinct dates; bind delivered-service recognition contract.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Save/reopen
2. convert to invoice
3. review before posting
4. save/post only if authorized

**Expected:** Source facts and ancestry retained; total256.50 withoutVAT; no stock change. Posting occurs only at the approved recognition point.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-030 — Service partial payment and refund clarity

Revision1; P1; draft/unbound/not-run. Business journeys: WB-SVC.J01, WB-SVC.J02, WB-DIG.J01, WB-DIG.J02. Rules: UX-006, UX-010, UX-011, UX-032.

**Given:** Service invoice200,payment80; reviewed credit/refund fixtures and permitted reversal flow.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Inspect partial status
2. review credit/refund consequence
3. cancel
4. execute only the planned supported action

**Expected:** Cancel creates no journal. Credit and cash refund are clearly distinguished. Final AR/cash match the independent ledger; credit alone never implies a cash refund.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, reports.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-031 — Digital delivery support boundary

Revision1; P1; draft/unbound/not-run. Business journeys: WB-SVC.J01, WB-SVC.J02, WB-DIG.J01, WB-DIG.J02. Rules: UX-011, UX-013, UX-014, UX-028, UX-032.

**Given:** Digital sale with the actual supported delivery/licence contract identified, or explicit unavailable support.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Inspect sale/entitlement status
2. follow delivery action if supported
3. reload history

**Expected:** Posted/paid does not falsely imply delivered. Unsupported licence/download scope stays unsupported/blocked. No physical inventory movement or invented delivery pass.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, stock.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-032 — Historical digital price and refund

Revision1; P1; draft/unbound/not-run. Business journeys: WB-SVC.J01, WB-SVC.J02, WB-DIG.J01, WB-DIG.J02. Rules: UX-009, UX-010, UX-028, UX-032.

**Given:** Digital invoice2×100,current catalogue price10; no tax/discount; return1.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Open linked return
2. verify source unit price100
3. post only if coherent
4. reload credit/source/print

**Expected:** Credit100 and source balance100; original invoice200 unchanged; no stock/COGS. Every displayed amount reconciles.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-033 — Reservation availability and conflict

Revision1; P1; draft/unbound/not-run. Business journeys: WB-REN.J01, WB-REN.J02, WB-REN.J03, WB-REN.J04, WB-REN.J06. Rules: UX-005, UX-008, UX-011, UX-032.

**Given:** Fleet5 available,jobA reserves3; bind supported overlap/date policy.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Inspect same-period availability
2. jobB requests3
3. correct to2 if authorized

**Expected:** Availability2 and shortage1 understandable. Refusal creates no reservation; valid2 makes total reserved5. Dates/party retained.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, fleet.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-034 — Dispatch partial return and buckets

Revision1; P1; draft/unbound/not-run. Business journeys: WB-REN.J01, WB-REN.J02, WB-REN.J03, WB-REN.J04, WB-REN.J06. Rules: UX-001, UX-010, UX-011, UX-028, UX-032.

**Given:** Job dispatch3; capture available/dirty/out/repair/missing buckets; bind return/wash policy.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Dispatch3
2. return1 as dirty
3. inspect job/list/buckets
4. clean only through supported wash

**Expected:** Out2 and dirty1 after partial return; no premature availability1. Fleet total conserved; source/history visible; do not invent rental revenue.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, fleet, journal.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-035 — Deposit charge and refund review

Revision1; P1; draft/unbound/not-run. Business journeys: WB-REN.J01, WB-REN.J02, WB-REN.J03, WB-REN.J04, WB-REN.J06. Rules: UX-006, UX-010, UX-011, UX-032.

**Given:** Refundable deposit200,approved charge50; explicitly bind policy, accounting and capabilities.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Review deposit and proposed charge
2. cancel
3. apply/refund only in approved sequence

**Expected:** Deposit remains distinct from revenue. Refund150 only after charge50 under approved contract. Cancellation has no journal; transaction, receipt and journal agree.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, reports.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-036 — Extend cancel and legacy job history

Revision1; P1; draft/unbound/not-run. Business journeys: WB-REN.J01, WB-REN.J02, WB-REN.J03, WB-REN.J04, WB-REN.J06. Rules: UX-006, UX-007, UX-011, UX-028, UX-032.

**Given:** Own active job plus overlapping reservation; historical photos/source; bind capability and policy.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Review extension conflict
2. cancel proposal
3. reopen old job/photos/print

**Expected:** No silent overlap or price rewrite; cancellation consequences explicit. Cancelling leaves original dates/fleet/deposit unchanged; missing support remains blocked.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, fleet.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-037 — Mixed product type explanation

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J01, WB-HYB.J02, WB-HYB.J03, WB-HYB.J04, WB-CORE.J05. Rules: UX-009, UX-010, UX-011, UX-013, UX-032.

**Given:** Physical300 cost180,service200,digital100; rental only if recognition approved; capture stock/fleet.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Review line types and taxes
2. save/post under mapped business contract
3. inspect source and reports

**Expected:** Only physical lines affect physical stock/COGS; rental effects separately approved. No misleading message that all lines move stock.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, stock, fleet.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-038 — Workspace switch and stale form

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J01, WB-HYB.J02, WB-HYB.J03, WB-HYB.J04, WB-CORE.J05. Rules: UX-007, UX-011, UX-027, UX-032.

**Given:** Two authorized synthetic companies/domains with distinct names; private IDs; stale unsaved form.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Open companyA form
2. switch toB through supported path
3. inspect heading/options
4. attempt safe draft action

**Expected:** NoA data presented asB or cross-tenant write. Preserve/discard policy explicit; verify actor/company again. Server scope tested separately.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, authorization.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-039 — Viewer and capability changes

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J01, WB-HYB.J02, WB-HYB.J03, WB-HYB.J04, WB-CORE.J05. Rules: UX-011, UX-014, UX-027, UX-032.

**Given:** Fresh Owner positive and reviewed Viewer/foreign-record fixtures; use existing grants only.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Open same record/action per role
2. inspect unavailable capability
3. execute authorized denial probe

**Expected:** Useful access message without foreign data. Owner positive works; Viewer server denial creates zero journals/stock. A hidden button alone is insufficient.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, authorization, journal.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-040 — Module off with historical access

Revision1; P1; draft/unbound/not-run. Business journeys: WB-HYB.J01, WB-HYB.J02, WB-HYB.J03, WB-HYB.J04, WB-CORE.J05. Rules: UX-011, UX-027, UX-028, UX-032.

**Given:** Historical own document; capture opening module flag; bind approved settings transition.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Disable module
2. inspect navigation/create/history/print
3. restore and reload

**Expected:** New unsupported operation unavailable; authorized historical reads preserved per business contract. No history loss or inference of server permission from a UI flag.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, authorization.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-041 — Simple Entry fast path and focus

Revision1; P1; draft/unbound/not-run. Business journeys: WB-BANK.J01, WB-BANK.J02, WB-BANK.J03, WB-BANK.J04, WB-BANK.J05. Rules: UX-001, UX-007, UX-013, UX-019, UX-032.

**Given:** Own bank opening1000,expense25,approved category; receipt optional.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Keyboard through party/amount/description
2. review category
3. save once
4. inspect row/focus/journal

**Expected:** Exactly one expense25 and bank975. Confirmation agrees with row; focus ready for next entry. Clear form only after confirmed success; preserve business language.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** keyboard, browser, persisted, journal.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-042 — Statement import preview correction

Revision1; P1; draft/unbound/not-run. Business journeys: WB-BANK.J01, WB-BANK.J02, WB-BANK.J03, WB-BANK.J04, WB-BANK.J05. Rules: UX-004, UX-005, UX-010, UX-014, UX-032.

**Given:** Synthetic portable CSV with duplicate/invalid date and known balances; isolated import.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Upload
2. map/preview
3. encounter invalid row
4. correct mapping
5. cancel or execute reviewed batch

**Expected:** Per-row errors and mapping retained; matched/imported/pending counts honest. Cancel creates no journal. No real statement or raw data in public evidence.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-043 — Group match and unmatched difference

Revision1; P1; draft/unbound/not-run. Business journeys: WB-BANK.J01, WB-BANK.J02, WB-BANK.J03, WB-BANK.J04, WB-BANK.J05. Rules: UX-006, UX-010, UX-011, UX-032.

**Given:** Synthetic bank row100 and eligible entries40+60; separate unmatched fee5; bind policy.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Select40+60
2. review difference0
3. cancel
4. match once if authorized
5. reopen

**Expected:** Selected sum100,difference0. Cancel changes nothing; accepted match occurs once. Fee5 stays explicit until a supported approved posting.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, reports.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-044 — Reconciliation close and lock feedback

Revision1; P1; draft/unbound/not-run. Business journeys: WB-BANK.J01, WB-BANK.J02, WB-BANK.J03, WB-BANK.J04, WB-BANK.J05. Rules: UX-005, UX-006, UX-011, UX-028, UX-032.

**Given:** Reviewed statement and book balances; unresolved item; period lock in owned company.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Attempt close with unresolved difference
2. inspect reason
3. review approved resolution
4. reopen current/history

**Expected:** No false balanced/closed claim; explain exact difference. Lock refusal retains input and creates no journal; historical close stable; never invent balancing journals.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, reports.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-045 — Entity onboarding and existing language

Revision1; P1; draft/unbound/not-run. Business journeys: WB-OPS.J01, WB-OPS.J02, WB-OPS.J03, WB-OPS.J04, WB-OPS.J05. Rules: UX-011, UX-013, UX-026, UX-027, UX-029, UX-032.

**Given:** New synthetic account/company only if authorized by mission; capture entity/language preferences.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Choose entity
2. confirm actual Owner/modules/shell
3. toggle existing language option
4. reload

**Expected:** Correct shell/capabilities; language follows existing approved behaviour. UXQ-001 remains pending; no invented first-operation pass.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, authorization.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-046 — Attachment upload failure and cancellation

Revision1; P1; draft/unbound/not-run. Business journeys: WB-OPS.J01, WB-OPS.J02, WB-OPS.J03, WB-OPS.J04, WB-OPS.J05. Rules: UX-004, UX-005, UX-014, UX-028, UX-032.

**Given:** Synthetic image/file within reviewed limits plus unsupported type; private storage.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Attach valid file
2. reject invalid file
3. remove cancelled attachment
4. reopen record

**Expected:** Explain type/limit error; retain form. Storage evidence required for orphan claims; preserve existing attachment history and permissions.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, storage.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-047 — Upgrade shared component and print history

Revision1; P1; draft/unbound/not-run. Business journeys: WB-OPS.J01, WB-OPS.J02, WB-OPS.J03, WB-OPS.J04, WB-OPS.J05. Rules: UX-007, UX-010, UX-028, UX-029, UX-031, UX-032.

**Given:** Isolated authentic prior-release app/DB fixture, old posted/draft/print snapshots and new candidate; absent fixture blocks.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Upgrade through approved process
2. reopen old facts
3. exercise changed shared component and consumers
4. compare new draft

**Expected:** Historical facts unchanged; compatible source/financial display; existing visual language retained. No forged legacy state or blindly approved screenshot.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, journal, upgrade.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

### UXW-048 — Archive progress and recovery last

Revision1; P1; draft/unbound/not-run. Business journeys: WB-OPS.J01, WB-OPS.J02, WB-OPS.J03, WB-OPS.J04, WB-OPS.J05. Rules: UX-003, UX-006, UX-011, UX-028, UX-031, UX-032.

**Given:** Authorized isolated encrypted archive fixture after all non-backup work; reviewed storage/restore contract.

**Preflight:** Bind the common execution contract and this fixture at exact candidate/actor/configuration; resolve unknown policy and layer prerequisites before any mutation.

1. Review scope/consequences
2. cancel first
3. export/restore only in isolated mission
4. reconcile

**Expected:** Cancellation changes nothing; progress truthful. Success requires actual restored readback/reconciliation. Never overwrite an active company; unavailable restore environment blocks. Backup LAST.

**Unchanged:** Compare captured non-target documents, settings, actor/tenant and applicable GL/AR/AP/stock/fleet/deposit snapshots. Read-only/cancel/refusal steps create no prohibited business effects; successful writes change only the independently planned records and ledgers.

**Required layers:** browser, persisted, storage, recovery.

**Failure handling:** Checkpoint intent and immediate result; preserve first discrepancy and field map; do not post an inconsistent preview or replay an uncertain financial action; continue only independent safe cases.

**Close:** Retain source/failed fixtures and evidence; restore any changed opening settings and reconcile actual writes; no deletion/reset/writeoff to clean the run.

