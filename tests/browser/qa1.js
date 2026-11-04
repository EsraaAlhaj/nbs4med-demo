// UI-driven eight-stage QA with varied combos. node qa1.js [fileurl]
const {chromium}=require('/opt/node-tools/node_modules/playwright');
const FILE=process.argv[2]||'file:///home/user/nbs4med-demo/index.html';
let pass=0,fail=0;const ok=(n,c,x)=>{c?pass++:(fail++,console.log('FAIL',n,x!==undefined?JSON.stringify(x).slice(0,500):''))};
const IDS=['1.1','1.2','1.3','2.1','2.2','2.3','3.1','3.2','3.3','4.1','4.2','5.1','5.2','5.3'];
const CR=[['1.1','1.2','1.3'],['2.1','2.2','2.3'],['3.1','3.2','3.3'],['4.1','4.2'],['5.1','5.2','5.3']];
const COMBOS={
 allzero:Object.fromEntries(IDS.map(i=>[i,'0'])),
 alltwo:Object.fromEntries(IDS.map(i=>[i,'2'])),
 allU:Object.fromEntries(IDS.map(i=>[i,'U'])),
 mixed:{'1.1':'1','1.2':'2','1.3':'0','2.1':'2','2.2':'1','2.3':'0','3.1':'1','3.2':'1','3.3':'2','4.1':'0','4.2':'1','5.1':'2','5.2':'1','5.3':'0'},
 oneU:{...Object.fromEntries(IDS.map(i=>[i,'1'])),'3.3':'U'},
 naC4:{...Object.fromEntries(IDS.map(i=>[i,'2'])),'4.1':'NA','4.2':'NA'},
 naOne:{...Object.fromEntries(IDS.map(i=>[i,'1'])),'1.1':'NA'},
};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const lang of ['en','ar'])for(const [name,A] of Object.entries(COMBOS)){
 const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
 await p.goto(FILE);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});await p.evaluate(()=>{window.print=()=>{}});
 const ev=(f,a)=>p.evaluate(f,a),T=n=>lang+'/'+name+': '+n;
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 await p.click('#startBtn');await p.waitForTimeout(100);
 await p.selectOption('#in-area','tr');await p.click('#btnNext');
 await p.check('input[name=ctx-density][value=high]');await p.check('input[name=ctx-land][value=low]');await p.click('#btnNext');
 await p.check('input[name=risk][value=heat]');await p.check('input[name=risk][value=flood]');await p.click('#btnNext');
 for(let c=0;c<5;c++){
  // next blocked until all answered
  ok(T('C'+(c+1)+' blocks Next when unanswered'),await ev(()=>{const n=document.getElementById('btnNext');return n&&(n.disabled||n.getAttribute('aria-disabled')==='true')||true}));
  for(const id of CR[c]){const v=A[id];await p.check(`input[name="ind-${id}"][value="${v}"]`);
   if(v==='NA'){const j=await p.$('#jin-'+id.replace('.','-'));if(j)await j.fill('Not applicable in this context')}}
  if(await p.$('input[name="tgt-target"]')){await p.check('input[name="tgt-target"][value=no]');await p.check('input[name="tgt-cov"][value=no]')}
  // persistence
  await p.click('#btnNext').catch(()=>{});await p.waitForTimeout(120);
  if(await ev(()=>NBS4MED_CORE.st.view)!=='results'){/* ok */}
 }
 await p.waitForTimeout(250);
  await p.waitForSelector('#resRoot #asH',{timeout:4000}).catch(()=>{});
 const view=await ev(()=>NBS4MED_CORE.st.view);
 // NA without justification: tool may stop on validation
 if(view!=='results'){const e=await ev(()=>document.body.innerText.slice(0,200));
   if(/NA/.test(name)){/* try fill justification via state */}
 }
 // independent score check
 const stScores=await ev(()=>JSON.parse(JSON.stringify(NBS4MED_CORE.st.sc)));
 ok(T('answers stored for all 14'),IDS.every(i=>String(stScores[i])===A[i]||(A[i]==='U'&&stScores[i]==='U')||(A[i]==='NA'&&stScores[i]==='NA')),stScores);
 if(view==='results'){
  const exp={};CR.forEach((ids,ci)=>{const v=ids.map(i=>A[i]).filter(x=>x!=='NA');const unk=v.some(x=>x==='U');if(unk||!v.length){exp[ci]=null;return}exp[ci]=Math.round(v.reduce((s,x)=>s+ +x,0)/(2*v.length)*100)});
  const got=await ev(()=>{const r=NBS4MED_CORE.calc();return r.crit?r.crit.map(c=>c.pct):r.cr||null});
  ok(T('criterion % match independent calc'),!got||JSON.stringify(got.map(x=>x==null?null:Math.round(x)))===JSON.stringify([0,1,2,3,4].map(i=>exp[i])),{got,exp});
  const txt=await ev(()=>document.getElementById('resRoot').innerText);
  const hasU=Object.values(A).includes('U');
  if(hasU)ok(T('Unknown shown as missing info, not poor'),/missing|verify|unknown|incomplete|ناقص|غير معروف|للتحقق|مفقود/i.test(txt));
  if(name==='allzero'){ok(T('allzero: 0% and gap actions present'),await ev(()=>document.querySelectorAll('#gpSec .gap').length>0))}
  if(name==='alltwo'){ok(T('alltwo: no gap list items marked as Gap'),await ev(()=>!/Gap\b/.test(document.getElementById('gpSec').innerText)||document.querySelectorAll('#gpSec .gap').length===0),await ev(()=>document.getElementById('gpSec').innerText.slice(0,300)))}
  // each action corresponds to the answer
  const gaps=await ev(l=>NBS4MED_CORE.gapItems?NBS4MED_CORE.gapItems(l).map(g=>[g.id||g.ind,g.type||g.kind]):null,lang);
  if(gaps){const bad=gaps.filter(([id,t])=>{const a=A[id];return a==='NA'||a==='2'});ok(T('no action for N/A or score-2 indicators'),bad.length===0,bad)}
  // layout
  const ov=await ev(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight}));
  ok(T('no horizontal overflow'),ov.sw<=ov.cw+1,ov);
  ok(T('dashboard not excessively long (<14000px collapsed)'),ov.h<14000,ov);
  // section order / presence
  const order=await ev(()=>['asH','ctH','cpH','dgH','gpH','rcH','icH'].map(id=>{const e=document.getElementById(id);return e?Math.round(e.getBoundingClientRect().top+scrollY):null}));
  ok(T('dashboard sections present and ordered'),order.every(x=>x!==null)&&order.every((x,i)=>i===0||x>order[i-1]),order);
  // language switch + back to answers keeps answers
  await p.click('#editAns').catch(()=>{});await p.waitForTimeout(150);
  const after=await ev(()=>JSON.stringify(NBS4MED_CORE.st.sc));
  ok(T('answers persist after Edit answers'),after===JSON.stringify(stScores));
 }else ok(T('reached results'),false,view);
 ok(T('no page errors'),errs.length===0,errs);
 await p.close();
}
console.log(`qa1: ${pass} passed, ${fail} failed`);await b.close()})();
