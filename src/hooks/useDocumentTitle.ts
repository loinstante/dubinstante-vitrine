import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useDocumentTitle(title?: string, description?: string) {
  const { language } = useLanguage();

  useEffect(() => {
    const fullTitle = title
      ? `${title} — DubInstante`
      : language === 'en'
      ? 'DubInstante — The Free & Open Studio for Rythmo Bands and Dubbing'
      : 'DubInstante — Le Studio Libre de Bande Rythmo et de Doublage';

    document.title = fullTitle;

    // Update OpenGraph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    // Update Twitter Title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', fullTitle);
    }

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) {
        twitterDesc.setAttribute('content', description);
      }
    }
  }, [title, description, language]);
}
