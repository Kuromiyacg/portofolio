"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Sparkles, Camera } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import portfolio, { Project } from "@/data/portfolio";
import ProjectPreviewModal from "./projects/ProjectPreviewModal";

export default function ProjectSection() {
  const [activePreviewProject, setActivePreviewProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-32 sm:py-40 lg:py-44 px-6 lg:px-12 border-t border-border/80"
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
        <div className="space-y-6">
          {portfolio.projects.map((project) => {
            const hasRealThumbnail = project.thumbnail && !project.thumbnail.startsWith("[");

            return (
              <article
                key={project.id}
                className="group p-6 sm:p-8 rounded-2xl bg-surface-1/80 border border-border/80 hover:border-accent/50 hover:bg-surface-1 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
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

                  {/* Thumbnail / Visual Preview Box */}
                  <div className="lg:col-span-3">
                    {project.projectUrl && !project.projectUrl.startsWith("[") ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden border border-border/70 bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#161b22] flex flex-col items-center justify-center text-muted hover:border-accent/50 transition-all cursor-pointer shadow-inner block"
                        title={`Open ${project.title} live on Vercel`}
                      >
                        {hasRealThumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={`${project.title} Preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 select-none">
                            <div className="w-10 h-10 rounded-full bg-surface-2/80 border border-border flex items-center justify-center text-accent/80 group-hover:scale-110 group-hover:text-accent transition-all shadow-sm">
                              <ExternalLink size={18} />
                            </div>
                            <span className="text-[10px] font-mono tracking-wider uppercase text-muted/70">
                              Deployed on Vercel
                            </span>
                            <span className="text-[11px] font-mono text-accent/90 underline underline-offset-2">
                              Open Live Project ↗
                            </span>
                          </div>
                        )}
                      </a>
                    ) : (
                      <div
                        onClick={() => setActivePreviewProject(project)}
                        className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden border border-border/70 bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#161b22] flex flex-col items-center justify-center text-muted group-hover:border-accent/50 transition-all cursor-pointer shadow-inner"
                        title="Click to view live interactive prototype"
                      >
                        {hasRealThumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={`${project.title} Preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 select-none">
                            <div className="w-10 h-10 rounded-full bg-surface-2/80 border border-border flex items-center justify-center text-accent/80 group-hover:scale-110 group-hover:text-accent transition-all shadow-sm">
                              <Camera size={18} />
                            </div>
                            <span className="text-[10px] font-mono tracking-wider uppercase text-muted/70">
                              Screenshot Pending
                            </span>
                            <span className="text-[11px] font-mono text-accent/90 underline underline-offset-2">
                              Open Interactive Demo ↗
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Main Details */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-muted uppercase tracking-wider">
                        {project.type}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors font-mono">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded bg-surface-2/80 border border-border/60 text-[11px] font-mono text-muted group-hover:border-accent/30 group-hover:text-foreground transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Role & Actions */}
                  <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4 lg:items-end">
                    <div className="text-left lg:text-right">
                      <span className="text-[11px] font-mono text-muted block">ROLE</span>
                      <span className="text-xs font-mono text-foreground font-medium">{project.role}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {project.projectUrl && !project.projectUrl.startsWith("[") ? (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background font-mono text-xs font-bold hover:bg-accent-hover transition-all cursor-pointer shadow-sm shadow-accent/10"
                        >
                          <Play size={12} className="fill-background" />
                          <span>Live Website</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <button
                          onClick={() => setActivePreviewProject(project)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background font-mono text-xs font-bold hover:bg-accent-hover transition-all cursor-pointer shadow-sm shadow-accent/10"
                        >
                          <Play size={12} className="fill-background" />
                          <span>Live Preview</span>
                        </button>
                      )}

                      {project.repoUrl && !project.repoUrl.startsWith("[") && (
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
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
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
