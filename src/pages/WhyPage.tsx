import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Spotlight } from '../components/ui/Primitives';
import { CURRENT_VERSION } from '../config/downloads';
import { DownloadLink } from '../components/DownloadLink';
import { Link } from 'react-router-dom';
import {
  Download,
  Check,
  X,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Coins,
  FileCode,
  ArrowRight,
  Building2,
  Wrench,
} from 'lucide-react';

interface ProRow {
  label: string;
  dub: string;
  voiceq: string;
  mosaic: string;
  synchronos: string;
  dubHighlight?: boolean;
}

interface AmateurRow {
  label: string;
  dub: string;
  voxdub: string;
  vlc: string;
  aegisub: string;
  premiere: string;
  cappella: string;
}

type Status = 'g' | 'm' | 'b';

// Pages officielles où les tarifs et prérequis du comparatif ont été relevés
const SOURCES = [
  { name: 'VoiceQ', url: 'https://www.voiceq.com/products' },
  { name: 'Noblurway Mosaic', url: 'https://www.noblurway.com/fr/acheter-louer-mosaic/options-achat-et-tarifs' },
  { name: 'Synchronos', url: 'https://www.synchronos.fr/acheter_synchronos.html' },
  { name: 'Voxdub', url: 'https://voxdub.com/fr' },
  { name: 'Cappella', url: 'https://www.cappella.app/historique.html' },
  { name: 'Adobe Premiere', url: 'https://www.adobe.com/fr/products/premiere/plans.html' },
];

// Statuts par ligne, dans l'ordre des lignes de données — g: avantage, m: nuancé, b: limitant
const PRO_STATUS: Status[][] = [
  ['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b'], ['g', 'g', 'g'], ['g', 'g', 'g'],
  ['b', 'b', 'b'], ['g', 'g', 'g'], ['g', 'g', 'g'], ['b', 'b', 'b'],
];

// Colonnes : voxdub, vlc, aegisub, premiere, cappella
const AMATEUR_STATUS: Status[][] = [
  ['b', 'm', 'm', 'g', 'm'], ['m', 'g', 'g', 'b', 'g'], ['g', 'b', 'b', 'b', 'm'],
  ['b', 'g', 'g', 'g', 'g'], ['m', 'b', 'b', 'm', 'b'], ['g', 'm', 'b', 'm', 'm'],
  ['g', 'b', 'm', 'b', 'b'], ['m', 'm', 'm', 'g', 'b'], ['m', 'b', 'b', 'b', 'b'],
];

const AMATEUR_TOOLS: { key: Exclude<keyof AmateurRow, 'label' | 'dub'>; name: string; subFr: string; subEn: string }[] = [
  { key: 'voxdub', name: 'Voxdub', subFr: 'Service web (cloud)', subEn: 'Cloud web service' },
  { key: 'vlc', name: 'VLC + Audacity', subFr: 'Double écran', subEn: 'Split-screen' },
  { key: 'aegisub', name: 'Aegisub', subFr: 'Détour fansub', subEn: 'Fansub detour' },
  { key: 'premiere', name: 'Premiere / DaVinci', subFr: 'Keyframes manuelles', subEn: 'Manual keyframes' },
  { key: 'cappella', name: 'Cappella', subFr: 'Dernière version : 2008', subEn: 'Last release: 2008' },
];

const Verdict: React.FC<{ s: Status }> = ({ s }) =>
  s === 'g' ? (
    <Check className="w-4 h-4 text-audio-green shrink-0 mt-0.5 stroke-[2.5]" aria-label="+" />
  ) : s === 'm' ? (
    <AlertTriangle className="w-4 h-4 text-audio-amber shrink-0 mt-0.5" aria-label="~" />
  ) : (
    <X className="w-4 h-4 text-rec shrink-0 mt-0.5" aria-label="-" />
  );

interface CompareRow {
  label: string;
  dub: string;
  dubStatus: Status;
  cells: { text: string; status: Status }[];
}

