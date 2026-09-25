import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './ui/Primitives';

export const StatsBar: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { value: t.stats.stat1Value, label: t.stats.stat1Label },
    { value: t.stats.stat2Value, label: t.stats.stat2Label },
    { value: t.stats.stat3Value, label: t.stats.stat3Label },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
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
};
