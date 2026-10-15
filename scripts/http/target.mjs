import assert from 'node:assert/strict';
import { runtimeTarget } from '../runtime/target.mjs';
export function httpTarget(raw,consent) {
  assert.equal(consent,'ephemeral-ci-next','Explicit isolated Next target required');
  const u=new URL(raw);
  assert.equal(u.protocol,'https:','Local TLS is mandatory; never disable secure cookies');
  assert.equal(u.hostname,'localhost');assert.equal(u.port,'3443');
  assert.equal(u.pathname,'/');assert.equal(u.username,'');assert.equal(u.password,'');
  assert.equal(u.search,'');assert.equal(u.hash,'');return u;
}
export function httpDatabase(raw,consent) { return runtimeTarget(raw,consent); }
export function localTlsTransport(raw,consent) {
  const u=httpTarget(raw,consent);
  // NextURL canonicalizes loopback literals to localhost. Keep one origin,
  // pin TCP independently, and verify the certificate for that hostname.
  return {hostname:'127.0.0.1',port:Number(u.port),servername:u.hostname};
}
export function localPath(base,path) {
  const u=new URL(path,base);assert.equal(u.origin,new URL(base).origin,'Cross-origin request/redirect forbidden');
  assert.ok(!u.username&&!u.password);return u;
}
export function deniedHttpResponse(base,status,location,safeFallbacks=[]) {
  if([401,403,404].includes(status))return true;
  if(![302,303,307,308].includes(status)||!location)return false;
  // Inspect a redirect without following it. A foreign/internal origin fails
  // the expected denial contract rather than throwing and masking all logins.
  try{const u=new URL(location,base);return u.origin===new URL(base).origin&&!u.username&&!u.password&&['/','/login','/onboarding',...safeFallbacks].includes(u.pathname);}catch{return false;}
}
export class CookieJar {
  #cookies=new Map();
  receive(lines,url) {
    const u=new URL(url);for(const line of lines??[]) {
      const [pair,...attributes]=line.split(';');const p=pair.indexOf('=');if(p<1)continue;
      const name=pair.slice(0,p).trim(),value=pair.slice(p+1).trim();
      const attrs=Object.fromEntries(attributes.map(a=>{const i=a.indexOf('=');return i<0?[a.trim().toLowerCase(),true]:[a.slice(0,i).trim().toLowerCase(),a.slice(i+1).trim()];}));
      const domain=typeof attrs.domain==='string'?attrs.domain.replace(/^\./,'').toLowerCase():u.hostname;
      assert.equal(domain,u.hostname,'Foreign cookie domains are forbidden in the isolated fixture');
      const key=name+'|'+domain+'|'+(attrs.path||'/');
      if(Number(attrs['max-age'])<=0||attrs.expires&&Date.parse(String(attrs.expires))<=Date.now()){this.#cookies.delete(key);continue;}
      this.#cookies.set(key,{name,value,domain,path:attrs.path||'/',secure:!!attrs.secure,httpOnly:!!attrs.httponly,sameSite:attrs.samesite,expires:attrs['max-age']?Date.now()+Number(attrs['max-age'])*1000:attrs.expires?Date.parse(String(attrs.expires)):Infinity});
    }
  }
  header(url) {const u=new URL(url);return [...this.#cookies.values()].filter(c=>c.domain===u.hostname&&(!c.secure||u.protocol==='https:')&&(u.pathname===c.path||u.pathname.startsWith(c.path.endsWith('/')?c.path:c.path+'/'))&&c.expires>Date.now()).map(c=>c.name+'='+c.value).join('; ');}
  sessionAttributes() {return [...this.#cookies.values()].filter(c=>c.name.includes('session_token')).map(c=>({secure:c.secure,httpOnly:c.httpOnly,sameSite:String(c.sameSite??'').toLowerCase()}));}
}
