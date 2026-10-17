// usage: node demo.js <fileurl> <lang> <outdir>
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const FILE=process.argv[2]||'file:///home/user/nbs4med-demo/index.html',LANG=process.argv[3]||'en',OUT=process.argv[4]||'demo';fs.mkdirSync(OUT,{recursive:true});
let pass=0,fail=0;const ok=(n,c,x)=>{c?pass++:(fail++,console.log('FAIL',n,x!==undefined?JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
await p.goto(FILE);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
const shot=async n=>{await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${LANG}_${n}.png`})};
const full=async n=>{await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${LANG}_${n}_full.png`,fullPage:true})};
const txt=s=>p.evaluate(s=>document.querySelector(s).innerText,s);const ev=(f,a)=>p.evaluate(f,a);
const rec={};
if(LANG==='ar')await p.click('.lang button[data-lang=ar]');
await shot('01_landing');
await p.click('#startBtn');await p.waitForTimeout(200);
// Step 1
await p.selectOption('#in-area','tr');await shot('02_step1_area');
rec.step1=await txt('#stepPanel');
await p.click('#btnNext');await p.waitForTimeout(150);
// Step 2
await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');await shot('03_step2_context');
await p.click('#btnNext');await p.waitForTimeout(150);
// Step 3
await p.check('input[name=risk][value=heat]');await p.check('input[name=risk][value=flood]');await shot('04_step3_risks');
await p.click('#btnNext');await p.waitForTimeout(150);
// Steps 4-8: criteria C1..C5 (illustrative answers)
const ANS={C1:{'1.1':'1','1.2':'1','1.3':'0'},C2:{'2.1':'1','2.2':'1','2.3':'0'},C3:{'3.1':'1','3.2':'1','3.3':'U'},C4:{'4.1':'1','4.2':'1'},C5:{'5.1':'1','5.2':'0','5.3':'0'}};
let n=5;
for(const [cid,ans] of Object.entries(ANS)){
  for(const [id,v] of Object.entries(ans))await p.check(`input[name="ind-${id}"][value="${v}"]`);
  if(cid==='C1'){await p.check('input[name="tgt-target"][value=no]');await p.check('input[name="tgt-cov"][value=no]');await ev(()=>document.querySelector('#ind-1-1 details.more').open=true);await p.fill('#evd-1-1','Illustrative demo input');await p.selectOption('#cf-1-1','mid')}
  await shot('0'+n+'_'+cid);n++;
  if(cid==='C5'){await p.click('#btnNext');await p.waitForSelector('#resRoot #asH',{timeout:5000});await p.waitForTimeout(300)}
  else{await p.click('#btnNext');await p.waitForTimeout(150)}
}
ok('reached results after C5',(await ev(()=>NBS4MED_CORE.st.view))==='results');
await p.evaluate(()=>window.scrollTo(0,0));await shot('10_dashboard_overview');
const at=async(id,n,off)=>{await ev(([id,off])=>{const e=document.getElementById(id);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-(off||80))},[id,off]);await shot(n)};
await at('ctH','11_criteria_table');
await at('cpH','12_criteria_chart');
await ev(()=>{document.querySelector('details[data-rk="dg-C3"]').open=true});await at('dgH','13_indicator_diagnosis');
await at('gpH','14_gaps_and_actions');
rec.results=await txt('#resRoot');
rec.cards=await ev(()=>[...document.querySelectorAll('.oc')].map(c=>c.querySelector('h3').innerText));
rec.order=await ev(()=>NBS4MED_CORE.recs().ranked.map(x=>[x.o.id,x.s]));
await full('10_results_overview');
await at('rcH','15_preliminary_options');
// applicability for Green roof
const roofCard=p.locator('#opt-roof');
const hasCard=await roofCard.count();
rec.roofInCards=hasCard>0;
if(hasCard){await roofCard.locator('[data-check]').click();}else{await p.click('details[data-rk=other] summary');await p.locator('details[data-rk=other] [data-check="roof"]').click();}
await p.waitForTimeout(150);
await p.check('input[name="chk|roof|roof.avail"][value=yes]');
await p.check('input[name="chk|roof|roof.struct"][value=unknown]');
await ev(()=>{const el=document.querySelector('.chkpanel');el.scrollIntoView({block:'start'})});await shot('17_applicability_requires_verification');
rec.status1=await ev(()=>NBS4MED_CORE.recFor('roof').scr.status);
rec.panel1=await txt('.chkpanel');
// explore
await p.click('[data-explore="NBS02"]');await p.waitForSelector('#exResults');await p.waitForTimeout(250);
ok('explore opened for Green roof',await p.isChecked('.sol input[value=NBS02]'));
await shot('18_explore_inputs_default');
await p.fill('#ex-area_m2','800');await p.fill('#ex-storm_depth_mm','30');await p.waitForTimeout(400);
rec.calc2=await ev(()=>{const r=NBS4MED_CORE.calc();return {per:r.per.map(p=>({status:p.status,pct:p.pct,sum:p.sum,max:p.max,scored:p.scored,unk:p.unk})),ov:r.ov}});rec.exportInputs=await ev(()=>NBS4MED_EXPLORE.state.res.inputs);
await ev(()=>document.querySelector('#exResults').scrollIntoView({block:'start'}));await shot('19_explore_results');
rec.explore=await txt('#exResults');
rec.res=await ev(()=>{const r=NBS4MED_EXPLORE.state.res;return {inputs:r.inputs,outputs:r.outputs.map(o=>({id:o.id,unit:o.unit,value:o.value,low:o.low,base:o.base,high:o.high,basis:o.basis})),capex:r.costs.capex.total,annual:r.costs.annual.total,ref:r.reference_cost&&r.reference_cost.scaled,refRange:r.reference_cost&&r.reference_cost.area_range,currency:r.costs.currency,price_year:r.costs.price_year}});
await ev(()=>window.scrollTo(0,document.body.scrollHeight/2));await shot('20_explore_results_lower');await full('20_explore_full');
// back to results with sections 3 and 4
await p.click('#exBack');await p.waitForTimeout(250);
await at('icH','21_impact_and_cost_on_results');
rec.sec34=await ev(()=>document.querySelector('#icSec').innerText);
// summary report
await ev(()=>{window.print=()=>{}});await p.click('#dlPdf');await p.waitForTimeout(300);
await p.emulateMedia({media:'print'});await p.setViewportSize({width:688,height:1100});
const pages=await ev(()=>[...document.querySelectorAll('#printReport .pg')].map(g=>g.innerText));
rec.summary=pages;
const el=await p.$$('#printReport .pg');for(let i=0;i<el.length;i++)await el[i].screenshot({path:`${OUT}/${LANG}_22_summary_p${i+1}.png`});
await p.pdf({path:`${OUT}/${LANG}_summary.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});
await p.emulateMedia({media:'screen'});await p.setViewportSize({width:1920,height:1080});
await p.click('#dlPdfDetail');await p.waitForTimeout(400);await p.emulateMedia({media:'print'});await p.pdf({path:`${OUT}/${LANG}_detailed.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});await p.emulateMedia({media:'screen'});
const dlp=p.waitForEvent('download',{timeout:5000});await p.click('#dlCsv');const dd=await dlp;await dd.saveAs(`${OUT}/${LANG}_report.csv`);
rec.csv=await ev(()=>NBS4MED_EXPLORE.csvRows().map(r=>r.join(' | ')));
rec.detailed=await ev(()=>NBS4MED_EXPLORE.reportHtml().replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));
fs.writeFileSync(`${OUT}/${LANG}_record.json`,JSON.stringify(rec,null,1));
ok('no page errors',errs.length===0,errs);
console.log(`demo ${LANG}: ${pass} passed, ${fail} failed`);await b.close()})()
