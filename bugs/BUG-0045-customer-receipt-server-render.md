# BUG-0045: Customer payment commits but receipt page crashes

Current v2.5.8 checkpoint: original read-only receipt150 render repro now passes; journals remain6/debits2750 and no payment replay. [Retest](../runs/RUN-20261015-v258-live-fix-retest.md). Status **repro-fixed / wider retest partial**, not blanket closure: adjacent invoice/remittance and full/multi-invoice receipt/browser combinations remain pending after extension UI blocked automation. Historical v2.5.7 evidence follows.

P2 open, observed v2.5.7 /7ffafab, normal synthetic Owner, disposable staging2026-10-15. [Run](../runs/RUN-20261015-v257-physical-browser.md), LP257-013.

Repro: invoice400, receive150 through invoice Receive payment, cash1000, Record payment once. Browser goes to /sales/payments/receipt and shows server-side application error, digest1987289595. Same page fails on a second READ-ONLY visit. Do not repeat the payment to reproduce. Actual invoice paid150/due250 and exact DrCash150/CrAR150 journal prove the first payment committed. Later credit100 and supplier payment200 give six correct journals; no claimed rollback/data loss.

Expected: receipt renders the persisted/authorised allocation with150 and invoice/customer/date/tender, with no second posting. Adjacent invoice client print preview and supplier remittance render correctly.

Pinned source investigation: apps/web/src/app/sales/payments/receipt/page.tsx imports DocumentPrintSheet directly in a server page. apps/web/src/components/print/document-print-sheet.tsx has no client directive and contains an inline onClick calling window.print() in its toolbar (line45). Server/client event-handler boundary is the leading hypothesis; server logs were unavailable, so exact exception cause is not confirmed. Keep server auth/model validation; isolate the print button in an appropriate client boundary. Do not fix by dropping access guards or treating receipt success as payment acceptance.

Regression needed: actual server-route rendering after real partial/full/multi-invoice receipt, read-only revisit, no duplicate journal/allocation, plus client invoice preview and vendor remittance. Browser automation binding pending. BR-ACC-04, RB-UI-01. No public credentials, IDs or payment links.
