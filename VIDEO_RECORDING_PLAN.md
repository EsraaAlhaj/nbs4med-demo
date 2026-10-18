# Recording plan for the 40–50 second demonstration video (video not produced)

Verified on 2026-10-18 against the deployed build (`main` at `ab74b92`, local copy of the same files) with `qa-tests/verify.js`, which drives the İzmir Green Roof scenario of `DEMO_VIDEO_PACKAGE.md` through the real interface in English and Arabic: **58 of 58 checks match, no differences in results**. Results: `demo-verification/verify_results.json`.

## 1. Verified scenes (screenshots in `demo-verification/`, English `en_*` and Arabic `ar_*`)
| Scene | Shows | File |
|---|---|---|
| 1 Assessment question | Indicator 1.1 with the descriptive answer cards, Read more, Unknown and N/A cards | `*_scene1_assessment_question.png` |
| 2 Criteria table and chart | C1 33%, C2 33%, C3 not rated, C4 50%, C5 17%; overall score not shown | `*_scene2_criteria_table.png`, `*_scene2_comparison_chart.png` |
| 3 Gaps and actions | 1.3, 2.3, **5.2**, 5.3, 1.1 with finding, why it matters, action, evidence needed | `*_scene3_gaps_and_actions.png` |
| 4 Options and applicability | Green roof, Green corridor, Urban forest; Green roof "Requires verification" | `*_scene4_roof_applicability.png` |
| 5 Impact and cost (inline) | 800 m², 30 mm; 24 m³, 64 m³, 6.43–14.8 m³; CAPEX and OPEX | `*_scene5_impact_cost_inputs/results/indicative_cost.png` |
| Reports | Summary report, exactly 2 A4 pages; detailed report 12 pages; CSV | `*_summary.pdf`, `*_detailed.pdf`, `*_report.csv`, `*_summary_p1/p2.png` |

## 2. Proposed 45-second sequence (1920 × 1080, English; the same sequence works in Arabic)
| Time | Action | On screen |
|---|---|---|
| 0:00–0:05 | Landing page, click Start assessment; Area: Türkiye — İzmir Green Roof Pilot (pre-fill by the recorder before the take if time is short) | Header logo, title, Start button |
| 0:05–0:12 | Jump to the C1 page: open Read more on 1.1, click a descriptive answer card; flash C3 with Unknown on 3.3 | Descriptive answer cards, Unknown is not zero |
| 0:12–0:20 | Results: overview tile "Not shown", criteria table and bar chart | C1 33%, C2 33%, C3 not rated, C4 50%, C5 17% |
| 0:20–0:26 | Priority gaps: pause on 5.2 | Finding, suggested action, evidence needed; note "not a validated ranking" |
| 0:26–0:32 | Options: Green roof, Green corridor, Urban forest; Check this solution: roof available Yes, structure Pending or Unknown | "Requires verification" |
| 0:32–0:42 | Impact & Cost section on the same page: Green roof, 800 m², 30 mm | 24 m³ rain, 64 m³ substrate, 6.43–14.8 m³ literature retention; "not currently estimated" for climate-risk mitigation; CAPEX 23,240 / 41,860 / 78,160 EUR; OPEX 800 / 2,000 / 4,000 EUR, "Illustrative Scenario Cost" |
| 0:42–0:45 | Click Summary report, show two pages | "2 pages" |

To fit 45 seconds, record the stages as a pre-answered run and show only the C1 page and the results; the full eight-stage flow takes about three minutes and is in `DEMO_VIDEO_PACKAGE.md`.

## 3. Results to highlight
C3 "Not rated: Unknown answers" and no overall score (Unknown is not zero); 5.2 as the example action; "Requires verification" for the Green roof; 24 m³ and 64 m³ as physical calculations; 6.43–14.8 m³ as published reference evidence, not a forecast; costs labelled illustrative with CAPEX and OPEX separate; "Quantitative climate-risk mitigation impact is not currently estimated".

## 4. Differences between actual outputs and the documented scenario
No differences in any scored or calculated result. One display note, now documented in `DEMO_VIDEO_PACKAGE.md`: the screen shows the upper retention value rounded to 14.8 m³ (underlying value 14.832, documented as 14.83). The Summary PDF is two A4 pages and the CSV carries 23240 to 78160.

## 5. How the video shows the four functions of Activity A3.3.2
The tool describes itself with four functions (landing page text); this mapping uses that wording, not the official activity text, which I did not have: (1) show how far NBS are integrated in an area (scenes 1–3: answer cards, criteria results, gaps and actions); (2) suggest NBS that fit local climate risks (scene 4: Heatwaves and Flooding give Green roof, Green corridor, Urban forest, with applicability screening); (3) assess potential climate-risk mitigation impact where supported (scene 5: literature-based retention shown as published reference, mitigation explicitly not estimated); (4) give indicative cost estimates (scene 5: CAPEX and OPEX ranges, labelled illustrative). The Summary report closes the loop.
