"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import portfolio, { Skill } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";

type CategoryFilter = "all" | Skill["category"];

const categories: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "language", label: "Languages" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "workflow", label: "Workflow" },
];

const easeOut = [0.23, 1, 0.32, 1] as const;
const spring = { type: "spring" as const, bounce: 0, duration: 0.34 };

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const prefersReducedMotion = useReducedMotion();

  const filteredSkills = portfolio.skills.filter((skill) =>
    activeCategory === "all" ? true : skill.category === activeCategory
  );

  return (
    <section
      id="stack"
      className="border-t border-border"
      aria-label="Technical Stack"
    >
      <div className="mx-auto max-w-7xl border-x border-border/60 px-5 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2.5">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-muted">
              <span className="text-spark font-medium">03</span> &mdash; Stack
            </p>
            <h2 className="font-serif text-[clamp(2.35rem,5vw,3.8rem)] leading-[1.04] tracking-[-0.025em] text-foreground">
              Tools I work with<span className="text-spark">.</span>
            </h2>
          </div>

          {/* Segmented Filter */}
          <div
            className="inline-flex flex-wrap p-1 rounded-full bg-surface-2/85 border border-border/70 self-start md:self-auto"
            role="tablist"
            aria-label="Filter technologies by category"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative min-h-[38px] px-4 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="stack-filter-pill"
                      transition={
                        prefersReducedMotion ? { duration: 0.01 } : spring
                      }
                      className="absolute inset-0 rounded-full bg-surface-1 shadow-xs border border-border/60"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Stabilized container prevents vertical jump of ContactSection when switching categories */}
        <div className="min-h-[280px] border-t border-border">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={activeCategory}
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
              }
              transition={{
                duration: prefersReducedMotion ? 0.1 : 0.18,
                ease: easeOut,
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8"
            >
              {filteredSkills.map((skill) => (
                <li
                  key={skill.name}
                  className="py-5 border-b border-border flex flex-col justify-between gap-1.5 min-w-0"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted shrink-0">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {skill.note}
                  </p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
