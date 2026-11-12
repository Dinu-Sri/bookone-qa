import {beforeEach,afterAll,it,expect} from 'vitest';
import {eq} from 'drizzle-orm';
import {createCommercialDocument,convertDocument} from '@product/web/app/actions/commercial-docs';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import * as schema from '@product/schema/index';
import {TENANT_A} from './support/session';
beforeEach(resetFixture);afterAll(closeFixture);
const DATE='2026-11-12',cent=(n:unknown)=>Math.round(Number(n)*100);
async function setup(registered=true){
 await seed.insert(schema.accounts).values([
  {tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},
  {tenantId:TENANT_A,code:'2150',name:'GRNI',type:'liability',normalSide:'credit'},
  {tenantId:TENANT_A,code:'2300',name:'Input VAT',type:'asset',normalSide:'debit'},
  {tenantId:TENANT_A,code:'5100',name:'Inventory',type:'asset',normalSide:'debit'},
  {tenantId:TENANT_A,code:'6800',name:'Expense',type:'expense',normalSide:'debit'},
 ]);
 await seed.insert(schema.salesSettings).values({tenantId:TENANT_A,vatRegistered:registered?'1':'0',vatRatePercent:'18.00'});
 await seed.insert(schema.purchaseSettings).values({tenantId:TENANT_A,postGrniOnReceipt:'0',requireBillApproval:'0',requireGrnBeforeBill:'0'});
 await seed.insert(schema.inventorySettings).values({tenantId:TENANT_A,costingMethod:'last',negativeStockPolicy:'block'});
 await seed.insert(schema.parties).values({tenantId:TENANT_A,name:'QA input VAT supplier',kind:'vendor',isVendor:'1'});
 const[p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-INPUT-VAT',name:'QA inputVAT goods',productType:'physical',taxStatus:'standard',unitCost:'60.00',sellPrice:'100.00'}).returning();return p.id;
}
const input=(p:string,type='purchase_order',extra={})=>({documentType:type,partyName:'QA input VAT supplier',issueDate:DATE,invoiceKind:'tax_invoice',lines:[{productId:p,description:'QA inputVAT goods',quantity:10,unitPrice:60}],...extra}) as any;
async function created(data:any){const r=await createCommercialDocument(data);expect(r,r.error).toMatchObject({ok:true});expect(r.id).toBeTruthy();return r.id!;}
async function converted(id:string,type:'goods_receipt'|'purchase',options:any={}){const r=await convertDocument(id,type,options);expect(r,r.error).toMatchObject({ok:true});expect(r.id).toBeTruthy();return r.id!;}
async function doc(id:string){return(await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id)))[0];}
async function bal(code:string){const[r]=await admin`select coalesce(sum(case when l.side='debit' then l.amount else -l.amount end),0)::text as n from journal_lines l join accounts a on a.id=l.account_id where a.tenant_id=${TENANT_A} and a.code=${code}`;return cent(r.n);}
async function stock(p:string){const[r]=await admin`select coalesce(sum(qty_on_hand),0)::text as n from inventory_stock_levels where product_id=${p}`;return Number(r.n);}
async function snapshot(){const o={};for(const t of ['business_documents','business_document_lines','transactions','journal_entries','journal_lines','inventory_movements','inventory_stock_levels','inventory_cost_layers','inventory_cost_layer_consumptions','audit_log'])o[t]=await admin.unsafe(`select * from ${t} order by id`);return o;}
async function chain(p:string,options:any={}){const po=await created(input(p)),grn=await converted(po,'goods_receipt'),bill=await converted(grn,'purchase',options);return{po,grn,bill};}
it('[RT-070] actual claimed PO GRN bill posts108 inputVAT and stock10 only once',async()=>{
 const p=await setup(),po=await created(input(p));expect((await doc(po)).invoiceKind).toBe('tax_invoice');expect(cent((await doc(po)).taxTotal)).toBe(0);expect(await bal('2300')).toBe(0);expect(await stock(p)).toBe(0);
 const grn=await converted(po,'goods_receipt');expect((await doc(grn)).invoiceKind).toBe('tax_invoice');expect(cent((await doc(grn)).taxTotal)).toBe(0);expect(await bal('2300')).toBe(0);expect(await bal('5100')).toBe(0);expect(await stock(p)).toBe(10);
 const bill=await converted(grn,'purchase');expect([cent((await doc(bill)).taxTotal),cent((await doc(bill)).total)]).toEqual([10800,70800]);expect([await bal('5100'),await bal('2300'),await bal('2100'),await stock(p)]).toEqual([60000,10800,-70800,10]);
});
it('[RT-071] actual bill override noinput stays600 and duplicate conversion adds nothing',async()=>{
 const p=await setup(),c=await chain(p,{invoiceKind:'commercial'});expect([cent((await doc(c.bill)).taxTotal),cent((await doc(c.bill)).total),await bal('2300'),await bal('2100'),await stock(p)]).toEqual([0,60000,0,-60000,10]);
 const before=await snapshot();expect((await convertDocument(c.grn,'purchase')).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[RT-072] nonVAT explicit input claim rejects with zero persisted effects',async()=>{
 const p=await setup(false);const before=await snapshot();for(const type of ['purchase_order','goods_receipt','purchase']){const r=await createCommercialDocument(input(p,type));expect(r.ok).toBe(false);expect(r.error).toMatch(/input VAT.*VAT registration/i);expect(await snapshot()).toEqual(before);}
});
it('[RT-073] actual linked return uses stored18 after setting15 and preserves bill',async()=>{
 const p=await setup(),c=await chain(p),original=await doc(c.bill);await seed.update(schema.salesSettings).set({vatRatePercent:'15.00'}).where(eq(schema.salesSettings.tenantId,TENANT_A));
 const ret=await created(input(p,'purchase_return',{invoiceKind:'commercial',sourceDocumentId:c.bill,lines:[{productId:p,description:'QA inputVAT goods',quantity:2,unitPrice:60}]}));const d=await doc(ret);
 expect([cent(d.taxTotal),cent(d.total),await bal('2300'),await bal('2100'),await stock(p)]).toEqual([2160,14160,8640,-56640,8]);expect(cent((await doc(c.bill)).taxTotal)).toBe(cent(original.taxTotal));
});
it('[RT-074] direct PO bill claims108 and second conversion cannot duplicate stock',async()=>{
 const p=await setup(),po=await created(input(p)),bill=await converted(po,'purchase');expect([cent((await doc(bill)).total),await bal('2300'),await stock(p)]).toEqual([70800,10800,10]);const before=await snapshot();expect((await convertDocument(po,'purchase')).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
