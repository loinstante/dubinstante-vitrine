import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SAMPLE_TEXT_FR = [
  'Bon', 'jour,', 'ins', 'pec', 'teur.', 'Que', "s'est-il", 'pas', 'sé', 'i', 'ci ?',
  '[pause]', 'Re', 'gar', 'dez', "l'é", 'cran,', 'la', 'syn', 'chro', 'est', 'par', 'fai', 'te !',
];

const SAMPLE_TEXT_EN = [
  'Good', 'mor', 'ning,', 'de', 'tec', 'tive.', 'What', 'hap', 'pened', 'here ?',
  '[pause]', 'Look', 'at', 'the', 'screen,', 'the', 'sync', 'is', 'spot', 'on !',
];

const TOTAL_WIDTH = 2200;

export const RythmoBandBg: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const sampleText = language === 'en' ? SAMPLE_TEXT_EN : SAMPLE_TEXT_FR;

  useEffect(() => {
    // Respect user motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let raf = 0;
    let pos = 0;
    let last: number | null = null;
    let isVisible = false;

    const animate = (time: number) => {
      if (!isVisible) return;
      if (last !== null) {
        const delta = (time - last) / 1000;
        pos += 90 * delta;
        if (pos >= TOTAL_WIDTH - 200) pos = 0;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-pos}px, 0, 0)`;
        }
      }
      last = time;
      raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          last = null;
          raf = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Faded video stage look — adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-sunk)] via-[var(--bg-main)] to-[var(--bg-sunk)]" />

      {/* Subtle scanlines — dark mode only */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:block hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
        }}
      />

      {/* Scrolling syllables, low opacity so headline stays readable */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/20" />
        {/* sync cursor */}
        <div className="absolute top-0 bottom-0 left-[22%] w-px bg-accent/40 z-20" />
        <div
          ref={trackRef}
          className="absolute left-[22%] top-0 bottom-0 flex items-center will-change-transform font-mono font-bold text-sm tracking-wider text-[var(--text-muted)]"
          style={{ transform: 'translate3d(0px, 0, 0)' }}
        >
          {sampleText.map((syl, idx) => (
            <span
              key={idx}
              className={`inline-block whitespace-nowrap px-1.5 ${
                syl === '[pause]' ? 'italic text-[var(--text-muted)]/60 font-normal' : 'text-[var(--text-muted)]'
              }`}
            >
              {syl}
            </span>
          ))}
        </div>
      </div>

      {/* Center fade mask for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-main)] via-transparent to-[var(--bg-main)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/40 to-[var(--bg-main)]" />
    </div>
  );
};
