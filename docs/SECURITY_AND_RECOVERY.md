# Security, customer protection, and recovery

This is a test and operating plan, not legal advice or certification. Jurisdiction-specific tax, privacy, and record-retention requirements must be supplied/versioned by the appropriate owner before claiming compliance. No production infrastructure has been inspected.

## Environment contract

The owner authorizes changes to all testing data at https://bookone.clossyan.com and confirms production is not accessible to this agent. Routine staging mutations do not require repeated approval. Record target identity, run-owned fixtures and coordinated resets so tests remain reproducible.

Identify staging database, storage bucket/prefix, email/SMS destinations, webhooks, payments, queues and workers. Disable or sandbox external delivery and chargeable side effects during tests; disposable ERP data does not establish that every connected external service is disposable. Load and fault-injection tests use isolated infrastructure with a bounded workload and stop condition.

## Security test matrix

| Area | Required tests |
|---|---|
| Tenant isolation | Real A/B documents, parties, products, stock, journals, reports, search, attachments and exports; direct IDs and list queries; verify denial and no mutation/disclosure |
| Database enforcement | Actual runtime role, ownership/BYPASSRLS/FORCE-RLS settings as deployed, missing tenant context, pooled/concurrent requests and transaction cleanup |
| Permissions | Owner/accountant/cashier/sales/warehouse/read-only/suspended; direct server actions/API, module ceilings, legal entity/tier, location scope |
| Sessions | Logout/revocation, membership change, stale tabs, tenant switching, removed users, expired invites, password reset and redirect behaviour |
| Privileged operations | Team grants, last owner, company reset, platform tools, health check, seed routes, ops logs and diagnostics; no client-chosen privilege/tenant escalation |
| Inputs/files | Validation, injection, stored output escaping, unsafe uploads/path traversal, file size/type, signed URL access/expiry, CSV formula handling |
| Runner infrastructure | Private runner access, target-host allowlist/SSRF protections, no secrets in DOM/logs/reports, bounded jobs, artifact access and expiry |
| Supply chain | Dependencies/lockfile, secret scanning, permitted actions, least-privilege tokens, untrusted PR isolation, environment separation |

Hiding navigation is never sufficient. A deny test must assert the correct forbidden outcome, absence of protected data, and unchanged protected records. Invalid UUID tests are useful validation checks but cannot replace real foreign-object tests.

## Evidence and customer data

Use synthetic company/customer names and sample attachments. Browser traces can include request bodies, cookies, tokens, and personal data; sanitize before archiving or sharing and keep raw capture access narrowly restricted. Record capture source, classification, storage location, checksum, retention/expiry and permitted readers.

Do not transfer production data into staging without an approved anonymization/access process. Do not put public bug reports, credentials, raw statements, or screenshots of customer financials in the public product repository. Minimize public check output to status and non-sensitive identifiers; private details remain in QA artifacts.

Record any accidental exposure separately, restrict access, and follow the owner's incident/credential-rotation procedure. Do not erase the only evidence of a defect before preserving an appropriately redacted record.

## Migration safety

Test fresh install and upgrade from prior supported schemas using frozen historical fixtures. Validate required migration completion explicitly; do not rely on the web process starting. The inspected startup script can continue after migration problems, so this is a first-priority gate.

Before/after comparisons include row counts by tenant/type, critical IDs and links, monetary control totals, outstanding AR/AP, stock quantities/valuation, deposits, audit history, membership, file references and attachment hashes. Explain intended semantic changes through a reviewed migration expectation file.

Rehearse rerunning completed migrations, interrupted migrations, incompatible schema/application combinations, partially applied state, and deployment with concurrent traffic in isolation. Use a single controlled migrator/locking strategy and schema compatibility readiness checks in the proposed deployment design.

Prefer staged compatible schema changes and reviewed data backfills. Never use an untested destructive down-migration as the recovery plan. Code rollback is acceptable only when the previous application is compatible with the changed schema/data; otherwise use a reviewed forward fix or recovery procedure.

## Backup and restore proof

Agree RPO (maximum acceptable lost work) and RTO (maximum acceptable outage) with the owner. No values are assumed here. Inventory what recovery needs: PostgreSQL, uploaded files/object versions, schema version, deployed application artifact, configuration references, encryption-key recovery, and required job state.

Use encrypted, access-controlled backups in a separate failure domain; monitor backup age/completion and retain protected copies according to approved policy. Database and object storage recovery points must be coordinated. Logs or a “backup completed” message are not restore proof.

Perform an isolated drill:

1. Choose a known backup/recovery point and record its database/file versions.
2. Restore to a separate environment; disable outgoing notifications, payments, and production jobs.
3. Verify migration/schema compatibility, start the matching application, and test login/permissions.
4. Compare critical record IDs, totals, AR/AP, stock/fleet/deposits, audit chains and attachment checksums against the checkpoint.
5. Test new transactions after restore; verify retries/queued jobs cannot duplicate restored operations.
6. Measure actual recovered-through time, recovery duration, lost/unrecoverable items and corrective actions.

Run drills on the agreed schedule and after changes to backup, storage, schema, auth, encryption, or deployment. The owner performs production recovery operations; this agent can prepare and test the staging process within its available scope.

## Runtime checks and incident loop

Plan alerts for failed postings, unbalanced journals, orphaned links, subledger/control drift, unexpected negative stock, duplicate operation keys, missing migrations, authorization anomalies, backup age and missing files. Set thresholds from approved rules; some policies allow negative stock or explicit reconciliation bridges.

Detection should preserve evidence and notify the responsible owner through an authorized channel. Do not automatically “repair” financial balances or delete suspicious records. Investigate, apply a reviewed correction, reconcile and add a regression test. No monitoring or messaging integrations have been configured in this planning session.
