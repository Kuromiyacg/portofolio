"use client";

import React, { useState } from "react";
import { Mail, ArrowUpRight, Copy, Check, Sparkles } from "lucide-react";
import portfolio from "@/data/portfolio";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-32 sm:py-40 lg:py-44 px-6 lg:px-12 border-t border-border/80 overflow-hidden"
      aria-label="Contact Section"
    >
      {/* Background subtle technical gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(138,180,255,0.06),transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            07 / TRANSMISSION
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Currently open for engineering contracts &amp; full-stack roles</span>
          </div>

          {/* Large Editorial Headline */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
              Have a project in mind?
            </h2>
            <p className="text-2xl sm:text-3xl text-accent font-mono">
              Let&apos;s talk.
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
            Whether you need a high-performance web platform, a complex interactive
            application, or clean architectural engineering, reach out directly.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${portfolio.personal.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-foreground text-background font-mono text-sm font-bold hover:bg-foreground/90 transition-all cursor-pointer shadow-lg shadow-white/5"
            >
              <Mail size={15} />
              <span>EMAIL ME →</span>
            </a>

            <a
              href={portfolio.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-lg bg-surface-1 border border-border text-foreground font-mono text-sm font-medium hover:border-accent/60 hover:text-accent transition-all cursor-pointer"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-lg bg-surface-2 border border-border/70 text-muted hover:text-foreground font-mono text-xs transition-colors cursor-pointer"
              title="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-green-400" />
                  <span className="text-green-400 font-semibold">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>COPY ADDRESS</span>
                </>
              )}
            </button>
          </div>

          {/* Plaintext Email Display */}
          <div className="pt-6 border-t border-border/60 flex flex-wrap items-center gap-6 font-mono text-xs text-muted">
            <div>
              <span className="text-muted/60 block text-[10px]">DIRECT INBOX</span>
              <span className="text-foreground select-all">{portfolio.personal.email}</span>
            </div>
            <div className="h-6 w-px bg-border/80 hidden sm:block" />
            <div>
              <span className="text-muted/60 block text-[10px]">LOCAL REGION</span>
              <span className="text-foreground">{portfolio.personal.location}</span>
            </div>
            <div className="h-6 w-px bg-border/80 hidden sm:block" />
            <div>
              <span className="text-muted/60 block text-[10px]">ENCRYPTION</span>
              <span className="text-accent flex items-center gap-1">
                <Sparkles size={11} /> TLS / Standard Mailto
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
