"use client";

import React, { useState } from "react";
import { GitCommit, Milestone, CheckCircle2 } from "lucide-react";
import portfolio from "@/data/portfolio";

export default function ExperienceSection() {
  const [activeStep, setActiveStep] = useState<string>("05");

  return (
    <section
      id="experience"
      className="relative py-32 sm:py-40 lg:py-44 px-6 lg:px-12 border-t border-border/80"
      aria-label="Experience & Journey Section"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            03 / PROGRESSION
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="max-w-3xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Development Journey
          </h2>
          <p className="text-base sm:text-lg text-muted">
            The chronological progression of building software—from initial web fundamentals
            to modern full-stack architectures and AI-assisted workflows.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-border/70 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {portfolio.journey.map((step) => {
            const isActive = activeStep === step.number;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(step.number)}
                className={`relative group transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                {/* Node indicator on the timeline track */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-accent text-background ring-4 ring-accent/20"
                      : "bg-surface-1 border border-border text-muted group-hover:border-accent/60 group-hover:text-accent"
                  }`}
                  aria-hidden="true"
                >
                  {step.number === "05" ? (
                    <CheckCircle2 size={12} className={isActive ? "text-background" : "text-accent"} />
                  ) : (
                    <GitCommit size={12} />
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`p-6 rounded-lg border transition-all ${
                    isActive
                      ? "bg-surface-1 border-accent/60 shadow-lg shadow-black/40"
                      : "bg-surface-1/40 border-border/70 hover:border-border hover:bg-surface-1/80"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-accent font-bold px-2 py-0.5 rounded bg-surface-2 border border-accent/20">
                        STAGE {step.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>

                    {step.number === "05" && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        CURRENT FOCUS
                      </span>
                    )}
                  </div>

                  <p className="text-base text-muted leading-relaxed max-w-3xl">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Footer */}
        <div className="mt-16 p-6 rounded-lg bg-surface-1 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted">
          <div className="flex items-center gap-2 text-foreground">
            <Milestone size={16} className="text-accent" />
            <span>CONTINUOUS EVOLUTION:</span>
            <span className="text-muted">Iterating codebases, refining architectures, shipping solutions.</span>
          </div>
          <span className="text-muted/80">© 2026 ROADMAP</span>
        </div>
      </div>
    </section>
  );
}
