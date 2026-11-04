const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('http://localhost:8765/index.html');await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
await p.evaluate(()=>{const C=NBS4MED_CORE;C.fillSample();C.st.risks={heat:true,flood:true};C.st.ctx={density:'mid',land:'mid'};C.nav('results')});await p.waitForSelector('#rcH');
await p.locator('#opt-roof [data-check]').click();await p.waitForTimeout(150);
const names=await p.evaluate(()=>[...new Set([...document.querySelectorAll('.chkpanel input[type=radio]')].map(i=>i.name))]);console.log(names);
const vals=await p.evaluate(()=>[...document.querySelectorAll('.chkpanel input[type=radio]')].filter(i=>/roof/.test(i.name)).map(i=>i.name+'='+i.value));console.log(vals.join(' '));
const st=()=>p.evaluate(()=>{const r=NBS4MED_CORE.recFor('roof');return [r.scr.status,(r.scr.reasons||r.scr.why||[]).length]});
const sc0=await p.evaluate(()=>JSON.stringify(NBS4MED_CORE.calc().per.map(x=>x.pct)));
const seq=[];
const set=async(n,v)=>{await p.check(`input[name="${n}"][value=${v}]`);await p.waitForTimeout(120);seq.push([n.split('|')[2],v,...await st()])};
const A=names.find(n=>/avail/.test(n)),S2=names.find(n=>/struct/.test(n));
seq.push(['start','',...await st()]);
await set(A,'yes');await set(S2,'unknown');await set(S2,'yes');await set(A,'no');await set(A,'unknown');await set(A,'yes');await set(S2,'unsuitable');await set(S2,'yes');
for(const s of seq)console.log(s.join(' '));
console.log('scores unchanged',sc0===await p.evaluate(()=>JSON.stringify(NBS4MED_CORE.calc().per.map(x=>x.pct))));
await b.close()})()
