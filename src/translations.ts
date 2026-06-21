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
    toggleMenu: string;
  };
  brand: {
    name: string;
    subtitle: string;
  };
  companySubtitle: string;
  hero: {
    badge: string;
    title: string;
    titleLines: string[];
    paragraph: string;
    cta: string;
    cta_services: string;
    cta_contact: string;
  };
  aboutSection: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    bullets: string[];
    cta: string;
    imageAlt: string;
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
  howWeWork: {
    sectionBadge: string;
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  businessAreas: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    items: BusinessArea[];
    collapseDetails: string;
    exploreScope: string;
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
      riyadhAlt: string;
      jeddah: string;
      jeddahSub: string;
      jeddahCountry: string;
      jeddahAlt: string;
      dammam: string;
      dammamSub: string;
      dammamCountry: string;
      dammamAlt: string;
      khobar: string;
      khobarSub: string;
      khobarCountry: string;
      khobarAlt: string;
    };
    hqBadge: string;
    mapAriaLabel: string;
    mapCaption: string;
    bullets: {
      title: string;
      desc: string;
    }[];
  };
  quote: {
    text: string;
    author: string;
    cta: string;
  };
  whyPartner: {
    sectionBadge: string;
    title: string;
    items: FeatureColumn[];
    imageAlt: string;
  };
  contact: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    name: string;
    role: string;
    officeTitle: string;
    officeDesc: string;
    phone: string;
    email: string;
    location: string;
    button: string;
    executiveOfficeLabel: string;
    executiveContactLabel: string;
    phoneLabel: string;
    emailLabel: string;
    locationLabel: string;
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
      successTitle: string;
      submitAnother: string;
      fullNamePlaceholder: string;
      companyPlaceholder: string;
      phonePlaceholder: string;
      messagePlaceholder: string;
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
    businessAreasLabel: string;
    corporateInfoLabel: string;
    communicationLabel: string;
    companyLocation: string;
    commercialRegistrationLabel: string;
    mktGrowth: string;
  };
  leadership: {
    label: string;
    name: string;
    title: string;
    quote: string;
  };
  legalInfo: {
    title: string;
    commercialRegistration: string;
    vatNumber: string;
    demo: string;
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
      toggleMenu: "Toggle Menu",
    },
    brand: {
      name: "NEXT HOME",
      subtitle: "NEXT HOME",
    },
    companySubtitle: "Business Group",
    hero: {
      badge: "SAUDI STRATEGIC GROWTH COMPANY",
      title: "Building Growth Opportunities in the Saudi Market",
      titleLines: ["We build.", "We grow.", "We empower."],
      paragraph: "A Saudi business development and commercial growth company helping companies and brands enter and expand across the Saudi market.",
      cta: "Discover More",
      cta_services: "Explore Our Services",
      cta_contact: "Contact Us",
    },
    aboutSection: {
      eyebrow: "About the Company",
      title: "We Open the Doors to Growth and Opportunities",
      paragraphs: [
        "NEXT HOME is a Saudi company specializing in business development, commercial growth, and strategic partnerships. We work with companies and brands across multiple sectors to support market entry, develop sales and marketing channels, and build sustainable expansion opportunities.",
        "We do not rely on one-size-fits-all or sector-restricted solutions. We build a strategy for each product or service based on its market, customers, and commercial opportunity."
      ],
      bullets: [
        "Deep understanding of the Saudi market.",
        "Tailored solutions by product and sector.",
        "Multi-sector relationship network.",
        "Execution from strategy to market access."
      ],
      cta: "More About the Company",
      imageAlt: "Saudi business meeting in a modern corporate environment"
    },
    stats: {
      experienceVal: "16+ Years",
      experienceLabel: "of Saudi Market Experience",
      partnersVal: "30+",
      partnersLabel: "Strategic Partnership Network",
      sectorsVal: "7",
      sectorsLabel: "Core Growth Sectors",
      presenceVal: "Active Presence",
      presenceLabel: "Saudi Market Presence",
      visionNote: "Future Vision Highlights (Strategic projection for 2030 perspective)",
      visionToggleLabelOff: "Show Future Vision",
      visionToggleLabelOn: "Show Current Milestones",
      strategicInvestmentsVal: "15+",
      strategicInvestmentsLabel: "Strategic Investments Projected",
    },
    howWeWork: {
      sectionBadge: "STRATEGIC METHODOLOGY",
      title: "How We Work",
      steps: [
        {
          title: "Opportunity Discovery",
          description: "We understand the product or service, analyze the market and audience, and identify the most realistic growth opportunities."
        },
        {
          title: "Strategy Formulation",
          description: "We turn the opportunity into a clear strategy covering positioning, marketing, sales, and partnerships."
        },
        {
          title: "Market Access",
          description: "We build market-entry and access channels, connecting the company with the right customers, partners, and stakeholders."
        },
        {
          title: "Marketing & Sales Development",
          description: "We develop marketing and sales strategies suited to the product, market, and audience, and translate them into measurable execution."
        }
      ]
    },
    businessAreas: {
      sectionBadge: "WHAT WE DO",
      title: "Our Business Areas",
      subtitle: "We partner with businesses, investors, and brands to unlock long-term value and sustainable growth inside the Kingdom.",
      items: [
        {
          id: "bus-dev",
          title: "Business Development",
          description: "We identify growth opportunities, develop expansion models, and turn commercial potential into executable plans.",
        },
        {
          id: "partnerships",
          title: "Strategic Partnerships",
          description: "We build strategic relationships connecting companies with institutions, investors, and partners capable of supporting growth.",
        },
        {
          id: "market-entry",
          title: "Saudi Market Entry",
          description: "We help local and international companies understand the Saudi market, identify opportunities, and build the right market-entry path.",
        },
        {
          id: "marketing-expansion",
          title: "Marketing & Growth Strategies",
          description: "We design marketing and growth strategies for products, services, and brands, tailored to each sector and target audience.",
        },
        {
          id: "real-estate",
          title: "Sales & Channel Development",
          description: "We develop sales journeys, distribution channels, and practical routes to customers and partners.",
        },
        {
          id: "commercial-rep",
          title: "Opportunity & Project Development",
          description: "We assess commercial and investment opportunities and help transform them into scalable, executable projects.",
        },
      ],
      collapseDetails: "Collapse Details",
      exploreScope: "Explore Operational Scope",
    },
    expansion: {
      sectionBadge: "STRATEGIC EXPANSION",
      title: "A Regional Vision. A Saudi Foundation.",
      paragraph: "From Riyadh, we help companies and brands access key markets across the Kingdom and build commercial relationships and channels that support marketing, sales, and expansion.",
      cta: "Our Footprint",
      cities: {
        riyadh: "Riyadh",
        riyadhSub: "Headquarters & Strategic Base",
        riyadhCountry: "Kingdom of Saudi Arabia",
        riyadhAlt: "Riyadh skylines and corporate headquarters",
        jeddah: "Jeddah",
        jeddahSub: "Western Region Market Access",
        jeddahCountry: "Kingdom of Saudi Arabia",
        jeddahAlt: "Jeddah corporate office branch",
        dammam: "Dammam",
        dammamSub: "Eastern Province Commercial Reach",
        dammamCountry: "Kingdom of Saudi Arabia",
        dammamAlt: "Dammam commercial seaport and base",
        khobar: "Al Khobar",
        khobarSub: "Gulf Business Gateway",
        khobarCountry: "Kingdom of Saudi Arabia",
        khobarAlt: "Al Khobar corporate skyline",
      },
      hqBadge: "HEADQUARTERS",
      mapAriaLabel: "Commercial access footprint map of NEXT HOME within the Kingdom of Saudi Arabia",
      mapCaption: "Commercial reach across key Saudi markets",
      bullets: [
        {
          title: "Headquarters in Riyadh",
          desc: "Our core executive and strategic base of operations is in the capital."
        },
        {
          title: "KSA-wide Access",
          desc: "Operational capacity and commercial outreach to serve all major regions."
        },
        {
          title: "Institutional Alliances",
          desc: "Established, trusted networks of corporate and family relationships inside the Kingdom."
        }
      ]
    },
    quote: {
      text: "“From Product to Market. From Market to Growth.”",
      author: "We build an integrated growth path that begins with understanding the opportunity, moves through marketing, sales, and partnerships, and ends with executable, measurable growth.",
      cta: "Start Partnership With Us"
    },
    whyPartner: {
      sectionBadge: "OUR VALUES",
      title: "Why Partner With NEXT HOME",
      items: [
        {
          title: "Deep Market Insight",
          description: "Deep experience in reading the commercial environment, regulatory frameworks, and customer behavior inside Saudi Arabia.",
        },
        {
          title: "Multi-Sector Solutions",
          description: "We develop strategies tailored to the nature of each product or service rather than imposing a single model on all.",
        },
        {
          title: "Connected Marketing & Sales",
          description: "We connect marketing directly with sales and access channels so that customer interest translates into actual business results.",
        },
        {
          title: "Strong Network",
          description: "We establish practical connections with strategic partners, organizations, investors, and decision makers.",
        },
        {
          title: "Tailored Strategy",
          description: "We design a custom plan for each opportunity based on its specific goals, target markets, and growth stage.",
        },
        {
          title: "Direct Execution",
          description: "We transition seamlessly from assessment and planning directly to implementation, monitoring, and measurable performance.",
        },
      ],
      imageAlt: "A strategic partnership meeting between Saudi business leaders in a modern corporate environment"
    },
    contact: {
      sectionBadge: "LET'S BUILD THE NEXT",
      title: "Contact Our Executive Office",
      subtitle: "We welcome direct consultations with aligned partners, entrepreneurs, sovereign investors, and global brands seeking long-term commercial opportunities in Saudi Arabia.",
      name: "Firas Alshawsh",
      role: "Director of Business Development & Strategic Partnerships",
      officeTitle: "Business Development & Strategic Partnerships Office",
      officeDesc: "Leading growth opportunities, strategic partnerships, and long-term business relationships across Saudi Arabia.",
      phone: "+966 50 661 2761",
      email: "info@nexthome-group.com",
      location: "Riyadh, Saudi Arabia",
      button: "Get in Touch",
      executiveOfficeLabel: "EXECUTIVE OFFICE",
      executiveContactLabel: "Executive Contact",
      phoneLabel: "Phone",
      emailLabel: "Email",
      locationLabel: "Location",
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
        successTitle: "Inquiry Dispatched",
        submitAnother: "Submit Another Inquiry",
        fullNamePlaceholder: "Enter your full name",
        companyPlaceholder: "Your company or initiative name",
        phonePlaceholder: "e.g. 05xxxxxxxx",
        messagePlaceholder: "Write your inquiry details or requested collaboration areas...",
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
      tagline: "A Saudi business development and commercial growth company helping companies and brands enter and expand across the Saudi market.",
      allRightsReserved: "© 2026 NEXT HOME. All rights reserved.",
      quickLinks: "Corporate Overview",
      legalLink: "Discreet Governance & Compliance Policy",
      businessAreasLabel: "Business Areas",
      corporateInfoLabel: "Corporate Information",
      communicationLabel: "Communication Center",
      companyLocation: "Saudi Arabia • Riyadh",
      commercialRegistrationLabel: "Commercial Registration",
      mktGrowth: "Marketing & Commercial Growth",
    },
    leadership: {
      label: "Leadership",
      name: "Mohammed Ahmed Ali Saleh",
      title: "General Manager",
      quote: "Leading NEXT HOME with a vision built on trust, strategic relationships, and long-term growth. He focuses on developing meaningful partnerships and connecting promising opportunities with the right stakeholders to support sustainable expansion across Saudi Arabia.",
    },
    legalInfo: {
      title: "Legal Information",
      commercialRegistration: "Commercial Registration",
      vatNumber: "VAT Registration Number",
      demo: "Demo Data",
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
      toggleMenu: "تبديل القائمة",
    },
    brand: {
      name: "NEXT HOME",
      subtitle: "نيكست هوم",
    },
    companySubtitle: "مجموعة الأعمال",
    hero: {
      badge: "شركة سعودية للنمو الاستراتيجي",
      title: "نبني فرص النمو في السوق السعودي",
      titleLines: ["نبني.", "ننمو.", "نُمكّن."],
      paragraph: "شركة سعودية لتطوير الأعمال والنمو التجاري وبناء الشراكات، تساعد الشركات والعلامات التجارية على دخول السوق السعودي والتوسع في مختلف القطاعات.",
      cta: "اكتشف المزيد",
      cta_services: "اكتشف خدماتنا",
      cta_contact: "تواصل معنا",
    },
    aboutSection: {
      eyebrow: "عن الشركة",
      title: "نحن نفتح الأبواب للنمو والفرص",
      paragraphs: [
        "شركة NEXT HOME (نيكست هوم) هي شركة سعودية متخصصة في تطوير الأعمال والنمو التجاري وبناء الشراكات. نعمل مع الشركات والعلامات التجارية في مختلف القطاعات لمساعدتها على دخول السوق السعودي، تطوير قنوات التسويق والمبيعات، وبناء فرص توسع مستدامة.",
        "لا نعتمد حلولاً جاهزة أو مرتبطة بقطاع واحد؛ بل نبني لكل منتج أو خدمة استراتيجية تتناسب مع السوق والعملاء وطبيعة الفرصة."
      ],
      bullets: [
        "فهم عميق للسوق السعودي.",
        "حلول مصممة حسب المنتج والقطاع.",
        "شبكة علاقات متعددة القطاعات.",
        "تنفيذ من الاستراتيجية إلى الوصول للسوق."
      ],
      cta: "المزيد عن الشركة",
      imageAlt: "اجتماع أعمال سعودي في بيئة مؤسسية حديثة"
    },
    stats: {
      experienceVal: "+١٦ سنة",
      experienceLabel: "من الخبرة في السوق السعودي",
      partnersVal: "+٣٠",
      partnersLabel: "شبكة شراكات استراتيجية",
      sectorsVal: "٧",
      sectorsLabel: "قطاعات نمو رئيسية",
      presenceVal: "حضور نشط",
      presenceLabel: "حضور مؤكد في السوق السعودي",
      visionNote: "أبرز ملامح الرؤية المستقبلية (نظرة استراتيجية تتماشى مع رؤية ٢٠٣٠)",
      visionToggleLabelOff: "عرض الرؤية المستقبلية",
      visionToggleLabelOn: "عرض المؤشرات الحالية",
      strategicInvestmentsVal: "+١٥",
      strategicInvestmentsLabel: "استثمارات استراتيجية مستهدفة",
    },
    howWeWork: {
      sectionBadge: "نهج العمل الاستراتيجي",
      title: "كيف نعمل",
      steps: [
        {
          title: "اكتشاف الفرصة",
          description: "نفهم المنتج أو الخدمة، نحلل السوق والجمهور، ونحدد فرص النمو الأكثر واقعية."
        },
        {
          title: "بناء الاستراتيجية",
          description: "نحوّل الفرصة إلى خطة واضحة تشمل التموضع، التسويق، المبيعات، والشراكات."
        },
        {
          title: "الوصول إلى السوق",
          description: "نبني قنوات الدخول والوصول، ونربط الشركة بالعملاء والشركاء والجهات المناسبة."
        },
        {
          title: "التسويق وتطوير المبيعات",
          description: "نطوّر استراتيجيات تسويق ومبيعات تناسب المنتج والسوق والجمهور، ونحوّلها إلى تنفيذ قابل للقياس."
        }
      ]
    },
    businessAreas: {
      sectionBadge: "تفاصيل أعمالنا",
      title: "مجالات أعمالنا",
      subtitle: "نعمل بجدية وثبات مع الشركات والمستثمرين والعلامات التجارية لبناء قيمة طويلة المدى ونمو مستدام داخل المملكة العربية السعودية.",
      items: [
        {
          id: "bus-dev",
          title: "تطوير الأعمال",
          description: "نكتشف فرص النمو، ونبني نماذج التوسع، ونحوّل الإمكانات التجارية إلى خطط قابلة للتنفيذ.",
        },
        {
          id: "partnerships",
          title: "الشراكات الاستراتيجية",
          description: "نبني علاقات وشراكات تربط الشركات بالجهات والمستثمرين والشركاء القادرين على دعم النمو.",
        },
        {
          id: "market-entry",
          title: "دخول السوق السعودي",
          description: "نساعد الشركات المحلية والدولية على فهم السوق السعودي، تحديد الفرص، وبناء مسار دخول مناسب.",
        },
        {
          id: "marketing-expansion",
          title: "استراتيجيات التسويق والنمو",
          description: "نصمم استراتيجيات تسويق ونمو للمنتجات والخدمات والعلامات التجارية بما يتناسب مع طبيعة كل قطاع وجمهوره.",
        },
        {
          id: "real-estate",
          title: "تطوير المبيعات والقنوات",
          description: "نبني مسارات البيع، قنوات التوزيع، وآليات الوصول إلى العملاء والشركاء.",
        },
        {
          id: "commercial-rep",
          title: "تطوير الفرص والمشاريع",
          description: "ندرس الفرص التجارية والاستثمارية ونساعد على تحويلها إلى مشاريع قابلة للنمو والتنفيذ.",
        },
      ],
      collapseDetails: "عرض أقل",
      exploreScope: "عرض نطاق العمل بالتفصيل",
    },
    expansion: {
      sectionBadge: "التوسع الاستراتيجي",
      title: "رؤية توسعية. وقاعدة سعودية راسخة.",
      paragraph: "انطلاقًا من الرياض، نساعد الشركات والعلامات التجارية على الوصول إلى الأسواق الرئيسية في المملكة، وبناء علاقات وقنوات تجارية تدعم التسويق والمبيعات والتوسع.",
      cta: "نطاق عملنا",
      cities: {
        riyadh: "الرياض",
        riyadhSub: "المقر الرئيسي والقاعدة الاستراتيجية",
        riyadhCountry: "المملكة العربية السعودية",
        riyadhAlt: "أبراج ومقر شركة نيكست هوم بالرياض",
        jeddah: "جدة",
        jeddahSub: "بوابة المنطقة الغربية والوصول للسوق",
        jeddahCountry: "المملكة العربية السعودية",
        jeddahAlt: "مكتب فرع المنطقة الغربية في جدة",
        dammam: "الدمام",
        dammamSub: "الامتداد التجاري للمنطقة الشرقية",
        dammamCountry: "المملكة العربية السعودية",
        dammamAlt: "ميناء وقاعدة أعمال شركة نيكست هوم في الدمام",
        khobar: "الخبر",
        khobarSub: "بوابة الأعمال الخليجية والشراكات",
        khobarCountry: "المملكة العربية السعودية",
        khobarAlt: "نافذة أبراج الخبر للأعمال",
      },
      hqBadge: "المقر الرئيسي",
      mapAriaLabel: "خريطة الوصول التجاري لشركة نيكست هوم داخل المملكة العربية السعودية",
      mapCaption: "وصول تجاري إلى الأسواق الرئيسية في المملكة",
      bullets: [
        {
          title: "المقر الرئيسي في الرياض",
          desc: "قاعدتنا التنفيذية والاستراتيجية تتركز وتنطلق من العاصمة الرياض."
        },
        {
          title: "تغطية السوق والوصول التجاري",
          desc: "القدرة التنافسية والتشغيلية لتغطية وتلبية الاحتياجات بمختلف مدن ومناطق المملكة الرئيسية."
        },
        {
          title: "شبكة علاقات ممتدة",
          desc: "شبكة صلبة من العلاقات النوعية والشركاء لخدمة وتمكين التوسعات للأعمال."
        }
      ]
    },
    quote: {
      text: "«من المنتج إلى السوق. ومن السوق إلى النمو.»",
      author: "نبني للشركات مسارًا متكاملًا يبدأ بفهم الفرصة، ويمر بالتسويق والمبيعات والشراكات، وينتهي بنمو قابل للتنفيذ والقياس.",
      cta: "ابدأ شراكة معنا"
    },
    whyPartner: {
      sectionBadge: "قيم الشراكة لدينا",
      title: "لماذا الشراكة مع نيكست هوم",
      items: [
        {
          title: "فهم عميق للسوق",
          description: "خبرة في قراءة البيئة التجارية والتنظيمية وسلوك العملاء داخل المملكة.",
        },
        {
          title: "حلول متعددة القطاعات",
          description: "نطوّر استراتيجيات تناسب طبيعة كل منتج أو خدمة بدل فرض نموذج واحد على الجميع.",
        },
        {
          title: "تسويق ومبيعات مترابطان",
          description: "نربط التسويق بالمبيعات وقنوات الوصول حتى يتحول الاهتمام إلى نتائج تجارية.",
        },
        {
          title: "شبكة علاقات قوية",
          description: "نبني روابط عملية مع الشركاء والجهات والمستثمرين وصناع القرار.",
        },
        {
          title: "استراتيجية مصممة خصيصًا",
          description: "نصمم لكل فرصة خطة تتناسب مع أهدافها وسوقها ومرحلة نموها.",
        },
        {
          title: "تنفيذ مباشر",
          description: "ننتقل من الدراسة والتخطيط إلى التنفيذ والمتابعة وقياس النتائج.",
        },
      ],
      imageAlt: "اجتماع شراكة استراتيجية بين رجال أعمال سعوديين في بيئة مؤسسية حديثة"
    },
    contact: {
      sectionBadge: "لنصنع المستقبل معاً",
      title: "تواصل مع المكتب التنفيذي",
      subtitle: "نرحب بالنقاشات المباشرة والمناقشات الاستراتيجية مع الشركاء المتوافقين، ورواد الأعمال الطموحين، والمستثمرين، وكبريات العلامات الباحثة عن مكانة وأثر طويل الأمد في المملكة.",
      name: "فراس الشاوش",
      role: "مدير تطوير الأعمال والشراكات الاستراتيجية",
      officeTitle: "مكتب تطوير الأعمال والشراكات الاستراتيجية",
      officeDesc: "نقود فرص النمو، وبناء الشراكات الاستراتيجية، وتطوير العلاقات التجارية طويلة المدى داخل المملكة العربية السعودية.",
      phone: "+966 50 661 2761",
      email: "info@nexthome-group.com",
      location: "الرياض، المملكة العربية السعودية",
      button: "تواصل معنا الآن",
      executiveOfficeLabel: "المكتب التنفيذي",
      executiveContactLabel: "جهة الاتصال التنفيذية",
      phoneLabel: "الهاتف",
      emailLabel: "البريد",
      locationLabel: "الموقع",
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
        successTitle: "تم الإرسال بنجاح",
        submitAnother: "إرسال طلب آخر",
        fullNamePlaceholder: "اكتب اسمك الكامل",
        companyPlaceholder: "اسم شركتك أو مبادرتك",
        phonePlaceholder: "اكتب رقم جوالك (مثال: 05xxxxxxxx)",
        messagePlaceholder: "اكتب تفاصيل استفسارك أو مجالات التعاون المطلوبة...",
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
      tagline: "شركة سعودية لتطوير الأعمال والنمو التجاري وبناء الشراكات، تساعد الشركات والعلامات التجارية على دخول السوق السعودي والتوسع في مختلف القطاعات.",
      allRightsReserved: "© ٢٠٢٦ نيكست هوم. جميع الحقوق محفوظة.",
      quickLinks: "الرؤية والسياسة المؤسسية",
      legalLink: "الحوكمة والامتثال وسياسة الخصوصية السرية للشركاء",
      businessAreasLabel: "مجالات الأعمال",
      corporateInfoLabel: "معلومات الشركة center",
      communicationLabel: "الاتصال والخدمات",
      companyLocation: "المملكة العربية السعودية • الرياض",
      commercialRegistrationLabel: "السجل التجاري",
      mktGrowth: "التسويق والنمو التجاري",
    },
    leadership: {
      label: "الإدارة",
      name: "محمد أحمد علي صالح",
      title: "المدير العام",
      quote: "يقود نيكست هوم برؤية ترتكز على الثقة، وبناء العلاقات الاستراتيجية، وصناعة فرص النمو طويلة المدى. ويعمل على تطوير شراكات نوعية وربط الفرص الواعدة بالجهات المناسبة بما يدعم التوسع المستدام داخل المملكة العربية السعودية.",
    },
    legalInfo: {
      title: "البيانات النظامية",
      commercialRegistration: "السجل التجاري",
      vatNumber: "الرقم الضريبي",
      demo: "بيانات تجريبية",
    },
  },
};
