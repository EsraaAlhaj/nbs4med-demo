/* Generated from demo_parameters.json. Edit the .json, then run tools\sync-data.ps1. */
window.NBS4MED_PARAMS = {
  "meta": {
    "title": "NBS4MED demo parameters",
    "version": "demo-0.1",
    "date": "2026-10-11",
    "status": "Demonstration assumptions. Not project data. Not validated by partners.",
    "label_en": "Demo version: illustrative estimates, to be reviewed when project data become available",
    "label_ar": "نسخة تجريبية: تقديرات توضيحية ستُراجع عند توفر بيانات المشروع",
    "currency": "EUR",
    "price_year": null,
    "price_year_note": "No price year: demo values were not taken from a dated price list and no price index is applied.",
    "source_classes": {
      "published_reference": "Value taken from a published record in evidence.json; use limits of that record apply.",
      "demo_assumption": "Value set by the demo authors only to make the calculation run. Not attributed to any study or partner.",
      "partner_validated": "Value confirmed by a project partner. Empty in this version."
    },
    "range_name_en": "Illustrative scenario range",
    "range_name_ar": "نطاق سيناريوهات توضيحي",
    "range_note_en": "Low and high are alternative demo assumptions. This is not a statistical confidence interval.",
    "range_note_ar": "القيمتان الدنيا والعليا افتراضان بديلان للتجربة. هذا ليس فترة ثقة إحصائية.",
    "exclusions_en": "Excludes land acquisition, VAT unless stated, utility relocation, contingency, financing and replacement beyond annual maintenance.",
    "exclusions_ar": "لا يشمل شراء الأرض، وضريبة القيمة المضافة ما لم يُذكر، ونقل المرافق، والطوارئ، والتمويل، والاستبدال خارج الصيانة السنوية."
  },
  "published_reference_parameters": [
    {
      "intervention_type": "green_roof",
      "kind": "published_reference",
      "source_class": "published_reference",
      "partner_validated": null,
      "usable_for_local_forecast": false,
      "id": "NBS02.event_retention_gt10mm",
      "solution_id": "NBS02",
      "name_en": "Mean per-event retention, events > 10 mm",
      "name_ar": "متوسط الاحتجاز لكل حدث مطري أكبر من 10 مم",
      "evidence_refs": [
        "G01"
      ],
      "unit": "fraction of event rainfall",
      "purpose_en": "Single-event retained volume scenario",
      "valid_range_en": "Experimental roofs, UK, 80 mm extensive build-up; events > 10 mm. Upper event depth not extracted."
    },
    {
      "intervention_type": "green_roof",
      "kind": "published_reference",
      "source_class": "published_reference",
      "partner_validated": null,
      "usable_for_local_forecast": false,
      "id": "NBS02.event_retention_lt10mm",
      "solution_id": "NBS02",
      "name_en": "Typical retention, events < 10 mm",
      "name_ar": "الاحتجاز المعتاد للأحداث الأقل من 10 مم",
      "evidence_refs": [
        "G02"
      ],
      "unit": "percent; greater than",
      "purpose_en": "Qualitative statement only; not used as a numeric lower bound",
      "valid_range_en": "Same experimental roofs; not a guaranteed lower bound"
    },
    {
      "intervention_type": "green_roof",
      "kind": "published_reference",
      "source_class": "published_reference",
      "partner_validated": null,
      "usable_for_local_forecast": false,
      "id": "NBS02.reference_cost_extensive",
      "solution_id": "NBS02",
      "name_en": "Extensive-roof construction cost cases (7)",
      "name_ar": "كلفة إنشاء السطح الممتد (7 حالات)",
      "evidence_refs": [
        "H1",
        "H2",
        "H4",
        "H6",
        "H7",
        "H8",
        "H9"
      ],
      "unit": "EUR/m² total roof area, 2017 prices",
      "purpose_en": "Reference-case cost scaling by roof area",
      "valid_range_en": "Case roof areas 196 to 1,944 m²; Hamburg; VAT included; root-resistant waterproofing excluded"
    }
  ],
  "parameters": [
    {
      "id": "NBS01.sapling_price",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Sapling unit price",
      "name_ar": "سعر الشتلة الواحدة",
      "kind": "unit_price",
      "unit": "EUR/plant",
      "value": {
        "low": 2,
        "base": 4,
        "high": 8
      },
      "purpose_en": "Capex: plants",
      "scope_en": "Supply of one sapling only; planting labour is a separate component",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS01.soil_prep",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Soil preparation and amendment",
      "name_ar": "تجهيز التربة وتحسينها",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 3,
        "base": 6,
        "high": 12
      },
      "purpose_en": "Capex: ground preparation",
      "scope_en": "Per m² of planted area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS01.planting_labour",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Planting labour and mulch",
      "name_ar": "عمالة الزراعة والتغطية العضوية",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 2,
        "base": 4,
        "high": 8
      },
      "purpose_en": "Capex: installation",
      "scope_en": "Per m² of planted area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS01.irrigation_setup",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Establishment irrigation set-up",
      "name_ar": "تجهيز الري خلال فترة التأسيس",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 1,
        "base": 2.5,
        "high": 5
      },
      "purpose_en": "Capex: temporary irrigation",
      "scope_en": "Per m² of planted area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS01.design_lump",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Design and site set-up",
      "name_ar": "التصميم وتجهيز الموقع",
      "kind": "lump_sum",
      "unit": "EUR (lump sum)",
      "value": {
        "low": 1500,
        "base": 3000,
        "high": 6000
      },
      "purpose_en": "Capex: fixed items that do not scale with area",
      "scope_en": "Independent of area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS01.maintenance_annual",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Annual maintenance during establishment",
      "name_ar": "الصيانة السنوية خلال التأسيس",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 1.5,
        "base": 3,
        "high": 6
      },
      "purpose_en": "Annual: weeding, watering, replacement of failed plants",
      "scope_en": "Per m² of planted area; intensive establishment phase only",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS01.water_demand_lpd",
      "solution_id": "NBS01",
      "intervention_type": "urban_forest",
      "name_en": "Establishment water demand",
      "name_ar": "الاحتياج المائي خلال التأسيس",
      "kind": "rate",
      "unit": "L/m²/day",
      "value": {
        "low": 2,
        "base": 4,
        "high": 8
      },
      "purpose_en": "Resource requirement: irrigation water in the dry period",
      "scope_en": "Applies only on irrigated days",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 100,
        "max": 10000
      },
      "currency": null,
      "price_year": null
    },
    {
      "id": "NBS02.substrate_price",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Growing substrate",
      "name_ar": "وسط النمو (التربة الخفيفة)",
      "kind": "unit_price",
      "unit": "EUR/m³",
      "value": {
        "low": 60,
        "base": 90,
        "high": 140
      },
      "purpose_en": "Capex: substrate",
      "scope_en": "Per m³ of substrate; volume = roof area × substrate depth",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS02.drainage_layer",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Drainage, filter and protection layers",
      "name_ar": "طبقات التصريف والترشيح والحماية",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 5,
        "base": 8,
        "high": 14
      },
      "purpose_en": "Capex: layer build-up",
      "scope_en": "Per m² of greened roof",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS02.vegetation",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Vegetation (mats or plugs)",
      "name_ar": "الغطاء النباتي",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 6,
        "base": 12,
        "high": 25
      },
      "purpose_en": "Capex: planting",
      "scope_en": "Per m² of greened roof",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS02.install_labour",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Installation labour",
      "name_ar": "عمالة التركيب",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 4,
        "base": 8,
        "high": 15
      },
      "purpose_en": "Capex: installation",
      "scope_en": "Per m² of greened roof",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS02.waterproofing",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Root-resistant waterproofing",
      "name_ar": "عزل مائي مقاوم للجذور",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 8,
        "base": 14,
        "high": 25
      },
      "purpose_en": "Capex: optional, excluded from the Hamburg reference scope",
      "scope_en": "Per m² of roof; only if the roof needs new waterproofing",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS02.structural_check_lump",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Structural check and design",
      "name_ar": "الفحص الإنشائي والتصميم",
      "kind": "lump_sum",
      "unit": "EUR (lump sum)",
      "value": {
        "low": 1000,
        "base": 2500,
        "high": 6000
      },
      "purpose_en": "Capex: feasibility check (rule R02)",
      "scope_en": "Independent of area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS02.maintenance_annual",
      "solution_id": "NBS02",
      "intervention_type": "green_roof",
      "name_en": "Annual maintenance (extensive roof)",
      "name_ar": "الصيانة السنوية (سطح ممتد)",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 1,
        "base": 2.5,
        "high": 5
      },
      "purpose_en": "Annual: inspection, weeding, drainage cleaning",
      "scope_en": "Per m² of greened roof",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 50,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.tree_area_build",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Tree-planted area, build",
      "name_ar": "مساحة الأشجار، الإنشاء",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 25,
        "base": 45,
        "high": 80
      },
      "purpose_en": "Capex: trees, soil, tree pits",
      "scope_en": "Per m² of tree-planted area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.meadow_build",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Meadow or lawn area, build",
      "name_ar": "مساحة المروج والأعشاب، الإنشاء",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 4,
        "base": 8,
        "high": 15
      },
      "purpose_en": "Capex: soil and seeding",
      "scope_en": "Per m² of meadow area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.water_build",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Rain garden or water feature, build",
      "name_ar": "حديقة مطرية أو عنصر مائي، الإنشاء",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 30,
        "base": 55,
        "high": 100
      },
      "purpose_en": "Capex: excavation, planting, edging",
      "scope_en": "Per m² of water-feature area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.hard_build",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Paths and hard surfaces, build",
      "name_ar": "الممرات والأسطح الصلبة، الإنشاء",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 30,
        "base": 55,
        "high": 90
      },
      "purpose_en": "Capex: paving and edging",
      "scope_en": "Per m² of hard surface",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.irrigation_system",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Irrigation system incl. controllers",
      "name_ar": "نظام الري مع وحدات التحكم",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 4,
        "base": 8,
        "high": 15
      },
      "purpose_en": "Capex: irrigation (no evidence collected for smart-technology benefits)",
      "scope_en": "Per m² of irrigated area (trees + meadow)",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.design_lump",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Design and site set-up",
      "name_ar": "التصميم وتجهيز الموقع",
      "kind": "lump_sum",
      "unit": "EUR (lump sum)",
      "value": {
        "low": 4000,
        "base": 8000,
        "high": 16000
      },
      "purpose_en": "Capex: fixed items",
      "scope_en": "Independent of area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.tree_maint",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Tree area maintenance",
      "name_ar": "صيانة مساحة الأشجار",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 2,
        "base": 4,
        "high": 8
      },
      "purpose_en": "Annual",
      "scope_en": "Per m² of tree-planted area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.meadow_maint",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Meadow maintenance",
      "name_ar": "صيانة المروج",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 0.5,
        "base": 1.2,
        "high": 2.5
      },
      "purpose_en": "Annual",
      "scope_en": "Per m² of meadow area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.water_maint",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Water feature maintenance",
      "name_ar": "صيانة العنصر المائي",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 3,
        "base": 6,
        "high": 12
      },
      "purpose_en": "Annual",
      "scope_en": "Per m² of water-feature area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.hard_maint",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Hard surface maintenance",
      "name_ar": "صيانة الأسطح الصلبة",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 0.5,
        "base": 1,
        "high": 2
      },
      "purpose_en": "Annual",
      "scope_en": "Per m² of hard surface",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS03.tree_water_lpd",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Tree area water demand",
      "name_ar": "احتياج مساحة الأشجار للماء",
      "kind": "rate",
      "unit": "L/m²/day",
      "value": {
        "low": 2,
        "base": 4,
        "high": 6
      },
      "purpose_en": "Resource requirement",
      "scope_en": "On irrigated days",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": null,
      "price_year": null
    },
    {
      "id": "NBS03.meadow_water_lpd",
      "solution_id": "NBS03",
      "intervention_type": "multifunctional_eco_park",
      "name_en": "Meadow water demand",
      "name_ar": "احتياج المروج للماء",
      "kind": "rate",
      "unit": "L/m²/day",
      "value": {
        "low": 1,
        "base": 3,
        "high": 5
      },
      "purpose_en": "Resource requirement",
      "scope_en": "On irrigated days",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "area_m2",
        "min": 500,
        "max": 50000
      },
      "currency": null,
      "price_year": null
    },
    {
      "id": "NBS04.excavation_price",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Excavation and haulage",
      "name_ar": "الحفر والنقل",
      "kind": "unit_price",
      "unit": "EUR/m³",
      "value": {
        "low": 10,
        "base": 20,
        "high": 40
      },
      "purpose_en": "Capex: earthworks",
      "scope_en": "Per m³ of gross excavated volume (footprint × depth)",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS04.liner_price",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Liner or geotextile",
      "name_ar": "البطانة أو القماش الجيوتكستايل",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 3,
        "base": 6,
        "high": 12
      },
      "purpose_en": "Capex: lining",
      "scope_en": "Per m² of basin footprint",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS04.planting_price",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Basin planting and finishing",
      "name_ar": "زراعة الحوض والتشطيب",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 4,
        "base": 8,
        "high": 16
      },
      "purpose_en": "Capex: landscaping",
      "scope_en": "Per m² of basin footprint",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS04.structure_price",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Inlet or outlet structure",
      "name_ar": "منشأ دخول أو خروج",
      "kind": "unit_price",
      "unit": "EUR/structure",
      "value": {
        "low": 3000,
        "base": 6000,
        "high": 12000
      },
      "purpose_en": "Capex: hydraulic structures",
      "scope_en": "Per inlet or outlet",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS04.design_lump",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Design and permitting",
      "name_ar": "التصميم والتراخيص",
      "kind": "lump_sum",
      "unit": "EUR (lump sum)",
      "value": {
        "low": 3000,
        "base": 6000,
        "high": 12000
      },
      "purpose_en": "Capex: fixed items",
      "scope_en": "Independent of area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS04.maintenance_annual",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Annual maintenance and inspection",
      "name_ar": "الصيانة والفحص السنوي",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 0.8,
        "base": 1.8,
        "high": 4
      },
      "purpose_en": "Annual: sediment removal, vegetation, inspection",
      "scope_en": "Per m² of basin footprint",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS04.shape_factor",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Usable storage fraction of gross volume",
      "name_ar": "نسبة التخزين المفيد من الحجم الإجمالي",
      "kind": "design_factor",
      "unit": "dimensionless",
      "value": {
        "low": 0.7,
        "base": 0.8,
        "high": 0.9
      },
      "purpose_en": "Storage capacity: side slopes and freeboard reduce the prism volume",
      "scope_en": "Fraction of footprint × depth",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": null,
      "price_year": null
    },
    {
      "id": "NBS04.runoff_coeff",
      "solution_id": "NBS04",
      "intervention_type": "rainwater_retention_basin",
      "name_en": "Runoff coefficient of the catchment",
      "name_ar": "معامل الجريان السطحي للحوض المائي",
      "kind": "design_factor",
      "unit": "dimensionless",
      "value": {
        "low": 0.6,
        "base": 0.75,
        "high": 0.9
      },
      "purpose_en": "Design-storm runoff volume: fraction of rain that becomes runoff",
      "scope_en": "Volume method for a single storm; ignores timing and infiltration",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "footprint_m2",
        "min": 100,
        "max": 5000
      },
      "currency": null,
      "price_year": null
    },
    {
      "id": "NBS05.tree_price",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Street tree incl. pit and protection",
      "name_ar": "شجرة شارع مع الحفرة والحماية",
      "kind": "unit_price",
      "unit": "EUR/tree",
      "value": {
        "low": 150,
        "base": 300,
        "high": 600
      },
      "purpose_en": "Capex: trees",
      "scope_en": "Per tree installed",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.understory_price",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Understory planting",
      "name_ar": "زراعة الطبقة السفلية",
      "kind": "unit_price",
      "unit": "EUR/m²",
      "value": {
        "low": 8,
        "base": 16,
        "high": 30
      },
      "purpose_en": "Capex: shrubs and groundcover",
      "scope_en": "Per m² of corridor area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.irrigation_line",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Irrigation line",
      "name_ar": "خط الري",
      "kind": "unit_price",
      "unit": "EUR/m",
      "value": {
        "low": 8,
        "base": 18,
        "high": 35
      },
      "purpose_en": "Capex: irrigation",
      "scope_en": "Per metre of corridor length",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.survey_lump",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Utilities survey and clearance",
      "name_ar": "مسح المرافق والتصاريح",
      "kind": "lump_sum",
      "unit": "EUR (lump sum)",
      "value": {
        "low": 1500,
        "base": 3000,
        "high": 6000
      },
      "purpose_en": "Capex: utilities check",
      "scope_en": "Independent of length",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.design_lump",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Design",
      "name_ar": "التصميم",
      "kind": "lump_sum",
      "unit": "EUR (lump sum)",
      "value": {
        "low": 2500,
        "base": 5000,
        "high": 10000
      },
      "purpose_en": "Capex: fixed items",
      "scope_en": "Independent of length",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.tree_maint",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Tree maintenance",
      "name_ar": "صيانة الأشجار",
      "kind": "annual_unit_cost",
      "unit": "EUR/tree/year",
      "value": {
        "low": 10,
        "base": 25,
        "high": 50
      },
      "purpose_en": "Annual: pruning, watering, replacement",
      "scope_en": "Per tree",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.understory_maint",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Understory maintenance",
      "name_ar": "صيانة الطبقة السفلية",
      "kind": "annual_unit_cost",
      "unit": "EUR/m²/year",
      "value": {
        "low": 1,
        "base": 2,
        "high": 4
      },
      "purpose_en": "Annual",
      "scope_en": "Per m² of corridor area",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": "EUR",
      "price_year": null
    },
    {
      "id": "NBS05.tree_water_lpd",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Tree water demand",
      "name_ar": "احتياج الأشجار للماء",
      "kind": "rate",
      "unit": "L/tree/day",
      "value": {
        "low": 20,
        "base": 40,
        "high": 80
      },
      "purpose_en": "Resource requirement",
      "scope_en": "On irrigated days",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": null,
      "price_year": null
    },
    {
      "id": "NBS05.understory_water_lpd",
      "solution_id": "NBS05",
      "intervention_type": "green_corridor",
      "name_en": "Understory water demand",
      "name_ar": "احتياج الطبقة السفلية للماء",
      "kind": "rate",
      "unit": "L/m²/day",
      "value": {
        "low": 1,
        "base": 2,
        "high": 4
      },
      "purpose_en": "Resource requirement",
      "scope_en": "On irrigated days",
      "source_class": "demo_assumption",
      "source_ref": null,
      "partner_validated": null,
      "valid_range": {
        "input": "length_m",
        "min": 50,
        "max": 2000
      },
      "currency": null,
      "price_year": null
    }
  ],
  "solutions": {
    "NBS01": {
      "inputs": [
        {
          "id": "area_m2",
          "primary": true,
          "required": true,
          "unit": "m²",
          "min": 1,
          "max": 100000,
          "step": 50,
          "default": 2000,
          "label_en": "Planted area",
          "label_ar": "مساحة الزراعة",
          "meaning_en": "Ground area that will be planted, measured in plan view in square metres.",
          "meaning_ar": "مساحة الأرض التي ستُزرع، مقيسة في المسقط الأفقي بالمتر المربع."
        },
        {
          "id": "density_per_m2",
          "primary": false,
          "unit": "plants/m²",
          "min": 0.5,
          "max": 10,
          "step": 0.5,
          "default": 3,
          "label_en": "Planting density",
          "label_ar": "كثافة الزراعة",
          "meaning_en": "Number of plants per square metre. Dense multi-layer planting uses higher values.",
          "meaning_ar": "عدد النباتات في كل متر مربع. الزراعة الكثيفة متعددة الطبقات تستخدم قيمًا أعلى."
        },
        {
          "id": "water_days",
          "primary": false,
          "unit": "days/year",
          "min": 1,
          "max": 365,
          "step": 10,
          "default": 120,
          "label_en": "Irrigation days per year",
          "label_ar": "أيام الري في السنة",
          "meaning_en": "Number of days per year on which the planting is watered during establishment.",
          "meaning_ar": "عدد أيام الري في السنة خلال فترة التأسيس."
        }
      ],
      "components": [
        {
          "id": "sapling",
          "quantity": "plants",
          "qty_unit": "plants",
          "capex": "NBS01.sapling_price",
          "label_en": "Plants",
          "label_ar": "النباتات"
        },
        {
          "id": "soil",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS01.soil_prep",
          "label_en": "Soil preparation",
          "label_ar": "تجهيز التربة"
        },
        {
          "id": "planting",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS01.planting_labour",
          "label_en": "Planting",
          "label_ar": "الزراعة"
        },
        {
          "id": "irrigation",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS01.irrigation_setup",
          "label_en": "Irrigation",
          "label_ar": "الري"
        },
        {
          "id": "design",
          "quantity": "lump",
          "qty_unit": "lump sum",
          "capex": "NBS01.design_lump",
          "label_en": "Design and set-up",
          "label_ar": "التصميم والتجهيز"
        },
        {
          "id": "maintenance",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "annual": "NBS01.maintenance_annual",
          "label_en": "Maintenance",
          "label_ar": "الصيانة"
        }
      ]
    },
    "NBS02": {
      "inputs": [
        {
          "id": "area_m2",
          "primary": true,
          "required": true,
          "unit": "m²",
          "min": 1,
          "max": 100000,
          "step": 50,
          "default": 500,
          "label_en": "Roof area to green",
          "label_ar": "مساحة السطح المراد تخضيره",
          "meaning_en": "Total roof area that will receive the green roof, in plan view. Published cost cases use total roof area.",
          "meaning_ar": "مساحة السطح الكلية التي ستُخضَّر، في المسقط الأفقي. تعتمد حالات الكلفة المنشورة على مساحة السطح الكلية."
        },
        {
          "id": "storm_depth_mm",
          "primary": true,
          "required": true,
          "unit": "mm",
          "min": 1,
          "max": 300,
          "step": 5,
          "default": 25,
          "label_en": "Design rainfall event depth",
          "label_ar": "عمق حدث المطر التصميمي",
          "meaning_en": "Rain depth of one single storm event used for the retained-volume scenario. Replace the default with a depth that is relevant to your site.",
          "meaning_ar": "عمق المطر في عاصفة واحدة يُستخدم لسيناريو حجم المياه المحتجزة. استبدل القيمة الافتراضية بعمق مناسب لموقعك."
        },
        {
          "id": "substrate_depth_m",
          "primary": false,
          "unit": "m",
          "min": 0.04,
          "max": 0.3,
          "step": 0.01,
          "default": 0.08,
          "label_en": "Substrate depth",
          "label_ar": "سماكة وسط النمو",
          "meaning_en": "Thickness of the growing substrate. Extensive roofs are usually thin. It sets the substrate volume to buy.",
          "meaning_ar": "سماكة وسط النمو. الأسطح الممتدة رقيقة عادةً. تحدد حجم وسط النمو المطلوب."
        },
        {
          "id": "include_waterproofing",
          "primary": false,
          "type": "boolean",
          "default": true,
          "label_en": "Include new root-resistant waterproofing",
          "label_ar": "تضمين عزل مائي جديد مقاوم للجذور",
          "meaning_en": "Tick if the roof needs new waterproofing. The Hamburg reference cost does not include it.",
          "meaning_ar": "فعّلها إذا كان السطح يحتاج عزلًا مائيًا جديدًا. كلفة هامبورغ المرجعية لا تشمله."
        }
      ],
      "components": [
        {
          "id": "substrate",
          "quantity": "substrate_m3",
          "qty_unit": "m³",
          "capex": "NBS02.substrate_price",
          "label_en": "Growing substrate",
          "label_ar": "وسط النمو"
        },
        {
          "id": "drainage",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS02.drainage_layer",
          "label_en": "Drainage and protection layers",
          "label_ar": "طبقات التصريف والحماية"
        },
        {
          "id": "vegetation",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS02.vegetation",
          "label_en": "Vegetation",
          "label_ar": "الغطاء النباتي"
        },
        {
          "id": "labour",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS02.install_labour",
          "label_en": "Installation labour",
          "label_ar": "عمالة التركيب"
        },
        {
          "id": "waterproofing",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS02.waterproofing",
          "optional_input": "include_waterproofing",
          "label_en": "Root-resistant waterproofing",
          "label_ar": "العزل المائي المقاوم للجذور"
        },
        {
          "id": "structural",
          "quantity": "lump",
          "qty_unit": "lump sum",
          "capex": "NBS02.structural_check_lump",
          "label_en": "Structural check and design",
          "label_ar": "الفحص الإنشائي والتصميم"
        },
        {
          "id": "maintenance",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "annual": "NBS02.maintenance_annual",
          "label_en": "Maintenance",
          "label_ar": "الصيانة"
        }
      ]
    },
    "NBS03": {
      "inputs": [
        {
          "id": "area_m2",
          "primary": true,
          "required": true,
          "unit": "m²",
          "min": 1,
          "max": 200000,
          "step": 100,
          "default": 5000,
          "label_en": "Park area",
          "label_ar": "مساحة المنتزه",
          "meaning_en": "Total area of the park in plan view. It is split into components below.",
          "meaning_ar": "المساحة الكلية للمنتزه في المسقط الأفقي. تُقسَّم إلى مكونات أدناه."
        },
        {
          "id": "share_trees",
          "primary": false,
          "unit": "%",
          "min": 0,
          "max": 100,
          "step": 5,
          "default": 40,
          "label_en": "Share: tree-planted area",
          "label_ar": "النسبة: مساحة الأشجار",
          "meaning_en": "Percentage of the park area planted with trees. All four shares must add up to 100%.",
          "meaning_ar": "نسبة مساحة المنتزه المزروعة بالأشجار. يجب أن يكون مجموع النسب الأربع 100%."
        },
        {
          "id": "share_meadow",
          "primary": false,
          "unit": "%",
          "min": 0,
          "max": 100,
          "step": 5,
          "default": 35,
          "label_en": "Share: meadow or lawn",
          "label_ar": "النسبة: المروج والأعشاب",
          "meaning_en": "Percentage of the park area covered by meadow or lawn.",
          "meaning_ar": "نسبة مساحة المنتزه المغطاة بالمروج أو الأعشاب."
        },
        {
          "id": "share_water",
          "primary": false,
          "unit": "%",
          "min": 0,
          "max": 100,
          "step": 5,
          "default": 10,
          "label_en": "Share: rain garden or water feature",
          "label_ar": "النسبة: حديقة مطرية أو عنصر مائي",
          "meaning_en": "Percentage of the park area used for rain gardens or water features.",
          "meaning_ar": "نسبة مساحة المنتزه المخصصة لحدائق مطرية أو عناصر مائية."
        },
        {
          "id": "share_hard",
          "primary": false,
          "unit": "%",
          "min": 0,
          "max": 100,
          "step": 5,
          "default": 15,
          "label_en": "Share: paths and hard surfaces",
          "label_ar": "النسبة: الممرات والأسطح الصلبة",
          "meaning_en": "Percentage of the park area that is paved.",
          "meaning_ar": "نسبة مساحة المنتزه المرصوفة."
        },
        {
          "id": "water_days",
          "primary": false,
          "unit": "days/year",
          "min": 1,
          "max": 365,
          "step": 10,
          "default": 120,
          "label_en": "Irrigation days per year",
          "label_ar": "أيام الري في السنة",
          "meaning_en": "Number of days per year on which trees and meadow are irrigated.",
          "meaning_ar": "عدد أيام الري في السنة للأشجار والمروج."
        }
      ],
      "components": [
        {
          "id": "trees",
          "quantity": "area_trees",
          "qty_unit": "m²",
          "capex": "NBS03.tree_area_build",
          "annual": "NBS03.tree_maint",
          "label_en": "Trees",
          "label_ar": "الأشجار"
        },
        {
          "id": "meadow",
          "quantity": "area_meadow",
          "qty_unit": "m²",
          "capex": "NBS03.meadow_build",
          "annual": "NBS03.meadow_maint",
          "label_en": "Meadow or lawn",
          "label_ar": "المروج والأعشاب"
        },
        {
          "id": "water",
          "quantity": "area_water",
          "qty_unit": "m²",
          "capex": "NBS03.water_build",
          "annual": "NBS03.water_maint",
          "label_en": "Rain garden or water feature",
          "label_ar": "حديقة مطرية أو عنصر مائي"
        },
        {
          "id": "hard",
          "quantity": "area_hard",
          "qty_unit": "m²",
          "capex": "NBS03.hard_build",
          "annual": "NBS03.hard_maint",
          "label_en": "Paths and hard surfaces",
          "label_ar": "الممرات والأسطح الصلبة"
        },
        {
          "id": "irrigation",
          "quantity": "area_irrigated",
          "qty_unit": "m²",
          "capex": "NBS03.irrigation_system",
          "label_en": "Irrigation",
          "label_ar": "الري"
        },
        {
          "id": "design",
          "quantity": "lump",
          "qty_unit": "lump sum",
          "capex": "NBS03.design_lump",
          "label_en": "Design and set-up",
          "label_ar": "التصميم والتجهيز"
        }
      ]
    },
    "NBS04": {
      "inputs": [
        {
          "id": "footprint_m2",
          "primary": true,
          "required": true,
          "unit": "m²",
          "min": 1,
          "max": 100000,
          "step": 50,
          "default": 500,
          "label_en": "Basin footprint",
          "label_ar": "مساحة قاعدة الحوض",
          "meaning_en": "Plan-view area occupied by the basin.",
          "meaning_ar": "المساحة التي يشغلها الحوض في المسقط الأفقي."
        },
        {
          "id": "catchment_m2",
          "primary": true,
          "required": false,
          "unit": "m²",
          "min": 1,
          "max": 10000000,
          "step": 100,
          "default": null,
          "label_en": "Catchment area draining to the basin",
          "label_ar": "مساحة الحوض المائي المصرِّفة إلى الحوض",
          "meaning_en": "Area of roofs, roads and ground that drains into the basin. Without it, the runoff volume cannot be calculated.",
          "meaning_ar": "مساحة الأسطح والطرق والأرض التي تصرّف إلى الحوض. بدونها لا يمكن حساب حجم الجريان."
        },
        {
          "id": "storm_depth_mm",
          "primary": true,
          "required": false,
          "unit": "mm",
          "min": 1,
          "max": 300,
          "step": 5,
          "default": 25,
          "label_en": "Design rainfall event depth",
          "label_ar": "عمق حدث المطر التصميمي",
          "meaning_en": "Rain depth of one single storm event. Replace the default with a depth that is relevant to your site.",
          "meaning_ar": "عمق المطر في عاصفة واحدة. استبدل القيمة الافتراضية بعمق مناسب لموقعك."
        },
        {
          "id": "storage_depth_m",
          "primary": false,
          "unit": "m",
          "min": 0.2,
          "max": 5,
          "step": 0.1,
          "default": 1,
          "label_en": "Average storage depth",
          "label_ar": "متوسط عمق التخزين",
          "meaning_en": "Average depth of water that the basin can hold below the outlet level.",
          "meaning_ar": "متوسط عمق الماء الذي يستطيع الحوض حجزه تحت مستوى المخرج."
        },
        {
          "id": "structures",
          "primary": false,
          "unit": "count",
          "min": 0,
          "max": 20,
          "step": 1,
          "default": 2,
          "label_en": "Number of inlets and outlets",
          "label_ar": "عدد المداخل والمخارج",
          "meaning_en": "Count of inlet and outlet structures that need to be built.",
          "meaning_ar": "عدد منشآت الدخول والخروج المطلوب إنشاؤها."
        }
      ],
      "components": [
        {
          "id": "excavation",
          "quantity": "excavation_m3",
          "qty_unit": "m³",
          "capex": "NBS04.excavation_price",
          "label_en": "Excavation and haulage",
          "label_ar": "الحفر والنقل"
        },
        {
          "id": "liner",
          "quantity": "footprint_m2",
          "qty_unit": "m²",
          "capex": "NBS04.liner_price",
          "label_en": "Liner or geotextile",
          "label_ar": "البطانة أو الجيوتكستايل"
        },
        {
          "id": "planting",
          "quantity": "footprint_m2",
          "qty_unit": "m²",
          "capex": "NBS04.planting_price",
          "label_en": "Planting",
          "label_ar": "الزراعة"
        },
        {
          "id": "structures",
          "quantity": "structures",
          "qty_unit": "structures",
          "capex": "NBS04.structure_price",
          "label_en": "Inlet and outlet structures",
          "label_ar": "منشآت الدخول والخروج"
        },
        {
          "id": "design",
          "quantity": "lump",
          "qty_unit": "lump sum",
          "capex": "NBS04.design_lump",
          "label_en": "Design and set-up",
          "label_ar": "التصميم والتجهيز"
        },
        {
          "id": "maintenance",
          "quantity": "footprint_m2",
          "qty_unit": "m²",
          "annual": "NBS04.maintenance_annual",
          "label_en": "Maintenance",
          "label_ar": "الصيانة"
        }
      ]
    },
    "NBS05": {
      "inputs": [
        {
          "id": "length_m",
          "primary": true,
          "required": true,
          "unit": "m",
          "min": 1,
          "max": 20000,
          "step": 10,
          "default": 300,
          "label_en": "Corridor length",
          "label_ar": "طول الممر",
          "meaning_en": "Length of the corridor along its axis, in metres.",
          "meaning_ar": "طول الممر على امتداد محوره بالمتر."
        },
        {
          "id": "width_m",
          "primary": true,
          "required": true,
          "unit": "m",
          "min": 0.5,
          "max": 100,
          "step": 0.5,
          "default": 3,
          "label_en": "Planted width",
          "label_ar": "عرض الزراعة",
          "meaning_en": "Average planted width of the corridor, in metres. Area = length × width.",
          "meaning_ar": "متوسط عرض الجزء المزروع من الممر بالمتر. المساحة = الطول × العرض."
        },
        {
          "id": "tree_spacing_m",
          "primary": false,
          "unit": "m",
          "min": 3,
          "max": 30,
          "step": 1,
          "default": 8,
          "label_en": "Tree spacing",
          "label_ar": "المسافة بين الأشجار",
          "meaning_en": "Distance between trees along one row.",
          "meaning_ar": "المسافة بين الأشجار على امتداد صف واحد."
        },
        {
          "id": "tree_rows",
          "primary": false,
          "unit": "rows",
          "min": 1,
          "max": 2,
          "step": 1,
          "default": 1,
          "label_en": "Tree rows",
          "label_ar": "عدد صفوف الأشجار",
          "meaning_en": "Number of tree rows along the corridor.",
          "meaning_ar": "عدد صفوف الأشجار على امتداد الممر."
        },
        {
          "id": "water_days",
          "primary": false,
          "unit": "days/year",
          "min": 1,
          "max": 365,
          "step": 10,
          "default": 120,
          "label_en": "Irrigation days per year",
          "label_ar": "أيام الري في السنة",
          "meaning_en": "Number of days per year on which the corridor is irrigated.",
          "meaning_ar": "عدد أيام الري في السنة للممر."
        }
      ],
      "components": [
        {
          "id": "trees",
          "quantity": "trees",
          "qty_unit": "trees",
          "capex": "NBS05.tree_price",
          "annual": "NBS05.tree_maint",
          "label_en": "Trees",
          "label_ar": "الأشجار"
        },
        {
          "id": "understory",
          "quantity": "area_m2",
          "qty_unit": "m²",
          "capex": "NBS05.understory_price",
          "annual": "NBS05.understory_maint",
          "label_en": "Understory planting",
          "label_ar": "زراعة الطبقة السفلية"
        },
        {
          "id": "irrigation",
          "quantity": "length_m",
          "qty_unit": "m",
          "capex": "NBS05.irrigation_line",
          "label_en": "Irrigation",
          "label_ar": "الري"
        },
        {
          "id": "survey",
          "quantity": "lump",
          "qty_unit": "lump sum",
          "capex": "NBS05.survey_lump",
          "label_en": "Utilities survey",
          "label_ar": "مسح المرافق"
        },
        {
          "id": "design",
          "quantity": "lump",
          "qty_unit": "lump sum",
          "capex": "NBS05.design_lump",
          "label_en": "Design and set-up",
          "label_ar": "التصميم والتجهيز"
        }
      ]
    }
  }
};
