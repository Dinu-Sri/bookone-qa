import { beforeEach, afterAll, it, expect } from 'vitest';
import postgres from 'postgres';
import { pgClient } from '@product/db/db';
import { withTenantContext } from '@product/db/helpers';
import { TENANT_A, TENANT_B } from './support/session';
import { resetFixture, closeFixture } from './support/fixture';
beforeEach(resetFixture);
afterAll(closeFixture);
const client = () => pgClient();
it('[RT-001] non-owner role and actual RLS filter seeded foreign records', async () => {
  const [role] = await client()`select rolsuper,rolbypassrls from pg_roles where rolname=current_user`;
  expect(role).toEqual({rolsuper:false,rolbypassrls:false});
  const [table] = await client()`select relrowsecurity,pg_get_userbyid(relowner)=current_user as owned from pg_class where oid='accounts'::regclass`;
  expect(table).toEqual({relrowsecurity:true,owned:false});
  const rows = await client().begin(async tx => {await tx`select set_config('app.current_tenant_id',${TENANT_A},true)`;return tx`select tenant_id,code from accounts order by code`;});
  expect(rows.map(r=>[r.tenant_id,r.code])).toEqual(['1000','1300','4000'].map(c=>[TENANT_A,c]));
});
it('[RT-002] product withTenantContext retains tenant through its callback', async () => {
  const rows = await withTenantContext(TENANT_A,()=>client()`select tenant_id,code from accounts order by code`);
  expect(rows.map(r=>[r.tenant_id,r.code])).toEqual(['1000','1300','4000'].map(c=>[TENANT_A,c]));
});
it('[RT-003] foreign read/write denied on separate real connection with positive own control', async () => {
  const isolated = postgres(process.env.DATABASE_URL!,{max:1});
  try {
    const own = await isolated.begin(async tx => {await tx`select set_config('app.current_tenant_id',${TENANT_A},true)`;return tx`select * from accounts where tenant_id=${TENANT_A}`;});
    expect(own).toHaveLength(3);
    const foreign = await isolated.begin(async tx => {await tx`select set_config('app.current_tenant_id',${TENANT_A},true)`;return tx`select * from accounts where tenant_id=${TENANT_B}`;});
    expect(foreign).toHaveLength(0);
    await expect(isolated.begin(async tx=>{await tx`select set_config('app.current_tenant_id',${TENANT_A},true)`;await tx`insert into accounts(tenant_id,code,name,type,normal_side) values(${TENANT_B},'9999','Forbidden','asset','debit')`;})).rejects.toMatchObject({code:'42501'});
  } finally { await isolated.end(); }
});
it('[RT-004] tenant switching and thrown callback leave no pooled tenant leakage', async () => {
  const ids = async()=> (await client()`select distinct tenant_id from accounts`).map(r=>r.tenant_id);
  const a = await withTenantContext(TENANT_A,ids);
  await expect(withTenantContext(TENANT_A,async()=>{throw new Error('Synthetic callback failure');})).rejects.toThrow('Synthetic callback failure');
  const none = await ids();
  const b = await withTenantContext(TENANT_B,ids);
  expect({a,none,b}).toEqual({a:[TENANT_A],none:[],b:[TENANT_B]});
});
