# P1 — valid discounted taxable full return is refused

Livev2.5.14 · a36af04, producta36af042753f3ad8b40246d6cd579deac9233ba7; freshQA N141710/owncompany/Owner. Related SRC-N14-TAX and WB-HYB.J02.C09. This is synthetic configured-tax arithmetic, NOT legal VAT eligibility, registration-number or statutory invoice certification.

1. Read SalesSettings:rate18/export0/department01/VATregisteredfalse. Set ONLY VATregisteredtrue,save,reloadverifytrue.
2. New explicitTAX invoice:manualservice3@100,line10%,header5%. Net270−13.50=256.50;VAT46.17;gross302.67. Saved INV-20261018-0005 /26OCT_01/1,open302.67. JournalDrAR302.67/CrRevenue256.50/CrOutputVAT46.17.
3. New source-linked return, fullqty3. PreviewSubtotal270/Discount0/Total302.67: source header13.50 is lost in the displayed economic components.
4. Save once →explicit “This return exceeds the remaining value on the original invoice.” No new return; list stays10returns. Source remainsopen302.67/paid0/due302.67. Journal remains18/debits3849.56 at that checkpoint.

Expected: permit legitimate full return using original net256.50/tax46.17/gross302.67 and source discounts; reverse source amounts exactly. Gross and net residuals must be handled consistently, including prior-return tax allocations. Pinned caller passes source gross total to net residual helper, then posting derives supply/tax again; resulting318.60 is a source-derived explanation, NOT an observed saved return.

Adjacent control: separate no-header TAX invoiceINV0007 /26OCT_01/2 net100/tax18/gross118. Restore current companyVATregisteredfalse/save/reloadverifyfalse; source-linked fullreturnSR0011 stillpreview/post118, journalDrReturns100/DrOutputVAT18/CrAR118. Thus no-header control and stored-source VAT after settings change pass. Do not generalize the failure to every taxable return.

Invalid first rounding-control fixtureINV0006 posted3.53 while companyVATregisteredtrue despite commercial format; preserved/excluded from the intended no-tax2.99test. It is a fixture-assumption correction, not an additional tax defect. CleanunregisteredINV0008 laterpassed1+1+0.99=2.99.

Preserve untouchedINV0005forfull-return reproduction. VATflag restoredfalse; rate remainsoriginal18. Test partial1+remaining2, both return sides, line/header tax rounding and old documents after configuration changes; legal applicability/expert review remains pending.

[Run](../runs/RUN-20261018-v2514-resume.md) · [checks](../runs/CHECKS-20261018-v2514-resume.json).
