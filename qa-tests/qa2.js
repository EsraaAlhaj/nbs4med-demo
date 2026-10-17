// Independent calculator verification through the real UI. node qa2.js
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
const URL=process.argv[2]||'http://localhost:8765/index.html';
const PM=JSON.parse(fs.readFileSync('/home/user/nbs4med-demo/demo_parameters.json','utf8')),EV=JSON.parse(fs.readFileSync('/home/user/nbs4med-demo/evidence.json','utf8')).evidence;
const P={};PM.parameters.forEach(p=>P[p.id]=p.value);
const log=[];let pass=0,fail=0;
const ok=(id,n,c,x)=>{c?pass++:(fail++,console.log('FAIL',id,n,x!==undefined?JSON.stringify(x).slice(0,400):''));log.push({id,n,pass:!!c,x:c?undefined:x})};
const close=(a,b)=>Math.abs(a-b)<=1e-6*Math.max(1,Math.abs(b));
const S=['low','base','high'];
const sc=(id)=>P[id];
// independent model -------------------------------------------------
function model(sid,i){
 const out={},cap={low:0,base:0,high:0},ann={low:0,base:0,high:0};
 const add=(t,pid,q)=>S.forEach(s=>t[s]+=q*sc(pid)[s]);
 if(sid==='NBS01'){const plants=Math.ceil(i.area_m2*i.density_per_m2);out.plants=plants;
  out.water=S.map(s=>i.area_m2*sc('NBS01.water_demand_lpd')[s]*i.water_days/1000);
  add(cap,'NBS01.sapling_price',plants);['soil_prep','planting_labour','irrigation_setup'].forEach(k=>add(cap,'NBS01.'+k,i.area_m2));add(cap,'NBS01.design_lump',1);add(ann,'NBS01.maintenance_annual',i.area_m2)}
 if(sid==='NBS02'){const rain=i.area_m2*i.storm_depth_mm/1000;out.rain=rain;out.sub=i.area_m2*i.substrate_depth_m;
  out.ret=i.storm_depth_mm>10?[rain*26.8/100,rain*61.8/100]:null;
  add(cap,'NBS02.substrate_price',out.sub);['drainage_layer','vegetation','install_labour'].forEach(k=>add(cap,'NBS02.'+k,i.area_m2));if(i.include_waterproofing)add(cap,'NBS02.waterproofing',i.area_m2);add(cap,'NBS02.structural_check_lump',1);add(ann,'NBS02.maintenance_annual',i.area_m2);
  const cs=EV.filter(r=>r.solution_id==='NBS02'&&r.statistic_type==='single_case'&&r.outcome_variable==='green_roof_construction_cost'&&/^extensive/i.test(r.design||'')).map(r=>r.min_or_value).sort((a,b)=>a-b);
  const med=cs.length%2?cs[(cs.length-1)/2]:(cs[cs.length/2-1]+cs[cs.length/2])/2;
  out.ref=(i.area_m2>=196&&i.area_m2<=1944)?{low:cs[0]*i.area_m2,median:med*i.area_m2,high:cs[cs.length-1]*i.area_m2}:null}
 if(sid==='NBS03'){const f=s=>i.area_m2*s/100,t=f(i.share_trees),m=f(i.share_meadow),w=f(i.share_water),h=f(i.share_hard);out.areas=[t,m,w,h];
  out.water=S.map(s=>i.water_days*(t*sc('NBS03.tree_water_lpd')[s]+m*sc('NBS03.meadow_water_lpd')[s])/1000);
  add(cap,'NBS03.tree_area_build',t);add(cap,'NBS03.meadow_build',m);add(cap,'NBS03.water_build',w);add(cap,'NBS03.hard_build',h);add(cap,'NBS03.irrigation_system',t+m);add(cap,'NBS03.design_lump',1);
  add(ann,'NBS03.tree_maint',t);add(ann,'NBS03.meadow_maint',m);add(ann,'NBS03.water_maint',w);add(ann,'NBS03.hard_maint',h)}
 if(sid==='NBS04'){const g=i.footprint_m2*i.storage_depth_m;out.store=S.map(s=>g*sc('NBS04.shape_factor')[s]);
  if(i.catchment_m2){const rv=S.map(s=>i.catchment_m2*sc('NBS04.runoff_coeff')[s]*i.storm_depth_mm/1000);out.runoff=rv;out.ratio=[out.store[0]/rv[2]*100,out.store[1]/rv[1]*100,out.store[2]/rv[0]*100]}
  add(cap,'NBS04.excavation_price',g);add(cap,'NBS04.liner_price',i.footprint_m2);add(cap,'NBS04.planting_price',i.footprint_m2);add(cap,'NBS04.structure_price',i.structures);add(cap,'NBS04.design_lump',1);add(ann,'NBS04.maintenance_annual',i.footprint_m2)}
 if(sid==='NBS05'){const A=i.length_m*i.width_m,trees=Math.floor(i.length_m/i.tree_spacing_m)*i.tree_rows;out.area=A;out.trees=trees;
  out.water=S.map(s=>i.water_days*(trees*sc('NBS05.tree_water_lpd')[s]+A*sc('NBS05.understory_water_lpd')[s])/1000);
  add(cap,'NBS05.tree_price',trees);add(cap,'NBS05.understory_price',A);add(cap,'NBS05.irrigation_line',i.length_m);add(cap,'NBS05.survey_lump',1);add(cap,'NBS05.design_lump',1);add(ann,'NBS05.tree_maint',trees);add(ann,'NBS05.understory_maint',A)}
 out.cap=cap;out.ann=ann;return out}
