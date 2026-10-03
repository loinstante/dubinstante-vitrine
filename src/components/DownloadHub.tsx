import React from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  CURRENT_VERSION,
  CURRENT_RELEASE_TAG,
  CURRENT_RELEASE_URL,
  DOWNLOAD_PLATFORMS,
  GITHUB_ANDROID_RELEASE_URL,
  GITHUB_RELEASES_URL,
  GITHUB_REPO_URL,
} from "../config/downloads";
import {
  Apple,
  Monitor,
  Terminal,
  Smartphone,
  Download,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { useClientPlatform } from "./DownloadLink";

interface DownloadHubProps {
  showHeader?: boolean;
}

export const DownloadHub: React.FC<DownloadHubProps> = ({
  showHeader = true,
}) => {
  const { t, language } = useLanguage();
  const detectedOS = useClientPlatform()?.id;
  const platforms = Object.values(DOWNLOAD_PLATFORMS);
  const isEn = language === "en";
  const onHold = [
    {
      icon: Apple,
      title: t.download.macTitle,
      desc: t.download.macDesc,
      link: t.download.macLink,
      href: CURRENT_RELEASE_URL,
    },
    {
      icon: Smartphone,
      title: t.download.androidTitle,
      desc: t.download.androidDesc,
      link: t.download.androidLink,
      href: GITHUB_ANDROID_RELEASE_URL,
    },
  ];

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case "windows":
        return <Monitor className="w-5 h-5" />;
      case "debian":
      case "arch":
        return <Terminal className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  const content = (
    <div>
      {/* Platforms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {platforms.map((p) => {
          const isDetected = p.id === detectedOS;
          const osName = isEn ? p.osNameEn : p.osName;
          const size = isEn ? p.sizeEn : p.size;
          const requirements = isEn ? p.requirementsEn : p.requirements;

          return (
            <div
              key={p.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                isDetected
                  ? "border-accent/30 dark:border-accent/30 bg-accent/[0.02] dark:bg-accent/[0.03]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)]/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[var(--text-primary)]">
                    {getPlatformIcon(p.id)}
                  </span>
                  {isDetected && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent dark:text-accent">
                      {t.download.yourOs}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  {p.name}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {osName}
                </p>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                  <div className="break-all">
                    {t.download.fileLabel} {p.filename} ({size})
                  </div>
                  <div className="text-[10px]">{requirements}</div>
                  <div className="text-[10px] break-all">
                    SHA-256 : {p.sha256}
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {isEn ? p.instructionsEn : p.instructions}
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={p.url}
                  className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isDetected
                      ? "bg-accent hover:bg-accent-hover text-white shadow-sm"
                      : "bg-[var(--bg-surface)] hover:bg-[var(--bg-sunk)] text-[var(--text-primary)]"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {t.download.btnDownload} ({CURRENT_VERSION})
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Platforms without a usable build yet */}
      {onHold.map(({ icon: Icon, title, desc, link, href }) => (
        <div
          key={href}
          className="mt-8 p-5 rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)]/30 text-xs text-[var(--text-secondary)]"
        >
          <h2 className="flex items-center gap-2.5 font-semibold text-sm text-[var(--text-primary)] mb-2">
            <Icon className="w-4 h-4 text-[var(--text-muted)]" />
            <span>{title}</span>
          </h2>
          <p className="leading-relaxed">{desc}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-accent transition-colors font-mono"
          >
            <span>{link}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}

      {/* Release notes & Source code row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={CURRENT_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
          >
            <span>
              {isEn
                ? `Notes: ${CURRENT_RELEASE_TAG}`
                : `Notes (${CURRENT_RELEASE_TAG})`}
            </span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={GITHUB_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
          >
            <span>{t.download.allReleases}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>{t.download.sourceCode}</span>
        </a>
      </div>
    </div>
  );

  if (!showHeader) {
    return content;
  }

  return (
    <section
      id="download"
      className="py-20 md:py-28 border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            {t.download.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            {t.download.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.download.subtitle}
          </p>
        </div>

        {content}
      </div>
    </section>
  );
};
