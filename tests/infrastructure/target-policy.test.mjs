import {test} from 'node:test';
import assert from 'node:assert/strict';
import {assertTarget} from '../../scripts/target-policy.mjs';
test('permits the owner-authorized staging origin and local instances',()=>{
  assert.equal(assertTarget('https://bookone.clossyan.com/'),'https://bookone.clossyan.com');
  assert.equal(assertTarget('http://localhost:3100'),'http://localhost:3100');
});
test('fails closed for missing, different, credential-bearing, and misleading targets',()=>{
  for(const value of [undefined,'https://production.example.com','https://bookone.clossyan.com.evil.example','https://bookone.clossyan.com@evil.example','https://user:password@bookone.clossyan.com','https://bookone.clossyan.com/path','https://bookone.clossyan.com?token=x','https://bookone.clossyan.com/#x','http://bookone.clossyan.com']) assert.throws(()=>assertTarget(value));
});
