import {beforeEach,afterAll,it,expect} from 'vitest';
import {eq,and} from 'drizzle-orm';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {allocateDocumentPayment,receiveCustomerPayments} from '@product/web/app/actions/documents';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import * as schema from '@product/schema/index';
import {TENANT_A,OWNER} from './support/session';
import {observe} from './support/observations';
beforeEach(resetFixture);afterAll(closeFixture);
const DATE='2026-10-13';
async function product(){const[p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-DEEP',name:'Synthetic service',productType:'service',sellPrice:'200.00'}).returning();return p.id;}
const input=(p:string,extra={})=>({documentType:'sales_invoice',partyName:'Synthetic deep customer',issueDate:DATE,lines:[{productId:p,description:'Historical service description',quantity:3,unitPrice:200}],...extra}) as any;
async function invoice(p:string,extra={}){const r=await createCommercialDocument(input(p,extra));expect(r,r.error).toMatchObject({ok:true});return r.id!;}
const payment=(id:string,amount=250)=>({documentId:id,amount,paymentDate:DATE,paymentAccountCode:'1000'});
async function doc(id:string){return(await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id)))[0];}
async function snapshot(){const out={};for(const table of ['parties','business_documents','business_document_lines','transactions','journal_entries','journal_lines','settlement_allocations','audit_log','inventory_movements'])out[table]=await admin.unsafe(`select * from ${table} order by id`);return out;}
it('[B-106] successful same-key invoice and payment retries retain exactly one accepted effect',async()=>{
 const p=await product(),key='qa-campaign-invoice';const a=await invoice(p,{idempotencyKey:key}),b=await invoice(p,{idempotencyKey:key});expect(a).toBe(b);
 const request={paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:a,amount:250}],idempotencyKey:'qa-campaign-payment'};
 const first=await receiveCustomerPayments(request);expect(first.ok).toBe(true);const before=await snapshot();const replay=await receiveCustomerPayments(request);const [count]=await admin`select count(*)::int as n from transactions where accounting_type='payment'`;const d=await doc(a);observe('B-106',{invoiceReplaySame:a===b?1:0,firstPaymentAccepted:first.ok?1:0,replayAccepted:replay.ok?1:0,paymentCount:count.n,paidCents:Math.round(Number(d.paidAmount)*100),balanceCents:Math.round(Number(d.balanceDue)*100)});expect(replay.ok).toBe(true);expect(await snapshot()).toEqual(before);expect([Number(d.paidAmount),Number(d.balanceDue)]).toEqual([250,350]);
});
it('[B-107] controlled simultaneous350 receipts against600 accept only one and reconcile cash AR allocations',async()=>{
 const id=await invoice(await product());await admin`select pg_advisory_lock(9921107)`;
 await admin.unsafe(`CREATE FUNCTION qa_payment_gate() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN PERFORM pg_advisory_xact_lock(9921107); RETURN NEW; END $$`);
 await admin.unsafe(`CREATE TRIGGER qa_payment_gate BEFORE INSERT ON transactions FOR EACH ROW WHEN (NEW.accounting_type='payment') EXECUTE FUNCTION qa_payment_gate()`);
 const pending=Promise.all([allocateDocumentPayment(payment(id,350)),allocateDocumentPayment(payment(id,350))]);
 try{for(let i=0;i<100;i++){const[r]=await admin`select count(*)::int as n from pg_locks where locktype='advisory' and objid=9921107 and not granted`;if(r.n>=1){await new Promise(r=>setTimeout(r,250));break;}await new Promise(r=>setTimeout(r,20));}}
 finally{await admin`select pg_advisory_unlock(9921107)`;}
 let results;try{results=await pending;}finally{await admin.unsafe('DROP TRIGGER qa_payment_gate ON transactions');await admin.unsafe('DROP FUNCTION qa_payment_gate()');}
 const[r]=await admin`select count(*)::int as n,coalesce(sum(amount),0)::text as amount from transactions where accounting_type='payment'`;
 const[due]=await admin`select coalesce(sum(case when l.side='debit' then l.amount else -l.amount end),0)::text as amount from journal_lines l join accounts a on a.id=l.account_id where a.code='1300'`;
 const d=await doc(id);const actual={accepted:results.filter(r=>r.ok).length,payments:r.n,receiptCents:Math.round(Number(r.amount)*100),paidCents:Math.round(Number(d.paidAmount)*100),balanceCents:Math.round(Number(d.balanceDue)*100),arCents:Math.round(Number(due.amount)*100)};observe('B-107',actual);expect(actual).toEqual({accepted:1,payments:1,receiptCents:35000,paidCents:35000,balanceCents:25000,arCents:25000});
});
it('[B-108] real draft quote and voided invoice deny allocation without business changes',async()=>{
 const p=await product(),draft=await invoice(p,{intent:'draft'}),quote=await invoice(p,{documentType:'quotation'}),posted=await invoice(p);
 await seed.update(schema.businessDocuments).set({voidedAt:new Date()}).where(eq(schema.businessDocuments.id,posted));const before=await snapshot();
 for(const id of [draft,quote,posted])expect((await allocateDocumentPayment(payment(id))).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[B-111] locked-period payment credit and invoice have zero business changes',async()=>{
 const p=await product(),id=await invoice(p);await seed.insert(schema.periodLocks).values({tenantId:TENANT_A,userId:OWNER,period:'2026-10',status:'locked'});const before=await snapshot();
 expect((await allocateDocumentPayment(payment(id))).ok).toBe(false);
 expect((await createCommercialDocument(input(p,{documentType:'sales_return',sourceDocumentId:id,lines:[{productId:p,description:'Credit',quantity:1,unitPrice:100}]}))).ok).toBe(false);
 expect((await createCommercialDocument(input(p))).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[B-112] allocation faults at each durable insert boundary roll back the whole payment',async()=>{
 const id=await invoice(await product());
 for(const table of ['transactions','journal_entries','journal_lines','settlement_allocations','audit_log']){
  const before=await snapshot();await admin.unsafe(`CREATE FUNCTION qa_allocation_fault() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Synthetic allocation failure'; END $$`);
  await admin.unsafe(`CREATE TRIGGER qa_allocation_fault BEFORE INSERT ON ${table} FOR EACH ROW EXECUTE FUNCTION qa_allocation_fault()`);
  let result;try{result=await allocateDocumentPayment(payment(id));}finally{await admin.unsafe(`DROP TRIGGER qa_allocation_fault ON ${table}`);await admin.unsafe('DROP FUNCTION qa_allocation_fault()');}
  expect(result.ok).toBe(false);expect(await snapshot(),table).toEqual(before);
 }
});
it('[B-113] posted line prices quantities description and transaction party survive master renames',async()=>{
 const p=await product(),id=await invoice(p),d=await doc(id);const lines=await seed.select().from(schema.businessDocumentLines).where(eq(schema.businessDocumentLines.documentId,id));const before=await snapshot();
 await seed.update(schema.inventoryProducts).set({name:'Renamed synthetic service',sellPrice:'999.00'}).where(eq(schema.inventoryProducts.id,p));await seed.update(schema.parties).set({name:'Renamed synthetic customer'}).where(eq(schema.parties.id,d.partyId));
 expect(await doc(id)).toEqual(d);expect(await seed.select().from(schema.businessDocumentLines).where(eq(schema.businessDocumentLines.documentId,id))).toEqual(lines);const after=await snapshot();for(const table of ['transactions','journal_entries','journal_lines','settlement_allocations'])expect(after[table]).toEqual(before[table]);
});
it('[E-108] revoked membership denies stale synthetic Owner command despite unchanged session role',async()=>{
 const p=await product();await invoice(p);await seed.update(schema.tenantMemberships).set({status:'suspended'}).where(and(eq(schema.tenantMemberships.userId,OWNER),eq(schema.tenantMemberships.tenantId,TENANT_A)));const before=await snapshot();
 expect((await createCommercialDocument(input(p))).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('[E-113] voided mandatory AR account cannot produce a successful or partial service invoice',async()=>{
 const p=await product();await seed.update(schema.accounts).set({voidedAt:new Date()}).where(and(eq(schema.accounts.tenantId,TENANT_A),eq(schema.accounts.code,'1300')));const before=await snapshot();expect((await createCommercialDocument(input(p))).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
