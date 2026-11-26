"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import portfolio from "@/data/portfolio";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
      setIsMobileOpen(false);
    },
    [prefersReducedMotion]
  );

  return (
    <>
      <header className="relative z-40 border-b border-border">
        <nav
          className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="font-serif text-2xl leading-none tracking-[-0.015em] text-foreground hover:text-accent transition-colors duration-150 min-w-0 truncate"
          >
            {portfolio.personal.name}
          </a>

          {/* Quiet editorial navigation links — zero pills, zero numbered badges */}
          <div className="hidden sm:flex items-center gap-8 shrink-0">
            {portfolio.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-muted hover:text-foreground transition-colors duration-150 py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="sm:hidden min-w-[44px] min-h-[44px] -mr-2 rounded-md flex items-center justify-center text-foreground hover:bg-surface-2/70 pressable cursor-pointer shrink-0"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer with Apple swipe-to-dismiss */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
              className="fixed inset-0 z-50 bg-foreground/25 backdrop-blur-xs sm:hidden"
              onClick={() => {
                setIsMobileOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-hidden="true"
            />

            <motion.div
              key="nav-drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              drag={prefersReducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.45 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 400) {
                  setIsMobileOpen(false);
                  menuButtonRef.current?.focus();
                }
              }}
              initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { type: "spring", bounce: 0, duration: 0.32 }
              }
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-surface-1 border-l border-border shadow-2xl flex flex-col justify-between p-6 touch-pan-y sm:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <span className="font-serif text-xl text-foreground">
                    {portfolio.personal.shortName}
                  </span>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => {
                      setIsMobileOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                    className="min-w-[44px] min-h-[44px] -mr-2 rounded-md flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-2/70 pressable cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="pt-4" aria-label="Mobile navigation">
                  <ul className="divide-y divide-border/70">
                    {portfolio.navItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="flex items-center min-h-[48px] text-base font-medium text-foreground hover:text-accent transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="pt-6 border-t border-border space-y-2.5">
                <a
                  href={`mailto:${portfolio.personal.email}`}
                  className="flex items-center justify-center min-h-[44px] w-full rounded-md bg-foreground text-surface-1 text-sm font-medium pressable"
                >
                  Email me
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={portfolio.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center min-h-[44px] rounded-md border border-border text-sm text-muted hover:text-foreground pressable"
                  >
                    GitHub ↗
                  </a>
                  {portfolio.personal.linkedin && (
                    <a
                      href={portfolio.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center min-h-[44px] rounded-md border border-border text-sm text-muted hover:text-foreground pressable"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
