# OBS-M18-PURCHASE-PICKER-STATE — bill selection updates source metadata but leaves return lines empty

Statusopen; workflowblockingUIdefect, provisionalP2; no financialpostingfrombadform. Observed21Oct2026/v2.5.18 · a4a6d65/fullSHAa4a6d65fa0f8ecc116b728b99d70e86f1b2b577f; exact [M18-RET1](../runs/CHECKS-20261021-light03-results.json). OwnQAOwner/requiredsuppliertrue/GRNItrue/VATfalse/lastcost.

Reproduction withfreshunpaidPUR-20261021-0007=3×60:
1. BilldetailCreateReturnlink andpurchaseslistReturn openlinkedformwith3linesqty/total180/sourcevendorlocked.
2. NavigatePurchaseReturns→Newpurchasereturn(blanklines). Findbilltoreturn searchPUR0007;selectmatchingbill.
3. ObserveLoadedPUR0007/remainingqty3/value180,lockedvendor;butNo lines yet,total0,Save disabled. Noquantityfieldvisible(the remaining namedinput ishidden).
4. SafeReloadofsameobservedsourceURL restoresqty3@60/total180. Firstfailurepreserved; oneverifiedqty1return60waslaterpostedcorrectly.

Expected: selectionmustinitializeallsource-backedformstateatomically—lines/prices/discounts/sourcequantity/vendor/remainingbudget—withoutmanualreload; no stalepreviousbilllineswhenchangingselection. No unlinkedsubstitution/fullreturnworkaround. Actualcorrectpartialcreditafterreloaddoesnotclosepickerbug.

No additionalbill/return/GL/stockfromfailedpicker. Sourceandactualreturnreconciledseparately. Suspectclientcomponentstateinitializedfrompropswithoutremount/synchronization; **hypothesis**, notverifiedrootcause. InspectPurchaseReturnBillPicker→router.push(from)→CommercialDocNewForm useState(initialLines), header/source state and change-bill transitions. Needfreshempty→sourceA,sourceA→B(withdifferentvendor/price/discount),clear→reselect,already-partiallyreturned andno-remainingcases; actualserverfinance/tenantguardsretained. RelatedPHY.J06.C01,CORE.J06sharedforms; fullcanonicalacceptancenotestablished. No rawIDs/screenshots/credentials.
