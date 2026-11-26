"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
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
    /* Full-bleed Espresso Ink architectural closing band — NOT a floating SaaS card */
    <section
      id="contact"
      className="bg-ink-surface text-[#F5F1EA] pt-20 pb-16 sm:pt-28 sm:pb-20 px-5 sm:px-8 lg:px-12"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-5 min-w-0">
              <p className="text-xs font-mono uppercase tracking-[0.12em] text-[#A39D93]">
                Contact
              </p>
              <h2 className="font-serif text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-[#F5F1EA] text-balance">
                Have a project in mind?{" "}
                <span className="italic text-[#8EA8FF]">Let&apos;s talk.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#B6B0A6] leading-relaxed max-w-[48ch]">
                Open for full-stack web projects, product builds, and
                engineering roles. Send an email directly or browse my code on
                GitHub.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5 min-w-0">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${portfolio.personal.email}`}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-md bg-[#F5F1EA] text-[#171614] text-sm font-medium hover:bg-white pressable"
                >
                  Send email
                </a>

                <a
                  href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
                    portfolio.personal.email
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-[#F5F1EA] underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                >
                  <span>Open in Gmail</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm text-[#B6B0A6] hover:text-[#F5F1EA] transition-colors cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 text-[#F5F1EA]"
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

              <p className="font-mono text-xs text-[#A39D93] select-all break-all">
                {portfolio.personal.email}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
