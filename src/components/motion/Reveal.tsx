"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const fluidEase = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.38,
        delay: prefersReducedMotion ? 0 : delay,
        ease: fluidEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function RevealGroup({
  children,
  className,
  stagger = 0.05,
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

export function RevealItem({
  children,
  className,
  y = 12,
}: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0.15 : 0.36,
            ease: fluidEase,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
