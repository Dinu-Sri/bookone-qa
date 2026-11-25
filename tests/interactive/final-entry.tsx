import React from 'react';import {createRoot} from 'react-dom/client';
import {ReceivePaymentsForm} from '../../work/product/apps/web/src/components/sales/receive-payments-form';
import {PayVendorsForm} from '../../work/product/apps/web/src/components/purchase/pay-vendors-form';
const kind=location.pathname.includes('/ap')?'AP':'AR';
const rows=[708,94.40].map((balanceDue,i)=>({id:'synthetic-'+i,documentNumber:kind+'-SYNTH-'+i,partyName:'Synthetic '+i,issueDate:'2026-11-16',dueDate:'2026-11-18',balanceDue}));
const accounts=[{code:'1100',name:'Synthetic bank'}];
createRoot(document.getElementById('root')!).render(<><h1>Isolated actual {kind} form</h1><p>Client qualification only; action spy; no financial effects</p>{kind==='AR'?<ReceivePaymentsForm invoices={rows as any} paymentAccounts={accounts} preselectId={new URLSearchParams(location.search).has('preselect')?rows[0].id:null}/>:<PayVendorsForm bills={rows as any} paymentAccounts={accounts} preselectId={new URLSearchParams(location.search).has('preselect')?rows[0].id:null}/>}<pre id="spy-output" aria-label="Isolated action spy">[]</pre></>);
