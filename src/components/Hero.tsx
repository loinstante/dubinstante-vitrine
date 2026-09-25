import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  CURRENT_VERSION,
  detectClientOS,
  DOWNLOAD_PLATFORMS,
  GITHUB_REPO_URL,
} from '../config/downloads';
import { GithubIcon } from './GithubIcon';
import { Download, ArrowDown } from 'lucide-react';
import { RythmoBandBg } from './RythmoBandBg';
import { SpotlightStage, Spotlight } from './ui/Primitives';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const detectedOS = detectClientOS();
  const platform = DOWNLOAD_PLATFORMS[detectedOS];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Rythmo band background */}
      <RythmoBandBg className="z-0" />

      {/* Studio Spotlight — "you are in the light, you are the one performing" */}
      <SpotlightStage className="top-[-12rem] left-1/2 -translate-x-1/2 w-[54rem] h-[34rem] z-0" />
      <Spotlight className="top-[2rem] left-1/2 -translate-x-1/2 w-[34rem] h-[26rem] z-0 opacity-70" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow with live REC dot */}
        <div className="inline-flex items-center gap-3 mb-7 animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rec opacity-60 animate-glow-pulse" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rec" />
          </span>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)]">
            {t.hero.eyebrow}
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold tracking-tight text-balance text-4xl sm:text-6xl md:text-7xl leading-[1.1] text-[var(--text-primary)] animate-fade-in">
          {language === 'fr' ? (
            <>
              Le studio libre de{' '}
              <span className="text-accent">bande&nbsp;rythmo</span> et{' '}
              <span className="text-accent">doublage</span>.
            </>
          ) : (
            <>
              The open studio for{' '}
              <span className="text-accent">rythmo&nbsp;bands</span> and{' '}
              <span className="text-accent">dubbing</span>.
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-7 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0"
          style={{ animationDelay: '600ms' }}
        >
          {t.hero.subtitle}
        </p>

        {/* Rythmo explanation callout for newcomers */}
        <div
          className="mt-5 max-w-xl mx-auto px-4 py-2.5 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] text-center animate-fade-up opacity-0 backdrop-blur-sm"
          style={{ animationDelay: '660ms' }}
        >
          <span className="font-semibold text-[var(--text-primary)] mr-1">
            {t.hero.whatIsRythmoTitle}
          </span>
          <span>{t.hero.whatIsRythmoDesc}</span>
        </div>

        {/* Actions */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up opacity-0"
          style={{ animationDelay: '740ms' }}
        >
          <a
            href={platform.url}
            className="group w-full sm:w-auto relative flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-[0_0_30px_-8px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_-6px_rgba(229,9,20,0.7)] hover:-translate-y-0.5"
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
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl transition-colors backdrop-blur-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span>{t.hero.viewGithub}</span>
          </a>
        </div>

        {/* Secondary link */}
        <div
          className="mt-5 animate-fade-in opacity-0"
          style={{ animationDelay: '820ms' }}
        >
          <Link
            to="/download"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-accent transition-colors font-mono"
          >
            <span>Windows · macOS · Linux · Android</span>
            <ArrowDown className="w-3 h-3" />
          </Link>
        </div>

        {/* Specs metadata line */}
        <div
          className="mt-14 pt-6 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] tabular-nums animate-fade-in opacity-0"
          style={{ animationDelay: '940ms' }}
        >
          {t.hero.metaSpecs}
        </div>
      </div>
    </section>
  );
};
