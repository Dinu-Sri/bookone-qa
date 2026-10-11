# Run record — RUN-YYYYMMDD-NNN

Status: planned / running / completed / interrupted / invalidated.
Acceptance: not-evaluated / blocked / failed / accepted.

## Fingerprint and preconditions

- Product repo/SHA and deployed image/build before and after:
- QA repo/SHA and dependency lockfile hash:
- Environment URL/ID and schema/migration fingerprint:
- Non-secret settings/flags fingerprint:
- Fixture version/seed, profile/tenant/roles:
- Business clock, timezone, currency/tax-rule version:
- Runner/browser version and start/end times:
- Baseline release and compared changes:
- Target authorization: staging test data authorized by owner on 2026-10-11; identify any additional target scope separately.
- Setup assertions and initial control totals:

## Test selection and results

Record every selected scenario, including one that never started.

| Scenario | Rule/profile | Required assertion depth | Result | Attempt(s) | Evidence | Bug/blocker |
|---|---|---|---|---|---|---|
| S-NNNN | BR-... / BP-... | load/mutate/balance plus applicable security/recovery checks | not-run | 0 | pending | pending |

Results: passed / failed / blocked / not-run / skipped / flaky. Distinguish test implementation depth from actual execution. A later successful retry does not hide the first failure.

- Required/selected/executed/pass/fail/blocked/not-run/skipped/flaky counts:
- Selection rationale and excluded scenarios:
- Actual before/after numerical reconciliation:
- Expected outcomes independently calculated from:
- Build/config/fixture interference during run:

## Evidence and cleanup

- Private artifacts, classification, checksums, retention/expiry:
- Created/modified record IDs and isolated database/object prefixes:
- Cleanup completed, preserved evidence and remaining records:
- Any interrupted action whose completion is unknown:
- Decision and reviewer; next exact action:

Keep completed records immutable. Add a new run for retests and corrections.
