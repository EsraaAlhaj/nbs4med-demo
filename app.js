(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var lang='en';

/* ---------- data ---------- */
/* Existing NBS integration: three descriptive indicators on a 0 to 2 scale. The descriptions are a PROVISIONAL UJ prototype
   rubric for partner review against the PROMEA framework. They are not an official scoring method and are not combined. */
var IND=[
 {id:'A',c:0,en:'Spatial distribution and coverage',ar:'التوزع المكاني والتغطية',h:'How extensively existing NBS are present across the relevant parts of the area.',ha:'مدى انتشار الحلول القائمة على الطبيعة في الأجزاء ذات الصلة من المنطقة.',
  r:[['Existing NBS are limited to isolated or very small locations.','الحلول القائمة على الطبيعة محصورة في مواقع معزولة أو صغيرة جدًا.'],
     ['Existing NBS cover some parts of the area, but large relevant parts have none.','تغطي الحلول القائمة بعض أجزاء المنطقة، لكن أجزاء كبيرة ذات صلة تخلو منها.'],
     ['Existing NBS are present across most of the relevant parts of the area.','الحلول القائمة موجودة في معظم الأجزاء ذات الصلة من المنطقة.']]},
 {id:'B',c:0,en:'Ecological and climate functionality',ar:'الوظائف البيئية والمناخية',h:'Which relevant environmental or climate-related functions existing NBS currently provide.',ha:'الوظائف البيئية أو المرتبطة بالمناخ التي تؤديها الحلول القائمة حاليًا.',
  r:[['Existing NBS provide no clearly identifiable ecological or climate-related function.','لا تؤدي الحلول القائمة وظيفة بيئية أو مناخية يمكن تحديدها بوضوح.'],
     ['Existing NBS provide some relevant functions, but these are limited or only partly working.','تؤدي الحلول القائمة بعض الوظائف ذات الصلة، لكنها محدودة أو تعمل جزئيًا.'],
     ['Existing NBS clearly provide relevant functions, such as shade, rainwater infiltration or water storage, and are working as intended.','تؤدي الحلول القائمة وظائف ذات صلة بوضوح، مثل الظل أو تسرب مياه الأمطار أو تخزين المياه، وتعمل كما هو مقصود.']]},
 {id:'C',c:0,en:'Integration with the site',ar:'التكامل مع الموقع',h:'How existing NBS interact with the site layout, land use and relevant infrastructure.',ha:'كيف تتفاعل الحلول القائمة مع تخطيط الموقع واستخدامات الأرض والبنية التحتية ذات الصلة.',
  r:[['Existing NBS are separate from the site layout, land use and infrastructure.','الحلول القائمة منفصلة عن تخطيط الموقع واستخدامات الأرض والبنية التحتية.'],
     ['Existing NBS are partly connected to the site layout, land use or infrastructure.','الحلول القائمة مرتبطة جزئيًا بتخطيط الموقع أو استخدامات الأرض أو البنية التحتية.'],
     ['Existing NBS are planned into the site layout and connected to land use and relevant infrastructure.','الحلول القائمة مخططة ضمن تخطيط الموقع ومرتبطة باستخدامات الأرض والبنية التحتية ذات الصلة.']]}
];
var LV=[['Limited','Partial','Substantial'],['محدود','جزئي','كبير']];
var SCOPES=[['site','Site / Project Area','الموقع / منطقة المشروع'],['neighbourhood','Neighbourhood / District','الحي / المنطقة السكنية'],['municipality','Municipality / City','البلدية / المدينة']];
/* pilot names as given by the project; a city or municipality is listed only where the project context names one */
var PILOTS=[
 {id:'es',name:['Cerdanyola Urban Forest Pilot','تجربة الغابة الحضرية في سيردانيولا'],country:['Spain','إسبانيا'],city:['Cerdanyola del Vallès','سيردانيولا ديل فاليس']},
 {id:'tr',name:['İzmir Green Roof Pilot','تجربة السطح الأخضر في إزمير'],country:['Türkiye','تركيا'],city:['İzmir','إزمير']},
 {id:'gr',name:['Sikionies Smart Eco-Park Pilot','تجربة المنتزه البيئي الذكي في سيكيونيس'],country:['Greece','اليونان']},
 {id:'tn',name:['Rainwater Retention Basin Pilot','تجربة حوض احتجاز مياه الأمطار'],country:['Tunisia','تونس']},
 {id:'eg',name:['Heliopolis University Green Corridor Pilot','تجربة الممر الأخضر في جامعة هليوبوليس'],country:['Egypt','مصر']}
];
var CTX=[
 {k:'density',en:'Urban Density',ar:'الكثافة العمرانية',hint:{en:'Qualitative description, not a numerical threshold.',ar:'وصف نوعي وليس عتبة رقمية.'},
  o:[['low','Low','منخفضة','Predominantly open or sparsely built-up.','مناطق مفتوحة أو قليلة البناء في الغالب.'],['mid','Medium','متوسطة','Mix of buildings and open spaces.','مزيج من المباني والمساحات المفتوحة.'],['high','High','مرتفعة','Predominantly built-up, with limited open space.','مبنية في معظمها، مع مساحات مفتوحة محدودة.']]},
 {k:'land',en:'Public Land Available for NBS',ar:'الأراضي العامة المتاحة للحلول القائمة على الطبيعة',hint:{en:'Consider publicly accessible or publicly owned land within the selected assessment area.',ar:'يُقصد الأراضي المتاحة للجمهور أو المملوكة للدولة ضمن منطقة التقييم المحددة.'},
  o:[['low','Limited','محدودة'],['mid','Moderate','متوسطة'],['high','Abundant','وفيرة'],['unknown','Unknown','غير معروفة']]}
];
/* the five core risks follow the PROMEA framework; Not Sure is a separate, mutually exclusive answer */
var RISK=[
 {k:'heat',en:'Heatwaves',ar:'موجات الحر',d:'Extreme heat and prolonged periods of high temperatures.',da:'الحرارة الشديدة وفترات طويلة من درجات الحرارة المرتفعة.'},
 {k:'flood',en:'Flooding',ar:'الفيضانات',d:'Heavy rainfall, flash floods and surface flooding.',da:'الأمطار الغزيرة والسيول والفيضانات السطحية.'},
 {k:'drought',en:'Drought',ar:'الجفاف',d:'Prolonged dry periods and water scarcity.',da:'فترات جفاف طويلة وشح المياه.'},
 {k:'coast',en:'Coastal Storms',ar:'العواصف الساحلية',d:'Storm surges and coastal flooding.',da:'اندفاع مياه العواصف والفيضانات الساحلية.'},
 {k:'land',en:'Land Degradation',ar:'تدهور الأراضي',d:'Soil erosion and deterioration of land conditions.',da:'تعرية التربة وتدهور حالة الأراضي.'}
];
var UNSURE={k:'unsure',en:'Not Sure / Further Assessment Needed',ar:'غير متأكد / يلزم مزيد من التقييم'};
/* the provisional demo weights exist for these three risks only */
var MATCHABLE=['heat','flood','drought'];
var CONF=[['high','High: documented evidence','عالية: أدلة موثقة'],['mid','Medium: staff estimate','متوسطة: تقدير الموظفين'],['low','Low: informal judgement','منخفضة: تقدير غير رسمي']];
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
cfL:{en:'Strength of evidence for this answer',ar:'قوة الأدلة المؤيدة لهذه الإجابة'},cfNone:{en:'Not stated',ar:'غير محددة'},
 tgtQ:{en:'Is there a local target for NBS or for green and blue space coverage?',ar:'هل يوجد هدف محلي للحلول أو لتغطية المساحات الخضراء والزرقاء؟'},
 covQ:{en:'Is the current coverage known (mapped or measured)?',ar:'هل التغطية الحالية معروفة (مرسومة أو مقيسة)؟'},
 tgtBoth:{en:'A target exists and coverage is known: compare them when you choose the score.',ar:'يوجد هدف والتغطية معروفة: قارن بينهما عند اختيار الدرجة.'},
 tgtNone:{en:'No numerical comparison is needed. Score from what you can observe, or choose Unknown.',ar:'لا حاجة إلى مقارنة رقمية. قيّم بحسب ما يمكنك ملاحظته، أو اختر «غير معروف».'},
 yes:{en:'Yes',ar:'نعم'},no:{en:'No',ar:'لا'},unk:{en:'Unknown',ar:'غير معروف'},
 stepOf:{en:function(a,b){return 'Step '+a+' of '+b},ar:function(a,b){return 'الخطوة '+a+' من '+b}},
 ansN:{en:function(a,b){return a+' of '+b+' answered'},ar:function(a,b){return a+' من '+b+' مُجاب عنها'}},
 back:{en:'Back',ar:'رجوع'},cont:{en:'Continue',ar:'متابعة'},seeRes:{en:'See results',ar:'عرض النتائج'},
 stScope:{en:'Assessment area',ar:'منطقة التقييم'},stCtx:{en:'Site Context',ar:'سياق الموقع'},
 stRisk:{en:'Local Climate Risks',ar:'المخاطر المناخية المحلية'},stNbs:{en:'Existing NBS Integration',ar:'دمج الحلول القائمة على الطبيعة الحالية'},
 nbsP:{en:'Describe the nature-based solutions that already exist in the assessment area, as they are today.',ar:'صِف الحلول القائمة على الطبيعة الموجودة فعلًا في منطقة التقييم، كما هي اليوم.'},
 nbsQ:{en:'Are there any existing Nature-based Solutions in the assessment area?',ar:'هل توجد حلول قائمة على الطبيعة في منطقة التقييم؟'},
 nbsH:{en:'Existing NBS are planned or managed to provide environmental or climate-related benefits, for example green roofs, rain gardens, constructed wetlands or tree corridors. Ordinary green space, such as lawns or planted verges, is not counted unless it serves such a purpose.',ar:'الحلول القائمة على الطبيعة مخططة أو مُدارة لتحقيق منافع بيئية أو مناخية، مثل الأسطح الخضراء والحدائق المطرية والأراضي الرطبة المنشأة وممرات الأشجار. ولا تُعدّ المساحات الخضراء العادية، كالمروج والأشرطة المزروعة، حلولًا قائمة على الطبيعة ما لم تؤدِّ هذا الغرض.'},
 nbsNS:{en:'Not sure',ar:'غير متأكد'},
 nbsTypes:{en:'Types of existing NBS',ar:'أنواع الحلول القائمة'},nbsTypesH:{en:'Select all that apply. Optional.',ar:'اختر كل ما ينطبق. اختياري.'},nbsOther:{en:'Other type',ar:'نوع آخر'},nbsOtherF:{en:'Other type (describe)',ar:'نوع آخر (صِفه)'},
 nbsNo:{en:'No existing NBS are reported. The indicators below are skipped, and this is recorded as reported absence, not as a score.',ar:'لم يُبلَّغ عن حلول قائمة. تُتخطى المؤشرات أدناه، ويُسجَّل ذلك غيابًا مُبلَّغًا عنه وليس درجة.'},
 nbsUn:{en:'Insufficient information to describe existing NBS. The indicators below are skipped, and this is recorded as missing information, not as zero.',ar:'المعلومات غير كافية لوصف الحلول القائمة. تُتخطى المؤشرات أدناه، ويُسجَّل ذلك معلومة ناقصة وليس صفرًا.'},
 nbsIndH:{en:'Existing NBS indicators',ar:'مؤشرات الحلول القائمة'},
 nbsKey:{en:'Choose the description that best matches the existing NBS as they are today. The 0 to 2 descriptions are a provisional project rubric for partner review. They describe the NBS present in the area, not the quality of the evidence or the capacity of the organisation, and they are not combined into a score. Unknown means the information is missing and is never recorded as 0.',ar:'اختر الوصف الأقرب إلى الحلول القائمة كما هي اليوم. أوصاف 0 إلى 2 قاعدة مؤقتة للمشروع لمراجعة الشركاء. وهي تصف الحلول الموجودة في المنطقة، لا جودة الأدلة ولا قدرة الجهة، ولا تُجمع في درجة واحدة. «غير معروف» تعني أن المعلومة ناقصة ولا تُسجَّل صفرًا.'},
 s1H:{en:'Existing NBS Integration',ar:'دمج الحلول القائمة على الطبيعة الحالية'},
 nbsStat:{en:'Existing NBS',ar:'الحلول القائمة'},
 nbsSY:{en:'Reported present in the assessment area.',ar:'مُبلَّغ عنها في منطقة التقييم.'},nbsSN:{en:'Reported absent from the assessment area.',ar:'مُبلَّغ عن غيابها من منطقة التقييم.'},nbsSU:{en:'Not determined: insufficient information.',ar:'غير محدد: المعلومات غير كافية.'},
 nbsNA:{en:'Not assessed',ar:'غير مقيَّم'},nbsLvl:{en:'Level',ar:'المستوى'},
 nbsWarn:{en:function(l){return 'Not assessed because the information is missing: '+l+'. Missing information is not recorded as zero.'},ar:function(l){return 'غير مقيَّم لأن المعلومة ناقصة: '+l+'. لا تُسجَّل المعلومة الناقصة صفرًا.'}},
 nbsNote:{en:'Provisional descriptions for partner review. They are shown one by one and are not combined into an overall score.',ar:'أوصاف مؤقتة لمراجعة الشركاء. تُعرض كل على حدة ولا تُجمع في درجة إجمالية.'},
 s3H:{en:'Potential Climate Impact and Supporting Calculations',ar:'الأثر المناخي المحتمل والحسابات الداعمة'},s4H:{en:'Indicative Cost and Implementation Considerations',ar:'التكلفة الإرشادية واعتبارات التنفيذ'},
 s3P:{en:'Select a solution to see supporting calculations. Climate-risk mitigation estimates, physical calculations and literature reference evidence are shown separately.',ar:'اختر حلًّا لعرض الحسابات الداعمة. تُعرض تقديرات التخفيف من المخاطر المناخية والحسابات الفيزيائية والأدلة المرجعية من الأدبيات كلًّا على حدة.'},
 s4P:{en:'Cost ranges and implementation conditions for the selected solution appear here.',ar:'تظهر هنا نطاقات التكلفة وشروط التنفيذ للحل المختار.'},
 mitH:{en:'Climate-risk mitigation impact',ar:'أثر التخفيف من المخاطر المناخية'},mitNone:{en:'Quantitative climate-risk mitigation impact is not currently estimated.',ar:'لا يُقدَّر حاليًا الأثر الكمي للتخفيف من المخاطر المناخية.'},
 implH:{en:'Implementation considerations (optional)',ar:'اعتبارات التنفيذ (اختيارية)'},implNote:{en:'These questions do not change the applicability result.',ar:'لا تغيّر هذه الأسئلة نتيجة قابلية التطبيق.'},implNot:{en:'Not yet checked',ar:'لم يُفحص بعد'},
 implQ:{reg:['Have the permits or regulatory requirements for this solution been identified?','هل جرى تحديد التراخيص أو المتطلبات التنظيمية لهذا الحل؟'],
  stake:['Have the landowner and other relevant stakeholders been consulted?','هل جرت استشارة مالك الأرض وأصحاب المصلحة المعنيين؟'],
  stakeRoof:['Has the building owner agreed in principle to a green roof?','هل وافق مالك المبنى مبدئيًا على سطح أخضر؟'],
  tech:['Is the technical expertise needed to design and build it available?','هل تتوفر الخبرة الفنية اللازمة لتصميمه وإنشائه؟'],
  maint:['Is there an arrangement for maintaining it, including watering where needed?','هل يوجد ترتيب لصيانته، بما في ذلك الري عند الحاجة؟'],
  fund:['Is funding for building and maintaining it identified?','هل جرى تحديد تمويل لإنشائه وصيانته؟']},
 implSumN:{en:'Implementation considerations are optional and are answered per solution. No answers have been entered for this solution.',ar:'اعتبارات التنفيذ اختيارية وتُجاب لكل حل على حدة. لم تُدخل إجابات لهذا الحل.'},
 limDefault:{en:'Preliminary climate-risk match only. It is not a feasibility check or a prediction of impact.',ar:'مطابقة أولية للمخاطر المناخية فقط. وهي ليست فحصًا للجدوى ولا تنبؤًا بالأثر.'},
 relRisk:{en:'Relevant to',ar:'ذو صلة بـ'},limL:{en:'Limitation',ar:'قيد'},
 scopeP:{en:'Select the area you want to assess. All answers should reflect its current conditions.',ar:'اختر المنطقة التي تريد تقييمها. يجب أن تعكس جميع الإجابات أوضاعها الحالية.'},
 fArea:{en:'Assessment area',ar:'منطقة التقييم'},fAreaPh:{en:'Select an assessment area',ar:'اختر منطقة التقييم'},fOtherArea:{en:'Other Area — Specify Manually',ar:'منطقة أخرى — تحديد يدوي'},
 fMName:{en:'Area name',ar:'اسم المنطقة'},fCountry:{en:'Country',ar:'الدولة'},fCity:{en:'City / municipality',ar:'المدينة / البلدية'},
 fScope:{en:'Assessment scale',ar:'مقياس التقييم'},
 fOrg:{en:'Organisation completing the assessment',ar:'الجهة التي تُجري التقييم'},
 fDate:{en:'Assessment date',ar:'تاريخ التقييم'},
 opt:{en:'optional',ar:'اختياري'},
 ctxP:{en:'Describe the current conditions of the selected area. These answers help assess which NBS options may be suitable.',ar:'صِف الأوضاع الحالية للمنطقة المحددة. تساعد هذه الإجابات في تقدير خيارات الحلول القائمة على الطبيعة التي قد تكون مناسبة.'},
 riskP:{en:'Which climate risks affect the selected area? Select all that apply.',ar:'ما المخاطر المناخية التي تؤثر في المنطقة المحددة؟ اختر كل ما ينطبق.'},
 unsureNote:{en:'Climate-risk identification is needed before NBS matching can be completed. You can continue with the general assessment.',ar:'يلزم تحديد المخاطر المناخية قبل استكمال مطابقة الحلول القائمة على الطبيعة. يمكنك متابعة التقييم العام.'},
 unassNote:{en:function(n){return 'Matching rules for '+n+' are not yet defined. NBS matching will not be completed while this risk is selected.'},ar:function(n){return 'لم تُحدَّد بعد قواعد المطابقة الخاصة بـ '+n+'. لن تكتمل مطابقة الحلول ما دام هذا الخطر مختارًا.'}},
 mNA:{en:'Matching not yet assessed',ar:'المطابقة لم تُقيَّم بعد'},
 mUnsure:{en:'Climate risks have not been identified. Climate-risk identification is needed before NBS matching can be completed.',ar:'لم تُحدَّد المخاطر المناخية. يلزم تحديدها قبل استكمال مطابقة الحلول القائمة على الطبيعة.'},
 mUnass:{en:function(n){return 'Matching rules for '+n+' have not been defined and require methodology review. No match score or ranking is shown.'},ar:function(n){return 'لم تُحدَّد قواعد المطابقة الخاصة بـ '+n+' وهي تحتاج إلى مراجعة منهجية. لا تُعرض درجة مطابقة ولا ترتيب.'}},
 mLand:{en:'Public land availability is unknown. Matching needs this information, so no match score or ranking is shown.',ar:'توفر الأراضي العامة غير معروف. تحتاج المطابقة إلى هذه المعلومة، لذا لا تُعرض درجة مطابقة ولا ترتيب.'},
 mNoCtx:{en:'Urban density and public land availability are required for matching.',ar:'الكثافة العمرانية وتوفر الأراضي العامة مطلوبان للمطابقة.'},
 chkNote:{en:'Screening only, not engineering approval. These checks do not change the assessment score or the match score. Answers about planting space, soil and water are shared by the planting-based options.',ar:'فرز أولي وليس اعتمادًا هندسيًا. لا تغيّر هذه الفحوص درجة التقييم ولا درجة المطابقة. تُشارَك الإجابات عن مساحة الزراعة والتربة والمياه بين الخيارات القائمة على الزراعة.'},
 evalP:{en:'Score each indicator for the assessed area as it is today, not as planned.',ar:'قيّم كل مؤشر للمنطقة المقيَّمة بحسب وضعها اليوم لا المخطط له.'},
 forArea:{en:function(n){return 'Answering for: '+n},ar:function(n){return 'الإجابة عن: '+n}},
 optionalHint:{en:'Select all that apply.',ar:'اختر كل ما ينطبق.'},
 critAns:{en:function(a,b){return a+' of '+b+' answered'},ar:function(a,b){return a+' من '+b+' مُجاب عنها'}},
 errTitle:{en:function(n){return n===1?'1 item still needs an answer:':n+' items still need an answer:'},ar:function(n){return 'ما زال '+n+' من البنود بلا إجابة:'}},
 pickOne:{en:'Select at least one option.',ar:'اختر خيارًا واحدًا على الأقل.'},
 pickAns:{en:'Choose an answer.',ar:'اختر إجابة.'},fillIn:{en:'Fill in this field.',ar:'املأ هذا الحقل.'},
 eArea:{en:'Assessment area',ar:'منطقة التقييم'},eMName:{en:'Area name',ar:'اسم المنطقة'},eCountry:{en:'Country',ar:'الدولة'},eCity:{en:'City / municipality',ar:'المدينة / البلدية'},eType:{en:'Assessment scale',ar:'مقياس التقييم'},pickArea:{en:'Select an assessment area.',ar:'اختر منطقة التقييم.'},
 eCtx:{en:function(n){return 'Context: '+n},ar:function(n){return 'السياق: '+n}},
 eRisk:{en:'Local Climate Risks: select at least one option',ar:'المخاطر المناخية المحلية: اختر خيارًا واحدًا على الأقل'},
 eJust:{en:function(n){return n+': justification for Not applicable'},ar:function(n){return n+': مبرر «لا ينطبق»'}},
 loading:{en:'Calculating results',ar:'جارٍ حساب النتائج'},
 resTitle:{en:'Your results',ar:'نتائجك'},
 protoNote:{en:'Preliminary prototype results for the area as it is today. The methodology will be reviewed against the PROMEA framework and the NBS repository. The scores are NBS4MED prototype scores and are not an official score or certification of any external organisation or standard.',ar:'نتائج أولية لنموذج تجريبي للمنطقة بوضعها الحالي. ستُراجع المنهجية بالمقارنة مع إطار PROMEA ومستودع الحلول القائمة على الطبيعة. الدرجات هنا درجات نموذج NBS4MED التجريبي، وليست درجة رسمية أو شهادة صادرة عن أي جهة أو معيار خارجي.'},
 edit:{en:'Edit answers',ar:'تعديل الإجابات'},
 scopeH:{en:'Assessed area',ar:'المنطقة المقيَّمة'},
 scopeLabs:{en:['Assessment area','Country','City / municipality','Assessment scale','Organisation','Assessment date'],ar:['منطقة التقييم','الدولة','المدينة / البلدية','مقياس التقييم','الجهة','تاريخ التقييم']},
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
 confTxt:{en:function(n,a,b,c,d){return 'Of the '+n+' described indicators: '+a+' documented evidence, '+b+' staff estimate, '+c+' informal judgement, '+d+' evidence strength not stated.'},ar:function(n,a,b,c,d){return 'من بين '+n+' مؤشرًا موصوفًا: '+a+' بأدلة موثقة، '+b+' بتقدير الموظفين، '+c+' بتقدير غير رسمي، '+d+' دون تحديد قوة الأدلة.'}},
 confNote:{en:'Evidence strength is reported next to the answers. It does not change any answer.',ar:'تُعرض قوة الأدلة بجانب الإجابات. ولا تغيّر أي إجابة.'},
 detH:{en:'Answers in detail',ar:'الإجابات بالتفصيل'},
 colInd:{en:'Indicator',ar:'المؤشر'},colAns:{en:'Answer',ar:'الإجابة'},colRat:{en:'Rationale',ar:'التعليل'},colEvd:{en:'Evidence or source',ar:'الدليل أو المصدر'},colCf:{en:'Evidence strength',ar:'قوة الأدلة'},
 methA:{en:'How existing NBS integration is described (provisional)',ar:'كيف يوصف دمج الحلول القائمة (مؤقتًا)'},
 methAL:{en:[
  'Existing NBS integration is described by one status question (Yes, No or Not sure) and, when NBS are reported, three indicators: spatial distribution and coverage, ecological and climate functionality, and integration with the site.',
  'Each indicator is described on a provisional 0 to 2 rubric prepared by the project team for partner review. The rubric is not an official PROMEA scoring method.',
  'The indicators are shown one by one. They are not combined into a percentage, a level or an overall score.',
  'No is recorded as reported absence of existing NBS, and Not sure as insufficient information. Unknown indicator answers are missing information. None of these is recorded as 0.',
  'Evidence strength (documented evidence, staff estimate or informal judgement) is recorded separately for each indicator. It describes the evidence for the answer, not how well the existing NBS function.',
  'Policy, regulation, stakeholder, technical-expertise, maintenance and funding considerations are not part of this assessment. They appear as optional implementation considerations for each solution.'],
  ar:[
  'يوصف دمج الحلول القائمة على الطبيعة بسؤال واحد عن الحالة (نعم أو لا أو غير متأكد)، وعند الإبلاغ عن وجودها بثلاثة مؤشرات: التوزع المكاني والتغطية، والوظائف البيئية والمناخية، والتكامل مع الموقع.',
  'يوصف كل مؤشر وفق قاعدة مؤقتة من 0 إلى 2 أعدّها فريق المشروع لمراجعة الشركاء. وهذه القاعدة ليست طريقة تقييم رسمية لإطار PROMEA.',
  'تُعرض المؤشرات كل على حدة، ولا تُجمع في نسبة مئوية أو مستوى أو درجة إجمالية.',
  'يُسجَّل «لا» غيابًا مُبلَّغًا عنه للحلول القائمة، و«غير متأكد» معلومات غير كافية. وإجابات المؤشرات «غير معروف» معلومات ناقصة. ولا يُسجَّل أي منها صفرًا.',
  'تُسجَّل قوة الأدلة (أدلة موثقة أو تقدير الموظفين أو تقدير غير رسمي) بشكل منفصل لكل مؤشر. وهي تصف الأدلة المؤيدة للإجابة، لا مدى جودة عمل الحلول القائمة.',
  'لا تدخل اعتبارات السياسات والأنظمة وأصحاب المصلحة والخبرة الفنية والصيانة والتمويل في هذا التقييم. وتظهر كاعتبارات تنفيذ اختيارية لكل حل.']},
 recH:{en:'NBS recommendations',ar:'توصيات الحلول القائمة على الطبيعة'},
recP:{en:'Options are listed in the order of a provisional rule-based match to your selected risks and site context. This is not a validated ranking. Applicability statuses come from optional checks and are not engineering approval.',ar:'تُعرض الخيارات بحسب مطابقة مؤقتة قائمة على قواعد مع المخاطر المختارة وسياق الموقع. وهذا ليس ترتيبًا معتمدًا. وتأتي حالات قابلية التطبيق من فحوص اختيارية وليست موافقة هندسية.'},
 matchL:{en:'Rule-based match score',ar:'درجة المطابقة القائمة على القواعد'},
matchNote:{en:'The match is a provisional rule-based description of how well an option addresses the selected risks and the land context. It is not a probability of success, a feasibility assessment or a predicted climate impact.',ar:'المطابقة وصف مؤقت قائم على قواعد لمدى معالجة الخيار للمخاطر المختارة وسياق الأرض. وهي ليست احتمال نجاح ولا تقييمًا للجدوى ولا أثرًا مناخيًا متوقعًا.'},
 stCand:{en:'Preliminary candidate',ar:'مرشح أولي'},stVer:{en:'Requires verification',ar:'يتطلب تحققًا'},stNA2:{en:'Not applicable',ar:'لا ينطبق'},
 cplx:{en:'Complexity',ar:'التعقيد'},landN:{en:'Land need',ar:'الحاجة إلى الأرض'},
 whyL:{en:'Why it matches the selected risks',ar:'سبب مطابقته للمخاطر المختارة'},
 w3:{en:'strongly',ar:'بقوة'},w2:{en:'moderately',ar:'بدرجة متوسطة'},w1:{en:'weakly',ar:'بدرجة ضعيفة'},
 noTarget:{en:'Not a target of this option: ',ar:'ليست من أهداف هذا الخيار: '},
 landOk:{en:'Land need fits the available public land.',ar:'حاجة الأرض تناسب الأراضي العامة المتاحة.'},
 landFit:{en:'Land need exceeds the available public land, which lowers the provisional match.',ar:'حاجة الأرض تفوق الأراضي العامة المتاحة، مما يخفض المطابقة المؤقتة.'},
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
 recEmpty:{en:'Matching needs at least one identified climate risk, urban density and public land availability.',ar:'تحتاج المطابقة إلى خطر مناخي واحد محدد على الأقل، وإلى الكثافة العمرانية وتوفر الأراضي العامة.'},
 recNone:{en:'No option qualifies as a recommendation for the selected risks and context. See the other options below, or review your risk selection and applicability checks.',ar:'لا يوجد خيار مؤهل للتوصية للمخاطر والسياق المختارين. راجع الخيارات الأخرى أدناه، أو راجع اختيار المخاطر وفحوص قابلية التطبيق.'},
 methB:{en:'How the rule-based match score is calculated (provisional)',ar:'كيف تُحسب درجة المطابقة القائمة على القواعد (مؤقتًا)'},
 methBL:{en:[
  'Each option has a weight from 0 (not a target) to 3 (strong) for heatwaves, flooding and drought. These are the earlier demo weights, kept as provisional rules pending methodology review. They have not been validated by PROMEA.',
  'Matching rules for Coastal Storms and Land Degradation have not been defined. When either is selected, or when Not Sure is selected, no match score or ranking is produced.',
  'Score = sum of the weights for your selected risks, divided by 3 times the number of selected risks, times 100.',
  'Land context: 15 points are subtracted for each level by which the option\'s land need exceeds the public land available, and 10 more points when urban density is high and the land need is high. The score is limited to 0 to 100.',
  'Urban density and public land availability are qualitative answers, not numerical thresholds. If public land availability is Unknown, no match score is produced. Implementation considerations (regulation, stakeholders, expertise, maintenance, funding) are optional for each solution and do not change the score or the applicability status.',
  'Climate type is not yet used in matching. It will be considered once verified location-specific information and decision rules are available.',
  'Public land availability is not used as evidence that a roof is available. Roofs are checked separately in the applicability checks.',
  'Screening: an option is Not applicable only when a basic condition is answered No (for example no roof, no coast, no runoff source). Unknown, or a No on a condition that can be assessed or designed (for example structural suitability), gives Requires verification.'],
  ar:[
  'لكل خيار وزن من 0 (ليس هدفًا) إلى 3 (قوي) لموجات الحر والفيضانات والجفاف. هذه هي أوزان النسخة التجريبية السابقة، محفوظة كقواعد مؤقتة بانتظار المراجعة المنهجية، ولم يتحقق منها إطار PROMEA.',
  'لم تُحدَّد قواعد المطابقة الخاصة بالعواصف الساحلية وتدهور الأراضي. وعند اختيار أحدهما، أو اختيار «غير متأكد»، لا تُنتج درجة مطابقة ولا ترتيب.',
  'الدرجة = مجموع أوزان المخاطر التي اخترتها مقسومًا على 3 في عدد المخاطر المختارة، مضروبًا في 100.',
  'سياق الأرض: تُخصم 15 نقطة عن كل مستوى تزيد فيه حاجة الخيار إلى الأرض على الأراضي العامة المتاحة، و10 نقاط إضافية عندما تكون الكثافة العمرانية مرتفعة وحاجة الأرض مرتفعة. وتُحصر الدرجة بين 0 و100.',
  'الكثافة العمرانية وتوفر الأراضي العامة إجابتان نوعيتان وليستا عتبات رقمية. وإذا كان توفر الأراضي العامة «غير معروف» فلا تُنتج درجة مطابقة. واعتبارات التنفيذ (الأنظمة وأصحاب المصلحة والخبرة والصيانة والتمويل) اختيارية لكل حل ولا تغيّر الدرجة ولا حالة قابلية التطبيق.',
  'لم يُستخدم نوع المناخ بعد في المطابقة. سيُنظر فيه عند توفر معلومات موثقة خاصة بالموقع وقواعد قرار.',
  'لا يُستخدم توفر الأراضي العامة دليلًا على توفر سطح. تُفحص الأسطح بشكل منفصل في فحوص قابلية التطبيق.',
  'الفرز: لا ينطبق الخيار إلا عندما يُجاب بـ «لا» عن شرط أساسي (مثل عدم وجود سطح أو ساحل أو مصدر جريان). «غير معروف»، أو «لا» عن شرط يمكن تقييمه أو تصميمه (مثل الملاءمة الإنشائية)، يعني «يتطلب تحققًا».']},
 wTitle:{en:'Provisional risk weights (0 to 3)',ar:'أوزان المخاطر المؤقتة (0 إلى 3)'},
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
asH:{en:'Existing NBS Integration',ar:'دمج الحلول القائمة على الطبيعة الحالية'},
 areaDet:{en:'Area details',ar:'تفاصيل المنطقة'},
 protoShort:{en:'Preliminary prototype with provisional methodology, to be reviewed against the PROMEA framework and the NBS repository. Scores are not official scores.',ar:'نموذج تجريبي أولي بمنهجية مؤقتة ستُراجع مقابل إطار PROMEA ومستودع الحلول القائمة على الطبيعة. الدرجات ليست درجات رسمية.'},
 profSubS:{en:'Every bar uses the same 0 to 100% scale. A criterion without a percentage shows its status instead of a bar.',ar:'يستخدم كل شريط المقياس نفسه من 0 إلى 100%. يعرض المعيار الذي لا نسبة له حالته بدلًا من الشريط.'},
 ptsOnly:{en:function(s,m){return s+' of '+m+' points'},ar:function(s,m){return s+' من '+m+' نقطة'}},
 critCounts:{en:function(a,n,u,un,na){return a+' of '+n+' indicators scored'+(u?' · '+u+' Unknown':'')+(un?' · '+un+' unanswered':'')+(na?' · '+na+' Not applicable':'')},ar:function(a,n,u,un,na){return a+' من '+n+' مؤشرات مُقيَّمة'+(u?' · '+u+' غير معروف':'')+(un?' · '+un+' بلا إجابة':'')+(na?' · '+na+' لا ينطبق':'')}},
 notRatedUn:{en:'Not rated: unanswered indicators',ar:'غير مُقيَّم: مؤشرات بلا إجابة'},
 ovNotShown:{en:'not shown (see the warning above)',ar:'غير معروضة (انظر التحذير أعلاه)'},
 warnNA:{en:function(n){return n+(n===1?' indicator is':' indicators are')+' Not applicable: left out of the score and reported separately.'},ar:function(n){return n+(n===1?' مؤشر':' مؤشرات')+' لا ينطبق: يُستبعد من النتيجة ويُعرض بشكل منفصل.'}},
 methAll:{en:'Methodology (provisional)',ar:'المنهجية (مؤقتة)'},
 optsH:{en:'Preliminary NBS options',ar:'خيارات أولية للحلول القائمة على الطبيعة'},
 solDet:{en:'Solution details',ar:'تفاصيل الحل'},
 shortWhy:{en:function(l){return 'Matches your selected risks: '+l+'.'},ar:function(l){return 'تطابق المخاطر المختارة: '+l+'.'}},
 sharedH:{en:'Shared implementation conditions',ar:'شروط تنفيذ مشتركة'},
 sharedChkH:{en:'To verify (applies to several options)',ar:'للتحقق (ينطبق على عدة خيارات)'},
 otherSum:{en:function(n){return 'Other options ('+n+')'},ar:function(n){return 'خيارات أخرى ('+n+')'}},
 furtherH:{en:'Further qualifying options',ar:'خيارات مؤهلة أخرى'},
 noCalc:{en:'No quantitative calculator for this option yet.',ar:'لا توجد حاسبة كمية لهذا الخيار بعد.'},
 exSecP:{en:'Optional. Calculators exist for five of the nine options and give illustrative quantities, costs and reference evidence. They do not change the assessment.',ar:'اختياري. تتوفر حاسبات لخمسة من الخيارات التسعة وتعطي كميات وتكاليف وأدلة مرجعية توضيحية. ولا تغيّر التقييم.'},
 lastEx:{en:function(n){return 'Last explored: '+n},ar:function(n){return 'آخر ما استُكشف: '+n}},
 doneL:{en:'completed',ar:'مكتمل'},
 sampleNote:{en:'SAMPLE DATA for testing only. This is not a real assessment.',ar:'بيانات نموذجية للاختبار فقط. هذا ليس تقييمًا حقيقيًا.'}
};
function T(k){return S[k][lang]}

