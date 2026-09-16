import React from 'react';
import { CURRENT_VERSION } from '../config/downloads';
import { Reveal } from './ui/Primitives';

const STATS = [
  { value: '0 €', label: 'Pour toujours. Sans abonnement, sans compte, 100% local.' },
  { value: '50 Go+', label: 'Performance extrême pour vos flux HD non compressés.' },
  { value: CURRENT_VERSION, label: 'Refonte UI majeure, en route vers la v1.0 finale.' },
];

export const StatsBar: React.FC = () => (
  <section className="py-16 md:py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
        {STATS.map((s, i) => (
          <Reveal
            key={i}
            delay={i * 100}
            className="bg-[var(--bg-main)] p-7 md:p-9 text-center flex flex-col justify-center scan-hover"
          >
            <div className="font-display font-bold text-4xl md:text-5xl tracking-tightest text-accent tabular-nums">
              {s.value}
            </div>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
