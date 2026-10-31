import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ScrollRevealSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  id?: string;
}

/**
 * Componente que envolve seções da Landing Page com efeito suave de Fade-In e Slide-Up
 * utilizando a biblioteca Framer Motion à medida que o usuário rola a página.
 */
export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 36,
  duration = 0.65,
  id,
  ...props
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -50px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cubic-bezier suave e executivo
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * Componente complementar para animar cartões, itens de grid ou blocos individuais
 * com entrada suave escalonada.
 */
export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
