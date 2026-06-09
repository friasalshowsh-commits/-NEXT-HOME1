export interface StatItem {
  value: string;
  label: string;
}

export interface BusinessArea {
  id: string;
  title: string;
  description: string;
}

export interface FeatureColumn {
  title: string;
  description: string;
}

export interface TranslationSchema {
  nav: {
    about: string;
    strategy: string;
    services: string;
    footprint: string;
    insights: string;
    contact: string;
    langLabel: string;
  };
  hero: {
    badge: string;
    titleLines: string[];
    paragraph: string;
    cta: string;
  };
  stats: {
    experienceVal: string;
    experienceLabel: string;
    partnersVal: string;
    partnersLabel: string;
    sectorsVal: string;
    sectorsLabel: string;
    presenceVal: string;
    presenceLabel: string;
    visionNote: string;
    visionToggleLabelOff: string;
    visionToggleLabelOn: string;
    strategicInvestmentsVal: string;
    strategicInvestmentsLabel: string;
  };
  businessAreas: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    items: BusinessArea[];
  };
  expansion: {
    sectionBadge: string;
    title: string;
    paragraph: string;
    cta: string;
    cities: {
      riyadh: string;
      riyadhSub: string;
      riyadhCountry: string;
      jeddah: string;
      jeddahSub: string;
      jeddahCountry: string;
      dammam: string;
      dammamSub: string;
      dammamCountry: string;
      khobar: string;
      khobarSub: string;
      khobarCountry: string;
    };
  };
  quote: {
    text: string;
    author: string;
  };
  whyPartner: {
    sectionBadge: string;
    title: string;
    items: FeatureColumn[];
  };
  contact: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    name: string;
    role: string;
    phone: string;
    email: string;
    location: string;
    button: string;
    form: {
      title: string;
      fullNameRef: string;
      companyNameRef: string;
      emailRef: string;
      phoneRef: string;
      messageRef: string;
      submitBtn: string;
      successMsg: string;
      errorMsg: string;
    };
  };
  insightsSec: {
    tagline: string;
    title: string;
    subtitle: string;
    readMore: string;
    closeLabel: string;
    signature: string;
    items: {
      tag: string;
      readTime: string;
      title: string;
      date: string;
      excerpt: string;
      paragraphs: string[];
    }[];
  };
  footer: {
    tagline: string;
    allRightsReserved: string;
    quickLinks: string;
    legalLink: string;
  };
  leadership: {
    label: string;
    name: string;
    title: string;
    quote: string;
  };
}

