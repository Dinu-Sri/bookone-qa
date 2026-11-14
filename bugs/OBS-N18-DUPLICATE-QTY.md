# P1 — duplicate current return rows accept four units against three

Livev2.5.14 · a36af04, producta36af042753f3ad8b40246d6cd579deac9233ba7; freshQA N141710/owncompany/Owner. Related SRC-N14-DUPQTY and WB-HYB.J02.C08. Supported UI only; no hidden-field or request tampering.

1. Fresh physicalN14Widget invoiceINV-20261018-0004,qty3@100,total300; source buycost60.
2. New sales return →pick this source. Change copied rowqty2. Use normal Add product search to add the SAME SKU/description again; set second rowqty2.
3. Preview:two rows200each,subtotal400,headerdiscount100,total300. Aggregate quantity is4againstsource3; expected atomic refusal.
4. Save once. SR-20261018-0010 is accepted/paid,total200. View modal persists row1qty2/price100/amount200 and row2qty2/price0/amount0. Four returned document units accepted.
5. JournalpostsDrSalesReturns200/CrAR200 andDrInventory120/CrCOGS120. Source invoice becomespartial/paid200/due100. Invalid action mutated money instead of refusing.

Expected: aggregate prior+current quantities by stable source-line identity, reject excess atomically, preserve sourcebalance300 and all GL/stock/audit facts. Legitimate duplicate source rows and legitimate split return rows need independent positives; avoid merely deleting the duplicate UI feature. Preview must match saved values for valid cases.

Static guard loops current rows individually; proration uses one-to-one matches and zeroes the unmatched second row economics. Runtime evidence now proves this branch reaches posting; earlier source-only reachability uncertainty is resolved for this sales UI path. Persisted return quantity4 and exact financial mutation are verified; actual product stock/layer quantity was NOT independently read and must not be inferred solely from return rows.

Preserve INV0004/SR0010 and all journal evidence. Retest both sales/purchase returns, same SKU/different descriptions, multiple legitimate source rows, prior returns, unknown items, races and denied unchanged snapshots. Do not repair the test tenant to hide this result.

[Run](../runs/RUN-20261018-v2514-resume.md) · [checks](../runs/CHECKS-20261018-v2514-resume.json). Synthetic sanitized evidence only.
