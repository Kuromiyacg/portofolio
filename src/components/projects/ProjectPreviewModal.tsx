"use client";

import { useState, useEffect, useRef } from "react";
import { X, ExternalLink, Monitor, Tablet, Smartphone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Project } from "@/data/portfolio";

interface ProjectPreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

type DeviceMode = "desktop" | "tablet" | "mobile";
type ModalTab = "live" | "specs";

const easeOut = [0.23, 1, 0.32, 1] as const;
const spring = { type: "spring" as const, bounce: 0, duration: 0.32 };

export default function ProjectPreviewModal({
  project,
  onClose,
}: ProjectPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>("live");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const devices: { id: DeviceMode; label: string; icon: typeof Monitor }[] = [
    { id: "desktop", label: "Desktop", icon: Monitor },
    { id: "tablet", label: "Tablet", icon: Tablet },
    { id: "mobile", label: "Mobile", icon: Smartphone },
  ];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.2 }}
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} preview`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="project-modal-sheet"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: 6 }
            }
            transition={prefersReducedMotion ? { duration: 0.1 } : spring}
            className="w-full max-w-6xl bg-surface-1 border border-border-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]"
          >
            {/* Modal Header */}
            <header className="px-4 sm:px-6 py-3.5 bg-background/80 border-b border-border flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <h2 className="font-serif text-2xl leading-none text-foreground truncate">
                  {project.title}
                </h2>
                <span className="hidden sm:inline-block text-xs font-mono text-muted">
                  {project.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab Switcher */}
                <div
                  className="inline-flex p-1 rounded-full bg-surface-2/85 border border-border/70"
                  role="tablist"
                >
                  {(
                    [
                      { id: "live", label: "Live App" },
                      { id: "specs", label: "Architecture" },
                    ] as const
                  ).map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="modal-tab-pill"
                            transition={
                              prefersReducedMotion ? { duration: 0.01 } : spring
                            }
                            className="absolute inset-0 rounded-full bg-surface-1 shadow-xs border border-border/60"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 min-h-[38px] px-4 rounded-full bg-foreground text-surface-1 text-xs font-medium hover:bg-foreground/90 pressable"
                >
                  <span>Open tab</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-2 pressable cursor-pointer"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Modal Body with smooth tab crossfade */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background/40">
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === "live" ? (
                  <motion.div
                    key="modal-live"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 6 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -4 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0.1 : 0.18,
                      ease: easeOut,
                    }}
                    className="flex flex-col items-center space-y-4"
                  >
                    {/* Device Viewport Controls with sliding indicator */}
                    <div className="w-full flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-mono text-muted truncate max-w-full sm:max-w-md">
                        {project.projectUrl}
                      </span>

                      <div className="hidden md:inline-flex items-center p-1 rounded-full bg-surface-2/80 border border-border/70">
                        {devices.map((d) => {
                          const Icon = d.icon;
                          const active = device === d.id;
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setDevice(d.id)}
                              className={`relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                                active
                                  ? "text-foreground"
                                  : "text-muted hover:text-foreground"
                              }`}
                            >
                              {active && (
                                <motion.span
                                  layoutId="modal-device-pill"
                                  transition={
                                    prefersReducedMotion
                                      ? { duration: 0.01 }
                                      : spring
                                  }
                                  className="absolute inset-0 rounded-full bg-surface-1 shadow-xs border border-border/60"
                                />
                              )}
                              <Icon size={13} className="relative z-10" />
                              <span className="relative z-10">{d.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Live Iframe Container (GPU-clean opacity crossfade on device swap — no off-GPU max-width transition) */}
                    <motion.div
                      key={device}
                      initial={{ opacity: 0.88 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.16, ease: easeOut }}
                      className={`relative w-full rounded-xl overflow-hidden border border-border-strong bg-surface-1 shadow-lg ${
                        device === "desktop"
                          ? "max-w-full h-[66dvh]"
                          : device === "tablet"
                          ? "max-w-[768px] h-[66dvh]"
                          : "max-w-[390px] h-[66dvh]"
                      }`}
                    >
                      <AnimatePresence>
                        {isLoading && (
                          <motion.div
                            key="iframe-loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-1 text-muted z-10 pointer-events-none"
                          >
                            <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                            <span className="text-xs font-mono">
                              Loading live app...
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <iframe
                        src={project.projectUrl}
                        title={`${project.title} live application`}
                        className="w-full h-full border-0"
                        onLoad={() => setIsLoading(false)}
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="modal-specs"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 6 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -4 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0.1 : 0.18,
                      ease: easeOut,
                    }}
                    className="max-w-3xl mx-auto py-4 space-y-8"
                  >
                    <div className="space-y-3">
                      <p className="text-xs font-mono uppercase tracking-[0.12em] text-accent">
                        Case Study Notes
                      </p>
                      <h3 className="font-serif text-3xl sm:text-4xl text-foreground">
                        {project.tagline}
                      </h3>
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.keyFeatures.map((feat) => (
                        <div
                          key={feat.title}
                          className="p-4 rounded-xl bg-surface-1 border border-border space-y-1.5"
                        >
                          <h4 className="text-sm font-semibold text-foreground">
                            {feat.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted leading-relaxed">
                            {feat.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-xl bg-surface-2/60 border border-border space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-[0.1em] text-foreground">
                        Architecture
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {project.architectureNotes}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
