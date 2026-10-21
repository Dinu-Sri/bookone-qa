# Existing BookOne design references — source audit

> GENERATED from ux/design-inventory.json; no live compliance audit claimed.

Product pin: a4a6d65fa0f8ecc116b728b99d70e86f1b2b577f; date 2026-10-21.

## DS-01 — apps/web/src/app/globals.css

Existing CSS variables, base styles and module-specific classes; preserve palette/type/density and scope any accessibility correction.

## DS-02 — apps/web/src/components/ui/bookone-ui.tsx

Existing Button, Card, Badge, PageHeading and busy integration; source presence is not accessible-interaction certification.

## DS-03 — apps/web/src/app/design-system/page.tsx

Existing interface-foundations showcase; uses demo-data and includes illustrative controls; do not treat demonstrations as production behaviour.

## DS-04 — docs/LIST_TABLE_UX_GUIDE.md

Canonical existing list/search/form-entry design guide; extend it in place.

## DS-05 — docs/SIMPLE_ENTRY_UX_REDESIGN.md

Operational fast path, primary lane/support rail, keyboard flow and business language.

## DS-06 — docs/ENTITY_UX_FLOWS.md

Entity-specific approved direction plus partially built/deferred areas; contains old Sinhala bracket wording.

## DS-07 — docs/UX_REDESIGN_GUIDE_STATUS.md

Existing rollout checklist; Done claims are documentation, manual deploy verification remains separate.

## DS-08 — docs/AR_INVENTORY_UX.md

Existing receive-payment and inventory screen guidance; business policy remains subordinate to canonical rulebook.

## DS-09 — apps/web/src/components/ui/form-busy.tsx

Existing pending helper, 1.5s overlay and45s clearing; clearing is not transaction rollback.

## DS-10 — apps/web/src/components/ui/status-help.tsx

Existing StatusHelp/tooltip mechanisms; keyboard/touch/announcement behaviour requires execution.

## DS-11 — apps/web/src/components/ui/date-field.tsx

Existing shared calendar field; verify typed/picker/rerender semantics.

## DS-12 — apps/web/src/components/ui/confirm-dialog.tsx

Existing modal; verify initial/contained/restored focus and cancellation in a browser.

## DS-13 — apps/web/src/components/ui/gloss-label.tsx

Current component replaces English with Sinhala; conflicts with older bracket guidance; no language policy changed.

## DS-14 — AGENTS.md

Canonical product agent rules, versioning, busy guard and external QA contract.

## DS-15 — .claude/CLAUDE.md

Secondary entry point delegates to AGENTS and requests graph discovery; graph MCP unavailable in this QA session, pinned GitHub tree/files used.

## Unresolved questions

### UXQ-001

ENTITY_UX_FLOWS bracket hints versus GlossLabel replacement

Owner: Product owner with coding agent. Decision: pending; preserve current behaviour. Next: Trace affected users/screens and confirm intended language behaviour before a separate change.

### UXQ-002

UX_REDESIGN_GUIDE_STATUS references bookone-ux-redesign-guide.md absent from inspected product tree

Owner: Coding agent. Decision: missing reference; no invented content. Next: Locate source or explicitly supersede obsolete reference using reviewed existing guidance.

### UXQ-003

Existing24-ui-ux tests include shell/style checks; generic catalogue dispatch not semantically audited here

Owner: Medium QA reviewer. Decision: not comprehensive UX acceptance. Next: Audit assertions before binding new UX scenarios; preserve inherited IDs.

### UXQ-004

Existing list guide physical sizes/no page H1 preference vs accessibility semantics

Owner: Product owner and Medium QA. Decision: preserve compact visual layout, add accessible structure where necessary. Next: Do not turn visual no-large-heading rule into removal of meaningful page naming; verify impacted rendering.

