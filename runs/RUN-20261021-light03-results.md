# Light03 fresh attempt — 21 October 2026

**All22 slots disposed:18passed,2failed,2blocked.** No pending/running/ambiguous financial submission. Candidate remains unapproved. [Exact checks](CHECKS-20261021-light03-results.json), [results handoff](../handoffs/HANDOFF-20261021-light03-results.md), [coding mission](../handoffs/CODING-MISSION-20261021-light03-results.md). Mission-slot results are bounded observations, not22 fullcanonical cases or an ERP completion percentage.

Product `a4a6d65fa0f8ecc116b728b99d70e86f1b2b577f`, start/end **v2.5.18 · a4a6d65**. QA execution base `0afd96b4dd9e317e75102c6e159df9aa0e58561a`, PR50 recovery addendum. New private ledger/fingerprint; prior19Octblockedrun and allolderfailures immutable. Fresh explicit intended QA N141710 logout/login; owncompanyOwner, Remembermeoff. Actual openings bound before profile changes. Rulebook1.0.0/hash in checks expertpending; library1.5.0/272draftunbound unchanged. Source-study and automated product-ref deliberately unchanged.

| Slot | Outcome | Actual |
|---|---|---|
| M18-GATE | passed | ExactcandidateandpublishedQArevisionverified;freshattemptpreservespriorblockedrun. |
| M18-ACTOR | passed | Freshintendedlogin/openingscaptured;plannedprofile savedandreloaded;noexistingM18bills. |
| M18-SUPPLIER | passed | Businessrefusalretainedallfields;sameformcorrectedreferencepostedexactlyonebill10. |
| M18-OLD-DRAFT | passed | Legacyamount-onlydraftreopenscorrect256.50;readonly,noSavePost. |
| M18-NEW-DRAFT | passed | Freshpercentdraftsave/reopen/post/fullcredit256.50correctwithpersistedbreakdown. |
| M18-PO | passed | NewPhysicalcatalog/PO5x60=300withzeroGLAPstock. |
| M18-GRN2 | passed | Received2@60withcorrectGRNIposting/AP0/newstock2value120. |
| M18-BILL2 | passed | RequiredbillreferenceA persisted;nativeblankrefusalonly;GRNIclearedwithoutdoublestock. |
| M18-GRN3 | passed | Remaining3received180withGRNI;stock5value300/APprior120unchanged. |
| M18-BILL3 | passed | DuplicaterefArefusedzeroGL;uniquerefBpostedonebill180/GRNIcleared/noadditionalstock. |
| M18-RET1 | failed | Billpickerclientnavigationloadsmetadatawithoutlines/total0;safeReloadrecovers. Separatepartialreturnpostedcorrect60;firstUIfailurepreserved. |
| M18-REMAINING | passed | Remaining2/value120prefilled;qty3explicitinvalidwithoutfakeDiscount;oneSave refusedallfieldsretained. |
| M18-OVER | passed | AfterpartialreturnexhaustedPOhidesconversioncontrols;clientboundaryonly. |
| M18-DUP-SALES | failed | Invalid2+2refusalretainedfields/zeroGL;validsplitrows addedfromcatalogshowunlocked10insteadsource100,lineamounts120vsfooter300;dependentcreditnotposted. |
| M18-F7 | passed | All7credits0.99x5,1,1equalpreviews/persistedbreakdowns;headerbudget0.05conserved/sourceclosed. |
| M18-F10 | passed | All10credits0.99x5then1x5matchpreview/persistedbreakdown;sourceclosed9.95/header0.05conserved. |
| M18-F3 | passed | Threecredits1,1,0.99matchpreviews/persistedallocations;sourceclosed2.99. |
| M18-TAX | passed | Taxedsource302.67fullycreditedafterVATdisabled;historicalVAT46.17andpersistedbreakdowncorrect. |
| M18-RETENTION | passed | Serverstockrefusalretains17fields;client150quoteerrorretains16;onlydiscountcorrectedquote10savedwith18-26Octnotes/zeroGL. |
| M18-U7 | blocked | Authenticoldv2.5.14compiledapp/auth/DBnotprepared;upgradeunattempted. |
| M18-U10 | blocked | Authenticoldv2.5.14compiledapp/auth/DBnotprepared;upgradeunattempted. |
| M18-END | passed | Actualoutcomesreconciled;allsettingsrestoredreloaded;noambiguousintent;sanitizedpublicationclosing. |

## Bounded repairs observed

Supplier-number server refusal retained all16visiblefields including19/20/26Oct dates and notes. Change only reference toM18-SUP-REF in sameform: exactlyone bill10,Dr6800Cr2100. Former already-running symptom did not recur here. This does not certify actual concurrent DB claim ownership, fault rollback or lost-response races.

Legacy amount-only draft0030 reopens270−13.50=256.50 with fixedline30; noSave/Post. Fresh draft0031 preserves10%line/header13.50/SKU/dates/notes, then posts256.50/DrARCrSales and fullSR0054credit256.50/DrReturnsCrAR. Persisted return View reconcilesgross300−line30=270−header13.50=256.50. Original0018 untouched/unresolved; no blanket oldbug closure.

New PhysicalQ-M18-RECEIPT--Z8G9/PO0003 five×60=300 has0GL. GRN0003 receives2=120 DrInventoryCrGRNI; billPUR0006 refA120 DrGRNICrAP withnostockaddition. GRN0004 receives3=180; duplicatebillrefA refuses with exactbusinesserror and0GL; uniquelyenteredrefB postsPUR0007=180/clearsGRNI/nodoublestock. Requirednumber stayedtrue throughout; blank GRN field nativevalueMissing refusal is clientboundaryonly. No inheritedPOreference.

