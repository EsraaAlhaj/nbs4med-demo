# NBS4MED demo: calculations, assumptions and what to replace

Demo version: illustrative estimates, to be reviewed when project data become available.

Nothing here is a local forecast. Every quantitative record in `data/evidence.json` has
`usable_for_local_forecast = false` and it was left that way. Published values are shown as
reference evidence or used only as clearly labelled scenarios. Values that are not published
are `demo_assumption` in `data/demo_parameters.json`. The `partner_validated` field is empty
for every parameter.

## 1. What did not change

The 14 indicators, 5 criteria, answer options, score thresholds (30 / 55 / 80 %), weakest-dimension
text and recommendation ranking are the same code as the frontend version. They were checked with
ten randomised answer sets: scores, levels, criterion tables and recommendation rankings were
identical to the previous version. The assessment result is kept separate from suitability, impact
and cost.

The old "Indicative impact and cost" block of the previous version contained generic ranges (cooling,
retention, cost per m²) that were not backed by the evidence database. It was removed in this demo
and replaced by the optional explore step.

## 2. Calculations

| Id | Solution | Formula | Inputs | Output and unit | What it is not |
|---|---|---|---|---|---|
| F-N01-PLANTS | Urban forest | plants = ceil(A × d) | A planted area (m²), d density (plants/m²) | plants | Not an impact |
| F-N01-WATER | Urban forest | V = A × q × n / 1000 | q water demand (L/m²/day, low/base/high), n irrigation days | m³/year | Not a drought-suitability statement (rule R03) |
| F-N02-RAIN | Green roof | V_rain = A × h / 1000 | A roof area (m²), h event depth (mm) | m³ | Not retention |
| F-N02-RET | Green roof | V_ret = V_rain × r | r = 26.8 to 61.8 % (record G01, mean per-event retention of 9 UK experimental configurations, events > 10 mm) | m³ per single event | Not annual retention, not a forecast for your roof, no central estimate. For h ≤ 10 mm no number is shown (G02 is a typical value, not a bound) |
| F-N02-SUB | Green roof | V_sub = A × t | t substrate depth (m) | m³ | Quantity to buy |
| F-REF-ROOF | Green roof | C_ref = A × c_case | c_case = 29 to 73 EUR/m² total roof area (records H1, H2, H4, H6, H7, H8, H9; median 44) | EUR, Hamburg, 2017 prices, VAT included, root-resistant waterproofing excluded | Not a local cost. Shown only for 196 to 1,944 m² (area range of the cases) |
| F-N03-AREAS | Multifunctional eco-park | A_i = A × share_i / 100 | four shares that sum to 100 % | m² | No aggregate impact (rule R04) |
| F-N03-WATER | Multifunctional eco-park | V = n × (A_trees × q_t + A_meadow × q_m) / 1000 | q in L/m²/day | m³/year | |
| F-N04-STORE | Rainwater retention basin | S = F × D × f | F footprint (m²), D average depth (m), f usable fraction (0.7 / 0.8 / 0.9) | m³ | Not captured volume, not flood-risk reduction |
| F-N04-RUNOFF | Rainwater retention basin | R = C × φ × h / 1000 | C catchment (m²), φ runoff coefficient (0.6 / 0.75 / 0.9), h event depth (mm) | m³ per single event | Ignores timing, infiltration and outlet design. Unavailable when C is missing |
| F-N04-RATIO | Rainwater retention basin | S / R × 100 | | % of the runoff volume of one storm | A volume balance, not a risk reduction or a peak-flow reduction |
| F-N05-AREA | Green corridor | A = L × W; trees = floor(L / s) × rows | L, W, s in metres | m², trees | |
| F-N05-WATER | Green corridor | V = n × (trees × q_t + A × q_u) / 1000 | q_t L/tree/day, q_u L/m²/day | m³/year | |
| F-COST | All | Capex = Σ(quantity × unit price); Annual = Σ(quantity × annual unit cost) | unit prices low / base / high, or user-entered | EUR | Not a local cost. Lump sums do not scale with area; no economies of scale are modelled |

Scenario ranges: "low" and "high" combine the low and high demo assumptions of every parameter. They are
called *illustrative scenario ranges*. They are not confidence intervals.

Missing inputs are never zero. A blank required input gives "required", a missing catchment gives
"unavailable" for runoff and for the storage/runoff balance, and an excluded optional item
(for example waterproofing) is shown as "not included".

Impacts that are not computed, and why: air temperature, surface temperature and thermal comfort
(no intervention-specific coefficient; one maximum contrast from one garden is not a model input),
annual retention, peak-discharge reduction, annual captured volume and flood-risk reduction (they need
catchment, outlets and rainfall series, i.e. hydrologic modelling, which is out of scope here).

