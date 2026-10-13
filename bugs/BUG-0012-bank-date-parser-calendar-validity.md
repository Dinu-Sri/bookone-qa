# BUG-0012 — statement-date parser accepts impossible calendar dates

Latest status: **partial fix at9c17f2b/v2.2.2**. Original F-004 ISO/slash and new F-009 leap/century/valid textual controls pass. F-010 still fails: `30 Feb 2026` becomes `2026-03-02`; Date.parse fallback rolls invalid named dates forward. First failure stops the loop; other malformed named inputs not claimed executed. [RUN-12](../runs/RUN-20261013-v2-2-2-retest-12.md). Validate components for every accepted format; downstream posting impact remains unverified. Preserve original repro/history below.

Status: reproduced pure parser contract; downstream import/commit impact not yet established. Severity: provisional P2 financial import validation. Product6a48cee; F-004. `parseStatementDate('2026-02-30')` returned the same impossible ISO date rather than an invalid parse result. Test stopped at that first failure; further malformed-date examples in the case are not claimed executed.

Required work: validate real calendar year/month/day including leap years for every format and serial/date-object path; preserve approved ambiguous-date convention. Invalid values must produce an actionable validation outcome, never silently invent or roll over bank dates. Verify downstream preview/commit validation and prove no malformed line becomes a financial posting. Retest valid dates, month/year/leap boundaries and malformed portable fixtures.

Evidence: [deep batch run](../runs/RUN-20261013-deep-batches-09.md). This does not establish a live import corrupted data.

## v2.2.1 retest — 2026-10-13

At993664b F-004 still fails: impossible2026-02-30 accepted by parser. Source function unchanged; downstream import corruption remains unknown. See [RUN-10](../runs/RUN-20261013-v2-2-1-retest-10.md).
