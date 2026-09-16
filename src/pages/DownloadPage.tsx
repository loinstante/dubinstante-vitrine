import React from 'react';
import { DownloadHub } from '../components/DownloadHub';
import { Reveal, Eyebrow, Halo } from '../components/ui/Primitives';

export const DownloadPage: React.FC = () => (
  <section className="relative pt-32 md:pt-40 pb-10 overflow-hidden">
    <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-50" />
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center mb-4">
      <Reveal>
        <Eyebrow className="mb-3">Téléchargement</Eyebrow>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
          Récupérez DubInstante.
        </h1>
      </Reveal>
    </div>
    <DownloadHub />
  </section>
);
