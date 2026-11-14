# UI/UX state and field coverage matrix

Apply this matrix to every selected business journey, including journeys without a dedicated UXW template yet. The48 templates sample high-risk intersections; they are not exhaustive screen/journey or accessibility coverage.

## Shared interaction states

| Surface | Required states and observations |
|---|---|
| Form | Empty/default, populated, edited, client refusal, server refusal, correction, pending, success, saved/reopened, stale source/settings, cancel/unsaved navigation |
| Picker/search | Empty query, exact/fuzzy/multiple/no matches, loading/error, selected, clear, A→B, late response, keyboard/touch, long text, catalogue vs historical source |
| List/table | First-use, no-match, load error, sorted/filtered/paginated, first/last row action, status variation, readonly/foreign scope, narrow/zoom and overflow |
| Dialog/help | Open/close/cancel/confirm, initial/contained/restored focus, Escape/outside policy, actionable busy state, hover/focus/touch and viewport edges |
| Feedback | Pending, conclusive refusal, conclusive success, uncertain outcome, readback, expiration/dismissal, reader announcement, conflicting concurrent work |
| Print/export/history | Draft/posted/partial/returned states, historical source/settings, currency/date/scope, totals/adjustments, attachment and permission preservation |

Not every state applies to every component. Record N/A with a reason; never force fake loading states onto static labels or claim an untested state passed.

## Field and business facts

| Field/control | Required selected boundaries |
|---|---|
| Party/source | Required/optional, clear/change, foreign/inactive where applicable, locked source identity, asynchronous stale response |
| Product/row identity | Physical/service/digital/rental/manual, same product split rows, removal/reorder, catalogue vs historical price, stable submitted indices |
| Quantity | Zero/negative/partial/exact remaining/over-remaining/fractional, duplicate aggregate quantities, readonly/exhausted source |
| Price/discount/tax | Blank/zero/precision, line/header sequencing, approved bounds, residual cents, tax-inclusive/exclusive and historical classification |
| Date/terms | Required/optional, issue/delivery/due distinction, typed vs picker, rerender, date-filter inclusivity, locale/timezone, locked periods |
| Notes/reference | Empty/long/Unicode, supplier-required/duplicate variants, server retention, source vs own reference, print/export escaping |
| Select/toggle | Actual saved value, rerender retention, dependency changes, native/custom keyboard semantics, disabled reason, opening restore |
| File | Approved type/size, invalid input, upload error/cancel, saved attachment, permission/history; storage layer required for lifecycle claims |

Use docs/workflows/FIELD_MATRIX.md for additional business decisions; UX values never supersede business constraints.

## Business overlay obligations

| Book | UX emphasis and related templates |
|---|---|
| Physical | Stock shortage/quantity/location/cost context, PO→GRN→bill progress, source-linked sales/purchase returns, POS/change; UXW-009–012,025–028 |
| Service | Quote/delivery/recognition distinction, draft continuity, collection vs credit/refund; UXW-005–008,029–030 |
| Digital | No misleading stock/delivery claims, source/catalogue price split, refund and entitlement support boundary; UXW-011,031–032 |
| Rental | Availability/reserved/out/dirty/repair/missing, dates/overlap, deposit vs revenue/refund; UXW-033–036 |
| Hybrid | Per-type consequences, shared discounts/tax, workspace/domain/module/role context; UXW-037–040 |
| Shared core | Inputs/errors/ambiguity, arithmetic/status/history, keyboard/reader and financial recovery; UXW-001–024 |
| Banking | Entry fast path, import preview/duplicates/errors, match differences, close/lock state; UXW-041–044 |
| Operations | Accessible onboarding, language conflicts, file lifecycle, authentic upgrade and archive last; UXW-045–048 |

Direct mappings are in canonical UX JSON. Every book also inherits shared UX obligations. Not all52 journeys have a dedicated UXW mapping; review actual changed scope and add stable templates for missing intersections before claiming coverage.

## Risk selection and remaining scope

Always include original reported repros, critical money/data/access edges, directly changed journeys and transitive shared consumers. For lower-risk cross-products, record pairwise selection and omissions; never use sampling to omit a known financial failure.

This publication does not add live adapters, all-screen automation, exhaustive RTL/localization, full assistive-technology/browser compatibility, load testing or all possible industry workflows. Unsupported themes/locales/features remain explicit. Coverage gaps are intake work with an owner and next action, not implied passes.

