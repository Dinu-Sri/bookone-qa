# Start every BookOne QA session here

Canonical memory is versioned in this repository. Read the current reviewed branch, not an old local checkout or chat summary. If main has a pending implementation pointer, inspect that PR/head before starting; never silently treat pending work as merged.

Current candidate v2.2.3/0d902d5 has60 source passes but a confirmed reserved-client Drizzle constructor regression, BUG-0017. Current runtime manifest20; first unchanged18-case attempt is preserved. Read RUN-13 and HANDOFF-20261013-v2-2-3-runtime before continuing. Do not reuse v2.2.2 action passes or interpret upstream failures as re-reproduction of old race/report defects.

Configuration and files: read docs/CONFIGURATION_AND_UPLOAD_COVERAGE.md and run `pnpm matrix:check`. The matrix is a specification, not acceptance. The PostgreSQL lane is `pnpm runtime:prepare` then `pnpm runtime:run`, using only a fresh isolated PostgreSQL16 service; see docs/POSTGRES_RUNTIME.md. Never reuse a live staging DB or substitute owner-connection action passes for non-bypassRLS acceptance.

1. Read AGENTS.md, STATUS.md, memory/programme.json and the relevant batch manifest. `pnpm session:start` prints this entry point and the next actions.
   For B–F read docs/DEEP_BATCH_PROGRAMME.md, batches/coverage.json and memory/policies.json; `pnpm batch:coverage` gives compact implementation/gap counts. Select `--batch B` through F explicitly; resume/export recover the saved batch. Start with B-101–103 full lifecycle adapters, not new calculation-only copies of already covered builders.
2. Record product/QA SHA, content hash, fixture version, environment and actual role. Verify graph extraction content, not just checkout metadata. No previous pass certifies the new candidate.
3. Check incomplete `.local/batches/*/state.json` if this workspace has private run state. If not, read committed `runs/` summaries. Private raw logs/credentials are intentionally not portable through Git.
4. Plan with `pnpm batch:plan`. Run `pnpm product:prepare`, then `pnpm batch:run --seed 261013 --profile quick`. These commands execute isolated source/embedded SQL contracts, not staging mutations.
5. The process exits nonzero for product failures, missing tests, blocked/skip cases or runner errors. Inspect the private lane logs; group by actual rule/bug, not by appearance alone. Preserve first failures.
6. Resume only interrupted runs using `pnpm batch:resume RUN-...`. Candidate, QA HEAD/content hash, fixture and batch manifest must still match. Completed runs cannot be resumed; start a new run for a fix or changed candidate. Current lanes restart into empty isolated databases and never replay live payments.
7. Checkpoint after each lane, before editing code, before changing a pin and before stopping. Runner state is automatic; decisions, newly found bugs and fixture cleanup require an agent record. `pnpm batch:export RUN-...` creates an immutable allowlisted `runs/RUN-....json`; review it and commit it. Raw logs remain private.
8. End by updating memory/programme.json and STATUS.md with executed outcomes, failures, unexecuted layers, source/QA identity, evidence link and exact next action. Publish authorized source/sanitized summaries through a reviewed branch. Never overwrite past results or turn a known failure into an expected pass.

If memory is contradictory, prefer the immutable run plus its fingerprint and append a correction. Historical actor-attribution errors in BUG-0003/0004 are already withdrawn. The newer reversal defect BUG-0009 is independently confirmed; retain this distinction.

The current external runner does not need account credentials. For browser phases use authorized fixture secrets locally, explicitly verify the active actor and keep authentication state outside Git. Company names and a roster are not active-user identity.
