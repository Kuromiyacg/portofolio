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

  const stageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -24]
  );

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.4,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative overflow-x-clip"
      aria-label="Introduction"
    >
      {/* Swiss architectural hairline vertical grid across the Hero canvas */}
      <div className="mx-auto max-w-7xl swiss-grid-bg border-x border-border/60 px-5 sm:px-8 lg:px-12 pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-24">
        {/* Upper Band: Monumental Edge-to-Edge Editorial Headline (zero card clipping) */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="pb-10 sm:pb-12 lg:pb-14 border-b border-border"
        >
          <h1 className="font-serif text-[clamp(3.1rem,9vw,7.5rem)] leading-[0.94] tracking-[-0.03em] text-foreground text-balance">
            Web software built{" "}
            <br className="hidden sm:block" />
            to be{" "}
            <span className="italic text-accent">used daily</span>
            <span className="text-spark">.</span>
          </h1>
        </motion.div>

        {/* Lower Band: Asymmetric Editorial Column + 3-Layer Overlapping React Bento Stage */}
        <div className="pt-10 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-end">
          {/* Bottom-Left Architectural Cell: Bio, CTAs & Monumental 01 Watermark */}
          <motion.div
            custom={0.08}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col justify-between gap-8 lg:gap-12"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-muted">
                <span
                  className="w-2 h-2 rounded-full bg-status-live shrink-0"
                  aria-hidden="true"
                />
                <span>{portfolio.personal.availability}</span>
              </div>

              <p className="text-base sm:text-[17px] text-foreground/85 leading-relaxed max-w-[40ch] text-pretty">
                {portfolio.personal.shortBio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-foreground text-surface-1 text-sm font-medium hover:bg-foreground/90 pressable cursor-pointer"
                >
                  <span>Explore LifeTrack AI</span>
                  <ArrowRight size={15} />
                </a>

                <a
                  href={`mailto:${portfolio.personal.email}`}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full border border-border-strong bg-surface-1/75 text-foreground text-sm font-medium hover:bg-surface-1 pressable cursor-pointer"
                >
                  Email me
                </a>
              </div>
            </div>

            {/* Oversized Swiss Editorial Watermark Index (00 -> 01 Work -> 02 About -> 03 Stack -> 04 Contact) */}
            <div
              className="hidden lg:flex items-baseline justify-between pt-6 border-t border-border/70 select-none"
              aria-hidden="true"
            >
              <span className="font-serif text-7xl leading-none tracking-[-0.04em] text-foreground/[0.09] tabular-nums">
                00
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Index &middot; 2026
              </span>
            </div>
          </motion.div>

          {/* Bottom-Right Cell: 3-Layer Overlapping Interactive LifeTrack AI Stage */}
          <motion.div
            custom={0.14}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            style={{ y: stageY }}
            className="lg:col-span-7 w-full"
          >
            <HeroInteractivePreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
