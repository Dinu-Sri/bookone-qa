import { readFileSync, writeFileSync, existsSync } from 'node:fs';
// Only explicit numeric diagnostics leave CI. Never include errors/SQL/URLs/records.
export function observe(id:string,values:Record<string,number>) {
  const path=process.env.QA_RUNTIME_OBSERVATIONS;
  if(!path)throw new Error('Runtime observation sink missing');
  const previous=existsSync(path)?JSON.parse(readFileSync(path,'utf8')):{};
  previous[id]=values;writeFileSync(path,JSON.stringify(previous));
}
