import React from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  CURRENT_VERSION,
  detectClientOS,
  DOWNLOAD_PLATFORMS,
  GITHUB_REPO_URL,
} from "../config/downloads";
import { GithubIcon } from "./GithubIcon";
import { Download, ArrowDown } from "lucide-react";

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const detectedOS = detectClientOS();
  const platform = DOWNLOAD_PLATFORMS[detectedOS];

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm font-mono font-medium text-[#7a7a85] dark:text-[#8a8a9e] uppercase tracking-wider mb-6">
          {t.hero.eyebrow}
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#121217] dark:text-[#f3f3f6] leading-[1.15]">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#5a5a68] dark:text-[#9e9eb0] max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={platform.url}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] dark:bg-[#8250df] dark:hover:bg-[#926bff] rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>
              {t.hero.downloadFor} {platform.name} ({CURRENT_VERSION})
            </span>
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#121217] dark:text-[#f3f3f6] bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.1] rounded-lg transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>{t.hero.viewGithub}</span>
          </a>
        </div>

        {/* Secondary link to all downloads */}
        <div className="mt-4">
          <a
            href="#download"
            className="inline-flex items-center gap-1.5 text-xs text-[#7a7a85] dark:text-[#8a8a9e] hover:text-[#121217] dark:hover:text-white transition-colors"
          >
            <span>Windows, macOS, Linux, Android</span>
            <ArrowDown className="w-3 h-3" />
          </a>
        </div>

        {/* Specs metadata line */}
        <div className="mt-12 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-[#7a7a85] dark:text-[#8a8a9e]">
          {t.hero.metaSpecs}
        </div>
      </div>
    </section>
  );
};

