import React, { useCallback } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

export function usePointerParallax(
  stiffness = 70,
  damping = 22,
  mass = 0.8
) {
  const xPercent = useMotionValue(0);
  const yPercent = useMotionValue(0);

  const springX = useSpring(xPercent, { stiffness, damping, mass });
  const springY = useSpring(yPercent, { stiffness, damping, mass });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Centered percentage from -0.5 to 0.5
    const px = (x / width) - 0.5;
    const py = (y / height) - 0.5;

    xPercent.set(px);
    yPercent.set(py);
  }, [xPercent, yPercent]);

  const handlePointerLeave = useCallback(() => {
    xPercent.set(0);
    yPercent.set(0);
  }, [xPercent, yPercent]);

  return {
    springX,
    springY,
    handlePointerMove,
    handlePointerLeave,
  };
}
