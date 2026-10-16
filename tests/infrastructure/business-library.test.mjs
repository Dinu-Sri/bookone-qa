import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {validate,run,impact,arithmetic} from '../../scripts/business-library.mjs';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
function fixture(t){const d=fs.mkdtempSync(path.join(os.tmpdir(),'bookone-library-'));t.after(()=>fs.rmSync(d,{recursive:true,force:true}));for(const p of ['workflows','rules','batches','profiles'])fs.cpSync(path.join(source,p),path.join(d,p),{recursive:true});return d;}
function change(d,p,fn){const file=path.join(d,p);const x=JSON.parse(fs.readFileSync(file,'utf8'));fn(x);fs.writeFileSync(file,JSON.stringify(x));}
const book='workflows/casebooks/WB-PHY.json';
const error=d=>validate(d).errors.join('\n');
test('all source-linked draft books and independent expected ledgers validate',()=>assert.deepEqual(validate().errors,[]));
test('stale rule revision fails',t=>{const d=fixture(t);change(d,book,b=>b.journeys[0].ruleRefs[0].revision++);assert.match(error(d),/stale\/unknown rule/);});
test('same-version rulebook content drift fails',t=>{const d=fixture(t);change(d,'rules/rulebook.json',r=>r.rules[0].expectation+=' changed');assert.match(error(d),/rulebook content drift/);});
test('case without expected outcome fails',t=>{const d=fixture(t);change(d,book,b=>b.journeys[0].cases[0].expected='');assert.match(error(d),/missing case contract/);});
test('invented binding or pass fails',t=>{const d=fixture(t);change(d,book,b=>{b.journeys[0].cases[0].binding='fake';b.journeys[0].cases[0].execution='passed';});assert.match(error(d),/unvalidated execution\/binding/);});
test('invented reviewer and acceptance fail',t=>{const d=fixture(t);change(d,book,b=>{b.journeys[0].review.qaReviewer=b.author;b.journeys[0].acceptance='accepted';});assert.match(error(d),/invented review\/acceptance/);});
test('unknown graph entity or source fails',t=>{const d=fixture(t);change(d,book,b=>{b.journeys[0].entityRefs.push('phantom');b.journeys[0].sourcePaths.push('missing.ts');});assert.match(error(d),/unknown entity/);assert.match(error(d),/unknown source/);});
test('graph dangling edges and unpinned sources fail',t=>{const d=fixture(t);change(d,'workflows/business-map.json',g=>{g.edges[0].to='phantom';g.sources[0].url=g.sources[0].url.replace(g.productSha,'master');});assert.match(error(d),/dangling graph edge/);assert.match(error(d),/unpinned source URL/);});
test('retained task cannot silently disappear from mapping',t=>{const d=fixture(t);for(const p of fs.readdirSync(path.join(d,'workflows/casebooks')))change(d,'workflows/casebooks/'+p,b=>b.journeys.forEach(j=>j.legacyTaskRefs=j.legacyTaskRefs.filter(x=>x!=='C-101')));assert.match(error(d),/unmapped retained lifecycle task C-101/);});
test('balanced but wrong closing ledger fails',t=>{const d=fixture(t);change(d,'workflows/worked-examples.json',w=>w.examples[0].steps[0].assertBalances.inventory++);assert.match(error(d),/closing ledger mismatch/);});
test('journal cent mutation fails without weakening expected ledger',t=>{const d=fixture(t);change(d,'workflows/worked-examples.json',w=>w.examples[0].steps[0].journalLines[0].cents++);assert.match(error(d),/journal imbalance/);});
test('wrong profit and invented case links fail',t=>{const d=fixture(t);change(d,'workflows/worked-examples.json',w=>{w.examples[0].steps[1].assertBusinessState.profitCents++;w.examples[0].caseRefs.push('missing');});assert.match(error(d),/profit mismatch/);assert.match(error(d),/dangling worked example/);});
test('independent numeric oracle mismatch fails',t=>{const d=fixture(t);change(d,book,b=>b.journeys[0].cases[0].oracle[0].equals++);assert.match(error(d),/independent arithmetic mismatch/);assert.throws(()=>arithmetic({operation:'div',operands:[1,2]}),/unknown/);});
test('stale generated view fails check',t=>{const d=fixture(t);run('render',d);fs.appendFileSync(path.join(d,'docs/workflows/books/WB-PHY.md'),'stale');assert.throws(()=>run('check',d),/stale generated workbook/);});
test('impact selection includes hybrid composition and mandatory shared core',()=>{const p=impact(validate(),['BR-PUR-01']);assert.ok(p.journeyIds.includes('WB-PHY.J03'));assert.ok(p.journeyIds.includes('WB-HYB.J01'));assert.ok(p.journeyIds.includes('WB-CORE.J01'));assert.equal(p.broadened,false);});
test('unknown and empty impact broaden; schema source adds upgrade review',()=>{const d=validate();assert.equal(impact(d,['unmapped-new-feature']).journeyIds.length,52);assert.equal(impact(d,[]).journeyIds.length,52);assert.ok(impact(d,['packages/db/src/schema/inventory.ts']).journeyIds.includes('WB-OPS.J03'));});
