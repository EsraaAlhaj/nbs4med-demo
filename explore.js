/*
 * NBS4MED demo: "Explore impact and cost" step, results blocks and report.
 * Presentation only. All numbers come from NBS4MED_ENGINE (engine.js), which reads
 * evidence.json and demo_parameters.json (via the .js wrappers so that the
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

  var SOL_ORDER = ['NBS01', 'NBS02', 'NBS03', 'NBS04', 'NBS05'];

  /* ---------- strings ---------- */
  var X = {
    exploreH: { en: 'Explore impact and cost', ar: 'استكشف الأثر والتكلفة' },
    ctaP: { en: 'Optional. Choose one of five solution types and see illustrative quantities, impact evidence and costs. This step does not change your assessment result.', ar: 'اختياري. اختر أحد خمسة أنواع من الحلول لترى كميات وأدلة أثر وتكاليف توضيحية. لا تغيّر هذه الخطوة نتيجة تقييمك.' },
    ctaB: { en: 'Explore impact and cost', ar: 'استكشف الأثر والتكلفة' },
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
    nc_aggregate_impact_r: { en: 'No total coefficient exists for a multifunctional park. Only component quantities and costs are shown.', ar: 'لا يوجد معامل إجمالي للمنتزه متعدد الوظائف. تُعرض كميات المكونات وتكاليفها فقط.' },
    nc_annual_capture: { en: 'Annual captured volume', ar: 'الحجم المحتجز سنويًا' },
    nc_annual_capture_r: { en: 'It needs catchment, storage, outlets and a rainfall series.', ar: 'يحتاج إلى الحوض المائي والتخزين والمخارج وسلسلة أمطار.' },
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
    printB: { en: 'Summary report — 2 pages', ar: 'تقرير ملخص — صفحتان' }, csvB: { en: 'Download CSV', ar: 'تحميل CSV' },
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
    perYear: { en: 'per year', ar: 'في السنة' },
    fromAssess: { en: 'From your assessment', ar: 'من تقييمك' },
    matchL: { en: 'Rule-based match score', ar: 'درجة المطابقة القائمة على القواعد' },
    notRanked: { en: 'This option is not in the ranked candidates for your assessment.', ar: 'هذا الخيار ليس ضمن المرشحين المرتبين في تقييمك.' },
    outH: { en: 'Illustrative outputs', ar: 'مخرجات توضيحية' },
    outP: { en: 'Results change with your inputs. Each group says what kind of figure it is: arithmetic, a literature-based scenario, or a demo assumption.', ar: 'تتغير النتائج مع مدخلاتك. تبيّن كل مجموعة نوع الرقم: حساب حسابي أو سيناريو مبني على الأدبيات أو افتراض تجريبي.' },
    grpA: { en: 'Quantities calculated from your inputs', ar: 'كميات محسوبة من مدخلاتك' },
    grpAn: { en: 'Arithmetic on your inputs and on demo design assumptions. These are quantities, not impact forecasts.', ar: 'حسابات على مدخلاتك وعلى افتراضات تصميم تجريبية. هذه كميات وليست توقعات للأثر.' },
    grpB: { en: 'Literature-based scenario', ar: 'سيناريو مبني على الأدبيات' },
    grpBn: { en: 'Literature-based event retention is an illustrative scenario, not a validated local forecast. It applies published results from other places to your roof.', ar: 'احتجاز الحدث المبني على الأدبيات سيناريو توضيحي وليس توقعًا محليًا مُتحقَّقًا منه. فهو يطبّق نتائج منشورة من أماكن أخرى على سطحك.' },
    grpC: { en: 'Illustrative ranges from demo assumptions', ar: 'نطاقات توضيحية من افتراضات تجريبية' },
    grpCn: { en: 'Low, base and high are alternative demo assumptions. They are not a statistical confidence interval and not a forecast.', ar: 'القيم الدنيا والأساسية والعليا افتراضات تجريبية بديلة. وهي ليست فترة ثقة إحصائية ولا توقعًا.' },
    roofStruct: { en: 'Roof structural suitability requires verification. These figures assume the roof can carry the system, which has not been checked.', ar: 'تتطلب الملاءمة الإنشائية للسطح تحققًا. تفترض هذه الأرقام أن السطح يتحمل المنظومة، وهذا لم يُفحص.' },
    roofStructOk: { en: 'You reported the structural suitability as confirmed in the applicability checks. This tool does not verify it, so check it before any design or cost decision.', ar: 'أفدتَ في فحوص قابلية التطبيق بأن الملاءمة الإنشائية مؤكدة. لا تتحقق هذه الأداة منها، فتأكد قبل أي قرار تصميم أو كلفة.' },
    costGrp: { en: 'Demo cost assumptions', ar: 'افتراضات كلفة تجريبية' },
    refCostWarn: { en: 'Reference costs from another place and year are not current local prices.', ar: 'الكلف المرجعية من مكان آخر وسنة أخرى ليست أسعارًا محلية حالية.' },
    condCostH: { en: 'Funding and maintenance conditions from your assessment', ar: 'شروط التمويل والصيانة من تقييمك' },
    limitsH: { en: 'Main assumptions and limitations', ar: 'أهم الافتراضات والقيود' },
    lim1: { en: 'All figures are illustrative and for early planning only. They are not a quote, a design or a forecast for your site.', ar: 'كل الأرقام توضيحية وللتخطيط المبكر فقط. وليست عرض سعر ولا تصميمًا ولا توقعًا لموقعك.' },
    lim2: { en: 'Demo values are placeholders until project partners review them.', ar: 'القيم التجريبية بديلة مؤقتة إلى أن يراجعها شركاء المشروع.' },
    lim3: { en: 'Published evidence from other places is listed under Methodology and sources. It is not a forecast for your site.', ar: 'الأدلة المنشورة من أماكن أخرى مدرجة تحت «المنهجية والمصادر». وهي ليست توقعًا لموقعك.' },
    ncSub: { en: 'Not calculated, and why', ar: 'ما لا يُحسب، ولماذا' },
    methH: { en: 'Methodology and sources', ar: 'المنهجية والمصادر' },
    methP: { en: 'Technical details: formulas, parameter keys, rule codes, published evidence and sources.', ar: 'تفاصيل تقنية: المعادلات ومفاتيح المعاملات ورموز القواعد والأدلة المنشورة والمصادر.' },
    fxH: { en: 'Formulas used', ar: 'المعادلات المستخدمة' },
    refEvH: { en: 'Published reference evidence (not a forecast)', ar: 'أدلة مرجعية منشورة (وليست توقعًا)' },
    fracNote: { en: function (a, b) { return 'Published range: ' + a + ' to ' + b + '% of the event rainfall.'; }, ar: function (a, b) { return 'نطاق منشور: ' + a + ' إلى ' + b + '% من أمطار الحدث.'; } },
    why2: { en: 'Why it matches the selected risks', ar: 'سبب مطابقته للمخاطر المختارة' },
    repScope: { en: 'Assessment scope', ar: 'نطاق التقييم' },
    repCompl: { en: 'Completeness and confidence', ar: 'الاكتمال والثقة' },
    repScreen: { en: 'Applicability screening', ar: 'فرز قابلية التطبيق' },
    repNotRanked: { en: 'Excluded and other options', ar: 'خيارات مستبعدة وخيارات أخرى' },
    roofStructNo: { en: 'Your applicability check records the roof as assessed and unsuitable. The roof figures below are shown only for exploration and do not apply unless that answer changes.', ar: 'تسجّل فحوص قابلية التطبيق لديك أن السطح جرى تقييمه وهو غير ملائم. أرقام السطح أدناه للاستكشاف فقط ولا تنطبق ما لم تتغير تلك الإجابة.' },
    noChecked: { en: 'No solution has been checked yet. Applicability statuses show Not yet checked.', ar: 'لم يُفحص أي حل بعد. تظهر حالات قابلية التطبيق «لم يُفحص بعد».' },
    sumTitle: { en: 'NBS4MED self-evaluation: summary report', ar: 'تقرير ملخص التقييم الذاتي NBS4MED' },
    sumBtn: { en: 'Summary report — 2 pages', ar: 'تقرير ملخص — صفحتان' },
    detBtn: { en: 'Detailed report', ar: 'تقرير مفصّل' },
    sumArea: { en: 'Area', ar: 'المنطقة' }, sumScale: { en: 'Assessment scale', ar: 'مقياس التقييم' }, sumDate: { en: 'Date', ar: 'التاريخ' },
    sumCtx: { en: 'Site context', ar: 'سياق الموقع' }, sumRisks: { en: 'Selected risks', ar: 'المخاطر المختارة' },
    sumDens: { en: 'Urban density', ar: 'الكثافة العمرانية' }, sumLand: { en: 'Public land available', ar: 'الأراضي العامة المتاحة' },
    sumProfSub: { en: 'Fixed 0 to 100% axis. A criterion without a percentage shows its status instead of a bar. Levels use provisional project thresholds.', ar: 'محور ثابت من 0 إلى 100%. يعرض المعيار الذي لا نسبة له حالته بدلًا من الشريط. تستخدم المستويات عتبات مؤقتة للمشروع.' },
    sumCompl: { en: function (n, u, un, na) { return 'Completeness (14 indicators): ' + n + ' scored · ' + u + ' Unknown · ' + un + ' unanswered · ' + na + ' Not applicable'; }, ar: function (n, u, un, na) { return 'الاكتمال (14 مؤشرًا): ' + n + ' مُقيَّمة · ' + u + ' غير معروفة · ' + un + ' بلا إجابة · ' + na + ' لا تنطبق'; } },
    sumConf: { en: function (n, a, b, c, d) { return 'Confidence in the ' + n + ' scored answers (self-reported): documented evidence ' + a + ' · staff estimate ' + b + ' · informal judgement ' + c + ' · not stated ' + d; }, ar: function (n, a, b, c, d) { return 'الثقة في ' + n + ' إجابة مُقيَّمة (بحسب ما أفاد المستخدم): أدلة موثقة ' + a + ' · تقدير الموظفين ' + b + ' · تقدير غير رسمي ' + c + ' · غير محددة ' + d; } },
    sumConfNote: { en: 'A complete answer is not necessarily documented evidence.', ar: 'الإجابة المكتملة ليست بالضرورة موثقة بدليل.' },
    sumImpH: { en: 'Selected improvement areas', ar: 'مجالات التحسين المختارة' },
    sumImpN: { en: 'Selection order: scores of 0, then 1, then Unknown, in indicator order. This is not a validated priority ranking.', ar: 'ترتيب الاختيار: الدرجة 0 ثم 1 ثم «غير معروف»، بحسب ترتيب المؤشرات. وهو ليس ترتيب أولوية مُتحقَّقًا منه.' },
    sumImpMore: { en: function (n) { return n + (n === 1 ? ' more area is' : ' more areas are') + ' listed in the detailed report.'; }, ar: function (n) { return 'يرد ' + n + (n === 1 ? ' مجال آخر' : ' مجالات أخرى') + ' في التقرير المفصّل.'; } },
    sumImpNone: { en: 'No score of 0 or 1 and no Unknown answer was recorded, so no improvement area is selected.', ar: 'لم تُسجَّل درجة 0 أو 1 ولا إجابة «غير معروف»، لذا لا يُختار أي مجال للتحسين.' },
    sumImpUnk: { en: 'Unknown. The information is missing; confirm it before relying on the result.', ar: 'غير معروف. المعلومة ناقصة؛ تأكد منها قبل الاعتماد على النتيجة.' },
    sumCrit: { en: function (a, n, u, un, na) { return a + ' of ' + n + ' indicators scored' + (u ? ' · ' + u + ' Unknown' : '') + (un ? ' · ' + un + ' unanswered' : '') + (na ? ' · ' + na + ' Not applicable' : ''); }, ar: function (a, n, u, un, na) { return a + ' من ' + n + ' مؤشرات مُقيَّمة' + (u ? ' · ' + u + ' غير معروف' : '') + (un ? ' · ' + un + ' بلا إجابة' : '') + (na ? ' · ' + na + ' لا ينطبق' : ''); } },
    sumNotRatedUn: { en: 'Not rated: unanswered indicators', ar: 'غير مُقيَّم: مؤشرات بلا إجابة' },
    sumSharedChk: { en: 'To verify (applies to several options)', ar: 'للتحقق (ينطبق على عدة خيارات)' },
    sumNoYear: { en: 'No price year: demo prices are not from a dated price list.', ar: 'بلا سنة أسعار: أسعار التجربة ليست من قائمة أسعار مؤرخة.' },
    sumRoof: { en: 'Roof structural suitability requires verification; figures assume the roof can carry the system.', ar: 'تتطلب الملاءمة الإنشائية للسطح تحققًا؛ تفترض الأرقام أن السطح يتحمل المنظومة.' },
    sumRoofOk: { en: 'Structural suitability is reported as confirmed; this tool does not verify it.', ar: 'الملاءمة الإنشائية مُبلَّغ عنها مؤكدة؛ لا تتحقق الأداة منها.' },
    sumRoofNo: { en: 'The checks record the roof as assessed and unsuitable; roof figures are for exploration only.', ar: 'تسجّل الفحوص أن السطح جرى تقييمه وهو غير ملائم؛ أرقام السطح للاستكشاف فقط.' },
    sumNotEntered: { en: 'not entered', ar: 'غير مُدخل' },
    sumAnd: { en: ' and ', ar: ' و' },
    sumSeeDet: { en: '(full text in the detailed report)', ar: '(النص الكامل في التقرير المفصّل)' },
    sumOptH: { en: 'Preliminary NBS options', ar: 'خيارات أولية للحلول القائمة على الطبيعة' },
    sumMatch: { en: 'Match index /100', ar: 'مؤشر المطابقة /100' },
    sumMatchNote: { en: 'Rule-based match scores indicate preliminary relevance, not expected effectiveness.', ar: 'تدل درجات المطابقة القائمة على القواعد على صلة أولية، لا على الفعالية المتوقعة.' },
    sumApp: { en: 'Applicability', ar: 'قابلية التطبيق' }, sumShared: { en: 'Shared implementation conditions', ar: 'شروط تنفيذ مشتركة' },
    sumNoRec: { en: 'No recommendation: no option qualifies for the selected risks and context.', ar: 'لا توصية: لا يوجد خيار مؤهل للمخاطر والسياق المختارين.' },
    sumNoRecN: { en: function (a, b) { return a + ' option(s) are excluded after applicability checks and ' + b + ' have a match index of 0. See the detailed report.'; }, ar: function (a, b) { return 'استُبعد ' + a + ' خيار(ات) بعد فحوص قابلية التطبيق، ولدى ' + b + ' مؤشر مطابقة 0. راجع التقرير المفصّل.'; } },
    sumExNone: { en: 'Cost and impact exploration not completed.', ar: 'لم تكتمل استكشافات الكلفة والأثر.' },
    sumExNA: { en: 'Estimates are unavailable because the current inputs are not valid. No values are shown.', ar: 'التقديرات غير متاحة لأن المدخلات الحالية غير صالحة. لا تُعرض أي قيم.' },
    sumInputs: { en: 'Inputs', ar: 'المدخلات' },
    sumQty: { en: 'Physical quantities and water volumes', ar: 'كميات مادية وأحجام مياه' },
    sumImp: { en: 'Impact estimates', ar: 'تقديرات الأثر' },
    sumNoImp: { en: function (l) { return 'No climate-impact estimate is calculated for this solution. Not calculated: ' + l + '.'; }, ar: function (l) { return 'لا يُحسب أي تقدير للأثر المناخي لهذا الحل. لا يُحسب: ' + l + '.'; } },
    sumCostH: { en: 'Cost (demo assumptions, EUR, not local prices)', ar: 'الكلفة (افتراضات تجريبية، يورو، وليست أسعارًا محلية)' },
    sumRefCost: { en: function (a, b, m) { return 'Reference example (Hamburg, 2017; source S04): EUR ' + a + ' – ' + b + ' (median ' + m + '). Another place and year: not a current local price.'; }, ar: function (a, b, m) { return 'مثال مرجعي (هامبورغ، 2017؛ المصدر S04): ' + a + ' – ' + b + ' يورو (الوسيط ' + m + '). مكان وسنة مختلفان: ليس سعرًا محليًا حاليًا.'; } },
    sumSrc: { en: 'Source', ar: 'المصدر' },
    sumFoot1: { en: 'Prototype with provisional methodology (rubric, thresholds, weights), to be reviewed against the PROMEA framework and the NBS repository. Scores are not official scores.', ar: 'نموذج تجريبي بمنهجية مؤقتة (المعيار والعتبات والأوزان) ستُراجع مقابل إطار PROMEA ومستودع الحلول القائمة على الطبيعة. الدرجات ليست درجات رسمية.' },
    sumFoot2: { en: 'Demo values are illustrative. The detailed report and the CSV hold the full answers, methodology and sources.', ar: 'القيم التجريبية توضيحية. يحتوي التقرير المفصّل وملف CSV على الإجابات والمنهجية والمصادر كاملة.' },
    sumPage: { en: function (n) { return 'Page ' + n + ' of 2'; }, ar: function (n) { return 'صفحة ' + n + ' من 2'; } },
    colCat: { en: 'Category (provisional)', ar: 'الفئة (مؤقتة)' }
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
  function solName(id) { var o = C().optByNbs(id); return o ? C().nm(o) : id; }
  function basisTag(b) { return '<span class="chip tag-' + b + '">' + x('basis_' + b) + '</span>'; }
  function en(text) { return '<span lang="en" dir="ltr">' + esc(text) + '</span>'; }

  /* ---------- state ---------- */
  var ex = { sol: null, by: {}, openAdv: false, openMeth: false, res: null };
  function cur() {
    var s = ex.sol; if (!s) return null;
    if (!ex.by[s]) ex.by[s] = { vals: E.defaults(s), touched: {}, prices: {} };
    return ex.by[s];
  }

  /* ---------- results-page pieces used by app.js ---------- */
  function ctaHtml() {
    return '<p class="sub">' + x('ctaP') + '</p><div class="demo-box">' + C().ico('alert') + '<span>' + esc(x('demoLabel')) + '</span></div>' +
      '<button class="btn btn-primary" type="button" id="openExplore"><span>' + x('ctaB') + '</span>' + C().ico('arrow', 'flip') + '</button>';
  }
  /* opens the impact and cost view for the option picked in the recommendations */
  function openSol(nbs) { ex.sol = nbs; C().nav('explore'); }

  /* ---------- explore view ---------- */
  function recOf(nbs) { var o = C().optByNbs(nbs); return o ? C().recFor(o.id) : null; }
  function catSmall(nbs) {
    var o = C().optByNbs(nbs); if (!o) return '';
    return '<small>' + esc(C().T('catL')) + ': ' + esc(C().catText(o)) + ' (' + (L() === 'ar' ? 'مؤقتة' : 'provisional') + ')</small>';
  }
  function picker(nbs) {
    var r = recOf(nbs);
    if (!r || r.raw === 0 || !C().riskList().length) return '';
    return ' <span class="chip st-' + r.scr.status + '">' + esc(C().stLabel(r.scr.status)) + '</span>';
  }
  function render() {
    var root = $('#view-explore'); if (!root) return;
    var c = C();
    var solRadios = SOL_ORDER.map(function (id) {
      var checked = ex.sol === id;
      return '<label class="sol' + (checked ? ' on' : '') + '"><input type="radio" name="exsol" value="' + id + '"' + (checked ? ' checked' : '') + '>' +
        '<span><b>' + esc(solName(id)) + '</b>' + picker(id) +
        '<small>' + x('solDesc_' + id) + '</small>' + catSmall(id) + '</span></label>';
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
  function outRows(list) {
    return list.map(function (o) {
      var note = '';
      if (o.unavailable && o.reason === 'small_event') note = '<div class="rnote">' + x('r_small_event') + '</div>';
      if (o.unavailable && o.reason === 'no_catchment') note = '<div class="rnote">' + x('r_no_catchment') + '</div>';
      if (o.fraction) note = '<div class="rnote">' + x('fracNote')(o.fraction[0], o.fraction[1]) + '</div>';
      return '<tr><td><b>' + x('o_' + o.id) + '</b><div class="g">' + x('g_' + o.group) + '</div>' + note + '</td>' +
        '<td class="num">' + fmtRange(o) + '</td><td>' + esc(o.unit) + '</td><td>' + basisTag(o.basis) + '</td></tr>';
    }).join('');
  }
  function outTable(list) {
    return '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + x('colInd') + '</th><th class="num">' + x('colRes') + '</th><th>' + x('colUnit') + '</th><th>' + x('colBasis') + '</th></tr></thead><tbody>' + outRows(list) + '</tbody></table></div>';
  }
  function outputsGroups(res) {
    var A = [], B = [], K = [];
    res.outputs.forEach(function (o) {
      if (o.basis === 'published_reference') B.push(o);
      else if (o.exact || o.value !== undefined) A.push(o);
      else K.push(o);
    });
    var h = '';
    if (res.solution_id === 'NBS02') h += roofNote();
    if (A.length) h += '<h4>' + x('grpA') + '</h4>' + outTable(A) + '<p class="note-s">' + x('grpAn') + '</p>';
    if (B.length) h += '<h4>' + x('grpB') + '</h4>' + outTable(B) + '<div class="note warn">' + C().ico('alert') + '<span>' + x('grpBn') + '</span></div>';
    if (K.length) h += '<h4>' + x('grpC') + '</h4>' + outTable(K) + '<p class="note-s">' + x('grpCn') + '</p>';
    return h;
  }
  function roofText() {
    var rs = C().roofStruct();
    return rs === 'confirmed' ? x('roofStructOk') : rs === 'unsuitable' ? x('roofStructNo') : x('roofStruct');
  }
  function roofNote() {
    return '<div class="note warn">' + C().ico('alert') + '<span>' + roofText() + '</span></div>';
  }
  function formulasTable(res) {
    var rows = res.outputs.map(function (o) {
      var f = E.FORMULAS[o.formula];
      return f ? '<tr><td>' + x('o_' + o.id) + '</td><td class="fx"><code>' + esc(f.expr) + '</code><div class="g">' + esc(o.formula) + '</div></td></tr>' : '';
    }).join('');
    return '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + x('colInd') + '</th><th>' + x('showFormula') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
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
  function inputsBlock(res, part) {
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
    var tIn = '<h4>' + x('inputsT') + '</h4><div class="tbl-wrap"><table class="tbl"><tbody>' + rows + '</tbody></table></div>';
    var tPm = '<h4>' + x('paramsT') + '</h4><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + x('colParam') + '</th><th class="num">' + x('colValue') + '</th><th>' + x('colClass') + '</th><th>' + x('colValid') + '</th><th>' + x('colPV') + '</th></tr></thead><tbody>' + prm + '</tbody></table></div>';
    return part === 'inputs' ? tIn : part === 'params' ? tPm : tIn + tPm;
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
  function det(summary, body, open) {
    return '<details class="adv" id="methBox"' + ((open || ex.openMeth) ? ' open' : '') + '><summary>' + summary + '</summary>' + body + '</details>';
  }
  function assessBox(sol) {
    var c = C(), o = c.optByNbs(sol);
    if (!o || !c.riskList().length) return '';
    var r = c.recFor(o.id); if (!r) return '';
    var h = '<div class="note fromA"><b>' + x('fromAssess') + ':</b> ';
    if (r.raw === 0) return h + esc(c.T('exNoWhy')) + '</div>';
    h += x('matchL') + ': <b>' + r.s + ' / 100</b>. <span class="chip st-' + r.scr.status + '">' + esc(c.stLabel(r.scr.status)) + '</span>';
    if (r.scr.reasons.length) h += '<ul class="rl">' + r.scr.reasons.map(function (q) { return '<li>' + esc(c.pick(q.t)) + '</li>'; }).join('') + '</ul>';
    return h + '</div>';
  }
  function costConditions(sol) {
    var c = C(), o = c.optByNbs(sol); if (!o) return '';
    var r = c.recFor(o.id); if (!r) return '';
    var items = r.conds.filter(function (k) { return k.id === '5.1' || k.id === '5.2'; }).map(function (k) {
      var t = k.u ? c.T('condU') : (c.T('condScore')(k.v) + ': ' + c.rubricText(k.i, k.v));
      return '<li><b>' + k.id + ' ' + esc(c.nm(k.i)) + '</b>: ' + esc(t) + '</li>';
    });
    return items.length ? '<div class="note warn">' + c.ico('alert') + '<div><b>' + x('condCostH') + '</b><ul class="rl">' + items.join('') + '</ul></div></div>' : '';
  }
  function limitsHtml(res) {
    var sol = res.solution_id;
    var li = ['<li>' + x('lim1') + '</li>', '<li>' + x('lim2') + '</li>'];
    if (sol === 'NBS02') li.push('<li>' + roofText() + '</li>', '<li>' + x('grpBn') + '</li>');
    if (sol === 'NBS02' || res.reference_cost) li.push('<li>' + x('refCostWarn') + '</li>');
    li.push('<li>' + x('lim3') + '</li>');
    return '<ul class="nc">' + li.join('') + '</ul><h4>' + x('ncSub') + '</h4><ul class="nc">' +
      res.not_calculated.map(function (k) { return '<li><b>' + x('nc_' + k) + '.</b> ' + x('nc_' + k + '_r') + '</li>'; }).join('') + '</ul>';
  }
  /* forPrint opens every expandable section so that the printed report is complete */
  function resultsHtml(res, forPrint) {
    var sol = res.solution_id;
    var h = '<h2>' + x('s3') + ' <span class="solname">' + esc(solName(sol)) + '</span></h2><div class="demo-box">' + C().ico('alert') + '<span>' + esc(x('demoLabel')) + '</span></div>';
    if (res.status === 'invalid') return h + '<div class="note">' + x('invalidBox') + '</div>';
    h += assessBox(sol) + warningsHtml(res);
    h += '<h3>' + x('outH') + '</h3><p class="sub">' + x('outP') + '</p>' + outputsGroups(res);
    h += '<h4>' + x('costGrp') + '</h4>' + costConditions(sol) + costTables(res) + roofReferenceBlock(res);
    if (res.reference_cost) h += '<div class="note warn">' + C().ico('alert') + '<span>' + x('refCostWarn') + '</span></div>';
    h += '<h3>' + x('limitsH') + '</h3>' + limitsHtml(res);
    h += '<h3>' + x('needH') + '</h3>' + needBlock(sol);
    var meth = '<h4>' + x('fxH') + '</h4>' + formulasTable(res) +
      '<h4>' + x('refEvH') + '</h4><p class="sub">' + x('refP') + '</p>' + evidenceBlock(sol, res) +
      '<h4>' + x('inH') + '</h4>' + inputsBlock(res) +
      '<h4>' + x('rulesH') + '</h4>' + rulesBlock(sol, res) +
      '<h4>' + x('srcH') + '</h4>' + sourcesBlock(sol);
    h += det(x('methH'), '<p class="note-s">' + x('methP') + '</p>' + meth, forPrint);
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
      '<button class="btn btn-primary" type="button" id="exPrint">' + C().ico('print') + '<span>' + x('printB') + '</span></button>' +
      '<button class="btn" type="button" id="exPrintDetail">' + C().ico('print') + '<span>' + x('detBtn') + '</span></button>' +
      '<button class="btn" type="button" id="exCsv">' + C().ico('down') + '<span>' + x('csvB') + '</span></button></div>';
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
    if (e.target && e.target.id === 'methBox') ex.openMeth = e.target.open;
  }, true);
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button'); if (!t) return;
    if (t.id === 'openExplore') { C().nav('explore'); return; }
    if (t.id === 'exBack') { C().nav('results'); return; }
    if (t.id === 'exCsv') { csv(); return; }
    if (t.id === 'exPrint') { printSummary(); return; }
    if (t.id === 'exPrintDetail') { print(); return; }
  });

  /* ---------- report ---------- */
  function tbl(head, rows, cls) {
    return '<table class="tbl' + (cls ? ' ' + cls : '') + '"><thead><tr>' + head.map(function (t) { return '<th>' + t + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function critCells(p) {
    var c = C(), lv = p.status === 'complete' ? c.LEVELS[c.lvlIdx(p.pct)] : null;
    var cmp = c.T('cmpl')(p.scored, p.n, p.unk, p.na);
    if (p.status === 'complete') return [p.sum + ' / ' + p.max + ' (' + p.pct + '%)', esc(c.nm(lv)), esc(cmp)];
    if (p.status === 'na') return [esc(c.T('naCrit')), esc(c.T('naCrit')), esc(cmp)];
    return [esc(c.T('notRated')), '–', esc(cmp + (p.scored ? '. ' + c.T('partial')(p.sum, p.max, p.scored, p.n) : ''))];
  }
  function reportHtml() {
    var c = C(), r = c.calc(), st = c.st, t = c.nm, T = c.T, o = r.ov, R = c.recs();
    var d = new Date(); var date = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    var h = '<div class="rp-head"><h1>' + x('repTitle') + '</h1><p>' + x('repDate') + ': ' + date + '</p></div>' +
      '<div class="demo-box">' + esc(x('demoLabel')) + '</div><p class="note-s">' + esc(T('protoNote')) + '</p>';
    /* 1. scope */
    var SL = T('scopeLabs');
    h += '<h2>1. ' + x('repScope') + '</h2>' + tbl(['', ''], [[esc(SL[0]), esc(st.scope.name || '–')], [esc(SL[1]), esc(c.scopeTypeLabel() || '–')], [esc(SL[2]), esc(st.scope.boundary || '–')], [esc(SL[3]), esc(st.scope.org || T('notStated'))], [esc(SL[4]), esc(st.scope.date || T('notStated'))]]);
    /* 2. assessment */
    h += '<h2>2. ' + x('repAssess') + '</h2><p class="note-s">' + x('repSep') + '</p>';
    h += '<h3>' + T('compH') + '</h3><p>' + esc(T('compTxt')(o.scored, o.unk, o.na)) + '</p>';
    h += '<h3>' + T('profH') + '</h3><p class="note-s">' + esc(T('g1H')) + '. ' + esc(T('g1P')) + '</p>' +
      tbl([T('crit'), T('score'), T('level'), x('repCompl')], [0].map(function (i) { var cc = critCells(r.per[i]); return [c.CRIT[i].id + ' ' + esc(t(c.CRIT[i])), cc[0], cc[1], cc[2]]; })) +
      '<p class="note-s">' + esc(T('g2H')) + '. ' + esc(T('g2P')) + '</p>' +
      tbl([T('crit'), T('score'), T('level'), x('repCompl')], [1, 2, 3, 4].map(function (i) { var cc = critCells(r.per[i]); return [c.CRIT[i].id + ' ' + esc(t(c.CRIT[i])), cc[0], cc[1], cc[2]]; }));
    h += '<h3>' + T('overallH') + '</h3>';
    if (o.status === 'complete') h += '<p class="rp-score"><b>' + o.sum + ' / ' + o.max + '</b> (' + o.pct + '%) &nbsp; <span class="chip ' + c.LEVELS[r.lvl].c + '">' + esc(t(c.LEVELS[r.lvl])) + '</span></p>';
    else if (o.status === 'na') h += '<p>' + esc(T('ovNA')) + '</p>';
    else h += '<p>' + esc(T('ovSupp')(o.open, c.IND.filter(function (i) { return st.sc[i.id] === 'U'; }).map(function (i) { return i.id; }).join(', '))) + '</p>';
    h += '<p class="note-s">' + esc(c.eqWeightText(r)) + ' ' + esc(T('thresholds')) + '</p>';
    var g = c.gapsData();
    function names(arr, withText) { return arr.length ? arr.map(function (i) { return esc(i.id + ' ' + t(i)) + (withText ? ': ' + esc(c.rubricText(i, st.sc[i.id])) : ''); }).join('<br>') : '–'; }
    h += '<h3>' + T('sgH') + '</h3>' + tbl(['', ''], [[T('gap0'), names(g.z, true)], [T('gap1'), names(g.o, true)], [T('strong'), names(g.t)], [T('gapU'), names(g.u)], [T('gapNA'), g.n.length ? g.n.map(function (i) { return esc(i.id + ' ' + t(i) + ': ' + (st.just[i.id] || '')); }).join('<br>') : '–']]);
    var cf = c.confCounts();
    h += '<h3>' + T('confH') + '</h3><p>' + esc(T('confTxt')(cf.n, cf.high, cf.mid, cf.low, cf.none)) + ' ' + esc(T('confNote')) + '</p>';
    h += '<h3>' + T('detH') + '</h3>' + tbl(['ID', T('colInd'), T('colAns'), T('colRat'), T('colEvd'), T('colCf')], c.IND.map(function (i) {
      return [i.id, esc(t(i)), esc(c.ansLabel(i.id)), esc(st.rat[i.id] || (st.sc[i.id] === 'NA' ? st.just[i.id] || '' : '') || '–'), esc(st.evd[i.id] || '–'), esc(c.cfLabel(i.id))];
    }), 'rp-ans');
    var yn = function (v) { return v === 'yes' ? T('yes') : v === 'no' ? T('no') : v === 'unknown' ? T('unk') : '–'; };
    h += '<p class="note-s">' + esc(T('tgtQ')) + ' ' + esc(yn(st.tgt.target)) + '. ' + esc(T('covQ')) + ' ' + esc(yn(st.tgt.cov)) + '.</p>';
    h += '<h3>' + x('ctxT') + '</h3>' + tbl(['', ''], c.CTX.map(function (cx) {
      var oo = cx.o.filter(function (z) { return z[0] === st.ctx[cx.k]; })[0];
      return [esc(t(cx)), esc(oo ? (L() === 'ar' ? oo[2] : oo[1]) : T('notStated'))];
    }).concat([[esc(T('stRisk')), esc(c.riskList().map(function (z) { return t(z); }).join('; '))]]));
    h += '<h4>' + esc(T('methA')) + '</h4><ul>' + c.methA().map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>';
    /* 3. applicability checks (optional, answered after the results) */
    h += '<h2>3. ' + x('repScreen') + '</h2><p class="note-s">' + esc(T('chkNote')) + '</p>';
    var checked = R.all.filter(function (q) { return q.scr.status !== 'unchecked'; });
    if (!checked.length) h += '<p>' + x('noChecked') + '</p>';
    else h += tbl([T('option'), x('colCat'), T('status'), T('colAns')], checked.map(function (q) {
      var ans = c.chkKeys(q.o).map(function (k) { var v = c.chkVal(k); return c.pick(c.CHK[k].q) + ' ' + (v === undefined ? T('stUn') : k === 'roof.struct' ? (v === 'yes' ? T('rsConf') : v === 'unsuitable' ? T('rsNo') : T('rsPend')) : yn(v)); }).join(' | ');
      return [esc(t(q.o)), esc(c.catText(q.o)), esc(c.stLabel(q.scr.status)), esc(ans)];
    }));
    /* 4. recommendations */
    h += '<h2>4. ' + x('repCand') + '</h2><p class="note-s">' + esc(T('recP')) + ' ' + esc(T('matchNote')) + '</p>';
    h += R.ranked.length ? tbl(['#', T('option'), x('colCat'), T('matchL'), T('status'), x('why2'), T('verL').replace(':', ''), T('condL')], R.ranked.map(function (q) {
      return [q.rank, esc(t(q.o)), esc(c.catText(q.o)), q.s + ' / 100', esc(c.stLabel(q.scr.status)), esc(c.whyText(q)),
        esc(q.scr.status === 'unchecked' ? T('unchkTxt') : q.scr.reasons.map(function (z) { return c.pick(z.t); }).join(' ') || T('candDone')),
        esc(q.conds.map(function (k) { return k.id + ' ' + t(k.i) + ': ' + (k.u ? T('stU') : c.rubricText(k.i, k.v)); }).join(' | ') || T('condNone'))];
    })) : '<p>' + esc(T('recNone')) + '</p>';
    if (R.na.length || R.other.length) {
      h += '<h3>' + x('repNotRanked') + '</h3><p class="note-s">' + esc(T('otherP')) + '</p>' + tbl([T('option'), x('colCat'), T('status'), x('why2')],
        R.na.map(function (q) { return [esc(t(q.o)), esc(c.catText(q.o)), esc(T('exNA')), esc(q.scr.reasons.map(function (z) { return c.pick(z.t); }).join(' '))]; })
          .concat(R.other.map(function (q) { return [esc(t(q.o)), esc(c.catText(q.o)), esc(T('otherH')), esc(q.raw === 0 ? T('exNoWhy') : T('exZeroWhy'))]; })));
    }
    h += '<h4>' + esc(T('methB')) + '</h4><ul>' + c.methB().map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' + c.weightsTable();
    /* 5. impact and cost */
    h += '<h2>5. ' + x('repExplore') + '</h2>';
    if (ex.sol && ex.res) h += resultsHtml(ex.res, true).replace(/<h2>.*?<\/h2>/, '<h3 class="rp-sol">' + esc(solName(ex.sol)) + '</h3>');
    else h += '<p>' + x('notExplored') + '</p>';
    h += '<p class="rp-foot">' + esc(x('demoLabel')) + '</p>';
    return h;
  }
  /* ---------- summary report: exactly two A4 pages, two inline-SVG bar charts on fixed 0 to 100 axes ---------- */
  var SH_C1 = '#17402F', SH_EN = '#7DB07F', SH_OPT = '#235A42';
  function sbar(pct, shade) {
    var g = [25, 50, 75].map(function (v) { return '<line x1="' + v + '" y1="0" x2="' + v + '" y2="14" stroke="#C4CCC6" stroke-width="1" vector-effect="non-scaling-stroke"/>'; }).join('');
    return '<svg class="ps-bar" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="0" width="100" height="14" fill="#FFFFFF" stroke="#6F7B74" stroke-width="1" vector-effect="non-scaling-stroke"/>' + g +
      (pct === null ? '' : '<rect x="0" y="2.5" width="' + pct + '" height="9" fill="' + shade + '"/>') + '</svg>';
  }
  function saxis() {
    return '<div class="ps-row ps-axis"><div></div><div class="ps-ax">' + [0, 25, 50, 75, 100].map(function (v) { return '<span style="inset-inline-start:' + v + '%">' + v + '%</span>'; }).join('') + '</div><div></div></div>';
  }
  function ltr(v) { return '<bdi dir="ltr">' + v + '</bdi>'; }
  function sTrunc(v, n) { v = String(v || '').trim(); return v.length > n ? esc(v.slice(0, n - 1).trim()) + '… <span class="ps-ref">' + x('sumSeeDet') + '</span>' : esc(v); }
  function sCtxLabel(k) {
    var c = C(), cx = c.CTX.filter(function (z) { return z.k === k; })[0], o = cx.o.filter(function (z) { return z[0] === c.st.ctx[k]; })[0];
    return o ? esc(L() === 'ar' ? o[2] : o[1]) : esc(c.T('notStated'));
  }
  /* improvement areas: gaps from the existing indicator answers. Order: score 0, then 1, then Unknown, each in indicator order.
     Capital funding (5.1) and maintenance funding (5.2) are combined into one area. Not a validated priority ranking. */
  function improvementAreas() {
    var c = C(), st = c.st, cand = [];
    c.IND.forEach(function (i, ix) { var v = st.sc[i.id]; if (v === 0 || v === 1 || v === 'U') cand.push({ i: i, ix: ix, tier: v === 0 ? 0 : v === 1 ? 1 : 2 }); });
    var fund = cand.filter(function (k) { return k.i.id === '5.1' || k.i.id === '5.2'; }), items = [];
    cand.forEach(function (k) {
      if (fund.length > 1 && (k.i.id === '5.1' || k.i.id === '5.2')) { if (k.i.id === '5.1' || fund[0] === k) { if (!items.some(function (z) { return z.group; })) items.push({ group: fund, ix: fund[0].ix, tier: Math.min(fund[0].tier, fund[1].tier) }); } return; }
      items.push({ group: [k], ix: k.ix, tier: k.tier });
    });
    items.sort(function (a, b) { return a.tier - b.tier || a.ix - b.ix; });
    return items;
  }
  function areaText(it) {
    var c = C(), st = c.st, t = c.nm;
    var parts = it.group.map(function (k) {
      var v = st.sc[k.i.id];
      return '<b>' + esc(k.i.id + ' ' + t(k.i)) + '</b>' + (v === 'U' ? ': ' + esc(x('sumImpUnk')) : ' (' + esc(c.T('condScore')(v)) + '): ' + esc(c.rubricText(k.i, v)));
    });
    return parts.join('<br>');
  }
  function sumPage1() {
    var c = C(), r = c.calc(), st = c.st, T = c.T, t = c.nm, o = r.ov;
    var scaleLab = c.scopeTypeLabel();
    var h = '<section class="pg"><div class="ps-brand">NBS4MED</div><h1 class="ps-title">' + esc(x('sumTitle')) + '</h1>' +
      '<dl class="ps-meta"><div><dt>' + x('sumArea') + '</dt><dd>' + sTrunc(st.scope.name || '–', 110) + '</dd></div><div><dt>' + x('sumScale') + '</dt><dd>' + sTrunc(scaleLab || '–', 60) + '</dd></div><div><dt>' + x('sumDate') + '</dt><dd>' + esc(st.scope.date || T('notStated')) + '</dd></div></dl>' +
      '<p class="ps-ctx"><b>' + x('sumCtx') + '.</b> ' + x('sumRisks') + ': ' + esc(c.riskList().map(function (z) { return t(z); }).join('; ') || '–') + '. ' + x('sumDens') + ': ' + sCtxLabel('density') + '. ' + x('sumLand') + ': ' + sCtxLabel('land') + '.</p>' +
      '<h2 class="ps-h">' + esc(T('profH')) + '</h2><p class="ps-sub">' + x('sumProfSub') + '</p><div class="ps-chart">';
    function row(i, shade) {
      var p = r.per[i], cr = c.CRIT[i], name = '<div class="ps-name"><b>' + cr.id + '</b> ' + esc(t(cr)) + '</div>';
      if (p.status === 'complete') {
        var lv = c.LEVELS[c.lvlIdx(p.pct)];
        return '<div class="ps-row">' + name + sbar(p.pct, shade) + '<div class="ps-val"><b>' + ltr(p.pct + '%') + '</b> · ' + esc(t(lv)) + '<span class="ps-pts">' + ltr(p.sum + ' / ' + p.max) + ' ' + (L() === 'ar' ? 'نقطة' : 'points') + '</span></div></div>';
      }
      var msg = p.status === 'na' ? T('naCrit') : (p.unk ? T('notRated') : x('sumNotRatedUn'));
      return '<div class="ps-row">' + name + '<div class="ps-nobar" style="grid-column:2 / span 2"><b>' + esc(msg) + '</b><span class="ps-pts">' + esc(x('sumCrit')(p.scored, p.n, p.unk, p.un, p.na)) + '</span></div></div>';
    }
    h += '<div class="ps-grp">' + esc(T('g1H')) + '</div>' + row(0, SH_C1) +
      '<div class="ps-grp en">' + esc(T('g2H')) + '</div>' + [1, 2, 3, 4].map(function (i) { return row(i, SH_EN); }).join('') + saxis() + '</div>';
    /* overall: secondary */
    h += '<p class="ps-overall"><b>' + esc(T('overallH')) + ':</b> ';
    if (o.status === 'complete') h += '<b>' + ltr(o.sum + ' / ' + o.max) + ' · ' + ltr(o.pct + '%') + '</b> · ' + esc(t(c.LEVELS[r.lvl])) + '. ' + esc(T('naDen') && o.na ? T('naDen')(o.max) : '');
    else if (o.status === 'na') h += esc(T('ovNA'));
    else h += esc(T('ovSupp')(o.open, c.IND.filter(function (i) { return st.sc[i.id] === 'U'; }).map(function (i) { return i.id; }).join(', ')));
    h += '</p>';
    var cf = c.confCounts(), un = o.un;
    h += '<div class="ps-two"><div class="ps-box"><b>' + esc(x('sumCompl')(o.scored, o.unk, un, o.na)) + '</b></div>' +
      '<div class="ps-box">' + esc(x('sumConf')(cf.n, cf.high, cf.mid, cf.low, cf.none)) + '. ' + esc(x('sumConfNote')) + '</div></div>';
    var areas = improvementAreas(), shown = areas.slice(0, 3);
    h += '<h2 class="ps-h">' + esc(x('sumImpH')) + '</h2><p class="ps-sub">' + x('sumImpN') + '</p>';
    if (!areas.length) h += '<p>' + x('sumImpNone') + '</p>';
    else {
      h += '<ol class="ps-areas">' + shown.map(function (it) { return '<li>' + areaText(it) + '</li>'; }).join('') + '</ol>';
      if (areas.length > 3) h += '<p class="ps-more">' + x('sumImpMore')(areas.length - 3) + '</p>';
    }
    return h + '<div class="ps-foot"><span>' + x('sumFoot1') + '</span><b>' + x('sumPage')(1) + '</b></div></section>';
  }
  function evRef(sol, id) {
    var rec = E.evidenceCards(sol).records.filter(function (z) { return z.evidence_id === id; })[0];
    return rec ? id + ' · ' + rec.location_context + ', ' + rec.price_or_publication_year + ' · ' + (rec.source_ids || []).join(', ') : id;
  }
  function sumRoofText() { var rs = C().roofStruct(); return rs === 'confirmed' ? x('sumRoofOk') : rs === 'unsuitable' ? x('sumRoofNo') : x('sumRoof'); }
  var QTY_GROUPS = ['quantity', 'resource', 'context', 'storage_capacity', 'event_volume', 'volume_balance'];
  function sumExplore() {
    var c = C(), h = '<h2 class="ps-h">' + esc(x('exploreH')) + '</h2>';
    var b = ex.sol && ex.by[ex.sol];
    if (!b) return h + '<p>' + x('sumExNone') + '</p>';
    var res = E.calculate(ex.sol, b.vals, b.touched, b.prices);   /* always the current solution and current inputs */
    var rec = recOf(ex.sol), def = E.solutionDef(ex.sol);
    h += '<p class="ps-exh"><b>' + esc(solName(ex.sol)) + '</b>' + (rec ? ' · ' + esc(c.T('screenL')) + ': <b>' + esc(c.stLabel(rec.scr.status)) + '</b>' : '') + '</p>';
    if (res.status !== 'ok') return h + '<p>' + x('sumExNA') + '</p>';
    var inp = def.inputs.filter(function (d) { return d.primary && d.type !== 'boolean'; }).map(function (d) {
      var v = res.inputs[d.id], pv = res.provenance[d.id];
      var lab = esc((L() === 'ar' ? d.label_ar : d.label_en));
      if (v === null || v === undefined) return lab + ' <i>' + esc(x('sumNotEntered')) + '</i>';
      return lab + ' <b>' + ltr(esc(fmtN(v))) + '</b>' + (d.unit ? ' ' + esc(d.unit) : '') + ' (' + esc(pv === 'user_entered' ? x('tagUser') : x('tagDefault')) + ')';
    });
    h += '<p class="ps-in"><b>' + x('sumInputs') + ':</b> ' + inp.join(' · ') + '</p>';
    if (ex.sol === 'NBS02') h += '<div class="ps-lim ps-warn"><b>' + esc(sumRoofText()) + '</b></div>';
    function val(o) {
      return o.unavailable ? '<i>' + esc(x('unavailable')) + '</i>' : '<b>' + ltr(esc(fmtRange(o))) + '</b> ' + esc(o.unit);
    }
    function li(o) { return '<div class="ps-kv"><span>' + esc(x('o_' + o.id)) + '</span><span>' + val(o) + ' <em>' + esc(x('basis_' + o.basis)) + '</em></span></div>'; }
    var Q = res.outputs.filter(function (o) { return QTY_GROUPS.indexOf(o.group) >= 0; }), I = res.outputs.filter(function (o) { return QTY_GROUPS.indexOf(o.group) < 0; });
    if (Q.length) h += '<div class="ps-sec"><b>' + x('sumQty') + '</b><div class="ps-grid2">' + Q.map(li).join('') + '</div></div>';
    h += '<div class="ps-sec"><b>' + x('sumImp') + '</b>';
    if (I.length) {
      h += I.map(function (o) {
        var note = o.unavailable && o.reason === 'small_event' ? '<div class="ps-lim">' + esc(x('r_small_event')) + '</div>' : '';
        var src = (o.evidence || []).map(function (id) { return evRef(ex.sol, id); }).join('; ');
        return li(o) + note + '<div class="ps-lim">' + esc(x('grpBn')) + (src ? ' <span class="ps-ref">' + esc(x('sumSrc')) + ': ' + esc(src) + '</span>' : '') + '</div>';
      }).join('');
    } else h += '<div class="ps-lim">' + esc(x('sumNoImp')(res.not_calculated.map(function (k) { return x('nc_' + k); }).join('; '))) + '</div>';
    h += '</div>';
    var cs = res.costs, tc = cs.capex.total, ta = cs.annual.total;
    h += '<div class="ps-sec"><b>' + x('sumCostH') + '</b>' +
      '<div class="ps-kv"><span>' + esc(x('capex')) + '</span><span>' + (tc ? '<b>' + ltr(eur(tc.low) + ' – ' + eur(tc.high)) + '</b> EUR (' + esc(x('base')) + ' ' + ltr(eur(tc.base)) + ')' : '<i>' + esc(x('unavailable')) + '</i>') + ' <em>' + esc(x('basis_demo_assumption')) + '</em></span></div>' +
      '<div class="ps-kv"><span>' + esc(x('annual')) + '</span><span>' + (ta ? '<b>' + ltr(eur(ta.low) + ' – ' + eur(ta.high)) + '</b> EUR (' + esc(x('base')) + ' ' + ltr(eur(ta.base)) + ')' : '<i>' + esc(x('unavailable')) + '</i>') + ' <em>' + esc(x('basis_demo_assumption')) + '</em></span></div>';
    if (res.reference_cost && res.reference_cost.scaled) { var sc = res.reference_cost.scaled; h += '<div class="ps-lim">' + esc(x('sumRefCost')(eur(sc.low), eur(sc.high), eur(sc.median))) + '</div>'; }
    h += '<div class="ps-lim">' + esc(x('sumNoYear')) + '</div></div>';
    return h;
  }
  function sumPage2() {
    var c = C(), t = c.nm, R = c.recs(), top = R.ranked.slice(0, 3);
    var h = '<section class="pg"><div class="ps-brand">NBS4MED</div><h2 class="ps-h ps-h-top">' + esc(x('sumOptH')) + '</h2><p class="ps-note"><b>' + x('sumMatchNote') + '</b></p>';
    if (!top.length) {
      h += '<div class="ps-empty"><b>' + x('sumNoRec') + '</b><br>' + esc(x('sumNoRecN')(R.na.length, R.other.length)) + '</div>';
    } else {
      h += '<div class="ps-chart"><div class="ps-cap">' + x('sumMatch') + '</div>' + top.map(function (q) {
        return '<div class="ps-row"><div class="ps-name"><b>' + q.rank + '.</b> ' + esc(t(q.o)) + '<span class="ps-st">' + esc(c.T('screenL')) + ': <b>' + esc(c.stLabel(q.scr.status)) + '</b></span></div>' + sbar(q.s, SH_OPT) + '<div class="ps-val"><b>' + ltr(q.s + ' / 100') + '</b></div></div>';
      }).join('') + saxis() + '</div>';
      if (top.some(function (q) { return q.scr.status === 'unchecked'; })) h += '<p class="ps-sub">' + esc(c.T('stUn')) + ': ' + esc(c.T('unchkTxt')) + '</p>';
      var cnt = {};
      top.forEach(function (q) { q.scr.reasons.forEach(function (z) { var k = c.pick(z.t); cnt[k] = (cnt[k] || 0) + 1; }); });
      var sharedChk = Object.keys(cnt).filter(function (k) { return cnt[k] > 1; });
      h += top.map(function (q) {
        var specific = q.scr.reasons.map(function (z) { return c.pick(z.t); }).filter(function (k) { return sharedChk.indexOf(k) < 0; });
        if (q.conds.some(function (k) { return k.id === '3.2'; }) && q.o.cx >= 1) specific.push(c.T('condCx')(CLAB_CX(q.o)));
        return '<div class="ps-opt"><b>' + q.rank + '. ' + esc(t(q.o)) + '</b> (' + esc(c.catText(q.o)) + ', ' + (L() === 'ar' ? 'مؤقتة' : 'provisional') + '): ' + esc(c.whyText(q)) +
          (specific.length ? ' <span class="ps-spec">' + esc(specific.join(' ')) + '</span>' : '') + '</div>';
      }).join('');
      var conds = top[0].conds;
      h += '<div class="ps-shared"><b>' + x('sumShared') + '</b>' + (conds.length ? '<ul>' + conds.map(function (k) { return '<li><b>' + esc(k.id + ' ' + t(k.i)) + '</b>: ' + esc(k.u ? c.T('condU') : c.T('condScore')(k.v) + ': ' + c.rubricText(k.i, k.v)) + '</li>'; }).join('') + '</ul>' : '<div>' + esc(c.T('condNone')) + '</div>') +
        (sharedChk.length ? '<div class="ps-sharedchk"><b>' + x('sumSharedChk') + ':</b> ' + esc(sharedChk.join(' ')) + '</div>' : '') + '</div>';
    }
    h += sumExplore();
    return h + '<div class="ps-foot"><span>' + x('sumFoot2') + '</span><b>' + x('sumPage')(2) + '</b></div></section>';
  }
  function CLAB_CX(o) { return L() === 'ar' ? ['منخفض', 'متوسط', 'مرتفع'][o.cx] : ['Low', 'Medium', 'High'][o.cx]; }
  function summaryHtml() { return sumPage1() + sumPage2(); }
  function printSummary() {
    var box = $('#printReport');
    if (!box) { box = document.createElement('div'); box.id = 'printReport'; document.body.appendChild(box); }
    box.setAttribute('dir', L() === 'ar' ? 'rtl' : 'ltr'); box.setAttribute('lang', L());
    box.className = 'ps';
    box.innerHTML = summaryHtml();
    window.print();
  }

  function print() {
    var box = $('#printReport');
    if (!box) { box = document.createElement('div'); box.id = 'printReport'; document.body.appendChild(box); }
    box.setAttribute('dir', L() === 'ar' ? 'rtl' : 'ltr');
    box.setAttribute('lang', L());
    box.className = '';
    box.innerHTML = reportHtml();
    window.print();
  }

  /* ---------- CSV ---------- */
  /* columns: section, item, value, unit, basis, notes, rationale, evidence, confidence */
  function csvRows() {
    var c = C(), r = c.calc(), st = c.st, R = c.recs();
    var rows = [['section', 'item', 'value', 'unit', 'basis', 'notes', 'rationale', 'evidence or source', 'confidence', 'applicability status', 'solution category']];
    function add(a) { while (a.length < 11) a.push(''); rows.push(a); }
    function optCols(q) { return ['', '', '', q.scr.status === 'unchecked' ? 'Not yet checked' : q.scr.status === 'cand' ? 'Preliminary candidate' : q.scr.status === 'verify' ? 'Requires verification' : 'Not applicable', c.catText(q.o) + ' (provisional)']; }
    add(['label', 'status', E_label(), '', '', 'Preliminary prototype. Scores are not official scores of any external standard.']);
    add(['assessment scope', 'area name', st.scope.name, '', 'user input', '']);
    add(['assessment scope', 'scope', c.scopeTypeLabel('en'), '', 'user input', '']);
    add(['assessment scope', 'boundary description', st.scope.boundary, '', 'user input', 'All answers refer to this area and its current situation']);
    add(['assessment scope', 'organisation', st.scope.org, '', 'user input', '']);
    add(['assessment scope', 'assessment date', st.scope.date, '', 'user input', '']);
    c.CTX.forEach(function (cx) { var o = cx.o.filter(function (z) { return z[0] === st.ctx[cx.k]; })[0]; add(['assessment context', cx.en, o ? o[1] : 'Not specified', '', 'user input', cx.opt ? 'optional, not scored, not used in ranking' : 'not scored']); });
    add(['assessment context', 'climate risks and environmental challenges', c.riskList().map(function (z) { return z.en; }).join('; '), '', 'user input', '']);
    add(['assessment local target', 'local NBS or green-blue coverage target exists', st.tgt.target || 'not answered', 'yes/no/unknown', 'user input', 'Indicator 1.2']);
    add(['assessment local target', 'current coverage known', st.tgt.cov || 'not answered', 'yes/no/unknown', 'user input', 'Indicator 1.2']);
    c.IND.forEach(function (i) {
      add(['assessment indicator', i.id + ' ' + i.en, c.ansCsv(i.id), '0-2 scale (provisional project rubric)', 'user input',
        c.ansState(i.id) === 'scored' ? 'scored: ' + c.rubricText(i, st.sc[i.id]).replace(/^/, '') : c.ansState(i.id) === 'na' ? 'Not applicable, excluded from score. Justification: ' + (st.just[i.id] || '') : c.ansState(i.id) === 'unknown' ? 'Unknown: missing information, excluded from score, not 0' : 'Unanswered',
        st.rat[i.id] || '', st.evd[i.id] || '', st.cf[i.id] ? c.cfLabel(i.id, 'en') : '']);
    });
    c.CRIT.forEach(function (cr, i) {
      var p = r.per[i];
      var v = p.status === 'complete' ? p.sum + '/' + p.max : p.status === 'na' ? 'Not applicable' : 'Not rated (Unknown answers)';
      add(['assessment criterion', cr.id + ' ' + cr.en, v, 'points', 'calculated',
        (p.status === 'complete' ? p.pct + '%; level ' + c.LEVELS[c.lvlIdx(p.pct)].en + ' (provisional threshold); ' : '') + p.scored + ' of ' + p.n + ' indicators scored, ' + p.unk + ' Unknown, ' + p.na + ' Not applicable' + (p.status === 'incomplete' && p.scored ? '; available points ' + p.sum + '/' + p.max + ' (not a criterion score)' : '')]);
    });
    var o = r.ov;
    add(['assessment completeness', 'indicators with numeric score', o.scored + ' of 14', '', 'calculated', o.unk + ' Unknown; ' + o.na + ' Not applicable']);
    add(['assessment overall', 'score', o.status === 'complete' ? o.sum + '/' + o.max : o.status === 'na' ? 'Not applicable' : 'Not shown (Unknown answers)', 'points', 'calculated', o.status === 'complete' ? o.pct + '%; equal weight per indicator; provisional thresholds' : 'overall percentage suppressed because an indicator is Unknown']);
    if (o.status === 'complete') add(['assessment overall', 'level', c.LEVELS[r.lvl].en, '', 'calculated', 'provisional project thresholds']);
    var cf = c.confCounts();
    add(['assessment confidence summary', 'scored indicators by confidence', 'documented evidence ' + cf.high + '; staff estimate ' + cf.mid + '; informal judgement ' + cf.low + '; not stated ' + cf.none, '', 'user input', 'confidence does not change scores']);
    Object.keys(c.CHK).forEach(function (k) {
      var raw = st.scr[k]; if (raw === undefined) return;
      var val = k === 'roof.struct' ? ({ confirmed: 'confirmed suitable', pending: 'assessment pending or unknown', unsuitable: 'assessed and unsuitable' })[c.roofStruct()] : raw;
      var apply = c.OPT.filter(function (o) { return c.RULE[o.id].chk.indexOf(k) >= 0; }).map(function (o) { return o.en; }).join('; ');
      add(['applicability check', c.CHK[k].q[0], val, k === 'roof.struct' ? 'confirmed/pending/unsuitable' : 'yes/no/unknown', 'user input', 'screening only, not engineering approval; applies to: ' + apply + (k === 'roof.struct' && raw === 'no' ? '; earlier answer No read as assessment pending' : '')]);
    });
    R.ranked.forEach(function (q) {
      add(['recommendation', '#' + q.rank + ' ' + q.o.en, q.s + ' / 100', 'rule-based match score', c.stLabel(q.scr.status),
        'why: ' + c.whyText(q) + (q.scr.reasons.length ? ' | to verify: ' + q.scr.reasons.map(function (z) { return z.t[0]; }).join(' ') : '') +
        (q.conds.length ? ' | conditions: ' + q.conds.map(function (k) { return k.id + ' ' + k.i.en + ': ' + (k.u ? 'Unknown' : 'score ' + k.v); }).join('; ') : '') + (q.o.nbs ? '' : ' | Impact/cost module not yet available')].concat(optCols(q)));
    });
    R.na.forEach(function (q) { add(['option excluded', q.o.en, 'Not applicable', '', 'applicability check', q.scr.reasons.map(function (z) { return z.t[0]; }).join(' ')].concat(optCols(q).slice(0))); });
    R.other.forEach(function (q) { add(['other option', q.o.en, q.s + ' / 100', 'rule-based match score', 'rule-based match', (q.raw === 0 ? 'None of the selected risks is a target of this option' : 'Land need exceeds the public land available') + '; not recommended; not a finding of technical unsuitability'].concat(optCols(q))); });
    if (ex.sol && ex.res && ex.res.status === 'ok') {
      var res = ex.res;
      add(['explore', 'solution', solName(ex.sol), '', '', '']);
      Object.keys(res.inputs).forEach(function (k) { add(['explore input', k, res.inputs[k], '', res.provenance[k] || '', '']); });
      res.outputs.forEach(function (op) {
        var v = op.unavailable ? 'unavailable' : (op.value !== undefined ? op.value : (round(op.low) + ' to ' + round(op.high) + (op.base !== null && op.base !== undefined ? ' (base ' + round(op.base) + ')' : '')));
        add(['explore output', op.id, v, op.unit, op.basis, op.formula + (op.unavailable ? '; ' + op.reason : '') + (op.basis === 'published_reference' ? '; literature-based scenario, not a validated local forecast' : '')]);
      });
      ['capex', 'annual'].forEach(function (k) {
        res.costs[k].components.forEach(function (cm) {
          if (!cm.included) { add(['explore cost ' + k, cm.id, 'not included', 'EUR', '', cm.reason]); return; }
          if (cm.unavailable) { add(['explore cost ' + k, cm.id, 'unavailable', 'EUR', '', '']); return; }
          add(['explore cost ' + k, cm.id + ' (' + round(cm.quantity) + ' ' + cm.qty_unit + ')', round(cm.subtotal.low) + ' to ' + round(cm.subtotal.high) + ' (base ' + round(cm.subtotal.base) + ')', 'EUR', cm.source_class, 'illustrative scenario range, not a confidence interval; no price year']);
        });
        var tt = res.costs[k].total;
        add(['explore cost ' + k, 'total', tt ? round(tt.low) + ' to ' + round(tt.high) + ' (base ' + round(tt.base) + ')' : 'unavailable', 'EUR', 'demo_assumption', 'not a local cost']);
      });
      if (res.reference_cost && res.reference_cost.scaled) {
        var sc = res.reference_cost.scaled;
        add(['explore reference', 'Hamburg extensive roofs scaled by area', round(sc.low) + ' to ' + round(sc.high) + ' (median ' + round(sc.median) + ')', 'EUR', 'published_reference', 'source example, 2017 prices, VAT incl., waterproofing excluded; reference costs from another place and year are not current local prices']);
      }
      if (ex.sol === 'NBS02') add(['explore limitation', 'roof structural suitability', 'requires verification', '', '', X.roofStruct.en]);
      res.not_calculated.forEach(function (k) { add(['explore not calculated', k, 'not calculated', '', '', X['nc_' + k + '_r'].en]); });
    } else add(['explore', 'status', 'not completed', '', '', '']);
    add(['note', '', E_label(), '', '', '']);
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
    render: render, ctaHtml: ctaHtml, csv: csv, print: print, printSummary: printSummary, summaryHtml: summaryHtml, improvementAreas: improvementAreas, open: openSol,
    reportHtml: reportHtml, csvRows: csvRows, state: ex, label: function () { return x('demoLabel'); },
    exploreTitle: function () { return x('exploreH'); }
  };
})();
