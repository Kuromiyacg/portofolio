"use client";

import React from "react";
import { Hammer, ArrowRight, Sparkles, Clock } from "lucide-react";
import portfolio from "@/data/portfolio";

export default function UpcomingProjectsSection() {
  return (
    <section
      id="upcoming"
      className="relative py-32 sm:py-40 lg:py-44 px-6 lg:px-12 bg-surface-1/40 border-t border-border/80"
      aria-label="Upcoming Projects Section"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            05 / IN DEVELOPMENT
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Upcoming &amp; Active Builds
            </h2>
            <p className="text-base sm:text-lg text-muted">
              Projects currently in development and engineering pipelines. All progress
              metrics and phases are editable values.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted bg-surface-1 px-3 py-1.5 rounded-lg border border-border">
            <Clock size={13} className="text-accent" />
            <span>CONTINUOUS CYCLE 2026</span>
          </div>
        </div>

        {/* Upcoming Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.upcomingProjects.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-xl bg-surface-1 border border-border/80 hover:border-accent/40 transition-all duration-300 space-y-6"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-border/60">
                <div>
                  <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                    {item.type}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-mono">
                    {item.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {item.status}
                </span>
              </div>

              {/* Progress Metric Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted flex items-center gap-1.5">
                    <Hammer size={12} className="text-accent" />
                    DEVELOPMENT PROGRESS
                  </span>
                  <span className="text-foreground font-bold">
                    {item.progressLabel} ({item.progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <div
                    style={{ width: `${item.progressPercent}%` }}
                    className="h-full rounded-full bg-accent transition-all duration-500"
                  />
                </div>
              </div>

              {/* Milestones Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                <div className="p-3 rounded bg-surface-2/60 border border-border/60 space-y-1">
                  <span className="text-[11px] text-muted block">CURRENT PHASE</span>
                  <p className="text-foreground font-medium text-xs">
                    {item.currentPhase}
                  </p>
                </div>
                <div className="p-3 rounded bg-surface-2/60 border border-border/60 space-y-1">
                  <span className="text-[11px] text-muted block flex items-center gap-1">
                    <span>NEXT MILESTONE</span>
                    <ArrowRight size={10} className="text-accent" />
                  </span>
                  <p className="text-accent font-medium text-xs">
                    {item.nextMilestone}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-surface-2 text-[11px] font-mono text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Active Architecture Note */}
        <div className="mt-10 p-5 rounded-lg bg-surface-1 border border-border/80 flex items-center gap-3 text-xs font-mono text-muted">
          <Sparkles size={14} className="text-accent shrink-0" />
          <span>
            Upcoming systems are built using the same modular architecture, with strict
            type-safety and performance budgets enforced at the pre-commit stage.
          </span>
        </div>
      </div>
    </section>
  );
}
