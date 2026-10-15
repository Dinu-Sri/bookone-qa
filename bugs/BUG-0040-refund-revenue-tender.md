# BUG-0040: Ordinary refund accepts revenue as tender

P1 open. Candidate **v2.5.5 · 8e1a2b8**, RT-039, RB-PAY-02. Separate adjacent refund path; do not re-open original BUG-0011 payment/cash-sale reproduction.

After paying a100 invoice in cash, submit linked full return with paymentAccountCode4000 (sales revenue). Command succeeds and changes business records while cash remains100/AR0. Expected refusal with no refund/document/journal/audit mutation: tender must be a current-tenant active nonvoid liquid asset, not revenue.

Commercial generic posting resolves the named account but ordinary refund needs the same purpose/ownership/state/scope guard as valid money operations. Repair shared authoritative guard before durable writes; keep cash/bank/card/custom liquid positives and Viewer/module/tenant/period denials.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Actual isolated SQL/product commands with synthetic session; no actual credential/UI attribution or staging writes.

Corrected fixture [follow-up](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json) reproduces acceptance and cash100 unchanged. Original cash-sale/payment4000 denial regressions still pass; keep this ordinary refund path separately tracked.

## v2.5.6 bounded retest - 2026-10-15

RT-039 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
