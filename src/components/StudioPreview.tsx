import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Play, Pause, ChevronLeft, ChevronRight, Monitor, PlayCircle } from 'lucide-react';
import { Reveal, Eyebrow, Halo } from './ui/Primitives';

interface Syllable {
  text: string;
  width: number;
}

const SAMPLE_TEXT: Syllable[] = [
  { text: "«", width: 25 },
  { text: "Bon", width: 45 },
  { text: "jour,", width: 65 },
  { text: "ins", width: 45 },
  { text: "pec", width: 45 },
  { text: "teur.", width: 70 },
  { text: "Que", width: 50 },
  { text: "s'est-il", width: 85 },
  { text: "pas", width: 45 },
  { text: "sé", width: 45 },
  { text: "i", width: 30 },
  { text: "ci ?", width: 55 },
  { text: "»", width: 25 },
  { text: "[pause]", width: 80 },
  { text: "«", width: 25 },
  { text: "Re", width: 40 },
  { text: "gar", width: 45 },
  { text: "dez", width: 45 },
  { text: "l'é", width: 40 },
  { text: "cran,", width: 70 },
  { text: "la", width: 35 },
  { text: "syn", width: 50 },
  { text: "chro", width: 60 },
  { text: "est", width: 45 },
  { text: "par", width: 45 },
  { text: "fai", width: 45 },
  { text: "te !", width: 65 },
  { text: "»", width: 25 },
];

const TOTAL_TRACK_WIDTH = 2000;

