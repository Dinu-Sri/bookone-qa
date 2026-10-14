import * as XLSX from 'xlsx';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
export const bankFixtureVersion='synthetic-bank-v1';
const digest=b=>createHash('sha256').update(b).digest('hex');
const money=cents=>(cents/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const date=i=>`2026-10-${String(i%28+1).padStart(2,'0')}`;
function workbook(rows,bookType){
 const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(rows),'Statement');
 wb.Props={Title:'Synthetic BookOne QA statement',Subject:'Fabricated test rows; not a bank-issued statement',Author:'BookOne QA',CreatedDate:new Date('2000-01-01T00:00:00Z'),ModifiedDate:new Date('2000-01-01T00:00:00Z')};
 return XLSX.write(wb,{type:'buffer',bookType});
}
export function prepareBankFixtures(){
 const dir=resolve('.local/synthetic-bank-fixtures');mkdirSync(dir,{recursive:true});
 const sampath=[['Date','Description','Reference','Amount','DR/CR','Balance']],hnb=[['Date','Description','Reference','Debit','Credit','Balance']];
 let sb=100_000_000,hb=100_000_000,ssum=0,hsum=0;
 for(let i=0;i<24;i++){
  const cents=i===0?500000:i===1?-2500:i%2===0?10025:-4075;ssum+=cents;sb+=cents;
  const description=i===0?'CEFT - credit card bill [SYNTHETIC]':i===1?'SVR-SYNTHETIC-001':`SYNTHETIC Sampath-style row ${i}`;
  sampath.push([date(i),description,`SYN-S-${String(i).padStart(3,'0')}`,money(Math.abs(cents)),cents<0?'D':'C',money(sb)]);
 }
 for(let i=0;i<64;i++){
  const cents=i===0?-4203000:i===1?700000:i%2===0?-5050:10000;hsum+=cents;hb+=cents;
  const description=i===0?'ATMCASHWDL [SYNTHETIC]':i===1?'Synthetic funeral test credit':`SYNTHETIC HNB-style row ${i}`;
  hnb.push([date(i),description,`SYN-H-${String(i).padStart(3,'0')}`,cents<0?money(-cents):'',cents>0?money(cents):'',money(hb)]);
 }
 const paths={sampath:resolve(dir,'sampath-synthetic.xlsx'),hnb:resolve(dir,'hnb-synthetic.xls')};
 writeFileSync(paths.sampath,workbook(sampath,'xlsx'));writeFileSync(paths.hnb,workbook(hnb,'biff8'));
 const manifest={version:bankFixtureVersion,synthetic:true,notBankFormatCertification:true,sampath:{rows:24,openingCents:100_000_000,netCents:ssum,closingCents:sb,sha256:digest(readFileSync(paths.sampath))},hnb:{rows:64,openingCents:100_000_000,netCents:hsum,closingCents:hb,sha256:digest(readFileSync(paths.hnb))}};
 writeFileSync(resolve(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 return {paths,manifest,hash:bankFixtureHash(paths)};
}
export function bankFixtureHash(paths){return digest(Buffer.concat([Buffer.from(bankFixtureVersion+'\0'),readFileSync(paths.sampath),Buffer.from('\0'),readFileSync(paths.hnb)]));}
export function fixtureEnvironment(paths){return{QA_FIXTURE_SAMPATH:paths.sampath,QA_FIXTURE_HNB:paths.hnb};}
