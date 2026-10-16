const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:1600}});
await p.goto('file://'+process.cwd()+'/greg.html');await p.waitForTimeout(2000);
await (await p.$('#ks-11-proof-greg')).screenshot({path:'out/ks-11-proof-greg.png'});await b.close();})();
