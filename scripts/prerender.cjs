const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');

// Define metadata for all 16 crawlable pages
const routes = {
  '/': {
    title: 'نيكست هوم | تطوير الأعمال ودخول السوق السعودي',
    desc: 'نيكست هوم شركة سعودية في الرياض متخصصة في تطوير الأعمال، دخول السوق السعودي، النمو التجاري، بناء الشراكات، وتطوير التسويق والمبيعات.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/',
    altHreflang: 'https://nexthome-group.com/en/',
    schema: {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "NEXT HOME",
      "alternateName": "نيكست هوم",
      "url": "https://nexthome-group.com",
      "logo": "https://nexthome-group.com/brand/next-home-logo-text.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+966583444811",
        "contactType": "corporate client development",
        "areaServed": "SA",
        "availableLanguage": ["Arabic", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressCountry": "SA"
      },
      "email": "info@nexthome-group.com",
      "description": "شركة سعودية متخصصة في تطوير الأعمال، دخول السوق السعودي، والنمو التجاري وبناء الشراكات الاستراتيجية بالرياض.",
      "knowsAbout": [
        "Business Development",
        "Saudi Market Entry",
        "Strategic Partnerships",
        "Marketing & Sales Development"
      ]
    }
  },
  '/en/': {
    title: 'NEXT HOME Saudi Arabia | Business Development & Market Entry',
    desc: 'NEXT HOME is a Saudi business development company in Riyadh specializing in Saudi market entry, commercial growth, strategic partnerships, marketing, and sales development.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/',
    altHreflang: 'https://nexthome-group.com/',
    schema: {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "NEXT HOME",
      "alternateName": "نيكست هوم",
      "url": "https://nexthome-group.com/en/",
      "logo": "https://nexthome-group.com/brand/next-home-logo-text.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+966583444811",
        "contactType": "corporate client development",
        "areaServed": "SA",
        "availableLanguage": ["Arabic", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressCountry": "SA"
      },
      "email": "info@nexthome-group.com",
      "description": "NEXT HOME is a Saudi business development company in Riyadh specializing in Saudi market entry, commercial growth, strategic partnerships, marketing, and sales development.",
      "knowsAbout": [
        "Business Development",
        "Saudi Market Entry",
        "Strategic Partnerships",
        "Marketing & Sales Development"
      ]
    }
  },
  '/about': {
    title: 'عن شركة نيكست هوم السعودية | NEXT HOME',
    desc: 'تعرف على شركة نيكست هوم السعودية بالرياض؛ ريادتنا وقيمنا المؤسسية في تطوير الأعمال والتمثيل التجاري وبناء التحالفات والنمو التجاري المستدام.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/about',
    altHreflang: 'https://nexthome-group.com/en/about',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "alternateName": "نيكست هوم",
        "url": "https://nexthome-group.com",
        "description": "شركة سعودية متخصصة في تطوير الأعمال وهندسة التحالفات الاستراتيجية."
      }
    }
  },
  '/en/about': {
    title: 'About NEXT HOME Saudi Arabia',
    desc: 'Learn about NEXT HOME Saudi Arabia in Riyadh, our corporate identity, values, and leadership team in business development and strategic partnerships.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/about',
    altHreflang: 'https://nexthome-group.com/about',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com/en/",
        "description": "Saudi corporate expansion and business development group based in Riyadh."
      }
    }
  },
  '/services/business-development-saudi-arabia': {
    title: 'تطوير الأعمال في السعودية | نيكست هوم',
    desc: 'نصمم نماذج نمو مرنة ونوفر حلول تطوير مخصصة لمسارات التوسع والاستثمار التجاري داخل قطاع الأعمال السعودي.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/services/business-development-saudi-arabia',
    altHreflang: 'https://nexthome-group.com/en/services/business-development-saudi-arabia',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "تطوير الأعمال في السعودية",
      "serviceType": "Business Development",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "تصميم خطط النمو وهندسة التحالفات التجارية النخبوية."
    }
  },
  '/en/services/business-development-saudi-arabia': {
    title: 'Business Development in Saudi Arabia | NEXT HOME',
    desc: 'We design resilient commercial growth models and custom business development strategies suited to the Saudi corporate market.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/services/business-development-saudi-arabia',
    altHreflang: 'https://nexthome-group.com/services/business-development-saudi-arabia',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Business Development in Saudi Arabia",
      "serviceType": "Business Development",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com/en/"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "Designing custom growth blueprints and commercial models for the Saudi market."
    }
  },
  '/services/saudi-market-entry': {
    title: 'دخول السوق السعودي وتطوير التوسع | نيكست هوم',
    desc: 'توجيه تنظيمي وتشغيلي متكامل لتمهيد وتأسيس وتوطين الكيانات الاستثمارية والعلامات التجارية الكبرى في المملكة.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/services/saudi-market-entry',
    altHreflang: 'https://nexthome-group.com/en/services/saudi-market-entry',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "دخول السوق السعودي وتطوير التوسع",
      "serviceType": "Saudi Market Entry",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "توجيه تنظيمي لوزارة الاستثمار وتوطين العلامات التجارية الكبرى."
    }
  },
  '/en/services/saudi-market-entry': {
    title: 'Saudi Market Entry Consulting | NEXT HOME',
    desc: 'End-to-end regulatory navigation, licensing, and brand localization strategies for international businesses entering Saudi Arabia.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/services/saudi-market-entry',
    altHreflang: 'https://nexthome-group.com/services/saudi-market-entry',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Saudi Market Entry Consulting",
      "serviceType": "Saudi Market Entry",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com/en/"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "Comprehensive corporate setup, licensing navigation, and commercial alignment."
    }
  },
  '/services/strategic-partnerships': {
    title: 'بناء الشراكات الاستراتيجية في السعودية | نيكست هوم',
    desc: 'تأسيس تحالفات نخبوية وهيكلة شركات مشتركة (JVs) مع شركاء ومؤسسات استثمارية فاعلة داخل المملكة.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/services/strategic-partnerships',
    altHreflang: 'https://nexthome-group.com/en/services/strategic-partnerships',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "بناء الشراكات الاستراتيجية في السعودية",
      "serviceType": "Strategic Partnerships",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "فرز وتوفيق الشركاء وهيكلة التحالفات والحوكمة الاستراتيجية."
    }
  },
  '/en/services/strategic-partnerships': {
    title: 'Strategic Partnerships in Saudi Arabia | NEXT HOME',
    desc: 'Structuring high-trust alliances, elite matchmaking, and joint ventures with institutional players inside Saudi Arabia.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/services/strategic-partnerships',
    altHreflang: 'https://nexthome-group.com/services/strategic-partnerships',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Strategic Partnerships in Saudi Arabia",
      "serviceType": "Strategic Partnerships",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com/en/"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "Frictionless joint venture matchmaking, and active operational charters."
    }
  },
  '/services/marketing-sales-development': {
    title: 'تطوير التسويق والمبيعات في السعودية | نيكست هوم',
    desc: 'صياغة التموضع التجاري المناسب وبناء قنوات المبيعات ورحلات العملاء لزيادة مستويات الطلب وتأصيل العلامات تجارياً.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/services/marketing-sales-development',
    altHreflang: 'https://nexthome-group.com/en/services/marketing-sales-development',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "تطوير التسويق والمبيعات في السعودية",
      "serviceType": "Marketing & Sales Development",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "هيكلة قنوات المبيعات وملاءمة العلامات التجارية لثقافة الاستهلاك المحلية."
    }
  },
  '/en/services/marketing-sales-development': {
    title: 'Marketing and Sales Development Saudi Arabia | NEXT HOME',
    desc: 'Custom brand positioning, marketing localization, and distribution channel architecture to maximize sales performance inside the Kingdom.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/services/marketing-sales-development',
    altHreflang: 'https://nexthome-group.com/services/marketing-sales-development',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Marketing and Sales Development Saudi Arabia",
      "serviceType": "Marketing & Sales Development",
      "provider": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "url": "https://nexthome-group.com/en/"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      "description": "Audience analysis, brand localization, and premium distributor channel matchmaking."
    }
  },
  '/insights': {
    title: 'الرؤى والتحليلات الاقتصادية | نيكست هوم',
    desc: 'تقارير دورية ودراسات بيانية لواقع الحركة التجارية والفرص الاستثمارية بسوق الرياض والمملكة العربية السعودية.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/insights',
    altHreflang: 'https://nexthome-group.com/en/insights',
    schema: {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "name": "الرؤى والتحليلات الاقتصادية | نيكست هوم",
      "description": "دراسات وتقارير سوق الأعمال السعودي من قسم الاستشارات لشركة نيكست هوم."
    }
  },
  '/en/insights': {
    title: 'Economic Insights & Market Briefings | NEXT HOME',
    desc: 'Periodic economic briefings, market reports, and strategic corporate analyses from the advisory division of NEXT HOME.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/insights',
    altHreflang: 'https://nexthome-group.com/insights',
    schema: {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "name": "Economic Insights & Market Briefings | NEXT HOME",
      "description": "Periodic economic briefings, market reports, and strategic corporate analyses."
    }
  },
  '/contact': {
    title: 'تواصل مع نيكست هوم | تطوير الأعمال في الرياض',
    desc: 'تواصل مع المكتب التنفيذي لشركة نيكست هوم بالرياض لبدء مناقشة استراتيجية مخصصة لفرص التوسع والتطوير لشركتكم.',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://nexthome-group.com/contact',
    altHreflang: 'https://nexthome-group.com/en/contact',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "تواصل مع المكتب التنفيذي | نيكست هوم",
      "url": "https://nexthome-group.com/contact",
      "mainEntity": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "telephone": "+966583444811",
        "email": "info@nexthome-group.com"
      }
    }
  },
  '/en/contact': {
    title: 'Contact NEXT HOME Saudi Arabia',
    desc: 'Initiate a private corporate dialogue with the executive office of NEXT HOME in Riyadh for tailored Saudi market scaling.',
    lang: 'en',
    dir: 'ltr',
    canonical: 'https://nexthome-group.com/en/contact',
    altHreflang: 'https://nexthome-group.com/contact',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Executive Office | NEXT HOME",
      "url": "https://nexthome-group.com/en/contact",
      "mainEntity": {
        "@type": "Corporation",
        "name": "NEXT HOME",
        "telephone": "+966583444811",
        "email": "info@nexthome-group.com"
      }
    }
  }
};

