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

27. Drive the ERP UI from this repository with `pnpm agent:browse` (Playwright click-through). Artifacts go to gitignored `.local/agent-browse/`. Do not use the retired BookOne `/e2e` console or `pnpm agent:browse` in the product repo after Wave 1b.


## Actor and source verification after the 2026-10-13 attribution correction

28. Before role-specific mutations, explicitly sign out and sign in with the intended fixture. Record the non-secret actor alias, expected job, login transition, loaded role context and build in the same run. Verify active identity through the supported account UI or harness session where available. Company name and Team roster only describe company membership; they do not identify the current actor. Until a session identity surface is available, fresh explicit fixture login plus loaded role context is the minimum evidence. Stop on unexpected role/session context; invalidate earlier role conclusions when attribution is wrong.
29. Index status/current checkout metadata alone does not prove graph extraction is current. Check for removed nodes and mismatched snippet ranges; use graph discovery first, then verify relevant source against the pinned candidate when stale. Preserve source provenance and label static concerns separately from executed failures.
30. Creation denial does not establish complete write denial. Cover edits, reversals, archive/restore/delete, payments and exports as applicable with real role-owned and foreign-tenant fixtures; denied financial operations must create zero transactions/journals/audit mutations.

## Batch/session memory — effective 2026-10-13

31. Read SESSION.md and memory/programme.json after STATUS.md at startup; use `pnpm session:start` and the relevant manifest. Record implementation versus executed versus accepted evidence separately. Update both indexes before ending a session and commit reviewed sanitized run summaries. Chat history and ignored local folders are not canonical portable memory.
32. Preserve runner checkpoints/first failures. Resume only unfinished isolated lanes at the identical fingerprint; a fix, source-pin change or edited tests requires a new run. Never automatically replay live payments or reset an unidentified tenant to recreate setup. If private state is unavailable, disclose that and resume from committed summaries.
33. Batch A currently provides source, embedded SQL/action and render/workflow contracts. Synthetic session/dimension/framework adapters are explicit; they do not prove real-login loading, full migrations, runtime RLS, scopes, multi-connection concurrency or deployed UI. Never promote those results to release acceptance. Extend real-runtime layers before closing critical bugs or wiring production approval.
34. Keep product failures red and independent from QA-harness validation. Missing/skip/blocked cases and failed subprocesses cannot pass. A batch has fixed expected case IDs; zero discovery fails. Group duplicate symptoms only with evidence of shared cause; preserve original assertion outcomes. Tests may not redefine expected finance values to match a fix.
35. Follow docs/BATCH_TESTING.md and decisions/ADR-20261013-batch-testing.md when extending B–F. Models use independent integer-money expectations, legal and invalid transitions, typed business policies and reproducible seeds. A prior pass is not reused for a changed candidate. Broaden unknown/shared change impacts. Launch scope is still owner-undecided.

36. Deep B–F memory is docs/DEEP_BATCH_PROGRAMME.md, batches/coverage.json, memory/policies.json and memory/programme.json. Keep executable source cases, specified lifecycle tasks, policy blockers and accepted outcomes distinct. Update the task/register/status with exact implementation and run evidence before handoff. A source-only batch pass does not complete an unimplemented lifecycle task. Preserve inherited S IDs and independent review gaps.
37. Run `pnpm batch:coverage`; choose the relevant manifest with --batch, then validate/execute/export. Do not edit product/QA files during a run; content checks interrupt changed fingerprints. No automatic shared staging reset or live payment replay. Source-calculation and embedded session fixtures are declared boundaries, not substitutes for full-schema/RLS/role/race acceptance.
38. Each new critical assertion needs isolated failure-sensitivity evidence before use as a gate. Limited existing posting/rental mutants do not certify unrelated workflows. Keep known product failures red; only fix demonstrated harness defects with preserved first attempts and unchanged business expectations. Pending policy decisions require explicit resolution rather than adopting current product output.

39. Review libraries used by source adapters against the pinned product dependency/lockfile before validation claims. v2.2.1 exposed QA Zod3 versus web Zod4; QA now pins4.4.3 and preserves earlier mismatched evidence. Deliberate library alignment needs a fresh run and dependency hash; do not equate source testing through substitute dependencies with full deployed runtime compatibility.

40. Follow docs/CONFIGURATION_AND_UPLOAD_COVERAGE.md and batches/configuration-matrix.json for company/module/settings/role/scope/file variations. Pairwise plan integrity is not executed coverage; mandatory finance/security combinations run independently of matrix sampling. Include settings transitions, stale sessions, real foreign records/objects and positive controls. Preserve unresolved product policies.
41. Isolated PostgreSQL commands accept only an explicitly selected ephemeral loopback database named bookone_qa_runtime. Preparation requires an empty database; resets require the matching private fixture marker. Never point this destructive fixture at staging/production or a tunnel to another service. Keep runtime credentials and raw logs private. Owner-connection commercial tests, non-owner product-helper RLS tests and credential-login/HTTP/browser/object-storage checks have distinct acceptance boundaries. Complete SQL application is not a prior-version upgrade/recovery test.

42. Shared connection/driver changes require actual pinned-driver query construction and transaction commit/rollback controls (RT-012/013), alongside non-owner helper and business positives. Source mocks cannot certify a reserved client. Diagnose prerequisite failures before attributing downstream finance/authorization bugs; absent observations are not amounts. Keep public diagnostics fixed and allowlisted, with no raw error/SQL/URL/identity passthrough. Preserve first unchanged-manifest attempts before adding diagnostic cases.

