import React, { useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'motion/react';

export function usePointerTilt(
  maxRotateX = 3,
  maxRotateY = 3,
  stiffness = 130,
  damping = 20,
  mass = 0.7
) {
  const xPercent = useMotionValue(0);
  const yPercent = useMotionValue(0);

  const springX = useSpring(xPercent, { stiffness, damping, mass });
  const springY = useSpring(yPercent, { stiffness, damping, mass });

  // rotateX is driven by mouseY (vertical distance from center)
  // Moving pointer down (positive py) tilts card forward around X (bottom down is positive/negative rotateX, usually py * -max)
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotateX, -maxRotateX]);
  // rotateY is driven by mouseX
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotateY, maxRotateY]);

  // Clean glare positioning (percentages 0% to 100%)
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
    rotateX,
    rotateY,
    glareX,
    glareY,
    handlePointerMove,
    handlePointerLeave,
  };
}