// input definitions
const DEF={};Object.entries(PM.solutions).forEach(([k,s])=>{DEF[k]={};s.inputs.forEach(d=>DEF[k][d.id]=d)});
const defaults=sid=>{const o={};Object.values(DEF[sid]).forEach(d=>{o[d.id]=d.default});return o};
const CASES=(sid)=>{const D=defaults(sid),cs=[];const d=DEF[sid];
 cs.push(['default',{}]);
 const num=Object.values(d).filter(x=>x.type!=='boolean');
 const cust={NBS01:{area_m2:1234,density_per_m2:2.5,water_days:90},NBS02:{area_m2:800,storm_depth_mm:30,substrate_depth_m:0.1,include_waterproofing:false},NBS03:{area_m2:7500,share_trees:30,share_meadow:40,share_water:10,share_hard:20,water_days:150},NBS04:{footprint_m2:900,catchment_m2:12000,storm_depth_mm:40,storage_depth_m:1.5,structures:3},NBS05:{length_m:450,width_m:4,tree_spacing_m:7,tree_rows:2,water_days:200}}[sid];
 cs.push(['custom',cust]);
 num.forEach(x=>{if(sid==='NBS03'&&/share/.test(x.id))return;cs.push(['min '+x.id,{[x.id]:x.min}]);cs.push(['max '+x.id,{[x.id]:x.max}])});
 if(sid==='NBS03'){cs.push(['shares 100/0/0/0',{share_trees:100,share_meadow:0,share_water:0,share_hard:0}]);cs.push(['shares 0/0/0/100',{share_trees:0,share_meadow:0,share_water:0,share_hard:100}])}
 if(sid==='NBS02'){cs.push(['storm 10 mm (retention boundary)',{storm_depth_mm:10}]);cs.push(['storm 11 mm',{storm_depth_mm:11}]);cs.push(['area 196 (ref range lower)',{area_m2:196}]);cs.push(['area 1944 (ref range upper)',{area_m2:1944}]);cs.push(['area 195 (outside)',{area_m2:195}]);cs.push(['area 1945 (outside)',{area_m2:1945}])}
 if(sid==='NBS04')cs.push(['catchment blank',{catchment_m2:''}]);
 return cs};
const INVALID=sid=>{const d=DEF[sid],r=[];Object.values(d).filter(x=>x.type!=='boolean').forEach(x=>{r.push([x.id+' below min',{[x.id]:x.min/2>0&&x.min>0?x.min*0.5:-1}]);r.push([x.id+' above max',{[x.id]:x.max*2}]);r.push([x.id+' negative',{[x.id]:-5}]);if(x.min>0)r.push([x.id+' zero',{[x.id]:0}])});
 Object.values(d).filter(x=>x.required).forEach(x=>r.push([x.id+' blank required',{[x.id]:''}]));
 if(sid==='NBS03')r.push(['shares sum 90',{share_trees:30,share_meadow:35,share_water:10,share_hard:15}],['shares sum 110',{share_trees:50,share_meadow:35,share_water:10,share_hard:15}]);
 return r};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_|Failed to load/.test(m.text()))errs.push(m.text())});
