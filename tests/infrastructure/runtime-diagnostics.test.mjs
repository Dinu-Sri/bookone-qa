import { test } from 'node:test';
import assert from 'node:assert/strict';
import { failureCategories } from '../../scripts/runtime/diagnostics.mjs';
test('private messages become fixed categories with no raw details',()=>{
  const messages=["TypeError: Cannot read properties of undefined (reading 'parsers') private-secret@example.invalid postgres://private.invalid", 'TypeError: client.begin is not a function'];
  assert.deepEqual(failureCategories(messages),['driver-options-parsers-missing','driver-begin-unavailable']);
  assert.equal(JSON.stringify(failureCategories(messages)).includes('private'),false);
});
test('unknown, empty and non-string errors disclose nothing',()=>{
  for(const input of [undefined,[],['sensitive value'],[null,{secret:'value'}]])assert.deepEqual(failureCategories(input),[]);
});
test('classifiers do not infer cause from absence of observations',()=>{
  assert.deepEqual(failureCategories(['AssertionError: expected 3 rows, got 0']),[]);
});
