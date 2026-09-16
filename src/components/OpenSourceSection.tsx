import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GITHUB_REPO_URL } from '../config/downloads';
import { GithubIcon } from './GithubIcon';
import { Shield, EyeOff, Code, Bug, Compass } from 'lucide-react';

export const OpenSourceSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="opensource" className="py-20 md:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left / Main text */}
          <div className="lg:col-span-7">
            <p className="text-xs font-mono font-medium text-[#7a7a85] dark:text-[#8a8a9e] uppercase tracking-wider mb-2">
              {t.opensource.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121217] dark:text-[#f3f3f6] mb-6">
              {t.opensource.title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
              <p>{t.opensource.desc1}</p>
              <p>{t.opensource.desc2}</p>
            </div>

            {/* GitHub Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#121217] dark:bg-white text-white dark:text-[#121217] hover:bg-[#252530] dark:hover:bg-[#eaebee] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{t.opensource.contributeBtn}</span>
              </a>

              <a
                href={`${GITHUB_REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#5a5a68] dark:text-[#9e9eb0] hover:text-[#121217] dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] transition-colors"
              >
                <Bug className="w-3.5 h-3.5" />
                <span>{t.opensource.issuesBtn}</span>
              </a>

              <a
                href={`${GITHUB_REPO_URL}#-roadmap`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#5a5a68] dark:text-[#9e9eb0] hover:text-[#121217] dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.opensource.roadmapBtn}</span>
              </a>
            </div>
          </div>

          {/* Right / Pillars list */}
          <div className="lg:col-span-5 space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-center gap-2.5 font-semibold text-sm text-[#121217] dark:text-[#f3f3f6] mb-1">
                <Code className="w-4 h-4 text-[#7c3aed] dark:text-[#926bff]" />
                <span>Licence GNU GPLv3</span>
              </div>
              <p className="text-xs text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
                Le code appartient à la communauté. Aucun brevet restrictif, aucune fonctionnalité bloquée derrière un paywall.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-center gap-2.5 font-semibold text-sm text-[#121217] dark:text-[#f3f3f6] mb-1">
                <Shield className="w-4 h-4 text-[#12c582]" />
                <span>100% Local-First</span>
              </div>
              <p className="text-xs text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
                Fonctionne sans connexion. Vos rushs vidéo et enregistrements restent sur votre stockage local.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
              <div className="flex items-center gap-2.5 font-semibold text-sm text-[#121217] dark:text-[#f3f3f6] mb-1">
                <EyeOff className="w-4 h-4 text-[#f3a400]" />
                <span>Zéro Télémétrie</span>
              </div>
              <p className="text-xs text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
                Aucun tracker, aucun cookie, aucun rapport d'usage discret. Respect absolu de votre vie privée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
