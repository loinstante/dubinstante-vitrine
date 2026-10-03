import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Halo } from './ui/Primitives';
import { Check, X, AlertTriangle, Building2, Wrench, ArrowRight } from 'lucide-react';

interface BulletPoint {
  strong: string;
  detail: string;
}

interface ColumnData {
  badge: string;
  title: string;
  examples: string;
  price: string;
  pricePeriod?: string;
  priceSub: string;
  points: BulletPoint[];
  footerNote: string;
}

interface ComparisonData {
  eyebrow: string;
  title: string;
  subtitle: string;
  corpo: ColumnData;
  dub: ColumnData;
  free: ColumnData;
  linkText: string;
  disclaimer: string;
}

const DATA_FR: ComparisonData = {
  eyebrow: 'La Troisième Voie',
  title: 'Pourquoi payer 300 € / mois ou subir des outils cassés ?',
  subtitle:
    'Dans le doublage, vous étiez coincé entre deux extrêmes : la rente mensuelle de logiciels fermés, ou l\'enfer de logiciels abandonnés. DubInstante a été créé pour offrir le standard studio avec une liberté absolue.',
  corpo: {
    badge: '50 € à 280 € / mois',
    title: 'Suites Big Corpo',
    examples: 'VoiceQ Pro · Noblurway Mosaic · Synchronos',
    price: '50 € – 280 €',
    pricePeriod: '/ mois',
    priceSub: 'ou jusqu\'à 3 650 € d\'achat + clé matérielle',
    points: [
      {
        strong: 'Abonnements exorbitants',
        detail: 'de 39 $/mois (Writer) à 279 $/mois (VoiceQ Pro Studio).',
      },
      {
        strong: 'Dongle USB obligatoire',
        detail: 'clés physiques iLok ou Noblurway et contrôle permanent.',
      },
      {
        strong: 'Verrouillage d\'OS',
        detail: 'enfermé exclusivement sur macOS ou exclusivement sur Windows.',
      },
      {
        strong: 'Formats fermés',
        detail: 'vos projets et traductions restent captifs de leur écosystème.',
      },
      {
        strong: 'Rente perpétuelle',
        detail: 'obligation de payer chaque mois pour rouvrir vos anciens fichiers.',
      },
    ],
    footerNote: 'Formats propriétaires captifs & dongles obligatoires',
  },
  dub: {
    badge: 'La 3e Voie · Recommandé',
    title: 'DubInstante',
    examples: 'Studio Rythmo & Doublage Libre',
    price: '0 €',
    pricePeriod: 'à vie',
    priceSub: '100% Libre & Gratuit (licence EUPL 1.2)',
    points: [
      {
        strong: 'Zéro barrière financière',
        detail: 'sans abonnement, sans compte cloud, sans aucun DRM.',
      },
      {
        strong: 'Bande rythmo native 60 FPS',
        detail: 'défilement fluide au centième de frame (moteur C++ / OpenGL).',
      },
      {
        strong: 'Enregistrement multipiste',
        detail: 'jusqu\'à 4 micros simultanés sans aucune dérive audio.',
      },
      {
        strong: 'Moteur vidéo moderne',
        detail: 'support natif MP4, MKV, ProRes, H.264/H.265 et 4K (FFmpeg).',
      },
      {
        strong: '100% Local & Hors-ligne',
        detail: 'vos rushs et voix restent strictement sur votre machine.',
      },
      {
        strong: 'Vraiment multiplateforme',
        detail: 'fonctionne nativement sur Windows, macOS, Linux et Android.',
      },
    ],
    footerNote: '100% Libre & Gratuit · Zéro compromis technique',
  },
  free: {
    badge: '« Gratuit » mais laborieux',
    title: 'Freewares Délaissés & Hacks',
    examples: 'Voxdub (filigrane) · Cappella · Détours Aegisub · VLC',
    price: '0 €',
    pricePeriod: 'en apparence',
    priceSub: 'mais payé cher en temps perdu et frustration',
    points: [
      {
        strong: 'Filigrane imposé',
        detail: 'outils web type Voxdub avec filigrane obligatoire (ou 99 €/an).',
      },
      {
        strong: 'Abandonwares figés',
        detail: 'outils des années 2000 (Cappella) bloqués sur de vieux Windows.',
      },
      {
        strong: 'Dérive audio inévitable',
        detail: 'désynchronisation au bout de 2 minutes sous VLC + Audacity.',
      },
      {
        strong: 'Codecs non supportés',
        detail: 'plantages fréquents sur les vidéos modernes (MP4, MKV récents).',
      },
      {
        strong: 'Calage manuel épuisant',
        detail: 'des heures perdues à animer des sous-titres dans Premiere.',
      },
    ],
    footerNote: 'Filigranes imposés, dérive audio & heures perdues',
  },
  linkText: 'Consulter les deux grands tableaux comparatifs →',
  disclaimer:
    'Tarifs et fonctionnalités constatés en 2026 à titre indicatif (VoiceQ Pro, Noblurway Mosaic Studio, Synchronos).',
};

