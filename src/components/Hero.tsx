"use client";

import { ArrowDownRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import portfolio from "@/data/portfolio";

const easeOut = [0.23, 1, 0.32, 1] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.42,
        delay: prefersReducedMotion ? 0 : delay,
        ease: easeOut,
      },
    }),
  };

  return (
    <section
      id="home"
      className="pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 px-5 sm:px-8 lg:px-12"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-6xl">
        {/* Monumental Editorial Display Headline — Pure Typography, Zero Decorative Clutter */}
        <motion.h1
          custom={0}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="font-serif text-[clamp(3.25rem,9.2vw,7.4rem)] leading-[0.94] tracking-[-0.03em] text-foreground max-w-[14ch]"
        >
          Web software built to be{" "}
          <span className="italic text-accent">used daily.</span>
        </motion.h1>

        {/* Asymmetric Editorial Lower Band separated by single hairline rule */}
        <motion.div
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* Left: Concise Human Bio + 1 Solid Action + 1 Plain Text Link */}
          <div className="lg:col-span-6 space-y-7">
            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-[46ch] text-pretty">
              {portfolio.personal.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-md bg-foreground text-surface-1 text-sm font-medium hover:bg-foreground/90 pressable cursor-pointer"
              >
                <span>See LifeTrack AI</span>
                <ArrowDownRight size={15} />
              </a>

              <a
                href={`mailto:${portfolio.personal.email}`}
                className="inline-flex items-center min-h-[44px] text-sm font-medium text-foreground underline underline-offset-4 decoration-border-strong hover:decoration-accent hover:text-accent transition-colors duration-150"
              >
                {portfolio.personal.email}
              </a>
            </div>
          </div>

          {/* Right: Quiet Tabular Fact List (real data only — zero fake charts) */}
          <dl className="lg:col-span-5 lg:col-start-8 divide-y divide-border border-y border-border text-sm">
            <div className="py-3.5 flex items-baseline justify-between gap-4">
              <dt className="text-muted">Role</dt>
              <dd className="font-medium text-foreground text-right">
                {portfolio.personal.role}
              </dd>
            </div>
            <div className="py-3.5 flex items-baseline justify-between gap-4">
              <dt className="text-muted">Location</dt>
              <dd className="font-medium text-foreground text-right">
                {portfolio.personal.location}
              </dd>
            </div>
            <div className="py-3.5 flex items-baseline justify-between gap-4">
              <dt className="text-muted">Currently building</dt>
              <dd className="inline-flex items-center gap-2 font-medium text-foreground text-right">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-spark shrink-0"
                  aria-hidden="true"
                />
                <span>{portfolio.featuredProject.title}</span>
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
