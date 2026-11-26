"use client";

import { useState } from "react";
import Image from "next/image";
import portfolio from "@/data/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function AboutSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="about"
      className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="About"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Editorial Bio + Crisp Portrait */}
        <Reveal className="lg:col-span-7 space-y-6">
          <p className="text-xs font-mono uppercase tracking-[0.12em] text-muted">
            About
          </p>

          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-foreground text-balance">
            {portfolio.personal.aboutLead}
          </h2>

          <p className="text-base text-muted leading-relaxed max-w-[56ch] text-pretty">
            {portfolio.personal.aboutBody}
          </p>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-start gap-5">
            <div className="relative w-20 h-20 rounded-md overflow-hidden border border-border-strong bg-surface-2 shrink-0 flex items-center justify-center">
              {!imgFailed ? (
                <Image
                  src={portfolio.personal.profileImage}
                  alt={portfolio.personal.name}
                  fill
                  unoptimized
                  onError={() => setImgFailed(true)}
                  className="object-cover"
                />
              ) : (
                <span
                  className="font-serif text-2xl text-foreground select-none"
                  aria-hidden="true"
                >
                  JC
                </span>
              )}
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm min-w-0">
              <div className="min-w-0">
                <dt className="text-xs text-muted">Based in</dt>
                <dd className="font-medium text-foreground">
                  {portfolio.personal.location}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-muted">Experience</dt>
                <dd className="font-medium text-foreground">
                  {portfolio.personal.experience}
                </dd>
              </div>
              <div className="sm:col-span-2 min-w-0">
                <dt className="text-xs text-muted">Current focus</dt>
                <dd className="text-foreground">
                  {portfolio.personal.currentGoal}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* Right Column: Quiet Chronological Progression */}
        <div className="lg:col-span-5">
          <Reveal delay={0.04}>
            <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-muted mb-5">
              Progression
            </h3>
          </Reveal>

          <RevealGroup stagger={0.04}>
            <ol className="divide-y divide-border border-y border-border">
              {portfolio.journey.map((step) => (
                <li key={step.number}>
                  <RevealItem y={8} className="py-4 flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted tabular-nums shrink-0">
                      {step.number}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </RevealItem>
                </li>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
