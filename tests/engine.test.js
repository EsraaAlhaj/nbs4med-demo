#!/usr/bin/env node
/*
 * Automated tests for the calculation engine and the data files (no browser, no dependencies).
 *   node tests/engine.test.js
 *
 * What is checked
 *  1. data/*.js copies match their JSON sources.
 *  2. Data integrity and the research rules recorded in the data (no evidence record is a local forecast, ...).
 *  3. The parameter table in docs/CALCULATIONS.md equals data/demo_parameters.json.
 *  4. The worked examples of TECHNICAL_DOCUMENTATION.md section 7 (all five calculators) against js/engine.js,
 *     plus an independent re-computation of the costs from the parameter file.
 *  5. Engine rules: validation, unavailable-not-zero, the 10 mm threshold for green-roof retention, user-entered prices.
 *
 * The expected numbers are written out literally so a change in the engine, the data or the documentation is noticed.
 * Passing these tests shows that the implementation reproduces the documented examples; it does not validate the
 * assumptions behind them (see TECHNICAL_DOCUMENTATION.md, sections 8 and 12).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
const win = {}; win.window = win;
vm.createContext(win);
for (const f of ['data/evidence.js', 'data/demo_parameters.js', 'js/engine.js']) vm.runInContext(read(f), win, { filename: f });
const EV = JSON.parse(read('data', 'evidence.json'));
const PM = JSON.parse(read('data', 'demo_parameters.json'));
const E = win.NBS4MED_ENGINE;
E.init(win.NBS4MED_EVIDENCE, win.NBS4MED_PARAMS);

let pass = 0, fail = 0;
function test(name, fn) {
  try { fn(); pass++; } catch (e) { fail++; console.log('FAIL  ' + name + '\n      ' + String(e.message).split('\n').join('\n      ')); }
}
const plain = (x) => JSON.parse(JSON.stringify(x)); // objects created inside the vm sandbox have a different prototype
const near = (a, b, msg) => assert.ok(Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)), (msg || '') + ' expected ' + b + ', got ' + a);
const out = (r, id) => r.outputs.find((o) => o.id === id);
const run = (sid, inputs, prices) => E.calculate(sid, inputs, Object.fromEntries(Object.keys(inputs).map((k) => [k, 1])), prices || {});
const tri = (o, lo, ba, hi, label) => { near(o.low, lo, label + ' low'); near(o.base, ba, label + ' base'); near(o.high, hi, label + ' high'); };

/* ---------- 1. data copies ---------- */
test('data/*.js copies match the JSON sources (node tools/sync-data.js --check)', () => {
  for (const [j, name] of [['evidence.json', 'NBS4MED_EVIDENCE'], ['demo_parameters.json', 'NBS4MED_PARAMS']]) {
    assert.deepEqual(plain(win[name]), JSON.parse(read('data', j)), j + ' differs from its .js copy');
  }
});

/* ---------- 2. data integrity and recorded rules ---------- */
test('evidence register: expected structure and unique ids', () => {
  assert.equal(EV.evidence.length, 22); assert.equal(EV.sources.length, 8); assert.equal(EV.rules.length, 10);
  assert.equal(EV.solutions.length, 5); assert.equal(EV.methods.length, 5);
  const ids = EV.evidence.map((r) => r.evidence_id); assert.equal(new Set(ids).size, ids.length);
  const src = new Set(EV.sources.map((s) => s.source_id));
  EV.evidence.forEach((r) => r.source_ids.forEach((s) => assert.ok(src.has(s), r.evidence_id + ' cites unknown source ' + s)));
});
test('research rule: no evidence record is usable as a local forecast', () => {
  EV.evidence.forEach((r) => assert.equal(r.usable_for_local_forecast, false, r.evidence_id));
});
test('parameters: unique ids, known source classes, every cost component points to an existing parameter', () => {
  const ids = PM.parameters.map((p) => p.id); assert.equal(new Set(ids).size, ids.length); assert.equal(ids.length, 43);
  PM.parameters.forEach((p) => {
    assert.ok(p.source_class in PM.meta.source_classes, p.id + ' has unknown source_class ' + p.source_class);
    assert.ok(p.value.low <= p.value.base && p.value.base <= p.value.high, p.id + ' low <= base <= high');
  });
  Object.values(PM.solutions).forEach((s) => s.components.forEach((c) => [c.capex, c.annual].filter(Boolean).forEach((id) => assert.ok(ids.includes(id), 'missing parameter ' + id))));
});

