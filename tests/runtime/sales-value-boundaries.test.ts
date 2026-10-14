import {beforeEach,afterAll,it,expect} from 'vitest';
import {eq} from 'drizzle-orm';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {receiveCustomerPayments} from '@product/web/app/actions/documents';
import {getReports} from '@product/web/app/actions/workspace';
import * as schema from '@product/schema/index';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import {TENANT_A} from './support/session';
import {observe} from './support/observations';
beforeEach(resetFixture);afterAll(closeFixture);
const DATE='2026-10-13',cent=(v:unknown)=>Math.round(Number(v)*100);
async function setup(type='service',registered=true){
 await seed.insert(schema.accounts).values([{tenantId:TENANT_A,code:'2200',name:'Output VAT',type:'liability',normalSide:'credit'},{tenantId:TENANT_A,code:'4100',name:'Sales Returns',type:'revenue',normalSide:'debit'}]);
 await seed.insert(schema.salesSettings).values({tenantId:TENANT_A,vatRegistered:registered?'1':'0',vatRatePercent:'18.00',defaultInvoiceKind:'tax_invoice'});
 const [p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-TAX-'+type,name:'Synthetic standard-rated supply',productType:type,taxStatus:'taxable',sellPrice:'200.00',unitCost:'50.00'}).returning();return p.id;
}
const input=(p:string,type='sales_invoice',extra={})=>({documentType:type,partyName:'Synthetic unregistered customer',issueDate:DATE,invoiceKind:'tax_invoice',saleChannel:'local',lines:[{productId:p,description:'Synthetic standard-rated supply',quantity:1,unitPrice:100}],...extra}) as any;
async function create(data:any){const r=await createCommercialDocument(data);expect(r,r.error).toMatchObject({ok:true});expect(r.id).toBeTruthy();return r.id!;}
async function doc(id:string){return(await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id)))[0];}
async function balance(code:string){const [r]=await admin`select coalesce(sum(case when l.side='debit' then l.amount else -l.amount end),0)::text as value from journal_lines l join accounts a on a.id=l.account_id where a.tenant_id=${TENANT_A} and a.code=${code}`;return cent(r.value);}
async function snapshot(){const out={};for(const t of ['parties','business_documents','business_document_lines','transactions','journal_entries','journal_lines','settlement_allocations','audit_log','inventory_movements','inventory_stock_levels','inventory_cost_layers','inventory_cost_layer_consumptions'])out[t]=await admin.unsafe(`select * from ${t} order by id`);return out;}
async function noStockAndBalanced(){for(const t of ['inventory_movements','inventory_stock_levels','inventory_cost_layers','inventory_cost_layer_consumptions']){const [r]=await admin.unsafe(`select count(*)::int as n from ${t}`);expect(r.n,t).toBe(0);}const js=await admin`select j.id,count(l.id)::int as n,sum(case when l.side='debit' then l.amount else -l.amount end)::text as net from journal_entries j left join journal_lines l on l.journal_entry_id=j.id group by j.id`;for(const j of js){expect(j.n).toBeGreaterThan(0);expect(cent(j.net)).toBe(0);}}
it.each([['B-114','service'],['RT-040','digital']])('[%s] %s configured VAT and valid line/header discounts reconcile document and journal',async(id,type)=>{
 const p=await setup(type);const invoice=await create(input(p,'sales_invoice',{headerDiscount:30,lines:[{productId:p,description:'Discounted standard supply',quantity:2,unitPrice:200,discountAmount:20}]}));const d=await doc(invoice),report=await getReports('2026-10');
 const revenue=-(await balance('4000')),vat=-(await balance('2200')),ar=await balance('1300');observe(id,{netCents:cent(d.subtotal),expectedNetCents:35000,taxCents:cent(d.taxTotal),expectedTaxCents:6300,totalCents:cent(d.total),expectedTotalCents:41300,revenueCents:revenue,vatCents:vat,arCents:ar,profitCents:cent(report.income.netIncome)});
 expect([cent(d.subtotal),cent(d.taxTotal),cent(d.total),cent(d.balanceDue)]).toEqual([35000,6300,41300,41300]);expect([revenue,vat,ar,cent(report.income.netIncome)]).toEqual([35000,6300,41300,35000]);await noStockAndBalanced();
});
it('[RT-033] credit preserves original recorded VAT rate after company tax setting changes',async()=>{
 const p=await setup();const invoice=await create(input(p));const original=await doc(invoice);
 await seed.update(schema.salesSettings).set({vatRatePercent:'20.00'}).where(eq(schema.salesSettings.tenantId,TENANT_A));
 const credit=await create(input(p,'sales_return',{sourceDocumentId:invoice}));const d=await doc(credit),after=await doc(invoice);
 observe('RT-033',{taxCents:cent(d.taxTotal),expectedTaxCents:1800,totalCents:cent(d.total),expectedTotalCents:11800,vatBalanceCents:await balance('2200'),arCents:await balance('1300'),originalTaxUnchanged:Number(cent(after.taxTotal)===cent(original.taxTotal))});
 expect([cent(d.taxTotal),cent(d.total)]).toEqual([1800,11800]);expect(cent(after.taxTotal)).toBe(1800);expect(await balance('2200')).toBe(0);expect(await balance('1300')).toBe(0);await noStockAndBalanced();
});
it('[RT-034] full linked credit reverses original line/header discount and VAT amounts exactly',async()=>{
 const p=await setup();const payload=input(p,'sales_invoice',{headerDiscount:30,lines:[{productId:p,description:'Discounted standard supply',quantity:2,unitPrice:200,discountAmount:20}]});const invoice=await create(payload);expect(cent((await doc(invoice)).total)).toBe(41300);
 const credit=await create({...payload,documentType:'sales_return',sourceDocumentId:invoice});const d=await doc(credit);
 observe('RT-034',{netCents:cent(d.subtotal),taxCents:cent(d.taxTotal),expectedTaxCents:6300,totalCents:cent(d.total),expectedTotalCents:41300,arCents:await balance('1300'),vatBalanceCents:await balance('2200'),returnRevenueCents:await balance('4100')});
 expect([cent(d.subtotal),cent(d.taxTotal),cent(d.total)]).toEqual([35000,6300,41300]);expect(await balance('1300')).toBe(0);expect(await balance('2200')).toBe(0);expect(await balance('4100')).toBe(35000);await noStockAndBalanced();
});
it('[RT-035] standard taxable registered supply retains VAT when commercial invoice style is selected',async()=>{
 const p=await setup();const invoice=await create(input(p,'sales_invoice',{invoiceKind:'commercial'}));const d=await doc(invoice);
 observe('RT-035',{registered:1,taxableSupply:1,taxCents:cent(d.taxTotal),expectedTaxCents:1800,totalCents:cent(d.total),expectedTotalCents:11800,vatBalanceCents:await balance('2200'),arCents:await balance('1300')});
 expect([cent(d.taxTotal),cent(d.total),cent(d.balanceDue)]).toEqual([1800,11800,11800]);expect(await balance('2200')).toBe(-1800);expect(await balance('1300')).toBe(11800);await noStockAndBalanced();
});
it.each([['RT-036','header'],['RT-037','line']])('[%s] excessive %s discount refuses with no business effects',async(id,kind)=>{
 const p=await setup();const extra=kind==='header'?{headerDiscount:101}:{lines:[{productId:p,description:'Excessive discount',quantity:1,unitPrice:100,discountAmount:101},{productId:p,description:'Otherwise valid line',quantity:1,unitPrice:100}]};const before=await snapshot(),r=await createCommercialDocument(input(p,'sales_invoice',extra)),after=await snapshot();
 observe(id,{accepted:Number(r.ok),unchanged:Number(JSON.stringify(before)===JSON.stringify(after)),arCents:await balance('1300'),vatBalanceCents:await balance('2200')});expect(r.ok).toBe(false);expect(after).toEqual(before);
});
it('[RT-038] cumulative linked returns cannot exceed original source quantity and refundable value',async()=>{
 const p=await setup('service',false);const invoice=await create(input(p));const credit=await create(input(p,'sales_return',{sourceDocumentId:invoice}));expect(cent((await doc(credit)).total)).toBe(10000);
 const before=await snapshot(),r=await createCommercialDocument(input(p,'sales_return',{sourceDocumentId:invoice})),after=await snapshot();const [returns]=await admin`select count(*)::int as n,coalesce(sum(total),0)::text as value from business_documents where source_document_id=${invoice} and document_type='sales_return' and voided_at is null`;
 observe('RT-038',{accepted:Number(r.ok),unchanged:Number(JSON.stringify(before)===JSON.stringify(after)),returnCount:returns.n,returnTotalCents:cent(returns.value),expectedMaxReturnCents:10000,arCents:await balance('1300')});expect(r.ok).toBe(false);expect(after).toEqual(before);
});
it('[B-105] fully paid invoice cash refund retains receipt and settles credit once',async()=>{
 const p=await setup('service',false);const invoice=await create(input(p));expect((await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:invoice,amount:100}]})).ok).toBe(true);
 const [before]=await admin`select count(*)::int as n from settlement_allocations`;const credit=await create(input(p,'sales_return',{sourceDocumentId:invoice,paymentAccountCode:'1000'}));const d=await doc(credit),[after]=await admin`select count(*)::int as n from settlement_allocations`;
 observe('B-105',{cashCents:await balance('1000'),arCents:await balance('1300'),creditBalanceCents:cent(d.balanceDue),creditPaidCents:cent(d.paidAmount),receiptAllocationsBefore:before.n,receiptAllocationsAfter:after.n,revenueCents:await balance('4000'),returnRevenueCents:await balance('4100')});
 expect(await balance('1000')).toBe(0);expect(await balance('1300')).toBe(0);expect(cent(d.balanceDue)).toBe(0);expect(cent(d.paidAmount)).toBe(10000);expect(after.n).toBe(before.n);expect(await balance('4000')).toBe(-10000);expect(await balance('4100')).toBe(10000);await noStockAndBalanced();
});
it('[RT-039] linked paid-invoice refund denies revenue tender with zero mutations',async()=>{
 const p=await setup('service',false);const invoice=await create(input(p));expect((await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:invoice,amount:100}]})).ok).toBe(true);
 const before=await snapshot(),r=await createCommercialDocument(input(p,'sales_return',{sourceDocumentId:invoice,paymentAccountCode:'4000'})),after=await snapshot();
 observe('RT-039',{accepted:Number(r.ok),unchanged:Number(JSON.stringify(before)===JSON.stringify(after)),cashCents:await balance('1000'),arCents:await balance('1300')});expect(r.ok).toBe(false);expect(after).toEqual(before);
});
