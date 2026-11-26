"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const easeOut = [0.23, 1, 0.32, 1] as const;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 560);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={handleScrollTop}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8, scale: 0.96 }
          }
          transition={{ duration: 0.18, ease: easeOut }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 inline-flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] px-3.5 rounded-md glass-chrome text-xs font-mono text-foreground hover:text-accent pressable cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={15} />
          <span className="hidden sm:inline">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
