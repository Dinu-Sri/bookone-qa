import assert from 'node:assert/strict';
export function checkTarget(url,identity){assert.equal(url,'http://127.0.0.1:3187');assert.equal(identity,'M2-FINAL-20261116-SYNTHETIC');return true;}
export function checkNewRun(exists){assert.equal(exists,false,'Consumed directory must never reopen');}
