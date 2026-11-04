# Data files and data dictionary

This folder holds the two data sets the tool reads. They are **provisional**: the evidence file calls itself a *starter register for NBS4MED meeting review, not an approved project repository*, and the parameter file calls itself *demonstration assumptions, not project data, not validated by partners*. Nothing here should be presented as validated or approved unless the project documents that status.

| File | Role |
|---|---|
| `evidence.json` | **Source of truth** for the evidence register (published findings and costs, sources, rules, methods). Edit this file. |
| `demo_parameters.json` | **Source of truth** for the calculator inputs, cost components and demonstration unit prices and rates. Edit this file. |
| `evidence.js`, `demo_parameters.js` | Generated copies of the two JSON files, written as `window.NBS4MED_EVIDENCE = {...};` and `window.NBS4MED_PARAMS = {...};`. `index.html` loads these, so the page also works when opened directly from disk (browsers block `fetch` of local files). **Do not edit them by hand.** |

Keeping the copies in step:

```bash
node tools/sync-data.js --check   # compares the copies with the JSON (exit code 1 if they differ)
node tools/sync-data.js           # rewrites the copies from the JSON
```

`node tests/engine.test.js` also fails if a copy differs from its source. How the data is used by the code is explained in [`../TECHNICAL_DOCUMENTATION.md`](../TECHNICAL_DOCUMENTATION.md) (sections 7 and 8); the formulas and the full parameter table are in [`../docs/CALCULATIONS.md`](../docs/CALCULATIONS.md).

Descriptions below were written from the contents of the files. Where the meaning of a field is not documented anywhere in the repository, it is marked **(unconfirmed)**.

---

## `evidence.json`

Top-level keys: `meta`, `solutions`, `evidence`, `rules`, `sources`, `methods`, `readiness`, `changelog`.

### `meta`
`title`, `version` (currently "v2 (2026-10-11)"), `origin` (name of the spreadsheet the file was exported from), `status`, `notes` (list of `{topic, text}`: purpose, scope, corrections, independence of studies, ...), `derived_fields` (states that `study_group` is derived, not an original column), `forecast_policy`.

### `solutions` (5 records: NBS01 to NBS05)
`solution_id`, `name_en`, `name_ar`, `pilot_association` (which pilot the solution is associated with, "user project context"), `target_risks`, `evidence_summary`, `proposed_site_checks`, `source_ids`, `limits`, `status` (all "Draft: partner review").

### `evidence` (22 records)
One record is one published value or one qualitative statement.

| Field | Meaning |
|---|---|
| `evidence_id` | Record identifier (E01 to E06, H1, H2, H4 and H6 to H9, F01 to F04, G01, G02, T01 to T03). |
| `solution_id` | The solution it relates to. |
| `type` | `Cost` (14 records) or `Effect` (8 records). |
| `metric` | What was measured, in words. |
| `min_or_value`, `max` | The value, or the lower and upper end of a published range. Empty for qualitative records. |
| `unit` | Unit of the value. |
| `location_context`, `price_or_publication_year`, `area_m2` | Where and when the value applies and the size it refers to (some are the text "Not specified" or "Price year not established"). |
| `source_ids` | Sources in `sources`. |
| `limits` | Stated limits of the value. |
| `usable_for_local_forecast` | `false` for all 22 records. This is a recorded project rule (`forecast_policy`). |
| `outcome_variable`, `statistic_type` | The variable and the kind of statistic (for example `single_case`, `range_of_configuration_means`, `observed_maximum`). Used so that different outcomes and statistics are never pooled. |
| `independent_cases`, `experimental_units`, `climate`, `design`, `observation_period` | Study characteristics where known. |
| `cost_scope`, `price_basis`, `area_basis` | What a cost includes, its price basis and the area it is expressed per. |
| `extraction_status` | How the value was checked (for example `primary_report_text_checked`, `primary_author_abstract_checked`, `secondary_synthesis_checked`). |
| `source_locator` | Page, figure or DOI where the value was read. |
| `allowed_use` | `source_example_only` (18), `qualitative_context_only` (3), `secondary_example_only` (1). **Not read by any code**; it is a recorded intention, and the tool does apply G01 to a user-entered rainfall volume as a labelled scenario (see the discrepancy list in `TECHNICAL_DOCUMENTATION.md`, section 12). |
| `missing_for_transfer` | What would be needed to transfer the value to another place. |
| `study_group` | Derived grouping so that records from one study are counted as one study. |

