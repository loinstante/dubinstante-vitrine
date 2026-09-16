import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "en";

export interface Translations {
  nav: {
    preview: string;
    features: string;
    opensource: string;
    download: string;
    github: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    downloadFor: string;
    viewGithub: string;
    metaSpecs: string;
  };
  preview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabScreenshot: string;
    tabSimulator: string;
    screenshotCaption: string;
    play: string;
    pause: string;
    speed: string;
    timecode: string;
    shortcutHint: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f1Tag: string;
    f2Title: string;
    f2Desc: string;
    f2Tag: string;
    f3Title: string;
    f3Desc: string;
    f3Tag: string;
    f4Title: string;
    f4Desc: string;
    f4Tag: string;
  };
  opensource: {
    eyebrow: string;
    title: string;
    desc1: string;
    desc2: string;
    gplPill: string;
    localPill: string;
    noCloudPill: string;
    contributeBtn: string;
    issuesBtn: string;
    roadmapBtn: string;
  };
  download: {
    eyebrow: string;
    title: string;
    subtitle: string;
    btnDownload: string;
    allReleases: string;
    sourceCode: string;
    gatekeeperNote: string;
    smartScreenNote: string;
    linuxNote: string;
  };
  footer: {
    brandDesc: string;
    license: string;
    ecosystem: string;
    madeBy: string;
    reportBug: string;
    roadmap: string;
    releases: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      preview: "Aperçu",
      features: "Fonctionnalités",
      opensource: "Open-Source",
      download: "Télécharger",
      github: "GitHub",
    },
    hero: {
      eyebrow: "Studio libre de doublage et de bande rythmo",
      title: "Le studio libre de bande rythmo et de doublage.",
      subtitle:
        "DubInstante est un logiciel de post-production gratuit et open source (GPLv3). 100% hors-ligne, écrit en C++17 et Qt 6, sans compte, sans cloud et sans abonnement.",
      downloadFor: "Télécharger pour",
      viewGithub: "Code source sur GitHub",
      metaSpecs: "GPLv3 · C++17 & Qt 6 · Rendu OpenGL · FFmpeg natif · 100% Hors-ligne",
    },
    preview: {
      eyebrow: "Aperçu du logiciel",
      title: "Conçu pour la fluidité en studio.",
      subtitle:
        "Bande rythmo défilante à 60 images par seconde, alignement syllabique chirurgical et lecture sans saccade.",
      tabScreenshot: "Capture native Studio (Qt6)",
      tabSimulator: "Simulateur Rythmo interactif",
      screenshotCaption:
        "Interface native DubInstante 2026 sous macOS / Linux / Windows. Rendu accéléré par OpenGL.",
      play: "Lecture",
      pause: "Pause",
      speed: "Vitesse",
      timecode: "Timecode",
      shortcutHint:
        "Touche [Espace] pour Play/Pause · [← / →] pour défiler image par image",
    },
    features: {
      eyebrow: "Capacités réelles",
      title: "L'essentiel, sans fioritures.",
      subtitle:
        "Chaque outil répond à un besoin concret de la chaîne de doublage, de la synchro labiale jusqu'à l'export master.",
      f1Title: "Bande rythmo dynamique (1 à 4 pistes)",
      f1Desc:
        "Faites défiler le texte synchronisé sous les yeux des comédiens. Chaque réplique arrive pile sur le repère de synchro avec polices et styles studio personnalisables.",
      f1Tag: "Synchronisation labiale",
      f2Title: "Enregistrement multipiste direct (WAV)",
      f2Desc:
        "Prise de son directe depuis vos microphones studio en WAV 24-bit 48 kHz. Monitoring audio temps réel sans écho et sauvegarde calée au timecode exact.",
      f2Tag: "Audio Broadcast",
      f3Title: "Moteur natif C++17 & OpenGL",
      f3Desc:
        "Aucune couche web lourde, aucun framework Electron. Gestion fluide des vidéos 4K et des fichiers bruts de plus de 50 Go sans perte de synchronisation.",
      f3Tag: "Performance native",
      f4Title: "Export FFmpeg sans réencodage",
      f4Desc:
        "Assemblez vos prises de voix avec la vidéo originale instantanément grâce au multiplexage FFmpeg. Zéro perte de piqué visuel sur le rush d'origine.",
      f4Tag: "Workflow non destructif",
    },
    opensource: {
      eyebrow: "Philosophie & Indépendance",
      title: "Un bien commun pour le doublage.",
      desc1:
        "Les outils professionnels de doublage ne devraient pas dépendre de licences à plusieurs milliers d'euros, de dongles USB ou d'abonnements captifs. DubInstante est un logiciel libre sous licence GPLv3 : vous pouvez l'utiliser, l'étudier, le modifier et le redistribuer sans restriction.",
      desc2:
        "100% local-first. Aucune connexion requise, aucun compte, aucune télémétrie. Vos projets, voix et rushs vidéo restent strictement sur votre machine.",
      gplPill: "Licence GPLv3",
      localPill: "100% Local-First",
      noCloudPill: "Zéro Télémétrie",
      contributeBtn: "Contribuer sur GitHub",
      issuesBtn: "Signaler un bug",
      roadmapBtn: "Feuille de route",
    },
    download: {
      eyebrow: "Téléchargements",
      title: "Télécharger DubInstante.",
      subtitle:
        "Disponible gratuitement pour macOS, Windows, Linux et Android. Sans inscription ni carte bancaire.",
      btnDownload: "Télécharger",
      allReleases: "Toutes les versions et binaires sur GitHub Releases",
      sourceCode: "Dépôt de code source",
      gatekeeperNote: "macOS : faites Clic droit > Ouvrir si Gatekeeper demande une confirmation lors du premier lancement.",
      smartScreenNote: "Windows : cliquez sur 'Informations complémentaires' puis 'Exécuter quand même' si SmartScreen apparaît.",
      linuxNote: "Linux : rendez l'AppImage exécutable (chmod +x) et lancez-la directement.",
    },
    footer: {
      brandDesc:
        "DubInstante est un logiciel libre et gratuit de bande rythmo et de doublage vidéo. Conçu pour les comédiens, adaptateurs et créateurs indépendants.",
      license: "Licence libre GPLv3 · Vos données restent sur votre ordinateur.",
      ecosystem: "Écosystème libre L'Oinstante",
      madeBy: "Projet libre développé par L'Oinstante",
      reportBug: "Signaler un bug",
      roadmap: "Feuille de route",
      releases: "Toutes les versions",
    },
  },
  en: {
    nav: {
      preview: "Preview",
      features: "Features",
      opensource: "Open-Source",
      download: "Download",
      github: "GitHub",
    },
    hero: {
      eyebrow: "Free & Open-Source Dubbing and Rythmo Band Studio",
      title: "The open studio for rythmo bands and dubbing.",
      subtitle:
        "DubInstante is a free and open-source post-production tool (GPLv3). 100% offline, engineered in C++17 and Qt 6, zero accounts, zero cloud, and zero subscriptions.",
      downloadFor: "Download for",
      viewGithub: "Source code on GitHub",
      metaSpecs: "GPLv3 · C++17 & Qt 6 · OpenGL rendering · Native FFmpeg · 100% Offline",
    },
    preview: {
      eyebrow: "App Preview",
      title: "Engineered for studio fluidity.",
      subtitle:
        "60 FPS scrolling rythmo band, surgical syllable timing, and stutter-free playback on heavy footage.",
      tabScreenshot: "Native Studio Screenshot (Qt6)",
      tabSimulator: "Interactive Rythmo Band (60 FPS)",
      screenshotCaption:
        "Native DubInstante interface on macOS / Linux / Windows. Hardware-accelerated OpenGL rendering.",
      play: "Play",
      pause: "Pause",
      speed: "Speed",
      timecode: "Timecode",
      shortcutHint:
        "[Spacebar] to Play/Pause · [← / →] arrows for frame-by-frame scrubbing",
    },
    features: {
      eyebrow: "Core Capabilities",
      title: "What matters, zero fluff.",
      subtitle:
        "Each tool solves a real, practical challenge in dubbing workflows, from lip sync to master exports.",
      f1Title: "Dynamic Rythmo Band (1 to 4 tracks)",
      f1Desc:
        "Scroll synchronized text directly before voice actors. Each syllable arrives precisely at the sync bar with customizable studio fonts and colors.",
      f1Tag: "Lip synchronization",
      f2Title: "Direct Multi-track Recording (WAV)",
      f2Desc:
        "Capture uncompressed 24-bit 48 kHz WAV audio straight from your studio mics. Zero-latency direct monitoring and timecode-locked takes.",
      f2Tag: "Broadcast Audio",
      f3Title: "Native C++17 & OpenGL Engine",
      f3Desc:
        "No heavy web wrappers, no Electron bloat. Effortlessly scrubs 4K video files and 50GB+ raw footage with zero dropped frames.",
      f3Tag: "Native Performance",
      f4Title: "Instant Lossless FFmpeg Export",
      f4Desc:
        "Mux voice takes and source video streams together in seconds using FFmpeg pass-through. Preserves 100% of the original video bitrate.",
      f4Tag: "Non-destructive workflow",
    },
    opensource: {
      eyebrow: "Philosophy & Independence",
      title: "A common good for the dubbing community.",
      desc1:
        "Professional dubbing tools shouldn't be locked behind multi-thousand dollar licenses, hardware dongles, or vendor lock-in subscriptions. DubInstante is free software under the GPLv3 license: use it, inspect it, adapt it, and share it freely.",
      desc2:
        "100% local-first. No internet required, no sign-up, zero telemetry. Your projects, voices, and video footage never leave your hard drive.",
      gplPill: "GPLv3 Licensed",
      localPill: "100% Local-First",
      noCloudPill: "Zero Telemetry",
      contributeBtn: "Contribute on GitHub",
      issuesBtn: "Report an Issue",
      roadmapBtn: "Roadmap",
    },
    download: {
      eyebrow: "Downloads",
      title: "Download DubInstante.",
      subtitle:
        "Freely available for macOS, Windows, Linux, and Android. No credit card, no registration.",
      btnDownload: "Download",
      allReleases: "All releases and binaries on GitHub Releases",
      sourceCode: "Source code repository",
      gatekeeperNote: "macOS: Right-click > Open if Gatekeeper asks for confirmation on first launch.",
      smartScreenNote: "Windows: Click 'More info' then 'Run anyway' if SmartScreen pops up.",
      linuxNote: "Linux: Make the AppImage executable (chmod +x) and launch directly.",
    },
    footer: {
      brandDesc:
        "DubInstante is a free and open-source video dubbing and rythmo band studio. Built with craft for actors, adapters, and independent creators.",
      license: "GPLv3 Free Software · All data remains on your machine.",
      ecosystem: "L'Oinstante Free Software Ecosystem",
      madeBy: "Open-source project created by L'Oinstante",
      reportBug: "Report a bug",
      roadmap: "Roadmap",
      releases: "All versions",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("dubinstante_lang") as Language;
    if (saved && (saved === "fr" || saved === "en")) {
      setLanguageState(saved);
    } else {
      const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("dubinstante_lang", lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

