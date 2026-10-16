(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var lang='en';

/* ---------- data ---------- */
/* Indicators, criteria and the 0 to 2 scale are unchanged. The scoring descriptions (r) are a PROVISIONAL project
   rubric: they are for partner review against the PROMEA framework and the NBS repository. */
var CRIT=[
 {id:'C1',en:'NBS Integration Status',ar:'حالة دمج الحلول القائمة على الطبيعة',sh:'Integration',shAr:'الدمج'},
 {id:'C2',en:'Policy & Planning',ar:'السياسات والتخطيط',sh:'Policy',shAr:'السياسات'},
 {id:'C3',en:'Institutional & Technical Capacity',ar:'القدرات المؤسسية والفنية',sh:'Capacity',shAr:'القدرات'},
 {id:'C4',en:'Stakeholder Engagement',ar:'إشراك أصحاب المصلحة',sh:'Engagement',shAr:'الإشراك'},
 {id:'C5',en:'Funding & Sustainability',ar:'التمويل والاستدامة',sh:'Funding',shAr:'التمويل'}
];
var IND=[
 {id:'1.1',c:0,en:'NBS inventory',ar:'جرد الحلول القائمة على الطبيعة',h:'A mapped list of existing NBS, such as parks, green roofs, wetlands and tree corridors.',ha:'قائمة مرسومة على خريطة بالحلول القائمة، مثل الحدائق والأسطح الخضراء والأراضي الرطبة وممرات الأشجار.',
  r:[['No inventory of existing NBS exists.','لا يوجد جرد للحلول القائمة على الطبيعة.'],
     ['An inventory exists but is incomplete or needs updating.','يوجد جرد لكنه غير مكتمل أو يحتاج إلى تحديث.'],
     ['An inventory covers the assessment area and records NBS type, location and condition.','يغطي الجرد منطقة التقييم ويسجل نوع كل حل وموقعه وحالته.']]},
 {id:'1.2',c:0,en:'Coverage of public space',ar:'تغطية الحلول في الفضاء العام',h:'Share of public space with green or blue features. A local target and a measurement are helpful but not required.',ha:'نسبة الفضاء العام ذي العناصر الخضراء أو الزرقاء. الهدف المحلي والقياس مفيدان لكنهما غير مطلوبين.',
  r:[['Public space with green or blue features is known to be minimal, or no such features are present in the area.','الفضاء العام ذو العناصر الخضراء أو الزرقاء محدود جدًا بحسب المعلومات المتاحة، أو لا توجد عناصر كهذه في المنطقة.'],
     ['Some public space has green or blue features, but coverage is partial or uneven, or falls short of a local target where one exists.','بعض الفضاء العام فيه عناصر خضراء أو زرقاء، لكن التغطية جزئية أو غير متوازنة، أو دون الهدف المحلي إن وُجد.'],
     ['Green or blue features are widespread across the public space of the area, and meet a local target where one exists.','العناصر الخضراء أو الزرقاء منتشرة في الفضاء العام بالمنطقة، وتحقق الهدف المحلي إن وُجد.']]},
 {id:'1.3',c:0,en:'Link to grey infrastructure',ar:'التكامل مع البنية التحتية الرمادية',h:'NBS are planned together with drainage, roads and buildings, not added afterwards.',ha:'تُخطَّط الحلول مع الصرف والطرق والمباني، لا بعدها.',
  r:[['NBS are planned separately from drainage, roads and buildings, or not linked to them at all.','تُخطَّط الحلول بمعزل عن الصرف والطرق والمباني، أو دون أي ربط بها.'],
     ['Some projects are coordinated with grey infrastructure, but this is not routine practice.','تُنسَّق بعض المشاريع مع البنية التحتية الرمادية، لكن ذلك ليس ممارسة معتادة.'],
     ['NBS are routinely planned together with drainage, roads and buildings in the area.','تُخطَّط الحلول بانتظام مع الصرف والطرق والمباني في المنطقة.']]},
 {id:'2.1',c:1,en:'NBS in strategic plans',ar:'إدراج الحلول في الخطط الاستراتيجية',h:'NBS appear in the climate adaptation plan, master plan or sector plans.',ha:'تظهر الحلول في خطة التكيف المناخي أو المخطط العام أو الخطط القطاعية.',
  r:[['NBS are not mentioned in the climate adaptation, master or sector plans that apply to the area.','لا تُذكر الحلول في خطط التكيف المناخي أو المخطط العام أو الخطط القطاعية السارية على المنطقة.'],
     ['NBS are mentioned in some plans, but without specific measures, locations or responsibilities.','تُذكر الحلول في بعض الخطط، لكن دون إجراءات أو مواقع أو مسؤوليات محددة.'],
     ['NBS appear in the applicable plans with specific measures, locations or responsibilities.','تظهر الحلول في الخطط السارية مع إجراءات أو مواقع أو مسؤوليات محددة.']]},
 {id:'2.2',c:1,en:'Regulation and standards',ar:'المتطلبات التنظيمية',h:'Zoning, building codes or green-area standards require or reward NBS.',ha:'تشترط أنظمة التقسيم أو البناء أو معايير المساحات الخضراء الحلول أو تكافئها.',
  r:[['No zoning rule, building code or green-area standard requires or rewards NBS.','لا يوجد نظام تقسيم أو كود بناء أو معيار مساحات خضراء يشترط الحلول أو يكافئها.'],
     ['Some rules or standards encourage NBS, but they are voluntary, partial or rarely applied.','تشجع بعض الأنظمة أو المعايير الحلول، لكنها طوعية أو جزئية أو نادرًا ما تُطبَّق.'],
     ['Rules or standards require or reward NBS and are applied to projects in the area.','تشترط الأنظمة أو المعايير الحلول أو تكافئها وتُطبَّق على المشاريع في المنطقة.']]},
 {id:'2.3',c:1,en:'Targets and monitoring',ar:'الأهداف والرصد',h:'Measurable NBS targets exist and are reported on a regular schedule.',ha:'توجد أهداف قابلة للقياس تُرفع عنها تقارير دورية.',
  r:[['No measurable NBS targets exist.','لا توجد أهداف قابلة للقياس للحلول.'],
     ['Targets exist but are not measurable, or progress is not reported regularly.','توجد أهداف لكنها غير قابلة للقياس، أو لا يُرفع تقرير دوري عن التقدم.'],
     ['Measurable NBS targets exist and progress is reported on a regular schedule.','توجد أهداف قابلة للقياس ويُرفع تقرير دوري عن التقدم.']]},
 {id:'3.1',c:2,en:'Dedicated staff or unit',ar:'كوادر أو وحدة مختصة',h:'A unit or named staff are responsible for NBS across departments.',ha:'وحدة أو موظفون محددون مسؤولون عن الحلول عبر الإدارات.',
  r:[['No unit or named staff are responsible for NBS.','لا توجد وحدة أو موظفون محددون مسؤولون عن الحلول.'],
     ['Staff handle NBS alongside other duties, or responsibility is limited to one department.','يتولى موظفون الحلول إلى جانب مهام أخرى، أو تقتصر المسؤولية على إدارة واحدة.'],
     ['A unit or named staff are responsible for NBS and work across departments.','وحدة أو موظفون محددون مسؤولون عن الحلول ويعملون عبر الإدارات.']]},
 {id:'3.2',c:2,en:'Technical know-how',ar:'الخبرة الفنية والأدلة الإرشادية',h:'Staff or contractors can design, build and manage NBS; guidance documents exist.',ha:'يستطيع الموظفون أو المقاولون تصميم الحلول وتنفيذها وإدارتها، وتوجد أدلة إرشادية.',
  r:[['Staff and contractors have little or no experience in designing, building or managing NBS, and no guidance exists.','لدى الموظفين والمقاولين خبرة قليلة أو معدومة في تصميم الحلول وتنفيذها وإدارتها، ولا توجد أدلة إرشادية.'],
     ['Some experience or guidance exists, but it is limited to certain NBS types or relies on outside support.','توجد بعض الخبرة أو الأدلة الإرشادية، لكنها تقتصر على أنواع معينة من الحلول أو تعتمد على دعم خارجي.'],
     ['Staff or contractors can design, build and manage NBS, and guidance documents are available.','يستطيع الموظفون أو المقاولون تصميم الحلول وتنفيذها وإدارتها، وتتوفر أدلة إرشادية.']]},
 {id:'3.3',c:2,en:'Data and monitoring tools',ar:'البيانات وأدوات الرصد',h:'Climate, land-use and NBS data are available and used in decisions.',ha:'بيانات المناخ واستخدام الأراضي والحلول متاحة وتُستخدم في القرار.',
  r:[['Climate, land-use and NBS data are not available, or are not used in decisions.','بيانات المناخ واستخدام الأراضي والحلول غير متاحة، أو لا تُستخدم في القرار.'],
     ['Some data exist, but they are incomplete, out of date or only occasionally used in decisions.','توجد بعض البيانات، لكنها غير مكتملة أو قديمة أو لا تُستخدم في القرار إلا أحيانًا.'],
     ['Climate, land-use and NBS data are available and used in decisions.','بيانات المناخ واستخدام الأراضي والحلول متاحة وتُستخدم في القرار.']]},
 {id:'4.1',c:3,en:'Community participation',ar:'مشاركة المجتمع في التصميم',h:'Residents help set priorities or design NBS, not only comment at the end.',ha:'يشارك السكان في تحديد الأولويات أو التصميم، لا في إبداء الرأي بعد الانتهاء فقط.',
  r:[['Residents are not involved in planning or designing NBS.','لا يشارك السكان في تخطيط الحلول أو تصميمها.'],
     ['Residents are consulted, but mostly after the main decisions have been made.','يُستشار السكان، لكن غالبًا بعد اتخاذ القرارات الرئيسية.'],
     ['Residents help set priorities or design NBS from an early stage.','يساعد السكان في تحديد الأولويات أو تصميم الحلول منذ مرحلة مبكرة.']]},
 {id:'4.2',c:3,en:'Coordination across departments and owners',ar:'التنسيق بين الإدارات والقطاع الخاص',h:'Departments, utilities, NGOs and private owners coordinate on NBS actions.',ha:'تنسق الإدارات والمرافق والمنظمات غير الحكومية والملاك الخواص إجراءات الحلول.',
  r:[['Departments, utilities and private owners do not coordinate on NBS actions.','لا تنسق الإدارات والمرافق والملاك الخواص إجراءات الحلول.'],
     ['Coordination happens case by case, or only between some of the actors.','يحدث التنسيق حالة بحالة، أو بين بعض الأطراف فقط.'],
     ['Departments, utilities and private owners coordinate on NBS actions through a regular mechanism.','تنسق الإدارات والمرافق والملاك الخواص إجراءات الحلول عبر آلية منتظمة.']]},
 {id:'5.1',c:4,en:'Capital funding',ar:'تمويل رأس المال',h:'Funding for building NBS is secured or realistically available.',ha:'تمويل الإنشاء مضمون أو متاح بصورة واقعية.',
  r:[['No funding for building NBS is secured or realistically available.','لا يوجد تمويل مضمون أو متاح بصورة واقعية لإنشاء الحلول.'],
     ['Some funding is secured or likely, but it does not cover the planned NBS.','يوجد بعض التمويل المضمون أو المرجح، لكنه لا يغطي الحلول المخطط لها.'],
     ['Funding for building the planned NBS is secured or realistically available.','تمويل إنشاء الحلول المخطط لها مضمون أو متاح بصورة واقعية.']]},
 {id:'5.2',c:4,en:'Long-term maintenance budget',ar:'ميزانية الصيانة طويلة الأجل',h:'A long-term budget covers upkeep, watering and replacement.',ha:'ميزانية طويلة الأجل تغطي الصيانة والري والاستبدال.',
  r:[['No budget covers maintenance, watering or replacement of NBS.','لا توجد ميزانية تغطي صيانة الحلول أو ريّها أو استبدالها.'],
     ['A maintenance budget exists, but it is short-term, partial or not guaranteed.','توجد ميزانية للصيانة، لكنها قصيرة الأجل أو جزئية أو غير مضمونة.'],
     ['A long-term budget covers upkeep, watering and replacement.','ميزانية طويلة الأجل تغطي الصيانة والري والاستبدال.']]},
 {id:'5.3',c:4,en:'Co-benefits valued in decisions',ar:'تقدير الفوائد المشتركة في القرار',h:'Benefits such as cooling, health and flood protection are counted in funding decisions.',ha:'تُحتسب فوائد مثل التبريد والصحة والحماية من الفيضان في قرارات التمويل.',
  r:[['Co-benefits such as cooling, health and flood protection are not counted in funding decisions.','لا تُحتسب الفوائد المشتركة مثل التبريد والصحة والحماية من الفيضان في قرارات التمويل.'],
     ['Co-benefits are mentioned in funding decisions, but are not measured or valued.','تُذكر الفوائد المشتركة في قرارات التمويل، لكنها لا تُقاس ولا تُقدَّر.'],
     ['Co-benefits are measured or valued and counted in funding decisions.','تُقاس الفوائد المشتركة أو تُقدَّر وتُحتسب في قرارات التمويل.']]}
];
var SCOPES=[['site','Site','موقع'],['neighbourhood','Neighbourhood','حي'],['municipality','Municipality','بلدية'],['other','Other','أخرى']];
var CTX=[
 {k:'density',en:'Urban density',ar:'الكثافة العمرانية',o:[['low','Low','منخفضة'],['mid','Medium','متوسطة'],['high','High','مرتفعة']]},
 {k:'land',en:'Public land available for NBS',ar:'توفر الأراضي العامة للحلول',o:[['low','Limited','محدود'],['mid','Moderate','متوسط'],['high','Abundant','وافر']]},
 {k:'income',opt:true,en:'Income level of the area',ar:'مستوى الدخل في المنطقة',o:[['low','Low','منخفض'],['mid','Middle','متوسط'],['high','High','مرتفع'],['none','Not specified','غير محدد']]}
];
var RISK=[
 {k:'heat',en:'Extreme heat',ar:'الحرارة الشديدة',d:'Heat waves, urban heat island',da:'موجات الحر وجزيرة الحرارة الحضرية'},
 {k:'flood',en:'Urban flooding',ar:'الفيضانات والسيول الحضرية',d:'Intense rain, surface water',da:'أمطار غزيرة ومياه سطحية'},
 {k:'drought',en:'Drought and water scarcity',ar:'الجفاف وشح المياه',d:'Low rainfall, water stress',da:'قلة الأمطار وإجهاد مائي'},
 {k:'coast',en:'Coastal erosion and sea-level rise',ar:'تآكل السواحل وارتفاع مستوى البحر',d:'Shoreline retreat, storm surge',da:'تراجع الشاطئ وعواصف بحرية'},
 {k:'fire',en:'Wildfire at the urban edge',ar:'حرائق الغابات على أطراف المدينة',d:'Dry vegetation near homes',da:'نباتات جافة قرب المساكن'},
 {k:'air',en:'Air pollution',ar:'تلوث الهواء',d:'Traffic and dust',da:'المرور والغبار'}
];
var CONF=[['high','High: documented evidence','عالية: أدلة موثقة'],['mid','Medium: staff estimate','متوسطة: تقدير الموظفين'],['low','Low: informal judgement','منخفضة: تقدير غير رسمي']];
/* provisional project thresholds, unchanged from the earlier demo */
var LEVELS=[
 {en:'Insufficient',ar:'غير كافٍ',c:'l0'},{en:'Partial',ar:'جزئي',c:'l1'},{en:'Adequate',ar:'كافٍ',c:'l2'},{en:'Strong',ar:'قوي',c:'l3'}
];
var OPT=[
 {id:'tiny',en:'Urban forest (Miyawaki method)',ar:'غابة حضرية (طريقة ميازاكي)',eg:'NBS4MED pilot: Cerdanyola del Vallès, Spain',w:{heat:3,flood:1,drought:1,coast:0,fire:0,air:2},land:1,cx:1,nbs:'NBS01',cat:'green',cat2:'restoration'},
 {id:'roof',en:'Green roof',ar:'سطح أخضر',eg:'NBS4MED pilot: Izmir, Türkiye',w:{heat:2,flood:2,drought:1,coast:0,fire:0,air:1},land:0,cx:2,nbs:'NBS02',cat:'green'},
 {id:'street',en:'Green corridor',ar:'ممر أخضر',eg:'NBS4MED pilot: Heliopolis, Egypt',w:{heat:3,flood:1,drought:0,coast:0,fire:0,air:2},land:0,cx:0,nbs:'NBS05',cat:'green'},
 {id:'swale',en:'Rain garden and bioswale',ar:'حديقة مطرية وخندق نباتي',eg:'',w:{heat:1,flood:3,drought:1,coast:0,fire:0,air:0},land:1,cx:1,nbs:null,cat:'bluegreen'},
 {id:'perm',en:'Permeable paving',ar:'رصف نفّاذ',eg:'',w:{heat:0,flood:3,drought:1,coast:0,fire:0,air:0},land:0,cx:0,nbs:null,cat:'bluegreen',cat2:'hybrid'},
 {id:'pocket',en:'Pocket park',ar:'حديقة صغيرة',eg:'',w:{heat:2,flood:1,drought:0,coast:0,fire:0,air:2},land:1,cx:0,nbs:null,cat:'green'},
 {id:'eco',en:'Smart eco-park',ar:'منتزه بيئي ذكي',eg:'NBS4MED pilot: Sikionies, Greece',w:{heat:3,flood:2,drought:2,coast:0,fire:1,air:2},land:2,cx:2,nbs:'NBS03',cat:'hybrid',cat2:'green'},
 {id:'wet',en:'Rainwater retention basin',ar:'حوض احتجاز مياه الأمطار',eg:'NBS4MED pilot: Tunisia',w:{heat:1,flood:3,drought:3,coast:1,fire:0,air:0},land:2,cx:2,nbs:'NBS04',cat:'bluegreen',cat2:'hybrid'},
 {id:'dune',en:'Vegetated dune and shoreline',ar:'كثبان وشاطئ نباتي',eg:'',w:{heat:0,flood:1,drought:0,coast:3,fire:0,air:0},land:1,cx:1,nbs:null,cat:'restoration'}
];
/* provisional solution categories (display only; they do not affect matching, scoring or calculator selection) */
var CATS={green:['Green infrastructure','البنية التحتية الخضراء'],bluegreen:['Blue-green water management','إدارة المياه الزرقاء والخضراء'],restoration:['Ecosystem restoration','استعادة النظم البيئية'],hybrid:['Hybrid/integrated solutions','حلول هجينة/متكاملة']};
var CLAB={land:[['Low','منخفضة'],['Medium','متوسطة'],['High','عالية']],cx:[['Low','منخفض'],['Medium','متوسط'],['High','مرتفع']]};

/* ---------- applicability screening (preliminary checks, not engineering approval) ---------- */
/* A check answered No in "fatal" makes the option Not applicable. Any other check that is not Yes (No or Unknown) makes it
   Requires verification. Only all-Yes gives Preliminary candidate. Unknown never excludes an option. */
var CHK={
 'roof.avail':{q:['Is there a roof in the area that could potentially host a green roof?','هل يوجد في المنطقة سطح يمكن أن يستضيف سطحًا أخضر؟'],
   na:['No roof that could potentially host a green roof is available.','لا يتوفر سطح يمكن أن يستضيف سطحًا أخضر.'],
   v:['Roof availability still needs to be confirmed.','لا يزال توفر السطح بحاجة إلى تأكيد.']},

 'roof.struct':{q:['What is the structural suitability of that roof?','ما الملاءمة الإنشائية لذلك السطح؟'],
   h:['Assessment pending or Unknown does not mean unsuitable. Choose “Assessed and unsuitable” only when an assessment has found the roof unsuitable.','«التقييم قيد الإجراء أو غير معروف» لا يعني أن السطح غير ملائم. اختر «جرى تقييمه وهو غير ملائم» فقط عندما يكون تقييم قد وجد السطح غير ملائم.'],
   na:['The roof was assessed and found structurally unsuitable.','جرى تقييم السطح وتبيّن أنه غير ملائم إنشائيًا.'],
   v:['Structural suitability of the roof requires assessment (assessment pending or Unknown).','تتطلب الملاءمة الإنشائية للسطح تقييمًا (التقييم قيد الإجراء أو غير معروف).']},
 'plant.space':{q:['Is there open space where trees or other plants could be planted?','هل توجد مساحة مفتوحة يمكن زراعة الأشجار أو النباتات فيها؟'],
   na:['No planting space is available.','لا تتوفر مساحة للزراعة.'],v:['Planting space still needs to be confirmed.','لا تزال مساحة الزراعة بحاجة إلى تأكيد.']},
 'plant.soil':{q:['Is there enough soil or rooting space for the plants?','هل توجد تربة أو مساحة جذور كافية للنباتات؟'],
   v:['Soil and rooting space need to be assessed or provided.','تحتاج التربة ومساحة الجذور إلى تقييم أو توفير.']},
 'plant.water':{q:['Is water available to establish the plants (for example during the first years)?','هل يتوفر ماء لتأسيس النباتات (مثلًا في السنوات الأولى)؟'],
   v:['Water for establishment is not confirmed.','المياه اللازمة للتأسيس غير مؤكدة.']},
 'eco.space':{q:['Is there enough public space for a park-scale site with planting, meadow, water features and paths?','هل توجد مساحة عامة كافية لمنتزه بحجم موقع كامل يضم زراعة ومروجًا وعناصر مائية وممرات؟'],
   na:['No public space of park scale is available.','لا تتوفر مساحة عامة بحجم منتزه.'],v:['Park-scale space still needs to be confirmed.','لا تزال المساحة بحجم منتزه بحاجة إلى تأكيد.']},
 'swale.source':{q:['Is there a runoff source (for example a road, car park or roof) that could drain to a rain garden or bioswale?','هل يوجد مصدر جريان (مثل طريق أو موقف أو سطح) يمكن أن يصرّف إلى حديقة مطرية أو خندق نباتي؟'],
   na:['No runoff source is available to feed it.','لا يتوفر مصدر جريان يغذيه.'],v:['The runoff source still needs to be confirmed.','لا يزال مصدر الجريان بحاجة إلى تأكيد.']},
 'swale.space':{q:['Is there space for a rain garden or bioswale next to that runoff source?','هل توجد مساحة لحديقة مطرية أو خندق نباتي بجوار مصدر الجريان؟'],
   na:['No space is available for it.','لا تتوفر مساحة له.'],v:['Space still needs to be confirmed.','لا تزال المساحة بحاجة إلى تأكيد.']},
 'swale.infil':{q:['Are infiltration and drainage conditions known?','هل شروط التسرب والتصريف معروفة؟'],
   h:['Yes = known. No = not known yet, so it needs assessment.','نعم = معروفة. لا = غير معروفة بعد، وتحتاج إلى تقييم.'],
   v:['Infiltration and drainage conditions need to be assessed.','تحتاج شروط التسرب والتصريف إلى تقييم.']},
 'perm.surface':{q:['Is there a paved surface (such as a car park, pavement or minor road) where permeable paving could replace impermeable paving?','هل يوجد سطح مرصوف (مثل موقف أو رصيف أو طريق فرعي) يمكن أن يحل الرصف النفّاذ محل الرصف غير النفّاذ فيه؟'],
   na:['No relevant paved surface is available.','لا يتوفر سطح مرصوف مناسب.'],v:['The relevant paved surface still needs to be confirmed.','لا يزال السطح المرصوف المناسب بحاجة إلى تأكيد.']},
 'perm.tech':{q:['Has technical suitability (for example load, subsoil and maintenance) been verified?','هل جرى التحقق من الملاءمة الفنية (مثل الأحمال وتربة الأساس والصيانة)؟'],
   h:['Yes = verified. No = not verified yet.','نعم = جرى التحقق. لا = لم يجر التحقق بعد.'],
   v:['Technical suitability of the paving requires verification.','تتطلب الملاءمة الفنية للرصف تحققًا.']},
 'wet.catch':{q:['Is there a catchment whose runoff could drain to a retention basin?','هل يوجد حوض مائي يمكن أن يصرّف جريانه إلى حوض احتجاز؟'],
   na:['No catchment is available to feed a basin.','لا يتوفر حوض مائي يغذي الحوض.'],v:['The catchment still needs to be confirmed.','لا يزال الحوض المائي بحاجة إلى تأكيد.']},
 'wet.space':{q:['Is there space for a basin?','هل توجد مساحة لحوض؟'],
   na:['No space is available for a basin.','لا تتوفر مساحة لحوض.'],v:['Space for the basin still needs to be confirmed.','لا تزال مساحة الحوض بحاجة إلى تأكيد.']},
 'wet.safety':{q:['Are discharge (outlet) and safety conditions known?','هل شروط التصريف (المخرج) والسلامة معروفة؟'],
   h:['Yes = known. No = not known yet, so it needs assessment.','نعم = معروفة. لا = غير معروفة بعد، وتحتاج إلى تقييم.'],
   v:['Discharge and safety conditions need to be assessed.','تحتاج شروط التصريف والسلامة إلى تقييم.']},
 'dune.coast':{q:['Is the area on the coast, at a shoreline or dune system?','هل تقع المنطقة على الساحل، عند شاطئ أو منظومة كثبان؟'],
   na:['The area is not coastal.','المنطقة ليست ساحلية.'],v:['Coastal location still needs to be confirmed.','لا يزال الموقع الساحلي بحاجة إلى تأكيد.']}
};
/* A dependent check is hidden when an essential prerequisite is answered No (the option is then Not applicable).
   '@space' stands for the planting-space check of the option (the eco-park has its own space check). */
var SPACEKEY={tiny:'plant.space',street:'plant.space',pocket:'plant.space',eco:'eco.space'};
var DEP={'roof.struct':['roof.avail'],'plant.soil':['@space'],'plant.water':['@space'],'swale.space':['swale.source'],'swale.infil':['swale.source','swale.space'],'perm.tech':['perm.surface'],'wet.space':['wet.catch'],'wet.safety':['wet.catch','wet.space']};
var RULE={
 roof:{chk:['roof.avail','roof.struct'],fatal:['roof.avail']},
 tiny:{chk:['plant.space','plant.soil','plant.water'],fatal:['plant.space']},
 street:{chk:['plant.space','plant.soil','plant.water'],fatal:['plant.space']},
 pocket:{chk:['plant.space','plant.soil','plant.water'],fatal:['plant.space']},
 eco:{chk:['eco.space','plant.soil','plant.water'],fatal:['eco.space']},
 swale:{chk:['swale.source','swale.space','swale.infil'],fatal:['swale.source','swale.space']},
 perm:{chk:['perm.surface','perm.tech'],fatal:['perm.surface']},
 wet:{chk:['wet.catch','wet.space','wet.safety'],fatal:['wet.catch','wet.space']},
 dune:{chk:['dune.coast'],fatal:['dune.coast']}
};
function optById(id){return OPT.filter(function(o){return o.id===id})[0]}
function optByNbs(n){return OPT.filter(function(o){return o.nbs===n})[0]}

/* ---------- strings ---------- */
var S={
 s:{en:['Not addressed','Partial','Fully addressed'],ar:['غير معالَج','جزئي','معالَج بالكامل']},
 key:{en:'Choose the description that best matches the area as it is today. These scoring descriptions are a provisional project rubric, to be reviewed by project partners. Unknown means the information is missing and is never scored as 0. Not applicable needs a short justification. Unknown and Not applicable answers are left out of the score and reported separately.',ar:'اختر الوصف الأنسب لوضع المنطقة اليوم. أوصاف التقييم هذه معيار مؤقت للمشروع سيراجعه الشركاء. «غير معروف» تعني أن المعلومة ناقصة ولا تُحتسب صفرًا أبدًا. «لا ينطبق» يحتاج إلى مبرر قصير. تُستبعد الإجابتان «غير معروف» و«لا ينطبق» من النتيجة وتُعرضان بشكل منفصل.'},
 rub:{en:'Provisional project rubric',ar:'معيار مؤقت للمشروع'},
 optU:{en:'Unknown',ar:'غير معروف'},optUd:{en:'The information is missing or cannot be confirmed. This is not scored as 0.',ar:'المعلومة ناقصة أو لا يمكن تأكيدها. لا تُحتسب صفرًا.'},
 optNA:{en:'Not applicable',ar:'لا ينطبق'},optNAd:{en:'This indicator does not apply to the assessed area. Give a short justification.',ar:'لا ينطبق هذا المؤشر على المنطقة المقيَّمة. اكتب مبررًا قصيرًا.'},
 justL:{en:'Why is this indicator not applicable? (required)',ar:'لماذا لا ينطبق هذا المؤشر؟ (مطلوب)'},
 justErr:{en:'Give a short justification for Not applicable.',ar:'اكتب مبررًا قصيرًا لخيار «لا ينطبق».'},
 more:{en:'Optional: rationale, evidence and confidence',ar:'اختياري: التعليل والأدلة والثقة'},
 ratL:{en:'Rationale: why did you choose this answer?',ar:'التعليل: لماذا اخترت هذه الإجابة؟'},
 evdL:{en:'Evidence or source (document title, URL or description)',ar:'الدليل أو المصدر (عنوان وثيقة أو رابط أو وصف)'},
 evdH:{en:'Nothing is uploaded: type a title, link or description only.',ar:'لا يُرفع أي ملف: اكتب عنوانًا أو رابطًا أو وصفًا فقط.'},
 cfL:{en:'Confidence in this answer',ar:'الثقة في هذه الإجابة'},cfNone:{en:'Not stated',ar:'غير محددة'},
 tgtQ:{en:'Is there a local target for NBS or for green and blue space coverage?',ar:'هل يوجد هدف محلي للحلول أو لتغطية المساحات الخضراء والزرقاء؟'},
 covQ:{en:'Is the current coverage known (mapped or measured)?',ar:'هل التغطية الحالية معروفة (مرسومة أو مقيسة)؟'},
 tgtBoth:{en:'A target exists and coverage is known: compare them when you choose the score.',ar:'يوجد هدف والتغطية معروفة: قارن بينهما عند اختيار الدرجة.'},
 tgtNone:{en:'No numerical comparison is needed. Score from what you can observe, or choose Unknown.',ar:'لا حاجة إلى مقارنة رقمية. قيّم بحسب ما يمكنك ملاحظته، أو اختر «غير معروف».'},
 yes:{en:'Yes',ar:'نعم'},no:{en:'No',ar:'لا'},unk:{en:'Unknown',ar:'غير معروف'},
 stepOf:{en:function(a,b){return 'Step '+a+' of '+b},ar:function(a,b){return 'الخطوة '+a+' من '+b}},
 ansN:{en:function(a,b){return a+' of '+b+' answered'},ar:function(a,b){return a+' من '+b+' مُجاب عنها'}},
 back:{en:'Back',ar:'رجوع'},cont:{en:'Continue',ar:'متابعة'},seeRes:{en:'See results',ar:'عرض النتائج'},
 stScope:{en:'Assessment scope',ar:'نطاق التقييم'},stCtx:{en:'Site context',ar:'سياق الموقع'},
 stRisk:{en:'Climate risks and environmental challenges',ar:'المخاطر المناخية والتحديات البيئية'},
 scopeP:{en:'Define the area you are assessing. All answers in this assessment must refer to this same area and to its current situation, as it is today and not as planned.',ar:'حدّد المنطقة التي تقيّمها. يجب أن تشير كل الإجابات في هذا التقييم إلى هذه المنطقة نفسها وإلى وضعها الحالي، كما هو اليوم لا كما هو مخطط.'},
 fName:{en:'Assessment area name',ar:'اسم منطقة التقييم'},
 fScope:{en:'Scope of the area',ar:'نطاق المنطقة'},
 fOther:{en:'Describe the other scope',ar:'صِف النطاق الآخر'},
 fBound:{en:'Short description of the assessed boundary',ar:'وصف موجز لحدود المنطقة المقيَّمة'},
 fBoundH:{en:'For example: the streets or landmarks that mark the edge, or the administrative limits.',ar:'مثلًا: الشوارع أو المعالم التي تحدد الأطراف، أو الحدود الإدارية.'},
 fOrg:{en:'Organisation completing the assessment',ar:'الجهة التي تُجري التقييم'},
 fDate:{en:'Assessment date',ar:'تاريخ التقييم'},
 opt:{en:'optional',ar:'اختياري'},
 ctxP:{en:'Two questions about the area help filter the NBS options. Income is optional context and does not change the ranking. None of these answers is scored.',ar:'سؤالان عن المنطقة يساعدان في تصفية خيارات الحلول. الدخل سياق اختياري ولا يغيّر الترتيب. لا تُحتسب أي من هذه الإجابات في النتيجة.'},
 riskP:{en:'Select every climate risk or environmental challenge that affects the area. The recommendations are matched to these.',ar:'اختر كل خطر مناخي أو تحدٍّ بيئي يؤثر في المنطقة. تُطابَق التوصيات مع هذه الاختيارات.'},
 chkNote:{en:'Screening only, not engineering approval. These checks do not change the assessment score or the match score. Answers about planting space, soil and water are shared by the planting-based options.',ar:'فرز أولي وليس اعتمادًا هندسيًا. لا تغيّر هذه الفحوص درجة التقييم ولا درجة المطابقة. تُشارَك الإجابات عن مساحة الزراعة والتربة والمياه بين الخيارات القائمة على الزراعة.'},
 evalP:{en:'Score each indicator for the assessed area as it is today, not as planned.',ar:'قيّم كل مؤشر للمنطقة المقيَّمة بحسب وضعها اليوم لا المخطط له.'},
 forArea:{en:function(n){return 'Answering for: '+n},ar:function(n){return 'الإجابة عن: '+n}},
 optionalHint:{en:'Select all that apply.',ar:'اختر كل ما ينطبق.'},
 critAns:{en:function(a,b){return a+' of '+b+' answered'},ar:function(a,b){return a+' من '+b+' مُجاب عنها'}},
 errTitle:{en:function(n){return n===1?'1 item still needs an answer:':n+' items still need an answer:'},ar:function(n){return 'ما زال '+n+' من البنود بلا إجابة:'}},
 pickOne:{en:'Choose at least one climate risk or environmental challenge.',ar:'اختر خطرًا مناخيًا أو تحديًا بيئيًا واحدًا على الأقل.'},
 pickAns:{en:'Choose an answer.',ar:'اختر إجابة.'},fillIn:{en:'Fill in this field.',ar:'املأ هذا الحقل.'},
 eName:{en:'Assessment area name',ar:'اسم منطقة التقييم'},eType:{en:'Scope of the area',ar:'نطاق المنطقة'},eOther:{en:'Description of the other scope',ar:'وصف النطاق الآخر'},eBound:{en:'Description of the assessed boundary',ar:'وصف حدود المنطقة المقيَّمة'},
 eCtx:{en:function(n){return 'Context: '+n},ar:function(n){return 'السياق: '+n}},
 eRisk:{en:'Climate risks and environmental challenges: choose at least one',ar:'المخاطر المناخية والتحديات البيئية: اختر واحدًا على الأقل'},
 eJust:{en:function(n){return n+': justification for Not applicable'},ar:function(n){return n+': مبرر «لا ينطبق»'}},
 loading:{en:'Calculating results',ar:'جارٍ حساب النتائج'},
 resTitle:{en:'Your results',ar:'نتائجك'},
 protoNote:{en:'Preliminary prototype results for the area as it is today. The methodology will be reviewed against the PROMEA framework and the NBS repository. The scores are NBS4MED prototype scores and are not an official score or certification of any external organisation or standard.',ar:'نتائج أولية لنموذج تجريبي للمنطقة بوضعها الحالي. ستُراجع المنهجية بالمقارنة مع إطار PROMEA ومستودع الحلول القائمة على الطبيعة. الدرجات هنا درجات نموذج NBS4MED التجريبي، وليست درجة رسمية أو شهادة صادرة عن أي جهة أو معيار خارجي.'},
 edit:{en:'Edit answers',ar:'تعديل الإجابات'},
 scopeH:{en:'Assessed area',ar:'المنطقة المقيَّمة'},
 scopeLabs:{en:['Area name','Scope','Boundary','Organisation','Assessment date'],ar:['اسم المنطقة','النطاق','الحدود','الجهة','تاريخ التقييم']},
 notStated:{en:'Not stated',ar:'غير مذكور'},
 compH:{en:'Completeness',ar:'اكتمال التقييم'},
 compTxt:{en:function(n,u,na){return n+' of 14 indicators have a numeric score. '+u+' Unknown. '+na+' Not applicable.'},ar:function(n,u,na){return n+' من 14 مؤشرًا لها درجة رقمية. '+u+' غير معروفة. '+na+' لا تنطبق.'}},
 profH:{en:'Criterion profile',ar:'ملف المعايير'},
 profSub:{en:'Each criterion is shown on its own. Read the profile before the overall score.',ar:'يُعرض كل معيار على حدة. اقرأ الملف قبل النتيجة الإجمالية.'},
 g1H:{en:'Current NBS integration (C1)',ar:'الدمج الحالي للحلول القائمة على الطبيعة (C1)'},
 g1P:{en:'How far NBS are already integrated in the area today. This criterion does not measure environmental effectiveness, such as cooling or flood reduction.',ar:'مدى دمج الحلول فعلًا في المنطقة اليوم. لا يقيس هذا المعيار الفعالية البيئية، مثل التبريد أو خفض الفيضانات.'},
 g2H:{en:'Enabling conditions for implementation and sustainability (C2 to C5)',ar:'الظروف الممكّنة للتنفيذ والاستدامة (C2 إلى C5)'},
 g2P:{en:'Policy, capacity, engagement and funding that support planning, delivery and long-term upkeep of NBS.',ar:'السياسات والقدرات والإشراك والتمويل التي تدعم تخطيط الحلول وتنفيذها وصيانتها على المدى الطويل.'},
 pts:{en:function(s,m,p){return s+' of '+m+' points · '+p+'%'},ar:function(s,m,p){return s+' من '+m+' نقطة · '+p+'%'}},
 cmpl:{en:function(a,b,u,na){return a+' of '+b+' indicators scored'+(u?' · '+u+' Unknown':'')+(na?' · '+na+' Not applicable':'')},ar:function(a,b,u,na){return a+' من '+b+' مؤشرات مُقيَّمة'+(u?' · '+u+' غير معروف':'')+(na?' · '+na+' لا ينطبق':'')}},
 notRated:{en:'Not rated: Unknown answers',ar:'غير مُقيَّم: توجد إجابات غير معروفة'},
 partial:{en:function(s,m,k,t){return 'Available points only (not a criterion score): '+s+' of '+m+' on '+k+' of '+t+' indicators'},ar:function(s,m,k,t){return 'النقاط المتاحة فقط (ليست درجة المعيار): '+s+' من '+m+' في '+k+' من '+t+' مؤشرات'}},
 naCrit:{en:'Not applicable',ar:'لا ينطبق'},
 crit:{en:'Criterion',ar:'المعيار'},score:{en:'Score',ar:'النتيجة'},level:{en:'Level',ar:'المستوى'},
 overallH:{en:'Overall score (secondary)',ar:'النتيجة الإجمالية (ثانوية)'},
 levelIs:{en:'Level',ar:'المستوى'},
 ovSupp:{en:function(n,l){return 'The overall percentage is not shown because '+n+(n===1?' indicator is':' indicators are')+' Unknown ('+l+'). Resolve '+(n===1?'it':'them')+' to see the overall score.'},ar:function(n,l){return 'لا تُعرض النسبة الإجمالية لأن '+n+' من المؤشرات غير معروفة ('+l+'). عالجها لعرض النتيجة الإجمالية.'}},
 ovNA:{en:'The overall score is not available because every indicator is Not applicable.',ar:'النتيجة الإجمالية غير متاحة لأن كل المؤشرات «لا تنطبق».'},
 equalW:{en:function(t){return 'The overall score gives every indicator equal weight, so a criterion with more indicators counts for more. Scored indicators per criterion: '+t+'.'},ar:function(t){return 'تمنح النتيجة الإجمالية كل مؤشر وزنًا متساويًا، لذا يزن المعيار الذي له مؤشرات أكثر أكثر. المؤشرات المُقيَّمة لكل معيار: '+t+'.'}},
 naDen:{en:function(m){return 'Not applicable indicators are left out, so the denominator is '+m+' points.'},ar:function(m){return 'تُستبعد المؤشرات التي «لا تنطبق»، لذا يكون المقام '+m+' نقطة.'}},
 thresholds:{en:'Provisional project thresholds, not taken from any external standard: Insufficient below 30%, Partial 30 to 54%, Adequate 55 to 79%, Strong 80% and above. Project partners will review them.',ar:'عتبات مؤقتة للمشروع وليست مأخوذة من أي معيار خارجي: غير كافٍ دون 30%، جزئي 30 إلى 54%، كافٍ 55 إلى 79%، قوي 80% فأكثر. سيراجعها شركاء المشروع.'},
 repH:{en:'Download report',ar:'تحميل التقرير'},
 pdf:{en:'Summary report — 2 pages',ar:'تقرير ملخص — صفحتان'},pdfDetail:{en:'Detailed report',ar:'تقرير مفصّل'},csv:{en:'Download CSV',ar:'تحميل CSV'},
 dlOk:{en:'CSV file prepared.',ar:'تم تجهيز ملف CSV.'},
 heatH:{en:'Indicator by indicator',ar:'مؤشرًا مؤشرًا'},
 heatKey:{en:'0, 1 and 2 are scores. Unknown is missing information and is not 0. N/A means not applicable and is left out of the score.',ar:'0 و1 و2 درجات. «غير معروف» معلومة ناقصة وليست 0. «لا ينطبق» يعني عدم الانطباق ويُستبعد من النتيجة.'},
 stU:{en:'Unknown',ar:'غير معروف'},stNA:{en:'N/A',ar:'لا ينطبق'},stNone:{en:'Not answered',ar:'بلا إجابة'},
 aNum:{en:function(v){return v+' of 2'},ar:function(v){return v+' من 2'}},
 aU:{en:'Unknown',ar:'غير معروف'},aNA:{en:'Not applicable',ar:'لا ينطبق'},aNone:{en:'Not answered',ar:'بلا إجابة'},
 sgH:{en:'Gaps and strengths by indicator',ar:'الفجوات ونقاط القوة بحسب المؤشر'},
 sgSub:{en:'Generated from your answers, using the scoring description you selected for each indicator.',ar:'مُولَّدة من إجاباتك باستخدام وصف الدرجة الذي اخترته لكل مؤشر.'},
 gap0:{en:'Priority gaps (score 0)',ar:'فجوات ذات أولوية (الدرجة 0)'},gap1:{en:'Developing (score 1)',ar:'قيد التطوير (الدرجة 1)'},strong:{en:'Strengths (score 2)',ar:'نقاط القوة (الدرجة 2)'},
 gapU:{en:'Information gaps (Unknown)',ar:'فجوات معلومات (غير معروف)'},gapNA:{en:'Not applicable',ar:'لا ينطبق'},
 gapNone:{en:'None',ar:'لا شيء'},
 readH:{en:'Lowest-rated criterion',ar:'المعيار الأدنى تقييمًا'},
 readTxt:{en:function(n,p,z){return n+' has the lowest rating among the rated criteria ('+p+'%).'+(z?' Indicators scored 0 in it: '+z+'.':' It has no indicator scored 0.')},ar:function(n,p,z){return n+' هو الأدنى تقييمًا بين المعايير المُقيَّمة ('+p+'%).'+(z?' المؤشرات التي نالت 0 فيه: '+z+'.':' لا يوجد فيه مؤشر نال 0.')}},
 readNone:{en:'No criterion can be rated yet, because each one contains Unknown answers or is Not applicable.',ar:'لا يمكن تقييم أي معيار بعد، لأن كل معيار يحتوي على إجابات غير معروفة أو لا ينطبق.'},
 confH:{en:'Confidence in the answers',ar:'الثقة في الإجابات'},
 confTxt:{en:function(n,a,b,c,d){return 'Of the '+n+' scored indicators: '+a+' documented evidence, '+b+' staff estimate, '+c+' informal judgement, '+d+' confidence not stated.'},ar:function(n,a,b,c,d){return 'من بين '+n+' مؤشرًا مُقيَّمًا: '+a+' بأدلة موثقة، '+b+' بتقدير الموظفين، '+c+' بتقدير غير رسمي، '+d+' بلا ثقة محددة.'}},
 confNote:{en:'Confidence is reported next to the answers. It does not change any score.',ar:'تُعرض الثقة بجانب الإجابات. ولا تغيّر أي درجة.'},
 detH:{en:'Answers in detail',ar:'الإجابات بالتفصيل'},
 colInd:{en:'Indicator',ar:'المؤشر'},colAns:{en:'Answer',ar:'الإجابة'},colRat:{en:'Rationale',ar:'التعليل'},colEvd:{en:'Evidence or source',ar:'الدليل أو المصدر'},colCf:{en:'Confidence',ar:'الثقة'},
 methA:{en:'How the assessment scores are calculated (provisional)',ar:'كيف تُحسب درجات التقييم (مؤقتًا)'},
 methAL:{en:[
  'Each indicator is scored 0, 1 or 2 using the provisional project rubric shown in the assessment.',
  'Unknown is missing information and is never counted as 0. Not applicable (with a justification) is also left out. Both are reported separately.',
  'A criterion percentage is the sum of its scored indicators divided by 2 times the number of scored indicators. It is shown only when the criterion has no Unknown answer. A criterion whose indicators are all Not applicable is shown as Not applicable.',
  'The overall percentage uses the same rule across all indicators and is shown only when no indicator is Unknown. With every indicator scored, it is the total divided by 28. Every indicator has equal weight, so criteria with more indicators weigh more.',
  'Levels use provisional project thresholds: Insufficient below 30%, Partial 30 to 54%, Adequate 55 to 79%, Strong 80% and above.',
  'The scores are not multiplied by confidence. Confidence is reported separately, indicator by indicator.',
  'C1 describes current NBS integration only. It is not a measure of environmental effectiveness.'],
  ar:[
  'يُقيَّم كل مؤشر بـ 0 أو 1 أو 2 وفق المعيار المؤقت للمشروع المعروض في التقييم.',
  '«غير معروف» معلومة ناقصة ولا تُحتسب صفرًا أبدًا. كذلك تُستبعد «لا ينطبق» (مع مبرر). وتُعرض الحالتان بشكل منفصل.',
  'نسبة المعيار هي مجموع درجات مؤشراته المُقيَّمة مقسومًا على ضعف عدد المؤشرات المُقيَّمة. تُعرض فقط إذا لم يحتوِ المعيار على إجابة غير معروفة. ويُعرض المعيار الذي تكون كل مؤشراته «لا تنطبق» بعبارة «لا ينطبق».',
  'تستخدم النسبة الإجمالية القاعدة نفسها على كل المؤشرات، ولا تُعرض إلا إذا لم يكن أي مؤشر غير معروف. وعند تقييم كل المؤشرات تساوي المجموع مقسومًا على 28. لكل مؤشر وزن متساوٍ، لذا يزن المعيار ذو المؤشرات الأكثر أكثر.',
  'تستخدم المستويات عتبات مؤقتة للمشروع: غير كافٍ دون 30%، جزئي 30 إلى 54%، كافٍ 55 إلى 79%، قوي 80% فأكثر.',
  'لا تُضرب الدرجات في الثقة. تُعرض الثقة بشكل منفصل لكل مؤشر.',
  'يصف C1 الدمج الحالي للحلول فقط، وليس مقياسًا للفعالية البيئية.']},
 recH:{en:'NBS recommendations',ar:'توصيات الحلول القائمة على الطبيعة'},
 recP:{en:'Preliminary options ranked by a rule-based match to your selected risks. Applicability statuses come from optional checks and are not engineering approval.',ar:'خيارات أولية مرتبة بحسب مطابقة قائمة على قواعد مع المخاطر التي اخترتها. حالات قابلية التطبيق تأتي من فحوص اختيارية وليست اعتمادًا هندسيًا.'},
 matchL:{en:'Rule-based match score',ar:'درجة المطابقة القائمة على القواعد'},
 matchNote:{en:'The rule-based match score (out of 100) shows how well an option matches your selected risks and the land context. It is neither a probability of success nor an expected impact.',ar:'تبيّن درجة المطابقة القائمة على القواعد (من 100) مدى مطابقة الخيار للمخاطر التي اخترتها ولسياق الأرض. وهي ليست احتمال نجاح ولا أثرًا متوقعًا.'},
 stCand:{en:'Preliminary candidate',ar:'مرشح أولي'},stVer:{en:'Requires verification',ar:'يتطلب تحققًا'},stNA2:{en:'Not applicable',ar:'لا ينطبق'},
 cplx:{en:'Complexity',ar:'التعقيد'},landN:{en:'Land need',ar:'الحاجة إلى الأرض'},
 whyL:{en:'Why it matches the selected risks',ar:'سبب مطابقته للمخاطر المختارة'},
 w3:{en:'strongly',ar:'بقوة'},w2:{en:'moderately',ar:'بدرجة متوسطة'},w1:{en:'weakly',ar:'بدرجة ضعيفة'},
 noTarget:{en:'Not a target of this option: ',ar:'ليست من أهداف هذا الخيار: '},
 landOk:{en:'Land need fits the available public land.',ar:'حاجة الأرض تناسب الأراضي العامة المتاحة.'},
 landFit:{en:'Land need exceeds the available public land, which lowers the match score.',ar:'حاجة الأرض تفوق الأراضي العامة المتاحة، مما يخفض درجة المطابقة.'},
 screenL:{en:'Applicability',ar:'قابلية التطبيق'},
 stUn:{en:'Not yet checked',ar:'لم يُفحص بعد'},
 unchkTxt:{en:'No check has been answered yet. The recommendation is preliminary.',ar:'لم يُجب عن أي فحص بعد. التوصية أولية.'},
 chkBtn:{en:'Check this solution',ar:'افحص هذا الحل'},chkHide:{en:'Hide checks',ar:'إخفاء الفحوص'},chkReopen:{en:'Review checks',ar:'مراجعة الفحوص'},
 chkTitle:{en:'Applicability checks',ar:'فحوص قابلية التطبيق'},
 rsConf:{en:'Confirmed suitable',ar:'مؤكدة الملاءمة'},rsPend:{en:'Assessment pending or Unknown',ar:'التقييم قيد الإجراء أو غير معروف'},rsNo:{en:'Assessed and unsuitable',ar:'جرى تقييمه وهو غير ملائم'},
 prelim:{en:'Preliminary and unchecked: these recommendations use only your selected risks and site context. Use Check this solution to screen each option for applicability.',ar:'أولية وغير مفحوصة: تستخدم هذه التوصيات المخاطر المختارة وسياق الموقع فقط. استخدم «افحص هذا الحل» لفرز كل خيار من حيث قابلية التطبيق.'},
 catL:{en:'Category',ar:'الفئة'},
 catProv:{en:'Provisional category. It can depend on design and does not affect matching or scoring.',ar:'فئة مؤقتة. قد تعتمد على التصميم ولا تؤثر في المطابقة أو التقييم.'},
 verL:{en:'To verify:',ar:'للتحقق:'},
 candDone:{en:'All screening checks are answered Yes.',ar:'كل فحوص الفرز أُجيب عنها بنعم.'},
 condL:{en:'Implementation conditions',ar:'شروط التنفيذ'},
 condNone:{en:'Capital funding, maintenance budget and technical know-how were all scored 2.',ar:'نالت كلٌّ من تمويل رأس المال وميزانية الصيانة والخبرة الفنية الدرجة 2.'},
 condU:{en:'Unknown: confirm before committing resources.',ar:'غير معروف: تأكد قبل الالتزام بالموارد.'},
 condScore:{en:function(v){return 'Score '+v},ar:function(v){return 'الدرجة '+v}},
 condCx:{en:function(c){return 'This option has '+c+' technical complexity.'},ar:function(c){return 'درجة التعقيد الفني لهذا الخيار: '+c+'.'}},
 exBtn:{en:'Explore impact and cost for this option',ar:'استكشف الأثر والتكلفة لهذا الخيار'},
 noMod:{en:'Impact/cost module not yet available',ar:'وحدة الأثر والتكلفة غير متاحة بعد'},
 allOpt:{en:'All ranked options',ar:'كل الخيارات المرتبة'},
 option:{en:'Option',ar:'الخيار'},status:{en:'Screening status',ar:'حالة الفرز'},
 exclH:{en:'Excluded and other options',ar:'خيارات مستبعدة وخيارات أخرى'},
 exNA:{en:'Not applicable after checking',ar:'لا تنطبق بعد الفحص'},
 otherH:{en:'Other options',ar:'خيارات أخرى'},
 otherP:{en:'These options have a rule-based match score of 0, so they are not recommended for the selected risks and context. A score of 0 is not a finding that an option is technically unsuitable.',ar:'درجة المطابقة القائمة على القواعد لهذه الخيارات 0، لذا لا يُوصى بها للمخاطر والسياق المختارين. الدرجة 0 ليست حكمًا بأن الخيار غير ملائم فنيًا.'},
 exNoWhy:{en:'None of the selected risks is a target of this option, so its match score is 0.',ar:'لا يستهدف هذا الخيار أيًّا من المخاطر المختارة، لذا درجة مطابقته 0.'},
 exZeroWhy:{en:'Its land need exceeds the public land available, which brings the match score to 0.',ar:'حاجته إلى الأرض تفوق الأراضي العامة المتاحة، مما يجعل درجة المطابقة 0.'},
 recEmpty:{en:'Recommendations need at least one climate risk or environmental challenge and the context answers.',ar:'تحتاج التوصيات إلى خطر مناخي أو تحدٍّ بيئي واحد على الأقل وإلى إجابات السياق.'},
 recNone:{en:'No option qualifies as a recommendation for the selected risks and context. See the other options below, or review your risk selection and applicability checks.',ar:'لا يوجد خيار مؤهل للتوصية للمخاطر والسياق المختارين. راجع الخيارات الأخرى أدناه، أو راجع اختيار المخاطر وفحوص قابلية التطبيق.'},
 methB:{en:'How the rule-based match score is calculated (provisional)',ar:'كيف تُحسب درجة المطابقة القائمة على القواعد (مؤقتًا)'},
 methBL:{en:[
  'Each option has a weight from 0 (not a target) to 3 (strong) for each risk. The weights are the earlier demo weights, kept provisionally for partner review.',
  'Score = sum of the weights for your selected risks, divided by 3 times the number of selected risks, times 100.',
  'Land context: 15 points are subtracted for each level by which the option\'s land need exceeds the public land available, and 10 more points when urban density is high and the land need is high. The score is limited to 0 to 100.',
  'Income is optional context and is not used. Institutional gaps (funding, maintenance, technical know-how) are not used to change the score. They are shown as implementation conditions.',
  'Public land availability is not used as evidence that a roof is available. Roofs are checked separately in the applicability checks.',
  'Screening: an option is Not applicable only when a basic condition is answered No (for example no roof, no coast, no runoff source). Unknown, or a No on a condition that can be assessed or designed (for example structural suitability), gives Requires verification.'],
  ar:[
  'لكل خيار وزن من 0 (ليس هدفًا) إلى 3 (قوي) لكل خطر. الأوزان هي أوزان النسخة التجريبية السابقة، محفوظة مؤقتًا لمراجعة الشركاء.',
  'الدرجة = مجموع أوزان المخاطر التي اخترتها مقسومًا على 3 في عدد المخاطر المختارة، مضروبًا في 100.',
  'سياق الأرض: تُخصم 15 نقطة عن كل مستوى تزيد فيه حاجة الخيار إلى الأرض على الأراضي العامة المتاحة، و10 نقاط إضافية عندما تكون الكثافة العمرانية مرتفعة وحاجة الأرض مرتفعة. وتُحصر الدرجة بين 0 و100.',
  'الدخل سياق اختياري ولا يُستخدم. ولا تُستخدم الفجوات المؤسسية (التمويل والصيانة والخبرة الفنية) لتغيير الدرجة. تُعرض كشروط للتنفيذ.',
  'لا يُستخدم توفر الأراضي العامة دليلًا على توفر سطح. تُفحص الأسطح بشكل منفصل في فحوص قابلية التطبيق.',
  'الفرز: لا ينطبق الخيار إلا عندما يُجاب بـ «لا» عن شرط أساسي (مثل عدم وجود سطح أو ساحل أو مصدر جريان). «غير معروف»، أو «لا» عن شرط يمكن تقييمه أو تصميمه (مثل الملاءمة الإنشائية)، يعني «يتطلب تحققًا».']},
 wTitle:{en:'Risk weights (0 to 3)',ar:'أوزان المخاطر (0 إلى 3)'},
 costP:{en:'Enter the area you could treat and a time horizon. Ranges are for early planning only.',ar:'أدخل المساحة التي يمكن معالجتها وأفقًا زمنيًا. النطاقات للتخطيط المبكر فقط.'},
 fbH:{en:'Feedback for project partners',ar:'ملاحظات لشركاء المشروع'},
 fbRole:{en:'Your role',ar:'دورك'},
 roles:{en:['Local authority','National authority','Research or education','NGO or civil society','Consultant','Other'],ar:['سلطة محلية','سلطة وطنية','بحث أو تعليم','منظمة غير حكومية','استشاري','أخرى']},
 fbUse:{en:'How useful were the results?',ar:'ما مدى فائدة النتائج؟'},
 fbUseLo:{en:'1 = not useful, 5 = very useful',ar:'1 = غير مفيدة، 5 = مفيدة جدًا'},
 fbCom:{en:'Comments (optional)',ar:'تعليقات (اختياري)'},
 fbCons:{en:'Project partners may use my feedback to improve the tool.',ar:'يجوز لشركاء المشروع استخدام ملاحظاتي لتحسين الأداة.'},
 fbSend:{en:'Send feedback',ar:'إرسال الملاحظات'},
 fbErr:{en:'Rate usefulness and tick the consent box to send.',ar:'قيّم الفائدة وضع علامة الموافقة للإرسال.'},
 fbOk:{en:'Thank you. In this prototype the feedback is not transmitted.',ar:'شكرًا لك. لا تُرسل الملاحظات في هذا النموذج التجريبي.'},
 doneL:{en:'completed',ar:'مكتمل'},
 sampleNote:{en:'SAMPLE DATA for testing only. This is not a real assessment.',ar:'بيانات نموذجية للاختبار فقط. هذا ليس تقييمًا حقيقيًا.'}
};
function T(k){return S[k][lang]}

/* ---------- state ---------- */
var STEPS=[{k:'scope'},{k:'ctx'},{k:'risk'},{k:'crit',i:0},{k:'crit',i:1},{k:'crit',i:2},{k:'crit',i:3},{k:'crit',i:4}];
/* scope (1) + density and land (2) + risks (1) + 14 indicators */
var TOTAL_Q=1+2+1+14;
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function freshState(){
  return {scope:{name:'',type:'',other:'',boundary:'',org:'',date:today()},ctx:{},risks:{},scr:{},
    sc:{},just:{},rat:{},evd:{},cf:{},tgt:{},chkOpen:{},
    area:2000,horizon:10,step:0,view:'intro',res:'ready',fb:'form',miss:{},open:{}};
}
var st=freshState();

function nm(o){return lang==='ar'?o.ar:o.en}
function pick(a){return lang==='ar'?a[1]:a[0]}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fmt(n){return Number(n).toLocaleString('en-US')}
function lvlIdx(p){return p<30?0:p<55?1:p<80?2:3}
function ico(n,cls){return '<svg class="ic '+(cls||'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>'}
function riskList(){return RISK.filter(function(r){return st.risks[r.k]})}
function indById(id){return IND.filter(function(i){return i.id===id})[0]}
function blank(s){return !s||!String(s).trim()}

/* answer states: scored (0, 1, 2), unknown ('U'), na ('NA'), unanswered (undefined) */
function isNum(v){return v===0||v===1||v===2}
function ansState(id){var v=st.sc[id];return v===undefined?'unanswered':v==='U'?'unknown':v==='NA'?'na':'scored'}
function indOk(id){var v=st.sc[id];if(v===undefined)return false;if(v==='NA')return !blank(st.just[id]);return true}
function indDone(){return IND.every(function(i){return indOk(i.id)})}
function scopeOk(){var s=st.scope;return !blank(s.name)&&!!s.type&&(s.type!=='other'||!blank(s.other))&&!blank(s.boundary)}
function ctxOk(){return !!st.ctx.density&&!!st.ctx.land}
function answered(){
  var n=0;
  if(scopeOk())n++;
  if(st.ctx.density)n++;
  if(st.ctx.land)n++;
  if(riskList().length)n++;
  IND.forEach(function(i){if(indOk(i.id))n++});
  return n;
}
function allComplete(){return answered()===TOTAL_Q}

/* ---------- static translations ---------- */
var AR={
 skip:'انتقل إلى المحتوى',demoTag:'تجريبي',demoLabel:'نسخة تجريبية: تقديرات توضيحية ستُراجع عند توفر بيانات المشروع',brandSub:'أداة التقييم الذاتي',nAbout:'عن الأداة',nHow:'كيف تعمل',nRes:'المصادر',exit:'العودة إلى المقدمة',
 eyebrow:'مشروع إنتربرغ نكست ميد · الجامعة الأردنية',
 h1:'أداة التقييم الذاتي للحلول القائمة على الطبيعة في المدن المتوسطية',
 lead:'قيّموا مدى دمج الحلول القائمة على الطبيعة في مدينتكم، واطّلعوا على الخيارات الأنسب لمخاطركم المناخية، مع نطاقات إرشادية للأثر والتكلفة.',
 f1:'نحو 10 دقائق',f2:'14 مؤشرًا في 5 معايير',f3:'دون حاجة إلى تسجيل',
 start:'ابدأ التقييم',startNote:'لا تُحفظ النتائج. حمّل التقرير قبل إغلاق الصفحة.',
 whatH:'ما هذه الأداة',whatP:'أداة مجانية على الإنترنت لها أربع مهام: تبيّن مدى دمج الحلول القائمة على الطبيعة في منطقة محددة، وتقترح حلولًا تناسب المخاطر المناخية المحلية، وتقيّم قدرتها على الحد من هذه المخاطر، وتقدّر تكلفتها. موجّهة إلى الشركاء والسلطات العامة والمنظمات التي تخطط للحلول القائمة على الطبيعة أو تنفذها.',
 whyH:'لماذا تهم',whyP:'تخفف الحلول القائمة على الطبيعة الحرارة والفيضانات والجفاف في المدن المتوسطية، لكن اعتمادها الأوسع تعيقه فجوات المعرفة وضعف إشراك أصحاب المصلحة المحليين وقلة الخبرة في تخطيطها وتنسيقها. يبيّن التقييم مواضع القوة والفجوات لتخطيط حلول مناسبة قبل الالتزام بالموارد.',
 devBy:'طورتها الجامعة الأردنية ضمن مشروع NBS4MED (حلول قائمة على الطبيعة لمدن متوسطية قادرة على التكيف مع المناخ)، بتمويل مشترك من الاتحاد الأوروبي عبر برنامج إنتربرغ نكست ميد. يختبر شركاء المشروع هذه النسخة وتشكّل ملاحظاتهم النسخة المحسّنة.',
 howH:'كيف تعمل',s1h:'ابدأ',s1p:'افتح الأداة. لا حاجة إلى حساب أو تسجيل دخول.',s2h:'أجب',s2p:'حدّد المنطقة المقيَّمة، واختر المخاطر المناخية، ثم قيّم 14 مؤشرًا من 0 إلى 2، أو اختر «غير معروف» أو «لا ينطبق».',
 s3h:'احصل على النتائج',s3p:'اطّلع على ملف المعايير ونقاط القوة والفجوات، ثم على الخيارات المناسبة لمخاطرك.',s4h:'حمّل وحسّن',s4p:'احفظ تقريرًا بصيغة PDF أو CSV، وعدّل إجاباتك وأعد التشغيل.',
 resourcesH:'المصادر',stepsH:'خطوات التقييم',sample:'املأ ببيانات نموذجية',clear:'مسح الكل',
 fDisc:'إخلاء مسؤولية التمويل',fPart:'شركاء المشروع',fContact:'التواصل والخصوصية'
};
function applyStatic(){
  $$('[data-i18n]').forEach(function(el){
    if(el.dataset.en===undefined)el.dataset.en=el.innerHTML;
    var k=el.getAttribute('data-i18n');
    el.innerHTML=(lang==='ar'&&AR[k]!==undefined)?AR[k]:el.dataset.en;
  });
}

/* ---------- calculations ---------- */
/* Counts per criterion. A criterion percentage exists only when no indicator in it is Unknown or unanswered.
   Not applicable indicators are left out of the numerator and the denominator. */
function calc(){
  var tot={sum:0,scored:0,unk:0,na:0,un:0};
  var per=CRIT.map(function(cr,ci){
    var items=IND.filter(function(i){return i.c===ci});
    var p={sum:0,scored:0,unk:0,na:0,un:0,n:items.length};
    items.forEach(function(i){
      var v=st.sc[i.id];
      if(isNum(v)){p.sum+=v;p.scored++}else if(v==='U')p.unk++;else if(v==='NA')p.na++;else p.un++;
    });
    p.max=p.scored*2;
    p.open=p.unk+p.un;
    p.status=p.open>0?'incomplete':(p.scored===0?'na':'complete');
    p.pct=p.status==='complete'?Math.round(p.sum/p.max*100):null;
    tot.sum+=p.sum;tot.scored+=p.scored;tot.unk+=p.unk;tot.na+=p.na;tot.un+=p.un;
    return p;
  });
  var open=tot.unk+tot.un;
  var ov={sum:tot.sum,max:tot.scored*2,scored:tot.scored,unk:tot.unk,na:tot.na,un:tot.un,open:open};
  ov.status=open>0?'incomplete':(tot.scored===0?'na':'complete');
  ov.pct=ov.status==='complete'?Math.round(ov.sum/ov.max*100):null;
  var weak=null;per.forEach(function(p,i){if(p.pct!==null&&(weak===null||p.pct<per[weak].pct))weak=i});
  return {per:per,ov:ov,sum:ov.sum,pct:ov.pct,lvl:ov.pct===null?null:lvlIdx(ov.pct),weak:weak};
}
function confCounts(){
  var c={high:0,mid:0,low:0,none:0,n:0};
  IND.forEach(function(i){
    if(!isNum(st.sc[i.id]))return;
    c.n++;
    var k=st.cf[i.id];
    if(k==='high'||k==='mid'||k==='low')c[k]++;else c.none++;
  });
  return c;
}
function rubricText(i,v){return pick(i.r[v])}
function ansLabel(id){
  var v=st.sc[id];
  return v===undefined?T('aNone'):v==='U'?T('aU'):v==='NA'?T('aNA'):T('aNum')(v);
}
function ansCsv(id){var v=st.sc[id];return v===undefined?'Unanswered':v==='U'?'Unknown':v==='NA'?'Not applicable':String(v)}
function cfLabel(id,l){
  var k=st.cf[id];var c=CONF.filter(function(x){return x[0]===k})[0];
  if(!c)return (l||lang)==='ar'?S.cfNone.ar:S.cfNone.en;
  return (l||lang)==='ar'?c[2]:c[1];
}
function scopeTypeLabel(l){
  var s=st.scope,o=SCOPES.filter(function(x){return x[0]===s.type})[0];
  if(!o)return '';
  var t=(l||lang)==='ar'?o[2]:o[1];
  return s.type==='other'&&!blank(s.other)?t+': '+s.other.trim():t;
}

/* match score: the earlier demo risk weights, kept provisionally, plus the earlier land and density context rule */
function rawMatch(o){var s=0;riskList().forEach(function(r){s+=o.w[r.k]});return s}
function suitability(o){
  var rs=riskList();
  if(!rs.length)return 0;
  var p=rawMatch(o)/(rs.length*3)*100;
  var landAvail=st.ctx.land==='low'?0:st.ctx.land==='mid'?1:2;
  if(o.land>landAvail)p-=(o.land-landAvail)*15;
  if(st.ctx.density==='high'&&o.land===2)p-=10;
  return Math.max(0,Math.min(100,Math.round(p)));
}
/* roof structural check: Yes -> confirmed; No or Unknown or unanswered (older ambiguous question) -> assessment pending;
   only the explicit 'unsuitable' answer means assessed and unsuitable */
function roofStruct(){var v=st.scr['roof.struct'];return v==='yes'||v==='confirmed'?'confirmed':v==='unsuitable'?'unsuitable':'pending'}
function chkVisible(optId,k){
  var d=DEP[k];if(!d)return true;
  return !d.some(function(p){if(p==='@space')p=SPACEKEY[optId];return !!p&&st.scr[p]==='no'});
}
function chkKeys(o){return RULE[o.id].chk.filter(function(k){return chkVisible(o.id,k)})}
function chkVal(k){return k==='roof.struct'?(st.scr[k]===undefined?undefined:({confirmed:'yes',pending:'unknown',unsuitable:'unsuitable'})[roofStruct()]):st.scr[k]}
/* statuses: unchecked (no relevant answer), na (essential prerequisite confirmed absent, or roof assessed unsuitable),
   verify (incomplete or an essential condition uncertain), cand (all required checks Yes) */
function screenOpt(o){
  var rule=RULE[o.id],fatal=[],ver=[],seen=0;
  rule.chk.forEach(function(k){
    var v=chkVal(k);
    if((v==='no'&&rule.fatal.indexOf(k)>=0)||(k==='roof.struct'&&v==='unsuitable'))fatal.push({k:k,t:CHK[k].na});
  });
  if(fatal.length)return {status:'na',reasons:fatal};
  var keys=chkKeys(o);
  keys.forEach(function(k){if(chkVal(k)!==undefined)seen++});
  if(!seen)return {status:'unchecked',reasons:[]};
  keys.forEach(function(k){var v=chkVal(k);if(v!=='yes')ver.push({k:k,v:v||'unknown',t:CHK[k].v})});
  return ver.length?{status:'verify',reasons:ver}:{status:'cand',reasons:[]};
}
function riskWhy(o){
  var hit=[],miss=[];
  riskList().forEach(function(r){
    var w=o.w[r.k];
    if(w>0)hit.push({r:r,w:w});else miss.push(r);
  });
  return {hit:hit,miss:miss};
}
function conds(o){
  var out=[];
  ['5.1','5.2','3.2'].forEach(function(id){
    var v=st.sc[id],i=indById(id);
    if(v===0||v===1)out.push({id:id,i:i,t:rubricText(i,v),v:v});
    else if(v==='U')out.push({id:id,i:i,u:true});
  });
  return out;
}
/* ranked: options with a final match score above 0 that are not Not applicable. The match formula is unchanged. */
function recs(){
  var all=OPT.map(function(o,ix){return {o:o,ix:ix,s:suitability(o),raw:rawMatch(o),scr:screenOpt(o),why:riskWhy(o)}});
  var na=all.filter(function(x){return x.scr.status==='na'});
  var rest=all.filter(function(x){return x.scr.status!=='na'});
  var ranked=rest.filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s||a.ix-b.ix});
  ranked.forEach(function(x,i){x.rank=i+1;x.conds=conds(x.o)});
  return {ranked:ranked,na:na,other:rest.filter(function(x){return x.s===0}),all:all};
}
function recFor(id){var r=recs().all.filter(function(x){return x.o.id===id})[0];if(r)r.conds=conds(r.o);return r}
function suitIdx(s){return s>=60?0:s>=35?1:2}
function meter(n,of){var h='<span class="meter" aria-hidden="true">';for(var i=0;i<of;i++)h+='<i class="'+(i<n?'on':'')+'"></i>';return h+'</span>'}
function stLabel(s){return s==='cand'?T('stCand'):s==='verify'?T('stVer'):s==='na'?T('stNA2'):T('stUn')}

