const {chromium}=require('playwright'); const fs=require('fs'); const detect=require('./detect');
const BASE='https://staging.clossyan.com';
const VPS={desktop:{width:1440,height:900},tablet:{width:768,height:1024},mobile:{width:390,height:844}};
(async()=>{ const [label,routesFile,vpsArg]=process.argv.slice(2); const routes=fs.readFileSync(routesFile,'utf8').split('\n').map(s=>s.trim()).filter(Boolean);
 const vps=(vpsArg||'desktop,tablet,mobile').split(','); fs.mkdirSync(`shots/${label}`,{recursive:true}); const res=[];
 const b=await chromium.launch();
 for(const v of vps){ const ctx=await b.newContext({viewport:VPS[v],storageState:'storage-state.json',isMobile:v==='mobile',hasTouch:v!=='desktop'}); const p=await ctx.newPage();
  for(const r of routes){ const name=(r.replace(/[\/?=&]+/g,'_').replace(/^_/,'')||'root'); let st=null;
   try{ const resp=await p.goto(BASE+r,{waitUntil:'networkidle',timeout:45000}); st=resp&&resp.status(); await p.waitForTimeout(700);
    const f=await p.evaluate(`(${detect.toString()})()`); const shot=`shots/${label}/${name}__${v}.jpg`; await p.screenshot({path:shot,fullPage:true,type:'jpeg',quality:70});
    res.push({route:r,final:p.url().replace(BASE,''),vp:v,status:st,shot,...f});
    console.log(v,r,st,'ovX',f.pageOverflowX,'off',f.offscreen.length,'clip',f.clippedText.length,'spill',f.spill.length,'anc',f.clippedByAncestor.length,'ovl',f.overlaps.length,'field',f.fieldCrop.length);
   }catch(e){console.log('ERR',v,r,e.message.split('\n')[0]); res.push({route:r,vp:v,error:e.message.split('\n')[0]});}
  } await ctx.close(); }
 await b.close(); fs.writeFileSync(`results-${label}-${vps.join("_")}.json`,JSON.stringify(res,null,1)); })();
