const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:1600}});
await p.goto('file://'+process.cwd()+'/cards.html');await p.waitForTimeout(2500);
for (const el of await p.$$('section.card')){const id=await el.getAttribute('id');await el.screenshot({path:'out/'+id+'.png'});console.log(id);}
await b.close();})();
