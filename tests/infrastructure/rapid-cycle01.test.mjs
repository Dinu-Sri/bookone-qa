import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {validate,initialize} from '../../scripts/operator-queue.mjs';
import {prepareDesktopProof} from '../../scripts/prepare-desktop-proof.mjs';
import {dispatchPersistedDesktopAction} from '../../scripts/operator-desktop-cua.mjs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../../'+p,import.meta.url)));
const q=read('queues/MISSION-v2522-RAPID-01.json'),o=read(q.oracle);
const events=Object.values(o.lanes).flatMap(l=>l.events);
function summarize(es){
 const balances={},r={count:0,debit:0,credit:0,qty:0};
 for(const e of es){r.qty+=e.stockQtyDelta;if(e.entries.length)r.count++;let dr=0,cr=0;for(const x of e.entries){assert.ok(Number.isInteger(x.debitCents)&&Number.isInteger(x.creditCents));assert.ok(x.debitCents>=0&&x.creditCents>=0);assert.ok(!(x.debitCents&&x.creditCents));dr+=x.debitCents;cr+=x.creditCents;balances[x.account]=(balances[x.account]??0)+x.debitCents-x.creditCents;}assert.equal(dr,cr,e.id+' unbalanced');r.debit+=dr;r.credit+=cr;}
 return {...r,balances,income:-(balances['4000']??0)-(balances['4100']??0)-(balances['5000']??0)-(balances['6800']??0)};
}
test('fixed substantial queue has valid references, dependency ordering and independent lanes',()=>{
 validate(q);assert.equal(q.cases.length,41);assert.equal(q.executionReady,true);const seen=new Set();for(const c of q.cases){for(const d of c.dependsOn)assert.ok(seen.has(d),c.id+' invalid dependency '+d);seen.add(c.id);}
 for(const a of ['D','P','S','M'])assert.deepEqual(q.cases.find(c=>c.id===`R01-${a}-CAP`).dependsOn,['R01-OPEN']);
 for(const e of events)assert.equal(q.cases.filter(c=>c.oracleEvent===e.id).length,1);
});
test('every independent lane reconciles its declared oracle; full sum uses integer cents',()=>{
 for(const lane of Object.values(o.lanes)){const s=summarize(lane.events),c=lane.closing;assert.equal(s.balances['1000']??0,c.cashDeltaCents);assert.equal(s.balances['5100']??0,c.inventoryDeltaCents);assert.equal(s.balances['1300']??0,c.ARDeltaCents);assert.equal(s.balances['2100']??0,0-c.APDeltaCents);assert.equal(s.qty,c.stockQtyDelta);assert.equal(s.income,c.netIncomeDeltaCents);assert.equal(s.count,c.journalCount);assert.equal(s.debit,c.journalDebitCents);}
 const s=summarize(events),a=o.allPass;assert.equal(s.count,19);assert.equal(s.debit,450000);assert.equal(s.credit,450000);assert.equal(s.balances['1000'],28000);assert.equal(s.balances['5100'],24000);assert.equal(s.income,52000);assert.equal(s.qty,4);assert.equal(events.filter(e=>e.stockQtyDelta).length,6);assert.equal(s.balances['1000']+s.balances['5100'],a.assetsDeltaCents);
});
test('missing or doubled effect cannot produce the all-pass target',()=>{
 const removed=summarize(events.filter(e=>e.id!=='R01-P-PAY'));assert.notEqual(removed.count,o.allPass.journalCount);assert.notEqual(removed.balances['2100'],0);
 const duplicate=summarize([...events,events.find(e=>e.id==='R01-D-RECEIPT')]);assert.notEqual(duplicate.balances['1300'],0);assert.notEqual(duplicate.debit,o.allPass.journalDebitCents);
});
test('preflight, no historical replay, no settings workaround, closing budget remain explicit',()=>{
 assert.equal(q.budget.totalMinutes-q.budget.closingReserveMinutes,q.budget.executionMinutes);assert.equal(q.budget.preflightCheckpointMinutes,20);assert.match(q.fixturePolicy,/NEW|new/);assert.match(q.fixturePolicy,/no new masters\/grants\/settings/);assert.ok(q.scopeExclusions.some(s=>s.includes('replay')));assert.equal(q.cases.at(-1).recovery,true);
 const fp={productSha:q.productSha,qaSha:'b'.repeat(40),liveStamp:'v2.5.22 · 211771e',rulesHash:'synthetic',libraryHash:'synthetic',schema:'synthetic',actor:'synthetic',configuration:'synthetic',fixture:'synthetic'};assert.equal(initialize(q,fp).cases.length,41);
 assert.throws(()=>initialize(q,{...fp,productSha:'a'.repeat(40)}));
});
test('print closure/denial failures do not gate valid settlement or independent lanes',()=>{
 const by=id=>q.cases.find(c=>c.id===id);assert.deepEqual(by('R01-D-RECEIPT').dependsOn,['R01-D-CREDIT']);assert.deepEqual(by('R01-P-RECEIPT2').dependsOn,['R01-P-SRETURN']);assert.deepEqual(by('R01-P-PAY').dependsOn,['R01-P-RECEIPT2']);for(const c of q.cases.filter(c=>c.businessSubmission))assert.equal(c.dependsOn.some(d=>d.endsWith('HISTORY')||d.includes('OVER')),false);
});
test('proof helper creates coherent files and all four actual refusal fixtures',async()=>{
 const base=path.join(fs.mkdtempSync(path.join(os.tmpdir(),'rapid-proof-helper-')),'proof');const requests=prepareDesktopProof(base,'https://bookone.clossyan.com/');let calls=0;
 const tab={url:async()=> 'https://bookone.clossyan.com/',title:async()=>{calls++;return 'BookOne';}};
 for(const r of requests){const out=await dispatchPersistedDesktopAction({...r,tab});assert.equal(out.executed,r.mode==='positive');assert.equal(out.uiCalls,r.mode==='positive'?1:0);}
 assert.equal(calls,1);assert.throws(()=>prepareDesktopProof(base,'https://bookone.clossyan.com/'));
});
