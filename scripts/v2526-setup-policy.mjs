// Finite setup capabilities. This module never controls a browser.
export function authorizeSetup(plan,state,caseId,url,button,review) {
  const spec=plan.cases.find(c=>c.id===caseId);
  if(!spec?.allowedButtons?.includes(button))throw Error('Setup button not approved');
  const u=new URL(url);
  if(u.origin!=='https://bookone.clossyan.com'||u.username||u.password||!spec.allowedPaths.some(p=>new RegExp(p).test(u.pathname)))throw Error('Setup page not approved');
  const row=state.cases.find(c=>c.id===caseId);
  if((row?.submissions?.length??0)>=spec.maxSubmissions)throw Error('Setup submission cap reached; do not repeat');
  for(const dep of spec.dependsOn??[])if(state.cases.find(c=>c.id===dep)?.status!=='passed')throw Error('Setup dependency not passed: '+dep);
  if(!review||review.caseId!==caseId||review.url!==url||review.button!==button||review.actor!==spec.actor||review.companyAlias!==spec.companyAlias)throw Error('Prepared form actor/company/action binding required');
  if(!review.observedAt||!Number.isFinite(Date.parse(review.observedAt))||Date.now()-Date.parse(review.observedAt)>300000||Date.parse(review.observedAt)>Date.now()+1000)throw Error('Prepared form evidence stale');
  for(const k of ['identityEvidence','formEvidence','fieldSummary','preservationEvidence'])if(typeof review[k]!=='string'||!review[k].trim())throw Error('Prepared form evidence missing: '+k);
  if(review.noFinancialEffect!==true||review.onlyNewFixtures!==true)throw Error('Financial or protected-fixture write refused');
  if(review.confirmationRequired===true&&(!review.confirmationEvidence?.trim()||review.confirmationReceived!==true))throw Error('Required action-time confirmation pending');
  if(typeof review.confirmationRequired!=='boolean')throw Error('Record confirmation decision and applicable authorization');
  return spec;
}
