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

**Four steps.** 1 Assessment Area, 2 Site Context, 3 Local Climate Risks, 4 Existing NBS Integration. After Step 4 the Results page opens. Applicability checks and cost and impact exploration are optional and follow the results. The four-step workflow and the three existing-NBS indicators are UJ prototype design decisions, not officially approved PROMEA scoring rules.

**Results page.** Four sections that follow the four functions of the tool: Existing NBS Integration; Preliminary NBS options (up to three compact cards with relevant risk, limitation and a Check this solution action); Potential Climate Impact and Supporting Calculations; Indicative Cost and Implementation Considerations. Collapsed sections on screen are always included in the downloadable reports.

**Three separate things.** They never feed into each other:

| What | Where it comes from | What it is |
|---|---|---|
| Existing NBS integration | Step 4: existing NBS (Yes, No, Not sure), optional types, and three indicators on a provisional 0 to 2 rubric | Described one by one. No overall score, percentage or level. No and Not sure are recorded as reported absence and insufficient information, never as 0 |
| Preliminary matching | Selected risks and site context (density, public land) | Provisional rule-based match for heatwaves, flooding and drought only. Shown as the risks an option is relevant to and a list order. No numeric score on the results page. Not a probability of success, a feasibility check or an expected impact |
| Applicability status | Optional checks on the results page | Not yet checked, Requires verification, Preliminary candidate, Not applicable. Screening only, not engineering approval |

**Applicability checks (after the results).** Each recommendation card, ranked row, excluded option and other option has a **Check this solution** button that opens a small panel on the same page. Only the checks relevant to that solution are shown, and a dependent question is hidden when its prerequisite is answered No. Answers are kept per question, so closing, reopening or switching panels never loses them. Questions about planting space, soil and water are genuinely shared by the urban forest, green corridor, pocket park and eco-park, so they are asked once. Roof, rain garden, paving, basin, shoreline and eco-park space questions belong to their own solution. Nothing is saved between visits.

Statuses: *Not yet checked* (no relevant answer), *Requires verification* (incomplete, or an essential condition is uncertain), *Preliminary candidate* (all required checks Yes), *Not applicable* (an essential prerequisite is confirmed absent, or the roof is assessed and unsuitable). A No on a condition that can still be assessed or designed (for example soil, establishment water, paving suitability, basin discharge) only gives Requires verification.

**Green-roof structural check.** If a roof is available: Confirmed suitable, Assessment pending or Unknown, or Assessed and unsuitable. Pending never means unsuitable. An older Yes/No/Unknown answer is read as: Yes means confirmed, No or Unknown means assessment pending. It is never read as unsuitable.

**Recommendations.** Before any check they are labelled preliminary and unchecked. Options with a final match score of 0 are not recommended cards; they appear under Other options with the reason, which is never described as technical unsuitability. Not applicable options are listed separately with their check-based reasons and can be reopened and corrected. Fewer than three cards are shown when fewer qualify, and a message is shown when none do. The matching formula, risk weights and land adjustments are unchanged.

**Solution categories (provisional, display only).** Green infrastructure, Blue-green water management, Ecosystem restoration, Hybrid/integrated solutions, with an optional secondary category. Several depend on design. Categories do not affect matching, scoring or calculator selection.

**Other rules kept.** Unknown is missing information, never 0. Evidence strength (documented, staff estimate, informal judgement) is recorded separately from each indicator answer. Policy, regulation, stakeholder, technical-expertise, maintenance and funding considerations are no longer mandatory questions. They are optional, solution-specific implementation considerations inside each Check this solution panel. They never change an applicability status.

### Mapping to the draft framework

This table covers only the elements named in the update request. It is not a claim of full framework coverage, and nothing here has been formally validated.

| Element | Status in this prototype |
|---|---|
| Existing NBS integration (status question and three provisional indicators) | Prototype design, not an official PROMEA scoring rule |
| Applicability checks for each of the nine solutions | Existing coverage (optional, after the results) |
| Climate risks and environmental challenges (six, multi-select) | Partial: no primary-risk selector |
| Solution categories | Partial: provisional labels on the nine options |
| Impact and cost exploration | Partial: five of the nine options have a calculator |
| NGO involvement | Not a separate question; covered by the stakeholder consideration in each solution check |
| Climate type | Not implemented in this prototype |
| Primary-risk selector, country or city fields | Missing |
| Institutional readiness questionnaire (former C2 to C5) | Replaced by optional implementation considerations per solution |
| Monitoring forms | Missing |
| Budget inputs and budget comparison | Missing |

## Printable reports

The results page and the cost and impact page offer two print options:

- **Summary report — 2 pages** (default). A4 portrait. Page 1: area, scale and date, site context, existing NBS status, the three indicators described one by one (no score), completeness and evidence strength. Page 2: up to three preliminary options with relevant risk, applicability status and limitation, and the explored solution's physical quantities, literature reference evidence and cost range where a valid calculation exists. When matching is not assessed the page says so instead of listing options.
- **Detailed report.** The full report with all indicator answers, methodology, weights, screening and calculator tables.

Unknown and unanswered values are never exported or drawn as zero. The charts are inline SVG and work offline.

## Flat layout

This copy keeps every file in one folder (no js/, data/, docs/ subfolders) so it can be uploaded through the GitHub web page. Script paths in index.html were changed accordingly. CALCULATIONS.md describes the same calculations.

**Site context and local climate risks.** Step 2 asks for urban density and public land available for NBS (Limited, Moderate, Abundant or Unknown). Step 3 lists five risks aligned with PROMEA (heatwaves, flooding, drought, coastal storms, land degradation) plus a mutually exclusive Not Sure option. The provisional demo weights exist only for heatwaves, flooding and drought and have not been validated by PROMEA. NBS matching is not produced, and no score or ranking is exported, when Coastal Storms, Land Degradation or Not Sure is selected, or when public land availability is Unknown. Climate type is not used yet; it is a methodology item for later integration.
