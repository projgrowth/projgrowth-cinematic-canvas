import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'scale' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  }
};

const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = ''
}: ScrollRevealProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold });

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
