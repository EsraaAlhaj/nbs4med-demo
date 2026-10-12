(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var lang='en';

/* ---------- data (unchanged) ---------- */
var CRIT=[
 {id:'C1',en:'NBS Integration Status',ar:'حالة دمج الحلول القائمة على الطبيعة',sh:'Integration',shAr:'الدمج'},
 {id:'C2',en:'Policy & Planning',ar:'السياسات والتخطيط',sh:'Policy',shAr:'السياسات'},
 {id:'C3',en:'Institutional & Technical Capacity',ar:'القدرات المؤسسية والفنية',sh:'Capacity',shAr:'القدرات'},
 {id:'C4',en:'Stakeholder Engagement',ar:'إشراك أصحاب المصلحة',sh:'Engagement',shAr:'الإشراك'},
 {id:'C5',en:'Funding & Sustainability',ar:'التمويل والاستدامة',sh:'Funding',shAr:'التمويل'}
];
var IND=[
 {id:'1.1',c:0,en:'NBS inventory',ar:'جرد الحلول القائمة على الطبيعة',h:'A mapped list of existing NBS, such as parks, green roofs, wetlands and tree corridors.',ha:'قائمة مرسومة على خريطة بالحلول القائمة، مثل الحدائق والأسطح الخضراء والأراضي الرطبة وممرات الأشجار.'},
 {id:'1.2',c:0,en:'Coverage of public space',ar:'تغطية الحلول في الفضاء العام',h:'Share of public space with green or blue features, compared with a local target.',ha:'نسبة الفضاء العام ذي العناصر الخضراء أو الزرقاء مقارنةً بهدف محلي.'},
 {id:'1.3',c:0,en:'Link to grey infrastructure',ar:'التكامل مع البنية التحتية الرمادية',h:'NBS are planned together with drainage, roads and buildings, not added afterwards.',ha:'تُخطَّط الحلول مع الصرف والطرق والمباني، لا بعدها.'},
 {id:'2.1',c:1,en:'NBS in strategic plans',ar:'إدراج الحلول في الخطط الاستراتيجية',h:'NBS appear in the climate adaptation plan, master plan or sector plans.',ha:'تظهر الحلول في خطة التكيف المناخي أو المخطط العام أو الخطط القطاعية.'},
 {id:'2.2',c:1,en:'Regulation and standards',ar:'المتطلبات التنظيمية',h:'Zoning, building codes or green-area standards require or reward NBS.',ha:'تشترط أنظمة التقسيم أو البناء أو معايير المساحات الخضراء الحلول أو تكافئها.'},
 {id:'2.3',c:1,en:'Targets and monitoring',ar:'الأهداف والرصد',h:'Measurable NBS targets exist and are reported on a regular schedule.',ha:'توجد أهداف قابلة للقياس تُرفع عنها تقارير دورية.'},
 {id:'3.1',c:2,en:'Dedicated staff or unit',ar:'كوادر أو وحدة مختصة',h:'A unit or named staff are responsible for NBS across departments.',ha:'وحدة أو موظفون محددون مسؤولون عن الحلول عبر الإدارات.'},
 {id:'3.2',c:2,en:'Technical know-how',ar:'الخبرة الفنية والأدلة الإرشادية',h:'Staff or contractors can design, build and manage NBS; guidance documents exist.',ha:'يستطيع الموظفون أو المقاولون تصميم الحلول وتنفيذها وإدارتها، وتوجد أدلة إرشادية.'},
 {id:'3.3',c:2,en:'Data and monitoring tools',ar:'البيانات وأدوات الرصد',h:'Climate, land-use and NBS data are available and used in decisions.',ha:'بيانات المناخ واستخدام الأراضي والحلول متاحة وتُستخدم في القرار.'},
 {id:'4.1',c:3,en:'Community participation',ar:'مشاركة المجتمع في التصميم',h:'Residents help set priorities or design NBS, not only comment at the end.',ha:'يشارك السكان في تحديد الأولويات أو التصميم، لا في إبداء الرأي بعد الانتهاء فقط.'},
 {id:'4.2',c:3,en:'Coordination across departments and owners',ar:'التنسيق بين الإدارات والقطاع الخاص',h:'Departments, utilities and private owners coordinate on NBS actions.',ha:'تنسق الإدارات والمرافق والملاك الخواص إجراءات الحلول.'},
 {id:'5.1',c:4,en:'Capital funding',ar:'تمويل رأس المال',h:'Funding for building NBS is secured or realistically available.',ha:'تمويل الإنشاء مضمون أو متاح بصورة واقعية.'},
 {id:'5.2',c:4,en:'Long-term maintenance budget',ar:'ميزانية الصيانة طويلة الأجل',h:'A long-term budget covers upkeep, watering and replacement.',ha:'ميزانية طويلة الأجل تغطي الصيانة والري والاستبدال.'},
 {id:'5.3',c:4,en:'Co-benefits valued in decisions',ar:'تقدير الفوائد المشتركة في القرار',h:'Benefits such as cooling, health and flood protection are counted in funding decisions.',ha:'تُحتسب فوائد مثل التبريد والصحة والحماية من الفيضان في قرارات التمويل.'}
];
var CTX=[
 {k:'density',en:'Urban density',ar:'الكثافة العمرانية',o:[['low','Low','منخفضة'],['mid','Medium','متوسطة'],['high','High','مرتفعة']]},
 {k:'land',en:'Public land available for NBS',ar:'توفر الأراضي العامة للحلول',o:[['low','Limited','محدود'],['mid','Moderate','متوسط'],['high','Abundant','وافر']]},
 {k:'income',en:'Income level of the area',ar:'مستوى الدخل في المنطقة',o:[['low','Low','منخفض'],['mid','Middle','متوسط'],['high','High','مرتفع']]}
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
var LEVELS=[
 {en:'Insufficient',ar:'غير كافٍ',c:'l0'},{en:'Partial',ar:'جزئي',c:'l1'},{en:'Adequate',ar:'كافٍ',c:'l2'},{en:'Strong',ar:'قوي',c:'l3'}
];
var OPT=[
 {id:'tiny',en:'Urban forest (Miyawaki method)',ar:'غابة حضرية (طريقة ميازاكي)',eg:'NBS4MED pilot: Cerdanyola del Vallès, Spain',w:{heat:3,flood:1,drought:1,coast:0,fire:0,air:2},land:1,cx:1},
 {id:'roof',en:'Green roof',ar:'سطح أخضر',eg:'NBS4MED pilot: Izmir, Türkiye',w:{heat:2,flood:2,drought:1,coast:0,fire:0,air:1},land:0,cx:2},
 {id:'street',en:'Green corridor',ar:'ممر أخضر',eg:'NBS4MED pilot: Heliopolis, Egypt',w:{heat:3,flood:1,drought:0,coast:0,fire:0,air:2},land:0,cx:0},
 {id:'swale',en:'Rain garden and bioswale',ar:'حديقة مطرية وخندق نباتي',eg:'',w:{heat:1,flood:3,drought:1,coast:0,fire:0,air:0},land:1,cx:1},
 {id:'perm',en:'Permeable paving',ar:'رصف نفّاذ',eg:'',w:{heat:0,flood:3,drought:1,coast:0,fire:0,air:0},land:0,cx:0},
 {id:'pocket',en:'Pocket park',ar:'حديقة صغيرة',eg:'',w:{heat:2,flood:1,drought:0,coast:0,fire:0,air:2},land:1,cx:0},
 {id:'eco',en:'Smart eco-park',ar:'منتزه بيئي ذكي',eg:'NBS4MED pilot: Sikionies, Greece',w:{heat:3,flood:2,drought:2,coast:0,fire:1,air:2},land:2,cx:2},
 {id:'wet',en:'Rainwater retention basin',ar:'حوض احتجاز مياه الأمطار',eg:'NBS4MED pilot: Tunisia',w:{heat:1,flood:3,drought:3,coast:1,fire:0,air:0},land:2,cx:2},
 {id:'dune',en:'Vegetated dune and shoreline',ar:'كثبان وشاطئ نباتي',eg:'',w:{heat:0,flood:1,drought:0,coast:3,fire:0,air:0},land:1,cx:1}
];
var CLAB={land:[['Low','منخفضة'],['Medium','متوسطة'],['High','عالية']],cx:[['Low','منخفض'],['Medium','متوسط'],['High','مرتفع']]};
var WEAK={
 en:['NBS Integration Status is your weakest dimension. Few NBS are mapped or linked to roads, drainage and buildings, so it is hard to see what exists and what it does.',
     'Policy & Planning is your weakest dimension. NBS are not yet written into plans, rules or targets, so projects depend on individual champions rather than on a mandate.',
     'Institutional & Technical Capacity is your weakest dimension. Without named staff, design know-how and data, NBS projects are slow to prepare and hard to manage.',
     'Stakeholder Engagement is your weakest dimension. Residents and other departments are involved late or not at all, which raises the risk of opposition and poor upkeep.',
     'Funding & Sustainability is your weakest dimension. Building costs may be covered, but upkeep and the value of co-benefits are not, so NBS risk being built and then left to decline.'],
 ar:['حالة الدمج هي أضعف أبعادك. القليل من الحلول مرسوم على خريطة أو مرتبط بالطرق والصرف والمباني، فيصعب معرفة ما هو قائم وما يقدمه.',
     'السياسات والتخطيط هو أضعف أبعادك. لم تُدرج الحلول بعد في الخطط والأنظمة والأهداف، فتعتمد المشاريع على أفراد لا على تفويض.',
     'القدرات المؤسسية والفنية هي أضعف أبعادك. دون كوادر محددة وخبرة تصميم وبيانات، يبطؤ إعداد المشاريع ويصعب تدبيرها.',
     'إشراك أصحاب المصلحة هو أضعف أبعادك. يأتي إشراك السكان والإدارات متأخرًا أو لا يأتي، فيزيد خطر الاعتراض وضعف الصيانة.',
     'التمويل والاستدامة هو أضعف أبعادك. قد تُغطى كلفة الإنشاء، لكن الصيانة وقيمة الفوائد المشتركة غير مغطاة، فيخشى أن تُنشأ الحلول ثم تتدهور.']
};

/* ---------- strings ---------- */
var S={
 s:{en:['Not addressed','Partial','Fully addressed'],ar:['غير معالَج','جزئي','معالَج بالكامل']},
 key:{en:'Score each indicator: 0 = not addressed, 1 = partial, 2 = fully addressed.',ar:'قيّم كل مؤشر: 0 = غير معالَج، 1 = جزئي، 2 = معالَج بالكامل.'},
 stepOf:{en:function(a,b){return 'Step '+a+' of '+b},ar:function(a,b){return 'الخطوة '+a+' من '+b}},
 ansN:{en:function(a,b){return a+' of '+b+' answered'},ar:function(a,b){return a+' من '+b+' مُجاب عنها'}},
 back:{en:'Back',ar:'رجوع'},cont:{en:'Continue',ar:'متابعة'},seeRes:{en:'See results',ar:'عرض النتائج'},
 stCtx:{en:'Site context',ar:'سياق الموقع'},stRisk:{en:'Climate risks to address',ar:'المخاطر المناخية المطلوب معالجتها'},stConf:{en:'Data confidence',ar:'الثقة في البيانات'},
 ctxP:{en:'Three questions about the area. They are not scored. They only help filter the NBS options later.',ar:'ثلاثة أسئلة عن المنطقة. لا تُحتسب في النتيجة، وتُستخدم فقط لتصفية الخيارات لاحقًا.'},
 riskP:{en:'Select every risk that affects the area. The recommendations are matched to these.',ar:'اختر كل خطر يؤثر في المنطقة. تُطابَق التوصيات مع هذه المخاطر.'},
 evalP:{en:'Score each indicator for the city or area as it is today, not as planned.',ar:'قيّم كل مؤشر بحسب وضع المدينة أو المنطقة اليوم لا المخطط له.'},
 confP:{en:'How well can you back up these answers? It does not change the score, but it is shown with the results.',ar:'ما مدى قدرتك على إثبات هذه الإجابات؟ لا يغيّر ذلك النتيجة، لكنه يظهر مع النتائج.'},
 optionalHint:{en:'Select all that apply.',ar:'اختر كل ما ينطبق.'},
 critAns:{en:function(a,b){return a+' of '+b+' answered'},ar:function(a,b){return a+' من '+b+' مُجاب عنها'}},
 errTitle:{en:function(n){return n===1?'1 question still needs an answer:':n+' questions still need an answer:'},ar:function(n){return 'ما زال '+n+' من الأسئلة بلا إجابة:'}},
 errCtx:{en:'Site context: all three questions',ar:'سياق الموقع: الأسئلة الثلاثة'},
 errRisk:{en:'Climate risks: choose at least one',ar:'المخاطر المناخية: اختر خطرًا واحدًا على الأقل'},
 errConf:{en:'Data confidence: choose one',ar:'الثقة في البيانات: اختر واحدًا'},
 pickOne:{en:'Choose at least one climate risk.',ar:'اختر خطرًا مناخيًا واحدًا على الأقل.'},
 pickAns:{en:'Choose an answer.',ar:'اختر إجابة.'},
 loading:{en:'Calculating results',ar:'جارٍ حساب النتائج'},
 resTitle:{en:'Your results',ar:'نتائجك'},
 edit:{en:'Edit answers',ar:'تعديل الإجابات'},
 overall:{en:'Overall score',ar:'النتيجة الإجمالية'},
 levelIs:{en:'Level',ar:'المستوى'},
 repH:{en:'Download report',ar:'تحميل التقرير'},
 pdf:{en:'Print / Save as PDF',ar:'طباعة / حفظ بصيغة PDF'},csv:{en:'Download CSV',ar:'تحميل CSV'},
 dlOk:{en:'CSV file prepared.',ar:'تم تجهيز ملف CSV.'},
 critH:{en:'Criterion scores',ar:'النتائج حسب المعيار'},
 critSub:{en:'Five criteria, each scored from its indicators.',ar:'خمسة معايير، يُحتسب كل منها من مؤشراته.'},
 radarH:{en:'Score by criterion',ar:'النتيجة حسب المعيار'},
 heatH:{en:'Indicator by indicator',ar:'مؤشرًا مؤشرًا'},
 sgH:{en:'Strengths and gaps',ar:'نقاط القوة والفجوات'},
 strengths:{en:'Strength',ar:'نقطة قوة'},watch:{en:'Developing',ar:'قيد التطوير'},gap:{en:'Priority gap',ar:'فجوة ذات أولوية'},
 readH:{en:'Plain-language reading',ar:'قراءة مبسطة'},
 crit:{en:'Criterion',ar:'المعيار'},score:{en:'Score',ar:'النتيجة'},level:{en:'Level',ar:'المستوى'},
 confShown:{en:function(c){return 'Data confidence: '+c+'. Treat the result as an indication, not an audit.'},ar:function(c){return 'الثقة في البيانات: '+c+'. اعتبر النتيجة مؤشرًا لا تدقيقًا.'}},
 thresholds:{en:'Levels: Insufficient below 30%, Partial 30 to 54%, Adequate 55 to 79%, Strong 80% and above.',ar:'المستويات: غير كافٍ دون 30%، جزئي 30 إلى 54%، كافٍ 55 إلى 79%، قوي 80% فأكثر.'},
 recH:{en:'NBS recommendations',ar:'توصيات الحلول القائمة على الطبيعة'},
 recP:{en:'Options ranked by how well they match your selected risks and site context.',ar:'خيارات مرتبة بحسب مطابقتها لمخاطرك وسياق موقعك.'},
 suit:{en:'Suitability',ar:'الملاءمة'},cplx:{en:'Complexity',ar:'التعقيد'},landN:{en:'Land need',ar:'الحاجة إلى الأرض'},
 sH:['High','Medium','Low'],sHa:['عالية','متوسطة','منخفضة'],
 allOpt:{en:'All options compared',ar:'مقارنة بين كل الخيارات'},
 option:{en:'Option',ar:'الخيار'},
 capNote:{en:'Capacity (C3) is below 40%. Start with low-complexity options and build skills before larger projects.',ar:'القدرات (C3) دون 40%. ابدأ بخيارات منخفضة التعقيد وابنِ المهارات قبل المشاريع الأكبر.'},
 recEmpty:{en:'Recommendations need at least one climate risk and the three context answers.',ar:'تحتاج التوصيات إلى خطر مناخي واحد على الأقل وإجابات السياق الثلاث.'},
 costH:{en:'Indicative impact and cost',ar:'الأثر والتكلفة الإرشاديان'},
 costP:{en:'Enter the area you could treat and a time horizon. Ranges are for early planning only.',ar:'أدخل المساحة التي يمكن معالجتها وأفقًا زمنيًا. النطاقات للتخطيط المبكر فقط.'},
 area:{en:'Area to treat (m²)',ar:'المساحة المراد معالجتها (م²)'},horizon:{en:'Time horizon',ar:'الأفق الزمني'},
 yrs:{en:function(n){return n+' years'},ar:function(n){return n+' سنة'}},
 areaErr:{en:'Enter an area between 50 and 100,000 m².',ar:'أدخل مساحة بين 50 و100,000 م².'},
 capex:{en:'Build cost',ar:'كلفة الإنشاء'},maint:{en:'Upkeep over horizon',ar:'الصيانة خلال الأفق'},cool:{en:'Local cooling at midday',ar:'التبريد المحلي عند الظهيرة'},ret:{en:'Rainwater retained per year',ar:'مياه الأمطار المحتجزة سنويًا'},
 disc:{en:'Indicative values. Ranges are generic planning figures for the Mediterranean region and are not a quote, a design or a forecast. Local soil, climate, labour prices and design change them a lot. Confirm with a site study before any budget decision.',ar:'قيم إرشادية. هذه النطاقات أرقام تخطيطية عامة للمنطقة المتوسطية، وليست عرض سعر ولا تصميمًا ولا توقعًا. تتغير كثيرًا بحسب التربة والمناخ وأسعار العمالة والتصميم. تحقق عبر دراسة موقعية قبل أي قرار بالميزانية.'},
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
 doneL:{en:'completed',ar:'مكتمل'}
};
function T(k){return S[k][lang]}

/* ---------- state ---------- */
var STEPS=[{k:'ctx'},{k:'risk'},{k:'crit',i:0},{k:'crit',i:1},{k:'crit',i:2},{k:'crit',i:3},{k:'crit',i:4},{k:'conf'}];
var TOTAL_Q=3+1+14+1;
var st={ctx:{},risks:{},sc:{},conf:null,area:2000,horizon:10,step:0,view:'intro',res:'ready',fb:'form',miss:{}};

function nm(o){return lang==='ar'?o.ar:o.en}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fmt(n){return Number(n).toLocaleString('en-US')}
function lvlIdx(p){return p<30?0:p<55?1:p<80?2:3}
function ico(n,cls){return '<svg class="ic '+(cls||'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>'}
function riskList(){return RISK.filter(function(r){return st.risks[r.k]})}
function answered(){
  var n=0;
  CTX.forEach(function(c){if(st.ctx[c.k])n++});
  if(riskList().length)n++;
  IND.forEach(function(i){if(st.sc[i.id]!==undefined)n++});
  if(st.conf)n++;
  return n;
}

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
 howH:'كيف تعمل',s1h:'ابدأ',s1p:'افتح الأداة. لا حاجة إلى حساب أو تسجيل دخول.',s2h:'أجب',s2p:'صِف موقعك، واختر المخاطر المناخية، ثم قيّم 14 مؤشرًا من 0 إلى 2.',
 s3h:'احصل على النتائج',s3p:'اطّلع على مستواك ونقاط القوة والفجوات، ثم على الخيارات المناسبة لمخاطرك.',s4h:'حمّل وحسّن',s4p:'احفظ تقريرًا بصيغة PDF أو CSV، وعدّل إجاباتك وأعد التشغيل.',
 resourcesH:'المصادر',stepsH:'خطوات التقييم',sample:'املأ بإجابات نموذجية',clear:'مسح الكل',
 fDisc:'إخلاء مسؤولية التمويل',fPart:'شركاء المشروع',fContact:'التواصل والخصوصية'
};
function applyStatic(){
  $$('[data-i18n]').forEach(function(el){
    if(el.dataset.en===undefined)el.dataset.en=el.innerHTML;
    var k=el.getAttribute('data-i18n');
    el.innerHTML=(lang==='ar'&&AR[k]!==undefined)?AR[k]:el.dataset.en;
  });
}

/* ---------- calculations (unchanged logic) ---------- */
function calc(){
  var per=CRIT.map(function(cr,ci){
    var items=IND.filter(function(i){return i.c===ci});
    var sum=items.reduce(function(s,i){return s+(st.sc[i.id]||0)},0);
    var max=items.length*2;
    return {sum:sum,max:max,pct:Math.round(sum/max*100)};
  });
  var sum=per.reduce(function(s,p){return s+p.sum},0);
  var pct=Math.round(sum/28*100);
  var weak=0;per.forEach(function(p,i){if(p.pct<per[weak].pct)weak=i});
  return {per:per,sum:sum,pct:pct,lvl:lvlIdx(pct),weak:weak};
}
function suitability(o){
  var rs=riskList();
  if(!rs.length)return 0;
  var s=0;rs.forEach(function(r){s+=o.w[r.k]});
  var p=s/(rs.length*3)*100;
  var landAvail=st.ctx.land==='low'?0:st.ctx.land==='mid'?1:2;
  if(o.land>landAvail)p-= (o.land-landAvail)*15;
  if(st.ctx.density==='high'&&o.land===2)p-=10;
  return Math.max(0,Math.min(100,Math.round(p)));
}
function ranked(){
  return OPT.map(function(o){return {o:o,s:suitability(o)}}).sort(function(a,b){return b.s-a.s});
}
function suitIdx(s){return s>=60?0:s>=35?1:2}
function meter(n,of){var h='<span class="meter" aria-hidden="true">';for(var i=0;i<of;i++)h+='<i class="'+(i<n?'on':'')+'"></i>';return h+'</span>'}
function range(a,b,d){d=d||0;return fmt(+a.toFixed(d))+' – '+fmt(+b.toFixed(d))}
function indDone(){return IND.every(function(i){return st.sc[i.id]!==undefined})}
function allComplete(){return answered()===TOTAL_Q}

/* ---------- step helpers ---------- */
function stepName(s){
  if(s.k==='ctx')return T('stCtx');
  if(s.k==='risk')return T('stRisk');
  if(s.k==='conf')return T('stConf');
  return CRIT[s.i].id+' '+nm(CRIT[s.i]);
}
function stepMissing(s){
  var m=[];
  if(s.k==='ctx'){
    if(CTX.some(function(c){return !st.ctx[c.k]}))m.push({t:T('errCtx'),href:'#f-'+CTX.filter(function(c){return !st.ctx[c.k]})[0].k});
  }else if(s.k==='risk'){
    if(!riskList().length)m.push({t:T('errRisk'),href:'#riskField'});
  }else if(s.k==='crit'){
    IND.forEach(function(i){if(i.c===s.i&&st.sc[i.id]===undefined)m.push({t:i.id+' '+nm(i),href:'#ind-'+i.id.replace('.','-'),id:i.id})});
  }else if(!st.conf)m.push({t:T('errConf'),href:'#confField'});
  return m;
}
function reachable(){
  for(var i=0;i<STEPS.length;i++){if(stepMissing(STEPS[i]).length)return i}
  return STEPS.length-1;
}
function seg(name,opts,val,cls){
  return '<div class="seg '+(cls||'')+'">'+opts.map(function(o){
    return '<label><input type="radio" name="'+name+'" value="'+esc(o[0])+'"'+(String(val)===String(o[0])?' checked':'')+'><span>'+esc(o[1])+'</span></label>';
  }).join('')+'</div>';
}

/* ---------- render: assessment ---------- */
function renderSide(){
  var reach=reachable();
  $('#stepList').innerHTML=STEPS.map(function(s,i){
    var done=!stepMissing(s).length;
    var cur=i===st.step;
    var lab=(s.k==='crit'?'':'')+esc(stepName(s));
    return '<li class="'+(done?'done':'')+'"><button type="button" data-step="'+i+'"'+(cur?' aria-current="step"':'')+(i>reach?' disabled':'')+'>'+
      '<span class="step-no">'+(done?ico('check'):(i+1))+'</span><span>'+lab+(done?'<span class="sr"> ('+T('doneL')+')</span>':'')+'</span></button></li>';
  }).join('');
}
function renderPanel(){
  var s=STEPS[st.step],h='',desc='';
  var miss={};(st.miss.ids||[]).forEach(function(id){miss[id]=1});
  if(s.k==='ctx'){
    desc=T('ctxP');
    h=CTX.map(function(c){
      var opts=c.o.map(function(o){return [o[0],lang==='ar'?o[2]:o[1]]});
      var bad=st.miss.ctx&&!st.ctx[c.k];
      return '<fieldset class="field" id="f-'+c.k+'"><legend>'+esc(nm(c))+'</legend>'+seg('ctx-'+c.k,opts,st.ctx[c.k])+(bad?'<div class="inline-err">'+T('pickAns')+'</div>':'')+'</fieldset>';
    }).join('');
  }else if(s.k==='risk'){
    desc=T('riskP');
    h='<fieldset class="field" style="margin:0" id="riskField"><legend class="sr">'+esc(T('stRisk'))+'</legend><p class="hint">'+T('optionalHint')+'</p><div class="risks">'+
      RISK.map(function(r){
        return '<label class="chk"><input type="checkbox" name="risk" value="'+r.k+'"'+(st.risks[r.k]?' checked':'')+'><span><b>'+esc(nm(r))+'</b><small>'+esc(lang==='ar'?r.da:r.d)+'</small></span></label>';
      }).join('')+'</div><div id="riskErr">'+(st.miss.risk&&!riskList().length?'<div class="inline-err">'+T('pickOne')+'</div>':'')+'</div></fieldset>';
  }else if(s.k==='crit'){
    desc=T('evalP');
    h='<div class="scale-key">'+ico('info')+'<span>'+T('key')+'</span></div>'+
      IND.filter(function(i){return i.c===s.i}).map(function(i){
        var v=st.sc[i.id];
        var opts=[[0,'0 · '+S.s[lang][0]],[1,'1 · '+S.s[lang][1]],[2,'2 · '+S.s[lang][2]]];
        return '<div class="ind'+(miss[i.id]?' missing':'')+'" id="ind-'+i.id.replace('.','-')+'">'+
          '<div class="code">'+i.id+'</div>'+
          '<div><div class="t">'+esc(nm(i))+'</div><div class="h">'+esc(lang==='ar'?i.ha:i.h)+'</div></div>'+
          '<fieldset class="ctl" style="border:0;padding:0;margin:0;min-width:0"><legend class="sr">'+i.id+' '+esc(nm(i))+'</legend>'+
          '<div class="seg s'+(v===undefined?'':v)+'">'+opts.map(function(o){
            return '<label><input type="radio" name="ind-'+i.id+'" value="'+o[0]+'"'+(v===o[0]?' checked':'')+'><span>'+esc(o[1])+'</span></label>';
          }).join('')+'</div>'+(miss[i.id]?'<div class="inline-err">'+T('pickAns')+'</div>':'')+'</fieldset></div>';
      }).join('');
  }else{
    desc=T('confP');
    h='<fieldset class="field" id="confField" style="margin:0"><legend class="sr">'+esc(T('stConf'))+'</legend><div class="seg">'+CONF.map(function(o){
      return '<label><input type="radio" name="conf" value="'+o[0]+'"'+(st.conf===o[0]?' checked':'')+'><span>'+esc(lang==='ar'?o[2]:o[1])+'</span></label>';
    }).join('')+'</div>'+(st.miss.conf&&!st.conf?'<div class="inline-err">'+T('pickAns')+'</div>':'')+'</fieldset>';
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
  st.miss={ids:m.filter(function(x){return x.id}).map(function(x){return x.id}),ctx:s.k==='ctx',risk:s.k==='risk',conf:s.k==='conf'};
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
function radarSvg(r){
  var cx=170,cy=150,R=98,pts=[],axes='',labs='',rings='';
  [25,50,75,100].forEach(function(p){
    var ps=[];for(var i=0;i<5;i++){var a=-Math.PI/2+i*2*Math.PI/5;ps.push((cx+R*p/100*Math.cos(a)).toFixed(1)+','+(cy+R*p/100*Math.sin(a)).toFixed(1))}
    rings+='<polygon points="'+ps.join(' ')+'" fill="none" stroke="#D5DBD1" stroke-width="1"/>';
  });
  for(var i=0;i<5;i++){
    var a=-Math.PI/2+i*2*Math.PI/5,p=r.per[i].pct/100;
    axes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+R*Math.cos(a)).toFixed(1)+'" y2="'+(cy+R*Math.sin(a)).toFixed(1)+'" stroke="#D5DBD1"/>';
    pts.push((cx+R*p*Math.cos(a)).toFixed(1)+','+(cy+R*p*Math.sin(a)).toFixed(1));
    var lx=cx+(R+22)*Math.cos(a),ly=cy+(R+18)*Math.sin(a);
    var anc=Math.abs(Math.cos(a))<.2?'middle':(Math.cos(a)>0?'start':'end');
    labs+='<text x="'+lx.toFixed(1)+'" y="'+(ly+4).toFixed(1)+'" text-anchor="'+anc+'">'+CRIT[i].id+' · '+r.per[i].pct+'%</text>';
  }
  var dots=pts.map(function(p){var q=p.split(',');return '<circle cx="'+q[0]+'" cy="'+q[1]+'" r="4" fill="#17402F"/>'}).join('');
  return '<svg class="radar" viewBox="0 0 340 300" width="100%" role="img" aria-label="'+esc(T('radarH'))+': '+r.per.map(function(p,i){return CRIT[i].id+' '+p.pct+'%'}).join(', ')+'">'+rings+axes+
    '<polygon points="'+pts.join(' ')+'" fill="#17402F" fill-opacity=".16" stroke="#17402F" stroke-width="2"/>'+dots+labs+'</svg>';
}
function recsHtml(){
  if(!riskList().length||!st.ctx.density||!st.ctx.land||!st.ctx.income)return '<div class="note">'+T('recEmpty')+'</div>';
  var rk=ranked(),top=rk.slice(0,3);
  var capLow=indDone()?calc().per[2].pct<40:false;
  function row(x){
    var o=x.o;
    return {s:x.s,si:suitIdx(x.s),name:nm(o),eg:o.eg,lnd:CLAB.land[o.land][lang==='ar'?1:0],cx:CLAB.cx[o.cx][lang==='ar'?1:0],cxN:o.cx,lndN:o.land};
  }
  var cands=window.NBS4MED_EXPLORE.candidates();
  var cards=top.map(function(x,i){
    var d=row(x);
    return '<div><div class="rank">'+(i+1)+'</div><h3>'+esc(d.name)+'</h3><p>'+(d.eg?esc(d.eg):'&nbsp;')+'</p>'+
      '<dl><dt>'+T('suit')+'</dt><dd>'+meter(3-d.si,3)+(lang==='ar'?S.sHa[d.si]:S.sH[d.si])+' ('+d.s+'%)</dd>'+
      '<dt>'+T('cplx')+'</dt><dd>'+meter(d.cxN+1,3)+d.cx+'</dd>'+
      '<dt>'+T('landN')+'</dt><dd>'+meter(d.lndN+1,3)+d.lnd+'</dd></dl>'+
      window.NBS4MED_EXPLORE.reasonsHtml(cands[i])+'</div>';
  }).join('');
  var rows=rk.map(function(x,i){
    var d=row(x);
    return '<tr class="'+(i<3?'top-row':'')+'"><td>'+(i+1)+'</td><td>'+esc(d.name)+'</td><td>'+meter(3-d.si,3)+(lang==='ar'?S.sHa[d.si]:S.sH[d.si])+' <span style="color:var(--soft)">'+d.s+'%</span></td><td>'+d.cx+'</td><td>'+d.lnd+'</td></tr>';
  }).join('');
  return (capLow?'<div class="note">'+T('capNote')+'</div>':'')+
    '<p class="note-s" style="margin:0 0 14px">'+window.NBS4MED_EXPLORE.whyNote()+'</p>'+
    '<div class="top3">'+cards+'</div><h3 class="sub" style="font-size:19px;color:var(--g900);margin-bottom:12px">'+T('allOpt')+'</h3>'+
    '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>'+T('option')+'</th><th>'+T('suit')+'</th><th>'+T('cplx')+'</th><th>'+T('landN')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
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
  var r=calc(),L=LEVELS[r.lvl];
  var cls=r.per.map(function(p){return p.pct>=70?'g':p.pct>=40?'a':'r'});
  var groups={g:[],a:[],r:[]};r.per.forEach(function(p,i){groups[cls[i]].push(i)});
  function names(arr){return arr.length?arr.map(function(i){return CRIT[i].id+' '+nm(CRIT[i])}).join('; '):(lang==='ar'?'لا شيء':'None')}
  var heat='<div class="heat">'+CRIT.map(function(cr,ci){
    return '<div><h4>'+cr.id+' '+esc(lang==='ar'?cr.shAr:cr.sh)+'</h4>'+IND.filter(function(i){return i.c===ci}).map(function(i){
      var v=st.sc[i.id];
      return '<div class="cell v'+v+'" title="'+esc(nm(i))+'"><span>'+i.id+'</span><span>'+v+' · '+S.s[lang][v]+'</span></div>';
    }).join('')+'</div>';
  }).join('')+'</div>';
  var confTxt=(CONF.filter(function(c){return c[0]===st.conf})[0]||CONF[1]);
  box.innerHTML=
    '<div class="res-head"><h1 id="resTitle" tabindex="-1">'+T('resTitle')+'</h1>'+
      '<button class="btn no-print" type="button" id="editAns">'+ico('back','flip')+'<span>'+T('edit')+'</span></button></div>'+
    '<section class="rs first" aria-labelledby="ovH"><h2 id="ovH" class="sr">'+T('overall')+'</h2>'+
      '<div class="overall"><div><div class="big">'+r.sum+'<small> / 28</small></div></div>'+
      '<div><span class="chip lg '+L.c+'">'+esc(nm(L))+'</span> <span style="margin-inline-start:10px;font-weight:600">'+r.pct+'%</span>'+
      '<div class="scale" role="img" aria-label="'+esc(T('levelIs'))+': '+esc(nm(L))+', '+r.pct+'%"><i></i><i></i><i></i><i></i><em style="inset-inline-start:'+r.pct+'%"></em></div>'+
      '<div class="scale-lab" aria-hidden="true"><span>'+nm(LEVELS[0])+'</span><span>'+nm(LEVELS[1])+'</span><span>'+nm(LEVELS[2])+'</span><span>'+nm(LEVELS[3])+'</span></div></div></div>'+
      '<p class="thr">'+T('thresholds')+'</p>'+
      '<p class="conf-note">'+ico('info')+'<span>'+T('confShown')(lang==='ar'?confTxt[2]:confTxt[1])+'</span></p></section>'+
    '<div class="report no-print" role="group" aria-label="'+T('repH')+'"><b>'+T('repH')+'</b>'+
      '<button class="btn btn-primary" type="button" id="dlCsv">'+ico('down')+'<span>'+T('csv')+'</span></button>'+
      '<button class="btn" type="button" id="dlPdf">'+ico('print')+'<span>'+T('pdf')+'</span></button>'+
      '<div class="toast" id="dlNote" role="status"></div></div>'+
    '<section class="rs" aria-labelledby="crH"><h2 id="crH">'+T('critH')+'</h2><p class="sub">'+T('critSub')+'</p>'+
      '<div class="two"><div>'+radarSvg(r)+'</div>'+
      '<div><table class="tbl"><thead><tr><th>'+T('crit')+'</th><th class="num">'+T('score')+'</th><th>'+T('level')+'</th></tr></thead><tbody>'+
      CRIT.map(function(cr,i){var p=r.per[i],lv=LEVELS[lvlIdx(p.pct)];return '<tr><td>'+cr.id+' '+esc(nm(cr))+'</td><td class="num">'+p.sum+' / '+p.max+'</td><td><span class="chip '+lv.c+'">'+esc(nm(lv))+'</span></td></tr>'}).join('')+
      '</tbody></table></div></div>'+
      '<h3 style="font-size:19px;color:var(--g900);margin-top:32px">'+T('heatH')+'</h3>'+heat+'</section>'+
    '<section class="rs" aria-labelledby="sgH"><h2 id="sgH">'+T('sgH')+'</h2>'+
      '<ul class="lights" style="margin-top:12px">'+
      '<li><span class="dot g">'+T('strengths')+'</span><span>'+esc(names(groups.g))+'</span></li>'+
      '<li><span class="dot a">'+T('watch')+'</span><span>'+esc(names(groups.a))+'</span></li>'+
      '<li><span class="dot r">'+T('gap')+'</span><span>'+esc(names(groups.r))+'</span></li></ul>'+
      '<div class="read"><h3>'+T('readH')+'</h3><p>'+esc(WEAK[lang][r.weak])+' ('+r.per[r.weak].sum+' / '+r.per[r.weak].max+')</p></div></section>'+
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
document.addEventListener('change',function(e){
  var t=e.target,n=t.name||'';
  if(n.indexOf('ctx-')===0){st.ctx[n.slice(4)]=t.value}
  else if(n==='risk'){st.risks[t.value]=t.checked;var re=$('#riskErr');if(re&&riskList().length)re.innerHTML=''}
  else if(n.indexOf('ind-')===0){
    st.sc[n.slice(4)]=+t.value;
    var sg=t.closest('.seg');sg.className='seg s'+t.value;
    var row=t.closest('.ind');row.classList.remove('missing');var ie=$('.inline-err',row);if(ie)ie.remove();
  }
  else if(n==='conf'){st.conf=t.value}
  else return;
  if(st.view==='assess'){
    var s=STEPS[st.step];
    var fs=t.closest('fieldset');
    if(fs&&n.indexOf('ind-')!==0){var fe=$('.inline-err',fs);if(fe)fe.remove()}
    if(!stepMissing(s).length){clearErrors();$$('.inline-err',$('#stepPanel')).forEach(function(x){x.remove()})}
    renderSide();updateChrome();
  }
});
document.addEventListener('click',function(e){
  var t=e.target.closest('button,a');
  if(!t)return;
  var id=t.id;
  if(id==='startBtn'){e.preventDefault();nav('assess');return}
  if(id==='exitLink'||id==='brandLink'){e.preventDefault();nav('intro');return}
  if(id==='btnNext'){next();return}
  if(id==='btnBack'){goStep(st.step-1);return}
  if(t.dataset.step!==undefined&&t.closest('#stepList')){goStep(+t.dataset.step);return}
  if(id==='editAns'){st.step=0;nav('assess');return}
  if(id==='fillSample'){fillSample();return}
  if(id==='clearAll'){st.ctx={};st.risks={};st.sc={};st.conf=null;st.step=0;clearErrors();renderAssess(true);return}
  if(id==='dlCsv'){window.NBS4MED_EXPLORE.csv();return}
  if(id==='dlPdf'){window.NBS4MED_EXPLORE.print();return}
  if(t.dataset.lang){setLang(t.dataset.lang);return}
  if(t.tagName==='A'){
    var href=t.getAttribute('href')||'';
    if(href.charAt(0)==='#'&&href.length>1){
      e.preventDefault();
      if(href==='#about'||href==='#how'||href==='#resources'){scrollToIntro(href.slice(1))}
      else if(href==='#main'){var mn=$('#main');mn.setAttribute('tabindex','-1');mn.focus()}
      else{
        var target=document.querySelector(href);
        if(target){target.scrollIntoView({block:'center'});var inp=$('input',target);if(inp)inp.focus()}
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
function fillSample(){
  st.ctx={density:'high',land:'low',income:'mid'};
  st.risks={heat:true,flood:true};
  st.sc={'1.1':2,'1.2':1,'1.3':1,'2.1':1,'2.2':1,'2.3':0,'3.1':1,'3.2':1,'3.3':1,'4.1':2,'4.2':1,'5.1':1,'5.2':0,'5.3':0};
  st.conf='mid';clearErrors();renderAssess(false);
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
window.NBS4MED_CORE={st:st,lang:function(){return lang},T:T,S:S,esc:esc,fmt:fmt,ico:ico,nm:nm,calc:calc,ranked:ranked,
  riskList:riskList,indDone:indDone,allComplete:allComplete,CRIT:CRIT,IND:IND,CTX:CTX,RISK:RISK,CONF:CONF,LEVELS:LEVELS,OPT:OPT,
  WEAK:WEAK,lvlIdx:lvlIdx,nav:nav};

/* init */
applyStatic();
route();
})();
