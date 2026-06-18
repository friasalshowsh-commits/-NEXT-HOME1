import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TranslationSchema } from '../../translations';
import { MagneticButton } from '../interactive/HeroParallax';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StrategicQuoteSectionProps {
  currentTrans: TranslationSchema;
}

export const StrategicQuoteSection: React.FC<StrategicQuoteSectionProps> = ({
  currentTrans,
}) => {
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the subtle watermark parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Vertical parallax offset: total max 16px range (-8 to +8)
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const activeWatermarkY = isReduced ? 0 : watermarkY;

  // Stagged content animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section 
      ref={sectionRef}
      data-section="strategic-quote"
      className="relative z-20 py-12 sm:py-16 md:py-20 bg-[#064632] overflow-hidden"
      // Backdrop Reveal Clip Animation
      initial={isReduced ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      id="strategic-quote-root"
    >
      {/* Subtle executive geometric dot pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" id="quote-pattern-bg">
        <div className="w-full h-full bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Abstract luxury 'N' watermark vector with max 0.05 opacity & scroll parallax */}
      <motion.div
        style={{ y: activeWatermarkY }}
        className="absolute inset-y-0 right-1/4 sm:right-[30%] w-64 h-full z-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none text-white font-black"
        id="quote-watermark-n"
      >
        <svg viewBox="0 0 100 100" className="w-[220px] h-[220px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 20 80 L 20 20 L 40 20 L 80 80 L 80 20" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </motion.div>

      {/* Structured Content Container */}
      <motion.div 
        variants={isReduced ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6" 
        id="quote-content-container"
      >
        {/* 1. Quote Text */}
        <motion.p 
          variants={isReduced ? {} : itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#FFFFFF] font-medium leading-relaxed max-w-3xl" 
          id="quote-text"
        >
          {currentTrans.quote.text}
        </motion.p>
        
        {/* 2. Source Author & 3. Button inside items sequence wrapper */}
        <motion.div 
          variants={isReduced ? {} : itemVariants}
          className="space-y-3 sm:space-y-4" 
          id="quote-meta"
        >
          <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#EEF4F0]/65 uppercase" id="quote-author">
            {currentTrans.quote.author}
          </p>
          
          <div className="pt-1 flex justify-center" id="quote-cta-wrapper">
            <MagneticButton className="inline-flex shrink-0">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 h-[44px] bg-[#FFFFFF] hover:bg-[#EEF4F0] text-[#064632] rounded-lg text-xs font-bold transition-colors duration-300 w-full sm:w-auto shadow-sm"
                id="quote-cta-btn"
              >
                <span>{currentTrans.quote.cta}</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
