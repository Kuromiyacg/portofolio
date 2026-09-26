"use client";

import React, { useState } from "react";
import { Code2, Server, Wrench, Layers } from "lucide-react";
import portfolio from "@/data/portfolio";

type CategoryFilter = "all" | "language" | "fullstack" | "tools";

// Contextual description for honest, non-fabricated skill overview
const skillDetails: Record<string, { role: string; focus: string }> = {
  JavaScript: { role: "Core Language", focus: "ES6+, Async architecture, DOM & Web APIs" },
  Python: { role: "Core Language", focus: "Backend services, scripting & automation" },
  "C++": { role: "Core Language", focus: "Algorithmic problem solving & low-level concepts" },
  PHP: { role: "Core Language", focus: "Server-side web scripting & CMS engines" },
  HTML: { role: "Core Language", focus: "Semantic markup, structure & accessibility" },
  CSS: { role: "Core Language", focus: "Modern layouts, responsive design & design tokens" },
  Frontend: { role: "Full-Stack Area", focus: "Component hierarchy, state & responsive UI" },
  Backend: { role: "Full-Stack Area", focus: "Application logic, data routing & security" },
  Database: { role: "Full-Stack Area", focus: "Schema design, data modeling & querying" },
  API: { role: "Full-Stack Area", focus: "RESTful architecture & third-party integrations" },
  Authentication: { role: "Full-Stack Area", focus: "Session tokens, access control & security" },
  Deployment: { role: "Full-Stack Area", focus: "Static exports, cloud hosting & CI/CD build" },
  Git: { role: "Workflow Tool", focus: "Version control, branching & release history" },
  GitHub: { role: "Workflow Tool", focus: "Repository management & automated workflows" },
  "AI-Assisted Development": { role: "Workflow Tool", focus: "Prompt engineering, rapid prototyping & refactoring" },
  Claude: { role: "Workflow Tool", focus: "Deep architectural reasoning, planning & review" },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "ALL TECHNOLOGIES", icon: Layers, count: portfolio.skills.length },
    { id: "language", label: "LANGUAGES", icon: Code2, count: portfolio.skills.filter((s) => s.category === "language").length },
    { id: "fullstack", label: "FULL-STACK", icon: Server, count: portfolio.skills.filter((s) => s.category === "fullstack").length },
    { id: "tools", label: "TOOLS & WORKFLOW", icon: Wrench, count: portfolio.skills.filter((s) => s.category === "tools").length },
  ];

  const filteredSkills = portfolio.skills.filter((skill) => {
    if (activeCategory === "all") return true;
    return skill.category === activeCategory;
  });

  return (
    <section
      id="skills"
      className="relative py-32 sm:py-40 lg:py-44 px-6 lg:px-12 bg-surface-1/60 border-t border-border/80"
      aria-label="Skills Section"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            02 / CAPABILITIES
          </span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Technical Stack &amp; Workflow
            </h2>
            <p className="mt-3 text-base text-muted max-w-xl">
              An honest, cluster-based view of technical capabilities. No exaggerated
              progress bars—organized by real domain application and development workflow.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-surface-2/70 border border-border">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-sm"
                      : "text-muted hover:text-foreground hover:bg-surface-1"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon size={13} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-0.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-background/20 text-background" : "bg-border text-muted"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const detail = skillDetails[skill.name] || {
              role: "Technology Node",
              focus: "Full-stack development application",
            };
            const isSelected = selectedSkill === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                className={`p-5 rounded-lg border transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? "bg-surface-2 border-accent shadow-md shadow-accent/5 ring-1 ring-accent"
                    : "bg-surface-1 border-border/80 hover:border-accent/40 hover:bg-surface-2/60"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSkill(isSelected ? null : skill.name);
                  }
                }}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 border border-border/60 text-muted">
                    {skill.category.toUpperCase()}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isSelected ? "bg-accent animate-pulse" : "bg-border group-hover:bg-accent/60"
                    }`}
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1 font-mono">
                  {skill.name}
                </h3>
                <p className="text-xs font-mono text-accent mb-2">
                  {detail.role}
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  {detail.focus}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technology Ecosystem Summary Footer */}
        <div className="mt-12 p-6 rounded-lg bg-surface-1 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-foreground font-semibold">
              ARCHITECTURE PRINCIPLE:
            </span>
            <span>Composition over complexity, clean separation of concerns.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
