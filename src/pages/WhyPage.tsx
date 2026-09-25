import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Spotlight } from '../components/ui/Primitives';
import { CURRENT_VERSION, DOWNLOAD_PLATFORMS, detectClientOS } from '../config/downloads';
import { Link } from 'react-router-dom';
import {
  Download,
  Check,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Coins,
  FileCode,
  ArrowRight,
} from 'lucide-react';

export const WhyPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  useDocumentTitle(isEn ? 'Why DubInstante? — The Unfiltered Comparison' : 'Pourquoi DubInstante ? — Le comparatif sans filtre');

  const detectedOS = detectClientOS();
  const platform = DOWNLOAD_PLATFORMS[detectedOS];

  const comparisonRows = isEn
    ? [
        {
          label: 'Price & Billing',
          dub: 'Free & Open-Source (0 €)',
          pro: '$999 to $3,999+ or subscriptions',
          legacy: 'Free (Abandoned abandonware)',
          hack: '€24 to €60/mo (Creative Cloud, etc.)',
          dubWinner: true,
        },
        {
          label: 'Licensing & Freedom',
          dub: 'EUPL 1.2 (Open-Source)',
          pro: 'Closed source, USB dongle / iLok',
          legacy: 'Closed freeware',
          hack: 'Proprietary closed tools',
          dubWinner: true,
        },
        {
          label: 'Rythmo Band Rendering',
          dub: 'Native 60 FPS (C++ / OpenGL)',
          pro: 'Native studio 60 FPS',
          legacy: 'Choppy 2000s GDI rendering',
          hack: 'None (manual subtitle keyframes)',
          dubWinner: true,
        },
        {
          label: 'Synchronized Multi-track',
          dub: 'Yes (Up to 4 synchronized studio mics with distinct params & styling)',
          pro: 'Yes (Multi-channel ADR)',
          legacy: 'Limited or crash-prone',
          hack: 'No (drift between VLC & Audacity)',
          dubWinner: true,
        },
        {
          label: 'Modern 4K & Codec Support',
          dub: 'Yes (FFmpeg MP4, H.264, H.265)',
          pro: 'Yes',
          legacy: 'No (crashes on modern MP4s)',
          hack: 'Yes (native in video editors)',
          dubWinner: true,
        },
        {
          label: 'Cross-Platform OS',
          dub: 'Windows, macOS, Linux, Android',
          pro: 'Often macOS only or Windows only',
          legacy: 'Windows XP / 7 only',
          hack: 'Depends on software',
          dubWinner: true,
        },
        {
          label: 'Offline & Privacy',
          dub: '100% Local, zero accounts, zero cloud',
          pro: 'Hardware dongles / license servers',
          legacy: '100% Local',
          hack: 'Cloud account required',
          dubWinner: true,
        },
        {
          label: 'Session Prep Time',
          dub: 'Instant (type text straight on track)',
          pro: 'Complex multi-step studio setup',
          legacy: 'Cumbersome file imports',
          hack: 'Hours wasted placing keyframes',
          dubWinner: true,
        },
      ]
    : [
        {
          label: 'Prix & Modèle économique',
          dub: 'Gratuit & Libre (0 € à vie)',
          pro: '999 € à 3 999 € ou abonnements',
          legacy: 'Gratuit (Abandonware délaissé)',
          hack: '24 € à 60 €/mois (Creative Cloud, etc.)',
          dubWinner: true,
        },
        {
          label: 'Licence & Indépendance',
          dub: 'EUPL 1.2 (Open-Source)',
          pro: 'Propriétaire fermée + clé iLok',
          legacy: 'Freeware fermé',
          hack: 'Propriétaire fermée',
          dubWinner: true,
        },
        {
          label: 'Bande rythmo défilante 60 FPS',
          dub: 'Oui native (C++ / OpenGL)',
          pro: 'Oui native studio',
          legacy: 'Saccades / Moteur GDI des années 2000',
          hack: 'Non (animation manuelle de texte)',
          dubWinner: true,
        },
        {
          label: 'Enregistrement multipiste synchro',
          dub: 'Oui (Jusqu\'à 4 micros simultanés avec paramètres et styles distincts)',
          pro: 'Oui (Multipiste broadcast)',
          legacy: 'Limité ou très instable',
          hack: 'Non (dérive entre VLC & Audacity)',
          dubWinner: true,
        },
        {
          label: 'Codecs modernes & Vidéo 4K',
          dub: 'Oui (FFmpeg MP4, H.264, H.265)',
          pro: 'Oui',
          legacy: 'Non (plante sur les MP4 récents)',
          hack: 'Oui (natif dans les logiciels vidéo)',
          dubWinner: true,
        },
        {
          label: 'Support multiplateforme',
          dub: 'Windows, macOS, Linux, Android',
          pro: 'Souvent verrouillé sur Mac ou Windows',
          legacy: 'Windows XP / 7 uniquement',
          hack: 'Selon les applications',
          dubWinner: true,
        },
        {
          label: 'Vie privée & Hors-ligne',
          dub: '100% Local, zéro compte, zéro cloud',
          pro: 'Dongle physique ou serveur de licence',
          legacy: '100% Local',
          hack: 'Compte cloud et télémétrie imposés',
          dubWinner: true,
        },
        {
          label: 'Temps de calage par session',
          dub: 'Instantané (saisie directe en place)',
          pro: 'Configuration studio lourde',
          legacy: 'Imports de fichiers fastidieux',
          hack: 'Des heures perdues à placer des repères',
          dubWinner: true,
        },
      ];

  const workarounds = isEn
    ? [
        {
          icon: '🎧',
          tag: 'Workaround #1',
          title: 'The VLC + Audacity gamble',
          desc: 'Trying to hit the Spacebar on VLC and the Record button on Audacity at the exact same millisecond. After two minutes, audio drifts away, and you have zero visual feedback on the screen.',
          fix: 'DubInstante locks video rendering, rythmo syllables, and microphone recording to the exact same internal audio clock.',
        },
        {
          icon: '⏱️',
          tag: 'Workaround #2',
          title: 'The Premiere / DaVinci subtitle nightmare',
          desc: 'Attempting to create moving text by animating subtitle layers with position keyframes. Spending 4 hours of tedious editing just to synchronize a 30-second scene.',
          fix: 'Type syllables straight onto the track. DubInstante automatically scrolls the text at 60 FPS smoothly across the red sync bar.',
        },
        {
          icon: '📝',
          tag: 'Workaround #3',
          title: 'The Aegisub detour',
          desc: 'Great for anime karaoke fansubbing, but completely impractical for voice actors who need live visual cue points, breath markers, and immediate vocal takes.',
          fix: 'Purpose-built for dubbing: real rythmo typography, customizable text styles, and instant frame-accurate cue navigation.',
        },
        {
          icon: '📄',
          tag: 'Workaround #4',
          title: 'The printed paper script below the monitor',
          desc: 'Constantly looking down at a printed A4 sheet, losing sight of the actor’s lip movements on screen, and having to record 15 takes instead of one.',
          fix: 'Words flow seamlessly directly below the video player in studio or fullscreen mode. The actor never breaks eye contact with the character.',
        },
      ]
    : [
        {
          icon: '🎧',
          tag: 'Bricolage n°1',
          title: 'Le mirage VLC + Audacity',
          desc: 'Tenter d\'appuyer sur Espace dans VLC et sur Enregistrer dans Audacity à la même milliseconde. Au bout de deux minutes, le son dérive inévitablement et vous n\'avez aucun repère visuel de jeu.',
          fix: 'Dans DubInstante, la lecture vidéo, le texte défilant et la prise micro sont asservis à la même horloge interne au centième de frame près.',
        },
        {
          icon: '⏱️',
          tag: 'Bricolage n°2',
          title: 'Le calvaire des sous-titres Premiere / DaVinci',
          desc: 'Tenter de créer une bande rythmo manuelle avec des calques de sous-titres et 200 keyframes de position. 4 heures de calage laborieux pour seulement 30 secondes de répliques.',
          fix: 'Saisissez simplement votre dialogue. DubInstante fait défiler les syllabes à 60 FPS avec fluidité vers la barre rouge centrale.',
        },
        {
          icon: '📝',
          tag: 'Bricolage n°3',
          title: 'Le détournement d\'Aegisub',
          desc: 'Idéal pour le fansub et le karaoké, mais impraticable en cabine de doublage : pas de capture voix intégrée, pas de gestion du débit d\'inspiration ni de confort visuel acteur.',
          fix: 'Conçu sur-mesure pour le doublage : typographie rythmo claire, repères de souffle et retour micro direct sans latence.',
        },
        {
          icon: '📄',
          tag: 'Bricolage n°4',
          title: 'Le script papier sous l\'écran',
          desc: 'Le comédien passe son temps à baisser les yeux sur sa feuille imprimée, perd le mouvement des lèvres du personnage et doit refaire la prise 15 fois.',
          fix: 'Le texte défile sous la vidéo en mode studio ou plein écran. L\'acteur conserve son regard rivé sur l\'expression du personnage.',
        },
      ];

  const pillars = isEn
    ? [
        {
          icon: Coins,
          title: 'Zero budget barrier',
          desc: 'Whether you are a student, indie creator, or small studio, access pro rythmo technology without paying 1000 €.',
        },
        {
          icon: ShieldCheck,
          title: '100% Offline & Private',
          desc: 'Your raw footage, client voice takes, and project files never touch external servers or cloud accounts.',
        },
        {
          icon: FileCode,
          title: 'Guaranteed Longevity',
          desc: 'EUPL 1.2 open-source license. The software is yours forever, with zero risk of forced obsolescence or price hikes.',
        },
      ]
    : [
        {
          icon: Coins,
          title: 'Zéro barrière financière',
          desc: 'Que vous soyez étudiant, créateur YouTube, comédien ou petit studio, accédez au standard rythmo sans débourser 1 000 €.',
        },
        {
          icon: ShieldCheck,
          title: '100% Hors-ligne & Confidentiel',
          desc: 'Vos rushs vidéo non divulgués, voix de comédiens et projets restent strictement sur votre machine.',
        },
        {
          icon: FileCode,
          title: 'Pérennité garantie',
          desc: 'Sous licence libre EUPL 1.2. Vos fichiers .dbi vous appartiennent à vie, sans dépendre du serveur d\'un éditeur.',
        },
      ];

  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      <Spotlight className="top-[-8rem] left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] opacity-50" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <Reveal className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-glow-pulse" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <Eyebrow className="text-accent">{t.why.eyebrow}</Eyebrow>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tightest text-balance text-[var(--text-primary)]">
            {t.why.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {t.why.subtitle}
          </p>
        </Reveal>

        {/* SECTION 1: THE 4-WAY COMPARISON MATRIX */}
        <Reveal className="mb-24">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              {t.why.tableEyebrow}
            </span>
            <h2 className="mt-1 font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              {t.why.tableTitle}
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {t.why.tableSubtitle}
            </p>
          </div>

          {/* Desktop Table (sm and up) */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border-strong)] bg-[var(--bg-sunk)] text-[var(--text-primary)]">
                  <th className="py-4 px-4 sm:px-6 font-mono font-semibold w-1/4">
                    {isEn ? 'Criteria' : 'Critères'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-display font-bold text-accent bg-accent/[0.06] border-x border-accent/30 w-1/4">
                    <div className="flex items-center gap-1.5">
                      <span>DubInstante</span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-white px-1.5 py-0.5 rounded">
                        {isEn ? 'Free' : 'Libre'}
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-display font-semibold text-[var(--text-primary)] w-1/4">
                    {isEn ? 'Studio Suites (VoiceQ, Nuendo)' : 'Suites Pro (VoiceQ, Nuendo)'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-display font-semibold text-[var(--text-muted)] w-1/4">
                    {isEn ? 'Workarounds (Premiere, VLC)' : 'Bricolages (Premiere, VLC)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] font-mono">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--bg-sunk)]/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-sans font-medium text-[var(--text-primary)]">
                      {row.label}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-accent bg-accent/[0.04] border-x border-accent/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span>{row.dub}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[var(--text-secondary)]">
                      {row.pro}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[var(--text-muted)]">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{row.hack}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Comparison Cards (< sm) */}
          <div className="sm:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-2.5"
              >
                <div className="font-sans font-bold text-sm text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
                  {row.label}
                </div>
                {/* DubInstante */}
                <div className="p-2.5 rounded-lg bg-accent/[0.06] border border-accent/25 flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase text-accent tracking-wider">
                      DubInstante ({isEn ? 'Free' : 'Libre'})
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-primary)] font-mono">
                      {row.dub}
                    </span>
                  </div>
                </div>
                {/* Proprietary */}
                <div className="p-2 rounded-lg bg-[var(--bg-sunk)]/60 flex items-start justify-between gap-2 text-xs">
                  <span className="text-[var(--text-muted)] font-mono font-medium">
                    {isEn ? 'Suites Pro:' : 'Suites Pro :'}
                  </span>
                  <span className="text-[var(--text-secondary)] text-right font-mono">
                    {row.pro}
                  </span>
                </div>
                {/* Workarounds */}
                <div className="p-2 rounded-lg bg-[var(--bg-sunk)]/60 flex items-start justify-between gap-2 text-xs">
                  <span className="text-[var(--text-muted)] font-mono font-medium">
                    {isEn ? 'Workarounds:' : 'Bricolages :'}
                  </span>
                  <span className="text-[var(--text-muted)] text-right font-mono flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{row.hack}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="mt-4 text-center text-xs font-mono text-[var(--text-muted)]">
            {t.why.sourcesNote}
          </p>
        </Reveal>

        {/* SECTION 2: THE WALL OF WORKAROUND PAIN */}
        <div className="mb-24 pt-12 border-t border-[var(--border-subtle)]">
          <Reveal className="mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                {t.why.wallEyebrow}
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
              {t.why.wallTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {t.why.wallSubtitle}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workarounds.map((w, idx) => (
              <Reveal key={idx} delay={idx * 80} className="p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" aria-hidden>{w.icon}</span>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-rec/10 text-rec">
                      {w.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                    {w.title}
                  </h3>
                  <div className="p-3.5 rounded-xl bg-red-500/[0.05] border border-red-500/20 text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                    <span className="font-bold text-rec uppercase tracking-wider block mb-1">
                      {isEn ? 'The Struggle:' : 'La galère :'}
                    </span>
                    {w.desc}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-sunk)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)]">
                  <span className="font-bold text-accent uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent" />
                    <span>{isEn ? 'DubInstante Solution:' : 'La solution DubInstante :'}</span>
                  </span>
                  {w.fix}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SECTION 3: FREEDOM MANIFESTO & ECONOMIC REALITY */}
        <Reveal className="mb-24 p-8 sm:p-12 md:p-14 rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-surface)] relative overflow-hidden">
          <Spotlight className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] opacity-25 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              {t.why.freedomEyebrow}
            </span>
            <h2 className="mt-2 font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              {t.why.freedomTitle}
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              {t.why.freedomSubtitle}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[var(--bg-sunk)] border border-[var(--border-subtle)] flex flex-col justify-start text-left">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    {pil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* SECTION 4: CALL TO ACTION */}
        <Reveal className="text-center pt-8 border-t border-[var(--border-subtle)]">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)] mb-3">
            {t.why.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto mb-8">
            {t.why.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={platform.url}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-[0_0_30px_-8px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_-6px_rgba(229,9,20,0.7)] hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>
                {t.why.ctaBtn} ({platform.name} · {CURRENT_VERSION})
              </span>
            </a>
            <Link
              to="/features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-sunk)] border border-[var(--border-strong)] rounded-xl transition-colors"
            >
              <span>{isEn ? 'Explore Features & Engine' : 'Découvrir Fonctionnalités & Moteur'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyPage;
