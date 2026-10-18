const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const OUT='/home/user/nbs4med-demo/header-logo-evidence';fs.mkdirSync(OUT,{recursive:true});
const orig=fs.readFileSync('/tmp/old_index.html','utf8').match(/<svg class="logo".*?<\/svg>/s)[0].replace(/\s+/g,' ');
let bad=0;const ck=(n,c,x)=>{if(!c){bad++;console.log('FAIL',n,JSON.stringify(x||''))}};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [lang,W,H,mob] of [['en',1366,657,0],['en',1440,780,0],['en',1920,1080,0],['ar',1366,657,0],['ar',1920,1080,0],['en',390,844,1],['ar',390,844,1],['en',360,640,1]]){
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:mob?2:1,isMobile:!!mob,hasTouch:!!mob,reducedMotion:'no-preference'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8765/index.html');await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});if(lang==='ar')await p.click('.lang button[data-lang=ar]');await p.waitForTimeout(900);
 const m=await p.evaluate((ORIG)=>{const d=document.createElement('div');d.innerHTML=ORIG;const origNorm=d.firstElementChild.outerHTML.replace(/\s+/g,' ');const r=e=>e.getBoundingClientRect();const svg=document.querySelector('header .brand svg.logo');const brand=document.querySelector('header .brand b');return {same:svg.outerHTML.replace(/\s+/g,' ')===origNorm,svgHtml:svg.outerHTML.slice(0,60),svgBox:[Math.round(r(svg).left),Math.round(r(svg).top),Math.round(r(svg).width),Math.round(r(svg).height)],textLeft:Math.round(r(brand).left),textRight:Math.round(r(brand).right),rotorAnim:getComputedStyle(document.querySelector('.logo .rotor')).animationName,waveAnim:getComputedStyle(document.querySelector('.logo .w1')).animationName,hero:!!document.querySelector('.hero .brandlogo,.hero .brandtile'),footerLogo:document.querySelector('footer img.brandlogo')?[document.querySelector('footer img.brandlogo').naturalWidth,document.querySelector('footer img.brandlogo').naturalHeight]:null,btnBottom:Math.round(r(document.getElementById('startBtn')).bottom),eyebrowTop:Math.round(r(document.querySelector('.hero .eyebrow')).top),lead:document.querySelector('.lead').innerText,demo:document.querySelector('.hero-demo').innerText,ov:document.documentElement.scrollWidth-document.documentElement.clientWidth}},orig);
 ck(lang+W+' svg identical to original',m.same,m.svgHtml.slice(0,80));
 ck(lang+W+' svg 38px beside wordmark',m.svgBox[2]===38&&m.svgBox[3]===38,m.svgBox);
 ck(lang+W+' animated (no reduced motion)',m.rotorAnim==='spin'&&m.waveAnim==='rip',m);
 ck(lang+W+' no hero logo; footer logo intact',!m.hero&&m.footerLogo&&m.footerLogo[0]===456&&m.footerLogo[1]===201,m);
 ck(lang+W+' start button visible',m.btnBottom<=H||mob&&W===360,{b:m.btnBottom,H});
 ck(lang+W+' no overflow',m.ov<=1,m.ov);
 ck(lang+W+' new text kept',lang==='en'?(m.lead==='Assess NBS integration in your area, identify options relevant to local climate risks, and explore potential impacts and indicative costs.'&&m.demo==='Prototype demo — estimates are illustrative and require local verification.'):(/قيّموا دمج الحلول/.test(m.lead)&&m.demo==='نسخة تجريبية — التقديرات توضيحية وتتطلب التحقق محلياً.'),m);
 console.log(lang,W+'x'+H,'svg',m.svgBox.join(','),'btnBottom',m.btnBottom,'eyebrowTop',m.eyebrowTop);
 await p.screenshot({path:`${OUT}/${lang}_${W}x${H}.png`});
 ck(lang+W+' no errors',!errs.length,errs);await ctx.close()}
{const ctx=await b.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});const p=await ctx.newPage();await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(300);
 const r=await p.evaluate(()=>[getComputedStyle(document.querySelector('.logo .rotor')).animationName,getComputedStyle(document.querySelector('.logo .w1')).animationName,getComputedStyle(document.querySelector('.hero-copy h1')).animationName]);ck('reduced motion: logo and fade static',r.every(x=>x==='none'),r);await ctx.close()}
console.log(bad?'FAILURES '+bad:'ALL CHECKS PASS');await b.close()})()
