import {beforeEach,describe,expect,it,vi} from 'vitest';
const f=vi.hoisted(()=>({role:'viewer',writes:[] as unknown[],rows:[{id:'bank-a',code:'1101',name:'Existing QA bank'}]}));
vi.mock('next/cache',()=>({revalidatePath:vi.fn()}));
vi.mock('@bookone/accounting',()=>({isLiquidTenderCode:(code:string)=>code==='1000'||/^11\d\d$/.test(code)||/^12\d\d$/.test(code)}));
vi.mock('@bookone/auth',()=>({requireTenantContext:async()=>({id:'qa-user',tenantId:'qa-tenant',role:f.role,jobSlug:f.role,jobId:f.role})}));
vi.mock('@bookone/db',()=>({
 accounts:new Proxy({},{get:(_,p)=>String(p)}),and:(...x:unknown[])=>x,eq:(...x:unknown[])=>x,isNull:(x:unknown)=>x,asc:(x:unknown)=>x,sql:()=>({}),
 withTenantContext:async(_t:string,fn:()=>unknown)=>fn(),
 db:()=>({select:()=>({from:()=>({where:()=>({then:(resolve:(v:unknown)=>unknown)=>Promise.resolve(f.rows).then(resolve),limit:async()=>f.rows})})}),insert:()=>({values:(v:unknown)=>{f.writes.push(v);return{returning:async()=>[{id:'created-bank',code:'1102',name:'QA New Bank'}]};}}),update:()=>({set:(v:unknown)=>{f.writes.push(v);return{where:async()=>[]};}})})
}));
import {createCashbookBank,renameCashbookBank,archiveCashbookBank} from '../../work/product/apps/web/src/app/actions/cashbook-banks';
describe('pilot bank server-action permission boundary (recording DB, not live PG)',()=>{
 beforeEach(()=>{f.role='viewer';f.writes=[];});
 it('positive recording adapter can observe an Owner create',async()=>{f.role='owner';expect((await createCashbookBank('QA New Bank')).ok).toBe(true);expect(f.writes).toHaveLength(1);});
 it('positive recording adapter can observe an Owner rename',async()=>{f.role='owner';expect((await renameCashbookBank('bank-a','QA Changed')).ok).toBe(true);expect(f.writes).toHaveLength(1);});
 it('positive recording adapter can observe an Owner archive',async()=>{f.role='owner';expect((await archiveCashbookBank('bank-a')).ok).toBe(true);expect(f.writes).toHaveLength(1);});
 it('Viewer cannot create a bank or invoke an insert',async()=>{const r=await createCashbookBank('QA New Bank');expect({ok:r.ok,writes:f.writes.length}).toEqual({ok:false,writes:0});});
 it('Viewer cannot rename a bank or invoke an update',async()=>{const r=await renameCashbookBank('bank-a','QA Changed');expect({ok:r.ok,writes:f.writes.length}).toEqual({ok:false,writes:0});});
 it('Viewer cannot archive a bank or invoke an update',async()=>{const r=await archiveCashbookBank('bank-a');expect({ok:r.ok,writes:f.writes.length}).toEqual({ok:false,writes:0});});
});