/* ---------- step helpers ---------- */
function stepName(s){
  if(s.k==='scope')return T('stScope');
  if(s.k==='ctx')return T('stCtx');
  if(s.k==='risk')return T('stRisk');
  return CRIT[s.i].id+' '+nm(CRIT[s.i]);
}
function stepMissing(s){
  var m=[],sc=st.scope;
  if(s.k==='scope'){
    if(blank(sc.name))m.push({t:T('eName'),href:'#f-name',key:'scope:name'});
    if(!sc.type)m.push({t:T('eType'),href:'#f-type',key:'scope:type'});
    else if(sc.type==='other'&&blank(sc.other))m.push({t:T('eOther'),href:'#f-other',key:'scope:other'});
    if(blank(sc.boundary))m.push({t:T('eBound'),href:'#f-boundary',key:'scope:boundary'});
  }else if(s.k==='ctx'){
    CTX.forEach(function(c){if(!c.opt&&!st.ctx[c.k])m.push({t:T('eCtx')(nm(c)),href:'#f-'+c.k,key:'ctx:'+c.k})});
  }else if(s.k==='risk'){
    if(!riskList().length)m.push({t:T('eRisk'),href:'#riskField',key:'risk'});
  }else{
    IND.forEach(function(i){
      if(i.c!==s.i)return;
      var h='#ind-'+i.id.replace('.','-');
      if(st.sc[i.id]===undefined)m.push({t:i.id+' '+nm(i),href:h,key:'ind:'+i.id});
      else if(st.sc[i.id]==='NA'&&blank(st.just[i.id]))m.push({t:T('eJust')(i.id+' '+nm(i)),href:'#just-'+i.id.replace('.','-'),key:'just:'+i.id});
    });
  }
  return m;
}
function reachable(){
  for(var i=0;i<STEPS.length;i++){if(stepMissing(STEPS[i]).length)return i}
  return STEPS.length-1;
}
function mi(key){return !!(st.miss.keys&&st.miss.keys[key])}
function ierr(key,msg){return mi(key)?'<div class="inline-err">'+msg+'</div>':''}
function seg(name,opts,val,cls){
  return '<div class="seg '+(cls||'')+'">'+opts.map(function(o){
    return '<label><input type="radio" name="'+name+'" value="'+esc(o[0])+'"'+(String(val)===String(o[0])?' checked':'')+'><span>'+esc(o[1])+'</span></label>';
  }).join('')+'</div>';
}
function yn(name,val){return seg(name,[['yes',T('yes')],['no',T('no')],['unknown',T('unk')]],val)}

