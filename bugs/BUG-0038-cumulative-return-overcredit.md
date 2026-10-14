# BUG-0038: Repeated source returns exceed original quantity/value

P1 open; candidate **v2.5.5 · 8e1a2b8**. RT-038, BR-SAL-02 source quantity/refundable-balance guard.

Create one100 service invoice and return its full one unit. A second full linked return is accepted. Two active returns total200 against source100; AR becomes credit100. Expected refusal with zero additional business mutations. This is a missing cumulative source constraint, distinct from BUG-0035's header-discount calculation.

Repair validates live posted owned source, original line/product identity, remaining returnable quantity and refundable amounts against active prior returns, with stable locks to protect races. Include currency/tax/cost/discount snapshots and an explicit unlinked-credit contract; source association must not be advisory. Keep valid partial returns and original source/receipts immutable.

Adjacents: repeat paid-source cash refund (RT-041 added, pending execution), simultaneous returns, multi-line same SKU, full/partial/void/reversed return history, physical restocking and stock cost, role/period/scope denial, fault rollback. Do not claim cash over-refund until that separate assertion executes.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Actual isolated SQL/product command with synthetic session. Real auth/UI exposure remains open; no staging writes.
