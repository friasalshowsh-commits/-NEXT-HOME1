import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type RevealVariant = 'fade-up' | 'clip' | 'lines';

interface SectionTitleRevealProps {
  text: string;
  variant?: RevealVariant;
  className?: string;
  id?: string;
}

export const SectionTitleReveal: React.FC<SectionTitleRevealProps> = ({
  text,
  variant = 'fade-up',
  className = '',
  id,
}) => {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return (
      <h2 className={className} id={id}>
        {text.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
    );
  }

  // Animation Variant: 'fade-up'
  if (variant === 'fade-up') {
    return (
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {text}
      </motion.h2>
    );
  }

  // Animation Variant: 'clip'
  if (variant === 'clip') {
    return (
      <motion.h2
        id={id}
        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0.3 }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {text}
      </motion.h2>
    );
  }

  // Animation Variant: 'lines'
  const lines = text.split('\n');
  return (
    <h2 className={className} id={id}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden relative" id={`${id}-line-wrapper-${idx}`}>
          <motion.span
            className="block"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: idx * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            id={`${id}-line-span-${idx}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};
