import { it, expect, vi, afterEach } from 'vitest';
import { randomBytes, createHash } from 'node:crypto';
import { encryptArchivePayload, decryptArchivePayload } from '@product/archive/crypto';
import { ARCHIVE_DATA_TABLE_NAMES, ARCHIVE_EXCLUDED_TABLES, isOperationallyEmpty, rewriteTenantPrefix } from '@product/archive/format';
import { validateDataEnvelope, journalsAreBalanced, trialBalanceHashFromTables, remapArchiveTables } from '@product/archive/remap';
import { transformArchiveToCurrent } from '@product/archive/transform';
import { assertFilesPackMatchesDataRestore, applyArchiveObjects } from '@product/archive/files';
import { allows } from '@product/auth/permissions/resolve';
import { templateByKey } from '@product/auth/permissions/templates';
import { keepNavItem, CONTROL_ROOM_NAV_LABELS } from '@product/web/lib/nav-visibility';
import { withFormPending } from '@product/web/components/ui/form-busy';
afterEach(()=>vi.unstubAllGlobals());
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222',U='33333333-3333-4333-8333-333333333333',V='44444444-4444-4444-8444-444444444444';
const H=(value:string|Buffer)=>createHash('sha256').update(value).digest('hex');
const permissionInput=(job:string,extra:any={})=>({platformRole:'user',rbacEnforced:true,primaryTemplateKey:job,extraTemplateKey:null,grants:(templateByKey(job)?.grants??[]).map(key=>({key,level:key.endsWith('.write')?'write':'read'})),overrides:[],entityKind:'company',capabilityTier:'full',modules:{sales:true,purchase:true,inventory:true,rental:true,pos:true},...extra}) as any;
const membership='55555555-5555-4555-8555-555555555555',otherMembership='66666666-6666-4666-8666-666666666666',cash='77777777-7777-4777-8777-777777777777',ar='88888888-8888-4888-8888-888888888888',entry='99999999-9999-4999-8999-999999999999',txn='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const tables=()=>({accounts:[{id:cash,tenantId:A,code:'1000'},{id:ar,tenantId:A,code:'1300'}],transactions:[{id:txn,tenantId:A,userId:V,receiptRef:`tenants/${A}/receipts/${V}/scan.png`}],journal_entries:[{id:entry,tenantId:A,transactionId:txn}],journal_lines:[{id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',tenantId:A,journalEntryId:entry,accountId:cash,side:'debit',amount:'250.00'},{id:'cccccccc-cccc-4ccc-8ccc-cccccccccccc',tenantId:A,journalEntryId:entry,accountId:ar,side:'credit',amount:'250.00'}],tenant_memberships:[{id:membership,tenantId:A,userId:U,role:'owner'},{id:otherMembership,tenantId:A,userId:V,role:'viewer'}],tenant_membership_roles:[{id:'dddddddd-dddd-4ddd-8ddd-dddddddddddd',tenantId:A,membershipId:otherMembership}]});
const envelope=(kind='data',body:any=tables())=>({format:'bookone.tenant-archive',kind,manifest:{format:'bookone.tenant-archive',kind,exportId:A,schemaVersion:1,sourceTenantId:A,dataSha256:H(JSON.stringify(body)),filesSha256:H('[]'),fileCount:0,integrity:{trialBalanceHash:trialBalanceHashFromTables(body)}},tables:body,objects:[]}) as any;
it('[S-0763] Viewer backup privileges remain denied despite extra Owner grant and override',()=>{
  for(const enforced of [true,false])for(const key of ['company.backup.read','company.backup.write'])expect(allows(permissionInput('viewer',{rbacEnforced:enforced,extraTemplateKey:'owner',overrides:[{key,effect:'allow'}]}),key,key.endsWith('.write')?'write':'read')).toBe(false);
});
it('[S-0764] primary Owner is allowed and company Admin cannot acquire backup privileges',()=>{
  for(const key of ['company.backup.read','company.backup.write']){
    const need=key.endsWith('.write')?'write':'read';expect(allows(permissionInput('owner'),key,need)).toBe(true);
    for(const enforced of [true,false])expect(allows(permissionInput('admin',{rbacEnforced:enforced,extraTemplateKey:'owner',grants:[{key,level:need}],overrides:[{key,effect:'allow'}]}),key,need)).toBe(false);
  }
});
it('[S-0765] supported nav helper inputs distinguish platform super-admin from company role',()=>{
  expect([...CONTROL_ROOM_NAV_LABELS]).toEqual(['Overview','Companies','Modules','Access','ERP Health Check']);
  for(const label of CONTROL_ROOM_NAV_LABELS){const args={label,href:'/control-room',suiteSuperAdminOnly:true,accessByLabel:{}};expect(keepNavItem({...args,isSuperAdmin:true})).toBe(true);expect(keepNavItem({...args,isSuperAdmin:false})).toBe(false);}
});
it('[S-0767] encrypted paired payloads round-trip with independent cross-checksums and random salt',()=>{
  const password=randomBytes(24).toString('base64');const data=envelope(),files=envelope('files');const raw=JSON.stringify(data);
  const first=encryptArchivePayload(raw,password),second=encryptArchivePayload(raw,password);expect(first.subarray(0,5).toString()).toBe('B1AR1');expect(first.equals(second)).toBe(false);
  const decoded=JSON.parse(decryptArchivePayload(first,password));const decodedFiles=JSON.parse(decryptArchivePayload(encryptArchivePayload(JSON.stringify(files),password),password));
  expect(decoded).toEqual(data);expect([decodedFiles.manifest.exportId,decodedFiles.manifest.schemaVersion,decodedFiles.manifest.dataSha256,decodedFiles.manifest.filesSha256]).toEqual([data.manifest.exportId,1,data.manifest.dataSha256,data.manifest.filesSha256]);
});
it('[S-0769] explicit excluded tables never enter the declared data whitelist',()=>{
  for(const name of ['users','platform_audit_events','ops_request_logs','ops_idempotency','tenant_invites']){expect(ARCHIVE_EXCLUDED_TABLES as readonly string[]).toContain(name);expect(ARCHIVE_DATA_TABLE_NAMES as readonly string[]).not.toContain(name);}
  for(const name of ['business_documents','business_document_lines','journal_entries','journal_lines','inventory_cost_layers','document_styles','bank_statement_lines','rental_events','pos_shifts'])expect(ARCHIVE_DATA_TABLE_NAMES as readonly string[]).toContain(name);
});
it('[S-0774] every independently listed trading family blocks the empty helper',()=>{
  const keys=['parties','transactions','journal_entries','journal_lines','business_documents','business_document_lines','inventory_products','inventory_stock_docs','inventory_movements','settlement_allocations','pos_shifts','bank_statement_imports','bank_reconciliation_sessions','rental_events'];const zero=Object.fromEntries(keys.map(k=>[k,0]));
  expect(isOperationallyEmpty({...zero,accounts:3,tenant_roles:8,tenant_memberships:1})).toBe(true);for(const key of keys)expect(isOperationallyEmpty({...zero,[key]:1})).toBe(false);
});
it('[S-0776] wrong password altered ciphertext and truncated payload fail authentication',()=>{
  const password=randomBytes(24).toString('base64'),wrong=randomBytes(24).toString('base64');const file=encryptArchivePayload(JSON.stringify(envelope()),password),bad=Buffer.from(file);bad[34]^=1;
  expect(()=>decryptArchivePayload(file,wrong)).toThrow();expect(()=>decryptArchivePayload(bad,password)).toThrow();expect(()=>decryptArchivePayload(file.subarray(0,10),password)).toThrow();
});
it('[S-0777] data kind checksum and future schema validation fail closed',()=>{
  const data=envelope();expect(()=>validateDataEnvelope(data)).not.toThrow();expect(()=>validateDataEnvelope({...data,kind:'files'})).toThrow();expect(()=>validateDataEnvelope({...data,manifest:{...data.manifest,dataSha256:'0'.repeat(64)}})).toThrow();
  expect(()=>transformArchiveToCurrent({...data,manifest:{...data.manifest,schemaVersion:2}})).toThrow();expect(transformArchiveToCurrent(data)).toBe(data);
});
it('[S-0778] remapped PK FK and tenant references retain relational identity',()=>{
  const old=tables();const result=remapArchiveTables({tables:old,sourceTenantId:A,targetTenantId:B,restorerUserId:U}).tables;
  expect(result.accounts.map(r=>r.id).some(id=>[cash,ar].includes(String(id)))).toBe(false);
  for(const rows of Object.values(result))for(const row of rows)if('tenantId'in row)expect(row.tenantId).toBe(B);
  expect(result.journal_entries[0].transactionId).toBe(result.transactions[0].id);expect(result.journal_lines.map(r=>r.accountId)).toEqual(result.accounts.map(r=>r.id));expect(result.journal_lines.every(r=>r.journalEntryId===result.journal_entries[0].id)).toBe(true);
});
it('[S-0780] restorer retains owner identity and extra membership dependent rows are omitted',()=>{
  const result=remapArchiveTables({tables:tables(),sourceTenantId:A,targetTenantId:B,restorerUserId:U}).tables;
  expect(result.tenant_memberships).toHaveLength(1);expect([result.tenant_memberships[0].userId,result.tenant_memberships[0].role]).toEqual([U,'owner']);expect(result.tenant_membership_roles).toHaveLength(0);expect(result.transactions[0].userId).toBe(U);expect(Object.keys(result)).not.toContain('users');
});
it('[S-0781] balanced journal and trial hash survive remap; unbalanced input is rejected',()=>{
  const old=tables(),next=remapArchiveTables({tables:old,sourceTenantId:A,targetTenantId:B,restorerUserId:U}).tables;
  const expected=H('1000|250.00|0.00\n1300|0.00|250.00');expect(trialBalanceHashFromTables(old)).toBe(expected);expect(trialBalanceHashFromTables(next)).toBe(expected);expect(journalsAreBalanced(next).ok).toBe(true);
  expect(journalsAreBalanced({...old,journal_lines:old.journal_lines.slice(0,1)}).ok).toBe(false);
});
it('[S-0787] pair exportId checksum prior-data and repeated-apply guards reject mismatches',()=>{
  const valid={packExportId:A,packFilesSha256:H('[]'),lastRestore:{exportId:A,filesSha256:H('[]')},filesAlreadyApplied:false};expect(()=>assertFilesPackMatchesDataRestore(valid)).not.toThrow();
  for(const over of [{packExportId:B},{packFilesSha256:'0'.repeat(64)},{lastRestore:null},{filesAlreadyApplied:true}])expect(()=>assertFilesPackMatchesDataRestore({...valid,...over} as any)).toThrow();
});
it('[S-0789] memory-store application fills missing object without overwriting sentinel bytes',async()=>{
  const key=`tenants/${A}/receipts/${V}/scan.png`,target=`tenants/${B}/receipts/${V}/scan.png`;const body=Buffer.from('synthetic receipt bytes'),sentinel=Buffer.from('existing synthetic sentinel');const map=new Map<string,Buffer>([[target,sentinel]]);
  const store={exists:async(k:string)=>map.has(k),put:async(k:string,b:Buffer)=>{map.set(k,b);}};
  const obj={key,contentType:'image/png',bodyBase64:body.toString('base64'),size:body.length,sha256:H(body)};
  expect(await applyArchiveObjects({sourceTenantId:A,targetTenantId:B,objects:[obj],store})).toMatchObject({applied:0,skippedExisting:1});expect(map.get(target)?.equals(sentinel)).toBe(true);
  map.clear();expect(await applyArchiveObjects({sourceTenantId:A,targetTenantId:B,objects:[obj],store})).toMatchObject({applied:1,skippedExisting:0});expect(map.get(target)?.equals(body)).toBe(true);
});
it('[S-0790] storage rewrite changes only the leading tenant namespace',()=>{
  const suffix=`receipts/${V}/${A}.png`,key=`tenants/${A}/${suffix}`;expect(rewriteTenantPrefix(key,A,B)).toBe(`tenants/${B}/${suffix}`);expect(rewriteTenantPrefix(`tenants/${V}/scan.png`,A,B)).toBe(`tenants/${V}/scan.png`);
});
it('[S-0793] traversal foreign namespace archive internals and bad body hash write nothing',async()=>{
  let writes=0;const body=Buffer.from('synthetic bytes'),obj={contentType:'image/png',bodyBase64:body.toString('base64'),size:body.length,sha256:H(body)};const store={exists:async()=>false,put:async()=>{writes++;}};
  for(const key of [`tenants/${A}/../escape`, `tenants/${V}/receipts/x`, `tenants/${A}/_archive/latest.json`])expect((await applyArchiveObjects({sourceTenantId:A,targetTenantId:B,objects:[{...obj,key}],store})).skippedInvalid).toBe(1);
  expect((await applyArchiveObjects({sourceTenantId:A,targetTenantId:B,objects:[{...obj,key:`tenants/${A}/receipts/x`,sha256:'0'.repeat(64)}],store})).skippedInvalid).toBe(1);expect(writes).toBe(0);
});
it('[S-0797] withFormPending clears success and failure events in finally',async()=>{
  const events:boolean[]=[];vi.stubGlobal('window',{dispatchEvent:(event:CustomEvent)=>{events.push(event.detail);}});
  expect(await withFormPending(async()=>42)).toBe(42);expect(events).toEqual([true,false]);events.length=0;await expect(withFormPending(async()=>{throw new Error('Synthetic helper failure');})).rejects.toThrow('Synthetic helper failure');expect(events).toEqual([true,false]);
});
