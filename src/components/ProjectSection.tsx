"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Sparkles } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import portfolio, { Project } from "@/data/portfolio";
import ProjectPreviewModal from "./projects/ProjectPreviewModal";

export default function ProjectSection() {
  const [activePreviewProject, setActivePreviewProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 px-6 lg:px-12 border-t border-border/80"
      aria-label="Projects Showcase Section"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            04 / SHOWCASE
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Selected Projects &amp; Demos
            </h2>
            <p className="text-base sm:text-lg text-muted">
              Interactive project showcases with functional miniature applications.
              Click any project to explore its live HTML prototype and architecture details.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted bg-surface-1 px-3 py-1.5 rounded-lg border border-border">
            <Sparkles size={13} className="text-accent" />
            <span>FUNCTIONAL PREVIEWS ENABLED</span>
          </div>
        </div>

        {/* Project List / Cards */}
        <div className="space-y-4">
          {portfolio.projects.map((project) => (
            <article
              key={project.id}
              className="group p-6 sm:p-8 rounded-xl bg-surface-1/70 border border-border/80 hover:border-accent/50 hover:bg-surface-1 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Project Number & Status */}
                <div className="lg:col-span-2 space-y-2">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-accent">
                    {project.number}
                  </span>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full ${
                        project.status === "completed"
                          ? "bg-green-950/60 text-green-400 border border-green-800/60"
                          : project.status === "in-development"
                          ? "bg-accent/15 text-accent border border-accent/30"
                          : "bg-surface-2 text-muted border border-border"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.status === "completed"
                            ? "bg-green-400"
                            : project.status === "in-development"
                            ? "bg-accent animate-pulse"
                            : "bg-muted"
                        }`}
                      />
                      {project.status === "in-development"
                        ? "In Development"
                        : project.status === "completed"
                        ? "Completed"
                        : "Planned"}
                    </span>
                  </div>
                </div>

                {/* Main Details */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-muted uppercase tracking-wider">
                      {project.type}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors font-mono">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-surface-2/80 border border-border/60 text-[11px] font-mono text-muted group-hover:border-accent/30 group-hover:text-foreground transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role & Actions */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 lg:items-end">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] font-mono text-muted block">ROLE</span>
                    <span className="text-xs font-mono text-foreground font-medium">{project.role}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => setActivePreviewProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background font-mono text-xs font-bold hover:bg-accent-hover transition-all cursor-pointer shadow-sm shadow-accent/10"
                    >
                      <Play size={12} className="fill-background" />
                      <span>Live Preview</span>
                    </button>

                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                      aria-label="Project Website"
                      title="External Link"
                    >
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                      aria-label="Source Repository"
                      title="Source Code"
                    >
                      <GithubIcon size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Project Preview Modal (Layer 1 & Layer 2) */}
      {activePreviewProject && (
        <ProjectPreviewModal
          project={activePreviewProject}
          onClose={() => setActivePreviewProject(null)}
        />
      )}
    </section>
  );
}
