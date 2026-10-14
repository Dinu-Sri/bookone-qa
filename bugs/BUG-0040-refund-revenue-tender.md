# BUG-0040: Ordinary refund accepts revenue as tender

P1 open. Candidate **v2.5.5 · 8e1a2b8**, RT-039, RB-PAY-02. Separate adjacent refund path; do not re-open original BUG-0011 payment/cash-sale reproduction.

After paying a100 invoice in cash, submit linked full return with paymentAccountCode4000 (sales revenue). Command succeeds and changes business records while cash remains100/AR0. Expected refusal with no refund/document/journal/audit mutation: tender must be a current-tenant active nonvoid liquid asset, not revenue.

Commercial generic posting resolves the named account but ordinary refund needs the same purpose/ownership/state/scope guard as valid money operations. Repair shared authoritative guard before durable writes; keep cash/bank/card/custom liquid positives and Viewer/module/tenant/period denials.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Actual isolated SQL/product commands with synthetic session; no actual credential/UI attribution or staging writes.
