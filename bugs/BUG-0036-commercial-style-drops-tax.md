# BUG-0036: Invoice style disables VAT for an explicitly taxable registered supply

P1, launch-critical tax applicability gate open. Candidate **v2.5.5 · 8e1a2b8**, RT-035; rule RB-LK-01. Synthetic fixture is explicitly a VAT-registered supplier, standard taxable domestic service, unregistered customer and price100 excluding tax. It is not an assertion that every service/customer/entity is taxable.

## Fixture validity correction before acceptance

Initial run stored unsupported product taxStatus=`taxable` and customer registration was a name/declaration, not an explicit stored status. Product UI supports `standard` and party status `unregistered`. The first result was provisional and stays immutable. Corrected [PG follow-up](../runs/RUN-2026-10-14T12-20-56-750Z-runtime.json) now asserts/observes productStandard1/customerUnregistered1 and still reproduces tax0/total100 versus18/118. Status: **confirmed at bounded command layer on supported fixture**, not a statutory eligibility/format or real-login certificate. Other initial arithmetic positives did not certify classification.

Changing only invoiceKind to commercial creates total/AR100, tax0, output VAT0. Independently expected taxable result is100+18=118, output VAT credit18, AR118. Tax-invoice arithmetic positives pass; the style-selection path omits the liability. Source loadSalesVatConfig/effectiveVatRate gates VAT on invoiceKind rather than underlying taxable classification.

Rule inference is supported by [IRD VAT overview](https://www.ird.gov.lk/en/Type%20of%20Taxes/SitePages/Value%20Added%20Tax%20%28VAT%29.aspx?menuid=1204) and [VAT Act section20(6)(a)](https://www.ird.gov.lk/si/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14%5BE%5D_2002_%28Consolidation_2025%29.pdf): a registered supplier's taxable sale invoice to an unregistered recipient includes tax even though it is not a tax invoice. [2026 amendment](https://www.ird.gov.lk/en/publications/Value%20Added%20Tax_Acts/VAT_Act_No_14-2026_E.PDF) was inspected; no section20 amendment observed. Checked2026-10-14. No full expert/statutory applicability or invoice-format certificate is claimed.

Repair separates legal supply classification/rate/price mode from invoice presentation. Preserve explicit exempt/zero/out-of-scope distinctions, effective dates, original credit tax snapshots and registered/unregistered positives. Unsupported classifications/price modes need explicit rejection/support decisions, never silent zero VAT. Do not declare this fixed by globally taxing exempt/export supplies or deleting the commercial mode without a reviewed scope/contract change.

[PG](../runs/RUN-2026-10-14T12-05-27-247Z-runtime.json), [campaign](../runs/CAMP-20261014-120513142-57ddba.json). Isolated real SQL/product commands, synthetic session/owner connection; credential/UI and specialist applicability remain open. No staging writes.

## v2.5.6 bounded retest - 2026-10-15

RT-035 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
