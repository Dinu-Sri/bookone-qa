import { beforeAll, beforeEach, afterAll, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import { allocateDocumentPayment, receiveCustomerPayments } from '@product/web/app/actions/documents';
import { getReports } from '@product/web/app/actions/workspace';
import { listParties } from '@product/web/app/actions/parties';
import { db, openDatabase, resetDatabase, closeDatabase, accounts, parties, transactions,
  businessDocuments, journalEntries, journalLines, settlementAllocations, auditLog, periodLocks, eq } from './support/database';
import { TENANT_A, TENANT_B, setActor } from './support/actor';
import { exactLines, line } from './support/oracles';
const DATE='2026-10-13', USER='00000000-0000-4000-8000-000000000003';
// Operational logger is outside the financial boundary; retain real permission checks.
vi.mock('@/lib/ops-log',()=>({logOps:async()=>{},logIfSlow:async()=>{}}));
beforeAll(async()=>{vi.useFakeTimers({toFake:['Date']});vi.setSystemTime(new Date(`${DATE}T12:00:00Z`));await openDatabase();});
beforeEach(resetDatabase);
afterAll(async()=>{await closeDatabase();vi.useRealTimers();});
async function snapshot() {
  return {docs:await db().select().from(businessDocuments),tx:await db().select().from(transactions),
    journals:await db().select().from(journalEntries),lines:await db().select().from(journalLines),
    allocations:await db().select().from(settlementAllocations),audit:await db().select().from(auditLog)};
}
async function invoice(cents=10000, posted=true) {
  const [ar]=await db().insert(accounts).values({tenantId:TENANT_A,code:'1300',name:'AR',type:'asset',normalSide:'debit'}).returning();
  const [rev]=await db().select().from(accounts).where(eq(accounts.code,'4000'));
  const [p]=await db().insert(parties).values({tenantId:TENANT_A,name:'Synthetic payer',isCustomer:'1'}).returning();
  // Independent seeded posted invoice; this DOES NOT exercise commercial creation.
  let txId: string|undefined;
  if (posted) {
    const [tx]=await db().insert(transactions).values({tenantId:TENANT_A,userId:USER,direction:'money_in',accountingType:'invoice_bill',
      party:p.name,description:'QA invoice fixture',amount:(cents/100).toFixed(2),date:DATE,paymentMethod:'Credit',paymentAccountId:ar.id}).returning();txId=tx.id;
    const [j]=await db().insert(journalEntries).values({tenantId:TENANT_A,userId:USER,transactionId:tx.id,
      memo:'Independent invoice fixture',entryDate:DATE,isBalanced:'1'}).returning();
    await db().insert(journalLines).values([{tenantId:TENANT_A,journalEntryId:j.id,accountId:ar.id,side:'debit',amount:(cents/100).toFixed(2)},
      {tenantId:TENANT_A,journalEntryId:j.id,accountId:rev.id,side:'credit',amount:(cents/100).toFixed(2)}]);
  }
  const [doc]=await db().insert(businessDocuments).values({tenantId:TENANT_A,userId:USER,partyId:p.id,transactionId:txId,
    documentType:'sales_invoice',documentNumber:'QA-PAY-1',issueDate:DATE,status:posted?'open':'draft',
    postedAt:posted?new Date():null,subtotal:(cents/100).toFixed(2),total:(cents/100).toFixed(2),balanceDue:(cents/100).toFixed(2)}).returning();
  return doc.id;
}
const pay=(documentId:string,cents:number,paymentAccountCode='1000')=>allocateDocumentPayment({documentId,amount:cents/100,paymentDate:DATE,paymentAccountCode});
async function verifyPaid(id:string,total:number,paid:number,count:number) {
  const [d]=await db().select().from(businessDocuments).where(eq(businessDocuments.id,id));
  expect([Number(d.paidAmount),Number(d.balanceDue),d.status]).toEqual([paid/100,(total-paid)/100,paid===total?'paid':paid?'partial':'open']);
  const state=await snapshot(), codes=new Map((await db().select().from(accounts)).map(a=>[a.id,a.code]));
  expect([state.tx.length,state.journals.length,state.allocations.length,state.audit.length]).toEqual([1+count,1+count,count,count]);
  expect(Math.round(state.allocations.reduce((n,a)=>n+Number(a.allocatedAmount),0)*100)).toBe(paid);
  for(const allocation of state.allocations) {
    expect([allocation.tenantId,allocation.invoiceTransactionId]).toEqual([TENANT_A,d.transactionId]);
    const payment=state.tx.find(t=>t.id===allocation.paymentTransactionId)!;
    expect([payment.tenantId,payment.userId,payment.date,payment.accountingType,payment.direction])
      .toEqual([TENANT_A,USER,DATE,'payment','money_in']);
    expect(Number(payment.amount)).toBe(Number(allocation.allocatedAmount));
    expect(state.journals.filter(j=>j.transactionId===payment.id)).toHaveLength(1);
    const audit=state.audit.find(a=>a.recordId===payment.id)!;
    expect([audit.action,audit.tenantId,audit.userId,audit.tableName]).toEqual(['ALLOCATE',TENANT_A,USER,'settlement_allocations']);
    expect(audit.newValues).toMatchObject({documentId:id,paymentTransactionId:payment.id,amount:Number(allocation.allocatedAmount)});
  }
  for(const j of state.journals.filter(j=>j.memo!=='Independent invoice fixture')) {
    const ls=state.lines.filter(l=>l.journalEntryId===j.id);
    const value=Number(ls[0].amount);
    exactLines(ls.map(l=>({accountCode:codes.get(l.accountId)!,side:l.side,amount:Number(l.amount)})),
      [line('1000','debit',value),line('1300','credit',value)]);
    expect(j.entryDate).toBe(DATE);expect(j.tenantId).toBe(TENANT_A);
  }
  const report=await getReports('2026-10');
  expect(Math.round(report.cashFlow.netCashFlow*100)).toBe(paid);
  expect(Math.round(report.income.netIncome*100)).toBe(total);
  const ar=report.trialBalance.find(a=>a.accountCode==='1300');
  expect(Math.round(ar!.balance*100)).toBe(total-paid);
  expect(Math.round((await listParties({kind:'customer'}))[0].openReceivable*100)).toBe(total-paid);
}
it('B-004 partial then full allocation reconciles document, journal, AR and audit',async()=>{
  const id=await invoice();expect((await pay(id,3000)).ok).toBe(true);await verifyPaid(id,10000,3000,1);
  expect((await pay(id,7000)).ok).toBe(true);await verifyPaid(id,10000,10000,2);
});
it('B-005 overpayment and payment to fully paid invoice have zero side effects',async()=>{
  const id=await invoice();let before=await snapshot();expect((await pay(id,10001)).ok).toBe(false);expect(await snapshot()).toEqual(before);
  expect((await pay(id,10000)).ok).toBe(true);before=await snapshot();expect((await pay(id,1)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('B-006 locked payment period has zero financial, allocation or audit changes',async()=>{
  const id=await invoice();await db().insert(periodLocks).values({tenantId:TENANT_A,userId:USER,period:'2026-10',status:'locked'});
  const before=await snapshot();expect((await pay(id,100)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('B-007 direct allocation boundary must deny Viewer with no persisted changes',async()=>{
  const id=await invoice();const before=await snapshot();setActor('viewer');
  const result=await pay(id,100);
  expect({denied:!result.ok,unchanged:JSON.stringify(await snapshot())===JSON.stringify(before)}).toEqual({denied:true,unchanged:true});
});
it('B-008 real foreign-tenant invoice cannot receive a payment',async()=>{
  const id=await invoice();const before=await snapshot();setActor('owner',TENANT_B);
  expect((await pay(id,100)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('B-009 unposted invoice and zero/negative payment create no allocations',async()=>{
  const id=await invoice(10000,false);const before=await snapshot();
  for(const cents of [100,0,-100])expect((await pay(id,cents)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('B-010 generated legal partial-payment sequences reconcile after every command',async()=>{
  await fc.assert(fc.asyncProperty(fc.integer({min:2,max:50000}),fc.array(fc.integer({min:1,max:5000}),{minLength:1,maxLength:8}),async(total,steps)=>{
    await resetDatabase();const id=await invoice(total);let paid=0,count=0;
    for(const amount of [...steps,total]) {
      if(paid===total)break;
      const cents=Math.min(amount,total-paid);expect((await pay(id,cents)).ok).toBe(true);
      paid+=cents;count++;await verifyPaid(id,total,paid,count);
    }
  }),{seed:Number(process.env.QA_SEED??261013),numRuns:Number(process.env.QA_MODEL_RUNS??30),
    ...(process.env.QA_REPLAY_SHRINK_PATH?{path:process.env.QA_REPLAY_SHRINK_PATH}:{})});
},180_000);
it('B-011 revenue account must not be accepted as receipt tender',async()=>{
  const id=await invoice();const before=await snapshot();const result=await pay(id,100,'4000');
  expect({denied:!result.ok,unchanged:JSON.stringify(await snapshot())===JSON.stringify(before)}).toEqual({denied:true,unchanged:true});
});
it('B-012 normal payment wrapper denies Viewer as actor-adapter positive control',async()=>{
  const id=await invoice();const before=await snapshot();setActor('viewer');
  const result=await receiveCustomerPayments({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:id,amount:1}]});
  expect({denied:!result.ok,unchanged:JSON.stringify(await snapshot())===JSON.stringify(before)}).toEqual({denied:true,unchanged:true});
});
it('B-013 custom active bank1101 is valid tender with exact journal and linked allocation',async()=>{
  const id=await invoice();await db().insert(accounts).values({tenantId:TENANT_A,code:'1101',name:'Synthetic custom bank',type:'asset',normalSide:'debit'});
  expect((await pay(id,2500,'1101')).ok).toBe(true);
  const state=await snapshot(),codes=new Map((await db().select().from(accounts)).map(a=>[a.id,a.code]));
  const payment=state.tx.find(t=>t.accountingType==='payment')!;const journal=state.journals.find(j=>j.transactionId===payment.id)!;
  exactLines(state.lines.filter(l=>l.journalEntryId===journal.id).map(l=>({accountCode:codes.get(l.accountId)!,side:l.side,amount:Number(l.amount)})),[line('1101','debit',25),line('1300','credit',25)]);
  expect(state.allocations).toHaveLength(1);expect(Number(state.docs[0].balanceDue)).toBe(75);
});
it('B-014 inactive voided control and expense tenders deny with no saved changes',async()=>{
  const id=await invoice();
  await db().insert(accounts).values([
    {tenantId:TENANT_A,code:'1101',name:'Inactive bank',type:'asset',normalSide:'debit',isActive:'0'},
    {tenantId:TENANT_A,code:'1102',name:'Voided bank',type:'asset',normalSide:'debit',voidedAt:new Date()},
    {tenantId:TENANT_A,code:'1201',name:'Wrong account type',type:'expense',normalSide:'debit'},
  ]);
  const before=await snapshot();for(const code of ['1101','1102','1201','1300']){expect((await pay(id,100,code)).ok,code).toBe(false);expect(await snapshot()).toEqual(before);}
});
it('B-015 existing foreign-owned bank code cannot be used as tender',async()=>{
  const id=await invoice();await db().insert(accounts).values({tenantId:TENANT_B,code:'1109',name:'Foreign synthetic bank',type:'asset',normalSide:'debit'});
  const before=await snapshot();expect((await pay(id,100,'1109')).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
it('B-016 transaction link without posted marker cannot accept allocation',async()=>{
  const id=await invoice();await db().update(businessDocuments).set({postedAt:null}).where(eq(businessDocuments.id,id));
  const before=await snapshot();expect((await pay(id,100)).ok).toBe(false);expect(await snapshot()).toEqual(before);
});
