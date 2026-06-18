import React, { useRef } from 'react';
import { motion, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useDevice } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePointerTilt } from '../../hooks/usePointerTilt';

interface InteractiveTiltCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  expandedContent: React.ReactNode;
  exploreLabel: string;
  collapseLabel: string;
  index: number;
  lang: 'ar' | 'en';
  isSelected: boolean;
  onToggle: () => void;
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  id,
  title,
  description,
  icon,
  expandedContent,
  exploreLabel,
  collapseLabel,
  index,
  lang,
  isSelected,
  onToggle,
}) => {
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();
  const cardRef = useRef<HTMLDivElement>(null);

  // Configure Pointer Tilt (max 3 degrees rotation)
  const {
    rotateX,
    rotateY,
    glareX,
    glareY,
    handlePointerMove,
    handlePointerLeave,
  } = usePointerTilt(3, 3);

  // Glare Performance Optimization: Animate opacity without any state-re-renders
  const glareOpacity = useMotionValue(0);
  const springGlareOpacity = useSpring(glareOpacity, { stiffness: 150, damping: 20 });

  const customPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    handlePointerMove(e);
    glareOpacity.set(0.10);
  };

  const customPointerLeave = () => {
    handlePointerLeave();
    glareOpacity.set(0);
  };

  // Dynamic glare overlay template
  const glareBackground = useMotionTemplate`radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const canUsePointerEffects = hasFinePointer && !isTouch && !isReduced && !isSelected;

  // Keyboard, reduced, and mobile states shouldn't activate 3D Tilt
  const activeRotateX = canUsePointerEffects ? rotateX : 0;
  const activeRotateY = canUsePointerEffects ? rotateY : 0;

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-expanded={isSelected}
      aria-label={`${title} - ${description}`}
      onPointerMove={canUsePointerEffects ? customPointerMove : undefined}
      onPointerLeave={canUsePointerEffects ? customPointerLeave : undefined}
      onKeyDown={handleKeyDown}
      onClick={onToggle}
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08 },
        y: { duration: 0.5, delay: index * 0.08 },
        layout: { duration: 0.4 },
      }}
      className={`group relative p-6 sm:p-8 bg-[#FDFDFD] hover:bg-white border rounded-lg flex flex-col justify-between select-none transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-saudi focus-visible:ring-offset-2 ${
        isSelected 
          ? 'border-saudi/40 shadow-md ring-1 ring-saudi bg-white' 
          : 'border-border-light hover:border-saudi/30'
      }`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: activeRotateX,
        rotateY: activeRotateY,
      }}
      whileHover={
        isReduced || !hasFinePointer || isTouch || isSelected
          ? undefined 
          : { y: -5, scale: 1.005 }
      }
      id={`service-card-${id}`}
    >
      {/* Luxury Glare Layer (only on fine pointer + non-reduced-motion) */}
      {!isReduced && hasFinePointer && !isTouch && !isSelected && (
        <motion.div
          className="absolute inset-0 z-20 rounded-lg pointer-events-none select-none mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: springGlareOpacity,
          }}
        />
      )}

      {/* Luxury Static Shine Top Border Visual */}
      <div 
        className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-saudi/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" 
        id={`service-shine-${id}`}
      />

      {/* Preserve-3D Interior Grid Content */}
      <div style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Header Metadata Level (Icon / Number) */}
        <div 
          className="flex items-center justify-between mb-5 sm:mb-8" 
          id={`service-meta-${id}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Icon Box with Z translation */}
          <motion.div 
            className="p-2 sm:p-3 bg-saudi-light border border-saudi/10 rounded-lg text-saudi" 
            id={`service-icon-box-${id}`}
            style={{ 
              transform: isReduced || !hasFinePointer || isTouch || isSelected ? 'none' : 'translateZ(14px)',
              transformStyle: 'preserve-3d' 
            }}
          >
            {icon}
          </motion.div>
          
          {/* Number Badge with Z translation */}
          <span 
            className="text-xs sm:text-sm text-saudi/40 font-extrabold tracking-widest block" 
            id={`service-index-${id}`}
            style={{ transform: isReduced || !hasFinePointer || isTouch || isSelected ? 'none' : 'translateZ(10px)' }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Title Headline with Z translation */}
        <h3 
          className="text-xl text-text-primary font-bold mb-4 group-hover:text-saudi transition-colors" 
          id={`service-title-${id}`}
          style={{ transform: isReduced || !hasFinePointer || isTouch || isSelected ? 'none' : 'translateZ(8px)' }}
        >
          {title}
        </h3>

        {/* Lower body paragraph stays in base plane for razor-sharp legibility */}
        <p className="text-sm text-text-secondary leading-relaxed font-normal mb-6" id={`service-desc-${id}`}>
          {description}
        </p>
      </div>

      {/* Footer Actions Grid - Expand controls */}
      <div 
        className="mt-6 pt-6 border-t border-border-light flex items-center justify-between" 
        id={`service-footer-${id}`}
      >
        <span 
          className="text-[11px] tracking-wider font-semibold text-saudi hover:text-saudi-dark uppercase flex items-center gap-1" 
          id={`service-expand-lbl-${id}`}
        >
          {isSelected ? collapseLabel : exploreLabel}
        </span>
        
        <svg 
          className={`w-4 h-4 text-saudi shrink-0 transition-transform duration-300 ${
            isSelected ? 'rotate-90' : lang === 'ar' ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          id={`service-chevron-${id}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Expanded Details Panel */}
      {expandedContent}

    </motion.div>
  );
};
