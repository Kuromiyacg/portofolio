import { ArrowUpRight } from "lucide-react";
import portfolio from "@/data/portfolio";
import GithubIcon from "@/components/icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl border-x border-border/60 px-5 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <a
            href="#home"
            className="font-mono text-xs tracking-[0.14em] uppercase text-foreground hover:text-accent transition-colors"
          >
            {portfolio.personal.name}
          </a>
          <span className="text-xs font-mono">
            &copy; {new Date().getFullYear()} &middot; {portfolio.personal.location}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono">
          <a
            href={portfolio.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <GithubIcon size={13} />
            <span>GitHub</span>
          </a>

          {portfolio.personal.linkedin && (
            <a
              href={portfolio.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          )}

          <a
            href={`mailto:${portfolio.personal.email}`}
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>Email</span>
            <ArrowUpRight size={12} />
          </a>

          <a
            href="#home"
            className="text-foreground hover:text-spark transition-colors"
          >
            Top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
