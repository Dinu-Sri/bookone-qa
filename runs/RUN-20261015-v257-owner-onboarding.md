# v2.5.7 live Owner onboarding checkpoint

Date: 2026-10-15, Asia/Colombo. Staging: https://bookone.clossyan.com. Product: 7ffafab14e0ac0b6c3e6150cec1c2c227fee87e6; observed UI stamp **v2.5.7 /7ffafab**. QA base: 671efa372a4af7ae1e23999a91af9573b048fa7d. Manual browser evidence only; separate from the immutable 300 automated assertions. Rulebook 1.0.0, SHA256 abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc; BR-SEC-02, RB-CONFIG-02, RB-UI-01. No business-policy changes or full acceptance.

## Executed observations

P257-Owner signup was explicitly approved by the user, submitted successfully, and followed by a fresh credential login without email verification. Supported Company onboarding completed. The workspace showed QA / Owner, its own synthetic company, and v2.5.7 /7ffafab. Control Room navigation was absent; direct /control-room redirected to /?denied=1 without platform data. Company Details loaded. No financial/stock transactions, products, attachments or archives have been created in this fixture. Trading-table emptiness and actual settings remain unverified. Chrome then blocked automation because another extension popup was open; dismissal has been requested. Do not bypass that block or repeat signup.

| Assertion | Outcome | Limit |
|---|---|---|
| Prepared synthetic signup accepted after explicit policy-acceptance approval | Passed | Account-created message; no production identity |
| Fresh credentials log in and reach onboarding | Passed | Owner says email verification intentionally disabled on staging |
| Company selection completes and loads own workspace as Owner | Passed | Does not prove every seeded setting or table |
| Normal Owner cannot open platform Control Room | Passed | Actual route redirect; not every platform endpoint |
| Company Details opens | Passed | Field values not read before browser interruption |
| Inventory/tax/CoA/empty financial baseline | Not run | Browser popup prevents next read |
| Physical purchase-to-return workflow | Not run | Planned fixtures are not posted records |
| Real backup/restore | Not run | LAST by owner instruction |

Only the five bounded assertions above passed; no claim of full workflow/security acceptance. BUG-0044's three earlier policy-link failures remain separate and open. The new signup is now completed, so earlier unsubmitted checkpoints describe history only. No existing-company Admin grant was attempted. Unique credentials and actual creation/cleanup checkpoint are ignored under .local/live-v257/; do not publish them. Actual tenant UUID is not observed in supported UI.

## Source investigation while Chrome is blocked

Graph discovery used BookOneREAL, whose snippets refer to an older Desktop checkout. Relevant implementation was independently read in the pinned 7ffafab checkout: apps/web/src/lib/entity-kind.ts modulesForEntityKind returns Sales/Purchase true and Inventory/POS/Rental false for Company. This explains the absent suite; actual stored module values still need UI confirmation. apps/web/src/lib/platform-modules.ts and actions/platform.ts expose supported platform-admin company/plan/module controls. Enable only the synthetic company's needed ERP modules, then freshly log back into P257-Owner and verify effective settings; do not grant platform access to that user. Company Inventory Settings configures costing/negative-stock policy, not module enablement.

Signup message says to check email before signing in, yet this account logged in directly. Pinned apps/web/src/app/login/page.tsx line98 sets that message unconditionally. This is a configuration-aware copy concern on intentionally verification-disabled staging; production verification behavior/security is untested. No security bypass is alleged. Onboarding advertises stock/POS although Company defaults disable them: clarify activation expectations with the product owner rather than assuming a backend permission bug.

## Resume safely

After the user dismisses the extension popup, continue with the same authorized Chrome session at /company/details. Read actual country/currency/timezone/tax/costing/CoA/module settings and empty journal/report baseline. If modules are off, use the supported platform-admin controls for this synthetic company, preserving company identity/settings, then explicitly sign out and log back into the normal Owner. Never weaken permissions or bypass a browser access review.

Physical planned anchor: opening owner capital1000, purchase10 at60, PO/GRN/bill once, sale4 at100, receipt150, credit1 at100/original cost60 against unpaid invoice, supplier payment200. Planned final cash950/AR150/AP400/stock7/value420/profit120; none observed. Post once, verify journals/accounts/subledgers/stock/reports/reload, preserve identifiers privately and do not blindly replay financial actions. Then remaining non-backup business/settings/role/file/history workflows; actual backup/restore last. No SQL company reset, shared-staging faults, production access, public credentials/archive bytes.
