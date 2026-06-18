import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useDevice } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ImageOff } from 'lucide-react';

interface ParallaxImageProps {
  id?: string;
  src: string;
  alt: string;
  className?: string; // Appears on the outer overflowing container
  imageClassName?: string; // Appears on the actual img inside
  strength?: number; // Parallax Y-axis maximum translate distance
  revealFrom?: 'left' | 'right' | 'top' | 'bottom';
  loading?: 'eager' | 'lazy';
  disableScrollZoom?: boolean;
  disableReveal?: boolean;
  overlayClassName?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  id,
  src,
  alt,
  className = '',
  imageClassName = '',
  strength = 20,
  revealFrom = 'left',
  loading = 'lazy',
  disableScrollZoom = false,
  disableReveal = false,
  overlayClassName = 'bg-white',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();
  const [hasError, setHasError] = useState(false);

  // Monitor visibility of the outer container safely using a low threshold (0.1)
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.15,
  });

  // Offset captures when container enters viewport until it departs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translating Y movement
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [-strength, strength]
  );

  // Subtle zoom breathing scale linked to scroll
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.045, 1, 1.035]
  );

  const isMobileOrTouch = isTouch || !hasFinePointer;
  
  // Disable dynamic parallax zoom/translation if on touch/mobile or reduced motion
  const activeY = isMobileOrTouch || isReduced || strength === 0 ? 0 : imageY;
  const activeScale = isMobileOrTouch || isReduced || disableScrollZoom ? 1 : imageScale;

  // Determine transform parameters for the sliding overlay based on reveal direction
  // For 'left' to reveal left-to-right, the white cover scales down to 0, pivoting on 'right'
  const overlayTransforms = {
    left: { scaleX: 1, scaleY: 1, originX: 1, originY: 0.5, axis: 'x' },
    right: { scaleX: 1, scaleY: 1, originX: 0, originY: 0.5, axis: 'x' },
    top: { scaleX: 1, scaleY: 1, originX: 0.5, originY: 1, axis: 'y' },
    bottom: { scaleX: 1, scaleY: 1, originX: 0.5, originY: 0, axis: 'y' },
  }[revealFrom] || { scaleX: 1, scaleY: 1, originX: 1, originY: 0.5, axis: 'x' };

  // If reveals are completely disabled (e.g. reduced motion, or disabled via props), don't show overlay
  const shouldShowOverlay = !disableReveal && !isReduced;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
      data-parallax-image="container"
    >
      {hasError ? (
        // High fidelity placeholder fallback if image fails to load
        <div 
          className="w-full h-full bg-[#EEF4F0] flex flex-col items-center justify-center p-4 border border-[#DCE5E0] text-center"
          data-parallax-image="error"
        >
          <ImageOff className="w-8 h-8 text-[#626B66] mb-2" />
          <span className="text-xs font-semibold text-[#626B66] max-w-[180px] leading-tight">
            {alt}
          </span>
        </div>
      ) : (
        <>
          {/* Always rendered fully in DOM to avoid blank page bugs */}
          <motion.img
            src={src}
            alt={alt}
            loading={loading}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`block w-full h-full object-cover object-center ${imageClassName}`}
            style={{
              y: activeY,
              scale: activeScale,
              transformStyle: 'preserve-3d',
            }}
            data-parallax-image="img"
          />

          {/* Secure Slide-out Overlapping Mask that unmasks image */}
          {shouldShowOverlay && (
            <motion.div
              aria-hidden="true"
              className={`absolute inset-0 z-10 pointer-events-none ${overlayClassName}`}
              initial={{
                scaleX: 1,
                scaleY: 1,
                transformOrigin: `${overlayTransforms.originX * 100}% ${overlayTransforms.originY * 100}%`,
              }}
              animate={{
                scaleX: isInView && overlayTransforms.axis === 'x' ? 0 : 1,
                scaleY: isInView && overlayTransforms.axis === 'y' ? 0 : 1,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-parallax-image="reveal-overlay"
            />
          )}
        </>
      )}
    </div>
  );
};
