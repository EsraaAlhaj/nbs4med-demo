// Worked examples of TECHNICAL_DOCUMENTATION.md (sections 2, 5 and 6) checked against the real page.
// Hypothetical "Example City" data only. Usage: node tests/browser/examples.js [page-url]
const TH = require('./helpers'), { chromium } = TH;
let pass = 0, fail = 0;
const ok = (name, cond, detail) => { if (cond) pass++; else { fail++; console.log('FAIL', name, detail === undefined ? '' : JSON.stringify(detail).slice(0, 400)); } };
(async () => {
  const b = await chromium.launch({ executablePath: TH.chromePath });
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(process.argv[2] || TH.indexUrl);
  const run = (spec) => p.evaluate((d) => {
    const C = NBS4MED_CORE, s = C.freshState();
    s.scope = { area: 'other', mName: 'Example City', mCountry: 'X', mCity: 'Y', type: 'municipality', typeAuto: false, org: '', date: '2026-01-01' };
    s.ctx = d.ctx; s.risks = d.risks; s.sc = d.sc; s.just = d.just || {}; C.setState(s);
    const c = C.calc(), r = C.recs();
    return { per: c.per.map((x) => ({ pct: x.pct, status: x.status, sum: x.sum, max: x.max })), ov: c.ov, pct: c.pct, lvl: c.lvl && C.LEVELS[c.lvl].en,
      ranked: r.ranked.map((x) => x.o.id + ':' + x.s).join(' '), other: r.other.map((x) => x.o.id + ':' + x.s).join(' '), blocked: !!r.blocked,
      gaps: C.gapItems('en').map((g) => g.i.id + ':' + g.type).join(' ') };
  }, spec);
  const A = { '1.1': 2, '1.2': 1, '1.3': 0, '2.1': 1, '2.2': 2, '2.3': 0, '3.1': 1, '3.2': 'U', '3.3': 1, '4.1': 2, '4.2': 'NA', '5.1': 1, '5.2': 0, '5.3': 0 };
  const heatFlood = { heat: true, flood: true }, mid = { density: 'high', land: 'mid' };

  // section 2 / 5.4: first run, Unknown in 3.2 and Not applicable in 4.2
  let r = await run({ sc: A, risks: heatFlood, ctx: mid, just: { '4.2': 'No NGOs operate here' } });
  ok('A: criterion percentages', JSON.stringify(r.per.map((x) => x.pct)) === JSON.stringify([50, 50, null, 100, 17]), r.per);
  ok('A: C3 is incomplete (Unknown), C4 complete', r.per[2].status === 'incomplete' && r.per[3].status === 'complete');
  ok('A: overall score withheld while an indicator is Unknown (11 / 24 points computed)', r.pct === null && r.ov.sum === 11 && r.ov.max === 24 && r.ov.unk === 1 && r.ov.na === 1, r.ov);
  ok('A: gaps listed as Gap / Partial / To verify in the documented order', r.gaps === '1.3:Gap 2.3:Gap 5.2:Gap 5.3:Gap 1.2:Partial 2.1:Partial 3.1:Partial 3.3:Partial 5.1:Partial 3.2:To verify', r.gaps);

  // after 3.2 is resolved
  r = await run({ sc: { ...A, '3.2': 1 }, risks: heatFlood, ctx: mid, just: { '4.2': 'x' } });
  ok('B: overall 12 / 26 = 46%, Partial', r.pct === 46 && r.ov.sum === 12 && r.ov.max === 26 && r.lvl === 'Partial', r.ov);
  ok('B: C3 now 50%', r.per[2].pct === 50);

  // section 6.2: heatwaves + flooding, High density, Moderate land
  ok('matching example 1 (6.2)', r.ranked === 'tiny:67 roof:67 street:67 swale:67 eco:58 perm:50 pocket:50 wet:42 dune:17', r.ranked);
  // 4.2 scored instead of Not applicable
  r = await run({ sc: { ...A, '3.2': 1, '4.2': 1 }, risks: heatFlood, ctx: mid });
  ok('D: with 4.2 scored 1, C4 = 75% and overall 13 / 28 = 46%', r.per[3].pct === 75 && r.ov.sum === 13 && r.ov.max === 28 && r.pct === 46, r.ov);
  // section 6.3: flooding only, High density, Limited land
  r = await run({ sc: { ...A, '3.2': 1, '4.2': 1 }, risks: { flood: true }, ctx: { density: 'high', land: 'low' } });
  ok('matching example 2 (6.3)', r.ranked.startsWith('perm:100 swale:85 roof:67 wet:60 street:33 eco:27'), r.ranked);
  // zero-score options go to "Other options"
  r = await run({ sc: { ...A, '3.2': 1, '4.2': 1 }, risks: { heat: true }, ctx: { density: 'low', land: 'high' } });
  ok('options with score 0 are listed as other options', r.other === 'perm:0 dune:0', r.other);
  // matching is blocked, not guessed
  for (const [label, risks, ctx] of [['coastal storms', { heat: true, coast: true }, mid], ['land degradation', { land: true }, mid], ['Not sure', { unsure: true }, mid], ['public land Unknown', { heat: true }, { density: 'high', land: 'unknown' }]]) {
    r = await run({ sc: { ...A, '3.2': 1, '4.2': 1 }, risks, ctx });
    ok('matching blocked: ' + label, r.blocked === true && r.ranked === '', r);
  }
  // section 5.5 (2): thresholds are applied to the rounded percentage (12 / 22 = 54.55% -> 55%, Adequate)
  r = await run({ sc: { '1.1': 2, '1.2': 1, '1.3': 1, '2.1': 1, '2.2': 1, '2.3': 1, '3.1': 1, '3.2': 1, '3.3': 1, '4.1': 1, '4.2': 1, '5.1': 'NA', '5.2': 'NA', '5.3': 'NA' }, risks: heatFlood, ctx: mid, just: { '5.1': 'x', '5.2': 'x', '5.3': 'x' } });
  ok('5.5(2) documented rounding behaviour: 12 / 22 -> 55%, Adequate', r.pct === 55 && r.ov.sum === 12 && r.ov.max === 22 && r.lvl === 'Adequate', r);
  // section 5.5 (1): all indicators of a criterion Not applicable -> no percentage
  r = await run({ sc: { ...A, '3.2': 1, '4.1': 'NA', '4.2': 'NA' }, risks: heatFlood, ctx: mid, just: { '4.1': 'x', '4.2': 'x' } });
  ok('all indicators of C4 Not applicable: status na, no percentage; overall 10 / 24 = 42%', r.per[3].status === 'na' && r.per[3].pct === null && r.pct === 42, r.per[3]);
  ok('no JavaScript errors', errs.length === 0, errs);
  console.log('\nexamples.js: ' + pass + ' passed, ' + fail + ' failed');
  await b.close(); process.exit(fail ? 1 : 0);
})();
