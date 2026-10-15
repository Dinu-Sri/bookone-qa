// QA-only transport wrapper; routes/auth/actions/config come from the pinned build.
import assert from 'node:assert/strict';
import {createServer} from 'node:https';
import {readFileSync} from 'node:fs';
import {resolve,join,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {httpTarget} from './target.mjs';
assert.equal(process.env.GITHUB_ACTIONS,'true');
assert.equal(process.env.NODE_ENV,'production');
const base=httpTarget('https://127.0.0.1:3443/',process.env.QA_HTTP_ISOLATION);
const root=resolve(fileURLToPath(new URL('../..',import.meta.url)));
const web=join(root,'work/product/apps/web'),privateRoot=join(root,'.local/http')+sep;
function privateFile(raw){assert.ok(raw,'Private TLS path required');const p=resolve(raw);assert.ok(p.startsWith(privateRoot),'TLS files must stay in the private fixture');return readFileSync(p);}
const key=privateFile(process.env.QA_HTTP_TLS_KEY),cert=privateFile(process.env.QA_HTTP_TLS_CERT);
const require=createRequire(join(web,'package.json'));
const next=require('next');
const app=next({dev:false,dir:web,hostname:base.hostname,port:Number(base.port)});
await app.prepare();
const handle=app.getRequestHandler();
const server=createServer({key,cert},(req,res)=>{
 if(req.headers.host!==base.host){res.writeHead(400);res.end('Wrong local fixture host');return;}
 // Use the actual loopback peer, never a caller-supplied forwarding identity.
 req.headers['x-forwarded-for']=req.socket.remoteAddress;
 req.headers['x-forwarded-proto']='https';
 req.headers['x-forwarded-host']=base.host;
 req.headers['x-forwarded-port']=base.port;
 Promise.resolve(handle(req,res)).catch(error=>{
  console.error(error); // private server log only
  if(!res.headersSent)res.writeHead(500);
  res.end('Local fixture request failed');
 });
});
await new Promise((ok,bad)=>{server.once('error',bad);server.listen(Number(base.port),base.hostname,ok);});
console.log('Pinned Next TLS fixture ready');
let closing=false;
async function close(){if(closing)return;closing=true;server.closeAllConnections();await new Promise(ok=>server.close(ok));await app.close();process.exit(0);}
process.once('SIGTERM',close);process.once('SIGINT',close);
