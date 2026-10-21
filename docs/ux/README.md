# BookOne UI/UX QA companion

Version1.0.0, owner requested2026-10-21. Mandatory maintenance and change procedures apply now; product conformance and independent specification review are separate.

Start with [existing design references](DESIGN_INVENTORY.md), [protocol](PROTOCOL.md), [generated workbook](WORKBOOK.md), [execution guide](EXECUTION.md), [state/field matrix](MATRIX.md) and [incremental engineering adoption](CODING_GUIDE.md). Canonical editable sources are ux/workbook.json and ux/design-inventory.json; generated views are read-only. There are32 shared rules and48 draft, unbound, not-run UX workflows across12 groups. The eight business books/52journeys/272business cases remain unchanged and retain their original authority/evidence.

This companion supplies interaction/accessibility obligations across those books. It introduces no alternative palette, component framework, spacing scale or accounting rules. Follow the product's existing LIST_TABLE_UX_GUIDE, Simple Entry/entity guidance, CSS variables and shared components. Conflicts are recorded in the inventory rather than silently resolved.

Commands: pnpm ux:render; pnpm ux:check; pnpm test:ux-workbook; pnpm ux:plan source (or UX-008, UXW-009, WB-PHY.J06). Unknown selection broadens all48; planner is an aid and cannot discover every code dependency.

Definitions are not48 new passing tests. Metadata tests check authoring integrity and reject representative broken records, not the live ERP. No new browser adapter, release protection or accessibility certification is claimed. Inherited S/RT/WB IDs and24-ui-ux.spec.ts remain intact.

