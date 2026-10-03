import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, Eyebrow, TimecodeWatermark } from "./ui/Primitives";

interface Persona {
  icon: string;
  title: string;
  pain: string;
  gain: string;
  tag: string;
  to: string;
}

const AUDIENCES_FR: Persona[] = [
  {
    icon: "🌿",
    title: "Débutants",
    pain: "Je découvre le doublage, je ne sais pas par où commencer.",
    gain: "Une vraie bande rythmo prête à l’emploi : on ouvre une vidéo, on joue. Aucune configuration.",
    tag: "Bande rythmo",
    to: "/features",
  },
  {
    icon: "🎬",
    title: "Créateurs YouTube & podcasts",
    pain: "Je veux doubler mes vidéos sans abonnement ni filigrane.",
    gain: "Export vidéo propre via FFmpeg, sans compte et sans cloud. Vos rushs restent sur votre machine.",
    tag: "Export sans filigrane",
    to: "/pourquoi",
  },
  {
    icon: "✍️",
    title: "Traducteurs & adaptateurs",
    pain: "Je dois caler mon texte au mot près sur l’image.",
    gain: "Vitesse de lecture réglable de 1 % à 400 % pour analyser le débit et ajuster chaque réplique.",
    tag: "Vitesse 1–400 %",
    to: "/features",
  },
  {
    icon: "🎓",
    title: "Étudiants cinéma & son",
    pain: "Je n’ai pas le budget d’une suite professionnelle.",
    gain: "Gratuit, open source (EUPL-1.2) et un format .dbi ouvert, lisible à vie. Un outil pour apprendre.",
    tag: "Libre & .dbi",
    to: "/pourquoi",
  },
  {
    icon: "🏢",
    title: "Petits studios",
    pain: "Il me faut du multi-micro fiable, sans licence ni dongle.",
    gain: "Jusqu’à 4 micros enregistrés sans dérive audio, 100 % hors-ligne, sur Linux, Windows et macOS.",
    tag: "4 micros",
    to: "/features",
  },
];

const AUDIENCES_EN: Persona[] = [
  {
    icon: "🌿",
    title: "Beginners",
    pain: "I’m new to dubbing and don’t know where to start.",
    gain: "A real rythmo band, ready to use: open a video and perform. No setup.",
    tag: "Rythmo band",
    to: "/features",
  },
  {
    icon: "🎬",
    title: "YouTube creators & podcasters",
    pain: "I want to dub my videos without a subscription or watermark.",
    gain: "Clean FFmpeg video export, no account, no cloud. Your footage never leaves your machine.",
    tag: "Watermark-free export",
    to: "/pourquoi",
  },
  {
    icon: "✍️",
    title: "Translators & adaptors",
    pain: "I need to fit my script to the picture, word by word.",
    gain: "Playback speed from 1% to 400% to analyse the pace and fine-tune every line.",
    tag: "Speed 1–400%",
    to: "/features",
  },
  {
    icon: "🎓",
    title: "Film & sound students",
    pain: "I can’t afford a professional suite.",
    gain: "Free, open source (EUPL-1.2) and an open .dbi format that stays readable for life. A tool to learn with.",
    tag: "Open & .dbi",
    to: "/pourquoi",
  },
  {
    icon: "🏢",
    title: "Indie studios",
    pain: "I need reliable multi-mic recording, with no licence or dongle.",
    gain: "Up to 4 mics recorded without audio drift, 100% offline, on Linux, Windows and macOS.",
    tag: "4 mics",
    to: "/features",
  },
];

export const Audience: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const audiences = isEn ? AUDIENCES_EN : AUDIENCES_FR;

  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--border-subtle)]">
      <TimecodeWatermark
        timecode="00:01:24:12"
        className="hidden 2xl:block absolute top-8 right-8 text-5xl font-bold"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-14 mx-auto text-center">
          <Eyebrow className="mb-3">
            {isEn ? "Target Audience" : "Pour qui ?"}
          </Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance text-[var(--text-primary)]">
            {isEn
              ? "From indie creators to recording studios."
              : "De l'amateur au studio."}
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed text-balance">
            {isEn
              ? "Whatever your starting point, here is what DubInstante changes for you."
              : "Quel que soit votre point de départ, voici ce que DubInstante change pour vous."}
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-5">
          {audiences.map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 80}
              className="group w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-accent/50 transition-colors scan-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-lg"
                  aria-hidden
                >
                  {a.icon}
                </span>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  {a.title}
                </h3>
              </div>
              <p className="text-sm italic text-[var(--text-muted)] leading-relaxed mb-3">
                « {a.pain} »
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                {a.gain}
              </p>
              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                  {a.tag}
                </span>
                <Link
                  to={a.to}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] group-hover:text-accent transition-colors"
                >
                  {isEn ? "Learn more" : "En savoir plus"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
