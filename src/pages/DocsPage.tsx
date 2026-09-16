import React from 'react';
import { Reveal, Eyebrow, Halo, TimecodeWatermark } from '../components/ui/Primitives';
import { CURRENT_VERSION } from '../config/downloads';

const GUIDES = [
  {
    img: '/assets/tuto1.png',
    tag: '01 — Démarrage',
    title: 'Premier lancement & import vidéo',
    desc: "Importez votre rush, calibrez la bande rythmo et placez votre premier repère de synchro. Les bases en 3 minutes.",
  },
  {
    img: '/assets/tuto2.png',
    tag: '02 — Enregistrement',
    title: 'Enregistrer une voix multipiste',
    desc: "Branchez votre micro, lancez la prise WAV 24-bit/48 kHz, et calez votre prise au timecode exact.",
  },
  {
    img: '/assets/tuto3.png',
    tag: '03 — Export',
    title: 'Export FFmpeg sans réencodage',
    desc: "Muxez voix + vidéo source en un master propre. Zéro perte de piqué sur le rush d'origine.",
  },
];

export const DocsPage: React.FC = () => (
  <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
    <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] opacity-40" />
    <TimecodeWatermark
      timecode="00:00:00:00"
      className="hidden md:block absolute top-28 right-8 text-5xl font-bold"
    />
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
      <Reveal className="max-w-2xl mb-14">
        <Eyebrow className="mb-3">Documentation</Eyebrow>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
          Guides de prise en main.
        </h1>
        <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
          Tout ce qu'il faut pour aller de l'installation au premier master. Version courante :{' '}
          <span className="font-mono text-accent">{CURRENT_VERSION}</span>.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((g, i) => (
          <Reveal
            key={i}
            delay={i * 100}
            className="group rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover"
          >
            <div className="aspect-video overflow-hidden bg-ink">
              <img
                src={g.img}
                alt={g.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                {g.tag}
              </span>
              <h3 className="mt-2 font-display font-bold text-lg text-[var(--text-primary)]">
                {g.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {g.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
