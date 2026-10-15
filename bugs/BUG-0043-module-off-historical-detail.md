# BUG-0043: Owner cannot read an existing invoice after Sales is disabled

P1 open, product v2.5.6 / d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. RT-047; RB-CONFIG-01 revision1 (adopted owner default), BR-DAT-01 and BR-SEC-02. This is bounded synthetic-login, actual non-owner PostgreSQL evidence; real credential/HTTP/browser exposure remains unverified.

Create and post an invoice100 as Owner, disable Sales through the isolated stored module configuration, then deny new invoice and payment commands while retaining authorised historical detail100 and accounting report profit100. The unchanged first RT-047 fails at getCommercialDocument after the new read guard; no history detail/report or final snapshot observations were emitted after that exception. Do not report lost rows, wrong balances or returned amounts from missing observations.

The pinned diff adds assertCanReadCommercialDocument, which requires sales.invoices.read through the normal module ceiling. Sales-off resolves that read grant false even for the otherwise authorised Owner. Earlier v2.5.5 RT-047 passed; scoped/no-read detail denials RT-045/051 and scope-fault denial RT-046 now pass on v2.5.6. Preserve all those security protections. Implement an authoritative historical read policy that respects active membership, read-job authority, explicit denies and record scope while denying new module writes; do not broadly bypass permissions or enable all disabled-module reads.

First [campaign](../runs/CAMP-20261015-015120720-373e0d.json)290pass/2fail; [PostgreSQL](../runs/RUN-2026-10-15T01-51-27-828Z-runtime.json)116/118pass, no infrastructure failures. The other failure B-104 stopped at a source-inconsistent credit fixture and is under a preserved fixture-validity correction; no report arithmetic defect established by it.

Follow-up pending: capture only the known permission denial as historyDenied, still expect0 and all original detail/report/write-deny/snapshot invariants. Product source and rule expectations remain unchanged. No staging mutations, company reset or real account creation.