const CompareTable: React.FC<{
  criteriaLabel: string;
  dub: { name: string; sub: string };
  cols: { name: string; sub: string }[];
  rows: CompareRow[];
}> = ({ criteriaLabel, dub, cols, rows }) => (
  <>
    <div className="hidden md:block overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <table className="w-full table-fixed text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-sunk)]">
            <th className="w-[20%] py-4 px-5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{criteriaLabel}</th>
            <th className="w-[26%] py-4 px-5 bg-accent/[0.07] border-x border-accent/25">
              <div className="font-display font-bold text-accent text-base">{dub.name}</div>
              <div className="text-[11px] font-semibold text-accent">{dub.sub}</div>
            </th>
            {cols.map((c) => (
              <th key={c.name} className="py-4 px-5">
                <div className="font-display font-semibold text-[var(--text-primary)]">{c.name}</div>
                <div className="text-[11px] font-normal text-[var(--text-muted)]">{c.sub}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          {rows.map((r) => (
            <tr key={r.label} className="align-top hover:bg-[var(--bg-sunk)]/50 transition-colors">
              <td className="py-4 px-5 font-medium text-[var(--text-primary)]">{r.label}</td>
              <td className="py-4 px-5 font-semibold text-[var(--text-primary)] bg-accent/[0.04] border-x border-accent/20">
                <div className="flex gap-2">
                  <Verdict s={r.dubStatus} />
                  <span>{r.dub}</span>
                </div>
              </td>
              {r.cells.map((c, i) => (
                <td key={i} className="py-4 px-5 text-[var(--text-secondary)]">
                  <div className="flex gap-2">
                    <Verdict s={c.status} />
                    <span>{c.text}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="md:hidden space-y-3">
      {rows.map((r) => (
        <div key={r.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <div className="font-display font-bold text-[var(--text-primary)] mb-3">{r.label}</div>
          <div className="flex gap-2 p-2.5 rounded-lg bg-accent/[0.06] border border-accent/25 text-sm font-semibold text-[var(--text-primary)]">
            <Verdict s={r.dubStatus} />
            <span><span className="text-accent">{dub.name} · </span>{r.dub}</span>
          </div>
          <ul className="mt-2.5 space-y-2">
            {r.cells.map((c, i) => (
              <li key={i} className="flex gap-2 text-xs text-[var(--text-secondary)]">
                <Verdict s={c.status} />
                <span><span className="font-semibold text-[var(--text-muted)]">{cols[i].name} · </span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
);

export const WhyPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';


  // TABLE 1 DATA: DubInstante vs Top 3 Studio Suites (VoiceQ, Mosaic, Synchronos)
  const proRowsFR: ProRow[] = [
    {
      label: 'Prix & Modèle économique',
      dub: '0 € (Gratuit & Libre à vie)',
      voiceq: '279 $/mois (Pro) ou 39 $/mois (Writer)',
      mosaic: '200 € HT/mois ou 3 650 € perpétuel',
      synchronos: '96 € TTC/mois ou 564 €/an',
      dubHighlight: true,
    },
    {
      label: 'Licence & Code source',
      dub: 'Libre (EUPL 1.2, transparent & auditable)',
      voiceq: 'Propriétaire fermée',
      mosaic: 'Propriétaire fermée',
      synchronos: 'Propriétaire fermée',
      dubHighlight: true,
    },
    {
      label: 'Protection DRM & Matériel',
      dub: 'Zéro DRM, 100% hors-ligne sans compte',
      voiceq: 'Licence iLok (clé USB ou iLok Cloud connecté)',
      mosaic: 'Dongle Noblurway obligatoire (logiciel ou USB)',
      synchronos: 'Dongle USB (105 €) ou connexion active',
      dubHighlight: true,
    },
    {
      label: 'Bande rythmo native 60 FPS',
      dub: 'Oui (Moteur C++ & OpenGL fluide)',
      voiceq: 'Oui (Native 60 FPS macOS)',
      mosaic: 'Oui (Native studio Windows)',
      synchronos: 'Oui (Native historique Windows)',
      dubHighlight: true,
    },
    {
      label: 'Prise de voix multipiste synchro',
      dub: 'Jusqu\'à 4 micros simultanés',
      voiceq: 'Oui (Multipiste DAW)',
      mosaic: 'Oui (Multipiste broadcast)',
      synchronos: 'Oui (Multipiste studio)',
      dubHighlight: true,
    },
    {
      label: 'Systèmes d\'exploitation supportés',
      dub: 'Linux et Windows (macOS en attente, Android en réécriture)',
      voiceq: 'macOS uniquement',
      mosaic: 'Windows uniquement',
      synchronos: 'Windows uniquement',
      dubHighlight: true,
    },
    {
      label: 'Codecs vidéo modernes & 4K',
      dub: 'MP4, MKV, ProRes, H.264/H.265 (FFmpeg)',
      voiceq: 'ProRes, MP4, QuickTime (AVFoundation)',
      mosaic: 'MP4, ProRes, DNxHD',
      synchronos: 'MP4, AVI, ProRes',
      dubHighlight: true,
    },
    {
      label: 'Intégration Pro Tools Satellite / SDI',
      dub: 'Non (Workflow autonome indépendant)',
      voiceq: 'Oui (Pro Tools Satellite, cartes SDI)',
      mosaic: 'Oui (Pro Tools, AVID, LTC/RS422)',
      synchronos: 'Oui (RS422, LTC, Pro Tools)',
      dubHighlight: false, // Honnêteté : hardware broadcast studio dédié
    },
    {
      label: 'Format de fichier & Pérennité',
      dub: 'Format ouvert .dbi (lisible à vie)',
      voiceq: 'Format propriétaire (captif)',
      mosaic: 'Format propriétaire captif',
      synchronos: 'Format propriétaire (captif)',
      dubHighlight: true,
    },
  ];

  const proRowsEN: ProRow[] = [
    {
      label: 'Price & Billing Model',
      dub: '$0 (Free & Open-Source forever)',
      voiceq: '$279/mo (Pro) or $39/mo (Writer)',
      mosaic: '200 €/mo or 3,650 € perpetual license',
      synchronos: '96 €/mo or 564 €/yr',
      dubHighlight: true,
    },
    {
      label: 'Licensing & Source Code',
      dub: 'Open-Source (EUPL 1.2, fully auditable)',
      voiceq: 'Closed proprietary',
      mosaic: 'Closed proprietary',
      synchronos: 'Closed proprietary',
      dubHighlight: true,
    },
    {
      label: 'DRM & Hardware Protection',
      dub: 'Zero DRM, 100% offline, no account required',
      voiceq: 'iLok license (USB key or always-online iLok Cloud)',
      mosaic: 'Mandatory Noblurway dongle (software or USB)',
      synchronos: 'USB dongle (€105) or active connection',
      dubHighlight: true,
    },
    {
      label: 'Native 60 FPS Rythmo Band',
      dub: 'Yes (Native C++ & OpenGL smooth scrolling)',
      voiceq: 'Yes (Native 60 FPS on macOS)',
      mosaic: 'Yes (Native studio on Windows)',
      synchronos: 'Yes (Native legacy on Windows)',
      dubHighlight: true,
    },
    {
      label: 'Synchronized Multi-track Takes',
      dub: 'Up to 4 microphones at once',
      voiceq: 'Yes (DAW multi-track)',
      mosaic: 'Yes (Broadcast multi-track)',
      synchronos: 'Yes (Studio multi-track)',
      dubHighlight: true,
    },
    {
      label: 'Supported Operating Systems',
      dub: 'Linux and Windows (macOS on hold, Android being rebuilt)',
      voiceq: 'macOS only',
      mosaic: 'Windows only',
      synchronos: 'Windows only',
      dubHighlight: true,
    },
    {
      label: 'Modern 4K & Codec Support',
      dub: 'MP4, MKV, ProRes, H.264/H.265 (FFmpeg)',
      voiceq: 'ProRes, MP4, QuickTime (AVFoundation)',
      mosaic: 'MP4, ProRes, DNxHD',
      synchronos: 'MP4, AVI, ProRes',
      dubHighlight: true,
    },
    {
      label: 'Pro Tools Satellite & Hardware SDI',
      dub: 'No (Dedicated standalone workflow)',
      voiceq: 'Yes (Pro Tools Satellite, SDI video out)',
      mosaic: 'Yes (Pro Tools, AVID, LTC/RS422)',
      synchronos: 'Yes (RS422, LTC, Pro Tools)',
      dubHighlight: false,
    },
    {
      label: 'File Format & Session Longevity',
      dub: 'Open .dbi format (accessible forever)',
      voiceq: 'Proprietary locked format',
      mosaic: 'Proprietary locked format',
      synchronos: 'Proprietary locked format',
      dubHighlight: true,
    },
  ];

  // TABLE 2 DATA: DubInstante vs Amateur / 0€ Workarounds (including Voxdub web freemium)
  const amateurRowsFR: AmateurRow[] = [
    {
      label: 'Filigrane imposé sur la vidéo',
      dub: 'Zéro filigrane (Export 100% propre)',
      voxdub: 'Sans filigrane uniquement en offre Pro',
      vlc: 'Aucun (mais pas de vidéo rythmo)',
      aegisub: 'Aucun (fichier sous-titres seul)',
      premiere: 'Aucun filigrane',
      cappella: 'Aucun (mais export AVI archaïque)',
    },
    {
      label: 'Coût financier réel',
      dub: '0 € (Gratuit & Libre à vie)',
      voxdub: 'Essai 7 jours, puis 99 €/an',
      vlc: '0 € (Freeware)',
      aegisub: '0 € (Open-source sous-titres)',
      premiere: 'À partir de 26 €/mois (ou DaVinci Free)',
      cappella: '0 € (plus mis à jour depuis 2008)',
    },
    {
      label: 'Véritable bande rythmo défilante',
      dub: 'Oui (60 FPS fluide asservie à l\'image)',
      voxdub: 'Oui (dans le navigateur Web)',
      vlc: 'Non (aucun texte défilant)',
      aegisub: 'Non (sous-titres statiques / karaoké)',
      premiere: 'Non (keyframing manuel saccadé)',
      cappella: 'Oui mais moteur GDI XP saccadé',
    },
    {
      label: 'Confidentialité des rushs vidéo',
      dub: '100% Local (aucun upload externe)',
      voxdub: 'Rushs vidéo & voix envoyés sur le Cloud',
      vlc: '100% Local',
      aegisub: '100% Local',
      premiere: '100% Local',
      cappella: '100% Local',
    },
    {
      label: 'Synchronisation audio & Dérive',
      dub: 'Prises calées sur le timecode vidéo',
      voxdub: 'Correcte mais tributaire du navigateur',
      vlc: 'Dérive inévitable au bout de 2 min',
      aegisub: 'Pas de moteur de prise son',
      premiere: 'Synchro stable mais timeline lourde',
      cappella: 'Dérives fréquentes sur codecs récents',
    },
    {
      label: 'Prise de son micro synchronisée',
      dub: 'Oui (jusqu\'à 4 micros avec monitoring)',
      voxdub: 'Oui (micro WebRTC navigateur)',
      vlc: 'Bricolage (micro dans Audacity seul)',
      aegisub: 'Non (logiciel de texte uniquement)',
      premiere: 'Possible (voice-over de montage)',
      cappella: 'Limité à 1 micro, buffer instable',
    },
    {
      label: 'Temps de préparation par session',
      dub: 'Instantané (saisie directe sur piste)',
      voxdub: 'Rapide (détection auto / calage web)',
      vlc: 'Inexistant (jeu à l\'aveugle)',
      aegisub: 'Moyen (calage temps de fansub)',
      premiere: 'Épuisant (4h pour 30 secondes)',
      cappella: 'Fastidieux (imports et conversions)',
    },
    {
      label: 'Codecs récents (MP4, MKV, 4K)',
      dub: 'Parfaite (moteur FFmpeg 64-bit natif)',
      voxdub: 'Limité par les formats web & uploads',
      vlc: 'Bonne dans VLC mais décorrélée',
      aegisub: 'Correcte (Libass / VSFilter)',
      premiere: 'Excellente (consomme beaucoup de RAM)',
      cappella: 'Plantages fréquents (codecs 32-bit)',
    },
    {
      label: 'Confort de jeu comédien',
      dub: 'Idéal (plein écran, barre rouge, repères)',
      voxdub: 'Correct (mode studio navigateur)',
      vlc: 'Nul (comédien penché sur papier)',
      aegisub: 'Inadapté au jeu d\'acteur doublage',
      premiere: 'Inadapté en cabine d\'enregistrement',
      cappella: 'Interface austère des années 2000',
    },
  ];

  const amateurRowsEN: AmateurRow[] = [
    {
      label: 'Watermark on Video Export',
      dub: 'Zero watermark (100% clean video)',
      voxdub: 'Watermark-free on the Pro plan only',
      vlc: 'None (no video rythmo generated)',
      aegisub: 'None (subtitle file only)',
      premiere: 'None',
      cappella: 'None (archaic AVI export only)',
    },
    {
      label: 'Real Financial Cost',
      dub: '$0 (Free & Open-Source forever)',
      voxdub: '7-day trial, then €99/yr',
      vlc: '$0 (Freeware)',
      aegisub: '$0 (Open-source subtitler)',
      premiere: 'From €26/mo (or DaVinci Free)',
      cappella: '$0 (not updated since 2008)',
    },
    {
      label: 'True Scrolling Rythmo Band',
      dub: 'Yes (Smooth 60 FPS locked to video)',
      voxdub: 'Yes (Web browser HTML5)',
      vlc: 'No (zero scrolling text)',
      aegisub: 'No (static subtitles / karaoke only)',
      premiere: 'No (manual choppy keyframe animation)',
      cappella: 'Yes but choppy 2000s GDI engine',
    },
    {
      label: 'Video Privacy & Local Storage',
      dub: '100% Local (no external transfers)',
      voxdub: 'Video footage and voice uploaded to cloud',
      vlc: '100% Local',
      aegisub: '100% Local',
      premiere: '100% Local',
      cappella: '100% Local',
    },
    {
      label: 'Audio Sync & Drift',
      dub: 'Takes locked to the video timecode',
      voxdub: 'Good, but subject to browser latency',
      vlc: 'Severe drift after 2 minutes',
      aegisub: 'No built-in voice recording',
      premiere: 'Stable sync but heavy video timeline',
      cappella: 'Frequent desync on modern codecs',
    },
    {
      label: 'Synchronized Voice Recording',
      dub: 'Yes (up to 4 mics with live monitoring)',
      voxdub: 'Yes (browser WebRTC audio)',
      vlc: 'Hacky (mic in Audacity only, no video link)',
      aegisub: 'No (text-only application)',
      premiere: 'Possible (editing voice-over tool)',
      cappella: 'Limited to 1 mic, unstable buffers',
    },
    {
      label: 'Session Prep Time',
      dub: 'Instant (type text straight on track)',
      voxdub: 'Fast (auto sync / browser editor)',
      vlc: 'Nonexistent (acting blind)',
      aegisub: 'Medium (fansub timing workflow)',
      premiere: '4 hours wasted for 30s of dialogue',
      cappella: 'Cumbersome (file imports & conversions)',
    },
    {
      label: 'Modern Video Support (MP4, MKV, 4K)',
      dub: 'Flawless (native 64-bit FFmpeg)',
      voxdub: 'Limited by web upload bandwidth',
      vlc: 'Good in VLC but detached from audio',
      aegisub: 'Decent (Libass / VSFilter)',
      premiere: 'Excellent (heavy RAM consumption)',
      cappella: 'Frequent crashes (32-bit legacy codecs)',
    },
    {
      label: 'Voice Actor Visual Comfort',
      dub: 'Ideal (fullscreen, red sync bar, breath cues)',
      voxdub: 'Decent (browser studio view)',
      vlc: 'Zero (actor looking down at printed paper)',
      aegisub: 'Unsuitable for voice actor immersion',
      premiere: 'Clumsy for live booth recording',
      cappella: 'Clunky, dated 2000s interface',
    },
  ];

  const proRows = isEn ? proRowsEN : proRowsFR;
  const amateurRows = isEn ? amateurRowsEN : amateurRowsFR;

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
          fix: 'Dans DubInstante, la lecture vidéo, le texte défilant et la prise micro sont asservis à la même horloge interne.',
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
          fix: 'Conçu sur-mesure pour le doublage : typographie rythmo claire, repères de souffle et retour micro direct.',
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
      <Spotlight className="top-[-8rem] left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] opacity-40" />

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <Reveal className="max-w-3xl mb-16 mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-glow-pulse" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <Eyebrow className="text-accent">{isEn ? 'THE THIRD PATH PROVEN' : 'LA 3E VOIE PROUVÉE'}</Eyebrow>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tightest text-balance text-[var(--text-primary)]">
            {isEn ? 'Rythmo band and dubbing software compared.' : 'Comparatif des logiciels de bande rythmo et de doublage.'}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {isEn
              ? 'DubInstante was built because dubbing had no middle ground: either pay up to $279/month for corporate software, or suffer hours of audio desync on broken free tools. Here is the rigorous, unfiltered evidence.'
              : 'DubInstante a été créé parce que le doublage manquait d\'une alternative saine : soit payer jusqu\'à 279 $ par mois pour des logiciels studio fermés, soit subir des heures de désynchronisation sur des bricolages gratuits. Voici la comparaison complète et sans filtre.'}
          </p>
        </Reveal>

        {/* ========================================================================= */}
        {/* TABLE 1: DUBINSTANTE VS TOP 3 PRO STUDIO SUITES                           */}
        {/* ========================================================================= */}
        <Reveal className="mb-24">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md bg-[var(--bg-sunk)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                {isEn ? 'TABLE 1 · VS PROFESSIONAL STUDIO SUITES' : 'TABLEAU 1 · FACE AUX GÉANTS DU STUDIO'}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              {isEn ? 'DubInstante vs. VoiceQ, Mosaic & Synchronos' : 'DubInstante face à VoiceQ, Mosaic & Synchronos'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {isEn
                ? 'Professional studios pay thousands for dedicated setups. Enterprise suites offer broadcast hardware sync (SDI / Pro Tools Satellite); DubInstante covers the core dubbing workflow natively, with zero fees and total freedom.'
                : 'Les studios pro dépensent des milliers d\'euros. Les suites broadcast offrent des intégrations matérielles (SDI / Pro Tools Satellite) ; DubInstante assure l\'essentiel du doublage à 60 FPS, sans frais et en toute liberté.'}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/25 text-sm font-semibold text-accent">
              {isEn ? '0 € vs. €96 to $279 per month' : '0 € contre 96 € à 279 $ par mois'}
            </div>
          </div>

          <CompareTable
            criteriaLabel={isEn ? 'Criteria' : 'Critères'}
            dub={{ name: 'DubInstante', sub: isEn ? '0 € · Free' : '0 € · Libre' }}
            cols={[
              { name: 'VoiceQ Pro', sub: isEn ? '$279/mo' : '279 $/mois' },
              { name: 'Noblurway Mosaic', sub: isEn ? '200 €/mo or 3,650 €' : '200 €/m ou 3 650 €' },
              { name: 'Synchronos', sub: isEn ? '96 €/mo + Dongle' : '96 €/m + Clé USB' },
            ]}
            rows={proRows.map((r, i) => ({
              label: r.label,
              dub: r.dub,
              dubStatus: r.dubHighlight ? 'g' : 'm',
              cells: [r.voiceq, r.mosaic, r.synchronos].map((text, j) => ({ text, status: PRO_STATUS[i][j] })),
            }))}
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] px-1">
            <span>
              {t.why.sourcesNote}{' '}
              {SOURCES.map((s, i) => (
                <React.Fragment key={s.url}>
                  {i > 0 && ' · '}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--text-primary)]">{s.name}</a>
                </React.Fragment>
              ))}
            </span>
            <span className="text-accent font-semibold">{isEn ? 'DubInstante = 0 € forever' : 'DubInstante = 0 € à vie'}</span>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* TABLE 2: DUBINSTANTE VS AMATEUR ZERO-DOLLAR METHODS (WITH VOXDUB)         */}
        {/* ========================================================================= */}
        <Reveal className="mb-24 pt-12 border-t border-[var(--border-subtle)]">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md bg-[var(--bg-sunk)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                {isEn ? 'TABLE 2 · VS ZERO-DOLLAR HACKS & FREEMIUM TOOLS' : 'TABLEAU 2 · FACE AUX BRICOLAGES & OUTILS AVEC FILIGRANE'}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text-primary)]">
              {isEn ? 'DubInstante vs. Voxdub, VLC, Aegisub, Premiere & Cappella' : 'DubInstante face à Voxdub, VLC, Aegisub, Premiere & Cappella'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {isEn
                ? 'Popular online tools keep watermark-free export for their paid plan (€99/year), while offline workarounds cause audio desync and crashes. Why settle when DubInstante is 100% free and clean?'
                : 'Les sites de doublage populaires réservent l\'export sans filigrane à leur offre payante (99 €/an), et les bricolages entraînent désynchronisations et plantages. Pourquoi subir cela quand DubInstante est 100% propre et gratuit ?'}
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="font-display font-bold text-xl text-accent">DubInstante</h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-white px-1.5 py-0.5 rounded">
                  {isEn ? 'Clean 0 €' : '0 € Propre'}
                </span>
                <span className="ml-auto text-xs font-mono text-accent font-semibold">{amateurRows.length}/{amateurRows.length} ✓</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {amateurRows.map((r, i) => (
                  <li key={i} className="flex gap-2.5">
                    <Verdict s="g" />
                    <div>
                      <div className="text-xs text-[var(--text-muted)]">{r.label}</div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">{r.dub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              {AMATEUR_TOOLS.map((tool, j) => {
                const score = AMATEUR_STATUS.filter((s) => s[j] === 'g').length;
                return (
                  <div
                    key={tool.key}
                    className="w-full md:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6"
                  >
                    <div className="flex items-start gap-3 mb-5">
                      <div>
                        <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{tool.name}</h3>
                        <div className="text-xs text-[var(--text-muted)]">{isEn ? tool.subEn : tool.subFr}</div>
                      </div>
                      <span className="ml-auto text-xs font-mono text-[var(--text-muted)] font-semibold">{score}/{amateurRows.length} ✓</span>
                    </div>
                    <ul className="space-y-3.5">
                      {amateurRows.map((r, i) => (
                        <li key={i} className="flex gap-2.5">
                          <Verdict s={AMATEUR_STATUS[i][j]} />
                          <div>
                            <div className="text-xs text-[var(--text-muted)]">{r.label}</div>
                            <div className="text-sm text-[var(--text-secondary)]">{r[tool.key]}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] px-1">
            <span>{isEn ? 'Observed in real fandub & indie dubbing communities.' : 'Constaté auprès des communautés de fandub et de doublage indépendant.'}</span>
            <span className="text-accent font-semibold">{isEn ? 'Zero watermark · 100% clean video export' : 'Zéro filigrane · Export vidéo 100% propre'}</span>
          </div>
        </Reveal>
        {/* ========================================================================= */}
        {/* SECTION 3: THE WALL OF WORKAROUND PAIN                                    */}
        {/* ========================================================================= */}
        <div className="mb-24 pt-12 border-t border-[var(--border-subtle)] max-w-6xl mx-auto">
          <Reveal className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                {t.why.wallEyebrow}
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
              {t.why.wallTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t.why.wallSubtitle}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workarounds.map((w, idx) => (
              <Reveal key={idx} delay={idx * 80} className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] scan-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl" aria-hidden>{w.icon}</span>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[var(--bg-sunk)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                      {w.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                    {w.title}
                  </h3>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-sunk)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                    <span className="font-bold text-rec uppercase tracking-wider block mb-1">
                      {isEn ? 'The Struggle:' : 'La galère :'}
                    </span>
                    {w.desc}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-accent/[0.04] border border-accent/20 text-xs text-[var(--text-primary)]">
                  <span className="font-bold text-accent uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[2.5]" />
                    <span>{isEn ? 'DubInstante Solution:' : 'La solution DubInstante :'}</span>
                  </span>
                  {w.fix}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: FREEDOM MANIFESTO & ECONOMIC REALITY                           */}
        {/* ========================================================================= */}
        <Reveal className="mb-24 max-w-6xl mx-auto p-8 sm:p-10 md:p-10 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] relative overflow-hidden">
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

        {/* ========================================================================= */}
        {/* SECTION 5: CALL TO ACTION                                                 */}
        {/* ========================================================================= */}
        <Reveal className="text-center pt-8 border-t border-[var(--border-subtle)]">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)] mb-3">
            {t.why.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto mb-8">
            {t.why.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <DownloadLink
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-[0_0_30px_-8px_rgb(var(--accent-rgb)/0.4)] hover:shadow-[0_0_40px_-6px_rgb(var(--accent-rgb)/0.6)] hover:-translate-y-0.5"
            >
              {(platform) => (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    {platform
                      ? `${t.why.ctaBtn} (${platform.name} · ${CURRENT_VERSION})`
                      : `${t.why.ctaBtn} (${CURRENT_VERSION})`}
                  </span>
                </>
              )}
            </DownloadLink>
            <Link
              to="/features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-sunk)] border border-[var(--border-subtle)] rounded-xl transition-colors"
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
