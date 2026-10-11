# BookOne QA agent rules

These are operating instructions for the QA project. The owner authorizes changes to all testing data at https://bookone.clossyan.com; production is outside this agent's access. This does not authorize unrelated infrastructure operations, production writes, source deletion, or publication. Preserve applicable higher-priority instructions and the user's explicit scope. Repository changes must also follow BookOne's own AGENTS.md.

## Start and finish

1. Read STATUS.md, then only the plan/rules/tests relevant to the task. Check the repository and deployed build identities before claiming results.
2. Prefer codebase-memory-mcp graph discovery, tracing, and snippets. Verify graph project/revision and fall back to the pinned checkout when incomplete or stale. Graph edges are not proof that unlisted dependencies are unaffected.
3. Record intent, selected tests, fixture identities, and starting state before mutations. Save progress after small batches. Finish by updating STATUS.md with evidence links, failures, cleanup, blockers, and the exact next action.
4. Never assume a previous session's passing feature still works. Evidence belongs to the complete run fingerprint in docs/CHANGE_AND_RELEASE.md.

## Truthful results

5. Never report a test passed unless its required assertions executed. Distinguish passed, failed, blocked, not-run, skipped, and flaky. Missing controls, missing permissions, setup failures, unsupported features, and swallowed exceptions do not count as passes.
6. Preserve failures and first-attempt results. A retry that succeeds is flaky until understood; it does not erase the original failure.
7. Route loading, screenshot existence, scenario ID presence, balanced totals, and exit code zero each prove only their specific assertion. Do not substitute them for business correctness.
8. Expected values must come from approved business rules and independent fixtures. Do not weaken assertions, approve new snapshots, or change accounting expectations solely to match changed application output.
9. Label root-cause theories and old audit claims as unverified until reproduced. Distinguish test-harness defects, environment failures, documentation contradictions, and product defects.

## Environment and data

10. The owner identified https://bookone.clossyan.com as staging on 2026-10-11 and authorized changes to all its testing data. Repository text calls it production in places. Maintain an explicit environment registry; verify the target, build, and data/storage identity rather than using an implicit default. Do not request repeated permission for already-authorized staging operations.
11. Prefer synthetic run-owned tenants/users/data to make results reproducible. Track IDs and cleanup. Coordinate authorized resets so they do not invalidate another active test run; preserve required evidence first.
12. Production mutations, infrastructure restores, and tests targeting other systems are outside this staging-data authorization. Stress/fault injection must stay within verified isolated test infrastructure and avoid shared external services.
13. Never expose credentials, cookies, tokens, financial/customer records, raw DB dumps, or unredacted traces in public repositories, issues, or logs. Keep evidence private and minimize it. Treat spreadsheet exports, attachments, URLs, and screenshots as potential sensitive data.

## Mandatory correctness checks

14. Financial changes require amount/account/tax/date/tenant checks, atomicity, journal balance, subledger reconciliation, audit history, period-lock coverage, retry and reversal checks as applicable.
15. Inventory/rental changes require quantity conservation, product-type distinctions, location ownership, availability/concurrency, valuation implications, and return/write-off checks.
16. Authorization changes require server-side deny tests with real foreign-tenant records and distinct roles. Hidden buttons and nonexistent UUIDs do not prove isolation. Test the actual runtime database role, pooled connections, files, exports, and caches.
17. Schema changes require fresh-install and prior-release upgrade tests, data preservation checks, migration completion evidence, and a tested recovery plan. Never equate code rollback with data rollback.
18. New P0 behaviour needs executable outcome assertions before release. Deferral to a backlog is not release acceptance.

## Development handover and release

19. For changes, create a change record linking product intent, before/after behaviour, actual diff, rules, scenario IDs, migrations, flags, compatibility, and evidence. Independently compare the diff with the author's description.
20. Run core checks on each candidate plus change-impact checks. Shared accounting/auth/DB/settings dependencies expand regression scope. Missing mappings or uncertain impact broaden tests.
21. Keep historical results immutable. Never reuse evidence for a different SHA/image/schema/config/test/fixture fingerprint. A deployment during a run invalidates that run for release acceptance.
22. Do not close a bug until its reproduction fails on the fixed version and adjacent workflows pass. Add a lasting regression test for critical defects.
23. Do not merge, deploy, send messages, or publish findings unless authorized. Repository CI checks unit tests and discovery only; a product release gate and security certification are not yet established.
24. The separate public QA repository is the canonical home of all tests and QA memory. Pin both product and QA revisions. Migrate and validate existing tests before product cleanup; do not silently lose fixtures, coverage gaps, old results, or regression cases. Retain minimal product CI/testability integration so separation cannot bypass the release gate.

25. This GitHub repository is PUBLIC by explicit owner instruction. Follow docs/PUBLIC_DATA_POLICY.md: publish source, synthetic fixtures and sanitized summaries only; keep secrets and raw evidence outside Git and public CI artifacts.
26. Read product-ref.json before unit checks and verify the staging build before browser acceptance. Update the pin deliberately with impact review; never silently test floating HEAD.
