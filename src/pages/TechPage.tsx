import React from 'react';
import { Reveal, Eyebrow, Halo } from '../components/ui/Primitives';
import { GITHUB_REPO_URL } from '../config/downloads';
import { Check } from 'lucide-react';

const STACK = [
  { name: 'C++ 17', role: 'Rapidité & Stabilité', desc: 'Pour une interface sans aucun décalage audio/vidéo.' },
  { name: 'Qt 6.5+', role: 'Interface fluide', desc: 'Multimedia & Widgets natifs pour une réactivité maximale.' },
  { name: 'OpenGL', role: 'Rendu vidéo GPU', desc: 'Fluidité parfaite même sur les fichiers 4K volumineux.' },
  { name: 'FFmpeg', role: 'Export pro & Mixage', desc: 'Fusionnez vos pistes sans perte de qualité originale.' },
  { name: 'I/O Asynchrone', role: 'Sauvegarde en tâche de fond', desc: 'Continuez de travailler même pendant l\'export.' },
];

const MODULES = [
  'Moteur de Lecture — Décodage optimisé Qt 6 pour une synchronisation parfaite',
  'Rendu Accéléré — Affichage OpenGL fluide, même en navigation rapide (←→)',
  'Bandes de Rythmo — Texte virtualisé pour éviter tout ralentissement sur longs scripts',
  'Mixage Multipiste — Capture audio multipiste avec faible latence',
  'Gestionnaire d\'Export — Fusion rapide via FFmpeg (bitstream copy si possible)',
  'Stockage Sécurisé — Projets .dbi compacts avec compression ZIP intégrée',
];

const PLATFORMS = [
  { os: 'Windows 10/11', detail: 'Binaire autonome (.exe), FFmpeg inclus' },
  { os: 'Linux', detail: 'AppImage universel (x86_64)' },
  { os: 'macOS', detail: 'Bundle .app (.dmg)' },
  { os: 'Android (beta)', detail: 'APK natif, core C++ via JNI' },
];

const PREREQ = [
  { os: 'Windows', items: ['Windows 10 ou supérieur', 'FFmpeg (inclus dans l\'archive)'] },
  { os: 'Linux', items: ['Qt 6.5+', 'FFmpeg', 'GStreamer codecs'] },
  { os: 'macOS', items: ['macOS 12+', 'FFmpeg (Homebrew)'] },
  { os: 'Android', items: ['Android 9+ (API 28)', 'Beta — bugs attendus'] },
];

export const TechPage: React.FC = () => (
  <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
    <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-40" />
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
      <Reveal className="max-w-2xl mb-16">
        <Eyebrow className="mb-3">Architecture</Eyebrow>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
          Pensé pour la performance.
        </h1>
        <p className="mt-4 font-mono text-sm text-accent">C++, Qt 6, FFmpeg.</p>
        <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
          DubInstante mise sur des technologies de pointe pour garantir une fluidité totale.
          Chaque choix technique est fait pour le confort de l'utilisateur : rapidité du rendu,
          précision chirurgicale et export sans latence.
        </p>
      </Reveal>

      {/* Stack */}
      <Reveal as="h2" className="font-display font-bold text-2xl mb-6">Stack technique</Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {STACK.map((s, i) => (
          <Reveal key={i} delay={i * 80} className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover">
            <h3 className="font-display font-bold text-lg text-accent mb-1">{s.name}</h3>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">{s.role}</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
          </Reveal>
        ))}
      </div>

      {/* Modules */}
      <Reveal as="h2" className="font-display font-bold text-2xl mb-6">Efficacité — Modules de performance</Reveal>
      <Reveal className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-16">
        <ul className="space-y-3">
          {MODULES.map((m, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
              <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Platforms */}
      <Reveal as="h2" className="font-display font-bold text-2xl mb-6">Plateformes — Support multi-OS</Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
        {PLATFORMS.map((p, i) => (
          <Reveal key={i} delay={i * 80} className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-1">{p.os}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{p.detail}</p>
          </Reveal>
        ))}
      </div>

      {/* Prerequisites */}
      <Reveal as="h2" className="font-display font-bold text-2xl mb-6">Prérequis système</Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
        {PREREQ.map((p, i) => (
          <Reveal key={i} delay={i * 80} className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <h3 className="font-display font-bold text-sm text-accent mb-3">{p.os}</h3>
            <ul className="space-y-2">
              {p.items.map((it, j) => (
                <li key={j} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                  <span className="text-accent">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Build from source */}
      <Reveal as="h2" className="font-display font-bold text-2xl mb-6">Compilation depuis les sources</Reveal>
      <Reveal className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <p className="font-mono text-xs text-[var(--text-muted)] mb-3">Linux (Debian/Ubuntu) :</p>
        <pre className="font-mono text-xs bg-[var(--bg-sunk)] text-accent rounded-lg p-4 overflow-x-auto border border-[var(--border-subtle)]">{`sudo apt install qt6-multimedia-dev \\
  libqt6opengl6-dev ffmpeg
sudo apt install gstreamer1.0-libav \\
  gstreamer1.0-plugins-good \\
  gstreamer1.0-plugins-bad
mkdir build && cd build
cmake .. && make -j$(nproc)
./DubInstante`}</pre>
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
