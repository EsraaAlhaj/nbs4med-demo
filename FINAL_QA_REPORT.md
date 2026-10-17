# NBS4MED Self-Evaluation Tool: Final QA Report

| Item | Value |
|---|---|
| Branch | `qa/final-review` (based on `enhancement/iucn-dashboard`); not merged into `main` |
| Tested build | working tree at `e9bc52e` plus this report and `qa-tests/` (code identical to `e9bc52e`) |
| Test date | 2026-10-17 |
| Browser | Chromium 141.0.7390.37 (Playwright, headless), served by `python3 -m http.server 8765` at `http://localhost:8765/index.html` |
| Viewports | 1920×1080, 1280×800, 768×1024, 390×844 (mobile, touch) |
| Languages | English and Arabic (RTL) |

Everything marked PASS was executed in the browser or on a generated file. Test scripts are in `qa-tests/`. They use absolute scratchpad paths for the reference worktree and output, so adjust those before reuse.

## 1. Result summary

| Suite | Checks | Result |
|---|---|---|
| qa3: real-UI journey, scenarios A and B, EN and AR, with CSV and PDF generation | 284 | 284 pass |
| qa2: independent calculator verification, five engines | 864 | 864 pass |
| qa1: eight-stage flow, 7 answer combinations × EN/AR | 190 | 190 pass |
| qa4: mobile 390 px journey, results, impact and cost, EN/AR | 18 | 18 pass |
| qa5: applicability consistency (manual run, output below) | 1 sequence | consistent |
| demo_qa: Scenario C (İzmir Green Roof) EN and AR | 3 + 3 | pass |
| t16 dashboard, cards, gaps, exports | 66 | pass |
| t15 five-criteria restoration, identity vs recovery reference | 84 | pass |
| t9b explore and calculators | 44 | pass |
| t10 Step 1 | 57 | pass |
| t11 Steps 2–3 | 64 | pass |
| t13 engine fuzz and formulas | 23 | pass |
| pdf2 summary-PDF two-page fit | 114 | pass |

Failures during this session were all in the test scripts, not in the application (section 6).

## 2. Test matrix