export const translations: Record<"en" | "ar", TranslationSchema> = {
  en: {
    nav: {
      about: "About Us",
      strategy: "Strategic Partnerships",
      services: "Business Areas",
      footprint: "Market Access",
      insights: "Vision & Insights",
      contact: "Contact Us",
      langLabel: "العربية",
    },
    hero: {
      badge: "SAUDI STRATEGIC GROWTH COMPANY",
      titleLines: ["We build.", "We grow.", "We empower."],
      paragraph: "A premier Saudi enterprise specializing in business development, building strategic partnerships, and enabling companies to access growth and expansion opportunities inside the Saudi market.",
      cta: "Discover More",
    },
    stats: {
      experienceVal: "16+ Years",
      experienceLabel: "of Saudi Market Experience",
      partnersVal: "30+",
      partnersLabel: "Strategic Partnership Network",
      sectorsVal: "7",
      sectorsLabel: "Core Growth Sectors",
      presenceVal: "Active",
      presenceLabel: "Saudi Market Presence",
      visionNote: "Future Vision Highlights (Strategic projection for 2030 perspective)",
      visionToggleLabelOff: "Show Future Vision",
      visionToggleLabelOn: "Show Current Milestones",
      strategicInvestmentsVal: "15+",
      strategicInvestmentsLabel: "Strategic Investments Projected",
    },
    businessAreas: {
      sectionBadge: "WHAT WE DO",
      title: "Our Business Areas",
      subtitle: "We partner with businesses, investors, and brands to unlock long-term value and sustainable growth inside the Kingdom.",
      items: [
        {
          id: "real-estate",
          title: "Real Estate Marketing",
          description: "Strategic marketing solutions that position premier real estate opportunities and drive qualified commercial demand.",
        },
        {
          id: "bus-dev",
          title: "Business Development",
          description: "Identifying opportunities, building key capabilities, and creating sustainable growth pathways for high-potential enterprises.",
        },
        {
          id: "partnerships",
          title: "Strategic Partnerships",
          description: "Forging long-term alliances that open key markets, expand corporate reach, and create mutual investment value.",
        },
        {
          id: "market-entry",
          title: "Market Entry & Expansion",
          description: "Supporting premium global brands and regional institutional investors entering or expanding within the Saudi market.",
        },
        {
          id: "distribution",
          title: "Premium Product Distribution",
          description: "Helping selected luxury and key enterprise brands establish physical presence, distribution pipelines, and deep market credibility in Saudi Arabia.",
        },
      ],
    },
    expansion: {
      sectionBadge: "STRATEGIC EXPANSION",
      title: "A Regional Vision. A Saudi Foundation.",
      paragraph: "Headquartered in Riyadh, NEXT HOME builds strategic relationships across high-growth sectors, with an unwavering focus on deep market access, trusted high-tier partnerships, and long-term commercial value.",
      cta: "Our Footprint",
      cities: {
        riyadh: "Riyadh",
        riyadhSub: "Headquarters & Strategic Base",
        riyadhCountry: "Kingdom of Saudi Arabia",
        jeddah: "Jeddah",
        jeddahSub: "Western Region Market Access",
        jeddahCountry: "Kingdom of Saudi Arabia",
        dammam: "Dammam",
        dammamSub: "Eastern Province Commercial Reach",
        dammamCountry: "Kingdom of Saudi Arabia",
        khobar: "Al Khobar",
        khobarSub: "Gulf Business Gateway",
        khobarCountry: "Kingdom of Saudi Arabia",
      },
    },
    quote: {
      text: "“We do not look for suppliers. We build long-term strategic partnerships.”",
      author: "NEXT HOME EXECUTIVE BOARD",
    },
    whyPartner: {
      sectionBadge: "OUR VALUES",
      title: "Why Partner With NEXT HOME",
      items: [
        {
          title: "Deep Market Insight",
          description: "Deep, unmatched experience in navigating Saudi regulatory, financial, and business development landscapes with precision.",
        },
        {
          title: "Proven Track Record",
          description: "Consistent execution, premium operational standards, and complete dedication to high-value executive outcomes.",
        },
        {
          title: "Strong Network",
          description: "Direct elite access to local decision makers, family offices, sovereign entities, and institutional market leaders.",
        },
        {
          title: "Tailored Strategy",
          description: "Custom strategic growth plans built systematically to address unique capabilities and market access opportunities.",
        },
        {
          title: "Long-Term Value",
          description: "A relentless corporate focus on creating sustainable future-proof growth and reciprocal partnership values.",
        },
        {
          title: "Executive Execution",
          description: "Agile, direct leadership management of critical milestones by expert Saudi and international corporate executives.",
        },
      ],
    },
    contact: {
      sectionBadge: "LET'S BUILD THE NEXT",
      title: "Contact Our Executive Office",
      subtitle: "We welcome direct consultations with aligned partners, entrepreneurs, sovereign investors, and global brands seeking long-term commercial opportunities in Saudi Arabia.",
      name: "Firas Alshawsh",
      role: "Director of Business Development & Strategic Partnerships",
      phone: "+966 50 661 2761",
      email: "info@nexthome-group.com",
      location: "Riyadh, Saudi Arabia",
      button: "Get in Touch",
      form: {
        title: "Submit Strategic Inquiry",
        fullNameRef: "Name",
        companyNameRef: "Company or Partnership Entity",
        emailRef: "Email Address",
        phoneRef: "Mobile Number",
        messageRef: "Message context or cooperation goals",
        submitBtn: "Send Request",
        successMsg: "Your inquiry has been submitted successfully, our team will contact you shortly.",
        errorMsg: "Unable to send the request, please try again.",
      },
    },
    insightsSec: {
      tagline: "ECONOMIC INSIGHTS & ANALYTICS",
      title: "Insights & Analytics",
      subtitle: "Periodic briefings, market reports, and strategic analyses from our research desk.",
      readMore: "Read Report",
      closeLabel: "Close",
      signature: "This report was prepared by the Advisory Division of NEXT HOME.",
      items: [
        {
          tag: "Saudi Market",
          readTime: "5 min read",
          title: "A New Era in Riyadh's Commercial Sector",
          date: "June 2026",
          excerpt: "How the expansion of commercial and financial zones in North Riyadh is redefining real estate value and major regional headquarters.",
          paragraphs: [
            "The general master plan of Riyadh is shifting the center of gravity for commercial real estate at an extraordinary pace. With global corporations establishing regional HQs in the capital, premium offices and strategic districts are facing unprecedented demand.",
            "To secure high long-term yields, entrepreneurs must reserve their locations and design strategic partnerships that offer rapid regional access and advanced operational facilities.",
            "NEXT HOME evaluates high-potential real estate marketing strategies to connect brands with their ideal locations, ensuring the highest standards of operational presence."
          ]
        },
        {
          tag: "Partnerships",
          readTime: "4 min read",
          title: "The Power of Local Strategic Alliances",
          date: "May 2026",
          excerpt: "Why successful brands rely on elite networking networks and tailored solutions, rather than direct traditional entry.",
          paragraphs: [
            "Entering the Saudi market requires a precise understanding of cultural, social, and rapidly evolving legislative details, alongside exclusive business channels.",
            "Traditional distribution models are no longer sufficient to meet future demands. High-end local representation builds immediate credibility and ensures long-term reputation protection for foreign brands.",
            "By focusing on bespoke executive development relationships, NEXT HOME provides partner brands with direct channels to premium distribution networks."
          ]
        }
      ]
    },
    footer: {
      tagline: "Connecting opportunities, developing high-value partnerships, and building real-world growth pillars across the Kingdom of Saudi Arabia.",
      allRightsReserved: "© 2026 NEXT HOME. All rights reserved.",
      quickLinks: "Corporate Overview",
      legalLink: "Discreet Governance & Compliance Policy",
    },
    leadership: {
      label: "Leadership",
      name: "Mohammed Ahmed Ali Saleh",
      title: "General Manager",
      quote: "Leading NEXT HOME with a focus on trust, strategic relationships, and long-term growth.",
    },
  },
  ar: {
    nav: {
      about: "من نحن",
      strategy: "الشراكات",
      services: "مجالات الأعمال",
      footprint: "الوصول للسوق",
      insights: "الرؤية",
      contact: "تواصل معنا",
      langLabel: "English",
    },
    hero: {
      badge: "شركة سعودية للنمو الاستراتيجي",
      titleLines: ["نبني.", "ننمو.", "نُمكّن."],
      paragraph: "شركة سعودية متخصصة في تطوير الأعمال وبناء الشراكات الاستراتيجية وتمكين الشركات من الوصول إلى فرص النمو والتوسع داخل السوق السعودي.",
      cta: "اكتشف المزيد",
    },
    stats: {
      experienceVal: "+١٦ سنة",
      experienceLabel: "من الخبرة في السوق السعودي",
      partnersVal: "+٣٠",
      partnersLabel: "شبكة شراكات استراتيجية",
      sectorsVal: "٧",
      sectorsLabel: "قطاعات نمو رئيسية",
      presenceVal: "نشط",
      presenceLabel: "حضور مؤكد في السوق السعودي",
      visionNote: "أبرز ملامح الرؤية المستقبلية (نظرة استراتيجية تتماشى مع رؤية ٢٠٣٠)",
      visionToggleLabelOff: "عرض الرؤية المستقبلية",
      visionToggleLabelOn: "عرض المؤشرات الحالية",
      strategicInvestmentsVal: "+١٥",
      strategicInvestmentsLabel: "استثمارات استراتيجية مستهدفة",
    },
    businessAreas: {
      sectionBadge: "تفاصيل أعمالنا",
      title: "مجالات أعمالنا",
      subtitle: "نعمل بجدية وثبات مع الشركات والمستثمرين والعلامات التجارية لبناء قيمة طويلة المدى ونمو مستدام داخل المملكة العربية السعودية.",
      items: [
        {
          id: "real-estate",
          title: "التسويق العقاري",
          description: "حلول تسويق عقاري استراتيجية تبرز الفرص العقارية المميزة وتستقطب وتؤهل الطلب التجاري الجاد.",
        },
        {
          id: "bus-dev",
          title: "تطوير الأعمال",
          description: "تحديد واقتناص الفرص الاستثمارية الواعدة، وبناء القدرات المؤسسية، وخلق مسارات نمو تجاري مستدام.",
        },
        {
          id: "partnerships",
          title: "الشراكات الاستراتيجية",
          description: "تأسيس تحالفات متينة ومستدامة تتيح دخول أسواق حيوية، وتوسع نطاق الوصول، وتصنع قيمًا متبادلة.",
        },
        {
          id: "market-entry",
          title: "دخول السوق والتوسع",
          description: "مرافقة ودعم العلامات التجارية والمستثمرين الإقليميين والدوليين في دخول السوق السعودي أو التوسع داخل ركائزه.",
        },
        {
          id: "distribution",
          title: "توزيع المنتجات المميزة",
          description: "تمكين العلامات التجارية الفاخرة والنخبوية من ترسيخ حضورها، وإطلاق سلاسل التوزيع وبناء مصداقية تجارية متكاملة بالمملكة.",
        },
      ],
    },
    expansion: {
      sectionBadge: "التوسع الاستراتيجي",
      title: "رؤية توسعية. وقاعدة سعودية راسخة.",
      paragraph: "انطلاقًا من عاصمتنا الرياض، تبني نيكست هوم علاقات استراتيجية وثيقة في قطاعات اقتصادية عالية النمو، مع تركيز دائم وحثيث على تسهيل الوصول إلى السوق، ونسج الشراكات الموثوقة، وتوليد القيمة التجارية طويلة المدى.",
      cta: "نطاق عملنا",
      cities: {
        riyadh: "الرياض",
        riyadhSub: "المقر الرئيسي والقاعدة الاستراتيجية",
        riyadhCountry: "المملكة العربية السعودية",
        jeddah: "جدة",
        jeddahSub: "بوابة المنطقة الغربية والوصول للسوق",
        jeddahCountry: "المملكة العربية السعودية",
        dammam: "الدمام",
        dammamSub: "الامتداد التجاري للمنطقة الشرقية",
        dammamCountry: "المملكة العربية السعودية",
        khobar: "الخبر",
        khobarSub: "بوابة الأعمال الخليجية والشراكات",
        khobarCountry: "المملكة العربية السعودية",
      },
    },
    quote: {
      text: "«نحن لا نبحث عن موردين تقليديين للخدمات والمواد. بل نكرس جهودنا لبناء شراكات استراتيجية متكاملة طويلة الأجل.»",
      author: "المجلس التنفيذي لـ نيكست هوم",
    },
    whyPartner: {
      sectionBadge: "قيم الشراكة لدينا",
      title: "لماذا الشراكة مع نيكست هوم",
      items: [
        {
          title: "فهم عميق للسوق",
          description: "خبرة سعودية عميقة وإلمام تام بالبيئة التنظيمية والتنافسية ومسارات تطوير الأعمال داخل المملكة.",
        },
        {
          title: "سجل عملي موثوق",
          description: "تاريخ متميز من الالتزام، وتنفيذ عالي الجودة يتطابق مع أعلى معايير الشركات التنفيذية العالمية.",
        },
        {
          title: "شبكة علاقات قوية",
          description: "تواصل مباشر ورفيع المستوى مع صناع القرار، المكاتب العائلية الكبرى، والمؤسسات الاستثمارية الفاعلة.",
        },
        {
          title: "استراتيجية مصممة خصيصاً",
          description: "تصميم وتنفيذ خطط عمل خاصة تلائم مقومات وميزات كل فرصة استثمارية وتجارية بدقة متناهية.",
        },
        {
          title: "قيمة طويلة المدى",
          description: "التزام راسخ بتوليد العوائد والسمعة والنمو المتوازن عبر شراكات مرنة مستدامة للمستقبل.",
        },
        {
          title: "تنفيذ احترافي مباشر",
          description: "إشراف قيادي مباشر من قبل نخبة من المديرين التنفيذيين المحليين والدوليين لضمان دقة التنفيذ السريع.",
        },
      ],
    },
    contact: {
      sectionBadge: "لنصنع المستقبل معاً",
      title: "تواصل مع المكتب التنفيذي",
      subtitle: "نرحب بالنقاشات المباشرة والمناقشات الاستراتيجية مع الشركاء المتوافقين، ورواد الأعمال الطموحين، والمستثمرين، وكبريات العلامات الباحثة عن مكانة وأثر طويل الأمد في المملكة.",
      name: "فراس الشاوش",
      role: "مدير تطوير الأعمال والشراكات الاستراتيجية",
      phone: "+966 50 661 2761",
      email: "info@nexthome-group.com",
      location: "الرياض، المملكة العربية السعودية",
      button: "تواصل معنا الآن",
      form: {
        title: "تقديم طلب استفسار استراتيجي",
        fullNameRef: "الاسم",
        companyNameRef: "الشركة أو جهة الشراكة",
        emailRef: "البريد الإلكتروني",
        phoneRef: "رقم الجوال",
        messageRef: "نص الرسالة أو أهداف التعاون",
        submitBtn: "إرسال الطلب",
        successMsg: "تم إرسال طلبك بنجاح، وسيتواصل معك فريقنا قريبًا.",
        errorMsg: "تعذر إرسال الطلب، يرجى المحاولة مرة أخرى.",
      },
    },
    insightsSec: {
      tagline: "الرؤى الاقتصادية والتحليلات",
      title: "الرؤى والتحليلات",
      subtitle: "تقارير وتحليلات دورية من مكتبنا التنفيذي تعكس محركات السوق والفرص التنظيمية داخل المملكة.",
      readMore: "اقرأ التقرير",
      closeLabel: "إغلاق",
      signature: "تم إعداد هذا التقرير من قبل قسم الاستشارات لمكتب نيكست هوم.",
      items: [
        {
          tag: "السوق السعودي",
          readTime: "قراءة في ٥ دقائق",
          title: "حقبة جديدة في القطاع التجاري بالرياض",
          date: "يونيو ٢٠٢٦",
          excerpt: "كيف يعيد توسع المناطق التجارية والمالية في شمال الرياض تعريف القيمة العقارية ومقار الشركات الإقليمية الكبرى.",
          paragraphs: [
            "يساهم المخطط العام لمدينة الرياض في تغيير مراكز ثقل العقارات التجارية بسرعة فائقة. ومع قيام الشركات العالمية بتأسيس مقارها الإقليمية في العاصمة، تواجه المكاتب الفاخرة والمناطق الاستراتيجية طلبًا غير مسبوق.",
            "لتحقيق عوائد مجزية على المدى الطويل، يتعين على رواد الأعمال حجز مواقعهم وتصميم شراكات استراتيجية تتيح لهم وصولاً إقليميًا سريعًا وتوفر مرافق تشغيلية متطورة.",
            "تقوم نيكست هوم بتقييم استراتيجيات التسويق العقاري عالية الإمكانات لربط العلامات التجارية بمواقعها المثالية، لضمان أعلى مستوى من الحضور التشغيلي."
          ]
        },
        {
          tag: "الشراكات",
          readTime: "قراءة في ٤ دقائق",
          title: "قوة التحالفات الاستراتيجية المحلية",
          date: "مايو ٢٠٢٦",
          excerpt: "لماذا تعتمد العلامات التجارية الناجحة على شبكات العلاقات النخبوية والحلول المصممة، بدلاً من الدخول التقليدي المباشر.",
          paragraphs: [
            "يتطلب دخول السوق السعودي فهمًا دقيقًا للتفاصيل الثقافية والاجتماعية والتشريعات المتسارعة وقنوات الأعمال الحصرية.",
            "النماذج التقليدية للتوزيع لم تعد كافية لتلبية متطلبات المستقبل. إن التمثيل المحلي الراقي يبني مصداقية سريعة ويضمن حماية السمعة التجارية على المدى الطويل للعلامات الأجنبية.",
            "من خلال التركيز على علاقات التطوير التنفيذية المصممة بعناية، تهيئ نيكست هوم للعلامات الشريكة قنوات وصول مباشرة إلى شبكات التوزيع الفاخرة."
          ]
        }
      ]
    },
    footer: {
      tagline: "ربط الفرص الاستثمارية الحقيقية، وصياغة الشراكات الاستراتيجية النخبوية، وتشييد دعائم التنمية المستدامة للأعمال في مختلف ربوع المملكة.",
      allRightsReserved: "© ٢٠٢٦ نيكست هوم. جميع الحقوق محفوظة.",
      quickLinks: "الرؤية والسياسة المؤسسية",
      legalLink: "الحوكمة والامتثال وسياسة الخصوصية السرية للشركاء",
    },
    leadership: {
      label: "الإدارة",
      name: "محمد أحمد علي صالح",
      title: "المدير العام",
      quote: "يقود نيكست هوم برؤية تركز على الثقة، والعلاقات الاستراتيجية، والنمو طويل المدى.",
    },
  },
};
