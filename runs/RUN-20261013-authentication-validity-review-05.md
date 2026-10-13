# RUN-20261013-authentication-validity-review-05 — correct Viewer test actor attribution

Status: completed. This run replaces the pending identity check from the earlier draft.

## Verified session

- Signed out of the Owner session and signed in with the synthetic Viewer account. The sign-in completed into the company workspace.
- The role-loaded navigation labeled all business areas, including Customers and Sales Invoices, as “View only.”
- Staging footer showed build marker `v2.1.0 · 2b92cf4`.
- The team roster had previously shown the synthetic account assigned the Viewer job; the current session’s role-filtered UI then independently showed view-only access.

## Checks

- Customer list was readable. It showed the pre-existing synthetic customer `CUS-0001`, with balance LKR 100; this run did not modify it.
- Direct route `/parties/customers/new` displayed “Cannot create customers” and “Your job can view customers but cannot save them.”
- Direct route `/sales/invoices/new` displayed “Cannot create invoices” and “Your job can view sales invoices but cannot save or post them.”
- Invoice list was readable and showed four earlier synthetic invoices, all archived. No new records were created in this run.

## Conclusions and cleanup

- Current UI behavior denies Viewer customer creation and invoice creation/posting on the observed build marker. The earlier run 02–04 writes were performed under an unverified actor and remain invalid evidence for Viewer write permissions; those records were already archived.
- BUG-0003 and BUG-0004 should be closed as “not reproduced under verified Viewer session,” while retaining the history that the prior actor attribution was wrong. This is UI evidence; backend/API enforcement was not independently exercised.
- No invoice was saved or posted and no customer was created. Existing staging data, including `CUS-0001` and the four archived invoices, was left untouched.
- Image digest, deployed source SHA, schema, and storage identity remain unverified. This is exploratory evidence, not a release acceptance gate.

No credentials, cookies, or password material are included.
