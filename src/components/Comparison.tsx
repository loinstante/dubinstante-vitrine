import React from 'react';
import { Reveal, Eyebrow, Halo } from './ui/Primitives';
import { Check, X } from 'lucide-react';

const DUB = [
  'Vos données restent sur votre machine',
  'Pas de DRM, pas de cloud forcé',
  'Transparence totale du code source',
  'Gratuit, sans abonnement ni compte',
];
const PROPS = [
  'Licences coûteuses à plusieurs centaines d\'€',
  'Serveurs distants lents',
  'Obligation de connexion',
  'Formats fermés et propriétaires',
];

export const Comparison: React.FC = () => (
  <section className="relative py-24 md:py-32 border-t border-[var(--border-subtle)] overflow-hidden">
    <Halo className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] opacity-40" />
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
      <Reveal className="max-w-2xl mb-14">
        <Eyebrow className="mb-3">L'heure du choix</Eyebrow>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
          Modernité Open-Source{' '}
          <span className="text-[var(--text-muted)]">vs</span>{' '}
          Héritage Obsolète
        </h2>
        <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
          Jusqu'à aujourd'hui, vous n'aviez que deux options : subir des logiciels gratuits
          dont l'interface n'a pas évolué depuis les années 2000, ou investir dans des
          solutions pro à plusieurs centaines d'euros comme Vocalign, EdiLoad ou Stellar.
          DubInstante incarne la troisième voie.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DubInstante column */}
        <Reveal className="relative p-7 md:p-8 rounded-2xl border border-accent/30 bg-accent/[0.04] scan-hover">
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-glow-pulse" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
              DubInstante
            </h3>
            <span className="ml-auto text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
              3e voie
            </span>
          </div>
          <ul className="space-y-3">
            {DUB.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Proprietary column */}
        <Reveal
          delay={120}
          className="relative p-7 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 opacity-80"
        >
          <div className="flex items-center gap-2 mb-6">
            <X className="w-4 h-4 text-[var(--text-muted)]" />
            <h3 className="font-display font-bold text-lg text-[var(--text-secondary)]">
              Solutions propriétaires
            </h3>
            <span className="ml-auto text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Vocalign · EdiLoad · Stellar
            </span>
          </div>
          <ul className="space-y-3">
            {PROPS.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                <X className="w-4 h-4 text-rec/70 mt-0.5 shrink-0" />
                <span className="line-through decoration-[var(--text-muted)]/40">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);
