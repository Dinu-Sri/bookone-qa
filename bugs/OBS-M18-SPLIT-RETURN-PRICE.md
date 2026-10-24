# OBS-M18-SPLIT-RETURN-PRICE — added linked-return rows use editable catalog prices

Statusopen; provisionalP1financial-input/representationrisk; persistedvalidsplitcredit **notexecuted**.21Oct2026/v2.5.18 · a4a6d65; [M18-DUP-SALES](../runs/CHECKS-20261021-light03-results.json). OwnQAOwner, VATfalse, DigitalStandardfixtureQ-M16-DIGITAL-ICWZ;catalogsellprice10,sourceprice100.

1. PostfreshINV-20261021-0032=3×100=300/noVATdiscount.
2. Source-linkedSalesReturncopiesoriginalrowqty3/price100readonly. Setqty2;addsamecatalogproductthroughsupportedpicker. Newrowhascatalogprice10andeditableprice/discount,notlockedsource100.
3. Set2+2:explicit4>3invalidquantity;oneSave refused “This return exceeds the remaining quantity on the original invoice.” Allfieldsretained/journal97entries12598.51unchanged.
4. Correctsameformqty1+1,addthirdsamecatalogrowqty1. Originalrow100readonly;addedrows10editable. Visiblelineamounts100+10+10=120;footerSubtotal300/Discount0/Total300. No validSaveexecuted; source0032remainsopen300.

Expectedstablematching-source rows alluseprice100/readonlyandconservediscounts;validsplit1+1+1rowamounts100each/footer300/persistedcredit300. Cannotpresent120lineeconomicsagainst300total; donotforcecatalogpriceintosourceorweakenquantitydenial.

Sourceprice/persistedpostingnormalizationmayalreadyprotectstoredamounts; thisrun**doesnotclaimwrongvalidcreditposted**. Needfixsharedlineaddition/hydration/matching/readonlyandpreviewrepresentation,thenfreshvalidsplitpost/View/GL/source0andadjacentpartial/header/VAT/duplicate-source-rowcontrols. Checkpurchaseanaloguesanddifferentcatalog/sourceprices. RelatedHYB.J02.C08/CORE.J06/PHY.J06; no fullcanonicalacceptance. Keeporiginalopen300fixtureforread-onlyreview;noautomaticrepair/payments/replay.
