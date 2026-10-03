import { CURRENT_VERSION } from "./config/downloads";

export const SITE_URL = "https://dubinstante.vercel.app";

export type Language = "fr" | "en";
export const LANGUAGES: Language[] = ["fr", "en"];

interface PageText {
  title: string;
  description: string;
}

// Single source for <title>, meta description, sitemap and prerendered routes.
// Titles: 50-60 characters. Descriptions: 120-160 characters.
export const PAGES: { path: string; fr: PageText; en: PageText }[] = [
  {
    path: "/",
    fr: {
      title: "DubInstante — Logiciel libre de bande rythmo et doublage",
      description:
        "Logiciel gratuit et open source de doublage vidéo : bande rythmo défilante, enregistrement jusqu'à 4 micros, export FFmpeg. Windows et Linux, hors-ligne.",
    },
    en: {
      title: "DubInstante — Free Open-Source Rythmo Band & Dubbing App",
      description:
        "Free, open-source video dubbing and ADR software: scrolling rythmo band, recording of up to 4 microphones, FFmpeg export. Windows and Linux, fully offline.",
    },
  },
  {
    path: "/download",
    fr: {
      title: `Télécharger DubInstante ${CURRENT_VERSION} — Windows et Linux`,
      description: `Téléchargez gratuitement DubInstante ${CURRENT_VERSION} pour Windows 10/11 et Linux (AppImage Debian, Ubuntu, Arch). Sans compte ni abonnement, empreintes SHA-256.`,
    },
    en: {
      title: `Download DubInstante ${CURRENT_VERSION} for Windows and Linux`,
      description: `Download DubInstante ${CURRENT_VERSION} for free on Windows 10/11 and Linux (AppImage for Debian, Ubuntu, Arch). No account, no subscription, SHA-256 checksums provided.`,
    },
  },
  {
    path: "/features",
    fr: {
      title: "Fonctionnalités de DubInstante — Bande rythmo et export",
      description:
        "Bande rythmo 60 FPS de 1 à 4 pistes, enregistrement WAV jusqu'à 4 micros, export FFmpeg (H.264, H.265, ProRes) et moteur natif C++17, Qt 6 et OpenGL.",
    },
    en: {
      title: "DubInstante Features — Rythmo Band, Recording, Export",
      description:
        "1 to 4 rythmo bands at 60 FPS, WAV recording of up to 4 microphones, FFmpeg export (H.264, H.265, ProRes) and a native C++17, Qt 6 and OpenGL engine.",
    },
  },
  {
    path: "/pourquoi",
    fr: {
      title: "DubInstante vs VoiceQ, Mosaic, Synchronos — Comparatif",
      description:
        "Comparatif des logiciels de bande rythmo : prix, licences, plateformes et fonctions de DubInstante face à VoiceQ, Mosaic, Synchronos, Voxdub et Cappella.",
    },
    en: {
      title: "DubInstante vs VoiceQ, Mosaic, Synchronos — Comparison",
      description:
        "Rythmo band software compared: pricing, licensing, platforms and features of DubInstante versus VoiceQ, Mosaic, Synchronos, Voxdub and Cappella.",
    },
  },
  {
    path: "/documentation",
    fr: {
      title: "Documentation DubInstante — Prise en main et raccourcis",
      description:
        "Guide de démarrage de DubInstante : importer une vidéo, écrire la bande rythmo, enregistrer les voix, exporter. Raccourcis clavier et compilation des sources.",
    },
    en: {
      title: "DubInstante Documentation — Quick Start and Shortcuts",
      description:
        "DubInstante quick-start guide: import a video, write the rythmo band, record the voices, export. Keyboard shortcuts and building from source.",
    },
  },
  {
    path: "/roadmap",
    fr: {
      title: "Feuille de route DubInstante — De la v0.1 à la v1.0",
      description:
        "Historique des versions de DubInstante et prochaines étapes : prises multiples, application Android pour tablette, builds signés et version 1.0.",
    },
    en: {
      title: "DubInstante Roadmap — From v0.1 to the v1.0 Release",
      description:
        "DubInstante release history and what comes next: multiple takes, an Android tablet app, signed builds and the 1.0 release.",
    },
  },
];

const NOT_FOUND: Record<Language, PageText> = {
  fr: {
    title: "404 · Page introuvable — DubInstante",
    description: "La page ou le timecode demandé est introuvable.",
  },
  en: {
    title: "404 · Page Not Found — DubInstante",
    description: "The requested page or timecode does not exist.",
  },
};

// French lives at the root, English under /en: the URL alone decides the language.
export const localizedPath = (path: string, language: Language) =>
  language === "en" ? `/en${path === "/" ? "" : path}` : path;

export const languageFromPath = (pathname: string): Language =>
  /^\/en(\/|$)/.test(pathname) ? "en" : "fr";

export function getPageMeta(path: string, language: Language) {
  const page = PAGES.find((p) => p.path === path);
  return {
    ...(page ?? NOT_FOUND)[language],
    noindex: !page,
    canonical: SITE_URL + localizedPath(path, language),
    alternates: {
      fr: SITE_URL + path,
      en: SITE_URL + localizedPath(path, "en"),
      "x-default": SITE_URL + path,
    },
  };
}
