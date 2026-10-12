/*
 * NBS4MED demo: "Explore impact and cost" step, results blocks and report.
 * Presentation only. All numbers come from NBS4MED_ENGINE (js/engine.js), which reads
 * data/evidence.json and data/demo_parameters.json (via the .js wrappers so that the
 * page also works from file://).
 */
(function () {
  'use strict';
  var E = window.NBS4MED_ENGINE;
  function C() { return window.NBS4MED_CORE; }
  function L() { return C().lang(); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return C().esc(s); }

  var NBS_OF = { tiny: 'NBS01', roof: 'NBS02', eco: 'NBS03', wet: 'NBS04', street: 'NBS05' };
  var SOL_ORDER = ['NBS01', 'NBS02', 'NBS03', 'NBS04', 'NBS05'];

  /* ---------- strings ---------- */
  var X = {
    exploreH: { en: 'Explore impact and cost', ar: 'استكشف الأثر والتكلفة' },
    ctaP: { en: 'Optional. Choose one of five solution types and see illustrative quantities, impact evidence and costs. This step does not change your assessment result.', ar: 'اختياري. اختر أحد خمسة أنواع من الحلول لترى كميات وأدلة أثر وتكاليف توضيحية. لا تغيّر هذه الخطوة نتيجة تقييمك.' },
    ctaB: { en: 'Explore impact and cost', ar: 'استكشف الأثر والتكلفة' },
    why: { en: 'Why suggested', ar: 'سبب الترشيح' },
    whyNote: { en: 'Rule-based match to your selected risks and site context. It is not an impact estimate.', ar: 'مطابقة قائمة على قواعد مع المخاطر التي اخترتها وسياق موقعك. وهي ليست تقديرًا للأثر.' },
    match: { en: 'matches', ar: 'يطابق' },
    w3: { en: 'strongly', ar: 'بقوة' }, w2: { en: 'moderately', ar: 'بدرجة متوسطة' }, w1: { en: 'weakly', ar: 'بدرجة ضعيفة' }, w0: { en: 'not a target risk of this option', ar: 'ليس خطرًا مستهدفًا لهذا الخيار' },
    landFit: { en: 'Land need exceeds available public land: ranking is reduced.', ar: 'حاجة الأرض تفوق الأراضي العامة المتاحة: يُخفَّض الترتيب.' },
    landOk: { en: 'Land need fits the available public land.', ar: 'حاجة الأرض تناسب الأراضي العامة المتاحة.' },
    noEvidence: { en: 'No evidence record for this option in the demo database.', ar: 'لا يوجد سجل أدلة لهذا الخيار في قاعدة بيانات التجربة.' },
    canExplore: { en: 'Can be explored in the next step.', ar: 'يمكن استكشافه في الخطوة التالية.' },
    demoLabel: { en: 'Demo version: illustrative estimates, to be reviewed when project data become available', ar: 'نسخة تجريبية: تقديرات توضيحية ستُراجع عند توفر بيانات المشروع' },
    back: { en: 'Back to results', ar: 'العودة إلى النتائج' },
    intro: { en: 'Optional step. Pick a solution, enter the essentials, and see what can be calculated, what is only reference evidence, and what is still unknown.', ar: 'خطوة اختيارية. اختر حلًا وأدخل المعلومات الأساسية لترى ما يمكن حسابه وما هو دليل مرجعي فقط وما لا يزال مجهولًا.' },
    s1: { en: '1. Choose a solution', ar: '1. اختر حلًا' },
    s2: { en: '2. Describe the intervention', ar: '2. صِف التدخل' },
    s3: { en: '3. Illustrative results', ar: '3. نتائج توضيحية' },
    candidate: { en: 'Suggested by your assessment', ar: 'مقترح من تقييمك' },
    basic: { en: 'Essential information', ar: 'المعلومات الأساسية' },
    adv: { en: 'Advanced inputs (optional)', ar: 'مدخلات متقدمة (اختيارية)' },
    advIntro: { en: 'Defaults are demo assumptions. Change them only when you have better information.', ar: 'القيم الافتراضية افتراضات تجريبية. غيّرها فقط عند توفر معلومات أفضل.' },
    prices: { en: 'Unit prices (optional)', ar: 'أسعار الوحدة (اختياري)' },
    pricesIntro: { en: 'Leave blank to use the demo scenario prices. A value you enter replaces the low, base and high prices of that item.', ar: 'اتركها فارغة لاستخدام أسعار سيناريوهات التجربة. القيمة التي تدخلها تحل محل الأسعار الدنيا والأساسية والعليا لذلك البند.' },
    pricePh: { en: 'Demo base', ar: 'أساسي تجريبي' },
    tagDefault: { en: 'Demo default', ar: 'قيمة تجريبية' },
    tagUser: { en: 'Your value', ar: 'قيمتك' },
    required: { en: 'required', ar: 'مطلوب' },
    optional: { en: 'optional', ar: 'اختياري' },
    e_missing: { en: 'This value is required. Missing values are never treated as zero.', ar: 'هذه القيمة مطلوبة. لا تُعامل القيم الناقصة على أنها صفر.' },
    e_invalid: { en: 'Enter a number.', ar: 'أدخل رقمًا.' },
    e_zero: { en: 'Must be greater than 0.', ar: 'يجب أن تكون أكبر من 0.' },
    e_negative: { en: 'Must not be negative.', ar: 'يجب ألا تكون سالبة.' },
    e_range: { en: function (a, b) { return 'Enter a value between ' + a + ' and ' + b + '.'; }, ar: function (a, b) { return 'أدخل قيمة بين ' + a + ' و' + b + '.'; } },
    e_shares: { en: function (s) { return 'The four shares must add up to 100% (now ' + s + '%).'; }, ar: function (s) { return 'يجب أن يكون مجموع النسب الأربع 100% (الآن ' + s + '%).'; } },
    invalidBox: { en: 'Results are not shown until the inputs are valid.', ar: 'لا تُعرض النتائج قبل أن تصبح المدخلات صالحة.' },
    w_outside: { en: function (inp, a, b) { return 'Outside the range for which the demo assumptions were set (' + a + ' to ' + b + '). The calculation runs, but treat it with extra care.'; }, ar: function (inp, a, b) { return 'خارج المدى الذي وُضعت له افتراضات التجربة (' + a + ' إلى ' + b + '). يعمل الحساب لكن تعامل معه بحذر إضافي.'; } },
    w_default: { en: 'The design rainfall depth is a demo default. Replace it with a depth relevant to your site.', ar: 'عمق المطر التصميمي قيمة تجريبية افتراضية. استبدله بعمق مناسب لموقعك.' },
    w_notrees: { en: 'The corridor is shorter than the tree spacing, so no trees are counted.', ar: 'الممر أقصر من المسافة بين الأشجار، لذلك لا تُحتسب أشجار.' },
    calcH: { en: 'What can be calculated', ar: 'ما يمكن حسابه' },
    calcP: { en: 'Results change with your inputs. Each line states its basis and formula.', ar: 'تتغير النتائج مع مدخلاتك. يوضح كل سطر أساسه ومعادلته.' },
    colInd: { en: 'Indicator', ar: 'المؤشر' }, colRes: { en: 'Result', ar: 'النتيجة' }, colUnit: { en: 'Unit', ar: 'الوحدة' }, colBasis: { en: 'Basis', ar: 'الأساس' },
    low: { en: 'low', ar: 'أدنى' }, base: { en: 'base', ar: 'أساسي' }, high: { en: 'high', ar: 'أعلى' },
    scenario: { en: 'Illustrative scenario range', ar: 'نطاق سيناريوهات توضيحي' },
    scenarioNote: { en: 'Low and high are alternative demo assumptions. This is not a statistical confidence interval.', ar: 'القيمتان الدنيا والعليا افتراضان بديلان للتجربة. هذا ليس فترة ثقة إحصائية.' },
    unavailable: { en: 'Unavailable', ar: 'غير متاح' },
    r_small_event: { en: 'The source reports typical retention above 80% for events below 10 mm, as a typical value and not as a guaranteed bound. No number is calculated.', ar: 'يذكر المصدر احتجازًا معتادًا يزيد على 80% للأحداث الأقل من 10 مم، كقيمة معتادة لا كحد مضمون. لا يُحسب رقم.' },
    r_no_catchment: { en: 'Enter the catchment area to calculate this.', ar: 'أدخل مساحة الحوض المائي لحساب هذا.' },
    basis_published_reference: { en: 'Published reference', ar: 'مرجع منشور' },
    basis_demo_assumption: { en: 'Demo assumption', ar: 'افتراض تجريبي' },
    basis_user_entered: { en: 'Your input', ar: 'مدخلك' },
    basis_arithmetic: { en: 'Arithmetic on your inputs', ar: 'حساب حسابي على مدخلاتك' },
    basis_partner_validated: { en: 'Partner validated', ar: 'تحقق منه الشركاء' },
    g_quantity: { en: 'Design quantity', ar: 'كمية تصميمية' }, g_resource: { en: 'Resource requirement', ar: 'احتياج من الموارد' }, g_context: { en: 'Context', ar: 'سياق' },
    g_event_retention: { en: 'Single-event retention', ar: 'احتجاز حدث واحد' }, g_storage_capacity: { en: 'Storage capacity', ar: 'سعة التخزين' },
    g_event_volume: { en: 'Single-event volume', ar: 'حجم حدث واحد' }, g_volume_balance: { en: 'Volume balance, one storm', ar: 'ميزان الحجم لعاصفة واحدة' },
    o_plants: { en: 'Number of plants', ar: 'عدد النباتات' }, o_establishment_water: { en: 'Irrigation water during establishment', ar: 'مياه الري خلال التأسيس' },
    o_rain_volume: { en: 'Rain falling on the roof in this event', ar: 'المطر الساقط على السطح في هذا الحدث' },
    o_event_retained: { en: 'Rainwater retained in this single event (scenario)', ar: 'مياه الأمطار المحتجزة في هذا الحدث الواحد (سيناريو)' },
    o_substrate_volume: { en: 'Substrate volume to buy', ar: 'حجم وسط النمو المطلوب' },
    o_area_trees: { en: 'Tree-planted area', ar: 'مساحة الأشجار' }, o_area_meadow: { en: 'Meadow or lawn area', ar: 'مساحة المروج' },
    o_area_water: { en: 'Rain garden or water-feature area', ar: 'مساحة الحديقة المطرية أو العنصر المائي' }, o_area_hard: { en: 'Paths and hard-surface area', ar: 'مساحة الممرات والأسطح الصلبة' },
    o_irrigation_water: { en: 'Irrigation water', ar: 'مياه الري' },
    o_storage_capacity: { en: 'Storage capacity of the basin', ar: 'سعة تخزين الحوض' },
    o_runoff_volume: { en: 'Runoff volume of this design storm', ar: 'حجم جريان العاصفة التصميمية' },
    o_storage_vs_runoff: { en: 'Storage compared with the runoff volume of this storm', ar: 'التخزين مقارنةً بحجم جريان هذه العاصفة' },
    o_corridor_area: { en: 'Corridor area', ar: 'مساحة الممر' }, o_trees: { en: 'Number of trees', ar: 'عدد الأشجار' },
    refH: { en: 'Reference evidence, not a forecast', ar: 'أدلة مرجعية، وليست توقعًا' },
    refP: { en: 'Published examples from other places. They are shown to give context. They are not predictions for your site and are never added together.', ar: 'أمثلة منشورة من أماكن أخرى. تُعرض لتوفير السياق. وهي ليست تنبؤات لموقعك ولا تُجمع معًا.' },
    cat_air_temperature: { en: 'Air temperature', ar: 'حرارة الهواء' },
    cat_thermal_comfort: { en: 'Thermal comfort (mean radiant temperature)', ar: 'الراحة الحرارية (متوسط درجة الحرارة الإشعاعية)' },
    cat_event_retention: { en: 'Retention in single rainfall events', ar: 'الاحتجاز في أحداث مطرية منفردة' },
    cat_capex_reference: { en: 'Construction cost examples', ar: 'أمثلة على كلفة الإنشاء' },
    cat_maintenance_observed: { en: 'Observed maintenance cost', ar: 'كلفة الصيانة المرصودة' },
    cat_qualitative: { en: 'Qualitative evidence only', ar: 'أدلة نوعية فقط' },
    st_qualitative: { en: 'Qualitative statement', ar: 'بيان نوعي' }, st_author_typical_band: { en: "Author's descriptive band (not observed min and max)", ar: 'نطاق وصفي للمؤلف (ليس أدنى وأعلى مرصودين)' },
    st_single_case: { en: 'Single case', ar: 'حالة فردية' }, st_secondary_reported_range: { en: 'Range reported in a secondary source', ar: 'نطاق مذكور في مصدر ثانوي' },
    st_approximate_case_cost: { en: 'Approximate cost of one case', ar: 'كلفة تقريبية لحالة واحدة' }, st_range_of_configuration_means: { en: 'Range of configuration means', ar: 'نطاق متوسطات التكوينات' },
    st_qualitative_threshold: { en: 'Qualitative threshold', ar: 'عتبة نوعية' }, st_observed_maximum: { en: 'Observed maximum (not a mean)', ar: 'قيمة قصوى مرصودة (ليست متوسطًا)' },
    st_reported_range: { en: 'Published range', ar: 'نطاق منشور' },
    colMetric: { en: 'Metric', ar: 'المقياس' }, colValue: { en: 'Value', ar: 'القيمة' }, colStat: { en: 'Statistic', ar: 'نوع الإحصاء' }, colWhere: { en: 'Place and year', ar: 'المكان والسنة' },
    colStudy: { en: 'Study', ar: 'الدراسة' }, colLimits: { en: 'Limits', ar: 'الحدود' }, colSource: { en: 'Source', ar: 'المصدر' },
    indep: { en: function (n, r) { return n + ' independent ' + (n === 1 ? 'study' : 'studies') + ' behind ' + r + ' ' + (r === 1 ? 'record' : 'records') + '.'; }, ar: function (n, r) { return n + ' دراسة مستقلة وراء ' + r + ' سجل.'; } },
    sameStudy: { en: 'Same study as', ar: 'الدراسة نفسها مثل' },
    notForecast: { en: 'Not usable as a local forecast (usable_for_local_forecast = false).', ar: 'لا يصلح كتوقع محلي (usable_for_local_forecast = false).' },
    surfaceNone: { en: 'Surface temperature: no record has been collected for this solution.', ar: 'حرارة السطح: لم يُجمع أي سجل لهذا الحل.' },
    refCostH: { en: 'Reference-case cost scaling (Hamburg, extensive roofs)', ar: 'تحجيم كلفة حالات مرجعية (هامبورغ، أسطح ممتدة)' },
    refCostP: { en: function (n) { return 'Cost per m² of total roof area in ' + n + ' extensive roofs of one study, multiplied by your area. This is a source example, not a local cost and not a forecast.'; }, ar: function (n) { return 'كلفة المتر المربع من مساحة السطح الكلية في ' + n + ' أسطح ممتدة من دراسة واحدة، مضروبة في مساحتك. هذا مثال من مصدر، وليس كلفة محلية ولا توقعًا.'; } },
    refCostOut: { en: function (a, b) { return 'Your roof area is outside the area range of the reference cases (' + a + ' to ' + b + ' m²). No scaled figure is shown.'; }, ar: function (a, b) { return 'مساحة سطحك خارج مدى مساحات الحالات المرجعية (' + a + ' إلى ' + b + ' م²). لا يُعرض رقم محجَّم.'; } },
    refCases: { en: 'Observed cases', ar: 'الحالات المرصودة' },
    refMin: { en: 'lowest case', ar: 'أدنى حالة' }, refMed: { en: 'median of cases', ar: 'وسيط الحالات' }, refMax: { en: 'highest case', ar: 'أعلى حالة' },
    refBasis: { en: 'Currency EUR; prices of 2017 (May 2017 construction index); VAT included; creation and establishment care; root-resistant waterproofing excluded; area basis: total roof area.', ar: 'العملة يورو؛ أسعار 2017 (مؤشر البناء لشهر أيار 2017)؛ شاملة ضريبة القيمة المضافة؛ الإنشاء ورعاية التأسيس؛ لا تشمل العزل المائي المقاوم للجذور؛ أساس المساحة: مساحة السطح الكلية.' },
    typicalBand: { en: 'The author also gives a descriptive band of 40 to 45 EUR/m² for most roofs (printed p.14). It is not an observed minimum and maximum.', ar: 'يذكر المؤلف أيضًا نطاقًا وصفيًا من 40 إلى 45 يورو/م² لمعظم الأسطح (ص 14 المطبوعة). وهو ليس أدنى وأعلى قيمة مرصودتين.' },
    intensiveCase: { en: 'One intensive-roof case (58 EUR/m², 591 m²) is not mixed with the extensive cases.', ar: 'حالة واحدة لسطح مكثف (58 يورو/م²، 591 م²) لا تُخلط مع الأسطح الممتدة.' },
    ncH: { en: 'Not calculated, and why', ar: 'ما لا يُحسب، ولماذا' },
    nc_air_temperature: { en: 'Change in air temperature at your site', ar: 'تغير حرارة الهواء في موقعك' },
    nc_air_temperature_r: { en: 'No intervention-specific coefficient is available. A published contrast is a measured difference in one study, not a prediction.', ar: 'لا يتوفر معامل خاص بالتدخل. التباين المنشور فرق مقيس في دراسة واحدة، وليس تنبؤًا.' },
    nc_surface_temperature: { en: 'Change in surface temperature', ar: 'تغير حرارة السطح' },
    nc_surface_temperature_r: { en: 'No surface-temperature record has been collected.', ar: 'لم يُجمع أي سجل لحرارة السطح.' },
    nc_thermal_comfort: { en: 'Thermal comfort', ar: 'الراحة الحرارية' },
    nc_thermal_comfort_r: { en: 'Only one contrast from one garden exists, and it is not a model input.', ar: 'يوجد تباين واحد من حديقة واحدة، وهو ليس مدخلًا لنموذج.' },
    nc_stormwater: { en: 'Stormwater effect', ar: 'أثر مياه الأمطار' },
    nc_stormwater_r: { en: 'It depends on design, soil and rainfall, and no coefficient has been collected.', ar: 'يعتمد على التصميم والتربة والأمطار، ولم يُجمع معامل لذلك.' },
    nc_annual_retention: { en: 'Annual rainwater retention', ar: 'احتجاز مياه الأمطار السنوي' },
    nc_annual_retention_r: { en: 'Event retention is not annual retention. Annual values need a rainfall series and the moisture state of the roof.', ar: 'احتجاز الحدث ليس احتجازًا سنويًا. تحتاج القيم السنوية إلى سلسلة أمطار وحالة رطوبة السطح.' },
    nc_peak_reduction: { en: 'Reduction of peak discharge', ar: 'خفض ذروة التصريف' },
    nc_peak_reduction_r: { en: 'It needs outlet design and hydrologic modelling, which this demo does not include.', ar: 'يحتاج إلى تصميم المخارج ونمذجة هيدرولوجية لا تشملها هذه التجربة.' },
    nc_aggregate_impact: { en: 'Aggregate park impact', ar: 'الأثر الإجمالي للمنتزه' },
    nc_aggregate_impact_r: { en: 'No total coefficient exists for a multifunctional park (rule R04). Only component quantities and costs are shown.', ar: 'لا يوجد معامل إجمالي للمنتزه متعدد الوظائف (القاعدة R04). تُعرض كميات المكونات وتكاليفها فقط.' },
    nc_annual_capture: { en: 'Annual captured volume', ar: 'الحجم المحتجز سنويًا' },
    nc_annual_capture_r: { en: 'It needs catchment, storage, outlets and a rainfall series (rule R05).', ar: 'يحتاج إلى الحوض المائي والتخزين والمخارج وسلسلة أمطار (القاعدة R05).' },
    nc_flood_risk: { en: 'Flood-risk reduction', ar: 'خفض خطر الفيضان' },
    nc_flood_risk_r: { en: 'A volume balance for one storm is not a flood-risk reduction.', ar: 'ميزان الحجم لعاصفة واحدة ليس خفضًا لخطر الفيضان.' },
    costH: { en: 'Cost from quantities and unit prices', ar: 'التكلفة من الكميات وأسعار الوحدة' },
    costP: { en: 'Currency EUR. No price year: demo prices were not taken from a dated price list. Not a local cost.', ar: 'العملة يورو. بلا سنة أسعار: لم تؤخذ أسعار التجربة من قائمة أسعار مؤرخة. وليست كلفة محلية.' },
    capex: { en: 'Construction cost (one-off)', ar: 'كلفة الإنشاء (مرة واحدة)' }, annual: { en: 'Annual maintenance (per year)', ar: 'الصيانة السنوية (في السنة)' },
    colItem: { en: 'Item', ar: 'البند' }, colQty: { en: 'Quantity', ar: 'الكمية' }, colPrice: { en: 'Unit price (low / base / high)', ar: 'سعر الوحدة (أدنى / أساسي / أعلى)' },
    colSub: { en: 'Subtotal (low to high)', ar: 'المجموع الفرعي (من الأدنى إلى الأعلى)' },
    total: { en: 'Total', ar: 'المجموع' },
    notIncluded: { en: 'Not included (your choice)', ar: 'غير مشمول (باختيارك)' },
    includes: { en: 'Includes: the items listed above only.', ar: 'يشمل: البنود المذكورة أعلاه فقط.' },
    excludes: { en: 'Excludes land acquisition, VAT unless stated, utility relocation, contingency, financing and replacement beyond annual maintenance.', ar: 'لا يشمل شراء الأرض، وضريبة القيمة المضافة ما لم يُذكر، ونقل المرافق، والطوارئ، والتمويل، والاستبدال خارج الصيانة السنوية.' },
    lumpNote: { en: 'Lump-sum items do not change with area, and unit prices do not fall with scale. Real costs rarely grow in a straight line with area.', ar: 'البنود المقطوعة لا تتغير مع المساحة، ولا تنخفض أسعار الوحدة مع الحجم. نادرًا ما تنمو الكلفة الفعلية خطيًا مع المساحة.' },
    inH: { en: 'Inputs and assumptions', ar: 'المدخلات والافتراضات' },
    inputsT: { en: 'Your inputs', ar: 'مدخلاتك' },
    paramsT: { en: 'Assumptions used (parameters)', ar: 'الافتراضات المستخدمة (المعاملات)' },
    colParam: { en: 'Parameter', ar: 'المعامل' }, colClass: { en: 'Class', ar: 'الفئة' }, colValid: { en: 'Valid range', ar: 'مدى الصلاحية' }, colPV: { en: 'Partner validation', ar: 'تحقق الشركاء' },
    pvEmpty: { en: 'Not yet validated', ar: 'لم يُتحقق منه بعد' },
    srcH: { en: 'Evidence sources', ar: 'مصادر الأدلة' },
    needH: { en: 'Information needed to improve the estimate', ar: 'معلومات مطلوبة لتحسين التقدير' },
    needSite: { en: 'Site checks proposed for review', ar: 'فحوص موقع مقترحة للمراجعة' },
    needCost: { en: 'Cost information', ar: 'معلومات الكلفة' }, needImpact: { en: 'Impact information', ar: 'معلومات الأثر' },
    needCommon: { en: 'Validated definitions, source review and ranking rules from project partners; the NBS repository and the PROMEA decision-making framework.', ar: 'تعريفات معتمدة ومراجعة للمصادر وقواعد الترتيب من شركاء المشروع، ومستودع NBS وإطار اتخاذ القرار من PROMEA.' },
    rulesH: { en: 'Rules applied', ar: 'القواعد المطبقة' },
    printB: { en: 'Print / Save as PDF', ar: 'طباعة / حفظ بصيغة PDF' }, csvB: { en: 'Download CSV', ar: 'تحميل CSV' },
    notExplored: { en: 'The impact and cost step was not completed. Only the assessment is reported.', ar: 'لم تُستكمل خطوة الأثر والتكلفة. يُعرض التقييم فقط.' },
    repTitle: { en: 'NBS4MED self-evaluation report', ar: 'تقرير التقييم الذاتي NBS4MED' },
    repAssess: { en: 'Institutional assessment', ar: 'التقييم المؤسسي' },
    repCand: { en: 'Candidate solutions and reasons', ar: 'الحلول المرشحة وأسباب الترشيح' },
    repExplore: { en: 'Impact and cost exploration (illustrative)', ar: 'استكشاف الأثر والتكلفة (توضيحي)' },
    repSep: { en: 'The assessment result describes institutional readiness. It is separate from the suitability, impact and cost of a solution.', ar: 'نتيجة التقييم تصف الجاهزية المؤسسية. وهي منفصلة عن ملاءمة الحل وأثره وتكلفته.' },
    repDate: { en: 'Generated', ar: 'تاريخ الإعداد' },
    ctxT: { en: 'Site context (not scored)', ar: 'سياق الموقع (غير مُحتسب)' },
    sources: { en: 'Sources of the assessment: your answers.', ar: 'مصدر التقييم: إجاباتك.' },
    fb: { en: 'Feedback form is available in the on-screen version only.', ar: 'نموذج الملاحظات متاح في النسخة المعروضة على الشاشة فقط.' },
    solDesc_NBS01: { en: 'Dense planting of native trees and shrubs on a small plot.', ar: 'زراعة كثيفة لأشجار وشجيرات محلية على قطعة صغيرة.' },
    solDesc_NBS02: { en: 'Vegetated layer on a roof, with substrate and drainage.', ar: 'طبقة نباتية على السطح مع وسط نمو وتصريف.' },
    solDesc_NBS03: { en: 'A park that combines trees, meadow, water features and paths.', ar: 'منتزه يجمع الأشجار والمروج والعناصر المائية والممرات.' },
    solDesc_NBS04: { en: 'A basin that holds runoff from a catchment and releases it slowly.', ar: 'حوض يحجز الجريان من حوض مائي ويطلقه ببطء.' },
    solDesc_NBS05: { en: 'A strip of connected trees and planting along a street or path.', ar: 'شريط من الأشجار والنباتات المتصلة على امتداد شارع أو ممر.' },
    solName_NBS03_note: { en: 'Called "Smart eco-park" in the assessment recommendation list.', ar: 'يُسمى «منتزه بيئي ذكي» في قائمة توصيات التقييم.' },
    needC: { en: 'Local item prices, quantities and specification', ar: 'أسعار البنود المحلية والكميات والمواصفات' },
    needI_NBS01: { en: 'Canopy, geometry, weather, irrigation and a comparison site', ar: 'الظلة النباتية والهندسة والطقس والري وموقع مقارنة' },
    needI_NBS02: { en: 'Roof system, rainfall series and substrate moisture', ar: 'نظام السطح وسلسلة الأمطار ورطوبة وسط النمو' },
    needI_NBS03: { en: 'Canopy, geometry, weather, irrigation and a comparison site', ar: 'الظلة النباتية والهندسة والطقس والري وموقع مقارنة' },
    needI_NBS04: { en: 'Catchment, storage, outlets and rainfall series', ar: 'الحوض المائي والتخزين والمخارج وسلسلة الأمطار' },
    needI_NBS05: { en: 'Canopy, geometry, weather, irrigation and a comparison site', ar: 'الظلة النباتية والهندسة والطقس والري وموقع مقارنة' },
    site_NBS01: { en: 'Confirm species, water supply, rooting area and maintenance.', ar: 'تأكد من الأنواع ومصدر المياه ومنطقة الجذور والصيانة.' },
    site_NBS02: { en: 'Confirm structural capacity, waterproofing, drainage and vegetation.', ar: 'تأكد من القدرة الإنشائية والعزل والتصريف والنباتات.' },
    site_NBS03: { en: 'Define the park components before assigning impact or cost.', ar: 'حدد مكونات المنتزه قبل نسبة أثر أو كلفة.' },
    site_NBS04: { en: 'Confirm catchment, storage, outlets, water quality and maintenance.', ar: 'تأكد من الحوض المائي والتخزين والمخارج ونوعية المياه والصيانة.' },
    site_NBS05: { en: 'Confirm street space, utilities, species, irrigation and maintenance.', ar: 'تأكد من مساحة الشارع والمرافق والأنواع والري والصيانة.' },
    ruleR01: { en: 'R01: site information is insufficient, so site verification is required.', ar: 'R01: معلومات الموقع غير كافية، لذا يلزم التحقق من الموقع.' },
    ruleR02: { en: 'R02: structural capacity is unknown, so technical feasibility is not claimed.', ar: 'R02: القدرة الإنشائية مجهولة، لذا لا يُدّعى الجدوى الفنية.' },
    ruleR03: { en: 'R03: water supply is unknown. The water requirement is flagged and no drought suitability is stated.', ar: 'R03: مصدر المياه مجهول. يُشار إلى الاحتياج المائي ولا تُذكر ملاءمة للجفاف.' },
    ruleR04: { en: 'R04: park components are specified by you; no aggregate impact is calculated.', ar: 'R04: تحدد أنت مكونات المنتزه؛ ولا يُحسب أثر إجمالي.' },
    ruleR05: { en: 'R05: annual captured volume is not estimated without catchment, storage and rainfall data.', ar: 'R05: لا يُقدَّر الحجم المحتجز سنويًا دون بيانات الحوض المائي والتخزين والأمطار.' },
    ruleR06: { en: 'R06: source context or price year differ from your site, so published values are source examples only.', ar: 'R06: يختلف سياق المصدر أو سنة الأسعار عن موقعك، لذا القيم المنشورة أمثلة من المصادر فقط.' },
    ruleR08: { en: 'R08 and R09: different outcomes and statistics are never pooled; records of one study count as one study.', ar: 'R08 وR09: لا تُجمع النتائج والإحصاءات المختلفة، وتُعد سجلات الدراسة الواحدة دراسة واحدة.' },
    ruleR10: { en: 'R10: a missing value is reported as unavailable, never as zero.', ar: 'R10: القيمة الناقصة تُعرض «غير متاحة» ولا تُعد صفرًا.' },
    showFormula: { en: 'Formula', ar: 'المعادلة' },
    resultsFor: { en: 'Results for', ar: 'نتائج' },
    perYear: { en: 'per year', ar: 'في السنة' }
  };
  function x(k) { var v = X[k]; if (!v) return k; return v[L()]; }

  /* ---------- numbers ---------- */
  function fmtN(n) {
    if (n === null || n === undefined || !isFinite(n)) return '–';
    var a = Math.abs(n);
    var d = a >= 100 ? 0 : a >= 10 ? 1 : 2;
    return Number(n.toFixed(d)).toLocaleString('en-US', { maximumFractionDigits: d });
  }
  function fmtRange(o) {
    if (o.unavailable) return x('unavailable');
    if (o.exact || o.value !== undefined) return fmtN(o.value);
    var s = fmtN(o.low) + ' – ' + fmtN(o.high);
    if (o.base !== null && o.base !== undefined) s += ' (' + x('base') + ' ' + fmtN(o.base) + ')';
    return s;
  }
  function eur(n) { return Number(Math.round(n)).toLocaleString('en-US'); }
  function pname(p) { return L() === 'ar' ? p.name_ar : p.name_en; }
  function solName(id) { var s = E.solutions().filter(function (z) { return z.solution_id === id; })[0]; return L() === 'ar' ? s.name_ar : s.name_en; }
  function basisTag(b) { return '<span class="chip tag-' + b + '">' + x('basis_' + b) + '</span>'; }
  function en(text) { return '<span lang="en" dir="ltr">' + esc(text) + '</span>'; }

  /* ---------- state ---------- */
  var ex = { sol: null, by: {}, openAdv: false, res: null };
  function cur() {
    var s = ex.sol; if (!s) return null;
    if (!ex.by[s]) ex.by[s] = { vals: E.defaults(s), touched: {}, prices: {} };
    return ex.by[s];
  }

  /* ---------- results-page pieces used by app.js ---------- */
  function candidates() {
    var c = C(), rk = c.ranked().slice(0, 3);
    return rk.map(function (x1, i) {
      var o = x1.o, rs = c.riskList(), parts = rs.map(function (r) {
        return c.nm(r) + ' (' + x('w' + o.w[r.k]) + ')';
      });
      var landAvail = c.st.ctx.land === 'low' ? 0 : c.st.ctx.land === 'mid' ? 1 : 2;
      return { rank: i + 1, opt: o, s: x1.s, nbs: NBS_OF[o.id] || null, reasons: parts, landOk: o.land <= landAvail };
    });
  }
  function reasonsHtml(cd) {
    return '<div class="why"><b>' + x('why') + ':</b> ' + esc(cd.reasons.join('; ')) + '. ' + (cd.landOk ? x('landOk') : x('landFit')) + '</div>';
  }
  function ctaHtml() {
    return '<p class="sub">' + x('ctaP') + '</p><div class="demo-box">' + C().ico('alert') + '<span>' + esc(x('demoLabel')) + '</span></div>' +
      '<button class="btn btn-primary" type="button" id="openExplore"><span>' + x('ctaB') + '</span>' + C().ico('arrow', 'flip') + '</button>';
  }

  /* ---------- explore view ---------- */
  function isCandidate(nbs) { return candidates().some(function (c) { return c.nbs === nbs; }); }
  function render() {
    var root = $('#view-explore'); if (!root) return;
    var c = C();
    var solRadios = SOL_ORDER.map(function (id) {
      var checked = ex.sol === id;
      return '<label class="sol' + (checked ? ' on' : '') + '"><input type="radio" name="exsol" value="' + id + '"' + (checked ? ' checked' : '') + '>' +
        '<span><b>' + esc(solName(id)) + '</b>' + (isCandidate(id) ? ' <span class="chip l2">' + x('candidate') + '</span>' : '') +
        '<small>' + x('solDesc_' + id) + (id === 'NBS03' ? ' ' + x('solName_NBS03_note') : '') + '</small></span></label>';
    }).join('');
    root.innerHTML = '<section class="as ex"><div class="wrap ex-wrap">' +
      '<button class="link no-print" type="button" id="exBack">' + c.ico('back', 'flip') + ' ' + x('back') + '</button>' +
      '<h1 id="exTitle" tabindex="-1">' + x('exploreH') + '</h1>' +
      '<p class="lead-s">' + x('intro') + '</p>' +
      '<div class="demo-box">' + c.ico('alert') + '<span>' + esc(x('demoLabel')) + '</span></div>' +
      '<section class="ex-sec"><h2>' + x('s1') + '</h2><fieldset class="field"><legend class="sr">' + x('s1') + '</legend><div class="sols">' + solRadios + '</div></fieldset></section>' +
      '<section class="ex-sec" id="exInputs"></section>' +
      '<section class="ex-sec" id="exResults" aria-live="polite"></section>' +
      '</div></section>';
    renderInputs(); renderResults();
  }
  function inputHtml(d, st) {
    var c = C();
    var label = L() === 'ar' ? d.label_ar : d.label_en, meaning = L() === 'ar' ? d.meaning_ar : d.meaning_en;
    var id = 'ex-' + d.id;
    if (d.type === 'boolean') {
      var v = st.vals[d.id];
      return '<div class="exf"><label class="chk"><input type="checkbox" id="' + id + '" data-in="' + d.id + '"' + (v ? ' checked' : '') + '><span><b>' + esc(label) + '</b><small>' + esc(meaning) + '</small></span></label></div>';
    }
    var val = st.vals[d.id], touched = !!st.touched[d.id];
    var tag = d.default === null || d.default === undefined ? '<span class="tagq">' + (d.required ? x('required') : x('optional')) + '</span>'
      : '<span class="tagq' + (touched ? ' u' : '') + '" data-tag="' + d.id + '">' + (touched ? x('tagUser') : x('tagDefault')) + '</span>';
    return '<div class="exf"><label for="' + id + '">' + esc(label) + ' ' + tag + '</label>' +
      '<div class="exrow"><input type="number" inputmode="decimal" id="' + id + '" data-in="' + d.id + '" step="any" value="' + (val === null || val === undefined ? '' : esc(val)) + '" aria-describedby="' + id + '-m ' + id + '-e"><span class="unit">' + esc(d.unit) + '</span></div>' +
      '<div class="mean" id="' + id + '-m">' + esc(meaning) + '</div><div class="inline-err" id="' + id + '-e" role="alert"></div></div>';
  }
  function renderInputs() {
    var box = $('#exInputs'); if (!box) return;
    if (!ex.sol) { box.innerHTML = ''; return; }
    var st = cur(), def = E.solutionDef(ex.sol);
    var prim = def.inputs.filter(function (d) { return d.primary; }).map(function (d) { return inputHtml(d, st); }).join('');
    var advDefs = def.inputs.filter(function (d) { return !d.primary; }).map(function (d) { return inputHtml(d, st); }).join('');
    var priceRows = '';
    var seen = {};
    def.components.forEach(function (cm) {
      [cm.capex, cm.annual].forEach(function (pid) {
        if (!pid || seen[pid]) return; seen[pid] = 1;
        var p = E.param(pid), v = st.prices[pid];
        priceRows += '<div class="exf"><label for="pr-' + pid + '">' + esc(pname(p)) + '</label><div class="exrow"><input type="number" inputmode="decimal" step="any" min="0" id="pr-' + pid + '" data-price="' + pid + '" placeholder="' + x('pricePh') + ' ' + (p.value.base) + '" value="' + (v === undefined ? '' : esc(v)) + '"><span class="unit">' + esc(p.unit) + '</span></div></div>';
      });
    });
    box.innerHTML = '<h2>' + x('s2') + ' <span class="solname">' + esc(solName(ex.sol)) + '</span></h2>' +
      '<div class="exgrid">' + prim + '</div>' +
      '<details class="adv"' + (ex.openAdv ? ' open' : '') + ' id="advBox"><summary>' + x('adv') + '</summary><p class="mean">' + x('advIntro') + '</p><div class="exgrid">' + advDefs + '</div>' +
      '<h3>' + x('prices') + '</h3><p class="mean">' + x('pricesIntro') + '</p><div class="exgrid">' + priceRows + '</div></details>';
  }
  function showFieldErrors(res) {
    $$('.inline-err[id^="ex-"]').forEach(function (e) { e.textContent = ''; });
    $$('input[data-in]').forEach(function (i) { i.classList.remove('input-err'); i.removeAttribute('aria-invalid'); });
    res.errors.forEach(function (er) {
      var el = $('#ex-' + er.field + '-e'), inp = $('#ex-' + er.field);
      var msg = '';
      if (er.code === 'range') msg = x('e_range')(er.min, er.max);
      else if (er.code === 'shares') msg = x('e_shares')(er.sum);
      else msg = x('e_' + er.code);
      if (el) el.textContent = msg;
      if (inp) { inp.classList.add('input-err'); inp.setAttribute('aria-invalid', 'true'); }
    });
  }

  /* shared by screen and report */
  function outputsTable(res) {
    var rows = res.outputs.map(function (o) {
      var f = E.FORMULAS[o.formula];
      var note = '';
      if (o.unavailable && o.reason === 'small_event') note = '<div class="rnote">' + x('r_small_event') + '</div>';
      if (o.unavailable && o.reason === 'no_catchment') note = '<div class="rnote">' + x('r_no_catchment') + '</div>';
      if (o.fraction) note = '<div class="rnote">' + en('G01: ' + o.fraction[0] + '–' + o.fraction[1] + '% of event rainfall') + '</div>';
      return '<tr><td><b>' + x('o_' + o.id) + '</b><div class="g">' + x('g_' + o.group) + '</div>' + note + '</td>' +
        '<td class="num">' + fmtRange(o) + '</td><td>' + esc(o.unit) + '</td><td>' + basisTag(o.basis) + '</td>' +
        '<td class="fx">' + (f ? '<code>' + esc(f.expr) + '</code>' : '') + '</td></tr>';
    }).join('');
    return '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + x('colInd') + '</th><th class="num">' + x('colRes') + '</th><th>' + x('colUnit') + '</th><th>' + x('colBasis') + '</th><th>' + x('showFormula') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="note-s">' + x('scenarioNote') + '</p>';
  }
  function evidenceBlock(sol, res) {
    var ev = E.evidenceCards(sol), h = '';
    var order = ['air_temperature', 'thermal_comfort', 'event_retention', 'capex_reference', 'maintenance_observed', 'qualitative'];
    h += '<p class="note-s">' + x('indep')(ev.independentStudyCount, ev.recordCount) + ' ' + x('notForecast') + '</p>';
    order.forEach(function (cat) {
      var gs = ev.groups.filter(function (g) { return g.category === cat; });
      if (!gs.length) return;
      // skip the roof cost cases here; they are shown in the dedicated cost block
      var rows = '';
      gs.forEach(function (g) {
        g.records.forEach(function (r) {
          if (sol === 'NBS02' && cat === 'capex_reference' && r.statistic_type === 'single_case') return;
          var val = r.max !== null && r.max !== undefined && r.max !== '' && r.max !== r.min_or_value ? (r.min_or_value + ' – ' + r.max) : (r.min_or_value === null ? '–' : r.min_or_value);
          rows += '<tr><td>' + en(r.metric) + '<div class="g">' + esc(r.evidence_id) + '</div></td><td class="num">' + (r.min_or_value === null ? x('unavailable') : esc(val)) + ' <span class="unit">' + en(r.unit) + '</span></td>' +
            '<td>' + x('st_' + r.statistic_type) + '</td><td>' + en(r.location_context + ', ' + r.price_or_publication_year) + '</td>' +
            '<td>' + en(r.study_group || '') + '</td><td class="lim">' + en(r.limits) + '</td><td>' + en(r.source_locator) + '</td></tr>';
        });
      });
      if (!rows) return;
      h += '<h4>' + x('cat_' + cat) + '</h4><div class="tbl-wrap"><table class="tbl ev"><thead><tr><th>' + x('colMetric') + '</th><th class="num">' + x('colValue') + '</th><th>' + x('colStat') + '</th><th>' + x('colWhere') + '</th><th>' + x('colStudy') + '</th><th>' + x('colLimits') + '</th><th>' + x('colSource') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    });
    if (sol !== 'NBS02' && !ev.groups.some(function (g) { return g.category === 'air_temperature' || g.category === 'thermal_comfort'; })) {
      h += '<p class="note-s">' + x('surfaceNone') + '</p>';
    }
    return h;
  }
  function roofReferenceBlock(res) {
    var r = res.reference_cost; if (!r) return '';
    var h = '<h4>' + x('refCostH') + '</h4><p class="note-s">' + x('refCostP')(r.n_cases) + '</p>';
    if (r.scaled) {
      h += '<div class="tbl-wrap"><table class="tbl"><thead><tr><th></th><th class="num">EUR/m²</th><th class="num">EUR</th></tr></thead><tbody>' +
        '<tr><td>' + x('refMin') + '</td><td class="num">' + r.per_m2.min + '</td><td class="num">' + eur(r.scaled.low) + '</td></tr>' +
        '<tr><td>' + x('refMed') + '</td><td class="num">' + fmtN(r.per_m2.median) + '</td><td class="num">' + eur(r.scaled.median) + '</td></tr>' +
        '<tr><td>' + x('refMax') + '</td><td class="num">' + r.per_m2.max + '</td><td class="num">' + eur(r.scaled.high) + '</td></tr></tbody></table></div>';
    } else {
      h += '<div class="note">' + x('refCostOut')(r.area_range[0], r.area_range[1]) + '</div>';
    }
    h += '<p class="note-s">' + x('refBasis') + '</p>';
    h += '<details class="adv"><summary>' + x('refCases') + ' (' + r.n_cases + ')</summary><div class="tbl-wrap"><table class="tbl"><thead><tr><th>ID</th><th class="num">EUR/m²</th><th class="num">m²</th><th></th></tr></thead><tbody>' +
      r.cases.map(function (cs) { return '<tr><td>' + esc(cs.id) + '</td><td class="num">' + cs.value + '</td><td class="num">' + cs.area_m2 + '</td><td>' + en(cs.note) + '</td></tr>'; }).join('') +
      '</tbody></table></div></details>';
    h += '<p class="note-s">' + x('typicalBand') + ' ' + x('intensiveCase') + '</p>';
    return h;
  }
  function costTables(res) {
    var cs = res.costs, def = E.solutionDef(res.solution_id), h = '';
    function lab(id) { var cm = def.components.filter(function (z) { return z.id === id; })[0]; return L() === 'ar' ? cm.label_ar : cm.label_en; }
    function table(title, part) {
      var rows = part.components.map(function (r) {
        if (!r.included) return '<tr><td>' + esc(lab(r.id)) + '</td><td colspan="4">' + x('notIncluded') + '</td></tr>';
        if (r.unavailable) return '<tr><td>' + esc(lab(r.id)) + '</td><td colspan="4">' + x('unavailable') + '</td></tr>';
        var up = r.unit_price.low === r.unit_price.high ? fmtN(r.unit_price.base) : fmtN(r.unit_price.low) + ' / ' + fmtN(r.unit_price.base) + ' / ' + fmtN(r.unit_price.high);
        return '<tr><td>' + esc(lab(r.id)) + '<div class="g">' + basisTag(r.source_class) + '</div></td><td class="num">' + fmtN(r.quantity) + ' <span class="unit">' + esc(r.qty_unit) + '</span></td>' +
          '<td class="num">' + up + ' <span class="unit">' + esc(r.unit) + '</span></td>' +
          '<td class="num">' + eur(r.subtotal.low) + ' – ' + eur(r.subtotal.high) + '</td><td class="num">' + eur(r.subtotal.base) + '</td></tr>';
      }).join('');
      var t = part.total;
      rows += '<tr class="tot"><td>' + x('total') + '</td><td></td><td></td><td class="num">' + (t ? eur(t.low) + ' – ' + eur(t.high) : x('unavailable')) + '</td><td class="num">' + (t ? eur(t.base) : '') + '</td></tr>';
      return '<h4>' + title + '</h4><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + x('colItem') + '</th><th class="num">' + x('colQty') + '</th><th class="num">' + x('colPrice') + '</th><th class="num">' + x('colSub') + ' (EUR)</th><th class="num">' + x('base') + ' (EUR)</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    }
    h += '<p class="note-s">' + x('costP') + '</p>';
    h += table(x('capex'), cs.capex);
    h += table(x('annual'), cs.annual);
    h += '<p class="note-s"><b>' + x('scenario') + ':</b> ' + x('scenarioNote') + '</p><p class="note-s">' + x('includes') + ' ' + x('excludes') + '</p><p class="note-s">' + x('lumpNote') + '</p>';
    return h;
  }
  function inputsBlock(res) {
    var def = E.solutionDef(res.solution_id), st = ex.by[res.solution_id] || { touched: {} };
    var rows = def.inputs.map(function (d) {
      var v = res.inputs[d.id];
      var vs = d.type === 'boolean' ? (v ? '✓' : '–') : (v === null || v === undefined ? x('unavailable') : fmtN(v));
      var pv = res.provenance[d.id];
      return '<tr><td>' + esc(L() === 'ar' ? d.label_ar : d.label_en) + '</td><td class="num">' + vs + (d.unit && d.type !== 'boolean' ? ' <span class="unit">' + esc(d.unit) + '</span>' : '') + '</td><td>' +
        (pv === 'user_entered' ? x('tagUser') : pv === 'demo_default' ? x('tagDefault') : x('unavailable')) + '</td></tr>';
    }).join('');
    var used = {}, prm = '';
    def.components.forEach(function (cm) { [cm.capex, cm.annual].forEach(function (pid) { if (pid) used[pid] = 1; }); });
    Object.keys(used).concat(({ NBS01: ['NBS01.water_demand_lpd'], NBS03: ['NBS03.tree_water_lpd', 'NBS03.meadow_water_lpd'], NBS04: ['NBS04.shape_factor', 'NBS04.runoff_coeff'], NBS05: ['NBS05.tree_water_lpd', 'NBS05.understory_water_lpd'] })[res.solution_id] || []).forEach(function (pid) {
      var p = E.param(pid); if (!p) return;
      var v = p.value.low === undefined ? fmtN(p.value.base) : fmtN(p.value.low) + ' / ' + fmtN(p.value.base) + ' / ' + fmtN(p.value.high);
      var vr = p.valid_range ? (p.valid_range.min + ' – ' + p.valid_range.max + ' ' + p.valid_range.input) : '–';
      prm += '<tr><td>' + esc(pname(p)) + '<div class="g">' + esc(pid) + '</div></td><td class="num">' + v + ' <span class="unit">' + esc(p.unit) + '</span></td><td>' + basisTag(p.source_class) + '</td><td>' + esc(vr) + '</td><td>' + x('pvEmpty') + '</td></tr>';
    });
    if (res.solution_id === 'NBS02') {
      ['NBS02.event_retention_gt10mm', 'NBS02.reference_cost_extensive'].forEach(function (pid) {
        var p = PR(pid); if (!p) return;
        prm += '<tr><td>' + esc(L() === 'ar' ? p.name_ar : p.name_en) + '<div class="g">' + esc(pid) + '</div></td><td class="num">' + en(p.evidence_refs.join(', ')) + '</td><td>' + basisTag('published_reference') + '</td><td>' + en(p.valid_range_en) + '</td><td>' + x('pvEmpty') + '</td></tr>';
      });
    }
    return '<h4>' + x('inputsT') + '</h4><div class="tbl-wrap"><table class="tbl"><tbody>' + rows + '</tbody></table></div>' +
      '<h4>' + x('paramsT') + '</h4><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + x('colParam') + '</th><th class="num">' + x('colValue') + '</th><th>' + x('colClass') + '</th><th>' + x('colValid') + '</th><th>' + x('colPV') + '</th></tr></thead><tbody>' + prm + '</tbody></table></div>';
  }
  function PR(id) {
    var m = window.NBS4MED_PARAMS.published_reference_parameters || [];
    return m.filter(function (p) { return p.id === id; })[0];
  }
  function sourcesBlock(sol) {
    var ids = {};
    E.evidenceCards(sol).records.forEach(function (r) { r.source_ids.forEach(function (s) { ids[s] = 1; }); });
    E.solutions().filter(function (s) { return s.solution_id === sol; })[0].source_ids.forEach(function (s) { ids[s] = 1; });
    var src = E.sourcesFor(Object.keys(ids).sort());
    return '<ul class="srcs">' + src.map(function (s) { return '<li>' + en(s.source_id + ': ' + s.title + ' (' + s.publisher + '). ' + s.review_scope) + ' <span class="url">' + en(s.url) + '</span></li>'; }).join('') + '</ul>';
  }
  function needBlock(sol) {
    var rd = E.solutions().filter(function (s) { return s.solution_id === sol; })[0];
    return '<ul><li><b>' + x('needSite') + ':</b> ' + x('site_' + sol) + '</li><li><b>' + x('needCost') + ':</b> ' + x('needC') + '</li><li><b>' + x('needImpact') + ':</b> ' + x('needI_' + sol) + '</li><li>' + x('needCommon') + '</li></ul>';
  }
  function rulesBlock(sol, res) {
    var ids = ['ruleR01', 'ruleR06', 'ruleR08', 'ruleR10'];
    if (sol === 'NBS02') ids.splice(1, 0, 'ruleR02');
    if (sol === 'NBS01' || sol === 'NBS05') ids.splice(1, 0, 'ruleR03');
    if (sol === 'NBS03') ids.splice(1, 0, 'ruleR04');
    if (sol === 'NBS04') ids.splice(1, 0, 'ruleR05');
    return '<ul>' + ids.map(function (k) { return '<li>' + x(k) + '</li>'; }).join('') + '</ul>';
  }
  function warningsHtml(res) {
    return res.warnings.map(function (w) {
      var t = '';
      if (w.code === 'outside_validity') t = x('w_outside')(w.input, w.min, w.max);
      else if (w.code === 'default_used') t = x('w_default');
      else if (w.code === 'no_trees') t = x('w_notrees');
      return t ? '<div class="note warn">' + C().ico('alert') + '<span>' + t + '</span></div>' : '';
    }).join('');
  }
  function resultsHtml(res) {
    var sol = res.solution_id;
    var h = '<h2>' + x('s3') + ' <span class="solname">' + esc(solName(sol)) + '</span></h2><div class="demo-box">' + C().ico('alert') + '<span>' + esc(x('demoLabel')) + '</span></div>';
    if (res.status === 'invalid') return h + '<div class="note">' + x('invalidBox') + '</div>';
    h += warningsHtml(res);
    h += '<h3>' + x('calcH') + '</h3><p class="sub">' + x('calcP') + '</p>' + outputsTable(res);
    h += '<h3>' + x('refH') + '</h3><p class="sub">' + x('refP') + '</p>' + evidenceBlock(sol, res) + roofReferenceBlock(res);
    h += '<h3>' + x('ncH') + '</h3><ul class="nc">' + res.not_calculated.map(function (k) { return '<li><b>' + x('nc_' + k) + '.</b> ' + x('nc_' + k + '_r') + '</li>'; }).join('') + '</ul>';
    h += '<h3>' + x('costH') + '</h3>' + costTables(res);
    h += '<h3>' + x('inH') + '</h3>' + inputsBlock(res);
    h += '<h3>' + x('rulesH') + '</h3>' + rulesBlock(sol, res);
    h += '<h3>' + x('needH') + '</h3>' + needBlock(sol);
    h += '<h3>' + x('srcH') + '</h3>' + sourcesBlock(sol);
    return h;
  }
  function compute() {
    if (!ex.sol) return null;
    var st = cur();
    var res = E.calculate(ex.sol, st.vals, st.touched, st.prices);
    ex.res = res;
    return res;
  }
  function renderResults() {
    var box = $('#exResults'); if (!box) return;
    if (!ex.sol) { box.innerHTML = ''; return; }
    var res = compute();
    showFieldErrors(res);
    box.innerHTML = resultsHtml(res) + '<div class="report no-print">' +
      '<button class="btn btn-primary" type="button" id="exCsv">' + C().ico('down') + '<span>' + x('csvB') + '</span></button>' +
      '<button class="btn" type="button" id="exPrint">' + C().ico('print') + '<span>' + x('printB') + '</span></button></div>';
  }

  /* ---------- events (explore view only) ---------- */
  var timer = null;
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t.closest || !t.closest('#view-explore')) return;
    var st = cur(); if (!st) return;
    if (t.dataset.in) {
      var id = t.dataset.in;
      st.vals[id] = t.type === 'checkbox' ? t.checked : t.value;
      st.touched[id] = true;
      var tag = $('[data-tag="' + id + '"]'); if (tag) { tag.textContent = x('tagUser'); tag.classList.add('u'); }
    } else if (t.dataset.price) {
      st.prices[t.dataset.price] = t.value;
    } else return;
    clearTimeout(timer);
    timer = setTimeout(renderResults, 120);
  });
  document.addEventListener('change', function (e) {
    var t = e.target; if (!t.closest || !t.closest('#view-explore')) return;
    if (t.name === 'exsol') {
      ex.sol = t.value; render();
      var h = $('#exInputs h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: false }); }
    } else if (t.dataset.in && t.type === 'checkbox') {
      var st = cur(); st.vals[t.dataset.in] = t.checked; st.touched[t.dataset.in] = true; renderResults();
    }
  });
  document.addEventListener('toggle', function (e) {
    if (e.target && e.target.id === 'advBox') ex.openAdv = e.target.open;
  }, true);
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button'); if (!t) return;
    if (t.id === 'openExplore') { C().nav('explore'); return; }
    if (t.id === 'exBack') { C().nav('results'); return; }
    if (t.id === 'exCsv') { csv(); return; }
    if (t.id === 'exPrint') { print(); return; }
  });

  /* ---------- report ---------- */
  function tableRows(arr) { return arr.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join(''); }
  function reportHtml() {
    var c = C(), r = c.calc(), L1 = c.LEVELS[r.lvl], st = c.st, t = c.nm;
    var d = new Date(); var date = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    var h = '<div class="rp-head"><h1>' + x('repTitle') + '</h1><p>' + x('repDate') + ': ' + date + '</p></div>' +
      '<div class="demo-box">' + esc(x('demoLabel')) + '</div>';
    h += '<h2>1. ' + x('repAssess') + '</h2><p class="note-s">' + x('repSep') + '</p>';
    h += '<h3>' + x('ctxT') + '</h3><table class="tbl"><tbody>' + c.CTX.map(function (cx) {
      var o = cx.o.filter(function (z) { return z[0] === st.ctx[cx.k]; })[0];
      return '<tr><td>' + esc(t(cx)) + '</td><td>' + esc(o ? (L() === 'ar' ? o[2] : o[1]) : '–') + '</td></tr>';
    }).join('') + '<tr><td>' + esc(c.T('stRisk')) + '</td><td>' + esc(c.riskList().map(function (z) { return t(z); }).join('; ')) + '</td></tr>' +
      '<tr><td>' + esc(c.T('stConf')) + '</td><td>' + esc((c.CONF.filter(function (z) { return z[0] === st.conf; })[0] || ['', '', ''])[L() === 'ar' ? 2 : 1]) + '</td></tr></tbody></table>';
    h += '<h3>' + c.T('overall') + '</h3><p class="rp-score"><b>' + r.sum + ' / 28</b> (' + r.pct + '%) &nbsp; <span class="chip ' + L1.c + '">' + esc(t(L1)) + '</span></p><p class="note-s">' + c.T('thresholds') + '</p>';
    h += '<table class="tbl"><thead><tr><th>' + c.T('crit') + '</th><th class="num">' + c.T('score') + '</th><th>' + c.T('level') + '</th></tr></thead><tbody>' +
      c.CRIT.map(function (cr, i) { var p = r.per[i], lv = c.LEVELS[c.lvlIdx(p.pct)]; return '<tr><td>' + cr.id + ' ' + esc(t(cr)) + '</td><td class="num">' + p.sum + ' / ' + p.max + ' (' + p.pct + '%)</td><td>' + esc(t(lv)) + '</td></tr>'; }).join('') + '</tbody></table>';
    var gs = { g: [], a: [], r: [] }; r.per.forEach(function (p, i) { gs[p.pct >= 70 ? 'g' : p.pct >= 40 ? 'a' : 'r'].push(c.CRIT[i].id + ' ' + t(c.CRIT[i])); });
    h += '<h3>' + c.T('sgH') + '</h3><table class="tbl"><tbody><tr><td>' + c.T('strengths') + '</td><td>' + esc(gs.g.join('; ') || '–') + '</td></tr><tr><td>' + c.T('watch') + '</td><td>' + esc(gs.a.join('; ') || '–') + '</td></tr><tr><td>' + c.T('gap') + '</td><td>' + esc(gs.r.join('; ') || '–') + '</td></tr></tbody></table>';
    h += '<p class="note-s">' + esc(c.WEAK[L()][r.weak]) + '</p>';
    h += '<h3>' + c.T('heatH') + '</h3><table class="tbl"><thead><tr><th>ID</th><th>' + x('colInd') + '</th><th class="num">' + c.T('score') + '</th></tr></thead><tbody>' +
      c.IND.map(function (i) { return '<tr><td>' + i.id + '</td><td>' + esc(t(i)) + '</td><td class="num">' + st.sc[i.id] + ' · ' + c.S.s[L()][st.sc[i.id]] + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<h2>2. ' + x('repCand') + '</h2><p class="note-s">' + x('whyNote') + '</p><table class="tbl"><thead><tr><th>#</th><th>' + c.T('option') + '</th><th>' + c.T('suit') + '</th><th>' + x('why') + '</th></tr></thead><tbody>' +
      candidates().map(function (cd) {
        var si = cd.s >= 60 ? 0 : cd.s >= 35 ? 1 : 2;
        return '<tr><td>' + cd.rank + '</td><td>' + esc(t(cd.opt)) + '</td><td>' + (L() === 'ar' ? c.S.sHa[si] : c.S.sH[si]) + ' (' + cd.s + '%)</td><td>' + esc(cd.reasons.join('; ')) + '. ' + (cd.landOk ? x('landOk') : x('landFit')) + '</td></tr>';
      }).join('') + '</tbody></table>';
    h += '<h2>3. ' + x('repExplore') + '</h2>';
    if (ex.sol && ex.res) h += resultsHtml(ex.res).replace(/<h2>.*?<\/h2>/, '<h3 class="rp-sol">' + esc(solName(ex.sol)) + '</h3>');
    else h += '<p>' + x('notExplored') + '</p>';
    h += '<p class="rp-foot">' + esc(x('demoLabel')) + '</p>';
    return h;
  }
  function print() {
    var box = $('#printReport');
    if (!box) { box = document.createElement('div'); box.id = 'printReport'; document.body.appendChild(box); }
    box.setAttribute('dir', L() === 'ar' ? 'rtl' : 'ltr');
    box.setAttribute('lang', L());
    box.innerHTML = reportHtml();
    window.print();
  }

  /* ---------- CSV ---------- */
  function csvRows() {
    var c = C(), r = c.calc(), st = c.st, rows = [['section', 'item', 'value', 'unit', 'basis', 'notes']];
    rows.push(['label', 'status', E_label(), '', '', '']);
    c.CTX.forEach(function (cx) { var o = cx.o.filter(function (z) { return z[0] === st.ctx[cx.k]; })[0]; rows.push(['assessment context', cx.en, o ? o[1] : '', '', 'user input', 'not scored']); });
    rows.push(['assessment context', 'climate risks', c.riskList().map(function (z) { return z.en; }).join('; '), '', 'user input', '']);
    c.IND.forEach(function (i) { rows.push(['assessment indicator', i.id + ' ' + i.en, st.sc[i.id], '0-2', 'user input', '']); });
    c.CRIT.forEach(function (cr, i) { rows.push(['assessment criterion', cr.id + ' ' + cr.en, r.per[i].sum + '/' + r.per[i].max, 'points', 'calculated', r.per[i].pct + '%']); });
    rows.push(['assessment overall', 'score', r.sum + '/28', 'points', 'calculated', r.pct + '%']);
    rows.push(['assessment overall', 'level', c.LEVELS[r.lvl].en, '', 'calculated', '']);
    rows.push(['assessment overall', 'data confidence', st.conf, '', 'user input', '']);
    candidates().forEach(function (cd) { rows.push(['candidate solution', '#' + cd.rank + ' ' + cd.opt.en, cd.s + '%', 'suitability', 'rule-based match', cd.reasons.join('; ')]); });
    if (ex.sol && ex.res && ex.res.status === 'ok') {
      var res = ex.res;
      rows.push(['explore', 'solution', E.solutions().filter(function (s) { return s.solution_id === ex.sol; })[0].name_en, '', '', '']);
      Object.keys(res.inputs).forEach(function (k) { rows.push(['explore input', k, res.inputs[k], '', res.provenance[k] || '', '']); });
      res.outputs.forEach(function (o) {
        var v = o.unavailable ? 'unavailable' : (o.value !== undefined ? o.value : (round(o.low) + ' to ' + round(o.high) + (o.base !== null && o.base !== undefined ? ' (base ' + round(o.base) + ')' : '')));
        rows.push(['explore output', o.id, v, o.unit, o.basis, o.formula + (o.unavailable ? '; ' + o.reason : '')]);
      });
      ['capex', 'annual'].forEach(function (k) {
        res.costs[k].components.forEach(function (cm) {
          if (!cm.included) { rows.push(['explore cost ' + k, cm.id, 'not included', 'EUR', '', cm.reason]); return; }
          if (cm.unavailable) { rows.push(['explore cost ' + k, cm.id, 'unavailable', 'EUR', '', '']); return; }
          rows.push(['explore cost ' + k, cm.id + ' (' + round(cm.quantity) + ' ' + cm.qty_unit + ')', round(cm.subtotal.low) + ' to ' + round(cm.subtotal.high) + ' (base ' + round(cm.subtotal.base) + ')', 'EUR', cm.source_class, 'illustrative scenario range, not a confidence interval; no price year']);
        });
        var tt = res.costs[k].total;
        rows.push(['explore cost ' + k, 'total', tt ? round(tt.low) + ' to ' + round(tt.high) + ' (base ' + round(tt.base) + ')' : 'unavailable', 'EUR', 'demo_assumption', 'not a local cost']);
      });
      if (res.reference_cost && res.reference_cost.scaled) {
        var s = res.reference_cost.scaled;
        rows.push(['explore reference', 'Hamburg extensive roofs scaled by area', round(s.low) + ' to ' + round(s.high) + ' (median ' + round(s.median) + ')', 'EUR', 'published_reference', 'source example, 2017 prices, VAT incl., waterproofing excluded; not a local cost']);
      }
      res.not_calculated.forEach(function (k) { rows.push(['explore not calculated', k, 'not calculated', '', '', X['nc_' + k + '_r'].en]); });
    } else rows.push(['explore', 'status', 'not completed', '', '', '']);
    rows.push(['note', '', E_label(), '', '', '']);
    return rows;
  }
  function round(n) { return Math.round(n * 100) / 100; }
  function E_label() { return X.demoLabel.en; }
  function csv() {
    var rows = csvRows();
    var text = '﻿' + rows.map(function (r) { return r.map(function (c) { return '"' + String(c === null || c === undefined ? '' : c).replace(/"/g, '""') + '"'; }).join(','); }).join('\r\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' })); a.download = 'nbs4med-demo-report.csv';
    document.body.appendChild(a); a.click(); a.remove();
    var n = $('#dlNote'); if (n) n.textContent = C().T('dlOk');
    return rows;
  }

  window.NBS4MED_EXPLORE = {
    render: render, ctaHtml: ctaHtml, reasonsHtml: reasonsHtml, candidates: candidates, csv: csv, print: print,
    reportHtml: reportHtml, csvRows: csvRows, state: ex, label: function () { return x('demoLabel'); },
    exploreTitle: function () { return x('exploreH'); }, whyNote: function () { return x('whyNote'); }
  };
})();
