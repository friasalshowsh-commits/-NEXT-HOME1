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

// Premium interactive assets
import heroSkyline from './assets/images/riyadh_kafd_skyline_hero_1781012580447.png';
import executivePortrait from './assets/images/firas_alshawsh_portrait_1780861701628.png';
import generalManagerPortrait from './assets/images/general_manager_1781011186311.png';
import riyadhFootprint from './assets/images/riyadh_saudi_vertical_1780862353837.png';
import jeddahFootprint from './assets/images/jeddah_saudi_vertical_1780862368910.png';
import dammamFootprint from './assets/images/dammam_saudi_vertical_1780862382331.png';
import khobarFootprint from './assets/images/khobar_saudi_vertical_1780862398190.png';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Saudi corporate defaults elegantly to Arabic
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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
    const baseClass = "w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors duration-300";
    switch (id) {
      case 'real-estate': return <Building className={baseClass} />;
      case 'bus-dev': return <TrendingUp className={baseClass} />;
      case 'partnerships': return <Handshake className={baseClass} />;
      case 'market-entry': return <Globe className={baseClass} />;
      case 'distribution': return <Workflow className={baseClass} />;
      default: return <Workflow className={baseClass} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#060606] text-neutral-200 selection:bg-gold-500 selection:text-[#060606] transition-all duration-300 overflow-x-hidden ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. TRANSLUCENT NAVIGATION BAR */}
      <nav id="header-nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#060606]/95 backdrop-blur-md py-4 border-[#C5A059]/15 shadow-xl shadow-black/40' 
          : 'bg-transparent py-6 border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Executive Typography Branding */}
          <a href="#" className="flex flex-col group focus:outline-none select-none">
            <span className="font-serif text-xl sm:text-2xl tracking-widest text-gold-500 transition-colors uppercase font-semibold">
              NEXT HOME
            </span>
            <span className="text-[11px] sm:text-[13px] tracking-[0.25em] text-[#faf7f0]/80 font-serif -mt-1 font-medium transition-all duration-300 group-hover:text-gold-200">
              نيكست هوم
            </span>
          </a>

          {/* Core Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-2 gap-8 xl:gap-10 font-medium">
            <a href="#about" className="text-sm tracking-widest text-[#faf7f0]/80 hover:text-[#C5A059] transition-colors py-2 uppercase font-mono font-normal">{currentTrans.nav.about}</a>
            <a href="#services" className="text-sm tracking-widest text-[#faf7f0]/80 hover:text-[#C5A059] transition-colors py-2 uppercase font-mono font-normal">{currentTrans.nav.services}</a>
            <a href="#strategy" className="text-sm tracking-widest text-[#faf7f0]/80 hover:text-[#C5A059] transition-colors py-2 uppercase font-mono font-normal">{currentTrans.nav.strategy}</a>
            <a href="#footprint" className="text-sm tracking-widest text-[#faf7f0]/80 hover:text-[#C5A059] transition-colors py-2 uppercase font-mono font-normal">{currentTrans.nav.footprint}</a>
            <a href="#insights" className="text-sm tracking-widest text-[#faf7f0]/80 hover:text-[#C5A059] transition-colors py-2 uppercase font-mono font-normal">{currentTrans.nav.insights}</a>
            <a href="#contact" className="text-sm tracking-widest text-[#faf7f0]/80 hover:text-[#C5A059] transition-colors py-2 uppercase font-mono font-normal">{currentTrans.nav.contact}</a>
            
            {/* Elegant Luxury Vertical Divider */}
            <span className="h-4 w-[1px] bg-[#C5A059]/30"></span>

            {/* Language Switcher Button */}
            <button 
              onClick={toggleLanguage}
              className="text-sm tracking-widest text-gold-400 hover:text-gold-300 transition-all py-1.5 px-3 rounded border border-gold-500/10 hover:border-gold-500/30 bg-gold-500/5 font-mono cursor-pointer flex items-center gap-1.5 focus:outline-none"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentTrans.nav.langLabel}</span>
            </button>
          </div>

          {/* Tablet & Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-3 gap-2">
            <button 
              onClick={toggleLanguage} 
              className="text-xs px-2.5 py-1.5 rounded border border-gold-500/20 text-gold-400 bg-gold-500/5 font-mono mr-2 focus:outline-none cursor-pointer"
            >
              {currentTrans.nav.langLabel}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#faf7f0]/90 hover:text-gold-400 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-[#0c0c0c]/98 backdrop-blur-lg border-b border-[#c2883a]/20 shadow-2xl block lg:hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-4 max-w-lg mx-auto">
              <a 
                href="#about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base tracking-widest text-neutral-300 hover:text-[#C5A059] transition-colors py-2.5 block border-b border-neutral-900/40 uppercase font-mono"
              >
                {currentTrans.nav.about}
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base tracking-widest text-neutral-300 hover:text-[#C5A059] transition-colors py-2.5 block border-b border-neutral-900/40 uppercase font-mono"
              >
                {currentTrans.nav.services}
              </a>
              <a 
                href="#strategy" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base tracking-widest text-neutral-300 hover:text-[#C5A059] transition-colors py-2.5 block border-b border-neutral-900/40 uppercase font-mono"
              >
                {currentTrans.nav.strategy}
              </a>
              <a 
                href="#footprint" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base tracking-widest text-neutral-300 hover:text-[#C5A059] transition-colors py-2.5 block border-b border-neutral-900/40 uppercase font-mono"
              >
                {currentTrans.nav.footprint}
              </a>
              <a 
                href="#insights" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base tracking-widest text-neutral-300 hover:text-[#C5A059] transition-colors py-2.5 block border-b border-neutral-900/40 uppercase font-mono"
              >
                {currentTrans.nav.insights}
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base tracking-widest text-[#C5A059] hover:text-[#C5A059]/80 transition-colors py-4 block uppercase font-mono font-semibold"
              >
                {currentTrans.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC HERO SECTION WITH RIYADH SKYLINE */}
      <section id="about" className="relative h-screen flex items-center justify-start overflow-hidden">
        
        {/* Full screen deep visual background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroSkyline} 
            alt="Riyadh KAFD premium futuristic architecture representing NEXT HOME strategic growth" 
            className="w-full h-full object-cover object-center scale-105 filter brightness-85 contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Sophisticated dual layer overlays with reduced darkness (brighter skyline) */}
          <div className="absolute inset-0 bg-neutral-950/25 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#080808]/15"></div>
          <div className={`absolute inset-0 bg-gradient-to-${lang === 'ar' ? 'l' : 'r'} from-[#080808] via-[#080808]/45 to-transparent`}></div>
        </div>

        {/* Content Box with elegant vertical line and serif details */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 mt-24 sm:mt-28">
          <div className="max-w-3xl">
            
            {/* Grand Serif Dual Headline (reduced by 15-20% and beautifully spaced) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="space-y-4 md:space-y-5 mb-8"
            >
              {currentTrans.hero.titleLines.map((line, index) => (
                <h1 
                  key={index} 
                  className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] tracking-wide leading-normal pb-4 pt-1 px-1.5 ${
                    index === 2 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ebd8b3] via-[#dfbe83] to-[#C5A059] font-medium' 
                      : 'text-white font-light'
                  }`}
                >
                  {line}
                </h1>
              ))}
            </motion.div>

            {/* Corporate Strategic Description Paragraph */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className={`border-${lang === 'ar' ? 'r-2 pr-6 border-[#C5A059]/40' : 'l-2 pl-6 border-[#C5A059]/30'} mb-10 max-w-2xl`}
            >
              <p className="text-sm sm:text-base md:text-lg text-[#faf7f0]/90 leading-relaxed font-light tracking-wide">
                {currentTrans.hero.paragraph}
              </p>
            </motion.div>

            {/* Discover More Call to Action Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <a 
                href="#services" 
                className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#C5A059]/20 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 text-white rounded-none tracking-widest text-xs uppercase font-serif font-medium transition-all duration-300 relative overflow-hidden focus:outline-none"
              >
                <span>{currentTrans.hero.cta}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 text-gold-400 group-hover:-translate-x-1.5 transition-transform duration-300" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1.5 transition-transform duration-300" />
                )}
                {/* Thin Golden Border Animation Line */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-hover:w-full transition-all duration-500"></span>
              </a>
            </motion.div>

          </div>
        </div>

        {/* Ambient background shadow divider */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* PREMIUM METRICS STRIP - INSTITUTIONAL SAUDI CORPORATE BAR */}
      <div id="hero-metrics-strip" className="relative z-30 bg-[#080808] border-b border-[#C5A059]/15 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y-0 md:divide-x md:divide-[#C5A059]/15 rtl:md:divide-x-reverse items-center justify-between">
            
            {/* Metric 1 */}
            <div className="flex flex-col items-center md:items-start px-2 md:px-8">
              <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light transition-all duration-300">
                16+
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mt-2 text-center md:text-start leading-relaxed h-8">
                {lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center md:items-start px-2 md:px-8">
              <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light transition-all duration-300 flex items-center gap-2">
                30+
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mt-2 text-center md:text-start leading-relaxed h-8">
                {lang === 'ar' ? 'شراكة وعلاقة تجارية' : 'Strategic Alliances & Relations'}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center md:items-start px-2 md:px-8">
              <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light transition-all duration-300">
                6
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mt-2 text-center md:text-start leading-relaxed h-8">
                {lang === 'ar' ? 'مدن مستهدفة' : 'Target Cities'}
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center md:items-start px-2 md:px-8">
              <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light transition-all duration-300 flex items-center gap-2">
                {lang === 'ar' ? 'الرياض' : 'Riyadh'}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mt-2 text-center md:text-start leading-relaxed h-8">
                {lang === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 3. HOW WE WORK (كيف نعمل) - METHODOLOGY GRID & METRICS */}
      <section id="strategy" className="relative z-20 py-28 sm:py-32 md:py-36 bg-[#0a0a0a] border-y border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 sm:mb-20">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C5A059] uppercase block mb-3">
              WHAT WE DO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {lang === 'ar' ? 'كيف نعمل' : 'How We Work'}
            </h2>
          </div>

          {/* 4-column Premium Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-10">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col group"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/15 mb-6">
                <span className="font-mono text-xs tracking-wider text-[#C5A059] font-medium">01</span>
                <span className="w-1.5 h-1.5 bg-[#C5A059]/40 rounded-full group-hover:bg-[#C5A059] transition-all duration-300"></span>
              </div>
              <h3 className="font-serif text-xl text-white font-medium mb-4 transition-colors duration-300 group-hover:text-[#C5A059]">
                {lang === 'ar' ? 'تطوير الأعمال' : 'Business Development'}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {lang === 'ar' 
                  ? 'نساعد الشركات على اكتشاف فرص النمو وبناء مسارات توسع عملية داخل السوق السعودي.'
                  : 'We help companies discover growth opportunities and build practical expansion pathways inside the Saudi market.'}
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col group"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/15 mb-6">
                <span className="font-mono text-xs tracking-wider text-[#C5A059] font-medium">02</span>
                <span className="w-1.5 h-1.5 bg-[#C5A059]/40 rounded-full group-hover:bg-[#C5A059] transition-all duration-300"></span>
              </div>
              <h3 className="font-serif text-xl text-white font-medium mb-4 transition-colors duration-300 group-hover:text-[#C5A059]">
                {lang === 'ar' ? 'الشراكات الاستراتيجية' : 'Strategic Partnerships'}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {lang === 'ar' 
                  ? 'نبني علاقات وشراكات طويلة الأمد بين الشركات والمستثمرين والجهات التجارية المناسبة.'
                  : 'We build long-term relationships and partnerships between businesses, investors, and suitable commercial entities.'}
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col group"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/15 mb-6">
                <span className="font-mono text-xs tracking-wider text-[#C5A059] font-medium">03</span>
                <span className="w-1.5 h-1.5 bg-[#C5A059]/40 rounded-full group-hover:bg-[#C5A059] transition-all duration-300"></span>
              </div>
              <h3 className="font-serif text-xl text-white font-medium mb-4 transition-colors duration-300 group-hover:text-[#C5A059]">
                {lang === 'ar' ? 'الوصول إلى السوق' : 'Market Access'}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {lang === 'ar' 
                  ? 'ندعم دخول الشركات إلى السوق السعودي عبر فهم البيئة التجارية وبناء شبكة العلاقات المناسبة.'
                  : 'We support companies entering the Saudi market by understanding the commercial landscape and building the right network of relations.'}
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col group"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/15 mb-6">
                <span className="font-mono text-xs tracking-wider text-[#C5A059] font-medium">04</span>
                <span className="w-1.5 h-1.5 bg-[#C5A059]/40 rounded-full group-hover:bg-[#C5A059] transition-all duration-300"></span>
              </div>
              <h3 className="font-serif text-xl text-white font-medium mb-4 transition-colors duration-300 group-hover:text-[#C5A059]">
                {lang === 'ar' ? 'التسويق العقاري' : 'Real Estate Marketing'}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {lang === 'ar' 
                  ? 'تطوير وتسويق المشاريع العقارية وربطها بالعملاء والشركاء المستهدفين.'
                  : 'Developing and marketing real estate projects and connecting them with target clients and partners.'}
              </p>
            </motion.div>

          </div>

          {/* Clean Statistics Row */}
          <div className="mt-28 sm:mt-32 md:mt-36 pt-16 border-t border-[#C5A059]/15">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y-0 md:divide-x md:divide-[#C5A059]/15 rtl:md:divide-x-reverse items-center justify-between">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center md:items-start px-2 md:px-8">
                <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light">
                  16+
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mt-2.5 text-center md:text-start leading-relaxed">
                  {lang === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience'}
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center md:items-start px-2 md:px-8">
                <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light">
                  30+
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-medium mt-2.5 text-center md:text-start leading-relaxed">
                  {lang === 'ar' ? 'شراكة وعلاقة تجارية' : 'Partnerships & Commercial Relations'}
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center md:items-start px-2 md:px-8">
                <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light">
                  {lang === 'ar' ? 'الرياض' : 'Riyadh'}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mt-2.5 text-center md:text-start leading-relaxed">
                  {lang === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
                </span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center md:items-start px-2 md:px-8">
                <span className="text-3xl sm:text-4xl font-serif text-white tracking-tight font-light">
                  {lang === 'ar' ? 'السعودية' : 'KSA'}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mt-2.5 text-center md:text-start leading-relaxed">
                  {lang === 'ar' ? 'نطاق الوصول التجاري' : 'Commercial Reach Focus'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. BUSINESS AREAS SECTION WITH DETAILED EXPLORATION CARDS */}
      <section id="services" className="relative z-20 py-32 bg-[#060606] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-400 uppercase block mb-3">
              {currentTrans.businessAreas.sectionBadge}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight mb-6">
              {currentTrans.businessAreas.title}
            </h2>
            <p className="text-[#faf7f0]/75 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative p-8 bg-neutral-950 hover:bg-[#0c0c0c] border border-neutral-800/60 hover:border-gold-500/25 transition-all duration-500 rounded-none flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isSelected ? 'ring-1 ring-gold-500/50 scale-102 bg-[#0c0c0c]' : ''
                  }`}
                  onClick={() => setSelectedPillar(isSelected ? null : area.id)}
                >
                  {/* Luxury Shine Gradient Overlay */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  
                  <div>
                    {/* Icon and Number Badge */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm">
                        {getPillarIcon(area.id)}
                      </div>
                      <span className="font-serif text-sm text-[#C5A059]/40 font-medium tracking-widest">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold-100 transition-colors">
                      {area.title}
                    </h3>

                    {/* Description text */}
                    <p className="text-sm text-neutral-400 group-hover:text-neutral-300 leading-relaxed font-light mb-6">
                      {area.description}
                    </p>
                  </div>

                  {/* Expand / Details link */}
                  <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between">
                    <span className="text-[11px] tracking-widest font-mono text-gold-400 hover:text-gold-300 group-hover:underline uppercase flex items-center gap-1">
                      {isSelected 
                        ? (lang === 'ar' ? 'عرض أقل' : 'Collapse Details') 
                        : (lang === 'ar' ? 'عرض نطاق العمل بالتفصيل' : 'Explore Operational Scope')}
                    </span>
                    {lang === 'ar' ? (
                      <ChevronRight className={`w-4 h-4 text-gold-400 shrink-0 transition-transform duration-300 ${isSelected ? 'rotate-90' : 'rotate-180'}`} />
                    ) : (
                      <ChevronRight className={`w-4 h-4 text-gold-400 shrink-0 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
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
                        <div className="p-4 bg-neutral-900/60 border border-gold-500/10 rounded-sm text-xs space-y-3 mt-2 text-[#faf7f0]/90">
                          {area.id === 'real-estate' && (
                            <>
                              <p className="text-gold-400/90 font-semibold uppercase font-mono tracking-widest">Key Deliverables:</p>
                              <p>• Off-market mega opportunity matchmaking in Riyadh and coastal developments.</p>
                              <p>• Strategic branding and positioning files for tier-1 development projects.</p>
                              <p>• Qualifying corporate demand, sovereign funds and GCC family offices.</p>
                            </>
                          )}
                          {area.id === 'bus-dev' && (
                            <>
                              <p className="text-gold-400/90 font-semibold uppercase font-mono tracking-widest">Key Deliverables:</p>
                              <p>• Comprehensive feasibility models matching Saudi Vision 2030 initiatives.</p>
                              <p>• Joint venture configuration and negotiation with major stakeholders.</p>
                              <p>• Structuring and streamlining business models for Saudi market agility.</p>
                            </>
                          )}
                          {area.id === 'partnerships' && (
                            <>
                              <p className="text-gold-400/90 font-semibold uppercase font-mono tracking-widest">Key Deliverables:</p>
                              <p>• Aligning high-net-worth individuals and corporate champions.</p>
                              <p>• Drafting long-term strategic alliance charters and secure governance files.</p>
                              <p>• Broad market network integration for accelerated strategic value.</p>
                            </>
                          )}
                          {area.id === 'market-entry' && (
                            <>
                              <p className="text-gold-400/90 font-semibold uppercase font-mono tracking-widest">Key Deliverables:</p>
                              <p>• Complete regulatory navigation under SAGIA, MISA, and industrial zones.</p>
                              <p>• Local partner matchmaking for optimal structural stability.</p>
                              <p>• Localizing international offerings to align with Saudi business customs.</p>
                            </>
                          )}
                          {area.id === 'distribution' && (
                            <>
                              <p className="text-gold-400/90 font-semibold uppercase font-mono tracking-widest">Key Deliverables:</p>
                              <p>• Developing elite retail & B2B channels matching premium specifications.</p>
                              <p>• Developing high-security supply chain pathways and distribution hubs.</p>
                              <p>• Strategic advisory to protect original brand value and secure premium pricing.</p>
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

      {/* 5. REGIONAL EXTRACTION & FOOTPRINT SECTION */}
      <section id="footprint" className="relative z-20 py-32 bg-[#0a0a0a] border-y border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side text column (takes 5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-xs font-mono tracking-[0.25em] text-gold-400 uppercase block">
                {currentTrans.expansion.sectionBadge}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                {currentTrans.expansion.title}
              </h2>
              <div className="h-[2px] w-20 bg-gold-500/40"></div>
              <p className="text-[#faf7f0]/85 text-base sm:text-lg font-light leading-relaxed">
                {currentTrans.expansion.paragraph}
              </p>
              
              <div>
                <a 
                  href="#contact" 
                  className="group inline-flex items-center gap-3 text-xs uppercase font-serif tracking-[0.2em] text-gold-400 hover:text-gold-300 font-semibold transition-colors duration-300"
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

            {/* Right side high-end vertical cities showcase grid (takes 7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4 h-[380px] sm:h-[450px]">
              
              {/* Card - Riyadh */}
              <div className="group relative overflow-hidden h-full border border-neutral-800/40">
                <img 
                  src={riyadhFootprint} 
                  alt="Riyadh headquarters of NEXT HOME" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-95 Filter-none group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400 block mb-1">HQ | {currentTrans.expansion.cities.riyadhCountry}</span>
                  <h4 className="font-serif text-lg text-white font-medium">{currentTrans.expansion.cities.riyadh}</h4>
                  <p className="text-[10px] text-neutral-300 font-light mt-0.5 leading-tight">{currentTrans.expansion.cities.riyadhSub}</p>
                </div>
              </div>

              {/* Card - Jeddah */}
              <div className="group relative overflow-hidden h-full border border-neutral-800/40">
                <img 
                  src={jeddahFootprint} 
                  alt="Jeddah western regional division of NEXT HOME" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-95 Filter-none group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#dfbe83]/70 block mb-1">{currentTrans.expansion.cities.jeddahCountry}</span>
                  <h4 className="font-serif text-lg text-white font-medium">{currentTrans.expansion.cities.jeddah}</h4>
                  <p className="text-[10px] text-neutral-300 font-light mt-0.5 leading-tight">{currentTrans.expansion.cities.jeddahSub}</p>
                </div>
              </div>

              {/* Card - Dammam */}
              <div className="group relative overflow-hidden h-full border border-neutral-800/40">
                <img 
                  src={dammamFootprint} 
                  alt="Dammam eastern province sector of NEXT HOME" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-95 Filter-none group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#dfbe83]/70 block mb-1">{currentTrans.expansion.cities.dammamCountry}</span>
                  <h4 className="font-serif text-lg text-white font-medium">{currentTrans.expansion.cities.dammam}</h4>
                  <p className="text-[10px] text-neutral-300 font-light mt-0.5 leading-tight">{currentTrans.expansion.cities.dammamSub}</p>
                </div>
              </div>

              {/* Card - Al Khobar */}
              <div className="group relative overflow-hidden h-full border border-neutral-800/40">
                <img 
                  src={khobarFootprint} 
                  alt="Al Khobar Gulf gateway division of NEXT HOME" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-95 Filter-none group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#dfbe83]/70 block mb-1">{currentTrans.expansion.cities.khobarCountry}</span>
                  <h4 className="font-serif text-lg text-white font-medium">{currentTrans.expansion.cities.khobar}</h4>
                  <p className="text-[10px] text-neutral-300 font-light mt-0.5 leading-tight">{currentTrans.expansion.cities.khobarSub}</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. COUTOUT strategic executive STATEMENT / QUOTE */}
      <section className="relative z-20 py-28 bg-[#060606] overflow-hidden">
        
        {/* Subtle patterned visual bounds */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="p-12 sm:p-16 border border-gold-500/10 bg-[#0a0a0a]/80 shadow-2xl relative">
            
            {/* Top gold line block */}
            <div className="absolute top-0 left-12 w-20 h-[3px] bg-gold-400"></div>

            <div className="max-w-5xl mx-auto">
              
              {/* Massive blockquote icons */}
              <span className="absolute -top-6 -left-2 sm:-left-6 text-9xl font-serif text-[#C5A059]/15 leading-none select-none">“</span>
              
              {/* Dual Language Side-by-Side Quote Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
                
                {/* English representation */}
                <div className="space-y-4">
                  <p className="font-serif text-2xl sm:text-3xl text-white font-light leading-relaxed italic tracking-wide">
                    {translations.en.quote.text}
                  </p>
                  <p className="text-xs tracking-widest text-gold-400 font-mono">- {translations.en.quote.author}</p>
                </div>

                {/* Arabic representation */}
                <div className="space-y-4 text-right border-t md:border-t-0 md:border-r border-neutral-800/80 pt-8 md:pt-0 md:pr-12">
                  <p className="font-serif text-2xl sm:text-3xl text-white font-light leading-relaxed italic tracking-wide">
                    {translations.ar.quote.text}
                  </p>
                  <p className="text-xs tracking-widest text-gold-400 font-mono">- {translations.ar.quote.author}</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY PARTNER WITH NEXT HOME - DETAILED REASONS GRID */}
      <section className="relative z-20 py-32 bg-[#0a0a0a] border-y border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-24">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-400 uppercase block mb-3">
              {currentTrans.whyPartner.sectionBadge}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight leading-tight">
              {currentTrans.whyPartner.title}
            </h2>
            <div className="h-[2px] w-16 bg-gold-500/40 mt-4"></div>
          </div>

          {/* Grid columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentTrans.whyPartner.items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="space-y-4 border-l border-neutral-800/80 pl-6 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6"
              >
                {/* Visual marker */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gold-400 bg-gold-400/5 px-2 py-0.5 border border-gold-500/10">0{idx + 1}</span>
                  <div className="h-[1px] w-8 bg-gold-500/30"></div>
                </div>

                <h3 className="font-serif text-xl text-white font-medium group-hover:text-gold-200 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-[#faf7f0]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7.5 GENERAL MANAGER LEADERSHIP TRUST BLOCK */}
      <section className="relative z-20 py-24 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/60 filter blur-[80px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <div className="bg-neutral-950 border border-neutral-900 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Elegant corner highlights */}
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[#C5A059]/30 to-transparent"></div>
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-gradient-to-b from-[#C5A059]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-gradient-to-r from-[#C5A059]/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-[#C5A059]/30 to-transparent"></div>

            <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 items-center`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              
              {/* Image Column */}
              <div className="md:col-span-5 flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative group shrink-0 w-full max-w-[280px] aspect-[3/4] overflow-hidden border border-[#C5A059]/25 shadow-xl bg-neutral-900"
                >
                  <img 
                    src={generalManagerPortrait} 
                    alt={currentTrans.leadership.name} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                  
                  {/* Subtle golden branding strip inside image */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest text-[#C5A059] uppercase">NEXT HOME</span>
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse"></span>
                  </div>
                </motion.div>
              </div>

              {/* Text Column */}
              <div className={`md:col-span-7 space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C5A059] uppercase bg-[#C5A059]/5 border border-[#C5A059]/15 px-3 py-1 inline-block rounded-sm mb-4">
                    {currentTrans.leadership.label}
                  </span>

                  <div className="space-y-2">
                    <h3 className={`text-2xl sm:text-3xl text-white font-medium ${lang === 'ar' ? 'font-sans font-bold' : 'font-serif'}`}>
                      {currentTrans.leadership.name}
                    </h3>
                    <p className="text-xs tracking-wider text-[#C5A059] font-mono uppercase">
                      {currentTrans.leadership.title}
                    </p>
                  </div>
                </div>

                <div className={`border-neutral-900 pt-6 border-t relative before:absolute before:top-0 before:w-12 before:h-[1px] before:bg-[#C5A059]/35 ${lang === 'ar' ? 'before:right-0' : 'before:left-0'}`}>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light italic">
                    {currentTrans.leadership.quote}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT EXECUTIVE SECTION */}
      <section id="contact" className="relative z-20 py-32 bg-[#060606] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            
            {/* Left Column: Premium Executive inquiry Form (takes 6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              
              <div>
                <span className="text-xs font-mono tracking-[0.25em] text-gold-400 uppercase block mb-3">
                  {currentTrans.contact.sectionBadge}
                </span>
                <h2 className={`text-4xl sm:text-5xl text-white mb-4 ${lang === 'ar' ? 'font-sans font-bold tracking-normal leading-tight' : 'font-serif tracking-tight'}`}>
                  {currentTrans.contact.title}
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  {currentTrans.contact.subtitle}
                </p>
              </div>

              {/* Form container */}
              <div className="space-y-8 select-none" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                
                {/* Clean Title */}
                <div className="flex justify-start">
                  <h3 className={`text-2xl sm:text-3xl text-white font-medium mb-2 ${lang === 'ar' ? 'font-sans font-bold' : 'font-serif'}`}>
                    {currentTrans.contact.form.title}
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-6 bg-[#0a0a0a] border border-neutral-900/60 p-8 rounded-sm"
                    >
                      <div className="inline-flex p-4 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/25 text-[#C5A059] justify-center">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <h4 className="font-serif text-xl text-white font-medium">{lang === 'ar' ? 'تم الإرسال بنجاح' : 'Inquiry Dispatched'}</h4>
                      <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed font-sans mt-2">
                        {currentTrans.contact.form.successMsg}
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-mono text-[#C5A059] underline cursor-pointer hover:text-gold-300 focus:outline-none"
                      >
                        {lang === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Inquiry'}
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
                          <label className="text-xs font-sans text-neutral-400 block tracking-wide">
                            {currentTrans.contact.form.fullNameRef} <span className="text-[#C5A059]">*</span>
                          </label>
                          <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleFormChange}
                            className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-[#C5A059]/50 rounded-sm py-4 px-5 text-sm text-white focus:outline-none transition-all duration-300 font-light placeholder-neutral-600 focus:ring-1 focus:ring-[#C5A059]/30 text-right rtl:text-right ltr:text-left"
                            placeholder={lang === 'ar' ? 'اكتب اسمك الكامل' : 'Enter your full name'}
                          />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-sans text-neutral-400 block tracking-wide">
                            {currentTrans.contact.form.emailRef} <span className="text-[#C5A059]">*</span>
                          </label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-[#C5A059]/50 rounded-sm py-4 px-5 text-sm text-white focus:outline-none transition-all duration-300 font-light font-mono placeholder-neutral-600 focus:ring-1 focus:ring-[#C5A059]/30 text-right rtl:text-right ltr:text-left"
                            placeholder="example@domain.com"
                          />
                        </div>

                      </div>

                      {/* Company Name & Phone Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Company Name Field */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-sans text-neutral-400 block tracking-wide">
                            {currentTrans.contact.form.companyNameRef}
                          </label>
                          <input 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                            className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-[#C5A059]/50 rounded-sm py-4 px-5 text-sm text-white focus:outline-none transition-all duration-300 font-light placeholder-neutral-600 focus:ring-1 focus:ring-[#C5A059]/30 text-right rtl:text-right ltr:text-left"
                            placeholder={lang === 'ar' ? 'اسم شركتك أو مبادرتك' : 'Your company or initiative name'}
                          />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                          <label className="text-xs font-sans text-neutral-400 block tracking-wide">
                            {currentTrans.contact.form.phoneRef} <span className="text-[#C5A059]">*</span>
                          </label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-[#C5A059]/50 rounded-sm py-4 px-5 text-sm text-white focus:outline-none transition-all duration-300 font-light font-mono placeholder-neutral-600 focus:ring-1 focus:ring-[#C5A059]/30 text-right rtl:text-right ltr:text-left"
                            placeholder={lang === 'ar' ? 'اكتب رقم جوالك (مثال: 05xxxxxxxx)' : 'e.g. 05xxxxxxxx'}
                          />
                        </div>

                      </div>

                      {/* Strategic Scope Message */}
                      <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                        <label className="text-xs font-sans text-neutral-400 block tracking-wide">
                          {currentTrans.contact.form.messageRef} <span className="text-[#C5A059]">*</span>
                        </label>
                        <textarea 
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleFormChange}
                          className="w-full bg-[#0c0c0c] border border-neutral-900 focus:border-[#C5A059]/50 rounded-sm py-4 px-5 text-sm text-white focus:outline-none transition-all duration-300 font-light resize-none placeholder-neutral-600 focus:ring-1 focus:ring-[#C5A059]/30 text-right rtl:text-right ltr:text-left"
                          placeholder={lang === 'ar' ? 'اكتب تفاصيل استفسارك أو مجالات التعاون المطلوبة...' : 'Write your inquiry details or requested collaboration areas...'}
                        ></textarea>
                      </div>

                      {/* Submit & Error Message */}
                      {submitError && (
                        <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-sm text-sm text-red-400 font-sans text-right rtl:text-right ltr:text-left">
                          {submitError}
                        </div>
                      )}

                      <div className="flex justify-end pt-2">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className={`group inline-flex items-center gap-3 px-10 py-3.5 bg-[#C5A059] text-neutral-950 rounded-sm tracking-wider text-sm font-sans font-medium transition-all duration-300 focus:outline-none ${
                            isSubmitting 
                              ? 'opacity-60 cursor-not-allowed' 
                              : 'hover:bg-[#d4af37] cursor-pointer'
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Send className="w-4 h-4 text-neutral-950 group-hover:scale-110 transition-transform" />
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
              <div className="border border-neutral-900 bg-neutral-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gold-500/30"></div>
                
                {/* Circular Portrait Image */}
                <div className="w-32 h-32 md:w-36 md:h-36 shrink-0 relative rounded-full overflow-hidden border-2 border-gold-500/15">
                  <img 
                    src={executivePortrait} 
                    alt="Firas Alshawsh - Director of Business Development" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                {/* Profile text */}
                <div className="space-y-3 text-center sm:text-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 block">KEY REPRESENTATIVE</span>
                  <h3 className={`text-2xl sm:text-3xl text-white font-medium ${lang === 'ar' ? 'font-sans font-bold' : 'font-serif'}`}>{currentTrans.contact.name}</h3>
                  <p className="text-xs tracking-wider text-neutral-400 leading-normal max-w-sm">
                    {currentTrans.contact.role}
                  </p>
                  
                  <div className="inline-flex py-1 px-2.5 bg-gold-500/10 border border-gold-500/15 rounded-sm">
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-gold-300 font-bold block">
                      NEXT HOME DIRECT DIRECTOR OFFICE
                    </span>
                  </div>
                </div>

              </div>

              {/* Verified contact connections block */}
              <div className="space-y-6">
                
                {/* Line 1: Address location */}
                <div className="flex items-start gap-4 p-4 border border-neutral-900 hover:border-gold-500/20 bg-neutral-950/60 transition-colors">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm text-gold-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">Corporate Headquarters</span>
                    <p className="text-white text-base font-light">{currentTrans.contact.location}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Olaya District Gateway, King Fahd Road Pillar</p>
                  </div>
                </div>

                {/* Line 2: Mobile connection */}
                <a 
                  href="tel:+966506612761"
                  className="flex items-start gap-4 p-4 border border-neutral-900 hover:border-gold-500/20 bg-neutral-950/60 transition-colors group block"
                >
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm text-gold-500 shrink-0 group-hover:bg-gold-500/10 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">Direct Executive Line</span>
                    <p className="text-white text-base font-medium font-mono tracking-wider group-hover:text-gold-300 transition-colors inline-block" dir="ltr">
                      {currentTrans.contact.phone}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5 font-light block">{lang === 'ar' ? 'اتصال مؤمن ومباشر للمكتب التنفيذي' : 'Encrypted official line'}</p>
                  </div>
                </a>

                {/* Line 3: Email connection */}
                <a 
                  href="mailto:info@nexthome-group.com"
                  className="flex items-start gap-4 p-4 border border-neutral-900 hover:border-gold-500/20 bg-neutral-950/60 transition-colors group block"
                >
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-sm text-gold-500 shrink-0 group-hover:bg-gold-500/10 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="break-all">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">Direct Executive Dispatch</span>
                    <p className="text-white text-base font-medium font-mono group-hover:text-gold-300 transition-colors">
                      {currentTrans.contact.email}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5 font-light">{lang === 'ar' ? 'الرد مؤكد في غضون ٢٤ ساعة عمل' : 'Verified desk monitored daily'}</p>
                  </div>
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8B. EXECUTIVE ARTICLES & BRIEFINGS NEWS FLASH (Insights) */}
      <section id="insights" className="relative z-20 py-24 sm:py-28 bg-[#0a0a0a] border-t border-neutral-900 overflow-hidden" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#C5A059] uppercase block mb-3">
                {currentTrans.insightsSec.tagline}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                {currentTrans.insightsSec.title}
              </h2>
            </div>
            <p className="text-[#faf7f0]/60 text-sm max-w-md font-light leading-relaxed">
              {currentTrans.insightsSec.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentTrans.insightsSec.items.map((item, idx) => (
              <div 
                key={idx} 
                className="relative p-8 md:p-10 bg-[#0d0d0d] border border-neutral-900/60 hover:border-[#C5A059]/30 transition-all duration-500 rounded-none flex flex-col justify-between group overflow-hidden cursor-pointer"
                onClick={() => setActiveArticleIdx(idx)}
              >
                {/* Card Header with tag and reading time */}
                <div className="flex items-center justify-between text-xs mb-8">
                  <span className="text-xs font-mono tracking-wider text-[#C5A059] font-medium uppercase">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Card Body - centered title and excerpt */}
                <div className="flex flex-col items-center justify-center text-center my-6 flex-grow">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-4 leading-snug group-hover:text-[#C5A059] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-xl">
                    {item.excerpt}
                  </p>
                </div>

                {/* Card Footer with link and date */}
                <div className="flex items-center justify-between text-xs mt-8 pt-6 border-t border-neutral-900/40">
                  <button 
                    className="flex items-center gap-1 text-[#C5A059] hover:text-[#d4af37] font-mono text-[11px] uppercase tracking-wider font-semibold group-hover:underline cursor-pointer select-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticleIdx(idx);
                    }}
                  >
                    <span>{currentTrans.insightsSec.readMore}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                  <span className="text-neutral-500 font-mono text-[11px] uppercase">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveArticleIdx(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-[#C5A059]/15 p-6 sm:p-10 md:p-16 my-8 rounded-none shadow-2xl overflow-hidden cursor-default"
              dir="rtl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#C5A059]/10 pb-6 mb-8 sm:mb-12">
                {/* BookOpen icon and Category Tag */}
                <div className="flex items-center gap-2.5 text-[#C5A059]">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-serif text-sm sm:text-base font-medium tracking-wide">
                    {currentTrans.insightsSec.items[activeArticleIdx].tag}
                  </span>
                </div>

                {/* Close button */}
                <button 
                  onClick={() => setActiveArticleIdx(null)}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-[#C5A059] text-xs sm:text-sm font-mono transition-colors duration-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>{currentTrans.insightsSec.closeLabel}</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col items-center">
                {/* Date & Reading time info */}
                <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm font-mono tracking-wider mb-6">
                  <span>{currentTrans.insightsSec.items[activeArticleIdx].date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span>{currentTrans.insightsSec.items[activeArticleIdx].readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium text-center leading-tight max-w-3xl">
                  {currentTrans.insightsSec.items[activeArticleIdx].title}
                </h2>

                {/* Thin horizontal gold line */}
                <div className="w-24 h-[1.5px] bg-[#C5A059] my-8 sm:my-10" />

                {/* Paragraphs content */}
                <div className="space-y-6 sm:space-y-8 text-center max-w-3xl mx-auto font-light leading-relaxed text-[#faf7f0]/85">
                  {currentTrans.insightsSec.items[activeArticleIdx].paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base md:text-lg">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Footnote signature */}
                <span className="text-neutral-500 text-xs sm:text-sm italic block text-center mt-12 sm:mt-16 font-serif">
                  {currentTrans.insightsSec.signature}
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. THE GRAND FINALE CORPORATE FOOTER */}
      <footer className="relative z-20 bg-[#050505] border-t border-neutral-900/60 py-24 text-neutral-400 overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 items-start pb-20 border-b border-neutral-900/50">
            
            {/* Column 1: Corporate Profile */}
            <div className="space-y-6">
              <a href="#" className="flex flex-col select-none group">
                <span className="text-xl tracking-[0.25em] text-white font-light uppercase">
                  NEXT HOME
                </span>
                <span className="text-xs tracking-[0.3em] text-neutral-500 -mt-0.5 font-light">
                  نيكست هوم
                </span>
              </a>
              <p className="text-xs text-neutral-500 leading-relaxed font-light max-w-xs">
                {currentTrans.footer.tagline}
              </p>
            </div>

            {/* Column 2: Business areas / مجالات الأعمال */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase text-white font-medium tracking-[0.2em] select-none">
                {lang === 'ar' ? 'مجالات الأعمال' : 'Business Areas'}
              </h4>
              <ul className="space-y-3 text-xs text-neutral-500 font-light">
                <li>{lang === 'ar' ? 'تطوير الأعمال' : 'Business Development'}</li>
                <li>{lang === 'ar' ? 'الشراكات الاستراتيجية' : 'Strategic Partnerships'}</li>
                <li>{lang === 'ar' ? 'التسويق العقاري' : 'Real Estate Marketing'}</li>
              </ul>
            </div>

            {/* Column 3: Dedicated Corporate Information Block */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase text-white font-medium tracking-[0.2em] select-none">
                {lang === 'ar' ? 'معلومات الشركة' : 'Corporate Information'}
              </h4>
              <div className="space-y-4 font-sans">
                <p className="text-xs text-neutral-400 font-light tracking-wide leading-relaxed">
                  {lang === 'ar' ? 'المملكة العربية السعودية • الرياض' : 'Saudi Arabia • Riyadh'}
                </p>
                <div className="pt-3 border-t border-neutral-900/60 flex flex-col space-y-1">
                  <span className="text-[10px] font-mono tracking-[0.15em] text-[#C5A059] uppercase block">
                    {lang === 'ar' ? 'السجل التجاري' : 'Commercial Registration'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold tracking-widest text-neutral-200 font-mono">
                    7053027434
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4: Communication / الاتصالات التنفيذية */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase text-white font-medium tracking-[0.2em] select-none">
                {lang === 'ar' ? 'الاتصال والخدمات' : 'Communication Center'}
              </h4>
              <ul className="space-y-3 text-xs font-light text-neutral-500">
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
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] tracking-widest text-neutral-500 font-light">
            <span className="font-light">© NEXT HOME. All Rights Reserved.</span>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors duration-200 uppercase">
                {currentTrans.footer.legalLink}
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
