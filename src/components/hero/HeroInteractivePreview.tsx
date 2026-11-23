"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import portfolio from "@/data/portfolio";

interface HabitItem {
  id: string;
  label: string;
  xp: number;
  done: boolean;
}

const initialHabits: HabitItem[] = [
  { id: "deep-work", label: "Morning deep work", xp: 240, done: true },
  { id: "expenses", label: "Log daily expenses", xp: 180, done: true },
  { id: "impulse", label: "Zero impulse spend", xp: 200, done: true },
  { id: "review", label: "Evening review", xp: 140, done: false },
];

const monthlyData = [
  { month: "Jan", x: 18, habitY: 112, streakY: 120, savings: "+11.2%" },
  { month: "Feb", x: 76, habitY: 92, streakY: 102, savings: "+13.6%" },
  { month: "Mar", x: 134, habitY: 74, streakY: 94, savings: "+14.8%" },
  { month: "Apr", x: 192, habitY: 82, streakY: 78, savings: "+16.1%" },
  { month: "May", x: 250, habitY: 42, streakY: 64, savings: "+18.4%" },
  { month: "Jun", x: 308, habitY: 56, streakY: 44, savings: "+20.2%" },
  { month: "Jul", x: 366, habitY: 38, streakY: 52, savings: "+21.8%" },
];

const easeOut = [0.23, 1, 0.32, 1] as const;
const spring = { type: "spring" as const, bounce: 0, duration: 0.34 };