### `rules` (10 records, R01 to R10)
`rule_id`, `solution_id`, `condition`, `handling`, `status`. Seven are marked "Proposed rule; not implemented" and three "Proposed; not partner approved". The status text has not been updated to reflect which rules the application now shows or enforces (see `TECHNICAL_DOCUMENTATION.md`, section 8.2).

### `sources` (8 records, S01 to S08)
`source_id`, `title`, `publisher`, `url`, `review_scope`, `accessed` (all 2026-10-11).

### `methods` (5 records, M01 to M05)
`method_id`, `solution_id`, `method`, `expression`, `required_inputs`, `availability`, `limits`. Proposed calculation methods; only M01 (component cost sum) is implemented in `js/engine.js`.

### `readiness` (5 records) and `changelog` (7 records)
`readiness`: per solution, the evidence available, the current output and the cost and impact gaps. `changelog`: `record`, `change`, `reason` for corrections made to the register.

---

## `demo_parameters.json`

Top-level keys: `meta`, `published_reference_parameters`, `parameters`, `solutions`.

### `meta`
`title`, `version` ("demo-0.1"), `date`, `status`, `label_en` / `label_ar` (the demo label shown in the interface), `currency` (EUR), `price_year` (**null**: no price year), `price_year_note`, `source_classes` (definitions of `published_reference`, `demo_assumption`, `partner_validated`), `range_name_*` and `range_note_*` (low/high are scenario ranges, not confidence intervals), `exclusions_*` (what the costs leave out).

### `parameters` (43 records)
| Field | Meaning |
|---|---|
| `id` | For example `NBS02.substrate_price`. |
| `solution_id`, `intervention_type` | The solution. |
| `name_en`, `name_ar`, `purpose_en`, `scope_en` | Description and what the value covers. |
| `kind` | `unit_price` (21), `annual_unit_cost` (9), `lump_sum` (6), `rate` (5), `design_factor` (2). |
| `unit`, `currency` | Unit (for example EUR/m²) and currency. |
| `value` | `{low, base, high}`: three alternative demonstration assumptions. |
| `source_class` | `demo_assumption` for all 43. |
| `source_ref`, `partner_validated`, `price_year` | **All empty** in this version. |
| `valid_range` | `{input, min, max}`: the range of one calculator input for which the value was set. Outside it the interface shows a warning. |

### `published_reference_parameters` (3 records)
Parameters taken from evidence records: event retention above 10 mm (G01), typical retention below 10 mm (G02) and the extensive-roof reference costs (H1, H2, H4, H6 to H9). Fields include `evidence_refs`, `source_class`, `usable_for_local_forecast` and `valid_range_en`.

### `solutions` (NBS01 to NBS05)
- `inputs`: the calculator input fields: `id`, `label_en/ar`, `meaning_en/ar`, `unit`, `default`, `min`, `max`, `step`, `required`, `primary`, and `type` (only the one yes/no input has it).
- `components`: the cost components: `id`, `label_en/ar`, `quantity` (which design quantity is multiplied), `qty_unit`, `capex` and `annual` (ids of parameters), and `optional_input` (an input that switches the component on or off).

---

## Provenance and open questions (to be answered by the project team)

Nothing below is guessed; these items are not documented in the repository.

1. **Original spreadsheet.** `meta.origin` names `NBS4MED_Starter_Database (2).xlsx`. It is not in this repository. Where is it kept, who maintains it, and is the JSON an exact export? *(unconfirmed)*
2. **Permission to reproduce source values.** The register quotes values from third-party publications (Climate-ADAPT pages, a Hamburg report, a Helsinki cost-benefit analysis and journal articles). Whether the project may reproduce them in an open repository, and under what attribution, has not been checked. *(unconfirmed)*
3. **Comparison with the original publications.** The extraction status of each record is stated, but the values have not been re-checked against the publications as part of the repository work.
4. **Owner and approval status.** Who approves changes to the register and the parameters, and whether any partner has reviewed them. `partner_validated` is empty for all 43 parameters; no document in the repository records partner approval.
5. **Demonstration prices.** The 43 values are demonstration assumptions "set only so the calculation runs" (`meta.source_classes`). They are not attributed to any source, so there is no provenance to trace. They must be replaced with sourced local prices (with currency, price year and scope) before any cost is presented as more than illustrative.
6. **Meaning of some fields.** `allowed_use` is documented only by its values; whether it should restrict how the engine uses a record is undecided. `readiness` and `changelog` have no description beyond their field names.
7. **Arabic text.** Solution and parameter names have Arabic versions; evidence records, sources and rules are in English only.
8. **Licence of the data.** No licence is chosen for this repository; the terms for the data files are undecided.
