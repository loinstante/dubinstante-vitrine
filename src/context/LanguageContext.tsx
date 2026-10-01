import React, { createContext, useContext, useState, useEffect } from "react";

import { CURRENT_VERSION } from "../config/downloads";

type Language = "fr" | "en";

export interface Translations {
  nav: {
    preview: string;
    features: string;
    why: string;
    docs: string;
    tech: string;
    roadmap: string;
    opensource: string;
    download: string;
    github: string;
  };
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tableEyebrow: string;
    tableTitle: string;
    tableSubtitle: string;
    sourcesNote: string;
    wallEyebrow: string;
    wallTitle: string;
    wallSubtitle: string;
    freedomEyebrow: string;
    freedomTitle: string;
    freedomSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
    ctaDocs: string;
  };
  navbar: {
    themeDark: string;
    themeLight: string;
    toggleTheme: string;
    changeLang: string;
    sourceCode: string;
    menu: string;
  };
  marquee: string[];
  stats: {
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    downloadFor: string;
    viewGithub: string;
    metaSpecs: string;
    whatIsRythmoTitle: string;
    whatIsRythmoDesc: string;
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
    fasterSpeed: string;
    slowerSpeed: string;
    timecode: string;
    shortcutHint: string;
    prevFrame: string;
    nextFrame: string;
    scrubLabel: string;
    simDisclaimer: string;
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    part1: string;
    part2: string;
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
    licensePill: string;
    gplDesc: string;
    localPill: string;
    localDesc: string;
    noCloudPill: string;
    noCloudDesc: string;
    contributeBtn: string;
    issuesBtn: string;
    roadmapBtn: string;
  };
  download: {
    eyebrow: string;
    title: string;
    subtitle: string;
    yourOs: string;
    fileLabel: string;
    installNotes: string;
    btnDownload: string;
    allReleases: string;
    sourceCode: string;
    gatekeeperNote: string;
    smartScreenNote: string;
    linuxNote: string;
    androidTitle: string;
    androidDesc: string;
    androidLink: string;
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
  notFound: {
    badge: string;
    title: string;
    subtitle: string;
    backHome: string;
    downloadBtn: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      preview: "Aperçu",
      features: "Fonctionnalités",
      why: "Comparatif",
      docs: "Documentation",
      tech: "Moteur C++",
      roadmap: "Roadmap",
      opensource: "Open-Source",
      download: "Télécharger",
      github: "GitHub",
    },
    navbar: {
      themeDark: "Passer au thème sombre",
      themeLight: "Passer au thème clair",
      toggleTheme: "Changer de thème",
      changeLang: "Changer de langue",
      sourceCode: "Code source GitHub",
      menu: "Menu",
    },
    marquee: [
      "BANDE RYTHMO",
      "ENREGISTREMENT MULTIPISTE",
      "DOUBLAGE VIDÉO",
      "FICHIERS 50 Go+",
      "IMAGE PAR IMAGE",
      "OPEN SOURCE",
      "100% LOCAL",
      "EXPORT FFMPEG",
    ],
    stats: {
      stat1Value: "0 €",
      stat1Label: "Pour toujours. Sans abonnement, sans compte, 100% local.",
      stat2Value: "50 Go+",
      stat2Label: "Performance extrême pour vos flux HD non compressés.",
      stat3Value: CURRENT_VERSION,
      stat3Label: "Refonte UI majeure, en route vers la v1.0 finale.",
    },
    hero: {
      eyebrow: "Studio libre de doublage et de bande rythmo",
      title: "Le studio libre de bande rythmo et de doublage.",
      subtitle:
        "DubInstante est un logiciel de post-production gratuit et open source (EUPL-1.2). 100% hors-ligne, écrit en C++17 et Qt 6, sans compte, sans cloud et sans abonnement.",
      downloadFor: "Télécharger pour",
      viewGithub: "Code source sur GitHub",
      metaSpecs: "EUPL-1.2 · C++17 & Qt 6 · Rendu OpenGL · FFmpeg natif · 100% Hors-ligne",
      whatIsRythmoTitle: "Qu'est-ce qu'une bande rythmo ?",
      whatIsRythmoDesc:
        "C'est le bandeau de texte défilant synchronisé avec l'image, utilisé en studio pour caler précisément la voix des comédiens sur le mouvement des lèvres.",
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
      fasterSpeed: "Accélérer la vitesse",
      slowerSpeed: "Ralentir la vitesse",
      timecode: "Timecode",
      shortcutHint:
        "Touche [Espace] pour Play/Pause · [← / →] pour défiler image par image",
      prevFrame: "Image précédente (-1 frame)",
      nextFrame: "Image suivante (+1 frame)",
      scrubLabel: "Position dans la session",
      simDisclaimer:
        "Démonstration interactive web du principe de la bande rythmo. L'application de bureau DubInstante exécute un rendu natif accéléré par GPU (OpenGL / Qt 6 Multimedia) avec lecture vidéo fluide et prise de son multipiste.",
    },
    features: {
      eyebrow: "Capacités réelles",
      title: "L'essentiel, sans fioritures.",
      subtitle:
        "Chaque outil répond à un besoin concret de la chaîne de doublage, de la synchro labiale jusqu'à l'export master.",
      part1: "Partie 01",
      part2: "Partie 02",
      f1Title: "Bande rythmo dynamique (1 à 4 pistes)",
      f1Desc:
        "Faites défiler le texte synchronisé sous les yeux des comédiens. Chaque réplique arrive pile sur le repère de synchro avec polices et styles studio personnalisables.",
      f1Tag: "Synchronisation labiale",
      f2Title: "Enregistrement multipiste (jusqu'à 4 micros)",
      f2Desc:
        "Prise de son directe jusqu'à 4 micros et pistes distinctes en WAV non compressé. Sélection d'entrée micro, gain et style d'apparence personnalisables par piste.",
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
        "Les outils professionnels de doublage ne devraient pas dépendre de licences à plusieurs milliers d'euros, de dongles USB ou d'abonnements captifs. DubInstante est un logiciel libre sous licence EUPL-1.2 : vous pouvez l'utiliser, l'étudier, le modifier et le redistribuer librement selon ses termes copyleft transparents.",
      desc2:
        "100% local-first. Aucune connexion requise, aucun compte, aucune télémétrie. Vos projets, voix et rushs vidéo restent strictement sur votre machine.",
      licensePill: "Licence EUPL-1.2",
      gplDesc:
        "Le code appartient à la communauté. Aucun brevet restrictif, aucune fonctionnalité bloquée derrière un paywall.",
      localPill: "100% Local-First",
      localDesc:
        "Fonctionne sans connexion. Vos rushs vidéo et enregistrements restent sur votre stockage local.",
      noCloudPill: "Zéro Télémétrie",
      noCloudDesc:
        "Aucun tracker, aucun cookie, aucun rapport d'usage discret. Respect absolu de votre vie privée.",
      contributeBtn: "Contribuer sur GitHub",
      issuesBtn: "Signaler un bug",
      roadmapBtn: "Feuille de route",
    },
    download: {
      eyebrow: "Téléchargements",
      title: "Télécharger DubInstante.",
      subtitle:
        "Disponible gratuitement pour macOS, Windows et Linux (Debian, Arch). Sans inscription ni carte bancaire.",
      yourOs: "Votre OS",
      fileLabel: "Fichier :",
      installNotes: "Notes d'installation :",
      btnDownload: "Télécharger",
      allReleases: "Toutes les versions et binaires sur GitHub Releases",
      sourceCode: "Dépôt de code source",
      gatekeeperNote: "macOS : décompressez l'archive .zip, puis faites Clic droit > Ouvrir si Gatekeeper demande une confirmation lors du premier lancement.",
      smartScreenNote: "Windows : décompressez l'archive .zip. Si SmartScreen apparaît au lancement, cliquez sur 'Informations complémentaires' puis 'Exécuter quand même'.",
      linuxNote: "Linux : décompressez l'archive .zip, rendez le binaire exécutable (chmod +x) et lancez-le directement.",
      androidTitle: "Android — en pause",
      androidDesc:
        "Le portage Android est en pause. Une version test limitée au cœur du logiciel (bande rythmo et enregistrement) reste disponible sur GitHub, sans les autres fonctions du studio. Une version tablette quasi complète est prévue avec la v0.13.",
      androidLink: "Voir la version test sur GitHub",
    },
    footer: {
      brandDesc:
        "DubInstante est un logiciel libre et gratuit de bande rythmo et de doublage vidéo. Conçu pour les comédiens, adaptateurs et créateurs indépendants.",
      license: "Licence libre EUPL-1.2 · Vos données restent sur votre ordinateur.",
      ecosystem: "Écosystème LOINSTANTE",
      madeBy: "Projet libre développé par LOINSTANTE",
      reportBug: "Signaler un bug",
      roadmap: "Feuille de route",
      releases: "Toutes les versions",
    },
    why: {
      eyebrow: "Pourquoi DubInstante ?",
      title: "La fin des licences à 4 chiffres et des bricolages.",
      subtitle:
        "Entre les logiciels de studio propriétaires inaccessibles, les freewares abandonnés des années 2000 et les bricolages sur Premiere ou Audacity, le doublage manquait d'une troisième voie. Voici pourquoi DubInstante change la donne.",
      tableEyebrow: "Comparatif exhaustif",
      tableTitle: "DubInstante face aux solutions du marché.",
      tableSubtitle:
        "Une comparaison transparente des fonctionnalités, des coûts réels et de la philosophie de travail.",
      sourcesNote:
        "Tarifs et fonctionnalités constatés en septembre 2026 à titre indicatif selon les documentations publiques des éditeurs cités.",
      wallEyebrow: "Le mur des bricolages",
      wallTitle: "Reconnaissez-vous ces galères ?",
      wallSubtitle:
        "Des milliers d'heures perdues chaque semaine par les créateurs, étudiants et comédiens qui tentent de contourner l'absence d'outil dédié.",
      freedomEyebrow: "Indépendance & Pérennité",
      freedomTitle: "Pourquoi l'Open-Source change tout pour vous.",
      freedomSubtitle:
        "Vos fichiers de projet .dbi sont 100% locaux (licence EUPL 1.2). Aucun compte requis, aucune télémétrie, aucune mauvaise surprise : vos sessions vous appartiennent pour toujours.",
      ctaTitle: "Prêt à abandonner les bricolages ?",
      ctaSubtitle:
        "Téléchargez DubInstante dès aujourd'hui sur votre système d'exploitation. Gratuit, libre et prêt en quelques secondes.",
      ctaBtn: "Télécharger DubInstante",
      ctaDocs: "Consulter la documentation",
    },
    notFound: {
      badge: "Erreur 404 · Signal Perdu",
      title: "Timecode introuvable.",
      subtitle: "La scène ou la piste demandée n'existe pas dans cette session. Vérifiez l'adresse ou revenez au studio principal.",
      backHome: "Retourner à l'accueil",
      downloadBtn: "Télécharger DubInstante",
    },
  },
  en: {
    nav: {
      preview: "Preview",
      features: "Features",
      why: "Comparison",
      docs: "Docs",
      tech: "C++ Engine",
      roadmap: "Roadmap",
      opensource: "Open-Source",
      download: "Download",
      github: "GitHub",
    },
    navbar: {
      themeDark: "Switch to dark theme",
      themeLight: "Switch to light theme",
      toggleTheme: "Toggle theme",
      changeLang: "Switch language",
      sourceCode: "GitHub source code",
      menu: "Menu",
    },
    marquee: [
      "RYTHMO BAND",
      "MULTI-TRACK RECORDING",
      "VIDEO DUBBING",
      "50 GB+ FILES",
      "FRAME BY FRAME",
      "OPEN SOURCE",
      "100% LOCAL",
      "FFMPEG EXPORT",
    ],
    stats: {
      stat1Value: "0 €",
      stat1Label: "Free forever. No subscription, no account, 100% local-first.",
      stat2Value: "50 GB+",
      stat2Label: "Extreme performance for heavy uncompressed broadcast streams.",
      stat3Value: CURRENT_VERSION,
      stat3Label: "Major UI overhaul, heading towards final v1.0.",
    },
    hero: {
      eyebrow: "Free & Open-Source Dubbing and Rythmo Band Studio",
      title: "The open studio for rythmo bands and dubbing.",
      subtitle:
        "DubInstante is a free and open-source post-production tool (EUPL-1.2). 100% offline, engineered in C++17 and Qt 6, zero accounts, zero cloud, and zero subscriptions.",
      downloadFor: "Download for",
      viewGithub: "Source code on GitHub",
      metaSpecs: "EUPL-1.2 · C++17 & Qt 6 · OpenGL rendering · Native FFmpeg · 100% Offline",
      whatIsRythmoTitle: "What is a rythmo band?",
      whatIsRythmoDesc:
        "It's the scrolling text band synchronized with video, used by voice actors in studios to match lip movements frame by frame.",
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
      fasterSpeed: "Increase speed",
      slowerSpeed: "Decrease speed",
      timecode: "Timecode",
      shortcutHint:
        "[Spacebar] to Play/Pause · [← / →] arrows for frame-by-frame scrubbing",
      prevFrame: "Previous frame (-1 frame)",
      nextFrame: "Next frame (+1 frame)",
      scrubLabel: "Timeline position in session",
      simDisclaimer:
        "Interactive web demonstration of the rythmo band principle. The DubInstante desktop application runs native GPU-accelerated rendering (OpenGL / Qt 6 Multimedia) with multi-track audio and heavy footage support.",
    },
    features: {
      eyebrow: "Core Capabilities",
      title: "What matters, zero fluff.",
      subtitle:
        "Each tool solves a real, practical challenge in dubbing workflows, from lip sync to master exports.",
      part1: "Part 01",
      part2: "Part 02",
      f1Title: "Dynamic Rythmo Band (1 to 4 tracks)",
      f1Desc:
        "Scroll synchronized text directly before voice actors. Each syllable arrives precisely at the sync bar with customizable studio fonts and colors.",
      f1Tag: "Lip synchronization",
      f2Title: "Direct Multi-track Recording (up to 4 mics)",
      f2Desc:
        "Simultaneous capture of up to 4 microphones and tracks in uncompressed WAV. Independent audio input routing, gain calibration, and visual styling per track.",
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
        "Professional dubbing tools shouldn't be locked behind multi-thousand dollar licenses, hardware dongles, or vendor lock-in subscriptions. DubInstante is free software under the EUPL-1.2 license: use it, inspect it, adapt it, and share it freely under European copyleft terms.",
      desc2:
        "100% local-first. No internet required, no sign-up, zero telemetry. Your projects, voices, and video footage never leave your hard drive.",
      licensePill: "EUPL-1.2 Licensed",
      gplDesc:
        "The code belongs to the community. No restrictive patents, zero features locked behind paywalls.",
      localPill: "100% Local-First",
      localDesc:
        "Runs completely offline. Your raw footage and voice takes stay on your local disk.",
      noCloudPill: "Zero Telemetry",
      noCloudDesc:
        "Zero trackers, zero cookies, zero background telemetry. Absolute privacy respected.",
      contributeBtn: "Contribute on GitHub",
      issuesBtn: "Report an Issue",
      roadmapBtn: "Roadmap",
    },
    download: {
      eyebrow: "Downloads",
      title: "Download DubInstante.",
      subtitle:
        "Freely available for macOS, Windows, and Linux (Debian, Arch). No credit card, no registration.",
      yourOs: "Your OS",
      fileLabel: "File:",
      installNotes: "Installation notes:",
      btnDownload: "Download",
      allReleases: "All releases and binaries on GitHub Releases",
      sourceCode: "Source code repository",
      gatekeeperNote: "macOS: Unzip the archive, then Right-click > Open if Gatekeeper asks for confirmation on first launch.",
      smartScreenNote: "Windows: Unzip the archive. If SmartScreen pops up at launch, click 'More info' then 'Run anyway'.",
      linuxNote: "Linux: Unzip the archive, make the binary executable (chmod +x), and launch directly.",
      androidTitle: "Android — on hold",
      androidDesc:
        "The Android port is currently on hold. A limited test build — the core of the software only (rythmo band and recording), without the other studio features — remains available on GitHub. A near-complete tablet version is planned for v0.13.",
      androidLink: "See the test build on GitHub",
    },
    footer: {
      brandDesc:
        "DubInstante is a free and open-source video dubbing and rythmo band studio. Built with craft for actors, adapters, and independent creators.",
      license: "EUPL-1.2 Free Software · All data remains on your machine.",
      ecosystem: "LOINSTANTE Ecosystem",
      madeBy: "Open-source project created by LOINSTANTE",
      reportBug: "Report a bug",
      roadmap: "Roadmap",
      releases: "All versions",
    },
    why: {
      eyebrow: "Why DubInstante?",
      title: "The end of 4-figure licenses and tedious workarounds.",
      subtitle:
        "Between unreachable proprietary studio suites, abandoned 2000s freeware, and frustrating workarounds on Premiere or Audacity, dubbing lacked a modern open alternative. Here is why DubInstante changes the game.",
      tableEyebrow: "Comprehensive Matrix",
      tableTitle: "DubInstante vs. The Market.",
      tableSubtitle:
        "A transparent comparison of studio features, actual lifetime costs, and architectural philosophy.",
      sourcesNote:
        "Prices and features observed in September 2026 based on publicly available documentation.",
      wallEyebrow: "The Wall of Workaround Pain",
      wallTitle: "Do you recognize these struggles?",
      wallSubtitle:
        "Thousands of hours wasted every week by voice actors, sound students, and creators trying to hack non-dubbing software.",
      freedomEyebrow: "Independence & Longevity",
      freedomTitle: "Why Open-Source changes everything.",
      freedomSubtitle:
        "Your .dbi project files are 100% local (EUPL 1.2 license). Zero accounts, zero telemetry, zero forced subscriptions: your sessions belong to you forever.",
      ctaTitle: "Ready to ditch the workarounds?",
      ctaSubtitle:
        "Download DubInstante today on your operating system. Free, open-source, and ready in seconds.",
      ctaBtn: "Download DubInstante",
      ctaDocs: "Read Documentation",
    },
    notFound: {
      badge: "404 Error · Lost Signal",
      title: "Timecode not found.",
      subtitle: "The requested scene or track does not exist in this session. Check the URL or return to the main studio.",
      backHome: "Return to Homepage",
      downloadBtn: "Download DubInstante",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "fr";
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");
  if (langParam === "en" || langParam === "fr") {
    return langParam;
  }
  const saved = localStorage.getItem("dubinstante_lang") as Language;
  if (saved === "fr" || saved === "en") {
    return saved;
  }
  return navigator.language.startsWith("fr") ? "fr" : "en";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("dubinstante_lang", lang);
    document.documentElement.lang = lang;
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (lang === "en") {
        url.searchParams.set("lang", "en");
      } else {
        url.searchParams.delete("lang");
      }
      window.history.replaceState({}, "", url.toString());
    }
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

