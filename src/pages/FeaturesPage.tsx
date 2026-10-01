import React, { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Spotlight } from '../components/ui/Primitives';
import { CURRENT_VERSION, GITHUB_REPO_URL } from '../config/downloads';
import { Link } from 'react-router-dom';
import { Download, Check, Cpu, Layers, Terminal } from 'lucide-react';

const FEATURES_FR = [
  {
    num: '01',
    title: 'Lecture vidéo ultra-fluide & OpenGL',
    items: [
      'Rendu accéléré GPU — Décodage direct Qt 6 Multimedia & shaders OpenGL, zéro saccade',
      'Navigation image par image — Précision chirurgicale (frame à frame) au millième de seconde',
      'Synchronisation temps réel — Audio, vidéo et bandes rythmo verrouillés sur la même horloge',
      'Contrôle de vitesse dynamique — De 1% à 400% pour la répétition et l\'analyse du débit',
      'Footage lourd — Support sans accroc des fichiers masters 4K de plus de 50 Go',
    ],
  },
  {
    num: '02',
    title: 'Bandes rythmo éditables (1 à 4 pistes)',
    items: [
      'Jusqu\'à 4 bandes dynamiques — Gérez plusieurs comédiens ou une piste de repères cues',
      'Édition directe en place — Saisie de texte avec prévisualisation immédiate sur la bande',
      'Personnalisation typographique — Polices studio, couleurs de texte et 4 styles visuels',
      'Navigation tactile & clic — Sautez instantanément au timecode en cliquant sur la bande',
      'Virtualisation de texte — Rendu fluide sans montée mémoire même sur un film entier de 3 heures',
    ],
  },
  {
    num: '03',
    title: 'Enregistrement multipiste (jusqu\'à 4 micros)',
    items: [
      'Capture simultanée 4 micros — Enregistrez jusqu\'à 4 pistes vocales distinctes en direct',
      'Paramètres indépendants par piste — Assignez un micro physique, un gain, un style visuel et une couleur d\'apparence propre à chaque piste',
      'Monitoring temps réel — Vumètres dB réactifs et sliders de gain ergonomiques par piste',
      'Qualité Broadcast WAV — Capture WAV non compressée prête pour le mixage pro',
      'Mode plein écran sans distraction — Immersion visuelle totale pour les comédiens au micro',
    ],
  },
  {
    num: '04',
    title: 'Export FFmpeg broadcast & sessions .dbi',
    items: [
      'Muxing FFmpeg sans perte — Fusionnez voix et vidéo sans réencodage destructeur (bitstream copy)',
      'Format conteneur .dbi — Fichiers de projet compacts, autonomes et 100% locaux',
      'Export d\'archives portables — Paquetez vos sessions en ZIP pour les partager au studio son',
      'I/O Asynchrone — Sauvegardes en tâche de fond qui ne bloquent jamais la lecture',
    ],
  },
];

const FEATURES_EN = [
  {
    num: '01',
    title: 'Buttery-smooth OpenGL video playback',
    items: [
      'GPU hardware acceleration — Qt 6 Multimedia & OpenGL shaders for zero dropped frames',
      'Frame-by-frame scrubbing — Surgical microsecond accuracy using keyboard arrow keys',
      'Real-time master clock lock — Audio, video, and rythmo bands tightly locked together',
      'Dynamic speed control — 1% to 400% for line practice and fast editorial review',
      'Heavy master footage — Seamless scrubbing of 50 GB+ raw 4K video files',
    ],
  },
  {
    num: '02',
    title: 'Dynamic editable rythmo bands (1 to 4 tracks)',
    items: [
      'Up to 4 parallel tracks — Direct multiple dialogue tracks or sync cue points',
      'Direct in-place typing — Enter text with immediate preview straight on the moving band',
      'Complete studio typography — Fonts, colors, and 4 high-contrast pro visual themes',
      'Click-to-scrub navigation — Jump directly to any timecode with a single click',
      'Virtualized text rendering — Smooth 60 FPS scrolling even on 3-hour feature films',
    ],
  },
  {
    num: '03',
    title: 'Direct multi-track recording (up to 4 microphones)',
    items: [
      'Simultaneous 4-mic capture — Record up to 4 distinct vocal takes simultaneously',
      'Independent track parameters — Assign dedicated physical microphones, volume, and visual styling/colors per track',
      'Live visual monitoring — Real-time reactive dB meters and studio gain sliders per track',
      'Broadcast WAV fidelity — Uncompressed WAV capture ready for final mixing',
      'Distraction-free fullscreen — Total visual immersion for the voice talents at the mic',
    ],
  },
  {
    num: '04',
    title: 'Lossless FFmpeg exports & .dbi containers',
    items: [
      'Lossless stream muxing — Merge voice tracks and master video with zero re-encoding loss',
      'Compact .dbi format — Self-contained, lightweight binary project files',
      'Portable ZIP archives — Package entire sessions to share with audio post-production',
      'Asynchronous I/O — Background disk saves that never freeze or interrupt playback',
    ],
  },
];

