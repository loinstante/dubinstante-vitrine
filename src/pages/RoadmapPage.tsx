import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Halo } from '../components/ui/Primitives';
import { Check, Circle } from 'lucide-react';
import { CURRENT_VERSION } from '../config/downloads';

interface Item {
  text: string;
  done: boolean;
}

const d = (text: string): Item => ({ text, done: true });
const todo = (text: string): Item => ({ text, done: false });

const PHASES_FR = [
  {
    phase: 'v0.1 – v0.3',
    date: 'Jan – fév. 2026',
    status: 'done',
    title: 'Les fondations',
    items: [
      d('Lecteur vidéo, bande rythmo et enregistrement audio multipiste'),
      d('Défilement 60 FPS avec accrochage à la grille et durée par caractère'),
      d('Thèmes néon bleu puis clair professionnel'),
      d('Séparation du cœur métier et de l’interface'),
      d('Compilations automatiques Windows et Linux (AppImage)'),
    ],
  },
  {
    phase: 'v0.4',
    date: 'Fév. 2026',
    status: 'done',
    title: 'Projets et macOS',
    items: [
      d('Format de projet .dbi avec contrôle d’intégrité SHA-256'),
      d('Sauvegarde asynchrone et archives .zip portables (vidéo incluse)'),
      d('Version macOS autonome, signature ad hoc et correctifs Gatekeeper'),
    ],
  },
  {
    phase: 'v0.5',
    date: 'Fév. 2026',
    status: 'done',
    title: 'Enregistrer en plein écran',
    items: [
      d('Mode d’enregistrement plein écran, bande rythmo collée en bas'),
      d('Raccourci d’arrêt et fenêtre d’aide des raccourcis'),
    ],
  },
  {
    phase: 'v0.6',
    date: 'Fév. 2026',
    status: 'done',
    title: 'Premier test Android',
    items: [
      d('Prototype de découverte de la plateforme : bande rythmo, enregistrement, export FFmpeg'),
      d('Un test rapide inspiré du logiciel, pas la future application tablette'),
    ],
  },
  {
    phase: 'v0.7 – v0.9',
    date: 'Mars 2026',
    status: 'done',
    title: 'Menus et personnalisation',
    items: [
      d('Barre de menus : fichier, application, bande rythmo'),
      d('Style par piste : police, couleurs, taille, avec aperçu en direct'),
      d('6 préréglages : Classique, Sombre, Bleu, Rouge, Vert, Jaune'),
    ],
  },
  {
    phase: 'v0.10',
    date: 'Mars 2026',
    status: 'done',
    title: 'Plusieurs bandes rythmo',
    items: [
      d('Jusqu’à 4 bandes rythmo simultanées, avec compteur dans le menu'),
      d('Export audio sur N canaux mixés avec la vidéo'),
    ],
  },
  {
    phase: 'v0.11',
    date: 'Mars – juil. 2026',
    status: 'done',
    title: 'Refonte UI majeure',
    items: [
      d('Nouvelle interface studio'),
      d('Simulateur rythmo refait'),
      d('Base du moteur OpenGL'),
      d('Correctif du plantage sur Arch Linux : un AppImage Debian et un AppImage Arch'),
    ],
  },
  {
    phase: 'v0.12.0',
    date: 'Juil. 2026',
    status: 'done',
    title: 'Stabilisation bêta',
    items: [
      d('Réglages globaux, vumètre audio, boîte d’export avec mode expert et profils de sortie'),
      d('Armement des pistes, indicateurs d’enregistrement, raccourcis configurables'),
      d('Sauvegarde atomique des projets et récupération après plantage'),
      d('Export corrigé : plages, volumes, punch-in, annulation propre'),
      d('Synchro rythmo exacte et portable d’une machine à l’autre'),
      d('Archives .zip rouvrables, FFmpeg inclus dans chaque paquet'),
    ],
  },
  {
    phase: 'v0.13',
    date: 'Sept. – oct. 2026',
    status: 'active',
    title: 'Prises multiples et retour d’Android',
    items: [
      d('Prises multiples par piste, sans jamais écraser la précédente'),
      d('Comping : timeline des prises, coupes, punch-in et pré-roll'),
      d('Export fidèle au comping, compatible avec la limite de commande de Windows'),
      d('Annuler / Rétablir, raccourcis configurables'),
      d('Interface en 10 langues dont l’arabe (droite à gauche) ; 8 traductions automatiques en attente de relecture'),
      d('Nouveau thème clair et sombre, contrastes revus pour l’accessibilité'),
      d('Corrections : pause pendant une prise, export ou ouverture pendant un enregistrement'),
      todo('Application Android réécrite de zéro pour la tablette, avec environ 95 % des fonctions du studio (hors multi-micro, non fiable sur Android)'),
    ],
  },
  {
    phase: 'v1.0',
    date: '',
    status: 'next',
    title: 'Release finale',
    items: [todo('Documentation complète'), todo('Notarisation macOS'), todo('Stabilisation API')],
  },
];

