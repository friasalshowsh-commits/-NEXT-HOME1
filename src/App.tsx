import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Menu, 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  Shield, 
  Building,
  TrendingUp,
  Handshake,
  Workflow,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Award,
  Clock,
  BookOpen,
  Send
} from 'lucide-react';
import { translations } from './translations';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';
import { SaudiCoverageMap } from './components/SaudiCoverageMap';

// Premium interactive assets
import heroSkyline from './assets/images/riyadh-daylight-hero.webp';
import aboutMeeting from './assets/images/saudi_meeting_daylight_1781616906235.jpg';
import generalManagerPortrait from './assets/images/general_manager_1781011186311.png';
import riyadhFootprint from './assets/images/riyadh_saudi_vertical_1780862353837.png';
import jeddahFootprint from './assets/images/jeddah_saudi_vertical_1780862368910.png';
import dammamFootprint from './assets/images/dammam_saudi_vertical_1780862382331.png';
import khobarFootprint from './assets/images/khobar_saudi_vertical_1780862398190.png';
import whyPartnerImage from './assets/images/saudi_partnership_meeting_1781617563735.jpg';

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

  // Selected article for details modal
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.title = "NEXT HOME Group | نيكست هوم";
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
    
    window.addEventListener('scroll', handleIntersection);
    return () => window.removeEventListener('scroll', handleIntersection);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const currentTrans = translations[lang];

  // Helper to switch language
  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    // Persist or update document direction for native rendering
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
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

  // Maps icon classes dynamically to preserve luxury look
  const getPillarIcon = (id: string) => {
    const baseClass = "w-6 h-6 text-saudi group-hover:text-saudi-dark transition-colors duration-300";
    switch (id) {
      case 'bus-dev': return <TrendingUp className={baseClass} />;
      case 'partnerships': return <Handshake className={baseClass} />;
      case 'market-entry': return <Globe className={baseClass} />;
      case 'marketing-expansion': return <Workflow className={baseClass} />;
      case 'real-estate': return <Building className={baseClass} />;
      case 'commercial-rep': return <Shield className={baseClass} />;
      default: return <Workflow className={baseClass} />;
    }
  };

  return (
    <div className={`min-h-screen bg-white text-text-primary selection:bg-saudi selection:text-white transition-all duration-300 overflow-x-hidden ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. TRANSLUCENT & FIXED FLOATING NAVIGATION BAR OVER THE GRAPHIC HERO */}
      <header
        id="header-nav"
        className={`fixed inset-x-0 top-0 z-50 h-[62px] lg:h-[70px] transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#DCE5E0] bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-b border-white/20 bg-transparent backdrop-blur-[2px]'
        }`}
      >
        <div className="mx-auto grid grid-cols-[auto_1fr_auto] h-full w-full max-w-[1540px] items-center px-6 lg:px-10 xl:px-14">
          
          {/* Column 1: Executive Logo */}
          <div className="flex items-center justify-start">
            <a href="#" className="flex flex-col text-right rtl:text-right ltr:text-left focus:outline-none select-none group">
              <span className="font-sans text-[24px] lg:text-[26px] font-bold tracking-wider text-[#07583F] uppercase leading-none">
                NEXT HOME
              </span>
              <span className="text-[11px] lg:text-[12px] tracking-[0.05em] text-[#07583F] uppercase mt-1 font-semibold">
                {lang === 'ar' ? 'مجموعة الأعمال' : 'BUSINESS GROUP'}
              </span>
            </a>
          </div>

          {/* Column 2: Centered Web Navigation Links */}
          <div className="hidden lg:flex justify-center items-center gap-6 xl:gap-8">
            <a 
              href="#home" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'home' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a 
              href="#about" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'about' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
            >
              {currentTrans.nav.about}
            </a>
            <a 
              href="#services" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'services' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
            >
              {currentTrans.nav.services}
            </a>
            <a 
              href="#strategy" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'strategy' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
            >
              {currentTrans.nav.strategy}
            </a>
            <a 
              href="#footprint" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'footprint' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
            >
              {currentTrans.nav.footprint}
            </a>
            <a 
              href="#insights" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'insights' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
            >
              {currentTrans.nav.insights}
            </a>
          </div>

          {/* Column 3: Global Actions Area */}
          <div className="flex items-center justify-end gap-3 lg:gap-4 select-none">
            {/* Minimalist Globe Language Button */}
            <button 
              onClick={toggleLanguage}
              className="text-sm font-bold text-[#07583F] hover:text-[#064632] hover:bg-[#07583F]/5 transition-all h-[44px] px-4 rounded-lg border border-[#DCE5E0]/60 bg-transparent cursor-pointer flex items-center gap-2 focus:outline-none"
            >
              <Globe className="w-4 h-4 text-[#07583F]" />
              <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* Prominent Saudi Green Action Button */}
            <a 
              href="#contact"
              className="hidden lg:flex text-sm font-bold bg-[#006241] hover:bg-[#004f34] text-white h-[44px] items-center px-6 rounded-lg transition-all"
            >
              <span>{currentTrans.nav.contact}</span>
            </a>

            {/* Mobile Drawer Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#07583F] hover:text-[#064632] focus:outline-none cursor-pointer"
              aria-label={currentTrans.nav.toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[62px] left-0 right-0 z-40 bg-white border-b border-border-light shadow-lg block lg:hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-4 max-w-lg mx-auto font-sans">
              <a 
                href="#services" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-text-primary hover:text-[#07583F] transition-colors py-2.5 block border-b border-[#F7F8F5] font-semibold"
              >
                {currentTrans.nav.services}
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-text-primary hover:text-[#07583F] transition-colors py-2.5 block border-b border-[#F7F8F5] font-semibold"
              >
                {currentTrans.nav.about}
              </a>
              <a 
                href="#strategy" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-text-primary hover:text-[#07583F] transition-colors py-2.5 block border-b border-[#F7F8F5] font-semibold"
              >
                {currentTrans.nav.strategy}
              </a>
              <a 
                href="#footprint" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-text-primary hover:text-[#07583F] transition-colors py-2.5 block border-b border-[#F7F8F5] font-semibold"
              >
                {currentTrans.nav.footprint}
              </a>
              <a 
                href="#insights" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-text-primary hover:text-[#07583F] transition-colors py-2.5 block border-b border-[#F7F8F5] font-semibold"
              >
                {currentTrans.nav.insights}
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-[#07583F] hover:text-[#064632] transition-colors py-4 block font-bold"
              >
                {currentTrans.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC HERO SECTION WITH RIYADH SKYLINE */}
      <section 
        id="home" 
        className="relative min-h-[760px] overflow-hidden"
      >
        {/* Absolute Riyadh Skyline Background */}
        <img 
          src={heroSkyline} 
          alt={currentTrans.hero.imageAlt || "Riyadh daylight skyline"} 
          className="absolute inset-0 h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic visual gradients to isolate & read text safely */}
        <div className={`absolute inset-0 z-10 transition-all duration-300 ${
          lang === 'ar' 
            ? 'bg-gradient-to-t from-white/98 via-white/85 to-white/40 lg:bg-gradient-to-l lg:from-white/96 lg:via-white/55 lg:via-[35%] lg:to-transparent lg:to-[68%]' 
            : 'bg-gradient-to-t from-white/98 via-white/85 to-white/40 lg:bg-gradient-to-r lg:from-white/96 lg:via-white/55 lg:via-[35%] lg:to-transparent lg:to-[68%]'
        }`} />

        {/* Centered responsive container matching top header height limits */}
        <div className="relative z-20 mx-auto flex min-h-[760px] w-full max-w-[1540px] items-center px-6 pt-[70px] lg:px-10 xl:px-14">
          <div className="w-full max-w-[620px] py-12 md:py-20 flex flex-col justify-center space-y-6">
            
            {/* Strategic growth tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/85 border border-[#BFD5CA] backdrop-blur-sm text-[#07583F] text-xs font-bold rounded-lg uppercase tracking-wider self-start shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#07583F] shrink-0" />
              <span>{currentTrans.hero.badge}</span>
            </div>

            {/* Corporate Display Title */}
            <h1 className="text-[38px] md:text-[54px] lg:text-[64px] font-bold leading-[1.15] tracking-tight">
              {lang === 'ar' ? (
                <>
                  <span className="block text-[#151B18]">نبني فرص النمو</span>
                  <span className="block text-[#07583F] mt-1">في السوق السعودي</span>
                </>
              ) : (
                <>
                  <span className="block text-[#151B18]">Building Growth Opportunities</span>
                  <span className="block text-[#07583F] mt-1">in the Saudi Market</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-[18px] md:text-[20px] text-[#626B66] leading-relaxed font-normal max-w-[600px]">
              {currentTrans.hero.paragraph}
            </p>

            {/* Dual CTA Button Controllers - Spaced exactly ~14-16px */}
            <div className="flex flex-wrap gap-[14px] items-center pt-2">
              <a 
                href="#services" 
                className="group inline-flex items-center justify-center gap-2.5 px-[30px] h-[52px] bg-[#07583F] hover:bg-[#064632] text-white rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none"
              >
                <span>{currentTrans.hero.cta_services}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </a>

              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2.5 px-[30px] h-[52px] bg-white/80 hover:bg-white text-[#07583F] border border-[#07583F] rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none backdrop-blur-sm"
              >
                <span>{currentTrans.hero.cta_contact}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* PREMIUM METRICS STRIP - STATS BAR */}
      <div id="hero-metrics-strip" className="relative z-30 bg-[#F8F9F6] border-y border-border-light py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 lg:divide-x lg:divide-border-light rtl:lg:divide-x-reverse items-center">
            
            {/* Metric 1 */}
            <div className="flex items-center gap-4 px-2 lg:px-6">
              <div className="p-2 sm:p-2.5 bg-saudi-light text-saudi rounded-lg shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xl sm:text-2xl font-black text-saudi leading-none">
                  {currentTrans.stats.experienceVal}
                </span>
                <span className="block text-[11px] sm:text-xs text-text-secondary leading-snug">
                  {currentTrans.stats.experienceLabel}
                </span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4 px-2 lg:px-6">
              <div className="p-2 sm:p-2.5 bg-saudi-light text-saudi rounded-lg shrink-0">
                <Handshake className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xl sm:text-2xl font-black text-saudi leading-none">
                  {currentTrans.stats.partnersVal}
                </span>
                <span className="block text-[11px] sm:text-xs text-text-secondary leading-snug">
                  {currentTrans.stats.partnersLabel}
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-4 px-2 lg:px-6">
              <div className="p-2 sm:p-2.5 bg-saudi-light text-saudi rounded-lg shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xl sm:text-2xl font-black text-saudi leading-none">
                  {currentTrans.stats.sectorsVal}
                </span>
                <span className="block text-[11px] sm:text-xs text-text-secondary leading-snug">
                  {currentTrans.stats.sectorsLabel}
                </span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-4 px-2 lg:px-6">
              <div className="p-2 sm:p-2.5 bg-saudi-light text-saudi rounded-lg shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-xl sm:text-2xl font-black text-saudi leading-none">
                  {currentTrans.stats.presenceVal}
                </span>
                <span className="block text-[11px] sm:text-xs text-text-secondary leading-snug">
                  {currentTrans.stats.presenceLabel}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. BUSINESS AREAS SECTION WITH DETAILED EXPLORATION CARDS */}
      <section id="services" className="relative z-20 py-24 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-3">
              {currentTrans.businessAreas.sectionBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-text-primary tracking-tight font-extrabold mb-6">
              {currentTrans.businessAreas.title}
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {currentTrans.businessAreas.subtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTrans.businessAreas.items.map((area, index) => {
              const isSelected = selectedPillar === area.id;
              
              return (
                <motion.div 
                  key={area.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`group relative p-8 bg-[#FDFDFD] hover:bg-white border border-border-light hover:border-saudi/30 transition-all duration-500 rounded-lg flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isSelected ? 'ring-1 ring-saudi bg-white shadow-md' : ''
                  }`}
                  onClick={() => setSelectedPillar(isSelected ? null : area.id)}
                >
                  {/* Luxury Shine Gradient Overlay */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-saudi/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  
                  <div>
                    {/* Icon and Number Badge */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-3 bg-saudi-light border border-saudi/10 rounded-lg text-saudi">
                        {getPillarIcon(area.id)}
                      </div>
                      <span className="text-sm text-saudi/40 font-extrabold tracking-widest">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl text-text-primary font-bold mb-4 group-hover:text-saudi transition-colors">
                      {area.title}
                    </h3>

                    {/* Description text */}
                    <p className="text-sm text-text-secondary leading-relaxed font-normal mb-6">
                      {area.description}
                    </p>
                  </div>

                  {/* Expand / Details link */}
                  <div className="mt-6 pt-6 border-t border-border-light flex items-center justify-between">
                    <span className="text-[11px] tracking-wider font-semibold text-saudi hover:text-saudi-dark uppercase flex items-center gap-1">
                      {isSelected 
                        ? currentTrans.businessAreas.collapseDetails 
                        : currentTrans.businessAreas.exploreScope}
                    </span>
                    {lang === 'ar' ? (
                      <ChevronRight className={`w-4 h-4 text-saudi shrink-0 transition-transform duration-300 ${isSelected ? 'rotate-90' : 'rotate-185'}`} />
                    ) : (
                      <ChevronRight className={`w-4 h-4 text-saudi shrink-0 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                    )}
                  </div>

                  {/* Expanded Custom Block Details Inside Card */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="p-4 bg-saudi-light/60 border border-saudi/15 rounded-md text-xs space-y-3 mt-2 text-text-primary">
                          {area.id === 'bus-dev' && (
                            <>
                              <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                              <p>• {lang === 'ar' ? 'نماذج جدوى شاملة متوافقة مع مبادرات رؤية السعودية 2030.' : 'Comprehensive feasibility models matching Saudi Vision 2030 initiatives.'}</p>
                              <p>• {lang === 'ar' ? 'صياغة وهندسة المشاريع المشتركة والتفاوض مع كبار الشركاء.' : 'Joint venture configuration and negotiation with major stakeholders.'}</p>
                              <p>• {lang === 'ar' ? 'تهيئة وتصميم نماذج الأعمال لأقصى درجات المرونة في السوق السعودي.' : 'Structuring and streamlining business models for Saudi market agility.'}</p>
                            </>
                          )}
                          {area.id === 'partnerships' && (
                            <>
                              <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                              <p>• {lang === 'ar' ? 'ربط مثالي مع كبار المستثمرين والشركاء التجاريين الملائمين.' : 'Aligning high-net-worth individuals and corporate champions.'}</p>
                              <p>• {lang === 'ar' ? 'صياغة مواثيق التحالف الاستراتيجي الطويل الأجل وأطر الحوكمة.' : 'Drafting long-term alliance charters and secure governance frameworks.'}</p>
                              <p>• {lang === 'ar' ? 'تحقيق تكامل شبكي واسع النطاق لتسريع توليد القيمة المشتركة.' : 'Broad market network integration for accelerated strategic value.'}</p>
                            </>
                          )}
                          {area.id === 'market-entry' && (
                            <>
                              <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                              <p>• {lang === 'ar' ? 'إرشاد تنظيمي متكامل تحت منصات MISA والجهات الحيوية الأخرى.' : 'Complete regulatory navigation under SAGIA, MISA, and industrial zones.'}</p>
                              <p>• {lang === 'ar' ? 'توفيق استباقي للشركاء المحليين لربط قانوني وتجاري متين.' : 'Local partner matchmaking for optimal structural stability.'}</p>
                              <p>• {lang === 'ar' ? 'توطين الخدمات والمنتجات العالمية لملائمة المتطلبات المحلية.' : 'Localizing international offerings to align with Saudi business customs.'}</p>
                            </>
                          )}
                          {area.id === 'marketing-expansion' && (
                            <>
                              <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                              <p>• {lang === 'ar' ? 'بناء الحضور التجاري وترسيخ الحصة السوقية بدقة عالية.' : 'Local brand penetration and commercial positioning.'}</p>
                              <p>• {lang === 'ar' ? 'إدارة العلاقات العامة الراقية وتأصيل الموثوقية المؤسسية.' : 'High-end corporate PR, media relations, and brand authority campaigns.'}</p>
                              <p>• {lang === 'ar' ? 'خطط استقطاب العملاء الكبار وتسهيل الاستحواذ السوقي.' : 'Targeted client acquisition strategies and market share growth.'}</p>
                            </>
                          )}
                          {area.id === 'real-estate' && (
                            <>
                              <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                              <p>• {lang === 'ar' ? 'تطوير الفرص الاستثنائية المغلقة في العاصمة والوجهات التنموية.' : 'Off-market mega opportunity matchmaking in Riyadh and coastal developments.'}</p>
                              <p>• {lang === 'ar' ? 'صياغة دراسات التموضع الاستثماري والتطويري لمشروعات النخبة.' : 'Strategic branding and positioning files for tier-1 development projects.'}</p>
                              <p>• {lang === 'ar' ? 'تأهيل وتوجيه الطلب المؤسسي ومكاتب العائلات التجارية الكبرى.' : 'Qualifying corporate demand, sovereign funds and GCC family offices.'}</p>
                            </>
                          )}
                          {area.id === 'commercial-rep' && (
                            <>
                              <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                              <p>• {lang === 'ar' ? 'تمثيل رسمي كامل للوفود والشركات والوكالات الكبرى.' : 'Official commercial delegation and corporate agency representation.'}</p>
                              <p>• {lang === 'ar' ? 'تجهيز مسارات العمل القانوني والإداري الفعلي وبناء المقرات.' : 'Local operations setup, legal guidance, and executive workspace pathways.'}</p>
                              <p>• {lang === 'ar' ? 'تنسيق متكامل للشؤون العامة والحكومية بسلاسة.' : 'Full-scope advocacy and government affairs coordination.'}</p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. ABOUT COMPANY SECTION (عن الشركة) */}
      <section id="about" className="relative z-20 py-24 sm:py-28 bg-[#FFFFFF] border-y border-[#DCE5E0]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            
            {/* Text Column - Placed first so it renders on Right in RTL Arabic, Left in LTR English, and Top on mobile layout */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF4F0] border border-[#DCE5E0] text-[#07583F] text-xs font-bold rounded-lg uppercase tracking-wider self-start shadow-xs">
                <span>{currentTrans.aboutSection.eyebrow}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl text-[#151B18] font-black leading-tight tracking-tight">
                {currentTrans.aboutSection.title}
              </h2>

              <div className="space-y-4 text-[#626B66] text-sm sm:text-base leading-relaxed font-normal">
                <p>{currentTrans.aboutSection.paragraphs[0]}</p>
                <p>{currentTrans.aboutSection.paragraphs[1]}</p>
              </div>

              {/* Bullet Checklist */}
              <div className="space-y-3 pt-2">
                {currentTrans.aboutSection.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 bg-[#EEF4F0] text-[#07583F] rounded-full mt-0.5 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-[#151B18] font-semibold leading-tight">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#07583F] hover:bg-[#064632] text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 focus:outline-none"
                >
                  <span>{currentTrans.aboutSection.cta}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </a>
              </div>
            </div>

            {/* Image Column - Placed second so it renders on Left in RTL Arabic, Right in LTR English, and Bottom on mobile layout */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#DCE5E0]/60 shadow-xs">
              <img 
                src={aboutMeeting} 
                alt={currentTrans.aboutSection.imageAlt} 
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK (كيف نعمل) - STRATEGIC METHODOLOGY */}
      <section id="strategy" className="relative z-20 py-28 lg:py-32 bg-[#FFFFFF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-20 space-y-3">
            <span className="text-xs font-bold tracking-[0.15em] text-[#07583F] uppercase block">
              {currentTrans.howWeWork.sectionBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#151B18] tracking-tight leading-tight font-black">
              {currentTrans.howWeWork.title}
            </h2>
          </div>

          <div className="relative mt-16 max-w-6xl mx-auto">
            {/* Horizontal timeline connecting line for desktop only */}
            <div className="hidden lg:block absolute top-[36px] left-[12%] right-[12%] h-[1px] bg-[#DCE5E0]" />
            
            {/* Vertical timeline line for mobile only */}
            <div className="lg:hidden absolute top-[28px] bottom-[28px] w-[1px] bg-[#DCE5E0] right-[24px] ltr:right-auto ltr:left-[24px]" />

            {/* Steps Container */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {currentTrans.howWeWork.steps.map((step, idx) => {
                const stepIcons = [TrendingUp, Handshake, Globe, Building];
                const IconComp = stepIcons[idx] || Workflow;
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group relative flex flex-row lg:flex-col items-start lg:items-center text-right ltr:text-left lg:text-center pr-14 lg:pr-0 pl-4 lg:pl-0 ltr:pr-4 ltr:pl-14 ltr:lg:pl-0 ltr:lg:pr-0"
                  >
                    {/* Circle Node on Timeline */}
                    <div className="absolute right-4 lg:right-auto lg:relative top-1 ltr:right-auto ltr:left-4 ltr:lg:left-auto flex items-center justify-center z-20">
                      <div className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] rounded-full border-2 border-[#FFFFFF] bg-[#FFFFFF] flex items-center justify-center group-hover:border-[#07583F] shadow-xs transition-colors duration-300">
                        <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-[#DCE5E0] group-hover:bg-[#07583F] transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Step Content Card Area */}
                    <div className="flex flex-col items-start lg:items-center mt-0 lg:mt-6">
                      {/* Step Number Badge */}
                      <span className="text-xs font-mono font-bold tracking-wider text-[#626B66] group-hover:text-[#07583F] transition-colors duration-300 mb-2">
                        0{idx + 1}
                      </span>

                      {/* Icon Box */}
                      <div className="p-3 bg-[#EEF4F0] border border-[#DCE5E0] rounded-xl text-[#07583F] mb-4 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                        <IconComp className="w-5 h-5 text-[#07583F]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg text-[#151B18] font-bold mb-2 group-hover:text-[#07583F] transition-colors duration-300">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#626B66] leading-relaxed font-normal max-w-[240px]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 6. REGIONAL EXPANSION & FOOTPRINT SECTION */}
      <section id="footprint" className="relative z-20 py-28 lg:py-32 bg-[#F7F8F5] border-t border-b border-[#DCE5E0]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 xl:gap-16 items-center">
            
            {/* Text and Strategic Map Column (Left) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-[0.15em] text-[#07583F] uppercase block">
                  {currentTrans.expansion.sectionBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl text-[#151B18] tracking-tight leading-tight font-black">
                  {currentTrans.expansion.title}
                </h2>
                <div className="h-[2px] w-12 bg-[#07583F]/35" />
              </div>
              
              <p className="text-[#626B66] text-base leading-relaxed font-normal">
                {currentTrans.expansion.paragraph}
              </p>

              {/* Precise honest bullets - headquarters & access indicators */}
              <div className="space-y-3 pt-2">
                {currentTrans.expansion.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 text-right rtl:text-right ltr:text-left">
                    <div className="p-1 bg-[#EEF4F0] text-[#07583F] rounded-full mt-0.5 shrink-0 self-start">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-[#151B18] leading-snug">{bullet.title}</h4>
                      <p className="text-xs text-[#626B66] leading-relaxed font-normal">{bullet.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed high-fidelity interactive SVG Saudi Arabia map */}
              <div className="pt-4 flex justify-center lg:justify-start mx-auto w-full max-w-[520px]">
                <SaudiCoverageMap 
                  lang={lang} 
                  mapAriaLabel={currentTrans.expansion.mapAriaLabel} 
                  mapCaption={currentTrans.expansion.mapCaption} 
                />
              </div>

              <div className="pt-2">
                <a 
                  href="#contact" 
                  className="group inline-flex items-center gap-2.5 px-6 h-[46px] bg-transparent border border-[#07583F] hover:bg-[#07583F] text-[#07583F] hover:text-white rounded-lg text-xs font-bold transition-all duration-300"
                >
                  <span>{currentTrans.expansion.cta}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  )}
                </a>
              </div>
            </div>

            {/* Modern Daylight 2x2 cities network grid - Riyadh is larger */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              
              {/* Card - Riyadh (Headquarters, wider + higher prominence) */}
              <div className="col-span-2 relative overflow-hidden h-[240px] md:h-[280px] rounded-xl border border-[#DCE5E0]/60 group shadow-xs">
                <img 
                  src={riyadhFootprint} 
                  loading="lazy"
                  decoding="async"
                  alt="Riyadh HQ next home" 
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" />
                
                {/* HEADQUARTERS BADGE on Riyadh ONLY */}
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20">
                  <span className="inline-flex px-3 py-1 bg-[#EEF4F0] border border-[#07583F]/25 rounded-md text-[10px] font-bold text-[#07583F] uppercase tracking-wider backdrop-blur-xs shadow-xs">
                    {currentTrans.expansion.hqBadge}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-right rtl:text-right ltr:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EEF4F0] block mb-1">
                    {currentTrans.expansion.cities.riyadhCountry}
                  </span>
                  <h4 className="text-xl text-[#FFFFFF] font-extrabold">{currentTrans.expansion.cities.riyadh}</h4>
                  <p className="text-xs text-[#FFFFFF]/80 font-normal mt-1 leading-relaxed">
                    {currentTrans.expansion.cities.riyadhSub}
                  </p>
                </div>
              </div>

              {/* Card - Jeddah */}
              <div className="col-span-2 md:col-span-1 relative overflow-hidden h-[190px] md:h-[210px] rounded-xl border border-[#DCE5E0]/60 group shadow-xs">
                <img 
                  src={jeddahFootprint} 
                  loading="lazy"
                  decoding="async"
                  alt="Jeddah access region" 
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-right rtl:text-right ltr:text-left">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60 block mb-1">
                    {currentTrans.expansion.cities.jeddahCountry}
                  </span>
                  <h4 className="text-lg text-[#FFFFFF] font-bold">{currentTrans.expansion.cities.jeddah}</h4>
                  <p className="text-[10px] text-[#FFFFFF]/80 font-normal mt-0.5 leading-tight">
                    {currentTrans.expansion.cities.jeddahSub}
                  </p>
                </div>
              </div>

              {/* Card - Dammam */}
              <div className="col-span-2 md:col-span-1 relative overflow-hidden h-[190px] md:h-[210px] rounded-xl border border-[#DCE5E0]/60 group shadow-xs">
                <img 
                  src={dammamFootprint} 
                  loading="lazy"
                  decoding="async"
                  alt="Dammam access region" 
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-right rtl:text-right ltr:text-left">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60 block mb-1">
                    {currentTrans.expansion.cities.dammamCountry}
                  </span>
                  <h4 className="text-lg text-[#FFFFFF] font-bold">{currentTrans.expansion.cities.dammam}</h4>
                  <p className="text-[10px] text-[#FFFFFF]/80 font-normal mt-0.5 leading-tight">
                    {currentTrans.expansion.cities.dammamSub}
                  </p>
                </div>
              </div>

              {/* Card - Al Khobar */}
              <div className="col-span-2 relative overflow-hidden h-[190px] md:h-[210px] rounded-xl border border-[#DCE5E0]/60 group shadow-xs">
                <img 
                  src={khobarFootprint} 
                  loading="lazy"
                  decoding="async"
                  alt="Al Khobar access region" 
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-right rtl:text-right ltr:text-left">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60 block mb-1">
                    {currentTrans.expansion.cities.khobarCountry}
                  </span>
                  <h4 className="text-lg text-[#FFFFFF] font-bold">{currentTrans.expansion.cities.khobar}</h4>
                  <p className="text-[10px] text-[#FFFFFF]/80 font-normal mt-0.5 leading-tight">
                    {currentTrans.expansion.cities.khobarSub}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. STRATEGIC EXECUTIVE QUOTE & CTA BAND */}
      <section className="relative z-20 py-20 bg-[#064632] overflow-hidden">
        
        {/* Subtle executive geometric/pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.04]">
          <div className="w-full h-full bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center min-h-[160px] space-y-6">
          <p className="text-xl sm:text-[24px] md:text-[28px] text-[#FFFFFF] font-medium leading-relaxed max-w-3xl">
            {currentTrans.quote.text}
          </p>
          
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-widest text-[#EEF4F0]/65 uppercase">
              {currentTrans.quote.author}
            </p>
            
            <div className="pt-2">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 h-[44px] bg-[#FFFFFF] hover:bg-[#EEF4F0] text-[#064632] rounded-lg text-xs font-bold transition-all duration-300"
              >
                <span>{currentTrans.quote.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY PARTNER WITH NEXT HOME - DETAILED LIST LAYOUT */}
      <section className="relative z-20 py-28 lg:py-32 bg-[#FFFFFF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 xl:gap-18 items-start">
            
            {/* Structured reason points column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Header */}
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-[0.15em] text-[#07583F] uppercase block">
                  {currentTrans.whyPartner.sectionBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl text-[#151B18] tracking-tight leading-tight font-black">
                  {currentTrans.whyPartner.title}
                </h2>
                <div className="h-[2px] w-12 bg-[#07583F]/35" />
              </div>

              {/* List layout of features with bottom border dividers */}
              <div className="space-y-6">
                {currentTrans.whyPartner.items.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="flex gap-4 pb-6 border-b border-[#DCE5E0]/60 last:border-b-0 last:pb-0 text-right rtl:text-right ltr:text-left"
                  >
                    {/* Tiny green box or circle for numerals */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EEF4F0] border border-[#DCE5E0]/60 text-xs font-bold text-[#07583F] shrink-0 self-start">
                      {idx + 1}
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-lg text-[#151B18] font-bold leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#626B66] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Premium Saudi Executive daylight office skyline photo column */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-xl border border-[#DCE5E0]/60 group shadow-sm bg-[#FFFFFF]">
              <img 
                src={whyPartnerImage} 
                loading="lazy"
                decoding="async"
                alt={currentTrans.whyPartner.imageAlt} 
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-1000 brightness-[0.98]"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 7.5 GENERAL MANAGER LEADERSHIP TRUST BLOCK */}
      <section className="relative z-20 py-20 sm:py-24 bg-white border-t border-border-light overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-saudi/5 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="bg-bg-alt border border-border-light p-8 sm:p-12 relative overflow-hidden rounded-2xl shadow-sm">
            
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 items-center`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              
              {/* Image Column */}
              <div className="md:col-span-5 flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative group shrink-0 w-full max-w-[285px] aspect-[3/4] overflow-hidden rounded-xl border border-saudi/25 shadow-lg bg-neutral-100"
                >
                  <img 
                    src={generalManagerPortrait} 
                    alt={currentTrans.leadership.name} 
                    className="w-full h-full object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-saudi-dark/50 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Subtle brand strip inside image */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                    <span className="font-sans text-[10px] font-bold text-white uppercase">NEXT HOME</span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  </div>
                </motion.div>
              </div>

              {/* Text Column */}
              <div className={`md:col-span-7 space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-saudi bg-saudi-light border border-saudi/15 px-3 py-1 inline-block rounded-md mb-4">
                    {currentTrans.leadership.label}
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl text-text-primary font-bold">
                      {currentTrans.leadership.name}
                    </h3>
                    <p className="text-xs tracking-wider text-saudi font-bold uppercase">
                      {currentTrans.leadership.title}
                    </p>
                  </div>
                </div>

                <div className={`border-border-light pt-6 border-t relative before:absolute before:top-0 before:w-12 before:h-[1px] before:bg-saudi/45 ${lang === 'ar' ? 'before:right-0' : 'before:left-0'}`}>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal italic">
                    {currentTrans.leadership.quote}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT EXECUTIVE SECTION */}
      <section id="contact" className="relative z-20 py-32 bg-white overflow-hidden border-t border-border-light">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            
            {/* Left Column: Premium Executive inquiry Form (takes 6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              
              <div>
                <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-3">
                  {currentTrans.contact.sectionBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl text-text-primary mb-4 font-extrabold tracking-tight">
                  {currentTrans.contact.title}
                </h2>
                <p className="text-text-secondary text-sm sm:text-base font-normal leading-relaxed">
                  {currentTrans.contact.subtitle}
                </p>
              </div>

              {/* Form container */}
              <div className="space-y-8 select-none" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                
                {/* Clean Title */}
                <div className="flex justify-start">
                  <h3 className="text-xl sm:text-2xl text-text-primary font-bold mb-2">
                    {currentTrans.contact.form.title}
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-6 bg-saudi-light/60 border border-saudi/15 p-8 rounded-xl"
                    >
                      <div className="inline-flex p-4 rounded-full bg-saudi/10 border border-saudi/25 text-saudi justify-center">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <h4 className="text-xl text-saudi-dark font-bold">{currentTrans.contact.form.successTitle}</h4>
                      <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed mt-2">
                        {currentTrans.contact.form.successMsg}
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-semibold text-saudi underline cursor-pointer hover:text-saudi-dark focus:outline-none"
                      >
                        {currentTrans.contact.form.submitAnother}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={submitContactForm}
                      className="space-y-6"
                    >
                      {/* Name & Email Row (RTL responsive) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Name Field (RTL key: comes first) */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-bold text-text-secondary block tracking-wide">
                            {currentTrans.contact.form.fullNameRef} <span className="text-saudi">*</span>
                          </label>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleFormChange}
                            className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left"
                            placeholder={currentTrans.contact.form.fullNamePlaceholder}
                          />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-bold text-text-secondary block tracking-wide">
                            {currentTrans.contact.form.emailRef} <span className="text-saudi">*</span>
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left font-sans"
                            placeholder="example@domain.com"
                          />
                        </div>

                      </div>

                      {/* Company Name & Phone Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Company Name Field */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-bold text-text-secondary block tracking-wide">
                            {currentTrans.contact.form.companyNameRef}
                          </label>
                          <input 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                            className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left"
                            placeholder={currentTrans.contact.form.companyPlaceholder}
                          />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-bold text-text-secondary block tracking-wide">
                            {currentTrans.contact.form.phoneRef} <span className="text-saudi">*</span>
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left phone-mono"
                            placeholder={currentTrans.contact.form.phonePlaceholder}
                          />
                        </div>

                      </div>

                      {/* Strategic Scope Message */}
                      <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                        <label className="text-xs font-bold text-text-secondary block tracking-wide">
                          {currentTrans.contact.form.messageRef} <span className="text-saudi">*</span>
                        </label>
                        <textarea 
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleFormChange}
                          className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal resize-none placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left"
                          placeholder={currentTrans.contact.form.messagePlaceholder}
                        ></textarea>
                      </div>

                      {/* Submit & Error Message */}
                      {submitError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-right rtl:text-right ltr:text-left">
                          {submitError}
                        </div>
                      )}

                      <div className="flex justify-end pt-2">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className={`group inline-flex items-center gap-3 px-10 py-3.5 bg-saudi text-white rounded-lg tracking-wider text-sm font-semibold transition-all duration-300 focus:outline-none shadow-md shadow-saudi/15 ${
                            isSubmitting 
                              ? 'opacity-60 cursor-not-allowed' 
                              : 'hover:bg-saudi-dark cursor-pointer'
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Send className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                          )}
                          <span>
                            {isSubmitting 
                              ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                              : currentTrans.contact.form.submitBtn}
                          </span>
                        </button>
                      </div>

                    </motion.form>
                  )}
                </AnimatePresence>

              </div>

            </div>

            {/* Right Column: High-end Executive Portrait & Details (takes 6 cols) */}
            <div className="lg:col-span-6 space-y-10">
              
              {/* Executive display layout */}
              <div className="border border-border-light bg-bg-alt p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative overflow-hidden rounded-xl shadow-sm">
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-saudi"></div>
                
                {/* Premium Corporate Icon inside a sophisticated green / dark-tint container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center bg-saudi-light border border-saudi/10 rounded-xl text-saudi">
                  <Building className="w-8 h-8 sm:w-10 sm:h-10 text-saudi" />
                </div>

                {/* Office text */}
                <div className="space-y-3 text-center sm:text-start flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-saudi font-bold block">
                    {currentTrans.contact.executiveOfficeLabel}
                  </span>
                  <h3 className={`text-xl sm:text-2xl text-text-primary font-bold leading-snug ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {currentTrans.contact.officeTitle}
                  </h3>
                  <p className={`text-xs text-text-secondary leading-relaxed font-normal ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {currentTrans.contact.officeDesc}
                  </p>
                  
                  <div className="inline-flex py-1 px-2.5 bg-saudi-light/80 border border-saudi/10 rounded-md">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-saudi">
                      NEXT HOME PARTNERSHIPS
                    </span>
                  </div>
                </div>

              </div>

              {/* Executive Contact Card matching the uploaded luxury format */}
              <div 
                className="border border-border-light bg-bg-alt p-8 sm:p-10 relative overflow-hidden shadow-sm rounded-2xl" 
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              >
                {/* Accent thin line on top to match high-end card styling */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-saudi/30"></div>
                
                {/* Visual Header / Title matching raw image style */}
                <div className="space-y-2 mb-8 text-right rtl:text-right ltr:text-left">
                  <span className="text-[11px] uppercase tracking-wider text-saudi block font-bold">
                    {currentTrans.contact.executiveContactLabel}
                  </span>
                  <h3 className="text-3xl sm:text-4xl text-text-primary font-extrabold tracking-tight leading-none mt-1">
                    {currentTrans.contact.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-saudi font-bold mt-2">
                    {currentTrans.contact.role}
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-full border-b border-border-light mb-6"></div>

                {/* Info Rows */}
                <div className="space-y-4">
                  
                  {/* Phone Row */}
                  <div className="flex justify-between items-center py-4 border-b border-border-light/60 hover:bg-white/50 transition-colors">
                    <span className="text-[12px] text-text-secondary font-bold">
                      {currentTrans.contact.phoneLabel}
                    </span>
                    <a 
                      href="tel:+966506612761" 
                      className="text-text-primary text-sm sm:text-base font-bold hover:text-saudi transition-colors font-sans"
                      dir="ltr"
                    >
                      +966 50 661 2761
                    </a>
                  </div>

                  {/* Email Row - Using Corporate Email info@nexthome-group.com as requested by user */}
                  <div className="flex justify-between items-center py-4 border-b border-border-light/60 hover:bg-white/50 transition-colors">
                    <span className="text-[12px] text-text-secondary font-bold">
                      {currentTrans.contact.emailLabel}
                    </span>
                    <a 
                      href="mailto:info@nexthome-group.com" 
                      className="text-text-primary text-sm sm:text-base font-bold hover:text-saudi transition-colors break-all pl-2 font-sans"
                    >
                      info@nexthome-group.com
                    </a>
                  </div>

                  {/* Location Row */}
                  <div className="flex justify-between items-center py-4 border-b border-border-light/60 hover:bg-white/50 transition-colors">
                    <span className="text-[12px] text-text-secondary font-bold">
                      {currentTrans.contact.locationLabel}
                    </span>
                    <span className="text-text-primary text-sm sm:text-base font-normal">
                      {currentTrans.contact.location}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8B. EXECUTIVE ARTICLES & BRIEFINGS NEWS FLASH (Insights) */}
      <section id="insights" className="relative z-20 py-24 sm:py-28 bg-bg-alt border-t border-border-light overflow-hidden" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-3">
                {currentTrans.insightsSec.tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl text-text-primary tracking-tight font-extrabold">
                {currentTrans.insightsSec.title}
              </h2>
            </div>
            <p className="text-text-secondary text-sm max-w-md font-normal leading-relaxed">
              {currentTrans.insightsSec.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentTrans.insightsSec.items.map((item, idx) => (
              <div 
                key={idx} 
                className="relative p-8 md:p-10 bg-white border border-border-light hover:border-saudi/30 transition-all duration-500 rounded-2xl flex flex-col justify-between group overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => setActiveArticleIdx(idx)}
              >
                {/* Card Header with tag and reading time */}
                <div className="flex items-center justify-between text-xs mb-8">
                  <span className="text-xs font-bold tracking-wider text-saudi uppercase">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-secondary font-sans text-[11px] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-saudi" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Card Body - centered title and excerpt */}
                <div className="flex flex-col items-center justify-center text-center my-6 flex-grow pb-4">
                  <h3 className="text-2xl sm:text-3xl text-text-primary font-bold mb-4 leading-snug group-hover:text-saudi transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-normal leading-relaxed max-w-xl">
                    {item.excerpt}
                  </p>
                </div>

                {/* Card Footer with link and date */}
                <div className="flex items-center justify-between text-xs mt-8 pt-6 border-t border-border-light">
                  <button 
                    className="flex items-center gap-1 text-saudi hover:text-saudi-dark font-bold text-[11px] uppercase tracking-wider group-hover:underline cursor-pointer select-none focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticleIdx(idx);
                    }}
                  >
                    <span>{currentTrans.insightsSec.readMore}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-saudi" />
                  </button>
                  <span className="text-text-secondary/70 font-sans text-[11px] font-semibold uppercase">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ARTICLE MODAL / OVERLAY */}
      <AnimatePresence>
        {activeArticleIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/65 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveArticleIdx(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white border border-border-light p-6 sm:p-10 md:p-16 my-8 rounded-3xl shadow-2xl overflow-hidden cursor-default text-text-primary"
              dir="rtl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border-light pb-6 mb-8 sm:mb-12">
                {/* BookOpen icon and Category Tag */}
                <div className="flex items-center gap-2.5 text-saudi">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-bold tracking-wide">
                    {currentTrans.insightsSec.items[activeArticleIdx].tag}
                  </span>
                </div>

                {/* Close button */}
                <button 
                  onClick={() => setActiveArticleIdx(null)}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-saudi text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer focus:outline-none"
                >
                  <X className="w-4 h-4" />
                  <span>{currentTrans.insightsSec.closeLabel}</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col items-center">
                {/* Date & Reading time info */}
                <div className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm font-mono tracking-wider mb-6 font-semibold">
                  <span>{currentTrans.insightsSec.items[activeArticleIdx].date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-saudi" />
                    <span>{currentTrans.insightsSec.items[activeArticleIdx].readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-text-primary font-extrabold text-center leading-tight max-w-3xl">
                  {currentTrans.insightsSec.items[activeArticleIdx].title}
                </h2>

                {/* Thin horizontal green line */}
                <div className="w-24 h-[2px] bg-saudi my-8 sm:my-10" />

                {/* Paragraphs content */}
                <div className="space-y-6 sm:space-y-8 text-center max-w-3xl mx-auto font-normal leading-relaxed text-text-secondary">
                  {currentTrans.insightsSec.items[activeArticleIdx].paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base md:text-lg">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Footnote signature */}
                <span className="text-text-secondary/70 text-xs sm:text-sm italic block text-center mt-12 sm:mt-16 font-semibold">
                  {currentTrans.insightsSec.signature}
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. THE GRAND FINALE CORPORATE FOOTER */}
      <footer className="relative z-20 bg-saudi-dark border-t border-saudi-dark/60 py-24 text-white/70 overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 items-start pb-20 border-b border-white/10">
            
            {/* Column 1: Corporate Profile */}
            <div className="space-y-6">
              <a href="#" className="flex flex-col select-none group focus:outline-none">
                <span className="text-xl tracking-normal text-white font-bold uppercase leading-none">
                  NEXT HOME
                </span>
                <span className="text-xs tracking-wider text-saudi-sand mt-1 font-semibold">
                  نيكست هوم
                </span>
              </a>
              <p className="text-xs text-white/60 leading-relaxed font-normal max-w-xs">
                {currentTrans.footer.tagline}
              </p>
            </div>

            {/* Column 2: Business areas / مجالات الأعمال */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase text-white font-bold tracking-wider select-none">
                {currentTrans.footer.businessAreasLabel}
              </h4>
              <ul className="space-y-3 text-xs text-white/50 font-normal">
                <li>{currentTrans.howWeWork.steps[0].title}</li>
                <li>{currentTrans.howWeWork.steps[1].title}</li>
                <li>{currentTrans.howWeWork.steps[3].title}</li>
              </ul>
            </div>

            {/* Column 3: Dedicated Corporate Information Block */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase text-white font-bold tracking-wider select-none">
                {currentTrans.footer.corporateInfoLabel}
              </h4>
              <div className="space-y-4 font-sans">
                <p className="text-xs text-white/60 font-normal tracking-wide leading-relaxed">
                  {currentTrans.footer.companyLocation}
                </p>
                <div className="pt-3 border-t border-white/10 flex flex-col space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-saudi-sand uppercase block">
                    {currentTrans.footer.commercialRegistrationLabel}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold tracking-widest text-white font-mono">
                    7053027434
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4: Communication / الاتصالات التنفيذية */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase text-white font-bold tracking-wider select-none">
                {currentTrans.footer.communicationLabel}
              </h4>
              <ul className="space-y-3 text-xs font-semibold text-white/50">
                <li>
                  <a 
                    href="mailto:info@nexthome-group.com" 
                    className="hover:text-white transition-colors duration-200"
                  >
                    info@nexthome-group.com
                  </a>
                </li>
                <li dir="ltr" className="rtl:text-right ltr:text-left">
                  <a 
                    href="tel:+966506612761" 
                    className="hover:text-white transition-colors duration-200"
                  >
                    +966 50 661 2761
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Sub Footer with Legal & Copyright */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] tracking-wider text-white/40 font-semibold uppercase">
            <span className="font-semibold">{currentTrans.footer.allRightsReserved}</span>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors duration-200">
                {currentTrans.footer.legalLink}
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
