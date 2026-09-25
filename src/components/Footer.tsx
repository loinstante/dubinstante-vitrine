import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { GITHUB_REPO_URL, CURRENT_VERSION } from '../config/downloads';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-[var(--border-subtle)] py-14 text-sm text-[var(--text-muted)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-[var(--border-subtle)]">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/assets/DubInstante.png"
                alt="DubInstante"
                className="w-6 h-6 object-contain rounded"
              />
              <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                DubInstante
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {CURRENT_VERSION}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              {t.footer.ecosystem}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  DubInstante
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/loinstante"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  GitHub LOINSTANTE
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              GitHub & Documentation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {language === 'en' ? 'Source Code (GitHub)' : 'Code source (GitHub)'}
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.footer.reportBug}
                </a>
              </li>
              <li>
                <Link
                  to="/features"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {language === 'en' ? 'Features & Engine' : 'Fonctionnalités & Moteur'}
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {language === 'en' ? 'Documentation & Shortcuts' : 'Documentation & Raccourcis'}
                </Link>
              </li>
              <li>
                <Link
                  to="/pourquoi"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {language === 'en' ? 'Why DubInstante?' : 'Pourquoi DubInstante ?'}
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.footer.roadmap}
                </Link>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.footer.releases}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <div>© 2026 DubInstante · {t.footer.madeBy}</div>
          <div>{t.footer.license}</div>
        </div>
      </div>
    </footer>
  );
};

