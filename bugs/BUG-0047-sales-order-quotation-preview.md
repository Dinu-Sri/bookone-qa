# BUG-0047: Sales-order View shows a quotation template

Current v2.5.8 checkpoint: existing SO400 View now Sales order / Dispatch by and no invalid Edit (list has no edit route). [Retest](../runs/RUN-20261015-v258-live-fix-retest.md). Status **original repro fixed / adjacent generic-preview coverage partial**; no claim all document types/routes/permissions verified. Historical v2.5.7 evidence follows.

P3 open, v2.5.7 /7ffafab, normal Owner. [Run](../runs/RUN-20261015-v257-physical-browser.md), LP257-023.

Convert quote400 to SO-20261015-0001 confirmed, then click View on Sales Orders. Preview says QUOTATION and Good thru while displaying the SO number and correct400/4at100/customer. Expected sales-order/dispatch identity and suitable labels. This is not a demonstrated wrong posting.

Pinned commercial-document-list.tsx:720 uses QuotationSnapshotDialog for the generic preview; quotation-snapshot.tsx:35 hardcodes Quotation, line50 Good thru. Its Edit link is statically hardcoded to /sales/quotations/{id}/edit (line99), a related navigation risk not executed in this run. Use document-type-aware headings/edit destinations and preserve real permissions. Do not claim all other preview types tested. Browser automation pending. RB-UI-01.
