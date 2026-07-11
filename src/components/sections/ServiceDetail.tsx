import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, FileText, Landmark, Users, TrendingUp, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { TranslationSchema } from '../../translations';

interface ServiceDetailProps {
  serviceId: 'business-development' | 'market-entry' | 'partnerships' | 'marketing-sales';
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
  formData: {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
  };
  formSubmitted: boolean;
  setFormSubmitted: (val: boolean) => void;
  isSubmitting: boolean;
  submitError: string | null;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  submitContactForm: (e: React.FormEvent) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  serviceId,
  lang,
  currentTrans,
  formData,
  formSubmitted,
  setFormSubmitted,
  isSubmitting,
  submitError,
  handleFormChange,
  submitContactForm,
}) => {
  const isAr = lang === 'ar';

  const details = {
    'business-development': {
      title: isAr ? 'تطوير الأعمال في السعودية' : 'Business Development in Saudi Arabia',
      subtitle: isAr ? 'هندسة نماذج النمو التجاري المستدام' : 'Engineering Models for Sustainable Commercial Growth',
      heroDesc: isAr 
        ? 'نصمم نماذج أعمال مرنة ونحدد مسارات واعدة للشركات والمؤسسات الطامحة للنمو والتوسع في بيئة الاستثمار السعودية.' 
        : 'Designing resilient business models and identifying promising pathways for companies seeking growth and expansion in the Saudi investment landscape.',
      whatIs: isAr
        ? 'خدمة تطوير الأعمال من نيكست هوم هي عملية متكاملة تهدف إلى صياغة وتطوير استراتيجيات التوسع التجاري. نحن لا نقدم توصيات نظرية، بل نعمل على تحويل الإمكانات التجارية إلى خطط تشغيلية قابلة للتنفيذ المباشر، وتصميم نماذج الأعمال التي تضمن الفاعلية واستدامة الأرباح.'
        : 'NEXT HOME’s business development service is an integrated process designed to formulate and expand commercial strategies. Rather than offering abstract advisory, we transform commercial potential into executable operational blueprints, structuring business models that secure long-term efficiency and profitability.',
      whoFor: isAr
        ? 'للشركات السعودية التي تتطلع لتطوير عملياتها وهيكلتها التجارية، والشركات الأجنبية التي تبحث عن نموذج تشغيلي موثوق يضمن أعلى كفاءة داخل السوق السعودي.'
        : 'For Saudi enterprises aiming to scale their commercial structures, and international organizations seeking a high-efficiency operational model to excel inside the Saudi market.',
      problems: [
        isAr ? 'جمود خطط النمو وعدم مواءمتها مع ديناميكية السوق المحلي.' : 'Stagnating growth initiatives failing to keep pace with local market dynamics.',
        isAr ? 'ضعف الربط بين الفرص المتاحة والقدرة التشغيلية الفعلية للشركة.' : 'Misalignment between available opportunities and actual operational capabilities.',
        isAr ? 'الحاجة إلى هندسة شراكات وتطوير نماذج عمل مرنة لمواجهة التنافسية.' : 'The critical need to structure alliances and design agile, highly competitive business models.',
      ],
      process: [
        { title: isAr ? 'استكشاف القدرات والفرص' : 'Discovery & Capability Audit', desc: isAr ? 'تحليل شامل للنموذج الحالي للشركة وتقييم جاهزيته للنمو وتحديد الفجوات.' : 'Conducting a thorough evaluation of current operations, identifying growth gaps, and auditing readiness.' },
        { title: isAr ? 'هندسة خطة النمو' : 'Roadmap Engineering', desc: isAr ? 'صياغة نموذج عمل مخصص يحدد قنوات التدفق والقيمة المضافة ومؤشرات الأداء.' : 'Formulating a tailored operational blueprint that outlines distribution, value propositions, and KPIs.' },
        { title: isAr ? 'التفعيل وبناء المسارات' : 'Activation & Execution', desc: isAr ? 'تمهيد الطرق وبناء العلاقات التشغيلية المناسبة للبدء الفعلي في التوسع.' : 'Facilitating commercial routes and building the operational relationships required to start scaling.' },
      ],
      outcomes: [
        isAr ? 'هيكلة تجارية متكاملة وواضحة تحدد مسارات الأرباح ومصادر النمو بدقة.' : 'A clear, structured commercial architecture that precisely maps revenue channels and growth areas.',
        isAr ? 'نماذج عمل مرنة متوافقة مع متطلبات قطاع الأعمال السعودي.' : 'Agile business models fully aligned with Saudi commercial regulatory guidelines.',
        isAr ? 'استعداد تشغيلي كامل لبدء تفعيل الشراكات والتحالفات الاستراتيجية.' : 'Complete operational readiness to launch high-value partnerships and corporate alliances.',
      ],
      whyLocal: isAr
        ? 'بيئة الأعمال السعودية تمر بتحول اقتصادي وتنظيمي متسارع تحت مظلة رؤية 2030. التطوير الناجح يتطلب معرفة باللوائح المستجدة، وفهماً دقيقاً لآليات المنافسة والعلاقات التجارية الموثوقة.'
        : 'The Saudi business ecosystem is undergoing rapid regulatory transformation driven by Vision 2030. Successful development demands absolute compliance with emerging frameworks, deep competitive intelligence, and high-trust local connections.',
      faqs: [
        { q: isAr ? 'ما هي القطاعات التي تركزون عليها؟' : 'Which sectors do you focus on?', a: isAr ? 'نعمل في قطاعات متعددة تشمل الخدمات التجارية والتقنية، والتطوير المؤسسي، وندعم العلامات الكبرى والشركات الساعية للتوسع.' : 'We operate across multiple corporate, tech, and service sectors, supporting major brands and high-growth enterprises.' },
        { q: isAr ? 'هل تقدمون ضمانات لنسب الأرباح؟' : 'Do you guarantee profit margins?', a: isAr ? 'نحن نلتزم بأعلى معايير جودة العمل ونعمل على تمهيد أسباب النجاح التجاري وبناء أسس قوية للنمو، ولكننا لا نطلق وعوداً أو ضمانات مالية مطلقة كون ذلك يعتمد على متغيرات السوق وتنفيذ الشركات.' : 'We deliver the highest standards of execution to build a robust growth foundation, but we do not guarantee absolute financial margins as business success depends on diverse market dynamics and company execution.' },
      ]
    },
    'market-entry': {
      title: isAr ? 'دخول السوق السعودي وتطوير التوسع' : 'Saudi Market Entry Consulting',
      subtitle: isAr ? 'بوابة العبور الآمنة للمملكة العربية السعودية' : 'The Secure Gateway to Launching Operations in Saudi Arabia',
      heroDesc: isAr
        ? 'نرافق الكيانات الاستثمارية والعلامات التجارية الكبرى في رحلة تأسيس وتوطين أعمالها في المملكة بكفاءة تنظيمية وتشغيلية.'
        : 'Guiding global enterprises and major brands through compliant, highly optimized corporate setup and localization inside the Kingdom.',
      whatIs: isAr
        ? 'تمثل خدمة دخول السوق السعودي دليلاً متكاملاً للمستثمرين والشركات الأجنبية. تشمل الخدمة تحليل بيئة الاستثمار، وتوجيه العلاقات التنظيمية مع وزارة الاستثمار (MISA)، وملاءمة السمعة والمنتج لثقافة الاستهلاك المحلية لضمان بداية قوية ومستدامة.'
        : 'Our Saudi Market Entry service serves as an end-to-end framework for global businesses. It includes detailed investment climate analyses, regulatory navigation with the Ministry of Investment (MISA), and strategic product localization to establish local relevance and authority from day one.',
      whoFor: isAr
        ? 'للشركات العالمية، والعلامات التجارية الرائدة، والمستثمرين الخارجيين الساعيين لامتلاك حصة سوقية قوية في واحدة من أسرع دول العالم نمواً.'
        : 'For international corporations, leading brands, and sovereign or private investors aiming to secure a dominant position in one of the world’s fastest-growing economies.',
      problems: [
        isAr ? 'عقبات فهم المتطلبات التنظيمية وإجراءات التراخيص المحلية.' : 'Friction in understanding complex licensing procedures and regional regulatory structures.',
        isAr ? 'غياب الفهم العميق لثقافة وسلوك المستهلك السعودي وبيئة الأعمال.' : 'Lack of deep insight into Saudi consumer behavior and domestic corporate culture.',
        isAr ? 'صعوبة العثور على القنوات وشبكات التوزيع والشركاء المحليين الموثوقين.' : 'High difficulty in identifying and establishing distribution networks and trusted local entities.',
      ],
      process: [
        { title: isAr ? 'التخطيط والملاءمة' : 'Localization & Feasibility', desc: isAr ? 'دراسة ملاءمة المنتج لثقافة السوق المحلي وتحديد الهيكل القانوني الأنسب لشركتكم.' : 'Evaluating product-market fit and determining the optimal legal framework for your corporate entity.' },
        { title: isAr ? 'التوجيه والتسجيل التنظيمي' : 'Regulatory Routing', desc: isAr ? 'تسهيل التواصل والتعامل مع الجهات المعنية لتوفير تراخيص وزارة الاستثمار والجهات الأخرى.' : 'Navigating official licensing procedures through the Ministry of Investment and supporting bodies.' },
        { title: isAr ? 'تمهيد القنوات وإطلاق الأعمال' : 'Channel Pairing & Launch', desc: isAr ? 'الربط المباشر مع شبكات وموزعين محليين لضمان تدفق مرن وبداية مستقرة للأعمال.' : 'Connecting you with credible channel networks and distributors to secure rapid commercial flow.' },
      ],
      outcomes: [
        isAr ? 'تأسيس متوافق بالكامل وقانوني يحمي استثمارات الشركة في المملكة.' : 'A fully compliant corporate foundation that protects your investment within Saudi Arabia.',
        isAr ? 'علامة تجارية مهيأة ولغة بصرية ورسائل تسويقية تخاطب المستهلك السعودي بفاعلية.' : 'A localized brand identity and marketing dialogue that resonates directly with Saudi audiences.',
        isAr ? 'قنوات تواصل مباشرة لتعزيز الانتشار وبناء الموثوقية لدى الشركاء والعملاء.' : 'Direct access to strategic channels that drive brand awareness and stakeholder credibility.',
      ],
      whyLocal: isAr
        ? 'الدخول المباشر دون مستشار محلي موثوق يعرض الكيانات لتأخيرات إدارية، وتكلفة تشغيلية مضاعفة، وتحديات في كسب الثقة المحلية. نيكست هوم تمثل الشريك المحلي الذي يقدم المعرفة التنظيمية والشبكة التجارية.'
        : 'Attempting direct entry without domestic advisory often leads to administrative bottlenecks, high overhead costs, and lack of initial credibility. NEXT HOME serves as your experienced guide, delivering key regulatory intelligence and verified networks.',
      faqs: [
        { q: isAr ? 'هل تساعدون في الحصول على تراخيص وزارة الاستثمار (MISA)؟' : 'Do you assist with MISA licensing?', a: isAr ? 'نعم، نحن نوجه الشركاء عبر المسارات التنظيمية الصحيحة لإصدار التراخيص وتلبية المتطلبات الحكومية بكفاءة.' : 'Yes, we provide strategic navigation through the legal and administrative channels required to secure official investment licensing.' },
        { q: isAr ? 'كم يستغرق متوسط دخول السوق السعودي؟' : 'What is the average timeline for market entry?', a: isAr ? 'تتفاوت المدة بناءً على نوع النشاط التجاري والمتطلبات الخاصة، ونعمل على تسريع العملية عبر تفادي التحديات الشائعة.' : 'Timelines vary depending on corporate complexity and sector demands. Our structured approach minimizes friction to expedite the entry process.' },
      ]
    },
    'partnerships': {
      title: isAr ? 'بناء الشراكات الاستراتيجية في السعودية' : 'Strategic Partnerships in Saudi Arabia',
      subtitle: isAr ? 'تأسيس تحالفات نخبوية تصنع القيمة التجارية' : 'Structuring Elite Alliances That Generate High Commercial Value',
      heroDesc: isAr
        ? 'نربط الكيانات الاقتصادية برواد الأعمال والمستثمرين الاستراتيجيين والجهات الفاعلة لبناء تحالفات متينة تضمن استقرار ونمو الأعمال.'
        : 'Connecting enterprise entities, institutional investors, and sovereign players to build high-trust alliances that ensure market stability and commercial scale.',
      whatIs: isAr
        ? 'تعتمد الشراكات الناجحة على التوافق التام والموثوقية العالية. نحن في نيكست هوم نقوم بتسهيل وهيكلة الشراكات والتحالفات التجارية المشتركة (JVs)، وصياغة أطر الحوكمة الفعالة التي تضمن حقوق جميع الأطراف وتطلق فرص التعاون المثمر.'
        : 'Successful alliances require absolute alignment and corporate trust. At NEXT HOME, we specialize in identifying, facilitating, and structuring joint ventures (JVs) and strategic relationships, formulating governance frameworks that protect mutual assets while unlocking major synergies.',
      whoFor: isAr
        ? 'للكيانات الطموحة التي تدرك أهمية وجود حليف استراتيجي موثوق محلياً، والمؤسسات الاستثمارية الباحثة عن فرص موثوقة ونظراء متوافقين.'
        : 'For ambitious corporate entities that recognize the leverage of a trusted local ally, and institutional investors looking for compliant, high-potential domestic counterparts.',
      problems: [
        isAr ? 'فشل التحالفات التجارية بسبب ضعف أطر التوافق وغياب الحوكمة الصحيحة.' : 'High failure rates of commercial alliances due to weak alignment and poor governance.',
        isAr ? 'صعوبة الوصول المباشر إلى صناع القرار والشخصيات التنفيذية الفاعلة.' : 'Difficulties in gaining direct access to executive stakeholders and corporate decision-makers.',
        isAr ? 'عجز الأطراف عن بناء نماذج تعاون عادلة تحقق توليداً مستداماً للقيمة.' : 'Inability of parties to design mutually equitable collaboration models that sustain value creation.',
      ],
      process: [
        { title: isAr ? 'الفحص والتوفيق المتبادل' : 'Synergy Matchmaking', desc: isAr ? 'اختيار النظراء بدقة بناءً على الملاءة التجارية والتوافق الاستراتيجي والأهداف المشتركة.' : 'Selecting and vetting counterparts based on financial alignment, corporate synergy, and shared vision.' },
        { title: isAr ? 'هيكلة التحالف والحوكمة' : 'Governance & Structuring', desc: isAr ? 'صياغة مواثيق التعاون وأطر العمل القانونية والتشغيلية وحفظ المصالح المشتركة.' : 'Drafting joint venture frameworks and active operational charters that protect mutual interests.' },
        { title: isAr ? 'تفعيل وإطلاق المبادرات' : 'Launch & Activation', desc: isAr ? 'المتابعة التنفيذية لضمان تحويل التوافقات الاستراتيجية لمخرجات ملموسة وعوائد متبادلة.' : 'Overseeing initial milestones to translate strategic synergy into measurable commercial outputs.' },
      ],
      outcomes: [
        isAr ? 'اتفاقيات شراكة قانونية وتجارية متينة تحكمها أطر حوكمة واضحة ومتوازنة.' : 'Secure, legally sound partnership agreements backed by balanced, high-fidelity governance.',
        isAr ? 'علاقات وثيقة مع أطراف وشبكات محلية تدعم الحضور التجاري للعلامة.' : 'A robust network of local allies supporting the long-term regional authority of your brand.',
        isAr ? 'إمكانات محسنة للحصول على عقود تجارية ومشاريع كبرى عبر التحالفات المشتركة.' : 'Enhanced capacity to capture major commercial contracts and scale operations via joint ventures.',
      ],
      whyLocal: isAr
        ? 'في المملكة العربية السعودية، تمثل العلاقات والثقة الشخصية والمهنية ركيزة أساسية لبيئة الأعمال. نيكست هوم تمتلك حضوراً قوياً وتأثيراً يعتمد على رصيد كبير من المصداقية وشبكة النخبة لبناء تحالفات حقيقية.'
        : 'In Saudi Arabia, commercial success is deeply relational. Personal credibility and corporate trust are indispensable. NEXT HOME brings an established reputation and a network of elite connections to form genuine, long-term alliances.',
      faqs: [
        { q: isAr ? 'كيف يتم فرز وتدقيق الشركاء المحتملين؟' : 'How do you vet potential partners?', a: isAr ? 'نتبع معايير فحص صارمة لتقييم السمعة، والقدرة المالية، والتوافق التشغيلي لتجنب أي تعارض في المستقبل.' : 'We apply rigorous vetting criteria to evaluate market reputation, financial viability, and operational alignment to prevent future conflicts.' },
        { q: isAr ? 'هل تتدخلون في الجوانب القانونية للتأسيس؟' : 'Do you handle the legal incorporation aspects?', a: isAr ? 'نصمم الإطار الاستراتيجي والتشغيلي ونعمل جنباً إلى جنب مع المستشارين القانونيين للشركاء لضمان دمج الاتفاقيات صياغةً وتطبيقاً.' : 'We design the strategic and operational frameworks, collaborating closely with legal counsel to ensure agreements are structured and executed properly.' },
      ]
    },
    'marketing-sales': {
      title: isAr ? 'تطوير التسويق والمبيعات في السعودية' : 'Marketing and Sales Development Saudi Arabia',
      subtitle: isAr ? 'تأصيل العلامات التجارية وبناء قنوات المبيعات الفعالة' : 'Localizing Brands and Building High-Yield Sales Channels',
      heroDesc: isAr
        ? 'نطور الخطط التسويقية الملائمة ونبني قنوات مبيعات متينة تصل بمنتجاتكم وخدماتكم إلى الفئة المستهدفة بأعلى معدلات التحويل.'
        : 'Developing high-impact localized marketing and building robust sales channels that connect your products and services directly to target audiences.',
      whatIs: isAr
        ? 'التسويق والمبيعات هما العصب الحيوي لأي عمل تجاري. تركز نيكست هوم على بناء التموضع الصحيح للعلامة التجارية بسوقنا، وصياغة مسارات رحلة العميل المتكاملة، وتوفير الربط الاستراتيجي مع الموزعين والشركاء لزيادة مستويات الطلب والانتشار.'
        : 'Marketing and sales are the critical engines of commercial success. NEXT HOME focuses on building precise brand positioning within our market, designing optimized customer acquisition journeys, and facilitating direct alignment with high-performance distributors.',
      whoFor: isAr
        ? 'للعلامات والشركات الراغبة في تعظيم عوائد مبيعاتها وبناء هوية محلية مرموقة وقنوات توزيع مستدامة في المملكة.'
        : 'For businesses and foreign brands seeking to maximize local sales performance, build premium brand equity, and secure sustainable regional distribution.',
      problems: [
        isAr ? 'ضعف الأداء التسويقي نتيجة استخدام حملات غير ملائمة لخصائص المستهلك المحلي.' : 'Ineffective marketing results caused by generic campaigns that ignore local consumer demographics.',
        isAr ? 'عجز الشركات عن اختراق قنوات التوزيع الكبرى والوصول لشركاء بيع حقيقيين.' : 'Inability of companies to penetrate major distribution networks and secure trusted retail relationships.',
        isAr ? 'تشتت رحلة العميل وغياب التموضع التجاري المناسب للمنتجات والخدمات.' : 'Disjointed customer journeys and unoptimized market positioning for premium products.',
      ],
      process: [
        { title: isAr ? 'تحليل السلوك والتموضع' : 'Positioning & Audience Analysis', desc: isAr ? 'دراسة سلوك المستهلك السعودي لضمان صياغة تموضع دقيق وجاذب لعلامتكم.' : 'Evaluating local audience demographics and behaviors to craft a precise, authoritative brand narrative.' },
        { title: isAr ? 'هيكلة قنوات المبيعات والتوريد' : 'Sales Channel Architecture', desc: isAr ? 'تصميم وبناء مسار المبيعات وتأمين روابط الربط مع قنوات التوزيع والبيع الموثوقة.' : 'Designing the sales funnel and establishing secure connections with premium retail and distribution channels.' },
        { title: isAr ? 'القياس والتطوير المستمر' : 'Performance Analytics', desc: isAr ? 'مراقبة الاستجابة وتقديم التوصيات التطويرية لزيادة كفاءة الإطلاق ومعدلات التحويل.' : 'Monitoring response metrics and delivering strategic optimizations to boost customer conversion and brand yield.' },
      ],
      outcomes: [
        isAr ? 'قنوات توزيع مبيعات مجهزة وشبكة توزيع نشطة للوصول الفعلي للعملاء.' : 'An active distribution structure and optimized sales channels that drive real customer acquisition.',
        isAr ? 'هوية محلية للعلامة وصوت تجاري يتلاءم بذكاء مع ثقافة الاستهلاك المحلية.' : 'A localized brand voice and corporate positioning that aligns with local Saudi customs.',
        isAr ? 'خطط تسويقية مبنية على بيانات واقعية ومحركات نمو مرنة تضمن الانتشار والوعي.' : 'Data-driven marketing blueprints and agile growth engines that build long-term brand equity.',
      ],
      whyLocal: isAr
        ? 'المستهلك السعودي ديناميكي، ومتصل تقنياً بشكل واسع، ويمتلك خيارات متعددة. الاستراتيجيات العامة تفشل لأنها تفتقر للغة، والأصالة، والقنوات التي يثق بها عملاؤنا. نيكست هوم تمنحكم ميزة الأصالة والذكاء التسويقي المحلي.'
        : 'The Saudi consumer is highly dynamic, digitally advanced, and has extensive choices. Standard marketing blueprints fail because they lack the cultural nuance, language authenticity, and trusted channels. NEXT HOME provides you with domestic marketing intelligence.',
      faqs: [
        { q: isAr ? 'هل تقومون بإدارة الحملات الإعلانية اليومية؟' : 'Do you manage daily marketing operations?', a: isAr ? 'نحن نطور الرؤية الاستراتيجية، والتموضع، والربط التجاري بالقنوات، ونشرف على مواءمة التنفيذ لضمان التميز.' : 'We engineer the overarching strategy, brand positioning, and channel alignment, supervising execution quality to ensure commercial excellence.' },
        { q: isAr ? 'كيف يتم ربطنا بالموزعين المحليين؟' : 'How do you connect us with local distributors?', a: isAr ? 'من خلال شبكة علاقاتنا، نقوم بترشيح الموزعين الأنسب لقطاعكم وتيسير اللقاءات التنفيذية وهيكلة صفقات التوريد.' : 'Leveraging our corporate network, we identify the most compatible distributors for your sector, facilitate meetings, and structure distribution terms.' },
      ]
    },
  };

  const service = details[serviceId];

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-16 sm:pb-24 overflow-hidden" id={`service-detail-container-${serviceId}`}>
      {/* 1. Hero Header */}
      <section className="relative bg-[#EEF4F0] border-b border-[#DCE5E0]/50 py-16 sm:py-24 overflow-hidden" id="service-detail-hero">
        {/* Ambient grid background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#07583f05_1px,transparent_1px),linear-gradient(to_bottom,#07583f05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <a 
              href={isAr ? '/' : '/en/'}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-saudi hover:text-saudi-dark transition-colors"
              id="back-home-link"
            >
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </a>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DCE5E0] text-saudi text-xs font-bold rounded-lg uppercase tracking-wider shadow-xs" id="service-hero-badge">
              <span>{isAr ? 'مساحة الخدمة المتخصصة' : 'Specialized Service Area'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight font-extrabold leading-tight" id="service-hero-title">
              {service.title}
            </h1>
            
            <p className="text-saudi text-lg sm:text-xl font-bold tracking-tight" id="service-hero-subtitle">
              {service.subtitle}
            </p>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-normal max-w-2xl" id="service-hero-desc">
              {service.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Page Content Structure */}
      <section className="py-16 sm:py-24" id="service-detail-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
            
            {/* Left/Right Main Content Column */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-16" id="service-main-col">
              
              {/* what is it & who for */}
              <div className="space-y-8" id="section-service-definition">
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary flex items-center gap-2" id="def-title">
                    <FileText className="w-5.5 h-5.5 text-saudi shrink-0" />
                    <span>{isAr ? 'تعريف بالخدمة وأهميتها' : 'Service Overview & Definition'}</span>
                  </h2>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal" id="def-desc">
                    {service.whatIs}
                  </p>
                </div>

                <div className="p-6 sm:p-8 bg-[#EEF4F0]/40 border border-[#DCE5E0]/60 rounded-2xl space-y-4" id="section-who-for">
                  <h3 className="text-lg font-bold text-text-primary flex items-center gap-2" id="whofor-title">
                    <Users className="w-5 h-5 text-saudi shrink-0" />
                    <span>{isAr ? 'لمن تقدم هذه الخدمة؟' : 'Who is this service for?'}</span>
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal" id="whofor-desc">
                    {service.whoFor}
                  </p>
                </div>
              </div>

              {/* business problems addressed */}
              <div className="space-y-6" id="section-problems-solved">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary flex items-center gap-2" id="problems-title">
                  <AlertCircle className="w-5.5 h-5.5 text-saudi shrink-0" />
                  <span>{isAr ? 'التحديات والمشكلات التي نعالجها' : 'Business Challenges We Address'}</span>
                </h2>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal" id="problems-intro">
                  {isAr 
                    ? 'غالباً ما يواجه أصحاب الأعمال والشركات عقبات تعيق نموهم الطبيعي داخل السوق السعودي. نحن نستهدف هذه الفجوات بشكل عملي وحاسم:' 
                    : 'Businesses frequently encounter critical friction points that hinder normal growth or launch inside the Saudi market. We actively target and resolve these gaps:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4" id="problems-list">
                  {service.problems.map((problem, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-[#DCE5E0] rounded-xl shadow-xs" id={`problem-item-${idx}`}>
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse" />
                      <span className="text-sm text-text-primary font-semibold leading-relaxed">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* our methodology & process */}
              <div className="space-y-6" id="section-methodology">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary flex items-center gap-2" id="method-title">
                  <TrendingUp className="w-5.5 h-5.5 text-saudi shrink-0" />
                  <span>{isAr ? 'منهجية العمل والخطوات التنفيذية' : 'Our Process & Execution Methodology'}</span>
                </h2>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal" id="method-intro">
                  {isAr
                    ? 'نطبق منهجية دقيقة مبنية على الحقائق وشبكة النخبة لضمان انتقال آمن وسلس من التخطيط إلى مخرجات السوق:'
                    : 'We apply a factual, highly integrated process designed to transition operations from theoretical planning to real-world market presence:'}
                </p>
                <div className="relative border-l-2 border-[#DCE5E0] pl-6 ml-3 space-y-8" id="method-timeline">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="relative" id={`method-step-${idx}`}>
                      {/* Timeline dot */}
                      <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-saudi border-2 border-white flex items-center justify-center shadow-xs" />
                      
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-saudi uppercase tracking-wider">
                          {isAr ? `الخطوة ${idx + 1}` : `Step 0${idx + 1}`}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-text-primary leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* expected business outcomes (no guarantee statement) */}
              <div className="space-y-6" id="section-expected-outcomes">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary flex items-center gap-2" id="outcomes-title">
                  <ShieldCheck className="w-5.5 h-5.5 text-saudi shrink-0" />
                  <span>{isAr ? 'المخرجات والنتائج التجارية المتوقعة' : 'Expected Commercial Outcomes'}</span>
                </h2>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal" id="outcomes-intro">
                  {isAr
                    ? 'نهدف من خلال برامج التنمية والربط التشغيلي إلى بناء أصول تجارية مستدامة لشركتكم. نذكر هنا المخرجات المتوقعة في الظروف الطبيعية دون وعود مالية تعاقدية:'
                    : 'Through structured development and elite channel alignment, we aim to establish sustainable assets for your business. Outlined below are expected outcomes under standard operating conditions (without guarantees):'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4" id="outcomes-grid">
                  {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#EEF4F0]/30 border border-saudi/15 rounded-xl shadow-xs" id={`outcome-item-${idx}`}>
                      <CheckCircle2 className="w-5 h-5 text-saudi shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary font-semibold leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* why saudi market requires local advisory */}
              <div className="p-6 sm:p-10 bg-[#151B18] text-white rounded-2xl relative overflow-hidden" id="section-saudi-realities">
                <div className="absolute top-0 right-0 w-32 h-32 bg-saudi/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#E7C794] flex items-center gap-2" id="reality-title">
                    <Landmark className="w-5 h-5 text-[#E7C794] shrink-0" />
                    <span>{isAr ? 'واقع السوق السعودي وضرورة الشريك المحلي' : 'Saudi Market Realities & Local Guidance'}</span>
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal" id="reality-desc">
                    {service.whyLocal}
                  </p>
                </div>
              </div>

              {/* related services links */}
              <div className="space-y-4 pt-4 border-t border-[#DCE5E0]" id="section-related-services">
                <h3 className="text-base sm:text-lg font-bold text-text-primary" id="related-title">
                  {isAr ? 'خدمات ذات صلة بنا بمجال التوسع:' : 'Related Strategic Services:'}
                </h3>
                <div className="flex flex-wrap gap-3" id="related-links-box">
                  {serviceId !== 'business-development' && (
                    <a 
                      href={isAr ? '/services/business-development-saudi-arabia' : '/en/services/business-development-saudi-arabia'}
                      className="text-xs font-semibold px-4 py-2 bg-[#EEF4F0] text-saudi border border-[#DCE5E0] hover:bg-saudi hover:text-white rounded-lg transition-all"
                    >
                      {isAr ? 'تطوير الأعمال في السعودية' : 'Business Development'}
                    </a>
                  )}
                  {serviceId !== 'market-entry' && (
                    <a 
                      href={isAr ? '/services/saudi-market-entry' : '/en/services/saudi-market-entry'}
                      className="text-xs font-semibold px-4 py-2 bg-[#EEF4F0] text-saudi border border-[#DCE5E0] hover:bg-saudi hover:text-white rounded-lg transition-all"
                    >
                      {isAr ? 'دخول السوق السعودي' : 'Saudi Market Entry'}
                    </a>
                  )}
                  {serviceId !== 'partnerships' && (
                    <a 
                      href={isAr ? '/services/strategic-partnerships' : '/en/services/strategic-partnerships'}
                      className="text-xs font-semibold px-4 py-2 bg-[#EEF4F0] text-saudi border border-[#DCE5E0] hover:bg-saudi hover:text-white rounded-lg transition-all"
                    >
                      {isAr ? 'بناء الشراكات الاستراتيجية' : 'Strategic Partnerships'}
                    </a>
                  )}
                  {serviceId !== 'marketing-sales' && (
                    <a 
                      href={isAr ? '/services/marketing-sales-development' : '/en/services/marketing-sales-development'}
                      className="text-xs font-semibold px-4 py-2 bg-[#EEF4F0] text-saudi border border-[#DCE5E0] hover:bg-saudi hover:text-white rounded-lg transition-all"
                    >
                      {isAr ? 'تطوير التسويق والمبيعات' : 'Marketing & Sales Development'}
                    </a>
                  )}
                </div>
              </div>

              {/* Service FAQs */}
              <div className="space-y-6 pt-6 border-t border-[#DCE5E0]" id="section-service-faqs">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2" id="faq-title">
                  <MessageSquare className="w-5.5 h-5.5 text-saudi shrink-0" />
                  <span>{isAr ? 'الأسئلة الشائعة حول الخدمة' : 'Frequently Asked Questions'}</span>
                </h3>
                <div className="space-y-4" id="faq-list">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-5 bg-bg-alt border border-[#DCE5E0] rounded-xl space-y-2" id={`faq-item-${idx}`}>
                      <h4 className="text-sm sm:text-base font-bold text-text-primary" id={`faq-q-${idx}`}>
                        {faq.q}
                      </h4>
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed" id={`faq-a-${idx}`}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Column: Consultation Call to Action Form */}
            <div className="lg:col-span-4" id="service-sidebar-col">
              <div className="sticky top-[120px] bg-white border border-[#DCE5E0] p-6 sm:p-8 rounded-2xl shadow-md space-y-6" id="service-consultation-widget">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#EEF4F0] text-saudi text-[11px] font-bold rounded-md uppercase" id="widget-badge">
                    <Sparkles className="w-3 h-3 text-saudi animate-pulse" />
                    <span>{isAr ? 'طلب استشارة تجارية' : 'Inquire Advisory'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-snug" id="widget-title">
                    {isAr ? 'تواصل معنا للحصول على مناقشة استراتيجية' : 'Initiate an Executive Dialogue'}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed" id="widget-desc">
                    {isAr 
                      ? 'أرسل بيانات شركتك وسيقوم المستشار المختص من مكتبنا بالتواصل معك لبحث فرص ومسارات النمو المحتملة.' 
                      : 'Provide details about your partnership or business goals, and our development director will initiate a private corporate alignment review.'}
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 bg-[#EEF4F0] border border-saudi/15 rounded-xl text-center space-y-4" id="widget-success">
                    <div className="p-2 bg-saudi text-white rounded-full inline-flex items-center justify-center w-10 h-10 mx-auto" id="widget-success-icon-container">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-text-primary">{currentTrans.contact.form.successTitle}</h4>
                    <p className="text-text-secondary text-xs leading-relaxed">{currentTrans.contact.form.successMsg}</p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-bold text-saudi hover:underline cursor-pointer"
                    >
                      {currentTrans.contact.form.submitAnother}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitContactForm} className="space-y-4" id="widget-form">
                    <div className="space-y-1" id="form-field-name">
                      <label className="text-[11px] font-bold text-text-primary uppercase block">
                        {currentTrans.contact.form.fullNameRef} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        required
                        className="w-full text-xs p-3 bg-bg-alt border border-[#DCE5E0]/80 rounded-lg focus:outline-none focus:border-saudi transition-all font-semibold"
                        placeholder={currentTrans.contact.form.fullNamePlaceholder}
                      />
                    </div>

                    <div className="space-y-1" id="form-field-company">
                      <label className="text-[11px] font-bold text-text-primary uppercase block">
                        {currentTrans.contact.form.companyNameRef}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        className="w-full text-xs p-3 bg-bg-alt border border-[#DCE5E0]/80 rounded-lg focus:outline-none focus:border-saudi transition-all font-semibold"
                        placeholder={currentTrans.contact.form.companyPlaceholder}
                      />
                    </div>

                    <div className="space-y-1" id="form-field-email">
                      <label className="text-[11px] font-bold text-text-primary uppercase block">
                        {currentTrans.contact.form.emailRef} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full text-xs p-3 bg-bg-alt border border-[#DCE5E0]/80 rounded-lg focus:outline-none focus:border-saudi transition-all font-semibold"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-1" id="form-field-phone">
                      <label className="text-[11px] font-bold text-text-primary uppercase block">
                        {currentTrans.contact.form.phoneRef} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        className="w-full text-xs p-3 bg-bg-alt border border-[#DCE5E0]/80 rounded-lg focus:outline-none focus:border-saudi transition-all font-semibold"
                        placeholder={currentTrans.contact.form.phonePlaceholder}
                      />
                    </div>

                    <div className="space-y-1" id="form-field-message">
                      <label className="text-[11px] font-bold text-text-primary uppercase block">
                        {currentTrans.contact.form.messageRef} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={3}
                        className="w-full text-xs p-3 bg-bg-alt border border-[#DCE5E0]/80 rounded-lg focus:outline-none focus:border-saudi transition-all font-semibold"
                        placeholder={isAr ? 'حدثنا باختصار عن شركتكم وما تبحثون عنه...' : 'Please brief us about your organization and growth goals...'}
                      />
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-500 font-semibold" id="form-submit-error">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-xs font-bold uppercase bg-saudi hover:bg-saudi-dark text-white py-3.5 px-4 rounded-lg transition-all duration-300 shadow-md cursor-pointer disabled:opacity-55"
                      id="form-submit-button"
                    >
                      {isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Sending...') : currentTrans.contact.form.submitBtn}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
