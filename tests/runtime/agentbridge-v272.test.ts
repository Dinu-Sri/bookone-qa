import { beforeAll, afterAll, it, expect } from 'vitest';
// Only the authenticated session boundary is synthetic. Product permissions,
// commercial posting, PostgreSQL store, ALS and non-owner database role are real.
import { resetFixture, closeFixture, seed, admin } from './support/fixture';
import { TENANT_A, TENANT_B, OWNER, VIEWER, setActor } from './support/session';
import { withTenantContext } from '@bookone/db';
import { agentBridgeSettings } from '@product/schema/agent-bridge';
import { accounts, purchaseSettings, salesSettings, parties, tenantMemberships } from '@product/schema/index';
import { getAgentBridgeServiceForActor, authorizeAgentConnection } from '@product/web/lib/agent-bridge-runtime';
import { dispatchTool, mintLocalFixtureToken, actorFromAuthorization } from '@bookone/agent-bridge';
import { snapshotTenantTables } from '@product/db/archive/snapshot';
import { trialBalanceHash } from '@product/db/archive/snapshot';
import { restoreTenantDataArchive } from '@product/db/archive/restore';
import { encryptArchivePayload } from '@product/db/archive/crypto';
import { createHash, randomUUID } from 'node:crypto';
const actor = { tenantId: TENANT_A, userId: OWNER, capabilities: ['read','upload','draft','approve','post'] as any };
let uploadedId: string;
let positiveProposal: any, positiveApproval: any, positiveBill: string;
beforeAll(async () => {
  await resetFixture();
  await seed.insert(agentBridgeSettings).values({tenantId:TENANT_A,enabled:'1',draftOnly:'1',postingDisabled:'1'});
  // The same test user legitimately belongs to both synthetic companies.
  await seed.insert(tenantMemberships).values({tenantId:TENANT_B,userId:OWNER,role:'owner',status:'active'});
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
  await seed.insert(parties).values({tenantId:TENANT_A,name:'ABC Supplies',kind:'vendor',isVendor:'1'});
  await admin`update agent_bridge_settings set draft_only='0',posting_disabled='0' where tenant_id=${TENANT_A}`;
  await withTenantContext(TENANT_A, async () => {
    const service=await getAgentBridgeServiceForActor(actor);
    const uploaded=await service.submitDocument(actor,{filename:'synthetic-vat.pdf',mime:'application/pdf',bytes:new TextEncoder().encode('fixture:supported-vat-service')});
    expect(uploaded.ok).toBe(true);
    const proposal=await service.proposePurchaseBill(actor,uploaded.document!.id);
    const approval=await service.grantApproval(actor,(proposal as any).id);
    positiveProposal=proposal; positiveApproval=approval;
    const receipts=await Promise.all(['synthetic-db-post-once','synthetic-db-second-key'].map(idempotencyKey=>service.commitApprovedProposal(actor,{proposalId:(proposal as any).id,approvalId:(approval as any).id,idempotencyKey})));
    const receipt=receipts.find(r=>(r as any).status==='posted');
    expect(receipt).toMatchObject({status:'posted'});
    positiveBill=(receipt as any).billId;
    const [bill]=await admin`select total::text as total from business_documents where id=${(receipt as any).billId}`;
    expect(Number(bill.total)).toBe(1180);
    const [balance]=await admin`select sum(case when side='debit' then amount::numeric else -amount::numeric end)::text as net from journal_lines`;
    expect(Number(balance.net)).toBe(0);
    const [count]=await admin`select count(*)::int as n from business_documents`;
    expect(count.n).toBe(1);
  });
});
it('AB-DB-05 connected Viewer cannot post using stale post scope after current permission resolution', async () => {
  setActor();
  const ownerService=await getAgentBridgeServiceForActor(actor);
  const uploaded=await ownerService.submitDocument(actor,{filename:'synthetic-viewer-refusal.pdf',mime:'application/pdf',bytes:new TextEncoder().encode('fixture:supported-vat-service')});
  const proposal:any=await ownerService.proposePurchaseBill(actor,uploaded.document!.id);
  await ownerService.updateDraft(actor,{proposalId:proposal.id,expectedRevision:proposal.revision,patch:{supplierInvoiceNumber:'QA-V272-VIEWER-REFUSAL',issueDate:'2026-11-16'}});
  const approval:any=await ownerService.grantApproval(actor,proposal.id);
  expect(approval.id).toBeTruthy();
  const [before]=await admin`select count(*)::int as n from business_documents`;
  setActor(VIEWER,'viewer');
  // A valid local-fixture token represents an old grant; it is not a forged token.
  const secret='synthetic-review-signing-secret';
  const staleActor=actorFromAuthorization('Bearer '+mintLocalFixtureToken({tenantId:TENANT_A,userId:VIEWER,scopes:['read','post'],secret}),secret);
  const currentActor=await authorizeAgentConnection(staleActor);
  expect(currentActor.capabilities).not.toContain('post');
  let refusal: unknown;
  try {
    const service=await getAgentBridgeServiceForActor(staleActor);
    refusal=await dispatchTool(service,staleActor,'commit_approved_proposal',{proposalId:proposal.id,approvalId:approval.id,idempotencyKey:'synthetic-viewer-must-refuse'});
  } catch(e) { refusal={error:(e as Error).message}; }
  finally {setActor();}
  const [after]=await admin`select count(*)::int as n from business_documents`;
  expect(after.n, 'Viewer must create zero actual ERP bills').toBe(before.n);
  expect(refusal).not.toMatchObject({status:'posted'});
});
it('AB-DB-06 fresh service reconciles simulated lost response to both posted receipt and document', async () => {
  // Inject a crash-state only in the guarded disposable fixture, after a real ERP commit.
  await admin`update agent_bridge_operations set receipt_json=jsonb_set(receipt_json,'{status}','"unknown_outcome"'::jsonb) where proposal_id=${positiveProposal.id}`;
  await admin`update agent_bridge_documents set status='unknown_outcome' where id=${positiveProposal.documentId}`;
  const restarted=await getAgentBridgeServiceForActor(actor);
  const receipt=await restarted.commitApprovedProposal(actor,{proposalId:positiveProposal.id,approvalId:positiveApproval.id,idempotencyKey:'synthetic-db-post-once'});
  expect(receipt).toMatchObject({status:'posted',billId:positiveBill});
  const [doc]=await admin`select status from agent_bridge_documents where id=${positiveProposal.documentId}`;
  expect(doc.status,'Reconciled document must agree with ERP and receipt').toBe('posted');
});
// Recovery/export coverage is deliberately LAST after functional dispositions.
it('AB-REC-01 actual tenant archive includes the persisted AgentBridge document and blob', async () => {
  await withTenantContext(TENANT_A, async () => {
    const snapshot=await snapshotTenantTables(TENANT_A);
    expect(snapshot.tables.agent_bridge_documents ?? [], 'Archive must contain the actual persisted AgentBridge document').toEqual(expect.arrayContaining([expect.objectContaining({id:uploadedId})]));
    expect(snapshot.rowCounts.agent_bridge_blobs).toBe(3);
  });
});
it('AB-REC-02 fresh encrypted restore retrieves exact AgentBridge attachment bytes without changing source', async () => {
  const source=await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A));
  const hash=await withTenantContext(TENANT_A,()=>trialBalanceHash(TENANT_A));
  const manifest={format:'bookone.tenant-archive',exportId:randomUUID(),schemaVersion:1,appVersion:'2.7.2',appCommit:'2967526',exportedAt:new Date().toISOString(),sourceTenantId:TENANT_A,sourceName:'Synthetic AgentBridge recovery',sourceSlug:'qa-runtime-a',kind:'data',dataSha256:createHash('sha256').update(JSON.stringify(source.tables)).digest('hex'),filesSha256:createHash('sha256').update('[]').digest('hex'),fileCount:0,rowCounts:source.rowCounts,integrity:{trialBalanceHash:hash}};
  const password='synthetic-archive-test-only';
  const file=encryptArchivePayload(JSON.stringify({format:manifest.format,kind:'data',manifest,tables:source.tables,objects:[]}),password);
  const restored=await withTenantContext(TENANT_B,()=>restoreTenantDataArchive({tenantId:TENANT_B,restorerUserId:OWNER,file,password}));
  expect(restored).toMatchObject({ok:true});
  expect(await withTenantContext(TENANT_A,()=>snapshotTenantTables(TENANT_A))).toEqual(source);
  const service=await getAgentBridgeServiceForActor({...actor,tenantId:TENANT_B});
  const docs=await service.listInbox({...actor,tenantId:TENANT_B});
  expect(docs).toHaveLength(3);
  for(const doc of docs){
    const original=source.tables.agent_bridge_blobs.find(b=>b.filename===doc.filename)!;
    const attachment:any=await service.getOwnedAttachment({...actor,tenantId:TENANT_B},doc.storageKey);
    expect(attachment?.bytes, 'Restored attachment must be retrievable by its restored document key').toBeDefined();
    expect(Buffer.from(attachment.bytes).toString('base64')).toBe(original.content);
  }
});
