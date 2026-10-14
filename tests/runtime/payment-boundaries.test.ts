import {beforeEach,afterAll,it,expect} from 'vitest';
import {eq} from 'drizzle-orm';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {allocateDocumentPayment,receiveCustomerPayments,payVendorBills} from '@product/web/app/actions/documents';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import * as schema from '@product/schema/index';
import {TENANT_A} from './support/session';
import {observe} from './support/observations';
const DATE='2026-10-14';
beforeEach(async()=>{
 await resetFixture();
 await seed.insert(schema.accounts).values([
  {tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},
  {tenantId:TENANT_A,code:'6800',name:'Service Expense',type:'expense',normalSide:'debit'},
 ]);
 await seed.insert(schema.purchaseSettings).values({tenantId:TENANT_A,requireBillApproval:'0',requireGrnBeforeBill:'0',postGrniOnReceipt:'0'});
});afterAll(closeFixture);
async function product(){return(await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-PAY-BOUNDARY',name:'Synthetic service',productType:'service',sellPrice:'200.00'}).returning())[0].id;}
async function create(p:string,type='sales_invoice',extra={}){
 const r=await createCommercialDocument({documentType:type,partyName:type.startsWith('sales')?'Synthetic boundary customer':'Synthetic boundary supplier',issueDate:DATE,expenseAccountCode:'6800',lines:[{productId:p,description:'Synthetic service',quantity:3,unitPrice:200,accountCode:'6800'}],...extra} as any);
 expect(r,r.error).toMatchObject({ok:true});return r.id!;
}
async function snapshot(){const out={};for(const t of ['parties','business_documents','business_document_lines','transactions','journal_entries','journal_lines','settlement_allocations','audit_log'])out[t]=await admin.unsafe(`select * from ${t} order by id`);return out;}
async function counts(){const [r]=await admin`select count(*)::int as payment_count,coalesce(sum(amount),0)::text as total from transactions where accounting_type='payment'`;return{paymentCount:r.payment_count,paymentCents:Math.round(Number(r.total)*100)};}
async function due(id:string){return(await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id)))[0];}
it('[RT-024] concurrent AP350 payments against600 serialize and reconcile one cash outflow',async()=>{
 const id=await create(await product(),'purchase');await admin`select pg_advisory_lock(9921124)`;
 await admin.unsafe(`CREATE FUNCTION qa_ap_payment_gate() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN PERFORM pg_advisory_xact_lock(9921124); RETURN NEW; END $$`);
 await admin.unsafe(`CREATE TRIGGER qa_ap_payment_gate BEFORE INSERT ON transactions FOR EACH ROW WHEN (NEW.accounting_type='payment') EXECUTE FUNCTION qa_ap_payment_gate()`);
 const request={documentId:id,paymentDate:DATE,paymentAccountCode:'1000',amount:350};const pending=Promise.all([allocateDocumentPayment(request),allocateDocumentPayment(request)]);
 let sawWait=false;try{for(let i=0;i<100;i++){const[r]=await admin`select count(*)::int as n from pg_locks where locktype='advisory' and objid=9921124 and not granted`;if(r.n>=1){sawWait=true;await new Promise(r=>setTimeout(r,250));break;}await new Promise(r=>setTimeout(r,20));}}finally{await admin`select pg_advisory_unlock(9921124)`;}
 let results;try{results=await pending;}finally{await admin.unsafe('DROP TRIGGER qa_ap_payment_gate ON transactions');await admin.unsafe('DROP FUNCTION qa_ap_payment_gate()');}
 const d=await due(id),c=await counts();const [net]=await admin`select coalesce(sum(case when a.code='1000' then case when l.side='debit' then l.amount else -l.amount end else 0 end),0)::text as cash,coalesce(sum(case when a.code='2100' then case when l.side='credit' then l.amount else -l.amount end else 0 end),0)::text as ap from journal_lines l join accounts a on a.id=l.account_id`;
 const actual={controlledWait:sawWait?1:0,accepted:results.filter(r=>r.ok).length,...c,paidCents:Math.round(Number(d.paidAmount)*100),balanceCents:Math.round(Number(d.balanceDue)*100),cashCents:Math.round(Number(net.cash)*100),apCents:Math.round(Number(net.ap)*100)};observe('RT-024',actual);
 expect(actual).toEqual({controlledWait:1,accepted:1,paymentCount:1,paymentCents:35000,paidCents:35000,balanceCents:25000,cashCents:-35000,apCents:25000});
});
it('[B-115] mixed valid and draft AR payment batch is atomic and replay cannot hide partial effects',async()=>{
 const p=await product(),a=await create(p),invalid=await create(p,'sales_invoice',{intent:'draft'}),before=await snapshot();
 const request={paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:a,amount:250},{documentId:invalid,amount:100}],idempotencyKey:'qa-boundary-ar-batch'};
 const first=await receiveCustomerPayments(request),after=await snapshot(),replay=await receiveCustomerPayments(request),c=await counts(),d=await due(a);
 const actual={firstAccepted:first.ok?1:0,replayAccepted:replay.ok?1:0,unchanged:JSON.stringify(after)===JSON.stringify(before)?1:0,replayUnchanged:JSON.stringify(await snapshot())===JSON.stringify(after)?1:0,...c,paidCents:Math.round(Number(d.paidAmount)*100),balanceCents:Math.round(Number(d.balanceDue)*100)};observe('B-115',actual);
 expect(actual).toEqual({firstAccepted:0,replayAccepted:0,unchanged:1,replayUnchanged:1,paymentCount:0,paymentCents:0,paidCents:0,balanceCents:60000});
});
it('[RT-025] completed AR idempotency key with a different invoice payload is refused',async()=>{
 const p=await product(),a=await create(p),b=await create(p),key='qa-boundary-request-identity';
 const request={paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:a,amount:250}],idempotencyKey:key};expect((await receiveCustomerPayments(request)).ok).toBe(true);
 const before=await snapshot(),different=await receiveCustomerPayments({...request,allocations:[{documentId:b,amount:250}]}),c=await counts(),second=await due(b);
 const actual={differentAccepted:different.ok?1:0,unchanged:JSON.stringify(await snapshot())===JSON.stringify(before)?1:0,...c,secondPaidCents:Math.round(Number(second.paidAmount)*100),secondBalanceCents:Math.round(Number(second.balanceDue)*100)};observe('RT-025',actual);
 expect(actual).toEqual({differentAccepted:0,unchanged:1,paymentCount:1,paymentCents:25000,secondPaidCents:0,secondBalanceCents:60000});
});
it('[RT-026] mixed valid bill and nonposting order AP batch is all-or-nothing',async()=>{
 const p=await product(),a=await create(p,'purchase'),invalid=await create(p,'purchase_order'),before=await snapshot();
 const result=await payVendorBills({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:a,amount:250},{documentId:invalid,amount:100}]}),c=await counts(),d=await due(a);
 const actual={accepted:result.ok?1:0,unchanged:JSON.stringify(await snapshot())===JSON.stringify(before)?1:0,...c,paidCents:Math.round(Number(d.paidAmount)*100),balanceCents:Math.round(Number(d.balanceDue)*100)};observe('RT-026',actual);
 expect(actual).toEqual({accepted:0,unchanged:1,paymentCount:0,paymentCents:0,paidCents:0,balanceCents:60000});
});
