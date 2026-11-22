"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import portfolio from "@/data/portfolio";
import HeroInteractivePreview from "./hero/HeroInteractivePreview";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const previewY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -28]
  );

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.42,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative lg:min-h-[calc(100dvh-5rem)] flex items-center pt-10 pb-16 sm:pt-14 sm:pb-24 lg:py-16 px-5 sm:px-8 lg:px-12"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Direct Copy */}
          <div className="lg:col-span-6 space-y-6">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted"
            >
              <span
                className="w-2 h-2 rounded-full bg-status-live shrink-0"
                aria-hidden="true"
              />
              <span>
                {portfolio.personal.location} &middot;{" "}
                {portfolio.personal.availability}
              </span>
            </motion.p>

            <motion.h1
              custom={0.05}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="font-serif text-[clamp(3.1rem,8vw,5.25rem)] leading-[0.98] tracking-[-0.025em] text-foreground text-balance"
            >
              Web software built to be{" "}
              <span className="italic text-accent">used daily.</span>
            </motion.h1>

            <motion.p
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="text-base sm:text-[17px] text-muted leading-relaxed max-w-[46ch] text-pretty"
            >
              {portfolio.personal.shortBio}
            </motion.p>

            <motion.div
              custom={0.15}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-foreground text-surface-1 text-sm font-medium hover:bg-foreground/90 pressable cursor-pointer"
              >
                <span>See LifeTrack AI</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={`mailto:${portfolio.personal.email}`}
                className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full border border-border-strong bg-surface-1/60 text-foreground text-sm font-medium hover:bg-surface-1 pressable cursor-pointer"
              >
                Email me
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive DOM Showcase with subtle scroll-linked depth */}
          <motion.div
            custom={0.12}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            style={{ y: previewY }}
            className="lg:col-span-6 w-full"
          >
            <HeroInteractivePreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
