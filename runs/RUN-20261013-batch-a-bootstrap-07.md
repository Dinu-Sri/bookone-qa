# RUN-20261013-batch-a-bootstrap-07 — external batch implementation

Status: completed implementation/validation. Product source contracts remain failed; release acceptance not established.

Owner requested implementation of the accepted risk-based batch strategy and durable memory. QA implementation is commit0494dcab5a8ad97f2822d7b5cdaff5c4c46b9f80; product pin2b92cf40a3d258dcfc29655759d37b0c32aaebbf, deliberately advanced after reviewing the59-file change inventory. No real ERP data was mutated in this task.

## Verified execution

- [Immutable source run](RUN-20261013-043211904-e676d1.json): QA tree clean, SHA/content/batch/fixture hashes recorded, Node20.19, seed261013, quick profile. 04:32:11.906–04:32:32.284UTC:20.378seconds.15 declared checks:7 passed/8 failed;0 blocked/skipped/not-run.
- Failures A-004/007 cash-flow reversal, A-005 Viewer reversal, A-006 archived-draft AR, A-010/012 period-token labels, A-013/014 validation/publication: five previously observed bug groups, all still red. Generated model reduces the failure to a one-cent sale/reversal (private log replay seed261013, shrink path0:2, command replayPathCBEB:K).
- Positive cases: exact generated1000/4000 postings; physical versus nonphysical cost lines; authorized reversal plus duplicate denial; existing foreign-tenant explicit SQL filtering; locked-period denial; explicit month rendering; and Viewer creation guard positive control. Scope limits remain below.
- Metadata,2 target guards and5 runner-integrity cases passed. Retained unit suite on the new pin:94 passed/4 existing optional external bank-fixture skips. Browser discovery preserved770 tests in29 files; no browser acceptance execution.
- [QA validation43](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38346746774) succeeded. [Candidate Batch A1](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38346746902) correctly failed with the same7/8 outcomes; setup/check/prepare and sanitized-artifact steps succeeded. This independently verifies that product failures are not hidden by a green harness.

First development invocation had one fixture setup error (missing required period-lock user_id) and was corrected before the completed runs. This was a harness defect, not a product period-lock failure; that initial outcome is preserved here and later runner logs are retained privately. Windows package execution needed authorized sandbox access and narrowly scoped Git ownership settings. No global safe.directory/TLS bypass was added.

## Implementation and memory

SESSION.md, memory/programme.json, the accepted ADR and batch guide contain the portable plan/startup/extension protocol. The manifest maps every case to rules and bug groups. Runner/reporter save atomic private checkpoints, preserve failures, reject changed-fingerprint/completed resume and export only allowlisted immutable summaries. B–F remain planned; launch scope is undecided. Coding handoff links precise fixes and post-fix commands.

## Limits and next actions

Real pinned application actions and SQL run against disposable embedded PostgreSQL. Live table columns/defaults/PKs are used; synthetic session/dimension/framework adapters and absent migration/FK/unique/RLS layers are explicit. Real-login loading, runtime-role/pooling RLS, dimension constraints, multiconnection races, audit contents, deployed browser identity and recovery were not exercised. Typecheck/build of the entire product was not run. Artifact/CI success is not release acceptance or security certification.

Next: coding agent fixes the five groups while preserving independent assertions; prepare the exact fixed SHA, run A plus affected cases and export a fresh run. Develop real-PostgreSQL/runtime-role and deployed-browser acceptance lanes, then B services/digital, C physical, D rental, E mixed and F resilience. Source promotion/check wiring is still required under BUG-0008. No test.fails/skips/error swallowing for known critical product failures.
