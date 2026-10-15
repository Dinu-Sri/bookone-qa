# BUG-0049: Balance Sheet drops balances from earlier periods

**P1 open, release blocker.** Productcf35da1244e902e4a41291bc409eb0d994ed4e01 /v2.5.8. Independent real-PostgreSQL product-command failure, not yet repeated in deployed UI because another Chrome extension UI blocks browser control. This is distinct from BUG-0048: its same-month earnings repro now passes unchanged. No demonstrated deletion/loss of stored postings.

## Independent reproduction

RT-061 creates a service credit invoice600 dated2026-09-15 and another200 dated2026-10-13 through createCommercialDocument. Actual persisted AR debit800/revenue credit800, exactly two balanced two-line journals with the requested dates, confirmed BEFORE report assertions. No stock, payment, forced balancing entry or direct report stub. Normal synthetic Owner/persisted permissions, owner DB connection; explicit synthetic authenticated identity and framework adapters, not a live login/RLS certification.

| Cutoff | Expected assets/equity | Actual assets/equity | Monthly income expected and actual |
|---|---:|---:|---:|
| September2026 | 600 /600 | 600 /600 | 600 |
| October2026 | 800 /800 | 200 /200 | 200 |
| November2026, no activity | 800 /800 | 0 /0 | 0 |

Liabilities0 throughout. Report equality alone passes even when both sides omit earlier balances. Full business snapshots before/after reports agree; no journal mutation. Soft assertions executed all three report periods, then checked snapshot/no-stock invariants. Exactly four expected asset/equity carry assertions fail at test lines200/201; setup/September cutoff/monthly income/immutability controls pass. This is actual failure sensitivity against the real faulty product, not an assertion that every future mutation was tested.

[302 campaign](../runs/CAMP-20261015-085116788-c232dc.json), [CI38708573145](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38708573145):301pass/1fail, zero skip/block/flaky/not-run. [128PG](../runs/RUN-2026-10-15T08-51-22-798Z-runtime.json), [CI38708573100](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38708573100):127pass/1fail, no infrastructure failure;43/43 migrations/PostgreSQL16.15. Only RT-061 fails. All original301 including RT-060 pass unchanged. First301-only passing fingerprint preserved separately.

QA implementation3f32fc8a5240f955294cb20cc6172e0be6137378; tested merge961c09c77c8e34d7b68eafc7f2880b5272b2f3fe; content1022e843eac5ad68fe8b2f712f24566ab655545a1cfa16196281905b2c0e9f52; plan3526b5f0467c35485b29f053643fe39f321db9a6fdb96ffe2ecda6048b30c928; Node22.23.3/campaign-v2; exact full fingerprints in JSON. BR-ACC-01/08, BR-DAT-01, AGENTS58; expert accounting/framework review remains pending.

## Source and repair boundaries

Graph discovery found computeAccountBalances but returned stale Desktop ranges; verified actual pinned source apps/web/src/app/actions/workspace.ts:198–244. It applies BOTH entryDate>=period.from and <=period.to. getReports:823 onward reuses those period-only balances for the Balance Sheet as well as income. This explains the independently observed omitted carry, without proving every reporting consumer/scoped variant affected.

Use a cumulative snapshot through the requested cutoff for balance-sheet assets/liabilities/equity and accumulated unclosed earnings. Keep period income and cash movement bounded to their own period. Do not globally remove the lower bound from shared computation and turn October income200 into800. Do not insert or rewrite journals, reset companies, hide a discrepancy or weaken RT-061. Preserve tenant/book/domain/dimension/void/reversal rules and closed retained-earnings handling; no double-counting. Define labels for any trial-balance period-activity versus closing-balance views explicitly.

Retest unchanged302 at a fresh exact candidate, then add opening capital/liabilities/inventory, profit/loss, year-end closing, custom cutoff, earlier/future/void postings and relevant scoped controls. Actual deployed reporting/print journeys remain required. Customer readiness withheld.

Subsequent [303 campaign](../runs/CAMP-20261015-091325948-860ae3.json)301pass/2fail and [129PG](../runs/RUN-2026-10-15T09-13-33-663Z-runtime.json)127pass/2fail reproduce RT-061 unchanged with the same600/200/0 versus600/800/800 figures, no infrastructure failure. Additional RT-062 confirms distinct BUG-0050 bootstrap failure. All original301 remain passing. Current next candidate must rerun unchanged303, not omit either new failure; full fingerprints retained separately.
