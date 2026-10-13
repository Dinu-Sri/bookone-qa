# BUG-0011 — revenue account accepted as payment tender

Status: reproduced in isolated source/action contract; deployed UI/API not exercised. Severity: provisional P1 accounting. Product6a48cee; B-011. A posted invoice fixture's outstanding balance was reduced by a receipt allocated to revenue account4000, with persisted changes, instead of rejecting an account that is not cash/bank/tender. Equal debit/credit totals alone do not prove receipt accuracy.

Required work: validate tenant ownership, active state and approved liquid/tender account eligibility in the shared allocation boundary. Support configured legitimate liquid accounts by declared policy; do not restrict by a convenient UI label while leaving the server unchecked. Deny revenue/expense/control/foreign/voided tender accounts atomically. Test cash/bank/card/custom eligible tenders and exact AR/AP, cash-flow, allocation and audit outcomes.

Evidence: [deep batch run](../runs/RUN-20261013-deep-batches-09.md). No actual payment or staging mutation performed.
