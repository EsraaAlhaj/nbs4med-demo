# NBS4MED Demo

Demo version: illustrative estimates, to be reviewed when project data become available.

A local, no-backend demo of the NBS4MED self-evaluation tool with an optional
"Explore impact and cost" step. English and Arabic (RTL).

## Run on Windows

1. Double-click `run-demo.bat`. It starts a local server on `http://127.0.0.1:8765` and opens the page.
   Close the black window to stop it.
2. Or double-click `index.html`. This also works from `file://` because the data files are loaded
   as scripts (`data/*.js`), not with `fetch`.

No account, no backend, no build step. Fonts come from Google Fonts when online; without internet
the page uses system fonts.

## Files

| File | Role |
|---|---|
| `index.html` | Markup and styles. Same design as the frontend version. |
| `js/app.js` | Assessment (14 questions, 5 criteria), scoring, recommendations, routing, language. Logic unchanged. |
| `js/explore.js` | Explore step, results blocks, printable report, CSV. Presentation only. |
| `js/engine.js` | Calculation methods. No DOM. |
| `data/evidence.json` | Evidence database exported from `NBS4MED_Starter_Database (2).xlsx`. Source of truth. |
| `data/demo_parameters.json` | Demo assumptions with class, unit, purpose, validity range. |
| `data/*.js` | Generated copies of the two JSON files so the page works from `file://`. |
| `tools/sync-data.ps1` | Regenerates `data/*.js` after you edit a `.json` file. |
| `docs/CALCULATIONS.md` | Formulas, assumptions, parameter table, what to replace. |

## Updating data

1. Edit `data/evidence.json` or `data/demo_parameters.json`.
2. Run `powershell -ExecutionPolicy Bypass -File tools\sync-data.ps1`.
3. Reload the page.

The interface does not need to change when records or parameter values change.

## Rules kept

- No evidence record is used as a local forecast; `usable_for_local_forecast` stays `false`.
- Missing values are unavailable, never zero.
- Air temperature, surface temperature and thermal comfort are not merged; event retention,
  storage capacity and annual runoff are not merged; maxima, means, single cases and published
  ranges are labelled and not pooled.
- Records of one study are not counted as independent studies.
- Costs show currency, price year (none for demo values), scope and basis, and are never called local.
- No login, no backend, no PySWMM.

## Flat layout

This copy keeps every file in one folder (no js/, data/, docs/ subfolders) so it can be uploaded through the GitHub web page. Script paths in index.html were changed accordingly. CALCULATIONS.md describes the same calculations.
