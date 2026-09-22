"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import portfolio from "@/data/portfolio";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Track scroll position for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = portfolio.navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            // Prefer the section closest to the top of viewport
            return (
              a.boundingClientRect.top - b.boundingClientRect.top
            );
          });

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };

    if (isMobileOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

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
        target.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Name */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="font-mono text-sm tracking-wider text-foreground hover:text-accent transition-colors cursor-pointer"
            >
              {portfolio.personal.name === "[YOUR NAME]"
                ? "PORTFOLIO"
                : portfolio.personal.name.toUpperCase()}
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {portfolio.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-sm tracking-wide transition-all cursor-pointer py-1 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-accent font-medium"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent shadow-[0_0_8px_rgba(138,180,255,0.8)] rounded-full" />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-muted hover:text-foreground transition-colors cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface-1 border-l border-border transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-end p-6">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-6 py-4">
          <ul className="space-y-1">
            {portfolio.navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block py-3 text-lg tracking-wide transition-colors cursor-pointer ${
                    activeSection === item.href.replace("#", "")
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile social links */}
        <div className="absolute bottom-8 left-6 right-6 border-t border-border pt-6">
          <a
            href={portfolio.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </>
  );
}
