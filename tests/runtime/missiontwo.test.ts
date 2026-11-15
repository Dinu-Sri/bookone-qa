import {beforeEach,afterAll,it,expect} from 'vitest';
import {randomUUID} from 'node:crypto';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {savePosRegisterFromForm,archivePosRegisterFromForm,listPosRegisters} from '@product/web/app/actions/pos-registers';
import {receiveCustomerPayments,payVendorBills} from '@product/web/app/actions/documents';
import {getReports} from '@product/web/app/actions/workspace';
import {loadAccessForUser} from '@product/auth/permissions/load';
import {pgClient} from '@product/db/db';
import * as schema from '@product/schema/index';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import {TENANT_A,TENANT_B,OWNER,VIEWER,setActor} from './support/session';
import {observe} from './support/observations';
const DATE='2026-11-15',CUSTOM='00000000-0000-4000-8000-000000000080';
const tables=['pos_registers','company_profiles','sales_settings','parties','business_documents','business_document_lines','transactions','journal_entries','journal_lines','settlement_allocations','audit_log','inventory_movements','inventory_stock_levels'];
async function snapshot(){const out={};for(const t of tables)out[t]=await admin.unsafe(`select * from ${t} order by id`);return out;}
beforeEach(async()=>{await resetFixture();const [r]=await pgClient()`select rolsuper,rolbypassrls from pg_roles where rolname=current_user`;expect(r).toEqual({rolsuper:false,rolbypassrls:false});});afterAll(closeFixture);
const form=(over:Record<string,string>={})=>{const f=new FormData();for(const[k,v]of Object.entries({code:'M2-REG',name:'Mission2 synthetic counter',printMode:'manual',defaultPaymentAccountCode:'1000',isActive:'on',...over}))f.set(k,v);return f;};
const archive=(id:string)=>{const f=new FormData();f.set('id',id);return f;};
async function saved(f:FormData){await expect(savePosRegisterFromForm(f)).rejects.toThrow('QA redirect: /company/sales?flash=saved#pos-registers');}
async function registers(){return admin`select * from pos_registers order by id`;}
async function docs(){await seed.insert(schema.accounts).values([
 {tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},
 {tenantId:TENANT_A,code:'2200',name:'Output VAT',type:'liability',normalSide:'credit'},
 {tenantId:TENANT_A,code:'2300',name:'Input VAT',type:'asset',normalSide:'debit'},
 {tenantId:TENANT_A,code:'6800',name:'Expense',type:'expense',normalSide:'debit'}]);
 await seed.insert(schema.purchaseSettings).values({tenantId:TENANT_A,requireBillApproval:'0',requireGrnBeforeBill:'0',postGrniOnReceipt:'0'});
 await seed.insert(schema.salesSettings).values({tenantId:TENANT_A,vatRegistered:'1',vatRatePercent:'18.00'});
 const[p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'M2-SVC',name:'Mission2 synthetic service',productType:'service',taxStatus:'standard',sellPrice:'100.00'}).returning();
 async function create(type:string,vat=false,price=100){const r=await createCommercialDocument({documentType:type,partyName:type==='sales_invoice'?'Mission2 customer':'Mission2 supplier',issueDate:DATE,invoiceKind:vat?'tax_invoice':'commercial',expenseAccountCode:'6800',lines:[{productId:p.id,description:'Mission2 service',quantity:1,unitPrice:price,accountCode:type==='sales_invoice'?'4000':'6800'}]} as any);expect(r,r.error).toMatchObject({ok:true});return r.id!;}
 return {ar:await create('sales_invoice'),ap:await create('purchase'),create};
}
const input=(id:string,amount:number)=>({paymentDate:DATE,paymentAccountCode:'1000',allocations:[{documentId:id,amount}]});
async function paid(id:string){return(await admin`select paid_amount::text as paid,balance_due::text as due from business_documents where id=${id}`)[0];}
it('[RT-080] actual register create/edit/archive Owner positives and last-active refusal persist correctly',async()=>{
 await saved(form());let rs=await registers();expect(rs).toHaveLength(1);const first=rs[0].id;
 await saved(form({id:first,name:'Mission2 edited counter'}));expect((await registers())[0].name).toBe('Mission2 edited counter');
 let before=await snapshot();await expect(archivePosRegisterFromForm(archive(first))).rejects.toThrow('Keep at least one active register.');expect(await snapshot()).toEqual(before);
 await saved(form({code:'M2-SECOND'}));await expect(archivePosRegisterFromForm(archive(first))).rejects.toThrow('QA redirect:');rs=await registers();expect(rs.find(r=>r.id===first).voided_at).not.toBeNull();expect(rs.filter(r=>r.is_active==='1')).toHaveLength(1);
 observe('RT-080',{ownerCreated:1,ownerEdited:1,ownerArchived:1,lastActiveRefused:1});
});
it('[RT-081] actual Viewer create/edit/archive denial leaves registers and all observed business tables unchanged',async()=>{
 await saved(form());const id=(await registers())[0].id;setActor(VIEWER,'viewer');const before=await snapshot();
 for(const f of [form({code:'M2-VIEWER'}),form({id,name:'Forbidden edit'})])await expect(savePosRegisterFromForm(f)).rejects.toThrow('permission');
 await expect(archivePosRegisterFromForm(archive(id))).rejects.toThrow('permission');expect(await snapshot()).toEqual(before);observe('RT-081',{denied:3,unchanged:1});
});
it('[RT-082] persisted custom read job denies actual register writes and read does not seed',async()=>{
 await seed.insert(schema.users).values({id:CUSTOM,tenantId:TENANT_A,activeTenantId:TENANT_A,name:'M2 custom read',email:'m2-read@example.invalid',role:'m2-read',passwordHash:'not-a-login-credential'});
 const[role]=await seed.insert(schema.tenantRoles).values({tenantId:TENANT_A,slug:'m2-read',name:'M2 read',templateKey:null,customizedAt:new Date()}).returning();
 await seed.insert(schema.tenantRolePermissions).values({tenantId:TENANT_A,roleId:role.id,permissionKey:'company.sales_settings.read',level:'read'});
 await seed.insert(schema.tenantMemberships).values({tenantId:TENANT_A,userId:CUSTOM,role:'m2-read',primaryRoleId:role.id,status:'active'});setActor(CUSTOM,'m2-read');const access=await loadAccessForUser(CUSTOM,TENANT_A,'user');expect(access?.allows('company.sales_settings.read','read')).toBe(true);expect(access?.allows('company.sales_settings.write','write')).toBe(false);
 const before=await snapshot();expect(await listPosRegisters()).toEqual([]);await expect(savePosRegisterFromForm(form())).rejects.toThrow('permission');expect(await snapshot()).toEqual(before);observe('RT-082',{readAllowed:1,writeDenied:1,unchanged:1});
});
it('[RT-083] actual foreign register IDs cannot mutate and foreign location refuses before insert',async()=>{
 const[r]=await seed.insert(schema.posRegisters).values({tenantId:TENANT_B,code:'M2-FOREIGN',name:'Foreign counter',printMode:'manual'}).returning();
 const[l]=await seed.insert(schema.locations).values({tenantId:TENANT_B,code:'M2-FOREIGN',name:'Foreign location'}).returning();const before=await snapshot();
 // Existing product returns a saved redirect for a zero-row foreign-ID update; verify no success in persisted data.
 await saved(form({id:r.id,name:'Forbidden edit'}));expect(await snapshot()).toEqual(before);
 await expect(archivePosRegisterFromForm(archive(r.id))).rejects.toThrow('QA redirect:');expect(await snapshot()).toEqual(before);
 await expect(savePosRegisterFromForm(form({locationId:l.id}))).rejects.toThrow('Selected location was not found.');expect(await snapshot()).toEqual(before);observe('RT-083',{foreignWriteEffects:0,foreignLocationDenied:1});
});
it('[RT-084] actual AR/AP numeric invalid and mixed valid-invalid batches reject atomically',async()=>{
 const d=await docs();let attempts=0;
 for(const[fn,id]of [[receiveCustomerPayments,d.ar],[payVendorBills,d.ap]] as const){for(const amount of [0,-1,NaN,Infinity,1.001]){const before=await snapshot(),r=await fn(input(id,amount));expect(r.ok).toBe(false);expect(await snapshot()).toEqual(before);attempts++;}
 const before=await snapshot(),r=await fn({...input(id,25),allocations:[{documentId:id,amount:25},{documentId:id,amount:-1}]});expect(r.ok).toBe(false);expect(await snapshot()).toEqual(before);attempts++;}
 observe('RT-084',{rejected:attempts,unchanged:1});
});
it('[RT-085] actual AR/AP valid cents, current cap and AR idempotency preserve exact journal allocations',async()=>{
 const d=await docs();const req={...input(d.ar,25.01),idempotencyKey:randomUUID()};expect((await receiveCustomerPayments(req)).ok).toBe(true);const after=await snapshot();expect((await receiveCustomerPayments(req)).ok).toBe(true);expect(await snapshot()).toEqual(after);
 expect((await payVendorBills(input(d.ap,25.01))).ok).toBe(true);
 for(const[fn,id]of [[receiveCustomerPayments,d.ar],[payVendorBills,d.ap]] as const){const before=await snapshot();expect((await fn(input(id,75))).ok).toBe(false);expect(await snapshot()).toEqual(before);expect((await fn(input(id,74.99))).ok).toBe(true);const row=await paid(id);expect([Number(row.paid),Number(row.due)]).toEqual([100,0]);}
 const[a]=await admin`select count(*)::int as n,sum(allocated_amount)::text as value from settlement_allocations`;expect([a.n,Number(a.value)]).toEqual([4,200]);observe('RT-085',{allocations:4,totalCents:20000,arDueCents:0,apDueCents:0});
});
it('[RT-086] fresh actual VAT journals and Reports correspondence reconcile with18% memo',async()=>{
 const d=await docs();await d.create('sales_invoice',true,100);await d.create('purchase',true,60);const report=await getReports();expect([report.vat.outputVat,report.vat.inputVat,report.vat.netPayable]).toEqual([18,10.8,7.2]);
 const out=report.vat.correspondence.filter(r=>r.accountCode==='2200');expect(out.some(r=>r.memo==='Output VAT 18%')).toBe(true);expect(out.some(r=>r.memo.includes('18.000000'))).toBe(false);
 expect(report.vat.correspondence.reduce((s,r)=>s+(r.accountCode==='2200'?(r.side==='credit'?r.amount:-r.amount):0),0)).toBe(18);observe('RT-086',{outputCents:1800,inputCents:1080,netCents:720,memoCorrect:1});
});
it('[RT-087] actual Viewer payment actions refuse known owned documents without business effects',async()=>{
 const d=await docs();setActor(VIEWER,'viewer');const before=await snapshot();expect((await receiveCustomerPayments(input(d.ar,25))).ok).toBe(false);expect((await payVendorBills(input(d.ap,25))).ok).toBe(false);expect(await snapshot()).toEqual(before);observe('RT-087',{rejected:2,unchanged:1});
});
