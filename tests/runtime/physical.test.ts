import { beforeEach, afterAll, it, expect } from 'vitest';
import { createCommercialDocument, approvePurchaseDocument } from '@product/web/app/actions/commercial-docs';
import { receiveCustomerPayments, payVendorBills } from '@product/web/app/actions/documents';
import { getReports } from '@product/web/app/actions/workspace';
import { admin, seed, resetFixture, closeFixture } from './support/fixture';
import * as schema from '@product/schema/index';
import { eq } from 'drizzle-orm';
import { TENANT_A, TENANT_B, OWNER, VIEWER, setActor } from './support/session';
import { observe } from './support/observations';
beforeEach(resetFixture);afterAll(closeFixture);
const DATE='2026-10-13';
const tables=['business_documents','business_document_lines','transactions','journal_entries','journal_lines','inventory_stock_levels','inventory_movements','inventory_cost_layers','inventory_cost_layer_consumptions','settlement_allocations','audit_log'];
async function snapshot(){const out={};for(const table of tables)out[table]=await admin.unsafe(`select * from ${table} order by id`);return out;}
async function setup(costing='last',grni=true,approval=false){
  await seed.insert(schema.accounts).values([
    {tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},
    {tenantId:TENANT_A,code:'2150',name:'GRNI',type:'liability',normalSide:'credit'},
    {tenantId:TENANT_A,code:'4100',name:'Sales Returns',type:'revenue',normalSide:'debit'},
    {tenantId:TENANT_A,code:'5000',name:'COGS',type:'expense',normalSide:'debit'},
    {tenantId:TENANT_A,code:'5100',name:'Inventory',type:'asset',normalSide:'debit'},
    {tenantId:TENANT_A,code:'6800',name:'Expense',type:'expense',normalSide:'debit'},
  ]);
  await seed.insert(schema.inventorySettings).values({tenantId:TENANT_A,costingMethod:costing,negativeStockPolicy:'block'});
  await seed.insert(schema.purchaseSettings).values({tenantId:TENANT_A,postGrniOnReceipt:grni?'1':'0',requireBillApproval:approval?'1':'0',requireGrnBeforeBill:'0'});
  const [p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-PHYSICAL',name:'QA physical unit',productType:'physical',unitCost:'60.00',sellPrice:'100.00'}).returning();return p.id;
}
const input=(p:string,type:string,qty=10,price=60,extra={})=>({documentType:type,partyName:type.startsWith('sales')?'QA synthetic customer':'QA synthetic supplier',issueDate:DATE,lines:[{productId:p,description:'QA physical unit',quantity:qty,unitPrice:price}],...extra}) as any;
async function create(data:any){const r=await createCommercialDocument(data);expect(r,r.error).toMatchObject({ok:true});expect(r.id).toBeTruthy();return r.id!;}
async function doc(id:string){const [d]=await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id));return d;}
async function journal(id:string,lines:[string,string,number][]){
  const d=await doc(id);expect(d.transactionId).toBeTruthy();
  const rows=await admin`select a.code,l.side,l.amount::text as amount,j.tenant_id,j.user_id,j.entry_date from journal_lines l join journal_entries j on j.id=l.journal_entry_id join accounts a on a.id=l.account_id where j.transaction_id=${d.transactionId}`;
  expect(rows.map(r=>[r.code,r.side,Math.round(Number(r.amount)*100)]).sort()).toEqual([...lines].sort());
  for(const r of rows)expect([r.tenant_id,r.user_id,r.entry_date]).toEqual([TENANT_A,OWNER,DATE]);
}
async function ledger(expected:Record<string,number>){
  const rows=await admin`select a.code,sum(case when l.side='debit' then l.amount else -l.amount end)::text as balance from journal_lines l join accounts a on a.id=l.account_id group by a.code order by a.code`;
  const actual=Object.fromEntries(rows.map(r=>[r.code,Math.round(Number(r.balance)*100)]).filter(([,n])=>n!==0));
  expect(actual).toEqual(Object.fromEntries(Object.entries(expected).filter(([,n])=>n!==0)));
  const journals=await admin`select j.id,sum(case when l.side='debit' then l.amount else -l.amount end)::text as net,count(l.id)::int as lines from journal_entries j left join journal_lines l on l.journal_entry_id=j.id group by j.id`;
  for(const j of journals){expect(j.lines).toBeGreaterThan(0);expect(Number(j.net)).toBe(0);}
}
async function stock(p:string,qty:number,valueCents:number){
  const levels=await admin`select tenant_id,qty_on_hand::text as qty from inventory_stock_levels where product_id=${p}`;
  expect(levels.map(r=>r.tenant_id)).toEqual(qty===0&&levels.length===0?[]:[TENANT_A]);
  expect(levels.reduce((s,r)=>s+Number(r.qty),0)).toBe(qty);
  const [layers]=await admin`select coalesce(sum(qty_remaining),0)::text as qty,coalesce(sum(qty_remaining*unit_cost),0)::text as value from inventory_cost_layers where product_id=${p} and voided_at is null`;
  expect([Number(layers.qty),Math.round(Number(layers.value)*100)]).toEqual([qty,valueCents]);
  const movements=await admin`select tenant_id,user_id,movement_date,quantity::text as qty,reference_id from inventory_movements where product_id=${p}`;
  expect(movements.reduce((s,r)=>s+Number(r.qty),0)).toBe(qty);
  for(const m of movements){expect([m.tenant_id,m.user_id,m.movement_date]).toEqual([TENANT_A,OWNER,DATE]);expect(m.reference_id).toBeTruthy();}
}
async function purchase(p:string){
  const po=await create(input(p,'purchase_order'));
  expect((await doc(po)).transactionId).toBeNull();await stock(p,0,0);await ledger({});
  const grn=await create(input(p,'goods_receipt',10,60,{sourceDocumentId:po}));
  await stock(p,10,60000);const bill=await create(input(p,'purchase',10,60,{sourceDocumentId:grn}));
  expect((await doc(bill)).sourceDocumentId).toBe(grn);await stock(p,10,60000);await ledger({'5100':60000,'2100':-60000});
  return {po,grn,bill};
}
it('[C-101] purchase order and pending approval have zero stock/GL until Owner approval',async()=>{
  const p=await setup('last',false,true);const po=await create(input(p,'purchase_order'));
  const pending=await create(input(p,'purchase',10,60,{sourceDocumentId:po}));
  expect((await doc(pending)).status).toBe('pending_approval');expect((await doc(pending)).transactionId).toBeNull();await stock(p,0,0);await ledger({});
  expect((await approvePurchaseDocument(pending)).ok).toBe(true);await stock(p,10,60000);await journal(pending,[['5100','debit',60000],['2100','credit',60000]]);
  const before=await snapshot();expect((await approvePurchaseDocument(pending)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[C-102] GRNI enabled/disabled receipt and bill capitalise ten units exactly once',async()=>{
  for(const grni of [false,true]){
    await resetFixture();const p=await setup('last',grni);const {grn,bill}=await purchase(p);
    if(grni){await journal(grn,[['5100','debit',60000],['2150','credit',60000]]);await journal(bill,[['2150','debit',60000],['2100','credit',60000]]);}
    else{expect((await doc(grn)).transactionId).toBeNull();await journal(bill,[['5100','debit',60000],['2100','credit',60000]]);}
    expect(Number((await doc(bill)).balanceDue)).toBe(600);
  }
});
it('[C-103] receipt six then four with separate bills conserves quantities, GRNI and source links',async()=>{
  const p=await setup();const po=await create(input(p,'purchase_order'));
  const first=await create(input(p,'goods_receipt',6,60,{sourceDocumentId:po}));await stock(p,6,36000);await ledger({'5100':36000,'2150':-36000});
  await create(input(p,'purchase',6,60,{sourceDocumentId:first}));await stock(p,6,36000);await ledger({'5100':36000,'2100':-36000});
  const second=await create(input(p,'goods_receipt',4,60,{sourceDocumentId:po}));await stock(p,10,60000);await ledger({'5100':60000,'2100':-36000,'2150':-24000});
  await create(input(p,'purchase',4,60,{sourceDocumentId:second}));await stock(p,10,60000);await ledger({'5100':60000,'2100':-60000});
});
it('[C-104] partial bills against already received PO do not duplicate stock or GRNI clearance',async()=>{
  const p=await setup();const po=await create(input(p,'purchase_order'));await create(input(p,'goods_receipt',10,60,{sourceDocumentId:po}));
  await create(input(p,'purchase',6,60,{sourceDocumentId:po}));await stock(p,10,60000);await ledger({'5100':60000,'2100':-36000,'2150':-24000});
  await create(input(p,'purchase',4,60,{sourceDocumentId:po}));await stock(p,10,60000);await ledger({'5100':60000,'2100':-60000});
});
it('[C-105] physical sale partial receipt return and final receipt reconcile all three costing settings',async()=>{
  for(const method of ['last','average','fifo']){
    await resetFixture();const p=await setup(method);await purchase(p);
    const sale=await create(input(p,'sales_invoice',2,100));await stock(p,8,48000);
    await journal(sale,[['1300','debit',20000],['4000','credit',20000],['5000','debit',12000],['5100','credit',12000]]);
    expect((await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:sale,amount:80}]})).ok).toBe(true);
    expect(Number((await doc(sale)).balanceDue)).toBe(120);
    const credit=await create(input(p,'sales_return',1,100,{sourceDocumentId:sale}));await stock(p,9,54000);
    await journal(credit,[['4100','debit',10000],['1300','credit',10000],['5100','debit',6000],['5000','credit',6000]]);
    expect(Number((await doc(sale)).balanceDue)).toBe(20);expect(Number((await doc(credit)).balanceDue)).toBe(0);
    expect((await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:sale,amount:20}]})).ok).toBe(true);
    expect(Number((await doc(sale)).balanceDue)).toBe(0);await ledger({'1000':10000,'5100':54000,'2100':-60000,'4000':-20000,'4100':10000,'5000':6000});
    const report=await getReports('2026-10');observe('C-105',{stockQty:9,inventoryValueCents:54000,reportedProfitCents:Math.round(report.income.netIncome*100),expectedProfitCents:4000});expect(report.income.netIncome).toBe(40);
  }
});
it('[C-106] supplier payment clears AP exactly once and leaves inventory unchanged',async()=>{
  const p=await setup();const {bill}=await purchase(p);const request={paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:bill,amount:600}]};
  expect((await payVendorBills(request)).ok).toBe(true);expect(Number((await doc(bill)).balanceDue)).toBe(0);await stock(p,10,60000);await ledger({'1000':-60000,'5100':60000});
  const before=await snapshot();expect((await payVendorBills(request)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[C-107] unpaid credit purchase return reduces AP and stock at original single-batch cost',async()=>{
  const p=await setup();const {bill}=await purchase(p);const credit=await create(input(p,'purchase_return',2,60,{sourceDocumentId:bill}));
  await stock(p,8,48000);await journal(credit,[['2100','debit',12000],['5100','credit',12000]]);await ledger({'5100':48000,'2100':-48000});
  expect(Number((await doc(bill)).balanceDue)).toBe(480);expect(Number((await doc(credit)).balanceDue)).toBe(0);
});
it('[C-115] known foreign SKU is rejected with zero document journal stock or audit changes',async()=>{
  const p=await setup();await purchase(p);await create(input(p,'sales_invoice',1,100));
  const [foreign]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_B,sku:'QA-FOREIGN',name:'QA foreign physical unit',productType:'physical',sellPrice:'100.00',unitCost:'60.00'}).returning();
  const before=await snapshot();const result=await createCommercialDocument(input(foreign.id,'sales_invoice',1,100));const after=await snapshot();
  observe('C-115',{accepted:result.ok?1:0,newDocumentCount:after['business_documents'].length-before['business_documents'].length,newJournalCount:after['journal_entries'].length-before['journal_entries'].length});
  expect({denied:!result.ok,unchanged:JSON.stringify(after)===JSON.stringify(before)}).toEqual({denied:true,unchanged:true});
});
it('[C-116] isolated journal-line failure rolls back every financial stock and document effect',async()=>{
  const p=await setup();const before=await snapshot();
  await admin.unsafe(`CREATE FUNCTION qa_physical_fail_line() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Synthetic QA journal failure'; END $$`);
  await admin.unsafe('CREATE TRIGGER qa_physical_fail_line BEFORE INSERT ON journal_lines FOR EACH ROW EXECUTE FUNCTION qa_physical_fail_line()');
  let result;try{result=await createCommercialDocument(input(p,'purchase'));}finally{await admin.unsafe('DROP TRIGGER qa_physical_fail_line ON journal_lines');await admin.unsafe('DROP FUNCTION qa_physical_fail_line()');}
  const after=await snapshot();observe('C-116',{accepted:result.ok?1:0,newTransactionCount:after['transactions'].length-before['transactions'].length,newJournalCount:after['journal_entries'].length-before['journal_entries'].length,newDocumentCount:after['business_documents'].length-before['business_documents'].length});
  expect(result.ok).toBe(false);expect(after).toEqual(before);
});
it('[RT-017] persisted Viewer cannot create a physical purchase or sale and changes no business tables',async()=>{
  const p=await setup();await purchase(p);setActor(VIEWER,'viewer');const before=await snapshot();
  for(const type of ['purchase','goods_receipt','sales_invoice','sales_return'])expect((await createCommercialDocument(input(p,type,1,60))).ok).toBe(false);
  expect(await snapshot()).toEqual(before);
});
it('[RT-018] locked period rejects a physical sale without consuming lots or stock',async()=>{
  const p=await setup();await purchase(p);await seed.insert(schema.periodLocks).values({tenantId:TENANT_A,period:'2026-10',status:'locked',userId:OWNER});
  const before=await snapshot();expect((await createCommercialDocument(input(p,'sales_invoice',1,100))).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[RT-019] disabling sales module rejects physical sale with existing stock preserved',async()=>{
  const p=await setup();await purchase(p);await seed.update(schema.tenants).set({modules:{inventory:true,purchase:true,sales:false}}).where(eq(schema.tenants.id,TENANT_A));
  const before=await snapshot();expect((await createCommercialDocument(input(p,'sales_invoice',1,100))).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[RT-020] Viewer cannot approve an actual pending physical bill, Owner can',async()=>{
  const p=await setup('last',false,true);const pending=await create(input(p,'purchase'));const before=await snapshot();setActor(VIEWER,'viewer');
  const result=await approvePurchaseDocument(pending);const after=await snapshot();observe('RT-020',{accepted:result.ok?1:0,newJournalCount:after['journal_entries'].length-before['journal_entries'].length});
  expect({denied:!result.ok,unchanged:JSON.stringify(after)===JSON.stringify(before)}).toEqual({denied:true,unchanged:true});
  setActor();expect((await approvePurchaseDocument(pending)).ok).toBe(true);await stock(p,10,60000);
});
