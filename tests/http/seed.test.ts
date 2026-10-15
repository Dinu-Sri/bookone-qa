import {it,expect,afterAll} from 'vitest';
import {randomBytes} from 'node:crypto';import {writeFileSync,mkdirSync} from 'node:fs';
import {resetFixture,closeFixture,admin,seed} from '../runtime/support/fixture';
import {TENANT_A,TENANT_B,OWNER,VIEWER,setActor} from '../runtime/support/session';
import {createCredentialLogin} from '@product/auth/create-login';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {receiveCustomerPayments} from '@product/web/app/actions/documents';
import * as schema from '@product/schema/index';import {eq,and} from 'drizzle-orm';
afterAll(closeFixture);
it('prepare only marked ephemeral HTTP credential fixtures',async()=>{
  expect(process.env.QA_HTTP_ISOLATION).toBe('ephemeral-ci-next');expect(process.env.GITHUB_ACTIONS).toBe('true');
  await resetFixture();
  const FOREIGN='00000000-0000-4000-8000-000000000006',PLATFORM='00000000-0000-4000-8000-000000000007',LEGACY_VIEWER='00000000-0000-4000-8000-000000000008',LEGACY_OWNER='00000000-0000-4000-8000-000000000009';
  const foreignName='HTTP Foreign Company Sentinel';
  await seed.update(schema.tenants).set({name:'HTTP Own Company Sentinel'}).where(eq(schema.tenants.id,TENANT_A));
  await seed.update(schema.tenants).set({name:foreignName}).where(eq(schema.tenants.id,TENANT_B));
  for(const [id,tenantId,role,email] of [[FOREIGN,TENANT_B,'owner','foreign.owner@http.example.invalid'],[PLATFORM,TENANT_A,'super_admin','platform.admin@http.example.invalid']]){
    await seed.insert(schema.users).values({id,tenantId,activeTenantId:tenantId,role,email,name:role==='super_admin'?'HTTP Platform':'HTTP Foreign',passwordHash:'better-auth-managed'});
    let [job]=await seed.select().from(schema.tenantRoles).where(and(eq(schema.tenantRoles.tenantId,tenantId),eq(schema.tenantRoles.slug,'owner')));
    if(!job){[job]=await seed.insert(schema.tenantRoles).values({tenantId,slug:'owner',name:'owner',templateKey:'owner',templateVersion:'1'}).returning();}
    await seed.insert(schema.tenantMemberships).values({tenantId,userId:id,role:'owner',status:'active',primaryRoleId:job.id});
  }
  for(const [id,role,email] of [[LEGACY_VIEWER,'viewer','legacy.viewer@http.example.invalid'],[LEGACY_OWNER,'owner','legacy.owner@http.example.invalid']]){
    await seed.insert(schema.users).values({id,tenantId:TENANT_A,activeTenantId:TENANT_A,role,email,name:'HTTP Legacy '+role,passwordHash:'better-auth-managed'});
    await seed.insert(schema.tenantMemberships).values({tenantId:TENANT_A,userId:id,role,status:'active',primaryRoleId:null});
  }
  for(const [tenantId,legalName] of [[TENANT_A,'HTTP Own Company Sentinel'],[TENANT_B,foreignName]])await seed.insert(schema.companyProfiles).values({tenantId,legalName,country:'Sri Lanka',baseCurrency:'LKR',timezone:'Asia/Colombo'});
  const actors={owner:{id:OWNER,email:'owner@example.invalid',name:'Synthetic owner'},viewer:{id:VIEWER,email:'viewer@example.invalid',name:'Synthetic viewer'},foreign:{id:FOREIGN,email:'foreign.owner@http.example.invalid',name:'HTTP Foreign'},platform:{id:PLATFORM,email:'platform.admin@http.example.invalid',name:'HTTP Platform'},legacyViewer:{id:LEGACY_VIEWER,email:'legacy.viewer@http.example.invalid',name:'HTTP Legacy viewer'},legacyOwner:{id:LEGACY_OWNER,email:'legacy.owner@http.example.invalid',name:'HTTP Legacy owner'}} as any;
  for(const actor of Object.values(actors) as any[]){actor.password=randomBytes(24).toString('base64url');expect(await createCredentialLogin(actor)).toEqual({ok:true});}
  const date='2026-10-13';
  async function invoice(tenantId:string,userId:string,marker:string,customer:string){
    setActor(userId,'owner',tenantId);
    const [p]=await seed.insert(schema.inventoryProducts).values({tenantId,sku:marker,name:marker,productType:'service',sellPrice:'200.00',unitCost:'0.00'}).returning();
    const res=await createCommercialDocument({documentType:'sales_invoice',partyName:customer,issueDate:date,lines:[{productId:p.id,description:marker,quantity:3,unitPrice:200}]} as any);expect(res,res.error).toMatchObject({ok:true});
    const [d]=await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,res.id!));expect([Number(d.total),Number(d.balanceDue)]).toEqual([600,600]);return {id:d.id,number:d.documentNumber,marker,customer};
  }
  const own=await invoice(TENANT_A,OWNER,'HTTP-OWN-LINE-SENTINEL','HTTP Own Customer');
  const foreign=await invoice(TENANT_B,FOREIGN,'HTTP-FOREIGN-LINE-SENTINEL','HTTP Foreign Customer');
  setActor();expect(await receiveCustomerPayments({paymentDate:date,paymentAccountCode:'1000',allocations:[{documentId:own.id,amount:150}]})).toMatchObject({ok:true,paidCount:1});
  const [d]=await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,own.id));expect([Number(d.paidAmount),Number(d.balanceDue)]).toEqual([150,450]);
  const [role]=await admin`select rolsuper,rolbypassrls from pg_roles where rolname='qa_runtime'`;expect(role).toEqual({rolsuper:false,rolbypassrls:false});
  mkdirSync('.local/http',{recursive:true});writeFileSync('.local/http/fixture.json',JSON.stringify({actors,own,foreign,date,tenantA:TENANT_A,tenantB:TENANT_B,foreignName}));
});
