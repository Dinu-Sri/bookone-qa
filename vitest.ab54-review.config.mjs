import path from 'node:path';import{fileURLToPath}from 'node:url';const root=path.dirname(fileURLToPath(import.meta.url));
export default{root,resolve:{alias:{'@bookone/accounting':path.resolve(root,'work/product/packages/accounting/src/index.ts')}},test:{include:['tests/agentbridge/ab54-findings.test.ts'],pool:'forks',fileParallelism:false,reporters:['default','json'],outputFile:{json:'.local/ab54-review/acceptance.json'}}};

