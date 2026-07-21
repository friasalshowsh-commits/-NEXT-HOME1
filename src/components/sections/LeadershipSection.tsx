import React from 'react';
import { motion } from 'motion/react';
import { TranslationSchema } from '../../translations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LeadershipSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  lang,
  currentTrans,
}) => {
  const isReduced = useReducedMotion();
  const isRtl = lang === 'ar';

  // Stagger loading configuration for leadership info and quotes
  const infoContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const infoItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const activeContainer = isReduced ? {} : infoContainerVariants;
  const activeItem = isReduced ? {} : infoItemVariants;

  return (
    <section 
      data-section="leadership"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-white border-t border-border-light overflow-hidden"
    >
      {/* Subtle decorative background detail */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saudi/5 rounded-full filter blur-[120px] pointer-events-none" id="leadership-bg-decor"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-bg-alt border border-border-light p-6 sm:p-12 relative overflow-hidden rounded-2xl shadow-sm" id="leadership-card">
          
          <div className="max-w-3xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'} id="leadership-container">
            
            {/* Text Column - staggered fade up */}
            <motion.div 
              variants={activeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className={`space-y-4 sm:space-y-6 ${isRtl ? 'text-right' : 'text-left'}`} 
              id="leadership-text-col"
            >
              <div>
                <motion.span 
                  variants={activeItem}
                  className="text-[10px] sm:text-[11px] font-bold tracking-wider text-saudi bg-saudi-light border border-saudi/15 px-3 py-1 inline-block rounded-md mb-3 sm:mb-4" 
                  id="leadership-badge"
                >
                  {currentTrans.leadership.label}
                </motion.span>

                <div className="space-y-1 sm:space-y-2" id="leadership-info-box">
                  <motion.h3 
                    variants={activeItem}
                    className="text-xl sm:text-2xl md:text-3xl text-text-primary font-bold" 
                    id="leadership-gm-name"
                  >
                    {currentTrans.leadership.name}
                  </motion.h3>
                  <motion.p 
                    variants={activeItem}
                    className="text-[10px] sm:text-xs tracking-wider text-saudi font-bold uppercase" 
                    id="leadership-gm-role"
                  >
                    {currentTrans.leadership.title}
                  </motion.p>
                </div>
              </div>

              <motion.div 
                variants={activeItem}
                className={`border-border-light pt-4 sm:pt-6 border-t relative before:absolute before:top-0 before:w-12 before:h-[1px] before:bg-saudi/45 ${isRtl ? 'before:right-0' : 'before:left-0'}`} 
                id="leadership-quote-box"
              >
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-normal italic" id="leadership-quote-text">
                  {currentTrans.leadership.quote}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
