import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Eyebrow, RecDot, Halo } from "../components/ui/Primitives";
import { Home, Download, Compass, ArrowRight } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden">
      {/* Atmosphere glow */}
      <Halo className="top-1/4 left-1/2 -translate-x-1/2 opacity-30" />

      {/* Giant subtle watermark */}
      <div
        aria-hidden
        className="absolute select-none pointer-events-none font-mono font-black text-[18vw] leading-none text-rec/5 dark:text-rec/10 tracking-widest uppercase top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        00:04:04
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rec/10 border border-rec/20 text-rec mb-6">
          <RecDot />
          <span className="font-mono text-xs font-semibold tracking-wider uppercase">
            {t.notFound.badge}
          </span>
        </div>

        <Eyebrow className="mb-2">TIMECODE ERROR</Eyebrow>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          {t.notFound.title}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto mb-10">
          {t.notFound.subtitle}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Home className="w-4 h-4" />
            <span>{t.notFound.backHome}</span>
          </Link>

          <Link
            to="/download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-sunk)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Download className="w-4 h-4" />
            <span>{t.notFound.downloadBtn}</span>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>
              {isEn ? "Direct Studio Links" : "Accès rapide au studio"}
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[var(--text-secondary)]">
            <Link
              to="/features"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              <span>{isEn ? "Features & Engine" : "Fonctionnalités"}</span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
            </Link>
            <span className="text-[var(--border-subtle)]">•</span>
            <Link
              to="/documentation"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              <span>
                {isEn ? "Documentation" : "Documentation & Raccourcis"}
              </span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
            </Link>
            <span className="text-[var(--border-subtle)]">•</span>
            <Link
              to="/pourquoi"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              <span>{isEn ? "Comparison" : "Comparatif"}</span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
            </Link>
            <span className="text-[var(--border-subtle)]">•</span>
            <Link
              to="/roadmap"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              <span>Roadmap</span>
              <ArrowRight className="w-3 h-3 text-[var(--text-muted)]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
