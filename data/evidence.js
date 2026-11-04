/* Generated from evidence.json. Edit the .json, then run tools\sync-data.ps1. */
window.NBS4MED_EVIDENCE = {
  "meta": {
    "title": "NBS4MED starter evidence database",
    "version": "v2 (2026-10-11)",
    "origin": "NBS4MED_Starter_Database (2).xlsx",
    "status": "Starter evidence register for NBS4MED meeting review. Not an approved project repository.",
    "notes": [
      {
        "topic": "Purpose",
        "text": "Starter evidence register for NBS4MED meeting review. Not approved project repository."
      },
      {
        "topic": "Scope",
        "text": "Five generic solution types; pilot associations come from user context, not independently verified pilot specifications."
      },
      {
        "topic": "Sources",
        "text": "Original Hamburg and Lahti report text checked; roof and Lisbon author abstracts checked; Athens search abstract only. Review status is explicit per record."
      },
      {
        "topic": "Site checks",
        "text": "Implementation checks in Solutions are proposed review prompts, not partner-approved eligibility rules."
      },
      {
        "topic": "Missing values",
        "text": "Blank numeric fields mean unavailable, not zero."
      },
      {
        "topic": "Forecasts",
        "text": "All quantitative records have usable_for_local_forecast=false. Do not feed them into the current calculator."
      },
      {
        "topic": "Costs",
        "text": "Keep currency, price year, scope, area and roof type. Do not merge unrelated projects into a generic cost range."
      },
      {
        "topic": "Impact",
        "text": "Separate air temperature, surface temperature, thermal comfort, retention capacity and annual runoff."
      },
      {
        "topic": "Next step",
        "text": "Partners validate definitions, sources, site requirements and ranking rules; add original quantitative studies."
      },
      {
        "topic": "Integration",
        "text": "JSON is data only; website code and original scoring have not been changed."
      },
      {
        "topic": "Version",
        "text": "v2, 2026-10-11: corrected cost scope and area bases; expanded evidence; no local forecasts enabled."
      },
      {
        "topic": "نطاق الاستخدام",
        "text": "هذه قاعدة أدلة مرجعية، وليست نموذج تنبؤ جاهزًا. الأرقام المنشورة لا تُنقل مباشرة إلى البايلوتات."
      },
      {
        "topic": "Hamburg correction",
        "text": "40–45 exists in original p.14 as typical description; seven extensive cases have observed range29–73 and median44. These are not confidence limits."
      },
      {
        "topic": "Lahti correction",
        "text": "Original case costs added separately; do not claim it proves the secondary 240k–600k range or 10,000 m² size."
      },
      {
        "topic": "Missing data",
        "text": "Null means unknown; source publication year is not automatically price or measurement year."
      },
      {
        "topic": "Independence",
        "text": "G01/G02 share one study; T01/T02 share one garden; F01–F04 share one wetland. No pooling by record count."
      }
    ],
    "derived_fields": "study_group is derived from source_id plus the independence notes in ReadMe; it is not an original column.",
    "forecast_policy": "All quantitative records have usable_for_local_forecast=false."
  },
  "solutions": [
    {
      "solution_id": "NBS01",
      "name_en": "Urban forest",
      "name_ar": "غابة حضرية",
      "pilot_association": "Spain pilot association: user project context",
      "target_risks": "Heat; stormwater (design-dependent)",
      "evidence_summary": "Vegetation-based cooling; ecological functions develop over time",
      "proposed_site_checks": "Confirm species, water supply, rooting area and maintenance",
      "source_ids": [
        "S01"
      ],
      "limits": "Generic urban vegetation evidence; not Miyawaki-specific",
      "status": "Draft: partner review"
    },
    {
      "solution_id": "NBS02",
      "name_en": "Green roof",
      "name_ar": "سطح أخضر",
      "pilot_association": "Türkiye pilot association: user project context",
      "target_risks": "Heat; stormwater",
      "evidence_summary": "Building greening and water-sensitive design",
      "proposed_site_checks": "Confirm structural capacity, waterproofing, drainage and vegetation",
      "source_ids": [
        "S02",
        "S03"
      ],
      "limits": "Differentiate extensive and intensive roofs",
      "status": "Draft: partner review"
    },
    {
      "solution_id": "NBS03",
      "name_en": "Multifunctional eco-park",
      "name_ar": "منتزه بيئي متعدد الوظائف",
      "pilot_association": "Greece pilot association: user project context",
      "target_risks": "Heat; stormwater (component-dependent)",
      "evidence_summary": "Combine vegetation and water-management components",
      "proposed_site_checks": "Define components before assigning impact or cost",
      "source_ids": [
        "S01",
        "S02"
      ],
      "limits": "No separate evidence for smart technology benefits collected",
      "status": "Draft: partner review"
    },
    {
      "solution_id": "NBS04",
      "name_en": "Rainwater retention basin",
      "name_ar": "حوض احتجاز مياه الأمطار",
      "pilot_association": "Tunisia pilot association: user project context",
      "target_risks": "Stormwater flooding",
      "evidence_summary": "Water-sensitive design manages runoff",
      "proposed_site_checks": "Confirm catchment, storage, outlets, water quality and maintenance",
      "source_ids": [
        "S02"
      ],
      "limits": "Specify vegetated basin versus engineered tank; reuse needs separate checks",
      "status": "Draft: partner review"
    },
    {
      "solution_id": "NBS05",
      "name_en": "Green corridor",
      "name_ar": "ممر أخضر",
      "pilot_association": "Egypt pilot association: user project context",
      "target_risks": "Heat; stormwater (design-dependent)",
      "evidence_summary": "Connected urban vegetation",
      "proposed_site_checks": "Confirm street space, utilities, species, irrigation and maintenance",
      "source_ids": [
        "S01"
      ],
      "limits": "No corridor-specific cooling coefficient collected",
      "status": "Draft: partner review"
    }
  ],
  "evidence": [
    {
      "evidence_id": "E01",
      "solution_id": "NBS01",
      "type": "Effect",
      "metric": "Cooling potential",
      "min_or_value": null,
      "max": null,
      "unit": "Qualitative",
      "location_context": "Urban vegetation",
      "price_or_publication_year": "Not specified",
      "area_m2": "Not specified",
      "source_ids": [
        "S01"
      ],
      "limits": "Not a numerical forecast; forest-method evidence pending",
      "usable_for_local_forecast": false,
      "outcome_variable": "qualitative_function",
      "statistic_type": "qualitative",
      "independent_cases": null,
      "experimental_units": null,
      "climate": null,
      "design": null,
      "observation_period": null,
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "secondary_synthesis_checked",
      "source_locator": "S01",
      "allowed_use": "qualitative_context_only",
      "missing_for_transfer": "Intervention-specific primary data",
      "study_group": "S01:synthesis"
    },
    {
      "evidence_id": "E02",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof: author descriptive typical band",
      "min_or_value": 40,
      "max": 45,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": null,
      "source_ids": [
        "S04"
      ],
      "limits": "Printed p.14: descriptive band for most roofs, not observed min/max; see individual cases",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "author_typical_band",
      "independent_cases": null,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "See Fig.3",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 printed pp.10–15, Fig.3",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "E03",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Intensive roof: single case",
      "min_or_value": 58,
      "max": 58,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 591,
      "source_ids": [
        "S04"
      ],
      "limits": "Fig.3 case3; reported rounded value; only part of total roof greened",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Intensive; constructed 2014; greened area differs from total roof",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case3, printed pp.12 and15",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "E04",
      "solution_id": "NBS03",
      "type": "Effect",
      "metric": "Vegetation / runoff functions",
      "min_or_value": null,
      "max": null,
      "unit": "Qualitative",
      "location_context": "Generic urban infrastructure",
      "price_or_publication_year": "Not specified",
      "area_m2": "Not specified",
      "source_ids": [
        "S01",
        "S02"
      ],
      "limits": "Component-based design needed; no total smart-park coefficient",
      "usable_for_local_forecast": false,
      "outcome_variable": "qualitative_function",
      "statistic_type": "qualitative",
      "independent_cases": null,
      "experimental_units": null,
      "climate": null,
      "design": null,
      "observation_period": null,
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "secondary_synthesis_checked",
      "source_locator": "S01; S02",
      "allowed_use": "qualitative_context_only",
      "missing_for_transfer": "Intervention-specific primary data",
      "study_group": "S01+S02:synthesis"
    },
    {
      "evidence_id": "E05",
      "solution_id": "NBS04",
      "type": "Cost",
      "metric": "Stormwater pond implementation",
      "min_or_value": 240000,
      "max": 600000,
      "unit": "EUR/project",
      "location_context": "Finland",
      "price_or_publication_year": "Price year not established",
      "area_m2": null,
      "source_ids": [
        "S02"
      ],
      "limits": "Secondary range; size 10,000 m² basis unresolved; not matched to original Lahti case; do not divide by area",
      "usable_for_local_forecast": false,
      "outcome_variable": "stormwater_pond_construction_cost",
      "statistic_type": "secondary_reported_range",
      "independent_cases": null,
      "experimental_units": null,
      "climate": null,
      "design": null,
      "observation_period": null,
      "cost_scope": null,
      "price_basis": null,
      "area_basis": "10,000 m² size reported; interpretation unresolved",
      "extraction_status": "secondary_checked_original_range_unresolved",
      "source_locator": "S02 Costs and benefits",
      "allowed_use": "secondary_example_only",
      "missing_for_transfer": null,
      "study_group": "S02:secondary-range-finland"
    },
    {
      "evidence_id": "E06",
      "solution_id": "NBS05",
      "type": "Effect",
      "metric": "Urban greening potential",
      "min_or_value": null,
      "max": null,
      "unit": "Qualitative",
      "location_context": "Generic green infrastructure",
      "price_or_publication_year": "Not specified",
      "area_m2": "Not specified",
      "source_ids": [
        "S01"
      ],
      "limits": "Not a corridor-specific temperature reduction",
      "usable_for_local_forecast": false,
      "outcome_variable": "qualitative_function",
      "statistic_type": "qualitative",
      "independent_cases": null,
      "experimental_units": null,
      "climate": null,
      "design": null,
      "observation_period": null,
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "secondary_synthesis_checked",
      "source_locator": "S01",
      "allowed_use": "qualitative_context_only",
      "missing_for_transfer": "Intervention-specific primary data",
      "study_group": "S01:synthesis"
    },
    {
      "evidence_id": "H1",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 73,
      "max": 73,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 196,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 1; built 2009",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2009",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case1, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "H2",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 44,
      "max": 44,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 414,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 2; built 2016",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2016",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case2, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "H4",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 43,
      "max": 43,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 1000,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 4; built 2016",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2016",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case4, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "H6",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 29,
      "max": 29,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 1130,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 6; built 2006",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2006",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case6, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "H7",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 47,
      "max": 47,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 1214,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 7; built 2014",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2014",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case7, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "H8",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 43,
      "max": 43,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 1382,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 8; built 2015",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2015",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case8, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "H9",
      "solution_id": "NBS02",
      "type": "Cost",
      "metric": "Extensive roof individual case",
      "min_or_value": 53,
      "max": 53,
      "unit": "EUR/m² total roof",
      "location_context": "Hamburg, Germany",
      "price_or_publication_year": 2017,
      "area_m2": 1944,
      "source_ids": [
        "S04"
      ],
      "limits": "Rounded source value; case 9; built 2012",
      "usable_for_local_forecast": false,
      "outcome_variable": "green_roof_construction_cost",
      "statistic_type": "single_case",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Hamburg; classification not extracted",
      "design": "Extensive; built 2012",
      "observation_period": null,
      "cost_scope": "Creation and establishment care; VAT included; root-resistant waterproofing excluded",
      "price_basis": "May 2017 construction index",
      "area_basis": "total roof area",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S04 Fig.3 case9, printed pp.12–13",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local prices; comparable specification; roof-area basis; exclusions",
      "study_group": "S04:hamburg-green-roofs"
    },
    {
      "evidence_id": "F01",
      "solution_id": "NBS04",
      "type": "Cost",
      "metric": "Wetland construction",
      "min_or_value": 360000,
      "max": 360000,
      "unit": "EUR/project",
      "location_context": "Kivipuro, Lahti, Finland",
      "price_or_publication_year": "2008–2011",
      "area_m2": null,
      "source_ids": [
        "S05"
      ],
      "limits": "Wetland system; not generic basin; no confirmed area denominator",
      "usable_for_local_forecast": false,
      "outcome_variable": "Wetland construction",
      "statistic_type": "approximate_case_cost",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Finland; climate class not extracted",
      "design": null,
      "observation_period": null,
      "cost_scope": "Ponds, ditches, paths and planting",
      "price_basis": "No explicit common price-index year",
      "area_basis": "not extracted",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S05 printed p.67; PDF p.71",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local bill of quantities; system boundary; VAT; common price year",
      "study_group": "S05:kivipuro-wetland-lahti"
    },
    {
      "evidence_id": "F02",
      "solution_id": "NBS04",
      "type": "Cost",
      "metric": "Wetland planning",
      "min_or_value": 20000,
      "max": 20000,
      "unit": "EUR/project",
      "location_context": "Kivipuro, Lahti, Finland",
      "price_or_publication_year": "Price year not explicit",
      "area_m2": null,
      "source_ids": [
        "S05"
      ],
      "limits": "Wetland system; not generic basin; no confirmed area denominator",
      "usable_for_local_forecast": false,
      "outcome_variable": "Wetland planning",
      "statistic_type": "approximate_case_cost",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Finland; climate class not extracted",
      "design": null,
      "observation_period": null,
      "cost_scope": "Wetland planning",
      "price_basis": "No explicit common price-index year",
      "area_basis": "not extracted",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S05 printed p.67; PDF p.71",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local bill of quantities; system boundary; VAT; common price year",
      "study_group": "S05:kivipuro-wetland-lahti"
    },
    {
      "evidence_id": "F03",
      "solution_id": "NBS04",
      "type": "Cost",
      "metric": "Maintenance in 2012",
      "min_or_value": 5000,
      "max": 5000,
      "unit": "EUR/year observed",
      "location_context": "Kivipuro, Lahti, Finland",
      "price_or_publication_year": 2012,
      "area_m2": null,
      "source_ids": [
        "S05"
      ],
      "limits": "Wetland system; not generic basin; no confirmed area denominator",
      "usable_for_local_forecast": false,
      "outcome_variable": "Maintenance in 2012",
      "statistic_type": "approximate_case_cost",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Finland; climate class not extracted",
      "design": null,
      "observation_period": null,
      "cost_scope": "Maintenance in 2012",
      "price_basis": "No explicit common price-index year",
      "area_basis": "not extracted",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S05 printed p.67; PDF p.71",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local bill of quantities; system boundary; VAT; common price year",
      "study_group": "S05:kivipuro-wetland-lahti"
    },
    {
      "evidence_id": "F04",
      "solution_id": "NBS04",
      "type": "Cost",
      "metric": "Maintenance in 2013",
      "min_or_value": 8000,
      "max": 8000,
      "unit": "EUR/year observed",
      "location_context": "Kivipuro, Lahti, Finland",
      "price_or_publication_year": 2013,
      "area_m2": null,
      "source_ids": [
        "S05"
      ],
      "limits": "Wetland system; not generic basin; no confirmed area denominator",
      "usable_for_local_forecast": false,
      "outcome_variable": "Maintenance in 2013",
      "statistic_type": "approximate_case_cost",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Finland; climate class not extracted",
      "design": null,
      "observation_period": null,
      "cost_scope": "Maintenance in 2013",
      "price_basis": "No explicit common price-index year",
      "area_basis": "not extracted",
      "extraction_status": "primary_report_text_checked",
      "source_locator": "S05 printed p.67; PDF p.71",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Local bill of quantities; system boundary; VAT; common price year",
      "study_group": "S05:kivipuro-wetland-lahti"
    },
    {
      "evidence_id": "G01",
      "solution_id": "NBS02",
      "type": "Effect",
      "metric": "Mean per-event rainfall retention for events >10 mm",
      "min_or_value": 26.8,
      "max": 61.8,
      "unit": "percent",
      "location_context": "UK experimental roofs",
      "price_or_publication_year": 2015,
      "area_m2": null,
      "source_ids": [
        "S06"
      ],
      "limits": "Range of bed-specific means; not annual retention or prediction interval",
      "usable_for_local_forecast": false,
      "outcome_variable": "event_rainfall_retention_fraction",
      "statistic_type": "range_of_configuration_means",
      "independent_cases": 1,
      "experimental_units": 9,
      "climate": "UK; exact class not extracted",
      "design": "80 mm extensive; three substrates and three vegetation treatments",
      "observation_period": "four years",
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "primary_author_abstract_checked",
      "source_locator": "S06 abstract; DOI 10.1016/j.ecoleng.2015.09.076",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Full data; substrate properties; rainfall time series; antecedent moisture",
      "study_group": "S06:uk-experimental-roofs"
    },
    {
      "evidence_id": "G02",
      "solution_id": "NBS02",
      "type": "Effect",
      "metric": "Typical retention for events <10 mm",
      "min_or_value": 80,
      "max": null,
      "unit": "percent; greater than",
      "location_context": "UK experimental roofs",
      "price_or_publication_year": 2015,
      "area_m2": null,
      "source_ids": [
        "S06"
      ],
      "limits": "Typical >80%, not a guaranteed lower bound",
      "usable_for_local_forecast": false,
      "outcome_variable": "event_rainfall_retention_fraction",
      "statistic_type": "qualitative_threshold",
      "independent_cases": 1,
      "experimental_units": 9,
      "climate": "UK; exact class not extracted",
      "design": "80 mm extensive; three substrates and three vegetation treatments",
      "observation_period": "four years",
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "primary_author_abstract_checked",
      "source_locator": "S06 abstract",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Full data; substrate properties; rainfall time series; antecedent moisture",
      "study_group": "S06:uk-experimental-roofs"
    },
    {
      "evidence_id": "T01",
      "solution_id": "NBS03",
      "type": "Effect",
      "metric": "Maximum observed air-temperature contrast",
      "min_or_value": 6.9,
      "max": 6.9,
      "unit": "°C contrast",
      "location_context": "Lisbon, Portugal",
      "price_or_publication_year": 2011,
      "area_m2": 2400,
      "source_ids": [
        "S07"
      ],
      "limits": "Shaded garden versus sunny street; maximum, not mean or intervention causal effect",
      "usable_for_local_forecast": false,
      "outcome_variable": "air_temperature_contrast",
      "statistic_type": "observed_maximum",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Mediterranean",
      "design": "Small garden versus surrounding streets",
      "observation_period": "Hot-weather measurements; full dates pending",
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "primary_author_abstract_checked",
      "source_locator": "S07 abstract; DOI 10.1016/j.buildenv.2011.04.034",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Geometry; shade; weather; irrigation; full methods",
      "study_group": "S07:lisbon-garden"
    },
    {
      "evidence_id": "T02",
      "solution_id": "NBS03",
      "type": "Effect",
      "metric": "Maximum mean-radiant-temperature contrast",
      "min_or_value": 39.2,
      "max": 39.2,
      "unit": "°C contrast",
      "location_context": "Lisbon, Portugal",
      "price_or_publication_year": 2011,
      "area_m2": 2400,
      "source_ids": [
        "S07"
      ],
      "limits": "Same study as T01; not an independent case; not air temperature",
      "usable_for_local_forecast": false,
      "outcome_variable": "mean_radiant_temperature_contrast",
      "statistic_type": "observed_maximum",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Mediterranean",
      "design": "Small garden versus surrounding streets",
      "observation_period": "Hot-weather measurements; full dates pending",
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "primary_author_abstract_checked",
      "source_locator": "S07 abstract; DOI 10.1016/j.buildenv.2011.04.034",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Geometry; shade; weather; irrigation; full methods",
      "study_group": "S07:lisbon-garden"
    },
    {
      "evidence_id": "T03",
      "solution_id": "NBS03",
      "type": "Effect",
      "metric": "Park cooling intensity",
      "min_or_value": 3.3,
      "max": 3.8,
      "unit": "K temperature difference",
      "location_context": "Athens, Greece",
      "price_or_publication_year": 2014,
      "area_m2": null,
      "source_ids": [
        "S08"
      ],
      "limits": "Ambient temperature; 29 July–2 September2012; full paper not retrieved",
      "usable_for_local_forecast": false,
      "outcome_variable": "air_temperature_park_cooling_intensity",
      "statistic_type": "reported_range",
      "independent_cases": 1,
      "experimental_units": null,
      "climate": "Mediterranean",
      "design": null,
      "observation_period": null,
      "cost_scope": null,
      "price_basis": null,
      "area_basis": null,
      "extraction_status": "publisher_search_abstract_only",
      "source_locator": "S08 abstract",
      "allowed_use": "source_example_only",
      "missing_for_transfer": "Full paper; reference definition; park design; spatial extent",
      "study_group": "S08:athens-park"
    }
  ],
  "rules": [
    {
      "rule_id": "R01",
      "solution_id": "All",
      "condition": "Insufficient site information",
      "handling": "Show site verification required",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R02",
      "solution_id": "NBS02",
      "condition": "Structural capacity unknown",
      "handling": "Do not claim technical feasibility",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R03",
      "solution_id": "NBS01; NBS05",
      "condition": "Water supply unknown",
      "handling": "Flag water requirement; do not label drought suitability automatically",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R04",
      "solution_id": "NBS03",
      "condition": "Park components unspecified",
      "handling": "Do not calculate aggregate impact or cost",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R05",
      "solution_id": "NBS04",
      "condition": "Catchment / storage data absent",
      "handling": "Do not estimate annual captured volume",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R06",
      "solution_id": "All",
      "condition": "Source context or price year mismatches",
      "handling": "Show source example only; no local numeric forecast",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R07",
      "solution_id": "All",
      "condition": "Very low match score",
      "handling": "Separate comparison options from recommendations; threshold pending partners",
      "status": "Proposed rule; not implemented"
    },
    {
      "rule_id": "R08",
      "solution_id": "All",
      "condition": "Different outcomes or study statistics",
      "handling": "Never pool air temperature, MRT, maxima and means",
      "status": "Proposed; not partner approved"
    },
    {
      "rule_id": "R09",
      "solution_id": "All",
      "condition": "Multiple records from one study",
      "handling": "Count study/site independence, not record count",
      "status": "Proposed; not partner approved"
    },
    {
      "rule_id": "R10",
      "solution_id": "All",
      "condition": "Missing value or price input",
      "handling": "Return unavailable; never substitute zero",
      "status": "Proposed; not partner approved"
    }
  ],
  "sources": [
    {
      "source_id": "S01",
      "title": "Climate-ADAPT: Urban green and blue infrastructure",
      "publisher": "EEA / European Commission",
      "url": "https://climate-adapt.eea.europa.eu/en/metadata/adaptation-options/green-spaces-and-corridors-in-urban-areas",
      "review_scope": "Adaptation options; qualitative evidence",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S02",
      "title": "Climate-ADAPT: Water sensitive urban and building design",
      "publisher": "EEA / European Commission",
      "url": "https://climate-adapt.eea.europa.eu/en/metadata/adaptation-options/water-sensitive-urban-and-building-design",
      "review_scope": "Costs and benefits; original studies linked on page",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S03",
      "title": "Climate-ADAPT: Climate proofing of buildings against excessive heat and cold",
      "publisher": "EEA / European Commission",
      "url": "https://climate-adapt.eea.europa.eu/en/metadata/adaptation-options/climate-proofing-of-buildings-against-excessive-heat",
      "review_scope": "Costs and benefits; Hamburg roof example",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S04",
      "title": "Hamburg’s Green Roofs: An Economic Evaluation",
      "publisher": "BUE / HafenCity University, 2017",
      "url": "https://www.hamburg.com/resource/blob/1057968/4f3ba7ede2a8a5e1038f73e5f24a75b9/d-economic-evaluation-data.pdf",
      "review_scope": "Original report; printed pp.10–15, Fig.3",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S05",
      "title": "Cost-benefit analysis of municipal water protection measures",
      "publisher": "Eliisa Punttila / City of Helsinki Environment Centre, 21/2014",
      "url": "https://www.hel.fi/static/ymk/julkaisut/julkaisu-21-14.pdf",
      "review_scope": "Original report; chapter6, printed p.67 (PDF p.71)",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S06",
      "title": "The influence of substrate and vegetation configuration on green roof hydrological performance",
      "publisher": "Stovin, Poë, De-Ville & Berretta, 2015",
      "url": "https://eprints.whiterose.ac.uk/id/eprint/93038/",
      "review_scope": "Author institutional record: abstract reviewed; full tables not extracted",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S07",
      "title": "The cooling effect of green spaces as a contribution to the mitigation of urban heat: A case study in Lisbon",
      "publisher": "Oliveira, Andrade & Vaz, 2011",
      "url": "https://researchportal.ulisboa.pt/en/publications/the-cooling-effect-of-green-spaces-as-a-contribution-to-the-mitig-3/",
      "review_scope": "Author institutional record: abstract reviewed; full methods pending",
      "accessed": "2026-10-11"
    },
    {
      "source_id": "S08",
      "title": "On the thermal characteristics and the mitigation potential of a medium size urban park in Athens, Greece",
      "publisher": "Landscape and Urban Planning, 2014",
      "url": "https://www.sciencedirect.com/science/article/abs/pii/S0169204613002107",
      "review_scope": "Publisher search abstract only; detailed extraction pending",
      "accessed": "2026-10-11"
    }
  ],
  "methods": [
    {
      "method_id": "M01",
      "solution_id": "All",
      "method": "Component cost sum",
      "expression": "Σ(quantity × unit price)",
      "required_inputs": "Matching local specification, units, currency, price year, inclusions",
      "availability": "Arithmetic available with user/verified prices; database not yet local",
      "limits": "Proposed engineering calculation; no price coefficients supplied"
    },
    {
      "method_id": "M02",
      "solution_id": "All",
      "method": "Price-year update",
      "expression": "Original price × target index / original index",
      "required_inputs": "Same suitable construction index; both years; index source",
      "availability": "Disabled until index supplied",
      "limits": "Do not use exchange rate alone as geographic cost correction"
    },
    {
      "method_id": "M03",
      "solution_id": "NBS01; NBS03; NBS05",
      "method": "Thermal evidence retrieval",
      "expression": "No numeric site forecast",
      "required_inputs": "Same variable/statistic; design/weather comparator",
      "availability": "Reference cards only",
      "limits": "No universal °C per m² coefficient"
    },
    {
      "method_id": "M04",
      "solution_id": "NBS02; NBS04",
      "method": "Hydrologic evidence retrieval",
      "expression": "No numeric site forecast",
      "required_inputs": "Rainfall; design; antecedent moisture; drainage",
      "availability": "Reference cards only",
      "limits": "Annual retention differs from event retention and storage"
    },
    {
      "method_id": "M05",
      "solution_id": "All",
      "method": "Life-cycle cost",
      "expression": "CAPEX + Σ annual cost/(1+r)^t",
      "required_inputs": "Cost scope; service life; discount rate; replacement schedule",
      "availability": "Available only after all inputs supplied",
      "limits": "Method proposal; not validated project calculator"
    }
  ],
  "readiness": [
    {
      "solution_id": "NBS01",
      "solution": "Urban forest",
      "available_evidence": "Qualitative synthesis only",
      "current_output": "No local forecast",
      "cost_gaps": "Local item prices, quantities and specification",
      "impact_gaps": "Canopy, geometry, weather, irrigation, comparator"
    },
    {
      "solution_id": "NBS02",
      "solution": "Green roof",
      "available_evidence": "Hamburg case costs; UK event retention",
      "current_output": "No local forecast",
      "cost_gaps": "Local item prices, quantities and specification",
      "impact_gaps": "Roof system, rainfall, substrate moisture"
    },
    {
      "solution_id": "NBS03",
      "solution": "Multifunctional eco-park",
      "available_evidence": "Lisbon/Athens thermal examples",
      "current_output": "No local forecast",
      "cost_gaps": "Local item prices, quantities and specification",
      "impact_gaps": "Canopy, geometry, weather, irrigation, comparator"
    },
    {
      "solution_id": "NBS04",
      "solution": "Rainwater retention basin",
      "available_evidence": "Lahti system costs; no retention coefficient",
      "current_output": "No local forecast",
      "cost_gaps": "Local item prices, quantities and specification",
      "impact_gaps": "Catchment, storage, outlets, rainfall"
    },
    {
      "solution_id": "NBS05",
      "solution": "Green corridor",
      "available_evidence": "Qualitative synthesis only",
      "current_output": "No local forecast",
      "cost_gaps": "Local item prices, quantities and specification",
      "impact_gaps": "Canopy, geometry, weather, irrigation, comparator"
    }
  ],
  "changelog": [
    {
      "record": "E02",
      "change": "Typical band40–45 retained",
      "reason": "Primary p.14 confirms wording; not empirical extrema"
    },
    {
      "record": "E03",
      "change": "2017 index; total roof591m²; n=1",
      "reason": "Primary Fig.3; do not convert to greened-area cost"
    },
    {
      "record": "E05",
      "change": "Size denominator removed; unresolved original range",
      "reason": "Secondary example retained without transfer"
    },
    {
      "record": "New costs",
      "change": "7 individual roof records +4 Lahti records",
      "reason": "Distinct cases/cost categories; no generic merged price"
    },
    {
      "record": "New effects",
      "change": "2 roof hydrology +3 thermal records",
      "reason": "Statistics and shared study identities explicit"
    },
    {
      "record": "Source titles",
      "change": "S01 retained; S03 extended with heat and cold",
      "reason": "Current institutional page titles"
    },
    {
      "record": "Model inputs",
      "change": "No arbitrary coefficients or PySWMM placeholders imported",
      "reason": "Only literature data and proposed method definitions"
    }
  ]
};
