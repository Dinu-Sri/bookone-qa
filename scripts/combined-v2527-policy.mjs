// Finite business capabilities; never drives a browser or repairs a ledger.
export function authorizeCombined(plan,state,caseId,url,button,review,ownedSources={}) {
 const c=plan.cases.find(x=>x.id===caseId),row=state.cases.find(x=>x.id===caseId);
 if(!c?.allowedButtons?.includes(button))throw Error('Unapproved combined action');
 const u=new URL(url);if(u.origin!=='https://bookone.clossyan.com'||u.username||u.password||!c.allowedPaths.some(p=>new RegExp(p).test(u.pathname)))throw Error('Wrong observed action page');
 for(const d of c.dependsOn??[])if(state.cases.find(x=>x.id===d)?.status!=='passed')throw Error('Unpassed prerequisite '+d);
 if((row?.submissions?.length??0)>=c.maxSubmissions)throw Error('Case submission cap reached');
 const logout=button==='Logout'&&c.allowAuth;
 if(!review||review.caseId!==caseId||review.url!==url||review.button!==button||(!logout&&(!(c.allowedActors??[c.actor]).includes(review.actor)||!(c.allowedCompanies??[c.companyAlias]).includes(review.companyAlias)))||({vOwner:'V',nOwner:'N'}[review.actor]!==review.companyAlias))throw Error('Actual actor/company/form binding required');
 for(const d of c.requiresDisposed??[])if(!['passed','failed','blocked','inconclusive'].includes(state.cases.find(x=>x.id===d)?.status))throw Error('Carried matrix must be dispositioned first');
 const t=Date.parse(review.observedAt);if(!Number.isFinite(t)||Date.now()-t>300000||t>Date.now()+1000)throw Error('Stale prepared form');
 for(const k of ['identityEvidence','formEvidence','fieldSummary','preservationEvidence'])if(!review[k]?.trim())throw Error('Missing prepared evidence '+k);
 const auth=['Login','Logout'].includes(button);
 if(auth){if(!c.allowAuth||review.noFinancialEffect!==true||(button==='Login'&&u.pathname!=='/login')||(button==='Logout'&&u.pathname==='/login'))throw Error('Auth capability/page not approved');}
 else {
  if(!c.oracleEvent||review.oracleEventId!==c.oracleEvent.id||JSON.stringify(review.expectedLines)!==JSON.stringify(c.oracleEvent.lines))throw Error('Prepared accounting delta differs from frozen oracle');
  if(JSON.stringify(review.fields)!==JSON.stringify(c.fields))throw Error('Prepared amounts, quantities or tender differ from frozen form');
  if(row?.submissions?.some(s=>!/^AUTH:/.test(s.action)))throw Error('Only one business intent per event, never retry even after refusal');
  if(review.issueDate!==plan.dateContract?.executionDate||review.dueDate!==plan.dueDate)throw Error('Wrong committed date contract');
  if(review.protectedSourcesUnchanged!==true||review.onlyRunOwnedSources!==true||review.sourceCapsVerified!==true)throw Error('Source preservation/eligibility evidence required');
  if(c.sourceRequired){const source=ownedSources[c.companyAlias+':'+c.sourceRequired];if(!source||source.id!==review.sourceId||source.companyAlias!==c.companyAlias||(c.correctionOnly?source.accepted!==false:source.accepted!==true))throw Error('Required source is not an accepted run-owned binding');}
  if(c.requiresFreshUnpaidSource&&(u.pathname!=='/purchase/payments/new'||u.searchParams.get('documentId')!==review.sourceId||review.freshUnpaidVerified!==true||review.noExistingPaymentVerified!==true))throw Error('Fresh exact unpaid settlement source required');
  if(c.correctionOnly&&(u.pathname!==new URL(ownedSources[c.companyAlias+':'+c.sourceRequired].url).pathname+'/edit'||review.currentDraftVerified!==true||review.namedDatesVerified!==true))throw Error('Existing reviewed draft and named-date evidence required');
  if(c.sourceRequired&&u.pathname==='/purchase/returns/new'&&u.searchParams.get('from')!==review.sourceId)throw Error('Return URL must bind the owned original source');
  if(c.sourceRequired&&/^\/(sales\/(quotations|orders)|purchase\/(orders|receipts))\/[^/]+$/.test(u.pathname)&&u.pathname.split('/').at(-1)!==review.sourceId)throw Error('Conversion URL must bind the owned original source');
  if(c.allowedPaths.includes('^/pos$')&&(review.registerCode!==c.registerCode||review.manualPrintVerified!==true||review.hardwareDisconnected!==true||!review.shiftEvidence?.trim()))throw Error('Safe bound POS register and actual shift context required');
  if(review.invoiceKind!==c.invoiceKind||review.saleChannel!=='local')throw Error('Wrong VAT/channel profile');
 }
 if(typeof review.confirmationRequired!=='boolean')throw Error('Record applicable authorization');
 if(review.confirmationRequired&&(!review.confirmationReceived||!review.confirmationEvidence?.trim()))throw Error('Required confirmation pending');
 return {spec:c,auth};
}
