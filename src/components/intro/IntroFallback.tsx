"use client";

import React, { useEffect, useState } from "react";
import portfolio from "@/data/portfolio";

interface IntroFallbackProps {
  onComplete: () => void;
  isReducedMotion?: boolean;
}

/**
 * Graceful 2D non-crashing fallback for IntroOverlay when WebGL is unavailable
 * or when prefers-reduced-motion is active.
 * Complies with MASTER_PRD.txt Section 33 & 34 and PRD_HERO_3D_UPDATE.txt.
 */
export default function IntroFallback({ onComplete, isReducedMotion }: IntroFallbackProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isReducedMotion) {
      // Immediately resolve without any animation
      onComplete();
      return;
    }

    // Graceful 1.2s display followed by smooth fade-out
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isReducedMotion, onComplete]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center p-6 transition-opacity duration-400 ease-out select-none ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Developer Workspace Loading Experience"
      role="status"
    >
      <div className="relative max-w-md w-full border border-surface-2 bg-surface-1/90 backdrop-blur-md p-8 rounded-lg shadow-2xl text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-mono text-accent">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>INITIALIZING ENVIRONMENT</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
          {portfolio.personal.name || "[YOUR NAME]"}
        </h1>

        <p className="text-sm text-muted-foreground font-sans leading-relaxed">
          Building functional digital experiences, websites, and software products.
        </p>

        <div className="w-full bg-surface-2 h-1 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-accent animate-[pulse_1s_ease-in-out_infinite] w-full" />
        </div>

        <p className="text-xs font-mono text-muted-foreground/60">
          Entering developer workspace...
        </p>
      </div>
    </div>
  );
}
