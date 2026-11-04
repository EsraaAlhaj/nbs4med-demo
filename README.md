# NBS4MED Self-Evaluation Tool

**Live demo:** <https://esraaalhaj.github.io/nbs4med-demo/> · **Direct link to the assessment:** <https://esraaalhaj.github.io/nbs4med-demo/#assessment>

> **Status: preliminary prototype.** The methodology is provisional and has not been validated or approved by the project partners or by PROMEA. Scores are not official scores, and all costs and most impact figures are illustrative. See [Current limitations](#6-current-limitations).

## 1. Project overview

The NBS4MED Self-Evaluation Tool is a web application that helps a municipality, a project team or another organisation:

1. assess how far nature-based solutions (NbS) are already integrated in a chosen area, and which enabling conditions (policy, capacity, stakeholders, funding) are in place;
2. identify gaps and general improvement actions;
3. see which NbS options may fit the climate risks and site context it selects;
4. explore, for five of the nine options, indicative physical quantities, literature-based reference evidence and illustrative costs; and
5. export the results as printable reports and a CSV file.

The tool was developed by the University of Jordan within the **NBS4MED** project (*Nature based solutions for climate resilient Mediterranean cities*), co-funded by the European Union through the **Interreg NEXT MED** Programme. The project's own demonstration script refers to this work as **Activity A3.3.2**; the official activity title and wording should be confirmed by the project team. The tool is a prototype for partner testing, and partner feedback is meant to shape the refined version.

## 2. How it works

The whole assessment runs in the browser. There are eight assessment stages, followed by a single results page:

| Stage | What the user does |
|---|---|
| 1. Assessment area | Chooses one of the five NBS4MED pilot areas or enters another municipality, and sets the assessment scale (site, neighbourhood or municipality). |
| 2. Site context | Describes urban density and the public land available for NbS. |
| 3. Local climate risks | Selects one or more risks (heatwaves, flooding, drought, coastal storms, land degradation) or "Not sure". |
| 4–8. Criteria C1–C5 | Answers 14 indicator questions. |
| Results dashboard | Reviews the overview, criteria results, priority gaps and improvement actions, and preliminary NbS options. |
| Options and impact & cost | Optionally checks the applicability of an option, then enters parameters for a supported option to see potential impact, physical calculations and indicative cost on the same page. |
| Export | Prints a two-page summary or a detailed report (through the browser's print dialog, which can save as PDF) or downloads a CSV file. |

## 3. Assessment framework

Five criteria and 14 indicators. Each scored indicator is answered on a **0–2 scale** using a descriptive answer for that indicator.

| Criterion | Indicators |
|---|---|
| **C1** NBS Integration Status | 1.1 NBS inventory · 1.2 Coverage of public space · 1.3 Link to grey infrastructure |
| **C2** Policy & Planning | 2.1 NBS in strategic plans · 2.2 Regulation and standards · 2.3 Targets and monitoring |
| **C3** Institutional & Technical Capacity | 3.1 Dedicated staff or unit · 3.2 Technical know-how · 3.3 Data and monitoring tools |
| **C4** Stakeholder Engagement | 4.1 Community participation · 4.2 Coordination across departments and owners |
| **C5** Funding & Sustainability | 5.1 Capital funding · 5.2 Long-term maintenance budget · 5.3 Co-benefits valued in decisions |

How answers are treated:

- **Unknown** means information is missing. It is never counted as 0. A criterion containing an Unknown answer shows its status instead of a percentage, and the overall score is hidden until every indicator is resolved.
- **Not applicable** requires a written justification and is left out of the score denominator.
- Each criterion's percentage is its points divided by its maximum. Provisional levels use project thresholds (below 30%, 30–54%, 55–79%, 80% and above). These thresholds are project design choices, not taken from an external standard.
- C1 (existing NbS integration) is reported separately from C2–C5 (enabling and implementation conditions). The combined score is secondary and is not a validated measure.

## 4. Main features

All features below were checked against the source code (`index.html`, `js/app.js`, `js/explore.js`, `js/engine.js`, `js/guidance.js`).

- **Results dashboard:** assessment overview, criteria table and a comparison chart on a fixed 0–100% scale, indicator-level diagnosis, priority gaps with suggested actions, preliminary NbS options, and a Potential Impact & Indicative Cost section, all on one page.
- **Recommendations:** rule-based matching of nine NbS options to the selected risks and site context (heatwaves, flooding and drought only), plus optional applicability checks per option.
- **Impact and cost calculators:** five options (urban forest, green roof, smart eco-park, rainwater retention basin, green corridor). Physical quantities, published reference evidence and illustrative costs (CAPEX and annual OPEX shown separately) are labelled by basis.
- **Bilingual interface:** English and Arabic, with right-to-left layout.
- **Reports:** a two-page A4 summary, a detailed report and a CSV file, all generated in the browser.
- **Privacy by design:** no backend, login or database. Answers are held in the page's memory only and are not stored or transmitted.

## 5. Scientific and methodological basis

The tool links five layers, kept deliberately separate:

1. **Assessment framework:** the five criteria, 14 indicators and 0–2 rubrics are a provisional project rubric, to be reviewed against the PROMEA framework and the NBS repository. The five core climate risks follow the PROMEA framework as stated in the code. No formal PROMEA approval or partner agreement is recorded in this repository.
2. **Recommendation rules:** option-to-risk weights (0–3) and land adjustments are provisional demonstration rules without PROMEA validation.
3. **Evidence register:** `data/evidence.json` is a starter evidence register of 22 records from 8 sources. It is explicitly *not* an approved project repository, and no record is used as a local forecast.
4. **Calculation assumptions:** 43 demonstration parameters, all classed as demo assumptions and none partner-validated.
5. **Reports:** reproduce what the user entered and what the tool computed, with its labels and limits.

Assessment scores, option matching, applicability status and impact/cost never feed into one another. Details and formulas: [`TECHNICAL_DOCUMENTATION.md`](TECHNICAL_DOCUMENTATION.md) and [`docs/CALCULATIONS.md`](docs/CALCULATIONS.md).

## 6. Current limitations

- **Provisional methodology:** rubrics, thresholds, matching weights and the equal-weight combined score have not been validated.
- **Matching coverage:** no match score is produced when coastal storms, land degradation or "Not sure" is selected, or when public land is Unknown, because rules exist only for heatwaves, flooding and drought.
- **Illustrative costs:** unit prices are demo assumptions with no price year and are not local prices. Low/high values are scenario ranges, not confidence intervals.
- **Impact:** the green-roof retention figure applies a published range from experimental roofs (80 mm substrate, events above 10 mm) without an upper rainfall limit or an adjustment for substrate depth; read it as an order of magnitude, not a result for a given roof. Quantitative local climate-risk mitigation impact is not estimated. Published results (for example green-roof event retention) are shown as literature-based reference evidence, not as a forecast for the user's site.


## 7. How to run

**Online:** open the [live demo](https://esraaalhaj.github.io/nbs4med-demo/) or go straight to the [assessment](https://esraaalhaj.github.io/nbs4med-demo/#assessment). No account is required.

**Locally** (no installation or build step; fonts load from Google Fonts when online and fall back to system fonts offline):

1. Clone or download this repository.
2. Either double-click `index.html` (it works from `file://` because the data files are loaded as scripts, not with `fetch`), or serve the folder:
   ```bash
   python3 -m http.server 8765
   # then open http://localhost:8765/index.html
   ```
3. On Windows, `run-demo.bat` starts the same local server and opens the page.

**Tests** (optional; Node.js 18 or newer): `npm test` runs the automated checks of the calculation engine, the data files, the documented examples and the file references, with no dependencies and no browser. The browser tests need `npm install`; see [`tests/README.md`](tests/README.md).

## 8. Repository structure

```
index.html                    the page (entry point; must stay at the root)
README.md                     this file
TECHNICAL_DOCUMENTATION.md    how the tool works, with formulas, worked examples and a verification record
CONTRIBUTING.md               development, testing, pull requests, approval of methodology changes
package.json                  commands for the tests (the page itself has no dependency)
run-demo.bat                  Windows launcher for a local server
assets/                       logo
js/                           application code: app.js, explore.js, engine.js, guidance.js
data/                         evidence.json and demo_parameters.json (sources of truth), their .js copies,
                              README.md (data dictionary)
tools/                        sync-data.js: regenerates or checks the .js data copies
tests/                        engine and link tests (Node.js); browser/ holds the Playwright tests
docs/                         CALCULATIONS.md (canonical formulas and parameters), GAP_ACTION_LOGIC.md,
                              BRANDING_ASSETS.md, DEMO_VIDEO_PACKAGE.md
docs/qa/                      historical QA and redesign reports; their screenshots and files are in docs/qa/evidence/
```

No licence has been chosen yet. Open questions are recorded where they arise: data provenance in [`data/README.md`](data/README.md) and methodology discrepancies in [`TECHNICAL_DOCUMENTATION.md`](TECHNICAL_DOCUMENTATION.md), section 12.

## 9. Future development

The prototype could evolve into a multi-municipality platform through methodological review with the partners, validation of evidence and calculations, completion of the missing assessment features, pilot testing with real users, and, only if the project decides so, a backend with a database, accounts and assessment history. **None of the backend, database, authentication or central storage exists today.** A phased roadmap is in [`TECHNICAL_DOCUMENTATION.md`](TECHNICAL_DOCUMENTATION.md#13-proposed-development-roadmap).

## 10. Documentation and contribution

| Document | Content |
|---|---|
| [`TECHNICAL_DOCUMENTATION.md`](TECHNICAL_DOCUMENTATION.md) | Architecture, code structure, scoring and matching logic, data, setup, limitations and roadmap |
| [`docs/CALCULATIONS.md`](docs/CALCULATIONS.md) | Canonical formulas, assumptions and the parameter table |
| [`data/README.md`](data/README.md) | Data dictionary, sources and unresolved provenance questions |
| [`docs/GAP_ACTION_LOGIC.md`](docs/GAP_ACTION_LOGIC.md) | How answers become improvement actions |
| [`docs/BRANDING_ASSETS.md`](docs/BRANDING_ASSETS.md) | Logo and branding notes |
| [`docs/DEMO_VIDEO_PACKAGE.md`](docs/DEMO_VIDEO_PACKAGE.md) | The illustrative İzmir green-roof demonstration scenario |
| [`docs/qa/FINAL_QA_REPORT.md`](docs/qa/FINAL_QA_REPORT.md), [`docs/qa/REDESIGN_REPORT.md`](docs/qa/REDESIGN_REPORT.md) | Historical quality-assurance and redesign records |
| [`tests/README.md`](tests/README.md) | How to run the tests |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to contribute and which changes need approval |

To contribute, read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the technical documentation first. Suggested changes to the methodology, evidence or parameters should be discussed with the project partners before they are merged, and any change to evidence or parameters must be made in the `.json` file and copied with `node tools/sync-data.js`.
