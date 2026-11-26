const { chromium } = require('playwright');
const BASE='https://staging.clossyan.com';
async function open(vp={width:1440,height:900}){
 const b=await chromium.launch(); const ctx=await b.newContext({viewport:vp,storageState:'storage-state.json'}); const p=await ctx.newPage(); return {b,ctx,p};
}
async function dump(p,n=2500){ console.log('URL',p.url()); console.log((await p.innerText('body')).slice(0,n)); }
module.exports={open,dump,BASE};
