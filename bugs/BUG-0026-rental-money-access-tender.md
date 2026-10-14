# BUG-0026: Rental money bypasses Viewer/module/tender controls

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: D-117 / E-104 / RT-023. Viewer collection and refund both accepted: two additional transactions/journals/four lines. Owner can collect with rental disabled and use revenue4000 as tender; each produces a journal. Expected zero business effects for all denials.

Source investigation: apps/web/src/app/actions/rental-money.ts: collect/refund require identity but no write/module guard; accountByCode does not enforce external liquid-asset tender eligibility.

Recommended repair/adjacent checks: Enforce authoritative current role/module/entity/dimension access and external tender validation before writes. Keep internal deposit application distinct from external receipt/refund tender. Audit all rental money exports and adjacent event/void/foreign/suspended controls.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
