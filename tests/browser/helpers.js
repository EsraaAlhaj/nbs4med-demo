// Shared settings for the browser tests. Nothing here is machine-specific.
//
//   NBS4MED_URL        page to test (default: index.html of this repository, as a file:// URL)
//   NBS4MED_OUT        folder for screenshots, PDFs and CSV files the tests write (default: tests/output, not tracked by git)
//   CHROME_PATH        Chromium/Chrome executable (default: the browser installed by Playwright)
//   NBS4MED_REF_INDEX  index.html of an older reference build, used only by the
//                      "identical to the reference" checks (those checks are skipped when it is not set)
//   NBS4MED_SUPPLIED_LOGO  the logo file as supplied by the project, used only by the branding byte-identity check
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { execFileSync } = require('child_process');

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  console.error('Playwright is not installed. From the repository root run: npm install   (then: npx playwright install chromium)');
  process.exit(2);
}

const repoRoot = path.resolve(__dirname, '..', '..');
const toUrl = (p) => (/^[a-z]+:\/\//i.test(p) ? p : pathToFileURL(path.resolve(p)).href);

module.exports = {
  chromium,
  repoRoot,
  chromePath: process.env.CHROME_PATH || undefined,
  indexUrl: process.env.NBS4MED_URL || pathToFileURL(path.join(repoRoot, 'index.html')).href,
  refIndexUrl: process.env.NBS4MED_REF_INDEX ? toUrl(process.env.NBS4MED_REF_INDEX) : null,
  refIndexPath: process.env.NBS4MED_REF_INDEX && !/^[a-z]+:\/\//i.test(process.env.NBS4MED_REF_INDEX) ? process.env.NBS4MED_REF_INDEX : null,
  suppliedLogo: process.env.NBS4MED_SUPPLIED_LOGO || null,
  dataPath: (name) => path.join(repoRoot, 'data', name),
  outDir(...parts) {
    const d = path.join(process.env.NBS4MED_OUT || path.join(repoRoot, 'tests', 'output'), ...parts);
    fs.mkdirSync(d, { recursive: true });
    return d;
  },
  // contents of a file at a git ref of this repository (used where a test compares with an older version)
  gitShow(ref, file) {
    for (const r of [ref, 'origin/' + ref]) {
      try { return execFileSync('git', ['show', r + ':' + file], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch (e) { /* try next */ }
    }
    return null;
  },
};
