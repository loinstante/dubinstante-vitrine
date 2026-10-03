import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Play, Pause, ChevronLeft, ChevronRight, Monitor, PlayCircle } from 'lucide-react';
import { Reveal, Eyebrow, Halo } from './ui/Primitives';

interface Syllable {
  text: string;
  width: number;
}

const SAMPLE_TEXT_FR: Syllable[] = [
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

const SAMPLE_TEXT_EN: Syllable[] = [
  { text: "«", width: 25 },
  { text: "Good", width: 50 },
  { text: "mor", width: 45 },
  { text: "ning,", width: 65 },
  { text: "de", width: 35 },
  { text: "tec", width: 40 },
  { text: "tive.", width: 65 },
  { text: "What", width: 55 },
  { text: "hap", width: 45 },
  { text: "pened", width: 60 },
  { text: "in", width: 30 },
  { text: "here ?", width: 65 },
  { text: "»", width: 25 },
  { text: "[pause]", width: 80 },
  { text: "«", width: 25 },
  { text: "Look", width: 45 },
  { text: "at", width: 30 },
  { text: "the", width: 35 },
  { text: "screen,", width: 70 },
  { text: "the", width: 35 },
  { text: "lip", width: 40 },
  { text: "sync", width: 50 },
  { text: "is", width: 30 },
  { text: "spot", width: 45 },
  { text: "on !", width: 50 },
  { text: "»", width: 25 },
];

const TOTAL_TRACK_WIDTH = 2000;

export const StudioPreview: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const sampleText = language === 'en' ? SAMPLE_TEXT_EN : SAMPLE_TEXT_FR;

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
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div
            role="tablist"
            aria-label={language === 'en' ? 'Studio preview display mode' : 'Mode d\'affichage de l\'aperçu studio'}
            className="inline-flex p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-medium"
          >
            <button
              id="tab-screenshot"
              role="tab"
              aria-selected={activeTab === 'screenshot'}
              aria-controls="panel-screenshot"
              onClick={() => setActiveTab('screenshot')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-colors ${
                activeTab === 'screenshot'
                  ? 'bg-accent text-white font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{t.preview.tabScreenshot}</span>
            </button>
            <button
              id="tab-simulator"
              role="tab"
              aria-selected={activeTab === 'simulator'}
              aria-controls="panel-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-accent text-white font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>{t.preview.tabSimulator}</span>
            </button>
          </div>
        </Reveal>

        {/* Display Container */}
        <div className="max-w-6xl mx-auto">
        {activeTab === 'screenshot' ? (
          <Reveal id="panel-screenshot" role="tabpanel" aria-labelledby="tab-screenshot">
            <div className="rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-ink shadow-2xl shadow-black/25 dark:shadow-black/70">
              <img
                src={isDark ? '/assets/dubinstante-studio-real.png' : '/assets/dubinstante-studio-white.png'}
                alt={language === 'en' ? 'DubInstante Studio native interface with video player, 60 FPS rythmo band and 4-track discrete microphone meters' : 'Interface native de DubInstante avec lecteur vidéo, bande rythmo 60 FPS et vumètres 4 micros distincts'}
                className="w-full h-auto block"
              />
            </div>
            <p className="mt-3 text-center text-xs font-mono text-[var(--text-muted)]">
              {t.preview.screenshotCaption}
            </p>
          </Reveal>
        ) : (
          <div id="panel-simulator" role="tabpanel" aria-labelledby="tab-simulator">
            <div
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label={language === 'en' ? 'Interactive Rythmo Band Simulator. Press Space to play/pause, left and right arrows to step frame by frame.' : 'Simulateur interactif de bande rythmo. Appuyez sur Espace pour lancer/pause, flèches gauche et droite pour avancer image par image.'}
              className="rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-ink focus:outline-none focus:ring-1 focus:ring-accent/50 shadow-2xl shadow-black/25 dark:shadow-black/70 animate-fade-up"
            >
              {/* Video Stage */}
              <div className="relative aspect-[16/9] max-h-[380px] w-full flex flex-col justify-end overflow-hidden bg-black">
                {/* Play overlay if paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <button
                      onClick={togglePlay}
                      className="pointer-events-auto w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-accent/40"
                      aria-label={t.preview.play}
                    >
                      <Play className="w-6 h-6 fill-white translate-x-0.5" />
                    </button>
                  </div>
                )}

                {/* Status indicator */}
                <div className="absolute top-3 left-3 z-10 text-[11px] font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded">
                  {language === 'en' ? '4K Video · 60 FPS OpenGL Render' : 'Vidéo 4K · Rendu OpenGL 60 FPS'}
                </div>

                {/* The Rythmo Band at bottom */}
                <div className="relative w-full h-12 bg-[#141416] border-t border-accent/40 overflow-hidden select-none">
                  {/* Red sync cursor at 20% width (matches app exactly) */}
                  <div className="absolute top-0 bottom-0 left-[20%] w-[2px] bg-rec z-30 pointer-events-none">
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 border-solid border-t-[7px] border-t-rec border-x-[4px] border-x-transparent"></div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-[9px] font-mono text-white font-bold whitespace-nowrap">
                      <span ref={timecodePillRef}>00:00.000</span>
                    </div>
                  </div>

                  {/* Horizontal middle line */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-rec/70 pointer-events-none"></div>

                  {/* Scrolling syllables */}
                  <div
                    ref={trackRef}
                    className="absolute left-[20%] top-0 bottom-0 flex items-center will-change-transform text-white font-mono font-bold text-sm tracking-wider"
                    style={{ transform: 'translate3d(0px, 0, 0)' }}
                  >
                    {sampleText.map((syl, idx) => (
                      <span
                        key={idx}
                        style={{ width: `${syl.width}px` }}
                        className={`inline-block text-center whitespace-nowrap ${
                          syl.text === '[pause]' ? 'text-[#8a8a9a] font-normal italic text-xs' : 'text-white'
                        }`}
                      >
                        {syl.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Scrub Slider */}
              <div className="bg-[var(--bg-sunk)] px-4 py-1.5 border-t border-[var(--border-subtle)]">
                <input
                  ref={scrubSliderRef}
                  type="range"
                  min={0}
                  max={TOTAL_TRACK_WIDTH}
                  defaultValue={0}
                  onChange={handleScrub}
                  className="w-full h-1 bg-[var(--border-strong)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                  aria-label={t.preview.scrubLabel}
                />
              </div>

              {/* Clean Minimal Controls Bar - matches QSS controlBar */}
              <div className="bg-[var(--bg-surface)] text-[var(--text-primary)] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => stepFrame(-10)}
                    className="p-1.5 rounded bg-[var(--bg-sunk)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    title={t.preview.prevFrame}
                    aria-label={t.preview.prevFrame}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-accent hover:bg-accent-hover text-white font-bold tracking-wider uppercase transition-colors shadow-sm"
                    aria-label={isPlaying ? t.preview.pause : t.preview.play}
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
                    className="p-1.5 rounded bg-[var(--bg-sunk)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    title={t.preview.nextFrame}
                    aria-label={t.preview.nextFrame}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <span ref={timecodeCounterRef} className="ml-2 text-[var(--text-secondary)] font-bold">
                    00:00 / 00:20
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <span>{speedPercent}%</span>
                  <button
                    onClick={() => setSpeedPercent((p) => Math.max(50, p - 10))}
                    className="px-2 py-0.5 rounded bg-[var(--bg-sunk)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
                    aria-label={t.preview.slowerSpeed}
                  >
                    -
                  </button>
                  <button
                    onClick={() => setSpeedPercent((p) => Math.min(150, p + 10))}
                    className="px-2 py-0.5 rounded bg-[var(--bg-sunk)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
                    aria-label={t.preview.fasterSpeed}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-[var(--bg-sunk)] px-4 py-2 border-t border-[var(--border-subtle)] text-center text-[11px] font-mono text-[var(--text-muted)]">
                {t.preview.shortcutHint}
              </div>
            </div>

            {/* Disclaimer under simulator */}
            <p className="mt-3 text-center text-xs text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              {t.preview.simDisclaimer}
            </p>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};
