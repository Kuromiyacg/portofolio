"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent origin-left pointer-events-none"
      aria-hidden="true"
    />
  );
}
