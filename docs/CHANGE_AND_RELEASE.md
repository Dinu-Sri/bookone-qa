# Change awareness and release evidence

Proposed workflow; not yet connected to GitHub or a deployment system. Production remains owner-managed and outside this agent's access.

## Immutable candidate identity

Every run pins:

- Product repository and full commit SHA; candidate/merge commit identity, not only branch name.
- Public QA repository and full commit SHA, dependency lockfile, runner/browser version.
- Deployed image digest/build SHA and schema/migration set/checksums.
- Environment URL/ID, tenant/profile IDs, role, module/feature flags, relevant non-secret configuration fingerprint.
- Fixture version/seed, business clock/timezone/currency/tax-rule version, start/end time, selected/excluded scenario IDs.

Hash only a documented allowlist of non-secret settings. Do not export secrets or reusable authentication material to construct a fingerprint. Verify application build identity before and after the run. A mid-run deployment, schema change, conflicting data reset, or relevant flag change makes the run inconclusive for release.

Use `templates/run-manifest.example.json` as a design starting point. Never leave unknown identity fields blank and call a release verified. CI must validate a schema, expected scenario list, completed assertions, and evidence completeness once implemented.

## How development reaches QA

1. The development agent reads the product integration instructions and the relevant versioned QA rule contract.
2. Before changing behaviour, record intended before/after examples and impacted rules. During implementation update the change record with actual changes, migrations, flags, dependencies, risks, and scenario IDs.
3. A trusted workflow reads the actual Git diff, migration files, dependency/config changes, PR metadata, and QA mappings. It compares these with the author's account; missing declarations are gaps, not evidence of no impact.
4. Compare the candidate against both the last verified staging baseline and last owner-approved production baseline. If a baseline is not known, establish one with a broad run; do not claim a small incremental diff covers unknown history. Fetch sufficient history because the planning clone is shallow.
5. Use graph callers/callees plus manually maintained dependency/rule mappings. Dynamic SQL, settings, migrations, and runtime configuration need extra analysis; absent graph edges cannot prove safety.
6. Select tests as **mandatory core + affected behaviours + dependent behaviours + regression bugs + risk-specific suites**. Unknown impact expands the selection.
7. Run tests against the exact candidate; record immutable results; return a trusted required check associated with that SHA. Changes to product or QA after the run need fresh evidence.

For a new feature, QA acceptance changes may be a companion PR in the public QA repository. Pin the pair of product/QA commits in the release manifest and do not rely on floating `main`/`master`. Keep compatibility rules for older product versions and migration tests.

## Example impact mapping

| Changed area | Minimum extra scope |
|---|---|
| Posting builders, money precision or account lookup | All money profiles, taxes/discounts/returns, subledger/GL, historical values |
| Tenant/session/DB helper or permission catalog | All roles, real cross-tenant reads/writes, pooled/concurrent isolation, files/reports |
| Commercial document states | Sales/purchase conversions, approvals, partials, payment allocation, stock, rental links |
| Shared form/button/submission helper | All representative forms, pending/error recovery, duplicate/retry posting, keyboard behaviour |
| Inventory/rental | Availability, stock valuation, sales/purchase/POS, dispatch/returns, wash/repair, deposits |
| Migration/schema/startup | Empty install, upgrade, failure/restart, data preservation, old/new compatibility, recovery |
| Imports/parser/reconciliation | Fixture formats, malformed/large inputs, signs/dates, duplicate imports, matching and ledger scope |
| Exports/printing/logging/storage | Accuracy, access control, file visibility, injection/redaction, retention and historical documents |
| Dependencies, Docker, deployment, flags | Reproducible build, startup/readiness, authentication, critical journeys, relevant performance/security |
| Tests/catalog/adapters | Prior regression preservation, changed expectations review, assertion failure demonstration |

## Release gates

| Gate | Required evidence |
|---|---|
| Identity | Product/QA/environment/schema/fixture fingerprints match the candidate |
| Build | Required install/build/typecheck/lint checks genuinely fail on errors |
| Critical behaviour | All mandatory financial, stock, tenant and access assertions execute and pass |
| Change scope | New/changed and dependent behaviour covered; removed/deferred features have explicit decisions |
| Business acceptance | Required supported profiles and high-risk combinations pass |
| Data/upgrade | Historical fixtures and required migration/recovery checks pass |
| Review | Test expectation changes, security implications, and unresolved defects reviewed |
| Handover | Evidence archived; deployment/recovery instructions compatible with candidate |

Default blockers: financial corruption, cross-tenant disclosure or mutation, lost records, duplicate financial posting, missing critical assertions, unknown deployed build, incomplete migrations, and failure of required recovery checks. A skipped/blocked P0 is a blocker. Do not average it away with hundreds of passing smoke tests.

Known non-critical defects may have an explicit owner-approved exception with scope, rationale, expiry, mitigation and retest condition. This does not convert a failed test to pass. Required security/data-integrity protections should not be waived through a casual agent note.

## Enforcement outside agent prose

Use protected branch/ruleset requirements and a trusted QA status-check producer. GitHub supports required checks and restricting their expected source; configure this with the repository owner's available plan/settings. A markdown instruction alone cannot prevent another agent from merging or bypassing checks. See [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

Implement one final acceptance check that always runs and explicitly fails for missing, cancelled, skipped, neutral, incomplete, or flaky required test results. GitHub branch protection can accept skipped/neutral checks; a workflow badge alone must not determine QA acceptance. Test failure propagation deliberately.

The owner-managed production pipeline must require the verified release manifest and promote the tested immutable artifact, rather than rebuilding whichever commit is at a moving branch tip. Verify actual Portainer/GitOps behaviour before adopting this change. Until that integration exists, QA reports are advisory and must be labelled that way.

A public product repository must not expose credentials for a public QA repository or staging. Use a narrowly scoped trusted service/GitHub App or owner-configured workflow. Never run untrusted PR code with staging/production secrets; secret-bearing tests belong in an isolated authorized candidate workflow, with restricted network access and credentials. Keep production credentials entirely outside this QA workspace. Review [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use) during implementation.

## Every session and every failure

Start by identifying the target and last verified baseline. Save selected tests and preconditions. On failure, preserve evidence before cleanup, classify product/harness/environment/requirement, reproduce with minimal steps, and add a bug. Keep suspected cause separate from observations.

When fixing a defect, retain the original failing evidence, identify the fixing SHA, rerun the exact reproduction and adjacent workflows, and add the durable regression assertion. Reopening a bug does not overwrite its old history.

End with STATUS.md: completed run IDs, pass/fail/blocked counts, bugs, configuration changes, created records/cleanup, and the next executable action. Unfinished runs remain unfinished.

## Workflow contract companion

For feature,edge-case and materially changed behaviour,follow [workflow protocol](workflows/PROTOCOL.md) and [WORKFLOW_CHANGE](../templates/WORKFLOW_CHANGE.md). Map actual diff to rules/families/variants/existing tasks,include dependent hybrid paths,mandatory core and risk controls. Unknown impact broadens. Revised expectations require independent review;record impacted prior acceptance as stale,not retrospectively rewritten. Metadata checks do not replace actual candidate business evidence or trusted release enforcement.