One purchase returnPR0003=60 fromsecondbill postsDrAP60CrInventory60, leavessecondbill120/sibling120due/newstock4/value240. Remainingformprefill2/value120;qty3 explicitlyrefused with fieldsretained/noGL/no fakeheaderdiscount. ExhaustedPO hidesconversioncontrolsafterreturn; no serverdeny claim.

Fresh7/10/3ladders passed everypreview/post/persistedView/journal/sourcebalance transition. Seven credits0.99×5,1,1 total6.95; ten0.99×5,1×5 total9.95; three1,1,0.99 total2.99. Each View gross1/lineDiscount0/net1, correctheaderallocation/afterheader/credit; headers0.05/0.05/0.01 conserved. Actualopenbalances and every syntheticcreditnumber in checks. No legitimate legacy101c/104c upgrade acceptance inferred.

Digital+Standardtaxstatus verified read-only from existingproduct; VATtrue18 saved/reloaded. FreshTAX0036 gross302.67(supply256.50/VAT46.17). VATregistrationdisabled/reloaded before fullreturnSR0075; preview/post/Viewretain302.67/46.17,correctDrReturns256.50DrVAT46.17CrAR302.67/source0. InvoiceformexplicitexVAT256.50; no grossinvoicepreview claim or statutoryapproval.

Stockrefusal captures exactneed1/short1, retainsall17fields/Other/datesnotes/busyclear,0GLstock. Separate150%quoteclientrefusalretains16fields,18/26Octkeyboardcommitteddates/notes; correctingonly150→0 savesQT0003draft10, reopened exactdatesnotes/noGL.

## Two preserved UI failures

**[Picker state](../bugs/OBS-M18-PURCHASE-PICKER-STATE.md):** billdetail/listentry loadlinked3×60, butgenericNewPurchaseReturn→billpickerselection showsLoadedPUR0007/remaining3/value180/lockedvendor with NOlines,total0/disabledSave. Firstfailurecaptured; safeReloadrestoreslines. Correctpartialpostingafterrecovery doesnoterasethisentryfailure.

**[Split return source price](../bugs/OBS-M18-SPLIT-RETURN-PRICE.md):** source0032=3×100. After addingduplicatecatalogrows, onlyoriginalrowisprice100/readonly; addedrowsprice10editable. Invalid2+2 correctlyrefused. Corrected1+1+1 displaysrowamounts100+10+10=120 whilefooter300; dependentvalidcreditnotposted. Source0032remainsopen300forMediumreview. No attempttoforceprices,hide discrepancy or repair oldrecords.

## Reconciliation/restoration

Opening88journals11115.51; closing122journals13243.63,allbalanced. +34journals/+2128.12turnover = supplierbill10 + discountedinvoice/credit513 + duplicate-sourceinvoice300 + purchasechainreceipts/bills600/credit60 + seven-source/credits13.90 + ten-source/credits19.90 + three-source/credits5.98 + taxsource/credit605.34.

AR1006.21→1306.21(+300preserved0032); AP840→1090(+10service,+240netpurchasechain); inventoryGL420→660(+240); GRNI0;VAT46.71/COGS420 unchanged; expense10;profit539.50→829.50(+300−10);assets1426.21→1966.21(+300AR+240Inventory). ActualARopenlist1306.21/7invoices andAP1090/6bills matchGL. All oldopenbalances preserved. StockWidget4/value240+M17Receipt5/value300+newM18Receipt4/value240=780;stock780−GL660=inherited120unchanged. No balancingpayment/writeoff/repair.

All actual opening purchase/inventory/fullsalesmaps exact-equalafter savedrestoration/reload:approvalfalse,requiredsupplierfalse,duptrue,RequireGRNfalse/PostGRNIfalse,Net30/6800;last/negativeAllow;VATfalse18/export0/dept01/localcommercial/creditlimitoff; numbering/POS unchanged. All fixtures retained. FinalBalanceSheetassets=liabilities+equity1966.21.

## Limits, corrections, next action

Private harness waits for dialogs after actualdetailnavigation and quoteSavequotation after actualSavechanges were corrected byreadback; no financialreplay. Setupinvalidtaxoption/textarea locator were correctedbeforefirstsubmission; preserved inchecks. Nativeblankrefusal is notserverdenial. Sameformstock/quantity refusals do notcertify realforeign-tenantdeny, fault/race/auditinternals. No fullcanonical/releaseacceptance. Authenticoldv2.5.14compiledapp/auth/DB remains unavailable; upgrade101c/104cblockedunchanged. BackuprestoreLAST.

44.6minutesfirst→lastcheckpoint, plusunmeasuredfreshlogin/setupbeforefirstcheckpoint;0extrauserinterventionsduringattempt. Modelrouting/creditsnotobservable; no cost-savingsclaim. Sourcepreflight12passes earlier notrerun/promoted. JSON/22IDs/counts/evidencekeys, independentinteger-moneyconservation andpublicationallowlistvalidated; fullrepositorychecknotruninpartialcheckout, canonicaldefinitionsunchanged. Mandatoryimpactintake namesMediumownerfornewedgevariants. Codingagent fixesUIstate/sourcepricing,returnsnewCHG/SHA/diff/tests;Mediumreviewsandpreparesfreshcandidatequeue. No merge/deploy/directmessage.