const STACK_FR = [
  { name: 'C++ 17', role: 'Vitesse & Zéro latence', desc: 'Gestion mémoire directe pour une synchronisation audio/vidéo chirurgicale.' },
  { name: 'Qt 6.5+', role: 'Interface native multi-OS', desc: 'Widgets natifs et Qt Multimedia pour une réactivité maximale sous Windows, macOS et Linux.' },
  { name: 'OpenGL', role: 'Rendu GPU 60 FPS', desc: 'Fluidité totale du défilement des bandes sans charge excessive sur le processeur.' },
  { name: 'FFmpeg', role: 'Moteur de décodage & export', desc: 'Compatibilité avec tous les conteneurs vidéo pro (MP4, ProRes, MKV, MOV, H.264, H.265).' },
  { name: 'I/O Asynchrone', role: 'Tâches de fond non bloquantes', desc: 'Continuez de jouer et de caler vos répliques pendant que vos projets s\'exportent.' },
];

const STACK_EN = [
  { name: 'C++ 17', role: 'Speed & Microsecond Precision', desc: 'Manual memory management for surgical audio/video lock and zero playback stutter.' },
  { name: 'Qt 6.5+', role: 'Native Cross-Platform UI', desc: 'Native OS widgets and Qt Multimedia for instant responsiveness across macOS, Windows, and Linux.' },
  { name: 'OpenGL', role: 'GPU-Accelerated 60 FPS', desc: 'Buttery-smooth rythmo scrolling without overloading your CPU.' },
  { name: 'FFmpeg', role: 'Decoding & Lossless Muxing', desc: 'Universal support for pro video formats (MP4, ProRes, MKV, MOV, H.264, H.265).' },
  { name: 'Async I/O', role: 'Non-Blocking Background I/O', desc: 'Keep scrubbing and editing seamlessly while sessions export in the background.' },
];

const MODULES_FR = [
  'Moteur de Lecture — Décodage optimisé Qt 6 Multimedia pour une synchronisation millimétrique',
  'Canvas OpenGL — Rendu accéléré par la carte graphique, même en défilement rapide image par image (← / →)',
  'Virtualisation Rythmo — Gestion de dizaines de milliers de syllabes sans pic mémoire ni ralentissement',
  'Moteur Audio Multipiste — Prise de son WAV non compressée à faible latence depuis vos interfaces audio studio',
  'Pipeline d\'Export FFmpeg — Copie de flux direct (bitstream pass-through) sans perte de qualité',
  'Format Local .dbi — Conteneur de projet binaire autonome intégrant la compression ZIP',
];

const MODULES_EN = [
  'Playback Engine — Qt 6 multimedia decoding for microsecond audio-video frame locking',
  'Hardware Accelerated Canvas — Smooth OpenGL rendering even during fast frame scrubbing (← / →)',
  'Rythmo Band Virtualization — Render tens of thousands of syllables with zero memory spikes',
  'Multi-track Audio Engine — Low-latency uncompressed WAV capture straight from studio audio interfaces',
  'Export Pipeline — Fast FFmpeg pass-through multiplexing (bitstream copy without re-encoding loss)',
  'Local Container Format — Self-contained .dbi binary projects with built-in ZIP compression',
];

const PLATFORMS_FR = [
  { os: 'Windows 10 / 11', detail: 'Archive ZIP portable (.zip), exécutable DubInstante, FFmpeg inclus' },
  { os: 'macOS (Intel & Apple Silicon)', detail: 'Archive ZIP (.zip) avec application autonome native' },
  { os: 'Linux (Debian & Arch)', detail: 'Archive ZIP (.zip) avec binaire natif, portable et immédiat' },
  { os: 'Android (en pause)', detail: 'Version test limitée (bande rythmo & enregistrement) disponible sur GitHub' },
];

