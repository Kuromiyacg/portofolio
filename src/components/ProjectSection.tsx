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
  const [selectedFeature, setSelectedFeature] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const project = portfolio.featuredProject;

  return (
    <section
      id="work"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="Featured Work"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Eyebrow & Display Title */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-2.5">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-accent">
              {project.number} &mdash; Featured Work
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
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
              <span>Interactive Preview</span>
            </button>

            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 rounded-full border border-border-strong bg-surface-1 text-foreground text-sm font-medium hover:border-foreground/40 pressable"
            >
              <span>Visit Live App</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        {/* Main Flagship Case Study Surface */}
        <Reveal delay={0.05}>
          <article className="paper-card rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10">
            {/* Top Summary Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-border">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xl sm:text-2xl font-medium tracking-[-0.015em] text-foreground leading-snug text-pretty">
                  {project.tagline}
                </p>
                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-[60ch]">
                  {project.description}
                </p>
              </div>

              <dl className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-5 content-start text-sm">
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted mb-1">
                    Role
                  </dt>
                  <dd className="font-medium text-foreground">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted mb-1">
                    Status
                  </dt>
                  <dd className="font-medium text-accent">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted mb-1">
                    Year
                  </dt>
                  <dd className="font-mono text-foreground tabular-nums">
                    {project.year}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted mb-1">
                    Type
                  </dt>
                  <dd className="text-foreground">{project.type}</dd>
                </div>
              </dl>
            </div>

            {/* Interactive Feature Showcase (Selectable list + Live Mini-Demo Stage) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div
                className="lg:col-span-6 space-y-2"
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
                      className={`relative w-full text-left p-4 rounded-2xl border transition-colors duration-150 cursor-pointer pressable ${
                        isSelected
                          ? "border-border-strong bg-background/90"
                          : "border-transparent hover:bg-background/50"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="feature-active-bar"
                          transition={
                            prefersReducedMotion ? { duration: 0.01 } : spring
                          }
                          className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-full bg-accent"
                        />
                      )}
                      <div className="flex items-center justify-between gap-3 pl-2">
                        <h3
                          className={`text-sm sm:text-base font-semibold tracking-[-0.01em] ${
                            isSelected ? "text-foreground" : "text-muted"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <span className="text-xs font-mono text-muted tabular-nums">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed mt-1 pl-2">
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

            {/* Bottom Architecture & Stack Strip */}
            <div className="pt-6 border-t border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                <span className="font-medium text-foreground">
                  Architecture:{" "}
                </span>
                {project.architectureNotes}
              </p>

              <div className="flex flex-wrap gap-2 shrink-0">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-surface-2/85 text-xs font-mono text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <ProjectPreviewModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
