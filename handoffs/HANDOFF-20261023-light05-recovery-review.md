# Light05 recovery and focused coding handoff — 23 October 2026

Base QA PR57, b9012ed23463f008d5537337eb5ab1e328ce97a5. Product inspected at de45536bc47ead3e20f401ecd5fe144bfdf7d52c. Live recovery observation: v2.5.20 · de45536. This is recovery plus source review, not a new financial mission or independent human/expert approval.

## Recovery completed
Recovered the original private 114-event ledger. Before recovery: 9 passed, 2 failed, 16 blocked, 2 inconclusive, END running. The only persisted unresolved submission was M20-END-purchase-restore-1. The published report referred to a later inventory-restore intent, but that intent is absent from the recovered state. Preserve this discrepancy; do not invent missing submissions or events.

Fresh supported read-only staging pages confirmed:
- Purchase: approval false, supplier number required false, duplicate blocking true, GRN required false, GRNI false, terms Net 30, expense 6800.
- Inventory: last cost, negative stock allow.
- All 25 sales controls match the original opening map, including VAT registration false, rates 18/0, department 01, numbering and receipt settings.
- Balance sheet: 153 journal entries, AR 1306.21, AP1290, inventory GL660, output VAT46.71, GRNI/cash/bank0, earnings629.50, assets and liabilities plus equity1966.21. This recovery did not freshly re-sum journal debit/credit turnover, stock or aging; their 16908.11/780 reconciliations remain historical PR57 evidence.

Preserved original state privately, appended accepted purchase-restore readback, recorded END inconclusive, and closed the existing clock at actual time. Final ledger: **9 passed / 2 failed / 16 blocked / 3 inconclusive; zero pending/running/unresolved**. All prior terminal dispositions unchanged. No new settings Save, financial submission, replay, grant, module/job change or fixture repair.

Final conservative clock **58,889,449 ms = 981.4908 minutes**, zero explicit pauses; 100-minute budget exceeded by 881.4908 minutes because the unpaused disconnected interval is charged. This is not compute time or credits. Do not backdate a pause or claim budget compliance. The original last-clock description in PR57 remains immutable; recovery measured the previously unknown final elapsed value.

## Focused source review and coding mission
Existing UXW-018/021 expectations apply unchanged. No new UX or financial rule is introduced; companion1.1.0 and canonical business definitions stay unchanged. Graph tooling unavailable; exact pinned GitHub files inspected. No product edits/build/unit/DOM regression tests were executed in this continuation.

### OBS-M20-01 — restore list focus to a surviving row control
Pinned paths:
- apps/web/src/components/ui/confirm-dialog.tsx
- apps/web/src/components/sales/commercial-document-list.tsx

The shared dialog captures document.activeElement in its open effect and later calls focus on that stored element without a connected/surviving fallback. The commercial list Archive/Delete/Restore click handlers clear the action menu and set confirmation together. The list already maintains triggerRefs for row buttons. Source supports the removed-menu-trigger explanation for the recorded BODY return, but exact React focus timing remains an inference until executed.

Coding owner: provide a stable explicit return-focus target or compatible connected-element fallback, wiring list consumers to the row Actions button. Preserve the detail-page trigger success, initial Cancel focus, Tab/Shift+Tab trap, Escape/backdrop cancellation when not busy, busy suppression and unique labels. Do not replace the design system. Inventory all shared consumers and document fallbacks when a row disappears after a legitimate operation.

Required fresh regression: purchase list and detail, desktop and390px; open Archive then cancel by Escape and explicit Cancel, with zero archive/delete effects. Verify activeElement is the surviving invoking row control. Add relevant sales-list adjacency and busy/outside/assistive-reader layers; unavailable layers stay explicit. Never confirm destructive actions for this regression.

### OBS-M20-02 — size help against actual usable layout width
Pinned paths:
- apps/web/src/components/ui/status-help.tsx
- apps/web/src/app/globals.css

TipBubble measures offsetWidth and places using layoutViewportSize(window.innerWidth, documentElement.clientWidth). CSS caps width using max-width:calc(100vw - 16px), with wide width340px. Recorded320px browser /305px layout produces304px bubble at x8/right312: seven pixels beyond the usable layout. An eight-pixel gutter on each side permits at most289px. Placement alone cannot satisfy both gutters while width remains304px. Source supports the CSS/placement viewport mismatch; browser retest is required after repair. No verified text-loss claim.

Coding owner: constrain rendered border-box width to the same usable layout width before/reliably during placement; preserve desktop/390 sizing, existing palette/typography, hoverable content, Escape and focus behavior. Cover StatusBadge and StatusColumnHelp consumers; consider resize, scrolling, zoom/scrollbar and long content. Do not change financial/print semantics.

Required fresh regression: invoice and sales-return status help at320 and390 actual viewport with scrollbar, desktop and edge anchors. Assert left>=8 and right<=layoutWidth-8 when space allows, plus accessible content, hover/Escape behavior and exact viewport restoration. A pure geometry helper test is insufficient for computed CSS sizing.

## Remaining gates and next action
Engineering owns the two compatible fixes and an actual diff/change record. Medium QA then compares exact changes, reviews affected/shared consumers and binds a NEW fixed Light queue only after verifying a new live candidate and legitimate fixtures. Do not rerun consumed Light05 financial sources.

Keep U1 contenteditable and U2 enabled quick-create as unknowns, not demonstrated write bypasses. Real allowed/denied/foreign runtime fixtures are still needed. No access expansion or quick-create workaround. Inventory writer remains unavailable; physical setup/purchase/source ancestry/eight-consumer/purchase print stay blocked. LINE feedback and initial date-entry issue remain operator evidence gaps; a new isolated fixture/queue is required, with immediate refusal capture and verified dates. No speculative date-field product fix.

Late response, real authorization and authentic101c/104c upgrades remain blocked; fresh F7 does not certify upgrades. No full defect closure, release/customer-readiness/canonical-case acceptance. Actual encrypted backup/restore LAST.

Read original results: handoffs/HANDOFF-20261022-light05-results.md and handoffs/MEDIUM-MISSION-20261022-light05.md. This addendum completes private closing recovery and the focused source diagnosis; comprehensive financial/security evidence review remains open.
