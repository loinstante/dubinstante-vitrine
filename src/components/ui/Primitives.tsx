import React from 'react';
import { useInView } from '../../hooks/useInView';

export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  [key: string]: unknown;
}> = ({ children, delay = 0, as = 'div', className = '', ...rest }) => {
  const { ref, inView } = useInView();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      data-reveal={inView ? 'shown' : 'hidden'}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const SpotlightStage: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden
    className={`spotlight-performer ${className}`}
  />
);

export const Spotlight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden
    className={`spotlight-soft ${className}`}
  />
);

export const Halo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Spotlight className={className} />
);

export const SectionRule: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`timeline-rule ${className}`} />
);

export const TimecodeWatermark: React.FC<{
  timecode?: string;
  className?: string;
}> = ({ timecode = '00:00:00:00', className = '' }) => (
  <span aria-hidden className={`timecode-watermark ${className}`}>
    {timecode}
  </span>
);

export const RecDot: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label,
}) => (
  <span className={`inline-flex items-center gap-1.5 ${className}`}>
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-rec opacity-60 animate-glow-pulse" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-rec" />
    </span>
    {label && (
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-rec">
        {label}
      </span>
    )}
  </span>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p
    className={`font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)] ${className}`}
  >
    {children}
  </p>
);
