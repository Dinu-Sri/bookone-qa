const {open,BASE}=require('./lib');
const parties=[
 ['customers','company','Lanka Hardware & Building Supplies (Private) Limited','Lanka Hardware'],
 ['customers','individual','Nimal Perera','Nimal Perera'],
 ['customers','company','Ceylon Tea Exporters Consolidated Holdings PLC — Colombo 03 Branch Office','Ceylon Tea Exporters'],
 ['customers','government','Ministry of Education','MoE'],
 ['customers','company','Kandy Lakeside Hotels','Kandy Lakeside'],
 ['customers','other','Walk-in Customer',''],
 ['vendors','company','Colombo Stationery Wholesale Distributors (Pvt) Ltd','Colombo Stationery'],
 ['vendors','company','Dialog Axiata PLC','Dialog'],
 ['vendors','company','Ceylon Electricity Board','CEB'],
 ['vendors','individual','Sunil Fernando (Transport Contractor)','Sunil Transport'],
];
(async()=>{const {b,p}=await open();
 for(const [kind,type,name,disp] of parties){
  await p.goto(BASE+`/parties/${kind}/new`,{waitUntil:'networkidle'});
  await p.selectOption('select[name=partyType]',type); await p.fill('input[name=name]',name); if(disp) await p.fill('input[name=displayName]',disp);
  await Promise.all([p.waitForLoadState('networkidle'), p.locator('main button[type=submit]').last().click()]); await p.waitForTimeout(1500);
  console.log(kind,name,'->',p.url(), (await p.$eval('main',m=>m.innerText.slice(0,120).replace(/\s+/g,' '))));
 }
 await b.close();})();
