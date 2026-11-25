// Supported CUA DOM reads only. Hidden input values are redacted by the host;
// bind the unique visible invoice number to its independently opened owned detail URL.
const origin='https://bookone.clossyan.com';
const cents=s=>{if(!/^LKR\s+[\d,]+(?:\.\d{1,2})?$/.test(s??''))throw Error('Ambiguous monetary display');return Math.round(Number(s.replace(/^LKR\s+|,/g,''))*100);};
export function validateSalesReturnEvidence({form,invoice,source,spec,plan,state,review}){
 if(source?.accepted!==true||source.companyAlias!=='V'||source.id!==review.sourceId||source.url!==origin+'/sales/invoices/'+source.id)throw Error('Unqualified owned invoice');
 const at=Date.parse(review.observedAt);if(!Number.isFinite(at)||Date.now()-at>300000||at>Date.now()+1000)throw Error('Stale source review');
 const expected=plan.salesReturnSources?.[spec.sourceRequired];
 if(!expected||source.documentNumber!==expected.documentNumber||source.customerLabel!==expected.customerLabel)throw Error('Unreviewed source identity');
 if(review.sourceLabel!==expected.documentNumber||review.companyAlias!=='V'||review.actor!=='vOwner')throw Error('Forged source review');
 for(const observed of [form,invoice])if(observed.user!=='QAV'||observed.role!=='Owner'||observed.company!=="QAV Launch1112's Company"||observed.build!=='v2.5.27 · dae17ab')throw Error('Wrong current owner/company/build');
 if(invoice.url!==source.url||invoice.heading!==expected.documentNumber||invoice.customer!==expected.customerLabel||invoice.lines.length!==1)throw Error('Independent source detail mismatch');
 const line=invoice.lines[0];if(line[0]!==expected.description||Number(line[1])!==expected.quantity||cents(line[2])!==expected.unitCents||cents(line[3])!==expected.netCents)throw Error('Original invoice lines changed');
 if(cents(invoice.totals.Total)!==expected.totalCents||cents(invoice.totals.VAT)!==expected.vatCents||!invoice.posted)throw Error('Original invoice profile changed');
 let refunded=expected.priorRefundCents??0,returned=expected.priorReturnQty??0;
 for(const c of plan.cases.filter(c=>c.sourceRequired===spec.sourceRequired&&c.id!==spec.id&&c.allowedPaths?.includes('^/sales/returns/new$'))){const r=state.cases.find(r=>r.id===c.id);if(r?.submissions?.some(s=>s.outcome==='accepted')){if(r.status!=='passed')throw Error('Prior refund unresolved');refunded+=c.fields.grossCents;returned+=c.fields.quantity;}}
 if(!Number.isSafeInteger(spec.fields.grossCents)||spec.fields.grossCents<=0||spec.fields.grossCents>expected.totalCents-refunded||spec.fields.grossCents>cents(invoice.totals.Paid)||spec.fields.quantity>expected.quantity-returned)throw Error('Exhausted quantity/paid/refund cap');
 if(form.url!==origin+'/sales/returns/new'||form.forms!==1||form.sourceFields!==1||form.loaded!==`Loaded ${expected.documentNumber}. All lines copied — change qty for a partial return.`||form.search!==expected.documentNumber)throw Error('Missing, ambiguous or changed selected invoice');
 if(!form.customerLocked||form.customer!==expected.customerOption||!form.lockText)throw Error('Customer is not the original locked party');
 if(form.issueDate!==plan.dateContract.executionDate||form.dueDate!==plan.dueDate)throw Error('Committed return dates changed');
 if(form.lines.length!==1||form.lines[0].sku!==spec.fields.sku||form.lines[0].description!==expected.description||Number(form.lines[0].quantity)!==spec.fields.quantity||Number(form.lines[0].unitPrice)*100!==expected.unitCents||!form.lines[0].priceLocked||Number(form.lines[0].discount||0)!==0)throw Error('Selected return lines differ from frozen event');
 if(form.tender!==({cash:'1000',bank:'1100',card:'1200'}[spec.fields.tender])||form.location!=='V-WH-1112 — V Warehouse 1112'||cents(form.totals.Total)!==spec.fields.grossCents||cents(form.totals.Discount)!==0||!form.submitEnabled)throw Error('Refund tender/location/amount changed');
 return {verified:true,source:expected.documentNumber,quantityRemaining:expected.quantity-returned,refundRemainingCents:expected.totalCents-refunded,sourceProof:'unique-visible-number-plus-owned-detail-url; hidden-value-unavailable'};
}
export async function verifySalesReturnSource({tab,sourceTab,source,spec,plan,state,review}){
 if(!sourceTab||sourceTab.id===tab.id||typeof sourceTab.reload!=='function')throw Error('Separate bound source detail tab required');
 if(await sourceTab.url()!==source?.url)throw Error('Wrong source detail tab');
 await sourceTab.reload();
 const invoice=await sourceTab.playwright.evaluate(()=>{
  const text=e=>e?.innerText?.trim()??'',identity=document.querySelector('[data-testid="bookone-signed-in"]'),card=document.querySelector('main section.card');
  return {url:location.href,user:text(identity?.querySelector('.sidebar-user-name')),role:text(identity?.querySelector('.sidebar-user-job')),build:text(document.querySelector('[data-testid="bookone-build"]')),company:text(document.querySelector('header .workspace-switcher-name')),heading:text(card?.querySelector('h1')),customer:text(card?.querySelector('.status-tip-anchor')?.nextElementSibling),lines:[...(card?.querySelectorAll('tbody tr')??[])].map(r=>[...r.querySelectorAll('td')].map(text)),totals:Object.fromEntries([...(card?.querySelectorAll('.doc-totals-row')??[])].map(r=>[text(r.querySelector('span')),text(r.querySelector('strong'))])),posted:!!card?.querySelector('a[href^="/journal?q="]')};
 });
 const form=await tab.playwright.evaluate(()=>{
  const forms=[...document.querySelectorAll('form.doc-form-shell')],f=forms[0],text=e=>e?.innerText?.trim()??'',value=n=>f?.querySelector('[name="'+n+'"]')?.value??'',identity=document.querySelector('[data-testid="bookone-signed-in"]'),customer=f?.querySelector('select[aria-readonly="true"]');
  return {url:location.href,forms:forms.length,sourceFields:f?.querySelectorAll('input[name="sourceDocumentId"]').length??0,user:text(identity?.querySelector('.sidebar-user-name')),role:text(identity?.querySelector('.sidebar-user-job')),build:text(document.querySelector('[data-testid="bookone-build"]')),company:text(document.querySelector('header .workspace-switcher-name')),loaded:text(f?.querySelector('.invoice-return-search .muted-line')),search:f?.querySelector('#invoice-return-q')?.value??'',customerLocked:customer?.disabled===true,customer:text(customer?.selectedOptions[0]),lockText:text(f).includes('Copied from the original document and cannot be changed.'),issueDate:value('issueDate'),dueDate:value('dueDate'),tender:value('paymentAccountCode'),location:text(f?.querySelector('select[name="locationId"]')?.selectedOptions[0]),lines:[...(f?.querySelectorAll('tbody tr')??[])].map((r,i)=>({sku:text(r.querySelector('.doc-line-sku')),description:value('line_'+i+'_description'),quantity:value('line_'+i+'_quantity'),unitPrice:value('line_'+i+'_unitPrice'),priceLocked:f.querySelector('[name="line_'+i+'_unitPrice"]')?.readOnly===true,discount:value('line_'+i+'_discountValue')})),totals:Object.fromEntries([...(f?.querySelectorAll('.doc-totals-row')??[])].map(r=>[text(r.querySelector('span')),text(r.querySelector('strong'))])),submitEnabled:f?.querySelector('button[type="submit"]')?.disabled===false};
 });
 return validateSalesReturnEvidence({form,invoice,source,spec,plan,state,review});
}
