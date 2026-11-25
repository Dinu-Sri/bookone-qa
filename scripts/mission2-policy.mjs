export function authorizeCombined(plan,state,id,url,button,review){
 const c=plan.cases.find(x=>x.id===id),row=state.cases.find(x=>x.id===id),u=new URL(url);
 if(!c?.allowAuth||!['Login','Logout'].includes(button)||!c.allowedButtons.includes(button))throw Error('Auth-only capability; no staging business/settings/restore action');
 if(u.origin!=='https://bookone.clossyan.com'||u.username||u.password||!c.allowedPaths.some(p=>new RegExp(p).test(u.pathname)))throw Error('Wrong observed page');
 if(button==='Login'?u.pathname!=='/login':u.pathname==='/login')throw Error('Wrong auth page');
 for(const d of c.dependsOn??[])if(state.cases.find(x=>x.id===d)?.status!=='passed')throw Error('Unpassed prerequisite '+d);
 if((row?.submissions?.length??0)>=c.maxSubmissions)throw Error('Auth cap reached');
 const map={vOwner:'V',nOwner:'N',aOwner:'A',aViewer:'A',bOwner:'B'};
 if(!review||review.caseId!==id||review.url!==url||review.button!==button||map[review.actor]!==review.companyAlias||!c.allowedActors.includes(review.actor)||!c.allowedCompanies.includes(review.companyAlias)||review.noFinancialEffect!==true)throw Error('Actual actor/company/form binding required');
 const t=Date.parse(review.observedAt);if(!Number.isFinite(t)||Date.now()-t>300000||t>Date.now()+1000)throw Error('Stale prepared review');
 for(const k of ['identityEvidence','formEvidence','fieldSummary','preservationEvidence'])if(!review[k]?.trim())throw Error('Missing prepared evidence '+k);
 if(typeof review.confirmationRequired!=='boolean'||review.confirmationRequired&&(!review.confirmationReceived||!review.confirmationEvidence?.trim()))throw Error('Required authorization missing');
 return {spec:c,auth:true};
}
