import React from 'react';

const KEYWORDS = [
  'BANDE RYTHMO',
  'ENREGISTREMENT MULTIPISTE',
  'DOUBLAGE VIDÉO',
  'FICHIERS 50 Go+',
  'IMAGE PAR IMAGE',
  'OPEN SOURCE',
  '100% LOCAL',
  'EXPORT FFMPEG',
];

export const KeywordMarquee: React.FC = () => {
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 py-5">
      <div className="flex w-max animate-scroll-x whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {KEYWORDS.map((kw, i) => (
              <React.Fragment key={`${dup}-${i}`}>
                <span className="px-6 font-mono text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                  {kw}
                </span>
                <span className="text-accent/70 select-none">·</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-main)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-main)] to-transparent" />
    </section>
  );
};
