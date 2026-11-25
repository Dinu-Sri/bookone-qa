import {it,expect} from 'vitest';
import {templateByKey} from '../../work/product/packages/auth/src/permissions/templates';
import {allows, type ResolveInput} from '../../work/product/packages/auth/src/permissions/resolve';
function role(key:'owner'|'accountant'|'purchasing'|'viewer'):ResolveInput {
  return {platformRole:'user',rbacEnforced:true,primaryTemplateKey:key,extraTemplateKey:null,
    grants:templateByKey(key)!.grants.map(key=>({key,level:key.endsWith('.read')?'read':'write'})),overrides:[],entityKind:'company',capabilityTier:null,
    modules:{purchase:true,sales:true,inventory:true,pos:true,rental:true},legacyRole:key,jobSlug:key};
}
it.each(['owner','accountant','purchasing'] as const)('%s template approval and post grants work through the real permission resolver',key=>{
  const access=role(key);
  expect(access.grants.some(g=>g.key==='agent_bridge.approve'&&g.level==='write')).toBe(true);
  expect(access.grants.some(g=>g.key==='agent_bridge.post'&&g.level==='write')).toBe(true);
  expect(allows(access,'agent_bridge.approve','write')).toBe(true);
  expect(allows(access,'agent_bridge.post','write')).toBe(true);
});
it('Viewer stays denied even when capability grants are copied into its job',()=>{
  const access=role('viewer');
  access.grants.push({key:'agent_bridge.approve',level:'write'},{key:'agent_bridge.post',level:'write'});
  expect(allows(access,'agent_bridge.approve','write')).toBe(false);
  expect(allows(access,'agent_bridge.post','write')).toBe(false);
});
