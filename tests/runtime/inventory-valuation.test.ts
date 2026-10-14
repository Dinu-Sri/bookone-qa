import {beforeEach,afterAll,it,expect} from 'vitest';
import {eq} from 'drizzle-orm';
import {createCommercialDocument} from '@product/web/app/actions/commercial-docs';
import {getReports} from '@product/web/app/actions/workspace';
import * as schema from '@product/schema/index';
import {admin,seed,resetFixture,closeFixture} from './support/fixture';
import {TENANT_A} from './support/session';
import {observe} from './support/observations';
beforeEach(resetFixture);afterAll(closeFixture);
async function setup(method:string){
 await seed.insert(schema.accounts).values([
  {tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},
  {tenantId:TENANT_A,code:'4100',name:'Returns',type:'revenue',normalSide:'debit'},
  {tenantId:TENANT_A,code:'5000',name:'COGS',type:'expense',normalSide:'debit'},
  {tenantId:TENANT_A,code:'5100',name:'Inventory',type:'asset',normalSide:'debit'},
  {tenantId:TENANT_A,code:'6800',name:'Expense',type:'expense',normalSide:'debit'},
 ]);
 await seed.insert(schema.inventorySettings).values({tenantId:TENANT_A,costingMethod:method,negativeStockPolicy:'block'});
 await seed.insert(schema.purchaseSettings).values({tenantId:TENANT_A,postGrniOnReceipt:'0',requireBillApproval:'0',requireGrnBeforeBill:'0'});
 const [p]=await seed.insert(schema.inventoryProducts).values({tenantId:TENANT_A,sku:'QA-VAR-COST',name:'Synthetic varying-price product',productType:'physical',unitCost:'60.00',sellPrice:'100.00'}).returning();return p.id;
}
async function create(p:string,type:string,qty:number,price:number,date:string,source?:string){
 const r=await createCommercialDocument({documentType:type,partyName:type==='purchase'?'Synthetic supplier':'Synthetic customer',issueDate:date,sourceDocumentId:source,lines:[{productId:p,description:'Synthetic varying-price product',quantity:qty,unitPrice:price}]} as any);
 expect(r,r.error).toMatchObject({ok:true});expect(r.id).toBeTruthy();return r.id!;
}
const cents=(n:unknown)=>Math.round(Number(n)*100);
async function balance(code:string){const [r]=await admin`select coalesce(sum(case when l.side='debit' then l.amount else -l.amount end),0)::text as value from journal_lines l join accounts a on a.id=l.account_id where a.tenant_id=${TENANT_A} and a.code=${code}`;return cents(r.value);}
async function qty(p:string){const [r]=await admin`select coalesce(sum(qty_on_hand),0)::text as qty from inventory_stock_levels where tenant_id=${TENANT_A} and product_id=${p}`;return Number(r.qty);}
async function cogs(id:string){const [d]=await seed.select().from(schema.businessDocuments).where(eq(schema.businessDocuments.id,id));const [r]=await admin`select coalesce(sum(case when l.side='debit' then l.amount else -l.amount end),0)::text as value from journal_lines l join journal_entries j on j.id=l.journal_entry_id join accounts a on a.id=l.account_id where j.transaction_id=${d.transactionId} and a.code='5000'`;return cents(r.value);}
async function balanced(){const rows=await admin`select j.id,count(l.id)::int as lines,sum(case when l.side='debit' then l.amount else -l.amount end)::text as net from journal_entries j left join journal_lines l on l.journal_entry_id=j.id group by j.id`;for(const r of rows){expect(r.lines).toBeGreaterThan(0);expect(cents(r.net)).toBe(0);}}
async function twoReceipts(p:string){await create(p,'purchase',10,60,'2026-10-01');await create(p,'purchase',10,80,'2026-10-02');expect(await qty(p)).toBe(20);expect(await balance('5100')).toBe(140000);expect(await balance('2100')).toBe(-140000);}
it.each([['C-111','fifo',30000,110000],['RT-032','average',35000,105000]] as const)('[%s] %s different receipt prices use independently expected issue valuation',async(id,method,expectedIssue,expectedInventory)=>{
  await resetFixture();const p=await setup(method);await twoReceipts(p);const sale=await create(p,'sales_invoice',5,100,'2026-10-03');
  const issue=await cogs(sale),inventory=await balance('5100'),stock=await qty(p),report=await getReports('2026-10');
  observe(id,{methodFifo:Number(method==='fifo'),issueCents:issue,expectedIssueCents:expectedIssue,inventoryCents:inventory,expectedInventoryCents:expectedInventory,stockQty:stock,reportedProfitCents:cents(report.income.netIncome),expectedProfitCents:50000-expectedIssue});
  expect(issue).toBe(expectedIssue);expect(inventory).toBe(expectedInventory);expect(stock).toBe(15);expect(cents(report.income.netIncome)).toBe(50000-expectedIssue);
  if(method==='fifo'){const [lots]=await admin`select sum(qty_remaining)::text as qty,sum(qty_remaining*unit_cost)::text as value from inventory_cost_layers where product_id=${p} and voided_at is null`;expect(Number(lots.qty)).toBe(15);expect(cents(lots.value)).toBe(expectedInventory);}
  await balanced();
});
it.each([['RT-028','fifo',30000,6000],['RT-030','average',35000,7000],['RT-031','last',40000,8000]] as const)('[%s] %s return after later receipt restores source sale cost',async(id,method,issueCost,returnCost)=>{
  await resetFixture();const p=await setup(method);await twoReceipts(p);const sale=await create(p,'sales_invoice',5,100,'2026-10-03');expect(await cogs(sale)).toBe(issueCost);
  await create(p,'purchase',10,100,'2026-10-04');const credit=await create(p,'sales_return',1,100,'2026-10-05',sale);
  const returnedCost=-(await cogs(credit)),inventory=await balance('5100'),stock=await qty(p),historicalCost=await cogs(sale);
  observe(id,{methodFifo:Number(method==='fifo'),methodAverage:Number(method==='average'),returnCostCents:returnedCost,expectedReturnCostCents:returnCost,inventoryCents:inventory,expectedInventoryCents:240000-issueCost+returnCost,stockQty:stock,historicalIssueCents:historicalCost,expectedHistoricalIssueCents:issueCost});
  expect(returnedCost).toBe(returnCost);expect(inventory).toBe(240000-issueCost+returnCost);expect(stock).toBe(26);expect(historicalCost).toBe(issueCost);expect(await balance('1300')).toBe(40000);await balanced();
});
it('[RT-029] default profile refuses a backdated receipt preceding a later valued sale with zero effects',async()=>{
 const p=await setup('fifo');await twoReceipts(p);const sale=await create(p,'sales_invoice',5,100,'2026-10-03');
 const tables=['business_documents','business_document_lines','inventory_stock_levels','inventory_movements','inventory_cost_layers','inventory_cost_layer_consumptions','inventory_products','transactions','journal_entries','journal_lines','parties','settlement_allocations','audit_log'];
 const snapshot=async()=>{const rows={};for(const table of tables)rows[table]=await admin.unsafe(`select * from ${table} order by id`);return rows;};
 const before=await snapshot();
 const result=await createCommercialDocument({documentType:'purchase',partyName:'Synthetic supplier',issueDate:'2026-10-01',lines:[{productId:p,description:'Synthetic varying-price product',quantity:10,unitPrice:100}]} as any);
 const after=await snapshot();
 const inventory=await balance('5100'),stock=await qty(p),issue=await cogs(sale);observe('RT-029',{accepted:Number(result.ok),historyUnchanged:Number(JSON.stringify(before)===JSON.stringify(after)),issueCents:issue,expectedIssueCents:30000,inventoryCents:inventory,expectedInventoryCents:110000,stockQty:stock});
 expect(result.ok).toBe(false);expect(after).toEqual(before);expect(issue).toBe(30000);expect(inventory).toBe(110000);expect(stock).toBe(15);await balanced();
});
