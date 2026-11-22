"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type PreviewTab = "overview" | "habits" | "finance";

interface HabitItem {
  id: string;
  label: string;
  xp: number;
  done: boolean;
}

const initialHabits: HabitItem[] = [
  { id: "deep-work", label: "Deep Work 2h", xp: 240, done: true },
  { id: "run", label: "Morning Run 5k", xp: 200, done: true },
  { id: "read", label: "Read 25 pages", xp: 180, done: true },
  { id: "journal", label: "Evening Journal", xp: 140, done: false },
];

const savingsBars = [
  { month: "Jan", rate: "+11.2%", primary: 38, secondary: 24 },
  { month: "Feb", rate: "+14.8%", primary: 58, secondary: 36 },
  { month: "Mar", rate: "+13.5%", primary: 52, secondary: 32 },
  { month: "Apr", rate: "+17.9%", primary: 74, secondary: 44 },
  { month: "May", rate: "+19.6%", primary: 84, secondary: 52 },
  { month: "Jun", rate: "+22.4%", primary: 92, secondary: 60 },
];

const financeEntries = [
  { label: "Freelance Milestone", category: "Income", amount: "+$1,240", positive: true },
  { label: "Cloud & Domains", category: "Tools", amount: "-$28", positive: false },
  { label: "Monthly Savings", category: "Goal", amount: "+$480", positive: true },
];

const easeOut = [0.23, 1, 0.32, 1] as const;
const spring = { type: "spring" as const, bounce: 0, duration: 0.34 };

