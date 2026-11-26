const {open,BASE}=require('./lib');
async function makeDoc(p,route,{party,date,lines,intent,partySel='partyName'}){
 await p.goto(BASE+route,{waitUntil:'networkidle'});
 if(party){ const opts=await p.$$eval(`select[name=${partySel}] option`,o=>o.map(x=>[x.value,x.text])); const m=opts.find(o=>o[1].includes(party)); if(m) await p.selectOption(`select[name=${partySel}]`,m[0]); else console.log('party not found',party,opts.slice(0,5)); }
 if(date && await p.$('input[name=issueDate]')) await p.fill('input[name=issueDate]',date);
 const add=p.getByPlaceholder(/Type SKU, name, or free-text/).first();
 for(const [i,[d,q,u,disc]] of lines.entries()){ await add.fill(d); await add.press('Enter'); await p.waitForTimeout(500);
   await p.fill(`input[name=line_${i}_quantity]`,String(q)); await p.fill(`input[name=line_${i}_unitPrice]`,String(u)); if(disc) await p.fill(`input[name=line_${i}_discountValue]`,String(disc)); }
 await p.waitForTimeout(400);
 const btn=p.locator('main button[type=submit]').filter({hasText:new RegExp('^'+intent+'$')}).first();
 await Promise.all([p.waitForLoadState('networkidle'),btn.click()]); await p.waitForTimeout(2000);
 const msg=await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,160)); console.log(route,party,intent,'->',p.url().replace(BASE,''),'|',msg);
}
module.exports={makeDoc};
if(require.main===module)(async()=>{const {b,p}=await open();
 const inv='/sales/invoices/new';
 await makeDoc(p,inv,{party:'Lanka Hardware',date:'2026-11-03',intent:'Post',lines:[['Cement 50kg bags — Holcim',120,2450,5],['River sand delivery (cube)',4,18500],['Steel bars 12mm TOR',60,1325]]});
 await makeDoc(p,inv,{party:'Ceylon Tea',date:'2026-11-10',intent:'Post',lines:[['Packaging consultation and export documentation support for Q4 shipments to Rotterdam',1,185000]]});
 await makeDoc(p,inv,{party:'Kandy Lakeside',date:'2026-10-05',intent:'Post',lines:[['Linen supply',40,3200],['Laundry service',1,45000]]});
 await makeDoc(p,inv,{party:'Nimal Perera',date:'2026-11-20',intent:'Post',lines:[['Office chair',2,28500]]});
 await makeDoc(p,inv,{party:'Ministry of Education',date:'2026-09-15',intent:'Post',lines:[['Exercise books (pack of 10)',500,950],['Blue pens box',200,1200]]});
 await makeDoc(p,inv,{party:'Kandy Lakeside',date:'2026-11-25',intent:'Save draft',lines:[['Draft: Christmas decorations',1,78000]]});
 await b.close();})();