/* ---------- 3. docs/CALCULATIONS.md parameter table equals the JSON ---------- */
test('docs/CALCULATIONS.md parameter table equals data/demo_parameters.json (id, low / base / high, unit)', () => {
  const rows = read('docs', 'CALCULATIONS.md').split('\n').filter((l) => /^\| NBS\d\d\.[a-z0-9_]+ \|/.test(l)).map((l) => l.split('|').map((c) => c.trim()));
  const byId = Object.fromEntries(PM.parameters.map((p) => [p.id, p]));
  const documented = rows.filter((r) => byId[r[1]]);
  assert.equal(documented.length, PM.parameters.length, 'documented parameter rows');
  documented.forEach((r) => {
    const p = byId[r[1]], v = p.value;
    assert.equal(r[4], [v.low, v.base, v.high].join(' / '), r[1] + ' value'); assert.equal(r[5], p.unit, r[1] + ' unit');
  });
});

/* ---------- 4. worked examples (TECHNICAL_DOCUMENTATION.md section 7) ---------- */
test('NBS01 urban forest: 2,000 m2, 3 plants/m2, 120 days', () => {
  const r = run('NBS01', { area_m2: 2000, density_per_m2: 3, water_days: 120 });
  near(out(r, 'plants').value, 6000, 'plants'); tri(out(r, 'establishment_water'), 480, 960, 1920, 'water');
  tri(r.costs.capex.total, 25500, 52000, 104000, 'CAPEX'); tri(r.costs.annual.total, 3000, 6000, 12000, 'annual');
});
test('NBS02 green roof: 800 m2, 30 mm (documented example)', () => {
  const r = run('NBS02', { area_m2: 800, storm_depth_mm: 30, substrate_depth_m: 0.08, include_waterproofing: true });
  near(out(r, 'rain_volume').value, 24, 'rain'); near(out(r, 'substrate_volume').value, 64, 'substrate');
  const ret = out(r, 'event_retained'); near(ret.low, 6.432, 'retained low'); near(ret.high, 14.832, 'retained high'); assert.equal(ret.base, null, 'no central estimate');
  tri(r.costs.capex.total, 23240, 41860, 78160, 'CAPEX'); tri(r.costs.annual.total, 800, 2000, 4000, 'annual');
  near(r.reference_cost.scaled.low, 23200); near(r.reference_cost.scaled.median, 35200); near(r.reference_cost.scaled.high, 58400);
  assert.deepEqual(plain(r.not_calculated), ['annual_retention', 'peak_reduction', 'air_temperature', 'surface_temperature']);
});
test('NBS03 eco-park: default 5,000 m2, shares 40/35/10/15, 120 days', () => {
  const r = run('NBS03', { area_m2: 5000, share_trees: 40, share_meadow: 35, share_water: 10, share_hard: 15, water_days: 120 });
  [['area_trees', 2000], ['area_meadow', 1750], ['area_water', 500], ['area_hard', 750]].forEach(([id, v]) => near(out(r, id).value, v, id));
  tri(out(r, 'irrigation_water'), 690, 1590, 2490, 'water'); tri(r.costs.capex.total, 113500, 210750, 376000, 'CAPEX'); tri(r.costs.annual.total, 6750, 13850, 27875, 'annual');
  assert.ok(r.not_calculated.includes('aggregate_impact'));
});
test('NBS04 retention basin: 500 m2 footprint, 5,000 m2 catchment, 25 mm, 1 m, 2 structures', () => {
  const r = run('NBS04', { footprint_m2: 500, catchment_m2: 5000, storm_depth_mm: 25, storage_depth_m: 1, structures: 2 });
  tri(out(r, 'storage_capacity'), 350, 400, 450, 'storage'); tri(out(r, 'runoff_volume'), 75, 93.75, 112.5, 'runoff');
  const q = out(r, 'storage_vs_runoff'); near(q.low, 350 / 112.5 * 100, 'ratio low'); near(q.base, 400 / 93.75 * 100, 'ratio base'); near(q.high, 600, 'ratio high');
  tri(r.costs.capex.total, 17500, 35000, 70000, 'CAPEX'); tri(r.costs.annual.total, 400, 900, 2000, 'annual');
});
test('NBS05 green corridor: 300 m x 3 m, trees every 8 m, one row, 120 days', () => {
  const r = run('NBS05', { length_m: 300, width_m: 3, tree_spacing_m: 8, tree_rows: 1, water_days: 120 });
  near(out(r, 'corridor_area').value, 900); near(out(r, 'trees').value, 37); tri(out(r, 'irrigation_water'), 196.8, 393.6, 787.2, 'water');
  tri(r.costs.capex.total, 19150, 38900, 75700, 'CAPEX'); tri(r.costs.annual.total, 1270, 2725, 5450, 'annual');
});

