import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import aboutMeeting from '../../assets/images/saudi_meeting_daylight_1781616906235.jpg';
import { ParallaxImage } from '../interactive/ParallaxImage';
import { SectionTitleReveal } from '../interactive/SectionTitleReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AboutSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  currentTrans,
}) => {
  const isReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const activeContainer = isReduced ? {} : containerVariants;
  const activeItem = isReduced ? {} : itemVariants;

  // Reveal image dynamically based on layout column positioning
  const revealDir = lang === 'ar' ? 'left' : 'right';

  return (
    <section 
      id="about" 
      data-section="about"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-y border-[#DCE5E0]/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-center">
          
          {/* Text Column - Stagger loaded */}
          <motion.div 
            variants={activeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-6 sm:space-y-8" 
            id="about-text-column"
          >
            <motion.div 
              variants={activeItem}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF4F0] border border-[#DCE5E0] text-[#07583F] text-xs font-bold rounded-lg uppercase tracking-wider self-start shadow-xs" 
              id="about-badge-container"
            >
              <span>{currentTrans.aboutSection.eyebrow}</span>
            </motion.div>

            <SectionTitleReveal 
              text={currentTrans.aboutSection.title} 
              variant="lines" 
              className="text-2xl sm:text-3xl lg:text-4xl text-[#151B18] font-black leading-tight tracking-tight" 
              id="about-title" 
            />

            <motion.div 
              variants={activeItem}
              className="space-y-4 text-[#626B66] text-sm sm:text-base leading-relaxed font-normal" 
              id="about-paragraphs"
            >
              <p>{currentTrans.aboutSection.paragraphs[0]}</p>
              <p>{currentTrans.aboutSection.paragraphs[1]}</p>
            </motion.div>

            {/* Bullet Checklist */}
            <motion.div 
              variants={activeItem}
              className="space-y-3 pt-1" 
              id="about-bullets"
            >
              {currentTrans.aboutSection.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3" id={`about-bullet-${idx}`}>
                  <div className="p-1 bg-[#EEF4F0] text-[#07583F] rounded-full mt-0.5 shrink-0" id={`about-bullet-icon-${idx}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-sm text-[#151B18] font-semibold leading-tight">{bullet}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              variants={activeItem}
              className="pt-2" 
              id="about-cta-container"
            >
              <a 
                href="#contact" 
                className="group inline-flex items-center justify-center gap-2.5 px-6 h-[48px] bg-[#07583F] hover:bg-[#064632] text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 focus:outline-none w-full sm:w-auto"
                id="about-cta-btn"
              >
                <span>{currentTrans.aboutSection.cta}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" id="about-arrow-rtl" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" id="about-arrow-ltr" />
                )}
              </a>
            </motion.div>
          </motion.div> 
          
          {/* Image Column - ParallaxImage with clip reveal direction */}
          <ParallaxImage 
            src={aboutMeeting}
            alt={currentTrans.aboutSection.imageAlt}
            revealFrom={revealDir}
            strength={25}
            className="w-full aspect-[4/3] rounded-xl border border-[#DCE5E0]/60 shadow-xs"
            id="about-meeting-img"
          />

        </div>
      </div>
    </section>
  );
};

