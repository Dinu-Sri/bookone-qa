import {beforeEach,afterAll,it,expect} from 'vitest';
import {createHash,randomBytes,randomUUID} from 'node:crypto';
import {eq} from 'drizzle-orm';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import * as schema from '@product/schema/index';
import {TENANT_A,TENANT_B,OWNER} from './support/session';
import {withTenantContext} from '@product/db/helpers';
import {snapshotTenantTables,trialBalanceHash} from '@product/db/archive/snapshot';
import {restoreTenantDataArchive,restoreTenantFilesArchive,filesRestoreAlreadyApplied} from '@product/db/archive/restore';
import {tenantIsOperationallyEmpty} from '@product/db/archive/empty';
import {encryptArchivePayload} from '@product/db/archive/crypto';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {observe} from './support/observations';
import {loadAccessForUser} from '@product/auth/permissions/load';
beforeEach(resetFixture);afterAll(closeFixture);
const H=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex'),DATE='2026-10-13';
async function source(){const[p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-ARCHIVE',name:'Synthetic archived service',productType:'service',sellPrice:'200.00'}).returning();const r=await createCommercialDocument({documentType:'sales_invoice',partyName:'Synthetic archive customer',issueDate:DATE,lines:[{productId:p.id,description:'Archive three units',quantity:3,unitPrice:200}]} as any);expect(r,r.error).toMatchObject({ok:true});return r.id!;}
async function pack(options:{badObject?:boolean}={}){
 await source();const {tables,rowCounts}=await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A));const hash=await withTenantContext(TENANT_A,()=>trialBalanceHash(TENANT_A));
 const body=Buffer.from('Synthetic archive receipt bytes'),key=`tenants/${TENANT_A}/receipts/${OWNER}/qa.txt`;const objects=[{key,contentType:'text/plain',size:body.length,sha256:options.badObject?'0'.repeat(64):H(body),bodyBase64:body.toString('base64')}];
 tables.transactions[0].receiptRef=key;const password=randomBytes(24).toString('base64');const manifest={format:'bookone.tenant-archive',exportId:randomUUID(),schemaVersion:1,appVersion:'2.5.3',appCommit:'5becb2d',exportedAt:new Date().toISOString(),sourceTenantId:TENANT_A,sourceName:'Synthetic archive A',sourceSlug:'qa-runtime-a',kind:'data',dataSha256:H(JSON.stringify(tables)),filesSha256:H(JSON.stringify(objects.map(({key,sha256,size})=>({key,sha256,size})))),fileCount:1,rowCounts,integrity:{trialBalanceHash:hash}};
 const data={format:manifest.format,kind:'data',manifest,tables,objects:[]},files={format:manifest.format,kind:'files',manifest:{...manifest,kind:'files'},tables:{},objects};return {data,files,password,body,key};
}
const encrypt=(data:any,password:string)=>encryptArchivePayload(JSON.stringify(data),password);
const restore=(p:any,restorerUserId=OWNER)=>withTenantContext(TENANT_B,()=>restoreTenantDataArchive({tenantId:TENANT_B,restorerUserId,file:encrypt(p.data,p.password),password:p.password}));
async function targetSnapshot(){const out={};for(const table of ['tenants','accounts','tenant_roles','tenant_memberships','parties','transactions','journal_entries','journal_lines','business_documents','business_document_lines','inventory_products','inventory_stock_levels','inventory_cost_layers','audit_log'])out[table]=table==='tenants'?await admin`select * from tenants where id=${TENANT_B}`:await admin.unsafe(`select * from ${table} where tenant_id=$1 order by id`,[TENANT_B]);return out;}
function store(sentinel?:{key:string;body:Buffer}){const map=new Map<string,Buffer>(sentinel?[[sentinel.key,sentinel.body]]:[]);return {map,api:{exists:async(k:string)=>map.has(k),put:async(k:string,b:Buffer)=>{map.set(k,Buffer.from(b));}}};}
const files=(p:any,s:any)=>withTenantContext(TENANT_B,()=>restoreTenantFilesArchive({tenantId:TENANT_B,restorerUserId:OWNER,file:encrypt(p.files,p.password),password:p.password,store:s.api}));
it('[S-0774] actual SQL ignores signup CoA but product and party records block empty target',async()=>{
 expect((await withTenantContext(TENANT_B,()=>tenantIsOperationallyEmpty(TENANT_B))).empty).toBe(true);
 const[p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_B,sku:'BLOCK-EMPTY',name:'Synthetic target product'}).returning();expect((await withTenantContext(TENANT_B,()=>tenantIsOperationallyEmpty(TENANT_B))).empty).toBe(false);await seed.delete(schema.inventoryProducts).where(eq(schema.inventoryProducts.id,p.id));
 await seed.insert(schema.parties).values({tenantId:TENANT_B,userId:OWNER,name:'Synthetic target party',partyType:'customer'} as any);expect((await withTenantContext(TENANT_B,()=>tenantIsOperationallyEmpty(TENANT_B))).empty).toBe(false);
});
it('[S-0775] traded source refuses data restore and leaves all source tables unchanged',async()=>{
 const p=await pack(),before=await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A));const result=await withTenantContext(TENANT_A,()=>restoreTenantDataArchive({tenantId:TENANT_A,restorerUserId:OWNER,file:encrypt(p.data,p.password),password:p.password}));expect(result).toEqual({ok:false,error:'This company already has records. Create a new company and restore into that.'});expect(await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A))).toEqual(before);
});
it('[S-0776] actual wrong-password restore preserves all target seed and business tables',async()=>{
 const p=await pack(),before=await targetSnapshot();const r=await withTenantContext(TENANT_B,()=>restoreTenantDataArchive({tenantId:TENANT_B,restorerUserId:OWNER,file:encrypt(p.data,p.password),password:randomBytes(24).toString('base64')}));expect(r.ok).toBe(false);expect(await targetSnapshot()).toEqual(before);
});
it('[S-0778] encrypted source snapshot restores remapped documents and balanced600 ledger into B',async()=>{
 const p=await pack(),before=await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A));expect((await restore(p)).ok).toBe(true);
 const target=await targetSnapshot();expect(target['business_documents']).toHaveLength(1);expect(target['journal_entries']).toHaveLength(1);expect(target['journal_lines']).toHaveLength(2);expect(target['accounts']).toHaveLength(3);
 const oldIds=new Set(Object.values(p.data.tables).flatMap((r:any)=>r.map((x:any)=>x.id)));for(const table of ['accounts','business_documents','journal_entries','journal_lines','inventory_products'])for(const row of target[table]){expect(row.tenant_id).toBe(TENANT_B);expect(oldIds.has(row.id)).toBe(false);}
 const [d]=target['business_documents'];expect([Number(d.total),Number(d.balance_due)]).toEqual([600,600]);expect(target['transactions'].some(t=>t.id===d.transaction_id)).toBe(true);
 const rows=await admin`select a.code,l.side,l.amount::text as amount from journal_lines l join accounts a on a.id=l.account_id where l.tenant_id=${TENANT_B} order by a.code`;expect(rows.map(r=>[r.code,r.side,Number(r.amount)])).toEqual([['1300','debit',600],['4000','credit',600]]);
 expect(await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A))).toEqual(before);
});
it('[S-0780] persisted restore keeps global auth users and makes restorer the only target owner',async()=>{
 const p=await pack(),restorer='00000000-0000-4000-8000-000000000006';
 await seed.insert(schema.users).values({id:restorer,tenantId:TENANT_B,activeTenantId:TENANT_B,name:'Synthetic new restorer',email:'restorer@example.invalid',passwordHash:'not-a-login-credential',role:'owner'});
 const[job]=await seed.insert(schema.tenantRoles).values({tenantId:TENANT_B,slug:'owner',name:'Seed Owner',templateKey:'owner',templateVersion:'1'}).returning();await seed.insert(schema.tenantMemberships).values({tenantId:TENANT_B,userId:restorer,role:'owner',primaryRoleId:job.id,status:'active'});
 const users=await admin`select * from users order by id`;expect(restorer).not.toBe(OWNER);expect((await restore(p,restorer)).ok).toBe(true);const members=await admin`select user_id,role from tenant_memberships where tenant_id=${TENANT_B}`;expect(members).toEqual([{user_id:restorer,role:'owner'}]);expect(await admin`select * from users order by id`).toEqual(users);
 expect((await admin`select distinct user_id from transactions where tenant_id=${TENANT_B}`).map(r=>r.user_id)).toEqual([restorer]);const access=await loadAccessForUser(restorer,TENANT_B,'user');expect(access?.jobSlug).toBe('owner');expect(access?.allows('company.backup.write','write')).toBe(true);
});
it('[S-0781] actual restored GL hash matches independent600 oracle and wrong hash rolls back',async()=>{
 const p=await pack();
 // PostgreSQL CASE ELSE0 sums have scale0 for the absent side; actual amount
 // sums retain schema scale2. The frozen snapshot serializer hashes raw SUM
 // strings. Keep independent600/zero financial amounts, not helper output.
 const expected=H('1300|600.00|0\n4000|0|600.00');observe('S-0781',{matchesDeclaredSqlZero:p.data.manifest.integrity.trialBalanceHash===expected?1:0,matchesFixedScaleZero:p.data.manifest.integrity.trialBalanceHash===H('1300|600.00|0.00\n4000|0.00|600.00')?1:0});expect(p.data.manifest.integrity.trialBalanceHash).toBe(expected);const before=await targetSnapshot();p.data.manifest.integrity.trialBalanceHash='f'.repeat(64);expect((await restore(p)).ok).toBe(false);expect(await targetSnapshot()).toEqual(before);
});
it('[S-0782] mid-insert journal fault rolls back CoA replacement identity and every trading row',async()=>{
 const p=await pack(),before=await targetSnapshot();await admin.unsafe(`CREATE FUNCTION qa_archive_fault() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Synthetic archive journal failure'; END $$`);await admin.unsafe('CREATE TRIGGER qa_archive_fault BEFORE INSERT ON journal_lines FOR EACH ROW EXECUTE FUNCTION qa_archive_fault()');let r;
 try{r=await restore(p);}finally{await admin.unsafe('DROP TRIGGER qa_archive_fault ON journal_lines');await admin.unsafe('DROP FUNCTION qa_archive_fault()');}expect(r.ok).toBe(false);expect(await targetSnapshot()).toEqual(before);
 // A600 posted invoice with AR600 but no ledger lines is inconsistent even
 // when the supplied empty trial hash is internally correct. Frozen contract
 // requires AR/AP/document integrity beyond matching debit/credit sums.
 p.data.tables.journal_lines=[];p.data.manifest.rowCounts.journal_lines=0;p.data.manifest.dataSha256=H(JSON.stringify(p.data.tables));p.data.manifest.integrity.trialBalanceHash=H('');
 const incoherent=await restore(p),after=await targetSnapshot();observe('S-0782',{acceptedIncoherent:incoherent.ok?1:0,targetDocuments:after['business_documents'].length,targetJournalLines:after['journal_lines'].length,unchanged:JSON.stringify(before)===JSON.stringify(after)?1:0});expect(incoherent.ok).toBe(false);expect(after).toEqual(before);
});
it('[S-0783] second persisted data restore refuses and preserves the successful first result',async()=>{
 const p=await pack();expect((await restore(p)).ok).toBe(true);const before=await targetSnapshot();expect((await restore(p)).ok).toBe(false);expect(await targetSnapshot()).toEqual(before);
});
it('[S-0784] concurrent data restores commit at most one complete target snapshot',async()=>{
 const p=await pack();await admin.unsafe(`CREATE FUNCTION qa_archive_delay() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN PERFORM pg_sleep(0.2); RETURN NEW; END $$`);await admin.unsafe(`CREATE TRIGGER qa_archive_delay BEFORE INSERT ON accounts FOR EACH ROW WHEN (NEW.tenant_id='${TENANT_B}'::uuid) EXECUTE FUNCTION qa_archive_delay()`);let r;
 try{r=await Promise.all([restore(p),restore(p)]);}finally{await admin.unsafe('DROP TRIGGER qa_archive_delay ON accounts');await admin.unsafe('DROP FUNCTION qa_archive_delay()');}expect(r.filter(x=>x.ok)).toHaveLength(1);const after=await targetSnapshot();expect(after['business_documents']).toHaveLength(1);expect(after['journal_lines']).toHaveLength(2);
});
it('[S-0785] persisted paired files helper applies exact synthetic bytes to target prefix',async()=>{
 const p=await pack(),s=store();expect((await restore(p)).ok).toBe(true);expect((await files(p,s)).ok).toBe(true);expect([...s.map.keys()]).toEqual([p.key.replace(`tenants/${TENANT_A}/`,`tenants/${TENANT_B}/`)]);expect([...s.map.values()][0].equals(p.body)).toBe(true);
});
it('[S-0787] mismatched data cross-checksum in files pack refuses without marker or writes',async()=>{
 const p=await pack(),s=store();expect((await restore(p)).ok).toBe(true);p.files.manifest.dataSha256='f'.repeat(64);const before=await targetSnapshot();expect((await files(p,s)).ok).toBe(false);expect(s.map.size).toBe(0);expect(await targetSnapshot()).toEqual(before);
});
it('[S-0788] second matching file application refuses without duplicate completion audit',async()=>{
 const p=await pack(),s=store();expect((await restore(p)).ok).toBe(true);expect((await files(p,s)).ok).toBe(true);const before=await targetSnapshot();expect((await files(p,s)).ok).toBe(false);expect(await targetSnapshot()).toEqual(before);
});
it('[S-0789] actual files restore marker does not overwrite existing target sentinel bytes',async()=>{
 const p=await pack(),target=p.key.replace(`tenants/${TENANT_A}/`,`tenants/${TENANT_B}/`),sentinel=Buffer.from('Existing synthetic sentinel'),s=store({key:target,body:sentinel});expect((await restore(p)).ok).toBe(true);expect((await files(p,s)).ok).toBe(true);expect(s.map.get(target)?.equals(sentinel)).toBe(true);
});
it('[S-0793] invalid required object bytes cannot create a successful files-applied marker',async()=>{
 const p=await pack({badObject:true}),s=store();expect((await restore(p)).ok).toBe(true);const before=await targetSnapshot();expect((await files(p,s)).ok).toBe(false);expect(s.map.size).toBe(0);expect(await withTenantContext(TENANT_B,()=>filesRestoreAlreadyApplied(TENANT_B,p.data.manifest.exportId))).toBe(false);expect(await targetSnapshot()).toEqual(before);
});
