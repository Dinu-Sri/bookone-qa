# ADR — risk-based automated batches

Status: strategy accepted by the owner on2026-10-13; Batch A first implementation. Remaining layers/batches are planned.

Manual staging discovery found shared defects with a few transactions. Exhaustive manual paths would be costly and slow. The owner accepted business-rule assertions, generated operation sequences, isolated batch execution, change-aware regression and durable session memory.

Decision: use fast source calculations, SQL/action contract tests, real-runtime integration, representative browser journeys and targeted exploration. Independent integer-money examples/models supply expectations; product totals helpers never compute the oracle. Known bugs become permanent regressions. Combinatorial interaction coverage supplements critical exact outcomes; pairwise coverage is not sufficient for financial/security acceptance.

AI designs rules and diagnoses minimal failures; deterministic runners execute repetitive cases and record outcomes. Most routine execution needs no per-click agent reasoning. Use code changes plus dependencies to select mandatory core and impacted tests; uncertainty broadens scope. Launch readiness is for an explicit supported business profile, not every planned future feature.

Batch A is implemented with live pinned product code, actual Drizzle SQL and disposable embedded PostgreSQL. Session, dimension and Next boundaries are fixture adapters. This yields meaningful source regressions without Docker; it does not exercise a real login, production connection role, RLS, full migration constraints, multi-connection races or deployed assets. These layers remain explicit requirements. No product testing console/HTTP bypass endpoint is added.

Source pin advances65f84c1→2b92cf40a3d258dcfc29655759d37b0c32aaebbf deliberately. Reviewed diff has59 files: cash-sale default4000, permission/catalog/route changes, labels/build identity, GHCR/Docker and backup/version documentation. Existing units must rerun, while A targets the newly observed shared defects. This is not a blanket acceptance of that diff.

The inherited747 scenarios/770 discoveries are retained. Their assertion review proceeds as each domain enters a batch; source reviews and route smoke never become business acceptance automatically.

Framework references: https://fast-check.dev/docs/advanced/model-based-testing/ ; https://pglite.dev/docs/ ; https://csrc.nist.gov/Projects/automated-combinatorial-testing-for-software/software-testing-methodology/dos-and-don-ts-of-testing .
