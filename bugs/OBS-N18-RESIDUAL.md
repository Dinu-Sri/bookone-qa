# P1 — final return previews1.01, posts1.00 and leaves debt after all units

Livev2.5.14 · a36af04, producta36af042753f3ad8b40246d6cd579deac9233ba7. Fresh explicitQA N141710login/owncompany/Owner on18Oct. Related SRC-N14-RESIDUAL and WB-HYB.J02.C10; original source evidence stays immutable.

1. Create Digital productN18DigitalSeven,qty7@1, fixed header0.05, noVAT. PostINV-20261018-0003,total6.95.
2. Submit six separate source-linked one-unit returns. SR0003–0008 each preview AND save0.99. Cumulative5.94; source residual1.01.
3. Load source again,qty1. UIshowsSubtotal1.00,Discount0,Total1.01. These economic components do not reconcile. Submit once.
4. SR-20261018-0009 saves1.00. Source reload:total6.95/paid6.94/due0.01,statuspartial. Seven one-unit returns have been accepted against seven sold units.

Expected: cumulative original value conserved, preview and persisted economics agree, zero sourcebalance when all units are returned. Under the actual accepted5.94 prior allocation, final credit must represent1.01; another declared stable allocation may distribute the cent earlier. Do not simply permit an unexplained surcharge or silently weaken original source expectations.

Pinned helper applyClosingReturnResidual returns residual while clamping header discount at0; posting recomputes from returned line fields. This is source corroboration of the observed mismatch, not proof of every other return path. Seven-unit deployed reproduction now establishes more than the prior pure-helper concern. Ten-unit analogue remains source-only/not-run live.

Preserve INV0003 and all seven returns; do not collect/writeoff its0.01 or add a balancing journal. Retest both return sides, larger/partial/mixed allocations and source net/tax boundaries, with ledger, quantities/layers and attributable history. Actual stock quantities were not read; this digital fixture tests accounting/quantity-document conservation, not digital fulfilment.

[Run](../runs/RUN-20261018-v2514-resume.md) · [checks](../runs/CHECKS-20261018-v2514-resume.json). Private screenshots/raw traces/credentials excluded.
