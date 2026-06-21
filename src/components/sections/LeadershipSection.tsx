import React from 'react';
import { motion } from 'motion/react';
import { TranslationSchema } from '../../translations';
import generalManagerPortrait from '../../assets/images/regenerated_image_1781740349045.png';
import { ParallaxImage } from '../interactive/ParallaxImage';
import { SectionTitleReveal } from '../interactive/SectionTitleReveal';
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

  // Reveal direction based on grid visual alignment
  const imageRevealDir = isRtl ? 'right' : 'left';

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
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center" dir={isRtl ? 'rtl' : 'ltr'} id="leadership-grid">
            
            {/* Image Column using ParallaxImage but with zero scrolling intensity and disabled zoom scale */}
            <div className="md:col-span-5 flex justify-center" id="leadership-img-col">
              <ParallaxImage
                src={generalManagerPortrait}
                alt={lang === 'ar' ? "المدير العام لشركة نيكست هوم" : `General Manager of NEXT HOME - ${currentTrans.leadership.name}`}
                revealFrom={imageRevealDir}
                strength={0}
                disableScrollZoom={true}
                className="relative shrink-0 w-full max-w-[260px] aspect-[3/4] rounded-xl border border-saudi/25 shadow-md bg-neutral-100"
                imageClassName="transition-all duration-500"
                id="leadership-img-frame"
              />
            </div>

            {/* Text Column - staggered fade up */}
            <motion.div 
              variants={activeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className={`md:col-span-7 space-y-4 sm:space-y-6 ${isRtl ? 'text-right' : 'text-left'}`} 
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
                  <SectionTitleReveal 
                    text={currentTrans.leadership.name} 
                    variant="lines" 
                    className="text-xl sm:text-2xl md:text-3xl text-text-primary font-bold/90" 
                    id="leadership-gm-name" 
                  />
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