/* independent re-computation of every cost total from the parameter file (does not use engine.js) */
test('costs: independent recomputation from the parameter file, all five calculators', () => {
  const P = Object.fromEntries(PM.parameters.map((p) => [p.id, p.value]));
  const cases = {
    NBS01: [{ area_m2: 2000, density_per_m2: 3 }, { area_m2: 2000, plants: 6000, lump: 1 }],
    NBS02: [{ area_m2: 800, storm_depth_mm: 30 }, { area_m2: 800, substrate_m3: 64, lump: 1 }],
    NBS03: [{ area_m2: 5000, share_trees: 40, share_meadow: 35, share_water: 10, share_hard: 15 }, { area_trees: 2000, area_meadow: 1750, area_water: 500, area_hard: 750, area_irrigated: 3750, lump: 1 }],
    NBS04: [{ footprint_m2: 500, catchment_m2: 5000, storm_depth_mm: 25, structures: 2 }, { footprint_m2: 500, excavation_m3: 500, structures: 2, lump: 1 }],
    NBS05: [{ length_m: 300, width_m: 3 }, { length_m: 300, area_m2: 900, trees: 37, lump: 1 }],
  };
  for (const [sid, [inputs, qty]] of Object.entries(cases)) {
    const r = run(sid, inputs);
    for (const kind of ['capex', 'annual']) for (const lvl of ['low', 'base', 'high']) {
      let sum = 0;
      PM.solutions[sid].components.forEach((c) => { const pid = c[kind]; if (pid) sum += qty[c.quantity] * P[pid][lvl]; });
      near(r.costs[kind].total[lvl], sum, sid + ' ' + kind + ' ' + lvl);
    }
  }
});

/* ---------- 5. engine rules ---------- */
test('green roof retention is shown only for events above 10 mm', () => {
  const at10 = out(run('NBS02', { area_m2: 800, storm_depth_mm: 10 }), 'event_retained');
  assert.equal(at10.unavailable, true); assert.equal(at10.reason, 'small_event');
  const above = out(run('NBS02', { area_m2: 800, storm_depth_mm: 10.5 }), 'event_retained');
  near(above.low, 800 * 10.5 / 1000 * 0.268); near(above.high, 800 * 10.5 / 1000 * 0.618);
});
test('green roof reference cost only inside the area range of the published cases (196 to 1,944 m2)', () => {
  assert.equal(run('NBS02', { area_m2: 100, storm_depth_mm: 30 }).reference_cost.outside_range, true);
  assert.ok(run('NBS02', { area_m2: 1944, storm_depth_mm: 30 }).reference_cost.scaled);
});
test('missing values are unavailable or invalid, never zero', () => {
  const noCatch = run('NBS04', { footprint_m2: 500 });
  assert.equal(out(noCatch, 'runoff_volume').unavailable, true); assert.equal(out(noCatch, 'storage_vs_runoff').unavailable, true);
  assert.equal(E.calculate('NBS01', {}, {}, {}).status, 'invalid');
});
test('validation: zero, negative, out-of-range and eco-park shares not summing to 100', () => {
  assert.deepEqual(plain(run('NBS01', { area_m2: 0 }).errors.map((e) => e.code)), ['zero']);
  assert.deepEqual(plain(run('NBS01', { area_m2: -5 }).errors.map((e) => e.code)), ['negative']);
  assert.deepEqual(plain(run('NBS01', { area_m2: 100001 }).errors.map((e) => e.code)), ['range']);
  const sh = run('NBS03', { area_m2: 5000, share_trees: 50, share_meadow: 20, share_water: 10, share_hard: 10 });
  assert.equal(sh.status, 'invalid'); assert.equal(sh.errors[0].code, 'shares'); assert.equal(sh.errors[0].sum, 90);
});
test('warnings: input outside the range the demo parameters were set for, and an untouched default storm depth', () => {
  assert.ok(run('NBS01', { area_m2: 50 }).warnings.some((w) => w.code === 'outside_validity'));
  assert.ok(E.calculate('NBS02', { area_m2: 800, storm_depth_mm: 25 }, { area_m2: 1 }, {}).warnings.some((w) => w.code === 'default_used'));
});
test('a user-entered unit price replaces the low/base/high scenario values and is labelled', () => {
  const r = run('NBS02', { area_m2: 800, storm_depth_mm: 30 }, { 'NBS02.substrate_price': 100 });
  tri(r.costs.capex.total, 23240 - 3840 + 6400, 41860 - 5760 + 6400, 78160 - 8960 + 6400, 'CAPEX with a user price');
  assert.equal(r.costs.capex.components.find((c) => c.id === 'substrate').source_class, 'user_entered');
});
test('the optional waterproofing component can be excluded', () => {
  const r = run('NBS02', { area_m2: 800, storm_depth_mm: 30, include_waterproofing: false });
  near(r.costs.capex.total.base, 41860 - 800 * 14, 'CAPEX without waterproofing');
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
