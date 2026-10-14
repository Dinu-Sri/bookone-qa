# Latest executed customer-readiness checkpoint — 2026-10-14

Candidate **v2.5.5 · 8e1a2b8**. [Fresh campaign](runs/CAMP-20261014-113321106-568961.json): **260 passed, four failed, zero skipped/blocked/not-run**. All98 retained units execute with deterministic synthetic fixtures; source60/helper16 and original85 PG assertions pass. New AP race passes. B-115/RT-025/RT-026/RT-027 remain red in two independent PG runs. Read [coding handoff](handoffs/HANDOFF-20261014-v255-adjacent-readiness.md), [gates](memory/customer-readiness.json) and AGENTS.md53–55.

No customer-ready certification;137 full workflows remain unaccepted (58 partial bindings,79 unbound). Next: repair the three issue groups, pin/retest the new candidate, and complete fresh normal-role physical-first and deployed archive A→emptyB workflows. Exact test-account approval and Chrome popup dismissal remain pending. Only disposable source company created; no new users/financial records/archive writes. Historical checkpoints below retain earlier outcomes and pending notes.

# Current readiness checkpoint — v2.5.5, 2026-10-14

Goal active; customer readiness **not certified**. Original repairs pass at bounded source/PG/helper layers. Deeper campaign: **256 passed, four failed, four skipped**, no infrastructure blocks; PG86/90. Read [coding handoff](handoffs/HANDOFF-20261014-v255-adjacent-readiness.md), [campaign](runs/CAMP-20261014-111034220-9ed0bc.json) and [readiness gates](memory/customer-readiness.json). BUG-0031 batch partial effects, BUG-0032 changed-key payload false success and BUG-0024 current missing-checksum variant remain open. AP concurrency and all85 original PG cases pass.

Portable synthetic bank fixtures execute all98 unit assertions locally with zero skips; campaign-v2 fingerprint now includes their byte hash. Fresh CI pending. Whole137-workflow acceptance remains zero (58 partial bindings,79 unbound). Staging stamp observed v2.5.5 · 8e1a2b8; normal-role/physical/real restore still pending. Specific account-role approval and Chrome extension popup dismissal are pending; company created, no new users/financial records/archives. No reset SQL.

The entries below are historical checkpoints; use this checkpoint and immutable fingerprints for current state.

# Customer-readiness wave2 — adjacent boundaries

Original v2.5.5 unchanged campaign255pass0fail4optional skips; original85real-PG/16helper/60source assertions pass. Read CAMP-20261014-105045793-99e923 and CHG-payment-archive-boundaries. Added5adjacent cases, now90PG/264campaign slots; first execution pending. B-115 is one new partial binding, full137-workflow acceptance still0. Platform-admin fresh login/source company created; normal Owner/Admin/Viewer accounts awaiting specific access approval after browser auto-review rejected creation. No staging financial writes/archives/reset; credentials remain private.

# v2.5.5 first retest — bounded repairs pass

First unchanged CI campaign250pass/5fail/4optional skips. All85original real-PG commands and16archive helpers pass, including original13failed cases/0021–0030 repros; full bug closure still needs declared live/security/storage layers. Five source-B failures traced to missing pgClient adapter export, independently diagnosed. Added actual tagged SQL on same PGlite transaction with commit/rollback/nested controls (3pass) and explicit server-only framework marker. First aligned localB15/1 marker failure preserved; final localB16/0. No business expectation changed. Fresh whole-campaign CI pending; read CHG-v255-retest and customer-readiness ledger.

# Customer-readiness goal active — v2.5.5 retest

Owner asks to achieve customer readiness. Read memory/customer-readiness.json and changes/CHG-20261014-v255-retest.md. Source and required live stamp deliberately pinned **v2.5.5 · 8e1a2b8**; cumulative diff inspected. Existing259 slots and137-workflow scope preserved. First unchanged isolated campaign pending; no reported fix independently closed. No live mutations in this preparation.

# Rulebook established — 2026-10-14

Rulebook1.0.0:57 rules / 35 sources,27 inherited BR IDs retained. Read docs/rulebook/README.md and RULES.md before new expectations; owner delegated professional product defaults, with Sri Lankan source/applicability and independent expert status explicit. Ten POL topics now have rule links/defaults plus narrower review gaps. RF-01–10 remain for expert/implementation review. Existing product assertions/results and pin5becb2d were not changed. New master9b8e443/v2.5.4 archive diff observed, untested here; no live staging stamp/mutations. RULEBOOK source/governance validation only, not product acceptance.

