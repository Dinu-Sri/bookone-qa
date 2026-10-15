# v2.5.9 independent retest

Status: prepared, not executed. No bug closure or release acceptance.

Product candidate: `2e105cd443ce01e31220bfe2d4b4637cdc737b75` / v2.5.9, direct child of the previously tested `cf35da1244e902e4a41291bc409eb0d994ed4e01`. On-screen v2.5.9 stamp has not yet been observed by QA. The coding-agent screenshot is a delivery claim, not execution evidence.

## Independent change review

The 23-file diff changes reporting to separate period P&L from cumulative closing Balance Sheet/trial balance and dashboard cash/AR/AP. Additional-company creation persists Starter flags and seeds the Owner job; permission loading falls back to plan defaults only for empty flags. Company settings actions add authoritative permission assertions. Owner repair now checks an existing Owner membership. Credential lookup uses a new SECURITY DEFINER email lookup before transaction-local tenant scoping. SQL migration 042 is additive; the isolated install must apply all migrations explicitly without ignored failures. No dependency/lockfile change was found in this diff.

Graph discovery returned the old findBookOneUser implementation and no new helpers; review therefore used the exact Git diff and candidate source rather than treating graph contents as current.

## Execution intent

Run the unchanged 303-assertion coordinated campaign and unchanged 26-slot real compiled Next HTTPS suite on fresh isolated CI data. Preserve RT-060/061/062 and all prior financial values, assigned Viewer denials, distinct Owner positives, legacy Viewer no-promotion, legitimate Owner repair, known foreign records, logout/replay, and settings snapshot checks. Run both owner-DB and actual NOSUPERUSER/NOBYPASSRLS lanes. Previously blocked restricted cases execute only if their real own-identity/action prerequisites succeed. Setup errors remain blocked/failing evidence, never successful denials.

First attempts are immutable; a harness incompatibility requires diagnosis and a separate fingerprint, not altered expectations. Existing v2.5.8 evidence remains historical, not relabelled as v2.5.9. No live payments, reset SQL, access grants or company settings changes are authorized by this retest setup. Exact P258 setup approval remains pending. Real backup/restore stays last.

## Expanded impact still requiring acceptance

- Dashboard cumulative totals, report labels, scopes/cutoffs and closed-year boundaries beyond current cases.
- Company Admin legitimate settings, adjacent brands/locations/financial-year/rental guards, and first real additional-company browser operation.
- Migration 042 function ownership, grants, search path, application-role identity access, missing/voided users and tenant-context restoration. Its PUBLIC execution grant and returned identity fields require explicit security review; passing ERP login is not complete database-boundary certification.
- Prior-version upgrade/data preservation and recovery rehearsal; a fresh schema application cannot prove those.
- Deployed browser/proxy/database-role acceptance and all remaining physical/service/digital/rental/mixed workflows.

Rulebook 1.0.0 remains unchanged, JSON SHA256 `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`; expert review and launch gates remain open. Applicable established reporting/authorization/atomicity invariants are unchanged.

Local preflight first failed because backup-plan/catalog candidate metadata still pinned v2.5.8. Both future-plan SHA/stamp fields were deliberately aligned to v2.5.9; no scenario, assertion or past result changed, and no backup was executed. Repeat preflight is a new metadata state, not a product retest.

Next: publish this candidate pin in a QA PR, inspect all first CI attempts, preserve sanitized summaries, and update bug dispositions only from executed evidence.
