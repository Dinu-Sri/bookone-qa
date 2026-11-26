const {open,BASE}=require('./lib');
async function hire(p,cust,from,to,venue,lines){
 await p.goto(BASE+'/sales/orders/new',{waitUntil:'networkidle'});
 const o=await p.$$eval('select[name=partyName] option',x=>x.map(y=>[y.value,y.text])); await p.selectOption('select[name=partyName]',o.find(x=>x[1].includes(cust))[0]);
 const add=p.getByPlaceholder(/Type SKU, name, or free-text/).first();
 for(const [i,[sku,q]] of lines.entries()){ await add.fill(sku); await p.waitForTimeout(900); await add.press('Enter'); await p.waitForTimeout(800); await p.fill(`input[name=line_${i}_quantity]`,String(q)); }
 const l=await p.$$eval('select[name=locationId] option',x=>x.map(y=>[y.value,y.text])); const k=l.find(x=>x[1].includes('Kelaniya')); if(k) await p.selectOption('select[name=locationId]',k[0]);
 await p.fill('input[name=eventDate]',from); await p.fill('input[name=hireFrom]',from); await p.fill('input[name=hireTo]',to); await p.fill('input[name=venue]',venue); await p.fill('input[name=guestCount]','180');
 await Promise.all([p.waitForLoadState('networkidle'),p.getByRole('button',{name:'Save sales order'}).click()]); await p.waitForTimeout(2500);
 console.log(cust,'->',p.url().replace(BASE,''),(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,200))));
}
(async()=>{const {b,p}=await open(); p.setDefaultTimeout(15000);
 await hire(p,'Kandy Lakeside','2026-11-28','2026-11-30','Kandy Lakeside Hotel — Grand Ballroom',[['RN-CHR-WH',150],['RN-TNT-20',1]]);
 await hire(p,'Nimal Perera','2026-11-24','2026-11-25','Perera residence, Nugegoda — wedding homecoming',[['RN-CHR-WH',40]]);
 await p.goto(BASE+'/inventory/calendar',{waitUntil:'networkidle'}); console.log(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,500)));
 await p.goto(BASE+'/inventory/on-rent',{waitUntil:'networkidle'}); console.log(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,500)));
 await b.close();})();