43. Scoped transaction adapters require nested savepoint/outer rollback, simultaneous tenant callbacks on distinct connections and nested same/different tenant restoration (RT-014–016). Preserve real own/foreign positive controls. Passing helper tests does not establish every non-owner business action; successful current-schema migration application does not establish prior-version upgrade or duplicate-history recovery.

44. Owner requests all business types, physical goods first (decisions/ADR-20261013-all-businesses-physical-first.md). Preserve service/digital/rental/mixed and settings/users/files/history scope. Physical runtime aliases add100 for a separate non-owner role: they repeat scenarios at a different DB boundary, not distinct new business coverage. Denied/failed operations must preserve business snapshots; separate permitted operational telemetry from business CREATE history. Connection scoping is not transaction atomicity. Do not treat unknown/foreign product IDs as free-text service lines or Viewer creation denial as approval authorization. Use exact new-candidate60-source/49-runtime regressions and expand as coverage grows; all release acceptance remains open.

45. Tenant archive execution follows docs/TENANT_ARCHIVE_QA.md, batches/backup-restore.json and catalog/backup-assertions.json. Verify the exact live stamp before each phase; quote it and distinguish observed from source-only stamps in every run. S-0761–0805 are dedicated workflows, excluded from inherited generic sweeps. Keep full acceptance pending until actual credential/HTTP/browser/data/files integrity evidence exists. Helpers, mapped IDs, green product CI and the 45-second overlay watchdog do not certify restore or timely UI completion.
46. Restore only into a newly created operationally empty target using supported flows. No company-reset SQL, merge or overwrite of trading tenants. Use source/target/role aliases and private synthetic attachment hashes; never publish actual encrypted archives, passwords, cookies, signed/download URLs or credentials. Keep operator DR separate. Record stale-stamp, unavailable-empty-target and tunnel-size blocks explicitly; skips cannot pass.
47. Preserve existing Viewer/allocation/tender/date/SKU/atomicity/reserved-driver and reversal expectations; BUG-0010–0016 are not reopened by planning. Compare all archive contract invariants, including stock/layers and AR/AP/document integrity, against independent expected values. Report resolver/source failures separately from protected-route exposure; a route guard may contain a resolver defect but does not justify weakening its contract test.

48. Owner requested one coordinated campaign across all modules. Use docs/FULL_CAMPAIGN.md and campaigns/full.json; campaign:plan/run/resume preserve fixed IDs, dependencies and fingerprints. Independent source lanes may run concurrently; shared PostgreSQL resets remain serial and isolated. Every92 lifecycle task and45 archive scenario must appear, even without an executable binding. Partial observations never become full workflow or release acceptance. Continue implementation of missing layers; record policy/infrastructure blockers explicitly. Source helpers, seeded identities and memory storage cannot certify credential/HTTP/browser/MinIO behavior.

## Canonical business rulebook — effective 2026-10-14

49. Read docs/rulebook/README.md and applicable RULES.md sections before changing expected behaviour. rules/rulebook.json is canonical and Markdown is generated. Preserve stable IDs/revisions and source SHA/date/applicability. Product code is evidence only; applicable Sri Lankan law and chosen eligible accounting framework take precedence.
50. The owner delegated initial professional defaults; label these adopted-default and independently expert-pending. Do not silently reverse them, copy a second rulebook into product, or approve statutory applicability from implementation. Preserve open conflicts in REVIEW.md. Later material changes use templates/RULE_CHANGE.md, responsible-owner review, compatibility and versioned independent examples.
51. Link rule revisions/version/GitSHA/JSONhash to new specs/runs and product CHGs; related case IDs alone are not verified bindings. Never retrospectively relabel old results. New-company defaults do not authorise migration of existing company settings or posted facts. Check law amendments/effective dates before jurisdictional acceptance.
52. Run pnpm rulebook:render then pnpm rulebook:check; pnpm check includes the rulebook validation. Record expert decisions with reviewer/date/record. Missing expert review, unsupported feature, unresolved framework/legacy contract and unrun full workflow remain explicit acceptance gaps. Keep established finance/security/fault repros unchanged while resolving policy details.

## Customer-readiness continuation

53. Read memory/customer-readiness.json at startup. Readiness requires all declared launch gates, exact candidate evidence, no exposed unresolved P0/P1, and owner/expert decisions where required. Assertion pass percentages and partial workflow counts are not a customer-readiness percentage. Preserve new adjacent failures even when original repairs pass.
54. Use the deterministic synthetic bank fixture generator through test:unit/campaign. Campaign-v2 records actual workbook byte hash and rejects changed fingerprints on resume. Do not substitute customer statements, omit fixtures, turn skips into passes, or weaken original unit expectations. These inputs test parser behaviour, not every real bank export format.
55. Account passwords and archives stay private. If access-change review rejects a new role grant, record the exact recipient/role scope and wait for specific approval; no alternate creation path or password reset to bypass it. Continue independent isolated work while browser or approval dependencies are pending. Record actual created data separately from planned fixtures.

56. Classification fixtures must use supported UI/contract values and assert actual stored product/customer/company settings before interpreting money/tax/permission outcomes. A name, comment or arbitrary VARCHAR value is not evidence of a registered/exempt/standard classification. Preserve invalid first-fixture attempts, correct the fixture explicitly and rerun unchanged expectations; distinguish arithmetic evidence from legal eligibility/format acceptance.
