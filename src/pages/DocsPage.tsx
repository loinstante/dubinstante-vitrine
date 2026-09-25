import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Halo, TimecodeWatermark } from '../components/ui/Primitives';
import { CURRENT_VERSION, GITHUB_REPO_URL } from '../config/downloads';
import { Play, MousePointerClick, Mic, Download, Keyboard } from 'lucide-react';

const QUICK_STEPS_FR = [
  { num: '1', icon: Play, title: 'Importez votre vidéo', desc: 'Cliquez sur « Ouvrir Vidéo ». MP4 et standards supportés. Fichiers 50 Go+ chargés sans latence.' },
  { num: '2', icon: MousePointerClick, title: 'Préparez la bande rythmo', desc: 'Saisissez votre texte directement sur la bande. Sync automatique avec l\'image. Cliquez pour naviguer.' },
  { num: '3', icon: Mic, title: 'Enregistrez les voix', desc: 'Sélectionnez vos micros, ajustez les gains, lancez l\'enregistrement. Jusqu\'à 4 pistes et micros simultanés avec paramètres et styles distincts.' },
  { num: '4', icon: Download, title: 'Exportez votre projet', desc: 'L\'export fusionne vidéo + audio via FFmpeg en préservant la qualité source. Sauvegarde .dbi pour retravailler.' },
];

const QUICK_STEPS_EN = [
  { num: '1', icon: Play, title: 'Import your video', desc: 'Click "Open Video". MP4 and broadcast formats supported. 50 GB+ raw video files scrub with zero latency.' },
  { num: '2', icon: MousePointerClick, title: 'Build the rythmo band', desc: 'Type dialogue syllables directly onto the timeline. Instant frame-sync. Click anywhere to jump timecodes.' },
  { num: '3', icon: Mic, title: 'Record vocal takes', desc: 'Select audio interface inputs, dial gain levels, and start recording. Up to 4 simultaneous broadcast tracks and discrete microphones with independent styling.' },
  { num: '4', icon: Download, title: 'Export finished mixes', desc: 'Mux audio and video tracks via lossless FFmpeg stream copy. Save portable .dbi session packages.' },
];

const FEATURES_FR = [
  { emoji: '🎬', title: 'Lecture Vidéo', items: [
    'Rendu OpenGL accéléré par GPU via Qt 6 Multimedia',
    'Navigation image par image avec timeline visuelle',
    'Sync temps réel audio/vidéo/bandes rythmo',
    'Vitesse de lecture ajustable (1% à 400%)',
  ]},
  { emoji: '📝', title: 'Système de Bande Rythmo', items: [
    'Jusqu\'à 4 bandes indépendantes pour les workflows complexes',
    'Édition directe avec aperçu en temps réel',
    'Styles visuels : Classique, Gradient moderne, Minimaliste, Contourné',
    'Navigation par clic : sautez au timecode instantanément',
  ]},
  { emoji: '🎙️', title: 'Enregistrement Multipiste (4 Micros)', items: [
    'Enregistrement simultané jusqu\'à 4 pistes vocales distinctes',
    'Sélection de micro physique indépendante par piste',
    'Paramètres distincts par piste : gain, monitoring et style d\'apparence',
    'Capture WAV 24-bit 48 kHz haute fidélité synchronisée au timecode',
  ]},
  { emoji: '📦', title: 'Export & Intégration', items: [
    'Intégration FFmpeg pour fusion vidéo/audio pro',
    'Export multipiste préservant la qualité originale',
    'Format .dbi compact, archives ZIP portables',
    'I/O asynchrone : sauvegardes sans bloquer l\'interface',
  ]},
];

