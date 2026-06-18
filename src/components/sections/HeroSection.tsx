import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import heroSkyline from '../../assets/images/riyadh-daylight-hero.webp';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { ParallaxBackground, ParallaxContent, ParallaxGlow, MagneticButton } from '../interactive/HeroParallax';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { motion, useScroll } from 'motion/react';
import { useDevice } from '../../hooks/useMediaQuery';

interface HeroSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  currentTrans,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();

  const canUsePointerEffects = hasFinePointer && !isTouch && !isReduced;
  
  // Set up parent container scroll offset tracker once
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Set up pointer tracking parallax springs
  const { springX, springY, handlePointerMove, handlePointerLeave } = usePointerParallax();

  // Standard Stagger Delays for Entrance Animations
  const getTransition = (delay: number) => {
    return isReduced 
      ? { duration: 0.1 } 
      : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay };
  };

  const initialAnim = isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 };
  const animateAnim = { opacity: 1, y: 0 };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      data-section="hero"
      onPointerMove={canUsePointerEffects ? handlePointerMove : undefined}
      onPointerLeave={canUsePointerEffects ? handlePointerLeave : undefined}
      className="relative min-h-[640px] sm:min-h-[680px] lg:min-h-[760px] overflow-hidden bg-[#151B18]"
    >
      {/* 2.5D Scroll and Cursor Responsive Skyline Background */}
      <ParallaxBackground
        src={heroSkyline}
        alt={currentTrans.hero.imageAlt || "Riyadh daylight skyline"}
        lang={lang}
        springX={springX}
        springY={springY}
        scrollYProgress={scrollYProgress}
      />

      {/* Floating Spotlight Glow trailing cursor smoothly on desktop */}
      <ParallaxGlow springX={springX} springY={springY} />

      {/* Dynamic visual gradients to isolate & read text safely */}
      <div 
        id="hero-gradient-overlay"
        className={`absolute inset-0 z-10 transition-all duration-300 ${
          lang === 'ar' 
            ? 'bg-gradient-to-t from-white/94 via-white/68 to-transparent lg:bg-gradient-to-l lg:from-white/96 lg:via-white/55 lg:via-[35%] lg:to-transparent lg:to-[68%]' 
            : 'bg-gradient-to-t from-white/94 via-white/68 to-transparent lg:bg-gradient-to-r lg:from-white/96 lg:via-white/55 lg:via-[35%] lg:to-transparent lg:to-[68%]'
        }`} 
      />

      {/* Centered responsive container matching top header height limits */}
      <div className="relative z-20 mx-auto flex min-h-[640px] sm:min-h-[680px] lg:min-h-[760px] w-full max-w-[1540px] items-center px-4 sm:px-6 pt-[62px] lg:pt-[70px] lg:px-10 xl:px-14">
        
        {/* Parallax Content Box acting on text for 2.5D depth illusion */}
        <ParallaxContent
          springX={springX}
          springY={springY}
          scrollYProgress={scrollYProgress}
          className="w-full max-w-[620px] pt-12 pb-8 sm:py-16 md:py-20 flex flex-col justify-center space-y-4 sm:space-y-6"
          id="hero-content-box"
        >
          
          {/* Strategic growth tag badge (Entrance Item 1) */}
          <motion.div 
            initial={initialAnim}
            animate={animateAnim}
            transition={getTransition(0.08)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/85 border border-[#BFD5CA] backdrop-blur-sm text-[#07583F] text-[10px] sm:text-xs font-bold rounded-lg uppercase tracking-wider self-start max-w-full shadow-xs truncate" 
            id="hero-badge-box"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#07583F] shrink-0" />
            <span className="truncate">{currentTrans.hero.badge}</span>
          </motion.div>

          {/* Corporate Display Title (Entrance Item 2) */}
          <motion.h1 
            initial={initialAnim}
            animate={animateAnim}
            transition={getTransition(0.16)}
            className="text-[34px] min-[380px]:text-[38px] md:text-[54px] lg:text-[64px] font-bold leading-[1.18] tracking-tight text-balance text-[#151B18]" 
            id="hero-headline"
          >
            {lang === 'ar' ? (
              <>
                <span className="block text-[#151B18]">نبني فرص النمو</span>
                <span className="block text-[#07583F] mt-1">في السوق السعودي</span>
              </>
            ) : (
              <>
                <span className="block text-[#151B18]">Building Growth Opportunities</span>
                <span className="block text-[#07583F] mt-1">in the Saudi Market</span>
              </>
            )}
          </motion.h1>

          {/* Description (Entrance Item 3) */}
          <motion.p 
            initial={initialAnim}
            animate={animateAnim}
            transition={getTransition(0.24)}
            className="text-[15px] sm:text-[16px] lg:text-[18px] xl:text-[20px] text-[#626B66] leading-relaxed rtl:leading-[1.8] font-normal max-w-[600px]" 
            id="hero-paragraph"
          >
            {currentTrans.hero.paragraph}
          </motion.p>

          {/* Dual CTA Button Controllers - Spaced exactly ~14-16px (Entrance Item 4) */}
          <motion.div 
            initial={initialAnim}
            animate={animateAnim}
            transition={getTransition(0.32)}
            className="flex flex-col min-[430px]:flex-row gap-3 min-[430px]:gap-[14px] items-stretch min-[430px]:items-center pt-2 w-full min-[430px]:w-auto select-none" 
            id="hero-cta-buttons"
          >
            {/* Magnetic Wrapper on Primary Button */}
            <MagneticButton className="flex shrink-0">
              <a 
                href="#services" 
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 h-[48px] lg:h-[52px] bg-[#07583F] hover:bg-[#064632] text-white rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none"
                id="hero-cta-explore"
              >
                <span>{currentTrans.hero.cta_services}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </a>
            </MagneticButton>

            {/* Magnetic Wrapper on Secondary Button */}
            <MagneticButton className="flex shrink-0">
              <a 
                href="#contact" 
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 h-[48px] lg:h-[52px] bg-white/80 hover:bg-white text-[#07583F] border border-[#07583F] rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none backdrop-blur-sm"
                id="hero-cta-contact"
              >
                <span>{currentTrans.hero.cta_contact}</span>
              </a>
            </MagneticButton>
          </motion.div>

        </ParallaxContent>
      </div>
    </section>
  );
};

