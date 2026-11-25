# Safe incremental UI/UX adoption for an existing BookOne ERP

The product already has a visual system. Extend docs/LIST_TABLE_UX_GUIDE.md, existing Simple Entry/entity guides, shared components and globals.css. Product counterpart: docs/UI_UX_CHANGE_GUIDE.md. Canonical QA rules/workflows remain external; do not create a second editable UX scenario catalogue in product.

## Required implementation method

1. Read product AGENTS, QA_CHANGE_CONTRACT and this companion at a recorded QA SHA; inspect actual current component tree/styles and relevant screen guide. Graph discovery is useful when available/current; otherwise document unavailable/stale graph and inspect pinned files. Never assume AGENTS framework prose proves actual styling.
2. Before coding, record existing screenshots for affected screen/states at desktop and narrow width, supported theme and actual actor/configuration. Capture saved/issued historical facts. Use synthetic data; public evidence must be sanitized.
3. Choose the smallest behaviour-preserving fix. Reuse existing Button/withFormPending, ProductAddSearch, DocumentLinesEditor, ConfirmDialog, StatusHelp, date helpers and CSS roles when applicable. Existing native selects may remain. If a primitive is deficient, extend it compatibly, inventory its consumers and test representative consumers before wider rollout.
4. No global reset, palette/type replacement, new framework, whole-screen rewrite or blanket migration for a local defect. A token/accessibility correction needs a narrow proposal showing affected consumers and before/after; preserve brand and layout as far as compliant. Do not retain a critical defect solely for visual consistency.
5. Preserve public props/callbacks, form names/row identities, server validation/auth boundaries, source prices/tax/history, keyboard fast path, module/entity distinctions and working business effects. Do not change journal logic or saved facts during cosmetic work.
6. Keep meaningful status in existing toast/inline/status patterns. Use feedback after confirmed outcomes; keep actionable errors accessible. Do not add notifications on every keystroke/click or hide essential rules in tooltips.
7. Write the product CHG with UX/WB IDs, exact before/after, shared consumers, non-goals, compatibility, exceptions and rollback. Product code rollback does not reverse data; default to no data/schema changes for UX fixes.
8. Run required product checks and focused component/business regressions, then actual browser exact/adjacent paths with persisted readback and screenshot comparison. Missing execution stays blocked/not-run. QA independently retests; developers do not self-close independent findings.
9. Update the existing design reference/showcase when the shared behaviour changes; retain visual vocabulary. Update product instructions/guide pointers, TASK_LOG, PROJECT_STATUS and QA change record. Do not overwrite concurrent coding-agent work or deploy across a fixed QA mission.

## Rollout waves

| Wave | Scope | Exit evidence |
|---|---|---|
|0|Inventory and contracts; resolve overlapping guidance; no UI redesign|Pinned inventory, conflicts/owners, baseline fixtures, companion docs adopted|
|1|Financial representation, source hydration, field loss, false success and duplicate-write risks|Original repro + correction/adjacent/unchanged-state evidence; independent financial outcomes|
|2|Shared feedback, error summary, dialogs, labels, focus/help primitives|All changed states plus actual consumer inventory and representative browser/reader/keyboard checks|
|3|Apply shared checks when touching each module; prioritize frequent tasks and exposure|Module business path + UX matrix; list/form/detail/print/history/access variants|
|4|Responsive, assistive technology and task-efficiency audit; controlled remaining backlog|Declared device/network budgets, manual accessibility evidence, resolved/owned exceptions|

Stop wave expansion if shared regressions appear. Existing screens are not rewritten just to tick a rollout box. New or modified UI must satisfy applicable rules; untouched legacy gaps remain explicitly prioritized and owned.

## Mandatory PR evidence

Use templates/UX_CHANGE.md in QA and extended product CHG template. Declare rule/workflow/WB refs and QA pin/hash; before/after screenshots; source component/style reference; affected consumers; preserved behaviour; actual checks/layers; financial/source/history/permission outcomes; exceptions with expiry; remaining not-run scope and rollout/revert plan.

No weighted beauty score, no promise all states exist on every component, no unsupported dark-mode/RTL requirement. Define applicable states (default/hover/focus/active/disabled/loading/empty/error/success/selected/expanded) per component and mark inapplicable with reasons. Formal accessibility criteria remain criterion-specific.

