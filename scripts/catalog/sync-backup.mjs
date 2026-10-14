import { readFileSync, writeFileSync } from 'node:fs';
const plan=JSON.parse(readFileSync('catalog/backup-assertions.json','utf8'));
const path='docs/E2E_SCENARIO_CATALOG.md';
const start='<!-- tenant-archive-catalog:start -->',end='<!-- tenant-archive-catalog:end -->';
const block=start+'\n\n## 32. Tenant archive and form overlay\n\n'+plan.cases.map(c=>
  `### ${c.id} — ${c.title}\n\n- **Priority:** ${c.priority}\n- **Tags:** \`@tenant-archive\` \`@${c.phase}\`\n- **Execution policy:** dedicated-backup\n\n`+c.assertions.map((a,i)=>`  ${i+1}. ${a}`).join('\n')+'\n'
).join('\n')+'\n'+end;
const current=readFileSync(path,'utf8');
const a=current.indexOf(start),b=current.indexOf(end);
if((a<0)!==(b<0)||b>=0&&b<a)throw new Error('Incomplete dedicated catalog markers');
writeFileSync(path,a<0?current+'\n\n'+block+'\n':current.slice(0,a)+block+current.slice(b+end.length));
console.log(`Dedicated backup catalog: ${plan.cases.length} cases; existing IDs preserved`);