export default function HeroInteractivePreview() {
  const [habits, setHabits] = useState<HabitItem[]>(initialHabits);
  const [inspectedIdx, setInspectedIdx] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  const completedCount = habits.filter((h) => h.done).length;
  const allCompleted = habits.length > 0 && completedCount === habits.length;
  const totalXp = habits.reduce((sum, h) => sum + (h.done ? h.xp : 0), 0);
  const maxXp = habits.reduce((sum, h) => sum + h.xp, 0);
  const progressRatio = maxXp > 0 ? totalXp / maxXp : 0;
  const progressPct = Math.round(progressRatio * 100);

  const activePoint =
    inspectedIdx !== null ? monthlyData[inspectedIdx] : monthlyData[4];

  return (
    <div className="relative w-full pt-2 sm:pt-5">
      {/* Layer 3: Signal Vermilion Graphic Stamp anchored cleanly at top-right (zero collision with left labels) */}
      <a
        href={portfolio.featuredProject.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative sm:absolute sm:top-0 sm:right-5 z-30 mb-3 sm:mb-0 inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-[38px] px-4 rounded-lg bg-spark text-[#FCFBF8] font-mono text-[11px] font-medium tracking-[0.1em] uppercase hover:bg-spark-hover shadow-lg shadow-spark/25 pressable"
      >
        <span>Live on Vercel</span>
        <ArrowUpRight size={13} />
      </a>

      {/* Layer 1: Deep Espresso Ink Monolith Analytics Window (100% unobstructed interactive controls) */}
      <div className="ink-monolith relative z-10 rounded-2xl p-5 sm:p-6 sm:pb-10">
        {/* Window Top Chrome: both LifeTrack AI & Sample UI grouped cleanly on left */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 sm:pr-40">
          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
            <span
              className="w-2 h-2 rounded-full bg-accent shrink-0"
              aria-hidden="true"
            />
            <span className="font-mono text-xs tracking-[0.12em] uppercase text-[#F5F1EA] truncate">
              LifeTrack AI
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#A39D93] px-2 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">
              Sample UI
            </span>
          </div>
        </div>

        {/* Analytics Chart Header + Always-Visible Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#D6D0C6]">
            Habit consistency &amp; savings trajectory
          </p>

          <div className="flex items-center gap-3 font-mono text-[10px] text-[#A39D93]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#527BFF]" />
              Habits
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-spark" />
              Savings
            </span>
          </div>
        </div>

        {/* Crisp Dual-Curve SVG Visualization (Cobalt + Signal Vermilion) */}
        <div
          className="mt-3 relative rounded-xl bg-[#11100F] border border-white/8 p-3"
          onPointerLeave={() => setInspectedIdx(null)}
        >
          <svg
            viewBox="0 0 384 148"
            className="w-full h-36 sm:h-40 overflow-visible"
            role="img"
            aria-label="Sample habit consistency and streak trend across January to July"
          >
            <defs>
              <linearGradient id="cobaltFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2249C6" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#2249C6" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D94E2A" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#D94E2A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[36, 76, 116].map((y) => (
              <line
                key={y}
                x1="8"
                x2="376"
                y1={y}
                y2={y}
                stroke="rgba(245,241,234,0.07)"
                strokeDasharray="2 4"
              />
            ))}

            {/* Cobalt Habit Consistency Area & Line */}
            <path
              d="M18 112 C48 106, 54 92, 76 92 C98 92, 110 74, 134 74 C158 74, 168 82, 192 82 C216 82, 226 42, 250 42 C274 42, 284 56, 308 56 C332 56, 344 38, 366 38 L366 132 L18 132 Z"
              fill="url(#cobaltFill)"
            />
            <path
              d="M18 112 C48 106, 54 92, 76 92 C98 92, 110 74, 134 74 C158 74, 168 82, 192 82 C216 82, 226 42, 250 42 C274 42, 284 56, 308 56 C332 56, 344 38, 366 38"
              fill="none"
              stroke="#527BFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Vermilion Streak Momentum Area & Line */}
            <path
              d="M18 120 C48 115, 54 102, 76 102 C98 102, 110 94, 134 94 C158 94, 168 78, 192 78 C216 78, 226 64, 250 64 C274 64, 284 44, 308 44 C332 44, 344 52, 366 52 L366 132 L18 132 Z"
              fill="url(#sparkFill)"
            />
            <path
              d="M18 120 C48 115, 54 102, 76 102 C98 102, 110 94, 134 94 C158 94, 168 78, 192 78 C216 78, 226 64, 250 64 C274 64, 284 44, 308 44 C332 44, 344 52, 366 52"
              fill="none"
              stroke="#D94E2A"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Active vertical guide & interactive point */}
            <line
              x1={activePoint.x}
              x2={activePoint.x}
              y1="20"
              y2="132"
              stroke="rgba(245,241,234,0.22)"
              strokeWidth="1"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.habitY}
              r="4.5"
              fill="#527BFF"
              stroke="#171614"
              strokeWidth="2"
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.streakY}
              r="4.5"
              fill="#D94E2A"
              stroke="#171614"
              strokeWidth="2"
            />
          </svg>

          {/* Interactive Month Scrub Buttons (100% uncovered & touch-friendly) */}
          <div className="mt-1 grid grid-cols-7 gap-1">
            {monthlyData.map((pt, idx) => {
              const isSelected = activePoint.month === pt.month;
              return (
                <button
                  key={pt.month}
                  type="button"
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setInspectedIdx(idx);
                  }}
                  onFocus={() => setInspectedIdx(idx)}
                  onClick={() => setInspectedIdx(idx)}
                  className={`min-h-[40px] sm:min-h-[32px] rounded font-mono text-[10px] sm:text-[11px] transition-colors cursor-pointer ${
                    isSelected
                      ? "text-[#F5F1EA] bg-white/12 font-medium"
                      : "text-[#8F8980] hover:text-[#D6D0C6]"
                  }`}
                >
                  {pt.month}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Metric Shelf (left-aligned so Layer 2 only overlaps empty space on right) */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-end justify-between gap-4 sm:pr-72">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePoint.month}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14, ease: easeOut }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#A39D93]">
                {activePoint.month} Savings Rate
              </p>
              <p className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#F5F1EA] tabular-nums mt-0.5">
                {activePoint.savings}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="font-mono text-[11px] text-[#A39D93] tabular-nums">
            {totalXp} XP today ({progressPct}%)
          </p>
        </div>
      </div>

      {/* Layer 2: Foreground Ivory Habit Quest Card — overlaps ONLY the lower-right shelf below Jan–Jul */}
      <div className="paper-card relative z-20 mt-4 sm:-mt-20 sm:ml-auto sm:mr-4 w-full sm:w-[276px] rounded-2xl p-4 sm:p-5 border-border-strong">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">
            Habit Quest
          </h3>

          <AnimatePresence mode="wait" initial={false}>
            {allCompleted ? (
              <motion.span
                key="complete"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: easeOut }}
                className="font-mono text-[10px] tracking-[0.06em] uppercase text-spark bg-spark-soft px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
              >
                All cleared
              </motion.span>
            ) : (
              <motion.span
                key="count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="font-mono text-[11px] text-muted tabular-nums whitespace-nowrap shrink-0"
              >
                {completedCount}/{habits.length} done
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <ul className="space-y-1">
          {habits.map((habit) => (
            <li key={habit.id}>
              <button
                type="button"
                onClick={() => toggleHabit(habit.id)}
                aria-pressed={habit.done}
                title={habit.label}
                className="w-full flex items-start gap-2.5 py-1.5 text-left rounded-lg group cursor-pointer pressable"
              >
                <span
                  className={`mt-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-150 ${
                    habit.done
                      ? "bg-accent border-accent text-surface-1"
                      : "bg-background border-border-strong group-hover:border-accent/60"
                  }`}
                >
                  <AnimatePresence initial={false}>
                    {habit.done && (
                      <motion.span
                        key="check"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.78 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.78 }
                        }
                        transition={{ duration: 0.16, ease: easeOut }}
                      >
                        <Check size={11} strokeWidth={2.75} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className={`text-xs sm:text-[13px] leading-snug transition-colors min-w-0 ${
                    habit.done
                      ? "text-foreground font-medium"
                      : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {habit.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* GPU-only scaleX XP bar */}
        <div className="mt-3.5 pt-3 border-t border-border/80">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1.5 tabular-nums">
            <span>Daily XP</span>
            <span className="text-foreground font-medium">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
            <motion.div
              className={`h-full w-full rounded-full origin-left transition-colors duration-200 ${
                allCompleted ? "bg-spark" : "bg-accent"
              }`}
              initial={false}
              animate={{ scaleX: progressRatio }}
              transition={prefersReducedMotion ? { duration: 0.05 } : spring}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
