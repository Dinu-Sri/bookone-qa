import { File } from 'node:buffer';
import { beforeEach, afterEach, it, expect, vi } from 'vitest';
import { uploadReceipt, getReceiptDownloadUrl } from '@product/web/app/actions/upload-receipt';
import { TENANT_A,TENANT_B,setActor } from './support/actor';
import { objects,signatures,resetStore } from './support/object-store';
beforeEach(()=>{
  vi.stubGlobal('File',File);resetStore();setActor();
  for(const [key,value] of Object.entries({S3_ENDPOINT:'https://objects.example.invalid',S3_ACCESS_KEY:'synthetic-only',S3_SECRET_KEY:'synthetic-only',S3_BUCKET:'qa-synthetic'}))vi.stubEnv(key,value);
});
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();});
function form(name='qa.pdf',type='application/pdf',size=32) {
  const fd=new FormData();fd.set('file',new File([new Uint8Array(size)],name,{type}) as unknown as Blob,name);return fd;
}
it('F-005 allowed declared MIME retains bytes/metadata in tenant-specific SDK command',async()=>{
  const result=await uploadReceipt(form());expect(result.ok).toBe(true);expect(objects.size).toBe(1);
  const command=objects.get(result.receiptRef!)!;expect(command.Key).toMatch(new RegExp(`^tenants/${TENANT_A}/receipts/`));
  expect([command.ContentType,command.ContentLength,command.Body.length]).toEqual(['application/pdf',32,32]);
  expect(command.Metadata).toMatchObject({tenantId:TENANT_A,originalName:'qa.pdf'});
});
it('F-006 missing and unsupported declared MIME produce no storage commands',async()=>{
  expect((await uploadReceipt(new FormData())).ok).toBe(false);
  for(const mime of ['text/html','application/x-msdownload',''])expect((await uploadReceipt(form('inert.txt',mime))).ok).toBe(false);
  expect(objects.size).toBe(0);
});
it('F-007 exact10MiB accepted and one extra byte denied; filename cannot escape tenant path',async()=>{
  const accepted=await uploadReceipt(form('../../qa.pdf','application/pdf',10*1024*1024));expect(accepted.ok).toBe(true);
  expect(accepted.receiptRef?.split('/')).toHaveLength(5);expect(accepted.receiptRef).not.toContain('/../');
  const count=objects.size;expect((await uploadReceipt(form('qa.pdf','application/pdf',10*1024*1024+1))).ok).toBe(false);expect(objects.size).toBe(count);
});
it('F-008 known foreign receipt must not be signed; actual own object is a positive control',async()=>{
  setActor('owner',TENANT_B);const foreign=await uploadReceipt(form());expect(foreign.ok).toBe(true);expect(objects.has(foreign.receiptRef!)).toBe(true);
  setActor('owner',TENANT_A);const own=await uploadReceipt(form());expect(own.ok).toBe(true);
  expect(await getReceiptDownloadUrl(own.receiptRef!)).toBeTruthy();expect(signatures).toHaveLength(1);expect(signatures[0]).toEqual({key:own.receiptRef,expiresIn:600});
  const signed=await getReceiptDownloadUrl(foreign.receiptRef!);
  expect({denied:signed===null,signerCalls:signatures.length}).toEqual({denied:true,signerCalls:1});
});
