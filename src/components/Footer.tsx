import { ArrowUpRight } from "lucide-react";
import portfolio from "@/data/portfolio";
import GithubIcon from "@/components/icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="bg-ink-surface text-[#A39D93] border-t border-white/10 py-8 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <a
            href="#home"
            className="font-serif text-lg tracking-normal text-[#F5F1EA] hover:text-white transition-colors"
          >
            {portfolio.personal.name}
          </a>
          <span>
            &copy; {new Date().getFullYear()} &middot; {portfolio.personal.location}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={portfolio.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#F5F1EA] transition-colors"
          >
            <GithubIcon size={13} />
            <span>GitHub</span>
          </a>

          {portfolio.personal.linkedin && (
            <a
              href={portfolio.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#F5F1EA] transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          )}

          <a
            href="#home"
            className="text-[#F5F1EA] hover:underline underline-offset-4"
          >
            Top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
