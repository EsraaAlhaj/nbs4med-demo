#!/usr/bin/env node
/*
 * Keeps the two JavaScript data files in step with their JSON sources.
 *
 *   data/evidence.json         ->  data/evidence.js          (window.NBS4MED_EVIDENCE)
 *   data/demo_parameters.json  ->  data/demo_parameters.js   (window.NBS4MED_PARAMS)
 *
 * The .json files are the source of truth and the place to edit. The .js files are copies that
 * index.html loads with <script> tags, so the page also works when opened straight from disk
 * (browsers do not allow fetch() of local files).
 *
 *   node tools/sync-data.js            rewrite the .js copies from the .json files
 *   node tools/sync-data.js --check    only compare; exit code 1 if a copy differs (used by the tests)
 *
 * The comparison is on the parsed data, so line endings and formatting do not matter.
 * No dependencies; Node.js 18 or newer.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA = path.join(__dirname, '..', 'data');
const PAIRS = [
  { json: 'evidence.json', js: 'evidence.js', global: 'NBS4MED_EVIDENCE' },
  { json: 'demo_parameters.json', js: 'demo_parameters.js', global: 'NBS4MED_PARAMS' },
];

function readJson(file) { return JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf8')); }

// the data a .js copy would put on window, obtained by running the file in an empty sandbox
function readJsPayload(file, name) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(DATA, file), 'utf8'), sandbox, { filename: file });
  return sandbox.window[name];
}

function render(p, data) {
  return '/* Generated from data/' + p.json + '. Edit the .json, then run: node tools/sync-data.js */\n' +
    'window.' + p.global + ' = ' + JSON.stringify(data, null, 2) + ';\n';
}

function inSync(p) {
  let copy;
  try { copy = readJsPayload(p.js, p.global); } catch (e) { return false; }
  return copy !== undefined && JSON.stringify(copy) === JSON.stringify(readJson(p.json));
}

const check = process.argv.includes('--check');
let bad = 0;
for (const p of PAIRS) {
  const ok = inSync(p);
  if (check) {
    console.log((ok ? 'in sync   ' : 'DIFFERENT ') + 'data/' + p.js + '  <-  data/' + p.json);
    if (!ok) bad++;
  } else if (ok) {
    console.log('unchanged data/' + p.js + ' (already matches data/' + p.json + ')');
  } else {
    fs.writeFileSync(path.join(DATA, p.js), render(p, readJson(p.json)));
    console.log('written   data/' + p.js);
  }
}
if (check && bad) {
  console.error('\n' + bad + ' data copy/copies differ from the JSON source. Run: node tools/sync-data.js');
  process.exit(1);
}
