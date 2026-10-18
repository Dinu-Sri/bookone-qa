import test from 'node:test';
import assert from 'node:assert/strict';
import {conserved,represented,profile,verifiedSources} from '../../scripts/review43-source.mjs';
test('independent cent allocation profiles conserve both fresh fixtures and 2.99 control',()=>{
 assert.deepEqual(profile(7,5),[99,99,99,99,99,100,100]);
 assert.deepEqual(profile(10,5),[99,99,99,99,99,100,100,100,100,100]);
 assert.deepEqual(profile(3,1),[100,100,99]);
});
test('value and representation assertions detect cent loss rather than just balanced labels',()=>{
 assert.equal(conserved(695,694),false);assert.equal(conserved(695,695),true);
 assert.equal(represented({lines:[{lineTotal:1}],headerDiscount:0,total:1.01}),false);
 assert.equal(represented({lines:[{lineTotal:1.01}],headerDiscount:0,total:1.01}),true);
 assert.equal(represented({lines:[{lineTotal:1}],headerDiscount:.01,total:.99}),true);
});
test('source provenance fails closed and invalid fixture values are not silently accepted',()=>{
 assert.throws(()=>verifiedSources('.',{}));assert.throws(()=>profile(0,5));assert.throws(()=>profile(7,-1));assert.throws(()=>profile(7,700));
});

test('changed bytes reject a valid pinned snapshot before any source execution',async()=>{
 const {mkdtempSync,mkdirSync,writeFileSync,rmSync}=await import('node:fs');
 const {tmpdir}=await import('node:os');const {join,dirname}=await import('node:path');const {createHash}=await import('node:crypto');
 const root=mkdtempSync(join(tmpdir(),'review43-hash-'));
 try{
  const paths=['packages/accounting/src/document-guards.ts','apps/web/src/components/sales/sales-document-form.tsx','apps/web/src/components/module/commercial-doc-screens.tsx','apps/web/src/components/module/document-lines-editor.tsx','apps/web/src/components/sales/invoice-document-form.tsx'];
  const manifest={schemaVersion:1,repository:'Dinu-Sri/BookOne',commit:'a'.repeat(40),files:{}};
  for(const p of paths){mkdirSync(dirname(join(root,p)),{recursive:true});writeFileSync(join(root,p),'// synthetic hash fixture\n');manifest.files[p]=createHash('sha256').update('// synthetic hash fixture\n').digest('hex');}
  assert.equal(Object.keys(verifiedSources(root,manifest)).length,5);
  writeFileSync(join(root,paths[0]),'// changed byte\n');
  assert.throws(()=>verifiedSources(root,manifest),/fingerprint mismatch/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
