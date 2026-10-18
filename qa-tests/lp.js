const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const MODE=process.argv[2],URL=MODE==='before'?'http://localhost:8766/index.html':'http://localhost:8765/index.html',OUT='/home/user/nbs4med-demo/logo-placement-evidence/'+MODE;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [lang,W,H,mob] of [['en',1366,657,0],['en',1440,780,0],['en',1536,730,0],['en',1920,1080,0],['ar',1366,657,0],['ar',1920,1080,0],['en',390,844,1],['ar',390,844,1],['en',360,640,1]]){
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:mob?2:1,isMobile:!!mob,hasTouch:!!mob});const p=await ctx.newPage();
 await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});if(lang==='ar')await p.click('.lang button[data-lang=ar]');await p.waitForTimeout(900);
 const m=await p.evaluate(()=>{const r=e=>e?e.getBoundingClientRect():null;const btn=r(document.getElementById('startBtn')),img=r(document.querySelector('.hero .brandlogo')),tile=r(document.querySelector('.hero .brandtile')),wrap=r(document.querySelector('.hero .wrap')),h1=r(document.getElementById('h1'));return {btnBottom:Math.round(btn.bottom),btnTop:Math.round(btn.top),tile:tile&&[Math.round(tile.left),Math.round(tile.top),Math.round(tile.width),Math.round(tile.height)],wrapLeft:Math.round(wrap.left),wrapRight:Math.round(wrap.right),h1Top:Math.round(h1.top),ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,anim:getComputedStyle(document.querySelector('.hero .brandlogo')).animationName,imgW:img&&Math.round(img.width),imgH:img&&Math.round(img.height)}});
 console.log(lang,W+'x'+H,JSON.stringify(m),m.btnBottom<=H?'BUTTON VISIBLE':'button below fold');
 await p.screenshot({path:`${OUT}/${lang}_${W}x${H}.png`});await ctx.close()}
await b.close()})()
