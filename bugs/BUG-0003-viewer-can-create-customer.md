# BUG-0003 — Viewer can create customer records

Status: **unverified; prior Viewer attribution invalidated on 2026-10-13**. The browser session's active user was not proven to be the synthetic Viewer. Do not treat the previous runs as a reproduced Viewer permission defect.
Severity: P1 candidate — a user explicitly assigned the Viewer job created a customer. Confirm the intended Viewer permission contract with the product owner before treating the severity as final.

## Environment

- Target: `https://bookone.clossyan.com` staging.
- Test account: synthetic staging user assigned the company job `Viewer`; its password and account identifier are excluded.
- Starting customer list was empty. No existing customer or financial record was changed.

## Reproduction and result

1. Sign in as the synthetic Viewer.
2. Open `/company/team`; the account appears with job `Viewer`.
3. Open `/parties/customers/new`; the form exposes Save customer.
4. Enter synthetic code `QA-VIEW-20261012` and synthetic name `QA Viewer Access Probe 20261012`, then save.
5. The UI reports “Saved successfully” and shows the new customer in the active customer list.
6. Archive the synthetic record. The UI reports “Archived successfully” and the active list returns to “No customers found.”

Expected if Viewer is read-only: reject the write on the server and show a permission-denied message.
Observed: Viewer created a customer successfully. The record was then archived; no invoice or financial transaction was created.

## Source review and limits

The codebase-memory graph for the local BookOne checkout was indexed at `7b1794fd3c2344bdfa3e095dd0bb9cb8b9647b16`. In that source, `NewCustomerPage` only requires tenant context and renders `PartyForm`; `createPartyFromForm` validates the submitted fields, requires tenant context, scopes database operations to the tenant and writes the record, but has no server-side role/module write assertion. This is consistent with the staging result. The graph revision is not verified as the revision currently deployed to staging.
The Viewer job's product contract should be confirmed. This check establishes a role-write path on staging, not cross-tenant access or a broader authorization audit.

## Follow-up

- Confirm the Viewer job's intended permissions.
- Enforce authorization in the server action (and corresponding edit/archive/delete actions), not only by hiding UI controls.
- Retest create, update, archive/delete as Viewer and verify that existing authorized roles retain their workflows.
- Add a lasting regression test for server-side denial. Do not close until the same write attempt is denied on a build with identified identity.


## Retest after latest staging update — 2026-10-12

The Viewer role was rechecked on `/company/team`. A second synthetic customer (`QA-VIEW-20261013`, `QA Viewer Update Retest 20261013`) was submitted through `/parties/customers/new`; the customer appeared in the invoice picker and active customer list. This repeats the finding after the owner reported a new update. The record was archived after testing. The deployed build identity is unknown, so the update cannot be tied to a commit or image.


## Third retest — 2026-10-12

After another owner-reported staging update, the account remained assigned Viewer and again created a synthetic customer (`QA-VIEW-20261012-R3`, `QA Viewer Retest Three`). The active customer list showed the record. It was archived after the probe. The deployed build identity remains unknown.


## Fourth retest — 2026-10-13 (UI build marker v2.1.0 / 2b92cf4)

The staging UI footer displayed `v2.1.0 · 2b92cf4`. The synthetic Viewer again created customer `QA-VIEW-20261013-R4`, which appeared in the active list. The customer was archived. The UI build marker does not verify the running image digest, schema or storage identity.
