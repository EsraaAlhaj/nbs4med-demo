const {chromium}=require('/opt/node-tools/node_modules/playwright');const cp=require('child_process'),fs=require('fs');
const OUT='/tmp/claude-0/-home-user-nbs4med-demo/8e17095f-3a8d-5f20-9992-4fb7fc03f0e7/scratchpad/pdf2out';fs.mkdirSync(OUT,{recursive:true});
const FILE=process.argv[2]||'file:///home/user/nbs4med-demo/index.html';let pass=0,fail=0;const ok=(n,c,x)=>{c?pass++:(fail++,console.log('FAIL',n,JSON.stringify(x).slice(0,300)))};
const cases=[
 ['complete',""],
 ['unknown',"st.sc['3.1']='U';st.sc['5.2']='U';"],
 ['na',"st.sc['4.1']='NA';st.sc['4.2']='NA';st.just['4.1']='n/a';st.just['4.2']='n/a';st.sc['1.1']='NA';st.just['1.1']='n/a';"],
 ['allna',"Object.keys(st.sc).forEach(k=>{st.sc[k]='NA';st.just[k]='n/a'});"],
 ['allunknown',"Object.keys(st.sc).forEach(k=>{st.sc[k]='U'});"],
 ['nogaps',"Object.keys(st.sc).forEach(k=>{st.sc[k]=2});"],
 ['allzero',"Object.keys(st.sc).forEach(k=>{st.sc[k]=0});"],
 ['fundingonly',"Object.keys(st.sc).forEach(k=>{st.sc[k]=2});st.sc['5.1']=0;st.sc['5.2']=1;"],
 ['coast',"st.risks={coast:true,heat:true};"],
 ['unsureRisk',"st.risks={unsure:true};"],
 ['landUnk',"st.ctx={density:'low',land:'unknown'};"],
 ['long',"st.scope.mName='Very long area name '.repeat(14).trim();st.rat={'1.1':'long '.repeat(80)};st.sc['3.1']='U';"],
 ['checked',"st.scr={'roof.avail':'yes','roof.struct':'yes','plant.space':'yes','plant.soil':'yes','plant.water':'yes'};"],
 ['pilot',"st.scope={area:'eg',mName:'',mCountry:'',mCity:'',type:'site',typeAuto:true,org:'',date:'2026-10-16'};"]
];
const EX=['NBS01','NBS02','NBS03','NBS04','NBS05'];EX.forEach(s=>cases.push(['ex_'+s,'',s]));
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const lang of ['en','ar'])for(const [id,setup,sol] of cases){
 const p=await b.newPage({viewport:{width:1100,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(FILE);await p.evaluate(()=>{window.print=()=>{}});
 if(lang==='ar')await p.click('.lang button[data-lang=ar]');
 await p.evaluate(([setup,sol])=>{const C=NBS4MED_CORE,X=NBS4MED_EXPLORE;C.fillSample();C.st.risks={heat:true,flood:true};C.st.ctx={density:'mid',land:'mid'};new Function('st',setup)(C.st);if(sol){C.nav('explore');document.querySelector('.sol input[value='+sol+']').click()}else{X.state.sol=null;C.nav('results')}},[setup,sol||'']);
 await p.waitForTimeout(200);await p.evaluate(()=>NBS4MED_EXPLORE.printSummary());
 await p.emulateMedia({media:'print'});await p.setViewportSize({width:688,height:1100});
 const lay=await p.evaluate(()=>{const out=[];document.querySelectorAll('#printReport .pg').forEach(pg=>{const foot=pg.querySelector('.ps-foot').getBoundingClientRect(),top=pg.getBoundingClientRect();let mb=0,w=0;pg.querySelectorAll('*').forEach(el=>{if(el.closest('.ps-foot'))return;const r=el.getBoundingClientRect();if(r.height)mb=Math.max(mb,r.bottom);w=Math.max(w,r.right)});out.push({over:Math.round(mb-foot.top),right:Math.round(w-top.left),w:Math.round(top.width)})});return out});
 const key=id+'_'+lang;ok(key+' two pages, no overlap with footer',lay.length===2&&lay.every(l=>l.over<-2&&l.right<=l.w+1),lay);
 const pdf=OUT+'/'+key+'.pdf';await p.pdf({path:pdf,format:'A4',printBackground:true,preferCSSPageSize:true});
 const pages=+/Pages:\s+(\d+)/.exec(cp.execSync('pdfinfo '+pdf).toString())[1];ok(key+' PDF has 2 pages',pages===2,pages);
 ok(key+' no page errors',errs.length===0,errs);
 await p.close()}
console.log(`pdf2: ${pass} passed, ${fail} failed`);await b.close()})()
