import React, { useRef } from 'react';
import { motion, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useDevice } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  lang: 'ar' | 'en';
  springX: any;
  springY: any;
  scrollYProgress: any;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  src,
  alt,
  lang,
  springX,
  springY,
  scrollYProgress,
}) => {
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();

  // From start to end of hero scroll, background moves vertically / scales
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.025, 1.075]);
  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Pointer parallax transformations for background image
  // Opposite direction: move mouse right -> image translates slightly left
  const pointerX = useTransform(springX, [-0.5, 0.5], [11, -11]);
  const pointerY = useTransform(springY, [-0.5, 0.5], [7, -7]);

  // Combine transforms or assign to layers
  const activeX = isReduced || !hasFinePointer || isTouch ? 0 : pointerX;
  const activeY = isReduced || !hasFinePointer || isTouch ? 0 : pointerY;
  const activeScale = isReduced || !hasFinePointer || isTouch ? 1.0 : scrollScale;

  return (
    <motion.div
      style={{
        y: isReduced ? 0 : scrollTranslateY,
        scale: activeScale,
      }}
      className="absolute inset-0 h-full w-full overflow-hidden origin-bottom"
    >
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-[42%_center] sm:object-center select-none pointer-events-none"
        style={{
          x: activeX,
          y: activeY,
        }}
        referrerPolicy="no-referrer"
        fetchPriority="high"
      />
    </motion.div>
  );
};

interface ParallaxGlowProps {
  springX: any;
  springY: any;
}

export const ParallaxGlow: React.FC<ParallaxGlowProps> = ({ springX, springY }) => {
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();

  const percentageX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const percentageY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const backgroundStyle = useMotionTemplate`radial-gradient(circle 320px at ${percentageX} ${percentageY}, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 80%)`;

  if (isReduced || !hasFinePointer || isTouch) return null;

  return (
    <motion.div
      style={{ background: backgroundStyle }}
      className="absolute inset-0 z-15 pointer-events-none select-none mix-blend-screen"
    />
  );
};

interface ParallaxContentProps {
  children: React.ReactNode;
  springX: any;
  springY: any;
  className?: string;
  id?: string;
  scrollYProgress: any;
}

export const ParallaxContent: React.FC<ParallaxContentProps> = ({
  children,
  springX,
  springY,
  className,
  id,
  scrollYProgress,
}) => {
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();

  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.72]);

  // Content layers translated differently for 2.5D visual depth
  // Moving in slightly different direction/intensity
  const pointerX = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const pointerY = useTransform(springY, [-0.5, 0.5], [-2, 2]);

  const activeX = isReduced || !hasFinePointer || isTouch ? 0 : pointerX;
  const activeY = isReduced || !hasFinePointer || isTouch ? 0 : pointerY;

  return (
    <motion.div
      style={{
        y: isReduced ? 0 : scrollTranslateY,
        opacity: isReduced ? 1 : scrollOpacity,
      }}
      className={className}
      id={id}
    >
      <motion.div
        style={{
          x: activeX,
          y: activeY,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const { hasFinePointer, isTouch } = useDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 15, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 15, mass: 0.6 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReduced || !hasFinePointer || isTouch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Pull intensity max 3-4px
    const pullX = ((mouseX / width) - 0.5) * 8; // -4px to 4px
    const pullY = ((mouseY / height) - 0.5) * 8; // -4px to 4px

    x.set(pullX);
    y.set(pullY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const canUseMagnetic = !isReduced && hasFinePointer && !isTouch;

  return (
    <motion.div
      ref={ref}
      onPointerMove={canUseMagnetic ? handlePointerMove : undefined}
      onPointerLeave={canUseMagnetic ? handlePointerLeave : undefined}
      style={{ x: springX, y: springY }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
};

