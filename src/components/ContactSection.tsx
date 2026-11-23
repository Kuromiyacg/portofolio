"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import portfolio from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";

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
      className="border-t border-border"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-7xl border-x border-border/60 px-5 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28">
        <Reveal>
          {/* High-contrast Espresso Ink Monolith bookend matching Hero dark stage */}
          <div className="ink-monolith rounded-3xl p-7 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4 max-w-xl min-w-0">
              <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#A39D93]">
                <span className="text-spark font-medium">04</span> &mdash; Contact
              </p>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,4.35rem)] leading-[1] tracking-[-0.025em] text-[#F5F1EA] text-balance">
                Have a project in mind?{" "}
                <span className="italic text-spark">Let&apos;s talk.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#B6B0A6] leading-relaxed">
                Open for full-stack web projects, product builds, and
                engineering roles. Reach out directly by email or browse my
                recent work on GitHub.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-5 shrink-0 min-w-0 max-w-full">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${portfolio.personal.email}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full bg-[#F5F1EA] text-[#171614] text-sm font-medium hover:bg-white pressable"
                >
                  <Mail size={15} />
                  <span>Send email</span>
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
                    portfolio.personal.email
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[46px] px-5 rounded-full border border-white/20 bg-white/5 text-[#F5F1EA] text-sm font-medium hover:bg-white/10 pressable"
                >
                  <span>Open in Gmail</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 rounded-full border border-white/15 bg-transparent text-[#D6D0C6] text-sm font-medium hover:text-[#F5F1EA] hover:border-white/30 pressable cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 text-spark"
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

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#A39D93] min-w-0 max-w-full">
                <span className="select-all text-[#F5F1EA] break-all">
                  {portfolio.personal.email}
                </span>
                <span aria-hidden="true">&middot;</span>
                <a
                  href={portfolio.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#F5F1EA] transition-colors shrink-0"
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
                      className="inline-flex items-center gap-1 hover:text-[#F5F1EA] transition-colors shrink-0"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
