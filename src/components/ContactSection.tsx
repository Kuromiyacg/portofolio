"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import portfolio from "@/data/portfolio";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-6xl">
        <div className="paper-card rounded-3xl p-7 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-accent">
              04 &mdash; Contact
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
              Have a project in mind?{" "}
              <span className="italic text-accent">Let&apos;s talk.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Open for full-stack web projects, product builds, and engineering
              roles. Reach out directly by email or check my recent work on
              GitHub.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${portfolio.personal.email}`}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-foreground text-surface-1 text-sm font-medium hover:bg-foreground/90 pressable"
              >
                <Mail size={15} />
                <span>Send email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 rounded-full border border-border-strong bg-background text-foreground text-sm font-medium hover:bg-surface-2/70 pressable cursor-pointer"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.85 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.85 }
                      }
                      transition={{ duration: 0.14 }}
                      className="inline-flex items-center gap-1.5 text-accent"
                    >
                      <Check size={14} />
                      <span>Copied</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.85 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.85 }
                      }
                      transition={{ duration: 0.14 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Copy size={14} />
                      <span>Copy address</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
              <span className="select-all text-foreground">
                {portfolio.personal.email}
              </span>
              <span aria-hidden="true">&middot;</span>
              <a
                href={portfolio.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-accent transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight size={13} />
              </a>
              {portfolio.personal.linkedin && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <a
                    href={portfolio.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