const PHASES_EN = [
  {
    phase: 'v0.1 – v0.3',
    date: 'Jan – Feb 2026',
    status: 'done',
    title: 'Foundations',
    items: [
      d('Video player, rythmo band and multi-track audio recording'),
      d('60 FPS scrolling with snap-to-grid and per-character duration'),
      d('Neon blue then professional light themes'),
      d('Core logic split from the interface'),
      d('Automated Windows and Linux (AppImage) builds'),
    ],
  },
  {
    phase: 'v0.4',
    date: 'Feb 2026',
    status: 'done',
    title: 'Projects & macOS',
    items: [
      d('.dbi project format with SHA-256 integrity checks'),
      d('Async saving and portable .zip archives (video included)'),
      d('Standalone macOS build, ad-hoc signing and Gatekeeper fixes'),
    ],
  },
  {
    phase: 'v0.5',
    date: 'Feb 2026',
    status: 'done',
    title: 'Fullscreen Recording',
    items: [
      d('Fullscreen recording mode, rythmo band pinned to the bottom'),
      d('Stop-recording shortcut and a shortcuts help popup'),
    ],
  },
  {
    phase: 'v0.6',
    date: 'Feb 2026',
    status: 'done',
    title: 'First Android Experiment',
    items: [
      d('Discovery prototype: rythmo band, recording, FFmpeg export'),
      d('A quick take on the desktop app, not the upcoming tablet application'),
    ],
  },
  {
    phase: 'v0.7 – v0.9',
    date: 'Mar 2026',
    status: 'done',
    title: 'Menus & Customization',
    items: [
      d('Menu bar: file, application, rythmo band'),
      d('Per-track style: font, colors, size, with live preview'),
      d('6 presets: Classic, Dark, Blue, Red, Green, Yellow'),
    ],
  },
  {
    phase: 'v0.10',
    date: 'Mar 2026',
    status: 'done',
    title: 'Multiple Rythmo Bands',
    items: [
      d('Up to 4 simultaneous rythmo bands, with a counter in the menu'),
      d('N-channel audio export mixed with the video'),
    ],
  },
  {
    phase: 'v0.11',
    date: 'Mar – Jul 2026',
    status: 'done',
    title: 'Major Studio UI Redesign',
    items: [
      d('New native studio interface'),
      d('Enhanced 60 FPS rythmo band simulator'),
      d('OpenGL hardware rendering foundation'),
      d('Arch Linux crash fix: separate Debian and Arch AppImages'),
    ],
  },
  {
    phase: 'v0.12.0',
    date: 'Jul 2026',
    status: 'done',
    title: 'Beta Stabilization',
    items: [
      d('Global settings, audio meter, export dialog with expert mode and output profiles'),
      d('Track arming, recording indicators, configurable shortcuts'),
      d('Atomic project saves and crash recovery'),
      d('Export fixes: time ranges, volumes, punch-in, clean cancel'),
      d('Exact rythmo sync, portable across machines'),
      d('Reopenable .zip archives, FFmpeg bundled in every package'),
    ],
  },
  {
    phase: 'v0.13',
    date: 'Sep – Oct 2026',
    status: 'active',
    title: 'Multiple Takes & Android’s Return',
    items: [
      d('Multiple takes per track, never overwriting the previous one'),
      d('Comping: take timeline, cuts, punch-in and pre-roll'),
      d('Export that follows the comp, within the Windows command-line limit'),
      d('Undo / Redo, configurable shortcuts'),
      d('Interface in 10 languages including right-to-left Arabic; 8 machine translations awaiting native review'),
      d('New light and dark theme, contrast reworked for accessibility'),
      d('Fixes: pausing during a take, exporting or opening while recording'),
      todo('Android app rebuilt from scratch for tablets, with about 95% of the studio features (minus multi-microphone, unreliable on Android)'),
    ],
  },
  {
    phase: 'v1.0',
    date: '',
    status: 'next',
    title: 'General Availability (v1.0)',
    items: [todo('Comprehensive studio user guides'), todo('Apple Silicon & Windows notarized builds'), todo('Session format stability guarantee')],
  },
];

export const RoadmapPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const phases = isEn ? PHASES_EN : PHASES_FR;

  const getStatusLabel = (status: string) => {
    if (status === 'done') return isEn ? 'Completed' : 'Fait';
    if (status === 'active') return isEn ? 'In Progress' : 'En cours';
    return isEn ? 'Upcoming' : 'À venir';
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] opacity-40" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl mb-14">
          <Eyebrow className="mb-3">{isEn ? 'Roadmap' : 'Feuille de route'}</Eyebrow>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
            {isEn ? 'DubInstante roadmap: on the road to v1.0.' : 'Feuille de route de DubInstante : en route vers la v1.0.'}
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            {isEn ? 'Current version: ' : 'Version courante : '}{' '}
            <span className="font-mono text-accent">{CURRENT_VERSION}</span>.{' '}
            {isEn
              ? 'Active open-source development, public beta available for testing.'
              : 'Développement actif, bêta publique ouverte.'}
          </p>
        </Reveal>

        <div className="relative pl-6">
          {/* vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
          <div className="space-y-10">
            {phases.map((p, i) => (
              <Reveal key={i} delay={i * 100} className="relative">
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--bg-main)] bg-accent" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-bold text-accent tabular-nums">
                    {p.phase}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      p.status === 'done'
                        ? 'text-audio-green bg-audio-green/10'
                        : p.status === 'active'
                        ? 'text-rec bg-rec/10'
                        : 'text-[var(--text-muted)] bg-[var(--bg-surface)]'
                    }`}
                  >
                    {getStatusLabel(p.status)}
                  </span>
                  {p.date && (
                    <span className="text-xs font-mono text-[var(--text-muted)]">{p.date}</span>
                  )}
                </div>
                <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                  {p.title}
                </h2>
                <ul className="space-y-2">
                  {p.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      {it.done ? (
                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 shrink-0" />
                      )}
                      <span>{it.text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
