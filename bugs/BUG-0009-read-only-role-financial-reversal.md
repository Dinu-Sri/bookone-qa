# BUG-0009 — read-only role can persist a financial reversal

Status: confirmed same-tenant staging authorization defect. Severity: P1; prioritize before release.
Build: v2.1.0 / 2b92cf4. Source: 2b92cf40a3d258dcfc29655759d37b0c32aaebbf.
Run: [RUN-06](../runs/RUN-20261013-finance-investigation-06.md).

A fresh synthetic Viewer login, independently distinct from the preceding Owner session, displayed view-only permissions. A restricted operation nevertheless persisted a reversal journal against a synthetic Owner-created transaction. Existing customer/invoice create-route denials do not cover this separate mutation.

Add explicit server authorization and applicable tenant/dimension checks to the reversal boundary and all entry points; read-only UI must not expose the action. Preserve period locks, accurate accounting and history. The owner received the finding directly; detailed reproduction evidence remains in private ignored local investigation files.

Required acceptance: deny with an existing own-tenant transaction and no transaction/journal/audit mutation; allow intended authorized role; real foreign-tenant/dimension denials; duplicate/concurrent reversal safeguards; no reversal-of-reversal. None of the unexecuted adjacent cases is claimed passing.

All run-owned transactions have supported offsetting reversals. This finding is distinct from withdrawn BUG-0003/0004 actor attribution.
