import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,openSync,closeSync,copyFileSync} from 'node:fs';
import {resolve,join} from 'node:path';import {spawn,spawnSync,execFileSync} from 'node:child_process';
import {createHash,randomBytes,randomUUID} from 'node:crypto';import https from 'node:https';import http from 'node:http';import {createRequire} from 'node:module';
import postgres from 'postgres';import {httpTarget,httpDatabase,localPath,CookieJar} from './target.mjs';
const ROOT=process.cwd(),BASE='https://127.0.0.1:3443/',WEB=resolve('work/product/apps/web');
const manifest=JSON.parse(readFileSync('batches/http-runtime.json','utf8'));
const runId='HTTP-'+new Date().toISOString().replace(/[:.]/g,'-')+'-'+randomBytes(3).toString('hex');
const dir=join('.local/http',runId);mkdirSync(dir,{recursive:true});
const summary={schemaVersion:1,kind:'real-Next-HTTPS-runtime',runId,fixtureVersion:manifest.fixtureVersion,fingerprint:{},setup:{status:'pending',stage:'target-guard'},results:[],productAcceptance:'not-established',missing:['deployed-Chrome/hydration/overlay','real-proxy-deployment','object-storage-and-uploads','complete-business-workflows','full-upgrade/recovery','expert-policy-review']};
let next=null,proxy=null,sql=null,ca=null,stage='target-guard';
const digest=x=>createHash('sha256').update(x).digest('hex');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
class Incomplete extends Error {constructor(code){super(code);this.code=code;}}
function privateError(name,e){writeFileSync(join(dir,name+'.error.log'),String(e?.stack??e));}
async function child(args,cwd,env,label,timeout=600_000){
 const fd=openSync(join(dir,label+'.log'),'w');const p=spawn(process.execPath,args,{cwd,env,stdio:['ignore',fd,fd]});let timer;
 try{return await new Promise((ok,bad)=>{timer=setTimeout(()=>{p.kill('SIGKILL');bad(new Incomplete('child-timeout'));},timeout);p.once('error',bad);p.once('exit',code=>ok(code));});}finally{clearTimeout(timer);closeSync(fd);}
}
async function stopNext(){if(!next)return;const p=next;if(p.exitCode!==null||p.signalCode!==null){next=null;return;}await new Promise((ok,bad)=>{const kill=setTimeout(()=>p.kill('SIGKILL'),5000),limit=setTimeout(()=>bad(new Incomplete('server-stop-unconfirmed')),10000);p.once('exit',()=>{clearTimeout(kill);clearTimeout(limit);ok();});p.kill('SIGTERM');});next=null;}
function request(path,actor={},options={}){
 const url=localPath(BASE,path);httpTarget(BASE,process.env.QA_HTTP_ISOLATION);
 const jar=actor.jar;const headers={...(options.headers??{})};const cookie=options.cookie??jar?.header(url.href);if(cookie)headers.Cookie=cookie;
 if(options.body)headers['Content-Length']=Buffer.byteLength(options.body);
 return new Promise((ok,bad)=>{
  const req=https.request(url,{method:options.method??'GET',headers,ca,rejectUnauthorized:true,localAddress:actor.ip??'127.0.0.20',timeout:25000},res=>{
   const chunks=[];let length=0;res.on('data',c=>{length+=c.length;if(length>10_000_000){req.destroy(new Incomplete('response-size'));return;}chunks.push(c);});
   res.on('end',()=>{try{jar?.receive(res.headers['set-cookie'],url.href);ok({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString('utf8')});}catch(e){bad(e);}});res.on('error',bad);
  });req.once('timeout',()=>req.destroy(new Incomplete('request-timeout')));req.on('error',bad);if(options.body)req.write(options.body);req.end();
 });
}
async function postJSON(path,actor,data){return request(path,actor,{method:'POST',headers:{Origin:BASE.slice(0,-1),'Content-Type':'application/json'},body:JSON.stringify(data)});}
function denied(r){return [401,403,404].includes(r.status)||[302,303,307,308].includes(r.status)&&r.headers.location&&['/','/login','/onboarding'].includes(localPath(BASE,r.headers.location).pathname);}
function json(r){try{return JSON.parse(r.body);}catch{return null;}}
function loadedJob(body){return body.match(/<p\b[^>]*class="[^"]*sidebar-user-job[^"]*"[^>]*>([^<]*)<\/p>/i)?.[1]?.trim().toLowerCase();}
function formFields(html,needle){
 const forms=[...html.matchAll(/<form\b[^>]*>([\s\S]*?)<\/form>/g)].map(m=>m[1]);const form=forms.find(f=>f.includes('name="'+needle+'"'));if(!form)throw new Incomplete('rendered-form-unavailable');
 const fields=[];for(const m of form.matchAll(/<input\b[^>]*>/g)){const tag=m[0],name=tag.match(/\bname="([^"]+)"/)?.[1],value=tag.match(/\bvalue="([^"]*)"/)?.[1]??'';if(name?.startsWith('$ACTION_'))fields.push([name,value.replaceAll('&quot;','"').replaceAll('&amp;','&')]);}
 if(!fields.length)throw new Incomplete('server-form-action-unavailable');return fields;
}
async function postForm(path,actor,fields){const form=new FormData();for(const [k,v] of fields)form.append(k,v);const encoded=new Request(BASE,{method:'POST',body:form});return request(path,actor,{method:'POST',headers:{Origin:BASE.slice(0,-1),'Content-Type':encoded.headers.get('content-type')},body:Buffer.from(await encoded.arrayBuffer())});}
const businessTables=['company_profiles','business_documents','business_document_lines','transactions','journal_entries','journal_lines','settlement_allocations','inventory_movements','audit_log'];
async function snapshot(){const out={};for(const t of businessTables)out[t]=await sql.unsafe('select * from '+t+' order by id');return JSON.stringify(out);}
async function doc(id){const [d]=await sql`select paid_amount::text as paid,balance_due::text as due,total::text as total from business_documents where id=${id}`;return d;}
async function membership(id,tenant){const [r]=await sql`select m.role,r.slug as job from tenant_memberships m left join tenant_roles r on r.id=m.primary_role_id where m.user_id=${id} and m.tenant_id=${tenant} and m.voided_at is null`;return r;}
async function requireLogin(actor){if(!actor.verified)throw new Incomplete('credential-identity-prerequisite');}
async function actionHandle(actor){
 const page=await request('/sales/payments/new',actor);if(page.status!==200)throw new Incomplete('financial-page-unavailable');
 const scripts=[...page.body.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1]).filter(p=>p.startsWith('/_next/static/')).slice(0,30);const ids=new Set();
 for(const path of scripts){const r=await request(path,actor);if(r.status!==200)continue;for(const m of r.body.matchAll(/\(\s*["']([a-f0-9]{40,64})["']\s*,[^;\n]{0,600}?["']receiveCustomerPayments["']\s*\)/g))ids.add(m[1]);}
 if(ids.size!==1)throw new Incomplete('financial-action-reference-unavailable');
 const req=createRequire(join(WEB,'package.json'));let codec;
 try{codec=req('next/dist/compiled/react-server-dom-webpack/client.node').encodeReply;}catch{throw new Incomplete('pinned-action-codec-unavailable');}
 if(typeof codec!=='function')throw new Incomplete('pinned-action-codec-unavailable');return {id:[...ids][0],codec};
}
async function financial(actor,handle,payload){const encoded=await handle.codec([payload]);let body,contentType;
 if(typeof encoded==='string'){body=Buffer.from(encoded);contentType='text/plain;charset=UTF-8';}else{const req=new Request(BASE,{method:'POST',body:encoded});body=Buffer.from(await req.arrayBuffer());contentType=req.headers.get('content-type');}
 return request('/sales/payments/new',actor,{method:'POST',headers:{Origin:BASE.slice(0,-1),'Next-Action':handle.id,Accept:'text/x-component','Content-Type':contentType},body});
}
async function laneCases(lane,f){
 const actors={};let i=2;for(const [name,a] of Object.entries(f.actors))actors[name]={...a,ip:'127.0.0.'+i++,jar:new CookieJar(),verified:false,ownRead:false};
 const rows=[],offset=lane.credential==='runtime'?100:0;let handle=null,financialVerified=false;
 async function test(n,fn){const row={id:'HTTP-'+String(n+offset).padStart(3,'0'),status:'not-run',failedAssertions:[],observations:{},missing:[]};
  const check=(yes,key)=>{if(!yes)row.failedAssertions.push(key);};const obs=(key,n)=>{assert.ok(Number.isSafeInteger(n));row.observations[key]=n;};
  try{await fn(check,obs,row);row.status=row.failedAssertions.length?'failed':row.missing.length?'blocked':'passed';}
  catch(e){privateError(lane.name+'-'+row.id,e);if(e instanceof Incomplete)row.missing.push(e.code);else row.missing.push('unclassified-runner-error');row.status=row.failedAssertions.length?'failed':'blocked';}
  row.evidenceComplete=row.missing.length===0;rows.push(row);console.log(JSON.stringify({lane:lane.name,id:row.id,status:row.status}));
 }
 await test(1,async(c,o)=>{
  const anon=await request('/sales/invoices/'+f.own.id);c(denied(anon),'anonymous-protected-route-denied');c(!anon.body.includes(f.own.marker),'anonymous-no-invoice-data');
  const bad=await postJSON('/api/auth/sign-in/email',{jar:new CookieJar(),ip:'127.0.0.21'},{email:f.actors.owner.email,password:'intentionally-wrong-password'});c([400,401,403].includes(bad.status),'wrong-password-denied');
  for(const a of Object.values(actors)){const r=await postJSON('/api/auth/sign-in/email',a,{email:a.email,password:a.password,rememberMe:false});const identity=await request('/api/auth/get-session',a);a.verified=r.status===200&&json(identity)?.user?.email===a.email;c(a.verified,'credential-identity-matches');const attrs=a.jar.sessionAttributes();c(attrs.length>0&&attrs.every(x=>x.secure&&x.httpOnly&&['lax','strict'].includes(x.sameSite)),'secure-httponly-session-cookie');}
  o('verifiedActors',Object.values(actors).filter(a=>a.verified).length);o('expectedActors',6);o('anonymousStatus',anon.status);o('wrongPasswordStatus',bad.status);
 });
 await test(2,async(c,o)=>{
  for(const [key,d,role] of [['owner',f.own,'owner'],['viewer',f.own,'viewer'],['foreign',f.foreign,'owner']]){const a=actors[key];await requireLogin(a);const r=await request('/sales/invoices/'+d.id,a);a.ownRead=r.status===200&&r.body.includes(d.marker)&&loadedJob(r.body)===role;c(a.ownRead,'authenticated-own-invoice-and-role');c(!r.body.includes(d===f.own?f.foreign.marker:f.own.marker),'own-page-no-other-tenant-lines');o(key+'Status',r.status);}
  const m=await membership(actors.viewer.id,f.tenantA);c(m.role==='viewer'&&m.job==='viewer','normal-viewer-membership-not-elevated');
 });
 await test(3,async(c,o)=>{if(!actors.owner.ownRead||!actors.foreign.ownRead)throw new Incomplete('own-record-positive-prerequisite');const before=await snapshot();const r=await request('/sales/invoices/'+f.foreign.id,actors.owner);c(denied(r),'existing-foreign-invoice-denied');c(!r.body.includes(f.foreign.marker)&&!r.body.includes(f.foreign.customer),'foreign-data-not-in-html-or-rsc');c(await snapshot()===before,'foreign-read-no-business-effects');o('foreignStatus',r.status);});
 await test(4,async(c,o)=>{
  if(!actors.owner.ownRead||!actors.viewer.ownRead)throw new Incomplete('known-role-positive-prerequisite');
  const page=await request('/company/details',actors.owner);c(page.status===200,'owner-profile-page-loaded');const fields=formFields(page.body,'legalName');
  const before=await snapshot();const denyName='HTTP forbidden Viewer profile';await postForm('/company/details',actors.viewer,[...fields,['legalName',denyName],['country','Sri Lanka'],['baseCurrency','LKR'],['timezone','Asia/Colombo']]);
  const [after]=await sql`select legal_name from company_profiles where tenant_id=${f.tenantA}`;const unchanged=await snapshot()===before;c(unchanged,'viewer-profile-write-zero-business-effects');c(after.legal_name!==denyName,'viewer-cannot-change-legal-name');o('viewerProfileChanged',Number(after.legal_name===denyName));
  const ownerName='HTTP Owner profile '+lane.name;await postForm('/company/details',actors.owner,[...fields,['legalName',ownerName],['country','Sri Lanka'],['baseCurrency','LKR'],['timezone','Asia/Colombo']]);const [positive]=await sql`select legal_name from company_profiles where tenant_id=${f.tenantA}`;c(positive.legal_name===ownerName,'same-form-owner-positive-persisted');o('ownerProfileSaved',Number(positive.legal_name===ownerName));
 });
 await test(5,async(c,o)=>{
  for(const key of ['owner','viewer']){const a=actors[key];if(!a.ownRead)throw new Incomplete('known-role-positive-prerequisite');const r=await request('/control-room/companies',a);c(denied(r),'normal-role-control-room-denied');c(!r.body.includes(f.foreignName),'control-room-denial-no-company-data');o(key+'ControlStatus',r.status);}
  await requireLogin(actors.platform);const r=await request('/control-room/companies',actors.platform);c(r.status===200&&r.body.includes(f.foreignName),'platform-admin-known-foreign-company-positive');o('platformControlStatus',r.status);
 });
 await test(6,async(c,o)=>{const a=actors.foreign;await requireLogin(a);const stale=a.jar.header(BASE);const r=await postJSON('/api/auth/sign-out',a,{});c(r.status===200,'signout-succeeds');const replay=await request('/api/auth/get-session',{ip:a.ip},{cookie:stale});c(!json(replay)?.user,'revoked-session-not-authenticated');const protectedReplay=await request('/sales/invoices/'+f.foreign.id,{ip:a.ip},{cookie:stale});c(denied(protectedReplay)&&!protectedReplay.body.includes(f.foreign.marker),'stale-session-protected-route-denied');o('staleSessionAuthenticated',Number(!!json(replay)?.user));});
 await test(7,async(c,o)=>{const before=await snapshot();for(const key of ['owner','viewer']){const a=actors[key];if(!a.ownRead)throw new Incomplete('known-role-positive-prerequisite');const params=new URLSearchParams({date:f.date,account:'1000',total:'150',doc:f.own.id,amt:'150'});const r=await request('/sales/payments/receipt?'+params,a);c(r.status===200&&r.body.includes('PAYMENT RECEIPT')&&r.body.includes(f.own.customer)&&r.body.includes(f.own.number)&&r.body.includes('150.00'),'existing-receipt150-real-server-renders');o(key+'ReceiptStatus',r.status);}c(await snapshot()===before,'receipt-read-no-duplicate-posting');});
 await test(8,async(c,o)=>{
  if(!actors.owner.ownRead||!actors.viewer.ownRead)throw new Incomplete('known-role-positive-prerequisite');handle=await actionHandle(actors.owner);
  const input=(id,amount)=>({paymentDate:f.date,paymentAccountCode:'1000',allocations:[{documentId:id,amount}],idempotencyKey:randomUUID()});
  let before=await snapshot();const deniedViewer=await financial(actors.viewer,handle,input(f.own.id,10));c(deniedViewer.status<500,'viewer-action-transport-not-server-error');c(await snapshot()===before,'viewer-financial-write-zero-business-effects');
  before=await snapshot();await financial(actors.owner,handle,input(f.foreign.id,10));c(await snapshot()===before,'foreign-allocation-zero-business-effects');
  const beforeIds=(await sql`select id from journal_entries`).map(r=>r.id);const r=await financial(actors.owner,handle,input(f.own.id,25));const d=await doc(f.own.id);financialVerified=r.status===200&&Number(d.paid)===175&&Number(d.due)===425;c(financialVerified,'real-owner-receipt25-posts-exactly-once');
  const newJournals=await sql`select j.id,j.tenant_id,j.user_id,j.entry_date,a.code,l.side,l.amount::text as amount from journal_entries j join journal_lines l on l.journal_entry_id=j.id join accounts a on a.id=l.account_id where j.tenant_id=${f.tenantA}`;const added=newJournals.filter(r=>!beforeIds.includes(r.id));c(added.length===2&&new Set(added.map(x=>x.id)).size===1,'one-two-line-payment-journal');c(added.every(x=>x.user_id===actors.owner.id&&x.entry_date===f.date&&Number(x.amount)===25),'payment-actor-date-tenant-amount');c(added.some(x=>x.code==='1000'&&x.side==='debit')&&added.some(x=>x.code==='1300'&&x.side==='credit'),'exact-cash-ar-posting');
  const [alloc]=await sql`select count(*)::int as n,sum(allocated_amount)::text as total from settlement_allocations where tenant_id=${f.tenantA}`;c(alloc.n===2&&Number(alloc.total)===175,'allocation-subledger-reconciles');o('paidCents',Math.round(Number(d.paid)*100));o('balanceCents',Math.round(Number(d.due)*100));o('expectedPaidCents',17500);o('newJournalLines',added.length);o('actionTransportVerified',Number(financialVerified));
 });
 await test(9,async(c,o,row)=>{
  const a=actors.legacyViewer,b=actors.legacyOwner;await requireLogin(a);await requireLogin(b);
  const prior=await membership(a.id,f.tenantA);c(prior.role==='viewer'&&prior.job===null,'fixture-legacy-viewer-starts-unassigned');
  await request('/sales/invoices/'+f.own.id,a);const after=await membership(a.id,f.tenantA);c(after.role==='viewer'&&after.job!=='owner','credential-session-never-promotes-viewer-to-owner');o('legacyViewerBecameOwner',Number(after.role==='owner'||after.job==='owner'));
  await request('/sales/invoices/'+f.own.id,b);const owner=await membership(b.id,f.tenantA);c(owner.role==='owner'&&owner.job==='owner','legacy-owner-positive-membership-repair');o('legacyOwnerRepair',Number(owner.role==='owner'&&owner.job==='owner'));
  if(!financialVerified||!handle){row.missing.push('financial-action-control-prerequisite');return;}
  const input=amount=>({paymentDate:f.date,paymentAccountCode:'1000',allocations:[{documentId:f.own.id,amount}],idempotencyKey:randomUUID()});
  const before=await snapshot();await financial(a,handle,input(10));c(await snapshot()===before,'legacy-viewer-financial-write-zero-business-effects');const denied=await doc(f.own.id);o('paidAfterLegacyViewerCents',Math.round(Number(denied.paid)*100));
  await financial(b,handle,input(25));const d=await doc(f.own.id);c(Number(d.paid)===200&&Number(d.due)===400,'legacy-owner-receipt25-positive-with-no-viewer-money');o('finalPaidCents',Math.round(Number(d.paid)*100));o('expectedFinalPaidCents',20000);
 });
 return rows;
}
try{
 assert.equal(process.env.GITHUB_ACTIONS,'true','Only ephemeral CI may launch/reset this HTTP fixture');httpTarget(BASE,process.env.QA_HTTP_ISOLATION);httpDatabase(process.env.QA_RUNTIME_ADMIN_URL,process.env.QA_RUNTIME_ISOLATION);
 stage='source-guard';const verify=spawnSync(process.execPath,['scripts/verify-product.mjs'],{encoding:'utf8'});assert.equal(verify.status,0);
 const ref=JSON.parse(readFileSync('product-ref.json','utf8'));const preparation=JSON.parse(readFileSync('.local/runtime/preparation.json','utf8'));assert.equal(preparation.productSha,ref.commit);assert.equal(preparation.complete,true);
 assert.deepEqual(manifest.lanes.map(l=>({name:l.name,credential:l.credential,expected:l.expected})),[{name:'owner-db-baseline',credential:'admin',expected:Array.from({length:9},(_,i)=>'HTTP-'+String(i+1).padStart(3,'0'))},{name:'nonowner-nobypassrls',credential:'runtime',expected:Array.from({length:9},(_,i)=>'HTTP-'+String(i+101).padStart(3,'0'))}]);
 sql=postgres(process.env.QA_RUNTIME_ADMIN_URL,{max:1});const [guard]=await sql`select * from qa_runtime_guard`;assert.equal(guard.marker,'isolated-bookone-qa-v1');assert.equal(guard.product_sha,ref.commit);
 const runtime=JSON.parse(readFileSync('.local/runtime/connection.json','utf8')).url;httpDatabase(runtime,process.env.QA_RUNTIME_ISOLATION);
 summary.fingerprint={productSha:ref.commit,productStamp:'v'+readFileSync('work/product/VERSION','utf8').trim()+' · '+ref.commit.slice(0,7),qaSha:git('rev-parse','HEAD'),qaDirty:!!git('status','--porcelain'),qaContentHash:digest(git('ls-files','--cached','--others','--exclude-standard').split(/\r?\n/).filter(p=>/\.(mjs|ts|tsx|json|md|ya?ml)$/.test(p)&&!p.startsWith('runs/')).sort().map(p=>p+'\0'+digest(readFileSync(p))).join('\n')),node:process.version,productLockHash:digest(readFileSync('work/product/pnpm-lock.yaml')),fixtureVersion:manifest.fixtureVersion,schemaMigrations:preparation.migrations.length};
 stage='local-tls';const key=resolve(dir,'tls.key'),cert=resolve(dir,'tls.crt');const openssl=spawnSync('openssl',['req','-x509','-nodes','-newkey','rsa:2048','-days','1','-subj','/CN=localhost','-addext','subjectAltName=IP:127.0.0.1,DNS:localhost','-keyout',key,'-out',cert],{encoding:'utf8',timeout:30000});writeFileSync(join(dir,'tls.log'),(openssl.stdout??'')+(openssl.stderr??''));assert.equal(openssl.status,0);ca=readFileSync(cert);
 proxy=https.createServer({key:readFileSync(key),cert:ca},(req,res)=>{const upstream=http.request({hostname:'127.0.0.1',port:3300,path:req.url,method:req.method,headers:{...req.headers,host:'127.0.0.1:3443','x-forwarded-host':'127.0.0.1:3443','x-forwarded-proto':'https','x-forwarded-for':req.socket.remoteAddress}},r=>{res.writeHead(r.statusCode,r.headers);r.pipe(res);});upstream.on('error',()=>{res.writeHead(502);res.end('Local fixture starting');});req.pipe(upstream);});await new Promise((ok,bad)=>{proxy.once('error',bad);proxy.listen(3443,'127.0.0.1',ok);});
 const env={...process.env,NODE_ENV:'production',NEXT_TELEMETRY_DISABLED:'1',BETTER_AUTH_SECRET:randomBytes(32).toString('hex'),BETTER_AUTH_URL:BASE.slice(0,-1),AUTH_URL:BASE.slice(0,-1),APP_URL:BASE.slice(0,-1),NEXT_PUBLIC_BOOKONE_BUILD:ref.commit,RESEND_API_KEY:'',GOOGLE_CLIENT_ID:'',GOOGLE_CLIENT_SECRET:'',PLATFORM_ADMIN_EMAIL:'platform.admin@http.example.invalid'};
 const nextBin=join(WEB,'node_modules/next/dist/bin/next');stage='build';assert.equal(await child([nextBin,'build'],WEB,{...env,DATABASE_URL:process.env.QA_RUNTIME_ADMIN_URL},'build'),0);
 summary.fingerprint.nextBuildId=readFileSync(join(WEB,'.next/BUILD_ID'),'utf8').trim();summary.fingerprint.nextVersion=JSON.parse(readFileSync(join(WEB,'node_modules/next/package.json'),'utf8')).version;summary.fingerprint.betterAuthVersion=JSON.parse(readFileSync(join(WEB,'node_modules/better-auth/package.json'),'utf8')).version;
 for(const lane of manifest.lanes){
  stage='fixture';assert.equal(next,null);assert.equal(await child(['node_modules/vitest/vitest.mjs','run','--config','vitest.http-seed.config.ts'],ROOT,{...env,DATABASE_URL:process.env.QA_RUNTIME_ADMIN_URL},lane.name+'-seed',180000),0);
  copyFileSync('.local/http/fixture.json',join(dir,lane.name+'-fixture.json'));const fixture=JSON.parse(readFileSync('.local/http/fixture.json','utf8'));
  const database=lane.credential==='runtime'?runtime:process.env.QA_RUNTIME_ADMIN_URL;const probe=postgres(database,{max:1});let role;
  try{[role]=await probe`select current_user as name,rolsuper,rolbypassrls from pg_roles where rolname=current_user`;if(lane.credential==='runtime'){assert.equal(role.name,'qa_runtime');assert.equal(role.rolsuper,false);assert.equal(role.rolbypassrls,false);}}finally{await probe.end();}
  const fd=openSync(join(dir,lane.name+'-server.log'),'w');
  stage='server-start';next=spawn(process.execPath,[nextBin,'start','--hostname','127.0.0.1','--port','3300'],{cwd:WEB,env:{...env,DATABASE_URL:database},stdio:['ignore',fd,fd]});next.once('exit',()=>closeSync(fd));
  let ready=false;for(let n=0;n<45;n++){if(next.exitCode!==null||next.signalCode!==null)break;try{const r=await request('/login');if(r.status===200&&r.body.includes(ref.commit.slice(0,7))){ready=true;break;}}catch{}await new Promise(ok=>setTimeout(ok,1000));}assert.equal(ready,true);
  stage='cases';const cases=await laneCases(lane,fixture);const d=await doc(fixture.own.id);const [counts]=await sql`select (select count(*)::int from journal_entries where tenant_id=${fixture.tenantA}) as journals,(select count(*)::int from settlement_allocations where tenant_id=${fixture.tenantA}) as allocations`;
  writeFileSync(join(dir,lane.name+'-final-business.json'),await snapshot());
  const logs=readFileSync(join(dir,lane.name+'-server.log'),'utf8');const categories=[['action-reference-missing',/Failed to find Server Action/],['action-origin-invalid',/Invalid Server Actions request/],['sql-permission-denied',/permission denied for table/],['reserved-driver-parsers',/reading ['"]parsers['"]/]].filter(([,re])=>re.test(logs)).map(([label])=>label);
  summary.results.push({lane:lane.name,boundary:lane.credential==='runtime'?'real-credential-TLS-Next-nonowner-NOBYPASSRLS':'real-credential-TLS-Next-ownerDB-functional-baseline',databaseRole:{superuser:role.rolsuper,bypassRls:role.rolbypassrls},serverDiagnostics:categories,finalAccounting:{paidCents:Math.round(Number(d.paid)*100),balanceCents:Math.round(Number(d.due)*100),journals:counts.journals,allocations:counts.allocations},cases});await stopNext();
 }
 summary.setup={status:'passed',stage:'complete'};
}catch(e){privateError('setup-'+stage,e);summary.setup={status:'blocked',stage};}
finally{
 await stopNext();if(proxy){proxy.closeAllConnections();await new Promise(ok=>proxy.close(ok));}if(sql)await sql.end();
 for(const lane of manifest.lanes){let row=summary.results.find(r=>r.lane===lane.name);if(!row){row={lane:lane.name,boundary:'not-executed',cases:[]};summary.results.push(row);}for(const id of lane.expected)if(!row.cases.some(c=>c.id===id))row.cases.push({id,status:'blocked',evidenceComplete:false,failedAssertions:[],observations:{},missing:['setup-'+summary.setup.stage]});}
 summary.totals={passed:0,failed:0,blocked:0};for(const lane of summary.results)for(const c of lane.cases)summary.totals[c.status]=(summary.totals[c.status]??0)+1;
 writeFileSync(join(dir,'summary.json'),JSON.stringify(summary,null,2)+'\n');writeFileSync('.local/http/latest-summary.json',JSON.stringify(summary,null,2)+'\n');mkdirSync('runs',{recursive:true});writeFileSync('runs/'+runId+'.json',JSON.stringify(summary,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(summary,null,2));
 process.exitCode=summary.setup.status==='passed'&&summary.totals.failed===0&&summary.totals.blocked===0?0:1;
}
