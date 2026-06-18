import React from 'react';
import { motion } from 'motion/react';
import { TranslationSchema } from '../../translations';
import whyPartnerImage from '../../assets/images/saudi_partnership_meeting_1781617563735.jpg';

interface WhyPartnerSectionProps {
  currentTrans: TranslationSchema;
}

export const WhyPartnerSection: React.FC<WhyPartnerSectionProps> = ({
  currentTrans,
}) => {
  return (
    <section 
      data-section="why-partner"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-18 items-start">
          
          {/* Structured reason points column */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12" id="whypartner-text-col">
            {/* Header */}
            <div className="space-y-3" id="whypartner-header">
              <span className="text-xs font-bold tracking-[0.15em] text-[#07583F] uppercase block" id="whypartner-badge">
                {currentTrans.whyPartner.sectionBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#151B18] tracking-tight leading-tight font-black" id="whypartner-title">
                {currentTrans.whyPartner.title}
              </h2>
              <div className="h-[2px] w-12 bg-[#07583F]/35" id="whypartner-decor-line" />
            </div>

            {/* List layout of features with bottom border dividers */}
            <div className="space-y-6" id="whypartner-items-list">
              {currentTrans.whyPartner.items.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex gap-4 pb-6 border-b border-[#DCE5E0]/60 last:border-b-0 last:pb-0 text-right rtl:text-right ltr:text-left"
                  id={`whypartner-item-${idx}`}
                >
                  {/* Tiny green box or circle for numerals */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EEF4F0] border border-[#DCE5E0]/60 text-xs font-bold text-[#07583F] shrink-0 self-start" id={`whypartner-num-${idx}`}>
                    {idx + 1}
                  </div>
                  
                  <div className="space-y-1" id={`whypartner-item-content-${idx}`}>
                    <h3 className="text-base sm:text-lg text-[#151B18] font-bold leading-snug" id={`whypartner-item-title-${idx}`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#626B66] leading-relaxed font-normal" id={`whypartner-item-desc-${idx}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Saudi Executive daylight office skyline photo column */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-xl border border-[#DCE5E0]/60 group shadow-sm bg-[#FFFFFF]" id="whypartner-img-col">
            <img 
              src={whyPartnerImage} 
              loading="lazy"
              decoding="async"
              alt={currentTrans.whyPartner.imageAlt} 
              className="w-full h-full object-cover object-center transform md:group-hover:scale-[1.01] transition-transform duration-1000 brightness-[0.98]"
              referrerPolicy="no-referrer"
              id="whypartner-meeting-img"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
