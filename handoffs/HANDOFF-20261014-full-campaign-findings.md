# Full campaign: fix shared financial/access/recovery defects

Product **v2.5.3 · 5becb2d**, SHA5becb2dcc768e056e34f8507fc2ecd2a3475e6a9. QA implementation e784308722853610ec6bcbad71b617fe8eff86d3 / tested PR merge026621dab661b0fcb21aa473338ce1eed10aa384. [Campaign CI](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38522803612): **242 pass /13 fail /0 blocked /4 inherited optional skips**,259 assertion slots. Metadata/unit/discovery validation and A–F source CI green. [PostgreSQL85](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38522803216):73 pass/12 fail, no missing/infra cases,43/43 SQL applied. Original60 source and49 runtime regressions pass, including bounded physical0018/19/20; do not reopen0010–16.

| Finding | Priority | Cases | Problem |
|---|---|---|---|
| [BUG-0022](../bugs/BUG-0022-concurrent-document-overallocation.md) | P0 | B-107 | Concurrent AR payments overallocate and disagree with invoice balance |
| [BUG-0023](../bugs/BUG-0023-completed-payment-idempotency-response.md) | P1 | B-106 | Completed payment replay is reported as still running |
| [BUG-0024](../bugs/BUG-0024-archive-files-data-checksum.md) | P0 | S-0787 | Files restore ignores mismatched data cross-checksum |
| [BUG-0025](../bugs/BUG-0025-invalid-archive-files-completion.md) | P0 | S-0793 | Invalid required file bytes are reported as successful restore |
| [BUG-0026](../bugs/BUG-0026-rental-money-access-tender.md) | P0 | D-117 / E-104 / RT-023 | Rental money bypasses Viewer/module/tender controls |
| [BUG-0027](../bugs/BUG-0027-rental-money-partial-failure.md) | P0 | D-118 | Failed rental deposit leaves transaction and empty journal |
| [BUG-0028](../bugs/BUG-0028-viewer-stock-transfer.md) | P0 | C-109 | Viewer can transfer stock |
| [BUG-0029](../bugs/BUG-0029-stock-transfer-partial-failure.md) | P0 | RT-021 / RT-022 | Failed or losing transfers leave partial stock/history |
| [BUG-0030](../bugs/BUG-0030-archive-ar-integrity.md) | P0 | S-0782 | Restore accepts posted receivable without ledger lines |

Existing [BUG-0021](../bugs/BUG-0021-admin-backup-resolver-fallback.md), S0764: RBAC-off Admin resolver gets Owner-only backup rights; independent primary-owner route guard means archive exposure is not established. It is the13th failed assertion. Nine new bug groups above, not13 independent root causes.

Fix by shared boundaries: current authorization/module/entity/scope+tender; document/stock/deposit locking and complete transaction; archive financial/relationship/integrity validation and both pair hashes; generic idempotency response completion. Connection scoping is not transaction atomicity. Hidden buttons, balanced totals alone and UI successes are not controls. Keep exact original amounts/counts and zero-mutation negatives red until repairs. Account for source/target location ownership and real foreign records; test both database roles plus fresh credential HTTP when extending acceptance. Do not suppress costing errors as missing migrations when all43 migrations applied.

Basic data restore/remap/CoA, distinct new restorer Owner/global-user preservation, wrong-password/no-write, second-data refusal, trial-hash rollback, mid-insert rollback, concurrent restore, matching memory-store bytes, repeat-files refusal and no-overwrite controls pass at their bounded DB/helper layer. They do not close the three archive defects or prove real MinIO/browser restore. Four optional units remain explicitly skipped; no passes inferred.

First attempts retained in RUN-17: wrong archive helper import and missing configured rental bay fixtures were QA setup defects, corrected without changing business expectations. S0781 originally used0.00 for an absent PostgreSQL SUM side; the schema1 serializer hashes the raw0 string. Aligned this textual convention, kept numeric600/zero oracle and confirmed wrong-hash rollback; it is not a restore product defect. Older242/13 totals had S0781 failure; final242/13 have S0782 incoherent-AR failure instead. Never merge these fingerprints as identical evidence.

No staging mutation/reset/download/real restore, production access or secret/backup publication. Start live phases only after a fresh exact sidebar stamp and intended actor; end-of-session tab text did not expose a stamp, so current deployment is not certified by these source runs. Portable owner archive is separate from operator DR and restore only targets a new empty company.

One command: pnpm campaign:run --seed261013 --profile quick --jobs2 (use actual space-separated CLI arguments; see docs/FULL_CAMPAIGN.md). Full137 workflows remain unaccepted:57 have partial bindings,80 have none; browser/HTTP/real storage/configuration/upgrade/recovery and policy-dependent semantics remain open. Owner policy-ownership question is pending; propose explicit rule alternatives for review instead of adopting current output. After a product fix, inspect diff/CHGs, deliberately update all candidate pins/stamps, prepare a fresh isolated DB and rerun the whole campaign. Fresh source pass never reuses old SHA evidence.