const PLATFORMS_EN = [
  { os: 'Windows 10 / 11', detail: 'Portable ZIP package (.zip), DubInstante binary, FFmpeg included' },
  { os: 'macOS (Intel & Apple Silicon)', detail: 'ZIP archive (.zip) with standalone native application' },
  { os: 'Linux (Debian & Arch)', detail: 'ZIP archive (.zip) with native standalone binary' },
  { os: 'Android (on hold)', detail: 'Limited test build (rythmo band & recording) available on GitHub' },
];

const PREREQ_FR = [
  { os: 'Windows', items: ['Windows 10 ou 11 (64-bit)', 'FFmpeg (embarqué automatiquement)'] },
  { os: 'macOS', items: ['macOS 12+ Monterey ou ultérieur', 'Architecture Apple Silicon ou Intel'] },
  { os: 'Linux', items: ['Debian 11+, Ubuntu 20.04+, Mint (glibc 2.31+)', 'Arch, Manjaro, Fedora (glibc récente)'] },
  { os: 'Android', items: ['Android 9+ (API 28)', 'Portage en pause — version test sur GitHub'] },
];

const PREREQ_EN = [
  { os: 'Windows', items: ['Windows 10 or 11 (64-bit)', 'FFmpeg (pre-bundled in package)'] },
  { os: 'macOS', items: ['macOS 12+ Monterey or newer', 'Apple Silicon and Intel architectures'] },
  { os: 'Linux', items: ['Debian 11+, Ubuntu 20.04+, Mint (glibc 2.31+)', 'Arch, Manjaro, Fedora (recent glibc)'] },
  { os: 'Android', items: ['Android 9+ (API 28)', 'Port on hold — test build on GitHub'] },
];

