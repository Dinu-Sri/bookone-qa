# BookOne customer-readiness status

Customer readiness **NOT certified**. Current candidate source/live **v2.5.8 /cf35da1**, retest in progress. Previous v2.5.7 findings and evidence follow. [Current coding handoff](handoffs/HANDOFF-20261015-v257-physical-browser-findings.md), [actual browser run](runs/RUN-20261015-v257-physical-browser.md).

New physical-browser slice: **23 bounded manual assertions,19pass/4fail**. Posted business figures reconcile: cash950/AR150/AP400/stock7/value420/profit120, six balanced journals. Purchase receipt/bill does not double stock; source-linked return restores60cost; AR/AP aging and+10/-4/+1stock movements agree. Oversell/overpayment attempts leave checked state unchanged. This is one non-VAT uniform-cost/qty-only-GRN Owner fixture, not complete physical or137-workflow acceptance.

**New open findings:** P1 [BUG-0048](bugs/BUG-0048-balance-sheet-unclosed-earnings.md), Balance Sheet shows assets1520 versus liabilities+equity1400, omitting profit120; P2 [BUG-0045](bugs/BUG-0045-customer-receipt-server-render.md), committed receipt150 leads to server-error page, repeat read-only failure; P2 [BUG-0046](bugs/BUG-0046-first-vendor-alternative-required.md), first vendor alternative blocked by required primary input; P3 [BUG-0047](bugs/BUG-0047-sales-order-quotation-preview.md), sales order preview labelled quotation. P2 BUG-0044 policy links remains open. No demonstrated data loss. One502 recovered on reload, retained as environment flakiness.

Earlier [300-check result](runs/CAMP-20261015-030413695-b7f7f0.json) and [126PG](runs/RUN-2026-10-15T03-04-19-509Z-runtime.json) remain immutable. **New RT-060 fails independently**: [301-check campaign](runs/CAMP-20261015-070624689-f091fa.json)300pass/1fail, [127PG](runs/RUN-2026-10-15T07-06-31-692Z-runtime.json)126pass/1fail, no infrastructure failures. Only report earnings assertion fails; all original300 still pass. Never call earlier300 complete acceptance or hide new P1. Full137 workflows62partial/75unbound/zero fully accepted; expert RF-01-10/operator recovery and remaining real roles/files/history still open.

Chrome popup resolved. P257-Owner owns actual new P257-Physical company. Inventory alone enabled under existing Starter plan; broader Pro/environment save was rejected, narrower accepted. Fresh Owner login verified. Private credentials/IDs/write journal in ignored .local/live-v257/. Already posted capital, PO, GRN, bill, quote, order, invoice, receipt, credit and supplier payment; do not replay them or overwrite the company. Current UI Balance Sheet.

Next: retain RT-060 failure and hand off fixes; independent physical GRNI-on BEFORE receipt, variable costs, partials/locks/roles; then service/digital/rental/mixed/settings/files/history. **Actual backup/restore LAST**. No company-reset SQL/production access/public secrets. Read SESSION.md and customer-readiness/programme ledgers.

## Candidate retest now in progress

Live/source **v2.5.8 /cf35da1** independently confirmed. [Change](changes/CHG-20261015-v258-independent-retest.md), [live checkpoint](runs/RUN-20261015-v258-live-fix-retest.md). Existing Balance Sheet/receipt/SO display now look correct and journals remain6/debits2750; no new payment. Unchanged301/127PG and first-PO/adjacent checks pending. Earlier v2.5.7 failures above remain immutable; do not close them from implementation alone.
