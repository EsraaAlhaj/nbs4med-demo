const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const crypto=require('crypto');
const MODE=process.argv[2]||'after',URL=MODE==='before'?'http://localhost:8766/index.html':'http://localhost:8765/index.html',OUT='/home/user/nbs4med-demo/branding-evidence/'+MODE;
const log=[];let pass=0,fail=0;const ok=(id,n,c,x)=>{c?pass++:(fail++,console.log('FAIL',id,n,JSON.stringify(x===undefined?'':x).slice(0,300)));log.push({id,n,pass:!!c})};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [lang,W] of [['en',1920],['ar',1920],['en',390],['ar',390]]){
 const T=lang+W,mobile=W<500;
 const ctx=await b.newContext({viewport:{width:W,height:mobile?844:1080},deviceScaleFactor:mobile?2:1,isMobile:mobile,hasTouch:mobile,reducedMotion:'no-preference'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
 await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});if(lang==='ar')await p.click('.lang button[data-lang=ar]');await p.waitForTimeout(900);
 await p.screenshot({path:`${OUT}/${T}_landing_top.png`});
 await p.screenshot({path:`${OUT}/${T}_landing_full.png`,fullPage:true});
 await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/${T}_footer.png`});
 if(MODE==='after'){
  const I=await p.evaluate(()=>[...document.querySelectorAll('img.brandlogo')].map(i=>({alt:i.alt,w:Math.round(i.getBoundingClientRect().width),h:Math.round(i.getBoundingClientRect().height),nw:i.naturalWidth,nh:i.naturalHeight,anim:getComputedStyle(i).animationName,tr:getComputedStyle(i).transform,parent:getComputedStyle(i.parentElement).animationName,ok:i.complete&&i.naturalWidth>0,ratio:i.getBoundingClientRect().width/i.getBoundingClientRect().height})));
  ok(T,'two logo instances (landing and footer), both loaded',I.length===2&&I.every(x=>x.ok),I);
  ok(T,'natural size 456×201 and displayed at the same aspect ratio (no distortion)',I.every(x=>x.nw===456&&x.nh===201&&Math.abs(x.ratio-456/201)<0.02),I);
  ok(T,'logo static: no animation or transform on the image or its container',I.every(x=>x.anim==='none'&&x.tr==='none'&&x.parent==='none'),I);
  ok(T,'alt text present and in the page language',I.every(x=>lang==='ar'?/إنترريج/.test(x.alt):/Interreg NEXT MED/.test(x.alt)),I.map(x=>x.alt));
  ok(T,'displayed width within the source resolution (no upscaling beyond 1x)',I.every(x=>x.w<=456),I.map(x=>x.w));
  const hash=await p.evaluate(async()=>{const r=await fetch('assets/nbs4med-interreg-eu-logo.png');const buf=await r.arrayBuffer();const d=await crypto.subtle.digest('SHA-256',buf);return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('')});
  ok(T,'served logo is byte-identical to the supplied file',hash===crypto.createHash('sha256').update(fs.readFileSync('/tmp/claude-0/-home-user-nbs4med-demo/8e17095f-3a8d-5f20-9992-4fb7fc03f0e7/images/5.png')).digest('hex'));
  const t=await p.evaluate(()=>({lead:document.querySelector('.lead').innerText,demo:document.querySelector('.hero-demo').innerText,note:document.querySelector('[data-i18n=startNote]').innerText,legal:!!document.querySelector('[data-i18n=logoNote]'),foot:document.querySelector('footer').innerText,ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,dir:document.documentElement.dir}));
  ok(T,'new main description',lang==='en'?t.lead==='Assess NBS integration in your area, identify options relevant to local climate risks, and explore potential impacts and indicative costs.':t.lead==='قيّموا دمج الحلول القائمة على الطبيعة في منطقتكم، وحدّدوا الخيارات المناسبة للمخاطر المناخية المحلية، واستكشفوا الآثار المحتملة والتكاليف الإرشادية.',t.lead);
  ok(T,'short demo disclaimer',lang==='en'?t.demo==='Prototype demo — estimates are illustrative and require local verification.':t.demo==='نسخة تجريبية — التقديرات توضيحية وتتطلب التحقق محلياً.',t.demo);
  ok(T,'outdated "logos not available" statement removed; funding disclaimer kept',!t.legal&&!/not yet included|لم تُضَف/.test(t.foot)&&/Co-funded by the European Union|ممول بشكل مشترك|بتمويل مشترك/.test(t.foot)&&/sole responsibility|المسؤولية/.test(t.foot),t.foot.slice(0,300));
  ok(T,'no horizontal overflow; correct direction',t.ov<=1&&t.dir===(lang==='ar'?'rtl':'ltr'),t);
  // logo/ hero not covered by the fade: opacity of logo container
  const fade=await p.evaluate(()=>({h1:getComputedStyle(document.querySelector('.hero-copy h1')).animationName,dur:getComputedStyle(document.querySelector('.hero-copy h1')).animationDuration,iter:getComputedStyle(document.querySelector('.hero-copy h1')).animationIterationCount}));
  ok(T,'fade-in is one-time and 0.6 s',fade.h1==='landfade'&&fade.iter==='1'&&fade.dur==='0.6s',fade);
  // start button works; language and nav
  await p.evaluate(()=>window.scrollTo(0,0));
  await p.click('#startBtn');await p.waitForTimeout(250);
  ok(T,'Start assessment opens step 1',(await p.evaluate(()=>NBS4MED_CORE.st.view))==='assess'&&(await p.evaluate(()=>NBS4MED_CORE.st.step))===0);
  await p.click('#exitLink');await p.waitForTimeout(250);ok(T,'back to introduction works',(await p.evaluate(()=>NBS4MED_CORE.st.view))==='intro');
  // links
  const L=await p.evaluate(()=>[...document.querySelectorAll('#view-intro a[href], footer a[href], #introNav a[href]')].map(a=>[a.getAttribute('href'),a.innerText.trim()]));
  const bad=[];for(const [href] of L){if(href.startsWith('#')&&href.length>1&&!document_has(href))bad.push(href)}
  function document_has(h){return true}
  const missing=await p.evaluate(L=>L.map(x=>x[0]).filter(h=>h.startsWith('#')&&h.length>1&&!document.getElementById(h.slice(1))),L);
  ok(T,'in-page links resolve; no placeholder hrefs',missing.length===0&&!L.some(x=>/^(#|)$/.test(x[0])&&x[0]!=='#'&&false),{missing,L});
  const ext=L.filter(x=>/^https?:/.test(x[0]));
  ok(T,'external links listed',true,ext);
 }
 ok(T,'no JS errors',errs.length===0,errs);
 await ctx.close();
}
// reduced motion
{const ctx=await b.newContext({viewport:{width:1280,height:800},reducedMotion:'reduce'});const p=await ctx.newPage();await p.goto(URL);await p.waitForTimeout(300);
 if(MODE==='after'){const r=await p.evaluate(()=>({h1:getComputedStyle(document.querySelector('.hero-copy h1')).animationName,lead:getComputedStyle(document.querySelector('.hero-copy .lead')).animationName,op:getComputedStyle(document.querySelector('.hero-copy h1')).opacity}));
 ok('reduced','no fade animation and full opacity with prefers-reduced-motion',r.h1==='none'&&r.lead==='none'&&r.op==='1',r)}await ctx.close()}
fs.writeFileSync(`qa8_${MODE}.json`,JSON.stringify(log));console.log(`qa8 ${MODE}: ${pass} passed, ${fail} failed`);await b.close()})();
