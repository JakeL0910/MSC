'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getInitialX = () => {
    switch (direction) {
      case 'left':
        return 100;
      case 'right':
        return -100;
      default:
        return 0;
    }
  };

  const getInitialY = () => {
    switch (direction) {
      case 'up':
        return 100;
      case 'down':
        return -100;
      default:
        return 0;
    }
  };

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [getInitialX(), 0, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [getInitialY(), 0, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        opacity
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.17, 0.55, 0.55, 1]
      }}
    >
      {children}
    </motion.div>
  );
} 