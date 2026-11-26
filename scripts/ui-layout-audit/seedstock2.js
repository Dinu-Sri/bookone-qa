const {open,BASE}=require('./lib');
(async()=>{const {b,p}=await open(); p.setDefaultTimeout(15000);
 // furniture bill
 await p.goto(BASE+'/purchase/purchases/new',{waitUntil:'networkidle'});
 const o=await p.$$eval('select[name=partyName] option',x=>x.map(y=>[y.value,y.text])); await p.selectOption('select[name=partyName]',o.find(x=>x[1].includes('Colombo Stationery'))[0]);
 const l=await p.$$eval('select[name=locationId] option',x=>x.map(y=>[y.value,y.text])); await p.selectOption('select[name=locationId]',l.find(x=>x[1].includes('KEL-WH'))[0]);
 await p.fill('input[name=issueDate]','2026-11-16');
 const add=p.getByPlaceholder(/Type SKU, name, or free-text/).first();
 for(const [i,[sku,q]] of [['OF-CHR-001',40],['OF-DSK-160',8]].entries()){ await add.fill(sku); await p.waitForTimeout(900); await add.press('Enter'); await p.waitForTimeout(700); await p.fill(`input[name=line_${i}_quantity]`,String(q)); }
 await Promise.all([p.waitForLoadState('networkidle'),p.getByRole('button',{name:'Save purchase'}).click()]); await p.waitForTimeout(2000); console.log('bill ->',p.url().replace(BASE,''));
 // adjustment for rental fleet
 await p.goto(BASE+'/inventory/adjustments/new',{waitUntil:'networkidle'});
 await p.fill('input[name=reason]','Opening count — hire fleet');
 for(const [i,[sku,q]] of [['RN-CHR-BQ',200],['RN-TNT-10',2],['ST-NB-A5',-0]].slice(0,2).entries()){ const op=await p.$$eval(`select[name=line_${i}_productId] option`,x=>x.map(y=>[y.value,y.text])); await p.selectOption(`select[name=line_${i}_productId]`,op.find(x=>x[1].startsWith(sku))[0]); await p.fill(`input[name=line_${i}_quantity]`,String(q)); }
 console.log(await p.$$eval('main select',x=>x.map(e=>e.name+':'+[...e.options].slice(0,5).map(o=>o.text).join('|')).join('\n')));
 await Promise.all([p.waitForLoadState('networkidle'),p.getByRole('button',{name:'Post adjustment'}).click()]); await p.waitForTimeout(2000); console.log('adj ->',p.url().replace(BASE,''),(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,200))));
 // transfer chairs to showroom
 await p.goto(BASE+'/inventory/transfers/new',{waitUntil:'networkidle'});
 console.log(await p.$$eval('main select, main button',x=>x.map(e=>(e.name||e.tagName)+':'+(e.tagName==='SELECT'?[...e.options].slice(0,5).map(o=>o.text).join('|'):e.innerText.slice(0,30))).join('\n')));
 await b.close();})();