# Start every BookOne QA session here

Canonical memory is versioned in this repository. Read the current reviewed branch, not an old local checkout or chat summary. If main has a pending implementation pointer, inspect that PR/head before starting; never silently treat pending work as merged.

Current reviewed campaign:259 slots,242 pass/13 fail/4 optional skips; no infrastructure blocks. Original60 source and49 DB core still pass; deeper tests expose nine new groups0022–0030 plus contained0021. Read RUN17, docs/FULL_CAMPAIGN.md, latest CAMP in programme and HANDOFF-20261014-full-campaign-findings. Full137 workflows remain unaccepted (57 partially bound,80 unbound); policy question pending. Current live image must be freshly verified; last tab text did not expose a stamp. No live mutations in this campaign.

Current candidate v2.5.3/5becb2d matches the observed live sidebar. Read docs/TENANT_ARCHIVE_QA.md, batches/backup-restore.json, catalog/backup-assertions.json, RUN-16 and HANDOFF-20261014-backup-plan. All60 source and49 PostgreSQL checks pass on the candidate; physical0018/19/20 have bounded fixes at Owner and non-owner DB roles. Archive helpers15/1 reproduce BUG-0021/S-0764 (RBAC-off Admin resolver); route exposure not established. All45 full backup/overlay scenarios and actual data/files restore remain unverified. Existing all-businesses physical-first scope,42-row matrix/92 lifecycle tasks and prior immutable runs remain authoritative for remaining work. No release acceptance or staging writes in RUN-16.

Configuration and files: read docs/CONFIGURATION_AND_UPLOAD_COVERAGE.md and run `pnpm matrix:check`. The matrix is a specification, not acceptance. The PostgreSQL lane is `pnpm runtime:prepare` then `pnpm runtime:run`, using only a fresh isolated PostgreSQL16 service; see docs/POSTGRES_RUNTIME.md. Never reuse a live staging DB or substitute owner-connection action passes for non-bypassRLS acceptance.

1. Read AGENTS.md, STATUS.md, memory/programme.json and the relevant batch manifest. `pnpm session:start` prints this entry point and the next actions.
   For B–F read docs/DEEP_BATCH_PROGRAMME.md, batches/coverage.json and memory/policies.json; `pnpm batch:coverage` gives compact implementation/gap counts. Select `--batch B` through F explicitly; resume/export recover the saved batch. Physical C runtime is implemented partially; next repair/retest its ownership/atomicity/approval failures, then remaining C settings/location/race/file/live layers. B credential/browser layers remain open; do not substitute calculation-only copies for actual commands.
2. Record product/QA SHA, content hash, fixture version, environment and actual role. Verify graph extraction content, not just checkout metadata. No previous pass certifies the new candidate.
3. Check incomplete `.local/batches/*/state.json` if this workspace has private run state. If not, read committed `runs/` summaries. Private raw logs/credentials are intentionally not portable through Git.
4. Plan with `pnpm batch:plan`. Run `pnpm product:prepare`, then `pnpm batch:run --seed 261013 --profile quick`. These commands execute isolated source/embedded SQL contracts, not staging mutations.
5. The process exits nonzero for product failures, missing tests, blocked/skip cases or runner errors. Inspect the private lane logs; group by actual rule/bug, not by appearance alone. Preserve first failures.
6. Resume only interrupted runs using `pnpm batch:resume RUN-...`. Candidate, QA HEAD/content hash, fixture and batch manifest must still match. Completed runs cannot be resumed; start a new run for a fix or changed candidate. Current lanes restart into empty isolated databases and never replay live payments.
7. Checkpoint after each lane, before editing code, before changing a pin and before stopping. Runner state is automatic; decisions, newly found bugs and fixture cleanup require an agent record. `pnpm batch:export RUN-...` creates an immutable allowlisted `runs/RUN-....json`; review it and commit it. Raw logs remain private.
8. End by updating memory/programme.json and STATUS.md with executed outcomes, failures, unexecuted layers, source/QA identity, evidence link and exact next action. Publish authorized source/sanitized summaries through a reviewed branch. Never overwrite past results or turn a known failure into an expected pass.

If memory is contradictory, prefer the immutable run plus its fingerprint and append a correction. Historical actor-attribution errors in BUG-0003/0004 are already withdrawn. The newer reversal defect BUG-0009 is independently confirmed; retain this distinction.

The current external runner does not need account credentials. For browser phases use authorized fixture secrets locally, explicitly verify the active actor and keep authentication state outside Git. Company names and a roster are not active-user identity.
