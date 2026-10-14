# BUG-0038: Repeated source returns exceed original quantity/value

P1 open; candidate **v2.5.5 · 8e1a2b8**. RT-038, BR-SAL-02 source quantity/refundable-balance guard.

Create one100 service invoice and return its full one unit. A second full linked return is accepted. Two active returns total200 against source100; AR becomes credit100. Expected refusal with zero additional business mutations. This is a missing cumulative source constraint, distinct from BUG-0035's header-discount calculation.

Repair validates live posted owned source, original line/product identity, remaining returnable quantity and refundable amounts against active prior returns, with stable locks to protect races. Include currency/tax/cost/discount snapshots and an explicit unlinked-credit contract; source association must not be advisory. Keep valid partial returns and original source/receipts immutable.

Adjacents: repeat paid-source cash refund (RT-041 added, pending execution), simultaneous returns, multi-line same SKU, full/partial/void/reversed return history, physical restocking and stock cost, role/period/scope denial, fault rollback. Do not claim cash over-refund until that separate assertion executes.

## Confirmed cash payout variant

[RT-041 follow-up](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json): paid100 source, first100 cash refund leaves cash0, then second identical linked100 cash refund accepts. Two returns total200 and cash becomes -100 instead of0. This is actual isolated cash-posting overspend, not only unpaid AR overcredit. Stable source/refundable locks must cover paid/unpaid and cash/credit variants; a refund-state-only repair does not fix this budget guard. No real staging/customer cash was changed. Earlier pending note is historical.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Actual isolated SQL/product command with synthetic session. Real auth/UI exposure remains open; no staging writes.
