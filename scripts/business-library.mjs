import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(base,p)=>JSON.parse(fs.readFileSync(path.join(base,p),'utf8'));
const text=x=>typeof x==='string'&&x.trim().length>0;
const kinds=new Set(['normal','boundary','partial','correction','invalid-state','invalid-input','permissions','concurrency','retry','history','failure']);
export function arithmetic(a){
  if(!Array.isArray(a.operands)||!a.operands.length||!a.operands.every(Number.isSafeInteger))throw Error('invalid independent arithmetic operands');
  let v;
  if(a.operation==='add')v=a.operands.reduce((n,x)=>n+x,0);
  else if(a.operation==='sub')v=a.operands.slice(1).reduce((n,x)=>n-x,a.operands[0]);
  else if(a.operation==='mul')v=a.operands.reduce((n,x)=>n*x,1);
  else throw Error('unknown independent arithmetic operation');
  if(!Number.isSafeInteger(v))throw Error('unsafe independent arithmetic result');
  return v;
}
export function validate(base=root){
  const errors=[];const must=(ok,msg)=>{if(!ok)errors.push(msg);};
  const library=read(base,'workflows/library.json');
  const graph=read(base,library.businessMap),controls=read(base,library.controls),worked=read(base,library.workedExamples);
  const books=library.books.map(p=>read(base,p));
  const rules=read(base,'rules/rulebook.json'),tasks=read(base,'batches/coverage.json').tasks;
  const profiles=new Set(read(base,'profiles/business-profiles.json').profiles.map(x=>x.id));
  const families=new Set(read(base,'workflows/catalog.json').specs.map(p=>read(base,p).id));
  const ruleIds=new Map(rules.rules.map(r=>[r.id,r.revision]));const taskIds=new Set(tasks.map(t=>t.id));
  must(library.schemaVersion===1&&/^1\.\d+\.\d+$/.test(library.libraryVersion),'unsupported library format/version');
  must(library.rulebookVersion===rules.rulebookVersion,'rulebook version drift');
  const ruleHash=createHash('sha256').update(fs.readFileSync(path.join(base,'rules/rulebook.json'))).digest('hex');
  must(library.rulebookSha256===ruleHash,'rulebook content drift: impact review required');
  must(graph.productSha===library.productStudySha&&graph.productVersion===library.productStudyVersion,'source fingerprint drift');
  const sources=new Set(graph.sources.map(s=>s.path));const nodeIds=new Set(graph.nodes.map(n=>n.id));
  const controlIds=new Set(controls.controls.map(c=>c.id));
  must(nodeIds.size===graph.nodes.length,'duplicate graph entity');
  must(controlIds.size===controls.controls.length,'duplicate control');
  for(const s of graph.sources){must(/^[a-f0-9]{40}$/.test(s.gitBlobSha)&&/^[a-f0-9]{64}$/.test(s.normalizedSha256),'invalid source hash '+s.path);must(s.url===`https://github.com/${graph.productRepository}/blob/${graph.productSha}/${s.path}`,'unpinned source URL '+s.path);}
  for(const n of graph.nodes)must(n.kind==='schema-entity'&&sources.has(n.sourcePath),'unresolved entity source '+n.id);
  for(const e of graph.edges){must(nodeIds.has(e.from)&&nodeIds.has(e.to)&&sources.has(e.sourcePath),'dangling graph edge');must(graph.nodes.find(n=>n.id===e.from)?.fields.includes(e.field),'missing relationship field '+e.from+'.'+e.field);}
  for(const p of graph.processes)must(p.entityRefs.length>0&&p.entityRefs.every(x=>nodeIds.has(x)),'unknown process entity '+p.id);
  for(const a of graph.actions)must(sources.has(a.sourcePath)&&text(a.symbol),'unknown action source');
  const bookIds=new Set(),journeyIds=new Set(),caseIds=new Set(),mappedTasks=new Set();
  for(const [i,b] of books.entries()){
    must(/^WB-[A-Z]+$/.test(b.id)&&!bookIds.has(b.id),'duplicate/invalid book ID '+b.id);bookIds.add(b.id);
    must(library.books[i]===`workflows/casebooks/${b.id}.json`,'book path mismatch '+b.id);
    must(b.schemaVersion===1&&Number.isSafeInteger(b.revision)&&b.revision>0,'book revision invalid '+b.id);
    must(b.productStudySha===library.productStudySha&&b.rulebookVersion===library.rulebookVersion,'book source/rule fingerprint drift '+b.id);
    must(b.execution==='not-run'&&b.acceptance==='not-assessed','book cannot claim executed acceptance '+b.id);
    must(b.profileIds.length>0&&b.profileIds.every(p=>profiles.has(p)),'unknown profile '+b.id);
    must(b.familyRefs.every(f=>families.has(f)),'unknown family '+b.id);
    for(const j of b.journeys){
      must(new RegExp('^'+b.id+'\\.J\\d{2}$').test(j.id)&&!journeyIds.has(j.id),'duplicate/invalid journey '+j.id);journeyIds.add(j.id);
      must(j.status==='draft'&&Number.isSafeInteger(j.revision)&&j.revision>0,'unreviewed format only; review extension required '+j.id);
      must(j.acceptance==='not-assessed'&&j.review.qaReviewer===null&&j.review.businessOwner===null&&j.review.record===null,'invented review/acceptance '+j.id);
      must(text(j.fixture)&&text(j.title)&&['P0','P1','P2','P3'].includes(j.risk),'incomplete journey '+j.id);
      must(j.ruleRefs.length>0&&j.ruleRefs.every(r=>ruleIds.get(r.id)===r.revision),'stale/unknown rule '+j.id);
      must(j.legacyTaskRefs.length>0&&j.legacyTaskRefs.every(t=>taskIds.has(t)),'unknown legacy task '+j.id);
      j.legacyTaskRefs.forEach(t=>mappedTasks.add(t));
      must(j.entityRefs.length>0&&j.entityRefs.every(x=>nodeIds.has(x)),'unknown entity '+j.id);
      must(j.sourcePaths.length>0&&j.sourcePaths.every(p=>sources.has(p)),'unknown source '+j.id);
      must(new Set(j.controlRefs).size===j.controlRefs.length&&['CTL-ACTOR','CTL-TENANT','CTL-ROLE','CTL-LOCK','CTL-RETRY','CTL-RACE','CTL-FAULT','CTL-HISTORY','CTL-REPORT','CTL-UI'].every(c=>j.controlRefs.includes(c))&&j.controlRefs.every(c=>controlIds.has(c)),'missing/unknown controls '+j.id);
      must(Array.isArray(j.policyGaps)&&text(j.supportDisposition),'missing support disposition '+j.id);
      must(j.cases.length>=5,'incomplete journey cases '+j.id);
      for(const c of j.cases){
        must(new RegExp('^'+j.id.replaceAll('.','\\.')+'\\.C\\d{2}$').test(c.id)&&!caseIds.has(c.id),'duplicate/invalid case '+c.id);caseIds.add(c.id);
        must(['title','given','action','expected'].every(k=>text(c[k]))&&kinds.has(c.kind),'missing case contract '+c.id);
        must(c.execution==='not-run'&&c.binding===null,'unvalidated execution/binding claim '+c.id);
        for(const a of c.oracle){try{must(text(a.label)&&arithmetic(a)===a.equals&&Number.isSafeInteger(a.equals),'independent arithmetic mismatch '+c.id);}catch(e){errors.push(c.id+': '+e.message);}}
      }
    }
  }
  for(const t of taskIds)must(mappedTasks.has(t),'unmapped retained lifecycle task '+t);
  const exampleIds=new Set();
  for(const e of worked.examples){
    must(!exampleIds.has(e.id)&&text(e.policy),'duplicate/missing worked example '+e.id);exampleIds.add(e.id);
    must(e.caseRefs.length>0&&e.caseRefs.every(x=>caseIds.has(x)),'dangling worked example case '+e.id);
    must(e.execution==='not-run'&&e.review==='pending'&&e.acceptance==='not-assessed','invented worked example acceptance '+e.id);
    const balances={...e.openingSignedLedgerCents};must(Object.values(balances).every(Number.isSafeInteger)&&Object.values(balances).reduce((n,x)=>n+x,0)===0,'opening ledger unbalanced '+e.id);
    for(const [i,st] of e.steps.entries()){
      let delta=0;for(const l of st.journalLines){must(text(l.account)&&['debit','credit'].includes(l.side)&&Number.isSafeInteger(l.cents)&&l.cents>0,'invalid journal '+e.id);const x=l.side==='debit'?l.cents:-l.cents;delta+=x;balances[l.account]=(balances[l.account]??0)+x;}
      must(delta===0&&Number.isSafeInteger(delta),'journal imbalance '+e.id+' step'+i);
      must(Object.values(balances).every(Number.isSafeInteger)&&Object.values(balances).reduce((n,x)=>n+x,0)===0,'running ledger imbalance '+e.id);
      for(const [account,v] of Object.entries(st.assertBalances))must(Number.isSafeInteger(v)&&(balances[account]??0)===v,'closing ledger mismatch '+e.id+' step'+i+' '+account);
      const m=st.assertBusinessState;
      if('profitCents' in m)must(m.profitCents===-(balances.revenue??0)-(balances.COGS??0)-(balances.expense??0)-(balances.inventoryLoss??0)-(balances.bankFees??0),'profit mismatch '+e.id+' step'+i);
      if('assetsCents' in m)must(m.assetsCents===(balances.bank??0)+(balances.AR??0)+(balances.inventory??0)+(balances.fleetAsset??0),'assets mismatch '+e.id+' step'+i);
    }
  }
  return{errors,library,graph,controls,worked,books,tasks};
}
const bullets=xs=>xs.map(x=>'- '+x).join('\n');
function bookView(b,data){
  return `# ${b.id} — ${b.title}\n\nGenerated from workflows/casebooks/${b.id}.json. Edit JSON and run pnpm library:render. Revision ${b.revision}; **draft, independent review pending; no new execution or acceptance**.\n\n`+
    `Product source study: ${b.productStudyVersion} / ${b.productStudySha}. Profiles ${b.profileIds.join(', ')}. [How to execute](../EXECUTION_GUIDE.md); [shared controls](../CONTROLS.md); [worked examples](../WORKED_EXAMPLES.md); [business map](../BUSINESS_MAP.md).\n\n`+
    b.journeys.map(j=>`## ${j.id} — ${j.title}\n\n**Fixture:** ${j.fixture}\n\nRules: ${j.ruleRefs.map(r=>r.id+'@'+r.revision).join(', ')}. Retained tasks: ${j.legacyTaskRefs.join(', ')}.\n\nEntities: ${j.entityRefs.join(', ')}. Support: ${j.supportDisposition}.\n\nApplicable shared controls must be resolved before execution: ${j.controlRefs.join(', ')}. Add FILE/TAX/UPGRADE/BOUNDARY where relevant; no count multiplication.\n\n`+
    (j.policyGaps.length?'**Policy/capability gaps:** '+j.policyGaps.join(' ')+'\n\n':'')+
    j.cases.map(c=>`### ${c.id} — ${c.title}\n\n- Type: ${c.kind}; execution: **not run**; adapter: **unbound**.\n- Given: ${c.given}\n- Action: ${c.action}\n- Expected: ${c.expected}\n`+(c.oracle.length?'- Independent numeric checks: '+c.oracle.map(a=>`${a.label}: ${a.operation}(${a.operands.join(', ')}) = ${a.equals}`).join('; ')+'.\n':'')).join('\n')+
    '\n**Unchanged controls and evidence:** Assert unaffected products/parties, other tenants/domains/scopes, prior documents and original journals remain unchanged. Bind exact actor, baseline and relevant state fields using EXECUTION_GUIDE; do not claim a generic unchanged sentence executed. Verify persisted readback, report/subledger/stock/fleet effects, source lineage and attributable audit at each applicable transition.\n\n**Source observations, not expected-result authority:**\n\n'+bullets(j.sourcePaths.map(p=>`[${p}](https://github.com/${data.graph.productRepository}/blob/${data.library.productStudySha}/${p})`))).join('\n\n')+'\n';
}
export function views(data){
  const out=new Map();
  for(const b of data.books)out.set(`docs/workflows/books/${b.id}.md`,bookView(b,data));
  out.set('docs/workflows/CONTROLS.md','# Shared control contracts\n\nGenerated from workflows/control-contracts.json. These are reusable obligations, not executed cases or Cartesian-product coverage. Resolve applicability per journey and bind exact inputs before execution. Each case remains independently traceable.\n\n'+data.controls.controls.map(c=>`## ${c.id} — ${c.title}\n\n${c.expected}\n\nSpecification draft; execution not run.`).join('\n\n')+'\n');
  out.set('docs/workflows/WORKED_EXAMPLES.md','# Independent worked financial examples\n\nGenerated from workflows/worked-examples.json. Signed balances use debit positive/credit negative; journal amounts are integer LKR cents. Each example is an independent synthetic oracle, not an executed product test or expert approval. Account purposes must bind to the approved actual CoA.\n\n'+data.worked.examples.map(e=>`## ${e.id} — ${e.title}\n\nCases: ${e.caseRefs.join(', ')}.\n\nAssumptions: ${e.policy}\n\nOpening signed ledger cents: ${JSON.stringify(e.openingSignedLedgerCents)}.\n\n`+e.steps.map((s,i)=>`### Step ${i+1}: ${s.action}\n\n| Account purpose | Debit cents | Credit cents |\n|---|---:|---:|\n`+(s.journalLines.length?s.journalLines.map(l=>`| ${l.account} | ${l.side==='debit'?l.cents:0} | ${l.side==='credit'?l.cents:0} |`).join('\n'):'| No GL posting | 0 | 0 |')+`\n\nExpected signed ledger: ${JSON.stringify(s.assertBalances)}.\n\nExpected business state: ${JSON.stringify(s.assertBusinessState)}.\n`).join('\n')).join('\n\n')+'\n');
  out.set('docs/workflows/LIFECYCLE_MAP.md','# Retained lifecycle-to-workbook map\n\nGenerated from existing batches/coverage.json task identities and workbook references. A mapping is not a binding, pass or acceptance; existing task execution history remains in its original register. All retained lifecycle tasks appear below. Existing S-0761–0805 archive scenarios remain separate and actual encrypted backup/restore LAST.\n\n| Existing task | Existing goal | Workbook journeys |\n|---|---|---|\n'+data.tasks.map(t=>`| ${t.id} | ${t.slug} | ${data.books.flatMap(b=>b.journeys.filter(j=>j.legacyTaskRefs.includes(t.id)).map(j=>`[${j.id}](books/${b.id}.md)`)).join(', ')} |`).join('\n')+'\n');
  const g=data.graph;
  out.set('docs/workflows/ENTITY_INDEX.md','# Entity and declared relationship index\n\nGenerated from workflows/business-map.json. Static declarations only; not a complete runtime call graph, ownership proof or capability certification.\n\n| Entity symbol | SQL table | Declared fields | Source |\n|---|---|---|---|\n'+g.nodes.map(n=>`| ${n.id} | ${n.label} | ${n.fields.join(', ')} | [source](https://github.com/${g.productRepository}/blob/${g.productSha}/${n.sourcePath}) |`).join('\n')+'\n\n## Declared references\n\n| From | Field | To |\n|---|---|---|\n'+g.edges.map(e=>`| ${e.from} | ${e.field} | ${e.to}.${e.targetField} |`).join('\n')+'\n');
  return out;
}
export function impact(data,tokens=[]){
  const all=data.books.flatMap(b=>b.journeys.map(j=>({...j,bookId:b.id})));const selected=new Set();let broadened=tokens.length===0;
  for(const token of tokens){const matches=all.filter(j=>j.id===token||j.bookId===token||j.ruleRefs.some(r=>r.id===token)||j.entityRefs.includes(token)||j.sourcePaths.includes(token)||j.entityRefs.some(e=>data.graph.nodes.find(n=>n.id===e)?.sourcePath===token));if(!matches.length)broadened=true;for(const j of matches)selected.add(j.id);}
  if(broadened)all.forEach(j=>selected.add(j.id));
  const reasons=['Human actual-diff review and existing mandatory shared core remain required; this is specification selection, not test execution.'];
  if(all.some(j=>selected.has(j.id)&&['WB-PHY','WB-SVC','WB-DIG','WB-REN'].includes(j.bookId))){all.filter(j=>j.bookId==='WB-HYB').forEach(j=>selected.add(j.id));reasons.push('Hybrid compositions expanded for affected constituent business.');}
  all.filter(j=>j.bookId==='WB-CORE').forEach(j=>selected.add(j.id));
  if(tokens.some(t=>t.startsWith('packages/db/'))){all.filter(j=>j.bookId==='WB-OPS').forEach(j=>selected.add(j.id));reasons.push('Schema source change requires operations/upgrade review.');}
  return{tokens,broadened,journeyIds:[...selected].sort(),reasons,acceptance:'not-established'};
}
export function run(mode,base=root,tokens=process.argv.slice(3)){
  const d=validate(base);if(d.errors.length)throw Error(d.errors.join('\n'));
  if(mode==='plan')return impact(d,tokens);
  if(!['check','render'].includes(mode))throw Error('usage: node scripts/business-library.mjs check|render|plan [rule/entity/source/book/journey ...]');
  for(const [p,content] of views(d)){const file=path.join(base,p);if(mode==='render'){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);}else if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==content)throw Error('stale generated workbook '+p);}
  return{books:d.books.length,journeys:d.books.reduce((n,b)=>n+b.journeys.length,0),cases:d.books.flatMap(b=>b.journeys).reduce((n,j)=>n+j.cases.length,0),workedExamples:d.worked.examples.length,journalSteps:d.worked.examples.reduce((n,e)=>n+e.steps.length,0),retainedTasks:d.tasks.length,entities:d.graph.nodes.length,declaredRelationships:d.graph.edges.length,businessAcceptance:'not-assessed',scope:'specification/traceability/independent-arithmetic validation only'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{console.log(JSON.stringify(run(process.argv[2])));}catch(e){console.error(e.message);process.exitCode=1;}}