/* ---------- state ---------- */
var STEPS=[{k:'scope'},{k:'ctx'},{k:'risk'},{k:'nbs'}];
/* area (1) + scale (1) + density and land (2) + risks (1) + existing NBS (1), plus 3 indicators when existing NBS are reported */
function totalQ(){return 6+(st.nbs.exist==='yes'?3:0)}
function today(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function freshState(){
  return {scope:{area:'',mName:'',mCountry:'',mCity:'',type:'',typeAuto:false,org:'',date:today()},ctx:{},risks:{},nbs:{exist:'',types:{},other:''},scr:{},impl:{},
    sc:{},rat:{},evd:{},cf:{},chkOpen:{},rOpen:{},
    area:2000,horizon:10,step:0,view:'intro',res:'ready',fb:'form',miss:{},open:{}};
}
var st=freshState();
/* the partner feedback form stays implemented (fbHtml and its submit handler) but is not shown in the demonstration interface */
var SHOW_FEEDBACK=false;

function nm(o){return lang==='ar'?o.ar:o.en}
function pick(a){return lang==='ar'?a[1]:a[0]}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fmt(n){return Number(n).toLocaleString('en-US')}
function ico(n,cls){return '<svg class="ic '+(cls||'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>'}
function riskList(){return RISK.filter(function(r){return st.risks[r.k]})}
function riskOk(){return riskList().length>0||!!st.risks.unsure}
function riskText(l){return st.risks.unsure?UNSURE[(l||lang)==='ar'?'ar':'en']:riskList().map(function(r){return (l||lang)==='ar'?r.ar:r.en}).join('; ')}
/* NBS matching is produced only when the provisional rules cover every selected risk and the context is known */
function matchStatus(){
  var reasons=[],un=riskList().filter(function(r){return MATCHABLE.indexOf(r.k)<0});
  if(st.risks.unsure)reasons.push('unsure');
  else if(!riskList().length)reasons.push('norisk');
  if(un.length)reasons.push('unass');
  if(!st.ctx.density||!st.ctx.land)reasons.push('noctx');
  else if(st.ctx.land==='unknown')reasons.push('land');
  return {ok:!reasons.length,reasons:reasons,un:un};
}
function matchMessages(l){
  var m=matchStatus(),L=l||lang,out=[];
  m.reasons.forEach(function(k){
    if(k==='unsure')out.push(S.mUnsure[L]);
    else if(k==='norisk')out.push(S.recEmpty[L]);
    else if(k==='unass')out.push(S.mUnass[L](m.un.map(function(r){return L==='ar'?r.ar:r.en}).join(L==='ar'?'، ':', ')));
    else if(k==='noctx')out.push(S.mNoCtx[L]);
    else if(k==='land')out.push(S.mLand[L]);
  });
  return {title:S.mNA[L],items:out,ok:m.ok};
}
function indById(id){return IND.filter(function(i){return i.id===id})[0]}
function blank(s){return !s||!String(s).trim()}

/* answer states: scored (0, 1, 2), unknown ('U'), na ('NA'), unanswered (undefined) */
function isNum(v){return v===0||v===1||v===2}
function ansState(id){var v=st.sc[id];return v===undefined?'unanswered':v==='U'?'unknown':'scored'}
function indOk(id){return st.sc[id]!==undefined}
function nbsOk(){var e=st.nbs.exist;return e==='no'||e==='unsure'||(e==='yes'&&IND.every(function(i){return indOk(i.id)}))}
function indDone(){return nbsOk()}
function pilotOf(id){return PILOTS.filter(function(p){return p.id===id})[0]}
function areaOk(){var s=st.scope;return !!pilotOf(s.area)||(s.area==='other'&&!blank(s.mName)&&!blank(s.mCountry)&&!blank(s.mCity))}
function scaleOk(){return !!st.scope.type}
function scopeOk(){return areaOk()&&scaleOk()}
function areaName(l){var s=st.scope,p=pilotOf(s.area);return p?p.name[(l||lang)==='ar'?1:0]:(s.area==='other'?(s.mName||'').trim():'')}
function areaCountry(l){var s=st.scope,p=pilotOf(s.area);return p?p.country[(l||lang)==='ar'?1:0]:(s.area==='other'?(s.mCountry||'').trim():'')}
function areaCity(l){var s=st.scope,p=pilotOf(s.area);return p?(p.city?p.city[(l||lang)==='ar'?1:0]:''):(s.area==='other'?(s.mCity||'').trim():'')}
function ctxOk(){return !!st.ctx.density&&!!st.ctx.land}
function answered(){
  var n=0;
  if(areaOk())n++;
  if(scaleOk())n++;
  if(st.ctx.density)n++;
  if(st.ctx.land)n++;
  if(riskOk())n++;
  if(st.nbs.exist)n++;
  if(st.nbs.exist==='yes')IND.forEach(function(i){if(indOk(i.id))n++});
  return n;
}
function allComplete(){return areaOk()&&scaleOk()&&ctxOk()&&riskOk()&&nbsOk()}

/* ---------- static translations ---------- */
var AR={
 skip:'انتقل إلى المحتوى',demoTag:'تجريبي',demoLabel:'نسخة تجريبية: تقديرات توضيحية ستُراجع عند توفر بيانات المشروع',brandSub:'أداة التقييم الذاتي',nAbout:'عن الأداة',nHow:'كيف تعمل',nRes:'المصادر',exit:'العودة إلى المقدمة',
 eyebrow:'مشروع إنتربرغ نكست ميد · الجامعة الأردنية',
 h1:'أداة التقييم الذاتي للحلول القائمة على الطبيعة في المدن المتوسطية',
 lead:'قيّموا مدى دمج الحلول القائمة على الطبيعة في مدينتكم، واطّلعوا على الخيارات الأنسب لمخاطركم المناخية، مع نطاقات إرشادية للأثر والتكلفة.',
 f1:'نحو 10 دقائق',f2:'أربع خطوات',f3:'دون حاجة إلى تسجيل',
 start:'ابدأ التقييم',startNote:'لا تُحفظ النتائج. حمّل التقرير قبل إغلاق الصفحة.',
 whatH:'ما هذه الأداة',whatP:'أداة مجانية على الإنترنت لها أربع مهام: تبيّن مدى دمج الحلول القائمة على الطبيعة في منطقة محددة، وتقترح حلولًا تناسب المخاطر المناخية المحلية، وتقيّم أثرها المحتمل في التخفيف من هذه المخاطر حيث تتوفر طرق وأدلة داعمة، وتعطي تقديرات إرشادية للتكلفة. موجّهة إلى الشركاء والسلطات العامة والمنظمات التي تخطط للحلول القائمة على الطبيعة أو تنفذها.',
 whyH:'لماذا تهم',whyP:'تخفف الحلول القائمة على الطبيعة الحرارة والفيضانات والجفاف في المدن المتوسطية، لكن اعتمادها الأوسع تعيقه فجوات المعرفة وضعف إشراك أصحاب المصلحة المحليين وقلة الخبرة في تخطيطها وتنسيقها. يبيّن التقييم مواضع القوة والفجوات لتخطيط حلول مناسبة قبل الالتزام بالموارد.',
 devBy:'طورتها الجامعة الأردنية ضمن مشروع NBS4MED (حلول قائمة على الطبيعة لمدن متوسطية قادرة على التكيف مع المناخ)، بتمويل مشترك من الاتحاد الأوروبي عبر برنامج إنتربرغ نكست ميد. يختبر شركاء المشروع هذه النسخة وتشكّل ملاحظاتهم النسخة المحسّنة.',
 howH:'كيف تعمل',s1h:'ابدأ',s1p:'افتح الأداة. لا حاجة إلى حساب أو تسجيل دخول.',s2h:'أجب',s2p:'حدّد منطقة التقييم، وصِف الموقع، واختر المخاطر المناخية المحلية، ثم صِف الحلول القائمة على الطبيعة.',
 s3h:'احصل على النتائج',s3p:'اطّلع على حالة الحلول القائمة والخيارات الأولية والحسابات الداعمة، ثم افحص الخيارات واستكشفها.',s4h:'حمّل وحسّن',s4p:'احفظ تقريرًا بصيغة PDF أو CSV، وعدّل إجاباتك وأعد التشغيل.',
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
/* existing NBS status and indicator states. There is no overall score: an absent or unknown status is never recorded as 0. */
function integ(){
  var e=st.nbs.exist,o={exist:e,items:[],scored:0,unk:0,un:0};
  o.status=e==='yes'?'assessed':e==='no'?'absent':e==='unsure'?'unsure':'unanswered';
  if(e==='yes')IND.forEach(function(i){
    var v=st.sc[i.id],state=isNum(v)?'scored':v==='U'?'unknown':'unanswered';
    o.items.push({i:i,v:v,state:state});
    if(state==='scored')o.scored++;else if(state==='unknown')o.unk++;else o.un++;
  });
  return o;
}
function nbsTypes(l){
  var L=l||lang,out=OPT.filter(function(o){return st.nbs.types[o.id]}).map(function(o){return L==='ar'?o.ar:o.en});
  if(st.nbs.types.other)out.push(blank(st.nbs.other)?(L==='ar'?'أخرى':'Other'):(L==='ar'?'أخرى: ':'Other: ')+st.nbs.other.trim());
  return out;
}
function confCounts(){
  var c={high:0,mid:0,low:0,none:0,n:0};
  if(st.nbs.exist!=='yes')return c;
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
  return v===undefined?T('aNone'):v==='U'?T('aU'):T('aNum')(v);
}
function lvLabel(v,l){return isNum(v)?LV[(l||lang)==='ar'?1:0][v]:''}
function ansCsv(id){var v=st.sc[id];return v===undefined?'Unanswered':v==='U'?'Unknown':String(v)}
function cfLabel(id,l){
  var k=st.cf[id];var c=CONF.filter(function(x){return x[0]===k})[0];
  if(!c)return (l||lang)==='ar'?S.cfNone.ar:S.cfNone.en;
  return (l||lang)==='ar'?c[2]:c[1];
}
function scopeTypeLabel(l){
  var s=st.scope,o=SCOPES.filter(function(x){return x[0]===s.type})[0];
  return o?((l||lang)==='ar'?o[2]:o[1]):'';
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
/* implementation considerations are optional, solution-specific and never change an applicability status */
function conds(o){return []}
/* ranked: options with a final match score above 0 that are not Not applicable. The match formula is unchanged. */
function recs(){
  if(!matchStatus().ok)return {ranked:[],na:[],other:[],all:[],blocked:true};
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
  return T('stNbs');
}
function stepMissing(s){
  var m=[],sc=st.scope;
  if(s.k==='scope'){
    if(!pilotOf(sc.area)&&sc.area!=='other')m.push({t:T('eArea'),href:'#in-area',key:'scope:area'});
    else if(sc.area==='other'){
      if(blank(sc.mName))m.push({t:T('eMName'),href:'#in-mname',key:'scope:mName'});
      if(blank(sc.mCountry))m.push({t:T('eCountry'),href:'#in-mcountry',key:'scope:mCountry'});
      if(blank(sc.mCity))m.push({t:T('eCity'),href:'#in-mcity',key:'scope:mCity'});
    }
    if(!sc.type)m.push({t:T('eType'),href:'#f-type',key:'scope:type'});
  }else if(s.k==='ctx'){
    CTX.forEach(function(c){if(!st.ctx[c.k])m.push({t:T('eCtx')(nm(c)),href:'#f-'+c.k,key:'ctx:'+c.k})});
  }else if(s.k==='risk'){
    if(!riskOk())m.push({t:T('eRisk'),href:'#riskField',key:'risk'});
  }else{
    if(!st.nbs.exist)m.push({t:T('nbsQ'),href:'#f-nbsx',key:'nbs:exist'});
    else if(st.nbs.exist==='yes')IND.forEach(function(i){
      if(st.sc[i.id]===undefined)m.push({t:i.id+' '+nm(i),href:'#ind-'+i.id,key:'ind:'+i.id});
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
  var bad=mi('ind:'+i.id);
  var opts='';
  for(var s=0;s<3;s++){
    opts+='<label class="opt o'+s+'"><input type="radio" name="ind-'+i.id+'" value="'+s+'"'+(v===s?' checked':'')+'><span class="ob">'+s+'</span><span class="ot">'+esc(pick(i.r[s]))+'</span></label>';
  }
  opts+='<label class="opt ou"><input type="radio" name="ind-'+i.id+'" value="U"'+(v==='U'?' checked':'')+'><span class="ob">?</span><span class="ot"><b>'+T('optU')+'.</b> '+T('optUd')+'</span></label>';
  var sub='';
  var hasMore=!blank(st.rat[i.id])||!blank(st.evd[i.id])||!!st.cf[i.id];
  var openMore=st.open[i.id]!==undefined?st.open[i.id]:hasMore;
  var cfo='<option value="">'+T('cfNone')+'</option>'+CONF.map(function(c){return '<option value="'+c[0]+'"'+(st.cf[i.id]===c[0]?' selected':'')+'>'+esc(lang==='ar'?c[2]:c[1])+'</option>'}).join('');
  var more='<details class="more" data-ind="'+i.id+'"'+(openMore?' open':'')+'><summary>'+T('more')+'</summary><div class="morebody">'+
    '<div class="field"><label class="lab" for="rat-'+idc+'">'+T('ratL')+'</label><textarea id="rat-'+idc+'" rows="2" data-bind="rat|'+i.id+'">'+esc(st.rat[i.id]||'')+'</textarea></div>'+
    '<div class="field"><label class="lab" for="evd-'+idc+'">'+T('evdL')+'</label><input type="text" id="evd-'+idc+'" data-bind="evd|'+i.id+'" value="'+esc(st.evd[i.id]||'')+'" autocomplete="off"><p class="hint">'+T('evdH')+'</p></div>'+
    '<div class="field"><label class="lab" for="cf-'+idc+'">'+T('cfL')+'</label><select id="cf-'+idc+'" data-bind="cf|'+i.id+'">'+cfo+'</select></div></div></details>';
  return '<div class="ind'+(bad?' missing':'')+'" id="ind-'+idc+'">'+
    '<div class="code">'+i.id+'</div>'+
    '<div><div class="t">'+esc(nm(i))+'</div><div class="h">'+esc(lang==='ar'?i.ha:i.h)+'</div>'+
    '<fieldset class="rub" style="border:0;padding:0;margin:0;min-width:0"><legend class="sr">'+i.id+' '+esc(nm(i))+'</legend>'+
      '<div class="opts">'+opts+'</div>'+(mi('ind:'+i.id)?'<div class="inline-err">'+T('pickAns')+'</div>':'')+
    '</fieldset>'+
        more+'</div></div>';
}
function areaSelectHtml(){
  var sc=st.scope,bad=mi('scope:area');
  return '<select id="in-area" name="scope-area"'+(bad?' class="input-err" aria-invalid="true"':'')+'><option value=""'+(sc.area?'':' selected')+'>'+esc(T('fAreaPh'))+'</option>'+
    PILOTS.map(function(p){return '<option value="'+p.id+'"'+(sc.area===p.id?' selected':'')+'>'+esc(p.country[lang==='ar'?1:0]+' — '+p.name[lang==='ar'?1:0])+'</option>'}).join('')+
    '<option value="other"'+(sc.area==='other'?' selected':'')+'>'+esc(T('fOtherArea'))+'</option></select>';
}
function locHtml(){
  var sc=st.scope,p=pilotOf(sc.area);
  if(p){
    var rows='<dt>'+esc(T('fCountry'))+'</dt><dd>'+esc(areaCountry())+'</dd>'+(p.city?'<dt>'+esc(T('fCity'))+'</dt><dd>'+esc(areaCity())+'</dd>':'');
    return '<dl class="sdl locv">'+rows+'</dl>';
  }
  if(sc.area==='other'){
    return textField('mname',T('fMName')+' *','scope|mName',sc.mName,{key:'scope:mName'})+textField('mcountry',T('fCountry')+' *','scope|mCountry',sc.mCountry,{key:'scope:mCountry'})+textField('mcity',T('fCity')+' *','scope|mCity',sc.mCity,{key:'scope:mCity'});
  }
  return '';
}
function scaleHtml(){
  var sc=st.scope;
  return seg('scope-type',SCOPES.map(function(o){return [o[0],lang==='ar'?o[2]:o[1]]}),sc.type)+ierr('scope:type',T('pickAns'));
}
function riskNoteHtml(){
  if(st.risks.unsure)return esc(T('unsureNote'));
  var un=matchStatus().un;
  return un.length?esc(T('unassNote')(un.map(function(r){return nm(r)}).join(lang==='ar'?'، ':', '))):'';
}
function nbsIndHtml(){
  var e=st.nbs.exist;
  if(e==='no')return '<p class="note">'+T('nbsNo')+'</p>';
  if(e==='unsure')return '<p class="note">'+T('nbsUn')+'</p>';
  if(e!=='yes')return '';
  var types='<fieldset class="field"><legend>'+T('nbsTypes')+' <span class="tagq">'+T('opt')+'</span></legend><p class="hint">'+T('nbsTypesH')+'</p><div class="risks">'+
    OPT.map(function(o){return '<label class="chk"><input type="checkbox" name="nbs-type" value="'+o.id+'"'+(st.nbs.types[o.id]?' checked':'')+'><span><b>'+esc(nm(o))+'</b></span></label>'}).join('')+
    '<label class="chk"><input type="checkbox" name="nbs-type" value="other"'+(st.nbs.types.other?' checked':'')+'><span><b>'+T('nbsOther')+'</b></span></label></div>'+
    '<div id="nbsOtherBox"'+(st.nbs.types.other?'':' hidden')+'>'+textField('nbsother',T('nbsOtherF'),'nbs|other',st.nbs.other,{opt:true})+'</div></fieldset>';
  return types+'<h3 class="subh">'+T('nbsIndH')+'</h3><div class="scale-key">'+ico('info')+'<span>'+T('nbsKey')+'</span></div>'+IND.map(indHtml).join('');
}
function nbsHtml(){
  return '<fieldset class="field" id="f-nbsx"><legend>'+T('nbsQ')+' *</legend><p class="hint">'+T('nbsH')+'</p>'+
    seg('nbs-exist',[['yes',T('yes')],['no',T('no')],['unsure',T('nbsNS')]],st.nbs.exist)+ierr('nbs:exist',T('pickAns'))+'</fieldset><div id="nbsDyn">'+nbsIndHtml()+'</div>';
}
function renderPanel(){
  var s=STEPS[st.step],h='',desc='';
  if(s.k==='scope'){
    desc=T('scopeP');
    var sc=st.scope;
    h='<div class="field" id="f-area"><label class="lab" for="in-area">'+T('fArea')+' *</label>'+areaSelectHtml()+'<div id="areaErr">'+ierr('scope:area',T('pickArea'))+'</div></div>'+
      '<div id="locBox">'+locHtml()+'</div>'+
      '<fieldset class="field" id="f-type"><legend>'+T('fScope')+' *</legend>'+scaleHtml()+'</fieldset>'+
      textField('org',T('fOrg'),'scope|org',st.scope.org,{opt:true})+
      textField('date',T('fDate'),'scope|date',st.scope.date,{type:'date',opt:true});
  }else if(s.k==='ctx'){
    desc=T('ctxP');
    h=CTX.map(function(c){
      var rich=c.o[0].length>3;
      var body=rich?'<div class="risks">'+c.o.map(function(o){return '<label class="chk"><input type="radio" name="ctx-'+c.k+'" value="'+o[0]+'"'+(st.ctx[c.k]===o[0]?' checked':'')+'><span><b>'+esc(lang==='ar'?o[2]:o[1])+'</b><small>'+esc(lang==='ar'?o[4]:o[3])+'</small></span></label>'}).join('')+'</div>'
        :seg('ctx-'+c.k,c.o.map(function(o){return [o[0],lang==='ar'?o[2]:o[1]]}),st.ctx[c.k]);
      return '<fieldset class="field" id="f-'+c.k+'"><legend>'+esc(nm(c))+' *</legend><p class="hint">'+esc(c.hint[lang])+'</p>'+body+ierr('ctx:'+c.k,T('pickAns'))+'</fieldset>';
    }).join('');
  }else if(s.k==='risk'){
    desc=T('riskP');
    function rk(r,cls){return '<label class="chk'+(cls||'')+'"><input type="checkbox" name="risk" value="'+r.k+'"'+(st.risks[r.k]?' checked':'')+'><span><b>'+esc(nm(r))+'</b>'+(r.d?'<small>'+esc(lang==='ar'?r.da:r.d)+'</small>':'')+'</span></label>'}
    h='<fieldset class="field" style="margin:0" id="riskField"><legend class="sr">'+esc(T('stRisk'))+'</legend><div class="risks">'+RISK.map(function(r){return rk(r)}).join('')+'</div>'+
      '<div class="risks" style="margin-top:12px">'+rk(UNSURE)+'</div><p class="note-s" id="riskNote">'+riskNoteHtml()+'</p><div id="riskErr">'+ierr('risk',T('pickOne'))+'</div></fieldset>';
  }else{
    desc=T('nbsP');
    h=nbsHtml();
  }
  $('#stepPanel').innerHTML='<div class="panel-h"><span class="k">'+T('stepOf')(st.step+1,STEPS.length)+'</span><h2 id="stepTitle" tabindex="-1">'+esc(stepName(s))+'</h2><p>'+desc+'</p></div><div class="panel-b">'+h+'</div>';
}
function updateChrome(){
  var n=answered();
  $('#progText').textContent=T('stepOf')(st.step+1,STEPS.length)+' · '+stepName(STEPS[st.step]);
  $('#ansText').textContent=T('ansN')(n,totalQ());
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
function dtl(key,sum,body,force){
  var o=force||st.rOpen[key];
  return '<details class="adv" data-rk="'+key+'"'+(o?' open':'')+'><summary>'+sum+'</summary>'+body+'</details>';
}
function ctxLabel(k){
  var cx=CTX.filter(function(z){return z.k===k})[0],o=cx.o.filter(function(z){return z[0]===st.ctx[k]})[0];
  return o?(lang==='ar'?o[2]:o[1]):T('notStated');
}
/* compact area line; the remaining area information is collapsed */
function areaSummaryHtml(){
  var s=st.scope,L=T('scopeLabs');
  function v(x){return blank(x)?'<span class="soft">'+T('notStated')+'</span>':esc(x)}
  var rows=[[L[1],v(areaCountry())],[L[2],v(areaCity())],[L[4],v(s.org)],[T('stRisk'),esc(riskText()||'–')],[nm(CTX[0]),esc(ctxLabel('density'))],[nm(CTX[1]),esc(ctxLabel('land'))]];
  return '<p class="arealine"><b>'+esc(areaName())+'</b>'+(areaCountry()?' · '+esc(areaCountry()):'')+' · '+esc(scopeTypeLabel())+' · '+esc(s.date||T('notStated'))+'</p>'+
    dtl('area',T('areaDet'),'<dl class="sdl">'+rows.map(function(r){return '<dt>'+esc(r[0])+'</dt><dd>'+r[1]+'</dd>'}).join('')+'</dl>',false);
}
/* horizontal bars: five categories compared on one fixed 0 to 100% scale. Labels carry the numbers, so colour is not the only cue. */
function levelMarks(v){
  var h='<span class="lvm" aria-hidden="true">';
  for(var k=0;k<3;k++)h+='<i class="'+(isNum(v)&&k<=v?'on':'')+'"></i>';
  return h+'</span>';
}
function indRowHtml(it){
  var i=it.i,known=it.state==='scored';
  var lab=known?lvLabel(it.v)+' <span class="soft">(<bdi dir="ltr">'+it.v+' / 2</bdi>)</span>':'<span class="soft">'+(it.state==='unknown'?T('nbsNA')+' · '+T('aU'):T('nbsNA'))+'</span>';
  return '<li class="irow"><div class="iname"><b>'+i.id+'</b> '+esc(nm(i))+'</div><div class="ilv">'+levelMarks(known?it.v:null)+' '+lab+'</div>'+
    (known?'<p class="note-s">'+esc(rubricText(i,it.v))+'</p>':'')+'</li>';
}
function sectionA(){
  var g=integ();
  var stTxt=g.status==='assessed'?T('nbsSY'):g.status==='absent'?T('nbsSN'):T('nbsSU');
  var h='<section class="rs first" aria-labelledby="asH"><h2 id="asH">'+T('s1H')+'</h2>'+areaSummaryHtml()+
    '<p class="stline"><b>'+T('nbsStat')+':</b> '+esc(stTxt)+'</p>';
  if(g.status==='assessed'){
    var ty=nbsTypes();
    if(ty.length)h+='<p class="note-s"><b>'+T('nbsTypes')+':</b> '+esc(ty.join('; '))+'</p>';
    var miss=g.items.filter(function(x){return x.state!=='scored'}).map(function(x){return x.i.id+' '+nm(x.i)});
    if(miss.length)h+='<div class="note warn">'+ico('alert')+'<span>'+esc(T('nbsWarn')(miss.join('; ')))+'</span></div>';
    h+='<ul class="irows">'+g.items.map(indRowHtml).join('')+'</ul><p class="note-s">'+T('nbsNote')+'</p>'+
      dtl('ans',T('detH'),detailsTable(),false);
  }else if(g.status==='unsure')h+='<p class="note-s">'+T('nbsUn')+'</p>';
  else h+='<p class="note-s">'+T('nbsNo')+'</p>';
  return h+'</section>';
}
function detailsTable(){
  var rows=IND.map(function(i){
    return '<tr><td><b>'+i.id+'</b> '+esc(nm(i))+'</td><td>'+esc(ansLabel(i.id))+'</td><td>'+esc(st.rat[i.id]||'–')+'</td><td>'+esc(st.evd[i.id]||'–')+'</td><td>'+esc(cfLabel(i.id))+'</td></tr>';
  }).join('');
  return '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>'+T('colInd')+'</th><th>'+T('colAns')+'</th><th>'+T('colRat')+'</th><th>'+T('colEvd')+'</th><th>'+T('colCf')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}
/* one methodology section: existing NBS indicators and the provisional match method */
function methodologyHtml(){
  return dtl('meth',T('methAll'),'<h4 class="subh2">'+T('methA')+'</h4><ul class="meth">'+S.methAL[lang].map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul>'+
    '<h4 class="subh2">'+T('methB')+'</h4><ul class="meth">'+S.methBL[lang].map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul><h4 class="subh2">'+T('wTitle')+'</h4>'+weightsTable(),false);
}
function weightsTable(){
  return '<div class="tbl-wrap"><table class="tbl"><caption class="sr">'+T('wTitle')+'</caption><thead><tr><th>'+T('option')+'</th>'+RISK.filter(function(r){return MATCHABLE.indexOf(r.k)>=0}).map(function(r){return '<th class="num">'+esc(nm(r))+'</th>'}).join('')+'</tr></thead><tbody>'+
    OPT.map(function(o){return '<tr><td>'+esc(nm(o))+'</td>'+RISK.filter(function(r){return MATCHABLE.indexOf(r.k)>=0}).map(function(r){return '<td class="num">'+o.w[r.k]+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>';
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
/* provisional category (display only) */
function catText(o){var t=pick(CATS[o.cat]);if(o.cat2)t+=' · '+pick(CATS[o.cat2]);return t}
function catLine(o){return '<p class="catline"><b>'+T('catL')+':</b> '+esc(catText(o))+' <span class="soft">('+T('catProv')+')</span></p>'}
/* applicability checks: one small panel per solution, opened from the results page. Answers live in st.scr and are shared
   by key, so opening, closing or switching panels never loses them. */
function chkBtn(o,reopen){
  var open=!!st.chkOpen[o.id];
  return '<button class="btn btn-sm no-print" type="button" data-check="'+o.id+'" aria-expanded="'+open+'" aria-controls="chk-'+o.id+'" aria-label="'+(open?T('chkHide'):(reopen?T('chkReopen'):T('chkBtn')))+': '+esc(nm(o))+'">'+(open?T('chkHide'):(reopen?T('chkReopen'):T('chkBtn')))+'</button>';
}
/* optional, solution-specific implementation considerations: regulation, stakeholders, expertise, maintenance, funding */
var IMPL=['reg','stake','tech','maint','fund'];
function implQ(o,k){return pick(S.implQ[k==='stake'&&o.id==='roof'?'stakeRoof':k])}
function implVal(o,k){return st.impl[o.id+'|'+k]}
function implLabel(v){return v==='yes'?T('yes'):v==='no'?T('no'):v==='unknown'?T('unk'):T('implNot')}
function chkPanel(o){
  if(!st.chkOpen[o.id])return '';
  var s=screenOpt(o),name=esc(nm(o));
  var h='<div class="chkpanel no-print" id="chk-'+o.id+'" role="group" aria-label="'+T('chkTitle')+': '+name+'"><h4>'+T('chkTitle')+': '+name+'</h4><p class="note-s">'+T('chkNote')+'</p>';
  chkKeys(o).forEach(function(k){
    var c=CHK[k],opts=k==='roof.struct'?[['yes',T('rsConf')],['unknown',T('rsPend')],['unsuitable',T('rsNo')]]:[['yes',T('yes')],['no',T('no')],['unknown',T('unk')]];
    h+='<fieldset class="field"><legend>'+esc(pick(c.q))+'</legend>'+(c.h?'<p class="hint">'+esc(pick(c.h))+'</p>':'')+seg('chk|'+o.id+'|'+k,opts,chkVal(k),k==='roof.struct'?'stack':'')+'</fieldset>';
  });
  h+='<div class="chkres">'+screenHtml({scr:s})+'</div>';
  h+='<h4>'+T('implH')+'</h4><p class="note-s">'+T('implNote')+'</p>';
  IMPL.forEach(function(k){
    h+='<fieldset class="field"><legend>'+esc(implQ(o,k))+'</legend>'+seg('imp|'+o.id+'|'+k,[['yes',T('yes')],['no',T('no')],['unknown',T('unk')]],implVal(o,k))+'</fieldset>';
  });
  return h+'</div>';
}
function exploreAction(o){
  if(o.nbs)return '<button class="btn btn-sm no-print" type="button" data-explore="'+o.nbs+'">'+T('exBtn')+ico('arrow','flip')+'</button>';
  return '<span class="nocalc">'+T('noCalc')+'</span>';
}
function reasonList(x){return x.scr.reasons.map(function(q){return pick(q.t)})}
function anyPanel(ids){return ids.some(function(id){return st.chkOpen[id]})}
/* compact card: name, status, short reason, essential solution-specific conditions, actions. Scores and extended explanations are collapsed. */
function optCard(x,shared){
  var o=x.o,i=lang==='ar'?1:0;
  var specific=reasonList(x).filter(function(t){return shared.indexOf(t)<0});
  var hits=x.why.hit.map(function(h){return nm(h.r)}).join('; ');
  var det='<dl class="odl"><dt>'+T('catL')+'</dt><dd>'+esc(catText(o))+' <span class="soft">('+T('catProv')+')</span></dd>'+
    '<dt>'+T('cplx')+'</dt><dd>'+meter(o.cx+1,3)+CLAB.cx[o.cx][i]+'</dd><dt>'+T('landN')+'</dt><dd>'+meter(o.land+1,3)+CLAB.land[o.land][i]+'</dd></dl>'+
    '<p class="note-s">'+esc(whyText(x))+'</p>'+(o.eg?'<p class="note-s">'+esc(o.eg)+'</p>':'')+'<div class="why">'+screenHtml(x)+'</div>';
  return '<article class="oc" id="opt-'+o.id+'"><header class="och"><h3>'+esc(nm(o))+'</h3>'+statusChip(x.scr.status)+'</header>'+
    '<p class="owhy"><b>'+T('relRisk')+':</b> '+esc(hits)+'</p>'+
    '<p class="ospec"><b>'+T('limL')+':</b> '+esc(specific.length?specific.join(' '):T('limDefault'))+'</p>'+
    '<div class="oact">'+chkBtn(o)+exploreAction(o)+'</div>'+chkPanel(o)+dtl('sd-'+o.id,T('solDet'),det,false)+'</article>';
}
function sharedBox(top,sharedChk){
  if(!sharedChk.length)return '';
  return '<div class="shared"><b>'+T('sharedH')+'</b><p class="sch"><b>'+T('sharedChkH')+':</b> '+esc(sharedChk.join(' '))+'</p></div>';
}
/* remaining qualifying options, options excluded by checks, and options with a match score of 0 */
function otherHtml(R){
  var rest=R.ranked.slice(3),n=rest.length+R.na.length+R.other.length;
  if(!n)return '';
  var ids=rest.concat(R.na,R.other).map(function(x){return x.o.id});
  function li(x,line,reopen,extra){
    return '<li><div class="orow"><b>'+esc(nm(x.o))+'</b> '+statusChip(x.scr.status)+'</div><p class="note-s">'+line+(extra||'')+' <span class="soft">'+esc(catText(x.o))+'</span></p><div class="oact">'+chkBtn(x.o,reopen)+exploreAction(x.o)+'</div>'+chkPanel(x.o)+'</li>';
  }
  var body='';
  if(rest.length)body+='<h4 class="subh2">'+T('furtherH')+'</h4><ul class="ol">'+rest.map(function(x){
    return li(x,esc(T('shortWhy')(x.why.hit.map(function(h){return nm(h.r)}).join('; '))),false,'');
  }).join('')+'</ul>';
  if(R.na.length)body+='<h4 class="subh2">'+T('exNA')+'</h4><ul class="ol">'+R.na.map(function(x){return li(x,esc(reasonList(x).join(' ')),true)}).join('')+'</ul>';
  if(R.other.length)body+='<h4 class="subh2">'+T('otherH')+'</h4><p class="note-s">'+T('otherP')+'</p><ul class="ol">'+R.other.map(function(x){return li(x,esc(x.raw===0?T('exNoWhy'):T('exZeroWhy')),false)}).join('')+'</ul>';
  return dtl('other',T('otherSum')(n),body,anyPanel(ids));
}
function sectionB(){
  var h='<section class="rs" aria-labelledby="rcH"><h2 id="rcH">'+T('optsH')+'</h2>';
  var MM=matchMessages();
  if(!MM.ok)return h+'<div class="note"><b>'+esc(MM.title)+'</b><ul class="meth">'+MM.items.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul></div></section>';
  var R=recs(),top=R.ranked.slice(0,3);
  h+='<p class="sub">'+(R.ranked.some(function(x){return x.scr.status==='unchecked'})?T('prelim'):T('recP'))+'</p>';
  if(!top.length)h+='<div class="note">'+T('recNone')+'</div>';
  else{
    var cnt={};
    top.forEach(function(q){reasonList(q).forEach(function(k){cnt[k]=(cnt[k]||0)+1})});
    var sharedChk=Object.keys(cnt).filter(function(k){return cnt[k]>1});
    h+='<div class="ocards">'+top.map(function(q){return optCard(q,sharedChk)}).join('')+'</div>'+sharedBox(top,sharedChk)+'<p class="note-s">'+T('matchNote')+'</p>';
  }
  return h+otherHtml(R)+'</section>';
}
/* cost and impact exploration: direct access; the last explored solution stays available */
function sectionC(){
  var X=window.NBS4MED_EXPLORE,last=X.lastSolution();
  return '<section class="rs no-print" aria-labelledby="coH"><h2 id="coH">'+X.exploreTitle()+'</h2><p class="sub">'+T('exSecP')+'</p>'+
    '<button class="btn btn-primary" type="button" id="openExplore"><span>'+X.ctaLabel()+'</span>'+ico('arrow','flip')+'</button>'+(last?'<p class="note-s">'+esc(T('lastEx')(last))+'</p>':'')+'</section>';
}
/* sections 3 and 4: supporting calculations and cost. Direct access to the calculators; an explored solution stays available. */
function sectionC(){
  var X=window.NBS4MED_EXPLORE,last=X.lastSolution();
  return '<section class="rs" aria-labelledby="s3H"><h2 id="s3H">'+T('s3H')+'</h2>'+X.section3Html()+'</section>'+
    '<section class="rs" aria-labelledby="s4H"><h2 id="s4H">'+T('s4H')+'</h2>'+X.section4Html()+'</section>'+
    '<div class="no-print"><button class="btn btn-primary" type="button" id="openExplore"><span>'+X.ctaLabel()+'</span>'+ico('arrow','flip')+'</button>'+(last?'<p class="note-s">'+esc(T('lastEx')(last))+'</p>':'')+'</div>';
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
  box.innerHTML=
    '<div class="res-head"><h1 id="resTitle" tabindex="-1">'+T('resTitle')+'</h1>'+
      '<button class="btn no-print" type="button" id="editAns">'+ico('back','flip')+'<span>'+T('edit')+'</span></button></div>'+
    '<p class="notice">'+ico('info')+'<span>'+T('protoShort')+'</span></p>'+
    '<div class="report no-print" role="group" aria-label="'+T('repH')+'"><b>'+T('repH')+'</b>'+
      '<button class="btn btn-primary" type="button" id="dlPdf">'+ico('print')+'<span>'+T('pdf')+'</span></button>'+
      '<button class="btn" type="button" id="dlPdfDetail">'+ico('print')+'<span>'+T('pdfDetail')+'</span></button>'+
      '<button class="btn" type="button" id="dlCsv">'+ico('down')+'<span>'+T('csv')+'</span></button>'+
      '<div class="toast" id="dlNote" role="status"></div></div>'+
    sectionA()+sectionB()+sectionC()+
    '<section class="rs" aria-label="'+esc(T('methAll'))+'">'+methodologyHtml()+'</section>'+
    (SHOW_FEEDBACK?'<section class="rs no-print" aria-labelledby="fbH"><h2 id="fbH">'+T('fbH')+'</h2><div id="fbBody" style="margin-top:14px">'+fbHtml()+'</div></section>':'');
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
  if(n==='nbs-exist'){
    st.nbs.exist=t.value;
    if(st.miss.keys)delete st.miss.keys['nbs:exist'];
    var fe=$('#f-nbsx .inline-err');if(fe)fe.remove();
    $('#nbsDyn').innerHTML=nbsIndHtml();
  }
  else if(n==='nbs-type'){
    st.nbs.types[t.value]=t.checked;
    var ob=$('#nbsOtherBox');if(ob)ob.hidden=!st.nbs.types.other;
  }
  else if(n.indexOf('imp|')===0){
    var ip=n.split('|');st.impl[ip[1]+'|'+ip[2]]=t.value;refreshResults('input[name="'+n+'"][value="'+t.value+'"]');return;
  }
  else if(n==='scope-area'){
    var sc=st.scope,pv=pilotOf(t.value);
    sc.area=t.value;
    if(pv){if(!sc.type||sc.typeAuto){sc.type='site';sc.typeAuto=true}}
    else if(sc.typeAuto){sc.type='';sc.typeAuto=false}
    if(st.miss.keys)['scope:area','scope:mName','scope:mCountry','scope:mCity','scope:type'].forEach(function(k){delete st.miss.keys[k]});
    $('#areaErr').innerHTML='';t.classList.remove('input-err');t.removeAttribute('aria-invalid');
    $('#locBox').innerHTML=locHtml();$('#f-type').innerHTML='<legend>'+T('fScope')+' *</legend>'+scaleHtml();
  }
  else if(n==='scope-type'){
    st.scope.type=t.value;st.scope.typeAuto=false;
  }
  else if(n.indexOf('ctx-')===0){st.ctx[n.slice(4)]=t.value}
  else if(n==='risk'){
    if(t.value==='unsure'){if(t.checked)RISK.forEach(function(r){st.risks[r.k]=false});st.risks.unsure=t.checked}
    else{st.risks[t.value]=t.checked;if(t.checked)st.risks.unsure=false}
    $$('input[name="risk"]').forEach(function(i){i.checked=!!st.risks[i.value]});
    var rn=$('#riskNote');if(rn)rn.innerHTML=riskNoteHtml();
    var re=$('#riskErr');if(re&&riskOk())re.innerHTML=''}
  else if(n.indexOf('chk|')===0){st.scr[n.split('|')[2]]=t.value;refreshResults('input[name="'+n+'"][value="'+t.value+'"]');return}
  else if(n.indexOf('ind-')===0){
    var id=n.slice(4);
    st.sc[id]=t.value==='U'?t.value:+t.value;
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
  if(d&&d.dataset&&d.dataset.rk)st.rOpen[d.dataset.rk]=d.open;
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
  st.scope={area:'other',mName:'SAMPLE DATA: Example neighbourhood (not a real area)',mCountry:'Sample country',mCity:'Sample city',type:'neighbourhood',typeAuto:false,org:'Sample organisation (test)',date:today()};
  st.ctx={density:'high',land:'low'};
  st.risks={heat:true,flood:true};
  st.scr={};st.chkOpen={};
  st.nbs={exist:'yes',types:{street:true},other:''};st.impl={};
  st.sc={A:1,B:2,C:1};
  st.rat={A:'SAMPLE: street trees in two of five districts.'};
  st.evd={A:'SAMPLE: Parks department survey 2024 (example title)'};
  st.cf={A:'high',B:'mid'};
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
window.NBS4MED_CORE={st:st,lang:function(){return lang},T:T,S:S,esc:esc,fmt:fmt,ico:ico,nm:nm,pick:pick,integ:integ,nbsTypes:nbsTypes,lvLabel:lvLabel,implQ:implQ,implVal:implVal,implLabel:implLabel,IMPL:IMPL,recs:recs,recFor:recFor,
  riskList:riskList,riskOk:riskOk,riskText:riskText,matchStatus:matchStatus,matchMessages:matchMessages,UNSURE:UNSURE,indDone:indDone,allComplete:allComplete,IND:IND,CTX:CTX,RISK:RISK,CONF:CONF,OPT:OPT,CHK:CHK,
  nav:nav,ansLabel:ansLabel,ansCsv:ansCsv,ansState:ansState,cfLabel:cfLabel,confCounts:confCounts,scopeTypeLabel:scopeTypeLabel,areaName:areaName,areaCountry:areaCountry,areaCity:areaCity,
  rubricText:rubricText,stLabel:stLabel,whyText:whyText,optByNbs:optByNbs,weightsTable:weightsTable,
  chkKeys:chkKeys,chkVal:chkVal,roofStruct:roofStruct,catText:catText,CATS:CATS,RULE:RULE,methA:function(){return S.methAL[lang]},methB:function(){return S.methBL[lang]},
  isNum:isNum,today:today,fillSample:fillSample,renderAssess:renderAssess,freshState:freshState,setState:function(n){st=n;window.NBS4MED_CORE.st=n}};

/* init */
applyStatic();
route();
})();
