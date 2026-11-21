import Image from "next/image";
import portfolio from "@/data/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-border"
      aria-label="About and Journey"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-accent mb-3">
            02 &mdash; About
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Bio + Profile Card */}
          <Reveal delay={0.04} className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-[clamp(2.25rem,5.2vw,3.6rem)] leading-[1.06] tracking-[-0.02em] text-foreground text-balance">
              {portfolio.personal.aboutLead}
            </h2>

            <p className="text-base sm:text-[17px] text-muted leading-relaxed max-w-[58ch] text-pretty">
              {portfolio.personal.aboutBody}
            </p>

            {/* Grounded Profile Identity */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border-strong bg-surface-2 shrink-0">
                <Image
                  src={portfolio.personal.profileImage}
                  alt={portfolio.personal.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted">
                    Based in
                  </dt>
                  <dd className="font-medium text-foreground">
                    {portfolio.personal.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted">
                    Experience
                  </dt>
                  <dd className="font-medium text-foreground">
                    {portfolio.personal.experience}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted">
                    Current Focus
                  </dt>
                  <dd className="text-foreground">
                    {portfolio.personal.currentGoal}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Right Column: Concise Chronological Journey with staggered cascade */}
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-muted mb-5">
                Progression
              </h3>
            </Reveal>

            <RevealGroup stagger={0.045}>
              <ol className="divide-y divide-border border-t border-b border-border">
                {portfolio.journey.map((step) => (
                  <li key={step.number}>
                    <RevealItem
                      y={10}
                      className="py-4 flex items-baseline gap-4"
                    >
                      <span className="font-mono text-xs text-accent tabular-nums shrink-0">
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
      </div>
    </section>
  );
}
