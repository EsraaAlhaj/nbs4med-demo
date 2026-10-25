// Real-browser journey QA (scenarios A, B). node qa3.js
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const URL='http://localhost:8765/index.html',OUT='/home/user/nbs4med-demo/qa-evidence';
const IDS=['1.1','1.2','1.3','2.1','2.2','2.3','3.1','3.2','3.3','4.1','4.2','5.1','5.2','5.3'];
const CR=[['1.1','1.2','1.3'],['2.1','2.2','2.3'],['3.1','3.2','3.3'],['4.1','4.2'],['5.1','5.2','5.3']];
const SC={
 A:{ans:{'1.1':'2','1.2':'1','1.3':'0','2.1':'2','2.2':'1','2.3':'0','3.1':'1','3.2':'2','3.3':'1','4.1':'0','4.2':'1','5.1':'2','5.2':'0','5.3':'1'},risks:['heat','flood','drought'],area:'tr'},
 B:{ans:{'1.1':'1','1.2':'U','1.3':'0','2.1':'NA','2.2':'1','2.3':'1','3.1':'2','3.2':'1','3.3':'U','4.1':'NA','4.2':'NA','5.1':'1','5.2':'2','5.3':'0'},risks:['heat','flood'],area:'tr'}};
const log=[];let pass=0,fail=0;const ok=(id,n,c,x)=>{c?pass++:(fail++,console.log('FAIL',id,n,x!==undefined?JSON.stringify(x).slice(0,400):''));log.push({id,n,pass:!!c,x:c?undefined:x})};
const expCrit=A=>CR.map(ids=>{const v=ids.map(i=>A[i]).filter(x=>x!=='NA');if(!v.length)return {st:'na'};if(v.includes('U'))return {st:'inc'};const s=v.reduce((a,x)=>a+ +x,0),m=2*v.length;return {st:'ok',sum:s,max:m,pct:Math.round(s/m*100)}});
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const ver=b.version();fs.writeFileSync('browser.txt',ver);
for(const lang of ['en','ar'])for(const [sn,S] of Object.entries(SC)){
 const T=`${sn}/${lang}`,pre=`${OUT}/${lang}_scenario${sn}`;
 const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
 await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});await p.evaluate(()=>{window.print=()=>{}});
 const ev=(f,a)=>p.evaluate(f,a);
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 await p.screenshot({path:pre+'_01_landing.png'});
 await p.click('#startBtn');await p.waitForTimeout(150);
 // Step 1 validation
 await p.click('#btnNext');await p.waitForTimeout(150);
 ok(T+' S1','validation blocks Next without Assessment Area',(await ev(()=>NBS4MED_CORE.st.step))===0&&await ev(()=>!!document.querySelector('#areaErr .inline-err')));
 await p.selectOption('#in-area',S.area);await p.click('#btnNext');await p.waitForTimeout(150);
 ok(T+' S2','moved to Site Context',(await ev(()=>NBS4MED_CORE.st.step))===1);
 await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');await p.click('#btnNext');await p.waitForTimeout(150);
 // Step 3 validation, multiple risks
 await p.click('#btnNext');await p.waitForTimeout(150);
 ok(T+' S3','validation blocks Next without a climate risk',(await ev(()=>NBS4MED_CORE.st.step))===2);
 for(const r of S.risks)await p.check(`input[name=risk][value=${r}]`);
 ok(T+' S3','multiple climate risks selectable and retained',JSON.stringify(Object.keys(await ev(()=>NBS4MED_CORE.st.risks).then(x=>Object.fromEntries(Object.entries(x).filter(([k,v])=>v)))).sort())===JSON.stringify([...S.risks].sort()));
 await p.screenshot({path:pre+'_03_risks.png'});
 await p.click('#btnNext');await p.waitForTimeout(150);
 const seen=[];
 for(let c=0;c<5;c++){
  const step=await ev(()=>NBS4MED_CORE.st.step);
  const ids=await ev(()=>[...document.querySelectorAll('.ind')].map(r=>r.id.replace('ind-','').replace('-','.')));
  seen.push(...ids);ok(T+` C${c+1}`,'indicators on page exactly as expected',JSON.stringify(ids)===JSON.stringify(CR[c]),ids);
  // Next blocked when unanswered
  await p.click('#btnNext');await p.waitForTimeout(120);
  ok(T+` C${c+1}`,'validation blocks Next while indicators unanswered',(await ev(()=>NBS4MED_CORE.st.step))===step&&await ev(()=>!!document.querySelector('.inline-err')));
  // Read more
  const id0=CR[c][0],idc=id0.replace('.','-');
  await p.click(`#ind-${idc} details.read summary`);ok(T+` ${id0}`,'Read more opens',await ev(i=>document.querySelector(`#ind-${i} details.read`).open,idc));
  if(c===0)await p.screenshot({path:pre+'_04_C1_question_cards.png'});
  await p.click(`#ind-${idc} details.read summary`);
  for(const id of CR[c]){const v=S.ans[id],k=id.replace('.','-');
   await p.click(`#ind-${k} input[value="${v}"] >> xpath=..`).catch(async()=>{await p.check(`input[name="ind-${id}"][value="${v}"]`)});
   ok(T+' '+id,'card click selects '+v,await ev(([k,v])=>document.querySelector(`#ind-${k} input[value="${v}"]`).checked,[k,v]));
   if(v==='NA'){
    ok(T+' '+id,'N/A reveals justification box',await ev(k=>!document.getElementById('just-'+k).hidden,k));
   }
   if(v!=='U'&&v!=='NA'&&id==='1.1'){await ev(k=>document.querySelector(`#ind-${k} details.more`).open=true,k);await p.fill('#evd-'+k,'Inventory report 2024');await p.selectOption('#cf-'+k,'high');await p.fill('#rat-'+k,'Based on the municipal GIS layer')}
  }
  if(CR[c].some(id=>S.ans[id]==='NA')){
   await p.click('#btnNext');await p.waitForTimeout(150);
   ok(T+` C${c+1}`,'Not applicable without justification blocks Next',(await ev(()=>NBS4MED_CORE.st.step))===step&&await ev(()=>!!document.querySelector('.na-box .inline-err')));
   for(const id of CR[c])if(S.ans[id]==='NA')await p.fill('#jin-'+id.replace('.','-'),'Not relevant to this site: no residents live in the project area');
  }
  if(c===0){await p.check('input[name="tgt-target"][value=no]').catch(()=>{});await p.check('input[name="tgt-cov"][value=no]').catch(()=>{})}
  // optional extra: 1.2 target questions exist
  await p.screenshot({path:pre+`_05_C${c+1}.png`});
  // back/forward retention
  if(c>0){await p.click('#btnBack');await p.waitForTimeout(120);
   const keep=await ev(a=>a.every(([id,v])=>{const e=document.querySelector(`#ind-${id.replace('.','-')} input[value="${v}"]`);return e&&e.checked}),CR[c-1].map(id=>[id,S.ans[id]]));
   ok(T+` C${c}`,'Back preserves previous answers',keep);
   await p.click('#btnNext');await p.waitForTimeout(120);}
  await p.click('#btnNext');await p.waitForTimeout(c===4?500:150);
 }
 ok(T,'all 14 indicators appear exactly once across stages',JSON.stringify(seen)===JSON.stringify(IDS),seen);
 await p.waitForSelector('#resRoot #asH',{timeout:5000}).catch(()=>{});
 ok(T,'reached results',(await ev(()=>NBS4MED_CORE.st.view))==='results');
 // evidence retention
 const evd=await ev(()=>[NBS4MED_CORE.st.evd['1.1'],NBS4MED_CORE.st.cf['1.1'],NBS4MED_CORE.st.rat['1.1']]);
 ok(T+' 1.1','evidence, confidence and rationale retained',evd[0]==='Inventory report 2024'&&evd[1]==='high'&&evd[2]==='Based on the municipal GIS layer',evd);
 if(sn==='B')ok(T,'N/A justification stored',await ev(()=>['2.1','4.1','4.2'].every(i=>(NBS4MED_CORE.st.just[i]||'').length>5)));
 // dashboard vs independent calc
 const E=expCrit(S.ans);
 const rows=await ev(()=>[...document.querySelectorAll('.crit-tbl tbody tr:not(.grp)')].map(tr=>[...tr.children].map(c=>c.innerText.replace(/\s+/g,' ').trim())));
 E.forEach((e,i)=>{const r=rows[i];if(e.st==='ok')ok(T+` C${i+1}`,`table shows ${e.sum}/${e.max} = ${e.pct}%`,r[1]==String(e.sum)&&r[2]==String(e.max)&&r[3]===e.pct+'%',r);else ok(T+` C${i+1}`,'incomplete criterion shown as not rated (not 0%)',e.st==='inc'?(r[3]==='–'&&r[1]==='–'):true,r)});
 const grp=await ev(()=>[...document.querySelectorAll('.crit-tbl tr.grp th')].map(x=>x.innerText));
 ok(T,'C1 separated from C2–C5',grp.length===2&&rows.length===5,grp);
 const overall=await ev(()=>document.querySelector('.intp')?document.getElementById('resRoot').innerText:'');
 // overall provisional
 const unk=Object.values(S.ans).includes('U');
 ok(T,unk?'combined score withheld when Unknown present':'combined score shown',unk?/not shown|غير معروض|لا تُعرض|لا يُعرض/i.test(overall):/%/.test(overall));
 // gaps correspond to answers
 const gaps=await ev(()=>{NBS4MED_CORE.nav('results');return [...document.querySelectorAll('#gpSec .gap')].map(g=>({tag:g.querySelector('.gtag').innerText,title:g.querySelector('.gh b').innerText}))});
 const tagOf={'0':'Gap','1':'Partial','U':'To verify'};
 const expected=IDS.filter(i=>['0','1','U'].includes(S.ans[i])).sort((a,b)=>{const o={'0':0,'1':1,'U':2};return o[S.ans[a]]-o[S.ans[b]]||IDS.indexOf(a)-IDS.indexOf(b)});
 const allGaps=await ev(l=>NBS4MED_CORE.gapItems(l).map(g=>({id:g.i.id||g.i,type:g.type,v:g.v})),lang);
 ok(T,'every action corresponds to a 0/1/Unknown response; none for 2 or N/A',JSON.stringify(allGaps.map(g=>g.id))===JSON.stringify(expected),[allGaps.map(g=>g.id),expected]);
 ok(T,'Unknown indicators labelled to verify, not as gaps',allGaps.filter(g=>S.ans[g.id]==='U').every(g=>g.v==='U'||g.v===undefined||!/^(0|1)$/.test(String(g.v))));
 // sections + screenshots
 const at=async(id,n)=>{await ev(id=>{const e=document.getElementById(id);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-80)},id);await p.waitForTimeout(200);await p.screenshot({path:`${pre}_${n}.png`})};
 await ev(()=>window.scrollTo(0,0));await p.screenshot({path:pre+'_10_dashboard_top.png'});
 await at('ctH','11_criteria_table');await at('cpH','12_criteria_chart');await ev(()=>document.querySelector('details[data-rk="dg-C1"]').open=true);await at('dgH','13_indicator_diagnosis');await at('gpH','14_priority_gaps');await at('rcH','15_nbs_options');await at('icH','16_impact_cost');await at('elH','17_evidence_limitations');
 await p.screenshot({path:pre+'_18_results_full.png',fullPage:true});
 // sections present
 const heads=await ev(()=>['asH','ctH','cpH','dgH','gpH','rcH','icH','elH'].map(i=>!!document.getElementById(i)));
 ok(T,'all dashboard sections present',heads.every(Boolean),heads);
 ok(T,'download buttons present',await ev(()=>['dlPdf','dlPdfDetail','dlCsv'].every(i=>!!document.getElementById(i))));
 // chart sanity: bars match percentages
 const bars=await ev(()=>[...document.querySelectorAll('.cp-row, .prof-row, .barrow')].length);
 // downloads
 const dl=p.waitForEvent('download',{timeout:5000});await p.click('#dlCsv');const d=await dl;await d.saveAs(`${pre}_report.csv`);
 ok(T,'CSV downloaded',fs.statSync(`${pre}_report.csv`).size>500);
 const csvT=fs.readFileSync(`${pre}_report.csv`,'utf8').replace(/^\uFEFF/,'');const parse=s=>{const rows=[];let r=[],f='',q=false;for(let i=0;i<s.length;i++){const c=s[i];if(q){if(c==='"'&&s[i+1]==='"'){f+='"';i++}else if(c==='"')q=false;else f+=c}else if(c==='"')q=true;else if(c===','){r.push(f);f=''}else if(c==='\n'||c==='\r'){if(c==='\r'&&s[i+1]==='\n')i++;r.push(f);rows.push(r);r=[];f=''}else f+=c}if(f||r.length){r.push(f);rows.push(r)}return rows};const csvRows=parse(csvT);ok(T,'CSV has fixed 11-column header and rectangular rows',csvRows[0].length===11&&csvRows.every(r=>r.length===11),csvRows.filter(r=>r.length!==11).slice(0,2));
 // CSV numeric consistency
 IDS.forEach(id=>{const row=csvRows.find(r=>r[0]==='assessment indicator'&&r[1].startsWith(id+' '));const v=row&&row[2];ok(T+' CSV '+id,'indicator row present with response '+S.ans[id],!!row&&(S.ans[id]==='U'?/unknown/i.test(v):S.ans[id]==='NA'?/not applicable|n\/a/i.test(v):v===S.ans[id]),row)});
 await p.emulateMedia({media:'print'});
 for(const [btn,nm,sel] of [['dlPdf','summary','#printReport .pg'],['dlPdfDetail','detailed','#printReport']]){
  await p.emulateMedia({media:'screen'});await p.setViewportSize({width:1920,height:1080});await p.click('#'+btn);await p.waitForTimeout(400);await p.emulateMedia({media:'print'});
  await p.pdf({path:`${pre}_${nm}.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});
 }
 await p.emulateMedia({media:'screen'});
 ok(T,'no JavaScript errors',errs.length===0,errs);
 await p.close();
}
fs.writeFileSync('qa3_log.json',JSON.stringify(log));
console.log(`qa3: ${pass} passed, ${fail} failed (${log.length})`);await b.close()})();
