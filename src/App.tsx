import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { translations } from './translations';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';

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

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Saudi corporate defaults elegantly to Arabic
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

  // Update document metadata and HTML attributes on language toggle
  useEffect(() => {
    document.title = lang === 'ar' 
      ? "NEXT HOME | تطوير الأعمال ودخول السوق السعودي" 
      : "NEXT HOME | Business Development & Saudi Market Entry";
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Track currently active section on scroll
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

  // Helper to switch language
  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
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
        // Safe developer fallback: if Supabase variables aren't defined yet, simulate save so the preview is fully functional.
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
      
      // Save form submission into 'consultation_requests' table
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

      // Securely trigger the email notification via Supabase Edge Functions.
      // If the email service fails, the form submission remains successfully stored without blocking the user.
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

  return (
    <div className="min-h-screen bg-white text-text-primary selection:bg-saudi selection:text-white transition-all duration-300 overflow-x-hidden font-sans" id="nexthome-spa-root">
      
      {/* 1 & 2. Floating Header & Responsive Mobile Navigation Drawers */}
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
        
        {/* 3. Luxury daylight hero banner & custom background */}
        <HeroSection 
          lang={lang} 
          currentTrans={currentTrans} 
        />

        {/* 4. Strategic real estate metrics strip */}
        <MetricsStrip 
          currentTrans={currentTrans} 
        />

        {/* 5. Business areas grid / pillars expansion drawer */}
        <BusinessAreasSection
          lang={lang}
          currentTrans={currentTrans}
          selectedPillar={selectedPillar}
          setSelectedPillar={setSelectedPillar}
        />

        {/* 6. Corporate vision about layout */}
        <AboutSection 
          lang={lang} 
          currentTrans={currentTrans} 
        />

        {/* 7. Methodology Strategy timeline */}
        <StrategyTimelineSection 
          currentTrans={currentTrans} 
          lang={lang}
        />

        {/* 8. Regional access coverage SVG Map & Network Footprint */}
        <MarketFootprintSection 
          lang={lang} 
          currentTrans={currentTrans} 
        />

        {/* 9. Visionary dark green strategic quote block */}
        <StrategicQuoteSection 
          currentTrans={currentTrans} 
        />

        {/* 10. Descriptors on partnerships */}
        <WhyPartnerSection 
          currentTrans={currentTrans} 
          lang={lang}
        />

        {/* 11. General Manager corporate card */}
        <LeadershipSection 
          lang={lang} 
          currentTrans={currentTrans} 
        />

        {/* 12. Consultation form & contact cards */}
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

        {/* 13. briefings, insights & articles reader modal */}
        <InsightsSection
          lang={lang}
          currentTrans={currentTrans}
          activeArticleIdx={activeArticleIdx}
          setActiveArticleIdx={setActiveArticleIdx}
        />

      </main>

      {/* 14. Grand Finale corporate footer info */}
      <Footer 
        lang={lang} 
        currentTrans={currentTrans} 
      />

    </div>
  );
}
