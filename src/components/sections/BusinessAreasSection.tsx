import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, TrendingUp, Handshake, Globe, Workflow, Megaphone, Route, BriefcaseBusiness } from 'lucide-react';
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
      case 'marketing-expansion': return <Megaphone className={baseClass} id="icon-marketing-expansion" />;
      case 'real-estate': return <Route className={baseClass} id="icon-sales-channels" />;
      case 'commercial-rep': return <BriefcaseBusiness className={baseClass} id="icon-opportunities" />;
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
                          <p>• {lang === 'ar' ? 'دراسات جدوى متكاملة لتهيئة نموذج العمل وتسهيل مرونة التوسع.' : 'Comprehensive feasibility studies to structure agile business models.'}</p>
                          <p>• {lang === 'ar' ? 'هندسة المشاريع المشتركة والتحالفات بما يدعم مستهدفات النمو النخبوية.' : 'Joint venture and alliance engineering aligned with elite growth paths.'}</p>
                          <p>• {lang === 'ar' ? 'رسم خارطة طريق تجارية متكاملة لتحقيق الأهداف الاستراتيجية في الكفاءة.' : 'Structured commercial roadmaps to achieve strategic expansion efficiency.'}</p>
                        </>
                      )}
                      {area.id === 'partnerships' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'ربط الشركات بالمستثمرين الاستراتيجيين وكبار الشركاء التجاريين.' : 'Connecting businesses with strategic investors and optimal partners.'}</p>
                          <p>• {lang === 'ar' ? 'إعداد وبناء مواثيق التحالف وأطر الحوكمة الفعالة لضمان الاستدامة.' : 'Establishing alliance charters and reliable governance frameworks.'}</p>
                          <p>• {lang === 'ar' ? 'تفعيل المبادرات المشتركة لتسريع توليد القيمة وحفظ مصالح الكيانات.' : 'Executing joint initiatives to accelerate value creation and protect mutual interests.'}</p>
                        </>
                      )}
                      {area.id === 'market-entry' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'توجيه وإرشاد تنظيمي متكامل للتعامل مع الجهات المعنية بالمملكة وروافد MISA.' : 'Regulatory navigation across MISA, SAGIA, and official Saudi channels.'}</p>
                          <p>• {lang === 'ar' ? 'توفيق الشراكات والربط مع الكيانات المحلية لضمان دخول آمن ومستقر.' : 'Partnership matchmaking and local entity alignment for secure market entry.'}</p>
                          <p>• {lang === 'ar' ? 'ملاءمة المنتجات والخدمات مع ثقافة وبيئة الأعمال المحلية السعودية.' : 'Localizing products and services to align with Saudi market demands and customs.'}</p>
                        </>
                      )}
                      {area.id === 'marketing-expansion' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'تصميم وبناء التموضع التجاري المناسب للمنتج أو الخدمة لضمان انتشارها.' : 'Creating tailored market-positioning files for products and services.'}</p>
                          <p>• {lang === 'ar' ? 'إدارة حملات وقنوات السمعة لبناء موثوقية عالية للعلامة التجارية بسوقنا.' : 'Managing high-impact PR and brand-penetration campaigns to build authority.'}</p>
                          <p>• {lang === 'ar' ? 'صياغة استراتيجيات قياس وتحليل الأداء والنمو المستمر.' : 'Designing continuous performance metrics and growth analytics.'}</p>
                        </>
                      )}
                      {area.id === 'real-estate' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'بناء وهيكلة قنوات التوزيع والتوريد لضمان تدفق مرن ومستدام.' : 'Structuring distribution and supply channels for seamless business flow.'}</p>
                          <p>• {lang === 'ar' ? 'صياغة مسار رحلة العميل وبناء آليات تواصل وتحويل ذكية.' : 'Modeling the customer journey and implementing smart conversion tactics.'}</p>
                          <p>• {lang === 'ar' ? 'ربط الشركات بالشركاء التجاريين وقنوات البيع الملائمة لزيادة الانتشار والطلب.' : 'Connecting brands with local commercial channel partners to boost sales and reach.'}</p>
                        </>
                      )}
                      {area.id === 'commercial-rep' && (
                        <>
                          <p className="text-saudi font-bold uppercase tracking-wider">{lang === 'ar' ? 'مخرجاتنا الرئيسية:' : 'Key Deliverables:'}</p>
                          <p>• {lang === 'ar' ? 'تقييم وتحليل الفرص الاستثمارية والتجارية والجدوى الاقتصادية لها.' : 'Assessing and analyzing commercial opportunities and their business viability.'}</p>
                          <p>• {lang === 'ar' ? 'هندسة المشاريع التجارية وتحويل الأفكار والوكالات لكيانات قابلة للتوسيع.' : 'Engineering commercial projects to turn ideas and agencies into scalable ventures.'}</p>
                          <p>• {lang === 'ar' ? 'توفير المساندة الاستشارية والتشغيلية والتوجيه لضمان استجابة مرنة للمشروع.' : 'Providing operational support and guidance of critical project milestones.'}</p>
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
