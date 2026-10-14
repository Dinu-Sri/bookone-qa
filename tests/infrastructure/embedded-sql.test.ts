import {it,expect,beforeAll,beforeEach,afterAll} from 'vitest';
import {openDatabase,resetDatabase,closeDatabase,db,pgClient,accounts,eq} from '../batch/support/database';
import {TENANT_A} from '../batch/support/actor';
beforeAll(openDatabase);beforeEach(resetDatabase);afterAll(closeDatabase);
it('raw tagged SQL reads uncommitted ORM insert on same transaction',async()=>{
 await db().transaction(async(tx:any)=>{
  await tx.insert(accounts).values({tenantId:TENANT_A,code:'1999',name:'Uncommitted',type:'asset',normalSide:'debit'});
  const rows=await pgClient()`select name from accounts where tenant_id=${TENANT_A}::uuid and code=${'1999'} for update`;
  expect(rows).toHaveLength(1);expect(rows[0].name).toBe('Uncommitted');
 });
 expect((await db().select().from(accounts).where(eq(accounts.code,'1999')))).toHaveLength(1);
});
it('raw update and ORM insert both roll back on injected failure',async()=>{
 await expect(db().transaction(async(tx:any)=>{
  await tx.insert(accounts).values({tenantId:TENANT_A,code:'1999',name:'Original',type:'asset',normalSide:'debit'});
  await pgClient()`update accounts set name=${'Changed'} where code=${'1999'}`;
  throw Error('Synthetic rollback');
 })).rejects.toThrow('Synthetic rollback');
 expect(await pgClient()`select id from accounts where code=${'1999'}`).toHaveLength(0);
});
it('nested savepoint rollback preserves outer write and context then outer commit',async()=>{
 await db().transaction(async(tx:any)=>{
  await tx.insert(accounts).values({tenantId:TENANT_A,code:'1999',name:'Outer',type:'asset',normalSide:'debit'});
  await expect(db().transaction(async()=>{await pgClient()`update accounts set name=${'Inner'} where code=${'1999'}`;throw Error('Inner rollback');})).rejects.toThrow('Inner rollback');
  expect((await pgClient()`select name from accounts where code=${'1999'}`)[0].name).toBe('Outer');
 });
 expect((await pgClient()`select name from accounts where code=${'1999'}`)[0].name).toBe('Outer');
});
