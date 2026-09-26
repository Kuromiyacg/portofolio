"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ExternalLink, Code, CheckCircle, Eye } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { Project } from "@/data/portfolio";
import DashboardPreview from "./previews/DashboardPreview";
import LandingPagePreview from "./previews/LandingPagePreview";
import ManagementSystemPreview from "./previews/ManagementSystemPreview";
import AiPrototypePreview from "./previews/AiPrototypePreview";

function LiveIframePreview({ url, title }: { url: string; title: string }) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full flex flex-col items-center space-y-3">
      {/* Control bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-surface-2/80 border border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent/15 border border-accent/30 text-accent font-mono text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>LIVE VERCEL DEPLOYMENT</span>
          </div>
          <span className="font-mono text-xs text-muted truncate max-w-xs">{url}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device viewport toggle */}
          <div className="flex items-center bg-surface-1 p-0.5 rounded-lg border border-border text-xs font-mono">
            <button
              onClick={() => setDevice("desktop")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                device === "desktop" ? "bg-accent text-background font-bold" : "text-muted hover:text-foreground"
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                device === "tablet" ? "bg-accent text-background font-bold" : "text-muted hover:text-foreground"
              }`}
            >
              Tablet
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                device === "mobile" ? "bg-accent text-background font-bold" : "text-muted hover:text-foreground"
              }`}
            >
              Mobile
            </button>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background font-mono text-xs font-semibold hover:bg-foreground/90 transition-colors"
          >
            <span>Open in Tab</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Frame container */}
      <div
        className={`relative w-full rounded-xl overflow-hidden border border-border bg-[#0d1117] transition-all duration-300 shadow-2xl flex items-center justify-center ${
          device === "desktop"
            ? "max-w-full h-[650px]"
            : device === "tablet"
            ? "max-w-[768px] h-[650px]"
            : "max-w-[390px] h-[650px]"
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d1117] text-muted space-y-3 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            <span className="font-mono text-xs text-accent">CONNECTING TO LIVE APP...</span>
          </div>
        )}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0 bg-background"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}

interface ProjectPreviewModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const [activeLayer, setActiveLayer] = useState<"demo" | "details">("demo");
  const hasLiveUrl = Boolean(project.projectUrl && !project.projectUrl.startsWith("["));

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const renderPreviewComponent = () => {
    if (hasLiveUrl && project.projectUrl) {
      return <LiveIframePreview url={project.projectUrl} title={project.title} />;
    }

    switch (project.previewType) {
      case "dashboard":
        return <DashboardPreview />;
      case "landing":
        return <LandingPagePreview />;
      case "management":
        return <ManagementSystemPreview />;
      case "ai-prototype":
        return <AiPrototypePreview />;
      default:
        return <DashboardPreview />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Project Preview: ${project.title}`}
    >
      <div className="w-full max-w-6xl bg-surface-1 border border-border/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        {/* Modal Top Header Bar */}
        <header className="p-4 sm:p-5 bg-surface-2/70 border-b border-border flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground px-3 py-1.5 rounded bg-surface-1 border border-border hover:border-accent/40 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Projects</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-accent font-bold">
                  PROJECT {project.number}
                </span>
                <span className="text-muted/60">•</span>
                <span className="text-xs text-muted font-mono">{project.type}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground font-mono">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Layer Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-surface-1 p-1 rounded-lg border border-border">
              <button
                onClick={() => setActiveLayer("demo")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  activeLayer === "demo"
                    ? "bg-accent text-background font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Eye size={13} />
                <span>Interactive Demo</span>
              </button>
              <button
                onClick={() => setActiveLayer("details")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  activeLayer === "details"
                    ? "bg-accent text-background font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Code size={13} />
                <span>Specs &amp; Architecture</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-muted hover:text-foreground hover:bg-surface-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeLayer === "demo" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2 text-xs font-mono text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  LIVE HTML PREVIEW • FUNCTIONAL DUMMY APPLICATION
                </span>
                <span>STATE: CLIENT MEMORY ONLY</span>
              </div>

              {/* Render the interactive miniature app */}
              <div className="w-full">
                {renderPreviewComponent()}
              </div>
            </div>
          ) : (
            /* Layer 1: Portfolio Presentation */
            <div className="max-w-4xl mx-auto space-y-8 py-4">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-2">
                  LAYER 1 — ARCHITECTURE &amp; DESIGN
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  {project.title}
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Meta details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-surface-2/40 border border-border">
                  <span className="text-muted block mb-1">DEVELOPMENT ROLE</span>
                  <span className="text-foreground font-semibold text-sm">{project.role}</span>
                </div>
                <div className="p-4 rounded-lg bg-surface-2/40 border border-border">
                  <span className="text-muted block mb-1">CURRENT STATUS</span>
                  <span className="text-accent font-semibold text-sm capitalize">{project.status}</span>
                </div>
                <div className="p-4 rounded-lg bg-surface-2/40 border border-border">
                  <span className="text-muted block mb-1">PREVIEW ENGINE</span>
                  <span className="text-foreground font-semibold text-sm capitalize">{project.previewType}</span>
                </div>
              </div>

              {/* Key Features */}
              {project.keyFeatures && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                    Core Functional Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-surface-1 border border-border/80 flex items-start gap-2.5 text-xs text-muted"
                      >
                        <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Notes */}
              {project.architectureNotes && (
                <div className="p-5 rounded-lg bg-surface-2/50 border border-border/80 space-y-2">
                  <h4 className="text-xs font-bold font-mono text-foreground uppercase tracking-wider">
                    Implementation Philosophy
                  </h4>
                  <p className="text-xs text-muted leading-relaxed font-mono">
                    {project.architectureNotes}
                  </p>
                </div>
              )}

              {/* Technology Stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded bg-surface-2 border border-border font-mono text-xs text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {((project.projectUrl && !project.projectUrl.startsWith("[")) ||
                (project.repoUrl && !project.repoUrl.startsWith("["))) && (
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                  {project.projectUrl && !project.projectUrl.startsWith("[") && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-foreground text-background font-mono text-xs font-semibold hover:bg-foreground/90 transition-colors"
                    >
                      <span>Visit Production URL</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {project.repoUrl && !project.repoUrl.startsWith("[") && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-border text-foreground font-mono text-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      <GithubIcon size={13} />
                      <span>Inspect Repository</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="p-4 bg-surface-2/80 border-t border-border flex items-center justify-between text-xs font-mono text-muted shrink-0">
          <span className="hidden sm:inline">Press ESC to return to portfolio</span>
          <button
            onClick={() => setActiveLayer(activeLayer === "demo" ? "details" : "demo")}
            className="text-accent hover:underline cursor-pointer ml-auto"
          >
            Switch to {activeLayer === "demo" ? "Specifications" : "Live Demo"} →
          </button>
        </footer>
      </div>
    </div>
  );
}