## 3. Rules from the evidence database that the demo applies

R01 site verification required; R02 structural capacity unknown, so no feasibility claim; R03 water supply
unknown, so water requirement flagged and no drought suitability label; R04 no aggregate park impact or
cost without specified components; R05 no annual captured volume without catchment, storage and rainfall;
R06 source examples only when context or price year differ; R08 and R09 no pooling of outcomes or of
records from one study; R10 missing value is unavailable, never zero. R07 (very low match score) is not
implemented because the threshold is pending partners.

Independence: G01/G02 are one study (UK experimental roofs), T01/T02 one garden (Lisbon), F01 to F04
one wetland (Kivipuro, Lahti), and H1 to H9 with E02 and E03 one report (Hamburg). The interface counts
independent studies, not records.

## 4. Parameter table

Class values: `published_reference` (taken from a record in evidence.json), `demo_assumption`
(set by the demo authors only so that the calculation runs, not attributed to any study or partner),
`partner_validated` (empty in this version). Currency EUR. No price year: the demo values were not
taken from a dated price list and no price index is applied.

| Parameter id | Solution | Name | Value (low / base / high) | Unit | Class | Valid range | Partner validated |
|---|---|---|---|---|---|---|---|
| NBS01.sapling_price | Urban forest | Sapling unit price | 2 / 4 / 8 | EUR/plant | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS01.soil_prep | Urban forest | Soil preparation and amendment | 3 / 6 / 12 | EUR/m² | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS01.planting_labour | Urban forest | Planting labour and mulch | 2 / 4 / 8 | EUR/m² | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS01.irrigation_setup | Urban forest | Establishment irrigation set-up | 1 / 2.5 / 5 | EUR/m² | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS01.design_lump | Urban forest | Design and site set-up | 1500 / 3000 / 6000 | EUR (lump sum) | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS01.maintenance_annual | Urban forest | Annual maintenance during establishment | 1.5 / 3 / 6 | EUR/m²/year | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS01.water_demand_lpd | Urban forest | Establishment water demand | 2 / 4 / 8 | L/m²/day | demo_assumption | 100 to 10000 (area_m2) | empty |
| NBS02.substrate_price | Green roof | Growing substrate | 60 / 90 / 140 | EUR/m³ | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS02.drainage_layer | Green roof | Drainage, filter and protection layers | 5 / 8 / 14 | EUR/m² | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS02.vegetation | Green roof | Vegetation (mats or plugs) | 6 / 12 / 25 | EUR/m² | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS02.install_labour | Green roof | Installation labour | 4 / 8 / 15 | EUR/m² | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS02.waterproofing | Green roof | Root-resistant waterproofing | 8 / 14 / 25 | EUR/m² | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS02.structural_check_lump | Green roof | Structural check and design | 1000 / 2500 / 6000 | EUR (lump sum) | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS02.maintenance_annual | Green roof | Annual maintenance (extensive roof) | 1 / 2.5 / 5 | EUR/m²/year | demo_assumption | 50 to 5000 (area_m2) | empty |
| NBS03.tree_area_build | Multifunctional eco-park | Tree-planted area, build | 25 / 45 / 80 | EUR/m² | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.meadow_build | Multifunctional eco-park | Meadow or lawn area, build | 4 / 8 / 15 | EUR/m² | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.water_build | Multifunctional eco-park | Rain garden or water feature, build | 30 / 55 / 100 | EUR/m² | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.hard_build | Multifunctional eco-park | Paths and hard surfaces, build | 30 / 55 / 90 | EUR/m² | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.irrigation_system | Multifunctional eco-park | Irrigation system incl. controllers | 4 / 8 / 15 | EUR/m² | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.design_lump | Multifunctional eco-park | Design and site set-up | 4000 / 8000 / 16000 | EUR (lump sum) | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.tree_maint | Multifunctional eco-park | Tree area maintenance | 2 / 4 / 8 | EUR/m²/year | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.meadow_maint | Multifunctional eco-park | Meadow maintenance | 0.5 / 1.2 / 2.5 | EUR/m²/year | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.water_maint | Multifunctional eco-park | Water feature maintenance | 3 / 6 / 12 | EUR/m²/year | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.hard_maint | Multifunctional eco-park | Hard surface maintenance | 0.5 / 1 / 2 | EUR/m²/year | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.tree_water_lpd | Multifunctional eco-park | Tree area water demand | 2 / 4 / 6 | L/m²/day | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS03.meadow_water_lpd | Multifunctional eco-park | Meadow water demand | 1 / 3 / 5 | L/m²/day | demo_assumption | 500 to 50000 (area_m2) | empty |
| NBS04.excavation_price | Rainwater retention basin | Excavation and haulage | 10 / 20 / 40 | EUR/m³ | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.liner_price | Rainwater retention basin | Liner or geotextile | 3 / 6 / 12 | EUR/m² | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.planting_price | Rainwater retention basin | Basin planting and finishing | 4 / 8 / 16 | EUR/m² | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.structure_price | Rainwater retention basin | Inlet or outlet structure | 3000 / 6000 / 12000 | EUR/structure | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.design_lump | Rainwater retention basin | Design and permitting | 3000 / 6000 / 12000 | EUR (lump sum) | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.maintenance_annual | Rainwater retention basin | Annual maintenance and inspection | 0.8 / 1.8 / 4 | EUR/m²/year | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.shape_factor | Rainwater retention basin | Usable storage fraction of gross volume | 0.7 / 0.8 / 0.9 | dimensionless | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS04.runoff_coeff | Rainwater retention basin | Runoff coefficient of the catchment | 0.6 / 0.75 / 0.9 | dimensionless | demo_assumption | 100 to 5000 (footprint_m2) | empty |
| NBS05.tree_price | Green corridor | Street tree incl. pit and protection | 150 / 300 / 600 | EUR/tree | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.understory_price | Green corridor | Understory planting | 8 / 16 / 30 | EUR/m² | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.irrigation_line | Green corridor | Irrigation line | 8 / 18 / 35 | EUR/m | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.survey_lump | Green corridor | Utilities survey and clearance | 1500 / 3000 / 6000 | EUR (lump sum) | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.design_lump | Green corridor | Design | 2500 / 5000 / 10000 | EUR (lump sum) | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.tree_maint | Green corridor | Tree maintenance | 10 / 25 / 50 | EUR/tree/year | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.understory_maint | Green corridor | Understory maintenance | 1 / 2 / 4 | EUR/m²/year | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.tree_water_lpd | Green corridor | Tree water demand | 20 / 40 / 80 | L/tree/day | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS05.understory_water_lpd | Green corridor | Understory water demand | 1 / 2 / 4 | L/m²/day | demo_assumption | 50 to 2000 (length_m) | empty |
| NBS02.event_retention_gt10mm | Green roof | Mean per-event retention, events > 10 mm | evidence G01 | fraction of event rainfall | published_reference | Experimental roofs, UK, 80 mm extensive build-up; events > 10 mm. Upper event depth not extracted. | empty |
| NBS02.event_retention_lt10mm | Green roof | Typical retention, events < 10 mm | evidence G02 | percent; greater than | published_reference | Same experimental roofs; not a guaranteed lower bound | empty |
| NBS02.reference_cost_extensive | Green roof | Extensive-roof construction cost cases (7) | evidence H1, H2, H4, H6, H7, H8, H9 | EUR/m² total roof area, 2017 prices | published_reference | Case roof areas 196 to 1,944 m²; Hamburg; VAT included; root-resistant waterproofing excluded | empty |

