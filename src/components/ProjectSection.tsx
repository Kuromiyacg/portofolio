"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import portfolio, { Project } from "@/data/portfolio";
import ProjectPreviewModal from "./projects/ProjectPreviewModal";

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const project = portfolio.featuredProject;

  return (
    <section
      id="work"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="Featured Work"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Eyebrow & Display Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
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
        </div>

        {/* Main Flagship Case Study Surface */}
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

          {/* 4 Concrete Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {project.keyFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="p-5 rounded-2xl bg-background/70 border border-border/80 space-y-2 hover-lift"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                    {feature.title}
                  </h3>
                  <span className="text-xs font-mono text-muted tabular-nums">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Architecture & Stack Strip */}
          <div className="pt-6 border-t border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              <span className="font-medium text-foreground">Architecture: </span>
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
      </div>

      <ProjectPreviewModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
