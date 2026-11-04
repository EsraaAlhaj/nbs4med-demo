// node dash.js <url> <lang> <outdir> [width] ; UI-driven İzmir scenario to results, inline calculator, screenshots
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const URL=process.argv[2],LANG=process.argv[3]||'en',OUT=process.argv[4],W=+(process.argv[5]||1920);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const mobile=W<500;const p=await b.newPage({viewport:{width:W,height:mobile?844:1080},deviceScaleFactor:mobile?2:1,isMobile:mobile,hasTouch:mobile});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
if(LANG==='ar')await p.click('.lang button[data-lang=ar]');
await p.click('#startBtn');await p.selectOption('#in-area','tr');await p.click('#btnNext');
await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');await p.click('#btnNext');
await p.check('input[name=risk][value=heat]');await p.check('input[name=risk][value=flood]');await p.click('#btnNext');
const ANS={C1:{'1.1':'1','1.2':'1','1.3':'0'},C2:{'2.1':'1','2.2':'1','2.3':'0'},C3:{'3.1':'1','3.2':'1','3.3':'U'},C4:{'4.1':'1','4.2':'1'},C5:{'5.1':'1','5.2':'0','5.3':'0'}};
for(const [cid,a] of Object.entries(ANS)){for(const [id,v] of Object.entries(a))await p.check(`input[name="ind-${id}"][value="${v}"]`);
 if(cid==='C1'){await p.check('input[name="tgt-target"][value=no]');await p.check('input[name="tgt-cov"][value=no]')}
 await p.click('#btnNext');await p.waitForTimeout(cid==='C5'?500:120)}
await p.waitForSelector('#resRoot #asH');await p.waitForTimeout(300);
await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:`${OUT}/${LANG}_${W}_A_top.png`});
if(await p.$('#icHost')){await p.click('#icSec input[name=exsol][value=NBS02]');await p.waitForTimeout(250);await p.fill('#ex-area_m2','800');await p.fill('#ex-storm_depth_mm','30');await p.waitForTimeout(400)}
await p.screenshot({path:`${OUT}/${LANG}_${W}_B_full.png`,fullPage:true});
for(const id of ['ctH','gpH','rcH','icH']){await p.evaluate(id=>{const e=document.getElementById(id);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)},id);await p.waitForTimeout(150);await p.screenshot({path:`${OUT}/${LANG}_${W}_C_${id}.png`})}
console.log('errors',JSON.stringify(errs),'height',await p.evaluate(()=>document.documentElement.scrollHeight));await b.close()})()
