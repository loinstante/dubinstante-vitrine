import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Layers, Mic, Cpu, Share2 } from 'lucide-react';
import { Reveal, Eyebrow, TimecodeWatermark } from './ui/Primitives';

export const Features: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { num: '01', tag: t.features.f1Tag, title: t.features.f1Title, desc: t.features.f1Desc, icon: Layers },
    { num: '02', tag: t.features.f2Tag, title: t.features.f2Title, desc: t.features.f2Desc, icon: Mic },
    { num: '03', tag: t.features.f3Tag, title: t.features.f3Title, desc: t.features.f3Desc, icon: Cpu },
    { num: '04', tag: t.features.f4Tag, title: t.features.f4Title, desc: t.features.f4Desc, icon: Share2 },
  ];

  return (
    <section id="features" className="relative py-24 md:py-32 border-t border-[var(--border-subtle)]">
      <TimecodeWatermark
        timecode="00:00:42:08"
        className="hidden 2xl:block absolute top-8 left-8 text-5xl font-bold"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-14 mx-auto text-center">
          <Eyebrow className="mb-3">{t.features.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
            {t.features.title}
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            {t.features.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={idx}
                delay={idx * 100}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] scan-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-sm font-bold text-accent tabular-nums">
                      {item.num}
                    </span>
                    <span className="h-px flex-1 bg-[var(--border-subtle)]" />
                    <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 font-display font-bold text-lg text-[var(--text-primary)] mb-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                  {item.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
