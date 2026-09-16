import React from 'react';
import { Reveal, Eyebrow, Halo, TimecodeWatermark } from '../components/ui/Primitives';
import { CURRENT_VERSION, GITHUB_REPO_URL } from '../config/downloads';
import { Play, MousePointerClick, Mic, Download, Keyboard } from 'lucide-react';

const QUICK_STEPS = [
  { num: '1', icon: Play, title: 'Importez votre vidéo', desc: 'Cliquez sur « Ouvrir Vidéo ». MP4 et standards supportés. Fichiers 50 Go+ chargés sans latence.' },
  { num: '2', icon: MousePointerClick, title: 'Préparez la bande rythmo', desc: 'Saisissez votre texte directement sur la bande. Sync automatique avec l\'image. Cliquez pour naviguer.' },
  { num: '3', icon: Mic, title: 'Enregistrez les voix', desc: 'Sélectionnez votre micro, ajustez le gain, lancez l\'enregistrement. Jusqu\'à 2 pistes simultanées.' },
  { num: '4', icon: Download, title: 'Exportez votre projet', desc: 'L\'export fusionne vidéo + audio via FFmpeg en préservant la qualité source. Sauvegarde .dbi pour retravailler.' },
];

const FEATURES = [
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
  { emoji: '🎙️', title: 'Enregistrement Multipiste', items: [
    'Enregistrement simultané de 2 pistes vocales séparées',
    'Sélection de micro indépendante par piste',
    'Monitoring temps réel avec sliders visuels',
    'Capture WAV haute qualité avec gain configurable',
  ]},
  { emoji: '📦', title: 'Export & Intégration', items: [
    'Intégration FFmpeg pour fusion vidéo/audio pro',
    'Export multipiste préservant la qualité originale',
    'Format .dbi compact, archives ZIP portables',
    'I/O asynchrone : sauvegardes sans bloquer l\'interface',
  ]},
];

const SHORTCUTS = [
  { key: 'Espace', action: 'Lecture / Pause' },
  { key: 'Échap', action: 'Insère un espace sur la bande & lecture' },
  { key: '← →', action: 'Navigation image par image' },
];

const WORKFLOW = [
  'Charger Vidéo : cliquez sur « Ouvrir Vidéo ».',
  'Configurer les Pistes : sélectionnez le micro, ajustez le gain.',
  'Éditer le Rythmo : tapez directement sur la bande. Défilement automatique.',
  'Enregistrer : cliquez REC, parlez en rythme, recliquez pour arrêter.',
  'Exporter : rendez la vidéo finale.',
];

export const DocsPage: React.FC = () => (
  <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
    <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] opacity-40" />
    <TimecodeWatermark timecode="00:00:00:00" className="hidden md:block absolute top-28 right-8 text-5xl font-bold" />
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
      <Reveal className="max-w-2xl mb-16">
        <Eyebrow className="mb-3">Documentation</Eyebrow>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
          Documentation DubInstante.
        </h1>
        <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
          Logiciel de doublage vidéo professionnel : puissant, intuitif et visuellement
          raffiné. Lire des vidéos, écrire sur la bande rythmo, enregistrer des pistes
          synchronisées, exporter le résultat. Version :{' '}
          <span className="font-mono text-accent">{CURRENT_VERSION}</span>.
        </p>
      </Reveal>

      {/* Quick start */}
      <Reveal as="h2" className="font-display font-bold text-2xl mt-16 mb-6 flex items-center gap-2">
        <span className="text-accent">🚀</span> Guide de démarrage rapide
      </Reveal>
      <Reveal className="text-[var(--text-secondary)] mb-8 text-sm">
        Doublez votre première vidéo en 4 étapes simples.
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {QUICK_STEPS.map((s, i) => {
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
        <span className="text-accent">✨</span> Fonctionnalités principales
      </Reveal>
      <div className="space-y-4 mb-16">
        {FEATURES.map((f, i) => (
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
        <span className="text-accent"><Keyboard className="w-6 h-6" /></span> Raccourcis clavier & utilisation
      </Reveal>
      <Reveal className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {SHORTCUTS.map((s, i) => (
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
        Workflow d'enregistrement
      </Reveal>
      <Reveal className="relative pl-6 mb-16">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
        <ol className="space-y-4">
          {WORKFLOW.map((w, i) => (
            <li key={i} className="relative flex items-start gap-3 text-sm text-[var(--text-secondary)]">
              <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-[var(--bg-main)]" />
              <span>{w}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Architecture */}
      <Reveal as="h2" className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
        <span className="text-accent">🏗️</span> Architecture & prérequis
      </Reveal>
      <Reveal className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          <span className="font-mono font-bold text-[var(--text-primary)]">Stack technique :</span> Qt 6.5+, FFmpeg, OpenGL.
        </p>
        <p className="text-sm text-[var(--text-secondary)] mb-2">Codecs MP4 sur Linux (GStreamer) :</p>
        <pre className="font-mono text-xs bg-[var(--bg-sunk)] text-accent rounded-lg p-4 overflow-x-auto border border-[var(--border-subtle)]">{`sudo apt install gstreamer1.0-libav \\
  gstreamer1.0-plugins-good \\
  gstreamer1.0-plugins-bad \\
  gstreamer1.0-plugins-ugly`}</pre>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Voir le code source →
        </a>
      </Reveal>
    </div>
  </section>
);
