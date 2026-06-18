import React from 'react';
import { motion } from 'motion/react';
import { TranslationSchema } from '../../translations';
import whyPartnerImage from '../../assets/images/saudi_partnership_meeting_1781617563735.jpg';
import { ParallaxImage } from '../interactive/ParallaxImage';
import { SectionTitleReveal } from '../interactive/SectionTitleReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WhyPartnerSectionProps {
  currentTrans: TranslationSchema;
  lang: 'ar' | 'en';
}

export const WhyPartnerSection: React.FC<WhyPartnerSectionProps> = ({
  currentTrans,
  lang,
}) => {
  const isReduced = useReducedMotion();
  const isRtl = lang === 'ar';

  // Opposite reveal direction of AboutSection
  const revealDir = isRtl ? 'right' : 'left';

  // Parent container stagger setup
  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemContentVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const activeContainer = isReduced ? {} : listContainerVariants;
  const activeContent = isReduced ? {} : itemContentVariants;

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
              <SectionTitleReveal 
                text={currentTrans.whyPartner.title} 
                variant="lines" 
                className="text-2xl sm:text-3xl lg:text-4xl text-[#151B18] tracking-tight leading-tight font-black" 
                id="whypartner-title" 
              />
              <motion.div 
                initial={isReduced ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: isRtl ? 'right' : 'left' }}
                className="h-[2px] w-12 bg-[#07583F]/35" 
                id="whypartner-decor-line" 
              />
            </div>

            {/* List layout of features with animatable divider lines */}
            <motion.div 
              variants={activeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6" 
              id="whypartner-items-list"
            >
              {currentTrans.whyPartner.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col relative pb-6 text-right rtl:text-right ltr:text-left"
                  id={`whypartner-item-container-${idx}`}
                >
                  <motion.div 
                    variants={activeContent}
                    className="flex gap-4"
                    id={`whypartner-item-${idx}`}
                  >
                    {/* Numerals box */}
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

                  {/* High Quality ScaleX divider reveal */}
                  {idx < currentTrans.whyPartner.items.length - 1 && (
                    <motion.div
                      initial={isReduced ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeOut' }}
                      style={{ transformOrigin: isRtl ? 'right' : 'left' }}
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#DCE5E0]/60"
                      id={`whypartner-divider-${idx}`}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Column - ParallaxImage with revealDirection */}
          <div className="lg:col-span-5 w-full" id="whypartner-img-col">
            <ParallaxImage 
              src={whyPartnerImage}
              alt={currentTrans.whyPartner.imageAlt}
              revealFrom={revealDir}
              strength={20}
              className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-xl border border-[#DCE5E0]/60 shadow-sm bg-[#FFFFFF]"
              id="whypartner-meeting-img"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
