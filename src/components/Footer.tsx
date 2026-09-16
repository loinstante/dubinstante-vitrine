import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GITHUB_REPO_URL, CURRENT_VERSION } from '../config/downloads';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] py-14 text-sm text-[#7a7a85] dark:text-[#8a8a9e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-black/[0.06] dark:border-white/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/assets/DubInstante.png"
                alt="DubInstante"
                className="w-6 h-6 object-contain rounded"
              />
              <span className="text-base font-bold tracking-tight text-[#121217] dark:text-[#f3f3f6]">
                DubInstante
              </span>
              <span className="text-xs font-mono text-[#7a7a85] dark:text-[#8a8a9e]">
                {CURRENT_VERSION}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5a5a68] dark:text-[#9e9eb0] leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#121217] dark:text-[#f3f3f6] mb-3">
              {t.footer.ecosystem}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  DubInstante (Studio)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/loimathos/DubWritter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  DubWritter (Texte rythmo)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/loimathos/InstanTexte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  InstanTexte (Bureautique libre)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/loimathos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  GitHub L'Oinstante
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#121217] dark:text-[#f3f3f6] mb-3">
              GitHub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  {t.footer.reportBug}
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}#-roadmap`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  {t.footer.roadmap}
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO_URL}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121217] dark:hover:text-[#f3f3f6] transition-colors"
                >
                  {t.footer.releases}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a7a85] dark:text-[#8a8a9e]">
          <div>© 2026 DubInstante · {t.footer.madeBy}</div>
          <div>{t.footer.license}</div>
        </div>
      </div>
    </footer>
  );
};

