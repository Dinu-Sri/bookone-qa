import test from 'node:test';import assert from 'node:assert/strict';import{checkTarget,checkNewRun}from '../../scripts/final-isolation.mjs';
test('only exact loopback and synthetic identity accepted',()=>assert.equal(checkTarget('http://127.0.0.1:3187','M2-FINAL-20261116-SYNTHETIC'),true));
for(const target of ['https://bookone.clossyan.com','http://0.0.0.0:3187','http://127.0.0.1:3188'])test('remote or wrong listener refused '+target,()=>assert.throws(()=>checkTarget(target,'M2-FINAL-20261116-SYNTHETIC')));
test('missing fixture identity refused',()=>assert.throws(()=>checkTarget('http://127.0.0.1:3187',null)));
test('consumed run refused',()=>assert.throws(()=>checkNewRun(true)));
