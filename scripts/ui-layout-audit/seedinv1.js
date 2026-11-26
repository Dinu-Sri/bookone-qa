const {open,BASE}=require('./lib');
(async()=>{const {b,p}=await open(); p.setDefaultTimeout(15000);
 const sub=async()=>{await Promise.all([p.waitForLoadState('networkidle'),p.locator('main button[type=submit]').last().click()]);await p.waitForTimeout(1200);};
 for(const [n,c,t] of [['Colombo Showroom','COL-01','branch'],['Kelaniya Warehouse','KEL-WH','warehouse'],['Front Counter','CTR-01','counter']]){
  await p.goto(BASE+'/company/locations',{waitUntil:'networkidle'}); await p.fill('input[name=name]',n); await p.fill('input[name=code]',c); await p.selectOption('select[name=locationType]',t);
  await p.getByRole('button',{name:/Add location/}).click(); await p.waitForTimeout(2000); }
 await p.goto(BASE+'/company/rental',{waitUntil:'networkidle'}); await p.getByRole('button',{name:/Create missing hire bays/}).click(); await p.waitForTimeout(2500);
 for(const n of ['Office furniture','Stationery','Event equipment']){ await p.goto(BASE+'/inventory/categories',{waitUntil:'networkidle'}); await p.fill('input[name=name]',n); await p.getByRole('button',{name:/Add category/}).click(); await p.waitForTimeout(1500);}
 await p.goto(BASE+'/inventory/categories',{waitUntil:'networkidle'}); const o=await p.$$eval('select[name=parentId] option',x=>x.map(y=>[y.value,y.text])); const st=o.find(x=>x[1].includes('Stationery'));
 if(st){ await p.fill('input[name=name]','Paper & notebooks'); await p.selectOption('select[name=parentId]',st[0]); await p.getByRole('button',{name:/Add category/}).click(); await p.waitForTimeout(1500);}
 await p.goto(BASE+'/company/locations',{waitUntil:'networkidle'}); console.log(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(-600)));
 await p.goto(BASE+'/inventory/categories',{waitUntil:'networkidle'}); console.log(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(-400)));
 await b.close();})();
