"use client";

import { useState } from "react";
import { Check, Flame, Wallet, LayoutGrid, TrendingUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const easeOut = [0.23, 1, 0.32, 1] as const;
const spring = { type: "spring" as const, bounce: 0, duration: 0.34 };

interface FeatureStageProps {
  activeIndex: number;
}

function HabitQuestsDemo() {
  const [streaks, setStreaks] = useState([
    { id: "1", label: "Morning deep work", days: 14, done: true },
    { id: "2", label: "Log daily expenses", days: 11, done: true },
    { id: "3", label: "Evening review", days: 6, done: false },
  ]);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setStreaks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              done: !item.done,
              days: item.done ? Math.max(0, item.days - 1) : item.days + 1,
            }
          : item
      )
    );
  };

  const doneCount = streaks.filter((s) => s.done).length;
  const ratio = streaks.length > 0 ? doneCount / streaks.length : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.1em] text-muted">
          <Flame size={14} className="text-spark" />
          <span>Interactive Demo · Quests</span>
        </div>
        <span className="text-xs font-mono text-foreground tabular-nums">
          {doneCount}/{streaks.length} cleared
        </span>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {streaks.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={item.done}
              className="w-full py-3 flex items-center justify-between gap-3 text-left cursor-pointer group pressable"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-colors duration-150 ${
                    item.done
                      ? "bg-accent border-accent text-surface-1"
                      : "bg-surface-1 border-border-strong group-hover:border-accent/60"
                  }`}
                >
                  <AnimatePresence initial={false}>
                    {item.done && (
                      <motion.span
                        key="check"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.75 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.75 }
                        }
                        transition={{ duration: 0.14, ease: easeOut }}
                      >
                        <Check size={12} strokeWidth={2.75} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className={`text-sm truncate ${
                    item.done ? "text-foreground font-medium" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </span>

              <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                {item.days}d streak
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          className={`h-full w-full rounded-full origin-left transition-colors duration-200 ${
            ratio === 1 ? "bg-spark" : "bg-accent"
          }`}
          initial={false}
          animate={{ scaleX: ratio }}
          transition={prefersReducedMotion ? { duration: 0.05 } : spring}
        />
      </div>
    </div>
  );
}

function FinanceLedgerDemo() {
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");
  const prefersReducedMotion = useReducedMotion();

  const entries = [
    { id: "1", title: "Freelance Milestone", tag: "Income", amount: "+$1,240", kind: "in" as const },
    { id: "2", title: "Cloud & Domains", tag: "Infra", amount: "-$28", kind: "out" as const },
    { id: "3", title: "Monthly Savings", tag: "Goal", amount: "+$480", kind: "in" as const },
    { id: "4", title: "Daily Living", tag: "Essentials", amount: "-$64", kind: "out" as const },
  ];

  const visible = entries.filter((e) =>
    filter === "all" ? true : e.kind === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.1em] text-muted">
          <Wallet size={14} className="text-accent" />
          <span>Sample Ledger · +$1,692 net</span>
        </div>

        <div className="inline-flex p-0.5 rounded-full bg-surface-2/90 border border-border/70">
          {(
            [
              { id: "all", label: "All" },
              { id: "in", label: "In" },
              { id: "out", label: "Out" },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`relative px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="ledger-demo-filter"
                    transition={prefersReducedMotion ? { duration: 0.01 } : spring}
                    className="absolute inset-0 rounded-full bg-surface-1 shadow-xs"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {visible.map((entry) => (
          <li
            key={entry.id}
            className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm"
          >
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">
                {entry.title}
              </p>
              <p className="text-[11px] text-muted">{entry.tag}</p>
            </div>
            <span
              className={`font-mono font-medium tabular-nums shrink-0 ${
                entry.kind === "in" ? "text-accent" : "text-muted"
              }`}
            >
              {entry.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MultiPaneDemo() {
  const [pane, setPane] = useState<"split" | "focus">("split");
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.1em] text-muted">
          <LayoutGrid size={14} className="text-accent" />
          <span>Interactive Demo · Layout</span>
        </div>

        <button
          type="button"
          onClick={() => setPane(pane === "split" ? "focus" : "split")}
          className="px-3 py-1 rounded-full bg-surface-1 border border-border-strong text-xs font-medium text-foreground hover:border-accent/60 pressable cursor-pointer"
        >
          Switch to {pane === "split" ? "Focus" : "Split"}
        </button>
      </div>

      <div
        className={`grid gap-3 ${
          pane === "split" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        }`}
      >
        <motion.div
          layout={prefersReducedMotion ? false : true}
          transition={spring}
          className="p-4 rounded-xl bg-surface-1 border border-border/80 space-y-1.5"
        >
          <span className="text-[11px] font-mono uppercase text-accent">
            Daily Habits
          </span>
          <p className="text-lg font-semibold text-foreground tabular-nums">
            620 XP
          </p>
          <p className="text-xs text-muted">3 of 4 quests cleared today</p>
        </motion.div>

        <motion.div
          layout={prefersReducedMotion ? false : true}
          transition={spring}
          className="p-4 rounded-xl bg-surface-1 border border-border/80 space-y-1.5"
        >
          <span className="text-[11px] font-mono uppercase text-spark">
            Savings Rate
          </span>
          <p className="text-lg font-semibold text-foreground tabular-nums">
            +18.4%
          </p>
          <p className="text-xs text-muted">On track for monthly target</p>
        </motion.div>
      </div>
    </div>
  );
}

function TrendBreakdownDemo() {
  const categories = [
    { name: "Savings & Goals", pct: 46, amount: "$778", highlight: true },
    { name: "Essentials", pct: 34, amount: "$575", highlight: false },
    { name: "Tools & Infra", pct: 20, amount: "$339", highlight: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.1em] text-muted">
          <TrendingUp size={14} className="text-spark" />
          <span>Sample Allocation</span>
        </div>
        <span className="text-xs font-mono text-foreground tabular-nums">
          $1,692 net
        </span>
      </div>

      <div className="space-y-4 border-y border-border py-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs gap-2">
              <span className="font-medium text-foreground">{cat.name}</span>
              <span className="font-mono text-muted tabular-nums shrink-0">
                {cat.amount} ({cat.pct}%)
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
              <div
                className={`h-full rounded-full origin-left ${
                  cat.highlight ? "bg-spark" : "bg-accent"
                }`}
                style={{ transform: `scaleX(${cat.pct / 100})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureStage({ activeIndex }: FeatureStageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-2xl bg-background/90 border border-border p-5 sm:p-6 min-h-[264px] flex flex-col justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.97, y: 4 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.98, y: -4 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.12 : 0.2,
            ease: easeOut,
          }}
        >
          {activeIndex === 0 && <HabitQuestsDemo />}
          {activeIndex === 1 && <FinanceLedgerDemo />}
          {activeIndex === 2 && <MultiPaneDemo />}
          {activeIndex === 3 && <TrendBreakdownDemo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
