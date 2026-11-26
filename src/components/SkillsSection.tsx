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
const spring = { type: "spring" as const, bounce: 0, duration: 0.32 };

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const prefersReducedMotion = useReducedMotion();

  const filteredSkills = portfolio.skills.filter((skill) =>
    activeCategory === "all" ? true : skill.category === activeCategory
  );

  return (
    <section
      id="stack"
      className="py-14 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="Technical Stack"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.12em] text-muted">
              Stack
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.02em] text-foreground">
              Tools I work with
            </h2>
          </div>

          {/* Crisp Underlined Editorial Filter Tabs — Zero Pill Soup */}
          <div
            className="flex flex-wrap items-center gap-6 border-b border-border self-start md:self-auto"
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
                  className={`relative min-h-[44px] pb-2 text-sm font-medium cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="stack-underline"
                      transition={
                        prefersReducedMotion ? { duration: 0.01 } : spring
                      }
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Stabilized container prevents vertical jump of Contact below */}
        <div className="min-h-[260px] border-t border-border">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10"
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
