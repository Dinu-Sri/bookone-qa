import { beforeEach, afterAll, it, expect } from 'vitest';
import postgres from 'postgres';
import { pgClient, db, reservePgClient, drizzleOn } from '@product/db/db';
import { sql } from 'drizzle-orm';
import { withTenantContext } from '@product/db/helpers';
import { TENANT_A, TENANT_B } from './support/session';
import { resetFixture, closeFixture } from './support/fixture';
import { observe } from './support/observations';
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
  observe('RT-002',{expectedOwnRows:3,observedRows:rows.length});
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
  observe('RT-004',{tenantACount:a.length,afterFailureCount:none.length,tenantBCount:b.length,expectedACount:1,expectedAfterFailureCount:0,expectedBCount:1});
  expect({a,none,b}).toEqual({a:[TENANT_A],none:[],b:[TENANT_B]});
});
it('[RT-012] product reserved client supports real Drizzle query construction',async()=>{
  const reserved=await reservePgClient();
  try {
    await reserved`select set_config('app.current_tenant_id',${TENANT_A},false)`;
    const rows=await drizzleOn(reserved).execute(sql`select tenant_id,code from accounts order by code`);
    expect(rows.map(r=>[r.tenant_id,r.code])).toEqual(['1000','1300','4000'].map(c=>[TENANT_A,c]));
  } finally {
    try {await reserved`select set_config('app.current_tenant_id','',false)`;} finally {reserved.release();}
  }
});
it('[RT-013] product scoped Drizzle transaction commits and rolls back without leaking tenant',async()=>{
  await withTenantContext(TENANT_A,async()=>{
    await db().transaction(async tx=>{await tx.execute(sql`update accounts set name='Committed fixture' where code='1000'`);});
    await expect(db().transaction(async tx=>{await tx.execute(sql`update accounts set name='Rolled-back fixture' where code='1000'`);throw new Error('Synthetic rollback');})).rejects.toThrow('Synthetic rollback');
    const rows=await client()`select name from accounts where code='1000'`;
    expect(rows.map(r=>r.name)).toEqual(['Committed fixture']);
  });
  expect(await client()`select id from accounts`).toHaveLength(0);
});
it('[RT-014] nested savepoint rollback and success preserve the outer transaction boundary',async()=>{
  await withTenantContext(TENANT_A,async()=>{
    await db().transaction(async tx=>{
      await tx.execute(sql`update accounts set name='Outer committed' where code='1000'`);
      await expect(tx.transaction(async nested=>{
        await nested.execute(sql`update accounts set name='Nested rolled back' where code='1000'`);
        throw new Error('Synthetic savepoint rollback');
      })).rejects.toThrow('Synthetic savepoint rollback');
      expect((await tx.execute(sql`select name from accounts where code='1000'`)).map(r=>r.name)).toEqual(['Outer committed']);
      await tx.transaction(async nested=>{await nested.execute(sql`update accounts set name='Nested committed' where code='1300'`);});
    });
    await expect(db().transaction(async tx=>{
      await tx.execute(sql`update accounts set name='Outer discarded' where code='1000'`);
      await tx.transaction(async nested=>{await nested.execute(sql`update accounts set name='Nested discarded' where code='1300'`);});
      throw new Error('Synthetic outer rollback');
    })).rejects.toThrow('Synthetic outer rollback');
    expect((await client()`select name from accounts where code in ('1000','1300') order by code`).map(r=>r.name)).toEqual(['Outer committed','Nested committed']);
  });
});
it('[RT-015] overlapping tenant callbacks use separate connections and never expose foreign rows',async()=>{
  const scoped=async(tenantId:string)=>withTenantContext(tenantId,async()=>{
    const [connection]=await client()`select pg_backend_pid()::int as pid`;
    await client()`select pg_sleep(0.05)`;
    const rows=await client()`select tenant_id,code from accounts order by code`;
    return {pid:connection.pid,rows:rows.map(r=>[r.tenant_id,r.code])};
  });
  const [a,b]=await Promise.all([scoped(TENANT_A),scoped(TENANT_B)]);
  expect(a.pid).not.toBe(b.pid);
  expect(a.rows).toEqual(['1000','1300','4000'].map(c=>[TENANT_A,c]));
  expect(b.rows).toEqual(['1000','1300','4000'].map(c=>[TENANT_B,c]));
  expect(await client()`select id from accounts`).toHaveLength(0);
});
it('[RT-016] nested same-tenant context reuses connection and foreign context restores the outer tenant',async()=>{
  const snapshot=async()=>{
    const [connection]=await client()`select pg_backend_pid()::int as pid`;
    return {pid:connection.pid,tenants:(await client()`select distinct tenant_id from accounts`).map(r=>r.tenant_id)};
  };
  await withTenantContext(TENANT_A,async()=>{
    const outer=await snapshot();
    expect(outer.tenants).toEqual([TENANT_A]);
    expect(await withTenantContext(TENANT_A,snapshot)).toEqual(outer);
    const nested=await withTenantContext(TENANT_B,snapshot);
    expect(nested.pid).not.toBe(outer.pid);expect(nested.tenants).toEqual([TENANT_B]);
    expect(await snapshot()).toEqual(outer);
  });
  expect(await client()`select id from accounts`).toHaveLength(0);
});
