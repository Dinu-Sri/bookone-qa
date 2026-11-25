import {describe,it,expect} from '../../work/product/packages/agent-bridge/node_modules/vitest';
import {AgentBridgeService,recordingPostingPort} from '../../work/product/packages/agent-bridge/src/service';
import {MemoryStore} from '../../work/product/packages/agent-bridge/src/store';
import {defaultPolicy,type Actor} from '../../work/product/packages/agent-bridge/src/contracts';

const actor:Actor={userId:'independent-owner',tenantId:'independent-company',capabilities:['read','upload','draft','approve','post']};
async function setup(){
  const store=new MemoryStore();
  await store.setFlags(actor.tenantId,{enabled:true,draftOnly:false,postingDisabled:false});
  const policy=defaultPolicy();
  policy.defaultExpenseAccount='6800';
  policy.approvedCategories=[{label:'Cost of Goods Sold',accountCode:'5000'},{label:'General Expense',accountCode:'6800'}];
  const svc=new AgentBridgeService({store,posting:recordingPostingPort(),policyFor:async()=>policy,extractor:{id:'independent:no-ocr',async extract(){throw Error('not needed');}}});
  const upload={filename:'independent.pdf',mime:'application/pdf',bytes:new TextEncoder().encode('%PDF-1.4\nIndependent synthetic source\n%%EOF')};
  return {store,svc,upload};
}
async function draft(){
  const s=await setup();const received=await s.svc.submitDocument(actor,s.upload);
  if(!received.ok||!received.document)throw Error('Fixture source was not stored');
  const facts={documentId:received.document.id,contentHash:received.document.contentHash,expectedRevision:0,supplierName:'ABC Supplies',supplierInvoiceNumber:'INDEPENDENT-001',issueDate:'2026-11-17',currency:'LKR',paidStatus:'unpaid' as const,documentKind:'service_expense' as const,netMinor:100000,taxMinor:18000,grossMinor:118000,expenseAccountCode:'6800',lineDescription:'First description',idempotencyKey:'facts-1'};
  const result=await s.svc.submitExtractedFacts(actor,facts);
  if(!result.ok)throw Error('Fixture facts were refused');
  return {...s,facts,result};
}
describe('Independent AB05 contract and concurrency acceptance',()=>{
  it('same logical upload concurrently stores exactly one document',async()=>{
    const {svc,store,upload}=await setup();
    const results=await Promise.all([svc.submitDocument(actor,{...upload,idempotencyKey:'upload-one'}),svc.submitDocument(actor,{...upload,idempotencyKey:'upload-one'})]);
    expect(results.every(r=>r.ok)).toBe(true);
    expect((await store.listDocuments(actor.tenantId)).length).toBe(1);
  });
  it('facts idempotency rejects a changed line description',async()=>{
    const {svc,facts}=await draft();
    const replay=await svc.submitExtractedFacts(actor,{...facts,lineDescription:'Different service evidence'});
    expect(replay).toMatchObject({ok:false,code:'IDEMPOTENCY_MISMATCH'});
  });
  it('selected expense account determines the displayed category label',async()=>{
    const {result}=await draft();
    expect(result.proposal.facts.expenseAccountCode).toBe('6800');
    expect(result.proposal.facts.categoryLabel).toBe('General Expense');
  });
  it('editing approved facts returns a new reviewable revision and revokes prior approval',async()=>{
    const {svc,store,facts,result}=await draft();
    await svc.validateProposal(actor,result.proposal.id);
    const approval=await svc.grantApproval(actor,result.proposal.id);
    if(!('id' in approval))throw Error('Fixture approval unavailable');
    const changed=await svc.submitExtractedFacts(actor,{...facts,idempotencyKey:'facts-2',expectedRevision:result.document.proposalRevision,lineDescription:'Corrected description'});
    expect(changed.ok).toBe(true);
    const old=await store.getApproval(actor.tenantId,approval.id);
    expect(old?.revokedAt).toBeTruthy();
  });
  it('a superseded proposal cannot reuse the old approval to invoke posting',async()=>{
    const {svc,facts,result}=await draft();
    const oldId=result.proposal.id;
    await svc.validateProposal(actor,oldId);
    const approval=await svc.grantApproval(actor,oldId);
    if(!('id' in approval))throw Error('Fixture approval unavailable');
    await svc.validateProposal(actor,oldId);
    const corrected=await svc.submitExtractedFacts(actor,{...facts,idempotencyKey:'new-correction',expectedRevision:1,netMinor:200000,taxMinor:36000,grossMinor:236000});
    if(!corrected.ok)throw Error('Fixture correction was refused');
    expect(corrected.document.proposalId).not.toBe(oldId);
    await svc.requestApproval(actor,oldId);
    const receipt=await svc.commitApprovedProposal(actor,{proposalId:oldId,approvalId:approval.id,idempotencyKey:'superseded-post'});
    expect(receipt).not.toMatchObject({status:'posted'});
  });
});