| ID | Feature | Scenario | Expected | Actual | Result | Evidence | Corrective action |
|---|---|---|---|---|---|---|---|
| J-01 | Step 1 validation | Click Next with no Assessment Area, EN/AR, A/B | Stays on step 1, inline error | As expected | PASS | qa3_log.json | none |
| J-02 | Step 2 | Density and land selections | Moves to Site Context and on | As expected | PASS | qa-evidence/*_scenario*_03_risks.png | none |
| J-03 | Step 3 validation and multiple risks | Next with none; then heat+flood(+drought) | Blocked with none; multiple retained | As expected | PASS | same | none |
| J-04 | 14 indicators once each | Walk C1–C5 | Exactly 14 ids, in order, one per stage | As expected | PASS | qa3_log.json | none |
| J-05 | Read More | Open on first indicator of each criterion | Opens | As expected | PASS | qa3_log.json | none |
| J-06 | Answer cards | Click card, Back, Next | Selection retained | As expected, all 14 | PASS | qa-evidence/*_05_C#.png | none |
| J-07 | Unanswered validation | Next with unanswered indicators | Blocked, inline error | As expected | PASS | qa3_log.json | none |
| J-08 | Not Applicable justification | Select N/A, Next without text | Blocked; proceeds after text | As expected (scenario B: 2.1, 4.1, 4.2) | PASS | qa3_log.json | none |
| J-09 | Evidence, confidence, rationale | Fill on 1.1 | Retained through navigation and in state | As expected | PASS | qa3_log.json | none |
| J-10 | JS errors | All journeys incl. mobile | None | None | PASS | qa1–qa4 logs | none |
| D-01 | Criterion scores vs independent calculation | A, B, 7 combos | Table equals independent sum/max/% | As expected; Unknown gives "–", never 0 | PASS | qa1, qa3 | none |
| D-02 | C1 separate from C2–C5 | Both scenarios | Two groups | As expected | PASS | en_scenarioA_11_criteria_table.png | none |
| D-03 | Combined score | B has 2 Unknown | Withheld with explanation | As expected | PASS | en_scenarioB_10_dashboard_top.png | none |
| D-04 | Actions match answers | All combos | Actions only for 0, 1 and Unknown, in the defined order; none for 2 or N/A | As expected | PASS | qa1, qa3 | none |
| D-05 | Unknown as missing information | Combos with Unknown | Labelled "To verify", wording says gap in information | As expected | PASS | qa1; B detailed PDF text | none |
| D-06 | All dashboard sections | Both scenarios | Overview, table, chart, diagnosis, gaps, options, impact and cost, evidence and limitations, downloads | All present | PASS (after fix B-02) | `*_18_results_full.png` | B-02 |
| D-07 | Layout 1920/1280/768/390, EN/AR | Overflow scan | No page-level overflow, RTL correct | As expected | PASS | qa-evidence/mobile/*.png | none |
| D-08 | Mobile table readability | Criteria table at 390 px | Readable | Rows were tall and sideways-scrolling | FAIL, then PASS | before/after: mobile/en_04_criteria_table.png | B-03 |
| C-01 | Five calculators, default inputs | NBS01–NBS05 | Equal independent model | 864 checks pass | PASS | qa2_log.json | none |
| C-02 | Boundary values | Min and max of every input; roof area 196/1944/195/1945; storm 10/11 mm | Match model; no retention number at ≤10 mm; reference cost only within 196–1,944 m² | As expected | PASS | qa2_log.json | none |
| C-03 | Invalid inputs | Below min, above max, negative, zero, blank required, shares ≠ 100 | Rejected, no numbers or costs shown, recovers when fixed | As expected | PASS | qa2_log.json | none |
| C-04 | Displayed vs computed values | Costs and quantities in the rendered text | Match | As expected | PASS | qa2_log.json | none |
| C-05 | CAPEX and annual OPEX separate | All solutions | Separate totals, never summed | As expected | PASS | qa2_log.json | none |
| C-06 | Unsupported climate impacts | All solutions | "Not currently estimated"; no temperature, flood-risk or peak output | As expected | PASS | scenarioC/en_21_*.png | none |
| C-07 | Evidence classes | Roof | Physical = arithmetic; retention = published reference; costs = demo assumption | As expected | PASS | scenarioC/en_19_explore_results.png | none |
| A-01 | Applicability consistency | Green roof: change availability and structure answers repeatedly | Status follows the answers and is reversible; assessment scores unchanged | See section 5 | PASS | qa5 output | none |
| P-01 | Summary PDF page count | A, B, C × EN/AR | Exactly 2 A4 pages | 2 pages in all 6 | PASS | section 4 | none |
| P-02 | Summary PDF visual inspection | Rendered pages viewed: EN B p2, AR B p1, EN/AR C | No clipping or overlap; estimates labelled illustrative | As expected | PASS | qa-evidence/pdfpages/, scenarioC/*_22_summary_p*.png | none |
| P-03 | Detailed report content | EN B and C: text extracted | All 14 indicators, answers, rationale, evidence, confidence, gaps, calculations, limitations | Present | PASS (EN) | qa-evidence/*detailed.pdf | none |
| P-04 | Detailed report visual inspection | Rendered pages | No clipping | Pages rasterised, but only text was checked | NOT TESTED visually | n/a | n/a |
| P-05 | Arabic detailed report | Text extracted | All 14 ids present | Ids present; wording not reviewed page by page | PARTIAL | qa-evidence/ar_*detailed.pdf | n/a |
| P-06 | CSV | A, B, C × EN/AR | Rectangular 11-column rows; every indicator row carries its response; N/A and Unknown labelled; costs equal browser | As expected (C: 23,240–78,160 base 41,860 matches screen) | PASS | `*_report.csv` | none |
| S-01 | Scientific wording | Search for validation claims | No statement implying formal PROMEA validation | None found; the PROMEA panel says "not a formal PROMEA validation" | PASS | grep of app.js, explore.js | none |
| S-02 | Distinct categories | Results and reports | Self-reported, provisional scores, matching, applicability, physical, reference, illustrative cost, unestimable impact are separated | As expected | PASS | section 4 and screenshots | none |
| Q-01 | Wording of question 4.2 | Compare to rubric | Question matches the 0/1/2 descriptions | Question mentioned NGOs; rubric did not | FAIL, then PASS | guidance.js | B-01 |
| BR-01 | Official logos | Search repo and UI | Approved Interreg NEXT MED, EU and NBS4MED artwork | None in the repository | BLOCKER | footer text | none possible |
| DM-01 | İzmir scenario vs DEMO_VIDEO_PACKAGE.md | UI-driven run EN/AR | Documented values | All equal (section 5) | PASS | scenarioC/ | none |
| DM-02 | Video file | n/a | n/a | No video exists | NOT TESTED / not produced | n/a | n/a |

## 3. Bugs found and fixed

- **B-01** Question 4.2 mentioned NGOs but its scoring descriptions did not. I removed "NGOs" from the question (EN/AR). The descriptions are unchanged.
- **B-02** There was no visible "Evidence and limitations" section on the dashboard. I added a short section (basis counts and five limitation statements, EN/AR) with a jump-bar link. It adds no scoring logic.
- **B-03** On phones the criteria and indicator-diagnosis tables scrolled sideways with very tall rows and the level and finding columns were hidden. At 640 px and below each row now shows as a labelled card. Only HTML attributes and CSS changed; content and desktop layout are the same.

## 4. Generated files and verified page counts

Summary PDFs (all 2 pages, A4): `qa-evidence/{en,ar}_scenario{A,B}_summary.pdf`, `qa-evidence/scenarioC/{en,ar}_summary.pdf`.
Detailed PDFs: `qa-evidence/{en,ar}_scenarioA_detailed.pdf` (7, 6 pages), `qa-evidence/{en,ar}_scenarioB_detailed.pdf` (8, 7 pages), `qa-evidence/scenarioC/{en,ar}_detailed.pdf` (12 pages each; they include the impact and cost calculations).
CSV: `qa-evidence/*_report.csv` and `qa-evidence/scenarioC/*_report.csv`.

Screenshots (all in `qa-evidence/`):
- Assessment question with descriptive answers: `*_scenario{A,B}_04_C1_question_cards.png`, `scenarioC/*_05_C1.png`, `mobile/*_02_assessment_cards.png`
- Criteria table and bar chart: `*_11_criteria_table.png`, `*_12_criteria_chart.png`, `scenarioC/*_11_*`, `*_12_*`
- Priority gaps and actions: `*_14_priority_gaps.png`, `scenarioC/*_14_gaps_and_actions.png`
- NBS recommendations: `*_15_nbs_options.png`, `scenarioC/*_15_preliminary_options.png`
- Green roof applicability: `scenarioC/*_17_applicability_requires_verification.png`
- Impact and cost: `*_16_impact_cost.png`, `scenarioC/*_19_explore_results.png`, `*_21_impact_and_cost_on_results.png`
- Summary report: `scenarioC/*_22_summary_p1.png`, `*_22_summary_p2.png`, `pdfpages/`
- Mobile set: `mobile/`

## 5. Independently checked numbers

Calculators (qa2 re-derived every output from `demo_parameters.json` and `evidence.json`, not from `engine.js`):
- Green roof 800 m², 30 mm: rain 24 m³; substrate 64 m³ (800 × 0.08); retained 6.43–14.83 m³ (26.8–61.8% of 24, record G01); CAPEX 23,240 / 41,860 / 78,160 EUR; annual 800 / 2,000 / 4,000 EUR; reference example 23,200–58,400 EUR (Hamburg 2017, median 35,200).
- All five solutions match the model at default, custom, boundary and range-edge inputs. Rain-garden-type options with no calculator show no numbers.

Scenario A criterion results (independent): C1 (2+1+0)/6 = 50%, C2 (2+1+0)/6 = 50%, C3 (1+2+1)/6 = 67%, C4 (0+1)/4 = 25%, C5 (2+0+1)/6 = 50%. The table matches.
Scenario B: C1 and C3 not rated (Unknown), C2 2/4 = 50% (2.1 not applicable), C4 not applicable, C5 3/6 = 50%. The combined score is withheld.
Scenario C (İzmir): C1 33%, C2 33%, C3 not rated, C4 50%, C5 17%; the gap order, cards, applicability status and cost values equal `DEMO_VIDEO_PACKAGE.md`, so no document change was needed other than the added row for the new section.

Applicability (qa5, Green roof): start = unchecked; availability yes → verify; structure unknown → verify; structure yes → candidate; availability no → not applicable; availability unknown → verify; availability yes → candidate; structure unsuitable → not applicable; structure yes → candidate. Assessment scores were unchanged throughout.

## 6. Test-script failures during this session (not application defects)

- Step numbers were off by one (steps are 0-based internally).
- The CSV parser ignored quoting.
- Result checks ran before the 120 ms render debounce.
- Advanced calculator inputs sit in a collapsed panel and had to be opened.
- The first journey run used the wrong justification field for Not applicable.

After fixing the scripts, all suites passed.

## 7. Methodology unchanged

The 5 criteria, 14 indicators, 0–2 rubrics, thresholds and scoring are identical to the recovery reference (`12f0917`): t15 and t16 compare them directly in the browser, and `git diff 12f0917` of `engine.js`, `evidence.js/json` and `demo_parameters.js/json` is empty. No criteria, weights, thresholds or formulas were changed.

## 8. Remaining bugs and limitations

- **Publication blocker: official artwork.** No approved NBS4MED, Interreg NEXT MED or EU logo files are in the repository. The footer marks (Interreg, EU) and the header mark are drawn placeholders and the footer says so. No branding compliance is claimed.
- Partner names and logos are still marked "to be confirmed".
- Detailed PDFs: content verified from extracted text; pages were not visually inspected. Arabic detailed reports were checked for the presence of all 14 indicators only.
- Only the Green roof applicability panel was exercised in this pass.
- Prices are demo assumptions with no price year. Climate-risk mitigation impact is not estimated. Matching covers heat, flood and drought only, with provisional weights.
- Mobile Arabic and English were checked at 390 px only; no physical device was used.
- Key-finding text in the mobile card layout is left-aligned inside its cell, which is cosmetic.

## 9. Egypt meeting screen-recording sequence (no video has been produced)

Preparation: Chrome or Edge, a clean profile, zoom 100%, 1920×1080, open the standalone preview. Follow `DEMO_VIDEO_PACKAGE.md` for inputs and narration (about 2:40).
1. Landing page, then Start.
2. Step 1: choose the İzmir Green Roof Pilot. Step 2: High density, Limited land. Step 3: Heatwaves and Flooding.
3. C1: show Read More and the descriptive cards; answer 1, 1, 0; show Not applicable needs a justification (optional).
4. C2–C5 with the documented answers; 3.3 Unknown.
5. Results: overview, criteria table (C3 not rated), chart, gaps and actions, options, Green roof applicability (Requires verification).
6. Impact and cost: 800 m², 30 mm; show the separate impact, physical, reference and cost blocks.
7. Summary PDF (2 pages), then switch to Arabic for 10 seconds.

## 10. Verdict

**READY WITH LIMITATIONS.** Functionality, scoring, calculators, reports and the İzmir demo were verified in the browser and in generated files. The remaining limits are the missing official artwork (blocks public release and any external recording that shows the footer), unreviewed visuals of the detailed PDFs, and no video yet.
