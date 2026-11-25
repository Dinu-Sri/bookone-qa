# Residual fixture plan — 1.0.0

Technical plan resolved 18 October 2026, following PR43 review. Independent human/business review remains pending. This plan does not edit historical results, the frozen pilot queue or existing C10 expectations. It creates no live evidence and authorizes no deployment, staging downgrade/reset or historical data repair.

## Two pre-states, two test families

| Family | Required pre-state | Independent expected result |
|---|---|---|
| Fresh seven-unit ladder | New source 7×1/header 0.05, no credits; declared capped round-half-up allocation | Credit cents 99,99,99,99,99,100,100; every preview matches its posting; all line/header/total values reconcile; total 695/source zero. |
| Fresh ten-unit ladder | Separate new source 10×1/header 0.05; same declared profile | Five credits of 99, then five of 100; each preview matches posting; total 995/source zero. |
| Legacy seven-unit upgrade | Authentic old-version source 6.95, six posted credits of 0.99, one unit/value 1.01 remaining | Final credit 1.01 with an explicit valid allocation representation; cumulative 6.95/source zero; historical facts unchanged. |
| Legacy ten-unit upgrade | Authentic old-version source 9.95, nine posted credits of 0.99, one unit/value 1.04 remaining | Final credit 1.04 with valid representation; cumulative 9.95/source zero; historical facts unchanged. |
| Three-unit control | Fresh 3×1/header 0.01 | Credits 1/1/0.99 under the established profile, equal previews/postings and total 2.99/source zero. |

The fresh fixture's cap is calculated independently in integer cents: round each proportional header share half-up, cap it to the unused header, and give the closing return the exact remaining value. For seven/ten units a rounded one-cent share consumes the five-cent budget after five credits; later non-closing credits cannot use a sixth cent. For three units the non-closing rounded header share is zero and the final credit receives the remaining cent discount.

This is a declared test allocation within the existing contract that allows other stable conserving allocations. It is not a new universal rounding policy. If product behavior intentionally adopts another policy, review that policy and fixture separately; never weaken preview/post equality or line/total representation to accept it.

The legacy outcomes remain 1.01 and 1.04 because those earlier posted credits are fixed facts. A displayed aggregate must reconcile with actual lines, header, tax and any explicitly represented valid adjustment. A helper label of 1.01 alongside line sum 1.00/header zero is insufficient. A legitimate implementation decision about the adjustment must be reviewed; QA must not invent a hidden surcharge or change the source unit price to force a pass.

## Authentic isolated upgrade procedure

Upgrade cases are **blocked: isolated application/database/auth environment not prepared**. Source-helper execution is available but does not replace them. Required environment owner: QA infrastructure operator; coding agent supplies runnable pinned old/new builds and deployment/schema instructions.

1. Select only a verified ephemeral loopback PostgreSQL database named `bookone_qa_runtime`, with the repository's private isolation marker and empty-target preparation rules. Read runtime target policy and the exact version's migration/auth requirements. Use real compiled app/session modules and supported credential login, not synthetic auth adapters. Keep generated credentials private. No staging host, tunnel or production database.
2. Run old product `a36af042753f3ad8b40246d6cd579deac9233ba7` (v2.5.14) against that new isolated environment. Create a legitimate run-owned synthetic company/actor through supported flows; verify Owner, configuration and no initial trading. Record any terms/sign-in or infrastructure blocker at the point it arises.
3. Create two separate digital sources through supported workflows: 7×1/header 0.05 and 10×1/header 0.05, VAT registration false. Verify stored product class and exact amounts. Post six or nine one-unit returns respectively on the old build. Before each submit record intent; afterward read document, source quantity/value, journal and audit. Stop on any unexpected posting; never fabricate the prior credits with SQL.
4. Verify the precise checkpoints: credits 5.94/qty 6 and 8.91/qty 9, one unit left, due 1.01/1.04. Preserve IDs, source/return line and journal snapshots and opening financial/stock state privately. Do not post the final old-version return.
5. Stop old application traffic and upgrade the application **in place** to the explicitly pinned candidate using the same isolated data. Apply only reviewed necessary migrations. Verify image/commit/schema and fresh credential identity after upgrade. Preserve all previous document/journal fields and IDs. This uses no database reset, record edit, backup import or restore, so actual encrypted backup/restore remains LAST.
6. Before any final submit confirm the unchanged legacy checkpoints. Return the last unit once. Compare preview, persisted lines/header/adjustment/net/VAT/gross, journal, source quantity/value and audit; check exact 1.01/1.04 and complete source closure. Inspect persisted state after any uncertain response; no blind replay.
7. Reconcile exact per-company deltas and unrelated records, document restoration of temporary settings, and retain the environment/evidence for review. Cleanup is a separate recorded operation under the fixture policy; do not destroy failure evidence.

No specific application command is invented here: the isolated runtime prerequisites must actually support each pinned build and real auth before execution. Missing infrastructure is an explicit blocker, not a reason to substitute source calculations or mutate consumed staging fixtures.

## Fresh and form-error queue

`queues/RESIDUAL-REVIEW-v2515.json` has eight slots: two fresh ladders, two isolated upgrades, the 2.99 control, complete server/client retention controls, and final reconciliation. It targets v2.5.15/158ddc2 to preserve the reviewed reproductions. A new fix candidate requires a separately versioned manifest/queue and run; no old evidence is relabeled. Readiness labels do not prove infrastructure or authorize mutation; independently verify them before starting an operator case.

The existing live tenant may host fresh sources under standing staging authorization, after a new actor/build/configuration check and opening snapshots. It must not host the old-version upgrade, forced pre-state edits or replay of original P15 cases. The current fresh preview mismatch is already source-confirmed: record a mismatch before choosing any further financial action; do not silently accept the changed amount.

For server retention, enter dates/notes/selects different from defaults and compare **all** submitted fields after one real business rejection, with unchanged invoice/AR/journal/stock. A subsequent correction must be separately bound to a supported receipt/purchase and post once, not a reset or unexplained override. Client 150% retention remains a separate positive control. Success/draft/print intent, pending state, idempotency and redirect behavior remain required after a fix.

Plan resolution does not close P15-01, the P15-08 defect, C10 representation or any release gate. Existing observations and expectations remain immutable.
