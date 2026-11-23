"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import portfolio, { Project } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";
import FeatureStage from "./projects/FeatureStage";
import ProjectPreviewModal from "./projects/ProjectPreviewModal";

const spring = { type: "spring" as const, bounce: 0, duration: 0.34 };

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedFeature, setSelectedFeature] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const project = portfolio.featuredProject;

  return (
    <section
      id="work"
      className="border-t border-border"
      aria-label="Featured Work"
    >
      <div className="mx-auto max-w-7xl border-x border-border/60 px-5 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28">
        {/* Editorial Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-border">
          <div className="space-y-2.5">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-muted">
              <span className="text-spark font-medium">{project.number}</span>{" "}
              &mdash; Case Study
            </p>
            <h2 className="font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[1] tracking-[-0.025em] text-foreground">
              {project.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveProject(project)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-foreground text-surface-1 text-sm font-medium hover:bg-foreground/90 pressable cursor-pointer"
            >
              <Play size={13} className="fill-current" />
              <span>Open Live Preview</span>
            </button>

            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 rounded-full border border-border-strong bg-surface-1 text-foreground text-sm font-medium hover:border-foreground/40 pressable"
            >
              <span>Visit Vercel</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        {/* Flattened Editorial Overview + Metadata Strip (no redundant outer card) */}
        <Reveal delay={0.04}>
          <div className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-b border-border">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xl sm:text-2xl font-medium tracking-[-0.015em] text-foreground leading-snug text-pretty">
                {project.tagline}
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-[60ch]">
                {project.description}
              </p>
            </div>

            <dl className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 content-start text-sm">
              <div className="min-w-0">
                <dt className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted mb-1">
                  Role
                </dt>
                <dd className="font-medium text-foreground break-words">
                  {project.role}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted mb-1">
                  Status
                </dt>
                <dd className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-spark shrink-0" />
                  <span>{project.status}</span>
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted mb-1">
                  Year
                </dt>
                <dd className="font-mono text-foreground tabular-nums">
                  {project.year}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted mb-1">
                  Type
                </dt>
                <dd className="text-foreground break-words">{project.type}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* Interactive Feature Explorer (clean 2-col split on Warm Paper) */}
        <Reveal delay={0.06}>
          <div className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start border-b border-border">
            <div
              className="lg:col-span-6 divide-y divide-border border-y border-border"
              role="tablist"
              aria-label="LifeTrack AI core features"
            >
              {project.keyFeatures.map((feature, index) => {
                const isSelected = selectedFeature === index;
                return (
                  <button
                    key={feature.title}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedFeature(index)}
                    className={`relative w-full text-left py-4 px-4 transition-colors duration-150 cursor-pointer pressable ${
                      isSelected ? "bg-surface-1/90" : "hover:bg-surface-1/40"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="feature-active-bar"
                        transition={
                          prefersReducedMotion ? { duration: 0.01 } : spring
                        }
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-spark"
                      />
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className={`text-sm sm:text-base font-semibold tracking-[-0.01em] ${
                          isSelected ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <span
                        className={`text-xs font-mono tabular-nums ${
                          isSelected ? "text-spark" : "text-muted"
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mt-1">
                      {feature.detail}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-6">
              <FeatureStage activeIndex={selectedFeature} />
            </div>
          </div>
        </Reveal>

        {/* Why I Built It, Key Decisions & Tech Stack */}
        <Reveal delay={0.08}>
          <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 space-y-2">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.12em] text-spark">
                Why I built it
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.whyBuilt}
              </p>
            </div>

            <div className="md:col-span-5 space-y-2">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.12em] text-foreground">
                Key architectural decision
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.keyDecision}
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted">
                Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-surface-2/85 text-xs font-mono text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <ProjectPreviewModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
