import { beforeAll, afterAll, it, expect } from 'vitest';
// Only the authenticated session boundary is synthetic. Product permissions,
// commercial posting, PostgreSQL store, ALS and non-owner database role are real.
import { resetFixture, closeFixture, seed, admin } from './support/fixture';
import { TENANT_A, TENANT_B, OWNER } from './support/session';
import { withTenantContext } from '@bookone/db';
import { agentBridgeSettings } from '@product/schema/agent-bridge';
import { accounts, purchaseSettings, salesSettings } from '@product/schema/index';
import { getAgentBridgeServiceForActor } from '@product/web/lib/agent-bridge-runtime';
import { snapshotTenantTables } from '@product/db/archive/snapshot';
const actor = { tenantId: TENANT_A, userId: OWNER, capabilities: ['read','upload','draft','approve','post'] as any };
let uploadedId: string;
beforeAll(async () => {
  await resetFixture();
  await seed.insert(agentBridgeSettings).values({tenantId:TENANT_A,enabled:'1',draftOnly:'1',postingDisabled:'1'});
});
afterAll(closeFixture);
it('AB-DB-01 positive scoped upload persists a real document and blob', async () => {
  await withTenantContext(TENANT_A, async () => {
    const service = await getAgentBridgeServiceForActor(actor);
    const result = await service.submitDocument(actor,{filename:'synthetic-review.pdf',mime:'application/pdf',bytes:new TextEncoder().encode('synthetic-review-only')});
    expect(result.ok).toBe(true);
    uploadedId = result.document!.id;
    expect((await service.listInbox(actor)).map(x=>x.id)).toContain(uploadedId);
  });
  const [row] = await admin`select count(*)::int as n from agent_bridge_blobs`;
  expect(row.n).toBe(1);
});
it('AB-DB-02 separate tenant cannot read the positive fixture under non-owner RLS', async () => {
  await withTenantContext(TENANT_B, async () => {
    const service=await getAgentBridgeServiceForActor({...actor,tenantId:TENANT_B});
    expect(await service.listInbox({...actor,tenantId:TENANT_B})).toHaveLength(0);
  });
});
it('AB-DB-03 returned runtime service retains the authorized tenant scope at call time', async () => {
  const service=await getAgentBridgeServiceForActor(actor);
  const caps=await service.getCapabilities(actor);
  expect(caps.flags.enabled).toBe(true);
  expect((await service.listInbox(actor)).map(x=>x.id)).toContain(uploadedId);
});
it('AB-DB-04 scoped supported approval posts an actual balanced ERP bill matching its preview', async () => {
  await seed.insert(accounts).values([
    {tenantId:TENANT_A,code:'2100',name:'AP',type:'liability',normalSide:'credit'},
    {tenantId:TENANT_A,code:'2300',name:'Input VAT',type:'asset',normalSide:'debit'},
    {tenantId:TENANT_A,code:'6800',name:'Expense',type:'expense',normalSide:'debit'},
  ]);
  await seed.insert(purchaseSettings).values({tenantId:TENANT_A,requireBillApproval:'0',requireGrnBeforeBill:'0',postGrniOnReceipt:'0'});
  await seed.insert(salesSettings).values({tenantId:TENANT_A,vatRegistered:'1',vatRatePercent:'18.00'});
  await admin`update agent_bridge_settings set draft_only='0',posting_disabled='0' where tenant_id=${TENANT_A}`;
  await withTenantContext(TENANT_A, async () => {
    const service=await getAgentBridgeServiceForActor(actor);
    const uploaded=await service.submitDocument(actor,{filename:'synthetic-vat.pdf',mime:'application/pdf',bytes:new TextEncoder().encode('fixture:supported-vat-service')});
    expect(uploaded.ok).toBe(true);
    const proposal=await service.proposePurchaseBill(actor,uploaded.document!.id);
    const approval=await service.grantApproval(actor,(proposal as any).id);
    const receipt=await service.commitApprovedProposal(actor,{proposalId:(proposal as any).id,approvalId:(approval as any).id,idempotencyKey:'synthetic-db-post-once'});
    expect(receipt).toMatchObject({status:'posted'});
    const [bill]=await admin`select total::text as total from business_documents where id=${(receipt as any).billId}`;
    expect(Number(bill.total)).toBe(1180);
    const [balance]=await admin`select sum(case when side='debit' then amount::numeric else -amount::numeric end)::text as net from journal_lines`;
    expect(Number(balance.net)).toBe(0);
  });
});
// Recovery/export coverage is deliberately LAST after functional dispositions.
it('AB-REC-01 actual tenant archive includes the persisted AgentBridge document and blob', async () => {
  await withTenantContext(TENANT_A, async () => {
    const snapshot=await snapshotTenantTables(TENANT_A);
    expect(snapshot.tables.agent_bridge_documents ?? [], 'Archive must contain the actual persisted AgentBridge document').toEqual(expect.arrayContaining([expect.objectContaining({id:uploadedId})]));
    expect(snapshot.rowCounts.agent_bridge_blobs).toBe(2);
  });
});


