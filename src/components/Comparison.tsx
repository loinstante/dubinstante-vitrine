import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Eyebrow, Halo } from './ui/Primitives';
import { Check, X } from 'lucide-react';

const DUB_FR = [
  'Vos données restent sur votre machine',
  'Pas de DRM, pas de cloud forcé',
  'Transparence totale du code source (EUPL 1.2)',
  'Gratuit, sans abonnement ni compte',
];
const PROPS_FR = [
  'Licences coûteuses à plusieurs centaines d\'€',
  'Serveurs distants lents ou captifs',
  'Obligation de connexion permanente',
  'Formats fermés et propriétaires',
];

const DUB_EN = [
  'Your data stays 100% on your local machine',
  'Zero DRM, zero forced cloud lock-in',
  'Full source code transparency (EUPL 1.2)',
  'Free forever, no accounts, no subscriptions',
];
const PROPS_EN = [
  'Costly licenses running into thousands of $',
  'Laggy and privacy-invasive cloud servers',
  'Mandatory always-online connection',
  'Closed proprietary formats and vendor lock-in',
];

export const Comparison: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const dub = isEn ? DUB_EN : DUB_FR;
  const props = isEn ? PROPS_EN : PROPS_FR;

  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--border-subtle)] overflow-hidden">
      <Halo className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] opacity-40" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow className="mb-3">{isEn ? 'Making the switch' : "L'heure du choix"}</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
            {isEn ? 'Open-Source Modernity ' : 'Modernité Open-Source '}
            <span className="text-[var(--text-muted)]">vs</span>{' '}
            {isEn ? 'Outdated Legacy' : 'Héritage Obsolète'}
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            {isEn
              ? "Until now, you had two choices: struggle with abandoned tools with 2000s interfaces, or invest thousands of dollars in proprietary solutions like VoiceQ, Synchronos, or Nuendo ADR. DubInstante creates the third path."
              : "Jusqu'à aujourd'hui, vous n'aviez que deux options : subir des logiciels gratuits dont l'interface n'a pas évolué depuis les années 2000, ou investir dans des solutions pro à plusieurs centaines voire milliers d'euros comme VoiceQ, Synchronos ou Nuendo ADR. DubInstante incarne la troisième voie."}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DubInstante column */}
          <Reveal className="relative p-7 md:p-8 rounded-2xl border border-accent/30 bg-accent/[0.04] scan-hover">
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-glow-pulse" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                DubInstante
              </h3>
              <span className="ml-auto text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
                {isEn ? '3rd path' : '3e voie'}
              </span>
            </div>
            <ul className="space-y-3">
              {dub.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Proprietary column */}
          <Reveal
            delay={120}
            className="relative p-7 md:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80"
          >
            <div className="flex items-center gap-2 mb-6">
              <X className="w-4 h-4 text-[var(--text-muted)]" />
              <h3 className="font-display font-bold text-lg text-[var(--text-secondary)]">
                {isEn ? 'Proprietary Suites' : 'Solutions propriétaires'}
              </h3>
              <span className="ml-auto text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
                VoiceQ · Synchronos · Nuendo ADR
              </span>
            </div>
            <ul className="space-y-3">
              {props.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <X className="w-4 h-4 text-rec/80 mt-0.5 shrink-0" />
                  <span className="line-through decoration-[var(--text-muted)]/60">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-10 text-center space-y-3">
          <div>
            <Link
              to="/pourquoi"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors px-4 py-2 rounded-xl bg-accent/10 border border-accent/20"
            >
              <span>{isEn ? 'View the full 4-way comparison matrix & alternatives →' : 'Voir le grand comparatif 4 voies & les alternatives →'}</span>
            </Link>
          </div>
          <p className="text-[11px] font-mono text-[var(--text-muted)]">
            {isEn ? 'Prices and features verified in September 2026 for indicative comparison.' : 'Tarifs et fonctionnalités constatés en septembre 2026 à titre indicatif.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
