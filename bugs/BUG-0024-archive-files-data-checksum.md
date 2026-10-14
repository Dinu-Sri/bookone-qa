# BUG-0024: Files restore ignores mismatched data cross-checksum

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: S-0787. After valid data restore, paired files with the same exportId/files checksum but a wrong dataSha256 are accepted. Expected refusal with no writes/completion.

Source investigation: packages/db/src/archive/restore.ts and files.ts: last-data state/guard uses exportId/filesSha256 but omits comparison of pack dataSha256.

Recommended repair/adjacent checks: Persist/read and compare both cross-checksums plus schema/export identity. Define an explicit contract-compatible legacy-metadata policy; no silent weaker acceptance.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
