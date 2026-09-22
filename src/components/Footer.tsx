"use client";

import React from "react";
import { ArrowUp, ExternalLink } from "lucide-react";
import portfolio from "@/data/portfolio";
import GithubIcon from "@/components/icons/GithubIcon";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/80 bg-surface-1/80 py-16 px-6 lg:px-12 text-xs font-mono">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-base font-bold text-foreground hover:text-accent transition-colors font-mono tracking-wider cursor-pointer"
            >
              {portfolio.personal.name}
            </a>
            <p className="text-muted text-xs font-sans">
              {portfolio.personal.title} — {portfolio.personal.location}
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a
              href={portfolio.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={portfolio.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>

            <a
              href={`mailto:${portfolio.personal.email}`}
              className="text-muted hover:text-foreground transition-colors"
            >
              Email
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-accent hover:underline cursor-pointer pl-2"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-muted/70">
          <p>© 2026 {portfolio.personal.name}. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Built with Next.js, React, Three.js &amp; Tailwind CSS (Static Edge Export)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
