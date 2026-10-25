# NBS4MED Demo

Demo version: illustrative estimates, to be reviewed when project data become available.

A local, no-backend demo of the NBS4MED self-evaluation tool with an optional
inline impact and cost calculators on the results page. English and Arabic (RTL).

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
| `explore.js` | Inline impact and cost calculators on the results page, printable reports, CSV. Presentation only. |
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

**Assessment questions.** Each of the fourteen indicators is shown as: heading (for example 1.1 — NBS inventory), a Read more explanation (what it assesses, why it matters, what to consider), a concise question, descriptive answer cards for the original 0 to 2 rubric with the score as secondary information, separate Unknown and Not applicable cards, and optional rationale, evidence and confidence. The wording is in `guidance.js`. One primary scored response per indicator.

**Eight stages.** 1 Assessment Area, 2 Site Context, 3 Local Climate Risks, then 4 to 8 the five criteria C1 to C5 (14 indicators, 0 to 2 scale). Results can be viewed as soon as these eight stages are complete.

**Results page (dashboard).** Assessment overview (area, scale, date, selected risks, completeness, evidence and confidence, a short deterministic interpretation, and the provisional combined score as secondary information), a criteria results table (score, maximum, percentage, provisional level, key finding) with C1 apart from C2 to C5, one horizontal comparison chart on a fixed 0 to 100% scale, a collapsed indicator-level diagnosis, priority gaps and improvement actions (see `GAP_ACTION_LOGIC.md`), preliminary NBS options (category, relevant risk, why, site conditions, applicability, impact and cost action), and a Potential Impact & Indicative Cost section on the same page: pick one of the five supported options, enter its parameters and see potential impact, physical calculations and indicative cost (CAPEX and annual OPEX) update immediately, with evidence labels. Inputs are kept per option when you switch. There is no separate Explore page; old `#explore` links open this section. Contextual notes sit beside scores, recommendations, impact, cost and applicability; the full methodology stays in the detailed report and the collapsed Methodology panel. Collapsed sections on screen are always included in the downloadable reports. Calculator formulas, defaults and units are unchanged.

**Three separate things.** They never feed into each other:

| What | Where it comes from | What it is |
|---|---|---|
| Assessment score | The 14 indicator answers | Criterion profile and a provisional combined score (secondary, not a validated measure of NBS integration), with provisional project thresholds |
| Matching score | Selected risks and site context (density, public land) | Rule-based match out of 100 for each of the nine NBS options. Not a probability of success or an expected impact |
| Applicability status | Optional checks on the results page | Not yet checked, Requires verification, Preliminary candidate, Not applicable. Screening only, not engineering approval |

**Applicability checks (after the results).** Each recommendation card, ranked row, excluded option and other option has a **Check this solution** button that opens a small panel on the same page. Only the checks relevant to that solution are shown, and a dependent question is hidden when its prerequisite is answered No. Answers are kept per question, so closing, reopening or switching panels never loses them. Questions about planting space, soil and water are genuinely shared by the urban forest, green corridor, pocket park and eco-park, so they are asked once. Roof, rain garden, paving, basin, shoreline and eco-park space questions belong to their own solution. Nothing is saved between visits.

Statuses: *Not yet checked* (no relevant answer), *Requires verification* (incomplete, or an essential condition is uncertain), *Preliminary candidate* (all required checks Yes), *Not applicable* (an essential prerequisite is confirmed absent, or the roof is assessed and unsuitable). A No on a condition that can still be assessed or designed (for example soil, establishment water, paving suitability, basin discharge) only gives Requires verification.

**Green-roof structural check.** If a roof is available: Confirmed suitable, Assessment pending or Unknown, or Assessed and unsuitable. Pending never means unsuitable. An older Yes/No/Unknown answer is read as: Yes means confirmed, No or Unknown means assessment pending. It is never read as unsuitable.

**Recommendations.** Before any check they are labelled preliminary and unchecked. Options with a final match score of 0 are not recommended cards; they appear under Other options with the reason, which is never described as technical unsuitability. Not applicable options are listed separately with their check-based reasons and can be reopened and corrected. Fewer than three cards are shown when fewer qualify, and a message is shown when none do. The matching formula, risk weights and land adjustments are unchanged.

