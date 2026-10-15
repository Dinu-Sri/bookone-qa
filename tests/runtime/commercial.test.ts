import { beforeEach, afterAll, it, expect } from 'vitest';
import { createCommercialDocument } from '@product/web/app/actions/commercial-docs';
import { receiveCustomerPayments, allocateDocumentPayment } from '@product/web/app/actions/documents';
import { getReports } from '@product/web/app/actions/workspace';
import { loadAccessForUser } from '@product/auth/permissions/load';
import { admin, seed, resetFixture, closeFixture } from './support/fixture';
import * as schema from '@product/schema/index';
import { eq } from 'drizzle-orm';
import { TENANT_A, OWNER, VIEWER, SALES, setActor } from './support/session';
import { observe } from './support/observations';
beforeEach(resetFixture);
afterAll(closeFixture);
const DATE='2026-10-13';
async function product(type='service') {
  const [p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-'+type,name:'QA '+type,productType:type,sellPrice:'200.00',unitCost:'50.00'}).returning();return p.id;
}
const input=(productId:string,documentType='sales_invoice',extra={})=>({documentType,partyName:'Synthetic runtime customer',issueDate:DATE,lines:[{productId,description:'QA three units',quantity:3,unitPrice:200}],...extra}) as any;
async function create(data:any) { const result=await createCommercialDocument(data);expect(result, result.error).toMatchObject({ok:true});expect(result.id).toBeTruthy();return result.id!; }
async function doc(id:string) { const [d]=await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id));return d; }
async function noStock() {
  for(const table of ['inventory_movements','inventory_stock_levels','inventory_cost_layers','inventory_cost_layer_consumptions']) {
    const [r]=await admin.unsafe(`select count(*)::int as count from ${table}`);expect(r.count,table).toBe(0);
  }
}
async function ledger(expected:Record<string,number>,journalCount:number) {
  const rows=await admin`select a.code,sum(case when l.side='debit' then l.amount else -l.amount end)::text as balance from journal_lines l join accounts a on a.id=l.account_id group by a.code order by a.code`;
  expect(Object.fromEntries(rows.map(r=>[r.code,Math.round(Number(r.balance)*100)]))).toEqual(expected);
  const journals=await admin`select j.id,sum(case when l.side='debit' then l.amount else -l.amount end)::text as net,count(l.id)::int as lines from journal_entries j join journal_lines l on l.journal_entry_id=j.id group by j.id`;
  expect(journals).toHaveLength(journalCount);for(const j of journals){expect(Number(j.net)).toBe(0);expect(j.lines).toBe(2);}
  const report=await getReports('2026-10');
  if(expected['4100']!==undefined)observe('B-104',{reportedIncomeCents:Math.round(report.income.netIncome*100),expectedIncomeCents:-((expected['4000']??0)+(expected['4100']??0)),reportedCashCents:Math.round(report.cashFlow.netCashFlow*100),expectedCashCents:expected['1000']??0});
  expect(Math.round(report.income.netIncome*100)).toBe(-((expected['4000']??0)+(expected['4100']??0)));
  expect(Math.round(report.cashFlow.netCashFlow*100)).toBe(expected['1000']??0);
  await noStock();
}
async function exactJournal(transactionId:string,expected:[string,string,number][]) {
  const rows=await admin`select a.code,l.side,l.amount::text as amount,j.tenant_id,j.user_id,j.entry_date from journal_entries j join journal_lines l on l.journal_entry_id=j.id join accounts a on a.id=l.account_id where j.transaction_id=${transactionId}`;
  expect(rows.map(r=>[r.code,r.side,Math.round(Number(r.amount)*100)]).sort()).toEqual([...expected].sort());
  for(const r of rows)expect([r.tenant_id,r.user_id,r.entry_date]).toEqual([TENANT_A,OWNER,DATE]);
}
it('[B-101] real quotation/order/draft conversion preserves lines and no financial or stock posting',async()=>{
  const p=await product();
  const quote=await create(input(p,'quotation'));
  const order=await create(input(p,'sales_order',{sourceDocumentId:quote}));
  const draft=await create(input(p,'sales_invoice',{sourceDocumentId:order,intent:'draft'}));
  for(const [id,source] of [[quote,null],[order,quote],[draft,order]]) {
    const d=await doc(id!);expect([d.sourceDocumentId,Number(d.total),d.transactionId,d.postedAt]).toEqual([source,600,null,null]);
    const ls=await seed.select().from(schema.businessDocumentLines).where(eq(schema.businessDocumentLines.documentId,id!));
    expect(ls).toHaveLength(1);expect([ls[0].productId,Number(ls[0].quantity),Number(ls[0].unitPrice),Number(ls[0].lineTotal)]).toEqual([p,3,200,600]);
  }
  expect((await doc(draft)).status).toBe('draft');
  const [counts]=await admin`select (select count(*)::int from transactions) as tx,(select count(*)::int from journal_entries) as journals,(select count(*)::int from audit_log where action='CREATE' and table_name='business_documents') as audit`;
  expect(counts).toEqual({tx:0,journals:0,audit:3});await noStock();
});
it('[B-102] service and digital draft posting through actual command retains ID and exact AR/revenue',async()=>{
  for(const type of ['service','digital']) {
    await resetFixture();const p=await product(type);const draft=await create(input(p,'sales_invoice',{intent:'draft'}));
    const posted=await create(input(p,'sales_invoice',{intent:'post',existingDraftId:draft}));expect(posted).toBe(draft);
    const d=await doc(posted);expect([Number(d.total),Number(d.balanceDue),Number(d.paidAmount)]).toEqual([600,600,0]);expect(d.transactionId).toBeTruthy();expect(d.postedAt).toBeTruthy();
    const active=await admin`select count(*)::int as count from business_document_lines where document_id=${posted} and voided_at is null`;expect(active[0].count).toBe(1);
    await ledger({'1300':60000,'4000':-60000},1);
    await exactJournal(d.transactionId!,[['1300','debit',60000],['4000','credit',60000]]);
    const audits=await admin`select user_id,tenant_id,record_id from audit_log where table_name='business_documents' and record_id=${posted}`;
    expect(audits.length).toBeGreaterThanOrEqual(1);for(const a of audits)expect([a.user_id,a.tenant_id]).toEqual([OWNER,TENANT_A]);
  }
});
it('[B-103] actual invoice then two receipts reconcile persisted subledger/journals/audit after each command',async()=>{
  const p=await product();const id=await create(input(p));const invoice=await doc(id);await ledger({'1300':60000,'4000':-60000},1);
  await exactJournal(invoice.transactionId!,[['1300','debit',60000],['4000','credit',60000]]);
  let paid=0,count=0;
  for(const amount of [250,350]) {
    const result=await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:id,amount}]});expect(result,result.error).toMatchObject({ok:true,paidCount:1});paid+=amount;count++;
    const d=await doc(id);expect([Number(d.total),Number(d.paidAmount),Number(d.balanceDue),d.status]).toEqual([600,paid,600-paid,paid===600?'paid':'partial']);
    await ledger({'1000':paid*100,'1300':(600-paid)*100,'4000':-60000},count+1);
    const allocations=await seed.select().from(schema.settlementAllocations);expect(allocations).toHaveLength(count);expect(allocations.reduce((n,a)=>n+Number(a.allocatedAmount),0)).toBe(paid);
    for(const a of allocations) {
      expect([a.tenantId,a.invoiceTransactionId]).toEqual([TENANT_A,invoice.transactionId]);
      const [payment]=await seed.select().from(schema.transactions).where(eq(schema.transactions.id,a.paymentTransactionId));
      expect([payment.tenantId,payment.userId,payment.date,payment.accountingType,payment.direction,Number(payment.amount)]).toEqual([TENANT_A,OWNER,DATE,'payment','money_in',Number(a.allocatedAmount)]);
      await exactJournal(a.paymentTransactionId,[['1000','debit',Math.round(Number(a.allocatedAmount)*100)],['1300','credit',Math.round(Number(a.allocatedAmount)*100)]]);
      const audit=await admin`select user_id,tenant_id,new_values from audit_log where action='ALLOCATE' and record_id=${a.paymentTransactionId}`;
      expect(audit).toHaveLength(1);expect([audit[0].user_id,audit[0].tenant_id]).toEqual([OWNER,TENANT_A]);expect(audit[0].new_values).toMatchObject({documentId:id,paymentTransactionId:a.paymentTransactionId,amount:Number(a.allocatedAmount)});
    }
  }
});
it('[E-115] actual persisted role loading denies Viewer command with positive Owner/Sales controls',async()=>{
  const p=await product();
  for(const [id,role] of [[OWNER,'owner'],[SALES,'sales']]) {setActor(id,role);const access=await loadAccessForUser(id,TENANT_A,'user');expect(access?.jobSlug).toBe(role);expect(access?.allows('sales.invoices.write','write')).toBe(true);await create(input(p));}
  const [before]=await admin`select (select count(*)::int from transactions) as tx,(select count(*)::int from business_documents) as docs,(select count(*)::int from journal_entries) as journals,(select count(*)::int from audit_log) as audits`;
  setActor(VIEWER,'viewer');const access=await loadAccessForUser(VIEWER,TENANT_A,'user');expect(access?.jobSlug).toBe('viewer');expect(access?.allows('sales.invoices.write','write')).toBe(false);
  expect((await createCommercialDocument(input(p))).ok).toBe(false);
  const [after]=await admin`select (select count(*)::int from transactions) as tx,(select count(*)::int from business_documents) as docs,(select count(*)::int from journal_entries) as journals,(select count(*)::int from audit_log) as audits`;expect(after).toEqual(before);
});
it('[E-116] module and entity ceilings remain enforced for loaded Owner and Sales roles',async()=>{
  const cases=[['company',null,true,true],['sole_prop','lite',true,true],['sole_prop','full',true,true],['personal',null,true,false],['pending',null,true,false],['company',null,false,false]] as const;
  for(const [entityKind,capabilityTier,enabled,expected] of cases) {
    await seed.update(schema.tenants).set({entityKind,capabilityTier,modules:{sales:enabled}}).where(eq(schema.tenants.id,TENANT_A));
    for(const userId of [OWNER,SALES]) {const access=await loadAccessForUser(userId,TENANT_A,'user');expect(access).toBeTruthy();expect(access!.allows('sales.invoices.write','write'),JSON.stringify({entityKind,capabilityTier,enabled,userId})).toBe(expected);}
  }
});
it('[E-117] persisted allow overrides cannot elevate Viewer or disabled module; explicit deny restricts Owner',async()=>{
  await seed.insert(schema.tenantPermissionOverrides).values({tenantId:TENANT_A,userId:VIEWER,permissionKey:'sales.invoices.write',effect:'allow'});
  expect((await loadAccessForUser(VIEWER,TENANT_A,'user'))?.allows('sales.invoices.write','write')).toBe(false);
  await seed.insert(schema.tenantPermissionOverrides).values({tenantId:TENANT_A,userId:OWNER,permissionKey:'sales.invoices.write',effect:'deny'});
  expect((await loadAccessForUser(OWNER,TENANT_A,'user'))?.allows('sales.invoices.write','write')).toBe(false);
  await seed.update(schema.tenants).set({modules:{sales:false}}).where(eq(schema.tenants.id,TENANT_A));
  await seed.insert(schema.tenantPermissionOverrides).values({tenantId:TENANT_A,userId:SALES,permissionKey:'sales.invoices.write',effect:'allow'});
  expect((await loadAccessForUser(SALES,TENANT_A,'user'))?.allows('sales.invoices.write','write')).toBe(false);
});
it('[RT-008] actual schema rejects missing FK and duplicate unique key with zero saved effects',async()=>{
  await expect(admin`insert into business_documents(tenant_id,user_id,party_id,document_type,document_number,issue_date,subtotal,total,balance_due) values(${TENANT_A},${OWNER},'00000000-0000-4000-8000-000000000099','sales_invoice','INVALID-FK',${DATE},600,600,600)`).rejects.toMatchObject({code:'23503'});
  await expect(admin`insert into tenants(name,slug) values('Duplicate synthetic','qa-runtime-a')`).rejects.toMatchObject({code:'23505'});
  const [state]=await admin`select (select count(*)::int from business_documents) as docs,(select count(*)::int from tenants) as tenants`;
  expect(state).toEqual({docs:0,tenants:2});
});
async function businessSnapshot() {
  const out={};for(const table of ['business_documents','transactions','journal_entries','journal_lines','settlement_allocations','audit_log','inventory_movements'])out[table]=await admin.unsafe(`select * from ${table} order by id`);return out;
}
it('[RT-009] direct allocation uses persisted Viewer/Sales permission and valid custom bank',async()=>{
  const p=await product();const id=await create(input(p));
  await seed.insert(schema.accounts).values({tenantId:TENANT_A,code:'1101',name:'Custom synthetic bank',type:'asset',normalSide:'debit'});
  const before=await businessSnapshot();setActor(VIEWER,'viewer');
  expect((await allocateDocumentPayment({documentId:id,amount:250,paymentDate:DATE,paymentAccountCode:'1101'})).ok).toBe(false);expect(await businessSnapshot()).toEqual(before);
  setActor(SALES,'sales');expect((await allocateDocumentPayment({documentId:id,amount:250,paymentDate:DATE,paymentAccountCode:'1101'})).ok).toBe(true);
  const d=await doc(id);expect([Number(d.paidAmount),Number(d.balanceDue)]).toEqual([250,350]);
  const rows=await admin`select a.code,l.side,l.amount::text as amount from journal_lines l join accounts a on a.id=l.account_id join journal_entries j on j.id=l.journal_entry_id join transactions t on t.id=j.transaction_id where t.accounting_type='payment' order by a.code`;
  expect(rows.map(r=>[r.code,r.side,Number(r.amount)])).toEqual([['1101','debit',250],['1300','credit',250]]);
});
it('[RT-010] Sales AR grant cannot pay AP bill; Owner AP positive control has exact posting',async()=>{
  await seed.insert(schema.accounts).values([{tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},{tenantId:TENANT_A,code:'6800',name:'Service expense',type:'expense',normalSide:'debit'}]);
  const p=await product();const id=await create(input(p,'purchase'));expect(Number((await doc(id)).total)).toBe(600);
  const before=await businessSnapshot();setActor(SALES,'sales');const access=await loadAccessForUser(SALES,TENANT_A,'user');expect(access?.allows('sales.payments.write','write')).toBe(true);expect(access?.allows('purchase.payments.write','write')).toBe(false);
  expect((await allocateDocumentPayment({documentId:id,amount:100,paymentDate:DATE,paymentAccountCode:'1000'})).ok).toBe(false);expect(await businessSnapshot()).toEqual(before);
  setActor();expect((await allocateDocumentPayment({documentId:id,amount:100,paymentDate:DATE,paymentAccountCode:'1000'})).ok).toBe(true);
  const payments=await admin`select id from transactions where accounting_type='payment'`;expect(payments).toHaveLength(1);await exactJournal(payments[0].id,[['2100','debit',10000],['1000','credit',10000]]);
  expect([Number((await doc(id)).paidAmount),Number((await doc(id)).balanceDue)]).toEqual([100,500]);
});
it('[RT-011] actual assigned-location scope denies other-location allocation with own positive control',async()=>{
  const locations=await seed.insert(schema.locations).values([{tenantId:TENANT_A,name:'Assigned synthetic shop',code:'QA-L1'},{tenantId:TENANT_A,name:'Other synthetic shop',code:'QA-L2'}]).returning();
  const [membership]=await seed.select().from(schema.tenantMemberships).where(eq(schema.tenantMemberships.userId,SALES));
  await seed.insert(schema.tenantMembershipScopes).values({tenantId:TENANT_A,membershipId:membership.id,scopeType:'location',targetId:locations[0].id});
  const p=await product();const own=await create(input(p,'sales_invoice',{locationId:locations[0].id}));const other=await create(input(p,'sales_invoice',{locationId:locations[1].id}));
  const before=await businessSnapshot();setActor(SALES,'sales');expect((await loadAccessForUser(SALES,TENANT_A,'user'))?.locationIds).toEqual([locations[0].id]);
  expect((await allocateDocumentPayment({documentId:other,amount:100,paymentDate:DATE,paymentAccountCode:'1000'})).ok).toBe(false);expect(await businessSnapshot()).toEqual(before);
  expect((await allocateDocumentPayment({documentId:own,amount:100,paymentDate:DATE,paymentAccountCode:'1000'})).ok).toBe(true);expect(Number((await doc(own)).balanceDue)).toBe(500);expect(Number((await doc(other)).balanceDue)).toBe(600);
});
it('[B-104] actual invoice receipt250 and credit100 reconcile AR250 cash250 revenue500',async()=>{
  // Independent existing B-003 posting contract specifies Sales Returns4100.
  // First PostgreSQL attempt lacked this required fixture account and incorrectly
  // expected direct4000 reduction. Preserve that attempt as harness failure.
  await seed.insert(schema.accounts).values({tenantId:TENANT_A,code:'4100',name:'Sales Returns',type:'revenue',normalSide:'debit'});
  const p=await product();const id=await create(input(p));expect((await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:id,amount:250}]})).ok).toBe(true);
  await ledger({'1000':25000,'1300':35000,'4000':-60000},2);
  // First v2.5.6 attempt changed source description/price and stopped at creation. Preserve it.
  // Use a copied source line: half a service unit at original200 still credits the independently expected100.
  const credit=await create(input(p,'sales_return',{sourceDocumentId:id,lines:[{productId:p,description:'QA three units',quantity:0.5,unitPrice:200}]}));
  const original=await doc(id),returned=await doc(credit);expect([Number(original.total),Number(original.paidAmount),Number(original.balanceDue),original.status]).toEqual([600,350,250,'partial']);
  expect([returned.sourceDocumentId,Number(returned.total),Number(returned.paidAmount),Number(returned.balanceDue)]).toEqual([id,100,100,0]);
  await exactJournal(returned.transactionId!,[['4100','debit',10000],['1300','credit',10000]]);
  const allocations=await seed.select().from(schema.settlementAllocations);expect(allocations).toHaveLength(2);expect(allocations.map(a=>Number(a.allocatedAmount)).sort((a,b)=>a-b)).toEqual([100,250]);for(const a of allocations)expect(a.invoiceTransactionId).toBe(original.transactionId);
  await noStock();
  await ledger({'1000':25000,'1300':25000,'4000':-60000,'4100':10000},3);
});

it('[RT-060] balance sheet includes unclosed earnings without changing journals',async()=>{
  const p=await product();await create(input(p));
  await ledger({'1300':60000,'4000':-60000},1);
  const report=await getReports('2026-10');
  const assetCents=Math.round(report.balanceSheet.totalAssets*100);
  const liabilityCents=Math.round(report.balanceSheet.totalLiabilities*100);
  const equityCents=Math.round(report.balanceSheet.totalEquity*100);
  const profitCents=Math.round(report.income.netIncome*100);
  observe('RT-060',{assetCents,liabilityCents,equityCents,profitCents,expectedAssetCents:60000,expectedEquityCents:60000});
  expect([assetCents,liabilityCents,profitCents]).toEqual([60000,0,60000]);
  expect(equityCents,'unclosed current earnings belong in report equity, not a forced balancing journal').toBe(60000);
  expect(assetCents).toBe(liabilityCents+equityCents);
  await ledger({'1300':60000,'4000':-60000},1);
});
