# UI/UX acceptance and maintenance protocol —1.0.0

This supplements docs/workflows/PROTOCOL.md and AGENTS rules73–90. Owner2026-10-21 requests comprehensive QA and safe incremental adoption in the existing ERP. Maintenance is mandatory for humans and agents.

## Authority and compatibility

Applicable law/security/accounting policy and the canonical financial rulebook retain authority. WCAG2.2 A+AA is the adopted accessibility target, assessed by applicable success criteria, not by a weighted visual score. The existing BookOne design system governs appearance and established workflow conventions. These UX rules add observable interaction obligations. Community heuristics and optional improvements are labelled separately. A financial policy sentence in an old design guide cannot override the financial rulebook.

Resolve conflicts openly: identify conflicting texts, affected users/screens, current behaviour and risk; name an owner and next action in ux/design-inventory.json. Preserve current approved behaviour until reviewed, except a separately reviewed defect repair. Existing guide details such as list density/page size/product auto-add are not discarded merely because another kit prefers something else.

## Source provenance

Inspiration was reviewed, not installed or executed:
- https://github.com/plugin87/ux-ui-agent-skills/tree/55156b40e3a9aafa52448bde76cdcb5147b958db
- Its components/feedback.md, forms-advanced.md, overlays.md, content/voice-tone.md, accessibility/wcag-checklist.md and workflows/design-qa.md/design-review.md.
- W3C normative reference: https://www.w3.org/TR/2024/REC-WCAG22-20241212/
- Informative tooltip guidance: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ (page labels the pattern work in progress).

The wording here is BookOne-specific, independently adapted; no community scripts/tokens/assets were imported. Preserve MIT notices if substantial upstream text/code is copied later. Do not adopt native-select bans, blanket pixel/emoji bans, mandatory new typography, a toast for every click, or universal AAA requirements. Native controls remain valid where appropriate; existing catalogue-specific ProductAddSearch remains the product standard.

WCAG criteria include exceptions: contrast has text/control exceptions; target size24×24 permits specified alternatives/exceptions; reflow allows genuinely two-dimensional content such as tables. Do not require eliminating all table scrolling. WCAG financial error prevention permits appropriate reversible/checkable/confirmable approaches, not a blocking confirmation on every ordinary action. Tooltip essentials must remain available outside hover; routine status should not interrupt like an urgent alert. An automated scan is not full conformance.

## Lifecycle

Rules use stable UX-NNN IDs and revision; workflows use UXW-NNN and stable S-step identities. Never recycle IDs. Current schema intentionally accepts only draft/unbound/not-run definitions and independent-review-pending rules. Execution belongs in separate immutable runs. Supporting reviewed/retired/bound lifecycle states later requires a reviewed schema extension, valid adapter links and real review evidence. Do not falsify author/independent approval.

For every feature, bug, edge or discovered wrong expectation:
1. Inspect actual pinned diff, existing guide/components and rendered behaviour where needed. Determine direct screens and all consumers of changed shared primitives, plus business journeys, roles, settings and history.
2. Open WORKFLOW_CHANGE or EDGE_CASE; use RULE_CHANGE if financial policy changes. Identify UX rule/workflow IDs and WB journey/case links. New interaction goals get new IDs; changed expectations increment revisions.
3. Define independent before/after examples, preserved behaviour, support/prerequisites, exact expected/unchanged effects, required evidence and compatibility. An unknown broadens scope or blocks the dependent assertion.
4. Edit canonical UX JSON, update inventory/conflicts and increment companion version: patch editorial, minor additive compatible, major incompatible contract. Keep historical Git and first observations immutable.
5. Regenerate views and run ux:check/test:ux-workbook plus affected existing repository checks. Inspect semantics manually. Validate unchanged financial book definitions when mapping only.
6. Bind and execute fresh exact/adjacent cases; preserve original bugs and corrections. Shared changes require representative actual consumer coverage, not just a design-system showcase screenshot.
7. Publish sanitized change/run/handoff and update current pointers. Product developer links QA revision/hash in CHG and follows its existing QA contract. Reviewer independently assesses scope/results; release authority stays separate.

## Scope and severity

Do not attempt a Cartesian product. Cover critical money/data/access effects and known regressions explicitly; use documented pairwise sampling for remaining lower-risk combinations. UXW fixtures are templates: absent business policy, unsupported feature, isolated fault environment, authentic upgrade data or assistive-tech capability remains blocked/not-run/unsupported.

Classify by actual impact: critical loss/security/wrong money above cosmetic drift. Existing bug severity is preserved unless evidence supports a revision. Pure preferences are enhancements until adopted. A missing toast with clear durable success is not automatically a bug; a false success toast is a defect.

## Audit cadence

At session start inspect current pointers and applicable rules. Every relevant PR must provide impact/mapping review. Each candidate reassesses affected evidence. Weekly active-development triage reviews new edges, stale references, missing shared consumers and expiring exceptions; this is a working cadence, not an installed automation.

Audit IDs/links, authority, field/state coverage, independent arithmetic, keyboard/reader/touch/zoom states, actual feature support, history and unchanged state. Authoring green is not product green. Exceptions record affected rule/cases, owner, rationale, mitigation, expiry/review trigger and acceptance impact; never blanket-waive unresolved money/data/access failures.

