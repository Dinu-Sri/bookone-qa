# BUG-0008 — validation failures do not gate image publication

Status: confirmed current workflow configuration defect (source review). Severity: P1 release safeguards.
Source: 2b92cf40a3d258dcfc29655759d37b0c32aaebbf.

`.github/workflows/production-check.yml` lines63–85 uses both `|| echo` and continue-on-error for lint/typecheck/build/test. Actual failures can become successful steps, and the message mislabels failure as “not configured.” A green workflow does not establish these checks passed.
`.github/workflows/docker-web.yml` independently publishes images on master and can trigger redeployment; it has no dependency on successful validation. Current branch metadata also reports master unprotected with no required checks.

Required work: establish real commands for retained product package checks and pinned external QA, remove error swallowing for mandatory validation, and fail when required checks are missing. Build a single reviewed same-SHA dependency chain or verify same-SHA completed required checks before publish/promotion. Keep the external QA design; do not reintroduce inbuilt E2E. Configure branch/release required statuses through owner-approved repository settings; do not conflate repository CI with staging business acceptance.

Acceptance: controlled failing lint/typecheck/build/test each turns required validation red and prevents release publication/promotion; passing same-SHA candidate can publish. No negative workflow experiment, settings change, image push or deployment was performed by this investigation. Local advisory scans are not a security certification.
