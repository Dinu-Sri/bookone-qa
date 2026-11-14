// Read-only completion observation. Never submits, navigates, reloads or retries.
export async function readCompletionView(tab){
 return tab.playwright.evaluate(()=>({url:location.href,company:document.querySelector('header .workspace-switcher-name')?.textContent?.trim()??document.querySelector('header strong')?.textContent?.trim()??document.querySelector('article')?.textContent?.trim()??'',text:document.body.innerText,status:document.querySelector('.pos-toast.ok')?.textContent?.trim()??'',error:[...document.querySelectorAll('.pos-error,.pos-toast.error')].map(e=>e.textContent?.trim()).filter(Boolean).join('; '),dialog:!!document.querySelector('[role="dialog"]'),receipt:document.querySelector('a[href^="/pos/receipt/"]')?.getAttribute('href')??'',z:document.querySelector('a[href^="/pos/z-report/"]')?.getAttribute('href')??'',shift:[...document.querySelectorAll('.pos-chip')].map(e=>e.textContent?.trim()).find(t=>t==='Shift open'||t==='No shift')??''}));
}
export function classifyCompletion(kind,before,view){
 const u=new URL(view.url);if(u.origin!=='https://bookone.clossyan.com')return {state:'uncertain',reason:'Unexpected origin'};
 if(kind==='vendor-remittance'){
  if(u.pathname==='/purchase/payments/remittance'&&/^[a-f0-9-]{36}$/i.test(u.searchParams.get('payment')??'')&&view.text.includes('VENDOR PAYMENT REMITTANCE')&&view.text.includes("QAV Launch1112's Company")&&view.text.includes('1100')&&view.text.includes('708'))return {state:'observed',url:view.url};
 }else if(u.pathname==='/pos'){
  if(view.error)return {state:'uncertain',reason:'Visible POS feedback: '+view.error};
  if(kind==='shift-open'&&before.shift==='No shift'&&view.shift==='Shift open'&&view.status==='Shift opened')return {state:'observed',url:view.url};
  if(kind==='pos-sale'&&!view.dialog&&/^Sale .+ complete$/.test(view.status)&&/^\/pos\/receipt\/[a-f0-9-]{36}$/i.test(view.receipt)&&view.receipt!==before.receipt)return {state:'observed',url:view.url,receipt:view.receipt};
  if(kind==='pos-refund'&&!view.dialog&&/^Return .+ complete$/.test(view.status)&&/^\/pos\/receipt\/[a-f0-9-]{36}$/i.test(view.receipt)&&view.receipt!==before.receipt)return {state:'observed',url:view.url,receipt:view.receipt};
  if(kind==='shift-close'&&before.shift==='Shift open'&&view.shift==='No shift'&&!view.dialog&&view.status==='Shift closed'&&/^\/pos\/z-report\/[a-f0-9-]{36}$/i.test(view.z)&&view.z!==before.z)return {state:'observed',url:view.url,z:view.z};
 }
 return {state:'pending'};
}
export async function waitForCompletion(tab,kind,before,{timeoutMs=45000,now=Date.now,pause=ms=>new Promise(r=>setTimeout(r,ms))}={}){
 if(!['vendor-remittance','shift-open','shift-close','pos-sale','pos-refund'].includes(kind))throw Error('Unreviewed completion contract');
 if(!Number.isFinite(timeoutMs)||timeoutMs<1||timeoutMs>45000)throw Error('Invalid completion limit');
 const start=now();let observations=0;
 while(now()-start<timeoutMs&&observations<150){const v=await readCompletionView(tab);observations++;const r=classifyCompletion(kind,before,v);if(r.state!=='pending')return {...r,observations};await pause(300);}
 return {state:'uncertain',observations,reason:'Completion not established within bounded read-only observation; do not navigate, reload or replay. Inspect persisted state.'};
}
export async function verifySettlementForm(tab,source,date){
 if(source?.accepted!==true||source.companyAlias!=='V')throw Error('Accepted owned bill required');
 const v=await tab.playwright.evaluate(()=>{const m=document.querySelector('main'),text=e=>e?.textContent?.trim()??'';return {url:location.href,user:text(document.querySelector('[data-testid="bookone-signed-in"] .sidebar-user-name')),role:text(document.querySelector('[data-testid="bookone-signed-in"] .sidebar-user-job')),company:text(document.querySelector('header .workspace-switcher-name')),rows:[...(m?.querySelectorAll('tbody tr')??[])].map(r=>({checked:r.querySelector('input[type="checkbox"]')?.checked===true,href:r.querySelector('a[href^="/purchase/purchases/"]')?.getAttribute('href'),amount:r.querySelector('input:not([type="checkbox"])')?.value,text:r.innerText})),account:m?.querySelector('select')?.value,date:m?.querySelector('input[type="date"]')?.value,text:m?.innerText??''};});
 const u=new URL(v.url);if(u.origin!=='https://bookone.clossyan.com'||u.pathname!=='/purchase/payments/new'||u.searchParams.get('documentId')!==source.id||v.user!=='QAV'||v.role!=='Owner'||v.company!=="QAV Launch1112's Company")throw Error('Current settlement identity/source mismatch');
 if(v.rows.length!==1||!v.rows[0].checked||v.rows[0].href!=='/purchase/purchases/'+source.id||Number(v.rows[0].amount)!==708||!v.rows[0].text.includes('PUR-20261114-0003')||!v.rows[0].text.includes('V QA Vendor 1112')||!v.rows[0].text.includes('708')||v.account!=='1100'||v.date!==date||!v.text.includes('Total payment: LKR 708'))throw Error('Current settlement fields/cap mismatch');
 return {verified:true};
}
