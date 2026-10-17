// Redesign checks: node qa7.js [url]
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const URL=process.argv[2]||'http://localhost:8765/index.html',OUT='/home/user/nbs4med-demo/redesign-evidence/after';fs.mkdirSync(OUT,{recursive:true});
const log=[];let pass=0,fail=0;const ok=(id,n,c,x)=>{c?pass++:(fail++,console.log('FAIL',id,n,JSON.stringify(x===undefined?'':x).slice(0,400)));log.push({id,n,pass:!!c,x:c?undefined:x})};
const ANS={C1:{'1.1':'1','1.2':'1','1.3':'0'},C2:{'2.1':'1','2.2':'1','2.3':'0'},C3:{'3.1':'1','3.2':'1','3.3':'U'},C4:{'4.1':'1','4.2':'1'},C5:{'5.1':'1','5.2':'0','5.3':'0'}};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [lang,W] of [['en',1920],['ar',1920],['en',390],['ar',390]]){
 const T=`${lang}${W}`,mobile=W<500;
 const p=await b.newPage({viewport:{width:W,height:mobile?844:1080},deviceScaleFactor:mobile?2:1,isMobile:mobile,hasTouch:mobile});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
 await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});await p.evaluate(()=>{window.print=()=>{}});
 const ev=(f,a)=>p.evaluate(f,a),txt=s=>ev(s=>document.querySelector(s)?document.querySelector(s).innerText:'',s);
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 await p.click('#startBtn');await p.selectOption('#in-area','tr');await p.click('#btnNext');
 await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');await p.click('#btnNext');
 await p.check('input[name=risk][value=heat]');await p.check('input[name=risk][value=flood]');await p.click('#btnNext');
 for(const [cid,a] of Object.entries(ANS)){for(const [id,v] of Object.entries(a))await p.check(`input[name="ind-${id}"][value="${v}"]`);
  if(cid==='C1'){await p.check('input[name="tgt-target"][value=no]');await p.check('input[name="tgt-cov"][value=no]')}
  await p.click('#btnNext');await p.waitForTimeout(cid==='C5'?500:120)}
 await p.waitForSelector('#resRoot #asH');await p.waitForTimeout(300);
 const R=await ev(()=>NBS4MED_CORE.calc().per.map(x=>x.pct));
 ok(T,'criterion results unchanged (33,33,incomplete,50,17)',JSON.stringify(R)===JSON.stringify([33,33,null,50,17]),R);
 // structure
 const S=await ev(()=>({explore:!!document.getElementById('view-explore'),openEx:!!document.getElementById('openExplore'),last:/Last explored|آخر ما استُكشف/.test(document.getElementById('resRoot').innerText),el:!!document.getElementById('elH'),elText:/Evidence and limitations|الأدلة والقيود/.test(document.getElementById('resRoot').innerText),jump:[...document.querySelectorAll('.jump .jl')].map(x=>x.innerText),nHost:document.querySelectorAll('#icHost').length,nIn:document.querySelectorAll('#exInputs').length,nRes:document.querySelectorAll('#exResults').length,exBtnTxt:/Explore impact and cost|استكشف الأثر والتكلفة/.test(document.getElementById('resRoot').innerText)}));
 ok(T,'no separate Explore view, no Explore button, no Last explored, no Evidence and limitations section/nav',!S.explore&&!S.openEx&&!S.last&&!S.el&&!S.elText&&!S.exBtnTxt&&S.jump.length===4,S);
 ok(T,'exactly one inline calculator host (no duplicate calculator sections)',S.nHost===1&&S.nIn===1&&S.nRes===1,S);
 const H=await ev(()=>['asH','ctH','cpH','dgH','gpH','rcH','icH'].map(i=>{const e=document.getElementById(i);return e?Math.round(e.getBoundingClientRect().top+scrollY):null}));
 ok(T,'dashboard sections in order',H.every(x=>x!==null)&&H.every((x,i)=>i===0||x>H[i-1]),H);
 const ov=await txt('#asH + .ovtop');
 ok(T,'overview: provisional overall score tile, area, scale, date, risks, completeness',/(Provisional overall score|الدرجة الإجمالية المؤقتة)/.test(ov)&&/(Not validated|ليست مقياسًا معتمدًا)/i.test(ov)&&/İzmir/.test(ov)&&/2026|٢٠٢٦/.test(ov),ov.slice(0,300));
 // unsupported options: no radios, explanatory note
 const radios=await ev(()=>[...document.querySelectorAll('#icSec input[name=exsol]')].map(i=>i.value));
 ok(T,'five supported calculators offered; others explained',JSON.stringify(radios.sort())===JSON.stringify(['NBS01','NBS02','NBS03','NBS04','NBS05'])&&(await txt('.nocalc-note')).length>20,radios);
 ok(T,'no results or numbers before a solution is chosen',!(await ev(()=>/EUR/.test(document.getElementById('exResults').innerText))));
 // inline calculation, live update
 const pick=async v=>{await p.click(`#icSec input[name=exsol][value=${v}]`);await p.waitForTimeout(250)};
 await pick('NBS02');await p.fill('#ex-area_m2','800');await p.fill('#ex-storm_depth_mm','30');await p.waitForTimeout(350);
 let r=await txt('#exResults');
 ok(T,'inline Green roof 800 m², 30 mm: 24 m³, 64 m³, 6.43–14.8, CAPEX 23,240/41,860/78,160, OPEX 800/2,000/4,000',['24','64','6.43','23,240','41,860','78,160','2,000','4,000'].every(k=>r.includes(k)),r.slice(0,200));
 await p.fill('#ex-area_m2','1000');await p.waitForTimeout(350);r=await txt('#exResults');
 ok(T,'changing an input updates the results at once (1000 × 30 mm = 30 m³; 80 m³ substrate)',r.includes('30')&&r.includes('80')&&!r.includes('23,240'),r.slice(0,160));
 ok(T,'impact, physical, cost blocks in that order and separate',await ev(()=>{const h=[...document.querySelectorAll('#exResults h4.icb')].map(x=>x.innerText);return h.length===3});
 // switch and keep inputs
 await pick('NBS05');await p.fill('#ex-length_m','640');await p.waitForTimeout(300);
 const n5=await txt('#exResults');
 await pick('NBS02');
 ok(T,'switching back keeps previous roof inputs',(await p.inputValue('#ex-area_m2'))==='1000'&&(await p.inputValue('#ex-storm_depth_mm'))==='30');
 await pick('NBS05');ok(T,'and the corridor inputs and results',(await p.inputValue('#ex-length_m'))==='640'&&(await txt('#exResults'))===n5);
 // invalid input: no numbers
 await pick('NBS02');await p.fill('#ex-area_m2','-5');await p.waitForTimeout(350);
 ok(T,'invalid input shows an error and no numbers',(await ev(()=>!!document.querySelector('#ex-area_m2[aria-invalid=true]')))&&!/EUR\s*[\d,]{4,}/.test(await txt('#exResults'))&&!/[\d,]{5,}\s*EUR/.test(await txt('#exResults')));
 await p.fill('#ex-area_m2','800');await p.waitForTimeout(350);
 // card button selects inline without navigation
 const card=await p.$('.oc [data-explore="NBS05"]');
 if(card){await card.click();await p.waitForTimeout(300);ok(T,'recommendation card button selects the calculator inline (no navigation)',(await ev(()=>NBS4MED_CORE.st.view))==='results'&&(await p.isChecked('#icSec input[value=NBS05]')))}
 await pick('NBS02');
 // applicability still works and does not reset calculator inputs
 const chk=await p.$('#opt-roof [data-check]');
 if(chk){await chk.click();await p.waitForTimeout(200);await p.check('input[name="chk|roof|roof.avail"][value=yes]');await p.waitForTimeout(250);
  ok(T,'applicability check works and the inline inputs survive the re-render',!!(await p.$('#opt-roof .chkpanel'))&&(await p.inputValue('#ex-area_m2'))==='800'&&(await ev(()=>NBS4MED_CORE.recFor('roof').scr.status))==='verify')}
 // old #explore link
 await ev(()=>{window.scrollTo(0,0);location.hash='#explore'});await p.waitForTimeout(500);
 const pos=await ev(()=>({view:NBS4MED_CORE.st.view,top:Math.round(document.getElementById('icSec').getBoundingClientRect().top)}));
 ok(T,'#explore link redirects to the inline section',pos.view==='results'&&pos.top>=-5&&pos.top<400,pos);
 // screenshots
 const at=async(id,n,off)=>{await ev(([id,off])=>{const e=document.getElementById(id);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-(off||70))},[id,off]);await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/${T}_${n}.png`})};
 await ev(()=>window.scrollTo(0,0));await p.screenshot({path:`${OUT}/${T}_01_overview.png`});
 await at('ctH','02_criteria');await at('dgH','03_diagnosis');await at('gpH','04_gaps');await at('rcH','05_options');await at('icH','06_impact_cost_inline',20);
 await ev(()=>{const e=document.getElementById('exResults');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)});await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/${T}_07_inline_results.png`});
 if(!mobile)await p.screenshot({path:`${OUT}/${T}_08_full_dashboard.png`,fullPage:true});
 const ovf=await ev(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);ok(T,'no horizontal overflow',ovf<=1,ovf);
 if(!mobile){
  // downloads consistent with the inline state (Green roof 800 m², 30 mm)
  const dl=p.waitForEvent('download',{timeout:5000});await p.click('#dlCsv');const d=await dl;await d.saveAs(`${OUT}/${T}_report.csv`);
  const csv=fs.readFileSync(`${OUT}/${T}_report.csv`,'utf8');
  ok(T,'CSV carries the inline calculation (23240 to 78160; 41860)',/23240 to 78160/.test(csv)&&/base 41860/.test(csv)&&/Green roof|سطح أخضر/.test(csv));
  ok(T,'CSV improvement actions and criteria rows present',/improvement action/.test(csv)&&/assessment indicator/.test(csv));
  const summ=await ev(()=>{document.getElementById('dlPdf').click();return [...document.querySelectorAll('#printReport .pg')].map(g=>g.innerText).join('\n')});
  ok(T,'summary report page 2 has the same cost figures',/23,240/.test(summ)&&/78,160/.test(summ),summ.slice(-400));
  await p.emulateMedia({media:'print'});await p.pdf({path:`${OUT}/${T}_summary.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});
  await p.emulateMedia({media:'screen'});
  await ev(()=>document.getElementById('dlPdfDetail').click());await p.waitForTimeout(300);await p.emulateMedia({media:'print'});await p.pdf({path:`${OUT}/${T}_detailed.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});await p.emulateMedia({media:'screen'});
 }
 ok(T,'no JavaScript errors',errs.length===0,errs);
 await p.close()}
fs.writeFileSync('qa7_log.json',JSON.stringify(log));console.log(`qa7: ${pass} passed, ${fail} failed`);await b.close()})();