export default function HeroInteractivePreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("overview");
  const [habits, setHabits] = useState<HabitItem[]>(initialHabits);
  const [inspectedMonth, setInspectedMonth] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  const completedCount = habits.filter((h) => h.done).length;
  const allCompleted = completedCount === habits.length;
  const totalXp = habits.reduce((sum, h) => sum + (h.done ? h.xp : 0), 0);
  const maxXp = habits.reduce((sum, h) => sum + h.xp, 0);
  const progressRatio = totalXp / maxXp;
  const progressPct = Math.round(progressRatio * 100);

  const activeBar =
    inspectedMonth !== null ? savingsBars[inspectedMonth] : null;

  const tabs: { id: PreviewTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "habits", label: "Habits" },
    { id: "finance", label: "Finance" },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto lg:mr-0">
      {/* Soft Cobalt atmospheric wash — gives depth and warmth without neon glare */}
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-[2.5rem] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 52% 48%, rgba(34, 73, 198, 0.14) 0%, rgba(34, 73, 198, 0.04) 48%, transparent 74%)",
        }}
        aria-hidden="true"
      />

      <div className="paper-card rounded-2xl p-4 sm:p-5">
        {/* Card Top Header */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-foreground">
              LifeTrack AI
            </span>
            <span className="text-[11px] font-mono text-muted px-2 py-0.5 rounded-full bg-surface-2/80">
              Live Preview
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {allCompleted ? (
              <motion.span
                key="all-done"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: easeOut }}
                className="text-[11px] font-mono text-accent bg-accent-soft px-2 py-0.5 rounded-full tabular-nums"
              >
                All quests complete
              </motion.span>
            ) : (
              <motion.span
                key="progress-count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="text-[11px] font-mono text-muted tabular-nums"
              >
                {completedCount}/{habits.length} done
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Apple-style Segmented Control */}
        <div
          className="grid grid-cols-3 p-1 rounded-full bg-surface-2/85 border border-border/70 mb-4"
          role="tablist"
          aria-label="LifeTrack AI preview views"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative min-h-[36px] rounded-full text-xs sm:text-[13px] font-medium cursor-pointer transition-colors duration-150 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="hero-preview-tab"
                    transition={
                      prefersReducedMotion ? { duration: 0.01 } : spring
                    }
                    className="absolute inset-0 rounded-full bg-surface-1 shadow-xs border border-border/60 -z-0"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
              }
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2, ease: easeOut }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {/* Habit Quest Panel */}
              <div className="rounded-xl bg-background/70 border border-border p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-xs font-semibold text-foreground">
                      Habit Quest
                    </h3>
                    <span className="text-[11px] font-mono text-muted">
                      Interactive
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {habits.map((habit) => (
                      <li key={habit.id}>
                        <button
                          type="button"
                          onClick={() => toggleHabit(habit.id)}
                          aria-pressed={habit.done}
                          className="w-full flex items-center gap-2.5 py-1 text-left rounded-md group cursor-pointer pressable"
                        >
                          <span
                            className={`w-4 h-4 rounded-[5px] flex items-center justify-center shrink-0 border transition-colors duration-150 ${
                              habit.done
                                ? "bg-accent border-accent text-surface-1"
                                : "bg-surface-1 border-border-strong group-hover:border-accent/60"
                            }`}
                          >
                            <AnimatePresence initial={false}>
                              {habit.done && (
                                <motion.span
                                  key="check"
                                  initial={
                                    prefersReducedMotion
                                      ? { opacity: 0 }
                                      : { opacity: 0, scale: 0.8 }
                                  }
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={
                                    prefersReducedMotion
                                      ? { opacity: 0 }
                                      : { opacity: 0, scale: 0.8 }
                                  }
                                  transition={{ duration: 0.16, ease: easeOut }}
                                >
                                  <Check size={11} strokeWidth={2.75} />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </span>
                          <span
                            className={`text-xs transition-colors truncate ${
                              habit.done
                                ? "text-foreground"
                                : "text-muted group-hover:text-foreground"
                            }`}
                          >
                            {habit.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-border/70">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-1.5 tabular-nums">
                    <span>Level 12 &middot; {totalXp} XP</span>
                    <span className="text-foreground font-medium">
                      {progressPct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
                    <motion.div
                      className="h-full w-full rounded-full bg-accent origin-left"
                      initial={false}
                      animate={{ scaleX: progressRatio }}
                      transition={
                        prefersReducedMotion ? { duration: 0.05 } : spring
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Personal Finance Panel with Interactive Monthly Inspection */}
              <div className="rounded-xl bg-background/70 border border-border p-3.5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">
                    Personal Finance
                  </h3>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeBar ? activeBar.month : "avg"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14, ease: easeOut }}
                    >
                      <p className="text-[11px] text-muted">
                        {activeBar ? `${activeBar.month} Savings` : "Savings Rate"}
                      </p>
                      <p className="text-2xl font-bold tracking-[-0.02em] text-foreground tabular-nums mt-0.5">
                        {activeBar ? activeBar.rate : "+18.4%"}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div
                  className="mt-4 h-24 flex items-end justify-between gap-1.5 pt-2"
                  role="group"
                  aria-label="Six month savings trend"
                  onPointerLeave={() => setInspectedMonth(null)}
                >
                  {savingsBars.map((bar, idx) => {
                    const isInspected = inspectedMonth === idx;
                    const isDimmed = inspectedMonth !== null && !isInspected;
                    return (
                      <button
                        key={bar.month}
                        type="button"
                        aria-label={`${bar.month}: ${bar.rate}`}
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse") setInspectedMonth(idx);
                        }}
                        onFocus={() => setInspectedMonth(idx)}
                        onBlur={() => setInspectedMonth(null)}
                        onClick={() =>
                          setInspectedMonth(isInspected ? null : idx)
                        }
                        className="flex-1 h-full flex flex-col items-center justify-end gap-1 cursor-pointer focus-visible:outline-accent rounded-sm"
                        style={{
                          opacity: isDimmed ? 0.42 : 1,
                          transition: "opacity 150ms cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        <div
                          className="w-full flex-1 flex items-end justify-center gap-0.5 origin-bottom"
                          style={{
                            transform:
                              isInspected && !prefersReducedMotion
                                ? "scaleY(1.05)"
                                : "scaleY(1)",
                            transition:
                              "transform 150ms cubic-bezier(0.23, 1, 0.32, 1)",
                          }}
                        >
                          <span
                            className="w-1.5 rounded-t-full bg-accent"
                            style={{ height: `${bar.primary}%` }}
                          />
                          <span
                            className="w-1.5 rounded-t-full bg-surface-2 border border-border/50"
                            style={{ height: `${bar.secondary}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-muted">
                          {bar.month[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "habits" && (
            <motion.div
              key="habits"
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
              }
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2, ease: easeOut }}
              className="rounded-xl bg-background/70 border border-border p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  Today&apos;s Quests
                </span>
                <span className="font-mono text-accent tabular-nums">
                  {totalXp} / {maxXp} XP
                </span>
              </div>

              <ul className="divide-y divide-border/70">
                {habits.map((habit) => (
                  <li key={habit.id}>
                    <button
                      type="button"
                      onClick={() => toggleHabit(habit.id)}
                      aria-pressed={habit.done}
                      className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer group pressable"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`w-4 h-4 rounded-[5px] flex items-center justify-center border transition-colors ${
                            habit.done
                              ? "bg-accent border-accent text-surface-1"
                              : "bg-surface-1 border-border-strong group-hover:border-accent/60"
                          }`}
                        >
                          <AnimatePresence initial={false}>
                            {habit.done && (
                              <motion.span
                                key="check"
                                initial={
                                  prefersReducedMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.8 }
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                exit={
                                  prefersReducedMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.8 }
                                }
                                transition={{ duration: 0.16, ease: easeOut }}
                              >
                                <Check size={11} strokeWidth={2.75} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                        <span
                          className={`text-sm ${
                            habit.done
                              ? "text-foreground font-medium"
                              : "text-muted"
                          }`}
                        >
                          {habit.label}
                        </span>
                      </span>
                      <span className="text-xs font-mono text-muted tabular-nums">
                        +{habit.xp} XP
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === "finance" && (
            <motion.div
              key="finance"
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
              }
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2, ease: easeOut }}
              className="rounded-xl bg-background/70 border border-border p-4 space-y-3"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted">
                    Monthly Ledger
                  </p>
                  <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">
                    +$1,692 net
                  </p>
                </div>
                <span className="text-xs font-mono text-accent bg-accent-soft px-2.5 py-1 rounded-full tabular-nums">
                  +18.4% saved
                </span>
              </div>

              <ul className="divide-y divide-border/70">
                {financeEntries.map((entry) => (
                  <li
                    key={entry.label}
                    className="py-2.5 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {entry.label}
                      </p>
                      <p className="text-[11px] text-muted">{entry.category}</p>
                    </div>
                    <span
                      className={`font-mono font-medium tabular-nums ${
                        entry.positive ? "text-foreground" : "text-muted"
                      }`}
                    >
                      {entry.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
