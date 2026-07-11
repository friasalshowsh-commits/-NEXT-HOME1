import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { translations } from './translations';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Modular Layouts & Sections
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { MetricsStrip } from './components/sections/MetricsStrip';
import { BusinessAreasSection } from './components/sections/BusinessAreasSection';
import { AboutSection } from './components/sections/AboutSection';
import { StrategyTimelineSection } from './components/sections/StrategyTimelineSection';
import { MarketFootprintSection } from './components/sections/MarketFootprintSection';
import { StrategicQuoteSection } from './components/sections/StrategicQuoteSection';
import { WhyPartnerSection } from './components/sections/WhyPartnerSection';
import { LeadershipSection } from './components/sections/LeadershipSection';
import { ContactSection } from './components/sections/ContactSection';
import { InsightsSection } from './components/sections/InsightsSection';

// Sub-page components
import { ServiceDetail } from './components/sections/ServiceDetail';
import { AboutPageDetail } from './components/sections/AboutPageDetail';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Custom contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Selected business pillar for details modal
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  // Selected article index for detailed news modal
  const [activeArticleIdx, setActiveArticleIdx] = useState<number | null>(null);

  // Calculate active language from the route path directly
  const lang = currentPath.startsWith('/en') ? 'en' : 'ar';

  // Handle popstate and click events for responsive routing in SPA
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept local anchor clicks for frictionless SPA routing with crawlable links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        try {
          const url = new URL(anchor.href);
          if (url.origin === window.location.origin) {
            // Hash scroll jumps on the same page are handled naturally by browser or our custom layout hook
            if (url.pathname === window.location.pathname && url.hash) {
              return;
            }
            
            e.preventDefault();
            window.history.pushState(null, '', anchor.href);
            setCurrentPath(window.location.pathname);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        } catch (err) {
          console.error("Link navigation interception exception:", err);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Scroll effect for translucent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamically update document title and description
  useEffect(() => {
    const isEnglish = currentPath.startsWith('/en');
    const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' && currentPath !== '/en/'
      ? currentPath.slice(0, -1)
      : currentPath;

    let title = "NEXT HOME | نيكست هوم";
    let desc = "تطوير الأعمال والنمو التجاري في السعودية";
    let canonical = `https://nexthome-group.com${currentPath}`;

    if (normalizedPath === '/' || normalizedPath === '/en' || normalizedPath === '/en/') {
      if (isEnglish) {
        title = "NEXT HOME Saudi Arabia | Business Development & Market Entry";
        desc = "NEXT HOME is a Saudi business development company in Riyadh specializing in Saudi market entry, commercial growth, strategic partnerships, marketing, and sales development.";
        canonical = "https://nexthome-group.com/en/";
      } else {
        title = "نيكست هوم | تطوير الأعمال ودخول السوق السعودي";
        desc = "نيكست هوم شركة سعودية في الرياض متخصصة في تطوير الأعمال، دخول السوق السعودي، النمو التجاري، بناء الشراكات، وتطوير التسويق والمبيعات.";
        canonical = "https://nexthome-group.com/";
      }
    } else if (normalizedPath === '/about' || normalizedPath === '/en/about') {
      if (isEnglish) {
        title = "About NEXT HOME Saudi Arabia";
        desc = "Learn about NEXT HOME Saudi Arabia in Riyadh, our corporate identity, values, and leadership team in business development and strategic partnerships.";
        canonical = "https://nexthome-group.com/en/about";
      } else {
        title = "عن شركة نيكست هوم السعودية | NEXT HOME";
        desc = "تعرف على شركة نيكست هوم السعودية بالرياض؛ ريادتنا وقيمنا المؤسسية في تطوير الأعمال والتمثيل التجاري وبناء التحالفات والنمو التجاري المستدام.";
        canonical = "https://nexthome-group.com/about";
      }
    } else if (normalizedPath === '/services/business-development-saudi-arabia' || normalizedPath === '/en/services/business-development-saudi-arabia') {
      if (isEnglish) {
        title = "Business Development in Saudi Arabia | NEXT HOME";
        desc = "We design resilient commercial growth models and custom business development strategies suited to the Saudi corporate market.";
        canonical = "https://nexthome-group.com/en/services/business-development-saudi-arabia";
      } else {
        title = "تطوير الأعمال في السعودية | نيكست هوم";
        desc = "نصمم نماذج نمو مرنة ونوفر حلول تطوير مخصصة لمسارات التوسع والاستثمار التجاري داخل قطاع الأعمال السعودي.";
        canonical = "https://nexthome-group.com/services/business-development-saudi-arabia";
      }
    } else if (normalizedPath === '/services/saudi-market-entry' || normalizedPath === '/en/services/saudi-market-entry') {
      if (isEnglish) {
        title = "Saudi Market Entry Consulting | NEXT HOME";
        desc = "End-to-end regulatory navigation, licensing, and brand localization strategies for international businesses entering Saudi Arabia.";
        canonical = "https://nexthome-group.com/en/services/saudi-market-entry";
      } else {
        title = "دخول السوق السعودي وتطوير التوسع | نيكست هوم";
        desc = "توجيه تنظيمي وتشغيلي متكامل لتمهيد وتأسيس وتوطين الكيانات الاستثمارية والعلامات التجارية الكبرى في المملكة.";
        canonical = "https://nexthome-group.com/services/saudi-market-entry";
      }
    } else if (normalizedPath === '/services/strategic-partnerships' || normalizedPath === '/en/services/strategic-partnerships') {
      if (isEnglish) {
        title = "Strategic Partnerships in Saudi Arabia | NEXT HOME";
        desc = "Structuring high-trust alliances, elite matchmaking, and joint ventures with institutional players inside Saudi Arabia.";
        canonical = "https://nexthome-group.com/en/services/strategic-partnerships";
      } else {
        title = "بناء الشراكات الاستراتيجية في السعودية | نيكست هوم";
        desc = "تأسيس تحالفات نخبوية وهيكلة شركات مشتركة (JVs) مع شركاء ومؤسسات استثمارية فاعلة داخل المملكة.";
        canonical = "https://nexthome-group.com/services/strategic-partnerships";
      }
    } else if (normalizedPath === '/services/marketing-sales-development' || normalizedPath === '/en/services/marketing-sales-development') {
      if (isEnglish) {
        title = "Marketing and Sales Development Saudi Arabia | NEXT HOME";
        desc = "Custom brand positioning, marketing localization, and distribution channel architecture to maximize sales performance inside the Kingdom.";
        canonical = "https://nexthome-group.com/en/services/marketing-sales-development";
      } else {
        title = "تطوير التسويق والمبيعات في السعودية | نيكست هوم";
        desc = "صياغة التموضع التجاري المناسب وبناء قنوات المبيعات ورحلات العملاء لزيادة مستويات الطلب وتأصيل العلامات تجارياً.";
        canonical = "https://nexthome-group.com/services/marketing-sales-development";
      }
    } else if (normalizedPath === '/insights' || normalizedPath === '/en/insights') {
      if (isEnglish) {
        title = "Economic Insights & Market Briefings | NEXT HOME";
        desc = "Periodic economic briefings, market reports, and strategic corporate analyses from the advisory division of NEXT HOME.";
        canonical = "https://nexthome-group.com/en/insights";
      } else {
        title = "الرؤى والتحليلات الاقتصادية | نيكست هوم";
        desc = "تقارير دورية ودراسات بيانية لواقع الحركة التجارية والفرص الاستثمارية بسوق الرياض والمملكة العربية السعودية.";
        canonical = "https://nexthome-group.com/insights";
      }
    } else if (normalizedPath === '/contact' || normalizedPath === '/en/contact') {
      if (isEnglish) {
        title = "Contact NEXT HOME Saudi Arabia";
        desc = "Initiate a private corporate dialogue with the executive office of NEXT HOME in Riyadh for tailored Saudi market scaling.";
        canonical = "https://nexthome-group.com/en/contact";
      } else {
        title = "تواصل مع نيكست هوم | تطوير الأعمال في الرياض";
        desc = "تواصل مع المكتب التنفيذي لشركة نيكست هوم بالرياض لبدء مناقشة استراتيجية مخصصة لفرص التوسع والتطوير لشركتكم.";
        canonical = "https://nexthome-group.com/contact";
      }
    } else {
      title = "الصفحة غير موجودة | Page Not Found";
      desc = "عذراً، الصفحة المطلوبة غير موجودة. Sorry, the requested page was not found.";
      canonical = `https://nexthome-group.com${currentPath}`;
    }

    // Apply metadata updates safely on hydration and route transitions
    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Securely handle 404 indexing rules (noindex)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    const is404 = !(
      normalizedPath === '/' || normalizedPath === '/en' || normalizedPath === '/en/' ||
      normalizedPath === '/about' || normalizedPath === '/en/about' ||
      normalizedPath === '/services/business-development-saudi-arabia' || normalizedPath === '/en/services/business-development-saudi-arabia' ||
      normalizedPath === '/services/saudi-market-entry' || normalizedPath === '/en/services/saudi-market-entry' ||
      normalizedPath === '/services/strategic-partnerships' || normalizedPath === '/en/services/strategic-partnerships' ||
      normalizedPath === '/services/marketing-sales-development' || normalizedPath === '/en/services/marketing-sales-development' ||
      normalizedPath === '/insights' || normalizedPath === '/en/insights' ||
      normalizedPath === '/contact' || normalizedPath === '/en/contact'
    );
    if (is404) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      metaRobots.setAttribute('content', 'index, follow');
    }

    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
    document.documentElement.lang = isEnglish ? 'en' : 'ar';
  }, [currentPath]);

  // Deep-linked hash scroll handler
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [currentPath]);

  // Track currently active section on scroll for homepage navigation indicators
  useEffect(() => {
    const handleIntersection = () => {
      const sections = ['home', 'about', 'services', 'strategy', 'footprint', 'insights'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleIntersection, { passive: true });
    return () => window.removeEventListener('scroll', handleIntersection);
  }, []);

  // Sync state reference to active translations dictionary
  const currentTrans = translations[lang];

  // Helper to switch language smoothly in SPA and keep search engine URLs in sync
  const toggleLanguage = () => {
    let nextPath = '/';
    if (currentPath.startsWith('/en')) {
      const subPath = currentPath.substring(3);
      nextPath = subPath.startsWith('/') ? subPath : '/' + subPath;
    } else {
      nextPath = '/en' + (currentPath === '/' ? '/' : currentPath);
    }
    window.history.pushState(null, '', nextPath);
    setCurrentPath(nextPath);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitContactForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!isSupabaseConfigured()) {
        console.warn("Supabase credentials are not filled yet in your environment. Simulating a mock submission delay.");
        await new Promise((resolve) => setTimeout(resolve, 800));
        setFormSubmitted(true);
        setFormData({
          fullName: '',
          company: '',
          email: '',
          phone: '',
          message: ''
        });
        return;
      }

      const supabaseClient = getSupabase();
      
      const { error } = await supabaseClient
        .from('consultation_requests')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          status: 'new'
        });

      if (error) {
        throw error;
      }

      try {
        const { data: invokeData, error: invokeError } = await supabaseClient.functions.invoke('send-consultation-notification', {
          body: {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        });

        if (invokeError) {
          console.error("Supabase Edge Function returned error:", invokeError);
        } else {
          console.log("Supabase Edge Function successfully invoked:", invokeData);
        }
      } catch (emailNotificationErr) {
        console.error("Non-blocking error dispatching Resend email notification via Edge Function:", emailNotificationErr);
      }

      setFormSubmitted(true);
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setSubmitError(
        lang === 'ar' 
          ? "تعذر إرسال الطلب، يرجى المحاولة مرة أخرى." 
          : "Unable to submit inquiry, please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' && currentPath !== '/en/'
      ? currentPath.slice(0, -1)
      : currentPath;

    // Homepage Check
    if (normalizedPath === '/' || normalizedPath === '/en' || normalizedPath === '/en/') {
      return (
        <>
          {/* Hero section */}
          <HeroSection 
            lang={lang} 
            currentTrans={currentTrans} 
          />

          {/* Metrics strip */}
          <MetricsStrip 
            currentTrans={currentTrans} 
          />

          {/* Business areas section */}
          <BusinessAreasSection
            lang={lang}
            currentTrans={currentTrans}
            selectedPillar={selectedPillar}
            setSelectedPillar={setSelectedPillar}
          />

          {/* About overview */}
          <AboutSection 
            lang={lang} 
            currentTrans={currentTrans} 
          />

          {/* Strategy timeline */}
          <StrategyTimelineSection 
            currentTrans={currentTrans} 
            lang={lang}
          />

          {/* Coverage map / Footprint */}
          <MarketFootprintSection 
            lang={lang} 
            currentTrans={currentTrans} 
          />

          {/* Core quote banner */}
          <StrategicQuoteSection 
            currentTrans={currentTrans} 
          />

          {/* Value propositions */}
          <WhyPartnerSection 
            currentTrans={currentTrans} 
            lang={lang}
          />

          {/* GM profile */}
          <LeadershipSection 
            lang={lang} 
            currentTrans={currentTrans} 
          />

          {/* Consultation form */}
          <ContactSection
            lang={lang}
            currentTrans={currentTrans}
            formData={formData}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
            isSubmitting={isSubmitting}
            submitError={submitError}
            handleFormChange={handleFormChange}
            submitContactForm={submitContactForm}
          />

          {/* Insights / Briefings block */}
          <InsightsSection
            lang={lang}
            currentTrans={currentTrans}
            activeArticleIdx={activeArticleIdx}
            setActiveArticleIdx={setActiveArticleIdx}
          />
        </>
      );
    }

    // Corporate About Page Check
    if (normalizedPath === '/about' || normalizedPath === '/en/about') {
      return <AboutPageDetail lang={lang} currentTrans={currentTrans} />;
    }

    // Service detail views (Crawlable routes mapping)
    if (normalizedPath === '/services/business-development-saudi-arabia' || normalizedPath === '/en/services/business-development-saudi-arabia') {
      return (
        <ServiceDetail
          serviceId="business-development"
          lang={lang}
          currentTrans={currentTrans}
          formData={formData}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          isSubmitting={isSubmitting}
          submitError={submitError}
          handleFormChange={handleFormChange}
          submitContactForm={submitContactForm}
        />
      );
    }
    if (normalizedPath === '/services/saudi-market-entry' || normalizedPath === '/en/services/saudi-market-entry') {
      return (
        <ServiceDetail
          serviceId="market-entry"
          lang={lang}
          currentTrans={currentTrans}
          formData={formData}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          isSubmitting={isSubmitting}
          submitError={submitError}
          handleFormChange={handleFormChange}
          submitContactForm={submitContactForm}
        />
      );
    }
    if (normalizedPath === '/services/strategic-partnerships' || normalizedPath === '/en/services/strategic-partnerships') {
      return (
        <ServiceDetail
          serviceId="partnerships"
          lang={lang}
          currentTrans={currentTrans}
          formData={formData}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          isSubmitting={isSubmitting}
          submitError={submitError}
          handleFormChange={handleFormChange}
          submitContactForm={submitContactForm}
        />
      );
    }
    if (normalizedPath === '/services/marketing-sales-development' || normalizedPath === '/en/services/marketing-sales-development') {
      return (
        <ServiceDetail
          serviceId="marketing-sales"
          lang={lang}
          currentTrans={currentTrans}
          formData={formData}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
          isSubmitting={isSubmitting}
          submitError={submitError}
          handleFormChange={handleFormChange}
          submitContactForm={submitContactForm}
        />
      );
    }

    // Dedicated Insights Reader Page
    if (normalizedPath === '/insights' || normalizedPath === '/en/insights') {
      return (
        <div className="bg-white min-h-screen pt-[120px] pb-16" id="insights-page-container">
          <section className="relative bg-[#EEF4F0] border-b border-[#DCE5E0]/50 py-12 sm:py-16 overflow-hidden mb-12" id="insights-page-hero">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#07583f05_1px,transparent_1px),linear-gradient(to_bottom,#07583f05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
              <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-2">
                {currentTrans.insightsSec.tagline}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                {currentTrans.insightsSec.title}
              </h1>
              <p className="text-text-secondary text-sm sm:text-base max-w-xl mt-3 font-normal leading-relaxed">
                {currentTrans.insightsSec.subtitle}
              </p>
            </div>
          </section>

          <InsightsSection
            lang={lang}
            currentTrans={currentTrans}
            activeArticleIdx={activeArticleIdx}
            setActiveArticleIdx={setActiveArticleIdx}
          />
        </div>
      );
    }

    // Dedicated Contact Consultation Page
    if (normalizedPath === '/contact' || normalizedPath === '/en/contact') {
      return (
        <div className="bg-white min-h-screen pt-[120px] pb-12 sm:pb-16" id="contact-page-container">
          <ContactSection
            lang={lang}
            currentTrans={currentTrans}
            formData={formData}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
            isSubmitting={isSubmitting}
            submitError={submitError}
            handleFormChange={handleFormChange}
            submitContactForm={submitContactForm}
          />
        </div>
      );
    }

    // Proper User-Facing 404 (with index blocking)
    return (
      <div className="min-h-screen bg-white pt-[140px] pb-24 flex items-center justify-center text-center px-4" id="error-404-container">
        <div className="max-w-md space-y-6">
          <span className="text-saudi text-6xl font-black font-mono select-none" id="error-404-code">404</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight" id="error-404-title">
            {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed" id="error-404-desc">
            {lang === 'ar' 
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.' 
              : 'The page you are looking for does not exist or has been moved.'}
          </p>
          <div className="pt-4" id="error-404-cta">
            <a 
              href={lang === 'ar' ? '/' : '/en/'}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-saudi text-white px-6 py-3 rounded-xl hover:bg-saudi-dark transition-all shadow-md"
              id="error-404-home-link"
            >
              {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Homepage'}</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-text-primary selection:bg-saudi selection:text-white transition-all duration-300 overflow-x-hidden font-sans" id="nexthome-spa-root">
      
      {/* Translucent Header and Responsive Mobile Drawers */}
      <Header
        lang={lang}
        activeSection={activeSection}
        currentTrans={currentTrans}
        isMenuOpen={isMenuOpen}
        scrolled={scrolled}
        setIsMenuOpen={setIsMenuOpen}
        toggleLanguage={toggleLanguage}
      />

      <main id="main-content">
        {renderContent()}
      </main>

      {/* Grand Finale corporate footer info */}
      <Footer 
        lang={lang} 
        currentTrans={currentTrans} 
      />

    </div>
  );
}
