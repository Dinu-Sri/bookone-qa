# Coding mission: supported input VAT at PO/GRN-to-bill conversion

Product baseline e741a6a9b68969bfc58be70fb8459de479da2cdd /v2.5.26. Owner requested complete physical/service VAT and nonVAT plus POS; QA must preserve the PO→GRN→bill journey. Source qualification found a missing supported purchase-input-VAT choice. This is source evidence, NOT a live wrong-money reproduction. No financial action has been submitted in V or N; all previous transactions/failures protected.

## Problem evidence

- apps/web/src/app/purchase/orders/new/page.tsx supplies showPurchaseExtras but no showPurchaseVat to CommercialDocNewForm. Direct purchase and cash-purchase new pages DO supply showPurchaseVat.
- apps/web/src/components/module/commercial-doc-screens.tsx:524 exposes invoiceKind=tax_invoice under showPurchaseVat as **Claim input VAT**; commercial means no inputVAT. Purchase-order form has no such supported selector.
- apps/web/src/components/purchase/po-convert-form.tsx exposes Receive goods (GRN)/Create purchase bill with quantities/supplier invoice number but no inputVAT selection.
- apps/web/src/app/purchase/receipts/[id]/page.tsx uses conversion label To purchase bill. components/purchase/commercial-document-detail.tsx:203 only renders tax-profile selectors when convertTo==='sales_invoice'; purchase conversion has no equivalent selector.
- apps/web/src/app/actions/commercial-docs.ts:1879 applies purchaseVAT only when isPurchaseSide && invoiceKind==='tax_invoice' && type!==goods_receipt. convertDocument creates from source profile/options, so a commercial PO/GRN cannot select inputVAT through these purchase conversion forms. The action supports invoiceKind options in principle; exposing the legitimate purchase intent/override is needed.

Expected VAT company18%,10units×60: PO net600/noGL; GRN10units/noGL with GRNIoff; converted bill inventory600,inputVAT108,AP708, no second stock receipt. Ordinary linked supplier return2units before payment reverses inventory120/inputVAT21.60/AP141.60; vendor payment566.40 clears AP. Keep inputVAT terminology distinct from output tax invoice numbering. NonVAT stays no inputVAT and server rejects ineligible explicit claims without posting.

## Required implementation and grouped validation

Provide supported operator inputVAT choice at purchase conversion and/or informational PO intent copied to GRN/bill with a legitimate override on bill conversion. Choose a coherent design; do not fix by posting VAT on a nonposting PO or GRN, silently enable VAT everywhere, or bypass tenant eligibility. Preserve supplier invoice uniqueness, remaining quantities, approval/GRNI behavior, source links, stored-rate returns and no duplicate stock. Existing commercial/no-input purchase path must remain net600/AP600.

Add meaningful original+adjacent tests: registered18%PO→GRN→bill708/input108/qty10 once; direct PO→bill eligible path; explicit no-input bill600; nonVAT claim refusal zero effects; supplier return2/input21.60 and remainingAP566.40; source tax-rate preservation after setting changes; duplicate conversion/source quantity overrun denied with no extra journal/stock. Keep output-sales commercial0VAT/TAX18% and manualPOS regressions passing. Run current QA136runtime/30realHTTPS/fullcheck/affected source contracts and product accounting tests; preserve initial reds.

QA PR104 aligns stale tax fixtures to the already reviewed v2.5.26 contract; do not reintroduce their old expected-commercial-VAT policy. Main business batch is still NOT released; no financial smoke data, no history repair. V/N fixtures are already created and zero-opening masters/settings qualified; do not recreate accounts, repeat grants or alter A/B/original.

Deliver one reviewable product PR with exact candidateSHA/tree/stamp, changed source paths, commands/counts and limitations. **Do not merge or deploy**; owner personally handles deployment. Medium reviews then verifies owner-deployed candidate and prepares the executable combined80point Light batch. All clocks/consumed QA requests stay closed; backup/recovery LAST. No message to another chat is authorized by this file; owner may relay this prompt.
