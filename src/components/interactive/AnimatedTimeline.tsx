import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { TrendingUp, Handshake, Globe, Building, Workflow } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedTimelineProps {
  currentTrans: TranslationSchema;
  lang: 'ar' | 'en';
}

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({
  currentTrans,
  lang,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const isRtl = lang === 'ar';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 30%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.6,
  });

  return (
    <div 
      ref={containerRef} 
      className="relative mt-10 sm:mt-16 max-w-6xl mx-auto" 
      id="strategy-timeline-container"
    >
      {/* Horizontal timeline connecting line for desktop only */}
      <div 
        className="hidden lg:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#EEF4F0]" 
        id="desktop-timeline-line-bg" 
      />

      {/* Active Horizontal Green Line */}
      {!isReduced && (
        <motion.div
          className="hidden lg:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#07583F]"
          style={{
            scaleX: smoothProgress,
            transformOrigin: isRtl ? 'right' : 'left',
          }}
          id="desktop-timeline-line-active"
        />
      )}

      {/* Vertical timeline connecting line for mobile only */}
      <div 
        className="lg:hidden absolute top-[28px] bottom-[28px] w-[2px] bg-[#EEF4F0] right-[24px] ltr:right-auto ltr:left-[24px]" 
        id="mobile-timeline-line-bg" 
      />

      {/* Active Vertical Green Line */}
      {!isReduced && (
        <motion.div
          className="lg:hidden absolute top-[28px] bottom-[28px] w-[2px] bg-[#07583F] right-[24px] ltr:right-auto ltr:left-[24px]"
          style={{
            scaleY: smoothProgress,
            transformOrigin: 'top',
          }}
          id="mobile-timeline-line-active"
        />
      )}

      {/* Steps Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10" id="strategy-steps-grid">
        {currentTrans.howWeWork.steps.map((step, idx) => {
          const stepIcons = [TrendingUp, Handshake, Globe, Building];
          const IconComp = stepIcons[idx] || Workflow;

          // Define fractional range for each step
          const startLimit = idx * 0.25;
          const endLimit = (idx + 1) * 0.25;

          // Transforms based on scrolling progress (unless reduced motion is active)
          // Opacity of non-active goes from 0.55 to 1.0
          const stepOpacity = isReduced 
            ? 1.0 
            : useTransform(smoothProgress, [startLimit, Math.min(1.0, startLimit + 0.15)], [0.55, 1.0]);

          const textY = isReduced
            ? 0
            : useTransform(smoothProgress, [startLimit, Math.min(1.0, startLimit + 0.15)], [12, 0]);

          const circleScale = isReduced
            ? 1.0
            : useTransform(smoothProgress, [startLimit, Math.min(1.0, startLimit + 0.15)], [1.0, 1.15]);

          const iconY = isReduced
            ? 0
            : useTransform(smoothProgress, [startLimit, Math.min(1.0, startLimit + 0.15)], [0, -5]);

          return (
            <motion.div 
              key={idx}
              style={{ opacity: stepOpacity }}
              className="group relative flex flex-row lg:flex-col items-start lg:items-center text-right ltr:text-left lg:text-center pr-[52px] lg:pr-0 pl-4 lg:pl-0 ltr:pr-4 ltr:pl-[52px] ltr:lg:pl-0 ltr:lg:pr-0 focus-visible:outline-none"
              id={`animated-strategy-step-${idx}`}
            >
              {/* Circle Node on Timeline */}
              <div 
                className="absolute right-[15px] lg:right-auto lg:relative top-1 ltr:right-auto ltr:left-[15px] ltr:lg:left-auto flex items-center justify-center z-20" 
                id={`animated-strategy-node-${idx}`}
              >
                <motion.div 
                  style={{ scale: circleScale }}
                  className="w-[20px] h-[20px] rounded-full border-2 border-[#FFFFFF] bg-[#FFFFFF] flex items-center justify-center shadow-sm"
                >
                  <motion.div 
                    className="w-[10px] h-[10px] rounded-full bg-[#DCE5E0] group-hover:bg-[#07583F] transition-colors duration-300" 
                    id={`animated-strategy-circ-inner-${idx}`} 
                  />
                </motion.div>
              </div>

              {/* Step Content Card Area */}
              <motion.div 
                style={{ y: textY }}
                className="flex flex-col items-start lg:items-center mt-0 lg:mt-6 w-full" 
                id={`animated-strategy-card-${idx}`}
              >
                {/* Step Number Badge */}
                <span 
                  className="text-xs font-mono font-bold tracking-wider text-[#626B66] group-hover:text-[#07583F] transition-colors duration-300 mb-2" 
                  id={`animated-strategy-num-${idx}`}
                >
                  0{idx + 1}
                </span>

                {/* Icon Box */}
                <motion.div 
                  style={{ y: iconY }}
                  className="p-3 bg-[#EEF4F0] border border-[#DCE5E0] rounded-xl text-[#07583F] mb-4 transition-colors duration-300 group-hover:border-[#07583F]/30" 
                  id={`animated-strategy-icon-box-${idx}`}
                >
                  <IconComp className="w-5 h-5 text-[#07583F]" id={`animated-strategy-icon-svg-${idx}`} />
                </motion.div>

                {/* Title */}
                <h3 
                  className="text-lg text-[#151B18] font-bold mb-2 group-hover:text-[#07583F] transition-colors duration-300" 
                  id={`animated-strategy-step-title-${idx}`}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm text-[#626B66] leading-relaxed font-normal max-w-full lg:max-w-[240px]" 
                  id={`animated-strategy-step-desc-${idx}`}
                >
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