**Solution categories (provisional, display only).** Green infrastructure, Blue-green water management, Ecosystem restoration, Hybrid/integrated solutions, with an optional secondary category. Several depend on design. Categories do not affect matching, scoring or calculator selection.

**Other rules kept.** Unknown is missing information, never 0. Not applicable needs a justification and is left out of the denominator. The overall percentage is hidden while any indicator is Unknown. Funding, maintenance and technical-capacity gaps are shown as implementation conditions and do not change any score.

### Mapping to the draft framework

This table covers only the elements named in the update request. It is not a claim of full framework coverage, and nothing here has been formally validated.

| Element | Status in this prototype |
|---|---|
| Five criteria and 14 indicators (provisional rubric) | Existing coverage |
| Applicability checks for each of the nine solutions | Existing coverage (optional, after the results) |
| Climate risks and environmental challenges (six, multi-select) | Partial: no primary-risk selector |
| Solution categories | Partial: provisional labels on the nine options |
| Impact and cost exploration | Partial: five of the nine options have a calculator |
| NGO involvement | Partial: named in indicator 4.2 |
| Climate type | Not implemented in this prototype |
| Primary-risk selector, country or city fields | Missing |
| Readiness questionnaire beyond the 14 indicators | Missing |
| Monitoring forms | Missing |
| Budget inputs and budget comparison | Missing |

## Printable reports

The results page and the cost and impact page offer two print options:

- **Summary report — 2 pages** (default). A4 portrait. Page 1 is the assessment summary: area, scale and date, site context, a bar chart of C1 to C5 on a fixed 0 to 100% axis (C1 current integration shown apart from C2 to C5 enabling conditions), the overall score as secondary information, completeness, confidence (kept separate from completeness), and up to three selected improvement areas. Page 2 is the preliminary NBS options: a bar chart of up to three match indexes on a fixed 0 to 100 axis with the applicability status, shared implementation conditions shown once, and, only when a calculation is valid, the explored solution with its cost and impact outputs. Otherwise it says "Cost and impact exploration not completed."
- **Detailed report.** The full report with all indicator answers, methodology, weights, screening and calculator tables.

Unknown, unanswered and Not applicable are never plotted as zero: a criterion without a percentage shows its status instead of a bar. Improvement areas are chosen in a fixed order (scores of 0, then 1, then Unknown, in indicator order; capital and maintenance funding are combined). This is not a validated priority ranking. The charts are inline SVG and work offline. Printing does not change any answer or result. Browser print settings for headers, footers and background graphics do not affect the layout.

## Flat layout

This copy keeps every file in one folder (no js/, data/, docs/ subfolders) so it can be uploaded through the GitHub web page. Script paths in index.html were changed accordingly. CALCULATIONS.md describes the same calculations.

**Site context and local climate risks.** Step 2 asks for urban density and public land available for NBS (Limited, Moderate, Abundant or Unknown). Step 3 lists five risks aligned with PROMEA (heatwaves, flooding, drought, coastal storms, land degradation) plus a mutually exclusive Not Sure option. The provisional demo weights exist only for heatwaves, flooding and drought and have not been validated by PROMEA. NBS matching is not produced, and no score or ranking is exported, when Coastal Storms, Land Degradation or Not Sure is selected, or when public land availability is Unknown. Climate type is not used yet; it is a methodology item for later integration.

## Working alignment with the ten PROMEA considerations

The methodology section and the detailed report contain a table with the status of each consideration (Climate Risks, Climate Type, Urban Context, NBS Categories, Cost, Stakeholders, Regulations, Technical Expertise, Maintenance, Evaluation). Climate Type and Evaluation are marked pending. This is a working framework, not a formal PROMEA validation.

## Demonstration

`DEMO_VIDEO_PACKAGE.md` holds the illustrative İzmir Green Roof demonstration scenario with exact inputs and expected outputs, a storyboard, an English voice-over script and recording instructions. All demonstration inputs are hypothetical.
