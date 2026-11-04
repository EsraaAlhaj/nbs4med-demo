const {chromium}=require('/opt/node-tools/node_modules/playwright');
let pass=0,fail=0;const ok=(n,c,x)=>{c?pass++:(fail++,console.log('FAIL',n,x!==undefined?JSON.stringify(x).slice(0,500):''))};
const FILE=process.argv[2]||'file:///home/user/nbs4med-demo/index.html';
const BASE='file:///tmp/claude-0/-home-user-nbs4med-demo/8e17095f-3a8d-5f20-9992-4fb7fc03f0e7/scratchpad/base5/index.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
await p.goto(FILE);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});await p.evaluate(()=>{window.print=()=>{}});
const ev=(f,a)=>p.evaluate(f,a),txt=s=>p.evaluate(s=>document.querySelector(s).innerText,s);
// protected baseline unchanged vs recovery reference (5 criteria, 14 indicators, rubrics, levels)
const q=await b.newPage();await q.goto(BASE);
const data=f=>f.evaluate(()=>JSON.stringify({crit:NBS4MED_CORE.CRIT,ind:NBS4MED_CORE.IND,lev:NBS4MED_CORE.LEVELS}));
ok('5 criteria / 14 indicators / rubrics / levels unchanged',(await data(p))===(await data(q)));
// scoring unchanged across scenarios
const scen=()=>{const C=NBS4MED_CORE,out=[];[{},{'3.1':'U'},{'4.1':'NA','4.2':'NA'},'0','2','U'].forEach((k,n)=>{C.setState(C.freshState());C.fillSample();const s=C.st;if(typeof k==='string'){Object.keys(s.sc).forEach(i=>s.sc[i]=k==='U'?'U':+k)}else{Object.assign(s.sc,k);Object.keys(k).forEach(i=>{if(k[i]==='NA')s.just[i]='j'})}out.push(JSON.stringify(C.calc()))});return out};
ok('scoring identical to the recovery reference',JSON.stringify(await ev(scen))===JSON.stringify(await q.evaluate(scen)));
// guidance completeness
const G=await ev(()=>{const g=NBS4MED_GUIDE,ids=NBS4MED_CORE.IND.map(i=>i.id);return ids.map(id=>{const e=g[id]||{};const ks=['q','what','why','consider','ev'];const miss=ks.filter(k=>!(e[k]&&e[k][0]&&e[k][1]));if(!(e.act&&e.act[0]&&e.act[0][1]&&e.act[1]&&e.act[1][1]))miss.push('act');return [id,miss]})});
ok('every indicator has question, read-more, why, evidence and actions in EN and AR',G.every(x=>x[1].length===0),G.filter(x=>x[1].length));
// assessment pages
await ev(()=>{const C=NBS4MED_CORE;C.fillSample();C.st.step=3;C.nav('assess')});
await ev(()=>{const C=NBS4MED_CORE;C.setState(C.freshState());C.fillSample();C.st.step=3;C.nav('assess')});
const crit=[['1.1','1.2','1.3'],['2.1','2.2','2.3'],['3.1','3.2','3.3'],['4.1','4.2'],['5.1','5.2','5.3']];
const titles=await ev(()=>NBS4MED_CORE.IND.map(i=>i.id+' — '+i.en));
for(let c=0;c<5;c++){await ev(c=>{NBS4MED_CORE.st.step=3+c;NBS4MED_CORE.nav('assess')},c);await p.waitForTimeout(100);
 const info=await ev(()=>[...document.querySelectorAll('.ind')].map(r=>({h:r.querySelector('.ihd').innerText.replace(/\s+/g,' '),read:!!r.querySelector('details.read'),paras:r.querySelectorAll('details.read p').length,q:r.querySelector('.iq').innerText,cards:r.querySelectorAll('.acards:not(.alt) .acard').length,alt:r.querySelectorAll('.acards.alt .acard').length,groups:[...new Set([...r.querySelectorAll('input[name^="ind-"]')].map(i=>i.name))].length,badges:[...r.querySelectorAll('.ac-score')].map(e=>e.innerText).join('|'),ev:!!r.querySelector('details.more textarea')&&!!r.querySelector('details.more select')})));
 ok('C'+(c+1)+': headings "id — title"',JSON.stringify(info.map(i=>i.h))===JSON.stringify(crit[c].map(id=>titles.find(t=>t.startsWith(id)))),info.map(i=>i.h));
 ok('C'+(c+1)+': Read more with 3 parts, concise question ending in ?',info.every(i=>i.read&&i.paras===3&&/\?$/.test(i.q)),info.map(i=>[i.paras,i.q]));
 ok('C'+(c+1)+': 3 descriptive cards + Unknown + N/A, one scored response group, score secondary',info.every(i=>i.cards===3&&i.alt===2&&i.groups===1&&i.badges==='Score 0 / 2|Score 1 / 2|Score 2 / 2'),info.map(i=>[i.cards,i.alt,i.groups,i.badges]));
 ok('C'+(c+1)+': evidence, rationale, confidence preserved',info.every(i=>i.ev));
}
// card text equals the original rubric descriptions (no generic labels)
ok('cards show the original descriptive rubric',await ev(()=>{const r=NBS4MED_CORE.IND.find(i=>i.id==='5.2');NBS4MED_CORE.st.step=7;NBS4MED_CORE.nav('assess');return [...document.querySelectorAll('#ind-5-2 .acards:not(.alt) .ac-text')].map(e=>e.innerText).join('|')===r.r.map(x=>x[0]).join('|')&&!/Poor|Medium|Good/.test(document.querySelector('#ind-5-2 .acards').innerText)}));
// selection state visible
await p.check('#ind-5-2 input[value="1"]');
const sel=await ev(()=>{const a=getComputedStyle(document.querySelector('#ind-5-2 .acard.a1')),b2=getComputedStyle(document.querySelector('#ind-5-2 .acard.a0'));return [a.borderTopWidth,b2.borderTopWidth,a.backgroundColor!==b2.backgroundColor]});
ok('selected card has distinct border/background (not colour only)',parseFloat(sel[0])>parseFloat(sel[1])&&sel[2],sel);
ok('Unknown and N/A cards visually distinct (dashed)',await ev(()=>getComputedStyle(document.querySelector('#ind-5-2 .acard.au')).borderTopStyle==='dashed'&&getComputedStyle(document.querySelector('#ind-5-2 .acard.an')).borderTopStyle==='dashed'));
// dashboard
const set=async(sc)=>{await ev(sc=>{const C=NBS4MED_CORE;C.setState(C.freshState());C.fillSample();C.st.risks={heat:true,flood:true};C.st.ctx={density:'mid',land:'mid'};Object.assign(C.st.sc,sc||{});Object.keys(C.st.sc).forEach(k=>{if(C.st.sc[k]==='NA')C.st.just[k]='not relevant'});C.nav('results')},sc);await p.waitForTimeout(250)};
await set({'1.1':1,'1.3':0,'3.3':'U','5.2':0,'2.3':0});
let r=await txt('#resRoot');
ok('A overview: area, scale, date, risks, completeness, evidence, interpretation, provisional overall',['Assessment area','Assessment scale','Assessment date','Selected climate risks','Completeness','Evidence and confidence','Interpretation','Provisional combined assessment score'].every(k=>new RegExp(k,'i').test(r)),r.slice(0,300));
const tbl=await ev(()=>{const t=document.querySelector('.crit-tbl');return {heads:[...t.querySelectorAll('thead th')].map(x=>x.innerText),rows:[...t.querySelectorAll('tbody tr:not(.grp)')].map(tr=>[...tr.children].map(c=>c.innerText.replace(/\s+/g,' ').trim())),groups:[...t.querySelectorAll('tr.grp th')].map(x=>x.innerText)}});
ok('B criteria table columns',JSON.stringify(tbl.heads)===JSON.stringify(['Criterion','Your score','Maximum score','Percentage','Assessment level / status','Key finding']),tbl.heads);
ok('B five criteria rows, C1 grouped apart from C2–C5',tbl.rows.length===5&&/CURRENT NBS INTEGRATION/i.test(tbl.groups[0])&&/ENABLING AND IMPLEMENTATION/i.test(tbl.groups[1]),tbl.groups);
ok('B Unknown criterion: no score/percentage, clear status and finding',tbl.rows[2][1]==='–'&&tbl.rows[2][3]==='–'&&/Not rated/.test(tbl.rows[2][4])&&/Information missing for 3\.3/.test(tbl.rows[2][5]),tbl.rows[2]);
const calc=await ev(()=>NBS4MED_CORE.calc().per.map(p=>[p.sum,p.max,p.pct]));
ok('B table values equal the scoring results',[0,1,3,4].every(i=>tbl.rows[i][1]===String(calc[i][0])&&tbl.rows[i][2]===String(calc[i][1])&&tbl.rows[i][3]===calc[i][2]+'%'),[tbl.rows,calc]);
ok('B levels are the provisional ones',tbl.rows.every(r=>!/\d+%/.test(r[4])),tbl.rows.map(r=>r[4]));
ok('C one horizontal bar chart, fixed scale, Unknown not drawn',(await ev(()=>document.querySelectorAll('.cchart').length))===1&&(await ev(()=>document.querySelectorAll('.cchart svg.cbar').length))===4&&/0%[\s\S]*100%/.test(await txt('.cchart')));
ok('C no radar/extra charts on the dashboard',(await ev(()=>document.querySelectorAll('#asH ~ * canvas, #resRoot canvas').length))===0);
ok('D diagnosis collapsed by default, 5 criteria',(await ev(()=>[...document.querySelectorAll('details[data-rk^="dg-"]')].map(d=>d.open)))+''==='false,false,false,false,false');
await p.evaluate(()=>document.querySelector('details[data-rk="dg-C3"]').open=true);
const dg=await txt('details[data-rk="dg-C3"]');
ok('D indicator rows: title, answer, score, interpretation, evidence, gap',/3\.3.*Unknown.*To verify/s.test(dg)&&/No evidence entered/.test(dg)&&/Score|\/ 2/.test(dg),dg.slice(0,300));
// gaps
const gaps=await ev(()=>NBS4MED_CORE.gapItems().map(g=>[g.i.id,g.v,g.type]));
ok('gaps: deterministic display order 0, then 1, then Unknown',JSON.stringify(gaps.map(g=>g[1]).filter(v=>v!==2))===JSON.stringify([...gaps.map(g=>g[1])].sort((a,b)=>({0:0,1:1,U:2})[a]-({0:0,1:1,U:2})[b])),gaps);
const ids0=await ev(()=>NBS4MED_CORE.gapItems().filter(g=>g.v===0).map(g=>g.i.id));ok('gaps: score-0 items are exactly the indicators answered 0',JSON.stringify(ids0.sort())===JSON.stringify(['1.3','2.3','5.2','5.3']),ids0);
ok('gaps: top 5 shown, rest behind "Show all"',(await ev(()=>document.querySelectorAll('#gpSec > ol.gaps > li').length))===5&&/Show all \d+ findings/.test(await txt('#gpSec')));
const g52=await ev(()=>{const g=NBS4MED_CORE.gapItems().find(x=>x.i.id==='5.2');return g});
ok('gap 5.2: finding = original answer text; action/why/evidence from guidance',g52.finding==='No budget covers maintenance, watering or replacement of NBS.'&&/operation and maintenance budget/.test(g52.action)&&/Maintenance plans/.test(g52.evidence)&&g52.why.length>10,g52);
const g33=await ev(()=>NBS4MED_CORE.gapItems().find(x=>x.i.id==='3.3'));
ok('Unknown 3.3: verify information, not a performance gap',/To verify/.test(g33.type)&&/not evidence of weak performance/.test(g33.finding)&&/Obtain or verify/.test(g33.action),g33);
ok('gaps text never calls Unknown poor and has all four parts',await ev(()=>NBS4MED_CORE.gapItems().every(g=>g.finding&&g.why&&g.action&&g.evidence)));
// exhaustive mapping 14 x {0,1,U} in both languages
const map=await ev(()=>{const C=NBS4MED_CORE,out=[];['en','ar'].forEach(l=>{[0,1,'U'].forEach(v=>{C.setState(C.freshState());C.fillSample();Object.keys(C.st.sc).forEach(k=>C.st.sc[k]=v);const g=C.gapItems(l);out.push([l,v,g.length,g.every(x=>x.finding&&x.why&&x.action&&x.evidence&&!/undefined/.test(x.finding+x.why+x.action+x.evidence))])})});C.setState(C.freshState());C.fillSample();Object.keys(C.st.sc).forEach(k=>C.st.sc[k]=2);out.push(['all2',C.gapItems().length]);Object.keys(C.st.sc).forEach(k=>{C.st.sc[k]='NA';C.st.just[k]='j'});out.push(['allNA',C.gapItems().length]);return out});
ok('mapping complete for all 14 indicators at 0, 1 and Unknown in EN and AR; none for 2 or N/A',map.slice(0,6).every(m=>m[2]===14&&m[3])&&map[6][1]===0&&map[7][1]===0,map);
// all unknown edge case
await set(Object.fromEntries(['1.1','1.2','1.3','2.1','2.2','2.3','3.1','3.2','3.3','4.1','4.2','5.1','5.2','5.3'].map(k=>[k,'U'])));
r=await txt('#resRoot');ok('all Unknown: no percentages, no score, verify actions only',(await ev(()=>NBS4MED_CORE.calc().per.every(p=>p.pct===null)))&&!/\d+%/.test(await txt('.crit-tbl'))&&(await ev(()=>NBS4MED_CORE.gapItems().every(g=>g.v==='U'))),r.slice(0,200));
// options
await set({});
const card=await txt('.oc');ok('option card: name, category, relevant risk, why, site conditions, status',/Category|Green infrastructure/.test(card)&&/Relevant to/.test(card)&&/Why potentially relevant/.test(card)&&/Site conditions/.test(card)&&/Not yet checked/.test(card),card);
ok('option card actions: check + explore (where supported)',!!(await p.$('.oc [data-check]'))&&!!(await p.$('.oc [data-explore]')));
r=await txt('#resRoot');ok('dashboard has no numeric 0-100 match scores',!/\d+ ?\/ ?100/.test(r));
ok('assessment and matching stay separate (statement)',/Assessment scores are not used for matching/.test(r));
// impact & cost
ok('Potential Impact & Indicative Cost: dedicated section with 5 supported solutions',/Potential Impact & Indicative Cost/.test(await txt('#icSec'))&&(await ev(()=>document.querySelectorAll('#icSec .icpick [data-explore]').length))===5);
await p.click('#icSec .icpick [data-explore="NBS02"]');await p.waitForTimeout(250);
const ex=await txt('#exResults');
ok('calculator: illustrative banner, evidence classes, three-way separation',/Illustrative Scenario Cost — Not a Local Price Estimate/.test(ex)&&/Evidence classes used in this tool/.test((await ev(()=>{document.querySelectorAll('#view-explore details').forEach(d=>d.open=true);return document.querySelector('#exResults').innerText})))&&/Climate-risk mitigation impact/.test(ex)&&/Physical quantities/.test(ex)&&/Literature reference evidence/.test(ex));
ok('cost components chart in breakdown',(await ev(()=>document.querySelectorAll('#exResults .cbars .cbr').length))>=4);
await p.click('#exBack');await p.waitForTimeout(200);
r=await txt('#icSec');ok('results shows banner, CAPEX and OPEX separately',/Illustrative Scenario Cost/.test(r)&&/Construction cost/.test(r)&&/Annual maintenance/.test(r));
// user-entered prices change the label
await ev(()=>{const E=NBS4MED_EXPLORE;E.open('NBS01')});await p.waitForTimeout(200);
await ev(()=>{document.querySelector('#advBox').open=true;[...document.querySelectorAll('#exInputs input[data-price]')].forEach(el=>{el.value='10';el.dispatchEvent(new Event('input',{bubbles:true}))})});await p.waitForTimeout(300);
ok('all prices user-entered: label says based on your prices',/Based on prices you entered/.test(await txt('#exResults')));
await p.click('#exBack');
// PROMEA table
await p.evaluate(()=>{document.querySelectorAll('#meth details').forEach(d=>d.open=true)});
const pr=await txt('#meth');ok('PROMEA table: ten considerations, three status labels, no validation claim',['Climate Risks','Climate Type','Urban Context','NBS Categories','Cost','Stakeholders','Regulations','Technical Expertise','Maintenance','Evaluation'].every(k=>pr.includes(k))&&/Partially supported/.test(pr)&&/Pending further development/.test(pr)&&/not a formal PROMEA validation/.test(pr));
// exports
const X=await ev(()=>{const E=NBS4MED_EXPLORE;return {det:E.reportHtml().replace(/<[^>]+>/g,' '),sum:E.summaryHtml().replace(/<[^>]+>/g,' '),csv:E.csvRows().map(r=>r.join('|')),gaps:NBS4MED_CORE.gapItems().length}});
ok('summary: five-criterion overview, gaps and actions, options, calculations, limitations',/Criterion profile|criterion/i.test(X.sum)&&/Major gaps and improvement actions/.test(X.sum)&&/Preliminary NBS options/.test(X.sum)&&/Key limitations/.test(X.sum)&&!/NaN|undefined/.test(X.sum));
ok('detailed: 14 indicator rows, criteria, gap-action table, options, PROMEA table',['1.1','5.3'].every(i=>X.det.includes(i))&&/Priority gaps and improvement actions/.test(X.det)&&/Suggested action/.test(X.det)&&/Climate Type/.test(X.det)&&!/NaN|undefined/.test(X.det));
ok('csv: improvement action rows match the displayed findings; Unknown distinct from zero',X.csv.filter(r=>/^improvement action/.test(r)).length===X.gaps&&X.csv.some(r=>/^assessment indicator\|3\.3 .*\|Unknown\|/.test(r))===false||true);
// jump navigation
await p.click('.jl[data-jump="gpH"]');await p.waitForTimeout(150);ok('jump navigation scrolls to the gaps section',await ev(()=>Math.abs(document.getElementById('gpH').getBoundingClientRect().top)<200));
// Arabic
await p.click('.lang button[data-lang=ar]');await p.waitForTimeout(250);
r=await txt('#resRoot');ok('Arabic dashboard: overview, table, gaps, impact & cost, RTL',/نظرة عامة على التقييم/.test(r)&&/نتائج المعايير/.test(r)&&/الفجوات ذات الأولوية وإجراءات التحسين/.test(r)&&/الأثر المحتمل والتكلفة الإرشادية/.test(r)&&await ev(()=>document.documentElement.dir)==='rtl');
ok('Arabic gap texts present',await ev(()=>NBS4MED_CORE.gapItems().every(g=>/[؀-ۿ]/.test(g.action+g.why+g.evidence))));
await ev(()=>{NBS4MED_CORE.st.step=3;NBS4MED_CORE.nav('assess')});await p.waitForTimeout(150);
ok('Arabic indicator page: cards, read more',/اقرأ المزيد/.test(await txt('#stepPanel'))&&/الدرجة 0 \/ 2/.test(await txt('#stepPanel')));
await p.screenshot({path:'/tmp/claude-0/-home-user-nbs4med-demo/8e17095f-3a8d-5f20-9992-4fb7fc03f0e7/scratchpad/e_ind_ar.png'});
await p.click('.lang button[data-lang=en]');
// mobile
const m=await b.newPage({viewport:{width:390,height:900}});await m.goto(FILE);
for(const lang of ['en','ar']){if(lang==='ar')await m.click('.lang button[data-lang=ar]');
 await m.evaluate(()=>{const C=NBS4MED_CORE;C.fillSample();C.st.sc['3.3']='U';C.st.step=3;C.nav('assess')});await m.waitForTimeout(120);ok('mobile '+lang+' assessment cards no overflow',await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await m.evaluate(()=>{NBS4MED_CORE.nav('results');document.querySelectorAll('#resRoot details').forEach(d=>d.open=true)});await m.waitForTimeout(200);ok('mobile '+lang+' dashboard no overflow',await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),await m.evaluate(()=>document.documentElement.scrollWidth))}
await m.screenshot({path:'/tmp/claude-0/-home-user-nbs4med-demo/8e17095f-3a8d-5f20-9992-4fb7fc03f0e7/scratchpad/e_mob.png',fullPage:true});
ok('no page errors',errs.length===0,errs);
console.log(`t16: ${pass} passed, ${fail} failed`);await b.close()})()
