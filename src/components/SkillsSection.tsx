"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import portfolio, { Skill } from "@/data/portfolio";

type CategoryFilter = "all" | Skill["category"];

const categories: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "language", label: "Languages" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "workflow", label: "Workflow" },
];

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
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="Technical Stack"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2.5">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-accent">
              03 &mdash; Stack
            </p>
            <h2 className="font-serif text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.04] tracking-[-0.02em] text-foreground">
              Tools I work with.
            </h2>
          </div>

          {/* Apple-style Segmented Filter */}
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
        </div>

        {/* Clean, Scannable Typographic Grid (no heavy card-in-card clutter) */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-border">
          {filteredSkills.map((skill) => (
            <li
              key={skill.name}
              className="py-5 border-b border-border flex flex-col justify-between gap-1.5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted">
                  {skill.category}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {skill.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
