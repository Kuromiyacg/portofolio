"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ExternalLink } from "lucide-react";
import portfolio from "@/data/portfolio";
import HeroFallback from "./hero/HeroFallback";

// Dynamically import 3D Scene with ssr: false and HeroFallback while loading
const Hero3DScene = dynamic(() => import("./hero/Hero3DScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center px-6 lg:px-12 pt-24 pb-16 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background technical subtle cross grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-6 z-10 space-y-6">
            {/* Primary Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
                {portfolio.personal.name}
              </h1>
              <p className="text-xl sm:text-2xl font-mono text-accent uppercase tracking-wider">
                {portfolio.personal.title}
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              {portfolio.personal.shortBio}
            </p>

            {/* Interactive CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all rounded-md cursor-pointer font-mono"
              >
                <span>Explore Work</span>
                <ArrowDown size={15} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium border border-border bg-surface-1 text-foreground hover:border-accent/40 hover:text-accent transition-all rounded-md cursor-pointer font-mono"
              >
                Contact Me
              </a>

              <a
                href={portfolio.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-mono text-muted hover:text-accent transition-colors ml-1"
                aria-label="LinkedIn Profile"
              >
                <span>LinkedIn</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Concrete Editable Metrics Strip (Section 4 & 5) */}
            <div className="pt-6 border-t border-border/60 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-muted">
              {portfolio.metrics.map((m) => (
                <div key={m.label}>
                  <span className="block text-foreground font-semibold text-sm">{m.value}</span>
                  <span className="text-muted/80">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Workspace */}
          <div className="lg:col-span-6 flex items-center justify-center w-full">
            <div className="w-full relative">
              {/* Soft #8AB4FF ambient halo behind 3D workspace per PRD Addendum §3.2 */}
              <div className="absolute -inset-8 bg-radial from-accent/15 via-accent/5 to-transparent blur-3xl pointer-events-none -z-10" />
              <Hero3DScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
