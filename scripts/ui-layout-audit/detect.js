// runs in page; returns findings
module.exports = function detect(){
 const W=innerWidth, out={pageOverflowX:0, offscreen:[], clippedText:[], spill:[], clippedByAncestor:[], overlaps:[], fieldCrop:[], smallTargets:0};
 const de=document.documentElement; out.pageOverflowX=Math.max(0,de.scrollWidth-W);
 const vis=e=>{const s=getComputedStyle(e); if(s.visibility==='hidden'||s.display==='none'||+s.opacity===0) return false; const r=e.getBoundingClientRect(); return r.width>1&&r.height>1;};
 const desc=e=>{let s=e.tagName.toLowerCase(); if(e.id) s+='#'+e.id; const c=(typeof e.className==='string'?e.className:'').trim().split(/\s+/).filter(Boolean).slice(0,3); if(c.length) s+='.'+c.join('.'); const t=(e.innerText||e.value||e.placeholder||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,60); const r=e.getBoundingClientRect(); return {sel:s,text:t,rect:[Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)]};};
 const scrollableX=e=>{for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const s=getComputedStyle(a); if(/(auto|scroll)/.test(s.overflowX)&&a.scrollWidth>a.clientWidth+1) return a;} return null;};
 const fixedAnc=e=>{for(let a=e;a&&a!==document.body;a=a.parentElement){const p=getComputedStyle(a).position; if(p==='fixed'||p==='sticky') return true;} return false;};
 const all=[...document.querySelectorAll('body *')].filter(e=>!['SCRIPT','STYLE','NOSCRIPT','svg','path','g','OPTION','BR'].includes(e.tagName) && !e.closest('svg'));
 const V=all.filter(vis);
 const isLeaf=e=>{ if(['BUTTON','INPUT','SELECT','TEXTAREA','IMG'].includes(e.tagName)) return true; if(e.closest('button,select')) return false; const kids=[...e.children].filter(c=>vis(c)&&!['BR','svg'].includes(c.tagName)); const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()); return own && kids.length===0; };
 const leaves=V.filter(isLeaf);
 for(const e of V){ const r=e.getBoundingClientRect(); if((r.right>W+1||r.left<-1) && !scrollableX(e) && !fixedAnc(e)){ if(isLeaf(e)||e.tagName==='TABLE') out.offscreen.push(desc(e)); } }
 for(const e of leaves){ if(['INPUT','SELECT','TEXTAREA','IMG'].includes(e.tagName)) continue; const s=getComputedStyle(e);
   if(e.scrollWidth>e.clientWidth+2 && e.clientWidth>0){ const d=desc(e); d.over=e.scrollWidth-e.clientWidth; d.textOverflow=s.textOverflow; if(/hidden|clip/.test(s.overflowX)||s.textOverflow==='ellipsis') out.clippedText.push(d); else if(s.display!=='inline') out.spill.push(d);} 
   if(e.scrollHeight>e.clientHeight+3 && /hidden|clip/.test(s.overflowY) && e.clientHeight>0){const d=desc(e); d.overY=e.scrollHeight-e.clientHeight; out.clippedText.push(d);} }
 for(const e of leaves){ const r=e.getBoundingClientRect(); for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){ const s=getComputedStyle(a); if(s.overflowX==='visible'&&s.overflowY==='visible') continue; if(/(auto|scroll)/.test(s.overflowX+s.overflowY)) break; const ar=a.getBoundingClientRect(); const dx=Math.max(ar.left-r.left,r.right-ar.right), dy=Math.max(ar.top-r.top,r.bottom-ar.bottom); if(dx>2||dy>2){const d=desc(e); d.by=desc(a).sel; d.dx=Math.round(dx); d.dy=Math.round(dy); out.clippedByAncestor.push(d);} break; } }
 const L=leaves.filter(e=>!fixedAnc(e)).map(e=>[e,e.getBoundingClientRect()]);
 for(let i=0;i<L.length;i++) for(let j=i+1;j<L.length;j++){ const [a,ra]=L[i],[b,rb]=L[j]; if(a.contains(b)||b.contains(a)) continue; const ix=Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left), iy=Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top); if(ix>3&&iy>3){ const area=ix*iy, m=Math.min(ra.width*ra.height,rb.width*rb.height); if(area/m>0.15) { // skip input+its label wrapper placeholder adornments that are absolutely positioned intentionally inside inputs
     const pa=getComputedStyle(a).position, pb=getComputedStyle(b).position; out.overlaps.push({a:desc(a),b:desc(b),pct:Math.round(100*area/m),abs:(pa==='absolute'||pb==='absolute')}); } } }
 const cv=document.createElement('canvas').getContext('2d');
 for(const e of V.filter(e=>['INPUT','SELECT'].includes(e.tagName)&&!['checkbox','radio','file','hidden','date','color','range'].includes(e.type))){ const s=getComputedStyle(e); cv.font=`${s.fontWeight} ${s.fontSize} ${s.fontFamily}`; let txt=e.tagName==='SELECT'?(e.options[e.selectedIndex]||{}).text||'':(e.value||e.placeholder||''); const avail=e.clientWidth-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight)-(e.tagName==='SELECT'?4:0); const w=cv.measureText(txt).width; if(txt&&w>avail+2){const d=desc(e); d.text=txt.slice(0,60); d.need=Math.round(w); d.avail=Math.round(avail); out.fieldCrop.push(d);} }
 if(W<500){ for(const e of V.filter(e=>e.matches('button,a,[role=button],input[type=checkbox]'))){const r=e.getBoundingClientRect(); if(r.height<28||r.width<28) out.smallTargets++;} }
 out.title=(document.querySelector('main h1,main h2')||{}).innerText||''; out.docH=de.scrollHeight;
 return out;
};
