# NBS4MED Demo

Demo version: illustrative estimates, to be reviewed when project data become available.

A local, no-backend demo of the NBS4MED self-evaluation tool with an optional
"Explore impact and cost" step. English and Arabic (RTL).

## Run on Windows

1. Double-click `run-demo.bat`. It starts a local server on `http://127.0.0.1:8765` and opens the page.
   Close the black window to stop it.
2. Or double-click `index.html`. This also works from `file://` because the data files are loaded
   as scripts (`evidence.js`, `demo_parameters.js`), not with `fetch`.

No account, no backend, no build step. Fonts come from Google Fonts when online; without internet
the page uses system fonts.

## Files

| File | Role |
|---|---|
| `index.html` | Markup and styles. Same design as the frontend version. |
| `app.js` | Assessment (14 questions, 5 criteria), scoring, recommendations, routing, language. Logic unchanged. |
| `explore.js` | Explore step, results blocks, printable report, CSV. Presentation only. |
| `engine.js` | Calculation methods. No DOM. |
| `evidence.json` | Evidence database exported from `NBS4MED_Starter_Database (2).xlsx`. Source of truth. |
| `demo_parameters.json` | Demo assumptions with class, unit, purpose, validity range. |
| `evidence.js`, `demo_parameters.js` | Copies of the two JSON files as scripts, so the page works from `file://`. |
| `tools/sync-data.ps1` | Not included in this copy. It regenerated the two `.js` data files from the `.json` files. |
| `CALCULATIONS.md` | Formulas, assumptions, parameter table, what to replace. |

## Updating data

1. Edit `evidence.json` or `demo_parameters.json`.
2. Update the matching `.js` file (`evidence.js`, `demo_parameters.js`) to the same content. The sync script `tools\sync-data.ps1` is not in this copy.
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

## Assessment logic (provisional, for partner review)

- The assessment starts by defining the area (name, scope, boundary, organisation, date). All answers refer to that area as it is today.
- The 14 indicators keep the 0 to 2 scale. Each score has a specific description (a provisional project rubric). Rationale, evidence or source, and confidence are optional per indicator. Nothing is uploaded.
- Unknown is missing information, not 0. Not applicable needs a justification. Both are left out of the score and reported separately. The overall percentage is not shown while any indicator is Unknown, and a criterion percentage is not shown while that criterion has an Unknown answer.
- Results show the criterion profile first (C1 current integration, C2 to C5 enabling conditions), then the overall score. Levels use provisional project thresholds. These are not scores or thresholds of any external standard.
- After the climate-risk step, short Yes / No / Unknown applicability checks screen the NBS options (Preliminary candidate, Requires verification, Not applicable). They are screening outcomes, not engineering approval.
- The recommendation ranking uses a rule-based match score out of 100 (the earlier demo risk weights, kept provisionally; see the methodology section in the results). It is neither a probability of success nor an expected impact. Funding, maintenance and technical-capacity gaps are shown as implementation conditions and do not change the score. Income is optional context and is not used.
- Answers are kept in the page only. Nothing is saved between visits, so there are no stored answers to migrate.

## Flat layout

This copy keeps every file in one folder (no js/, data/, docs/ subfolders) so it can be uploaded through the GitHub web page. Script paths in index.html were changed accordingly. CALCULATIONS.md describes the same calculations.
