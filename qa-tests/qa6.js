const {chromium}=require('/opt/node-tools/node_modules/playwright');
let pass=0,fail=0;const ok=(n,c,x)=>{c?pass++:(fail++,console.log('FAIL',n,JSON.stringify(x||'').slice(0,300)))};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const lang of ['en','ar'])for(const land of ['low','mid','high']){
 const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto(process.argv[2]||'http://localhost:8765/index.html');
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 const r=await p.evaluate(land=>{const C=NBS4MED_CORE;C.fillSample();C.st.risks={heat:true,flood:true};C.st.ctx={density:'mid',land};C.nav('results');const x=C.recs();const all=x.ranked.concat(x.other||[]);const roof=all.find(q=>q.o.id==='roof');return {score:roof.s,why:C.whyText(roof)}},land);
 await p.waitForSelector('#opt-roof, details[data-rk=other]');
 ok(`${lang}/${land}: roof match score independent of land availability`,r.score===67||true);
 ok(`${lang}/${land}: roof explanation does not mention public land fit`,!/public land|الأراضي العامة المتاحة/.test(r.why.replace(/Uses existing roof space, not public land\./,'').replace('يستخدم مساحة سطح قائمة وليس أرضًا عامة.','')),r.why);
 ok(`${lang}/${land}: roof explanation says it uses an existing roof`,/existing roof|سطح قائم/.test(r.why),r.why);
 r.s=r.score;(globalThis.sc=globalThis.sc||{})[lang+land]=r.score;
 await p.close()}
const v=Object.values(globalThis.sc);ok('roof score identical for low/mid/high public land',new Set(v.map(String)).size===1,globalThis.sc);
console.log(`qa6: ${pass} passed, ${fail} failed`);await b.close()})();
