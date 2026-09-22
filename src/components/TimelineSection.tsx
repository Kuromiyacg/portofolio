"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, CircleDot, ArrowDown } from "lucide-react";
import portfolio from "@/data/portfolio";

export default function TimelineSection() {
  const [activePhase, setActivePhase] = useState<string>("05");

  return (
    <section
      id="timeline"
      className="relative py-28 sm:py-36 px-6 lg:px-12 border-t border-border/80"
      aria-label="Project Development Timeline"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            06 / LIFECYCLE
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Project Development Timeline
            </h2>
            <p className="text-base sm:text-lg text-muted">
              Structured engineering phases for 2026 releases—from conceptualization
              and architecture through testing and global edge deployment.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>2026 RELEASE CYCLE</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolio.timeline.map((phase) => {
            const isCurrent = activePhase === phase.phase;
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in-progress";

            return (
              <div
                key={phase.phase}
                onMouseEnter={() => setActivePhase(phase.phase)}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                  isCurrent
                    ? "bg-surface-1 border-accent/60 shadow-lg shadow-black/40 ring-1 ring-accent/30"
                    : "bg-surface-1/50 border-border/70 hover:border-border hover:bg-surface-1/80"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded bg-surface-2 border border-accent/20">
                    PHASE {phase.phase}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? "text-green-400 bg-green-950/60 border border-green-800/60"
                        : isInProgress
                        ? "text-accent bg-accent/15 border border-accent/30"
                        : "text-muted bg-surface-2 border border-border/60"
                    }`}
                  >
                    {isCompleted && <CheckCircle2 size={11} />}
                    {isInProgress && <Clock size={11} className="animate-spin" style={{ animationDuration: "6s" }} />}
                    {!isCompleted && !isInProgress && <CircleDot size={11} />}
                    <span className="uppercase">{phase.status.replace("-", " ")}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground font-mono mb-2">
                  {phase.title}
                </h3>

                <p className="text-xs text-muted leading-relaxed font-sans">
                  {phase.description}
                </p>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-muted/70">
                  <span>DEPLOY STAGE {phase.phase}</span>
                  <ArrowDown size={10} className="text-muted/50" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
