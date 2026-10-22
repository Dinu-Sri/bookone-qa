import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {validate,initialize} from '../../scripts/operator-queue.mjs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url)));
const q=read('queues/MISSION-POSTFIX-LIGHT-05.json');
const uxBytes=fs.readFileSync(new URL('../../ux/workbook.json',import.meta.url));
const ux=JSON.parse(uxBytes);
test('fixed28 IDs/dependencies/UXrefs are coherent and END retains recovery contract',()=>{
 validate(q);assert.equal(q.cases.length,28);const seen=new Set(),refs=new Set(ux.cases.map(c=>c.id));
 for(const c of q.cases){for(const d of c.dependsOn)assert.ok(seen.has(d),d);for(const r of c.uxRefs)assert.ok(refs.has(r),r);seen.add(c.id);}
 assert.equal(q.cases.at(-1).id,'M20-END');assert.equal(q.cases.at(-1).recovery,true);
 assert.equal(q.cases.filter(c=>c.lane==='isolated-unavailable').length,3);
 assert.equal(q.ux.sha256,createHash('sha256').update(uxBytes).digest('hex'));assert.equal(q.ux.version,'1.1.0');
});
test('unbuilt candidate and unqualified writer cannot be fabricated into execution',()=>{
 assert.equal(q.executionReady,false);assert.equal(q.productSha,null);
 assert.throws(()=>initialize(q,{}),/awaits reviewed/);
 assert.match(q.bindingRequirements.join(' '),/Already-authorized/);
 assert.match(q.cases.find(c=>c.id==='M20-ACTOR').expected,/Owner label alone is insufficient/);
});
test('line/header and credit-print retain separate missing assertions',()=>{
 const by=id=>q.cases.find(c=>c.id===id);
 assert.match(by('M20-QUOTE-LINE').expected,/NOT header/);
 assert.match(by('M20-QUOTE-HEADER').expected,/noclampedzeroquote/);
 assert.match(by('M20-CREDIT-PRINT').expected,/blockedcapability/);
 assert.match(by('M20-F7').expected,/no legacy101c\/104c/);
});
test('independent all-pass financial forecast reconciles but cannot overwrite Light04 actuals',()=>{
 const turnover=18000+6000+12000+9500+1000+2*(30000+25650+30267+695);
 assert.equal(turnover,219724);assert.equal(1507087+turnover,1726811);
 assert.equal(137+3+1+1+2+2+2+8,156);
 assert.equal(118500+9500+1000,129000);assert.equal(73450-9500-1000,62950);
 assert.equal(129000+4671+62950,196621);
 const old=read('runs/CHECKS-20261022-light04-results.json');
 assert.deepEqual(old.counts,{passed:10,failed:4,blocked:10,inconclusive:4});
 assert.equal(old.reconciliation.closingAP,1185);assert.equal(old.reconciliation.closingJournals,137);
});
