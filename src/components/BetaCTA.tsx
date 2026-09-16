import React from 'react';
import { Reveal, Eyebrow, Halo } from './ui/Primitives';
import { CURRENT_VERSION, GITHUB_REPO_URL, detectClientOS, DOWNLOAD_PLATFORMS } from '../config/downloads';
import { GithubIcon } from './GithubIcon';
import { Download as DownloadIcon } from 'lucide-react';

export const BetaCTA: React.FC = () => {
  const platform = DOWNLOAD_PLATFORMS[detectClientOS()];

  return (
    <section className="relative py-28 md:py-36 border-t border-[var(--border-subtle)] overflow-hidden">
      <Halo className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] opacity-50" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rec opacity-60 animate-glow-pulse" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rec" />
            </span>
            <Eyebrow className="text-rec">En route vers la v1.0</Eyebrow>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
            Rejoignez la Bêta publique.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Accès anticipé — développement actif. Participez à l'amélioration :
            testez, signalez des bugs, contribuez sur GitHub.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={platform.url}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-ink bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-[0_0_30px_-8px_rgba(255,176,32,0.6)] hover:shadow-[0_0_40px_-6px_rgba(255,176,32,0.8)] hover:-translate-y-0.5"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Télécharger {CURRENT_VERSION} (Bêta)</span>
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl transition-colors backdrop-blur-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Voir sur GitHub</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
