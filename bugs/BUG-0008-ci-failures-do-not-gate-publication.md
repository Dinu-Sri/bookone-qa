# BUG-0008 — validation failures do not gate image publication

Status: confirmed current workflow configuration defect (source review). Severity: P1 release safeguards.
Source: 2b92cf40a3d258dcfc29655759d37b0c32aaebbf.

`.github/workflows/production-check.yml` lines63–85 uses both `|| echo` and continue-on-error for lint/typecheck/build/test. Actual failures can become successful steps, and the message mislabels failure as “not configured.” A green workflow does not establish these checks passed.
`.github/workflows/docker-web.yml` independently publishes images on master and can trigger redeployment; it has no dependency on successful validation. Current branch metadata also reports master unprotected with no required checks.

Required work: establish real commands for retained product package checks and pinned external QA, remove error swallowing for mandatory validation, and fail when required checks are missing. Build a single reviewed same-SHA dependency chain or verify same-SHA completed required checks before publish/promotion. Keep the external QA design; do not reintroduce inbuilt E2E. Configure branch/release required statuses through owner-approved repository settings; do not conflate repository CI with staging business acceptance.

Acceptance: controlled failing lint/typecheck/build/test each turns required validation red and prevents release publication/promotion; passing same-SHA candidate can publish. No negative workflow experiment, settings change, image push or deployment was performed by this investigation. Local advisory scans are not a security certification.

## Retest 2026-10-13 — v2.2.0

Candidate6a48cee is a partial fix: masking removed and same-SHA Tests gate added. Production Check271 quality job fails at Lint, skips Type check/Build, while Docker web image12 succeeds/publishes. workflow_dispatch bypass remains. A-013 split-job adapter corrected; A-014 red, with same-workflow recognition limitation disclosed. Independent CI evidence confirms required quality failures still permit publication. See [RUN-08](../runs/RUN-20261013-v2-2-0-retest-08.md).

## v2.2.1 retest — 2026-10-13

At993664b source quality→publisher dependency, unconditional mandatory commands and no manual bypass pass A-013/A-014, including independent configuration mutations. Actual product CI quality and dependent publish succeeded. Configuration/positive-path fix verified; controlled negative live/manual dispatch and required external QA promotion remain outstanding acceptance. Do not call source/quality green full release certification. See [RUN-10](../runs/RUN-20261013-v2-2-1-retest-10.md).
