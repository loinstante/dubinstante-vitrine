import React from 'react';
import { Reveal, Halo } from '../components/ui/Primitives';
import { CURRENT_VERSION } from '../config/downloads';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

const FEATURES = [
  {
    num: '01', title: 'Lecture vidéo ultra-fluide', items: [
      'Rendu OpenGL — Accélération GPU via Qt 6 Multimedia, lecture sans saccades',
      'Navigation image par image — Précision chirurgicale (frame à frame) sur les flèches',
      'Synchronisation temps réel — Audio, vidéo et bandes rythmo parfaitement alignés',
      'Contrôle de vitesse — De 1% à 400% pour la révision et la pratique du débit',
      'Fichiers volumineux — Support des vidéos jusqu\'à 50 Go+ sans latence matérielle',
    ],
  },
  {
    num: '02', title: 'Bandes rythmo éditables', items: [
      'Jusqu\'à 4 bandes dynamiques — Gérez plusieurs dialogues ou une bande de repères',
      'Édition directe — Saisie de texte avec aperçu instantané sur la bande défilante',
      'Personnalisation complète — Polices, couleurs et 4 styles visuels pro',
      'Navigation par clic — Sautez instantanément au timecode en cliquant sur la bande',
      'Rendu virtualisé — Aucun ralentissement, même sur des projets de plusieurs heures',
    ],
  },
  {
    num: '03', title: 'Enregistrement multipiste', items: [
      'Capture simultanée — Enregistrez jusqu\'à 2 pistes vocales en même temps',
      'Micro indépendant — Assignez un périphérique différent par piste',
      'Monitoring visuel — Contrôle du gain en temps réel via sliders réactifs',
      'Qualité WAV — Capture haute fidélité pour une post-production sans compromis',
      'Mode plein écran — Doublez sans aucune distraction avec immersion totale',
    ],
  },
  {
    num: '04', title: 'Export & Projet pro', items: [
      'Fusion FFmpeg — Export vidéo/audio professionnel avec qualité originale préservée',
      'Format .dbi — Stockage binaire compact pour vos projets de doublage',
      'Archives portables — Exportez vos sessions en ZIP pour les partager facilement',
      'I/O Asynchrone — Sauvegardes fluides sans jamais bloquer l\'interface',
    ],
  },
];

export const FeaturesPage: React.FC = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Halo className="top-[-6rem] left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] opacity-40" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-16">
          <span className="font-mono text-xs font-bold text-accent">{CURRENT_VERSION} (Bêta)</span>
          <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
            Ce que DubInstante sait faire.
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            Moteur C++ hautes performances, bandes rythmo dynamiques, enregistrement
            multipiste et export FFmpeg. Voici le détail.
          </p>
        </Reveal>

        <div className="space-y-16">
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 100} className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm font-bold text-accent tabular-nums">{f.num}</span>
                <span className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)] mb-6">
                {f.title}
              </h2>
              <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover">
                <ul className="space-y-3">
                  {f.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <Link
            to="/download"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-ink bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-[0_0_30px_-8px_rgba(255,176,32,0.6)] hover:shadow-[0_0_40px_-6px_rgba(255,176,32,0.8)] hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger {CURRENT_VERSION}</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
