import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GITHUB_REPO_URL } from '../config/downloads';
import { GithubIcon } from './GithubIcon';
import { Shield, EyeOff, Code, Bug, Compass } from 'lucide-react';

export const OpenSourceSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="opensource" className="py-20 md:py-28 border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left / Main text */}
          <div className="lg:col-span-7">
            <p className="text-xs font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              {t.opensource.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t.opensource.title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <p>{t.opensource.desc1}</p>
              <p>{t.opensource.desc2}</p>
            </div>

            {/* GitHub Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 transition-opacity"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>{t.opensource.contributeBtn}</span>
              </a>

              <a
                href={`${GITHUB_REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] transition-colors"
              >
                <Bug className="w-3.5 h-3.5" />
                <span>{t.opensource.issuesBtn}</span>
              </a>

              <a
                href={`${GITHUB_REPO_URL}#-roadmap`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t.opensource.roadmapBtn}</span>
              </a>
            </div>
          </div>

          {/* Right / Pillars list */}
          <div className="lg:col-span-5 space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 font-semibold text-sm text-[var(--text-primary)] mb-1">
                <Code className="w-4 h-4 text-accent dark:text-accent" />
                <span>Licence GNU GPLv3</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Le code appartient à la communauté. Aucun brevet restrictif, aucune fonctionnalité bloquée derrière un paywall.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 font-semibold text-sm text-[var(--text-primary)] mb-1">
                <Shield className="w-4 h-4 text-audio-green" />
                <span>100% Local-First</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Fonctionne sans connexion. Vos rushs vidéo et enregistrements restent sur votre stockage local.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 font-semibold text-sm text-[var(--text-primary)] mb-1">
                <EyeOff className="w-4 h-4 text-accent" />
                <span>Zéro Télémétrie</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Aucun tracker, aucun cookie, aucun rapport d'usage discret. Respect absolu de votre vie privée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
