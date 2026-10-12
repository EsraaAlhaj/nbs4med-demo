/*
 * NBS4MED demo calculation engine.
 * No DOM access. Reads window.NBS4MED_EVIDENCE (data/evidence.json) and
 * window.NBS4MED_PARAMS (data/demo_parameters.json). Replace those two data files
 * when the repository / PROMEA framework arrives; the formulas live here and are
 * documented in docs/CALCULATIONS.md.
 *
 * Rules enforced here (from the evidence database, ReadMe and Rules sheets):
 *  - No record is used as a local forecast (usable_for_local_forecast stays false).
 *  - Missing values are "unavailable", never zero.
 *  - Different outcome variables and statistics are never pooled.
 *  - Records of one study are not counted as independent studies.
 */
(function (root) {
  'use strict';
  var E = {};
  var EV = null, PM = null, evById = {}, parById = {};

  E.init = function (evidence, params) {
    EV = evidence; PM = params; evById = {}; parById = {};
    EV.evidence.forEach(function (r) { evById[r.evidence_id] = r; });
    PM.parameters.forEach(function (p) { parById[p.id] = p; });
  };
  E.meta = function () { return PM.meta; };
  E.sources = function () { return EV.sources; };
  E.solutions = function () { return EV.solutions; };
  E.solutionDef = function (id) { return PM.solutions[id]; };
  E.param = function (id) { return parById[id]; };
  E.rules = function () { return EV.rules; };

  function scen(p) {
    var v = p.value;
    return { low: v.low !== undefined ? v.low : v.base, base: v.base, high: v.high !== undefined ? v.high : v.base };
  }
  function isNum(x) { return typeof x === 'number' && isFinite(x); }
  function round(x, d) { var m = Math.pow(10, d || 0); return Math.round(x * m) / m; }

  /* ---------- evidence classification ---------- */
  var CATEGORY = {
    air_temperature_contrast: 'air_temperature',
    air_temperature_park_cooling_intensity: 'air_temperature',
    mean_radiant_temperature_contrast: 'thermal_comfort',
    event_rainfall_retention_fraction: 'event_retention',
    green_roof_construction_cost: 'capex_reference',
    stormwater_pond_construction_cost: 'capex_reference',
    'Wetland construction': 'capex_reference',
    'Wetland planning': 'capex_reference',
    'Maintenance in 2012': 'maintenance_observed',
    'Maintenance in 2013': 'maintenance_observed',
    qualitative_function: 'qualitative'
  };
  E.category = function (rec) { return CATEGORY[rec.outcome_variable] || 'other'; };

  /* All records of a solution, grouped so that nothing is pooled across outcome or statistic. */
  E.evidenceCards = function (solutionId) {
    var recs = EV.evidence.filter(function (r) { return r.solution_id === solutionId; });
    var groups = {};
    recs.forEach(function (r) {
      var k = E.category(r) + '|' + r.outcome_variable + '|' + r.statistic_type;
      (groups[k] = groups[k] || { category: E.category(r), outcome: r.outcome_variable, statistic: r.statistic_type, records: [] }).records.push(r);
    });
    var studies = {};
    recs.forEach(function (r) { if (r.study_group) studies[r.study_group] = 1; });
    return {
      records: recs,
      groups: Object.keys(groups).map(function (k) { return groups[k]; }),
      independentStudyCount: Object.keys(studies).length,
      recordCount: recs.length
    };
  };
  E.sourcesFor = function (ids) {
    var seen = {}, out = [];
    ids.forEach(function (id) { if (!seen[id]) { seen[id] = 1; var s = EV.sources.filter(function (x) { return x.source_id === id; })[0]; if (s) out.push(s); } });
    return out;
  };

  /* ---------- inputs ---------- */
  E.defaults = function (solutionId) {
    var o = {};
    PM.solutions[solutionId].inputs.forEach(function (d) { o[d.id] = d.default; });
    return o;
  };

  function resolveInputs(solutionId, raw, touched) {
    var defs = PM.solutions[solutionId].inputs, vals = {}, prov = {}, errors = [], warnings = [];
    defs.forEach(function (d) {
      var v = raw[d.id], blank = v === undefined || v === null || v === '';
      if (d.type === 'boolean') { vals[d.id] = blank ? !!d.default : !!v; prov[d.id] = touched && touched[d.id] ? 'user_entered' : 'demo_default'; return; }
      if (blank) {
        if (d.required) { errors.push({ field: d.id, code: 'missing' }); vals[d.id] = null; prov[d.id] = null; return; }
        if (d.default === null || d.default === undefined) { vals[d.id] = null; prov[d.id] = null; return; }
        vals[d.id] = d.default; prov[d.id] = 'demo_default'; return;
      }
      var n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'));
      if (!isNum(n)) { errors.push({ field: d.id, code: 'invalid' }); vals[d.id] = null; return; }
      if (n === 0 && d.min > 0) { errors.push({ field: d.id, code: 'zero' }); vals[d.id] = null; return; }
      if (n < 0) { errors.push({ field: d.id, code: 'negative' }); vals[d.id] = null; return; }
      if (n < d.min || n > d.max) { errors.push({ field: d.id, code: 'range', min: d.min, max: d.max }); vals[d.id] = null; return; }
      vals[d.id] = n;
      prov[d.id] = touched && touched[d.id] ? 'user_entered' : 'demo_default';
    });
    return { vals: vals, prov: prov, errors: errors, warnings: warnings };
  }

  /* ---------- quantities (design quantities, not impacts) ---------- */
  var QTY = {
    NBS01: function (i) { return { area_m2: i.area_m2, plants: Math.ceil(i.area_m2 * i.density_per_m2), lump: 1 }; },
    NBS02: function (i) { return { area_m2: i.area_m2, substrate_m3: i.area_m2 * i.substrate_depth_m, lump: 1 }; },
    NBS03: function (i) {
      var a = i.area_m2, f = function (s) { return a * s / 100; };
      var t = f(i.share_trees), m = f(i.share_meadow), w = f(i.share_water), h = f(i.share_hard);
      return { area_m2: a, area_trees: t, area_meadow: m, area_water: w, area_hard: h, area_irrigated: t + m, lump: 1 };
    },
    NBS04: function (i) { return { footprint_m2: i.footprint_m2, excavation_m3: i.footprint_m2 * i.storage_depth_m, structures: i.structures, lump: 1 }; },
    NBS05: function (i) {
      var area = i.length_m * i.width_m;
      return { length_m: i.length_m, area_m2: area, trees: Math.floor(i.length_m / i.tree_spacing_m) * i.tree_rows, lump: 1 };
    }
  };

  /* ---------- cost builder: Σ(quantity × unit price) ---------- */
  function buildCosts(solutionId, q, inputs, prices) {
    var def = PM.solutions[solutionId], capex = [], annual = [], incomplete = false;
    def.components.forEach(function (c) {
      if (c.optional_input && !inputs[c.optional_input]) {
        capex.push({ id: c.id, included: false, reason: 'excluded_by_user' });
        return;
      }
      var qty = q[c.quantity];
      var rows = [['capex', c.capex, capex], ['annual', c.annual, annual]];
      rows.forEach(function (r) {
        if (!r[1]) return;
        var p = parById[r[1]];
        var userPrice = prices && prices[r[1]];
        var hasUser = userPrice !== undefined && userPrice !== null && userPrice !== '' && isNum(Number(userPrice)) && Number(userPrice) >= 0;
        var sc = hasUser ? { low: Number(userPrice), base: Number(userPrice), high: Number(userPrice) } : scen(p);
        var row = { id: c.id, param_id: r[1], quantity: qty, qty_unit: c.qty_unit, unit: p.unit, included: true,
          source_class: hasUser ? 'user_entered' : 'demo_assumption', scope: p.scope_en, valid_range: p.valid_range, partner_validated: p.partner_validated };
        if (!isNum(qty)) { row.unavailable = true; incomplete = true; }
        else {
          row.unit_price = sc;
          row.subtotal = { low: qty * sc.low, base: qty * sc.base, high: qty * sc.high };
        }
        r[2].push(row);
      });
    });
    function total(rows) {
      var t = { low: 0, base: 0, high: 0 }, n = 0;
      rows.forEach(function (r) { if (r.included && r.subtotal) { t.low += r.subtotal.low; t.base += r.subtotal.base; t.high += r.subtotal.high; n++; } });
      return n ? t : null;
    }
    return { currency: PM.meta.currency, price_year: PM.meta.price_year, capex: { components: capex, total: total(capex) },
      annual: { components: annual, total: total(annual) }, incomplete: incomplete };
  }

  /* ---------- published reference-case cost scaling (green roof) ---------- */
  function roofReference(area) {
    var cases = EV.evidence.filter(function (r) {
      return r.solution_id === 'NBS02' && r.statistic_type === 'single_case' && r.outcome_variable === 'green_roof_construction_cost' &&
        /^extensive/i.test(String(r.design || ''));
    });
    if (!cases.length) return null;
    var vals = cases.map(function (r) { return r.min_or_value; }).sort(function (a, b) { return a - b; });
    var areas = cases.map(function (r) { return r.area_m2; }).filter(isNum).sort(function (a, b) { return a - b; });
    var mid = vals.length % 2 ? vals[(vals.length - 1) / 2] : (vals[vals.length / 2 - 1] + vals[vals.length / 2]) / 2;
    var first = cases[0];
    var out = {
      evidence_ids: cases.map(function (r) { return r.evidence_id; }),
      n_cases: cases.length, per_m2: { min: vals[0], median: mid, max: vals[vals.length - 1] },
      area_range: [areas[0], areas[areas.length - 1]], unit: first.unit, location: first.location_context,
      price_year: first.price_or_publication_year, scope: first.cost_scope, price_basis: first.price_basis, area_basis: first.area_basis,
      source_ids: first.source_ids, locator: 'S04 Fig.3, printed pp.12-13', study_group: first.study_group,
      cases: cases.map(function (r) { return { id: r.evidence_id, value: r.min_or_value, area_m2: r.area_m2, note: r.design }; })
    };
    if (area >= out.area_range[0] && area <= out.area_range[1]) {
      out.scaled = { low: out.per_m2.min * area, median: out.per_m2.median * area, high: out.per_m2.max * area };
    } else { out.outside_range = true; }
    return out;
  }

  /* ---------- main entry ---------- */
  E.calculate = function (solutionId, raw, touched, prices) {
    var def = PM.solutions[solutionId];
    var res = { solution_id: solutionId, status: 'ok', errors: [], warnings: [], inputs: {}, provenance: {}, quantities: [], outputs: [],
      costs: null, reference_cost: null, not_calculated: [], formulas: [] };
    var r = resolveInputs(solutionId, raw || {}, touched);
    res.inputs = r.vals; res.provenance = r.prov; res.errors = r.errors;
    var i = r.vals;

    /* cross-field validation */
    if (solutionId === 'NBS03' && !r.errors.length) {
      var sum = i.share_trees + i.share_meadow + i.share_water + i.share_hard;
      if (Math.abs(sum - 100) > 0.001) res.errors.push({ field: 'share_trees', code: 'shares', sum: sum });
    }
    if (res.errors.length) { res.status = 'invalid'; return res; }

    var q = QTY[solutionId](i);
    res.quantities = q;

    /* validity-range warnings (demo parameters were set for these ranges) */
    var vr = null;
    Object.keys(parById).forEach(function (k) { var p = parById[k]; if (p.solution_id === solutionId && p.valid_range) vr = p.valid_range; });
    if (vr) {
      var val = i[vr.input];
      if (isNum(val) && (val < vr.min || val > vr.max)) res.warnings.push({ code: 'outside_validity', input: vr.input, min: vr.min, max: vr.max });
    }
    ['storm_depth_mm'].forEach(function (k) {
      if (k in i && r.prov[k] === 'demo_default') res.warnings.push({ code: 'default_used', input: k });
    });

    var O = res.outputs, NC = res.not_calculated;
    function out(o) { O.push(o); }

    if (solutionId === 'NBS01') {
      var wd = scen(parById['NBS01.water_demand_lpd']);
      out({ id: 'plants', group: 'quantity', unit: 'plants', value: q.plants, basis: 'demo_assumption', formula: 'F-N01-PLANTS', exact: true });
      out({ id: 'establishment_water', group: 'resource', unit: 'm³/year', low: q.area_m2 * wd.low * i.water_days / 1000, base: q.area_m2 * wd.base * i.water_days / 1000, high: q.area_m2 * wd.high * i.water_days / 1000, basis: 'demo_assumption', formula: 'F-N01-WATER', param: 'NBS01.water_demand_lpd' });
      NC.push('air_temperature', 'surface_temperature', 'thermal_comfort', 'stormwater');
      res.formulas.push('F-N01-PLANTS', 'F-N01-WATER');
    }
    if (solutionId === 'NBS02') {
      var rain = q.area_m2 * i.storm_depth_mm / 1000;
      out({ id: 'rain_volume', group: 'context', unit: 'm³', value: rain, basis: 'arithmetic', formula: 'F-N02-RAIN', exact: true });
      var g1 = evById.G01, g2 = evById.G02;
      if (i.storm_depth_mm > 10 && g1) {
        out({ id: 'event_retained', group: 'event_retention', unit: 'm³ (one event)', low: rain * g1.min_or_value / 100, high: rain * g1.max / 100,
          base: null, basis: 'published_reference', formula: 'F-N02-RET', evidence: ['G01'], fraction: [g1.min_or_value, g1.max] });
      } else {
        out({ id: 'event_retained', group: 'event_retention', unit: 'm³ (one event)', unavailable: true, reason: 'small_event', basis: 'published_reference', evidence: ['G02'], formula: 'F-N02-RET' });
      }
      out({ id: 'substrate_volume', group: 'quantity', unit: 'm³', value: q.substrate_m3, basis: 'arithmetic', formula: 'F-N02-SUB', exact: true });
      NC.push('annual_retention', 'peak_reduction', 'air_temperature', 'surface_temperature');
      res.reference_cost = roofReference(q.area_m2);
      res.formulas.push('F-N02-RAIN', 'F-N02-RET', 'F-N02-SUB', 'F-REF-ROOF');
    }
    if (solutionId === 'NBS03') {
      var tw = scen(parById['NBS03.tree_water_lpd']), mw = scen(parById['NBS03.meadow_water_lpd']);
      ['area_trees', 'area_meadow', 'area_water', 'area_hard'].forEach(function (k) {
        out({ id: k, group: 'quantity', unit: 'm²', value: q[k], basis: 'arithmetic', formula: 'F-N03-AREAS', exact: true });
      });
      var wv = function (s) { return i.water_days * (q.area_trees * tw[s] + q.area_meadow * mw[s]) / 1000; };
      out({ id: 'irrigation_water', group: 'resource', unit: 'm³/year', low: wv('low'), base: wv('base'), high: wv('high'), basis: 'demo_assumption', formula: 'F-N03-WATER' });
      NC.push('aggregate_impact', 'air_temperature', 'surface_temperature', 'stormwater');
      res.formulas.push('F-N03-AREAS', 'F-N03-WATER');
    }
    if (solutionId === 'NBS04') {
      var sf = scen(parById['NBS04.shape_factor']), rc = scen(parById['NBS04.runoff_coeff']);
      var gross = i.footprint_m2 * i.storage_depth_m;
      out({ id: 'storage_capacity', group: 'storage_capacity', unit: 'm³', low: gross * sf.low, base: gross * sf.base, high: gross * sf.high, basis: 'demo_assumption', formula: 'F-N04-STORE', param: 'NBS04.shape_factor' });
      if (isNum(i.catchment_m2)) {
        var rv = function (s) { return i.catchment_m2 * rc[s] * i.storm_depth_mm / 1000; };
        out({ id: 'runoff_volume', group: 'event_volume', unit: 'm³ (one event)', low: rv('low'), base: rv('base'), high: rv('high'), basis: 'demo_assumption', formula: 'F-N04-RUNOFF', param: 'NBS04.runoff_coeff' });
        out({ id: 'storage_vs_runoff', group: 'volume_balance', unit: '% of one-event runoff volume',
          low: gross * sf.low / rv('high') * 100, base: gross * sf.base / rv('base') * 100, high: gross * sf.high / rv('low') * 100,
          basis: 'demo_assumption', formula: 'F-N04-RATIO' });
      } else {
        out({ id: 'runoff_volume', group: 'event_volume', unit: 'm³ (one event)', unavailable: true, reason: 'no_catchment', basis: 'demo_assumption', formula: 'F-N04-RUNOFF' });
        out({ id: 'storage_vs_runoff', group: 'volume_balance', unit: '%', unavailable: true, reason: 'no_catchment', basis: 'demo_assumption', formula: 'F-N04-RATIO' });
      }
      NC.push('peak_reduction', 'annual_capture', 'flood_risk');
      res.formulas.push('F-N04-STORE', 'F-N04-RUNOFF', 'F-N04-RATIO');
    }
    if (solutionId === 'NBS05') {
      var tw5 = scen(parById['NBS05.tree_water_lpd']), uw5 = scen(parById['NBS05.understory_water_lpd']);
      out({ id: 'corridor_area', group: 'quantity', unit: 'm²', value: q.area_m2, basis: 'arithmetic', formula: 'F-N05-AREA', exact: true });
      out({ id: 'trees', group: 'quantity', unit: 'trees', value: q.trees, basis: 'arithmetic', formula: 'F-N05-AREA', exact: true });
      var w5 = function (s) { return i.water_days * (q.trees * tw5[s] + q.area_m2 * uw5[s]) / 1000; };
      out({ id: 'irrigation_water', group: 'resource', unit: 'm³/year', low: w5('low'), base: w5('base'), high: w5('high'), basis: 'demo_assumption', formula: 'F-N05-WATER' });
      if (q.trees === 0) res.warnings.push({ code: 'no_trees' });
      NC.push('air_temperature', 'surface_temperature', 'thermal_comfort');
      res.formulas.push('F-N05-AREA', 'F-N05-WATER');
    }

    /* Cost */
    var costArea = isNum(q.area_m2) ? q.area_m2 : (q.footprint_m2 || null);
    res.costs = buildCosts(solutionId, q, i, prices);
    res.formulas.push('F-COST');
    res.area_for_report = costArea;
    return res;
  };

  /* ---------- formulas shown in the interface and docs ---------- */
  E.FORMULAS = {
    'F-N01-PLANTS': { expr: 'plants = ceil(A × d)', vars: 'A planted area (m²); d planting density (plants/m²)', unit: 'plants', scope: 'Design quantity. Not an impact.' },
    'F-N01-WATER': { expr: 'V = A × q × n / 1000', vars: 'A area (m²); q water demand (L/m²/day, low/base/high); n irrigation days per year', unit: 'm³/year', scope: 'Resource requirement during establishment. Demo assumption.' },
    'F-N02-RAIN': { expr: 'V_rain = A × h / 1000', vars: 'A roof area (m²); h event rain depth (mm)', unit: 'm³', scope: 'Water that falls on the roof in one event. Not retention.' },
    'F-N02-RET': { expr: 'V_ret = V_rain × r', vars: 'r = published mean per-event retention range of nine UK experimental configurations (source G01), events > 10 mm', unit: 'm³ per event', scope: 'Illustrative scenario for a single event. Not annual retention, not a forecast for your roof.' },
    'F-N02-SUB': { expr: 'V_sub = A × t', vars: 'A roof area (m²); t substrate depth (m)', unit: 'm³', scope: 'Quantity to buy.' },
    'F-REF-ROOF': { expr: 'C_ref = A × c_case', vars: 'c_case = cost per m² of total roof area in each of the seven extensive Hamburg cases (2017 prices)', unit: 'EUR', scope: 'Reference-case scaling, shown only within the area range of the cases. Not a local cost.' },
    'F-N03-AREAS': { expr: 'A_i = A × share_i / 100', vars: 'A park area (m²); share_i percentage of component i', unit: 'm²', scope: 'Design quantities. Aggregate impact is not calculated (rule R04).' },
    'F-N03-WATER': { expr: 'V = n × (A_trees × q_t + A_meadow × q_m) / 1000', vars: 'n irrigation days; q_t, q_m water demand (L/m²/day)', unit: 'm³/year', scope: 'Resource requirement. Demo assumption.' },
    'F-N04-STORE': { expr: 'S = F × D × f', vars: 'F footprint (m²); D average storage depth (m); f usable fraction (low/base/high demo assumption)', unit: 'm³', scope: 'Storage capacity. Not captured volume and not flood-risk reduction.' },
    'F-N04-RUNOFF': { expr: 'R = C × φ × h / 1000', vars: 'C catchment (m²); φ runoff coefficient (low/base/high demo assumption); h event rain depth (mm)', unit: 'm³ per event', scope: 'Volume method for one design storm. Ignores timing, infiltration and outlet design.' },
    'F-N04-RATIO': { expr: 'S / R × 100', vars: 'S storage capacity; R one-event runoff volume', unit: '%', scope: 'Volume balance for one storm. Not a flood-risk or peak-flow reduction.' },
    'F-N05-AREA': { expr: 'A = L × W; trees = floor(L / s) × rows', vars: 'L length (m); W width (m); s spacing (m)', unit: 'm² / trees', scope: 'Design quantities.' },
    'F-N05-WATER': { expr: 'V = n × (trees × q_t + A × q_u) / 1000', vars: 'q_t litres per tree per day; q_u litres per m² per day', unit: 'm³/year', scope: 'Resource requirement. Demo assumption.' },
    'F-COST': { expr: 'Capex = Σ(quantity_i × unit price_i); Annual = Σ(quantity_i × annual unit cost_i)', vars: 'Unit prices are demo assumptions (low/base/high) or user-entered', unit: 'EUR', scope: 'Component sum. Lump sums do not change with area. No economies of scale modelled.' }
  };

  root.NBS4MED_ENGINE = E;
})(window);
