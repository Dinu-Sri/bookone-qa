# BUG-0024: Files restore ignores mismatched data cross-checksum

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: S-0787. After valid data restore, paired files with the same exportId/files checksum but a wrong dataSha256 are accepted. Expected refusal with no writes/completion.

Source investigation: packages/db/src/archive/restore.ts and files.ts: last-data state/guard uses exportId/filesSha256 but omits comparison of pack dataSha256.

Recommended repair/adjacent checks: Persist/read and compare both cross-checksums plus schema/export identity. Define an explicit contract-compatible legacy-metadata policy; no silent weaker acceptance.

## Independent v2.5.5 retest and adjacent omission

The original S-0787 nonempty mismatching-checksum case passes on 8e1a2b8. RT-027 additionally creates an explicitly current v2.5.5 pair, restores data successfully, then removes `dataSha256` from the files manifest. Files restore accepts it, writes one object and sets the completion marker. Expected refusal with zero object writes and no completion marker under RB-ARCH-04. Source restore state contains the checksum, while pack metadata does not. This current-format omission is distinct from unresolved legacy v2.4.0 compatibility question RF-06; do not exempt current pairs by weakening the legacy policy.

Status: original reproduction bounded-fixed; adjacent current-format omission open, P0 integrity gate. [Current PG evidence](../runs/RUN-2026-10-14T11-10-44-786Z-runtime.json). Memory object-store adapter and synthetic sessions do not establish deployed S3/browser restore acceptance.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