const FEATURES_EN = [
  { emoji: '🎬', title: 'Video Playback Engine', items: [
    'GPU-accelerated OpenGL canvas via native Qt 6 Multimedia',
    'Frame-by-frame stepping with audio scrubbing and visual timeline',
    'Sub-frame clock sync between source audio, video and rythmo tracks',
    'Adjustable variable playback speed (1% to 400%) for delivery pacing',
  ]},
  { emoji: '📝', title: 'Rythmo Band Timeline', items: [
    'Up to 4 synchronized independent dialogue or cue tracks',
    'Direct in-place text entry with instantaneous scrolling preview',
    'Studio visual styles: Classic, Modern Gradient, Minimalist, Outlined',
    'Interactive click navigation: jump to any exact frame in milliseconds',
  ]},
  { emoji: '🎙️', title: 'Multi-Track Recording (4 Microphones)', items: [
    'Simultaneous capture of up to 4 discrete vocal tracks and microphones',
    'Discrete audio interface hardware input selection per track',
    'Independent track parameters: gain, monitoring, and visual appearance/styling',
    'Lossless 24-bit 48 kHz uncompressed WAV broadcast audio storage locked to timecode',
  ]},
  { emoji: '📦', title: 'Export & Studio Workflows', items: [
    'Embedded FFmpeg engine for lossless audio/video muxing',
    'Non-destructive pass-through preserving source bitrates and colorspaces',
    'Compact binary .dbi session files, portable ZIP package archives',
    'Asynchronous background saves preventing UI stutters',
  ]},
];

const SHORTCUTS_FR = [
  { key: 'Espace', action: 'Lecture / Pause' },
  { key: 'Ctrl + R', action: 'Démarrer l\'enregistrement micro' },
  { key: 'Échap', action: 'Arrêt de l\'enregistrement (ou espace sur la bande)' },
  { key: 'Ctrl + S', action: 'Sauvegarder le projet (.dbi)' },
  { key: '← →', action: 'Navigation image par image' },
  { key: 'Shift + ← →', action: 'Retour / Avance rapide (-5s / +5s)' },
];

const SHORTCUTS_EN = [
  { key: 'Space', action: 'Play / Pause playback' },
  { key: 'Ctrl + R', action: 'Start microphone recording' },
  { key: 'Escape', action: 'Stop recording (or insert space on band)' },
  { key: 'Ctrl + S', action: 'Save project session (.dbi)' },
  { key: '← →', action: 'Frame-by-frame step scrubbing' },
  { key: 'Shift + ← →', action: 'Quick seek backward / forward (-5s / +5s)' },
];

const WORKFLOW_FR = [
  'Charger Vidéo : cliquez sur « Ouvrir Vidéo ».',
  'Configurer les Pistes : assignez vos micros (jusqu\'à 4), réglez l\'apparence et le gain par piste.',
  'Éditer le Rythmo : tapez directement sur la bande. Défilement automatique.',
  'Enregistrer : cliquez REC, parlez en rythme, recliquez pour arrêter.',
  'Exporter : rendez la vidéo finale.',
];

const WORKFLOW_EN = [
  'Load Footage: Click "Open Video" to import reference cuts.',
  'Configure Audio: Assign studio microphones (up to 4), customize track appearance and calibrate preamp levels.',
  'Edit Rythmo: Type dialogue onto the scrolling track in sync with lip flaps.',
  'Record Takes: Click REC, deliver lines at the red cursor, click to finish.',
  'Export Master: Render synced dialogue mixes losslessly via FFmpeg.',
];