export const FeaturesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  useDocumentTitle(isEn ? 'Features & Engine' : 'Fonctionnalités & Moteur');

  const [activeTab, setActiveTab] = useState<'workflow' | 'engine'>('workflow');

  const features = isEn ? FEATURES_EN : FEATURES_FR;
  const stack = isEn ? STACK_EN : STACK_FR;
  const modules = isEn ? MODULES_EN : MODULES_FR;
  const platforms = isEn ? PLATFORMS_EN : PLATFORMS_FR;
  const prereq = isEn ? PREREQ_EN : PREREQ_FR;

  const scrollTo = (id: string, tab: 'workflow' | 'engine') => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Spotlight className="top-[-8rem] left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] opacity-50" />
      <span id="tech" className="sr-only" aria-hidden />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <Reveal className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-glow-pulse" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <Eyebrow className="text-accent">
              {CURRENT_VERSION} {isEn ? '(Public Beta)' : '(Bêta Publique)'}
            </Eyebrow>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tightest text-balance text-[var(--text-primary)]">
            {isEn ? 'Complete Dubbing Studio. Interface & Native Engine.' : 'Le studio complet de doublage. Interface & Moteur.'}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {isEn
              ? 'From frame-by-frame lip sync to the low-latency C++17 and OpenGL engine under the hood. Here is everything DubInstante is capable of.'
              : 'De la synchronisation labiale image par image jusqu\'au moteur C++17 et OpenGL sous le capot. Découvrez toutes les capacités de DubInstante.'}
          </p>
        </Reveal>

        {/* Section Navigation Tabs */}
        <Reveal className="sticky top-20 z-30 mb-14 py-2 backdrop-blur-md bg-[var(--bg-main)]/80 border-y border-[var(--border-subtle)]">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => scrollTo('workflow', 'workflow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'workflow'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isEn ? '01. Studio Workflow' : '01. Flux de travail Studio'}</span>
            </button>
            <button
              onClick={() => scrollTo('engine', 'engine')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'engine'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{isEn ? '02. C++ Native Engine' : '02. Moteur natif C++'}</span>
            </button>
          </div>
        </Reveal>

        {/* SECTION 1: WORKFLOW FEATURES */}
        <div id="workflow" className="space-y-16 pt-4 scroll-mt-28">
          <div className="border-b border-[var(--border-subtle)] pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">{t.features.part1}</span>
            <h2 className="mt-1 font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              {isEn ? 'Studio Features & Recording Workflow' : 'Fonctionnalités Studio & Prise de Son'}
            </h2>
          </div>

          {features.map((f, i) => (
            <Reveal key={i} delay={i * 80} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm font-bold text-accent tabular-nums">{f.num}</span>
                <span className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[var(--text-primary)] mb-5">
                {f.title}
              </h3>
              <div className="p-6 md:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover">
                <ul className="space-y-3">
                  {f.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* SECTION 2: C++ NATIVE ENGINE & ARCHITECTURE */}
        <div id="engine" className="mt-28 space-y-14 pt-10 border-t border-[var(--border-subtle)] scroll-mt-28">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">{t.features.part2}</span>
            <h2 className="mt-1 font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              {isEn ? 'Under the Hood: Architecture & C++ Performance' : 'Sous le Capot : Architecture & Moteur C++'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {isEn
                ? 'DubInstante avoids heavy Electron web wrappers. Everything is compiled natively with C++17, Qt 6, FFmpeg, and OpenGL to guarantee microsecond synchronization.'
                : 'DubInstante refuse les surcouches web lourdes type Electron. Tout est compilé nativement en C++17, Qt 6, FFmpeg et OpenGL pour garantir une synchronisation à la microseconde.'}
            </p>
          </div>

          {/* Technology Stack Grid */}
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" />
              <span>{isEn ? 'Core Technology Stack' : 'Stack technologique native'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stack.map((s, i) => (
                <Reveal key={i} delay={i * 60} className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-lg text-accent">{s.name}</h4>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-sunk)] px-2 py-0.5 rounded">
                      {s.role}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Engine Modules */}
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-accent" />
              <span>{isEn ? 'Engine Modules & Real-time Optimization' : 'Modules de performance du moteur'}</span>
            </h3>
            <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <ul className="space-y-3.5">
                {modules.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operating Systems & System Requirements */}
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-6">
              {isEn ? 'Operating Systems & System Requirements' : 'Systèmes d\'exploitation & Prérequis'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {prereq.map((p, i) => {
                const plat = platforms[i];
                return (
                  <Reveal key={i} delay={i * 60} className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-1">{p.os}</h4>
                      {plat && <p className="text-xs font-mono text-accent mb-3">{plat.detail}</p>}
                      <ul className="space-y-1.5 border-t border-[var(--border-subtle)] pt-3">
                        {p.items.map((it, j) => (
                          <li key={j} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                            <span className="text-accent">·</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Build from Source */}
          <div className="p-6 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-accent" />
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                {isEn ? 'Build from Source (Linux / Debian / Ubuntu)' : 'Compilation depuis les sources (Linux)'}
              </h3>
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
              {isEn ? 'CMake & GCC/Clang build pipeline:' : 'Pipeline de compilation CMake & Qt 6 :'}
            </p>
            <pre className="font-mono text-xs bg-[var(--bg-sunk)] text-[var(--text-primary)] rounded-lg p-4 overflow-x-auto border border-[var(--border-subtle)]">{`sudo apt install qt6-multimedia-dev libqt6opengl6-dev ffmpeg
sudo apt install gstreamer1.0-libav gstreamer1.0-plugins-good gstreamer1.0-plugins-bad
mkdir build && cd build
cmake .. && make -j$(nproc)
./DubInstante`}</pre>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              {isEn ? 'View complete source code on GitHub →' : 'Explorer le code source sur GitHub →'}
            </a>
          </div>
        </div>

        {/* Global CTA */}
        <Reveal className="mt-20 text-center pt-10 border-t border-[var(--border-subtle)]">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-3">
            {isEn ? 'Ready to experience true studio performance?' : 'Prêt à tester la fluidité native ?'}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-7">
            {isEn
              ? 'Download DubInstante today. Free forever, open-source, and fully local.'
              : 'Téléchargez DubInstante dès aujourd\'hui. 100% libre, gratuit et sans compte.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/download"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-[0_0_30px_-8px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_-6px_rgba(229,9,20,0.7)] hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>{isEn ? `Download ${CURRENT_VERSION} (Beta)` : `Télécharger ${CURRENT_VERSION} (Bêta)`}</span>
            </Link>
            <Link
              to="/pourquoi"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-sunk)] border border-[var(--border-strong)] rounded-xl transition-colors"
            >
              <span>{isEn ? 'Why DubInstante? (Comparison)' : 'Pourquoi DubInstante ? (Comparatif)'}</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