await p.goto(URL);await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
await p.evaluate(()=>{const C=NBS4MED_CORE;C.fillSample();C.st.risks={heat:true,flood:true};C.st.ctx={density:'mid',land:'mid'};C.nav('results')});await p.waitForSelector('#icSec');
const fmtVariants=v=>{const a=[];[0,1,2,3].forEach(d=>a.push(v.toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:0})));return a};
const shown=(txt,v)=>fmtVariants(v).some(s=>txt.includes(s));
let n=0;
for(const sid of ['NBS01','NBS02','NBS03','NBS04','NBS05']){
 await p.evaluate(()=>NBS4MED_CORE.nav('results'));await p.waitForSelector('#icSec');
 await p.click(`#icSec [data-explore="${sid}"]`);await p.waitForSelector('#exResults');const openAdv=()=>p.evaluate(()=>document.querySelectorAll('#exInputs details').forEach(d=>d.open=true));await openAdv();
 // valid cases
 for(const [name,over] of CASES(sid)){n++;const T=`${sid} ${name}`;
  const inp={...defaults(sid),...over};
  await openAdv();for(const [k,v] of Object.entries(over)){if(typeof v==='boolean'){const c=await p.isChecked('#ex-'+k);if(c!==v)await p.click('#ex-'+k)}else await p.fill('#ex-'+k,String(v))}
  await p.waitForTimeout(250);await openAdv();
  const res=await p.evaluate(()=>JSON.parse(JSON.stringify(NBS4MED_EXPLORE.state.res)));
  const txt=await p.evaluate(()=>document.getElementById('exResults').innerText);
  if(res.status==='invalid'){ok(T,'valid case accepted',false,res.errors);for(const [k] of Object.entries(over)){if(typeof over[k]!=='boolean')await p.fill('#ex-'+k,String(defaults(sid)[k]??''))}continue}
  const m=model(sid,inp);
  ok(T,'status ok / no errors',res.status==='ok'&&res.errors.length===0,res.errors);
  const o=id=>res.outputs.find(x=>x.id===id);
  const tri=(x,e)=>x&&S.every((s,k)=>close(x[s],e[k]));
  // capex & opex separate and correct
  ok(T,'CAPEX total matches independent',S.every(s=>close(res.costs.capex.total[s],m.cap[s])),[res.costs.capex.total,m.cap]);
  ok(T,'annual OPEX matches independent',!m.ann.low&&!res.costs.annual.total?true:S.every(s=>close(res.costs.annual.total[s],m.ann[s])),[res.costs.annual.total,m.ann]);
  ok(T,'CAPEX/OPEX not summed (separate totals)',res.costs.capex.total&&(!res.costs.annual.total||!close(res.costs.capex.total.base,res.costs.capex.total.base+res.costs.annual.total.base)));
  ok(T,'displayed CAPEX values',S.every(s=>shown(txt,Math.round(m.cap[s]))),m.cap);
  if(m.ann.base)ok(T,'displayed OPEX values',S.every(s=>shown(txt,Math.round(m.ann[s]))),m.ann);
  if(sid==='NBS01'){ok(T,'plants',o('plants').value===m.plants);ok(T,'water m3/yr',tri(o('establishment_water'),m.water),[o('establishment_water'),m.water]);ok(T,'displayed plants',shown(txt,m.plants))}
  if(sid==='NBS02'){ok(T,'rain volume',close(o('rain_volume').value,m.rain));ok(T,'substrate volume',close(o('substrate_volume').value,m.sub));
   const r=o('event_retained');if(m.ret){ok(T,'retention scenario (G01 26.8–61.8%)',close(r.low,m.ret[0])&&close(r.high,m.ret[1])&&r.base===null,r);ok(T,'retention labelled published reference',r.basis==='published_reference'&&/Published reference/i.test(txt))}else ok(T,'no retention number for event ≤10 mm',r.unavailable===true&&r.low===undefined,r);
   if(m.ref){ok(T,'reference cost scaled',res.reference_cost.scaled&&close(res.reference_cost.scaled.low,m.ref.low)&&close(res.reference_cost.scaled.median,m.ref.median)&&close(res.reference_cost.scaled.high,m.ref.high),[res.reference_cost.scaled,m.ref]);ok(T,'reference cost displayed with Hamburg 2017',shown(txt,m.ref.low)&&/Hamburg/.test(txt)&&/2017/.test(txt))}else ok(T,'no reference cost outside 196–1,944 m²',!res.reference_cost||!res.reference_cost.scaled&&!!res.reference_cost.outside_range||!res.reference_cost.scaled,res.reference_cost&&res.reference_cost.scaled);
   ok(T,'waterproofing toggle: included flag consistent',inp.include_waterproofing?res.costs.capex.components.some(c=>c.id==='waterproofing'&&c.included):res.costs.capex.components.some(c=>c.id==='waterproofing'&&c.included===false))}
  if(sid==='NBS03'){ok(T,'component areas',['area_trees','area_meadow','area_water','area_hard'].every((k,j)=>close(o(k).value,m.areas[j])));ok(T,'irrigation water',tri(o('irrigation_water'),m.water),[o('irrigation_water'),m.water])}
  if(sid==='NBS04'){ok(T,'storage capacity',tri(o('storage_capacity'),m.store),[o('storage_capacity'),m.store]);
   if(m.runoff){ok(T,'runoff volume',tri(o('runoff_volume'),m.runoff));ok(T,'storage/runoff ratio',tri(o('storage_vs_runoff'),m.ratio),[o('storage_vs_runoff'),m.ratio])}else ok(T,'runoff & ratio unavailable (never zero) without catchment',o('runoff_volume').unavailable&&o('storage_vs_runoff').unavailable,res.outputs.map(x=>[x.id,x.unavailable,x.value]))}
  if(sid==='NBS05'){ok(T,'corridor area',close(o('corridor_area').value,m.area));ok(T,'tree count',o('trees').value===m.trees);ok(T,'irrigation water',tri(o('irrigation_water'),m.water),[o('irrigation_water'),m.water])}
  // unsupported impacts never quantified
  ok(T,'unsupported climate impacts not quantified',/not currently estimated/i.test(txt)&&!res.outputs.some(x=>/temperature|flood_risk|peak|comfort/.test(x.id)));
  // reset
  for(const [k,v] of Object.entries(over)){const dv=defaults(sid)[k];if(typeof v==='boolean'){const c=await p.isChecked('#ex-'+k);if(c!==dv)await p.click('#ex-'+k)}else await p.fill('#ex-'+k,dv===null||dv===undefined?'':String(dv))}
 }
 // invalid cases
 for(const [name,over] of INVALID(sid)){const T=`${sid} INVALID ${name}`;
  for(const [k,v] of Object.entries(over)){await p.evaluate(([k,v])=>{const e=document.getElementById('ex-'+k);e.value=String(v);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))},[k,v])}
  await p.waitForTimeout(250);
  const res=await p.evaluate(()=>JSON.parse(JSON.stringify(NBS4MED_EXPLORE.state.res)));
  const txt=await p.evaluate(()=>document.getElementById('exResults').innerText);
  const flagged=await p.evaluate(()=>!!document.querySelector('[data-in][aria-invalid="true"], .input-err, .err'));
  ok(T,'rejected (status invalid)',res.status==='invalid',[res.status,res.errors]);
  ok(T,'no numeric outputs or costs shown for invalid input',!res.costs&&res.outputs.length===0&&!/EUR\s*[\d,]{4,}/.test(txt)&&!/\d{2,3},\d{3}\s*EUR/.test(txt),txt.slice(0,200));
  ok(T,'error message / field flag visible',flagged||/enter|between|required|must|invalid|valid|sum|100/i.test(txt),txt.slice(0,160));
  for(const [k] of Object.entries(over)){const dv=defaults(sid)[k];await p.evaluate(([k,v])=>{const e=document.getElementById('ex-'+k);e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))},[k,dv===null||dv===undefined?'':String(dv)])}
  // restore NBS03 shares if altered
  if(sid==='NBS03'){for(const [k,v] of Object.entries({share_trees:40,share_meadow:35,share_water:10,share_hard:15}))await p.evaluate(([k,v])=>{const e=document.getElementById('ex-'+k);e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}))},[k,v])}
 }
 await p.waitForTimeout(500);
 const back=await p.evaluate(()=>NBS4MED_EXPLORE.state.res.status);ok(sid,'recovers to ok after invalid entries reset',back==='ok',back);
}
ok('all','no JS errors',errs.length===0,errs);
fs.writeFileSync('qa2_log.json',JSON.stringify(log));
console.log(`qa2: ${pass} passed, ${fail} failed (${log.length} checks)`);await b.close()})();