/* ---------- render: assessment ---------- */
function renderSide(){
  var reach=reachable();
  $('#stepList').innerHTML=STEPS.map(function(s,i){
    var done=!stepMissing(s).length;
    var cur=i===st.step;
    var lab=esc(stepName(s));
    return '<li class="'+(done?'done':'')+'"><button type="button" data-step="'+i+'"'+(cur?' aria-current="step"':'')+(i>reach?' disabled':'')+'>'+
      '<span class="step-no">'+(done?ico('check'):(i+1))+'</span><span>'+lab+(done?'<span class="sr"> ('+T('doneL')+')</span>':'')+'</span></button></li>';
  }).join('');
}
function textField(id,label,bind,val,o){
  o=o||{};
  var key=o.key,bad=key&&mi(key);
  return '<div class="field" id="f-'+id+'"><label class="lab" for="in-'+id+'">'+esc(label)+(o.opt?' <span class="tagq">'+T('opt')+'</span>':'')+'</label>'+
    (o.hint?'<p class="hint">'+esc(o.hint)+'</p>':'')+
    (o.area?'<textarea id="in-'+id+'" data-bind="'+bind+'" rows="3"'+(bad?' class="input-err" aria-invalid="true"':'')+'>'+esc(val||'')+'</textarea>'
      :'<input type="'+(o.type||'text')+'" id="in-'+id+'" data-bind="'+bind+'" value="'+esc(val||'')+'"'+(bad?' class="input-err" aria-invalid="true"':'')+' autocomplete="off">')+
    (key?ierr(key,T('fillIn')):'')+'</div>';
}
function indHtml(i){
  var v=st.sc[i.id],idc=i.id.replace('.','-');
  var bad=mi('ind:'+i.id)||mi('just:'+i.id);
  var opts='';
  for(var s=0;s<3;s++){
    opts+='<label class="opt o'+s+'"><input type="radio" name="ind-'+i.id+'" value="'+s+'"'+(v===s?' checked':'')+'><span class="ob">'+s+'</span><span class="ot">'+esc(pick(i.r[s]))+'</span></label>';
  }
  opts+='<label class="opt ou"><input type="radio" name="ind-'+i.id+'" value="U"'+(v==='U'?' checked':'')+'><span class="ob">?</span><span class="ot"><b>'+T('optU')+'.</b> '+T('optUd')+'</span></label>';
  opts+='<label class="opt on"><input type="radio" name="ind-'+i.id+'" value="NA"'+(v==='NA'?' checked':'')+'><span class="ob">–</span><span class="ot"><b>'+T('optNA')+'.</b> '+T('optNAd')+'</span></label>';
  var sub='';
  if(i.id==='1.2'){
    var t=st.tgt.target,c=st.tgt.cov;
    sub='<div class="sub12"><fieldset class="field" style="margin:0 0 14px"><legend>'+T('tgtQ')+'</legend>'+yn('tgt-target',t)+'</fieldset>'+
      '<fieldset class="field" style="margin:0 0 10px"><legend>'+T('covQ')+'</legend>'+yn('tgt-cov',c)+'</fieldset>'+
      '<p class="note-s" id="tgtHint">'+(t==='yes'&&c==='yes'?T('tgtBoth'):T('tgtNone'))+'</p></div>';
  }
  var hasMore=!blank(st.rat[i.id])||!blank(st.evd[i.id])||!!st.cf[i.id];
  var openMore=st.open[i.id]!==undefined?st.open[i.id]:hasMore;
  var cfo='<option value="">'+T('cfNone')+'</option>'+CONF.map(function(c){return '<option value="'+c[0]+'"'+(st.cf[i.id]===c[0]?' selected':'')+'>'+esc(lang==='ar'?c[2]:c[1])+'</option>'}).join('');
  var more='<details class="more" data-ind="'+i.id+'"'+(openMore?' open':'')+'><summary>'+T('more')+'</summary><div class="morebody">'+
    '<div class="field"><label class="lab" for="rat-'+idc+'">'+T('ratL')+'</label><textarea id="rat-'+idc+'" rows="2" data-bind="rat|'+i.id+'">'+esc(st.rat[i.id]||'')+'</textarea></div>'+
    '<div class="field"><label class="lab" for="evd-'+idc+'">'+T('evdL')+'</label><input type="text" id="evd-'+idc+'" data-bind="evd|'+i.id+'" value="'+esc(st.evd[i.id]||'')+'" autocomplete="off"><p class="hint">'+T('evdH')+'</p></div>'+
    '<div class="field"><label class="lab" for="cf-'+idc+'">'+T('cfL')+'</label><select id="cf-'+idc+'" data-bind="cf|'+i.id+'">'+cfo+'</select></div></div></details>';
  return '<div class="ind'+(bad?' missing':'')+'" id="ind-'+idc+'">'+
    '<div class="code">'+i.id+'</div>'+
    '<div><div class="t">'+esc(nm(i))+'</div><div class="h">'+esc(lang==='ar'?i.ha:i.h)+'</div>'+sub+
    '<fieldset class="rub" style="border:0;padding:0;margin:0;min-width:0"><legend class="sr">'+i.id+' '+esc(nm(i))+'</legend>'+
      '<div class="opts">'+opts+'</div>'+(mi('ind:'+i.id)?'<div class="inline-err">'+T('pickAns')+'</div>':'')+
    '</fieldset>'+
    '<div class="na-box" id="just-'+idc+'"'+(v==='NA'?'':' hidden')+'><label class="lab" for="jin-'+idc+'">'+T('justL')+'</label>'+
      '<input type="text" id="jin-'+idc+'" data-bind="just|'+i.id+'" value="'+esc(st.just[i.id]||'')+'" autocomplete="off">'+ierr('just:'+i.id,T('justErr'))+'</div>'+
    more+'</div></div>';
}
function renderPanel(){
  var s=STEPS[st.step],h='',desc='';
  if(s.k==='scope'){
    desc=T('scopeP');
    var sc=st.scope;
    var typeOpts=SCOPES.map(function(o){return [o[0],lang==='ar'?o[2]:o[1]]});
    h=textField('name',T('fName'),'scope|name',sc.name,{key:'scope:name'})+
      '<fieldset class="field" id="f-type"><legend>'+T('fScope')+'</legend>'+seg('scope-type',typeOpts,sc.type)+ierr('scope:type',T('pickAns'))+'</fieldset>'+
      '<div id="otherBox"'+(sc.type==='other'?'':' hidden')+'>'+textField('other',T('fOther'),'scope|other',sc.other,{key:'scope:other'})+'</div>'+
      textField('boundary',T('fBound'),'scope|boundary',sc.boundary,{area:true,hint:T('fBoundH'),key:'scope:boundary'})+
      textField('org',T('fOrg'),'scope|org',sc.org,{opt:true})+
      textField('date',T('fDate'),'scope|date',sc.date,{type:'date',opt:true});
  }else if(s.k==='ctx'){
    desc=T('ctxP');
    h=CTX.map(function(c){
      var opts=c.o.map(function(o){return [o[0],lang==='ar'?o[2]:o[1]]});
      return '<fieldset class="field" id="f-'+c.k+'"><legend>'+esc(nm(c))+(c.opt?' <span class="tagq">'+T('opt')+'</span>':'')+'</legend>'+seg('ctx-'+c.k,opts,st.ctx[c.k])+ierr('ctx:'+c.k,T('pickAns'))+'</fieldset>';
    }).join('');
  }else if(s.k==='risk'){
    desc=T('riskP');
    h='<fieldset class="field" style="margin:0" id="riskField"><legend class="sr">'+esc(T('stRisk'))+'</legend><p class="hint">'+T('optionalHint')+'</p><div class="risks">'+
      RISK.map(function(r){
        return '<label class="chk"><input type="checkbox" name="risk" value="'+r.k+'"'+(st.risks[r.k]?' checked':'')+'><span><b>'+esc(nm(r))+'</b><small>'+esc(lang==='ar'?r.da:r.d)+'</small></span></label>';
      }).join('')+'</div><div id="riskErr">'+ierr('risk',T('pickOne'))+'</div></fieldset>';
  }else{
    desc=T('evalP');
    h='<p class="areaTag">'+esc(T('forArea')((st.scope.name||'').trim()||'…'))+'</p>'+
      '<div class="scale-key">'+ico('info')+'<span><b>'+T('rub')+'.</b> '+T('key')+'</span></div>'+
      IND.filter(function(i){return i.c===s.i}).map(indHtml).join('');
  }
  $('#stepPanel').innerHTML='<div class="panel-h"><span class="k">'+T('stepOf')(st.step+1,STEPS.length)+'</span><h2 id="stepTitle" tabindex="-1">'+esc(stepName(s))+'</h2><p>'+desc+'</p></div><div class="panel-b">'+h+'</div>';
}
function updateChrome(){
  var n=answered();
  $('#progText').textContent=T('stepOf')(st.step+1,STEPS.length)+' · '+stepName(STEPS[st.step]);
  $('#ansText').textContent=T('ansN')(n,TOTAL_Q);
  var p=Math.round((st.step+1)/STEPS.length*100);
  $('#barFill').style.width=p+'%';
  $('#bar').setAttribute('aria-valuenow',p);
  $('#bar').setAttribute('aria-label',$('#progText').textContent);
  $('#btnBackT').textContent=T('back');
  $('#btnBack').disabled=st.step===0;
  $('#btnNextT').textContent=st.step===STEPS.length-1?T('seeRes'):T('cont');
}
function renderAssess(focus){
  renderSide();renderPanel();updateChrome();
  if(focus){var h=$('#stepTitle');if(h)h.focus({preventScroll:true});window.scrollTo(0,0)}
}
function showErrors(m,s){
  var box=$('#errSummary');
  if(!m.length){box.innerHTML='';return}
  st.miss={keys:{}};m.forEach(function(x){st.miss.keys[x.key]=1});
  renderPanel();
  box.innerHTML='<div class="err">'+ico('alert')+'<div><b>'+T('errTitle')(m.length)+'</b><ul>'+m.map(function(x){return '<li><a href="'+x.href+'">'+esc(x.t)+'</a></li>'}).join('')+'</ul></div></div>';
  box.focus();
}
function clearErrors(){st.miss={};$('#errSummary').innerHTML=''}
function goStep(i,focus){
  st.step=Math.max(0,Math.min(STEPS.length-1,i));
  clearErrors();renderAssess(focus!==false);
}
function next(){
  var s=STEPS[st.step],m=stepMissing(s);
  if(m.length){showErrors(m,s);return}
  if(st.step<STEPS.length-1){goStep(st.step+1);return}
  st.res='loading';
  nav('results');
  setTimeout(function(){st.res='ready';if(st.view==='results')renderResults()},600);
}

