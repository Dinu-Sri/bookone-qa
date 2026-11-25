import React from 'react';
export default function Link({href,children,...props}:any){return <a href={href} {...props}>{children}</a>}
export const useRouter=()=>({push:(p:string)=>{document.getElementById('spy-output')!.dataset.redirect=p;},refresh:()=>{}});
export const usePathname=()=>location.pathname;
export const useSearchParams=()=>new URLSearchParams(location.search);
async function capture(input:any){const el=document.getElementById('spy-output')!;el.textContent=JSON.stringify([...JSON.parse(el.textContent||'[]'),input]);return {ok:false,error:'ISOLATED_SPY_REFUSAL_NO_POSTING'};}
export const receiveCustomerPayments=capture,payVendorBills=capture;
