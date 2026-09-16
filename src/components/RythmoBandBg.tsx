import React, { useRef, useEffect } from 'react';

const SAMPLE_TEXT = [
  'Bon', 'jour,', 'ins', 'pec', 'teur.', 'Que', "s'est-il", 'pas', 'sé', 'i', 'ci ?',
  '[pause]', 'Re', 'gar', 'dez', "l'é", 'cran,', 'la', 'syn', 'chro', 'est', 'par', 'fai', 'te !',
];

const TOTAL_WIDTH = 2200;

export const RythmoBandBg: React.FC<{ className?: string }> = ({ className = '' }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let pos = 0;
    let last: number | null = null;

    const animate = (time: number) => {
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
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Faded video stage look */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-ink to-ink-deep" />

      {/* Subtle scanlines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
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
          className="absolute left-[22%] top-0 bottom-0 flex items-center will-change-transform font-mono font-bold text-sm tracking-wider text-white/15"
          style={{ transform: 'translate3d(0px, 0, 0)' }}
        >
          {SAMPLE_TEXT.map((syl, idx) => (
            <span
              key={idx}
              className={`inline-block whitespace-nowrap px-1.5 ${
                syl === '[pause]' ? 'italic text-white/10 font-normal' : 'text-white/15'
              }`}
            >
              {syl}
            </span>
          ))}
        </div>
      </div>

      {/* Center fade mask for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink" />
    </div>
  );
};
