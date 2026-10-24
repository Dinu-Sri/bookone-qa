# Medium/coding triage — interaction no-change

Read [run](../runs/RUN-20261019-light03-blocked.md) and [exact checks](../runs/CHECKS-20261019-light03-blocked.json). This is an unknown interaction failure, not a confirmed checkbox implementation bug. Productv2.5.18a4a6d65; freshintendedQAOwnerloginworked; directreadnavigationworked. No settings Save or trading submission.

Observed: Company→PurchaseSettings requiredsupplierfalse. Standardcheck twice (with readbacks),Space, screenshotgroundedCUAclick, safeReloadthenDOMCUAnodeclick allleavefalse. Sourcepage uses plain defaultCheckedcheckbox and supported form action; no patch requested without rootcause. TrialBalancelink alsohadnoeffect, thoughdirectobservedhrefnavigationloadedreport. Devwarn/errorlogs empty; no proofassets/networkhealthy.

1. On same selected page, manually toggle one unsaved requiredsuppliercheckbox and observe its checkmark/DOM. Do not Save. Restore unsaved openingfalse afterward. Ifmanualworks, investigate browser interaction layer; ifnot, inspect clientevent/assets/pagebehavior. Avoid unboundedretries/diagnosticfinancialsubmit.
2. Use current Browser documentedcapabilities only; no internalbrowserstate, apphiddenAPI, DOMinputmutation, requestreplay or profilebypass. Capture exactcontrol/route/startendstamp and outcome. Ifbrowser/extensionrepairrequired, ownerhandlesactualsetup; do notguessfault.
3. Once controlled interactionworks, verifysettingssave/reload on plannedprofile and actualopening snapshots before trading. Start a new reviewed attempt or newfixedcandidatequeue as appropriate; preserve blockedattempt and allfirstobservations. Previous Light0212pass2fail4blocked remainimmutable; suppliercorrection/draft/partialreturnfixes are NOT liveaccepted from this blockedrun.
4. Authenticlegacy101c/104c still requiresisolatedoldcompiledapp/auth/DB;noSQLfabrication orstagingdowngrade. No deployment/reset/payment/historicalrepair/grants. ActualbackuprestoreLAST.

MaintenanceownerMediumQA: CORE.J06/sharedUI/OPS operationalcontext impacts allbusinessbooks; canonicalexpectedvaluesunchanged. Thisblockedattempt adds nofinanceoracle and noindependentreview/acceptance. Record verified classification and requiredfreshscope before resuming.
