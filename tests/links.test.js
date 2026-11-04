#!/usr/bin/env node
/*
 * Checks that the repository's own references are not broken (no browser, no dependencies):
 *   node tests/links.test.js
 *
 *  - every local src/href in index.html points to an existing file;
 *  - every relative Markdown link points to an existing file, and a #anchor points to an existing heading;
 *  - every `file name` written in code font in the Markdown files that names a repository file
 *    (for example `js/app.js:564` or `docs/CALCULATIONS.md`) exists. A path with a folder must resolve exactly;
 *    a bare file name must exist somewhere in the repository.
 *
 * This is what catches a stale reference after files are moved.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'output']);
const EVIDENCE = path.join('docs', 'qa', 'evidence');

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name), rel = path.relative(root, full);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name) && rel !== EVIDENCE) walk(full, acc); } else acc.push(rel);
  }
  return acc;
}
const files = walk(root);
const fileSet = new Set(files.map((f) => f.split(path.sep).join('/')));
const byBase = {};
fileSet.forEach((f) => { (byBase[path.posix.basename(f)] = byBase[path.posix.basename(f)] || []).push(f); });
const evidenceExists = (rel) => rel.startsWith('docs/qa/evidence/') && fs.existsSync(path.join(root, rel));
const exists = (rel) => fileSet.has(rel) || evidenceExists(rel) || (fs.existsSync(path.join(root, rel)) && fs.statSync(path.join(root, rel)).isDirectory());

const slug = (h) => h.trim().toLowerCase().replace(/`/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
function anchorsOf(rel) {
  const out = new Set(), seen = {};
  fs.readFileSync(path.join(root, rel), 'utf8').split('\n').forEach((l) => {
    const m = /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(l); if (!m) return;
    let s = slug(m[1]); if (seen[s] !== undefined) { seen[s]++; s += '-' + seen[s]; } else seen[s] = 0; out.add(s);
  });
  return out;
}

// names that appear in the documents but are not repository files: a file the page downloads, and file-name endings of generated screenshots
const NOT_REPO_FILES = new Set([
  'nbs4med-demo-report.csv',                                              // the file name of the CSV download
  'qa-tests/verify.js', 'verify_results.json', 'VIDEO_RECORDING_PLAN.md', // exist only on the unmerged branch demo/verification
]);
const isGeneratedSuffix = (t) => t.startsWith('_');

const problems = [];
const bad = (where, what) => problems.push(where + ': ' + what);

/* index.html */
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const m of html.matchAll(/\b(?:src|href)="([^"#?]+)"/g)) {
  const t = m[1]; if (/^(https?:|data:|mailto:|\/\/)/.test(t)) continue;
  if (!exists(t)) bad('index.html', 'missing file ' + t);
}

/* Markdown files (the evidence folders hold screenshots, not documents) */
const mdFiles = files.filter((f) => f.endsWith('.md'));
const anchorCache = {};
for (const md of mdFiles) {
  const dir = path.posix.dirname(md.split(path.sep).join('/'));
  const text = fs.readFileSync(path.join(root, md), 'utf8').replace(/```[\s\S]*?```/g, ''); // ignore code blocks
  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const raw = m[1]; if (/^(https?:|mailto:)/.test(raw)) continue;
    const [p0, frag] = raw.split('#');
    const target = p0 ? path.posix.normalize(path.posix.join(dir, p0)) : md.split(path.sep).join('/');
    if (!exists(target)) { bad(md, 'broken link ' + raw); continue; }
    if (frag && target.endsWith('.md')) {
      anchorCache[target] = anchorCache[target] || anchorsOf(target);
      if (!anchorCache[target].has(frag)) bad(md, 'missing anchor ' + raw);
    }
  }
  for (const m of text.matchAll(/`([A-Za-z0-9_.\/-]+\.(?:js|json|md|html|bat|png|csv|pdf))(?::\d+(?:-\d+)?)?(?:#[\w-]+)?`/g)) {
    const t = m[1]; if (/^(https?:|tests\/output\/)/.test(t) || t.startsWith('//') || NOT_REPO_FILES.has(t) || isGeneratedSuffix(t)) continue;
    const candidates = [t, path.posix.normalize(path.posix.join(dir, t))];
    if (t.includes('/')) { if (!candidates.some(exists)) bad(md, 'stale path `' + t + '`'); }
    else if (!candidates.some(exists) && !byBase[t]) bad(md, 'no such file `' + t + '`');
  }
}

if (problems.length) {
  console.log(problems.join('\n') + '\n\n' + problems.length + ' problem(s) found');
  process.exit(1);
}
console.log('links.test.js: ' + mdFiles.length + ' Markdown files and index.html checked; no broken or stale references');
