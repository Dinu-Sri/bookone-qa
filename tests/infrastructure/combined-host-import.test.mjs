import test from 'node:test';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import fs from 'node:fs';
test('wrapper and CLI import without a process global or CLI side effects',()=>{
 const paths=['../../scripts/combined-v2527-cua.mjs','../../scripts/combined-v2527-run.mjs'].map(p=>new URL(p,import.meta.url).href);
 const code=`delete globalThis.process;await import(${JSON.stringify(paths[0])});await import(${JSON.stringify(paths[1])});`;
 assert.doesNotThrow(()=>execFileSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8'}));
});
test('CUA wrapper dependency avoids CLI and frozen verifier has no subprocess',()=>{
 const wrapper=fs.readFileSync(new URL('../../scripts/combined-v2527-cua.mjs',import.meta.url),'utf8');
 const frozen=fs.readFileSync(new URL('../../scripts/combined-v2527-frozen.mjs',import.meta.url),'utf8');
 assert(!wrapper.includes("from './combined-v2527-run.mjs'"));assert(!/child_process|execFileSync|\bprocess\./.test(frozen));
});

