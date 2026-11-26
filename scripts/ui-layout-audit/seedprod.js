const {open,BASE}=require('./lib');
const P=[
 ['physical','OF-CHR-001','Ergonomic Mesh Office Chair with Adjustable Lumbar Support (Black)','Office furniture',18500,28500,40,'KEL-WH',5,10],
 ['physical','OF-DSK-160','Standing Desk 160x80 Electric','Office furniture',62000,96000,8,'KEL-WH',2,4],
 ['physical','ST-A4-80','A4 Copy Paper 80gsm (ream)','Paper & notebooks',1650,2200,300,'COL-01',50,200],
 ['physical','ST-PEN-BL','Blue Ballpoint Pen (box of 50)','Stationery',900,1200,3,'COL-01',10,20],
 ['physical','ST-NB-A5','A5 Ruled Notebook 200 pages','Paper & notebooks',350,550,0,'COL-01',20,100],
 ['service','SV-INST','Furniture Assembly & Installation','',0,4500,0,'',0,0],
 ['rental','RN-CHR-BQ','Banquet Chair (white, cushioned)','Event equipment',6500,350,200,'KEL-WH',0,0],
 ['rental','RN-TNT-10','Marquee Tent 10m x 20m','Event equipment',450000,85000,2,'KEL-WH',0,0],
];
(async()=>{const {b,p}=await open(); p.setDefaultTimeout(15000);
 for(const [type,sku,name,cat,cost,price,qty,loc,rl,rq] of P){
  try{
  await p.goto(BASE+'/inventory/products/new',{waitUntil:'networkidle'});
  await p.selectOption('select[name=productType]',type); await p.waitForTimeout(300);
  await p.fill('input[name=sku]',sku); await p.fill('input[name=name]',name);
  if(cat){const o=await p.$$eval('select[name=categoryId] option',x=>x.map(y=>[y.value,y.text]));const m=o.find(x=>x[1].trim()===cat||x[1].includes(cat)); if(m) await p.selectOption('select[name=categoryId]',m[0]);}
  await p.locator('main button',{hasText:/^\s*Pricing\s*$/}).first().click(); await p.waitForTimeout(300);
  if(await p.locator('input[name=unitCost]').isVisible()) await p.fill('input[name=unitCost]',String(cost));
  await p.fill('input[name=sellPrice]',String(price));
  await p.locator('main button',{hasText:/^\s*Stock\s*$/}).first().click(); await p.waitForTimeout(300);
  if(qty && await p.locator('input[name=openingQty]').isVisible()){ await p.fill('input[name=openingQty]',String(qty)); const o=await p.$$eval('select[name=openingLocationId] option',x=>x.map(y=>[y.value,y.text])); const m=o.find(x=>x[1].includes(loc)); if(m) await p.selectOption('select[name=openingLocationId]',m[0]); }
  if(rl && await p.locator('input[name=reorderLevel]').isVisible()){ await p.fill('input[name=reorderLevel]',String(rl)); await p.fill('input[name=reorderQty]',String(rq)); }
  await Promise.all([p.waitForLoadState('networkidle'),p.getByRole('button',{name:'Save product'}).click()]); await p.waitForTimeout(2000);
  console.log(sku,'->',p.url().replace(BASE,''),(await p.$eval('main',m=>m.innerText.replace(/\s+/g,' ').slice(0,140))));
  }catch(e){console.log('ERR',sku,e.message.split('\n')[0]); await p.screenshot({path:'err_'+sku+'.png',fullPage:true});}
 }
 await b.close();})();
