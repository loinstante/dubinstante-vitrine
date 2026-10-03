import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Halo } from '../components/ui/Primitives';
import { Check } from 'lucide-react';
import { CURRENT_VERSION } from '../config/downloads';

const PHASES_FR = [
  {
    phase: 'v0.11.0',
    status: 'done',
    title: 'Refonte UI majeure',
    items: ['Nouvelle interface studio', 'Simulateur rythmo refait', 'Base du moteur OpenGL'],
  },
  {
    phase: 'v0.12.x',
    status: 'active',
    title: 'Stabilisation bêta',
    items: ['Multipiste audio robuste', 'Préréglages rythmo', 'Optimisation 4K'],
  },
  {
    phase: 'v0.13',
    status: 'next',
    title: 'Retour d\u2019Android',
    items: ['Version tablette Android quasi complète', 'Fonctions du studio au-delà du cœur'],
  },
  {
    phase: 'v1.0',
    status: 'next',
    title: 'Release finale',
    items: ['Documentation complète', 'Notarisation macOS', 'Stabilisation API'],
  },
];

const PHASES_EN = [
  {
    phase: 'v0.11.0',
    status: 'done',
    title: 'Major Studio UI Redesign',
    items: ['New native studio interface', 'Enhanced 60 FPS rythmo band simulator', 'OpenGL hardware rendering foundation'],
  },
  {
    phase: 'v0.12.x',
    status: 'active',
    title: 'Beta Stabilization',
    items: ['Robust multi-track broadcast WAV capture', 'Studio font & color rythmo presets', 'High-bitrate 4K optimization'],
  },
  {
    phase: 'v1.0',
    status: 'next',
    title: 'General Availability (v1.0)',
    items: ['Comprehensive studio user guides', 'Apple Silicon & Windows notarized builds', 'Session format stability guarantee'],
  },
];

export const RoadmapPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  useDocumentTitle(isEn ? 'Roadmap' : 'Feuille de route');
  const phases = isEn ? PHASES_EN : PHASES_FR;

  const getStatusLabel = (status: string) => {
    if (status === 'done') return isEn ? 'Completed' : 'Fait';
    if (status === 'active') return isEn ? 'In Progress' : 'En cours';
    return isEn ? 'Upcoming' : 'À venir';
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] opacity-40" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl mb-14">
          <Eyebrow className="mb-3">{isEn ? 'Roadmap' : 'Feuille de route'}</Eyebrow>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
            {isEn ? 'On the road to v1.0.' : 'En route vers la v1.0.'}
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            {isEn ? 'Current version: ' : 'Version courante : '}{' '}
            <span className="font-mono text-accent">{CURRENT_VERSION}</span>.{' '}
            {isEn
              ? 'Active open-source development, public beta available for testing.'
              : 'Développement actif, bêta publique ouverte.'}
          </p>
        </Reveal>

        <div className="relative pl-6">
          {/* vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
          <div className="space-y-10">
            {phases.map((p, i) => (
              <Reveal key={i} delay={i * 100} className="relative">
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--bg-main)] bg-accent" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-bold text-accent tabular-nums">
                    {p.phase}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      p.status === 'done'
                        ? 'text-audio-green bg-audio-green/10'
                        : p.status === 'active'
                        ? 'text-rec bg-rec/10'
                        : 'text-[var(--text-muted)] bg-[var(--bg-surface)]'
                    }`}
                  >
                    {getStatusLabel(p.status)}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                  {p.title}
                </h3>
                <ul className="space-y-2">
                  {p.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
