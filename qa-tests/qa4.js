const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const OUT='/home/user/nbs4med-demo/qa-evidence/mobile';fs.mkdirSync(OUT,{recursive:true});
const log=[];let pass=0,fail=0;const ok=(id,n,c,x)=>{c?pass++:(fail++,console.log('FAIL',id,n,JSON.stringify(x||'').slice(0,300)));log.push({id,n,pass:!!c})};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const lang of ['en','ar']){
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8765/index.html');await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 await p.screenshot({path:`${OUT}/${lang}_01_landing.png`});
 await p.tap('#startBtn');await p.selectOption('#in-area','tr');await p.tap('#btnNext');
 await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');await p.tap('#btnNext');
 await p.check('input[name=risk][value=heat]');await p.check('input[name=risk][value=flood]');await p.tap('#btnNext');
 const ANS={'1.1':'1','1.2':'1','1.3':'0','2.1':'1','2.2':'1','2.3':'0','3.1':'1','3.2':'1','3.3':'U','4.1':'1','4.2':'1','5.1':'1','5.2':'0','5.3':'0'};
 const CR=[['1.1','1.2','1.3'],['2.1','2.2','2.3'],['3.1','3.2','3.3'],['4.1','4.2'],['5.1','5.2','5.3']];
 for(let c=0;c<5;c++){for(const id of CR[c])await p.check(`input[name="ind-${id}"][value="${ANS[id]}"]`);
  if(c===0){await p.check('input[name="tgt-target"][value=no]');await p.check('input[name="tgt-cov"][value=no]');await p.evaluate(()=>document.getElementById('ind-1-1').scrollIntoView());await p.screenshot({path:`${OUT}/${lang}_02_assessment_cards.png`})}
  ok(lang+' mobile C'+(c+1),'no horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));
  await p.tap('#btnNext');await p.waitForTimeout(c===4?600:150)}
 await p.waitForSelector('#resRoot #asH');
 const at=async(id,n)=>{await p.evaluate(id=>{const e=document.getElementById(id);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)},id);await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/${lang}_${n}.png`})};
 await p.evaluate(()=>window.scrollTo(0,0));await p.screenshot({path:`${OUT}/${lang}_03_dashboard_top.png`});
 await at('ctH','04_criteria_table');await at('cpH','05_chart');await at('gpH','06_gaps');await at('rcH','07_options');await at('icH','08_impact_cost');await at('elH','09_evidence_limits');
 const m=await p.evaluate(()=>({ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,tbl:[...document.querySelectorAll('.tbl-wrap')].map(w=>w.scrollWidth>w.clientWidth?'scrolls':'fits'),small:[...document.querySelectorAll('button,.btn,a.btn,summary')].filter(e=>e.offsetParent&&e.getBoundingClientRect().height<32).length}));
 ok(lang+' mobile results','no page-level horizontal overflow (tables scroll inside their own wrapper)',m.ov<=1,m);
 ok(lang+' mobile results','touch targets ≥32px tall',m.small===0,m);
 // explore on mobile
 await p.tap('#icSec [data-explore="NBS02"]');await p.waitForSelector('#exResults');await p.fill('#ex-area_m2','800');await p.fill('#ex-storm_depth_mm','30');await p.waitForTimeout(400);
 await p.screenshot({path:`${OUT}/${lang}_10_explore_inputs.png`});await p.evaluate(()=>document.getElementById('exResults').scrollIntoView());await p.screenshot({path:`${OUT}/${lang}_11_explore_results.png`});
 ok(lang+' mobile explore','no page-level horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));
 ok(lang+' mobile','no JS errors',errs.length===0,errs);
 await p.close()}
console.log(`qa4: ${pass} passed, ${fail} failed`);fs.writeFileSync('qa4_log.json',JSON.stringify(log));await b.close()})();
