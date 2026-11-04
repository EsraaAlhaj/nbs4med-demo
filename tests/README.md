# Tests

Two kinds of tests. The first kind needs only Node.js 18 or newer; the second needs a browser.

## 1. Automated checks without a browser

```bash
npm test
```

(or run the three commands inside it yourself: `node tests/engine.test.js`, `node tests/links.test.js`, `node tools/sync-data.js --check`)

| Test | What it checks |
|---|---|
| `tests/engine.test.js` | `data/*.js` copies equal their JSON sources; data integrity and the recorded research rules (no evidence record is a local forecast); the parameter table in `docs/CALCULATIONS.md` equals `data/demo_parameters.json`; the worked examples of `TECHNICAL_DOCUMENTATION.md` section 7 for all five calculators, with an independent recomputation of every cost total; engine rules (validation, "unavailable, never zero", the 10 mm threshold, user-entered prices, optional components). |
| `tests/links.test.js` | Every local file referenced by `index.html`; every relative Markdown link and anchor; every file name written in code font in the Markdown files. Catches stale references after files are moved. |
| `tools/sync-data.js --check` | The `.js` data copies match the JSON sources. |

The expected numbers are written out literally. A passing run shows that the implementation reproduces the documented examples; it does **not** validate the assumptions behind them.

## 2. Browser tests

They drive the real page with Playwright and Chromium.

```bash
npm install                      # installs Playwright
npx playwright install chromium  # if no Chromium is installed yet
npm run test:browser             # runs the suites below one after the other
node tests/browser/qa1.js        # or one suite
```

By default every script opens `index.html` of this repository as a `file://` URL and writes screenshots, PDFs and CSV files to `tests/output/` (ignored by git). Settings, all optional:

| Variable | Meaning |
|---|---|
| `NBS4MED_URL` | Page to test, for example `http://localhost:8765/index.html`. |
| `NBS4MED_OUT` | Folder for the files the tests write. |
| `CHROME_PATH` | Chromium or Chrome executable, if Playwright's own browser is not used. |
| `NBS4MED_REF_INDEX` | `index.html` of an older reference build, for the "identical to the reference" checks of `t16.js` (the recovery reference is commit `12f0917`: `git worktree add ../nbs4med-ref 12f0917`) and for `qa8.js before`. Without it those checks are skipped and the script says so. |
| `NBS4MED_SUPPLIED_LOGO` | The logo file as supplied by the project, for the byte-identity check in `qa8.js`. Without it that check is skipped. |

| Script | Purpose |
|---|---|
| `examples.js` | The scoring and matching examples of `TECHNICAL_DOCUMENTATION.md` (sections 2, 5 and 6) on the real page. |
| `qa1.js` | Eight-stage flow with several answer combinations, English and Arabic. |
| `qa2.js` | Independent verification of the five calculators through the real interface (864 checks). |
| `qa3.js` | Real-browser journey for two scenarios, English and Arabic, with CSV and PDF generation. |
| `qa4.js` | Mobile (390 px) journey. |
| `qa5.js`, `qa6.js` | Applicability checks and related consistency checks. |
| `qa7.js` | Checks of the redesigned results dashboard (with screenshots and exports). |
| `qa8.js` | Landing-page branding checks (logo, description, demo note). |
| `t16.js` | Dashboard, answer cards, gaps and exports; identity of the five criteria and 14 indicators with the reference build. |
| `pdf2.js` | The summary report is exactly two A4 pages. |
| `rl.js` | Header logo regression. |
| `demo_qa.js`, `dash.js` | Run the İzmir demonstration scenario and take screenshots. |

The scripts were written during development. They had fallen behind the redesigned interface (the standalone "Evidence and limitations" section and the separate Explore view were removed) and contained machine-specific paths; both were corrected when the repository was reorganised. They test behaviour in Chromium only. There is no continuous integration: run them by hand and state which ones you ran.
