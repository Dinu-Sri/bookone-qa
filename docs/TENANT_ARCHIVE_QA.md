# Tenant archive and form overlay QA

Candidate: **v2.5.3 · 5becb2d**, full product SHA `5becb2dcc768e056e34f8507fc2ecd2a3475e6a9`. Required live sidebar stamp and source identity are separate fields. Confirm the live stamp before every live phase and after deployment/navigation. A changed image invalidates live acceptance. Previous v2.2.4 passes do not certify this candidate.

The pinned product [contract](https://github.com/Dinu-Sri/BookOne/blob/5becb2dcc768e056e34f8507fc2ecd2a3475e6a9/docs/TENANT_BACKUP_ARCHIVE.md) overrides UI copy and the coding-agent message. Read the freeze CHG and the six implementation/fix CHGs listed below. Owner archives recover one company into a new empty tenant; operator `pg_dump`/MinIO DR remains separate. No merge, live overwrite, teammate-password restore or newer-to-older restore is intended.

## Durable catalog and honest coverage

`catalog/backup-assertions.json` specifies S-0761–S-0805; `batches/backup-restore.json` pins the plan. `pnpm catalog:sync` regenerates the appended scenario section and coverage. Existing 747 scenarios and their IDs remain unchanged. All 45 new scenarios require dedicated execution; generic load/priority/tag sweeps exclude them. Every full scenario remains unverified. Sixteen assertions exercise pinned pure helpers with synthetic in-memory payloads, not actual exported files, authenticated routes, PostgreSQL restore transactions, MinIO or browser DOM/timers.

Commands: `pnpm backup:plan:check`, `pnpm product:prepare`, `pnpm test:archive-helpers`. Helper raw JSON/logs stay in ignored `.local/archive-helpers`; only allowlisted case outcomes and fingerprints go to public run summaries. Helper failure is red independently of QA metadata validation. Archive passwords are generated in memory for helper tests; actual archives, credentials, cookies, download URLs and passwords never belong in Git or public CI artifacts.

## Execution order

1. **Read-only gate.** Confirm the sidebar stamp; record a fresh verified actor for each role-specific phase. Current Owner label may also belong to a platform super-admin, so it does not establish normal Owner access. Check Backup and navigation. An existing pair with zero attachments cannot certify file restore or fresh-company NoSuchKey handling.
2. **Isolated core and helper lanes.** On this pin run the unchanged 60 source cases and 49 real PostgreSQL runtime executions. Use only a fresh explicitly marked ephemeral loopback `bookone_qa_runtime` DB. Preserve Viewer/allocation/tender/date/SKU/atomicity/reserved-Drizzle and reversal positives. Keep BUG-0010–0016 history and assertions; do not reopen them merely because the candidate changed. Report any genuinely executed new regression without rewriting old records. Product CI green is not these QA results.
3. **Isolated restore/backend depth.** Implement actual SQL emptiness tests for all 14 trading families, persisted A→B restore and FK/UUID/seed identity assertions. Add mid-transaction faults, invalid stock/layers and AR/AP/document integrity, real pooled role/RLS and controlled concurrent restores. Implement real object-storage partial failure/retry and route guards. Pure helper tests do not replace this phase. Use independent ledger/quantity expectations and failure-sensitivity controls.
4. **Prepare private fixtures.** Create synthetic source A through supported workflows: customer/supplier, physical product purchase/GRN/bill, sale/partial payment/credit/reversal as needed. Use independently recorded counts, debit/credit, AR/AP, quantities/costs and report totals. Attach at least one known receipt and one product/document image; privately hash bytes. Extend source snapshots for service/digital/rental/mixed/POS/recon and configuration variants; these scopes remain part of the wider programme.
5. **Verify identities and denials.** Fresh sign-out/login for normal primary Owner, Viewer, company Admin and platform super-admin aliases. Use actual owned and foreign records/objects, UI and direct protected HTTP routes. Snapshot DB/business audit/S3 before denied requests. Platform Control Room access and company backup privileges are different authorities. Store private account references outside Git; never infer the active actor from Team membership.
6. **Export and empty-B restore.** Owner enters a private password, downloads both encrypted files and verifies matching exportId/schema/checksums privately. Create brand-new target B through supported signup/create flow; retain only signup seed CoA/jobs/owner membership. Do not add products/parties/trading before restore. Restore data, then verify persisted remapped IDs, owner, ledger, stock/layers, AR/AP and UI reports. Repeated restore into B and restore into traded A must refuse with unchanged data. Never restore into Garden Banquet or another traded company.
7. **Files and overlay journey.** Before file pack, books open and receipt displays Missing attachment. Apply matching pack; actual target receipts/images open with original byte hashes. Wrong pair and second apply refuse; existing target sentinel bytes are not overwritten. Check actual Backup/Login/Reverse/Save overlay dismissal, shared server forms and async client flows. Completion must clear promptly; waiting for the 45-second safety timeout is not success. GET filters/search/Cancel must not arm an overlay. Backend counts still guard duplicate posting.
8. **Large-file and boundary lane.** Use incompressible synthetic content so encrypted pack actually exceeds 8 MiB; verify 4 MiB chunks, short final chunk, at/below threshold, interruption, missing/repeated/out-of-order chunks, ownership, expiry and configured limits. Do not publish files. An upload transport limit is separate from archive integrity. Test rate 120-second and download 15-minute boundaries in controlled isolation instead of hammering staging.
9. **Review and checkpoint.** Public report lists each ID, layer, fingerprint, observed stamp, actor alias, expected/actual sanitized amounts/counts and pass/fail/blocked/not-run. Link private evidence only by local alias; no sensitive URLs/bytes. Record first failures unchanged. Acceptance of restore requires a completed browser data+files journey and persisted integrity; code review/unit tests alone never close it. Update STATUS, SESSION and programme before stopping.

## Explicit stop/skip rules

| Condition | Required result | Work that can continue |
|---|---|---|
| Stamp stale, unavailable or different | Block all live tests. Wait for Docker web image and Portainer Re-pull ON; never claim required image from source alone. | Contract/case planning. |
| New empty company unavailable | Block data/files journey and dependent acceptance. No company-reset SQL and no restore into existing trading tenant. | Read-only, roles, isolated helpers/core. |
| Tunnel rejects large upload | Record size, method and sanitized HTTP status; block large-pack transport scenario. Do not reduce assertions or declare full files pass. | Matching small pair and supported chunk path if prerequisites are valid. |
| Unknown/stale actor, changed deployment, lost private pair/password | Stop dependent writes; start a new verified phase/fingerprint. Never silently replay payments. | Preserve sanitized checkpoint and arrange new synthetic fixtures. |
| Contract/implementation differs | Keep assertion and report review concern; no automatic adoption of current behavior as policy. | Independent helper/backend investigation. |

## Change impact and open review risks

Compared with the previous pin, seven commits touch 61 paths: physical SKU ownership/atomicity/approval, migration 041, archive DB modules and routes, permission resolver/templates, Control Room nav, missing-receipt UI, reminder and many form handlers. The graph index metadata is current but new archive symbols are absent and overlay snippets are stale; pinned source is the fallback authority. No dependency/lockfile change appeared in this comparison.

- **Executed helper failure S-0764:** company Admin can receive `company.backup.read/write` from the RBAC-off full-access fallback before privileged-key handling. RBAC-on denies. `requireArchiveOwner` independently checks primary Owner, so actual route exposure is not proven. Keep the test red; investigate resolver/UI and credential routes. This is separate from old BUG-0010–0016.
- **Review risk, not an executed restore defect:** restore source checks journal balance/trialBalanceHash; the contract additionally requires stock/layer and AR/AP/document integrity before committing. S-0781/0782 must exercise independently invalid archives, not infer acceptance from balanced journals.
- **Compatibility question:** legacy restored metadata can lack files checksum in the files-phase CHG, while the frozen contract requires pair checksums. S-0787 must test the actual route and obtain an explicit compatible policy before acceptance.
- **Review risk:** invalid file objects are skipped by the helper. S-0793/0794 must ensure route completion is not marked when required objects are invalid or writes fail; an in-memory no-unsafe-write pass is insufficient.

## Product change records to read at the pinned SHA

- `docs/changes/CHG-20261012-tenant-backup-archive.md` (freeze c3602cf)
- `docs/changes/CHG-20261013-tenant-archive-export.md`
- `docs/changes/CHG-20261013-tenant-archive-restore.md`
- `docs/changes/CHG-20261014-tenant-archive-files.md`
- `docs/changes/CHG-20261014-tenant-archive-backup-nosuchkey.md`
- `docs/changes/CHG-20261014-form-busy-overlay-stuck.md`
- `docs/changes/CHG-20261014-form-busy-overlay-audit.md`