const DATA_EN: ComparisonData = {
  eyebrow: 'The Third Choice',
  title: 'Why Pay $300 / mo or Suffer Broken Tools?',
  subtitle:
    'In dubbing, you were stuck between two extremes: paying recurring corporate subscriptions, or struggling with abandoned 2000s software. DubInstante was built to provide the studio standard with total freedom.',
  corpo: {
    badge: '$50 to $280 / month',
    title: 'Big Corpo Suites',
    examples: 'VoiceQ Pro · Noblurway Mosaic · Synchronos',
    price: '$50 – $280',
    pricePeriod: '/ month',
    priceSub: 'or up to $3,650 upfront + hardware dongle',
    points: [
      {
        strong: 'Steep recurring costs',
        detail: 'from $39/mo (Writer) up to $279/mo (VoiceQ Pro Studio).',
      },
      {
        strong: 'Mandatory USB dongles',
        detail: 'hardware iLok or Noblurway keys and strict DRM check-ins.',
      },
      {
        strong: 'OS lock-in',
        detail: 'exclusively locked to either macOS or Windows only.',
      },
      {
        strong: 'Closed formats',
        detail: 'your translation projects remain trapped in proprietary files.',
      },
      {
        strong: 'Continuous rent',
        detail: 'stop paying and you lose access to reopen your own past projects.',
      },
    ],
    footerNote: 'Vendor lock-in & mandatory hardware dongles',
  },
  dub: {
    badge: 'The 3rd Choice · Recommended',
    title: 'DubInstante',
    examples: 'Open-Source Studio Suite (EUPL 1.2)',
    price: '$0',
    pricePeriod: 'forever',
    priceSub: '100% Free & Open-Source (EUPL 1.2 license)',
    points: [
      {
        strong: 'Zero financial barrier',
        detail: 'no subscriptions, no cloud accounts, zero hardware DRM.',
      },
      {
        strong: 'Native 60 FPS rythmo band',
        detail: 'frame-accurate smooth scrolling powered by C++ and OpenGL.',
      },
      {
        strong: 'Multi-track studio recording',
        detail: 'up to 4 microphones synchronized with zero audio drift.',
      },
      {
        strong: 'Modern video engine',
        detail: 'native support for MP4, MKV, ProRes, H.264/H.265 and 4K (FFmpeg).',
      },
      {
        strong: '100% Local & Offline',
        detail: 'your client rushes and vocal takes remain strictly on your drive.',
      },
      {
        strong: 'True cross-platform',
        detail: 'runs natively on Windows, macOS, Linux, and Android.',
      },
    ],
    footerNote: '100% Free & Open-Source · Zero technical compromise',
  },
  free: {
    badge: 'Free but Painful',
    title: 'Broken Freeware & Hacks',
    examples: 'Voxdub (watermark) · Cappella · Aegisub Hacks · VLC',
    price: '$0',
    pricePeriod: 'upfront',
    priceSub: 'heavy cost in wasted time and vocal desync',
    points: [
      {
        strong: 'Forced watermark',
        detail: 'freemium web tools like Voxdub requiring $99/yr to remove.',
      },
      {
        strong: 'Stuck in the 2000s',
        detail: 'abandonware like Cappella locked to legacy Windows XP/7.',
      },
      {
        strong: 'Severe audio drift',
        detail: 'audio and video fall out of sync after 2 minutes in VLC + Audacity.',
      },
      {
        strong: 'Unsupported codecs',
        detail: 'frequent crashes on modern MP4, MKV, and ProRes video files.',
      },
      {
        strong: 'Exhausting manual workarounds',
        detail: 'hours lost animating subtitle keyframes inside Premiere or DaVinci.',
      },
    ],
    footerNote: 'Forced watermarks, audio drift & wasted hours',
  },
  linkText: 'View the full dual comparison tables →',
  disclaimer:
    'Prices and features verified in 2026 for indicative comparison (VoiceQ Pro, Noblurway Mosaic Studio, Synchronos).',
};

