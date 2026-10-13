# BUG-0012 — statement-date parser accepts impossible calendar dates

Status: reproduced pure parser contract; downstream import/commit impact not yet established. Severity: provisional P2 financial import validation. Product6a48cee; F-004. `parseStatementDate('2026-02-30')` returned the same impossible ISO date rather than an invalid parse result. Test stopped at that first failure; further malformed-date examples in the case are not claimed executed.

Required work: validate real calendar year/month/day including leap years for every format and serial/date-object path; preserve approved ambiguous-date convention. Invalid values must produce an actionable validation outcome, never silently invent or roll over bank dates. Verify downstream preview/commit validation and prove no malformed line becomes a financial posting. Retest valid dates, month/year/leap boundaries and malformed portable fixtures.

Evidence: [deep batch run](../runs/RUN-20261013-deep-batches-09.md). This does not establish a live import corrupted data.
