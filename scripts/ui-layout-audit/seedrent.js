const {open,BASE}=require('./lib');
(async()=>{const {b,p}=await open(); p.setDefaultTimeout(15000);
 // new rental product with opening stock and location set properly
 for(const [sku,name,cost,price,qty] of [['RN-CHR-WH','Banquet Chair (white, cushioned) — fleet',6500,350,200],['RN-TNT-20','Marquee Tent 10m x 20m — fleet',450000,85000,2]]){
  await p.goto(BASE+'/inventory/products/new',{waitUntil:'networkidle'});
  await p.selectOption('select[name=productType]','rental'); await p.waitForTimeout(300);
  await p.fill('input[name=sku]',sku); await p.fill('input[name=name]',name);
  const o=await p.$$eval('select[name=categoryId] option',x=>x.map(y=>[y.value,y.text])); await p.selectOption('select[name=categoryId]',o.find(x=>x[1].includes('Event'))[0]);
  await p.locator('main button',{hasText:/^\s*Pricing\s*$/}).first().click(); await p.waitForTimeout(300);
  if(await p.locator('input[name=unitCost]').isVisible()) await p.fill('input[name=unitCost]',String(cost)); await p.fill('input[name=sellPrice]',String(price));
  await p.locator('main button',{hasText:/^\s*Stock\s*$/}).first().click(); await p.waitForTimeout(300);
  await p.fill('input[name=openingQty]',String(qty)); const l=await p.$$eval('select[name=openingLocationId] option',x=>x.map(y=>[y.value,y.text])); await p.selectOption('select[name=openingLocationId]',l.find(x=>x[1].includes('Kelaniya'))[0]);
  await Promise.all([p.waitForLoadState('networkidle'),p.getByRole('button',{name:'Save product'}).click()]); await p.waitForTimeout(2000);
  console.log(sku,'->',p.url().replace(BASE,''),(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,140))));
 }
 await p.goto(BASE+'/inventory/levels',{waitUntil:'networkidle'}); console.log(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,1200)));
 await b.close();})();