export const DocsPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  useDocumentTitle(isEn ? 'Documentation & User Guide' : 'Documentation & Guide Studio');

  const steps = isEn ? QUICK_STEPS_EN : QUICK_STEPS_FR;
  const features = isEn ? FEATURES_EN : FEATURES_FR;
  const shortcuts = isEn ? SHORTCUTS_EN : SHORTCUTS_FR;
  const workflow = isEn ? WORKFLOW_EN : WORKFLOW_FR;

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] opacity-40" />
      <TimecodeWatermark timecode="00:00:00:00" className="hidden md:block absolute top-28 right-8 text-5xl font-bold" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-16">
          <Eyebrow className="mb-3">Documentation</Eyebrow>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
            {isEn ? 'DubInstante User Guide.' : 'Documentation DubInstante.'}
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            {isEn
              ? `Professional ADR and dubbing workstation: native speed, intuitive timeline editing, and pristine audio capture. Current version: `
              : `Logiciel de doublage vidéo professionnel : puissant, intuitif et visuellement raffiné. Lire des vidéos, écrire sur la bande rythmo, enregistrer des pistes synchronisées, exporter le résultat. Version : `}
            <span className="font-mono text-accent">{CURRENT_VERSION}</span>.
          </p>
        </Reveal>

        {/* Quick start */}
        <Reveal as="h2" className="font-display font-bold text-2xl mt-16 mb-6 flex items-center gap-2">
          <span className="text-accent">🚀</span> {isEn ? 'Quick Start Guide' : 'Guide de démarrage rapide'}
        </Reveal>
        <Reveal className="text-[var(--text-secondary)] mb-8 text-sm">
          {isEn ? 'Dub your first scene in 4 easy steps.' : 'Doublez votre première vidéo en 4 étapes simples.'}
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 80} className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display font-bold text-2xl text-accent tabular-nums">{s.num}</span>
                  <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Icon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>

        {/* Features */}
        <Reveal as="h2" className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
          <span className="text-accent">✨</span> {isEn ? 'Core Workstation Modules' : 'Fonctionnalités principales'}
        </Reveal>
        <div className="space-y-4 mb-16">
          {features.map((f, i) => (
            <Reveal key={i} className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <span aria-hidden>{f.emoji}</span> {f.title}
              </h3>
              <ul className="space-y-2">
                {f.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="text-accent mt-0.5">▸</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Shortcuts */}
        <Reveal as="h2" className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
          <span className="text-accent"><Keyboard className="w-6 h-6" /></span>{' '}
          {isEn ? 'Keyboard Shortcuts & Controls' : 'Raccourcis clavier & utilisation'}
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {shortcuts.map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <kbd className="font-mono text-sm font-bold text-accent bg-accent/10 border border-accent/20 rounded px-2 py-1 mb-2 inline-block">
                {s.key}
              </kbd>
              <p className="text-sm text-[var(--text-secondary)]">{s.action}</p>
            </div>
          ))}
        </Reveal>

        {/* Workflow */}
        <Reveal as="h3" className="font-display font-bold text-lg text-[var(--text-primary)] mb-4">
          {isEn ? 'Session Workflow' : "Workflow d'enregistrement"}
        </Reveal>
        <Reveal className="relative pl-6 mb-16">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
          <ol className="space-y-4">
            {workflow.map((w, i) => (
              <li key={i} className="relative flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-[var(--bg-main)]" />
                <span>{w}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Architecture */}
        <Reveal as="h2" className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
          <span className="text-accent">🏗️</span> {isEn ? 'Architecture & Codecs' : 'Architecture & prérequis'}
        </Reveal>
        <Reveal className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            <span className="font-mono font-bold text-[var(--text-primary)]">
              {isEn ? 'Technical Stack: ' : 'Stack technique : '}
            </span>{' '}
            Qt 6.5+, FFmpeg, OpenGL.
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            {isEn ? 'MP4 Codecs on Linux (GStreamer):' : 'Codecs MP4 sur Linux (GStreamer) :'}
          </p>
          <pre className="font-mono text-xs bg-[var(--bg-sunk)] text-[var(--text-primary)] rounded-lg p-4 overflow-x-auto border border-[var(--border-subtle)]">{`sudo apt install gstreamer1.0-libav \\
  gstreamer1.0-plugins-good \\
  gstreamer1.0-plugins-bad \\
  gstreamer1.0-plugins-ugly`}</pre>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            {isEn ? 'View source code on GitHub →' : 'Voir le code source →'}
          </a>
        </Reveal>
      </div>
    </section>
  );
};
