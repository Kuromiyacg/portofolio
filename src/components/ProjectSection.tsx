"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import portfolio, { Project } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";
import ProjectPreviewModal from "./projects/ProjectPreviewModal";

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const project = portfolio.featuredProject;

  return (
    <section
      id="work"
      className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="Selected Work"
    >
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12">
        {/* Clean Editorial Header — No Artificial Numbered Eyebrows */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.12em] text-muted">
              Selected Work &middot; {project.year}
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1] tracking-[-0.025em] text-foreground">
              {project.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] font-medium text-foreground underline underline-offset-4 decoration-border-strong hover:decoration-accent hover:text-accent transition-colors"
            >
              <span>Visit live app</span>
              <ArrowUpRight size={15} />
            </a>

            <button
              type="button"
              onClick={() => setActiveProject(project)}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-md border border-border-strong bg-surface-1 text-foreground font-medium hover:border-foreground/50 pressable cursor-pointer"
            >
              <Play size={13} className="fill-current" />
              <span>Inspect live build</span>
            </button>
          </div>
        </Reveal>

        {/* 16:9 Cinema Media Stage — Ready for Product Walkthrough Video (Apple-style) */}
        <Reveal delay={0.04}>
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-ink-surface text-[#F5F1EA] border border-border-strong">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A39D93]">
                  <span className="inline-flex items-center gap-2 text-[#F5F1EA]">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-spark"
                      aria-hidden="true"
                    />
                    <span>{project.status}</span>
                  </span>
                  <span>{project.type}</span>
                </div>

                <div className="max-w-2xl space-y-4">
                  <p className="font-serif text-[clamp(1.85rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-[#F5F1EA] text-balance">
                    {project.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-[#B6B0A6] max-w-[52ch] leading-relaxed">
                    Product walkthrough video slot reserved. Launch the deployed
                    Vercel build now or open it in the interactive inspector.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-md bg-[#F5F1EA] text-[#171614] text-sm font-medium hover:bg-white pressable"
                    >
                      <span>Open LifeTrack AI</span>
                      <ArrowUpRight size={15} />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-md border border-white/20 text-[#F5F1EA] text-sm font-medium hover:bg-white/10 pressable cursor-pointer"
                    >
                      <Play size={13} className="fill-current" />
                      <span>Preview in window</span>
                    </button>
                  </div>

                  <span className="hidden sm:inline font-mono text-xs text-[#8F8980]">
                    {project.technologies.join(" · ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Editorial Case Study Notes + Clean Hairline Feature List (Zero Cards, Zero Icons) */}
        <Reveal delay={0.06}>
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base text-foreground/85 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4 pt-4 border-t border-border text-sm">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                    Why I built it
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {project.whyBuilt}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
                    Architectural choice
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {project.keyDecision}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-4">
                Core Capabilities
              </h3>

              <dl className="divide-y divide-border border-y border-border">
                {project.keyFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <dt className="sm:col-span-5 text-sm font-semibold text-foreground">
                      {feature.title}
                    </dt>
                    <dd className="sm:col-span-7 text-sm text-muted leading-relaxed">
                      {feature.detail}
                    </dd>
                  </div>
                ))}
              </dl>
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
