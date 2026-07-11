import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Landmark, Compass, Award, ShieldAlert } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { AboutSection } from './AboutSection';
import { LeadershipSection } from './LeadershipSection';

interface AboutPageDetailProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const AboutPageDetail: React.FC<AboutPageDetailProps> = ({
  lang,
  currentTrans,
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-16 sm:pb-24 overflow-hidden" id="about-page-detail-container">
      {/* 1. Header Hero for About */}
      <section className="relative bg-[#EEF4F0] border-b border-[#DCE5E0]/50 py-16 sm:py-24 overflow-hidden" id="about-hero">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#07583f05_1px,transparent_1px),linear-gradient(to_bottom,#07583f05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <a 
              href={isAr ? '/' : '/en/'}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-saudi hover:text-saudi-dark transition-colors"
              id="about-back-home-link"
            >
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </a>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DCE5E0] text-saudi text-xs font-bold rounded-lg uppercase tracking-wider shadow-xs" id="about-hero-badge">
              <span>{isAr ? 'لمحة مؤسسية' : 'Corporate Identity'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight font-extrabold leading-tight" id="about-hero-title">
              {isAr ? 'عن شركة نيكست هوم السعودية' : 'About NEXT HOME Saudi Arabia'}
            </h1>
            
            <p className="text-saudi text-lg sm:text-xl font-bold tracking-tight" id="about-hero-subtitle">
              {isAr ? 'بناء شراكات التنمية والنمو التجاري المستدام' : 'Building Partnerships for Sustainable Commercial Growth'}
            </p>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-normal max-w-2xl" id="about-hero-desc">
              {isAr 
                ? 'مجموعة سعودية رائدة تتخذ من الرياض مقراً لها، متخصصة في تطوير الأعمال، ودخول السوق، وهندسة الشراكات والتحالفات الاستراتيجية في المملكة.'
                : 'A leading Saudi business group based in Riyadh, specializing in business development, market entry, and engineering strategic alliances in the Kingdom.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Standard About Section with detailed history & strengths */}
      <AboutSection lang={lang} currentTrans={currentTrans} />

      {/* 3. Corporate Values block (Original detailed content) */}
      <section className="py-16 sm:py-20 bg-white" id="about-corporate-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mb-12" id="values-header">
            <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-2" id="values-badge">
              {isAr ? 'ركائزنا وقيمنا الملتزمة' : 'OUR CORPORATE PILLARS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight" id="values-title">
              {isAr ? 'كيف نحافظ على ريادتنا وثقة شركائنا؟' : 'How We Maintain Leadership & Trust'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="values-grid">
            <div className="p-6 sm:p-8 bg-bg-alt border border-[#DCE5E0]/60 rounded-2xl space-y-4" id="value-item-1">
              <div className="p-3 bg-white text-saudi border border-[#DCE5E0]/50 rounded-xl inline-flex" id="value-icon-container-1">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">{isAr ? 'النزاهة والشفافية' : 'Integrity & Transparency'}</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-normal">
                {isAr
                  ? 'نعتمد الشفافية المطلقة في جميع أعمالنا الاستشارية والتنفيذية مع الشركاء، ونلتزم باللوائح ومقومات الحوكمة الرشيدة لحفظ مصالح الجميع.'
                  : 'We adopt absolute transparency in all advisory and operational mandates, adhering strictly to compliance and robust governance.'}
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-bg-alt border border-[#DCE5E0]/60 rounded-2xl space-y-4" id="value-item-2">
              <div className="p-3 bg-white text-saudi border border-[#DCE5E0]/50 rounded-xl inline-flex" id="value-icon-container-2">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">{isAr ? 'الأصالة والمعرفة المحلية' : 'Local Insight & Authenticity'}</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-normal">
                {isAr
                  ? 'نمثّل الجسر الحقيقي الذي يربط المستثمرين بالسوق السعودي معتمدين على فهم واقعي للثقافة الاستهلاكية، والمتطلبات التنظيمية.'
                  : 'We act as the authentic bridge connecting brands with the Saudi market, grounded in deep cultural awareness and regulatory intelligence.'}
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-bg-alt border border-[#DCE5E0]/60 rounded-2xl space-y-4" id="value-item-3">
              <div className="p-3 bg-white text-saudi border border-[#DCE5E0]/50 rounded-xl inline-flex" id="value-icon-container-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">{isAr ? 'الجودة ونخبوية التنفيذ' : 'Elite Executive Quality'}</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-normal">
                {isAr
                  ? 'لا نؤمن بالنماذج الجاهزة، بل نصمم لكل فرصة نموذجاً مستقلاً ونعمل على تطبيقه بمعايير تنفيذية نخبوية تحقق النتائج.'
                  : 'We reject one-size-fits-all blueprints, designing a bespoke framework for every commercial opportunity to secure excellence.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Section showing Mohamed Saleh card */}
      <LeadershipSection lang={lang} currentTrans={currentTrans} />
    </div>
  );
};
