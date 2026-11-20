import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './ui/Primitives';

export const Features: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { num: '01', tag: t.features.f1Tag, title: t.features.f1Title, desc: t.features.f1Desc },
    { num: '02', tag: t.features.f2Tag, title: t.features.f2Title, desc: t.features.f2Desc },
    { num: '03', tag: t.features.f3Tag, title: t.features.f3Title, desc: t.features.f3Desc },
    { num: '04', tag: t.features.f4Tag, title: t.features.f4Title, desc: t.features.f4Desc },
  ];

  return (
    <section
      id="features"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-main)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start text-left">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-text)]">
                {t.features.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance text-[var(--text-primary)]">
                {t.features.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.features.subtitle}
              </p>
              <p className="mt-8 border-t border-[var(--border-subtle)] pt-6 font-mono text-xs text-[var(--text-muted)]">
                C++17 · Qt 6 · OpenGL · FFmpeg
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {items.map((item, idx) => (
                <Reveal
                  key={item.num}
                  as="li"
                  delay={idx * 80}
                  className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-2">
                    <span className="font-mono text-xs tabular-nums text-[var(--accent-text)]">
                      {item.num}
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      {item.tag}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-medium text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
