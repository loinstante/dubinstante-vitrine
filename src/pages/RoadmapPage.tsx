import React from 'react';
import { Reveal, Eyebrow, Halo } from '../components/ui/Primitives';
import { Check } from 'lucide-react';
import { CURRENT_VERSION } from '../config/downloads';

const PHASES = [
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
    phase: 'v1.0',
    status: 'next',
    title: 'Release finale',
    items: ['Documentation complète', 'Notarisation macOS', 'Stabilisation API'],
  },
];

export const RoadmapPage: React.FC = () => (
  <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
    <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] opacity-40" />
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
      <Reveal className="max-w-2xl mb-14">
        <Eyebrow className="mb-3">Feuille de route</Eyebrow>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
          En route vers la v1.0.
        </h1>
        <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
          Version courante : <span className="font-mono text-accent">{CURRENT_VERSION}</span>.
          Développement actif, bêta publique ouverte.
        </p>
      </Reveal>

      <div className="relative pl-6">
        {/* vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
        <div className="space-y-10">
          {PHASES.map((p, i) => (
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
                  {p.status === 'done' ? 'Fait' : p.status === 'active' ? 'En cours' : 'À venir'}
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