export const StudioPreview: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<'screenshot' | 'simulator'>('screenshot');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedPercent, setSpeedPercent] = useState<number>(100);

  const trackRef = useRef<HTMLDivElement>(null);
  const timecodePillRef = useRef<HTMLSpanElement>(null);
  const timecodeCounterRef = useRef<HTMLSpanElement>(null);
  const scrubSliderRef = useRef<HTMLInputElement>(null);

  const positionRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  isPlayingRef.current = isPlaying;

  const formatTimecode = (pos: number) => {
    const totalMs = Math.floor(pos * 10);
    const ms = totalMs % 1000;
    const totalSecs = Math.floor(totalMs / 1000);
    const secs = totalSecs % 60;
    const mins = Math.floor(totalSecs / 60);
    const pad2 = (n: number) => n.toString().padStart(2, '0');
    const pad3 = (n: number) => n.toString().padStart(3, '0');
    return `${pad2(mins)}:${pad2(secs)}.${pad3(ms)}`;
  };

  const formatFullTimecode = (pos: number) => {
    const totalMs = Math.floor(pos * 10);
    const totalSecs = Math.floor(totalMs / 1000);
    const secs = totalSecs % 60;
    const mins = Math.floor(totalSecs / 60);
    const pad2 = (n: number) => n.toString().padStart(2, '0');
    return `${pad2(mins)}:${pad2(secs)} / 00:20`;
  };

  const renderFrame = useCallback((pos: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-pos}px, 0, 0)`;
    }
    if (timecodePillRef.current) {
      timecodePillRef.current.textContent = formatTimecode(pos);
    }
    if (timecodeCounterRef.current) {
      timecodeCounterRef.current.textContent = formatFullTimecode(pos);
    }
    if (scrubSliderRef.current) {
      scrubSliderRef.current.value = pos.toString();
    }
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (isPlayingRef.current) {
        if (lastTimeRef.current !== null) {
          const delta = (time - lastTimeRef.current) / 1000;
          const speedMultiplier = speedPercent / 100;
          positionRef.current += 110 * speedMultiplier * delta;

          if (positionRef.current >= TOTAL_TRACK_WIDTH - 200) {
            positionRef.current = 0;
          }

          renderFrame(positionRef.current);
        }
        lastTimeRef.current = time;
        animFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        lastTimeRef.current = null;
      }
    };

    if (isPlaying) {
      animFrameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying, speedPercent, renderFrame]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const stepFrame = (deltaPixels: number) => {
    setIsPlaying(false);
    positionRef.current = Math.max(0, Math.min(TOTAL_TRACK_WIDTH, positionRef.current + deltaPixels));
    renderFrame(positionRef.current);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    positionRef.current = val;
    renderFrame(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      stepFrame(-10);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      stepFrame(10);
    }
  };

  const isDark = theme === 'dark';

  return (
    <section id="preview" className="relative py-24 md:py-32 border-t border-[var(--border-subtle)] overflow-hidden">
      <Halo className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <Eyebrow className="mb-2">{t.preview.eyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {t.preview.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.preview.subtitle}
          </p>
        </Reveal>

        {/* Tab switch */}
        <Reveal className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-medium">
            <button
              onClick={() => setActiveTab('screenshot')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-colors ${
                activeTab === 'screenshot'
                  ? 'bg-accent text-ink font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{t.preview.tabScreenshot}</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-accent text-ink font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>{t.preview.tabSimulator}</span>
            </button>
          </div>
        </Reveal>

        {/* Display Container */}
        {activeTab === 'screenshot' ? (
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-ink shadow-[0_0_60px_-20px_rgba(255,176,32,0.4)]">
              <img
                src={isDark ? '/assets/dubinstante-studio-real.png' : '/assets/dubinstante-studio-white.png'}
                alt="DubInstante Studio Screenshot"
                className="w-full h-auto block"
              />
            </div>
            <p className="mt-3 text-center text-xs font-mono text-[var(--text-muted)]">
              {t.preview.screenshotCaption}
            </p>
          </Reveal>
        ) : (
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-ink focus:outline-none focus:ring-1 focus:ring-accent/50 shadow-[0_0_60px_-20px_rgba(255,176,32,0.4)] animate-fade-up"
          >
            {/* Video Stage */}
            <div className="relative aspect-[16/9] max-h-[380px] w-full flex flex-col justify-end overflow-hidden bg-[#060608]">
              {/* Play overlay if paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <button
                    onClick={togglePlay}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-[#FFB020] hover:bg-[#FFC24A] text-ink flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                    aria-label="Lancer la lecture"
                  >
                    <Play className="w-6 h-6 fill-ink translate-x-0.5" />
                  </button>
                </div>
              )}

              {/* Status indicator */}
              <div className="absolute top-3 left-3 z-10 text-[11px] font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded">
                Vidéo 4K · Rendu OpenGL 60 FPS
              </div>

              {/* The Rythmo Band at bottom */}
              <div className="relative w-full h-12 bg-[#121218] border-t border-[#FFB020] overflow-hidden select-none">
                {/* Violet sync cursor at 20% width (matches app exactly) */}
                <div className="absolute top-0 bottom-0 left-[20%] w-[2px] bg-[#FF3B3B] z-30 pointer-events-none">
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 border-solid border-t-[7px] border-t-[#FF3B3B] border-x-[4px] border-x-transparent"></div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-[9px] font-mono text-white font-bold whitespace-nowrap">
                    <span ref={timecodePillRef}>00:00.000</span>
                  </div>
                </div>

                {/* Horizontal middle line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#FF3B3B] pointer-events-none"></div>

                {/* Scrolling syllables */}
                <div
                  ref={trackRef}
                  className="absolute left-[20%] top-0 bottom-0 flex items-center will-change-transform text-white font-mono font-bold text-sm tracking-wider"
                  style={{ transform: 'translate3d(0px, 0, 0)' }}
                >
                  {SAMPLE_TEXT.map((syl, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${syl.width}px` }}
                      className={`inline-block text-center whitespace-nowrap ${
                        syl.text === '[pause]' ? 'text-[#6a6a7c] font-normal italic text-xs' : 'text-white'
                      }`}
                    >
                      {syl.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Scrub Slider */}
            <div className="bg-[#121218] px-4 py-1.5 border-t border-white/[0.08]">
              <input
                ref={scrubSliderRef}
                type="range"
                min={0}
                max={TOTAL_TRACK_WIDTH}
                defaultValue={0}
                onChange={handleScrub}
                className="w-full h-1 bg-[#22222e] rounded-lg appearance-none cursor-pointer accent-[#FFB020]"
                aria-label="Position dans la session"
              />
            </div>

            {/* Clean Minimal Controls Bar */}
            <div className="bg-[#181822] text-[#f3f3f6] px-4 py-3 flex items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => stepFrame(-10)}
                  className="p-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
                  title="Image précédente (-1 frame)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFB020] hover:bg-[#FFC24A] text-ink font-bold tracking-wider uppercase transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>{t.preview.pause}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>{t.preview.play}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => stepFrame(10)}
                  className="p-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
                  title="Image suivante (+1 frame)"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <span ref={timecodeCounterRef} className="ml-2 text-white/70">
                  00:00 / 00:20
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/60">
                <span>{speedPercent}%</span>
                <button
                  onClick={() => setSpeedPercent((p) => Math.max(50, p - 10))}
                  className="px-1.5 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  -
                </button>
                <button
                  onClick={() => setSpeedPercent((p) => Math.min(150, p + 10))}
                  className="px-1.5 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-[#121218] px-4 py-2 border-t border-white/[0.06] text-center text-[11px] font-mono text-[#7a7a85]">
              {t.preview.shortcutHint}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
