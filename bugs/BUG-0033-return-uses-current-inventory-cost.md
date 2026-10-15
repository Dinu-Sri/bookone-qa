# BUG-0033: Linked sales return uses current cost instead of original issued cost

P1, open. Product **v2.5.5 · 8e1a2b8**. Rules BR-STK-02/BR-DAT-01; actual PostgreSQL product-command reproduction with synthetic sessions and owner connection.

Receive10 at60, then10 at80. Sell5 at100. Receive another10 at100, then return1 against the original sale. Independent source-cost expectations and observed outcomes:

| Method/case | Original five-unit issue | Expected return cost | Actual return cost | Expected closing inventory | Actual closing inventory |
|---|---:|---:|---:|---:|---:|
| FIFO / RT-028 | 300 | 60 | 84 | 2160 | 2184 |
| Average / RT-030 | 350 | 70 | 82 | 2120 | 2132 |
| Last operational mode / RT-031 | 400 | 80 | 100 | 2080 | 2100 |

All stock counts26 and historical original issue costs stay unchanged. The return overcredits COGS/overstates inventory by24/12/20 respectively; matching profit overstatement follows those journal amounts. These are source-cost accounting failures, not a claim that last-cost statutory eligibility is established.

Pinned source commercial-docs.ts enriches nonpurchase cost from current product.unitCost. Sales returns use that cost in posting and receiveCostLayer. Repair should read validated original issued cost/slices with original product/line/tenant/account links and cumulative returned quantities. Preserve atomicity, scopes, period locks and original history; a legitimate adjustment must be separate and explained.

Adjacent controls required: multiple source lines for the same SKU, partial and repeated returns up to original quantity, full return, source master price/cost edits, settings changes, multi-layer FIFO, return after stock exhausted, foreign source/product denial and fault rollback. Initial different-price FIFO/average issue checks C-111/RT-032 pass; do not alter their expectations.

[PG evidence](../runs/RUN-2026-10-14T11-48-13-404Z-runtime.json), [campaign](../runs/CAMP-20261014-114805477-fc2c22.json), `tests/runtime/inventory-valuation.test.ts`. Actual credential/UI/MinIO exposure and full workflow acceptance remain open. No staging writes.

## v2.5.6 bounded retest - 2026-10-15

RT-028, RT-030, RT-031 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