## 5. What to replace or review when project data arrive

| Item | Where | Action |
|---|---|---|
| NBS repository and PROMEA decision-making framework | `data/evidence.json` | Replace or extend records; keep `usable_for_local_forecast` honest per record; run `tools\sync-data.ps1` |
| All `demo_assumption` unit prices and design factors | `data/demo_parameters.json` | Replace with local item prices (currency, price year, scope) or partner values; then fill `partner_validated` |
| Runoff coefficient, usable storage fraction, water demand rates | `data/demo_parameters.json` | Replace with design values for each pilot site |
| Price-year update (method M02) and life-cycle cost (M05) | `js/engine.js` | Not implemented: no index and no discount rate were supplied |
| Surface temperature, air temperature and thermal comfort | `js/engine.js`, evidence | Needs intervention-specific primary data and a comparator before any calculation |
| Annual retention, peak reduction, captured volume | engine | Needs rainfall series and hydrologic modelling (PySWMM is deliberately not integrated) |
| Smart-technology benefits of the eco-park | evidence | No separate evidence was collected |
| Rule R07 threshold (very low match) | `js/app.js` ranking | Threshold pending partners |
| Arabic text of evidence records | `data/evidence.json` | Records are shown in English as in the source database |
| Demo label and assessment-to-solution mapping | `js/explore.js` | The five NBS4MED solutions map to the recommendation options: urban forest, green roof, smart eco-park (called multifunctional eco-park in the database), rainwater retention basin, green corridor |
