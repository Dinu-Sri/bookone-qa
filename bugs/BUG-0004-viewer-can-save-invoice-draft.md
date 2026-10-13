# BUG-0004 — withdrawn Viewer invoice draft creation attribution

Status: withdrawn as a reproduced Viewer permission finding; historical actor-attribution error. No current product severity assigned from those attempts.

## Correction and current evidence

Earlier writes happened, but the signed-in actor was not verified. The Team roster's Viewer assignment did not prove the active browser was that account. Historical runs02–04 and their archived synthetic records remain auditable; their claims must not drive product fixes.

On2026-10-13, signed out Owner and freshly signed in synthetic Viewer. Role-loaded UI showed business areas View only; direct `/sales/invoices/new` displayed an ordinary cannot-create message. See [RUN-05](../runs/RUN-20261013-authentication-validity-review-05.md), build v2.1.0/2b92cf4. No new customer/invoice was saved in that verified retest.

Historical source graph at7b1794fd3c2344bdfa3e095dd0bb9cb8b9647b16 was not verified as deployed. Treat its earlier analysis as historical only. UI route denial does not establish complete server-action enforcement; that remains required security coverage.

Historical records: [run02](../runs/RUN-20261012-viewer-permission-retest-02.md), [run03](../runs/RUN-20261012-viewer-permission-retest-03.md), [run04](../runs/RUN-20261013-viewer-permission-retest-04.md). Git history preserves the original report. The **new confirmed financial-reversal authorization defect is BUG-0009**, independently tested with fresh roles; do not merge that evidence with this withdrawn finding.
