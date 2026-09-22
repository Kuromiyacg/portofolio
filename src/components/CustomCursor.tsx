"use client";

import React, { useEffect, useState, useRef } from "react";

type CursorState = "normal" | "interactive" | "project" | "external";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("normal");
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fineMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateSupport = () => {
      setIsEnabled(fineMedia.matches && !motionMedia.matches);
    };

    // Set initial state via rAF to avoid synchronous cascading render warning
    const rAfCheck = requestAnimationFrame(updateSupport);

    fineMedia.addEventListener("change", updateSupport);
    motionMedia.addEventListener("change", updateSupport);

    if (!fineMedia.matches || motionMedia.matches) {
      return () => {
        cancelAnimationFrame(rAfCheck);
        fineMedia.removeEventListener("change", updateSupport);
        motionMedia.removeEventListener("change", updateSupport);
      };
    }

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Determine hover target state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestInteractive = target.closest("a, button, [role='button'], input, select, textarea");
      const isExternalLink = target.closest("a[target='_blank'], a[href^='http']");
      const isProjectTrigger = target.closest("button:has(svg), article, [data-cursor='open']");

      if (isExternalLink) {
        setCursorState("external");
      } else if (isProjectTrigger && target.closest("#projects, #upcoming")) {
        setCursorState("project");
      } else if (closestInteractive) {
        setCursorState("interactive");
      } else {
        setCursorState("normal");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth animation loop for follower
    const render = () => {
      // Lerp follower position
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none" aria-hidden="true">
      {/* Precision center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
          cursorState === "normal"
            ? "w-2 h-2 bg-accent"
            : "w-1 h-1 bg-transparent"
        }`}
      />

      {/* Smooth outer follower / badge */}
      <div
        ref={cursorFollowerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 ${
          cursorState === "normal"
            ? "w-8 h-8 rounded-full border border-accent/40 bg-accent/5"
            : cursorState === "interactive"
            ? "px-3 py-1 rounded-full bg-surface-1/90 border border-accent text-accent font-mono text-[10px] font-bold shadow-lg shadow-accent/10"
            : cursorState === "project"
            ? "px-3.5 py-1.5 rounded-full bg-accent text-background font-mono text-[10px] font-extrabold shadow-xl"
            : "w-7 h-7 rounded-full bg-surface-1/90 border border-accent text-accent font-mono text-[11px] font-bold shadow-lg"
        }`}
      >
        {cursorState === "interactive" && "VIEW"}
        {cursorState === "project" && "OPEN"}
        {cursorState === "external" && "↗"}
      </div>
    </div>
  );
}