export const Comparison: React.FC = () => {
  const { language } = useLanguage();
  const d = language === 'en' ? DATA_EN : DATA_FR;

  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--border-subtle)] overflow-hidden">
      <Halo className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] opacity-25" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with calm, high-contrast typography */}
        <Reveal className="max-w-3xl mb-16 text-center mx-auto">
          <Eyebrow className="mb-3 text-accent font-semibold">{d.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
            {d.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed text-balance">
            {d.subtitle}
          </p>
        </Reveal>

        {/* 3-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* 1. LEFT COLUMN: BIG CORPO */}
          <Reveal
            delay={80}
            className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-sunk)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {d.corpo.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-sunk)] border border-[var(--border-subtle)] px-2 py-0.5 rounded">
                  {d.corpo.badge}
                </span>
              </div>

              {/* Price & Target */}
              <div className="mb-6 pb-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-3xl text-[var(--text-primary)]">
                    {d.corpo.price}
                  </span>
                  {d.corpo.pricePeriod && (
                    <span className="text-sm font-sans text-[var(--text-muted)]">
                      {d.corpo.pricePeriod}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  {d.corpo.priceSub}
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-2.5">
                  {d.corpo.examples}
                </div>
              </div>

              {/* Clear scannable pain points */}
              <ul className="space-y-3.5">
                {d.corpo.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <X className="w-4 h-4 text-rec/70 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[var(--text-primary)]">
                        {pt.strong}
                      </strong>{' '}
                      <span className="text-[var(--text-secondary)]">
                        {pt.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] text-center">
              {d.corpo.footerNote}
            </div>
          </Reveal>

          {/* 2. MIDDLE COLUMN: DUBINSTANTE (HERO / 3RD CHOICE) */}
          <Reveal
            delay={0}
            className="p-6 sm:p-7 rounded-2xl border-2 border-accent/40 bg-[var(--bg-surface)] shadow-lg shadow-accent/5 ring-1 ring-accent/20 flex flex-col justify-between lg:-translate-y-2 relative"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-glow-pulse" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-[var(--text-primary)]">
                    {d.dub.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/25 px-2.5 py-0.5 rounded-full">
                  {d.dub.badge}
                </span>
              </div>

              {/* Price & Target */}
              <div className="mb-6 pb-5 border-b border-accent/20">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-accent">
                    {d.dub.price}
                  </span>
                  {d.dub.pricePeriod && (
                    <span className="text-sm font-mono font-semibold text-accent/90">
                      {d.dub.pricePeriod}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] font-medium mt-1">
                  {d.dub.priceSub}
                </div>
                <div className="text-xs font-mono text-accent font-semibold mt-2.5">
                  {d.dub.examples}
                </div>
              </div>

              {/* Clear scannable strengths */}
              <ul className="space-y-3.5">
                {d.dub.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>
                      <strong className="font-semibold text-[var(--text-primary)]">
                        {pt.strong}
                      </strong>{' '}
                      <span className="text-[var(--text-secondary)]">
                        {pt.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-accent/20 text-xs font-mono font-semibold text-accent text-center">
              {d.dub.footerNote}
            </div>
          </Reveal>

          {/* 3. RIGHT COLUMN: BROKEN FREEWARE & HACKS */}
          <Reveal
            delay={140}
            className="p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-sunk)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {d.free.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-sunk)] border border-[var(--border-subtle)] px-2 py-0.5 rounded">
                  {d.free.badge}
                </span>
              </div>

              {/* Price & Target */}
              <div className="mb-6 pb-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-3xl text-[var(--text-primary)]">
                    {d.free.price}
                  </span>
                  {d.free.pricePeriod && (
                    <span className="text-sm font-sans text-[var(--text-muted)]">
                      {d.free.pricePeriod}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  {d.free.priceSub}
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-2.5">
                  {d.free.examples}
                </div>
              </div>

              {/* Clear scannable pain points */}
              <ul className="space-y-3.5">
                {d.free.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                    <AlertTriangle className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[var(--text-primary)]">
                        {pt.strong}
                      </strong>{' '}
                      <span className="text-[var(--text-secondary)]">
                        {pt.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] text-center">
              {d.free.footerNote}
            </div>
          </Reveal>
        </div>

        {/* Bottom Call to Action and Disclaimer */}
        <Reveal className="mt-12 text-center space-y-3">
          <div>
            <Link
              to="/pourquoi"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/25 hover:bg-accent/15"
            >
              <span>{d.linkText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[11px] font-mono text-[var(--text-muted)]">
            {d.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
