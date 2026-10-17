/* Indicator guidance: question wording, "Read more" explanation and the transparent mapping from an answer to an improvement action.
   The five criteria, the fourteen indicators, their 0 to 2 rubrics and the scoring are defined in app.js and are not changed here.
   Each entry is [English, Arabic]. act[0] and act[1] are the suggested actions for an answer of 0 or 1. When the answer is Unknown
   the action is to obtain or verify the information named in ev. The suggested actions are general prompts, not findings about a site. */
(function () {
  'use strict';
  window.NBS4MED_GUIDE = {
    '1.1': {
      q: ['Is there an inventory of the existing nature-based solutions in the assessment area?', 'هل يوجد جرد للحلول القائمة على الطبيعة الموجودة في منطقة التقييم؟'],
      what: ['Whether the existing NBS, such as parks, green roofs, wetlands and tree corridors, are recorded in a mapped list.', 'ما إذا كانت الحلول القائمة، مثل الحدائق والأسطح الخضراء والأراضي الرطبة وممرات الأشجار، مسجلة في قائمة مرسومة على خريطة.'],
      why: ['Without a record of what exists, the area cannot plan, maintain or build on its NBS.', 'من دون سجل بما هو موجود لا يمكن للمنطقة أن تخطط لحلولها أو تصونها أو تبني عليها.'],
      consider: ['Whether solution types, locations and condition are recorded, how recent the record is, and who keeps it.', 'هل سُجّلت أنواع الحلول ومواقعها وحالتها، وما مدى حداثة السجل، ومن يتولى حفظه.'],
      act: {
        0: ['Create an inventory that records solution type, location and condition for the existing NBS.', 'إعداد جرد يسجل نوع كل حل قائم وموقعه وحالته.'],
        1: ['Update and complete the inventory so that it covers the whole area and records type, location and condition.', 'تحديث الجرد واستكماله ليغطي المنطقة كلها ويسجل النوع والموقع والحالة.']
      },
      ev: ['GIS inventories, municipal records or site documentation.', 'قوائم جرد في نظم المعلومات الجغرافية أو سجلات البلدية أو وثائق الموقع.']
    },
    '1.2': {
      q: ['How much of the public space in the area has green or blue features?', 'ما نسبة الفضاء العام في المنطقة التي فيها عناصر خضراء أو زرقاء؟'],
      what: ['How widely green or blue features, such as vegetation and water features, are present in public space. A local target and a measurement help but are not required.', 'مدى انتشار العناصر الخضراء أو الزرقاء، كالنباتات والعناصر المائية، في الفضاء العام. والهدف المحلي والقياس مفيدان لكنهما غير مطلوبين.'],
      why: ['Coverage shows how much of the public space can already contribute to cooling, shade and water management.', 'تبيّن التغطية مقدار الفضاء العام الذي يمكن أن يسهم أصلًا في التبريد والتظليل وإدارة المياه.'],
      consider: ['Any local green-space target, available measurements or mapping, and whether coverage is even across districts.', 'أي هدف محلي للمساحات الخضراء، والقياسات أو الخرائط المتاحة، وهل التغطية متوازنة بين الأحياء.'],
      act: {
        0: ['Map the green and blue features in public space and identify districts without any.', 'رسم خريطة للعناصر الخضراء والزرقاء في الفضاء العام وتحديد الأحياء الخالية منها.'],
        1: ['Identify the districts with low or uneven coverage and compare coverage with a local target, or agree on one.', 'تحديد الأحياء ذات التغطية المنخفضة أو غير المتوازنة ومقارنتها بهدف محلي، أو الاتفاق على هدف.']
      },
      ev: ['Land-cover or green-space maps, municipal green-area statistics and any local target.', 'خرائط الغطاء الأرضي أو المساحات الخضراء، وإحصاءات البلدية للمساحات الخضراء، وأي هدف محلي.']
    },
    '1.3': {
      q: ['Are nature-based solutions planned together with drainage, roads and buildings?', 'هل تُخطَّط الحلول القائمة على الطبيعة مع الصرف والطرق والمباني؟'],
      what: ['Whether NBS are planned together with grey infrastructure from the start, not added afterwards.', 'ما إذا كانت الحلول تُخطَّط مع البنية التحتية الرمادية منذ البداية وليس بعد ذلك.'],
      why: ['NBS planned with drainage, roads and buildings are cheaper to build, easier to maintain and more likely to work as intended.', 'الحلول المخططة مع الصرف والطرق والمباني أقل كلفة في الإنشاء وأسهل في الصيانة وأرجح أن تعمل كما هو مقصود.'],
      consider: ['Recent road, drainage or building projects and whether NBS were part of their design.', 'مشاريع الطرق أو الصرف أو المباني الأخيرة وهل كانت الحلول جزءًا من تصميمها.'],
      act: {
        0: ['Introduce a step in infrastructure projects to consider NBS at the design stage.', 'إدخال خطوة في مشاريع البنية التحتية للنظر في الحلول في مرحلة التصميم.'],
        1: ['Make joint planning of NBS and grey infrastructure a routine step, for example in project checklists.', 'جعل التخطيط المشترك للحلول والبنية التحتية الرمادية خطوة معتادة، مثلًا في قوائم مراجعة المشاريع.']
      },
      ev: ['Project design documents, drainage or road plans and procedures for infrastructure projects.', 'وثائق تصميم المشاريع وخطط الصرف أو الطرق وإجراءات مشاريع البنية التحتية.']
    },
    '2.1': {
      q: ['Do the strategic plans that apply to the area include nature-based solutions?', 'هل تتضمن الخطط الاستراتيجية السارية في المنطقة الحلول القائمة على الطبيعة؟'],
      what: ['Whether NBS appear in the climate adaptation plan, master plan or sector plans, and how specifically.', 'ما إذا كانت الحلول ترد في خطة التكيف المناخي أو المخطط العام أو الخطط القطاعية، وبأي درجة من التحديد.'],
      why: ['NBS that are named in plans, with measures and responsibilities, are more likely to be funded and delivered.', 'الحلول المذكورة في الخطط مع إجراءات ومسؤوليات أرجح أن تُموَّل وتُنفَّذ.'],
      consider: ['Which plans apply to the area and whether they name specific measures, locations or responsible bodies.', 'الخطط السارية في المنطقة وهل تذكر إجراءات أو مواقع أو جهات مسؤولة محددة.'],
      act: {
        0: ['Propose including NBS in the next update of the adaptation, master or sector plans.', 'اقتراح إدراج الحلول في التحديث القادم لخطة التكيف أو المخطط العام أو الخطط القطاعية.'],
        1: ['Add specific measures, locations and responsible bodies for NBS to the plans that mention them.', 'إضافة إجراءات ومواقع وجهات مسؤولة محددة للحلول في الخطط التي تذكرها.']
      },
      ev: ['The text of the applicable plans, with the sections that mention NBS.', 'نص الخطط السارية مع الأجزاء التي تذكر الحلول.']
    },
    '2.2': {
      q: ['Do zoning rules, building codes or green-area standards require or reward nature-based solutions?', 'هل تشترط أنظمة التقسيم أو أكواد البناء أو معايير المساحات الخضراء الحلول القائمة على الطبيعة أو تكافئها؟'],
      what: ['Whether regulations or standards require or reward NBS and whether they are applied in practice.', 'ما إذا كانت الأنظمة أو المعايير تشترط الحلول أو تكافئها وما إذا كانت تُطبَّق عمليًا.'],
      why: ['Rules and incentives make NBS a normal part of development, not a voluntary extra.', 'تجعل القواعد والحوافز الحلول جزءًا معتادًا من التطوير وليست إضافة طوعية.'],
      consider: ['Zoning rules, building codes, green-area standards and incentives, and how often they are applied to projects.', 'قواعد التقسيم وأكواد البناء ومعايير المساحات الخضراء والحوافز، ومدى تطبيقها على المشاريع.'],
      act: {
        0: ['Review which rules or incentives could be introduced to require or reward NBS in new development.', 'مراجعة القواعد أو الحوافز التي يمكن إدخالها لاشتراط الحلول أو مكافأتها في التطوير الجديد.'],
        1: ['Clarify and apply the existing rules or incentives more consistently, and track how often they are applied.', 'توضيح القواعد أو الحوافز القائمة وتطبيقها باتساق أكبر ومتابعة مدى تطبيقها.']
      },
      ev: ['Zoning regulations, building codes, green-area standards and examples of their application.', 'أنظمة التقسيم وأكواد البناء ومعايير المساحات الخضراء وأمثلة على تطبيقها.']
    },
    '2.3': {
      q: ['Are there measurable targets for nature-based solutions, and is progress reported regularly?', 'هل توجد أهداف قابلة للقياس للحلول القائمة على الطبيعة، وهل يُبلَّغ عن التقدم بانتظام؟'],
      what: ['Whether measurable NBS targets exist and progress is reported on a regular schedule.', 'ما إذا كانت هناك أهداف قابلة للقياس للحلول وما إذا كان التقدم يُبلَّغ عنه وفق جدول منتظم.'],
      why: ['Measurable targets and regular reporting show whether NBS are progressing and allow plans to be corrected.', 'تبيّن الأهداف القابلة للقياس والإبلاغ المنتظم ما إذا كانت الحلول تتقدم، وتتيح تصحيح الخطط.'],
      consider: ['Existing targets, how they are measured, and how often progress is reported and to whom.', 'الأهداف القائمة وكيفية قياسها، ومدى تكرار الإبلاغ عن التقدم وإلى من.'],
      act: {
        0: ['Define a small set of measurable NBS targets, for example area, number or condition of solutions, with a baseline year.', 'تحديد مجموعة صغيرة من الأهداف القابلة للقياس للحلول، مثل المساحة أو العدد أو الحالة، مع سنة أساس.'],
        1: ['Make the existing targets measurable and set a regular schedule for reporting progress.', 'جعل الأهداف القائمة قابلة للقياس ووضع جدول منتظم للإبلاغ عن التقدم.']
      },
      ev: ['Target statements, monitoring indicators and progress reports.', 'نصوص الأهداف ومؤشرات الرصد وتقارير التقدم.']
    },
    '3.1': {
      q: ['Is a unit or named staff member responsible for nature-based solutions across departments?', 'هل توجد وحدة أو موظفون محددون مسؤولون عن الحلول القائمة على الطبيعة عبر الإدارات؟'],
      what: ['Whether responsibility for NBS is assigned to a unit or named staff who work across departments.', 'ما إذا كانت مسؤولية الحلول مسندة إلى وحدة أو موظفين محددين يعملون عبر الإدارات.'],
      why: ['Clear responsibility keeps NBS on the agenda and avoids tasks falling between departments.', 'تُبقي المسؤولية الواضحة الحلول على جدول الأعمال وتمنع ضياع المهام بين الإدارات.'],
      consider: ['Who handles NBS today, how much of their time it takes and whether their role reaches beyond one department.', 'من يتولى الحلول اليوم، وكم من وقته يستغرق ذلك، وهل يتجاوز دوره إدارة واحدة.'],
      act: {
        0: ['Assign named responsibility for NBS, for example a focal point or a small cross-department team.', 'إسناد مسؤولية محددة للحلول، مثل منسق أو فريق صغير يعمل عبر الإدارات.'],
        1: ['Formalise the role and extend its mandate across departments.', 'تثبيت الدور رسميًا وتوسيع صلاحياته عبر الإدارات.']
      },
      ev: ['Organisation charts, job descriptions or a decision naming the responsible unit.', 'الهياكل التنظيمية أو الأوصاف الوظيفية أو قرار يحدد الوحدة المسؤولة.']
    },
    '3.2': {
      q: ['Can staff or contractors design, build and manage nature-based solutions, and is guidance available?', 'هل يستطيع الموظفون أو المقاولون تصميم الحلول القائمة على الطبيعة وإنشاءها وإدارتها، وهل تتوفر أدلة إرشادية؟'],
      what: ['Whether staff or contractors have the skills to design, build and manage NBS, and whether guidance documents exist.', 'ما إذا كان لدى الموظفين أو المقاولين المهارات اللازمة لتصميم الحلول وإنشائها وإدارتها، وما إذا كانت توجد أدلة إرشادية.'],
      why: ['Technical know-how decides whether NBS are built well and kept working over time.', 'تحدد الخبرة الفنية ما إذا كانت الحلول تُنشأ جيدًا وتستمر في العمل مع الوقت.'],
      consider: ['Which NBS types the team has delivered, available design guidance and any reliance on outside support.', 'أنواع الحلول التي نفذها الفريق، والأدلة الإرشادية المتاحة، وأي اعتماد على دعم خارجي.'],
      act: {
        0: ['Plan training or technical partnerships, and adopt design and maintenance guidance for the NBS types of interest.', 'التخطيط لتدريب أو شراكات فنية، واعتماد أدلة تصميم وصيانة لأنواع الحلول المطلوبة.'],
        1: ['Extend skills and guidance to further NBS types and reduce reliance on outside support.', 'توسيع المهارات والأدلة لتشمل أنواعًا أخرى من الحلول وتقليل الاعتماد على الدعم الخارجي.']
      },
      ev: ['Examples of delivered projects, guidance documents and staff or contractor qualifications.', 'أمثلة على مشاريع منفذة، وأدلة إرشادية، ومؤهلات الموظفين أو المقاولين.']
    },
    '3.3': {
      q: ['Are climate, land-use and NBS data available and used in decisions?', 'هل بيانات المناخ واستخدام الأراضي والحلول متاحة وتُستخدم في القرار؟'],
      what: ['Whether climate, land-use and NBS data exist, are current and are used in decisions and monitoring.', 'ما إذا كانت بيانات المناخ واستخدام الأراضي والحلول موجودة وحديثة وتُستخدم في القرارات والرصد.'],
      why: ['Data are needed to place NBS where they help most and to check whether they work.', 'البيانات لازمة لوضع الحلول حيث تفيد أكثر والتحقق من أنها تعمل.'],
      consider: ['Available datasets, their date and coverage, and whether decision-makers use them.', 'مجموعات البيانات المتاحة وتاريخها وتغطيتها، وهل يستخدمها صانعو القرار.'],
      act: {
        0: ['Identify the key datasets needed, for example temperature, flood exposure, land use and NBS locations, and who can provide them.', 'تحديد مجموعات البيانات الرئيسية اللازمة، مثل الحرارة والتعرض للفيضانات واستخدام الأراضي ومواقع الحلول، ومن يمكنه توفيرها.'],
        1: ['Complete and update the datasets and agree how they feed into decisions and monitoring.', 'استكمال مجموعات البيانات وتحديثها والاتفاق على كيفية استخدامها في القرارات والرصد.']
      },
      ev: ['Dataset lists, data-sharing agreements and examples of data used in decisions.', 'قوائم مجموعات البيانات واتفاقيات تبادل البيانات وأمثلة على بيانات استُخدمت في القرارات.']
    },
    '4.1': {
      q: ['Do residents help set priorities or design nature-based solutions?', 'هل يشارك السكان في تحديد أولويات الحلول القائمة على الطبيعة أو تصميمها؟'],
      what: ['How early and how strongly residents take part in planning or designing NBS, beyond commenting at the end.', 'مدى مبكرة مشاركة السكان وقوتها في تخطيط الحلول أو تصميمها، وليس فقط التعليق في النهاية.'],
      why: ['Early participation improves fit with local needs and support for upkeep.', 'تحسّن المشاركة المبكرة الملاءمة للاحتياجات المحلية والدعم لأعمال الصيانة.'],
      consider: ['Recent NBS projects, when residents were involved, and which groups took part.', 'مشاريع الحلول الأخيرة، ومتى شارك السكان، وأي الفئات شاركت.'],
      act: {
        0: ['Introduce a participation step, such as workshops, in the early stage of NBS planning.', 'إدخال خطوة مشاركة، مثل ورش العمل، في المرحلة المبكرة لتخطيط الحلول.'],
        1: ['Move participation to an earlier stage so residents can influence priorities and design.', 'نقل المشاركة إلى مرحلة أبكر ليتمكن السكان من التأثير في الأولويات والتصميم.']
      },
      ev: ['Workshop or consultation records, and records of how input changed decisions.', 'سجلات ورش العمل أو المشاورات، وسجلات كيف غيّرت المساهمات القرارات.']
    },
    '4.2': {
      q: ['Do departments, utilities, NGOs and private owners coordinate on nature-based solutions?', 'هل تنسق الإدارات والمرافق والمنظمات غير الحكومية والملاك الخواص بشأن الحلول القائمة على الطبيعة؟'],
      what: ['Whether departments, utilities, NGOs and private owners coordinate NBS actions, and whether this happens through a regular mechanism.', 'ما إذا كانت الإدارات والمرافق والمنظمات غير الحكومية والملاك الخواص ينسقون إجراءات الحلول، وهل يتم ذلك عبر آلية منتظمة.'],
      why: ['Many NBS depend on land, assets or budgets held by different actors.', 'تعتمد كثير من الحلول على أراضٍ أو أصول أو ميزانيات يملكها فاعلون مختلفون.'],
      consider: ['Which actors own land or assets relevant to NBS and how they currently coordinate.', 'من يملك الأراضي أو الأصول ذات الصلة بالحلول وكيف ينسقون حاليًا.'],
      act: {
        0: ['Identify the relevant actors and set up a first coordination contact, for example a joint meeting.', 'تحديد الفاعلين المعنيين وبدء أول تواصل للتنسيق، مثل اجتماع مشترك.'],
        1: ['Turn case-by-case coordination into a regular mechanism, such as a standing working group.', 'تحويل التنسيق الذي يتم حالة بحالة إلى آلية منتظمة، مثل مجموعة عمل دائمة.']
      },
      ev: ['Meeting records, agreements between actors or a working-group mandate.', 'محاضر الاجتماعات أو الاتفاقيات بين الفاعلين أو تفويض مجموعة العمل.']
    },
    '5.1': {
      q: ['Is funding for building the planned nature-based solutions secured or realistically available?', 'هل التمويل اللازم لإنشاء الحلول القائمة على الطبيعة المخططة مضمون أو متاح بصورة واقعية؟'],
      what: ['Whether capital funding for building the planned NBS is secured or realistically available.', 'ما إذا كان تمويل رأس المال لإنشاء الحلول المخططة مضمونًا أو متاحًا بصورة واقعية.'],
      why: ['Without capital funding, planned NBS stay on paper.', 'من دون تمويل رأس المال تبقى الحلول المخططة على الورق.'],
      consider: ['Budget lines, grants and pledged funds, and how much of the planned cost they cover.', 'بنود الميزانية والمنح والأموال الملتزم بها، ومقدار ما تغطيه من الكلفة المخططة.'],
      act: {
        0: ['Identify funding sources, such as municipal budgets, national programmes or international grants, and prepare an application plan.', 'تحديد مصادر التمويل، مثل ميزانيات البلدية والبرامج الوطنية والمنح الدولية، وإعداد خطة للتقدم بطلبات.'],
        1: ['Close the funding gap for the planned NBS by securing additional sources or phasing the works.', 'سد فجوة التمويل للحلول المخططة بتأمين مصادر إضافية أو بتنفيذ الأعمال على مراحل.']
      },
      ev: ['Budget documents, grant agreements and funding commitments.', 'وثائق الميزانية واتفاقيات المنح والالتزامات التمويلية.']
    },
    '5.2': {
      q: ['Does a long-term budget cover the upkeep, watering and replacement of nature-based solutions?', 'هل تغطي ميزانية طويلة الأجل صيانة الحلول القائمة على الطبيعة وريّها واستبدالها؟'],
      what: ['Whether a long-term budget exists for upkeep, watering and replacement.', 'ما إذا كانت توجد ميزانية طويلة الأجل للصيانة والري والاستبدال.'],
      why: ['NBS need continuing care. Without it they can fail within a few years.', 'تحتاج الحلول إلى رعاية مستمرة، ومن دونها قد تفشل خلال سنوات قليلة.'],
      consider: ['Annual maintenance budgets, who is responsible for each task and for how many years funding is committed.', 'ميزانيات الصيانة السنوية، ومن يتولى كل مهمة، وعدد السنوات الملتزم بتمويلها.'],
      act: {
        0: ['Prepare an operation and maintenance budget and clarify who is responsible for funding it.', 'إعداد ميزانية للتشغيل والصيانة وتوضيح الجهة المسؤولة عن تمويلها.'],
        1: ['Extend the maintenance budget to a long-term commitment that covers watering and replacement.', 'تمديد ميزانية الصيانة إلى التزام طويل الأجل يغطي الري والاستبدال.']
      },
      ev: ['Maintenance plans, annual budget lines and financial documentation.', 'خطط الصيانة وبنود الميزانية السنوية والوثائق المالية.']
    },
    '5.3': {
      q: ['Are the co-benefits of nature-based solutions measured or valued and counted in funding decisions?', 'هل تُقاس الفوائد المشتركة للحلول القائمة على الطبيعة أو تُقدَّر وتُحتسب في قرارات التمويل؟'],
      what: ['Whether benefits such as cooling, health and flood protection are measured or valued and used in funding decisions.', 'ما إذا كانت فوائد مثل التبريد والصحة والحماية من الفيضانات تُقاس أو تُقدَّر وتُستخدم في قرارات التمويل.'],
      why: ['Counting co-benefits can strengthen the case for funding NBS compared with grey alternatives.', 'قد يقوّي احتساب الفوائد المشتركة حجة تمويل الحلول مقارنة بالبدائل الرمادية.'],
      consider: ['Whether business cases or funding proposals mention co-benefits and whether any are quantified or valued.', 'هل تذكر دراسات الجدوى أو مقترحات التمويل الفوائد المشتركة، وهل جرى قياس بعضها أو تقديره.'],
      act: {
        0: ['Include a short co-benefit description in funding proposals and business cases.', 'إدراج وصف موجز للفوائد المشتركة في مقترحات التمويل ودراسات الجدوى.'],
        1: ['Measure or value the main co-benefits and use them in funding decisions.', 'قياس الفوائد المشتركة الرئيسية أو تقديرها واستخدامها في قرارات التمويل.']
      },
      ev: ['Funding proposals, business cases and any co-benefit studies.', 'مقترحات التمويل ودراسات الجدوى وأي دراسات للفوائد المشتركة.']
    }
  };
})();
