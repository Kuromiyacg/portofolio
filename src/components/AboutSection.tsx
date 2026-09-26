"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Target, Compass, Sparkles, Terminal } from "lucide-react";
import portfolio from "@/data/portfolio";

export default function AboutSection() {
  const profileDetails = [
    {
      icon: MapPin,
      label: "LOCATION",
      value: portfolio.personal.location,
    },
    {
      icon: Target,
      label: "DEVELOPMENT FOCUS",
      value: portfolio.personal.focus,
    },
    {
      icon: Compass,
      label: "EXPERIENCE",
      value: portfolio.personal.experience,
    },
    {
      icon: Sparkles,
      label: "CURRENT GOAL",
      value: portfolio.personal.currentGoal,
    },
  ];

  return (
    <section
      id="about"
      className="relative py-32 sm:py-40 lg:py-44 px-6 lg:px-12 border-t border-border/80"
      aria-label="About Section"
    >
      {/* Background subtle technical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            01 / ABOUT
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Editorial Headline & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground text-balance">
              I build digital products from interface to backend.
            </h2>

            <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
              {portfolio.personal.shortBio}
            </p>

            <p className="text-base text-muted/90 leading-relaxed max-w-2xl">
              Focused on crafting production-ready web software that balances aesthetic
              rigor with robust code architecture. Every interface is built to be resilient,
              accessible, and functional across diverse device environments.
            </p>

            {/* Engineering Principles */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-muted">
              <div className="p-3 rounded border border-border/70 bg-surface-1">
                <span className="text-accent block mb-1">01 / DISCIPLINE</span>
                <span className="text-foreground font-medium">Clean, modular code structure</span>
              </div>
              <div className="p-3 rounded border border-border/70 bg-surface-1">
                <span className="text-accent block mb-1">02 / USABILITY</span>
                <span className="text-foreground font-medium">Fast, accessible interactions</span>
              </div>
              <div className="p-3 rounded border border-border/70 bg-surface-1">
                <span className="text-accent block mb-1">03 / CONTINUOUS</span>
                <span className="text-foreground font-medium">Rapid build and iteration cycles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Verifiable Metrics */}
          <div className="lg:col-span-5 space-y-8">
            {/* Profile Data Box */}
            <div className="p-6 rounded-lg bg-surface-1 border border-border space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2 text-xs font-mono text-foreground">
                  <Terminal size={14} className="text-accent" />
                  <span>DEVELOPER PROFILE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-2 text-accent border border-accent/20">
                  EDITABLE DATA
                </span>
              </div>

              {/* Developer Avatar & Quick Intro */}
              {portfolio.personal.profileImage && (
                <div className="flex items-center gap-4 pb-4 border-b border-border/60">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-accent/30 bg-surface-2 shrink-0 shadow-[0_0_15px_rgba(138,180,255,0.12)]">
                    <Image
                      src={portfolio.personal.profileImage}
                      alt={portfolio.personal.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-base font-bold text-foreground truncate font-mono">
                      {portfolio.personal.name}
                    </p>
                    <p className="text-xs font-mono text-accent uppercase tracking-wider truncate">
                      {portfolio.personal.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE FOR WORK
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {profileDetails.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="group">
                      <span className="text-[11px] font-mono text-muted flex items-center gap-1.5 mb-1">
                        <Icon size={12} className="text-muted group-hover:text-accent transition-colors" />
                        {item.label}
                      </span>
                      <p className="text-sm font-medium text-foreground pl-4 border-l border-border group-hover:border-accent/60 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="border-t border-border/80 pt-6">
              <span className="block text-xs font-mono text-muted uppercase tracking-wider mb-4">
                DEVELOPMENT MILESTONES
              </span>
              <div className="grid grid-cols-2 gap-4">
                {portfolio.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4 rounded bg-surface-2/40 border border-border/60 transition-colors hover:border-accent/40"
                  >
                    <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono mb-1">
                      {metric.value}
                    </p>
                    <p className="text-xs text-muted font-sans">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
