import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, TimecodeWatermark } from './ui/Primitives';

const AUDIENCES_FR = [
  { title: 'Débutants qui découvrent le doublage', icon: '🌿' },
  { title: 'Créateurs YouTube et podcasts vidéo', icon: '🎬' },
  { title: 'Traducteurs et adaptateurs de contenu', icon: '✍️' },
  { title: 'Étudiants en cinéma et post-production', icon: '🎓' },
  { title: 'Petits studios sans budget logiciel', icon: '🏢' },
];

const AUDIENCES_EN = [
  { title: 'Beginners learning dubbing & voice acting', icon: '🌿' },
  { title: 'YouTube creators and video podcasters', icon: '🎬' },
  { title: 'Translators and content adaptors', icon: '✍️' },
  { title: 'Film and sound design students', icon: '🎓' },
  { title: 'Indie studios with zero software budget', icon: '🏢' },
];

export const Audience: React.FC = () => {
  const { language } = useLanguage();
  const audiences = language === 'en' ? AUDIENCES_EN : AUDIENCES_FR;

  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--border-subtle)]">
      <TimecodeWatermark
        timecode="00:01:24:12"
        className="hidden md:block absolute top-8 right-8 text-5xl font-bold"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow className="mb-3">{language === 'en' ? 'Target Audience' : 'Pour qui ?'}</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
            {language === 'en' ? 'From indie creators to recording studios.' : "De l'amateur au studio."}
          </h2>
        </Reveal>

        <div className="flex flex-wrap gap-3">
          {audiences.map((a, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-accent/50 transition-colors scan-hover"
            >
              <span className="text-lg" aria-hidden>{a.icon}</span>
              <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {a.title}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
