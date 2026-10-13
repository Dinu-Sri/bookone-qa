# BUG-0011 — revenue account accepted as payment tender

Latest bounded status: **fix verified at9c17f2b/v2.2.2**. B-011/B-013–015 reject revenue/inactive/void/expense/control/known foreign account and preserve exact custom1101 receipt posting; RT-009/010 verify persisted custom bank/AP posting. [RUN-12](../runs/RUN-20261013-v2-2-2-retest-12.md). Actual browser/HTTP and broader cashbook account state/report paths remain open; historical findings below preserved.

Status: reproduced in isolated source/action contract; deployed UI/API not exercised. Severity: provisional P1 accounting. Product6a48cee; B-011. A posted invoice fixture's outstanding balance was reduced by a receipt allocated to revenue account4000, with persisted changes, instead of rejecting an account that is not cash/bank/tender. Equal debit/credit totals alone do not prove receipt accuracy.

Required work: validate tenant ownership, active state and approved liquid/tender account eligibility in the shared allocation boundary. Support configured legitimate liquid accounts by declared policy; do not restrict by a convenient UI label while leaving the server unchecked. Deny revenue/expense/control/foreign/voided tender accounts atomically. Test cash/bank/card/custom eligible tenders and exact AR/AP, cash-flow, allocation and audit outcomes.

Evidence: [deep batch run](../runs/RUN-20261013-deep-batches-09.md). No actual payment or staging mutation performed.

## v2.2.1 retest — 2026-10-13

At993664b with QA Zod4.4.3, B-011 still fails: revenue4000 accepted as tender with persisted changes. This function was unchanged by the quality fix. Live UI/API reproduction remains unexecuted. See [RUN-10](../runs/RUN-20261013-v2-2-1-retest-10.md).