async function prerender() {
  console.log('Starting static HTML build-time prerendering pipeline...');

  // Ensure dist folder exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('Error: dist directory does not exist! Run vite build first.');
    process.exit(1);
  }

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('Error: dist/index.html does not exist!');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  // Loop through each route and create its static index.html file
  for (const [route, meta] of Object.entries(routes)) {
    // Determine output file path
    let outputDir = DIST_DIR;
    let outputPath;

    if (route === '/') {
      outputPath = baseHtmlPath; // Main index.html
    } else {
      // e.g. route = '/about' -> folder is 'dist/about', file is 'dist/about/index.html'
      outputDir = path.join(DIST_DIR, route);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      outputPath = path.join(outputDir, 'index.html');
    }

    // Customize base HTML for this specific crawlable route
    let customizedHtml = baseHtml;

    // 1. Replace <title>
    customizedHtml = customizedHtml.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

    // 2. Set <html lang="..."> and dir
    customizedHtml = customizedHtml.replace(/<html\s+([^>]*?)lang=".*?"/i, `<html $1lang="${meta.lang}"`);
    customizedHtml = customizedHtml.replace(/<html\s+([^>]*?)dir=".*?"/i, `<html $1dir="${meta.dir}"`);

    // 3. Inject page-specific metadata (Meta Description, Canonical, Hreflang)
    const seoTags = `
    <meta name="description" content="${meta.desc}" />
    <link rel="canonical" href="${meta.canonical}" />
    <link rel="alternate" hreflang="${meta.lang}" href="${meta.canonical}" />
    <link rel="alternate" hreflang="${meta.lang === 'ar' ? 'en' : 'ar'}" href="${meta.altHreflang}" />
    <link rel="alternate" hreflang="x-default" href="https://nexthome-group.com/" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.desc}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.desc}" />
    <script type="application/ld+json">
    ${JSON.stringify(meta.schema, null, 2)}
    </script>
    `;

    // Inject before </head>
    customizedHtml = customizedHtml.replace('</head>', `${seoTags}\n</head>`);

    // Write file
    fs.writeFileSync(outputPath, customizedHtml, 'utf8');
    console.log(`Prerendered crawlable page: ${route} -> ${outputPath}`);
  }

  // 4. Generate 404.html with noindex
  const error404Dir = DIST_DIR;
  const outputPath404 = path.join(error404Dir, '404.html');
  let html404 = baseHtml;
  html404 = html404.replace(/<title>.*?<\/title>/i, '<title>الصفحة غير موجودة | Page Not Found</title>');
  const noindexTags = `
  <meta name="robots" content="noindex, nofollow" />
  `;
  html404 = html404.replace('</head>', `${noindexTags}\n</head>`);
  fs.writeFileSync(outputPath404, html404, 'utf8');
  console.log(`Generated user-facing index-blocked 404: 404.html -> ${outputPath404}`);

  // 5. Generate bidirectionally mapped sitemap.xml
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  const now = new Date().toISOString().split('T')[0];
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  for (const [route, meta] of Object.entries(routes)) {
    const isHome = route === '/' || route === '/en/';
    const priority = isHome ? '1.0' : route.includes('/services/') ? '0.8' : '0.6';
    const changefreq = isHome ? 'daily' : 'weekly';

    sitemapXml += `  <url>
    <loc>${meta.canonical}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="${meta.lang}" href="${meta.canonical}"/>
    <xhtml:link rel="alternate" hreflang="${meta.lang === 'ar' ? 'en' : 'ar'}" href="${meta.altHreflang}"/>
  </url>\n`;
  }

  sitemapXml += `</urlset>`;
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`Generated bidirectionally mapped sitemap.xml: sitemap.xml -> ${sitemapPath}`);

  // 6. Generate robots.txt
  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://nexthome-group.com/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log(`Generated robots.txt: robots.txt -> ${robotsPath}`);

  console.log('Prerendering pipeline successfully completed!');
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
