# OBS-D112 — hire-charge invoice rewrote source order status

Status: first reproduction preserved. Product fix proposed on v2.5.25. Do not weaken the assertion.

Category: product. Severity: high. Rapid04 D-112.

## Evidence

- First observed run: GitHub Actions [41000512103](https://github.com/Dinu-Sri/bookone-qa/actions/runs/41000512103), job 123883563313, Isolated PostgreSQL lifecycle and isolation.
- QA SHA under test: `06a4d4120961210eaf0ca1170642dd649c154613` (synthetic merge, same tree as review base `cf8ddcb38d813226de466873d1679b4051251297`).
- Product pin: `6152aa33b8d4563036fbf5374220417ef320f01b` / live tree-equivalent `e5bb589267035ffb031b6c083f4e911bb7d04aac` (v2.5.24).
- Lane: rental-lifecycle 11 passed / 1 failed (`D-112`). Runtime total 130 passed / 1 failed.
- Failure location: `tests/runtime/rental.test.ts:32:770` on that revision. Assertion `expect(source.status).toBe(before.status)`.
- Test body is preserved byte-for-byte in later revisions (now still `[D-112] agreed damage 200 links hire source without converting it and posts 4450`). Do not accept `converted` or `fully_invoiced`.

## Investigation

- `invoiceHireCharges` posts a sales invoice with `sourceDocumentId` and `linkSourceWithoutConversion: true`, lines without rental `productId`.
- `persistRentalBookings` is not called (no rental product lines). `shouldSkipHireSourceConversion` skipped `status='converted'`.
- The earlier sales-order invoice linking block still inserted `salesInvoiceSources` and set the hire order `status='fully_invoiced'`. That is the first assertion mismatch.
- Charge still correctly keeps `sourceDocumentId` for the link assertion. Apply-deposit updates the charge invoice, not the hire order.
- Adjacent positives D-104 (dirty return, no 4450) and D-117 (Viewer denial) stayed green on the same run.

## Fix and regression

- Product v2.5.25: `skipHireSourceRewrite = skipSourceConversion || rentalBillingOnly` gates both `fully_invoiced` and `converted`. Fully-invoiced runs after persist so after-return billing-only is known.
- QA keeps D-112 unchanged and adds D-113 full six-journal after-return sequence.
- Do not mark closed from this record. Retest on isolated PG16 against the v2.5.25 SHA.