/* ---------- render: results ---------- */
function stateCell(i){
  var s=ansState(i.id),v=st.sc[i.id];
  var cls=s==='scored'?'v'+v:s==='unknown'?'vu':s==='na'?'vn':'vx';
  var txt=s==='scored'?String(v):s==='unknown'?T('stU'):s==='na'?T('stNA'):'–';
  return '<div class="cell '+cls+'" title="'+esc(nm(i)+': '+ansLabel(i.id))+'"><span>'+i.id+'</span><span>'+esc(txt)+'<span class="sr"> ('+esc(ansLabel(i.id))+')</span></span></div>';
}
function scopeCardHtml(){
  var s=st.scope,L=T('scopeLabs');
  var rows=[[L[0],s.name],[L[1],scopeTypeLabel()],[L[2],s.boundary],[L[3],s.org],[L[4],s.date]];
  return '<section class="rs first scopecard" aria-labelledby="scH"><h2 id="scH">'+T('scopeH')+'</h2><dl class="sdl">'+
    rows.map(function(r){return '<dt>'+esc(r[0])+'</dt><dd>'+(blank(r[1])?'<span class="soft">'+T('notStated')+'</span>':esc(r[1]))+'</dd>'}).join('')+'</dl>'+
    '<p class="note-s">'+T('protoNote')+'</p></section>';
}
function critRow(ci,r){
  var p=r.per[ci],cr=CRIT[ci],h='',bar='';
  if(p.status==='complete'){
    var lv=LEVELS[lvlIdx(p.pct)];
    bar='<div class="pbar" role="img" aria-label="'+esc(cr.id+' '+nm(cr)+': '+p.pct+'%')+'"><i class="'+lv.c+'" style="width:'+Math.max(p.pct,2)+'%"></i></div>';
    h='<div class="pval"><b>'+T('pts')(p.sum,p.max,p.pct)+'</b> <span class="chip '+lv.c+'">'+esc(nm(lv))+'</span></div>';
  }else if(p.status==='na'){
    bar='<div class="pbar none" role="img" aria-label="'+esc(cr.id+': '+T('naCrit'))+'"></div>';
    h='<div class="pval"><b>'+T('naCrit')+'</b></div>';
  }else{
    bar='<div class="pbar none" role="img" aria-label="'+esc(cr.id+': '+T('notRated'))+'"></div>';
    h='<div class="pval"><b>'+T('notRated')+'</b></div>';
  }
  var extra=p.status==='incomplete'&&p.scored>0?'<div class="pcomp">'+T('partial')(p.sum,p.max,p.scored,p.n)+'</div>':'';
  return '<div class="prow"><div class="pname"><b>'+cr.id+'</b> '+esc(nm(cr))+'</div>'+bar+h+
    '<div class="pcomp">'+T('cmpl')(p.scored,p.n,p.unk,p.na)+'</div>'+extra+'</div>';
}
function profileHtml(r){
  return '<section class="rs" aria-labelledby="prH"><h2 id="prH">'+T('profH')+'</h2><p class="sub">'+T('profSub')+'</p>'+
    '<div class="pgroup"><h3>'+T('g1H')+'</h3><p class="note-s">'+T('g1P')+'</p>'+critRow(0,r)+'</div>'+
    '<div class="pgroup"><h3>'+T('g2H')+'</h3><p class="note-s">'+T('g2P')+'</p>'+[1,2,3,4].map(function(ci){return critRow(ci,r)}).join('')+'</div>'+
    '<h3 class="subh">'+T('heatH')+'</h3>'+
    '<div class="heat">'+CRIT.map(function(cr,ci){return '<div><h4>'+cr.id+' '+esc(lang==='ar'?cr.shAr:cr.sh)+'</h4>'+IND.filter(function(i){return i.c===ci}).map(stateCell).join('')+'</div>'}).join('')+'</div>'+
    '<p class="note-s">'+T('heatKey')+'</p></section>';
}
function eqWeightText(r){
  return T('equalW')(r.per.map(function(p,i){return CRIT[i].id+' '+p.scored}).join(', '));
}
function overallHtml(r){
  var o=r.ov,body='';
  if(o.status==='complete'){
    var L=LEVELS[r.lvl];
    body='<div class="overall"><div><div class="big">'+o.sum+'<small> / '+o.max+'</small></div></div>'+
      '<div><span class="chip lg '+L.c+'">'+esc(nm(L))+'</span> <span style="margin-inline-start:10px;font-weight:600">'+o.pct+'%</span>'+
      '<div class="scale" role="img" aria-label="'+esc(T('levelIs'))+': '+esc(nm(L))+', '+o.pct+'%"><i></i><i></i><i></i><i></i><em style="inset-inline-start:'+o.pct+'%"></em></div>'+
      '<div class="scale-lab" aria-hidden="true"><span>'+nm(LEVELS[0])+'</span><span>'+nm(LEVELS[1])+'</span><span>'+nm(LEVELS[2])+'</span><span>'+nm(LEVELS[3])+'</span></div></div></div>'+
      (o.na?'<p class="thr">'+T('naDen')(o.max)+'</p>':'');
  }else if(o.status==='na'){
    body='<div class="note">'+T('ovNA')+'</div>';
  }else{
    var ul=IND.filter(function(i){return st.sc[i.id]==='U'}).map(function(i){return i.id}).join(', ');
    body='<div class="note">'+ico('info')+' '+T('ovSupp')(o.open,ul)+'</div>';
  }
  return '<section class="rs" aria-labelledby="ovH"><h2 id="ovH">'+T('overallH')+'</h2>'+body+
    '<p class="thr">'+eqWeightText(r)+'</p><p class="thr">'+T('thresholds')+'</p></section>';
}
function gapsData(){
  var g={z:[],o:[],t:[],u:[],n:[]};
  IND.forEach(function(i){
    var v=st.sc[i.id];
    if(v===0)g.z.push(i);else if(v===1)g.o.push(i);else if(v===2)g.t.push(i);else if(v==='U')g.u.push(i);else if(v==='NA')g.n.push(i);
  });
  return g;
}
function gapsHtml(r){
  var g=gapsData();
  function li(i,withText){
    var v=st.sc[i.id];
    return '<li><b>'+i.id+' '+esc(nm(i))+'</b>'+(withText?': '+esc(rubricText(i,v)):'')+(v==='NA'?': '+esc(st.just[i.id]||''):'')+'</li>';
  }
  function row(cls,lab,arr,withText){
    return '<li class="grow"><span class="dot '+cls+'">'+lab+'</span>'+(arr.length?'<ul class="gl">'+arr.map(function(i){return li(i,withText)}).join('')+'</ul>':'<span class="soft">'+T('gapNone')+'</span>')+'</li>';
  }
  var read='';
  if(r.weak===null)read=T('readNone');
  else{
    var z=IND.filter(function(i){return i.c===r.weak&&st.sc[i.id]===0}).map(function(i){return i.id+' '+nm(i)}).join('; ');
    read=T('readTxt')(CRIT[r.weak].id+' '+nm(CRIT[r.weak]),r.per[r.weak].pct,z);
  }
  return '<section class="rs" aria-labelledby="sgH"><h2 id="sgH">'+T('sgH')+'</h2><p class="sub">'+T('sgSub')+'</p>'+
    '<ul class="lights glist">'+row('r',T('gap0'),g.z,true)+row('a',T('gap1'),g.o,true)+row('g',T('strong'),g.t,false)+row('u',T('gapU'),g.u,false)+row('n',T('gapNA'),g.n,false)+'</ul>'+
    '<div class="read"><h3>'+T('readH')+'</h3><p>'+esc(read)+'</p></div></section>';
}
function confHtml(){
  var c=confCounts();
  return '<section class="rs" aria-labelledby="cfH"><h2 id="cfH">'+T('confH')+'</h2>'+
    '<p>'+T('confTxt')(c.n,c.high,c.mid,c.low,c.none)+'</p><p class="note-s">'+T('confNote')+'</p></section>';
}
function detailsHtml(){
  var rows=IND.map(function(i){
    return '<tr><td><b>'+i.id+'</b> '+esc(nm(i))+'</td><td>'+esc(ansLabel(i.id))+'</td><td>'+esc(st.rat[i.id]||(st.sc[i.id]==='NA'?st.just[i.id]||'':'')||'–')+'</td><td>'+esc(st.evd[i.id]||'–')+'</td><td>'+esc(cfLabel(i.id))+'</td></tr>';
  }).join('');
  return '<details class="adv"><summary>'+T('detH')+'</summary><div class="tbl-wrap"><table class="tbl"><thead><tr><th>'+T('colInd')+'</th><th>'+T('colAns')+'</th><th>'+T('colRat')+'</th><th>'+T('colEvd')+'</th><th>'+T('colCf')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div></details>';
}
function methAHtml(){
  return '<details class="adv"><summary>'+T('methA')+'</summary><ul class="meth">'+S.methAL[lang].map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul></details>';
}
function weightsTable(){
  return '<div class="tbl-wrap"><table class="tbl"><caption class="sr">'+T('wTitle')+'</caption><thead><tr><th>'+T('option')+'</th>'+RISK.map(function(r){return '<th class="num">'+esc(nm(r))+'</th>'}).join('')+'</tr></thead><tbody>'+
    OPT.map(function(o){return '<tr><td>'+esc(nm(o))+'</td>'+RISK.map(function(r){return '<td class="num">'+o.w[r.k]+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>';
}
function methBHtml(){
  return '<details class="adv"><summary>'+T('methB')+'</summary><ul class="meth">'+S.methBL[lang].map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul><h4 class="subh2">'+T('wTitle')+'</h4>'+weightsTable()+'</details>';
}
function statusChip(s){return '<span class="chip st-'+s+'">'+stLabel(s)+'</span>'}
function whyText(x){
  var parts=x.why.hit.map(function(h){return nm(h.r)+' ('+T('w'+h.w)+')'});
  var t=parts.join('; ')+'.';
  if(x.why.miss.length)t+=' '+T('noTarget')+x.why.miss.map(function(r){return nm(r)}).join('; ')+'.';
  var landAvail=st.ctx.land==='low'?0:st.ctx.land==='mid'?1:2;
  t+=' '+(x.o.land<=landAvail?T('landOk'):T('landFit'));
  return t;
}
function screenHtml(x){
  var s=x.scr;
  var h='<div class="rline"><b>'+T('screenL')+':</b> '+statusChip(s.status)+'</div>';
  if(s.status==='unchecked')h+='<p class="rtxt">'+T('unchkTxt')+'</p>';
  else if(s.status==='cand')h+='<p class="rtxt">'+T('candDone')+'</p>';
  else h+='<p class="rtxt"><b>'+(s.status==='na'?T('exNA'):T('verL'))+'</b></p><ul class="rl">'+s.reasons.map(function(q){return '<li>'+esc(pick(q.t))+'</li>'}).join('')+'</ul>';
  return h;
}
function condsHtml(x){
  var cx=CLAB.cx[x.o.cx][lang==='ar'?1:0];
  var items=x.conds.map(function(c){
    var t=c.u?T('condU'):(T('condScore')(c.v)+': '+rubricText(c.i,c.v));
    return '<li><b>'+c.id+' '+esc(nm(c.i))+'</b>: '+esc(t)+'</li>';
  });
  var tc=x.conds.some(function(c){return c.id==='3.2'})&&x.o.cx>=1?'<li>'+esc(T('condCx')(cx))+'</li>':'';
  return '<div class="rline"><b>'+T('condL')+':</b></div>'+(items.length?'<ul class="rl">'+items.join('')+tc+'</ul>':'<p class="rtxt">'+T('condNone')+'</p>');
}
function exploreLink(x){
  if(x.o.nbs)return '<button class="btn btn-sm no-print" type="button" data-explore="'+x.o.nbs+'">'+T('exBtn')+ico('arrow','flip')+'</button>';
  return '<p class="note-s nomod">'+T('noMod')+'</p>';
}
/* provisional category (display only) */
function catText(o){var t=pick(CATS[o.cat]);if(o.cat2)t+=' · '+pick(CATS[o.cat2]);return t}
function catLine(o){return '<p class="catline"><b>'+T('catL')+':</b> '+esc(catText(o))+' <span class="soft">('+T('catProv')+')</span></p>'}
/* applicability checks: one small panel per solution, opened from the results page. Answers live in st.scr and are shared
   by key, so opening, closing or switching panels never loses them. */
function chkBtn(o,reopen){
  var open=!!st.chkOpen[o.id];
  return '<button class="btn btn-sm no-print" type="button" data-check="'+o.id+'" aria-expanded="'+open+'" aria-controls="chk-'+o.id+'" aria-label="'+(open?T('chkHide'):(reopen?T('chkReopen'):T('chkBtn')))+': '+esc(nm(o))+'">'+(open?T('chkHide'):(reopen?T('chkReopen'):T('chkBtn')))+'</button>';
}
function chkPanel(o){
  if(!st.chkOpen[o.id])return '';
  var s=screenOpt(o),name=esc(nm(o));
  var h='<div class="chkpanel no-print" id="chk-'+o.id+'" role="group" aria-label="'+T('chkTitle')+': '+name+'"><h4>'+T('chkTitle')+': '+name+'</h4><p class="note-s">'+T('chkNote')+'</p>';
  chkKeys(o).forEach(function(k){
    var c=CHK[k],opts=k==='roof.struct'?[['yes',T('rsConf')],['unknown',T('rsPend')],['unsuitable',T('rsNo')]]:[['yes',T('yes')],['no',T('no')],['unknown',T('unk')]];
    h+='<fieldset class="field"><legend>'+esc(pick(c.q))+'</legend>'+(c.h?'<p class="hint">'+esc(pick(c.h))+'</p>':'')+seg('chk|'+o.id+'|'+k,opts,chkVal(k),k==='roof.struct'?'stack':'')+'</fieldset>';
  });
  return h+'<div class="chkres">'+screenHtml({scr:s})+'</div></div>';
}
function recsHtml(){
  if(!riskList().length||!st.ctx.density||!st.ctx.land)return '<div class="note">'+T('recEmpty')+'</div>';
  var R=recs(),top=R.ranked.slice(0,3);
  function row(x){return {s:x.s,name:nm(x.o),eg:x.o.eg,lnd:CLAB.land[x.o.land][lang==='ar'?1:0],cx:CLAB.cx[x.o.cx][lang==='ar'?1:0],cxN:x.o.cx,lndN:x.o.land}}
  var h='<p class="note-s" style="margin:0 0 14px">'+T('matchNote')+'</p>';
  if(R.ranked.some(function(x){return x.scr.status==='unchecked'}))h+='<div class="note">'+T('prelim')+'</div>';
  if(!R.ranked.length)h+='<div class="note">'+T('recNone')+'</div>';
  else{
    h+='<div class="top3">'+top.map(function(x){
      var d=row(x);
      return '<div class="rc"><div class="rank">'+x.rank+'</div><h3>'+esc(d.name)+'</h3><p>'+(d.eg?esc(d.eg):'&nbsp;')+'</p>'+catLine(x.o)+
        '<div class="mscore"><span class="mlab">'+T('matchL')+'</span><span class="mval">'+x.s+' / 100</span></div>'+
        '<dl><dt>'+T('cplx')+'</dt><dd>'+meter(d.cxN+1,3)+d.cx+'</dd><dt>'+T('landN')+'</dt><dd>'+meter(d.lndN+1,3)+d.lnd+'</dd></dl>'+
        '<div class="why"><b>'+T('whyL')+':</b> '+esc(whyText(x))+'</div>'+
        '<div class="why">'+screenHtml(x)+'<div class="chkact">'+chkBtn(x.o)+'</div>'+chkPanel(x.o)+'</div><div class="why">'+condsHtml(x)+'</div><div class="why">'+exploreLink(x)+'</div></div>';
    }).join('')+'</div><h3 class="sub" style="font-size:19px;color:var(--g900);margin-bottom:12px">'+T('allOpt')+'</h3>';
    var rows=R.ranked.map(function(x){
      var d=row(x),first=x.rank<=3;
      return '<tr class="'+(first?'top-row':'')+'"><td>'+x.rank+'</td><td>'+esc(d.name)+'<div class="g">'+esc(catText(x.o))+'</div></td><td class="num">'+x.s+' / 100</td><td>'+statusChip(x.scr.status)+'</td><td>'+d.cx+'</td><td>'+d.lnd+'</td><td>'+(first?'':chkBtn(x.o))+'</td></tr>'+
        (!first&&st.chkOpen[x.o.id]?'<tr class="chkrow"><td colspan="7">'+chkPanel(x.o)+'</td></tr>':'');
    }).join('');
    h+='<div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>'+T('option')+'</th><th class="num">'+T('matchL')+'</th><th>'+T('status')+'</th><th>'+T('cplx')+'</th><th>'+T('landN')+'</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }
  return h+exclHtml(R)+methBHtml();
}
function exclHtml(R){
  if(!R.na.length&&!R.other.length)return '';
  function li(x,why,reopen){return '<li><b>'+esc(nm(x.o))+'.</b> '+esc(why)+' <span class="soft">'+esc(catText(x.o))+'</span><div class="chkact">'+chkBtn(x.o,reopen)+'</div>'+chkPanel(x.o)+'</li>'}
  var h='<h3 class="sub" style="font-size:19px;color:var(--g900);margin:28px 0 8px">'+T('exclH')+'</h3>';
  if(R.na.length)h+='<h4 class="subh2">'+T('exNA')+'</h4><ul class="rl exl">'+R.na.map(function(x){return li(x,x.scr.reasons.map(function(q){return pick(q.t)}).join(' '),true)}).join('')+'</ul>';
  if(R.other.length)h+='<h4 class="subh2">'+T('otherH')+'</h4><p class="note-s">'+T('otherP')+'</p><ul class="rl exl">'+R.other.map(function(x){return li(x,x.raw===0?T('exNoWhy'):T('exZeroWhy'),false)}).join('')+'</ul>';
  return h;
}
function fbHtml(){
  if(st.fb==='ok')return '<div class="ok-box" role="status">'+T('fbOk')+'</div>';
  return '<form class="fb" id="fbForm" novalidate><div id="fbErr"></div>'+
    '<div class="field"><label class="lab" for="fbRole">'+T('fbRole')+'</label><select id="fbRole">'+T('roles').map(function(r){return '<option>'+esc(r)+'</option>'}).join('')+'</select></div>'+
    '<fieldset><legend>'+T('fbUse')+'</legend><p class="hint" style="font-size:15px;color:var(--soft);margin:0 0 8px">'+T('fbUseLo')+'</p><div class="seg">'+
    [1,2,3,4,5].map(function(n){return '<label><input type="radio" name="fbUse" value="'+n+'"><span>'+n+'</span></label>'}).join('')+'</div></fieldset>'+
    '<div class="field"><label class="lab" for="fbCom">'+T('fbCom')+'</label><textarea id="fbCom"></textarea></div>'+
    '<label class="chk" style="margin-bottom:20px"><input type="checkbox" id="fbCons"><span><b style="font-weight:400">'+T('fbCons')+'</b></span></label>'+
    '<button class="btn" type="submit">'+T('fbSend')+'</button></form>';
}
function renderResults(){
  var box=$('#resRoot');
  if(st.res==='loading'){
    box.innerHTML='<div class="res-head"><h1 id="resTitle" tabindex="-1">'+T('resTitle')+'</h1></div><div class="skel" role="status" aria-label="'+T('loading')+'" style="margin-top:32px"><div style="width:40%"></div><div style="width:90%"></div><div style="width:75%"></div><div style="width:85%"></div></div>';
    return;
  }
  var r=calc();
  box.innerHTML=
    '<div class="res-head"><h1 id="resTitle" tabindex="-1">'+T('resTitle')+'</h1>'+
      '<button class="btn no-print" type="button" id="editAns">'+ico('back','flip')+'<span>'+T('edit')+'</span></button></div>'+
    scopeCardHtml()+
    '<section class="rs" aria-labelledby="cmH"><h2 id="cmH">'+T('compH')+'</h2><p class="compl">'+T('compTxt')(r.ov.scored,r.ov.unk,r.ov.na)+'</p></section>'+
    '<div class="report no-print" role="group" aria-label="'+T('repH')+'"><b>'+T('repH')+'</b>'+
      '<button class="btn btn-primary" type="button" id="dlPdf">'+ico('print')+'<span>'+T('pdf')+'</span></button>'+
      '<button class="btn" type="button" id="dlPdfDetail">'+ico('print')+'<span>'+T('pdfDetail')+'</span></button>'+
      '<button class="btn" type="button" id="dlCsv">'+ico('down')+'<span>'+T('csv')+'</span></button>'+
      '<div class="toast" id="dlNote" role="status"></div></div>'+
    profileHtml(r)+overallHtml(r)+methAHtml()+gapsHtml(r)+confHtml()+
    '<section class="rs" aria-labelledby="dtH"><h2 id="dtH">'+T('detH')+'</h2>'+detailsHtml().replace('<details class="adv"><summary>'+T('detH')+'</summary>','<details class="adv" open><summary>'+T('detH')+'</summary>')+'</section>'+
    '<section class="rs" aria-labelledby="rcH"><h2 id="rcH">'+T('recH')+'</h2><p class="sub">'+T('recP')+'</p>'+recsHtml()+'</section>'+
    '<section class="rs no-print" aria-labelledby="coH"><h2 id="coH">'+window.NBS4MED_EXPLORE.exploreTitle()+'</h2>'+window.NBS4MED_EXPLORE.ctaHtml()+'</section>'+
    '<section class="rs no-print" aria-labelledby="fbH"><h2 id="fbH">'+T('fbH')+'</h2><div id="fbBody" style="margin-top:14px">'+fbHtml()+'</div></section>';
}

/* ---------- routing ---------- */
/* navigation works from state; the URL hash is only a convenience (it can be blocked in embedded previews) */
function nav(v){
  var h={intro:'',assess:'#assessment',results:'#results',explore:'#explore'}[v];
  if((v==='results'||v==='explore')&&!allComplete())v='assess';
  try{history.pushState({v:v},'',h||(location.pathname+location.search))}catch(err){}
  if(v==='results'&&!allComplete())v='assess';
  show(v);
  if(v==='intro'){window.scrollTo(0,0);document.title='NBS4MED Self-Evaluation Tool'}
}
function scrollToIntro(id){
  var el=document.getElementById(id);
  if(!el)return;
  if(st.view!=='intro')nav('intro');
  setTimeout(function(){el.scrollIntoView({behavior:reduceMotion()?'auto':'smooth'})},0);
}
function reduceMotion(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches}
function show(v){
  st.view=v;
  $('#view-intro').hidden=v!=='intro';
  $('#view-assess').hidden=v!=='assess';
  $('#view-results').hidden=v!=='results';
  $('#view-explore').hidden=v!=='explore';
  $('#introNav').hidden=v!=='intro';
  $('#exitLink').hidden=v==='intro';
  if(v==='assess'){st.step=Math.min(st.step,reachable());renderAssess(true);document.title='NBS4MED · '+T('stepsH0')}
  else if(v==='results'){document.title='NBS4MED · '+T('resTitle');renderResults();window.scrollTo(0,0);var h=$('#resTitle');if(h)h.focus({preventScroll:true})}
  else if(v==='explore'){document.title='NBS4MED · '+window.NBS4MED_EXPLORE.exploreTitle();window.NBS4MED_EXPLORE.render();window.scrollTo(0,0);var h2=$('#exTitle');if(h2)h2.focus({preventScroll:true})}
}
S.stepsH0={en:'Assessment',ar:'التقييم'};
function route(){
  var h=location.hash;
  if(h==='#assessment')show('assess');
  else if(h==='#results'){
    if(allComplete())show('results');
    else{show('assess')}
  }else if(h==='#explore'){
    if(allComplete())show('explore');
    else{show('assess')}
  }else if(h==='#about'||h==='#how'||h==='#resources'){
    show('intro');
    setTimeout(function(){var el=document.getElementById(h.slice(1));if(el)el.scrollIntoView()},0);
  }else{
    show('intro');
    if(h.length>1){var el=document.getElementById(h.slice(1));if(el)setTimeout(function(){el.scrollIntoView()},0)}
    else window.scrollTo(0,0);
    document.title='NBS4MED Self-Evaluation Tool';
  }
}
window.addEventListener('hashchange',route);
window.addEventListener('popstate',route);

/* ---------- events ---------- */
function afterEdit(t){
  if(st.view!=='assess')return;
  var s=STEPS[st.step];
  var fs=t.closest&&t.closest('fieldset');
  if(fs){var fe=$('.inline-err',fs);if(fe&&t.name&&t.name.indexOf('ind-')!==0)fe.remove()}
  if(!stepMissing(s).length){clearErrors();$$('.inline-err',$('#stepPanel')).forEach(function(x){x.remove()})}
  renderSide();updateChrome();
}
/* re-render the results page after an applicability answer or panel toggle; scroll position and focus are kept */
function refreshResults(focusSel){
  var y=window.scrollY;
  renderResults();
  window.scrollTo({top:y,behavior:'instant'});
  var el=focusSel&&$(focusSel);if(el)el.focus({preventScroll:true});
}
function setBind(el){
  var p=el.dataset.bind.split('|'),v=el.value;
  if(p[0]==='scope')st.scope[p[1]]=v;
  else st[p[0]][p[1]]=v;
}
document.addEventListener('input',function(e){
  var t=e.target;
  if(!t.dataset||!t.dataset.bind||t.tagName==='SELECT')return;
  setBind(t);
  if(t.type!=='date'){var f=t.closest('.field');if(f){var ie=$('.inline-err',f);if(ie)ie.remove();t.classList.remove('input-err')}}
  afterEdit(t);
});
document.addEventListener('change',function(e){
  var t=e.target,n=t.name||'';
  if(t.dataset&&t.dataset.bind){setBind(t);afterEdit(t);return}
  if(n==='scope-type'){
    st.scope.type=t.value;var ob=$('#otherBox');if(ob)ob.hidden=t.value!=='other';
  }
  else if(n.indexOf('ctx-')===0){st.ctx[n.slice(4)]=t.value}
  else if(n==='risk'){st.risks[t.value]=t.checked;var re=$('#riskErr');if(re&&riskList().length)re.innerHTML=''}
  else if(n.indexOf('chk|')===0){st.scr[n.split('|')[2]]=t.value;refreshResults('input[name="'+n+'"][value="'+t.value+'"]');return}
  else if(n.indexOf('tgt-')===0){
    st.tgt[n.slice(4)]=t.value;
    var hn=$('#tgtHint');if(hn)hn.textContent=st.tgt.target==='yes'&&st.tgt.cov==='yes'?T('tgtBoth'):T('tgtNone');
  }
  else if(n.indexOf('ind-')===0){
    var id=n.slice(4);
    st.sc[id]=t.value==='U'||t.value==='NA'?t.value:+t.value;
    var row=t.closest('.ind');row.classList.remove('missing');
    var nb=$('.na-box',row);if(nb)nb.hidden=t.value!=='NA';
    $$('.inline-err',$('.rub',row)).forEach(function(x){x.remove()});
    if(t.value!=='NA'){var je=$('.na-box .inline-err',row);if(je)je.remove()}
  }
  else return;
  afterEdit(t);
});
document.addEventListener('toggle',function(e){
  var d=e.target;
  if(d&&d.classList&&d.classList.contains('more')&&d.dataset.ind)st.open[d.dataset.ind]=d.open;
},true);
document.addEventListener('click',function(e){
  var t=e.target.closest('button,a');
  if(!t)return;
  var id=t.id;
  if(id==='startBtn'){e.preventDefault();nav('assess');return}
  if(id==='exitLink'||id==='brandLink'){e.preventDefault();nav('intro');return}
  if(id==='btnNext'){next();return}
  if(id==='btnBack'){goStep(st.step-1);return}
  if(t.dataset.step!==undefined&&t.closest('#stepList')){goStep(+t.dataset.step);return}
  if(t.dataset.explore){window.NBS4MED_EXPLORE.open(t.dataset.explore);return}
  if(t.dataset.check){st.chkOpen[t.dataset.check]=!st.chkOpen[t.dataset.check];refreshResults('[data-check="'+t.dataset.check+'"]');return}
  if(id==='editAns'){st.step=0;nav('assess');return}
  if(id==='fillSample'){fillSample();return}
  if(id==='clearAll'){var keep=st.view;st=freshState();st.view=keep;window.NBS4MED_CORE.st=st;clearErrors();renderAssess(true);return}
  if(id==='dlCsv'){window.NBS4MED_EXPLORE.csv();return}
  if(id==='dlPdf'){window.NBS4MED_EXPLORE.printSummary();return}
  if(id==='dlPdfDetail'){window.NBS4MED_EXPLORE.print();return}
  if(t.dataset.lang){setLang(t.dataset.lang);return}
  if(t.tagName==='A'){
    var href=t.getAttribute('href')||'';
    if(href.charAt(0)==='#'&&href.length>1){
      e.preventDefault();
      if(href==='#about'||href==='#how'||href==='#resources'){scrollToIntro(href.slice(1))}
      else if(href==='#main'){var mn=$('#main');mn.setAttribute('tabindex','-1');mn.focus()}
      else{
        var target=document.querySelector(href);
        if(target){target.scrollIntoView({block:'center'});var inp=$('input,textarea',target);if(inp)inp.focus()}
      }
    }
  }
});
document.addEventListener('submit',function(e){
  if(e.target.id!=='fbForm')return;
  e.preventDefault();
  var use=document.querySelector('input[name=fbUse]:checked'),cons=$('#fbCons').checked;
  if(!use||!cons){$('#fbErr').innerHTML='<div class="err" role="alert">'+ico('alert')+'<span>'+T('fbErr')+'</span></div>';return}
  st.fb='ok';$('#fbBody').innerHTML=fbHtml();
});
/* clearly labelled sample data, for testing only */
function fillSample(){
  st.scope={name:'SAMPLE DATA: Example neighbourhood (not a real area)',type:'neighbourhood',other:'',boundary:'SAMPLE DATA for testing only. This is not a real assessment and the boundary is invented.',org:'Sample organisation (test)',date:today()};
  st.ctx={density:'high',land:'low',income:'mid'};
  st.risks={heat:true,flood:true};
  st.scr={};st.chkOpen={};
  st.sc={'1.1':2,'1.2':1,'1.3':1,'2.1':1,'2.2':1,'2.3':0,'3.1':1,'3.2':1,'3.3':1,'4.1':2,'4.2':1,'5.1':1,'5.2':0,'5.3':0};
  st.just={};st.tgt={target:'no',cov:'no'};
  st.rat={'1.1':'SAMPLE: inventory is a spreadsheet kept by the parks department.','5.2':'SAMPLE: no budget line for upkeep.'};
  st.evd={'1.1':'SAMPLE: Parks inventory 2024 (example title)'};
  st.cf={'1.1':'high','5.2':'mid','2.3':'low'};
  clearErrors();renderAssess(false);
}
function setLang(l){
  lang=l;
  document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';
  $$('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===l))});
  applyStatic();
  if(st.view==='assess'){var errs=stepMissing(STEPS[st.step]);var had=!!$('#errSummary').innerHTML;renderAssess(false);if(had&&errs.length)showErrors(errs,STEPS[st.step])}
  if(st.view==='results')renderResults();
  if(st.view==='explore')window.NBS4MED_EXPLORE.render();
}

/* EU flag stars */
(function(){
  var g=$('#stars'),h='';
  for(var i=0;i<12;i++){
    var a=i*Math.PI/6,x=42+17*Math.sin(a),y=28-17*Math.cos(a);
    h+='<path transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')" d="M0-3.2L.9-1 3.1-.9 1.4.6 2 3 0 1.6-2 3-1.4.6-3.1-.9-.9-1z"/>';
  }
  g.innerHTML=h;
})();

/* shared with explore.js (impact and cost step, report) */
window.NBS4MED_CORE={st:st,lang:function(){return lang},T:T,S:S,esc:esc,fmt:fmt,ico:ico,nm:nm,pick:pick,calc:calc,recs:recs,recFor:recFor,
  riskList:riskList,indDone:indDone,allComplete:allComplete,CRIT:CRIT,IND:IND,CTX:CTX,RISK:RISK,CONF:CONF,LEVELS:LEVELS,OPT:OPT,CHK:CHK,
  lvlIdx:lvlIdx,nav:nav,ansLabel:ansLabel,ansCsv:ansCsv,ansState:ansState,cfLabel:cfLabel,confCounts:confCounts,scopeTypeLabel:scopeTypeLabel,
  rubricText:rubricText,gapsData:gapsData,stLabel:stLabel,whyText:whyText,optByNbs:optByNbs,eqWeightText:eqWeightText,weightsTable:weightsTable,
  chkKeys:chkKeys,chkVal:chkVal,roofStruct:roofStruct,catText:catText,CATS:CATS,RULE:RULE,methA:function(){return S.methAL[lang]},methB:function(){return S.methBL[lang]},
  isNum:isNum,today:today,fillSample:fillSample,renderAssess:renderAssess,freshState:freshState,setState:function(n){st=n;window.NBS4MED_CORE.st=n}};

/* init */
applyStatic();
route();
})();
