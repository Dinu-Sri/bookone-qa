# BUG-0025: Invalid required file bytes are reported as successful restore

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: S-0793. A matching encrypted pack declares a body checksum that its required object does not satisfy; files helper returns success instead of rejecting. Source writes a files-completion audit after skippedInvalid results; marker consequence follows that source path, not a separately completed browser check.

Source investigation: packages/db/src/archive/files.ts skips invalid objects; restore.ts accepts its result and records completion.

Recommended repair/adjacent checks: Validate the complete pack/object count/path/size/hash before completion, reject invalid required objects, and preserve retry after storage failure. Verify real MinIO and UI Missing attachment behavior; memory store alone is not acceptance.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
