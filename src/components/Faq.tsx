import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { CURRENT_VERSION } from "../config/downloads";
import type { Language } from "../seo";
import { Reveal, Eyebrow } from "./ui/Primitives";
import { ChevronDown } from "lucide-react";

// Each answer stands on its own (it names the product and states the fact first):
// the same list feeds this section, the FAQPage structured data and llms.txt.
export const FAQ: Record<Language, { q: string; a: string }[]> = {
  fr: [
    {
      q: "Qu’est-ce que DubInstante ?",
      a: "DubInstante est un logiciel libre et gratuit de doublage vidéo et de bande rythmo. Il affiche le texte défilant synchronisé avec l’image, enregistre jusqu’à 4 micros en WAV et exporte la vidéo doublée avec FFmpeg. Il fonctionne hors-ligne, sans compte ni abonnement.",
    },
    {
      q: "Qu’est-ce qu’une bande rythmo ?",
      a: "La bande rythmo est un bandeau de texte qui défile sous l’image, synchronisé avec la vidéo. Le comédien lit chaque syllabe au moment où elle franchit la barre de synchro, ce qui cale sa voix sur le mouvement des lèvres. C’est la méthode de doublage utilisée dans les studios français.",
    },
    {
      q: "DubInstante est-il vraiment gratuit ?",
      a: "Oui. DubInstante est gratuit et open source sous licence EUPL-1.2 : pas d’abonnement, pas de compte, pas de filigrane sur les exports, aucune fonction payante. Le code source est public sur GitHub.",
    },
    {
      q: "Sur quels systèmes fonctionne DubInstante ?",
      a: `DubInstante ${CURRENT_VERSION} est disponible pour Windows 10 et 11 (64 bits) et pour Linux en AppImage : Ubuntu 22.04+, Debian 12+, Mint 21+, ainsi qu’Arch, EndeavourOS et Manjaro. La version macOS est en attente d’une licence développeur Apple, et l’application Android est en cours de réécriture pour la v0.13.`,
    },
    {
      q: "DubInstante fonctionne-t-il hors-ligne ?",
      a: "Oui, entièrement. Vidéos, textes et enregistrements restent sur votre ordinateur : DubInstante n’envoie rien sur un serveur, ne demande aucun compte et ne contient aucune télémétrie.",
    },
    {
      q: "Combien de comédiens peut-on enregistrer en même temps ?",
      a: "Jusqu’à quatre. DubInstante gère de 1 à 4 bandes rythmo et enregistre jusqu’à 4 micros simultanément, chacun sur sa piste en WAV non compressé, avec le choix du micro et du gain par piste.",
    },
    {
      q: "Quels formats vidéo sont pris en charge ?",
      a: "DubInstante ouvre les fichiers MP4, MKV, MOV, AVI, M4V, WebM et MXF. L’export passe par FFmpeg, fourni avec l’application : H.264 et AAC par défaut ; en mode expert, H.265, ProRes, VP9, audio PCM 24 bits ou copie du flux vidéo sans réencodage, en MP4, MKV, MOV ou AVI.",
    },
    {
      q: "Quelle différence avec VoiceQ, Mosaic ou Synchronos ?",
      a: "VoiceQ, Mosaic et Synchronos sont des logiciels propriétaires payants (de 39 $ à 279 $ par mois, ou 3 650 € HT à l’achat pour Mosaic Studio), liés à macOS ou à Windows. DubInstante est gratuit, open source et fonctionne sous Windows et Linux. En revanche, il ne s’intègre pas à Pro Tools ni au matériel broadcast (SDI, LTC, RS422).",
    },
    {
      q: "À qui s’adresse DubInstante ?",
      a: `Aux comédiens de doublage, adaptateurs, étudiants en cinéma ou en son, créateurs de vidéos et petits studios qui veulent une vraie bande rythmo sans licence coûteuse. DubInstante est en bêta publique (${CURRENT_VERSION}), en route vers la version 1.0.`,
    },
  ],
  en: [
    {
      q: "What is DubInstante?",
      a: "DubInstante is free, open-source software for video dubbing with a rythmo band. It scrolls the dialogue in sync with the picture, records up to 4 microphones as WAV and exports the dubbed video with FFmpeg. It runs offline, with no account and no subscription.",
    },
    {
      q: "What is a rythmo band?",
      a: "A rythmo band is a strip of text that scrolls under the picture in sync with the video. The actor reads each syllable as it crosses the sync bar, which lines the voice up with the lip movements. It is the dubbing method used in French studios.",
    },
    {
      q: "Is DubInstante really free?",
      a: "Yes. DubInstante is free and open source under the EUPL-1.2 licence: no subscription, no account, no watermark on exports, no paid feature. The source code is public on GitHub.",
    },
    {
      q: "Which operating systems does DubInstante run on?",
      a: `DubInstante ${CURRENT_VERSION} is available for Windows 10 and 11 (64-bit) and for Linux as an AppImage: Ubuntu 22.04+, Debian 12+, Mint 21+, as well as Arch, EndeavourOS and Manjaro. The macOS version is on hold until an Apple developer licence is obtained, and the Android app is being rewritten for v0.13.`,
    },
    {
      q: "Does DubInstante work offline?",
      a: "Yes, entirely. Videos, scripts and recordings stay on your computer: DubInstante sends nothing to a server, requires no account and contains no telemetry.",
    },
    {
      q: "How many actors can be recorded at the same time?",
      a: "Up to four. DubInstante handles 1 to 4 rythmo bands and records up to 4 microphones at once, each on its own track as uncompressed WAV, with a microphone and gain setting per track.",
    },
    {
      q: "Which video formats are supported?",
      a: "DubInstante opens MP4, MKV, MOV, AVI, M4V, WebM and MXF files. Export goes through FFmpeg, which ships with the app: H.264 and AAC by default; in expert mode, H.265, ProRes, VP9, 24-bit PCM audio or video stream copy without re-encoding, to MP4, MKV, MOV or AVI.",
    },
    {
      q: "How does DubInstante compare with VoiceQ, Mosaic or Synchronos?",
      a: "VoiceQ, Mosaic and Synchronos are paid proprietary products (from $39 to $279 per month, or €3,650 excl. VAT to buy Mosaic Studio), tied to macOS or to Windows. DubInstante is free, open source and runs on Windows and Linux. On the other hand, it does not integrate with Pro Tools or broadcast hardware (SDI, LTC, RS422).",
    },
    {
      q: "Who is DubInstante for?",
      a: `Voice actors, dialogue adapters, film and sound students, video creators and small studios who want a real rythmo band without an expensive licence. DubInstante is in public beta (${CURRENT_VERSION}), on its way to version 1.0.`,
    },
  ],
};

export const Faq: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <Eyebrow className="mb-3">FAQ</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
            {language === "en"
              ? "Frequently asked questions"
              : "Questions fréquentes"}
          </h2>
        </Reveal>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {FAQ[language].map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--text-primary)]">
                  {q}
                </h3>
                <ChevronDown className="w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
