import React from 'react';
import { DownloadHub } from '../components/DownloadHub';
import { Reveal, Eyebrow, Halo } from '../components/ui/Primitives';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';

export const DownloadPage: React.FC = () => {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'fr' ? 'Télécharger' : 'Download');

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-50" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow className="mb-2">{t.download.eyebrow}</Eyebrow>
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-balance text-[var(--text-primary)]">
            {t.download.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.download.subtitle}
          </p>
        </Reveal>

        <DownloadHub showHeader={false} />
      </div>
    </section>
  );
};
