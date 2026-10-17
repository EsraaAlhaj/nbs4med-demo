# Results dashboard redesign: report for review

Branch: `redesign/results-dashboard` (from `main` at `0515acd`). Not merged. Tested on `http://localhost:8765` with Chromium 141 (Playwright), 2026-10-17.

## What changed (presentation only)
- **One dashboard.** Overview → criteria table and bar chart → indicator diagnosis → priority gaps and actions → NBS options (with applicability checks) → Potential Impact & Indicative Cost, all on the results page.
- **Inline Impact & Cost.** Pick one of the five supported options, enter parameters, and the results update immediately in the same section (impact, physical calculations, indicative cost in that order; technical details in expanders). Inputs are kept per option when switching. Options without a calculator are listed with a short explanation. Nothing is shown before an option is selected, so default values are never presented as results. Each recommendation card has an "Impact and cost" button that selects the option in this section.
- **Removed:** the "Explore impact and cost" button, the "Last explored" message, the separate Explore view, and the standalone "Evidence and limitations" section and its navigation item. Short contextual notes remain beside scores, recommendations, applicability, impact and cost. Old `#explore` links open the inline section. The detailed report and the collapsed Methodology panel keep the full methodology and limitations.
- **Overview redesign.** A provisional overall score tile (labelled provisional, secondary, not a validated measure of NBS coverage or climate performance; "Not shown" with the reason when an indicator is Unknown) beside the area, scale, date, risks, completeness and evidence facts; a shorter interpretation; area details collapsed.
- **Smaller changes.** Shorter option cards (one-line category note), mobile jump bar scrolls sideways, criteria and diagnosis tables as cards on phones (from the earlier QA).
- **Downloads** stay at the top of the page (Summary report 2 pages, Detailed report, CSV) and use the inline calculator's current state.

## Methodology unchanged
The 5 criteria, 14 indicators, 0–2 rubrics, thresholds, Unknown/N/A handling, evidence and confidence fields, climate-risk selection, matching formula and weights, applicability rules, calculators and evidence database are untouched. `engine.js`, `evidence.*`, `demo_parameters.*` and `guidance.js` have no diff against `main`. The assessment-identity checks (t15, t16) pass.

## Browser tests (all on the final code)
| Suite | Result |
|---|---|
| qa7 redesign: UI-driven eight-stage assessment in EN/AR at 1920 and 390 px; no Explore view/button/"Last explored"/Evidence-and-limitations; one calculator host; section order; overview tile; five calculators offered; live update on input; switching keeps inputs; invalid input shows no numbers; card button selects inline; applicability check keeps inline inputs; `#explore` redirect; CSV, summary (2 pages) and detailed report carry the inline numbers; no JS errors | 78 pass |
| qa2 independent calculator verification (5 engines, boundaries, invalid inputs) | 864 pass |
| qa3 journey scenarios A and B, EN/AR, with CSV and PDFs | 284 pass |
| qa1 eight-stage flow, 7 answer combinations, EN/AR | 190 pass |
| qa6 Green roof wording and score independent of public land | 19 pass |
| qa4 mobile 390 px | 18 pass |
| t16 dashboard, t15 five-criteria identity, t9b calculators, t10, t11, t13 engine | 66, 84, 44, 57, 64, 23 pass |
| pdf2 summary two-page fit | 114 pass |
| İzmir demo UI run, EN and AR (3 checks each) | pass |

İzmir values on the redesigned page equal `DEMO_VIDEO_PACKAGE.md`: C1 33%, C2 33%, C3 not rated, C4 50%, C5 17%; 24 m³, 64 m³, 6.43–14.83 m³; CAPEX 23,240 / 41,860 / 78,160 EUR; OPEX 800 / 2,000 / 4,000 EUR; cards Green roof, Green corridor, Urban forest. PDFs: summary 2 pages and detailed 12 pages in English and Arabic.

Older tests that targeted the removed Explore page or the removed section (t16, t15, t9b, t11, qa2, qa3, qa4, demo script) were updated to the new layout; the calculator assertions themselves were not weakened. The first qa7 run had two real findings that I fixed: the `#explore` redirect was scrolled back to the top by a second routing pass, and the test regexes were case-sensitive/English-only.

## Evidence
- Before (current `main`, English and Arabic): `redesign-evidence/before/` (`*_10_dashboard_overview.png`, `*_10_results_overview_full.png`, `*_18_explore_inputs_default.png`, `*_19_explore_results.png`, `*_21_impact_and_cost_on_results.png`, summary pages `*_22_summary_p1/p2.png`).
- After: `redesign-evidence/after/` — `{en,ar}1920_01_overview.png` … `_08_full_dashboard.png` (full dashboard), `_06_impact_cost_inline.png`, `_07_inline_results.png`, mobile `{en,ar}390_*.png`, summary and detailed PDFs, CSVs; İzmir run in `after/demo/`.
- Test scripts: `qa-tests/` (qa7, dash, demo_qa and earlier suites).

## Limitations
- The IUCN results dashboard itself could not be opened from this environment (network policy). The benchmark was limited to public descriptions (percentage match per criterion, traffic-light levels, report); layout decisions follow those and the brief, not the live IUCN pages.
- Official NBS4MED, Interreg NEXT MED and EU logos are still missing (text acknowledgement only); see `BRANDING_ASSETS.md`.
- Only the currently selected option's impact and cost go into the reports (as before).
- The detailed PDFs (12 pages each, English and Arabic) were checked as full contact sheets (`redesign-evidence/after/*_detailed_contact_sheet.png`): no clipped or overlapping tables or text were visible at that scale, and Arabic tables stay right-to-left. Fine print was not proofread page by page.
- The live GitHub Pages site still serves the previous version until this branch is merged.
