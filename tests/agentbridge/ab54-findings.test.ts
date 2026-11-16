import{describe,it,expect}from 'vitest';
import{AgentBridgeService,recordingPostingPort}from '../../work/product/packages/agent-bridge/src/service';
import{MemoryStore}from '../../work/product/packages/agent-bridge/src/store';
import{defaultPolicy}from '../../work/product/packages/agent-bridge/src/contracts';
import{fixtureExtractor,liveExtractorFromEnv}from '../../work/product/packages/agent-bridge/src/extraction';
import{signConnectionToken,verifyConnectionToken}from '../../work/product/packages/agent-bridge/src/authz';
import{dispatchTool}from '../../work/product/packages/agent-bridge/src/mcp';
const actor={tenantId:'synthetic-company',userId:'synthetic-owner',capabilities:['read','upload','draft','approve','post'] as any};
async function setup(kind='supported-vat-service') {const store=new MemoryStore();await store.setFlags(actor.tenantId,{enabled:true,draftOnly:false,postingDisabled:false});const posting=recordingPostingPort(),service=new AgentBridgeService({store,posting,extractor:fixtureExtractor,policyFor:async()=>defaultPolicy()});const r=await service.submitDocument(actor,{filename:'synthetic.pdf',mime:'application/pdf',bytes:new TextEncoder().encode('fixture:'+kind)});if(!r.ok)throw Error('fixture refused');const p=await service.proposePurchaseBill(actor,r.document!.id);return{store,posting,service,proposalId:(p as any).id};}
describe('independent acceptance expectations, failures retained',()=>{
 it('unsupported paid invoice cannot be approved and posted while blocking issues remain',async()=>{const{service,posting,proposalId}=await setup('unsupported-paid');const a=await service.grantApproval(actor,proposalId);await service.commitApprovedProposal(actor,{proposalId,approvalId:(a as any).id,idempotencyKey:'paid-refusal'});expect(posting.posts).toHaveLength(0);});
 it('different keys concurrent on same approved proposal cause at most one posting call',async()=>{const{service,posting,proposalId}=await setup();const a=await service.grantApproval(actor,proposalId);await Promise.all(['one','two'].map(idempotencyKey=>service.commitApprovedProposal(actor,{proposalId,approvalId:(a as any).id,idempotencyKey})));expect(posting.posts).toHaveLength(1);});
 it('tokens without finite expiry are rejected even when their signature is valid',()=>{const t=signConnectionToken({tenantId:actor.tenantId,userId:actor.userId,scopes:['post'],connectionId:'synthetic',clientId:'synthetic'} as any,'isolated-test-secret');expect(()=>verifyConnectionToken(t,'isolated-test-secret')).toThrow();});
 it('connected agent cannot grant a human-only approval even with carried approve capability',async()=>{const{service,proposalId}=await setup();const r=await dispatchTool(service,{...actor,connectionId:'synthetic-client'},'grant_approval',{proposalId});expect(r).toMatchObject({ok:false});});
 it('configured live OCR must do more than throw an unconditional blocked stub',async()=>{const extractor=liveExtractorFromEnv({AGENT_BRIDGE_OCR_ENDPOINT:'http://127.0.0.1:1',AGENT_BRIDGE_OCR_KEY:'synthetic-never-used'});await expect(extractor.extract({contentHash:'synthetic'})).rejects.not.toThrow('remote smoke is BLOCKED');});
});
