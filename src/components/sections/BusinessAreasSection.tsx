import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, TrendingUp, Handshake, Globe, Workflow, Building, Shield } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { InteractiveTiltCard } from '../interactive/InteractiveTiltCard';

interface BusinessAreasSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
  selectedPillar: string | null;
  setSelectedPillar: (id: string | null) => void;
}

export const BusinessAreasSection: React.FC<BusinessAreasSectionProps> = ({
  lang,
  currentTrans,
  selectedPillar,
  setSelectedPillar,
}) => {
  const getPillarIcon = (id: string) => {
    const baseClass = "w-6 h-6 text-saudi group-hover:text-saudi-dark transition-colors duration-300";
    switch (id) {
      case 'bus-dev': return <TrendingUp className={baseClass} id="icon-bus-dev" />;
      case 'partnerships': return <Handshake className={baseClass} id="icon-partnerships" />;
      case 'market-entry': return <Globe className={baseClass} id="icon-market-entry" />;
      case 'marketing-expansion': return <Workflow className={baseClass} id="icon-marketing-expansion" />;
      case 'real-estate': return <Building className={baseClass} id="icon-real-estate" />;
      case 'commercial-rep': return <Shield className={baseClass} id="icon-commercial-rep" />;
      default: return <Workflow className={baseClass} id="icon-default-workflow" />;
    }
  };

  return (
    <section 
      id="services" 
      data-section="business-areas"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16" id="services-header">
          <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-2 sm:mb-3" id="services-badge">
            {currentTrans.businessAreas.sectionBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight font-extrabold mb-4 sm:mb-6" id="services-title">
            {currentTrans.businessAreas.title}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal" id="services-desc">
            {currentTrans.businessAreas.subtitle}
          </p>
        </div>

        {/* Cards Grid using Interactive Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8" id="services-grid">
          {currentTrans.businessAreas.items.map((area, index) => {
            const isSelected = selectedPillar === area.id;
            
            const expandedContentBlock = (
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden mt-4"
                    id={`service-expanded-box-${area.id}`}
                  >
                    <div className="p-4 bg-saudi-light/60 border border-saudi/15 rounded-md text-xs space-y-3 mt-2 text-text-primary origin-top" id={`service-expanded-content-${area.id}`}>
                      {area.id === 'bus-dev' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'نماذج جدوى شاملة متوافقة مع مبارات رؤية السعودية 2030.' : 'Comprehensive feasibility models matching Saudi Vision 2030 initiatives.'}</p>
                          <p>• {lang === 'ar' ? 'صياغة وهندسة المشاريع المشتركة والتفاوض مع كبار الشركاء.' : 'Joint venture configuration and negotiation with major stakeholders.'}</p>
                          <p>• {lang === 'ar' ? 'تهيئة وتصميم نماذج الأعمال لأقصى درجات المرونة في السوق السعودي.' : 'Structuring and streamlining business models for Saudi market agility.'}</p>
                        </>
                      )}
                      {area.id === 'partnerships' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'ربط مثالي مع كبار المستثمرين والشركاء التجاريين الملائمين.' : 'Aligning high-net-worth individuals and corporate champions.'}</p>
                          <p>• {lang === 'ar' ? 'صياغة مواثيق التحالف الاستراتيجي الطويلة الأجل وأطر الحوكمة.' : 'Drafting long-term alliance charters and secure governance frameworks.'}</p>
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
                          <p>• {lang === 'ar' ? 'تأهل وتوجيه الطلب المؤسسي ومكاتب العائلات التجارية الكبرى.' : 'Qualifying corporate demand, sovereign funds and GCC family offices.'}</p>
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
            );

            return (
              <InteractiveTiltCard
                key={area.id}
                id={area.id}
                title={area.title}
                description={area.description}
                icon={getPillarIcon(area.id)}
                expandedContent={expandedContentBlock}
                exploreLabel={currentTrans.businessAreas.exploreScope}
                collapseLabel={currentTrans.businessAreas.collapseDetails}
                index={index}
                lang={lang}
                isSelected={isSelected}
                onToggle={() => setSelectedPillar(isSelected ? null : area.id)}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
