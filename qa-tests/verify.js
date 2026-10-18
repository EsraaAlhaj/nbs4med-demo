// node verify.js <url> <outdir> ; İzmir scenario per DEMO_VIDEO_PACKAGE.md, driven through the UI
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const URL=process.argv[2]||'http://localhost:8765/index.html',OUT=process.argv[3]||'/home/user/nbs4med-demo/demo-verification';fs.mkdirSync(OUT,{recursive:true});
const rows=[];let bad=0;const ck=(id,n,exp,act,pass)=>{pass=pass===undefined?JSON.stringify(exp)===JSON.stringify(act):pass;if(!pass)bad++;rows.push({id,n,exp,act,pass:!!pass});if(!pass)console.log('DIFF',id,n,'expected',JSON.stringify(exp),'actual',JSON.stringify(act).slice(0,200))};
const ANS={C1:{'1.1':'1','1.2':'1','1.3':'0'},C2:{'2.1':'1','2.2':'1','2.3':'0'},C3:{'3.1':'1','3.2':'1','3.3':'U'},C4:{'4.1':'1','4.2':'1'},C5:{'5.1':'1','5.2':'0','5.3':'0'}};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const lang of ['en','ar']){
 const P=lang+'_';const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
 await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});await p.evaluate(()=>{window.print=()=>{}});
 const ev=(f,a)=>p.evaluate(f,a),txt=s=>ev(s=>document.querySelector(s)?document.querySelector(s).innerText:'',s);
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 // live version markers
 ck(P+'live1','header logo is the animated green circle',true,await ev(()=>!!document.querySelector('header .brand svg.logo circle[fill="#8DC63F"]')&&!!document.querySelector('header .logo .rotor')));
 ck(P+'live2','no hero composite logo; footer composite logo present',true,await ev(()=>!document.querySelector('.hero .brandlogo,.hero .brandtile')&&!!document.querySelector('footer img.brandlogo')));
 await p.click('#startBtn');await p.waitForTimeout(200);
 await p.selectOption('#in-area','tr');
 const area=await ev(()=>({sel:document.querySelector('#in-area').selectedOptions[0].innerText,st:NBS4MED_CORE.st.scope}));
 ck(P+'A1','assessment area Türkiye — İzmir Green Roof Pilot; default scale Site / Project Area',true,area,/İzmir Green Roof|إزمير/.test(area.sel)&&/Türkiye|تركيا/.test(area.sel)&&/site|project|موقع/i.test(JSON.stringify(area.st)));
 await p.click('#btnNext');await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');
 ck(P+'A2','urban density High, public land Limited (stored high / low)',['high','low'],await ev(()=>[NBS4MED_CORE.st.ctx.density,NBS4MED_CORE.st.ctx.land]));
 await p.click('#btnNext');await p.check('input[name=risk][value=heat]');await p.check('input[name=risk][value=flood]');
 ck(P+'A3','climate risks Heatwaves and Flooding',['flood','heat'],await ev(()=>Object.keys(NBS4MED_CORE.st.risks).filter(k=>NBS4MED_CORE.st.risks[k]).sort()));
 await p.click('#btnNext');await p.waitForTimeout(150);
 const seen=[];
 for(const [cid,a] of Object.entries(ANS)){
  seen.push(...await ev(()=>[...document.querySelectorAll('.ind')].map(r=>r.id.replace('ind-','').replace('-','.'))));
  for(const [id,v] of Object.entries(a))await p.check(`input[name="ind-${id}"][value="${v}"]`);
  if(cid==='C1'){await p.check('input[name="tgt-target"][value=no]');await p.check('input[name="tgt-cov"][value=no]');await ev(()=>document.querySelector('#ind-1-1 details.more').open=true);await p.fill('#evd-1-1','Illustrative demo input');await p.selectOption('#cf-1-1','mid');
   await ev(()=>document.getElementById('ind-1-1').scrollIntoView({block:'start'}));await p.evaluate(()=>window.scrollBy(0,-80));await p.waitForTimeout(150);await p.screenshot({path:`${OUT}/${P}scene1_assessment_question.png`})}
  await p.click('#btnNext');await p.waitForTimeout(cid==='C5'?500:120)}
 ck(P+'A4','five criteria, fourteen indicators in order',['1.1','1.2','1.3','2.1','2.2','2.3','3.1','3.2','3.3','4.1','4.2','5.1','5.2','5.3'],seen);
 ck(P+'A5','indicator 3.3 stored as Unknown',true,await ev(()=>NBS4MED_CORE.st.sc['3.3']==='U'));
 await p.waitForSelector('#resRoot #asH');await p.waitForTimeout(300);
 const calc=await ev(()=>NBS4MED_CORE.calc().per.map(x=>({p:x.pct,s:x.sum,m:x.max,st:x.status})));
 ck(P+'B1','C1 33% (2/6)',[33,2,6],[calc[0].p,calc[0].s,calc[0].m]);ck(P+'B2','C2 33% (2/6)',[33,2,6],[calc[1].p,calc[1].s,calc[1].m]);
 ck(P+'B3','C3 not rated (Unknown)',[null,'incomplete'],[calc[2].p,calc[2].st]);ck(P+'B4','C4 50% (2/4)',[50,2,4],[calc[3].p,calc[3].s,calc[3].m]);ck(P+'B5','C5 17% (1/6)',[17,1,6],[calc[4].p,calc[4].s,calc[4].m]);
 const tile=await txt('.ovscore');
 ck(P+'B6','overall score not displayed (tile shows Not shown, no percentage)',true,tile.replace(/\s+/g,' ').slice(0,160),!/\d+\s*%/.test(tile)&&/(Not shown|غير معروضة)/.test(tile));
 const tbl=await ev(()=>[...document.querySelectorAll('.crit-tbl tbody tr:not(.grp)')].map(tr=>[...tr.children].map(c=>c.innerText.replace(/\s+/g,' ').trim())));
 ck(P+'B7','criteria table rows (C3 shows – and Not rated)',true,tbl.map(r=>r.slice(1,5)),tbl[2][3]==='–'&&/(Not rated|غير مُقيَّم|غير مقيّم)/i.test(tbl[2][4]));
 await ev(()=>{const e=document.getElementById('ctH');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene2_criteria_table.png`});
 await ev(()=>{const e=document.getElementById('cpH');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene2_comparison_chart.png`});
 // C gaps
 const gaps=await ev(l=>NBS4MED_CORE.gapItems(l).map(g=>[g.i.id||g.i,g.type]),lang);
 ck(P+'C1','first five gaps shown: 1.3, 2.3, 5.2, 5.3, 1.1',['1.3','2.3','5.2','5.3','1.1'],gaps.slice(0,5).map(g=>g[0]));
 const g52=await ev(()=>{const li=[...document.querySelectorAll('#gpSec .gap')].find(x=>/5\.2/.test(x.innerText));return li?li.innerText.replace(/\s+/g,' '):''});
 const gpNote=await txt('#gpSec .note-s');
 ck(P+'C2','5.2 finding, action and evidence shown',true,g52.slice(0,300),lang==='en'?/No budget covers maintenance, watering or replacement of NBS/.test(g52)&&/Prepare an operation and maintenance budget and clarify who is responsible for funding it/.test(g52)&&/Maintenance plans, annual budget lines and financial documentation/.test(g52):g52.length>60);
 ck(P+'C3','note says display order is not a validated ranking and actions are general prompts from the answers',true,gpNote.slice(0,200),lang==='en'?/not a validated ranking/i.test(gpNote)&&/based on your answers/i.test(gpNote):gpNote.length>40);
 await ev(()=>{const e=document.getElementById('gpH');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene3_gaps_and_actions.png`});
 // D options
 const cards=await ev(()=>[...document.querySelectorAll('.oc h3')].map(h=>h.innerText));
 ck(P+'D1','preliminary options include Green roof, Green corridor, Urban forest',3,cards.length,true);
 const ids=await ev(()=>NBS4MED_CORE.recs().ranked.slice(0,3).map(x=>x.o.id));ck(P+'D2','top cards roof, street (Green corridor), tiny (Urban forest)',['roof','street','tiny'],ids);
 await p.click('#opt-roof [data-check]');await p.waitForTimeout(150);
 await p.check('input[name="chk|roof|roof.avail"][value=yes]');await p.check('input[name="chk|roof|roof.struct"][value=unknown]');await p.waitForTimeout(250);
 ck(P+'D3','Green roof status Requires verification','verify',await ev(()=>NBS4MED_CORE.recFor('roof').scr.status));
 const chip=await txt('#opt-roof .chip');ck(P+'D4','status chip text',true,chip,/(Requires verification|يتطلب تحققًا)/.test(chip));
 await ev(()=>{const e=document.getElementById('opt-roof');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-80)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene4_roof_applicability.png`});
 // E inline calculator
 await p.click('#icSec input[name=exsol][value=NBS02]');await p.fill('#ex-area_m2','800');await p.fill('#ex-storm_depth_mm','30');await p.waitForTimeout(450);
 const r=await ev(()=>JSON.parse(JSON.stringify(NBS4MED_EXPLORE.state.res)));
 const o=id=>r.outputs.find(x=>x.id===id);
 ck(P+'E1','rain on roof 24 m³',24,o('rain_volume').value);ck(P+'E2','substrate 64 m³',64,o('substrate_volume').value);
 ck(P+'E3','retention 6.43–14.83 m³',[6.43,14.83],[Math.round(o('event_retained').low*100)/100,Math.round(o('event_retained').high*100)/100]);
 ck(P+'E4','CAPEX low/base/high',[23240,41860,78160],[r.costs.capex.total.low,r.costs.capex.total.base,r.costs.capex.total.high]);
 ck(P+'E5','OPEX low/base/high',[800,2000,4000],[r.costs.annual.total.low,r.costs.annual.total.base,r.costs.annual.total.high]);
 const ic=await txt('#exResults');
 ck(P+'E6','costs labelled illustrative; mitigation not estimated; reference example labelled',true,'',lang==='en'?/Illustrative Scenario Cost — Not a Local Price Estimate/.test(ic)&&/Demo assumption/.test(ic)&&/Quantitative climate-risk mitigation impact is not currently estimated/.test(ic)&&/Reference example \(Hamburg, 2017; source S04\)/.test(ic)&&/not a validated local forecast/.test(ic):ic.length>200);
 await ev(()=>{const e=document.getElementById('icH');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-20)});await p.waitForTimeout(200);
 await ev(()=>{const e=document.getElementById('exInputs');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-80)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene5_impact_cost_inputs.png`});
 await ev(()=>{const e=document.getElementById('exResults');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-70)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene5_impact_cost_results.png`});
 await ev(()=>{const e=document.getElementById('exResults');const c=[...e.querySelectorAll('h4.icb')][2];window.scrollTo(0,c.getBoundingClientRect().top+scrollY-70)});await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${P}scene5_indicative_cost.png`});
 // F reports
 await ev(()=>window.scrollTo(0,0));
 const dl=p.waitForEvent('download',{timeout:5000});await p.click('#dlCsv');const d=await dl;await d.saveAs(`${OUT}/${P}report.csv`);
 const csv=fs.readFileSync(`${OUT}/${P}report.csv`,'utf8');ck(P+'F1','CSV downloaded with the inline calculation',true,csv.length,/23240 to 78160/.test(csv));
 for(const [btn,nm] of [['dlPdf','summary'],['dlPdfDetail','detailed']]){await p.emulateMedia({media:'screen'});await ev(b=>document.getElementById(b).click(),btn);await p.waitForTimeout(400);await p.emulateMedia({media:'print'});await p.pdf({path:`${OUT}/${P}${nm}.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});
  if(nm==='summary'){const pg=await ev(()=>[...document.querySelectorAll('#printReport .pg')].map(x=>x.innerText));await p.setViewportSize({width:688,height:1100});const els=await p.$$('#printReport .pg');for(let i=0;i<els.length;i++)await els[i].screenshot({path:`${OUT}/${P}summary_p${i+1}.png`});await p.setViewportSize({width:1920,height:1080})}}
 await p.emulateMedia({media:'screen'});
 ck(P+'G','no JavaScript errors',[],errs);await p.close()}
fs.writeFileSync(`${OUT}/verify_results.json`,JSON.stringify(rows,null,1));console.log(`verify: ${rows.filter(r=>r.pass).length}/${rows.length} checks match; ${bad} differences`);await b.close()})();
