import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  CURRENT_VERSION,
  detectClientOS,
  DOWNLOAD_PLATFORMS,
  GITHUB_RELEASES_URL,
  GITHUB_REPO_URL,
} from '../config/downloads';
import { Apple, Monitor, Terminal, Smartphone, Download, ExternalLink, Info } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const DownloadHub: React.FC = () => {
  const { t } = useLanguage();
  const detectedOS = detectClientOS();
  const platforms = Object.values(DOWNLOAD_PLATFORMS);

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'mac':
        return <Apple className="w-5 h-5" />;
      case 'windows':
        return <Monitor className="w-5 h-5" />;
      case 'linux':
        return <Terminal className="w-5 h-5" />;
      case 'android':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  return (
    <section id="download" className="py-20 md:py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono font-medium text-[#7a7a85] dark:text-[#8a8a9e] uppercase tracking-wider mb-2">
            {t.download.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121217] dark:text-[#f3f3f6]">
            {t.download.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed">
            {t.download.subtitle}
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((p) => {
            const isDetected = p.id === detectedOS;
            return (
              <div
                key={p.id}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                  isDetected
                    ? 'border-[#7c3aed]/30 dark:border-[#926bff]/30 bg-[#7c3aed]/[0.02] dark:bg-[#926bff]/[0.03]'
                    : 'border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#121217] dark:text-[#f3f3f6]">
                      {getPlatformIcon(p.id)}
                    </span>
                    {isDetected && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#7c3aed]/10 text-[#7c3aed] dark:text-[#a382ff]">
                        Votre OS
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#121217] dark:text-[#f3f3f6]">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#5a5a68] dark:text-[#9e9eb0] mt-0.5">
                    {p.osName}
                  </p>

                  <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.04] text-[11px] font-mono text-[#7a7a85] dark:text-[#8a8a9e] space-y-1">
                    <div>Fichier : {p.fileExt} ({p.size})</div>
                    <div className="line-clamp-2 text-[10px] text-[#7a7a85] dark:text-[#8a8a9e]">
                      {p.requirements}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={p.url}
                    className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isDetected
                        ? 'bg-[#7c3aed] hover:bg-[#6d28d9] dark:bg-[#8250df] dark:hover:bg-[#926bff] text-white'
                        : 'bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.12] text-[#121217] dark:text-[#f3f3f6]'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.download.btnDownload} ({CURRENT_VERSION})</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Installation helper tips */}
        <div className="mt-8 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] text-xs text-[#5a5a68] dark:text-[#9e9eb0] space-y-1.5 font-mono">
          <div className="flex items-center gap-1.5 font-sans font-semibold text-[#121217] dark:text-[#f3f3f6] mb-1">
            <Info className="w-3.5 h-3.5 text-[#7c3aed] dark:text-[#926bff]" />
            <span>Notes d'installation :</span>
          </div>
          <div>• {t.download.gatekeeperNote}</div>
          <div>• {t.download.smartScreenNote}</div>
          <div>• {t.download.linuxNote}</div>
        </div>

        {/* Release notes & Source code row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#7a7a85] dark:text-[#8a8a9e]">
          <a
            href={GITHUB_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
          >
            <span>{t.download.allReleases}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>{t.download.sourceCode}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

