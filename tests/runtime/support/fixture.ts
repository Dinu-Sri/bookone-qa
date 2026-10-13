import { readFileSync } from 'node:fs';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@product/schema/index';
import { pgClient } from '@product/db/db';
import { OWNER, VIEWER, SALES, TENANT_A, TENANT_B, setActor } from './session';
import { runtimeTarget } from '../../../scripts/runtime/target.mjs';
runtimeTarget(process.env.QA_RUNTIME_ADMIN_URL, process.env.QA_RUNTIME_ISOLATION);
export const admin = postgres(process.env.QA_RUNTIME_ADMIN_URL!, { max: 1 });
export const seed = drizzle(admin, { schema });
export async function assertFixture() {
  const [guard] = await admin`select * from qa_runtime_guard`;
  if (guard?.marker !== 'isolated-bookone-qa-v1' || guard.product_sha !== JSON.parse(readFileSync('product-ref.json','utf8')).commit) throw new Error('Isolated fixture identity mismatch');
}
export async function resetFixture() {
  await assertFixture();
  const tables = await admin`select tablename from pg_tables where schemaname='public' and tablename <> 'qa_runtime_guard'`;
  await admin.unsafe('TRUNCATE ' + tables.map(t => '"' + t.tablename.replaceAll('"','""') + '"').join(',') + ' CASCADE');
  setActor();
  await seed.insert(schema.tenants).values([
    { id: TENANT_A, name: 'QA synthetic A', slug: 'qa-runtime-a', environment: 'staging', entityKind: 'company', rbacEnforced: true, modules: {sales:true,inventory:true,purchase:true,rental:true,pos:true} },
    { id: TENANT_B, name: 'QA synthetic B', slug: 'qa-runtime-b', environment: 'staging', entityKind: 'company', rbacEnforced: true, modules: {sales:true} },
  ]);
  for (const [id, role] of [[OWNER,'owner'],[VIEWER,'viewer'],[SALES,'sales']]) {
    await seed.insert(schema.users).values({ id, tenantId: TENANT_A, activeTenantId: TENANT_A, name: 'Synthetic ' + role, email: role + '@example.invalid', passwordHash: 'not-a-login-credential', role });
    const [job] = await seed.insert(schema.tenantRoles).values({tenantId:TENANT_A,slug:role,name:role,templateKey:role,templateVersion:'1'}).returning();
    await seed.insert(schema.tenantMemberships).values({tenantId:TENANT_A,userId:id,role,primaryRoleId:job.id,status:'active'});
  }
  for (const tenantId of [TENANT_A, TENANT_B]) {
    await seed.insert(schema.accounts).values([
      {tenantId,code:'1000',name:'Cash',type:'asset',normalSide:'debit'},
      {tenantId,code:'1300',name:'Accounts Receivable',type:'asset',normalSide:'debit'},
      {tenantId,code:'4000',name:'Sales Revenue',type:'revenue',normalSide:'credit'},
    ]);
  }
}
export async function closeFixture() { await pgClient().end(); await admin.end(); }
