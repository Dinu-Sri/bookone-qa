# BUG-0030: Restore accepts posted receivable without ledger lines

Priority P0; reproduced in isolated pinned-source PostgreSQL with synthetic authentication. Product **v2.5.3 · 5becb2d**. Actual credential/HTTP/browser exposure is not certified.

Cases: S-0782. Valid crypto/data checksum and supplied empty trial hash accompany a600 posted invoice/AR600 with no journal lines. Restore succeeds, persists one document/zero lines and changes target seed state. Expected integrity refusal and empty target unchanged.

Source investigation: packages/db/src/archive/restore.ts verifies journal debit=credit/trial hash but not document/settlement/subledger consistency; an empty-line journal can look balanced.

Recommended repair/adjacent checks: Validate complete journal/transaction/document/settlement relationships and independent AR/AP reconciliation, plus stock/layer integrity from frozen contract. Reject incoherent archives and roll back seed/identity/data/marker; add valid mixed/manual-bridge policy controls.

[Reviewed runtime evidence](../runs/RUN-2026-10-14T06-33-03-250Z-runtime.json); [full campaign](../runs/CAMP-20261014-063301088-3efa1c.json); [coding handoff](../handoffs/HANDOFF-20261014-full-campaign-findings.md). Original0010–16 assertions/history are retained. No live staging writes or real archive/password publication.
