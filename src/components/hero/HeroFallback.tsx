"use client";

import React from "react";
import { Terminal, Cpu, Layers, Sparkles } from "lucide-react";

export default function HeroFallback() {
  return (
    <div
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] flex items-center justify-center p-4 select-none"
      aria-label="2D Developer Workspace Visual (Fallback)"
    >
      {/* Background subtle technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Floating Workspace Layer 1: Code Editor Window */}
      <div className="absolute w-[88%] sm:w-[360px] lg:w-[400px] -translate-x-4 -translate-y-12 sm:-translate-x-12 sm:-translate-y-16 rounded-xl bg-[#0d1117] border border-[#21262d] shadow-2xl p-4 font-mono transition-transform duration-500 hover:scale-[1.02] z-10">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#21262d] text-xs text-muted">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-foreground font-mono text-[11px] font-semibold">engine.ts</span>
          </div>
          <span className="text-[10px] text-muted/80 font-mono">TypeScript</span>
        </div>

        <div className="space-y-1 text-xs text-muted">
          <p className="text-muted/60 text-[11px]">&quot;// Production build engine&quot;</p>
          <p>
            <span className="text-accent">export async function</span> <span className="text-foreground font-semibold">orchestrate</span>() &#123;
          </p>
          <p className="pl-4">
            <span className="text-accent">const</span> env = <span className="text-accent">await</span> Engine.init();
          </p>
          <p className="pl-4">
            <span className="text-accent">return</span> env.deploy();
          </p>
          <p>&#125;</p>
        </div>
      </div>

      {/* Floating Workspace Layer 2: Browser UI Mockup Window (Solid Surface + Shadow) */}
      <div className="absolute w-[88%] sm:w-[340px] lg:w-[380px] translate-x-4 translate-y-14 sm:translate-x-12 sm:translate-y-16 rounded-xl bg-[#0d1117] border border-[#21262d] shadow-2xl p-4 transition-transform duration-500 hover:scale-[1.02] z-20">
        {/* Browser Chrome Header */}
        <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#21262d] text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 px-2.5 py-0.5 rounded bg-[#161b22] text-[10px] font-mono text-muted/90 truncate text-center border border-[#21262d]">
            https://app.system.dev/overview
          </div>
          <span className="text-[9px] font-mono text-accent font-bold px-1 rounded bg-accent/10">LIVE</span>
        </div>

        {/* Mini UI Layout */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#161b22] border border-[#21262d] shadow-sm">
              <span className="text-[10px] text-muted block">BUILD TIME</span>
              <span className="text-foreground font-semibold text-sm">1.2s</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#161b22] border border-[#21262d] shadow-sm">
              <span className="text-[10px] text-muted block">UPTIME</span>
              <span className="text-accent font-semibold text-sm">99.99%</span>
            </div>
          </div>

          {/* Mini Sparkline Graphic */}
          <div className="p-2.5 rounded-lg bg-[#161b22] border border-[#21262d] shadow-sm space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-muted">
              <span>ACTIVITY</span>
              <span className="text-emerald-400 font-semibold">● 14.8k ops/s</span>
            </div>
            <div className="h-7 flex items-end gap-1 pt-1">
              {[35, 55, 42, 78, 60, 88, 72, 95, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent/70 rounded-t-sm transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center Lifecycle Narrative Badge */}
      <div className="relative z-30 px-4 py-2 rounded-full bg-surface-1/90 backdrop-blur border border-accent/40 text-foreground text-xs font-mono tracking-widest uppercase shadow-lg flex items-center gap-2">
        <Sparkles size={12} className="text-accent" />
        <span>Code • Build • Iterate • Ship</span>
      </div>
    </div>
  );
}
